import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import InputField from '../../../../sharedComponents/inputField/inputField'
import Button from '../../../../sharedComponents/button/button'
import { Paths } from '../../../../app/utils/paths/Paths'
import google from '../../../../assets/googleIcon.svg'
import facebook from '../../../../assets/facebookIcon.svg'
import next from '../../../../assets/suivant.svg'
import './login.scss'

const FirstStepLogin = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const loginSteps: Array<Array<JSX.Element>> = [
    [
      <InputField config={{
        label: 'LOGIN.ENTER_PHONE_NUMBER_OR_EMAIL',
        placeholder: 'LOGIN.PHONE_NUMBER_OR_EMAIL',
        type: 'text',
      }} />,
    ],
    [
      <InputField config={{ label: 'PASSWORD.ENTER_THE_PASSWORD', placeholder: 'PASSWORD.PASSWORD', type: 'text' }} />,
    ],
  ]
  const toNextStep = () => {
    if (stepIndex < loginSteps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      console.log('finish !')
    }
  }

  return (
    <div>
      <label className='boldLabelTitle'>{t('LOGIN.HINT')}</label>
      <div style={{ margin: '40px 0' }}>
        {
          loginSteps[stepIndex].map((item: JSX.Element) => item)
        }
      </div>
      <Button config={{ text: 'NEXT', isEnabled: true, onClick: toNextStep }} />
      {
        stepIndex === 0 ? (
          <div>
            <span className='getConnected'>
              <span>{`${t('LOGIN.YOU_ARE_NEW')} `}</span>
              <span className='link' onClick={() => navigate(Paths.auth.register)}>
                {t('LOGIN.CREATE_ACCOUNT')}
              </span>
            </span>
            <ConnectWithGoogleOrFacebook />
          </div>
        ) : (
          <span className='getConnected'>
            <span className='link' onClick={() => navigate(Paths.auth.passwordForgotten)}>
              {t('PASSWORD.HINT')}
            </span>
          </span>
        )
      }
    </div>
  )
}

const ConnectWithGoogleOrFacebook = () => {
  const { t } = useTranslation()
  const socialMedia = [
    {
      icon: google,
      text: 'LOGIN.CONNECT_WITH_GOOGLE',
    },
    {
      icon: facebook,
      text: 'LOGIN.CONNECT_WITH_FACEBOOK',
    },
  ]
  return (
    <div>
      <div className='separator'>
        <h5>
          <span>{t('LOGIN.OR')}</span>
        </h5>
      </div>
      <div className='socialMediaContained'>
        {
          socialMedia.map((item) => (
            <div className='socialMedia'>
              <div className='iconTextCont'>
                <div style={{ width: '21px' }}>
                  <img src={item.icon} alt='' />
                </div>
                <span style={{ marginLeft: '19px' }}>{t(item.text)}</span>
              </div>
              <img className='arrow' src={next} alt='' />
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default FirstStepLogin
