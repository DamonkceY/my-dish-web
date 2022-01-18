import './shop.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import { useTranslation } from 'react-i18next'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import RestaurantCard from '../restaurant/components/restaurantCard/restaurantCard'
import { Paths } from '../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import ShoppingModal from '../../sharedComponents/modals/modal'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'

const Shop = () => {
  const { t } = useTranslation()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const isMounted = useRef(false)
  const [scrollIndicator, setScrollDownIndicator] = useState(false)
  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: deviceWidth > 919 ? '150px' : '25%' }
    if (tabSelected === 'DESSERTS') return { marginLeft: deviceWidth > 919 ? '300px' : '50%' }
    if (tabSelected === 'DRINKS') return { marginLeft: deviceWidth > 919 ? '450px' : '75%' }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    isMounted.current ? document.getElementById(tabSelected)?.scrollIntoView({ behavior: 'smooth' }) : (isMounted.current = true)

    let options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((e) => {
      setScrollDownIndicator(e[0].isIntersecting)
    }, options);
    observer.observe(document.getElementById('justAnId') as HTMLElement)
  }, [tabSelected])
  const array = ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']

  const navigate = useNavigate()
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )

  const shoppingCart = (
    <div className='shoppingCart' id='justAnId'>
      <button className={'btn success'} onClick={() => navigate(Paths.cart)}>Confirmer la réservation</button>
      <div className='horizontalSeparator' />
      {/*<span>Sélectionnez vos plats et ajoutez-les à votre réservation.</span>*/}
      <div className='shoppingListContainer'>
        <div className='shoppingItem'>
          <div className='cont'>
            <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
            <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
            <span className='delete'>Supprimer</span>
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>24,00 €</span>
        </div>
        <div className='shoppingItem'>
          <div className='cont'>
            <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
            <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
            <span className='delete'>Supprimer</span>
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>24,00 €</span>
        </div>
      </div>
      <div className='horizontalSeparator' />
      <div className='shoppingResult'>
        <span>Sous-total</span>
        <span>48,00 €</span>
      </div>
    </div>
  )

  return (
    <div id='rootEl' style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: deviceWidth > 768 ? profile : undefined,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />
      <div className='shopContainer'>
        <div className='shopHeader'>
          <span>Réservation • Joayo Haussmann • 2 Pers. sam. 8 août • 20:00</span>
        </div>
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
          { shoppingCart }
        </div>
      </div>
      <ShoppingModal />
      {
        (deviceWidth <= 919 && !scrollIndicator) && (
          <div className="scrollDownBox" onClick={() => {
            document.getElementById('justAnId')?.scrollIntoView({ behavior: "smooth" });

          }}>
            <span/>
            <span/>
            <span/>
          </div>
        )
      }
    </div>
  )
}

export default Shop
