import './shop.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import { useTranslation } from 'react-i18next'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import RestaurantCard from '../restaurant/components/restaurantCard/restaurantCard'
import Footer from '../../sharedComponents/footer/footer'
import { Paths } from '../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'
import ShoppingModal from '../../sharedComponents/modals/modal'

const Shop = () => {
  const { t } = useTranslation()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const isMounted = useRef(false)
  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: '150px' }
    if (tabSelected === 'DESSERTS') return { marginLeft: '300px' }
    if (tabSelected === 'DRINKS') return { marginLeft: '450px' }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

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
      <div className='shopContainer'>
        <div className='shopHeader'>
          <span>Réservation • Joayo Haussmann • 2 Pers. sam. 8 août • 20:00</span>
        </div>
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
          </div>
          <div style={getMargin()} className='underline' />
          <div className='horizontalSeparator' />
        </div>
        <div className='shoppingCartContainer'>
          <div className='dishesContainer'>
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
          <div className='shoppingCart'>
            <button onClick={() => navigate(Paths.cart)}>Confirmer la réservation</button>
            <div className='horizontalSeparator' />
            {/*<span>Sélectionnez vos plats et ajoutez-les à votre réservation.</span>*/}
            <div className='shoppingListContainer'>
              <div className='shoppingItem'>
                <div className='cont'>
                  <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
                  <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
                  <span className='delete'>Supprimer</span>
                </div>
                <span>24,00 €</span>
              </div>
              <div className='shoppingItem'>
                <div className='cont'>
                  <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
                  <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
                  <span className='delete'>Supprimer</span>
                </div>
                <span>24,00 €</span>
              </div>
            </div>
            <div className='horizontalSeparator' />
            <div className='shoppingResult'>
              <span>Sous-total</span>
              <span>48,00 €</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '720px' }} />
      <Footer />
      <ShoppingModal/>
    </div>
  )
}

export default Shop
