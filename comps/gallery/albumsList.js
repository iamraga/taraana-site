import React, { useEffect } from 'react';
import { logEvent } from '@firebase/analytics';
import EachAlbum from './eachAlbum';
import { analytics } from '../../utils/firebase';

export default function AlbumsList({ albums }) {

    useEffect(function() {
        logEvent(analytics, 'visited_gallery');
    }, []);

    const albumOrder = albums.filter(album => (album.id === "album-order"));
    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity

    //Reordering albums based on album-order
    const sortedAlbums = albumOrder[0] ? albumOrder[0].order.map(eachAlbum => {
        return albums.filter(dbAlbum => dbAlbum.id === eachAlbum.id)[0];
    }) : albums;

    const albumsComp = sortedAlbums.map(album => {
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
