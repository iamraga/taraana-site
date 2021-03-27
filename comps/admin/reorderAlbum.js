import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { RetweetOutlined } from '@ant-design/icons'

export default function ReorderAlbum({ albums }) {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <Button icon={<RetweetOutlined style={{fontSize: '16px'}} />} type="primary" style={{fontSize: '16px', height: 'auto'}} onClick={showDrawer}>
                Reorder Albums
            </Button>
            <Drawer
                title="Reorder albums"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                width={'25%'}
            >
                {albums.map(album => (
                    <div key={album.id}>
                        {album.name}
                    </div>
                ))}
            </Drawer>
        </div>
    )
}
