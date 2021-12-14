import React, { useState } from 'react'
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

const MainHome = () => {
  const [slidersConfig] = useState<Array<SliderConfigInterface>>([
    {
      name: 'HOME.SLIDES.BOOK_A_TABLE',
      paginationUrl: '',
      moreDetailPath: '',
      slidesList: SLIDES
    },
    {
      name: 'HOME.SLIDES.DELIVERY',
      paginationUrl: '',
      moreDetailPath: '',
      slidesList: SLIDES
    },
    {
      name: 'HOME.SLIDES.CHOOSE_YOUR_SPECIALITY',
      isSimple: true,
      paginationUrl: '',
      moreDetailPath: '',
      slidesList: SLIDES
    },
    {
      name: 'HOME.SLIDES.NEW_ON_MY_DISH',
      paginationUrl: '',
      moreDetailPath: '',
      slidesList: SLIDES
    },
  ])
  return (
    <div>
      <NavBar config={{
        rightComponent: <NavBarRightComp/>
      }}/>
      <SearchComp/>
      <HowTo/>
      {
        slidersConfig.map((item) => (
          <div>
            <div className='horizontalSeparator'/>
            <Slider config={item}/>
          </div>
        ))
      }
      <Footer/>
    </div>
  )
}

const NavBarRightComp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='rightCompCont'>
      <span className='clickable'>{ t('FOOTER.ADD_RESTAURANT') }</span>
      <button onClick={() => navigate(Paths.auth.index)}>{t('NAVBAR.GET_CONNECTED')}</button>
    </div>
  )
}

export default MainHome;
