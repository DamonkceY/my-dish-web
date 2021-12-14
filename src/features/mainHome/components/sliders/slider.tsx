import React, { useEffect, useState } from 'react'
import './slider.scss'

import emptyHeart from '../../../../assets/emptyHeart.svg'
import filledHeart from '../../../../assets/filledHeart.svg'
import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'
import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'

import { SliderConfigInterface } from '../../../../app/utils/interfaces/sliderConfigInterface'
import { useTranslation } from 'react-i18next'
import {
  getElementWidth, getGridConfig,
} from '../../../../app/utils/func/commonFuncs'

const Slider: React.FC<{ config: SliderConfigInterface }> = ({ config }) => {
  const { t } = useTranslation()
  const [arrows, setArrows] = useState({
    left: leftArrowInactive,
    right: rightArrowActive,
  })
  const [gridConfig, setGridConfig] = useState<{ gap: string, elWidth: string }>({ gap: '10px', elWidth: '200px' })
  useEffect(() => {
    getElementWidth('sliderContainer').then((res: number) => {
      setGridConfig(getGridConfig(res))
    })
  }, [])

  return (
    <div className='sliderContainer'>
      <div className='sliderHeader'>
        <span className='sliderName'> {t(config.name)} </span>
        <div className='sliderActions'>
          <span onClick={() => null} className='clickable'>{t('SEE_MORE')}</span>
          <span style={{ padding: '9px' }} />
          <div className='arrowsContainer'>
            <img draggable={false} src={arrows.left} alt='' />
            <span style={{ padding: '3.5px' }} />
            <img draggable={false} src={arrows.right} alt='' />
          </div>
        </div>
      </div>
      <div
        id={'sliderContainer'}
        className={`sliders`}
        style={config?.isSimple ? { gridGap: gridConfig.gap, gridTemplateColumns: 'unset' } : {}}
      >
        {
          config.slidesList.map((element: any) => (
            config.isSimple ? <SimpleSliderElement element={element} width={gridConfig.elWidth} /> : <SliderElement element={element} />
          ))
        }
      </div>
    </div>
  )
}

// TODO slides element interface
const SliderElement: React.FC<{ element: any }> = ({ element }) => {
  return (
    <div className='sliderElement clickable'>
      <div className='sliderImage'>
        <img draggable={false} className='cardImage' src={element.image} alt='' />
        <img draggable={false} className='heart' src={emptyHeart} alt='' />
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
const SimpleSliderElement: React.FC<{ element: any, width: string }> = ({ element, width }) => {
  return (
    <div style={{width: width}} className='simpleSliderElement clickable'>
      <img
        width={width}
        height={width}
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
