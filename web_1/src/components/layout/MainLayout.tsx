"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { ConfigProvider, Layout, Spin, theme } from 'antd';
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
            <Suspense fallback={<Spin size='large' />}>
                <Navbar menu={<MenuItem />} />
                <Layout style={{ flexDirection: 'initial' }}>
                    <Sidebar
                        menu={<MenuItem />}
                    />
                    <Layout>
                        <Content
                            className="content"
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
            </Suspense>
        </ConfigProvider>
    );
};

export default MainLayout