import './mobileNavigation.scss'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'


const MobileNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('HOME')
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [HEIGHT, setHeight] = useState('12vh')
  useEffect(() => {
    setIsVisible(!location.pathname.includes('auth'))
    setHeight(location.pathname.includes('restaurantHome') ? 'unset' : '12vh')
  }, [location])

  const goTo = (name: string, to?: string) => {
    setSelectedTab(name);
  }

  return (
    isVisible ? (
      <div>
        <div style={{height: HEIGHT}}/>
        <div className='navigationMainCont'>
          <div onClick={() => goTo('HOME', Paths.home)} className={`homeIcon ${selectedTab === 'HOME'}`} />
          <div onClick={() => goTo('SEARCH')} className={`searchIcon ${selectedTab === 'SEARCH'}`} />
          <div onClick={() => goTo('CART')} className={`shoppingCartIcon ${selectedTab === 'CART'}`} />
          <div onClick={() => goTo('PROFILE')} className={`profileIcon ${selectedTab === 'PROFILE'}`} />
        </div>
      </div>
    ) : (
      <div/>
    )
  )
}

export default MobileNavigation
