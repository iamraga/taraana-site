import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PictureOutlined } from '@ant-design/icons';
import { getDoc } from '@firebase/firestore';

export default function EachAlbum({ album }) {

    const [coverImageUrl, setCoverImageUrl] = useState("");

    useEffect(function() {
        if(album.cover) {
        getDoc(album.cover)
            .then(function(image) {
                setCoverImageUrl(image.data().url);
            });
        }
        else {
            setCoverImageUrl("/assets/images/taraana-logo-gold.png");
        }
    }, [album]);
    
    return (
        <div className="gallery-unit col-lg-4 col-md-4 col-sm-6 col-xs-12 container_foto">
            <Link 
                href={{
                    pathname: "/gallery",
                    query: {id: album.id}
                }}
            >
                <a style={{display: 'flex', alignItems: 'center'}}>
                    <div className="ver_mas text-center flex">
                        <button>View Album</button>
                    </div>
                    <article className="d-flex align-items-center">
                        <div className="col-9">
                            <h2>{album.name}</h2>
                        </div>
                        <div className="col-3">
                            <div className="gallery-unit-count d-flex align-items-center justify-content-center"><PictureOutlined style={{marginRight: '0.5em'}} />{album.imageCount}</div>
                        </div>
                    </article>
                    <img src={coverImageUrl} alt="" />
                </a>
            </Link>
        </div>
    )
}
