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
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            albumId: params.albumid
        },
        revalidate: 10
    }
}
