import { Executor } from '../../../utils/executor'
import { cartEndpoints } from '../../../utils/endpoints'


export const addToCart = (data: any) => {
  return Executor({
    method: 'post',
    endPoint: cartEndpoints.addToCart,
    payloadData: data,
  })
}

export const passOrder = (data: any) => {
  return Executor({
    method: 'post',
    endPoint: cartEndpoints.passOrder,
    payloadData: data,
  })
}

export const getCart = () => {
  return Executor({
    method: 'get',
    endPoint: cartEndpoints.getCart,
    payloadData: null,
  })
}

export const checkIntent = (key: string) => {
  return Executor({
    method: 'get',
    endPoint: cartEndpoints.checkIfIntentPayed(key),
    payloadData: null,
  })
}

export const decrementIncrementProductInCart = (data: any) => {
  return Executor({
    method: 'put',
    endPoint: `${data.increment ? cartEndpoints.increment : cartEndpoints.decrement}?${data?.platId ? 'platId=' : 'boissonId='}${data?.platId || data?.boissonId}`,
    payloadData: null,
  })
}
