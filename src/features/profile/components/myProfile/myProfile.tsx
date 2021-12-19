import './myProfile.scss'
import React from 'react'
import avatar from '../../../../assets/avatar2.svg'
const MyProfile = () => {
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span>Mon profil</span>
        <span className='update'>Modifier</span>
      </div>
      <div className='horizontalSeparator'/>
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
            <input value='saidi' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Prénom</span>
            <input value='Ahmed' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Adresse</span>
            <input className='address' value='10 rue Gustave Flaubert, 75017 Paris.' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Code postal</span>
            <input value='75017' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Pays</span>
            <input value='France' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>E-mail</span>
            <input value='Ahmed@gmail.com' type='text' name='' id=''/>
          </div>
          <div className='inputCont'>
            <span>Carte bancaire</span>
            <input value='visa 1411 ' className='bankAcc' type='text' name='' id=''/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
