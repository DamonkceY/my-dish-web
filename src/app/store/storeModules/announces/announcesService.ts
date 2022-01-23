import { Executor } from '../../../utils/executor'
import { announcesEndpoints } from '../../../utils/endpoints'


export const getMainHomeList = (config: {url: string}) => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: config.url
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
