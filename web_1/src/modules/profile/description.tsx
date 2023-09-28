import { Descriptions } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { UserType } from '.'
import { FunctionComponent } from 'react'

interface DescriptionProfileProps {
    data: UserType;
}

const DescriptionProfile: FunctionComponent<DescriptionProfileProps> = (props) => {
    const { data } = props

    return (
        <Descriptions
            title="Infomasi Akun"
            bordered
        >
            <DescriptionsItem
                span={3}
                label='Username'
            >
                {data.name}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Email'
            >
                {data.email}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Role'
            >
                {data.RoleUser?.name}
            </DescriptionsItem>
        </Descriptions>
    )
}

export default DescriptionProfile