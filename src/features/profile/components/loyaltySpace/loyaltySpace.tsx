import React from 'react'
import './loyaltySpace.scss'

const LoyaltySpace = () => {
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span>Mon espace fidélité</span>
      </div>
      <div style={{margin: '20px 0'}} className='horizontalSeparator'/>
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
