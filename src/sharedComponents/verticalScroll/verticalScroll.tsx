import './verticalScroll.scss'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperInterface } from 'swiper'
import 'swiper/swiper-bundle.min.css'

import SwiperCore, {
  Mousewheel,
} from 'swiper'

SwiperCore.use([Mousewheel])

const VerticalScroll = () => {
  const [SWIPER, setSwiper] = useState<SwiperInterface | undefined>(undefined)
  useEffect(() => {
    if (!!SWIPER) {
      SWIPER.slideTo(3)
    }
  }, [SWIPER])
  return (
    <div className='verticalScrollContainer'>
      <Swiper
        onClick={(swipe) => !isNaN(swipe.clickedIndex) ? SWIPER?.slideTo(swipe.clickedIndex) : null}
        onSwiper={(swiper) => setSwiper(swiper)}
        // onSlideChange={(event) => console.log(event)}
        centeredSlides={true}
        mousewheel={true}
        direction='vertical'
        className='swiper-container'
        slidesPerView={3}
        slideActiveClass='activeSlide'
        slideNextClass='disabledSlide'
        slidePrevClass='disabledSlide'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    </div>
  )
}

export default VerticalScroll
