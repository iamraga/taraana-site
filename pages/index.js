import React from 'react';
import Link from 'next/link';

export default function Index() {
    return (
        <div>
            Hello app
            <div>
                <Link href='/admin'>
                    <a>Go to Admin console</a> 
                </Link>
            </div>
            <div>
                <Link href='/contact'>
                    <a>Go to Contact Us</a> 
                </Link>
            </div>
        </div>
    )
}
