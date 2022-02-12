import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Typography, Divider, Button, Modal } from 'antd';
import { DeleteOutlined, LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { firestore, storage } from '../../utils/firebase';
import UploadForm from './uploadForm';
import AlbumImages from './albumImages'
import Link from 'next/link';
import CreateAlbum from './createAlbum';
import { deleteSingleDoc } from '../../hooks/common';
import useFirestore from '../../hooks/useFirestore';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const { Title } = Typography;
const { confirm } = Modal;

export default function SingleAlbumView({ albumId }) {
    const [album, setAlbum] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        const docRef = doc(firestore, `albums/${albumId}`);
        const docObserver = onSnapshot(docRef, snap => {
            if(snap.exists) {
                setAlbum({...snap.data(), albumId});
            }
            else {
                console.log("Error while fetching data");
            }
        });
    }, [albumId]);

    async function deleteAllImageDocs(albumId) {
        const albumImagesRef = collection(firestore, `albums/${albumId}/images`);
        const snapshot = await getDocs(albumImagesRef);
        snapshot.forEach(image => {
            console.log("inside");
            deleteSingleDoc(`albums/${albumId}/images/${image.id}`);
        });
        deleteSingleDoc(`albums/${album.albumId}`);
    }

    function deleteConfirm() {
        console.log(album);
        confirm({
            title: 'Deleting this album will delete all the images in it. Are you sure you want to delete this album?',
            icon: <ExclamationCircleOutlined />,
            content: album.name,
            onOk() {
                //Deleting all images in the album
                let imageNames = [];
                const imagesRef = collection(firestore, `albums/${album.albumId}/images`);
                getDocs(imagesRef).then(snap => {
                    snap.docs.map(doc => {
                        let data = doc.data();
                        imageNames.push(data.imageNameinStorage);
                    });
    
                    imageNames.map(imageName => {
                        const storageRef = ref(storage);
                        var storageFileRef = ref(storageRef, `images/${imageName}`);
    
                        deleteObject(storageFileRef).then().catch((error) => {
                            console.log("Error while deleting image : " + error);
                            return false;
                        });
                    });
                    deleteAllImageDocs(album.albumId);
                    router.push('/admin');
                });

            },
            onCancel() {}
        });
    }

    if(!album) return (<div>Loading...</div>)
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Title level={2}>{album.name}</Title>
                </Col>
                <Col span={4} style={{textAlign: 'end'}}><Link href="/admin"><a><Button icon={<LeftOutlined />} style={{fontSize: '16px', height: 'auto'}}>Back to gallery</Button></a></Link></Col>
                <Col span={4} style={{textAlign: 'end', paddingRight: '12px'}}><CreateAlbum isEdit={true} album={album} setAlbum={setAlbum}/></Col>
                <Col span={4} style={{textAlign: 'end'}}><Button danger icon={<DeleteOutlined style={{fontSize: '16px'}} />} onClick={deleteConfirm} style={{height: 'auto', fontSize: '16px'}}>Delete Album</Button></Col>
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
                <Col span={24} style={{margin: '10px 0px'}}>
                    <AlbumImages albumId={albumId} />
                </Col>
            </Row>
        </div>
    )
}
