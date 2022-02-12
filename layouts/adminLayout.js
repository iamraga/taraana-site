import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import { UserOutlined, CloudUploadOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { firebaseApp } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {

    const router = useRouter();
    let [collapsed, setCollapsed] = useState(false);
    let [selectedKey, setSelectedKey] = useState('1');
    
    useEffect(function() {
        try {
            const auth = getAuth(firebaseApp);
            onAuthStateChanged(auth, (user) => {
                if(!user) {
                    router.push('/admin/login');
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    }, [])
    
    let currentPath = router.pathname.split('/')[2];
    const tabsMeta = {
        "albums": '1',
        "profile": '2',
        "enquiries": '3',
        "events": '4'
    }
    currentPath = (!currentPath || currentPath == "" || currentPath === "album") ? "albums" : currentPath;
    
    return (
        <Layout>
            <Layout>
                <Header id="admin-header-cont">
                    <div className="admin-header">Taraana Admin console</div>
                </Header>
            </Layout>
            <Layout style={{height: "100%", minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                    <Menu theme="dark" defaultSelectedKeys={tabsMeta[currentPath]} mode="inline" style={{paddingTop: '80px', fontSize: '14px'}}>
                        <Menu.Item key="1" icon={<CloudUploadOutlined />} onClick={() => setSelectedKey('1')}>
                            <Link href="/admin/">
                                <a>Gallery</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => setSelectedKey('2')}>
                            <Link href="/admin/profile">
                                <a>Profile</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<QuestionCircleOutlined />} onClick={() => setSelectedKey('3')}>
                            <Link href="/admin/enquiries">
                                <a>Enquiries</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<EyeOutlined />} onClick={() => setSelectedKey('4')}>
                            <Link href="/admin/events">
                                <a>Events</a>
                            </Link>
                        </Menu.Item> 
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ marginTop: '84px' }}>
                        <div className="site-layout-background" style={{ padding: '24px 56px', minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
