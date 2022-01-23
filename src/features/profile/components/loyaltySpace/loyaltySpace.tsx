import React, { useEffect, useState } from 'react'
import './loyaltySpace.scss'
import backArrow from '../../../../assets/back.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { useNavigate } from 'react-router-dom'
import { getMyPromoCodes } from '../../../../app/store/storeModules/common/commonService'
import EmptyMessage from '../../../../sharedComponents/emptyMessage/emptyMessage'

const LoyaltySpace = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate()
  const [promoCodes, setPromoCodes] = useState<Array<any>>([])

  useEffect(() => {
    getMyPromoCodes().then((res: any) => {
      setPromoCodes(res?.data as Array<any>)
    })
  }, [])
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
        {
          promoCodes.map((item, index: number) => (
            <div key={index} className='loyalty'>
              <div className='desc'>
                <span className='title'>Joayo Haussmann</span>
                <span>Italien • Pizza</span>
              </div>
              <span className='qsd'>FID1287</span>
            </div>
          ))
        }
      </div>
      {
        promoCodes.length === 0 && (
          <EmptyMessage config={{
            title: 'Aucun code promo',
            text: 'Vous n\'avez pas de code promotionnel en ce moment'
          }}/>
        )
      }
    </div>
  )
}

export default LoyaltySpace
