import './shoppingCart.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useState } from 'react'
import { searchBar } from '../market/market'
import swile from '../../assets/swile.jpg'
import edenRed from '../../assets/edenred.jpg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import close from '../../assets/close.svg'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { pushToToastsArray, selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { NavBarRightComp } from '../mainHome/mainHome'
import moment from 'moment'
import {
  selectCart,
  selectOrderDetails,
  setCart,
  setOrderConfirmationDetails, setOrderDetails,
} from '../../app/store/storeModules/cart/cartSlice'
import {
  checkIntent, clearCart,
  decrementIncrementProductInCart,
  getCart,
  passOrder,
} from '../../app/store/storeModules/cart/cartService'
import Stripe from './stripe'
import EmptyMessage from '../../sharedComponents/emptyMessage/emptyMessage'
import { getRestaurantById } from '../../app/store/storeModules/announces/announcesService'
import { generateUniqueId } from '../../app/utils/func/commonFuncs'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '40px',
  boxShadow: 24,
}

const ShoppingCart = () => {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const orderDetails = useAppSelector(selectOrderDetails)
  const cart = useAppSelector(selectCart)
  const [isDelivery, setIsDelivery] = useState(0)

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    setIsDelivery(orderDetails?.restaurant?.type === 'LIVRAISON' ? 1 : 0)
    getCart().then((res: any) => {
      dispatch(setCart(res.data))
    })
  }, [])

  const deleteItem = (data: any) => {
    decrementIncrementProductInCart({ ...data }).then(() => {
      getCart().then((res: any) => {
        dispatch(setCart(res.data))
      })
    })
  }


  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (!!query.get('redirect_status') && !!query.get('payment_intent')) {
      checkIntent(query.get('payment_intent') as string).then((res) => {
        navigate(Paths.profile.myReservations)
        dispatch(setOrderDetails(null))
        dispatch(setOrderConfirmationDetails(null))
        localStorage.removeItem('RESTAURANT')
      })
    }
  }, [])

  const payment = () => {
    if (
      (cart !== null || cart?.subTotalPrice !== 0)
    ) {
      if (!orderDetails || orderDetails === 'null') {
        let tempRest = null
        cart.articles.forEach((item: any) => {
          if (item?.article && item?.article?.restaurantId) {
            tempRest = item?.article?.restaurantId
          }
        })
        if (!tempRest) {
          cart.boisson.forEach((item: any) => {
            if (item?.article && item?.article?.restaurantId) {
              tempRest = item?.article?.restaurantId
            }
          })
        }
        if (tempRest) {
          navigate('/restaurant/' + tempRest)
          dispatch(pushToToastsArray({
            uniqueId: generateUniqueId(),
            message: 'Veuillez recommencer votre commande',
            type: 'info',
          }))
        }
      } else {
        const query = new URLSearchParams(window.location.search)
        if (!query.get('redirect_status') && !query.get('payment_intent')) {
          passOrder({
            orderType: orderDetails?.restaurant?.type,
            isProgram: orderDetails.offre,
            restaurant: orderDetails.restaurant?._id,
            peopleNumber: orderDetails.peopleNumber,
            status: 'InProgress',
            isCancelled: false,
            isPaid: false,
            orderedForDate: `${moment(orderDetails.date).format('YYYY-MM-DD')}T${orderDetails.time || '00:00'}:00`,
            panierId: cart?._id,
            paymentMethod: orderDetails?.paymentMethod,
            deliveryAddress: orderDetails?.deliveryAddress,
            instruction: orderDetails?.instruction,
          }).then((res: any) => {
            dispatch(setOrderConfirmationDetails(res.data))
            setModal(true)
          })
        }
      }
    }
  }

  const [deliveryMethode, setDeliveryMethod] = useState('hand')
  const [deliveryForm, setDeliveryForm] = useState<{ [key: string]: any }>({
    paymentMethod: orderDetails?.paymentMethod || 'hand',
    instruction: orderDetails?.instruction || '',
    deliveryAddress: orderDetails?.deliveryAddress || '',
  })
  const changedDeliveryForm = (value: string, prop: string) => {
    let temp = { ...deliveryForm }
    temp[prop] = value
    setDeliveryForm({ ...temp })
  }
  const getDeliveryFormDisabledBtn = () => {
    return deliveryForm.deliveryAddress.trim().length > 0
  }
  const setDeliveryDetails = () => {
    dispatch(setOrderDetails({
      ...orderDetails,
      ...deliveryForm,
    }))
    if (deliveryForm.paymentMethod === 'hand') {
      passOrder({
        orderType: 'LIVRAISON',
        isProgram: false,
        restaurant: orderDetails.restaurant?._id,
        peopleNumber: 0,
        status: 'InProgress',
        isCancelled: false,
        isPaid: false,
        orderedForDate: `${moment(orderDetails.date).format('YYYY-MM-DD')}T${orderDetails.time || '00:00'}:00`,
        panierId: cart?._id,
        instruction: deliveryForm.instruction,
        deliveryAddress: deliveryForm.deliveryAddress,
        paymentMethod: 'hand',
      }).then((res: any) => {
        clearCart().then()
        dispatch(setOrderDetails(null))
        dispatch(setOrderConfirmationDetails(null))
        localStorage.removeItem('RESTAURANT')
        navigate(Paths.home)
      })
    } else {
      setIsDelivery(2)
    }
  }

  const clearCartFn = () => {
    if (!cart) {
      garbageCleaner()
    } else {
      clearCart().then(() => {
        getCart().then()
        garbageCleaner()
      })
    }
  }

  const garbageCleaner = () => {
    localStorage.removeItem('RESTAURANT')
    dispatch(setOrderDetails(null))
    dispatch(setOrderConfirmationDetails(null))
    navigate(Paths.home)
  }

  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: deviceWidth > 768 ? <NavBarRightComp disableRestaurantBtn={true} /> : undefined,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />
      <div className='shoppingCartContainer'>
        {
          orderDetails?.restaurant && orderDetails?.restaurant?.type === 'RESERVATION' ? (
            <span className='title'>
              Réservation • {orderDetails?.restaurant?.name} • {orderDetails?.peopleNumber} Pers. {moment(orderDetails?.date).format('MMM Do YYYY')} • {orderDetails?.time}
            </span>
          ) : orderDetails?.restaurant && (
            <span className='title'>Livraison • {orderDetails?.restaurant?.name} </span>
          )
        }

        <div className='horizontalSeparator' />
        <div className='mainCont'>
          {
            isDelivery === 1 && (
              <div className={'paymentContainer'}>
                <span className='paymentMeth'>Détails de la livraison</span>
                <div className='radioEl' onClick={() => changedDeliveryForm('hand', 'paymentMethod')}>
                  <div className='flexRadio'>
                    <span className={`radio ${deliveryForm.paymentMethod === 'hand' && 'isActive'}`}>
                      <span className={`innerRadio ${deliveryForm.paymentMethod === 'hand' && 'isActive'}`} />
                    </span>
                    <span className='radioLabel'>En main propre </span>
                  </div>
                </div>
                <br />
                <div className='radioEl' onClick={() => changedDeliveryForm('CB', 'paymentMethod')}>
                  <div className='flexRadio'>
                    <span className={`radio ${deliveryForm.paymentMethod === 'CB' && 'isActive'}`}>
                      <span className={`innerRadio ${deliveryForm.paymentMethod === 'CB' && 'isActive'}`} />
                    </span>
                    <span className='radioLabel'>Paiment en ligne </span>
                  </div>
                </div>
                <br />
                <div className='input'>
                  <span>Adresse</span>
                  <input
                    defaultValue={deliveryForm?.deliveryAddress}
                    style={{ marginTop: '10px' }}
                    placeholder={'Saisissez l\'adresse de la livraison'}
                    onChange={(e) => changedDeliveryForm(e.target.value, 'deliveryAddress')}
                    className='address whiteBack'
                    type='text'
                  />
                </div>
                <br />
                <div className='input'>
                  <span>Instruction de la livraison</span>
                  <input
                    defaultValue={deliveryForm?.instruction}
                    style={{ marginTop: '10px' }}
                    onChange={(e) => changedDeliveryForm(e.target.value, 'instruction')}
                    className='address whiteBack'
                    type='text'
                  />
                </div>
                <button onClick={setDeliveryDetails} disabled={!getDeliveryFormDisabledBtn()}
                        className={`btn ${getDeliveryFormDisabledBtn() ? 'success' : 'simple'}`}>
                  Valider et Continuer
                </button>
              </div>
            )
          }
          <div className='shoppingContainer'>
            <span className='addArticles clickable'
                  onClick={() => navigate(orderDetails?.restaurant ? Paths.shop : Paths.home)}>+ Ajouter des articles</span>
            <div className='horizontalSeparator' />
            {
              (cart && cart?.subTotalPrice > 0) ? (
                <div>
                  <div className='shoppingListContainer'>
                    {
                      !!cart && (
                        cart?.articles?.map((item: any) => (
                          item?.article?.name ?
                            <div className='shoppingItem' key={item?.article?._id}>
                              <div className='cont'>
                                <span className='title'>{item?.numbers} {item?.article?.name}</span>
                                {
                                  item?.options && item?.options?.length > 0 && (
                                    <div className={'desc'}>
                                      <span>Option: </span>
                                      &nbsp;
                                      <span>{item?.article?.options[0].name}</span>
                                      &nbsp;
                                      &nbsp;
                                      <span>{item?.article?.options[0].price} €</span>
                                    </div>
                                  )
                                }
                                <span className='desc'>{item?.description}</span>
                                <span className='delete'
                                      onClick={() => deleteItem({ platId: item?.article?._id })}>Supprimer</span>
                              </div>
                              <span style={{ whiteSpace: 'nowrap' }}>{item?.article?.price * item?.numbers} €</span>
                            </div> : <></>
                        ))
                      )
                    }
                    {
                      !!cart && (
                        cart?.boisson?.map((item: any) => (
                          item?.article?.name ?
                            <div className='shoppingItem' key={item?.article?._id}>
                              <div className='cont'>
                                <span className='title'>{item?.numbers} {item?.article?.name}</span>
                                <span className='desc'>{item?.description}</span>
                                <span className='delete'
                                      onClick={() => deleteItem({ boissonId: item?.article?._id })}>Supprimer</span>
                              </div>
                              <span style={{ whiteSpace: 'nowrap' }}>{item?.article?.price * item?.numbers} €</span>
                            </div> : <></>
                        ))
                      )
                    }
                  </div>
                  <div className='horizontalSeparator' />
                  <div className='shoppingResult'>
                    <span>Sous-total</span>
                    <span>{cart?.subTotalPrice} €</span>
                  </div>
                </div>
              ) : <EmptyMessage config={{ title: 'Aucun article est séléctionner', text: '' }} />
            }
          </div>
          {
            (isDelivery === 0 || isDelivery === 2) && (orderDetails?.restaurant) && (
              <div className='paymentContainer'>
                <span className='paymentMeth'>Moyen de paiement</span>
                <div className='radioEl'>
                  <div className='flexRadio'>
                    <span className='radio isActive'>
                      <span className='innerRadio isActive' />
                    </span>
                    <span className='radioLabel'>Carte de crédit ou de débit </span>
                    <span className='notif'>Pas de carte enregistrée</span>
                  </div>
                  {/*<span className='price isActive'>+ 1,00 €</span>*/}
                </div>
                <div className='horizontalSeparator' style={{ margin: '35px 0 20px 0' }} />
                <div className='radioEl'>
                  <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio' />
                    </span>
                    <span className='radioLabel'>En espèces</span>
                  </div>
                  {/*<span className='price isActive'>+ 1,00 €</span>*/}
                </div>
                <div className='horizontalSeparator' />
                <div className='radioEl'>
                  <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio' />
                    </span>
                    <span className='radioLabel'>Bons </span>
                  </div>
                </div>
                <div className='horizontalSeparator' />
                <span className='titleRestau'>Titre-restaurant</span>
                <div className='radioEl'>
                  <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio' />
                    </span>
                    <span className='radioLabel'>
                  <img draggable={false} src={edenRed} alt='' />
                  MyEdenred
                </span>
                  </div>
                </div>
                <div style={{ height: '20px' }} />
                <div className='radioEl'>
                  <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio' />
                    </span>
                    <span className='radioLabel'>
                  <img draggable={false} src={swile} alt='' />
                  Swile
                </span>
                  </div>
                </div>
                <button disabled={!cart || cart.subTotalPrice === 0}
                        className={`btn ${!!cart && cart.subTotalPrice > 0 ? 'success' : ''}`}
                        onClick={payment}>Passer au paiement
                </button>
                <br />
                <br />
                <button className={'btn clickable simple'} onClick={clearCartFn}>Annuler
                  la {orderDetails?.restaurant?.type === 'LIVRAISON' ? 'livraison' : 'réservation'}</button>
              </div>
            )
          }
        </div>
      </div>
      {
        deviceWidth > 768 ? (
          <Modal
            open={modal}
            onClose={() => setModal(false)}
          >
            <Box sx={style}>
              <AddBankAccount closeEvent={() => setModal(false)} />
            </Box>
          </Modal>
        ) : (
          <BottomSheet open={modal} onDismiss={() => setModal(false)}>
            <AddBankAccount closeEvent={() => setModal(false)} />
          </BottomSheet>
        )
      }
    </div>
  )
}

export const AddBankAccount: React.FC<{ closeEvent: Function }> = ({ closeEvent }) => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  return (
    <div className={'checkoutForm'}><Stripe /></div>
  )
//     <div className='addBankAccount'>
//     <div className='cont'>
//     <div className='head'>
//     <span>Ajouter une carte</span>
//   <img onClick={() => closeEvent()} className='clickable' draggable={false} src={close} alt='' />
// </div>
//   <div className='horizontalSeparator' />
//   <div className='inputs'>
//     <div className='inputCont'>
//       <span>Numéro de carte</span>
//       <input tabIndex={-1} type='text' name='' id='' />
//     </div>
//     <div className='inputCont'>
//       <span>Date d’expiration</span>
//       <input placeholder='MM/AA' type='text' name='' id='' />
//     </div>
//     <div className='inputCont'>
//       <span>Code de sécurité</span>
//       <input placeholder='Code de 3 chiffres situé au dos de la carte' type='text' name='' id='' />
//     </div>
//     <div className='inputCont'>
//       <span>Pays</span>
//       <input value='France' type='text' name='' id='' />
//     </div>
//   </div>
// </div>
//   <div style={{ height: deviceWidth > 768 ? '150px' : '70px' }} />
//   <button className={'btn success'} onClick={() => closeEvent()}>Suivant</button>
// </div>
}

export default ShoppingCart
