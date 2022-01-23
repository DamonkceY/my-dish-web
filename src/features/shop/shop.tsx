import './shop.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import { useTranslation } from 'react-i18next'
import RestaurantCard from '../restaurant/components/restaurantCard/restaurantCard'
import { Paths } from '../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import ShoppingModal from '../../sharedComponents/modals/modal'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { NavBarRightComp } from '../mainHome/mainHome'
import {
  selectCart,
  selectOrderDetails,
  setCart,
  setOrderConfirmationDetails,
} from '../../app/store/storeModules/cart/cartSlice'
import moment from 'moment'
import EmptyMessage from '../../sharedComponents/emptyMessage/emptyMessage'
import {
  decrementIncrementProductInCart,
  getCart, passOrder,
} from '../../app/store/storeModules/cart/cartService'

const Shop = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const isMounted = useRef(false)
  const [scrollIndicator, setScrollDownIndicator] = useState(false)
  const orderDetails = useAppSelector(selectOrderDetails)
  const cart = useAppSelector(selectCart)
  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: deviceWidth > 919 ? '150px' : '25%' }
    if (tabSelected === 'DESSERTS') return { marginLeft: deviceWidth > 919 ? '300px' : '50%' }
    if (tabSelected === 'DRINKS') return { marginLeft: deviceWidth > 919 ? '450px' : '75%' }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })

    if(!orderDetails) {
      navigate(Paths.home)
    }

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
    isMounted.current ? document.getElementById(tabSelected)?.scrollIntoView({ behavior: 'smooth' }) : (isMounted.current = true)

    let options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((e) => {
      setScrollDownIndicator(e[0].isIntersecting)
    }, options)
    observer.observe(document.getElementById('justAnId') as HTMLElement)
  }, [tabSelected])
  const array = ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']

  const navigate = useNavigate()

  const confirmOrder = () => {
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
    }).then((res: any) => {
      dispatch(setOrderConfirmationDetails(res.data))
      navigate(Paths.cart)
    })

  }

  const cartHasProducts = () => !!cart && (cart?.articles?.filter((item: any) => !!item?.article)?.length > 0 || cart?.boisson?.filter((item: any) => !!item?.article)?.length > 0)

  const shoppingCart = (
    <div className='shoppingCart' id='justAnId'>
      <button disabled={!cartHasProducts()} className={`btn ${cartHasProducts() ? 'success' : ''}`} onClick={() => confirmOrder()}>
        Confirmer la {orderDetails?.restaurant?.type === 'LIVRAISON' ? 'livraison' : 'réservation'}
      </button>
      {
        cartHasProducts() && (<div className='horizontalSeparator' />)
      }
      {/*<span>Sélectionnez vos plats et ajoutez-les à votre réservation.</span>*/}
      <div className='shoppingListContainer'>
        {
          !!cart && (
            cart?.articles?.map((item: any) => (
              item?.article?.name ?
                <div className='shoppingItem'>
                  <div className='cont'>
                    <span className='title'>{item?.numbers} {item?.article?.name}</span>
                    {/*<span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>*/}
                    <span className='delete' onClick={() => deleteItem({ platId: item?.article?._id })}>Supprimer</span>
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
                <div className='shoppingItem'>
                  <div className='cont'>
                    <span className='title'>{item?.numbers} {item?.article?.name}</span>
                    {/*<span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>*/}
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
  )

  return (
    <div id='rootEl' style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: deviceWidth > 768 ? <NavBarRightComp disableRestaurantBtn={true} /> : undefined,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />
      <div className='shopContainer'>
        <div className='shopHeader'>
          {
            orderDetails?.restaurant?.type === 'RESERVATION' ? (
              <span>
                Réservation • {orderDetails?.restaurant?.name} • {orderDetails?.peopleNumber} Pers. {moment(orderDetails?.date).format('MMM Do YYYY')} • {orderDetails?.time}
              </span>
            ) : (
              <span>Livraison • {orderDetails?.restaurant?.name} </span>
            )
          }

        </div>
        <div className='restaurantTabsContainer'>
          <div className='tabs'>
            <div className='cont'>
              <span onClick={() => setTabSelected('ENTRIES')}
                    className={tabSelected === 'ENTRIES' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.ENTRIES')}
              </span>
              <span onClick={() => setTabSelected('DISHES')}
                    className={tabSelected === 'DISHES' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DISHES')}
              </span>
              <span onClick={() => setTabSelected('DESSERTS')}
                    className={tabSelected === 'DESSERTS' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DESSERTS')}
              </span>
              <span onClick={() => setTabSelected('DRINKS')}
                    className={tabSelected === 'DRINKS' ? 'active tab' : 'tab'}
              >
                {t('RESTAURANT.DRINKS')}
              </span>
            </div>
          </div>
          <div style={getMargin()} className='underline' />
          <div className='horizontalSeparator' />
        </div>
        <div className='shoppingCartContainer'>
          <div className='dishesContainer'>
            {
              array.map((item) => {
                // ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']
                let dataArr = []
                switch (item) {
                  case 'ENTRIES':
                    dataArr = orderDetails?.restaurant?.entrée || []
                    break
                  case 'DISHES':
                    dataArr = orderDetails?.restaurant?.plats || []
                    break
                  case 'DESSERTS':
                    dataArr = orderDetails?.restaurant?.deserts || []
                    break
                  case 'DRINKS':
                    dataArr = orderDetails?.restaurant?.boissons || []
                    break
                  default:
                    dataArr = []
                    break
                }
                return (
                  <div className='optionsContainer'>
                    <span id={item}>{t(`RESTAURANT.${item}`)}</span>
                    <div style={{ margin: '40px' }} />
                    <div className='cards'>
                      {dataArr.map((item: any) => {
                        return (
                          <RestaurantCard restaurant={orderDetails?.restaurant} item={item} />
                        )
                      })}
                    </div>
                    {
                      dataArr.length === 0 && (
                        <EmptyMessage config={{
                          title: 'Il n\'ya pas des donnée en ce moment',
                        }} />
                      )
                    }
                  </div>
                )
              })
            }
          </div>
          {shoppingCart}
        </div>
      </div>
      <ShoppingModal />
      {
        (deviceWidth <= 919 && !scrollIndicator) && (
          <div className='scrollDownBox' onClick={() => {
            document.getElementById('justAnId')?.scrollIntoView({ behavior: 'smooth' })

          }}>
            <span />
            <span />
            <span />
          </div>
        )
      }
    </div>
  )
}

export default Shop
