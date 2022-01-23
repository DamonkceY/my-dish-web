import './verticalScroll.scss'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperInterface } from 'swiper'
import 'swiper/swiper-bundle.min.css'

import SwiperCore, {
  Mousewheel,
} from 'swiper'

SwiperCore.use([Mousewheel])

const VerticalScroll:React.FC<{selected: any, elements: Array<any>, onChange: Function}> = ({selected, elements, onChange}) => {
  const [SWIPER, setSwiper] = useState<SwiperInterface | undefined>(undefined)
  useEffect(() => {
    if (!!SWIPER && selected) {
      SWIPER.slideTo(selected)
    }
  }, [SWIPER])
  return (
    <div className='verticalScrollContainer'>
      <Swiper
        onClick={(swipe) => !isNaN(swipe.clickedIndex) ? SWIPER?.slideTo(swipe.clickedIndex) : null}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(event) => onChange(event.activeIndex)}
        centeredSlides={true}
        mousewheel={true}
        direction='vertical'
        className='swiper-container'
        slidesPerView={3}
        slideActiveClass='activeSlide'
        slideNextClass='disabledSlide'
        slidePrevClass='disabledSlide'
      >
        {
          elements.map((item: any) => <SwiperSlide key={item}>{item}</SwiperSlide>)
        }
      </Swiper>
    </div>
  )
}

export default VerticalScroll
