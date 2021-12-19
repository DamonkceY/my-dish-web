import './map.scss'
import React, { useEffect, useRef, useState } from 'react'
import orangeMarker from '../../../../assets/markerOrange.svg'
import greenMarker from '../../../../assets/markerGreen.svg'
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

      const marker = new HTMLMarker(new google.maps.LatLng(item.position.lat, item.position.lng), item.reduction, item.rate)
      marker.setMap(map)
    })
    setMapObject(map)
  }, [])

  mapObject?.addListener('click', (e: google.maps.MapMouseEvent) => {
    if (e.domEvent.type === 'click') {
      // console.log(e)
    }
  })

  mapObject?.addListener('zoom_changed', (e: any) => {
    // console.log(mapObject?.getZoom())
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
  private reductionNumber: number|null
  private div?: HTMLElement
  private rate: number

  constructor(latLng: google.maps.LatLng, reduction: number|null, rate: number) {
    super()
    this.rate = rate
    this.image = !!reduction ? orangeMarker : greenMarker
    this.reductionNumber = reduction
    let circle = new google.maps.Circle({ radius: 10, center: latLng })
    this.bounds = circle.getBounds() as google.maps.LatLngBounds
  }

  onAdd() {

    this.div = document.createElement('div')
    this.div.style.borderStyle = 'none'
    this.div.style.borderWidth = '0px'
    this.div.style.position = 'absolute'
    this.div.style.cursor = 'pointer'
    this.div.style.display = 'flex'
    this.div.style.flexDirection = 'column'
    this.div.style.justifyContent = 'center'
    this.div.style.alignItems = 'center'

    this.div.style.fontWeight = 'bold'
    this.div.style.color = '#fff'


    // Create the img element and attach it to the div.
    const img = document.createElement('img')
    img.src = this.image
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.position = 'absolute'
    this.div.appendChild(img)

    const innerText = document.createElement('div')
    innerText.style.zIndex = '9999'
    if(!this.reductionNumber){
      innerText.innerText = this.rate.toString() as string
    }else {
      const top = document.createElement('span')
      top.innerText = this.rate.toString()
      top.style.fontSize = '13px'
      const mid = document.createElement('span')
      mid.style.border = 'solid 1px #fff'
      mid.style.width = '100%'
      mid.style.opacity = '0.2'
      const bot = document.createElement('span')
      bot.innerText = this.reductionNumber.toString() + '%'
      bot.style.fontSize = '13px'
      bot.style.marginTop = '5px'
      innerText.appendChild(top)
      innerText.appendChild(mid)
      innerText.appendChild(bot)
      innerText.style.width = '51px'
      innerText.style.height = '51px'
      innerText.style.display = 'flex'
      innerText.style.flexDirection = 'column'
      innerText.style.justifyContent = 'start'
      innerText.style.alignItems = 'center'
    }
    console.log(innerText)
    this.div.appendChild(innerText)

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
      this.div.style.top = ne.y  + 'px'
      this.div.style.width = ne.x - sw.x + 'px'
      this.div.style.height = sw.y - ne.y + 'px'
      this.div.style.width = '51px'
      this.div.style.height = '71px'
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
