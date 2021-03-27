import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, message as antMessage} from 'antd';
import { projectFirestore, timestamp } from '../utils/firebase';
import emailjs, { init } from 'emailjs-com';
import emailConfig from '../utils/email-config';

init(emailConfig.userId);

export default function Contact() {
    const [number, setNumber] = useState("");
    const [form] = Form.useForm();
    const enquiriesCollection = projectFirestore.collection("enquiries");
    const validateMessages = {
        required: 'Please enter your ${label}',
        types: {
            email: 'Kindly enter a valid email ID.',
        },
    }

    const onNumberChange = (e) => {
        const reg = new RegExp('[0-9+]$');
        if(!reg.test(e.key) || number.length >= 12) {
            e.preventDefault();
            return false;
        }
        setNumber(e.target.value);
    }

    const onFormSubmit = async (values) => {
        const { name, number, email, message } = values;
        //New Enquiry
        const newEnquiry = {
            name: name.trim(),
            number,
            email,
            message,
            isOpened: false,
            isEmailSent: false,
            createdAt: timestamp()
        };
        const addedEnquiry = await enquiriesCollection.add(newEnquiry);
        antMessage.success(`Enquiry submitted successfully.`);

        //Send email using EmailJS
        const emailParams = {
            name: newEnquiry.name,
            email: newEnquiry.email,
            phone: newEnquiry.number,
            message: newEnquiry.message
        }
        emailjs.send(emailConfig.serviceName, emailConfig.templateId, emailParams)
            .then(function(response) {
                const enquiryDocRef = projectFirestore.doc(`enquiries/${addedEnquiry.id}`);
                enquiryDocRef.update({isEmailSent: true});
            }, function(error) {
                console.log('Error while sending email', error);
            });
        form.resetFields();
    }
    
    return (
        <>
            <Row justify="center">
                <Col span={10}>
                    <h2>Enquiry Form</h2>
                </Col>
                <Col span={16}>
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        onFinish={onFormSubmit}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter your name" />
                        </Form.Item>
                        <Form.Item name="number" label="Number" rules={[{ required: true }]}>
                            <Input placeholder="Enter your contact number" value={number} onKeyPress={onNumberChange} onChange={(e) => setNumber(e.target.value)} />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ type:'email', required: true }]}>
                            <Input placeholder="Enter your email ID" />
                        </Form.Item>
                        <Form.Item name="message" label="Message">
                            <Input.TextArea placeholder="Enter your message" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
