import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import React, { useEffect, useState } from 'react'
import { searchBar } from '../market/market'
import NavBar from '../../sharedComponents/navBar/navBar'
import Footer from '../../sharedComponents/footer/footer'
import './searchResult.scss'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import { SliderElement } from '../mainHome/components/sliders/slider'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { selectSearchKeyword } from '../../app/store/storeModules/announces/announcesSlice'
import { searchInRestaurant } from '../../app/store/storeModules/announces/announcesService'
import SearchInput from '../../sharedComponents/searchInput/searchInput'
import { NavBarRightComp } from '../mainHome/mainHome'

const SearchResult = () => {
  const navigate = useNavigate()
  const width = useAppSelector(selectDeviceWidth)
  const searchKeyword = useAppSelector(selectSearchKeyword)
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [adsList, setAdsList] = useState([])

  useEffect(() => {
    searchInRestaurant({search: searchKeyword}).then((res:any) => {
      setAdsList(res.data)
    })
  }, [searchKeyword])
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{ isStatic: true, rightComponent: deviceWidth > 768 ? <NavBarRightComp disableRestaurantBtn={true}/> : undefined, middleComponent: deviceWidth > 768 ? searchBar : undefined }} />
      <div className='searchContainer'>
        {
          width <= 768 && <SearchInput/>
        }
        <div className='searchHeader'>
          {searchKeyword.length > 0 && <span>"{searchKeyword}"</span>}
          <span>{adsList.length} restaurants</span>
        </div>
        <div className='searchResult'>
          {adsList.map((item) => (
            <SliderElement element={item}/>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SearchResult
