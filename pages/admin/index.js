import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Typography, Card } from 'antd';
import { firebaseApp } from '../../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Index() {
    
    useEffect(() => {
        try {
            const auth = getAuth(firebaseApp);
            const router = useRouter();
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    router.push('/admin/albums');
                }
                else {
                    router.push('/admin/login');
                }
            })
        }
        catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <div>
        </div>
    )
}
