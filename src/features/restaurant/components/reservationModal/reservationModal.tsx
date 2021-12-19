import close from '../../../../assets/close.svg'
import React, { useEffect, useRef, useState } from 'react'
import './reservationModal.scss'
import calendar from '../../../../assets/calender.svg'
import clock from '../../../../assets/clockActive.svg'
import clockDisabled from '../../../../assets/clockDisabled.svg'
import body from '../../../../assets/personne.svg'
import bodyDisabled from '../../../../assets/personneDisabled.svg'
import ticket from '../../../../assets/ticket.svg'
import ticketDisabled from '../../../../assets/ticketDisabled.svg'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CalendarPicker from '@mui/lab/CalendarPicker'
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import TextField from '@mui/material/TextField';
import { Paths } from '../../../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'
import VerticalScroll from '../../../../sharedComponents/verticalScroll/verticalScroll'


const ModalReservation: React.FC<{closeEvent: Function}> = ({closeEvent}) => {
  const [step, setStep] = useState(1)
  const [WIDTH, setWidth] = useState(25)
  const isMounted = useRef(false)
  const [date, setDate] = React.useState<Date | null>(new Date())
  const [value, setValue] = React.useState<Date | null>(new Date());
  const navigate = useNavigate();

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
              <img onClick={() => setStep(1)} className='clickable' draggable={false} src={calendar} alt='' />
              <img onClick={() => setStep(2)} className='clickable' draggable={false} src={step === 2 ? clock : clockDisabled} alt='' />
              <img onClick={() => setStep(3)} className='clickable' draggable={false} src={step === 3 ? body : bodyDisabled} alt='' />
              <img onClick={() => setStep(4)} className='clickable' draggable={false} src={step === 4 ? ticket : ticketDisabled} alt='' />
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
                      className="qsd"
                      date={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </LocalizationProvider>
                </div>
              )
            }
            {
              step === 2 && (
              <div style={{height: '300px'}}>
                <VerticalScroll/>
                En cours
                {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                {/*  <StaticTimePicker*/}
                {/*    ampm*/}
                {/*    orientation="landscape"*/}
                {/*    openTo="minutes"*/}
                {/*    value={value}*/}
                {/*    onChange={(newValue) => {*/}
                {/*      setValue(newValue);*/}
                {/*    }}*/}
                {/*    renderInput={(params) => <TextField {...params} />}*/}
                {/*  />*/}
                {/*</LocalizationProvider>*/}
              </div>
              )
            }
            {
              step === 3 && (<div style={{height: '300px'}}>
                En cours</div>)
            }
            {
              step === 4 && (<div style={{height: '300px'}}>
                En cours</div>)
            }
          </div>
        </div>
      </div>
      <div style={{height: '50px'}}/>
      <button
        className='ModalButton'
        onClick={() => step < 4 ? setStep(step + 1) : navigate(Paths.shop)}
      >
        Suivant
      </button>
    </div>
  )
}

export default ModalReservation
