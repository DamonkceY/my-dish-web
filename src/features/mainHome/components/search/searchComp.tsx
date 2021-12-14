import React from 'react'
import './searchComp.scss'
import { useTranslation } from 'react-i18next'
import InputField from '../../../../sharedComponents/inputField/inputField'

const SearchComp = () => {
  const { t } = useTranslation()
  return (
    <div className='bannerContainer'>
      <label className='searchLabel'>{t('HOME.SEARCH_LABEL')}</label>
      <div className='searchInput'>
        <InputField config={{ label: '', placeholder: '', type: 'text' }} />
      </div>
    </div>
  )
}

export default SearchComp
