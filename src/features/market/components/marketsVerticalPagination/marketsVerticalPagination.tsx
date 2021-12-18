import './marketsVerticalPagination.scss'
import { useTranslation } from 'react-i18next'
import './marketsVerticalPagination.scss'
import React from 'react'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
import emptyHeart from '../../../../assets/emptyHeart.svg'

const MarketsVerticalPagination = () => {
  const { t } = useTranslation()
  return (
    <div className='marketsVerticalPaginationContainer'>
      <div className='header'>
        <span>{t('MARKET.PAGINATION.SPECIAL_OFFER')}</span>
        <span className='resultCount'>6838 {t('RESTAURANTS')}</span>
      </div>
      <div className='paginationContainer'>
        {SLIDES.map((item) => (
          <div className='card'>
            <div className='image'>
              <img className='cardImage' draggable={false} src={item.image} alt='' />
              <img className='heart clickable' draggable={false} src={emptyHeart} alt='' />
            </div>
            <div className='details'>
              <span className='title'>{item.name}</span>
              <span>{item.address}</span>
              <span>Prix moyen {item.price}</span>
              <span>Frais de livraison : 0,99€ • 5-10 min</span>
              {/*<span className='offer'></span>*/}
              {/*<span className='reduction'></span>*/}
              <div className='horizontalSeparator' />
              <span>{item.speciality}</span>
              <div className='topRight'>
                <span className='rate'>
                  {item.rate}
                  <span className='outOfTen'>/ 10</span>
                </span>
                <span className='comments'>144</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketsVerticalPagination
