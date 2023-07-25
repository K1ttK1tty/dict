import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
interface ISwiperComponent {
    dinamicClassName: string;
    array?: string[];
    setActiveIndex: (state: number) => void;
}
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';

const SwiperComponent: FC<ISwiperComponent> = function (
    {
        dinamicClassName,
        array,
        setActiveIndex
    }) {
    return (
        <Swiper
            className={dinamicClassName}
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={30}
            direction={'horizontal'}
            navigation={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            centeredSlides={true}
            grabCursor={true}
            mousewheel={true}
            keyboard={true}
            onRealIndexChange={e => setActiveIndex(e.activeIndex)}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                425: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
            }}
        >
            {
                array?.map(element => <SwiperSlide key={element}>{element}</SwiperSlide>)
            }

        </Swiper>
    );
};
export default SwiperComponent;