import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Row, Col, Typography, Card } from 'antd';
import useFirestore from '../../hooks/useFirestore';
import AdminLayout from '../../layouts/adminLayout';
import CreateAlbum from '../../comps/admin/createAlbum';
import ReorderAlbum from '../../comps/admin/reorderAlbum';
import { firestore } from '../../utils/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import SingleAlbumView from '../../comps/admin/singleAlbumView';

React.useLayoutEffect = React.useEffect;
const { Title, Text, Paragraph } = Typography;

export default function Albums() {
    
    const [albumId, setAlbumId] = useState('');
    const [album, setAlbum] = useState({});
    const [pageTitle, setPageTitle] = useState('Albums');
    
    useEffect(() => {
        if(albumId !== '') {
            const docRef = doc(firestore, `albums/${albumId}`);
            const docObserver = onSnapshot(docRef, snap => {
                if(snap.exists) {
                    setAlbum({...snap.data(), albumId});
                }
                else {
                    console.log("Error while fetching data");
                }
            });
        }
    }, [albumId]);
    
    let albums = useFirestore('albums').docs;
    const albumOrder = albums.filter(album => (album.id === "album-order"));
    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity

    //Reordering albums based on album-order
    const sortedAlbums = albumOrder[0] ? albumOrder[0].order.map(eachAlbum => {
        return albums.filter(dbAlbum => dbAlbum.id === eachAlbum.id)[0];
    }) : albums;

    let albumsComp;
    if(albumId === '') { //List all albums
        albumsComp = (!albums || albums.length === 0) ? (
        <Row justify="center" style={{marginTop: '20px'}}>
            <Col span={24}>
                <Row justify="center">
                    <Col span={24}>No albums have been created yet!</Col>
                </Row>
            </Col>
        </Row>
    ) : 
    (
        <Row justify="center" style={{marginTop: '20px'}}>
                <Col span={24}>
                    <Row justify="center">
                        <Col span={24}>
                            <Row gutter={16}>
                                { sortedAlbums.map((album) => (
                                    <Col span={8} key={album.id} style={{padding: '8px'}}>
                                        <div onClick={() => {setAlbumId(album.id)}}>
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
                                        </div>
                                    </Col>
                                )
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    else { //List album images
        albumsComp = <SingleAlbumView album={album} setAlbum={setAlbum} setAlbumId={setAlbumId} />
    }
    return (
        <AdminLayout>
            {(albumId === '') ? (
                <>
                <Row justify="space-between">
                    <Col span={8}><Title level={2}>{pageTitle}</Title></Col>
                    <Col span={10}>
                        <Row justify="end">
                            <Col span={10} style={{textAlign: 'end'}}><CreateAlbum isEdit={false} /></Col>
                            <Col span={10} style={{textAlign: 'end'}}><ReorderAlbum albums={albums} albumOrder={albumOrder} /></Col>
                        </Row>
                    </Col>
                </Row>
                {albumsComp}
                </>
            ) : (
                <>
                {albumsComp}
                </>
            )}
        </AdminLayout>
    )
}
