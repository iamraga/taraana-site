import React, { useState } from 'react';
import { Image, Row, Col } from 'antd';
import useFirestore from '../../hooks/useFirestore';

export default function AlbumImages({ albumId }) {
    const images = useFirestore(`albums/${albumId}/images`).docs;

    if(images.length === 0) return (<div>No images found in this album</div>);
    
    return (
        <Image.PreviewGroup>
            <Row gutter={16}>
                {images.map(image => (
                    <Col span={8} key={image.id} style={{padding: '8px'}}>
                        <Image
                            width={300}
                            height={300}
                            src={image.url}
                            alt={image.name}
                        />
                    </Col>
                ))}
            </Row>
        </Image.PreviewGroup>
    )
}
