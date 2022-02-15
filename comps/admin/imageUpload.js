import React from 'react';
import { UploadOutlined } from "@ant-design/icons";

export default function ImageUpload() {

    const handleImages = (e) => {
    }

    return (
        <div>
            <Form>
                <Form.Item
                    name="uploadImage"
                    label="uploadImage"
                    valuePropName="imageList"
                    getValueFromEvent={handleImages}
                >
                    <Upload name="image" listType="picture">
                        <Button icon={<UploadOutlined />}> Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    )
}
