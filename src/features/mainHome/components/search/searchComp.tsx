import React from 'react'
import './searchComp.scss'
import { useTranslation } from 'react-i18next'
import searchGlass from '../../../../assets/searchGlass.svg'
import searchArrow from '../../../../assets/searchArrow.svg'
const SearchComp = () => {
  const { t } = useTranslation()
  return (
    <div className='bannerContainer'>
      <label className='searchLabel'>{t('HOME.SEARCH_LABEL')}</label>
      <div className='searchInput'>
        <img className='searchGlass' draggable={false} src={searchGlass} alt=''/>
        <input placeholder={t('HOME.SEARCH_PLACEHOLDER')} type='text' />
        <img className='searchArrow clickable' draggable={false} src={searchArrow} alt=''/>
      </div>
    </div>
  )
}

export default SearchComp
