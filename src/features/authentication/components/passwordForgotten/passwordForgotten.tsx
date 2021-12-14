import React, { useState } from 'react'
import InputField from '../../../../sharedComponents/inputField/inputField'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../../../sharedComponents/button/button'
import { Paths } from '../../../../app/utils/paths/Paths'

const PasswordForgotten: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const [buttonText, setButtonText] = useState('NEXT')
  const passwordSteps: Array<Array<JSX.Element>> = [
    [
      <InputField config={{
        label: 'REGISTER.ENTER_THE_EMAIL',
        placeholder: 'REGISTER.EMAIL',
        type: 'text',
      }} />,
    ],
    [
      <div className='verticalFlex'>
        <span>{t('PASSWORD.EMAIL_SENT_HINT_1')}</span>
        <span>{t('PASSWORD.EMAIL_SENT_HINT_2')}</span>
      </div>
    ],
  ]

  const toNextStep = () => {
    if (stepIndex < passwordSteps.length - 1) {
      setStepIndex(stepIndex + 1)
      stepIndex + 1 === passwordSteps.length - 1 && setButtonText('RETURN_HOME')
    } else {
      console.log('finish !')
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
      <Button config={{ text: buttonText, isEnabled: true, onClick: toNextStep }} />
      {
        stepIndex === 0 && (
          <div>
            <span className='getConnected'>
              <span>{`${t('LOGIN.YOU_ARE_NEW')} `}</span>
              <span className='link' onClick={() => navigate(Paths.auth.index+ '/' +Paths.auth.register)}>
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
