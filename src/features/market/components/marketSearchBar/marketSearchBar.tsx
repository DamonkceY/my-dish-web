import './marketSearchBar.scss'
import { useTranslation } from 'react-i18next'
import filterBy from '../../../../assets/filterBy.svg'
import arrowDown from '../../../../assets/down-arrow.svg'
import ButtonSelect from '../../../../sharedComponents/buttonSelect/buttonSelect'

const MarketSearchBar = () => {
  const { t } = useTranslation()
  return (
    <div className='marketSearchBarContainer'>
      <span>{t('HOME.SLIDES.BOOK_A_TABLE')}</span>
      <div className='searchSelectsContainer'>
        <ButtonSelect config={{
          title: 'Trier par',
          icon: filterBy,
          iconStyle: {
            width: '20px',
            height: '18px'
          }
        }}/>
        <span style={{width: '10px'}}/>
        <ButtonSelect config={{title: 'Prix'}}/>
        <span style={{width: '10px'}}/>
        <ButtonSelect config={{title: 'Diététique'}}/>
      </div>
    </div>
  )
}

export default MarketSearchBar;
