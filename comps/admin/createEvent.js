import React, { useState } from 'react';
import { Modal, Button, Input, message, Form, DatePicker, Radio, Typography } from 'antd';
import moment from 'moment';
import { FolderAddOutlined, EditOutlined } from '@ant-design/icons';
import { projectFirestore, timestamp } from '../../utils/firebase';

const { RangePicker } = DatePicker;
const { Paragraph } = Typography;

export default function CreateEvent({isEdit, event}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventName, setEventName] = useState(isEdit ? event.name : "");
    const [isRange, setIsRange] = useState(isEdit ? event.isRange : false);

    const dateFormat = 'DD-MMM-YYYY';
    const [form] = Form.useForm();
    const eventsCollection = projectFirestore.collection("events");
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        form.submit();
    };

    const validateMessages = {
        required: '${label} is required!'
    }

    const onFormSubmit = (values) => {
        const { eventName, eventDate, description, eventDateRange, venue, venueUrl } = values;
        if(!isEdit) {
            //New Event
            const newEvent = {
                name: eventName.trim(),
                description,
                isRange,
                venue,
                venueUrl,
                createdAt: timestamp()
            };
            if(!isRange) {
                newEvent.eventDate = new Date(eventDate.format('DD-MMM-YYYY'));
            }
            else {
                newEvent.fromDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                newEvent.eventDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                newEvent.toDate = new Date(eventDateRange[1].format('DD-MMM-YYYY'));
            }
            console.log(newEvent);
            eventsCollection.add(newEvent);
            message.success(`${eventName} event created successfully`);
        }
        else {
            //Event update
            const currentEventRef = projectFirestore.doc(`events/${event.id}`)
            let updatedData = {};
            if(eventName && eventName !== event.name) updatedData.name = eventName;
            if(eventDate && eventDate.format('DD-MMM-YYYY') !== event.eventDate) updatedData.eventDate = eventDate.format('DD-MMM-YYYY');
            if(description && description !== event.description) updatedData.description = description;
            if(venue && venue !== event.venue) updatedData.venue = venue;
            if(venueUrl && venueUrl !== event.venueUrl) updatedData.venueUrl = venueUrl;
            updatedData.isRange = isRange;
            if(!isRange) {
                updatedData.eventDate = new Date(eventDate.format('DD-MMM-YYYY'));
            }
            else {
                updatedData.fromDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                updatedData.eventDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                updatedData.toDate = new Date(eventDateRange[1].format('DD-MMM-YYYY'));
            }
            
            console.log(updatedData);

            currentEventRef.update(updatedData);
            message.success(`${eventName} event updated successfully`);
        }
        
        setIsModalVisible(false);
        form.resetFields();
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };
    
    function getDateFromSeconds(time) {
        let date = new Date(time);
        let formattedDate = moment(date).format('DD-MMM-YYYY');
        return formattedDate;
    }
    getDateFromSeconds(event?.eventDate.seconds * 1000);
    let dateSelectComp = (isRange) ? (
        <Form.Item name="eventDateRange" initialValue={[moment(getDateFromSeconds(event?.fromDate.seconds * 1000), dateFormat), moment(getDateFromSeconds(event?.toDate.seconds * 1000), dateFormat)]} label="Event Dates" rules={[{ required: true }]}>
            <RangePicker style={{width: '100%'}} format={"YYYY/MM/DD"} />
        </Form.Item>
    ) : (
        <Form.Item name="eventDate" label="Event Date" initialValue={isEdit ? moment(getDateFromSeconds(event?.eventDate.seconds * 1000), dateFormat) : ""} rules={[{ required: true }]}>
            <DatePicker placeholder="Select event date" style={{width: '100%'}} />
        </Form.Item>
    );
 
    function onChange(e) {
        setIsRange((e.target.value === "single") ? false: true);
    }

    const buttonComp = (isEdit) ? (
        <Button icon={<EditOutlined />} onClick={showModal}>
                Edit
        </Button>
    ) : (
        <Button type="primary" icon={<FolderAddOutlined style={{fontSize: '16px'}} />} style={{fontSize: '16px', height: 'auto'}} onClick={showModal}>
                Create Event
        </Button>
    )
    
    return (
        <>
            {buttonComp}
            <Modal style={{minWidth: '600px'}} title={isEdit ? "Edit Event" : "Create Event"} visible={isModalVisible} okText={isEdit ? "Update" : "Create"} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                    onFinish={onFormSubmit}
                    validateMessages={validateMessages}
                >
                    <Form.Item name="eventName" label="Event Name" initialValue={isEdit ? event.name : ""} rules={[{ required: true }]}>
                        <Input placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="isRange" label="Event Duration" initialValue={(event?.isRange? "multiple": "single")}>
                        <Radio.Group onChange={onChange} defaultValue="single">
                            <Radio.Button value="single">One day</Radio.Button>
                            <Radio.Button value="multiple">Multiple days</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {dateSelectComp}
                    <Form.Item name="venue" label="Venue Name" initialValue={isEdit ? event.venue : ""} rules={[{ required: true }]}>
                        <Input placeholder="Enter venue name" onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="venueUrl" label="Venue GMaps URL" initialValue={isEdit ? event.venueUrl : ""} rules={[{ required: true }]}>
                        <Input placeholder="Enter venue URL" onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="description" initialValue={isEdit ? event.description : ""} label="Description">
                        <Input.TextArea placeholder="Enter a description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};