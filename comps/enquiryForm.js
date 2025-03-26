import React, { useState } from 'react';
import { Checkbox, DatePicker, Form, Input, notification} from 'antd';
import { analytics, firestore, serverTimestamp } from '../utils/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { logEvent } from '@firebase/analytics';
import emailjs, { init } from 'emailjs-com';
import { emailConfig, emailConfigNoDate } from '../utils/email-config';
import { PhoneOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

init(emailConfig.userId);

export default function EnquiryForm() {
    const [number, setNumber] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [visitTime, setVisitTime] = useState(new Date());
    const [form] = Form.useForm();
    const enquiriesCollection = collection(firestore, "enquiries");
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
            createdAt: serverTimestamp()
        };
        if(showDatePicker) {
            newEnquiry.visitTime = visitTime;
        }
        const addedEnquiry = await addDoc(enquiriesCollection, newEnquiry);

        //Analytics push
        logEvent(analytics, 'enquiry_submitted');
        const args = {
            message: 'Query submitted',
            description:
              'Thank you for reaching out to Taraana Academy. Our admin will get back to you within 24 hours.',
            duration: 4,
        };
        notification.success(args);

        //Send email using EmailJS
        const emailParams = {
            name: newEnquiry.name,
            email: newEnquiry.email,
            phone: newEnquiry.number,
            message: newEnquiry.message
        }
        let emailTemplateId = emailConfigNoDate.templateId;
        if(newEnquiry.visitTime) {
            emailParams.visitTime = moment(newEnquiry.visitTime).format('DD-MMM-YYYY h:mm A');
            emailTemplateId = emailConfig.templateId;
        }

        emailjs.send(emailConfig.serviceName, emailTemplateId, emailParams)
            .then(function(response) {
                const enquiryDocRef = doc(firestore, `enquiries/${addedEnquiry.id}`);
                updateDoc(enquiryDocRef, {isEmailSent: true});
            }, function(error) {
                console.log('Error while sending email', error);
            });
        form.resetFields();
        setShowDatePicker(false);
    }

    function onVisitChange(event) {
        setShowDatePicker(event.target.checked);
    }

    function onDateChange(value) {
        setVisitTime(moment(value).toDate());
    }

    function onDateConfirm(value) {
        setVisitTime(moment(value).toDate());
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    
    return (
        <>
        <Form
            form={form}
            onFinish={handleFormSubmit}
            validateMessages={validateMessages}
            validateTrigger="onSubmit"
        >
            <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                <Input 
                    className="form-control contact-input" 
                    aria-describedby="Name" 
                    prefix={<UserOutlined style={{marginRight: '5px', fontSize: '18px'}} />} 
                    style={{fontSize: '1rem'}}
                    placeholder="Name" 
                />
            </Form.Item>
            <Form.Item name="number" rules={[{ required: true, message: 'Please enter your number!' }]}>
                <Input 
                    className="contact-input" 
                    placeholder="Contact number" 
                    prefix={<PhoneOutlined rotate={90} style={{marginRight: '5px', fontSize: '18px'}} />} 
                    aria-describedby="phone number" 
                    value={number} 
                    style={{fontSize: '1rem'}}
                    onKeyPress={onNumberChange} 
                    onChange={(e) => setNumber(e.target.value)}
                />
            </Form.Item>
            <Form.Item name="email" rules={[{ type:'email', required: true, message: 'Please enter your email ID!' }]}>
                <Input 
                    className="contact-input" 
                    aria-describedby="Email" 
                    style={{fontSize: '1rem'}}
                    prefix={<MailOutlined style={{marginRight: '5px', fontSize: '18px'}} />} 
                    placeholder="Email ID" 
                />
            </Form.Item>
            <Form.Item name="message" className="mb-4">
                <Input.TextArea 
                    className="contact-textarea" 
                    rows="3" 
                    placeholder="Message" 
                />
            </Form.Item>
            <div style={{margin: '10px 0 15px'}}>
                <Checkbox className='contact-visit-checkbox' checked={showDatePicker} onChange={onVisitChange}>Schedule a visit to the studio</Checkbox>
            </div>
            {showDatePicker && (
                <Form.Item name="visitTime" className="mb-4">
                    <DatePicker 
                        className='contact-visit-datepicker'
                        showTime={{ 
                            format: 'HH:mm',
                            minuteStep: 10,
                            disabledHours: () => [1,2,3,4,5,6,7,8,9,19,20,21,22,23,24,0],
                            defaultValue: moment('10:00', 'HH:mm A'),
                            hideDisabledOptions: true
                        }} 
                        use12Hours
                        showNow={false}
                        defaultValue={moment().add(1,'days')}
                        disabledDate={disabledDate}
                        onChange={onDateChange}
                        onOk={onDateConfirm} 
                        format="DD-MMM-YYYY HH:mm A" 
                    />
                </Form.Item>
            )}
        </Form>
        <button className="form-submit border-0 float-right mt-2" type="primary" onClick={() => form.submit()}>
            Submit
        </button>
        </>
    )
}
