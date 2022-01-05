import React from 'react'
import './loyaltySpace.scss'
import backArrow from '../../../../assets/back.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { useNavigate } from 'react-router-dom'

const LoyaltySpace = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate()
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
          <span>Mon espace fidélité</span>
        </span>
      </div>
      <div style={{ margin: '20px 0' }} className='horizontalSeparator' />
      <div className='cardLoyaltyContainer'>

        <div className='loyalty'>
          <div className='desc'>
            <span className='title'>Joayo Haussmann</span>
            <span>Italien • Pizza</span>
          </div>
          <span className='qsd'>FID1287</span>
        </div>
        <div className='loyalty'>
          <div className='desc'>
            <span className='title'>Joayo Haussmann</span>
            <span>Italien • Pizza</span>
          </div>
          <span className='qsd'>FID1287</span>
        </div>
        <div className='loyalty'>
          <div className='desc'>
            <span className='title'>Joayo Haussmann</span>
            <span>Italien • Pizza</span>
          </div>
          <span className='qsd'>FID1287</span>
        </div>


      </div>
    </div>
  )
}

export default LoyaltySpace
