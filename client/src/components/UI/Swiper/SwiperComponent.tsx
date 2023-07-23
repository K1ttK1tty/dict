import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
interface ISwiperComponent {
    dinamicClassName: string;
    array?: string[];
    setActiveIndex: (state: number) => void;
}
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
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
            modules={[Navigation]}
            centeredSlides={true}
            grabCursor={true}
            // onActiveIndexChange={}
            onRealIndexChange={e => setActiveIndex(e.activeIndex)}
        >
            {
                array?.map(element => <SwiperSlide key={element}>{element}</SwiperSlide>)
            }

        </Swiper>
    );
};
export default SwiperComponent;