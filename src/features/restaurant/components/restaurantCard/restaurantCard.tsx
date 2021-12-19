import React from 'react'
import { useDispatch } from 'react-redux'
import { setShoppingModal } from '../../../../app/store/storeModules/root/root'

const RestaurantCard: React.FC<{ item: any }> = ({ item }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setShoppingModal(true))
  }
  return (
    <div className='cardContainer' onClick={openModal}>
      <div className='detailCardContainer'>
        <div className='headerCard'>
          <span>Velouté de champignons</span>
          <span className='desc'>Soupe au choix, frit à la mangue verte.</span>
        </div>
        <span>35 €</span>
      </div>
      <img draggable={false} src={item.image} alt='' />
    </div>
  )
}

export default RestaurantCard
