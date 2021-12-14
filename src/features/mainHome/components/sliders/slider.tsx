import React, { useState } from 'react'
import './slider.scss'
import { SLIDES } from '../../mockToBeDeleted'

import emptyHeart from '../../../../assets/emptyHeart.svg'
import filledHeart from '../../../../assets/filledHeart.svg'

import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'

import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'

const Slider = () => {
  const [arrows, setArrows] = useState({
    left: leftArrowInactive,
    right: rightArrowActive
  });

  const [slides] = useState(SLIDES)

  return (
    <div className='sliderContainer'>
      <div className='sliderHeader'>
        <span className='sliderName'>Réservez une  table</span>
        <div className='sliderActions'>
          <span>Voir plus</span>
          <span style={{padding: '9px'}}/>
          <div className='arrowsContainer'>
            <img src={arrows.left} alt='' />
            <span style={{padding: '3.5px'}}/>
            <img src={arrows.right} alt='' />
          </div>
        </div>
      </div>
      <div className='sliders'>
        {
          SLIDES.map((item: any) => (
            <div className='sliderElement'>
              <div className='sliderImage'>
                <img className='cardImage' src={item.image} alt='' />
                <img className='heart' src={emptyHeart} alt=''/>
              </div>
              <div className='sliderDetail'>
                <div className='detail'>
                  <span className='name'>{item?.name}</span>
                  <span className='price'>Prix moyen {item.price} €</span>
                  <span className='speciality'>{item.speciality}</span>
                </div>
                <div className='rating'>
                  {item.rate} <span className='outOfTen'>/ 10</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Slider
