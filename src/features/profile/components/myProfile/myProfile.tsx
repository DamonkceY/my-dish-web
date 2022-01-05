import './myProfile.scss'
import React from 'react'
import avatar from '../../../../assets/avatar2.svg'
import backArrow from '../../../../assets/back.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { useNavigate } from 'react-router-dom'
const MyProfile = () => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const navigate = useNavigate();
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
          <span>Mon profil</span>
        </span>
        <span className='update'>Modifier</span>
      </div>
      <div style={{margin: '20px 0'}} className='horizontalSeparator'/>
      <div className='profileInputs'>
        <div className='avatarWithName'>
          <img draggable={false} src={avatar} alt=''/>
          <div className='desc'>
            <span className='name'>Ahmed Saidi</span>
            <span>+33 656714239</span>
          </div>
        </div>
        <div className='inputs'>
          <div className='inputCont'>
            <span>Nom</span>
            <input tabIndex={-1} value='saidi' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Prénom</span>
            <input tabIndex={-1} value='Ahmed' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Adresse</span>
            <input tabIndex={-1} className='address' value='10 rue Gustave Flaubert, 75017 Paris.' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Code postal</span>
            <input tabIndex={-1} value='75017' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Pays</span>
            <input tabIndex={-1} value='France' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>E-mail</span>
            <input tabIndex={-1} value='Ahmed@gmail.com' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Carte bancaire</span>
            <input tabIndex={-1} value='visa 1411 ' className='bankAcc' type='text' name='' id=''/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
