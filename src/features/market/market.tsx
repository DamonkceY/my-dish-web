import NavBar from '../../sharedComponents/navBar/navBar'
import { useTranslation } from 'react-i18next'
import './market.scss'
import MarketSearchBar from './components/marketSearchBar/marketSearchBar'
import MarketsVerticalPagination from './components/marketsVerticalPagination/marketsVerticalPagination'
import MapCard from './components/map/Map'

const Market = () => {
  const { t } = useTranslation();
  return (
    <div>
      <NavBar config={{isStatic: true}}/>
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

export default Market;
