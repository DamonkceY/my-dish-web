import React from 'react'
import './searchComp.scss'
import { useTranslation } from 'react-i18next'
import SearchInput from '../../../../sharedComponents/searchInput/searchInput'
const SearchComp = () => {
  const { t } = useTranslation()
  return (
    <div className='bannerContainer'>
      <label className='searchLabel'>{t('HOME.SEARCH_LABEL')}</label>
      <div className='searchInputHome'>
        <SearchInput/>
      </div>
    </div>
  )
}

export default SearchComp
