import { PieChartOutlined, FolderOutlined, UserOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const MenuItem: FunctionComponent<MenuProps> = (props) => {
    const navigate = useNavigate();

    return (
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            onClick={({ key }) => {
                navigate(key)
            }}
        >
            <Menu.Item key={'dashboard'} className='hover:scale-110' icon={<PieChartOutlined />}>
                <Link to={'dashboard'}>
                    Dashboard
                </Link>
            </Menu.Item>
            <Menu.SubMenu key={'sub1'} title='Master' className='hover:scale-110' icon={<FolderOutlined />}>
                <Menu.Item key={'bank'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'bank'}>
                        Bank
                    </Link>
                </Menu.Item>
                <Menu.Item key={'type-dp'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'type-dp'}>
                        Tipe DP
                    </Link>
                </Menu.Item>
                <Menu.Item key={'payment-method'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'payment-method'}>
                        Metode Pembayaran
                    </Link>
                </Menu.Item>
                <Menu.Item key={'transaction-status'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'transaction-status'}>
                        Status Transaksi
                    </Link>
                </Menu.Item>
                <Menu.Item key={'approval-status'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'approval-status'}>
                        Status Persetujuan
                    </Link>
                </Menu.Item>
                <Menu.Item key={'role-user'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'role-user'}>
                        Jenis Pengguna
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key={'customer'} className='hover:scale-110' icon={<UserOutlined />}>
                <Link to={'customer'}>
                    Pelanggan
                </Link>
            </Menu.Item>
            <Menu.Item key={'marketing'} className='hover:scale-110' icon={<UserOutlined />}>
                <Link to={'marketing'}>
                    Marketing
                </Link>
            </Menu.Item>
            <Menu.Item key={'product'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                <Link to={'product'}>
                    Produk
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuItem