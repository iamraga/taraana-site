import React from 'react';
import Link from 'next/link';
import Moment from 'react-moment';
import { Row, Col, Typography, Card } from 'antd';
import useFirestore from '../../hooks/useFirestore';
import AdminLayout from '../../layouts/adminLayout';
import CreateAlbum from '../../comps/admin/createAlbum';
import ReorderAlbum from '../../comps/admin/reorderAlbum';

const { Title, Text, Paragraph } = Typography;

export default function Gallery() {
    let albums = useFirestore('albums').docs;
    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity
    return (
        <AdminLayout>
            <Row justify="space-between">
                <Col span={8}><Title level={2}>Albums</Title></Col>
                <Col span={10}>
                    <Row justify="end">
                        <Col span={10} style={{textAlign: 'end'}}><CreateAlbum isEdit={false} /></Col>
                        {/* <Col span={10} style={{textAlign: 'end'}}><ReorderAlbum albums={albums} /></Col> */}
                    </Row>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: '20px'}}>
                <Col span={24}>
                    <Row>
                        <Col span={6} offset={6}></Col>
                    </Row>
                    <Row justify="center">
                        <Col span={24}>
                            <Row gutter={16}>
                                { albums.map((album) => (
                                    <Col span={8} key={album.id} style={{padding: '8px'}}>
                                        <Link href={`/admin/album/${album.id}`}>
                                            <a>
                                                <Card 
                                                    size="small" 
                                                    title={album.name} 
                                                    headStyle={{backgroundColor: '#cae6ff', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px'}}
                                                    className="album-card"
                                                >
                                                    <div className="album-card-body">
                                                        <Paragraph><Text strong={true}>Created Date : </Text><Text><Moment format="D MMM YYYY hh:mm:ss">{album?.createdAt?.seconds * 1000}</Moment></Text></Paragraph>
                                                        <Paragraph><Text strong={true}>Image count : </Text><Text>{album.imageCount}</Text></Paragraph>
                                                    </div>
                                                </Card>
                                            </a>
                                        </Link>
                                    </Col>
                                )
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AdminLayout>
    )
}
