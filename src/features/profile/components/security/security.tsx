import './security.scss'
import React from 'react'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import backArrow from '../../../../assets/back.svg'
import { useNavigate } from 'react-router-dom'
import { selectConnectedUser } from '../../../../app/store/storeModules/authentication/authenticationSlice'

const Security = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const connectedUser = useAppSelector(selectConnectedUser)
  const navigate = useNavigate()
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
          <span>Mot de passe et sécurité</span>
        </span>
      </div>
      <div style={{ margin: '20px 0' }} className='horizontalSeparator' />

      <div className='hintsCont'>
        <span className='title'>Mot de passe</span>
        <span className='hint'>
        Pour modifier votre mot de passe, vous devez d’abord confirmer le mot de passe actuel. Ensuite, créez un nouveau mot de passe.
      </span>
      </div>
      <div className='advancedInputCont'>
        <span>
          <span>Mot de passe actuel</span>
          <span style={{ padding: '0 20px' }} />
          <span>{
            deviceWidth < 432 ? '' : <span>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</span>
          }</span>
        </span>
        <button onClick={() => navigate('/security/password')} className={'btn cursorEnabled'}>Modifier</button>
      </div>
      <div style={{ height: '24px' }} />
      <div className='hintsCont'>
        <span className='title'>Méthodes de validation</span>
        <span className='hint'>Pour modifier votre numéro de téléphone vous devez d'abord saisissez le code sms pour vérifier votre identité.</span>
      </div>
      <div className='advancedInputCont'>
        <span>
          <span>Téléphone portable</span>
          <span style={{ padding: '0 20px' }} />
          <span className='phone'>{connectedUser?.telephone}</span>
        </span>
        <button onClick={() => navigate('/security/phone')} className={'btn cursorEnabled'}>Modifier</button>
      </div>
    </div>
  )
}

export default Security
