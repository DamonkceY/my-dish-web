import React, { useEffect, useRef, useState } from 'react'
import './slider.scss'

import emptyHeart from '../../../../assets/emptyHeart.svg'
import filledHeart from '../../../../assets/filledHeart.svg'
import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'
import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'

import { SliderConfigInterface } from '../../../../app/utils/interfaces/sliderConfigInterface'
import { useTranslation } from 'react-i18next'
import Carousel from 'react-multi-carousel'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../app/utils/paths/Paths'

const Slider: React.FC<{ config: SliderConfigInterface }> = ({ config }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [arrows, setArrows] = useState({
    left: leftArrowInactive,
    right: rightArrowActive,
  })
  const carouselEl = useRef<Carousel | null>(null)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1380 },
      items: config?.isSimple ? 7 : 4,
      slidesToSlide: config?.isSimple ? 7 : 4,
    },
    smallerDesktop: {
      breakpoint: { max: 1380, min: 920 },
      items: config?.isSimple ? 5 : 4,
      slidesToSlide: config?.isSimple ? 5 : 4,
    },
    tablet: {
      breakpoint: { max: 920, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  const moveSlides = (direction: number) => {
    if (carouselEl.current && carouselEl.current?.state) {
      carouselEl.current?.[direction > 0 ? 'next' : 'previous'](
        carouselEl.current?.state.currentSlide + direction * carouselEl.current?.state.slidesToShow,
      )
    }

  }

  const getSlidesNumber = () => {
    if (carouselEl.current && carouselEl.current?.state) return carouselEl.current?.state?.slidesToShow
    return 0
  }

  return (
    <div className='sliderContainer'>
      <div className='sliderHeader'>
        <span className='sliderName'> {t(config.name)} </span>
        <div className='sliderActions'>
          <span onClick={() => navigate(config.moreDetailPath)} className='clickable'>{t('SEE_MORE')}</span>
          <span style={{ padding: '9px' }} />
          <div className='arrowsContainer'>
            <img onClick={() => moveSlides(-1)} draggable={false} src={arrows.left} alt='' />
            <span style={{ padding: '3.5px' }} />
            <img onClick={() => moveSlides(1)} draggable={false} src={arrows.right} alt='' />
          </div>
        </div>
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        arrows={false}
        responsive={responsive}
        ref={carouselEl}
        additionalTransfrom={-10 * getSlidesNumber()}
      >
        {
          config.slidesList.map((element: any) => (
            config.isSimple ? <SimpleSliderElement element={element} /> :
              <SliderElement element={element} />
          ))
        }
      </Carousel>
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
