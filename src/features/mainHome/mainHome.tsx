import React from 'react'
import SearchComp from './components/search/searchComp'
import NavBar from '../../sharedComponents/navBar/navBar'
import HowTo from './components/howTo/howTo'
import './mainHome.scss'
import Slider from './components/sliders/slider'

const MainHome = () => {
  return (
    <div>
      <NavBar />
      <SearchComp/>
      <HowTo/>
      <div className='horizontalSeparator'/>
      <Slider/>
      <div className='horizontalSeparator'/>
    </div>
  )
}

export default MainHome
