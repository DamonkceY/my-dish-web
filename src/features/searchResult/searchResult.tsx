import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'
import React from 'react'
import { searchBar } from '../market/market'
import NavBar from '../../sharedComponents/navBar/navBar'
import Footer from '../../sharedComponents/footer/footer'
import './searchResult.scss'
import { SLIDES } from '../mainHome/mockToBeDeleted'
import { SliderElement } from '../mainHome/components/sliders/slider'

const SearchResult = () => {
  const navigate = useNavigate()
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{ isStatic: true, rightComponent: profile, middleComponent: searchBar }} />

      <div className='searchContainer'>
        <div className='searchHeader'>
          <span>"Pizza"</span>
          <span>230 restaurants</span>
        </div>
        <div className='searchResult'>
          {SLIDES.map((item) => (
            <SliderElement element={item}/>
          ))}
          {SLIDES.map((item) => (
            <SliderElement element={item}/>
          ))}
        </div>
      </div>

      <div style={{ height: '720px' }} />
      <Footer />
    </div>
  )
}

export default SearchResult
