import InputField from '../../../../../sharedComponents/inputField/inputField'
import React, { useEffect, useRef, useState } from 'react'
import {
  confirmPhoneNumber,
  updateProfileRequest,
} from '../../../../../app/store/storeModules/authentication/authenticationService'
import { useAppSelector } from '../../../../../app/store/hooks'
import { selectConnectedUser } from '../../../../../app/store/storeModules/authentication/authenticationSlice'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import PhoneNumberInput from '../../../../../sharedComponents/phoneNumberInput/phoneNumberInput'
import { useNavigate } from 'react-router-dom'

const ChangePhoneNumber = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const connectedUser = useAppSelector(selectConnectedUser)
  const [validButton, setValidButton] = useState(false)
  const [stepIndex, setStepIndex] = useState(!connectedUser?.telephone ? 1 : 0)
  const [buttonText, setButtonText] = useState('NEXT')
  const [selectedCountry, setSelectedCountry] = useState<any>(undefined)
  const form = useRef<any>(null)
  const confirmPhone = useRef({
    old: '',
    new: ''
  })
  useEffect(() => {
    form.current = {
      firstName: connectedUser?.firstName,
      lastName: connectedUser?.lastName,
      address: connectedUser?.address,
      postalCode: connectedUser?.postalCode,
      country: connectedUser?.country,
      telephone: connectedUser?.telephone,
    }
  }, [connectedUser])
  const STEPS: Array<Array<JSX.Element>> = [
    [
      <Hint config={{
        text: 'Pour des raisons de sécurité, merci de confirmer votre identité.',
        type: 'info',
      }} />,
      <span className={'stepperLabel'}>Vérifiez votre identité</span>,
      <InputField
        key={1}
        config={{
          labelSalt: connectedUser?.telephone?.toString()?.slice(-2) as string,
          label: 'Saisissez le code que nous avons envoyé au numéro de téléphone se terminant par ',
          placeholder: 'SMS_VERIFICATION.FOUR_DIGITS_CODE',
          type: 'number',
          onInit: () => confirmPhoneNumber({ phone: connectedUser?.telephone.toString() as string }).then((res: any) => confirmPhone.current.old = res.data),
          onChange: (value: string) => {
            setValidButton(value.length > 0 && value.toString() === confirmPhone.current.old.toString())
          },
          rules: {
            minLength: 4,
            maxLength: 4,
          },
        }}
      />,
    ], [
      <span className={'stepperLabel'}>Nouveau numéro de téléphone</span>,
      <PhoneNumberInput
        key={2}
        config={{
          label: 'Nous vous enverrons un code de validation unique par SMS pour confirmer votre numéro',
          placeholder: 'REGISTER.PHONE_NUMBER',
          onChange: (value: { number: number, country: any }) => {
            if(form.current) {
              form.current.telephone = value.number
              setSelectedCountry(value.country)
              setValidButton(!isNaN(value.number) && value.number.toString().length > 6)
            }
          },
        }} />,
    ], [
      <span className={'stepperLabel'}>Nouveau numéro de téléphone</span>,
      <InputField
        key={2}
        config={{
          labelSalt: `${selectedCountry?.dialCode} ${form.current?.telephone}`,
          label: 'SMS_VERIFICATION.ENTER_CODE',
          placeholder: 'SMS_VERIFICATION.FOUR_DIGITS_CODE',
          type: 'number',
          rules: {
            minLength: 4,
            maxLength: 4,
          },
          onInit: () => confirmPhoneNumber({ phone: `${selectedCountry?.dialCode}${form.current?.telephone}` }).then((res: any) => confirmPhone.current.new = res.data),
          onChange: (value: string) => {
            setValidButton(value.length > 0 && value.toString() === confirmPhone.current.new.toString())
          },
        }} />,
    ],
  ]

  const toNextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      updateProfileRequest(form.current).then(() => {
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
              onClick={toNextStep}>{t(buttonText)}</button>
      <span onClick={() => navigate('/profile/security')} className={'labelCancel clickable'}>Annuler</span>
    </div>
  )
}

export const Hint: React.FC<{ config: { text: string, type: 'info' | 'danger' } }> = ({ config }) => {
  return (
    <div className={`hintContainer ${config.type}`}>
      <span>{config.text}</span>
    </div>
  )
}

export default ChangePhoneNumber
