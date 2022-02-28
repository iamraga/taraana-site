import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import EachAlbum from './eachAlbum';

export default function AlbumsList({ albums }) {

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
