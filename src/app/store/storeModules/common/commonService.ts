import { Executor } from '../../../utils/executor'
import { commonEndpoints } from '../../../utils/endpoints'


export const getMyReservationsList = () => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: commonEndpoints.myReservations,
  })
}

export const getMyPromoCodes = () => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: commonEndpoints.myPromoCodes,
  })
}

export const getMyRates = () => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: commonEndpoints.myRates,
  })
}
