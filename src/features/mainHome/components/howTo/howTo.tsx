import React from 'react'
import './howTo.scss'
import { useTranslation } from 'react-i18next'
import mobileApp from '../../../../assets/mobileApp.png'
import howToStep1 from '../../../../assets/howToStep1.svg'
import howToStep2 from '../../../../assets/howToStep2.svg'
import howToStep3 from '../../../../assets/howToStep3.svg'

const HowTo = () => {
  const { t } = useTranslation()
  return (
    <div className='howToContainer'>
      <div className='stepsContainer'>
        <label className='howToLabel'>{t('HOME.HOW_TO.LABEL')}</label>
        <div className='stepHowTo'>
          <img draggable={false} width='40px' height='40px' src={howToStep1} alt='' />
          <span>{t('HOME.HOW_TO.STEPS.STEP1')}</span>
        </div>
        <div className='stepHowTo'>
          <img draggable={false} width='40px' height='40px' src={howToStep2} alt='' />
          <span>{t('HOME.HOW_TO.STEPS.STEP2')}</span>
        </div>
        <div className='stepHowTo'>
          <img draggable={false} width='40px' height='40px' src={howToStep3} alt='' />
          <span>{t('HOME.HOW_TO.STEPS.STEP3')}</span>
        </div>
        <div className='storeContainer'>
          <button className='iphone'>
            Iphone
          </button>
          <button className='android'>
            Android
          </button>
        </div>
      </div>
      <img draggable={false} src={mobileApp} alt='' className='mobileAppContainer' />
    </div>
  )
}

export default HowTo
