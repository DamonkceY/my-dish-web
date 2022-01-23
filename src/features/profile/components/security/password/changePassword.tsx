import InputField from '../../../../../sharedComponents/inputField/inputField'
import {
  changePasswordRequest,
} from '../../../../../app/store/storeModules/authentication/authenticationService'
import React, { useRef, useState } from 'react'
import { Hint } from '../phone/changePhoneNumber'
import { AvatarWithName } from '../../myProfile/myProfile'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../app/store/hooks'
import { selectConnectedUser } from '../../../../../app/store/storeModules/authentication/authenticationSlice'


const ChangePassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const connectedUser = useAppSelector(selectConnectedUser)
  const [validButton, setValidButton] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    pass: '',
    conf: '',
  })
  const form = useRef<any>({
    password: '',
    newPassword: ''
  })

  const STEPS: Array<Array<JSX.Element>> = [
    [
      <Hint config={{
        text: 'Pour des raisons de sécurité, merci de confirmer votre identité.',
        type: 'info',
      }} />,
      <span className={'stepperLabel'}>Entrez votre mot de passe</span>,
      <div style={{margin: ' 0 0 20px 0'}} className={'profileInputs'}><AvatarWithName/></div>,
      <InputField
        key={1}
        config={{
          label: 'PASSWORD.ENTER_THE_PASSWORD',
          placeholder: 'PASSWORD.PASSWORD',
          type: 'password',
          rules: {
            minLength: 8,
          },
          onChange: (value: string) => {
            form.current.password = value
            setValidButton(value.length > 0)
          },
        }} />,
    ], [
      <span className={'stepperLabel'}>Nouveau mot de passe</span>,
      <span style={{width: '100%', display: 'inline-block', padding: '0 0 10px 0'}}>Vous allez modifier le mot de passe de <b>{connectedUser?.email}</b></span>,
      <InputField
        key={2}
        config={{
          label: 'PASSWORD.ENTER_THE_PASSWORD',
          placeholder: 'PASSWORD.PASSWORD',
          type: 'password',
          rules: {
            minLength: 8,
          },
          onInit: () => {setValidButton(false)},
          onChange: (value: string) => {
            form.current.newPassword = value
            setPasswordConfirmation({ ...passwordConfirmation, pass: value })
          },
        }} />,
      <InputField key={3} config={{
        label: '',
        placeholder: 'PASSWORD.CONFIRM_PASSWORD',
        type: 'password',
        rules: {
          sameAs: passwordConfirmation.pass,
          minLength: 8,
        },
        onChange: (value: string) => {
          setValidButton(value.length > 0)
        },
      }} />,
    ],
  ]

  const toNextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      changePasswordRequest(form.current).then(() => {
        navigate('/profile/security')
      })
    }
  }

  return (
    <div>
      <div style={{ margin: '40px 0' }}>
        {
          STEPS[stepIndex].map((item: JSX.Element) => item)
        }
      </div>
      <button disabled={!validButton} className={`btn ${validButton ? 'success' : 'error'}`} style={{ width: '100%' }}
              onClick={toNextStep}>{t('NEXT')}</button>
      <span onClick={() => navigate('/profile/security')} className={'labelCancel clickable'}>Annuler</span>
    </div>
  )
}


export default ChangePassword
