import React from 'react';
import { Image, Row, Col, Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, PictureOutlined } from '@ant-design/icons';
import useFirestore from '../../hooks/useFirestore';
import { doc, updateDoc, deleteDoc, getDoc, deleteField } from '@firebase/firestore';
import { storage, firestore, increment } from '../../utils/firebase';
import { ref, deleteObject } from '@firebase/storage';

const { confirm } = Modal;

export default function AlbumImages({ albumId, coverUrl }) {
    const images = useFirestore(`albums/${albumId}/images`).docs;

    if(images.length === 0) return (<div>No images found in this album</div>);

    function deleteConfirm(image) {
        confirm({
            title: 'Are you sure you want to delete this image?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                //Delete image
                const storageRef = ref(storage);
                const imageDocRef = doc(firestore, `albums/${albumId}/images/${image.id}`);
                const albumDocRef = doc(firestore, `albums/${albumId}`);
                var storageFileRef = ref(storageRef, `images/${image.imageNameinStorage}`);

                deleteObject(storageFileRef).then(() => {
                    //Delete image from collection
                    deleteDoc(imageDocRef);

                    let updateAlbumObj = {
                        imageCount: increment(-1)
                    };
                    //Delete cover attribute if cover photo is deleted
                    if(image.url === coverUrl) {
                        updateAlbumObj.cover = deleteField()
                    }
                    //Decrement imagecount
                    updateDoc(albumDocRef, updateAlbumObj);
                    return true;
                }).catch((error) => {
                    alert("Error while deleting file : " + error);
                    return false;
                });
            },
            onCancel() {}
        });
    }

    function setAsCover(image) {
        const albumDocRef = doc(firestore, `albums/${albumId}`);
        const imageDocRef = doc(firestore, `albums/${albumId}/images/${image.id}`);
        updateDoc(albumDocRef, {cover: imageDocRef});
    }

    return (
        <Image.PreviewGroup>
            <Row gutter={16}>
                {images.map(image => (
                    <Col span={8} key={image.id} style={{display: 'flex', alignItems: 'flex-start', padding: '8px'}}>
                        <Image
                            width={300}
                            height={300}
                            src={image.url}
                            alt={image.name}
                        />
                        <div>
                        <Button title="Delete Image" danger icon={<DeleteOutlined />} onClick={() => deleteConfirm(image)} style={{margin: '0px 10px'}} />
                        <Button title="Set as album cover" type={coverUrl === image.url ? "primary": "default"} icon={<PictureOutlined />} onClick={() => setAsCover(image)} style={{margin: '10px 10px'}} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Image.PreviewGroup>
    )
}
