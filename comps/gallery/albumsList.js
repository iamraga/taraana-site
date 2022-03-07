import React, { useEffect } from 'react';
import { logEvent } from '@firebase/analytics';
import EachAlbum from './eachAlbum';
import { analytics } from '../../utils/firebase';

export default function AlbumsList({ albums }) {

    useEffect(function() {
        console.log("event");
        logEvent(analytics, 'visited_gallery');
    }, []);

    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity

    const albumsComp = albums.map(album => {
        return (
            <EachAlbum key={album.id} album={album} />
        )
    });
    return (
        <div className="d-flex justify-content-between flex-wrap">
            {albumsComp}
        </div>
    )
}
