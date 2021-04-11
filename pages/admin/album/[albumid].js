import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/adminLayout';
import SingleAlbumView from '../../../comps/admin/singleAlbumView';
import { getAllAlbumIds } from '../../../hooks/common';

export default function AlbumView({ albumId }) {

    return (
        <AdminLayout>
            {(!albumId) ? (<div>Loading</div>): <SingleAlbumView albumId={albumId} />}
        </AdminLayout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllAlbumIds();
    console.log(paths);
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            albumId: params.albumid
        }
    }
}
