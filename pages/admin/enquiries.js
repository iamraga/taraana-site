import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Card, Badge } from 'antd';
import EachEnquiryCard from '../../comps/admin/eachEnquiryCard';
import Link from 'next/link';
import AdminLayout from '../../layouts/adminLayout';
import { projectFirestore } from '../../utils/firebase';

const { Title } = Typography;

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState(null);
    const collection = "enquiries";
    
    useEffect(() => {
        const unsub = projectFirestore.collection(`enquiries`)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                (snap) => {
                    let enqDocs = [];
                    snap.forEach((doc) => {
                        enqDocs.push({...doc.data(), id: doc.id});
                    });
                    setEnquiries(enqDocs);
                },
                (error) => {
                    console.log(error);
                });
        return () => unsub();
    }, [collection]);
    
    if(!enquiries) return (<AdminLayout><div>Loading...</div></AdminLayout>)

    const markAllRead = (newEnquiries) => {
        newEnquiries.forEach(enq => {
            const docRef = projectFirestore.doc(`enquiries/${enq.id}`);
            docRef.update({isOpened: true});
        });
    }

    const markAsRead = (enquiryId) => {
        const enqRef = projectFirestore.doc(`enquiries/${enquiryId}`);
        enqRef.update({isOpened: true});
    }

    let newEnquiries = enquiries.filter(enquiry => (enquiry.isOpened === false));
    let enqContent = enquiries.map(enquiry => {
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