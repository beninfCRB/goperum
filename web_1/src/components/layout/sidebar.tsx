import Sider from 'antd/es/layout/Sider'
import { FunctionComponent } from 'react'



export interface sideBarProps {
    menu: JSX.Element
}

const Sidebar: FunctionComponent<sideBarProps> = (props) => {
    return (
        <Sider
            className="sidebar shadow overflow-y-auto overflow-x-hidden"
            breakpoint={"lg"}
            theme="light"
            collapsedWidth={0}
            trigger={null}
        >
            <div className="logo grid place-content-center">
                <h2 className='text-white text-2xl'>GOPERUM</h2>
            </div>
            {props.menu}
        </Sider>
    )
}

export default Sidebar