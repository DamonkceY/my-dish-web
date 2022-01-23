import React, { useEffect, useRef, useState } from 'react'
import SearchComp from './components/search/searchComp'
import NavBar from '../../sharedComponents/navBar/navBar'
import HowTo from './components/howTo/howTo'
import './mainHome.scss'
import Slider from './components/sliders/slider'
import { SliderConfigInterface } from '../../app/utils/interfaces/sliderConfigInterface'
import { SLIDES } from './mockToBeDeleted'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import 'react-multi-carousel/lib/styles.css'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { capitalizeFirstLetter } from '../../app/utils/func/commonFuncs'
import { selectMainHomeAnnounces } from '../../app/store/storeModules/announces/announcesSlice'
import { getMainHomeList } from '../../app/store/storeModules/announces/announcesService'
import { announcesEndpoints } from '../../app/utils/endpoints'

const MainHome = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const reservation = useRef([])
  const delivery = useRef([])
  const news = useRef([])
  const specialities = useRef([])
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    Promise.all([
      // getMainHomeList({ url: announcesEndpoints.mainHome }).then((res: any) => {
      //   reservation.current = res.data.filter((item: any) => item.restaurantType === 'RESERVATION')[0].list
      //   delivery.current = res.data.filter((item: any) => item.restaurantType === 'LIVRAISON')[0].list
      // }),
      getMainHomeList({ url: announcesEndpoints.restaurantsSpecialities }).then((res: any) => {
        specialities.current = res.data
      }),
      getMainHomeList({ url: announcesEndpoints.newRestaurants }).then((res: any) => {
        news.current = res.data
        reservation.current = res.data.filter((item: any) => item.type === 'RESERVATION')
        delivery.current = res.data.filter((item: any) => item.type === 'LIVRAISON')
      }),
    ]).then(() => {
      setSliderConfig([
        {
          name: 'HOME.SLIDES.BOOK_A_TABLE',
          paginationUrl: '',
          moreDetailPath: '/market/reserve',
          slidesList: reservation.current,
        },
        {
          name: 'HOME.SLIDES.DELIVERY',
          paginationUrl: '',
          moreDetailPath: '/market/delivery',
          slidesList: delivery.current,
        },
        {
          name: 'HOME.SLIDES.CHOOSE_YOUR_SPECIALITY',
          isSimple: true,
          paginationUrl: '',
          moreDetailPath: '/market/speciality',
          slidesList: specialities.current,
        },
        {
          name: 'HOME.SLIDES.NEW_ON_MY_DISH',
          paginationUrl: '',
          moreDetailPath: '/market/newOnMyDish',
          slidesList: news.current,
        },
      ])
    })
  }, [])
  const [slidersConfig, setSliderConfig] = useState<Array<SliderConfigInterface>>([])
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

export const NavBarRightComp: React.FC<{ disableRestaurantBtn?: boolean }> = ({ disableRestaurantBtn }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const connectedUser = useAppSelector(selectConnectedUser)

  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>{capitalizeFirstLetter(connectedUser?.firstName as string || '')}</span>
    </div>
  )

  return (
    <div className='rightCompCont'>
      {!disableRestaurantBtn && <span onClick={() => navigate(Paths.restaurantHome)} className='clickable'>{t('FOOTER.ADD_RESTAURANT')}</span>}
      {(deviceWidth > 768 && !connectedUser) ? <button className='btn success'
                                                       onClick={() => navigate(Paths.auth.index)}>{t('NAVBAR.GET_CONNECTED')}</button> : (
        (deviceWidth > 768 && !!connectedUser) && profile
      )}
    </div>
  )
}

export default MainHome
