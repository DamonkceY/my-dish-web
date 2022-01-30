import './marketSearchBar.scss'
import { useTranslation } from 'react-i18next'
import filterBy from '../../../../assets/filterBy.svg'
import ButtonSelect from '../../../../sharedComponents/buttonSelect/buttonSelect'
import React, { useEffect, useRef, useState } from 'react'

const MarketSearchBar: React.FC<{changedSearchParams: Function, element?: JSX.Element}> = ({ changedSearchParams, element }) => {
  const { t } = useTranslation()
  const title = window.location.pathname.includes('/market/reserve') ? 'HOME.SLIDES.BOOK_A_TABLE' : window.location.pathname.includes('/market/delivery') ? 'HOME.SLIDES.DELIVERY' : ''
  const [priceSearch, setPriceSearch] = useState([
    { name: '€', isChecked: false },
    { name: '€€', isChecked: false },
    { name: '€€€', isChecked: false },
    { name: '€€€€', isChecked: false },
  ])
  const [dieteticSearch, setDieteticSearch] = useState([
    { name: 'Vegan', isChecked: false },
    { name: 'Hallal', isChecked: false },
    { name: 'Sans gluten', isChecked: false },
    { name: 'Casher', isChecked: false },
  ])

  const searchParams = useRef<any>({
    price: null,
    diatetic: null
  })

  const priceChanged = (list: any) => {
    setPriceSearch(list)
    searchParams.current.price = list?.find((item: any) => item?.isChecked)?.name?.length
    changedSearchParams(searchParams.current)
  }

  const dieteticChanged = (list: any) => {
    setDieteticSearch(list)
    searchParams.current.diatetic = list?.find((item: any) => item?.isChecked)?.name
    changedSearchParams(searchParams.current)
  }
  return (
    <div className='marketSearchBarContainer'>
      {
        element ? element : <span>{t(title)}</span>
      }
      <div className='searchSelectsContainer'>
        <ButtonSelect config={{
          title: 'Trier par',
          icon: filterBy,
          iconStyle: {
            width: '20px',
            height: '18px'
          },
          list: []
        }}/>
        <span style={{width: '10px'}}/>
        <ButtonSelect config={{title: 'Prix', list: priceSearch, onSelect: priceChanged}}/>
        <span style={{width: '10px'}}/>
        <ButtonSelect config={{title: 'Diététique', list: dieteticSearch, onSelect: dieteticChanged}}/>
      </div>
    </div>
  )
}

export default MarketSearchBar;
