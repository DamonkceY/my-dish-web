import React, { useEffect, useState } from 'react'


const RestaurantMap: React.FC = () => {
  const [mapObject, setMapObject] = useState<google.maps.Map | null>(null)
  useEffect(() => {
    const mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(48.8566, 2.3522),
      zoomControl: false,
      disableDoubleClickZoom: true,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      zoom: 18,
    }
    const map = new google.maps.Map(document.getElementById('restaurantPosition') as HTMLElement, mapProp)
    new google.maps.Marker({
      map,
      position: new google.maps.LatLng(48.8566, 2.3522),
    })
    setMapObject(map)
  }, [])

  return (
    <div id='restaurantPosition' className='mapContainer' />
  )
}

export default RestaurantMap
