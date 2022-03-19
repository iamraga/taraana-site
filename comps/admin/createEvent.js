import React, { useState } from 'react';
import { Modal, Button, Input, message, Form, DatePicker, Radio, Typography, TimePicker } from 'antd';
import moment from 'moment';
import { FolderAddOutlined, EditOutlined } from '@ant-design/icons';
import { firestore, serverTimestamp } from '../../utils/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const { RangePicker } = DatePicker;
const { Paragraph } = Typography;

export default function CreateEvent({isEdit, event}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventName, setEventName] = useState(isEdit ? event.name : "");
    const [isRange, setIsRange] = useState(isEdit ? event.isRange : false);

    const dateFormat = 'DD-MMM-YYYY';
    let initialFormValues;
    const [form] = Form.useForm();
    const eventsCollectionRef = collection(firestore, "events");
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
        const { eventName, eventDate, description, eventDateRange, time, venue, venueUrl } = values;
        if(!isEdit) {
            //New Event
            const newEvent = {
                name: eventName.trim(),
                description,
                isRange,
                venue,
                time : (moment(time).format('h:mm A')),
                venueUrl,
                createdAt: serverTimestamp()
            };
            if(!isRange) {
                newEvent.eventDate = new Date(eventDate.format('DD-MMM-YYYY'));
            }
            else {
                newEvent.fromDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                newEvent.eventDate = new Date(eventDateRange[0].format('DD-MMM-YYYY'));
                newEvent.toDate = new Date(eventDateRange[1].format('DD-MMM-YYYY'));
            }
            addDoc(eventsCollectionRef, newEvent);
            message.success(`${eventName} event created successfully`);
        }
        else {
            //Event update
            const currentEventRef = doc(firestore, `events/${event.id}`)
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
            
            updateDoc(currentEventRef, updatedData);
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
    
    if(isEdit) {
        if(isRange) {
            initialFormValues = {
                eventDateRange: [
                    moment(getDateFromSeconds(event?.fromDate.seconds * 1000), dateFormat), 
                    moment(getDateFromSeconds(event?.toDate.seconds * 1000), dateFormat)
                ]
            }
        }
        else {
            initialFormValues = {
                eventDate: moment(getDateFromSeconds(event?.eventDate.seconds * 1000), dateFormat)
            }
        }
        initialFormValues.eventName = event?.name;
        initialFormValues.isRange = event?.isRange ? "multiple": "single";
        initialFormValues.venue = event?.venue;
        initialFormValues.description = event?.description;
        initialFormValues.venueUrl = event?.venueUrl;
        initialFormValues.time = moment(event?.time, 'h:mm A');
    }
    let dateSelectComp = (isRange) ? (
        <Form.Item name="eventDateRange" initialvalues={[moment(getDateFromSeconds(event?.fromDate.seconds * 1000), dateFormat), moment(getDateFromSeconds(event?.toDate.seconds * 1000), dateFormat)]} label="Event Dates" rules={[{ required: true }]}>
            <RangePicker style={{width: '100%'}} format={"YYYY/MM/DD"} />
        </Form.Item>
    ) : (
        <Form.Item name="eventDate" label="Event Date" initialvalues={isEdit ? moment(getDateFromSeconds(event?.eventDate.seconds * 1000), dateFormat) : ""} rules={[{ required: true }]}>
            <DatePicker placeholder="Select event date" style={{width: '100%'}} />
        </Form.Item>
    );
 
    function onChange(e) {
        setIsRange((e.target.value === "single") ? false: true);
    }

    function onEventTimeChange(value) {
        console.log(moment(value).format('h:mm A'))
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
                    initialValues={initialFormValues}
                >
                    <Form.Item name="eventName" label="Event Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="isRange" label="Event Duration">
                        <Radio.Group onChange={onChange} defaultValue="single">
                            <Radio.Button value="single">One day</Radio.Button>
                            <Radio.Button value="multiple">Multiple days</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {dateSelectComp}
                    <Form.Item name="time" label="Event Time" rules={[{ required: true }]}>
                        <TimePicker placeholder="Select Time" format='h:mm A' minuteStep={10} onChange={onEventTimeChange} />
                    </Form.Item>
                    <Form.Item name="venue" label="Venue Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter venue name" onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="venueUrl" label="Venue GMaps URL" rules={[{ required: true }]}>
                        <Input placeholder="Enter venue URL" onChange={(e) => setEventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea placeholder="Enter a description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};