import './map.scss'
import React, { useEffect, useRef, useState } from 'react'
import { SLIDES } from '../../../mainHome/mockToBeDeleted'
import { Paths } from '../../../../app/utils/paths'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'

const MapCard:React.FC<{adsList: Array<any>}> = ({adsList}) => {
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [mapObject, setMapObject] = useState<google.maps.Map | null>(null)
  const allMarkers = useRef<Array<google.maps.Marker>>([])
  const allWindows = useRef<Array<google.maps.InfoWindow>>([])
  const currentOpenWindow = useRef(0)

  const getMarkerSvg = (item: any) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='54.385' height='71.4' viewBox='0 0 54.385 71.4'>
      <path fill='${!!item.reduction ? '#fb5557' : '#45b995'}'
            d='M-85.347 389.123a27.224 27.224 0 0 0-27.192 27.2c0 9.679 2.945 13.56 17.093
            32.212 2.456 3.238 5.241 6.912 8.427 11.156a2.092 2.092 0 0 0 2.927.419 2.094 2.094 0 0 0
            .419-.419c3.165-4.224 5.939-7.879 8.384-11.107 14.183-18.707 17.134-22.6 17.134-32.262a27.224 27.224 0 0 0-27.192-27.199z'
            transform='translate(112.539 -389.123)'
      >
      </path>
      ${!!item.reduction ? `
        <text font-family='circe' font-weight='bold' font-size='13' x='${item.globalRating.toString().length > 1 ? 20 : 22}' y='25' fill='white'>${item.globalRating}</text>
        <line opacity='0.4' stroke='white' stroke-width='1' x1='1' x2='53' y1='32' y2='32' />
        <text font-family='circe' font-weight='bold' font-size='13' x='17' y='50' fill='white'>${item.reduction}%</text>
      ` : `
        <text font-family='circe' font-weight='bold' font-size='16' x='22' y='35' fill='white'>${item.globalRating}</text>
      `}
    </svg>
  `

  const getElementInfoWindow = (item: any) => `
    <a style='text-decoration: inherit; color: inherit;' href='${Paths.restaurant}?id=${item?._id}' target='_blank'>
      <div class='sliderElement clickable'>
        <div class='sliderImage'>
          <img draggable='false' class='cardImage' src='${item.imageUrl || item.image}' alt='' />
        </div>
        <div class='sliderDetail'>
          <div class='detail'>
           <span class='name'>${item.name}</span>
           <span class='price'>Prix moyen ${item.avgPrice[0]} €</span>
           <span class='speciality'>${item?.category}</span>
<!--           <span class='reduction'>25% de réduction</span>-->
         </div>
         <div class='rating'>
           ${item?.globalRating} <span class='outOfTen'>/ 10</span>
         </div>
        </div>
      </div>
    </a>
  `

  useEffect(() => {
    const mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(adsList[0]?.location?.coordinates[1] || 48.8566, adsList[1]?.location?.coordinates[0] || 2.3522),
      zoomControl: false,
      disableDoubleClickZoom: true,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      zoom: 15,
    }
    const map = new google.maps.Map(document.getElementById('googleMap') as HTMLElement, mapProp)
    adsList.forEach((item, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item?.location?.coordinates[1], item?.location?.coordinates[0]),
        icon: window.URL.createObjectURL(new Blob([getMarkerSvg(item)], { type: 'image/svg+xml' })),
      })
      const infoWindow = new google.maps.InfoWindow({
        content: getElementInfoWindow(item),
      })
      allWindows.current.push(infoWindow)
      marker.addListener('click', () => {
        allWindows.current.forEach((item) => item.close())
        index !== currentOpenWindow.current &&
        infoWindow.open({
          anchor: marker,
          map,
        })
        currentOpenWindow.current = currentOpenWindow.current === index ? -1 : index
      })
      allMarkers.current.push(marker)
      marker.setMap(map)
    })
    allWindows.current[0]?.open({
      anchor: allMarkers.current[0],
      map,
    })
    setMapObject(map)
  }, [adsList])

  return (
    <div style={{ width: deviceWidth > 1023 ? '50%' : '100%' }}>
      <div id='googleMap' className='mapCard' />
    </div>
  )
}

export default MapCard
