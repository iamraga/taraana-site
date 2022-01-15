import React from 'react';
import { Row, Col, Card, Typography, Button, Modal } from 'antd';
import { MailOutlined, ClockCircleOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import ViewEnquiry from '../../comps/admin/viewEnquiry';
import { deleteDoc } from '../../hooks/common';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

export default function EachEnquiryCard({ enquiry, markAsRead }) {

    function deleteConfirm() {
        confirm({
            title: 'Are you sure you want to delete this enquiry?',
            icon: <ExclamationCircleOutlined />,
            content: enquiry.name,
            onOk() {
                deleteDoc(`enquiries/${enquiry.id}`);
            },
            onCancel() {}
        });
    }

    return (
        <Card key={enquiry.id} size="small" style={{margin: '10px', padding: '5px 0px'}}>
            <Row justify="center">
                <Col span={14} offset={1}>
                    <Paragraph><Title level={4}>{enquiry.name}</Title></Paragraph>
                    <div className="enquiry-card-data"><Text><ClockCircleOutlined style={{marginRight: '10px'}} /><Moment format="D MMM YYYY">{enquiry?.createdAt?.seconds * 1000}</Moment></Text></div>
                    <div className="enquiry-card-data"><MailOutlined style={{marginRight: '10px'}} /><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></div>
                </Col>
                <Col span={8} style={{display: 'flex', alignItems: 'center'}}>
                    <ViewEnquiry enquiry={enquiry} markAsRead={markAsRead} />
                    <Button danger icon={<DeleteOutlined />} onClick={deleteConfirm} style={{margin: '0px 10px', height: 'inherit'}} />
                </Col>
            </Row>
        </Card>
    )
}
