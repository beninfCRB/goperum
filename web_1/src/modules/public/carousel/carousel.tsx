import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

function CarouselImage() {
    return (
        <Carousel autoplay className='w-full h-full'>
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    )
}

export default CarouselImage