import './searchInput.scss'
import searchGlass from '../../assets/searchGlass.svg'
import searchArrow from '../../assets/searchArrow.svg'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Paths } from '../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className='searchInput'>
      <img className='searchGlass' draggable={false} src={searchGlass} alt=''/>
      <input tabIndex={-1} placeholder={t('HOME.SEARCH_PLACEHOLDER')} type='text' />
      <img onClick={() => navigate(Paths.searchResult)} className='searchArrow clickable' draggable={false} src={searchArrow} alt=''/>
    </div>
  )
}

export default SearchInput
