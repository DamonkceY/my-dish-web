import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './register.scss'
import PhoneNumberInput from '../../../../sharedComponents/phoneNumberInput/phoneNumberInput'
import Button from '../../../../sharedComponents/button/button'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../app/utils/paths/Paths'
import InputField from '../../../../sharedComponents/inputField/inputField'
import * as Path from 'path'

const Register: React.FC<{}> = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [buttonText, setButtonText] = useState('NEXT')
  const registerSteps: Array<Array<JSX.Element>> = [
    [
      <PhoneNumberInput
        key={1}
        config={{ label: 'REGISTER.ENTER_THE_PHONE_NUMBER', placeholder: 'REGISTER.PHONE_NUMBER' }} />,
    ],
    [
      <InputField
        key={2}
        config={{ label: 'SMS_VERIFICATION.ENTER_CODE', placeholder: 'SMS_VERIFICATION.FOUR_DIGITS_CODE', type: 'text' }} />,
    ],
    [
      <InputField key={3} config={{ label: 'REGISTER.ENTER_THE_EMAIL', placeholder: 'REGISTER.EMAIL', type: 'text' }} />,
    ],
    [
      <InputField
        key={4}
        config={{ label: 'REGISTER.ENTER_YOUR_FULL_NAME', placeholder: 'REGISTER.FAMILY_NAME', type: 'text' }} />,
      <InputField key={5} config={{ label: '', placeholder: 'REGISTER.NAME', type: 'text' }} />,
    ],
    [
      <InputField
        key={6}
        config={{ label: 'PASSWORD.ENTER_THE_PASSWORD', placeholder: 'PASSWORD.PASSWORD', type: 'password' }} />,
      <InputField key={7} config={{ label: '', placeholder: 'PASSWORD.CONFIRM_PASSWORD', type: 'password' }} />,
    ],
    [<Congrats key={8} name={'Ahmed'} />],
  ]
  const toNextStep = () => {
    if (stepIndex < registerSteps.length - 1){
      setStepIndex(stepIndex + 1)
      stepIndex+1 === registerSteps.length - 1 && setButtonText('REGISTER.BEGIN_MYDISH_EXPERIENCE')
    }else {
      navigate(Paths.home)
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
        <button style={{width: '100%'}} onClick={toNextStep}>{t(buttonText)}</button>
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
