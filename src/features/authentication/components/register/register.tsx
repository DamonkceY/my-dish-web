import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './register.scss'
import PhoneNumberInput from '../../../../sharedComponents/phoneNumberInput/phoneNumberInput'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../app/utils/paths'
import InputField from '../../../../sharedComponents/inputField/inputField'
import { RegisterDataInterface } from '../../../../app/utils/interfaces/apiInterfaces/authInterfaces'
import { emailRegex } from '../../../../app/consts/regex'
import {
  confirmPhoneNumber, loginRequest,
  registerRequest,
} from '../../../../app/store/storeModules/authentication/authenticationService'
import { pushToToastsArray } from '../../../../app/store/storeModules/root/root'
import { generateUniqueId } from '../../../../app/utils/func/commonFuncs'
import { useAppDispatch } from '../../../../app/store/hooks'
import { authEndpoints } from '../../../../app/utils/endpoints'

const Register: React.FC<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [buttonText, setButtonText] = useState('NEXT')
  const [validButton, setValidButton] = useState(false)
  const confirmationCode = useRef('')
  const registerForm = useRef<RegisterDataInterface>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    country: '',
    password: '',
    telephone: NaN,
  })
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    pass: '',
    conf: '',
  })
  const [selectedCountry, setSelectedCountry] = useState<any>(undefined)
  const registerSteps: Array<Array<JSX.Element>> = [
    [
      <PhoneNumberInput
        key={1}
        config={{
          label: 'REGISTER.ENTER_THE_PHONE_NUMBER',
          placeholder: 'REGISTER.PHONE_NUMBER',
          defaultValue: {
            number: registerForm.current.telephone,
            country: selectedCountry,
          },
          onChange: (value: { number: number, country: any }) => {
            registerForm.current.telephone = value.number
            setSelectedCountry(value.country)
            setValidButton(!isNaN(value.number) && value.number.toString().length > 6)
          },
        }} />,
    ],
    [
      <InputField
        key={2}
        config={{
          labelSalt: `${selectedCountry?.dialCode} ${registerForm.current?.telephone}`,
          label: 'SMS_VERIFICATION.ENTER_CODE',
          placeholder: 'SMS_VERIFICATION.FOUR_DIGITS_CODE',
          type: 'number',
          rules: {
            minLength: 4,
            maxLength: 4,
          },
          onInit: () => confirmPhoneNumber({ phone: `${selectedCountry?.dialCode}${registerForm.current?.telephone}` }).then((res: any) => confirmationCode.current = res.data),
          onChange: (value: string) => {
            setValidButton(value.length > 0 && value.toString() === confirmationCode.current.toString())
          },
        }} />,
    ],
    [
      <InputField key={3} config={{
        label: 'REGISTER.ENTER_THE_EMAIL',
        placeholder: 'REGISTER.EMAIL',
        type: 'text',
        defaultValue: registerForm.current.email,
        rules: {
          pattern: emailRegex,
          required: true,
        },
        onChange: (value: string) => {
          registerForm.current.email = value
          setValidButton(value.length > 0)
        },
      }} />,
    ],
    [
      <InputField
        key={4}
        config={{
          label: 'REGISTER.ENTER_YOUR_FULL_NAME',
          placeholder: 'REGISTER.FAMILY_NAME',
          type: 'text',
          defaultValue: registerForm.current.lastName,
          onInit: () => {
            setValidButton(registerForm.current.lastName.length > 0 && registerForm.current.firstName.length > 0)
          },
          onChange: (value: string) => {
            registerForm.current.lastName = value
            setValidButton(value.length > 0 && registerForm.current.firstName.length > 0)
          },
        }} />,
      <InputField key={5} config={{
        label: '',
        placeholder: 'REGISTER.NAME',
        type: 'text',
        defaultValue: registerForm.current.firstName,
        onInit: () => {
          setValidButton(registerForm.current.lastName.length > 0 && registerForm.current.firstName.length > 0)
        },
        onChange: (value: string) => {
          registerForm.current.firstName = value
          setValidButton(value.length > 0 && registerForm.current.lastName.length > 0)
        },
      }} />,
    ],
    [
      <InputField
        key={6}
        config={{
          label: 'PASSWORD.ENTER_THE_PASSWORD',
          placeholder: 'PASSWORD.PASSWORD',
          type: 'password',
          rules: {
            minLength: 8,
          },
          onChange: (value: string) => {
            registerForm.current.password = value
            setPasswordConfirmation({ ...passwordConfirmation, pass: value })
          },
        }} />,
      <InputField key={7} config={{
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
    [<Congrats key={8} name={registerForm.current.firstName} />],
  ]
  const toNextStep = () => {
    if (stepIndex < registerSteps.length - 1) {
      console.log(stepIndex)
      if (stepIndex === registerSteps.length - 2) {
        registerRequest(registerForm.current).then((res) => {
          setStepIndex(stepIndex + 1)
        }).catch(() => {
          dispatch(pushToToastsArray({
            uniqueId: generateUniqueId(),
            message: 'L\'email ou le numéro de téléphone existe déjà',
            type: 'danger',
          }))
          setStepIndex(0)
        })
      } else if (stepIndex + 1 !== registerSteps.length - 1) {
        setStepIndex(stepIndex + 1)
        setValidButton(false)
      } else {
        setStepIndex(stepIndex + 1)
        setButtonText('REGISTER.BEGIN_MYDISH_EXPERIENCE')
      }
    } else {
      loginRequest({ email: registerForm.current.email, password: registerForm.current.password }, authEndpoints.login).then((res) => {
        navigate(Paths.home)
      })
    }
  }
  return (
    <div className='registerFirstStepContainer'>
      {(stepIndex !== registerSteps.length - 1) && <label className='boldLabelTitle'>{t('REGISTER.HINT')}</label>}
      <div>
        <div style={{ margin: '40px 0' }}>
          {
            registerSteps[stepIndex].map((item: JSX.Element) => item)
          }
        </div>
        <button disabled={!validButton} className={`btn ${validButton ? 'success' : 'error'}`} style={{ width: '100%' }}
                onClick={toNextStep}>{t(buttonText)}</button>
        {
          stepIndex === 0 && (
            <span className='getConnected'>
              <span>{`${t('REGISTER.ALREADY_HAVE_AN_ACCOUNT')} `}</span>
              <span className='link' onClick={() => navigate(Paths.auth.index)}>
                {t('REGISTER.GET_CONNECTED')}
              </span>
            </span>
          )
        }
      </div>

    </div>
  )
}

const Congrats: React.FC<{ name: string }> = ({ name }) => {
  const { t } = useTranslation()
  return (
    <div className='congratsContainer'>
      <label className='boldLabelTitle'>
        {`${t('REGISTER.CONGRATS')} ${name.charAt(0).toUpperCase() + name.slice(1)} !`}
      </label>
      <span>
        {t('REGISTER.ACCOUNT_CREATED_SUCCESSFULLY')}
      </span>
    </div>
  )
}

export default Register
