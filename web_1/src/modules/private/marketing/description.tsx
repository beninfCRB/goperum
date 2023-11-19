import { FunctionComponent } from 'react'
import { MarketingType } from '.';
import { Button, Descriptions, Tooltip } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { EditOutlined } from '@ant-design/icons';

interface DescriptionMarketingProps {
    data: MarketingType;
    onAdd?: () => void;
}

const DescriptionMarketing: FunctionComponent<DescriptionMarketingProps> = (props) => {
    const { data, onAdd: onEdit } = props

    return (
        <Descriptions
            title="Infomasi Marketing"
            bordered
            extra={
                onEdit &&
                <Tooltip title='Edit Data'>
                    <Button type="primary" shape="circle" onClick={onEdit}>
                        <EditOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <DescriptionsItem
                span={3}
                label='Nomor Induk Kependudukan'
            >
                {data.nik}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Nomor Karyawan'
            >
                {data.numbemployee}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Nama Lengkap'
            >
                {data.name}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Nomor Handphone'
            >
                {data.handphone}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Alamat'
            >
                {data.address}
            </DescriptionsItem>
            <DescriptionsItem
                span={3}
                label='Pekerjaan'
            >
                {data.work}
            </DescriptionsItem>
        </Descriptions>
    )
}

export default DescriptionMarketing