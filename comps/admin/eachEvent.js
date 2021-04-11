import React from 'react';
import { CalendarOutlined, EnvironmentOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Modal } from 'antd';
import Moment from 'react-moment';
import CreateEvent from './createEvent';
import Link from 'next/link';
import { deleteDoc } from '../../hooks/common';

const { Text, Paragraph } = Typography;
const { confirm } = Modal;

export default function EachEvent({ event }) {

    function deleteConfirm() {
        confirm({
            title: 'Are you sure you want to delete this event?',
            icon: <ExclamationCircleOutlined />,
            content: event.name,
            onOk() {
                deleteDoc(`events/${event.id}`);
            },
            onCancel() {}
        });
    }

    return (
        <>
        <Card 
            size="small" 
            title={event.name} 
            headStyle={{backgroundColor: '#cae6ff', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px'}}
            className="event-card"
            extra={(
                <div style={{marginRight: '40px'}}><CalendarOutlined style={{marginRight: '10px', fontSize: '16px'}} />
                {event.isRange ? (<span><span style={{marginRight: '10px'}}><Moment date={event.fromDate.seconds * 1000} format={'DD-MMM-YYYY'} /></span> to <span style={{marginLeft: '10px'}}><Moment date={event.toDate.seconds * 1000} format={'DD-MMM-YYYY'} /></span></span>) : (<Moment date={event.eventDate.seconds * 1000} format={'DD-MMM-YYYY'} />)}</div>
            )}
        >
            <div className="event-card-body">
                <Paragraph><Text>{event.description}</Text></Paragraph>
                {event.venueUrl ? (<Paragraph><EnvironmentOutlined style={{marginRight: '10px', fontSize: '16px'}} /><Text>{event.venue}  (<Link href={event.venueUrl}><a>View on Google maps</a></Link>)</Text></Paragraph>)
                    : (<Paragraph><EnvironmentOutlined style={{marginRight: '10px', fontSize: '16px'}} /><Text>{event.venue}</Text></Paragraph>)}
                <Text strong={true}>Created Date : </Text><Text><Moment format="DD MMM YYYY hh:mm:ss">{event?.createdAt?.seconds * 1000}</Moment></Text>
                <div style={{display: 'inline', float: 'right', marginRight: '40px'}}><CreateEvent isEdit={true} event={event} /><Button danger icon={<DeleteOutlined />} onClick={deleteConfirm} style={{margin: '0px 10px', height: 'inherit'}} /></div>
            </div>
        </Card>

        </>
    )
}
