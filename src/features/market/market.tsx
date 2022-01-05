import NavBar from '../../sharedComponents/navBar/navBar'
import { useTranslation } from 'react-i18next'
import './market.scss'
import MarketSearchBar from './components/marketSearchBar/marketSearchBar'
import MarketsVerticalPagination from './components/marketsVerticalPagination/marketsVerticalPagination'
import MapCard from './components/map/Map'
import Footer from '../../sharedComponents/footer/footer'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../sharedComponents/searchInput/searchInput'
import { Paths } from '../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'

const Market = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)

  const [tabSelected, setTabSelected] = useState('1')
  const getMargin = () => {
    if (tabSelected === '1') return { marginLeft: '0' }
    if (tabSelected === '2') return { marginLeft: '50%' }
  }
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])

  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: deviceWidth > 768 ? profile : undefined,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />
      <div className='banner'>
        {t('MARKET.BANNER_TITLE')}
      </div>
      <div className='markets'>
        <MarketSearchBar />
        <div>
          {
            deviceWidth < 1024 && (
              <div className='marketTabsContainer'>
                <div className='tabs'>
                  <div className='cont' style={{width: '100%'}}>
                    <span onClick={() => setTabSelected('1')}
                          className={tabSelected === '1' ? 'active tab' : 'tab'}
                    >
                      Liste
                    </span>
                    <span onClick={() => setTabSelected('2')}
                          className={tabSelected === '2' ? 'active tab' : 'tab'}
                    >
                      Carte
                    </span>
                  </div>
                </div>
                <div style={getMargin()} className='underline' />
                <div className='horizontalSeparator' />
              </div>
            )
          }
          <div className='paginationAndMapContainer'>
            {tabSelected === '1' && <MarketsVerticalPagination />}
            {
              (deviceWidth > 1023 || tabSelected === '2') && <MapCard />
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export const searchBar = (
  <div style={{ width: '50vw' }}>
    <SearchInput />
  </div>
)


export default Market
