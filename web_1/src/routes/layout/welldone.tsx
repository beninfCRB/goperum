import { SmileOutlined } from '@ant-design/icons'
import { Result } from 'antd'

interface welldoneType {
    content: string
}

const WellDone = (props: welldoneType) => {
    return (
        <Result
            icon={<SmileOutlined />}
            title={props.content}
        />
    )
}

export default WellDone