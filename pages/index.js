import React from 'react';
import { Row, Col, Button } from 'antd';
import Link from 'next/link';

export default function Index() {
    return (
        <div>
            <Row className="site-logo" justify="center" align="middle">
                <Col span={12}>
                    <Row justify="center" style={{textAlign: "center"}}>
                        <Col span={24}><img src="/Logo.png" alt="Logo" /></Col>
                        <Col span={24} className="construction-text">This site is under construction!</Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Button>
                                <Link href='/admin'>
                                    <a>Go to Admin console</a> 
                                </Link>
                            </Button>
                        </Col>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Button>
                                <Link href='/contact'>
                                    <a>Go to Enquiries page</a> 
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
