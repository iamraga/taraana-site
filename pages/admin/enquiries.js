import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Card, Badge } from 'antd';
import EachEnquiryCard from '../../comps/admin/eachEnquiryCard';
import Link from 'next/link';
import AdminLayout from '../../layouts/adminLayout';
import { firestore } from '../../utils/firebase';
import { onSnapshot, collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';

const { Title } = Typography;

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState(null);
    const collectionName = "enquiries";
    
    useEffect(() => {
        const enquiriesRef = collection(firestore, `enquiries`);
        const unsub = onSnapshot(query(enquiriesRef, orderBy('createdAt', 'desc')), (snap) => {
            let enqDocs = [];
            snap.forEach((doc) => {
                enqDocs.push({...doc.data(), id: doc.id});
            });
            setEnquiries(enqDocs);
        }, (error) => {
            console.log(error);
        });
        return () => unsub();
    }, [collectionName]);
    
    if(!enquiries) return (<AdminLayout><div>Loading...</div></AdminLayout>)

    const markAllRead = (newEnquiries) => {
        newEnquiries.forEach(enq => {
            const docRef = doc(firestore, `enquiries/${enq.id}`);
            updateDoc(docRef, {isOpened: true});
        });
    }

    const markAsRead = (enquiryId) => {
        const enqRef = doc(firestore, `enquiries/${enquiryId}`);
        updateDoc(enqRef, {isOpened: true});
    }

    let newEnquiries = enquiries.filter(enquiry => (enquiry.isOpened === false));
    let enqContent;
    if(enquiries.length === 0) {
        enqContent = (<div>No Enquiries found</div>);
    }
    else {
        enqContent = enquiries.map(enquiry => {
                if(enquiry.isOpened) {
                    return (
                        <Col key={enquiry.id} span={12} key={enquiry.id}>
                            <EachEnquiryCard enquiry={enquiry} />
                        </Col>
                    );
                }
                else {
                    return(
                        <Col key={enquiry.id} span={12} key={enquiry.id}>
                            <Badge.Ribbon color="#ff4d4f" placement="start" text="New" size="small">
                                <EachEnquiryCard enquiry={enquiry} markAsRead={markAsRead} />
                            </Badge.Ribbon>
                        </Col>
                    )
                }
            });
    }
    return (
        <AdminLayout>
            <Row>
                <Col span={16}><Title level={2}>Enquiries</Title></Col>
                <Col span={4} style={{textAlign: 'end'}}>
                    <Button disabled={newEnquiries.length === 0} onClick={() => markAllRead(newEnquiries)} style={{fontSize: '16px', height: 'auto'}}>Mark all as read</Button>
                </Col>
                <Col span={4} style={{textAlign: 'end'}}>
                    <Link href="/admin"><a><Button style={{fontSize: '16px', height: 'auto'}}>Back to gallery</Button></a></Link>
                </Col>
            </Row>
            <Row style={{padding: '20px 0px'}}>
                {enqContent}
            </Row>
        </AdminLayout>
    )
}