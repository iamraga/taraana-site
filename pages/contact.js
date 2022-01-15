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

    const handleFormSubmit = async (values) => {
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
        <Form
            form={form}
            onFinish={handleFormSubmit}
            validateMessages={validateMessages}
        >
            <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                <Input className="form-control contact-input" aria-describedby="Name" placeholder="Name" />
            </Form.Item>
            <Form.Item name="number" rules={[{ required: true, message: 'Please enter your number!' }]}>
                <Input className="contact-input" placeholder="Contact number" aria-describedby="phone number" value={number} onKeyPress={onNumberChange} onChange={(e) => setNumber(e.target.value)} />
            </Form.Item>
            <Form.Item name="email" rules={[{ type:'email', required: true, message: 'Please enter your email ID!' }]}>
                <Input className="contact-input" aria-describedby="Email" placeholder="Email ID" />
            </Form.Item>
            <Form.Item name="message" className="mb-4">
                <Input.TextArea className="contact-textarea" rows="3" placeholder="Message" />
            </Form.Item>
        </Form>
        <button className="form-submit border-0 float-right mt-2" type="primary" onClick={() => form.submit()}>
            Submit
        </button>
        </>
    )
}
