import './desktopCart.scss'
import { useAppSelector } from '../../app/store/hooks'
import { selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { Paths } from '../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'

const DesktopCart = () => {
  const navigate = useNavigate()

  const connectedUser = useAppSelector(selectConnectedUser)
  const width = useAppSelector(selectDeviceWidth)
  return (
    !!connectedUser && width > 768? <div onClick={() => navigate(Paths.cart)} className={'desktopCartCont'}>
      <div className={'cart'} />
    </div> : <></>
  )
}


export default DesktopCart
