import React from 'react'
import './myFavorite.scss'
import { SliderElement } from '../../../mainHome/components/sliders/slider'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
const MyFavorite = () => {
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span>Mes favoris</span>
      </div>
      <div className='horizontalSeparator'/>
      <div className='favoritesCont'>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
      </div>
    </div>
  )
}

export default MyFavorite
