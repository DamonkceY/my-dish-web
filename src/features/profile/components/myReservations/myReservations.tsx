import React, { useEffect, useState } from 'react'
import pizza from '../../../../assets/pizza.png'
import personne from '../../../../assets/seConnecterNoire.svg'
import calendar from '../../../../assets/calendrier.svg'
import './myReservations.scss'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import backArrow from '../../../../assets/back.svg'
import { useNavigate } from 'react-router-dom'
import { getMyReservationsList } from '../../../../app/store/storeModules/common/commonService'
import EmptyMessage from '../../../../sharedComponents/emptyMessage/emptyMessage'
import moment from 'moment'

const MyReservations = () => {
  const [tabSelected, setTabSelected] = useState('1')
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate()
  const [orders, setOrders] = useState({
    newOrders: [],
    oldOrders: []
  })

  const getMargin = () => {
    if (tabSelected === '1') return { marginLeft: '0px' }
    if (tabSelected === '2') return { marginLeft: deviceWidth > 768 ? '150px' : '50%' }
  }

  useEffect(() => {
    getMyReservationsList().then((res: any) => {
      setOrders({
        newOrders: res?.data?.newOrders || [],
        oldOrders: res?.data?.oldOrders || [],
      })
    })
  }, [])
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
        {
          (tabSelected === '1' ? orders.newOrders : orders?.oldOrders).map((item: any, index: number) => (
            <div key={index} className='cardContainer'>
              <img className='cardImage' draggable={false} src={item?.restaurant?.imageUrl} alt='' />
              <div className={`detailCardCont`}>
                <div className='head'>
                  <span className='title'>{item?.restaurant?.name}</span>
                  <span className='address'>{item?.restaurant?.address}</span>
                </div>
                <div>
                  <div className='inlineDetails'>
                    <img src={calendar} alt='' />
                    <span>{moment(item?.orderedForDate).format('MMM Do YYYY HH:MM:SS')}</span>
                    <img src={personne} alt='' />
                    <span>{item?.peopleNumber}</span>
                  </div>
                  <div className='horizontalSeparator' />
                  <span className='graySpan'>{item?.restaurant?.category}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        (tabSelected === '1' ? orders.newOrders : orders?.oldOrders).length === 0 && (
          <EmptyMessage config={{
            title: 'Aucune réservation',
            text: 'Vous n\'avez pas de réservation en ce moment'
          }}/>
        )
      }

    </div>
  )
}

export default MyReservations
