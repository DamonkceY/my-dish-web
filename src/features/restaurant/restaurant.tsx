import './restaurant.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import { useTranslation } from 'react-i18next'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import emptyHeart from '../../assets/emptyHeart.svg'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ModalReservation from './components/reservationModal/reservationModal'
import RestaurantCard from './components/restaurantCard/restaurantCard'
import RestaurantMap from './components/restaurantMap/restaurantMap'
import ShoppingModal from '../../sharedComponents/modals/modal'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import MoreDetailModal from './components/moreDetailModal/moreDetailModal'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

const Restaurant = () => {
  const { t } = useTranslation()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const isMounted = useRef(false)
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [shoppingModal, setShoppingModal] = useState({ mobile: deviceWidth <= 768, isOpen: false })
  const [moreDetail, setMoreDetail] = useState({ mobile: deviceWidth <= 768, isOpen: false })

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

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])

  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: deviceWidth > 919 ? '150px' : '25%' }
    if (tabSelected === 'DESSERTS') return { marginLeft: deviceWidth > 919 ? '300px' : '50%' }
    if (tabSelected === 'DRINKS') return { marginLeft: deviceWidth > 919 ? '450px' : '75%' }
  }

  useEffect(() => {
    isMounted.current ? document.getElementById(tabSelected)?.scrollIntoView({ behavior: 'smooth' }) : (isMounted.current = true)
  }, [tabSelected])

  const array = ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']

  const navigate = useNavigate()
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      { deviceWidth > 768 && <NavBar config={{
        isStatic: true,
        rightComponent: profile,
        middleComponent: searchBar,
      }} />}
      <div className='headerRestaurant'>
        <div className='detailContainer'>
          <span onClick={() => deviceWidth <= 768 && navigate(-1)}>
            {deviceWidth <= 768 && <span className='backArrowRestaurant' />}
            <span className='title'>Joayo Haussmann</span>
          </span>
          <div className='details'>
            <span className='rateComments'>
              <span className='rate'>9.2<span className='outOfTen'>/ 10</span></span>
              <span className='comments'>144</span>
            </span>
            <span>Italien • Pizza</span>
            <span>Prix moyen  175 €</span>
            <span>10 rue Gustave Flaubert, 75017 Paris • <span className='clickable moreInfo'
                                                               onClick={() => setMoreDetail({
                                                                 isOpen: true,
                                                                 mobile: deviceWidth <= 768,
                                                               })}>Plus d'informations</span></span>
          </div>
          <div>
            <img draggable={false} src={emptyHeart} alt='' />
          </div>
        </div>
        {deviceWidth > 626 && <RestaurantMap id={'restaurantPosition'} />}
      </div>
      {
        deviceWidth < 920 && (
          <div className='restaurantTabsContainer'>
            <div style={{ padding: '0 5vw', display: 'flex', justifyContent: 'end' }} className='tabs'>
              <button className={'btn success'} style={{ margin: '18px 0 0 0' }} onClick={() => setShoppingModal({
                isOpen: true,
                mobile: deviceWidth <= 768,
              })}>Réservez une table
              </button>
            </div>
          </div>
        )
      }
      <div style={{ padding: '18px 5vw' }}>
        <div className='restaurantTabsContainer'>
          <div className='tabs'>
            <div className='cont'>
              <span onClick={() => setTabSelected('ENTRIES')}
                    className={tabSelected === 'ENTRIES' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.ENTRIES')}
              </span>
              <span onClick={() => setTabSelected('DISHES')}
                    className={tabSelected === 'DISHES' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DISHES')}
              </span>
              <span onClick={() => setTabSelected('DESSERTS')}
                    className={tabSelected === 'DESSERTS' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DESSERTS')}
              </span>
              <span onClick={() => setTabSelected('DRINKS')}
                    className={tabSelected === 'DRINKS' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DRINKS')}
              </span>
            </div>
            {deviceWidth > 919 && <button className='btn success' onClick={() => setShoppingModal({
              isOpen: true,
              mobile: deviceWidth <= 768,
            })}>Réservez une table</button>}
          </div>
          <div style={getMargin()} className='underline' />
          <div className='horizontalSeparator' />
        </div>

        {
          array.map((item) => (
            <div className='optionsContainer'>
              <span id={item}>{t(`RESTAURANT.${item}`)}</span>
              <div style={{ margin: '40px' }} />
              <div className='cards'>
                {SLIDES.map((item) => {
                  return (
                    <RestaurantCard item={item} />
                  )
                })}
              </div>
            </div>
          ))
        }
      </div>

      {/* Modals */}

      <Modal
        open={shoppingModal.isOpen && !shoppingModal.mobile}
        onClose={() => setShoppingModal({
          isOpen: false,
          mobile: deviceWidth <= 768,
        })}
      >
        <Box sx={style}>
          <ModalReservation closeEvent={() => setShoppingModal({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })} />
        </Box>
      </Modal>
      <Modal
        open={moreDetail.isOpen && !moreDetail.mobile}
        onClose={() => setMoreDetail({
          isOpen: false,
          mobile: deviceWidth <= 768,
        })}
      >
        <Box sx={style}>
          <MoreDetailModal closeEvent={() => setMoreDetail({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })} />
        </Box>
      </Modal>

      <ShoppingModal />

      {/* bottom sheet */}
      <BottomSheet onDismiss={() => {
        setMoreDetail({
          isOpen: false,
          mobile: deviceWidth <= 768,
        })
        setShoppingModal({
          isOpen: false,
          mobile: deviceWidth <= 768,
        })
      }} open={(moreDetail.isOpen && moreDetail.mobile) || (shoppingModal.isOpen && shoppingModal.mobile)}>
        {
          moreDetail.isOpen && (
            <MoreDetailModal closeEvent={() => setMoreDetail({
              isOpen: false,
              mobile: deviceWidth <= 768,
            })} />
          )
        }
        {
          shoppingModal.isOpen && (
            <ModalReservation closeEvent={() => setShoppingModal({
              isOpen: false,
              mobile: deviceWidth <= 768,
            })} />
          )
        }
      </BottomSheet>

    </div>
  )
}

export default Restaurant
