import PublicLayout from '../../components/layout/PublicLayout'
import CarouselImage from '../../modules/public/carousel/carousel'
import AboutIndex from './about'
import UserProductIndex from './product'

function PublicIndex() {
    return (
        <PublicLayout>
            <div className='flex w-full flex-col gap-2'>
                <CarouselImage />
                <UserProductIndex />
                <AboutIndex />
            </div>
        </PublicLayout>
    )
}

export default PublicIndex