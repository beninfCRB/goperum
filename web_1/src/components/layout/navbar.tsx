import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Dropdown, MenuProps, Space, message } from 'antd';
import { useState } from 'react'

import logo from "../../assets/react.svg";
import { useLogout } from '../../modules/auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../modules/profile';

export interface navbarProps {
    menu: JSX.Element
}

const Navbar = (props: navbarProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const navigate = useNavigate()
    const locale = JSON.parse(localStorage.getItem("user") as string)
    const user: UserType = JSON.parse(localStorage.getItem("user") as string)

    const onLogout = () => {
        useLogout()
        message.success('Log out successfully')
        navigate('/')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={'/admin/customer'}>
                    <UserOutlined /> Profile
                </Link>
            ),
        },
        {
            key: '2',
            danger: true,
            label: (
                <div onClick={onLogout}>
                    <LogoutOutlined /> Keluar
                </div>
            ),
        },
    ];

    return (
        <nav className="navbar bg-sky-900">
            <div className="grid">
                <div className="col-start-1 flex">
                    <Button
                        className="lg:hidden"
                        type="primary"
                        icon={<MenuOutlined />}
                        onClick={() => setVisible(true)}
                    />
                    <Drawer
                        title="Menu"
                        placement="left"
                        onClose={() => setVisible(false)}
                        getContainer={false}
                        open={visible}
                    >
                        {props.menu}
                    </Drawer>
                    <a href="/"><img src={logo} className="logo hover:scale-110" alt="logo" /></a>
                </div>
                <div
                    className='col-end-7 text-white text-right mr-4'
                >
                    <Dropdown
                        className='w-10'
                        menu={{ items }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className='hover:text-red-400 hover:scale-110'>
                                {
                                    locale.avatar ?
                                        <Avatar size={'default'} icon={<UserOutlined />} /> :
                                        <Avatar size={'default'} icon={<UserOutlined />} />
                                }
                                {user.name}
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}

export default Navbar