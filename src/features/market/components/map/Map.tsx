import './map.scss'
import React, { useEffect, useRef, useState } from 'react'
import markerIcon from '../../../../assets/mapMarker.svg'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'

const MapCard = () => {

  const [mapObject, setMapObject] = useState<google.maps.Map | null>(null)
  const allMarkers = useRef<Array<google.maps.Marker>>([])

  useEffect(() => {
    const mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(48.8566, 2.3522),
      zoomControl: false,
      disableDoubleClickZoom: true,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      zoom: 15,
    }
    const map = new google.maps.Map(document.getElementById('googleMap') as HTMLElement, mapProp)
    SLIDES.forEach((item) => {

      const marker = new HTMLMarker(new google.maps.LatLng(item.position.lat, item.position.lng), markerIcon)
      marker.setMap(map)
    })
    setMapObject(map)
  }, [])

  mapObject?.addListener('click', (e: google.maps.MapMouseEvent) => {
    if (e.domEvent.type === 'click') {
      console.log(e)
    }
  })

  mapObject?.addListener('zoom_changed', (e: any) => {
    console.log(mapObject?.getZoom())
  })

  return (
    <div style={{ width: '50%' }}>
      <div id='googleMap' className='mapCard' />
    </div>
  )
}

export default MapCard

class HTMLMarker extends google.maps.OverlayView {
  private bounds: google.maps.LatLngBounds
  private image: string
  private div?: HTMLElement

  constructor(latLng: google.maps.LatLng, image: string) {
    super()
    let circle = new google.maps.Circle({ radius: 10, center: latLng })
    this.bounds = circle.getBounds() as google.maps.LatLngBounds
    this.image = image
  }

  onAdd() {
    this.div = document.createElement('div')
    this.div.style.borderStyle = 'none'
    this.div.style.borderWidth = '0px'
    this.div.style.position = 'absolute'
    this.div.style.cursor = 'pointer'

    // Create the img element and attach it to the div.
    const img = document.createElement('img')

    img.src = this.image
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.position = 'absolute'
    this.div.appendChild(img)

    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes()!

    panes.overlayLayer.appendChild(this.div)
  }

  draw() {


    const overlayProjection = this.getProjection()

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(
      this.bounds.getSouthWest(),
    )!
    const ne = overlayProjection.fromLatLngToDivPixel(
      this.bounds.getNorthEast(),
    )!

    // Resize the image's div to fit the indicated dimensions.
    if (this.div) {
      this.div.style.left = sw.x + 'px'
      this.div.style.top = ne.y - (sw.y - ne.y) + 'px'
      this.div.style.width = ne.x - sw.x + 'px'
      this.div.style.height = sw.y - ne.y + 'px'
      this.div.style.maxWidth = '51px'
      this.div.style.maxHeight = '71px'
      this.div.style.minWidth = '25px'
      this.div.style.minHeight = '35px'
    }

  }

  onRemove() {
    if (this.div) {
      (this.div.parentNode as HTMLElement).removeChild(this.div)
      delete this.div
    }
  }
}
