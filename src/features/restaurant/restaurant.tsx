import './restaurant.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import Footer from '../../sharedComponents/footer/footer'
import { useTranslation } from 'react-i18next'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import emptyHeart from '../../assets/emptyHeart.svg'
import close from '../../assets/close.svg'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ModalReservation from './components/reservationModal/reservationModal'
import RestaurantCard from './components/restaurantCard/restaurantCard'
import RestaurantMap from './components/restaurantMap/restaurantMap'
import ShoppingModal from '../../sharedComponents/modals/modal'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'

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

const Restaurant = () => {
  const { t } = useTranslation()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const isMounted = useRef(false)
  const [shoppingModal, setShoppingModal] = useState(false)

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])

  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: '150px' }
    if (tabSelected === 'DESSERTS') return { marginLeft: '300px' }
    if (tabSelected === 'DRINKS') return { marginLeft: '450px' }
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
      <NavBar config={{ isStatic: true, rightComponent: profile, middleComponent: searchBar }} />
      <div className='headerRestaurant'>
        <div className='detailContainer'>
          <span className='title'>Joayo Haussmann</span>
          <div className='details'>
            <span className='rateComments'>
              <span className='rate'>9.2<span className='outOfTen'>/ 10</span></span>
              <span className='comments'>144</span>
            </span>
            <span>Italien • Pizza</span>
            <span>Prix moyen  175 €</span>
            <span>10 rue Gustave Flaubert, 75017 Paris</span>
          </div>
          <div>
            <img draggable={false} src={emptyHeart} alt='' />
          </div>
        </div>
        <RestaurantMap />
      </div>
      <div style={{ padding: '18px 5vw' }}>
        <div className='tabsContainer'>
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
            <button onClick={() => setShoppingModal(true)}>Réservez une table</button>
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
      <div style={{ height: '720px' }} />
      <Footer />

      <Modal
        open={shoppingModal}
        onClose={() => setShoppingModal(false)}
      >
        <Box sx={style}>
          <ModalReservation closeEvent={() => setShoppingModal(false)} />
        </Box>
      </Modal>
      <ShoppingModal/>

    </div>
  )
}

export default Restaurant
