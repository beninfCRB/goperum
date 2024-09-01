import { Button, Card, Col, Divider, Empty, Flex, Row, Typography } from 'antd';
import { FunctionComponent } from 'react'
import { ProductType } from '.';
import { formatRupiah } from '../../../utils/rupiah';

export interface FlexProductProps {
    data: Array<ProductType>;
    onLoading: boolean;
}

const FlexProduct: FunctionComponent<FlexProductProps> = (props) => {
    const span = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 8
    };



    return (
        <Row gutter={[16, 16]} justify="space-evenly" className='p-4'>
            {
                props.data.length > 0 ?
                    props.data.map((value, index) => (
                        <Col {...span} key={index}>
                            <Card hoverable bodyStyle={{ padding: 0, overflow: 'hidden' }} loading={props.onLoading} className='p-4 shadow-2xl hover:bg-slate-400'>
                                <img
                                    className='max-w-full rounded-3xl'
                                    alt="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                <Typography.Title level={2} className='text-center'>
                                    {value.name}
                                </Typography.Title>
                                <Divider />
                                <p><b>Spesifikasi:</b> {value.description}</p>
                                <p><b>Harga:</b> {formatRupiah(value.price)}</p>
                                <Button type="primary" href="https://ant.design" target="_blank">
                                    BOOKING
                                </Button>
                            </Card>
                        </Col>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Row>
    )
}

export default FlexProduct