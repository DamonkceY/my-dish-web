import './marketSearchBar.scss'
import { useTranslation } from 'react-i18next'

const MarketSearchBar = () => {
  const { t } = useTranslation()
  return (
    <div className='marketSearchBarContainer'>
      <span>{t('HOME.SLIDES.BOOK_A_TABLE')}</span>
      <div className='searchSelectsContainer'></div>
    </div>
  )
}

export default MarketSearchBar;
