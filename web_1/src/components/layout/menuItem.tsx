import { PieChartOutlined, FolderOutlined, UserOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const MenuItem = () => {
    const navigate = useNavigate();

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
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            onClick={({ key }) => {
                navigate(key)
            }}
            items={[
                getItem('Dashboard', 'dashboard', <PieChartOutlined />),
                getItem('Master', 'sub1', <FolderOutlined />, [
                    getItem('Pelanggan', 'customer', <UserOutlined />),
                    getItem('Blok', 'area', <InsertRowAboveOutlined />),
                ])
            ]}
        />
    )
}

export default MenuItem