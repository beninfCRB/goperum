import type { ThemeConfig } from 'antd';

const customTheme: ThemeConfig = {
    token: {
        colorPrimary: 'red'
    },
    components: {
        Button: {
            colorPrimary: 'red',
            algorithm: true, // Enable algorithm
        },
        Input: {
            colorPrimary: '#eb2f96',
            algorithm: true, // Enable algorithm
        }
    },
}

export default customTheme;