import './marketsVerticalPagination.scss'
import { useTranslation } from 'react-i18next'
import './marketsVerticalPagination.scss'
import React, { useEffect, useState } from 'react'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
import emptyHeart from '../../../../assets/emptyHeart.svg'
import leftArrowActive from '../../../../assets/leftArrowActive.svg'
import leftArrowInactive from '../../../../assets/leftArrowInactive.svg'
import rightArrowActive from '../../../../assets/rightArrowActive.svg'
import rightArrowInactive from '../../../../assets/rightArrowInactive.svg'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../app/utils/paths'
import filledHeart from '../../../../assets/filledHeart.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectConnectedUser } from '../../../../app/store/storeModules/authentication/authenticationSlice'
import { setFavoriteRestaurant } from '../../../../app/store/storeModules/announces/announcesService'
import { getProfileByToken } from '../../../../app/store/storeModules/authentication/authenticationService'
import EmptyMessage from '../../../../sharedComponents/emptyMessage/emptyMessage'

const MarketsVerticalPagination: React.FC<{ adsList: Array<any> }> = ({ adsList }) => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginatedList, setPaginatedList] = useState(adsList.slice(0, 4))

  const paginate = (iteration: number) => {
    const pag = ((currentPage + iteration) * 4) - 4
    setPaginatedList(adsList.slice(pag, pag + 4))
    setCurrentPage(currentPage + iteration)
  }

  useEffect(() => {
    setPaginatedList(adsList.slice(0, 4))
  }, [adsList])
  return (
    <div className='marketsVerticalPaginationContainer'>
      <div className='header'>
        <span>{t('MARKET.PAGINATION.SPECIAL_OFFER')}</span>
        <span className='resultCount'>{adsList.length} {t('RESTAURANTS')}</span>
      </div>
      <div className='paginationContainer'>
        {paginatedList.map((item) => (
          <Card key={item?._id || item?.restaurantId} item={item} />
        ))}
        {
          paginatedList.length === 0 && (
            <EmptyMessage config={{
              title: 'Il n\'ya aucun restaurant'
            }}/>
          )
        }
      </div>
      {
        paginatedList.length > 0 && (
          <div className='paginator'>
            <img onClick={() => paginate(currentPage === 1 ? 0 : -1)}
                 className={currentPage === 1 ? 'unClickable' : 'clickable'}
                 draggable={false} src={currentPage === 1 ? leftArrowInactive : leftArrowActive} alt='' />
            <div className='pages'>
              {
                Array.from(Array(Math.ceil(adsList.length / 4))).map((item, index) => {
                  return (<div className={`page ${currentPage - 1 === index && 'active'}`}>{index}</div>)
                })
              }
            </div>
            <img onClick={() => paginate(Math.ceil(adsList.length / 4) === currentPage ? 0 : 1)}
                 className={Math.ceil(adsList.length / 4) === currentPage ? 'unClickable' : 'clickable'} draggable={false}
                 src={Math.ceil(adsList.length / 4) === currentPage ? rightArrowInactive : rightArrowActive} alt='' />
          </div>
        )
      }
      {/*<div className='horizontalSeparator' style={{ margin: '35px 0' }} />*/}
      {/*<div className='header'>*/}
      {/*  <span>{t('MARKET.PAGINATION.POPULAR')}</span>*/}
      {/*  <span className='resultCount'>2681 {t('RESTAURANTS')}</span>*/}
      {/*</div>*/}
      {/*<div className='paginationContainer'>*/}
      {/*  <Card item={adsList[0]} />*/}
      {/*</div>*/}
    </div>
  )
}

const Card: React.FC<{ item: any }> = ({ item }) => {
  const navigate = useNavigate()
  const [isFavorite, setFavorite] = useState(false)
  const connectedUser = useAppSelector(selectConnectedUser)
  const favoriteCondition = () => connectedUser?.favoriteRestaurants?.find((element: any) => element?._id === (item?._id || item?.restaurantId))
  useEffect(() => {
    setFavorite(favoriteCondition)
  }, [connectedUser])
  const setFav = () => {
    if(connectedUser) {
      setFavoriteRestaurant({ id: item?._id || item?.restaurantId, favoriteState: isFavorite }).then((res) => {
        getProfileByToken(true).then()
      })
      setFavorite(!isFavorite)
    }
  }

  const goToRestaurant = () => {
    navigate(`/restaurant/${item?._id}`)
  }
  return (
    <div className='card clickable'>
      <div className='image'>
        <img onClick={goToRestaurant} className='cardImage' draggable={false} src={item?.imageUrl || item?.image}
             alt='' />
        <img onClick={setFav} className='heart clickable' draggable={false} src={isFavorite ? filledHeart : emptyHeart} alt='' />
      </div>
      <div className='details' onClick={goToRestaurant}>
        <span className='title'>{item.name}</span>
        <span>{item?.address}</span>
        <span>Prix moyen {item?.avgPrice[0]}</span>
        {/*<span>Frais de livraison : 0,99€ • 5-10 min</span>*/}
        {/*<span className='offer'></span>*/}
        {/*<span className='reduction'></span>*/}
        <div className='horizontalSeparator' />
        <span className='speciality'>{item?.category}</span>
        <div className='topRight'>
                <span className='rate'>
                  {item?.globalRating}
                  <span className='outOfTen'>/ 10</span>
                </span>
          <span className='comments'>{item?.rating?.length || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default MarketsVerticalPagination
