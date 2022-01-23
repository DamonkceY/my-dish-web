import React from 'react'
import { useDispatch } from 'react-redux'
import { pushToToastsArray, setShoppingModal } from '../../../../app/store/storeModules/root/root'
import pizza from '../../../../assets/pizza.png'
import { generateUniqueId } from '../../../../app/utils/func/commonFuncs'

const RestaurantCard: React.FC<{ item: any, restaurant: any, openReservation?: Function}> = ({ item, restaurant, openReservation }) => {
  const dispatch = useDispatch();
  const orderDetails = JSON.parse(localStorage?.getItem('ORDER_DETAILS') as string)

  const openModal = () => {
    if(!orderDetails || orderDetails?.restaurant?._id === restaurant?._id) {
      if(!orderDetails && restaurant?.type === 'RESERVATION') {
        openReservation && openReservation()
      }else{
        localStorage.setItem('RESTAURANT', JSON.stringify(restaurant))
        dispatch(setShoppingModal(item))
      }
    } else {
      dispatch(pushToToastsArray({
        uniqueId: generateUniqueId(),
        message: 'Vous avez une autre commande en cours',
        type: 'info',
      }))
    }
  }
  return (
    <div className='cardContainer' onClick={openModal}>
      <div className='detailCardContainer'>
        <div className='headerCard'>
          <span>{item?.name}</span>
          <span className='desc'>{item?.bottleType || item?.options?.map((item: any, index:number) => `${index !== 0 ? ', ' : ''}${item?.name}`)}</span>
        </div>
        <span>{item?.price} €</span>
      </div>
      <img draggable={false} src={item.imageUrl || pizza} alt='' />
    </div>
  )
}

export default RestaurantCard
