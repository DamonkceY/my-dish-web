import './mobileNavigation.scss'
import { useState } from 'react'

const MobileNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('HOME')

  const goTo = (name: string) => {
    setSelectedTab(name);
  }

  return (
    <div className='navigationMainCont'>
      <div onClick={() => goTo('HOME')} className={`homeIcon ${selectedTab === 'HOME'}`} />
      <div onClick={() => goTo('SEARCH')} className={`searchIcon ${selectedTab === 'SEARCH'}`} />
      <div onClick={() => goTo('CART')} className={`shoppingCartIcon ${selectedTab === 'CART'}`} />
      <div onClick={() => goTo('PROFILE')} className={`profileIcon ${selectedTab === 'PROFILE'}`} />
    </div>
  )
}

export default MobileNavigation
