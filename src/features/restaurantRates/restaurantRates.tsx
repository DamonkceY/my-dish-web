import './restaurantRates.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import { NavBarRightComp } from '../mainHome/mainHome'
import { searchBar } from '../market/market'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { getRestaurantById } from '../../app/store/storeModules/announces/announcesService'
import avatar from '../../assets/avatar2.svg'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { EditAddRateComp } from '../profile/components/myRates/myRates'
import moment from 'moment'
import EmptyMessage from '../../sharedComponents/emptyMessage/emptyMessage'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '40px',
  boxShadow: 24,
}

const RestaurantRates = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    getRates(true)
  }, [])

  const getRates = (changed?: boolean) => {
    setIsOpen(false)
    if (changed) {
      getRestaurantById({ id: window.location.pathname.slice(17) }).then((res: any) => {
        res.data?.rating?.sort((curr: any, prev: any) => {
          if (moment(curr.updatedAt).isAfter(moment(prev.updatedAt))) return -1
          if (moment(curr.updatedAt).isBefore(moment(prev.updatedAt))) return 1
          return 0
        })
        setSelectedRestaurant(res?.data)
      }).catch(() => {
        navigate(Paths.home)
      })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: <NavBarRightComp disableRestaurantBtn={true} />,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />
      {!!selectedRestaurant && <div className={'ratesMainContainer'}>
        <span className={'boldLabelTitle'}>
          {
            selectedRestaurant?.name
          }
          {' ' + selectedRestaurant?.globalRating}
          <span>/10</span>
        </span>
        <br />
        <br />
        <div className={'RATES'}>
          <div className={'ratesHeader'}>
            <span>
              Avis ({selectedRestaurant?.rating?.length || 0})
            </span>
            <button onClick={() => setIsOpen(true)} className={'btn success'}>
              Écrivez un avis
            </button>
          </div>
          {
            selectedRestaurant?.rating?.map((item: any, index: number) => (
              <div key={index}>
                <div style={{ margin: '15px 0' }} className={'horizontalSeparator'} />
                <RateComp item={item} />
              </div>
            ))
          }
          {
            selectedRestaurant?.rating?.length === 0 && (
              <EmptyMessage config={{
                title: 'Il n\'y a pas de commentaires en ce moment',
              }} />
            )
          }
        </div>
      </div>}
      {
        deviceWidth > 768 ? (
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Box sx={style}>
              <EditAddRateComp item={selectedRestaurant} submitEvent={getRates} />
            </Box>
          </Modal>
        ) : (
          <BottomSheet open={isOpen} onDismiss={() => setIsOpen(false)}>
            <EditAddRateComp item={selectedRestaurant} submitEvent={getRates} />
          </BottomSheet>
        )
      }
    </div>
  )
}

export const RateComp: React.FC<{ item: any }> = ({ item }) => {

  return (
    <div className={'detailRate'}>
      <div className={'detailRateHeader'}>
        <div className={'detailRateHeaderUser'}>
          <img className={'avatar'} src={avatar} alt='' />
          <div style={{ width: '20px' }} />
          <div>
            <span className={'userName'}>{item?.user?.firstName + ' ' + item?.user?.lastName}</span>
            <span className={'date'}>{moment(item?.updatedAt).format('MMM Do YYYY HH:mm')}</span>
          </div>
        </div>
        <span className={'boldRate'}>{item?.globalRating}<span className={'nope'}>/10</span></span>
      </div>
      <div className={'detailRateBody'}>
        <div style={{ height: '20px' }} />
        <span className={'title'}>
          {item?.comment}
        </span>
        <div style={{ height: '20px' }} />
        <span className={'body'}>
          {
            item?.detail
          }
        </span>
      </div>
    </div>
  )
}

export default RestaurantRates
