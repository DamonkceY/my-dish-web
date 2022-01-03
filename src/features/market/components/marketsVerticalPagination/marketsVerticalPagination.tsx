import './marketsVerticalPagination.scss'
import { useTranslation } from 'react-i18next'
import './marketsVerticalPagination.scss'
import React, { useState } from 'react'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
import emptyHeart from '../../../../assets/emptyHeart.svg'
import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'
import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../app/utils/paths/Paths'

const MarketsVerticalPagination = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginatedList, setPaginatedList] = useState(SLIDES.slice(0, 4))

  const paginate = (iteration: number) => {
    const pag = ((currentPage + iteration) * 4) - 4
    setPaginatedList(SLIDES.slice(pag, pag + 4))
    setCurrentPage(currentPage + iteration)
  }
  return (
    <div className='marketsVerticalPaginationContainer'>
      <div className='header'>
        <span>{t('MARKET.PAGINATION.SPECIAL_OFFER')}</span>
        <span className='resultCount'>6838 {t('RESTAURANTS')}</span>
      </div>
      <div className='paginationContainer'>
        {paginatedList.map((item) => (
          <Card item={item} />
        ))}
      </div>
      <div className='paginator'>
        <img onClick={() => paginate(currentPage === 1 ? 0 : -1)}
             className={currentPage === 1 ? 'unClickable' : 'clickable'}
             draggable={false} src={currentPage === 1 ? leftArrowInactive : leftArrowActive} alt='' />
        <div className='pages'>
          {
            Array.from(Array(Math.ceil(SLIDES.length / 4))).map((item, index) => {
              return (<div className={`page ${currentPage - 1 === index && 'active'}`}>{index}</div>)
            })
          }
        </div>
        <img onClick={() => paginate(Math.ceil(SLIDES.length / 4) === currentPage ? 0 : 1)}
             className={Math.ceil(SLIDES.length / 4) === currentPage ? 'unClickable' : 'clickable'} draggable={false}
             src={Math.ceil(SLIDES.length / 4) === currentPage ? rightArrowInactive : rightArrowActive} alt='' />
      </div>
      <div className='horizontalSeparator' style={{margin: '35px 0'}}/>
      <div className='header'>
        <span>{t('MARKET.PAGINATION.POPULAR')}</span>
        <span className='resultCount'>2681 {t('RESTAURANTS')}</span>
      </div>
      <div className='paginationContainer'>
        <Card item={SLIDES[0]} />
      </div>
    </div>
  )
}

const Card: React.FC<{ item: any }> = ({ item }) => {
  const navigate = useNavigate();

  const goToRestaurant = () => {
    navigate(`/restaurant/${item.name}`)
  }
  return (
    <div className='card clickable'>
      <div className='image'>
        <img onClick={goToRestaurant} className='cardImage' draggable={false} src={item.image} alt='' />
        <img className='heart clickable' draggable={false} src={emptyHeart} alt='' />
      </div>
      <div className='details' onClick={goToRestaurant}>
        <span className='title'>{item.name}</span>
        <span>{item.address}</span>
        <span>Prix moyen {item.price}</span>
        <span>Frais de livraison : 0,99€ • 5-10 min</span>
        {/*<span className='offer'></span>*/}
        {/*<span className='reduction'></span>*/}
        <div className='horizontalSeparator' />
        <span className='speciality'>{item.speciality}</span>
        <div className='topRight'>
                <span className='rate'>
                  {item.rate}
                  <span className='outOfTen'>/ 10</span>
                </span>
          <span className='comments'>144</span>
        </div>
      </div>
    </div>
  )
}

export default MarketsVerticalPagination
