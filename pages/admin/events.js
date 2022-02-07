import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import AdminLayout from '../../layouts/adminLayout';
import CreateEvent from '../../comps/admin/createEvent';
import useFirestore from '../../hooks/useFirestore';
import EachEvent from '../../comps/admin/eachEvent';

const { Title } = Typography;

export default function Events() {
    let events = useFirestore('events', 'eventDate').docs;
    
    let upcomingEvents = events.filter(event => event.eventDate.seconds * 1000 >= new Date().getTime())
                            .sort((a,b) => a.eventDate - b.eventDate );
    let pastEvents = events.filter(event => event.eventDate.seconds * 1000 < new Date().getTime())
                        .sort((a,b) => b.eventDate - a.eventDate);
    let eventsComp = (!events || events.length === 0) ? (
        <Row justify="center" style={{marginTop: '20px'}}>
            <Col span={24}>
                <Row justify="center">
                    <Col span={24}>No events have been created yet!</Col>
                </Row>
            </Col>
        </Row>
    ) : (
        <Row justify="center">
            <Col span={24}>
                <Row justify="center">
                    <Col span={24}>
                        <Divider style={{fontSize: '14px', color:'#555', borderTopColor: '#bbb'}} orientation="left">Upcoming events</Divider>
                        <Row>
                            { (upcomingEvents.length === 0) ? (
                                <Row justify="center" style={{marginTop: '20px'}}>
                                <Col span={24}>
                                    <Row justify="center">
                                        <Col span={24}>No upcoming events found!</Col>
                                    </Row>
                                </Col>
                            </Row>
                            ) : 
                            ( upcomingEvents.map((event) => (
                                <Col span={24} key={event.id} style={{padding: '8px'}}>
                                    <EachEvent event={event} />
                                </Col>
                            )
                            ))}
                        </Row>
                        <Divider style={{fontSize: '14px', color:'#555', borderTopColor: '#bbb'}} orientation="left">Past events</Divider>
                        <Row>
                            { (pastEvents.length === 0) ? (
                                <Row justify="center" style={{marginTop: '20px'}}>
                                <Col span={24}>
                                    <Row justify="center">
                                        <Col span={24}>No past events found!</Col>
                                    </Row>
                                </Col>
                            </Row>
                            ) : 
                            (
                                pastEvents.map((event) => (
                                <Col span={24} key={event.id} style={{padding: '8px'}}>
                                    <EachEvent event={event} />
                                </Col>
                            )
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
    return (
        <AdminLayout>
            <Row justify="space-between">
                <Col span={8}><Title level={2}>Events</Title></Col>
                <Col span={10}>
                    <Row justify="end">
                        <Col span={10} style={{textAlign: 'end'}}><CreateEvent isEdit={false} /></Col>
                        {/* <Col span={10} style={{textAlign: 'end'}}><ReorderAlbum albums={albums} /></Col> */}
                    </Row>
                </Col>
            </Row>
            {eventsComp}
        </AdminLayout>
    )
}
