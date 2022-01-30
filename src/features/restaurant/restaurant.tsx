import './restaurant.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useRef, useState } from 'react'
import { searchBar } from '../market/market'
import { useTranslation } from 'react-i18next'
import emptyHeart from '../../assets/emptyHeart.svg'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ModalReservation from './components/reservationModal/reservationModal'
import RestaurantCard from './components/restaurantCard/restaurantCard'
import RestaurantMap from './components/restaurantMap/restaurantMap'
import ShoppingModal from '../../sharedComponents/modals/modal'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import MoreDetailModal from './components/moreDetailModal/moreDetailModal'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { pushToToastsArray, selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { getRestaurantById, setFavoriteRestaurant } from '../../app/store/storeModules/announces/announcesService'
import { NavBarRightComp } from '../mainHome/mainHome'
import EmptyMessage from '../../sharedComponents/emptyMessage/emptyMessage'
import filledHeart from '../../assets/filledHeart.svg'
import { selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { getProfileByToken } from '../../app/store/storeModules/authentication/authenticationService'
import { selectOrderDetails } from '../../app/store/storeModules/cart/cartSlice'
import { generateUniqueId } from '../../app/utils/func/commonFuncs'

const Restaurant = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [tabSelected, setTabSelected] = useState('ENTRIES')
  const isMounted = useRef(false)
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [shoppingModal, setShoppingModal] = useState({ mobile: deviceWidth <= 768, isOpen: false })
  const [moreDetail, setMoreDetail] = useState({ mobile: deviceWidth <= 768, isOpen: false })
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(undefined)

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

  const [isFavorite, setFavorite] = useState(false)
  const connectedUser = useAppSelector(selectConnectedUser)
  const orderDetails = useAppSelector(selectOrderDetails)
  const favoriteCondition = () => connectedUser?.favoriteRestaurants?.find((item: any) => item?._id === (selectedRestaurant?._id || selectedRestaurant?.restaurantId))
  useEffect(() => {
    setFavorite(favoriteCondition)
  }, [connectedUser, selectedRestaurant])
  const setFav = () => {
    setFavoriteRestaurant({ id: selectedRestaurant?._id || selectedRestaurant?.restaurantId, favoriteState: isFavorite }).then((res) => {
      getProfileByToken(true).then()
    })
    setFavorite(!isFavorite)
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    getRestaurantById({ id: window.location.pathname.slice(12) }).then((res: any) => {
      console.log(res)
      setSelectedRestaurant(res?.data)
    }).catch(() => {
      navigate(Paths.home)
    })
  }, [])

  const getMargin = () => {
    if (tabSelected === 'DISHES') return { marginLeft: deviceWidth > 919 ? '150px' : '25%' }
    if (tabSelected === 'DESSERTS') return { marginLeft: deviceWidth > 919 ? '300px' : '50%' }
    if (tabSelected === 'DRINKS') return { marginLeft: deviceWidth > 919 ? '450px' : '75%' }
  }

  useEffect(() => {
    isMounted.current ? document.getElementById(tabSelected)?.scrollIntoView({ behavior: 'smooth' }) : (isMounted.current = true)
  }, [tabSelected])

  const array = ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']
  const dispatch = useAppDispatch()
  const reserveTable = () => {
    if(!orderDetails || orderDetails === 'null') {
      setShoppingModal({
        isOpen: true,
        mobile: deviceWidth <= 768,
      })
    } else {
      dispatch(pushToToastsArray({
        uniqueId: generateUniqueId(),
        message: orderDetails?.restaurant._id === selectedRestaurant?._id ? 'Une réservation existe déjà' : 'Vous avez une autre commande en cours',
        type: 'info',
      }))
    }
  }
  return (
    selectedRestaurant ? (
      <div style={{ position: 'relative' }}>
        {deviceWidth > 768 && <NavBar config={{
          isStatic: true,
          rightComponent: <NavBarRightComp disableRestaurantBtn={true} />,
          middleComponent: searchBar,
        }} />}
        <div className='headerRestaurant' style={{backgroundImage: `url(${selectedRestaurant?.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <div className='detailContainer'>
          <span onClick={() => deviceWidth <= 768 && navigate(-1)}>
            {deviceWidth <= 768 && <span className='backArrowRestaurant' />}
            <span className='title'>{selectedRestaurant?.name}</span>
          </span>
            <div className='details'>
            <span className='rateComments'>
              <span className='rate'>{selectedRestaurant?.globalRating}<span className='outOfTen'>/ 10</span></span>
              <span className='comments clickable' onClick={() => navigate(`/restaurantRates/${selectedRestaurant?._id}`)}>{selectedRestaurant?.rating.length || 0}</span>
            </span>
              <span>
                {
                  selectedRestaurant?.specialty?.map((item: any, index: number) => `${index !== 0 ? ' • ' : ''}${item}`)
                }
              </span>
              <span>Prix moyen {selectedRestaurant?.avgPrice[0] || 0} €</span>
              <span>{selectedRestaurant?.address} • <span className='clickable moreInfo'
                                                          onClick={() => setMoreDetail({
                                                            isOpen: true,
                                                            mobile: deviceWidth <= 768,
                                                          })}>Plus d'informations</span></span>
            </div>
            <div>
              <img onClick={setFav} className={'clickable'} draggable={false} src={isFavorite ? filledHeart : emptyHeart} alt='' />
            </div>
          </div>
          {deviceWidth > 626 && <RestaurantMap item={selectedRestaurant} id={'restaurantPosition'} />}
        </div>
        {
          deviceWidth < 920 && selectedRestaurant?.type === 'RESERVATION' && (
            <div className='restaurantTabsContainer'>
              <div style={{ padding: '0 5vw', display: 'flex', justifyContent: 'end' }} className='tabs'>
                <button className={'btn success'} style={{ margin: '18px 0 0 0' }} onClick={() => reserveTable()}>Réservez une table
                </button>
              </div>
            </div>
          )
        }
        <div style={{ padding: '18px 5vw' }}>
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
              {deviceWidth > 919 && selectedRestaurant?.type === 'RESERVATION' && <button className='btn success' onClick={() => reserveTable()}>Réservez une table</button>}
            </div>
            <div style={getMargin()} className='underline' />
            <div className='horizontalSeparator' />
          </div>

          {
            array.map((item) => {
              // ['ENTRIES', 'DISHES', 'DESSERTS', 'DRINKS']
              let dataArr = []
              switch (item) {
                case 'ENTRIES':
                  dataArr = selectedRestaurant?.entrée || []
                  break
                case 'DISHES':
                  dataArr = selectedRestaurant?.plats || []
                  break
                case 'DESSERTS':
                  dataArr = selectedRestaurant?.deserts || []
                  break
                case 'DRINKS':
                  dataArr = selectedRestaurant?.boissons || []
                  break
                default:
                  dataArr = []
                  break;
              }
              return (
                <div className='optionsContainer'>
                  <span id={item}>{t(`RESTAURANT.${item}`)}</span>
                  <div style={{ margin: '40px' }} />
                  <div className='cards'>
                    {dataArr.map((item: any) => {
                      return (
                        <RestaurantCard openReservation={() => {
                          setShoppingModal({
                            isOpen: true,
                            mobile: deviceWidth <= 768,
                          })
                        }} restaurant={selectedRestaurant} item={item} />
                      )
                    })}
                  </div>
                  {
                    dataArr.length === 0 && (
                      <EmptyMessage config={{
                        title: 'Il n\'ya pas des donnée en ce moment'
                      }}/>
                    )
                  }
                </div>
              )
            })
          }
        </div>

        {/* Modals */}

        <Modal
          open={shoppingModal.isOpen && !shoppingModal.mobile}
          onClose={() => setShoppingModal({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })}
        >
          <Box sx={style}>
            <ModalReservation restaurant={selectedRestaurant} closeEvent={() => setShoppingModal({
              isOpen: false,
              mobile: deviceWidth <= 768,
            })} />
          </Box>
        </Modal>
        <Modal
          open={moreDetail.isOpen && !moreDetail.mobile}
          onClose={() => setMoreDetail({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })}
        >
          <Box sx={style}>
            <MoreDetailModal closeEvent={() => setMoreDetail({
              isOpen: false,
              mobile: deviceWidth <= 768,
            })}
                             item={selectedRestaurant} />
          </Box>
        </Modal>

        <ShoppingModal />

        {/* bottom sheet */}
        <BottomSheet onDismiss={() => {
          setMoreDetail({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })
          setShoppingModal({
            isOpen: false,
            mobile: deviceWidth <= 768,
          })
        }} open={(moreDetail.isOpen && moreDetail.mobile) || (shoppingModal.isOpen && shoppingModal.mobile)}>
          {
            moreDetail.isOpen && (
              <MoreDetailModal item={selectedRestaurant} closeEvent={() => setMoreDetail({
                isOpen: false,
                mobile: deviceWidth <= 768,
              })} />
            )
          }
          {
            shoppingModal.isOpen && (
              <ModalReservation restaurant={selectedRestaurant} closeEvent={() => setShoppingModal({
                isOpen: false,
                mobile: deviceWidth <= 768,
              })} />
            )
          }
        </BottomSheet>

      </div>
    ) : <></>
  )
}

export default Restaurant
