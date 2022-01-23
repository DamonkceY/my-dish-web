import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import InputField from '../../../../sharedComponents/inputField/inputField'
import { Paths } from '../../../../app/utils/paths'
import google from '../../../../assets/googleIcon.svg'
import facebook from '../../../../assets/facebookIcon.svg'
import next from '../../../../assets/suivant.svg'
import './login.scss'
import {
  FacebookLoginDataInterface,
  SimpleLoginDataInterface,
} from '../../../../app/utils/interfaces/apiInterfaces/authInterfaces'
import { loginRequest } from '../../../../app/store/storeModules/authentication/authenticationService'
import { emailRegex } from '../../../../app/consts/regex'
import { useAppDispatch } from '../../../../app/store/hooks'
import { pushToToastsArray } from '../../../../app/store/storeModules/root/root'
import { generateUniqueId } from '../../../../app/utils/func/commonFuncs'
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import { connectWithGoogle } from '../../../../app/utils/firebase'
import { authEndpoints } from '../../../../app/utils/endpoints'
// import GoogleLogin from 'react-google-login';


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [validButton, setValidButton] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const loginForm = useRef<SimpleLoginDataInterface>({
    email: '',
    password: '',
  })
  const loginSteps: Array<Array<JSX.Element>> = [
    [
      <InputField
        key={1}
        config={{
          label: 'LOGIN.ENTER_PHONE_NUMBER_OR_EMAIL',
          placeholder: 'LOGIN.PHONE_NUMBER_OR_EMAIL',
          type: 'text',
          onChange: (value: string) => {
            loginForm.current.email = value
            setValidButton(stepIndex === 0 && value.length > 0)
          },
          rules: {
            required: true,
            pattern: emailRegex,
          },
        }}
      />,
    ],
    [
      <InputField key={2} config={{
        label: 'PASSWORD.ENTER_THE_PASSWORD',
        placeholder: 'PASSWORD.PASSWORD',
        type: 'password',
        onChange: (value: string) => {
          loginForm.current.password = value
          setValidButton(stepIndex === 1 && value.length > 0)
        },
        rules: {
          required: true,
          minLength: 8,
        },
      }} />,
    ],
  ]
  const toNextStep = () => {
    if (stepIndex < loginSteps.length - 1) {
      setStepIndex(stepIndex + 1)
      setValidButton(false)
    } else {
      attemptLogin(loginForm.current, authEndpoints.login)
    }
  }

  const attemptLogin = (data: any, url: string) => {
    loginRequest(data, url).then((res) => {
      navigate(Paths.home)
    }).catch(err => {
      if (err.code === 404) {
        setStepIndex(0)
        dispatch(pushToToastsArray({
          uniqueId: generateUniqueId(),
          message: 'Votre identifiant n\'est pas valide',
          type: 'danger',
        }))
      } else {
        dispatch(pushToToastsArray({
          uniqueId: generateUniqueId(),
          message: 'Votre mot de passe est incorrecte',
          type: 'danger',
        }))
      }
    })
  }

  return (
    <div>
      <label className='boldLabelTitle'>{t('LOGIN.HINT')}</label>
      <div style={{ margin: '40px 0' }}>
        {
          loginSteps[stepIndex].map((item: JSX.Element) => item)
        }
      </div>
      <button disabled={!validButton} className={`btn ${validButton && 'success'}`} style={{ width: '100%' }}
              onClick={toNextStep}>{t('NEXT')}</button>
      {
        stepIndex === 0 ? (
          <div>
            <span className='getConnected'>
              <span>{`${t('LOGIN.YOU_ARE_NEW')} `}</span>
              <span className='link' onClick={() => navigate(Paths.auth.register)}>
                {t('LOGIN.CREATE_ACCOUNT')}
              </span>
            </span>
            <ConnectWithGoogleOrFacebook loginReq={attemptLogin} />
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

const ConnectWithGoogleOrFacebook: React.FC<{ loginReq: Function }> = ({ loginReq }) => {
  const { t } = useTranslation()
  const facebookRef = useRef<HTMLDivElement | null>(null)
  const socialMedia = [
    {
      icon: google,
      text: 'LOGIN.CONNECT_WITH_GOOGLE',
      onClick: () => {
        connectWithGoogle().then((res: any) => {
          loginReq({
              idToken: res._tokenResponse.oauthIdToken,
            },
            authEndpoints.loginWithGoogle)
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },
    },
    {
      icon: facebook,
      text: 'LOGIN.CONNECT_WITH_FACEBOOK',
      onClick: () => {
        if (!!facebookRef.current) {
          const facebookButton = facebookRef.current?.querySelector('button')
          facebookButton && facebookButton.click()
        }
      },
    },
  ]

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response)
    const fbLoginData: FacebookLoginDataInterface = {
      accessToken: response.accessToken,
      userID: response.userID,
    }
    loginReq(fbLoginData, authEndpoints.loginWithFacebook)
  }

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
            <div onClick={() => item.onClick && item.onClick()} key={item.text} className='socialMedia'>
              <div className='iconTextCont'>
                <div style={{ width: '21px' }}>
                  <img draggable={false} src={item.icon} alt='' />
                </div>
                <span style={{ marginLeft: '19px' }}>{t(item.text)}</span>
              </div>
              <img draggable={false} className='arrow' src={next} alt='' />
            </div>
          ))
        }
        <div ref={facebookRef} style={{ display: 'none' }}>
          <FacebookLogin
            appId='968484060691544'
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  )
}
export default Login
