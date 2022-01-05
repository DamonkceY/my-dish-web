import React from 'react'
import './myFavorite.scss'
import { SliderElement } from '../../../mainHome/components/sliders/slider'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
import backArrow from '../../../../assets/back.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { useNavigate } from 'react-router-dom'
const MyFavorite = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate();
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
        <span>Mes favoris</span>
        </span>
      </div>
      <div style={{margin: '20px 0'}} className='horizontalSeparator'/>
      <div className='favoritesCont'>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
        <SliderElement isFavorite={true} element={SLIDES[0]}/>
      </div>
    </div>
  )
}

export default MyFavorite
