import React, { useState } from 'react';
import { Button, Modal, Typography, Row, Col } from 'antd';
import Moment from 'react-moment';
import { UserOutlined, PhoneOutlined, MailOutlined, MessageOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default function ViewEnquiry({ enquiry, markAsRead }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
        if(!enquiry.isOpened) {
            setTimeout(function() {
                markAsRead(enquiry.id);
            }, 1000);
        }
    }
    const messageLines = enquiry.message.split("\n");
    const messageContent = messageLines.map(line => (<><Text>{line}</Text><br /></>));

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                View Enquiry
            </Button>
            <Modal visible={isModalVisible} closable={true} footer={null} onCancel={handleCancel}>
                <Paragraph style={{marginBottom: '25px'}}><Text strong={true} style={{fontSize: '20px'}}><UserOutlined style={{marginRight: '10px'}} />{enquiry.name}</Text></Paragraph>
                <p><PhoneOutlined style={{marginRight: '10px'}} />{enquiry.number}</p>
                <p><MailOutlined style={{marginRight: '10px'}} /><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></p>
                <p><Row>
                    <MessageOutlined style={{margin: '5px 10px 0px 0px'}} />
                    <Col span={21}>
                        {messageContent}
                    </Col>
                </Row>
                </p>
                <p><ClockCircleOutlined  style={{marginRight: '10px'}} /><Moment format="D MMM YYYY">{enquiry?.createdAt?.seconds * 1000}</Moment></p>
            </Modal>
        </div>
    )
}
