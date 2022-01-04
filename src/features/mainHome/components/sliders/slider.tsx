import React, { useRef, useState } from 'react'
import './slider.scss'

import emptyHeart from '../../../../assets/emptyHeart.svg'
import filledHeart from '../../../../assets/filledHeart.svg'
import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'
import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'

import { SliderConfigInterface } from '../../../../app/utils/interfaces/sliderConfigInterface'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Swiper as SwiperInterface } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'

const Slider: React.FC<{ config: SliderConfigInterface }> = ({ config }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [SWIPER, setSwiper] = useState<SwiperInterface | undefined>(undefined)
  const [arrows, setArrows] = useState({
    left: leftArrowInactive,
    right: rightArrowActive,
  })

  const moveSlides = (direction: number) => {
    direction > 0 ? SWIPER?.slideNext() : SWIPER?.slidePrev()
  }

  const setArrowsEvent = () => {
    setArrows({
      left: SWIPER?.isBeginning ? leftArrowInactive : leftArrowActive,
      right: SWIPER?.isEnd ? rightArrowInactive : rightArrowActive,
    })
  }

  const getSlidesNumber = () => {
    if (deviceWidth >= 1600) return config.isSimple ? 7 : 4
    if (deviceWidth >= 1380) return config.isSimple ? 5 : 4
    if (deviceWidth >= 1024) return 4
    if (deviceWidth >= 768) return 3
    if (deviceWidth >= 480) return 2
    return 1
  }

  return (
    <div className='sliderContainer'>
      <div className='sliderHeader'>
        <span className='sliderName'> {t(config.name)} </span>
        <div className='sliderActions'>
          <span onClick={() => navigate(config.moreDetailPath)} className='clickable'>{t('SEE_MORE')}</span>
          {deviceWidth >= 480 && <span style={{ padding: '9px' }} />}
          {
            deviceWidth >= 480 && (
              <div className='arrowsContainer'>
                <img onClick={() => moveSlides(-1)} draggable={false} src={arrows.left} alt='' />
                <span style={{ padding: '3.5px' }} />
                <img onClick={() => moveSlides(1)} draggable={false} src={arrows.right} alt='' />
              </div>
            )
          }
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={setArrowsEvent}
        slidesPerView={getSlidesNumber()}
        spaceBetween={30}
      >
        {
          config.slidesList.map((item: any) => (
            <SwiperSlide>
              {config.isSimple ? <SimpleSliderElement element={item} /> :
                <SliderElement element={item} />}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

// TODO slides element interface
export const SliderElement: React.FC<{ element: any, isFavorite?: boolean }> = ({ element, isFavorite }) => {
  const navigate = useNavigate()
  return (
    <div className='sliderElement clickable' onClick={() => navigate('/restaurant/ss')}>
      <div className='sliderImage'>
        <img draggable={false} className='cardImage' src={element.image} alt='' />
        <img draggable={false} className='heart' src={isFavorite ? filledHeart : emptyHeart} alt='' />
      </div>
      <div className='sliderDetail'>
        <div className='detail'>
          <span className='name'>{element?.name}</span>
          <span className='price'>Prix moyen {element.price} €</span>
          <span className='speciality'>{element.speciality}</span>
        </div>
        <div className='rating'>
          {element.rate} <span className='outOfTen'>/ 10</span>
        </div>
      </div>
    </div>
  )
}
const SimpleSliderElement: React.FC<{ element: any }> = ({ element }) => {
  const getHeight = () => {
    return '200px'
  }
  return (
    <div className='simpleSliderElement clickable'>
      <img
        height={getHeight()}
        id={`image_${element.rate}`}
        draggable={false}
        className='cardImage'
        src={element.image}
        alt=''
      />
      <label>{element.speciality}</label>
    </div>
  )
}

export default Slider
