import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Card, Badge } from 'antd';
import { MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Moment from 'react-moment';
import AdminLayout from '../../layouts/adminLayout';
import ViewEnquiry from '../../comps/admin/viewEnquiry';
import { projectFirestore } from '../../utils/firebase';

const { Title, Paragraph, Text } = Typography;

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState(null);
    const collection = "enquiries";
    
    useEffect(() => {
        const unsub = projectFirestore.collection(`enquiries`)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let enqDocs = [];
                snap.forEach((doc) => {
                    enqDocs.push({...doc.data(), id: doc.id});
                });
                setEnquiries(enqDocs);
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
                <Col span={12} key={enquiry.id}>
                    <Card size="small" style={{margin: '10px', padding: '5px 0px'}}>
                        <Row justify="start">
                            <Col span={16} offset={1}>
                                <Paragraph><Title level={4}>{enquiry.name}</Title></Paragraph>
                                <div className="enquiry-card-data"><Text><ClockCircleOutlined  style={{marginRight: '10px'}} /><Moment format="D MMM YYYY">{enquiry?.createdAt?.seconds * 1000}</Moment></Text></div>
                                <div className="enquiry-card-data"><MailOutlined style={{marginRight: '10px'}} /><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></div>
                            </Col>
                            <Col span={6} style={{display: 'flex', alignItems: 'center'}}>
                                <ViewEnquiry enquiry={enquiry} markAsRead={markAsRead} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            );
        }
        else {
            return(
                <Col span={12} key={enquiry.id}>
                    <Badge.Ribbon color="#ff4d4f" placement="start" text="New" size="small">
                        <Card size="small" style={{margin: '10px 0px', padding: '5px 0px'}}>
                            <Row justify="center">
                                <Col span={16} offset={1}>
                                    <Paragraph><Title level={4}>{enquiry.name}</Title></Paragraph>
                                    <div className="enquiry-card-data"><Text><ClockCircleOutlined style={{marginRight: '10px'}} /><Moment format="D MMM YYYY">{enquiry?.createdAt?.seconds * 1000}</Moment></Text></div>
                                    <div className="enquiry-card-data"><MailOutlined style={{marginRight: '10px'}} /><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></div>
                                </Col>
                                <Col span={6} style={{display: 'flex', alignItems: 'center'}}>
                                    <ViewEnquiry enquiry={enquiry} markAsRead={markAsRead} />
                                </Col>
                            </Row>
                        </Card>
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