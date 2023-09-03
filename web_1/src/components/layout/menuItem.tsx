import { PieChartOutlined, FolderOutlined, UserOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const MenuItem = () => {
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
                <Menu.Item key={'customer'} className='hover:scale-110' icon={<UserOutlined />}>
                    <Link to={'customer'}>
                        Pelanggan
                    </Link>
                </Menu.Item>
                <Menu.Item key={'area'} className='hover:scale-110' icon={<InsertRowAboveOutlined />}>
                    <Link to={'area'}>
                        Pelanggan
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}

export default MenuItem