import NavBar from '../../sharedComponents/navBar/navBar'
import { useTranslation } from 'react-i18next'
import './market.scss'
import MarketSearchBar from './components/marketSearchBar/marketSearchBar'
import MarketsVerticalPagination from './components/marketsVerticalPagination/marketsVerticalPagination'
import MapCard from './components/map/Map'
import Footer from '../../sharedComponents/footer/footer'
import React, { useEffect } from 'react'
import SearchInput from '../../sharedComponents/searchInput/searchInput'
import { Paths } from '../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'

const Market = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'})
  }, [])
  const navigate = useNavigate()
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{position: 'relative'}}>
      <NavBar config={{isStatic: true, rightComponent: profile ,middleComponent: searchBar }}/>
      <div className='banner'>
        {t('MARKET.BANNER_TITLE')}
      </div>
      <div className='markets'>
        <MarketSearchBar/>
        <div className='paginationAndMapContainer'>
          <MarketsVerticalPagination/>
          <MapCard/>
        </div>
      </div>
    </div>
  )
}

export const searchBar = (
  <div style={{width:'50vw'}}>
    <SearchInput/>
  </div>
)


export default Market;
