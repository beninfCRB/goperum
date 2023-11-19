import { PieChartOutlined, FolderOutlined, UserOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const MenuItem: FunctionComponent<MenuProps> = (props) => {
    const [current, setCurrent] = useState<string>('dashboard');
    const user = JSON.parse(localStorage.getItem("user") as string)
    const navigate = useNavigate();
    const [_menu, setMenu] = useState<Array<{
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    }>>()

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const MenuMaster = [
        getItem('Master', 'sub1', <FolderOutlined />, [
            getItem('Bank', 'bank', <InsertRowAboveOutlined />),
            getItem('Tipe DP', 'type-dp', <InsertRowAboveOutlined />),
            getItem('Metode Pembelian', 'purchase-method', <InsertRowAboveOutlined />),
            getItem('Metode Pembayaran', 'payment-method', <InsertRowAboveOutlined />),
            getItem('Status Transaksi', 'transaction-status', <InsertRowAboveOutlined />),
            getItem('Status Persetujuan', 'approval-status', <InsertRowAboveOutlined />),
            getItem('Jenis Pengguna', 'role-user', <InsertRowAboveOutlined />),
        ])
    ]

    useEffect(() => {
        if (user.role === 'admin') {
            setMenu([
                getItem('Dashboard', 'dashboard', <PieChartOutlined />),
                ...MenuMaster,
                getItem('Pelanggan', 'customer', <UserOutlined />),
                getItem('Marketing', 'marketing', <UserOutlined />),
                getItem('Produk', 'product', <InsertRowAboveOutlined />),
                getItem('Transaksi', 'transaction', <InsertRowAboveOutlined />),
                getItem('Pembayaran', 'payment', <InsertRowAboveOutlined />),
            ])
        }
        if (user.role === 'mkt') {
            setMenu([
                getItem('Dashboard', 'dashboard', <PieChartOutlined />),
                getItem('Produk', 'product', <InsertRowAboveOutlined />),
                getItem('Transaksi', 'transaction', <InsertRowAboveOutlined />),
                getItem('Pembayaran', 'payment', <InsertRowAboveOutlined />),
            ])
        }
        if (user.role === 'user') {
            setMenu([
                getItem('Produk', 'product', <InsertRowAboveOutlined />),
            ])
        }
    }, [user.role])

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };

    return (
        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[current]}
            onClick={onClick}
            items={_menu}
        />
    )
}

export default MenuItem