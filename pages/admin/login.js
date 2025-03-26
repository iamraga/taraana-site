import React, { useState } from 'react';
import { Row, Col, Button, Typography, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../utils/firebase';
import router from 'next/router';

const { Title } = Typography;

export default function Login() {

    const auth = getAuth(firebaseApp);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    async function handleLogin() {
        const userWithCredentials = await signInWithEmailAndPassword(auth, email, password);
        if(userWithCredentials.user) {
            router.push("/admin/albums");
        }
    }

    return (
        <Row justify="center" align="middle" className="login-cont">
            <Col span={10}>
                <Row justify="center" className="login-inner-cont">
                    <Col>
                        <Title level={2} className="login-title" style={{fontWeight: '200'}}>Taraana Admin console</Title>
                    </Col>
                    <Col span={24} className="form-cont">
                        <Row justify="center">
                            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
                                <Input 
                                    size="large" 
                                    className="login-input" 
                                    placeholder="Email" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                />
                            </Col>
                            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
                                <Input.Password 
                                    size="large" 
                                    className="login-input" 
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}  
                                />
                            </Col>
                            <Col xs={20} sm={18} md={18} lg={16} xl={16}>
                                <Button type="primary" className="login-submit" onClick={handleLogin}>Login</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
