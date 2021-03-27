import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../layouts/adminLayout';
import SingleAlbumView from '../../../comps/admin/singleAlbumView';

export default function AlbumView() {
    const router = useRouter();
    // const albumId = router.query.albumid;
    const [albumId, setAlbumId] = useState(null);

    useEffect(() => {
        setAlbumId(router.query.albumid);
    }, [router.query]);

    return (
        <AdminLayout>
            {(!albumId) ? (<div>Loading</div>): <SingleAlbumView albumId={albumId} />}
        </AdminLayout>
    )
}
