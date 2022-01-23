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
import { useNavigate } from 'react-router-dom'

import { Swiper as SwiperInterface } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { capitalizeFirstLetter } from '../../../../app/utils/func/commonFuncs'
import { setFavoriteRestaurant } from '../../../../app/store/storeModules/announces/announcesService'
import { selectConnectedUser } from '../../../../app/store/storeModules/authentication/authenticationSlice'
import { getProfileByToken } from '../../../../app/store/storeModules/authentication/authenticationService'
import { Paths } from '../../../../app/utils/paths'

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
export const SliderElement: React.FC<{ element: any }> = ({ element }) => {
  const navigate = useNavigate()
  const [isFavorite, setFavorite] = useState(false)
  const connectedUser = useAppSelector(selectConnectedUser)
  const favoriteCondition = () => connectedUser?.favoriteRestaurants?.find((item: any) => item?._id === (element?._id || element?.restaurantId))
  useEffect(() => {
    setFavorite(favoriteCondition)
  }, [connectedUser])
  const setFav = () => {
    if(connectedUser){
      setFavoriteRestaurant({ id: element?._id || element?.restaurantId, favoriteState: isFavorite }).then((res) => {
        getProfileByToken(true).then()
      })
      setFavorite(!isFavorite)
    }
  }

  const goToRestaurant = () => {
    connectedUser ? navigate(`/restaurant/${element?.restaurantId || element?._id}`) : navigate(Paths.auth.index)
  }
  return (
    <div className='sliderElement clickable'>
      <div className='sliderImage'>
        <img onClick={goToRestaurant} draggable={false} className='cardImage' src={element.image || element.imageUrl}
             alt='' />
        <img onClick={setFav} draggable={false} className='heart' src={isFavorite ? filledHeart : emptyHeart} alt='' />
      </div>
      <div className='sliderDetail' onClick={goToRestaurant}>
        <div className='detail'>
          <span className='name'>{element?.name}</span>
          {
            element?.avgPrice && element?.avgPrice[0] && (
              <span className='price'>Prix moyen {element.avgPrice[0]} €</span>
            )
          }
          {
            element?.specialty && (
              <span className='speciality'>
                {
                  element?.specialty?.map((item: any, index: number) => `${index !== 0 ? ', ' : ''}${item}`)
                }
              </span>
            )
          }
        </div>
        <div className='rating'>
          {element?.nbrrating || element?.globalRating || 0} <span className='outOfTen'>/ 10</span>
        </div>
      </div>
    </div>
  )
}
const SimpleSliderElement: React.FC<{ element: any }> = ({ element }) => {
  const width = useAppSelector(selectDeviceWidth)
  const getHeight = () => {
    return width > 481 ? '200px' : `${width - 100}px`
  }
  return (
    <div className='simpleSliderElement clickable'>
      <img
        height={getHeight()}
        id={`image_${element.rate}`}
        draggable={false}
        className='cardImage'
        src={element.img}
        alt=''
      />
      <label>{capitalizeFirstLetter(element.name as string)}</label>
    </div>
  )
}

export default Slider
