import React, { useState } from 'react'
import pizza from '../../../../assets/pizza.png'
import personne from '../../../../assets/seConnecterNoire.svg'
import calendar from '../../../../assets/calendrier.svg'
import './myReservations.scss'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import backArrow from '../../../../assets/back.svg'
import { useNavigate } from 'react-router-dom'

const MyReservations = () => {
  const [tabSelected, setTabSelected] = useState('1')
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate()

  const getMargin = () => {
    if (tabSelected === '1') return { marginLeft: '0px' }
    if (tabSelected === '2') return { marginLeft: deviceWidth > 768 ? '150px' : '50%' }
  }
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
          <span>Mes réservations</span>
        </span>
      </div>
      <div style={{ margin: '20px 0' }} className='horizontalSeparator' />
      <div className='reservationTabsContainer'>
        <div className='tabs'>
          <div className='cont'>
            <span onClick={() => setTabSelected('1')}
                  className={tabSelected === '1' ? 'active tab' : 'tab'}
            >
              À venir
            </span>
            <span onClick={() => setTabSelected('2')}
                  className={tabSelected === '2' ? 'active tab' : 'tab'}
            >
              Anciennes
            </span>
          </div>
        </div>
        <div style={getMargin()} className='underline' />
        <div className='horizontalSeparator' />
      </div>
      <div className='cardsContainer'>
        <div className='cardContainer'>
          <img className='cardImage' draggable={false} src={pizza} alt='' />
          <div className={`detailCardCont ${tabSelected === '2' && 'opacity'}`}>
            <div className='head'>
              <span className='title'>Joayo Haussmann</span>
              <span className='address'>10 rye Gustave Flaubert, 75017. P</span>
            </div>
            <div>
              <div className='inlineDetails'>
                <img src={calendar} alt='' />
                <span>Sam. 8 août • 20:00</span>
                <img src={personne} alt='' />
                <span>2</span>
              </div>
              <div className='horizontalSeparator' />
              <span className='graySpan'>Italien • Pizza</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyReservations
