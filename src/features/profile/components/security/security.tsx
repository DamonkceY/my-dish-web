import './security.scss'
import React from 'react'

const Security = () => {
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span>Mot de passe et sécurité</span>
      </div>
      <div style={{margin: '20px 0'}} className='horizontalSeparator' />

      <div className='hintsCont'>
        <span className='title'>Mot de passe</span>
        <span className='hint'>
        Pour modifier votre mot de passe, vous devez d’abord confirmer le mot de passe actuel. Ensuite, créez un nouveau mot de passe.
      </span>
      </div>
      <div className='advancedInputCont'>
        <span>
          <span>Mot de passe actuel</span>
          <span style={{padding: '0 20px'}}/>
          <span>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</span>
        </span>
        <button>Modifier</button>
      </div>
      <div style={{height: '24px'}}/>
      <div className='hintsCont'>
        <span className='title'>Méthodes de validation</span>
        <span className='hint'>Pour modifier votre numéro de téléphone vous devez d'abord saisissez le code sms pour vérifier votre identité.</span>
      </div>
      <div className='advancedInputCont'>
        <span>
          <span>Téléphone portable</span>
          <span style={{padding: '0 20px'}}/>
          <span className='phone'>+33 01 40 79 92 79</span>
        </span>
        <button>Modifier</button>
      </div>
    </div>
  )
}

export default Security
