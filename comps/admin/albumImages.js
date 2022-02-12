import React from 'react';
import { Image, Row, Col, Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useFirestore from '../../hooks/useFirestore';
import { doc, updateDoc, deleteDoc } from '@firebase/firestore';
import { storage, firestore, increment } from '../../utils/firebase';
import { ref, deleteObject } from '@firebase/storage';

const { confirm } = Modal;

export default function AlbumImages({ albumId }) {
    const images = useFirestore(`albums/${albumId}/images`).docs;
    console.log(images);

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
                    //Decrement imagecount
                    updateDoc(albumDocRef, {imageCount: increment(-1)});
                    return true;
                }).catch((error) => {
                    alert("Error while deleting file : " + error);
                    return false;
                });
            },
            onCancel() {}
        });
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
                        <Button danger icon={<DeleteOutlined />} onClick={() => deleteConfirm(image)} style={{margin: '0px 10px', height: 'inherit'}} />
                    </Col>
                ))}
            </Row>
        </Image.PreviewGroup>
    )
}
