"use client"

import { ConfigProvider, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import customTheme from '../theme/theme';
import Sidebar from './sidebar';
import MenuItem from './menuItem';
import Navbar from './navbar';
const { Content } = Layout;

const MainLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <ConfigProvider
            theme={{ ...customTheme }}
        >
            <Navbar menu={<MenuItem />} />
            <Layout style={{ flexDirection: 'initial' }}>
                <Sidebar
                    menu={<MenuItem />}
                />
                <Layout
                    className="bg-[url('assets/image/bg-login.jpeg')] bg-cover bg-center"
                >
                    <Content
                        className="content opacity-95"
                        style={{
                            margin: '16px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout