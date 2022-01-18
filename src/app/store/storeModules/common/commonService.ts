import { Executor } from '../../../utils/executor'
import { commonEndpoints } from '../../../utils/endpoints'


export const getMyReservationsList = () => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: commonEndpoints.myReservations,
  })
}
