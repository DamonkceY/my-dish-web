import close from '../../../../assets/close.svg'
import React, { useEffect, useState } from 'react'
import './reservationModal.scss'
import calendar from '../../../../assets/calender.svg'
import clock from '../../../../assets/clockActive.svg'
import clockDisabled from '../../../../assets/clockDisabled.svg'
import body from '../../../../assets/personne.svg'
import bodyDisabled from '../../../../assets/personneDisabled.svg'
import ticket from '../../../../assets/ticket.svg'
import ticketDisabled from '../../../../assets/ticketDisabled.svg'
import selectArrow from '../../../../assets/selectArrow.svg'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CalendarPicker from '@mui/lab/CalendarPicker'
import { Paths } from '../../../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import VerticalScroll from '../../../../sharedComponents/verticalScroll/verticalScroll'


const ModalReservation: React.FC<{ closeEvent: Function }> = ({ closeEvent }) => {
  const [step, setStep] = useState(1)
  const [WIDTH, setWidth] = useState(25)
  const [date, setDate] = React.useState<Date | null>(new Date())
  const navigate = useNavigate()

  useEffect(() => {
    setWidth(step * 25)
  }, [step])

  return (
    <div className='modalReservationContainer'>
      <div className='cont'>
        <div className='modalHeader'>
          <span>Réservation • Joayo Haussmann</span>
          <img onClick={() => closeEvent()} className='clickable' draggable={false} src={close} alt='' />
        </div>
        <div className='horizontalSeparator' />
        <div className='stepsContainer'>
          <div className='headerSteps'>
            <div className='iconsContainer'>
              <div className='iconCont'>
                {
                  step === 1 ? (
                    <img onClick={() => setStep(1)} className='clickable' draggable={false}
                         src={calendar} alt='' />
                  ) : (
                    <span onClick={() => setStep(1)} className='valueSelectedTab clickable'>
                    Sam. 08/08
                  </span>
                  )
                }
              </div>
              <div className='iconCont'>
                {
                  step !== 2 && WIDTH > 50 ? (
                    <span onClick={() => setStep(2)} className='valueSelectedTab clickable'>
                    Dîner 20:00
                  </span>
                  ) : (
                    <img onClick={() => setStep(2)} className='clickable' draggable={false}
                         src={step === 2 ? clock : clockDisabled} alt='' />
                  )
                }
              </div>
              <div className='iconCont'>
                {
                  step !== 3 && WIDTH > 75 ? (
                    <span onClick={() => setStep(3)} className='valueSelectedTab clickable'>
                    2 pers.
                  </span>
                  ) : (
                    <img onClick={() => setStep(3)} className='clickable' draggable={false}
                         src={step === 3 ? body : bodyDisabled} alt='' />
                  )
                }
              </div>
              <div className='iconCont'>
                <img onClick={() => setStep(4)} className='clickable' draggable={false}
                     src={step === 4 ? ticket : ticketDisabled} alt='' />
              </div>
            </div>
            <div className='underline' style={{ width: WIDTH + '%' }} />
            <div className='underlineStatic' />
          </div>
          <div className='step'>
            {
              step === 1 && (
                <div className='calendar'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CalendarPicker
                      className='calendarPicker'
                      date={date}
                      onChange={(newDate) => setDate(newDate)}
                      minDate={new Date()}
                    />
                  </LocalizationProvider>
                </div>
              )
            }
            {
              step === 2 && (
                <div className='scrollCont'>
                  <div className='selectCont'>
                    <span>Déjeuner</span>
                    <img draggable={false} src={selectArrow} alt='' />
                  </div>
                  <VerticalScroll />
                </div>
              )
            }
            {
              step === 3 && (
                <div className='scrollCont'>
                  <div className='selectCont'>
                    <span>Nombre de personnes</span>
                    <img draggable={false} src={selectArrow} alt='' />
                  </div>
                  <VerticalScroll />
                </div>
              )
            }
            {
              step === 4 && (
                <div className='scrollCont noBorder'>
                  <div className='selectCont'>
                    <span>Offre</span>
                  </div>
                  <div className='cont gray'>
                    <span className='title orange'>-25% sur la carte</span>
                    <span className='text'>
                      Hors menu. hors boisson.
                      Valable pour le créneau horaire réservé
                    </span>
                  </div>
                  <div className='cont'>
                    <span className='title'>Réservation sans offre</span>
                    <span className='text'>
                      La réservation à la carte standard sans promotion
                    </span>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div style={{ height: '50px' }} />
      <button
        className='btn success ModalButton'
        onClick={() => step < 4 ? setStep(step + 1) : navigate(Paths.shop)}
      >
        Suivant
      </button>
    </div>
  )
}

export default ModalReservation
