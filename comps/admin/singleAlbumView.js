import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider, Button } from 'antd';
import { projectFirestore } from '../../utils/firebase';
import UploadForm from './uploadForm';
import AlbumImages from './albumImages'
import AdminLayout from '../../layouts/adminLayout';
import Link from 'next/link';
import CreateAlbum from './createAlbum';

const { Title } = Typography;

export default function SingleAlbumView({ albumId }) {
    const [album, setAlbum] = useState(null);
    
    useEffect(() => {
        const docRef = projectFirestore.doc(`albums/${albumId}`);
        const docObserver = docRef.onSnapshot(snap => {
            if(snap.exists) {
                setAlbum({...snap.data(), albumId});
            }
            else {
                console.log("Error while fetching data");
            }
        });
    }, [albumId]);

    if(!album) return (<AdminLayout><div>Loading...</div></AdminLayout>)
    return (
        <div>
            <Row>
                <Col span={16}>
                    <Title level={2}>{album.name}</Title>
                </Col>
                <Col span={4} style={{textAlign: 'end'}}><CreateAlbum isEdit={true} album={album} setAlbum={setAlbum}/></Col>
                <Col span={4} style={{textAlign: 'end'}}><Link href="/admin"><a><Button style={{fontSize: '16px', height: 'auto'}}>Back to gallery</Button></a></Link></Col>
                <Col span={24}>
                    <p style={{margin: '10px 0px'}}>{album.description}</p>
                </Col>
            </Row>
            <Divider style={{fontSize: '14px', color:'#555', borderTopColor: '#bbb'}} orientation="left">Upload</Divider>
            <Row>
                <Col span={20} style={{margin: '10px 0px'}}>
                    <UploadForm albumId={albumId} />
                </Col>
            </Row>
            <Divider style={{fontSize: '14px', color:'#555', borderTopColor: '#bbb'}} orientation="left">Images ({album.imageCount})</Divider>
            <Row>
                <Col style={{margin: '10px 0px'}}>
                    <AlbumImages albumId={albumId} />
                </Col>
            </Row>
        </div>
    )
}
