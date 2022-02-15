import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage, firestore, serverTimestamp, increment } from '../../utils/firebase';
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from 'firebase/storage';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function UploadForm({ albumId }) {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [files, setFiles] = useState([]);

    const fileTypes = ['image/png', 'image/jpeg'];
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    function uploadImages({ file: uploadedFile, onSuccess, onProgress, onError }) {
        const imageNameTimestamp = Date.now();
        const storageRef = ref(storage, 'images/' + (uploadedFile.name + "##" + imageNameTimestamp)); //Adding timestamp to prevent duplicates
        const imagesCollRef = collection(firestore, `albums/${albumId}/images`);
        const albumDocRef = doc(firestore, `albums/${albumId}`);
        
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile); 
        uploadTask.on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                onProgress({progress: percentage});
            }, (err) => {
                onError(err);
            }, async () => { //Fired after complete upload
                const url = await getDownloadURL(storageRef);
                
                //Entry in Firestore in current Album
                addDoc(imagesCollRef, { name: uploadedFile.name, imageNameinStorage: (uploadedFile.name + "##" + imageNameTimestamp), url, createdAt: serverTimestamp() })
                    .then(function(newDocRef){
                        onSuccess({documentId: newDocRef.id, storageName: (uploadedFile.name + "##" + imageNameTimestamp), url, status: "ok"});
                    })
                    .catch(err => onError(err));
                //Increment collection count value
                updateDoc(albumDocRef, { imageCount : increment(1)});
            });
    }

    function handleRemove(file) {
        const storageRef = ref(storage);
        const imageDocRef = doc(firestore, `albums/${albumId}/images/${file.response.documentId}`);
        const albumDocRef = doc(firestore, `albums/${albumId}`);
        var storageFileRef = ref(storageRef, `images/${file.response.storageName}`);

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
    }
    
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    return (
        <>
            <Upload
                customRequest={uploadImages}
                accept=".png,.jpeg,.jpg"
                listType="picture-card"
                fileList={files}
                onPreview={handlePreview}
                onChange={({ fileList }) => setFiles(fileList)}
                onRemove={handleRemove}
                multiple
            >
                {uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            
        </>
    )
}