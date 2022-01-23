import './searchInput.scss'
import searchGlass from '../../assets/searchGlass.svg'
import searchArrow from '../../assets/searchArrow.svg'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Paths } from '../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/store/hooks'
import { setSearchKeyword } from '../../app/store/storeModules/announces/announcesSlice'

const SearchInput = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const search = useRef('')

  const toSearch = () => {
    dispatch(setSearchKeyword(search.current))
    navigate(Paths.searchResult)
  }
  return (
    <div className='searchInput'>
      <img className='searchGlass' draggable={false} src={searchGlass} alt='' />
      <input onKeyDown={(e) => {
        e.key === 'Enter' && toSearch()
      }} onChange={(e) => search.current = e.target.value} tabIndex={-1} placeholder={t('HOME.SEARCH_PLACEHOLDER')}
             type='text' />
      <img onClick={toSearch} className='searchArrow clickable' draggable={false} src={searchArrow} alt='' />
    </div>
  )
}

export default SearchInput
