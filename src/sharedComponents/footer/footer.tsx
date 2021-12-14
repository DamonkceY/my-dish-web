import './footer.scss'
import logo from '../../assets/logoWhite.svg'
import fb from '../../assets/contactFacebook.svg'
import tt from '../../assets/contactTwitter.svg'
import ig from '../../assets/contactInstagram.svg'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className='footerContainer'>
      <div className='up'>
        <div className='footerUpOne'>
          <img draggable={false} height='50px' src={logo} alt='' />
          <span className='clickable'>{t('FOOTER.ABOUT')}</span>
          <span className='clickable'>{t('FOOTER.CONTACT')}</span>
          <span className='clickable'>{t('FOOTER.ADD_RESTAURANT')}</span>
          <span className='clickable'>{t('FOOTER.HELP')}</span>
          <span className='clickable'>{t('FOOTER.FAQ')}</span>
          <span className='clickable'>{t('FOOTER.LANGUAGE.FR')}</span>
        </div>
        <div className='footerUpTwo'>
          <span>{t('FOOTER.SUBSCRIBE_TO_NEWSLETTER')}</span>
          <div className='inputCont'>
            <input placeholder={t('REGISTER.ENTER_THE_EMAIL')} type='text' />
            <button disabled>{t('FOOTER.SUBSCRIBE')}</button>
          </div>
        </div>
        <div className='footerUpThree'>
          <span>{t('FOOTER.CONTACT_US_AT')}</span>
          <div className='imagesCont'>
            <img className='clickable' draggable={false} src={fb} alt=''/>
            <img className='clickable' draggable={false} src={ig} alt=''/>
            <img className='clickable' draggable={false} src={tt} alt=''/>
          </div>
        </div>
        <div className='footerUpFour'>
          <label>{t('FOOTER.DOWNLOAD_APP')}</label>
          <span className='apple clickable'>iPhone</span>
          <div>
            <span className='android clickable'>Android</span>
          </div>
        </div>
      </div>
      <div className='down'>
        <div className='footerDownOne'>{t('FOOTER.ALL_RIGHTS_RESERVED')}</div>
        <div className='footerDownTwo'>
          <span className='clickable'>{t('FOOTER.CONFIDENTIALITY')}</span>
          <span className='clickable'>{t('FOOTER.CONDITIONS')}</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
