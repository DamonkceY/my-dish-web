import './marketSearchBar.scss'
import { useTranslation } from 'react-i18next'
import filterBy from '../../../../assets/filterBy.svg'
import ButtonSelect from '../../../../sharedComponents/buttonSelect/buttonSelect'
import { useEffect } from 'react'

const MarketSearchBar = () => {
  const { t } = useTranslation()
  const title = window.location.pathname.includes('/market/reserve') ? 'HOME.SLIDES.BOOK_A_TABLE' : window.location.pathname.includes('/market/delivery') ? 'HOME.SLIDES.DELIVERY' : ''
  return (
    <div className='marketSearchBarContainer'>
      <span>{t(title)}</span>
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
