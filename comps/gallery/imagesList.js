import React from 'react'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import "lightgallery.js/dist/css/lightgallery.css";

export default function ImagesList({ images }) {

    let imageListComp;
    if(images.length === 0) {
        imageListComp = (
            <div className="d-flex justify-content-center" style={{width: '100%'}}>
                <p>No images found in this album</p>
            </div>
        );
    }
    else {
        imageListComp = images.map((image, index) => (
            <div key={index} className="album-image-cont">
                <LightgalleryItem group="images" src={image.url}>
                    <img className="album-image" src={image.url} />
                </LightgalleryItem>
            </div>
            )
        );
    }
    return (
        <LightgalleryProvider
            onBeforeOpen={() => console.info("onBeforeOpen")}
            onAfterOpen={() => console.info("onAfterOpen")}
        >
            <div className="image-list-cont">
                {imageListComp}
            </div>
        </LightgalleryProvider>
    )
}
