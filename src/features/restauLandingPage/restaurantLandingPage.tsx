import Footer from '../../sharedComponents/footer/footer'
import React, { useEffect, useState } from 'react'
import './restaurantLandingPage.scss'
import allWhiteLogo from '../../assets/logoBlanc.svg'

import landing2 from '../../assets/landingPage2.png'
import landing3 from '../../assets/landingPage3.png'
import landing4 from '../../assets/landingPage4.png'
import landing5 from '../../assets/landingPage5.png'

import _ressources from '../../assets/_ressources.svg'
import clients from '../../assets/clients.svg'
import temps from '../../assets/temps.svg'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'
import NavBar from '../../sharedComponents/navBar/navBar'

const RestaurantLandingPage = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isNavBar, setNavBar] = useState(false)
  useEffect(() => {
    window.scroll(0, 0)
    document.addEventListener('scroll', () => {
      setNavBar(window.scrollY > 300)
    })
    return () => {
      document.removeEventListener('scroll',() => null)
    }
  }, [])

  const buttons = (
    <div className='buttonsHead'>
      <span onClick={() => navigate(Paths.auth.index)}>{t('NAVBAR.GET_CONNECTED')}</span>
      <button
        onClick={() => navigate(Paths.auth.index + '/' + Paths.auth.register)}>{t('FOOTER.SUBSCRIBE')}</button>
    </div>
  )

  return (
    <div style={{ position: 'relative' }}>
      <div style={isNavBar ? {} : { display: 'none' }}>
        <NavBar config={{ rightComponent: buttons }} />
      </div>
      <div className='landingPage1'>
        <div className='head'>
          <img onClick={() => navigate(Paths.home)} className='clickable' draggable={false} src={allWhiteLogo} alt='' />
          {buttons}
        </div>
        <div className='middle'>
          <span>{t('RESTAURANT_LANDING.DEVELOP')}</span>
          <span className='orange'>{t('RESTAURANT_LANDING.WITH_MY_DISH')}</span>
          <span className='earnClients'>{t('RESTAURANT_LANDING.EARN_CLIENTS')}</span>
        </div>
        <div className='landingForm'></div>
      </div>
      <div className='profit'>
        <div className='profitItem'>
          <div className='textCont'>
            <span>{t('RESTAURANT_LANDING.PROFIT.TITLE1')}</span>
            <p>{t('RESTAURANT_LANDING.PROFIT.TEXT')}</p>
          </div>
          <img draggable={false} src={landing2} alt='' />
        </div>
        <div className='profitItem'>
          <img draggable={false} src={landing3} alt='' />
          <div className='textCont'>
            <span>{t('RESTAURANT_LANDING.PROFIT.TITLE2')}</span>
            <p>{t('RESTAURANT_LANDING.PROFIT.TEXT')}</p>
          </div>
        </div>
        <div className='profitItem'>
          <div className='textCont'>
            <span>{t('RESTAURANT_LANDING.PROFIT.TITLE3')}</span>
            <p>{t('RESTAURANT_LANDING.PROFIT.TEXT')}</p>
          </div>
          <img draggable={false} src={landing4} alt='' />
        </div>
      </div>
      <div className='whyMyDish'>
        <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.WHY')}</span>
        <div style={{ height: '90px' }} />
        <div className='whyProfitsCont'>
          <div className='whyProfit'>
            <img draggable={false} src={_ressources} alt='' />
            <div>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TITLE1')}</span>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TEXT1')}</span>
            </div>
          </div>
          <div className='whyProfit'>
            <img draggable={false} src={temps} alt='' />
            <div>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TITLE2')}</span>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TEXT2')}</span>
            </div>
          </div>
          <div className='whyProfit'>
            <img draggable={false} src={clients} alt='' />
            <div>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TITLE3')}</span>
              <span>{t('RESTAURANT_LANDING.WHY_MY_DISH.TEXT3')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='partnersCont'>
        <span>{t('RESTAURANT_LANDING.PARTNERS.TITLE')}</span>
        <div style={{ height: '50px' }} />
        <div className='partners'>
          <img draggable={false} src={landing5} alt='' />
          <div>
            <p>{t('RESTAURANT_LANDING.PARTNERS.TEXT')}</p>
            <span>{t('RESTAURANT_LANDING.PARTNERS.AUTHOR')}</span>
            <span>{t('RESTAURANT_LANDING.PARTNERS.ROLE')}</span>
          </div>
        </div>
      </div>
      <div style={{ height: '630px' }} />
      <Footer />
    </div>
  )
}

export default RestaurantLandingPage