import React, { useEffect, useState } from 'react'
import SearchComp from './components/search/searchComp'
import NavBar from '../../sharedComponents/navBar/navBar'
import HowTo from './components/howTo/howTo'
import './mainHome.scss'
import Slider from './components/sliders/slider'
import { SliderConfigInterface } from '../../app/utils/interfaces/sliderConfigInterface'
import { SLIDES } from './mockToBeDeleted'
import Footer from '../../sharedComponents/footer/footer'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'
import 'react-multi-carousel/lib/styles.css'
import { getDocumentWidth } from '../../app/utils/func/commonFuncs'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import MobileNavigation from '../../sharedComponents/mobileNavigation/mobileNavigation'

const MainHome = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [slidersConfig] = useState<Array<SliderConfigInterface>>([
    {
      name: 'HOME.SLIDES.BOOK_A_TABLE',
      paginationUrl: '',
      moreDetailPath: '/market/reserve',
      slidesList: SLIDES,
    },
    {
      name: 'HOME.SLIDES.DELIVERY',
      paginationUrl: '',
      moreDetailPath: '/market/delivery',
      slidesList: SLIDES,
    },
    {
      name: 'HOME.SLIDES.CHOOSE_YOUR_SPECIALITY',
      isSimple: true,
      paginationUrl: '',
      moreDetailPath: '/market/speciality',
      slidesList: SLIDES,
    },
    {
      name: 'HOME.SLIDES.NEW_ON_MY_DISH',
      paginationUrl: '',
      moreDetailPath: '/market/newOnMyDish',
      slidesList: SLIDES,
    },
  ])
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{
        rightComponent: <NavBarRightComp />,
      }} />
      <div style={{ height: deviceWidth > 768 ? '100px' : '70px' }} />
      <SearchComp />
      <HowTo />
      {
        slidersConfig.map((item) => (
          <div className='sidesPadding'>
            <div style={{ margin: `${deviceWidth > 768 ? '50px' : '30px'} 5vw` }} className='horizontalSeparator' />
            <Slider config={item} />
          </div>
        ))
      }
    </div>
  )
}

const NavBarRightComp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  return (
    <div className='rightCompCont'>
      <span onClick={() => navigate(Paths.restaurantHome)} className='clickable'>{t('FOOTER.ADD_RESTAURANT')}</span>
      {deviceWidth > 768 && <button onClick={() => navigate(Paths.auth.index)}>{t('NAVBAR.GET_CONNECTED')}</button>}
    </div>
  )
}

export default MainHome
