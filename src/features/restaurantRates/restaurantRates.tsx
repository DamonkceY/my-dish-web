import './restaurantRates.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import { NavBarRightComp } from '../mainHome/mainHome'
import { searchBar } from '../market/market'
import React from 'react'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'

const RestaurantRates = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)

  return (
    <div style={{ position: 'relative' }}>
      {deviceWidth > 768 && <NavBar config={{
        isStatic: true,
        rightComponent: <NavBarRightComp disableRestaurantBtn={true} />,
        middleComponent: searchBar,
      }} />}

      <div className={'ratesMainContainer'}>
        <div className={'ratesHeader'}>
          <span>
            Avis 4
          </span>
          <button className={'btn success'}>
            Écrivez un avis
          </button>
        </div>
        <div className={'horizontalSeparator'}/>
        <RateComp/>
      </div>
    </div>
  )
}

export const RateComp = () => {
  return (
    <div>qsd</div>
  )
}

export default RestaurantRates
