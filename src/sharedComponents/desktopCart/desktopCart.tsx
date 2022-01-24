import './desktopCart.scss'
import { useAppSelector } from '../../app/store/hooks'
import { selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { Paths } from '../../app/utils/paths'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { selectOrderDetails } from '../../app/store/storeModules/cart/cartSlice'

const DesktopCart = () => {
  const navigate = useNavigate()

  const connectedUser = useAppSelector(selectConnectedUser)
  const orderDetails = useAppSelector(selectOrderDetails)
  const width = useAppSelector(selectDeviceWidth)
  const location = useLocation();
  return (
    (!!connectedUser && width > 768 && !!orderDetails && location.pathname !== '/shop') ? <div onClick={() => navigate(Paths.cart)} className={'desktopCartCont'}>
      <div className={'cart'} />
    </div> : <></>
  )
}


export default DesktopCart
