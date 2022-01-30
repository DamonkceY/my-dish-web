import { Executor } from '../../../utils/executor'
import { announcesEndpoints } from '../../../utils/endpoints'


export const getMainHomeList = (config: {url: string, params?: any}) => {
  return Executor({
    method: 'get',
    payloadData: config?.params,
    endPoint: config.url,
  })
}

export const getRestaurantById = (config: {id: string}) => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: announcesEndpoints.getRestaurantById(config.id)
  })
}

export const setFavoriteRestaurant = (config: {id: string, favoriteState: boolean}) => {
  return Executor({
    isSilent: true,
    method: !config.favoriteState ? 'post' : 'delete',
    payloadData: null,
    endPoint: announcesEndpoints.setFavoriteRestaurant(config.id, config.favoriteState)
  })
}

export const searchInRestaurant = (data: any) => {
  return Executor({
    method: 'get',
    endPoint: announcesEndpoints.search,
    payloadData: data
  })
}

export const addUpdateRating = (data: any, id?:string) => {
  return Executor({
    method: !!id ? 'put' : 'post',
    endPoint: !!id ? announcesEndpoints.updateRating(id) : announcesEndpoints.addRating,
    payloadData: data
  })
}
