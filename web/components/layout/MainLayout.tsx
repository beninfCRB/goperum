"use client"
import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PieChartOutlined,
    FolderOutlined,
    InsertRowAboveOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, ThemeConfig, theme } from 'antd';
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    return (
        <Layout style={{ flexDirection: 'initial' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo grid place-content-center">
                    <h2 className='text-white text-2xl'>GOPERUM</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        router.replace(key)
                    }}
                    items={[
                        getItem('Dashboard', 'dashboard', <PieChartOutlined />),
                        getItem('Master', 'sub1', <FolderOutlined />, [
                            getItem('Pelanggan', 'customer', <UserOutlined />),
                            getItem('Blok', 'area', <InsertRowAboveOutlined />),
                        ])
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout