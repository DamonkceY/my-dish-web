import './mobileNavigation.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'


const MobileNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('HOME')
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [HEIGHT, setHeight] = useState('12vh')
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(!location.pathname.includes('auth'))
    setHeight(location.pathname.includes('restaurantHome') ? 'unset' : '12vh')
    if(location.pathname === '/home') setSelectedTab('HOME')
    if(location.pathname === '/searchResult') setSelectedTab('SEARCH')
    if(location.pathname.includes('rofile')) setSelectedTab('PROFILE')
    if(location.pathname === '/cart') setSelectedTab('CART')
  }, [location])

  const goTo = (name: string, to: string) => {
    setSelectedTab(name);
    navigate(to);
  }

  return (
    isVisible ? (
      <div>
        <div style={{height: HEIGHT}}/>
        <div className='navigationMainCont'>
          <div onClick={() => goTo('HOME', Paths.home)} className={`homeIcon ${selectedTab === 'HOME'}`} />
          <div onClick={() => goTo('SEARCH', Paths.searchResult)} className={`searchIcon ${selectedTab === 'SEARCH'}`} />
          <div onClick={() => goTo('CART', Paths.cart)} className={`shoppingCartIcon ${selectedTab === 'CART'}`} />
          <div onClick={() => goTo('PROFILE', Paths.mobileProfile)} className={`profileIcon ${selectedTab === 'PROFILE'}`} />
        </div>
      </div>
    ) : (
      <div/>
    )
  )
}

export default MobileNavigation
