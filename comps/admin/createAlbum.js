import React, { useState } from 'react'
import { Modal, Button, Input, message, Form, DatePicker } from 'antd';
import moment from 'moment';
import { FolderAddOutlined } from '@ant-design/icons';
import { firestore, serverTimestamp } from '../../utils/firebase';
import { collection, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';

export default function CreateAlbum({isEdit, album, setAlbum}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [albumName, setAlbumName] = useState(isEdit ? album.name : "");

    const dateFormat = 'DD-MMM-YYYY';
    const [form] = Form.useForm();
    const albumCollection = collection(firestore, "albums");
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
        const { albumName, eventDate, description } = values;

        if(!isEdit) {
            //New Album
            const newAlbum = {
                name: albumName.trim(),
                eventDate: eventDate.format('DD-MMM-YYYY'),
                description,
                imageCount: 0,
                createdAt: serverTimestamp()
            };
            addDoc(albumCollection, newAlbum)
                .then(async addedAlbumRef => {
                    const addedAlbum = await getDoc(addedAlbumRef);
                    addNewAlbumToOrder(addedAlbum.id, addedAlbum.data().name);
                });

            message.success(`${albumName} album created successfully`);
        }
        else {
            //Album update
            const currentAlbumRef = doc(firestore, `albums/${album.albumId}`)
            let updatedData = {};
            if(albumName && albumName !== album.name) updatedData.name = albumName;
            if(eventDate && eventDate.format('DD-MMM-YYYY') !== album.eventDate) updatedData.eventDate = eventDate.format('DD-MMM-YYYY');
            if(description && description !== album.description) updatedData.description = description;

            if(Object.keys(updatedData).length === 0) {
                message.warning(`Data unaltered!`);
                setIsModalVisible(false);
                form.resetFields();
                return false;
            }
            updateDoc(currentAlbumRef, updatedData);
            message.success(`${albumName} album updated successfully`);
            setAlbum({...album, ...updatedData});
        }
        
        setIsModalVisible(false);
        form.resetFields();
    }

    const addNewAlbumToOrder = async (newAlbumId, newAlbumName) => {
        const albumOrderRef = doc(firestore, `albums/album-order`);
        const albumOrder = await getDoc(albumOrderRef);
        const orderArray = albumOrder.data().order;
        
        orderArray.push({
            id: newAlbumId,
            name: newAlbumName
        });

        updateDoc(albumOrderRef, { order: orderArray });
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };
    
    return (
        <>
            <Button type="primary" icon={<FolderAddOutlined style={{fontSize: '16px'}} />} style={{fontSize: '16px', height: 'auto'}} onClick={showModal}>
                {isEdit ? "Edit Album" : "Create Album"}
            </Button>
            <Modal title={isEdit ? "Edit Album" : "Create Album"} visible={isModalVisible} okText={isEdit ? "Update" : "Create"} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    onFinish={onFormSubmit}
                    validateMessages={validateMessages}
                >
                    <Form.Item name="albumName" label="Album Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter album name" value={albumName} defaultValue={isEdit ? album.name : ""} onChange={(e) => setAlbumName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="eventDate" label="Event Date">
                        <DatePicker placeholder="Select event date" defaultValue={(isEdit && album.eventDate) ? moment(album.eventDate, dateFormat) : ""} style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea defaultValue={isEdit ? album.description : ""} placeholder="Enter a description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
