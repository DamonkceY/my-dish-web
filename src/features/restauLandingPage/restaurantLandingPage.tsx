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
import PhoneNumberInput from '../../sharedComponents/phoneNumberInput/phoneNumberInput'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'

const RestaurantLandingPage = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth);
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [HEIGHT, setHeight] = useState('')

  const [isNavBar, setNavBar] = useState(false)
  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'})
    document.addEventListener('scroll', () => {
      setNavBar(window.scrollY > 300)
    })
    return () => {
      document.removeEventListener('scroll',() => null)
    }
  }, [])

  useEffect(() => {
    if (deviceWidth < 720) setHeight('988px')
    else if (deviceWidth < 1024) setHeight('654px')
    else setHeight('820px')
  }, [deviceWidth])

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
        <NavBar config={{ rightComponent: deviceWidth > 720 ? buttons : undefined }} />
      </div>
      <div className='landingPage1'>
        <div className='head'>
          <img onClick={() => navigate(Paths.home)} className='clickable' draggable={false} src={allWhiteLogo} alt='' />
          {deviceWidth > 720 && buttons}
        </div>
        <div className='middle'>
          <span>{t('RESTAURANT_LANDING.DEVELOP')}</span>
          <span className='orange'>{t('RESTAURANT_LANDING.WITH_MY_DISH')}</span>
          <span className='earnClients'>{t('RESTAURANT_LANDING.EARN_CLIENTS')}</span>
        </div>
        <div className='landingForm'>
          <div className='headerForm'>
            <span className='title'>
              Optimisez votre activité et renforcez la notoriété de votre marque.
            </span>
            <span className='miniTitle'>
              Recevez les commandes et et gérez-les facilement sur notre plateforme.
            </span>
          </div>

          <div className='formCont'>
            <input placeholder='Non du restaurant' type='text'/>
            <input placeholder='Adresse du restaurant' type='text'/>
            <input placeholder='Nom' type='text'/>
            <input placeholder='Prénom' type='text'/>
            <PhoneNumberInput
              config={{ label: '', placeholder: 'Numéro de téléphone portable' }} />
            <input placeholder='Adresse e-mail' type='text'/>
            <input placeholder='Nombre de restaurants' type='text'/>
            <input placeholder='Cuisine' type='text'/>
          </div>
          <div className='footerCont'>
            <span>
              En cliquant sur Envoyer une demande, vous acceptez les <span className='qsd clickable'>Conditions</span> et la <span className='qsd clickable'>Politique de confidentialité</span> de mydish.
            </span>
            <button>Envoyer une demande</button>
          </div>
        </div>
      </div>
      <div style={{backgroundColor: '#f4f4f4', height: HEIGHT}}/>
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
        <div style={{ height: '45px' }} />
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
    </div>
  )
}

export default RestaurantLandingPage
