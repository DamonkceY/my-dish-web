import React, { useEffect, useState } from 'react'


const RestaurantMap: React.FC<{ id: string }> = ({ id }) => {
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
    const map = new google.maps.Map(document.getElementById(id) as HTMLElement, mapProp)
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(48.8566, 2.3522),
    })
    marker.addListener('click', () => {
      window.open(`https://www.google.com/maps/dir/?api=1&layer=traffic&destination=${48.8566},${2.3522}`)
    })
    marker.setMap(map)
    setMapObject(map)
  }, [])

  return (
    <div id={id} className='mapContainer' />
  )
}

export default RestaurantMap
