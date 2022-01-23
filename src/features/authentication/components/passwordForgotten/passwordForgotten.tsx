import React, { useRef, useState } from 'react'
import InputField from '../../../../sharedComponents/inputField/inputField'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './passwordForgotten.scss'
import { Paths } from '../../../../app/utils/paths'
import { emailRegex } from '../../../../app/consts/regex'

const PasswordForgotten: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const [buttonText, setButtonText] = useState('NEXT')
  const [validButton, setValidButton] = useState(false)
  const forgottenPasswordForm = useRef({
    email: '',
  })
  const passwordSteps: Array<Array<JSX.Element>> = [
    [
      <InputField config={{
        label: 'REGISTER.ENTER_THE_EMAIL',
        placeholder: 'REGISTER.EMAIL',
        type: 'text',
        rules: {
          pattern: emailRegex,
          required: true
        },
        onChange: (value: string) => {
          forgottenPasswordForm.current.email = value
          setValidButton(value.length > 0)
        },
      }} />,
    ],
    [
      <div className='verticalFlex'>
        <span>{t('PASSWORD.EMAIL_SENT_HINT_1')}: <b>{forgottenPasswordForm.current.email}</b></span>
        <span>{t('PASSWORD.EMAIL_SENT_HINT_2')}</span>
      </div>,
    ],
  ]

  const toNextStep = () => {
    if (stepIndex < passwordSteps.length - 1) {
      setStepIndex(stepIndex + 1)
      stepIndex + 1 === passwordSteps.length - 1 && setButtonText('RETURN_HOME')
    } else {
      navigate(Paths.home)
    }
  }

  return (
    <div>
      <label className='boldLabelTitle'>{t('PASSWORD.HINT')}</label>
      <div style={{ margin: '40px 0' }}>
        {
          passwordSteps[stepIndex].map((item: JSX.Element) => item)
        }
      </div>
      <button disabled={!validButton} className={`btn ${validButton ? 'success' : 'error'}`} style={{ width: '100%' }}
              onClick={toNextStep}>{t(buttonText)}</button>
      {
        stepIndex === 0 && (
          <div>
            <span className='getConnected'>
              <span>{`${t('LOGIN.YOU_ARE_NEW')} `}</span>
              <span className='link' onClick={() => navigate(Paths.auth.index + '/' + Paths.auth.register)}>
                {t('LOGIN.CREATE_ACCOUNT')}
              </span>
            </span>
          </div>
        )
      }
    </div>
  )
}

export default PasswordForgotten
