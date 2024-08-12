import {FunctionComponent} from "react"

import {Icon, LatLng} from 'leaflet'
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png'

import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer} from 'react-leaflet'

const disruptorBuildingLocation = new LatLng(51.44971831403754, 5.4947035381928035)

// fix marker image (not sure we're ever gonna use this)
// alternatively assign to Marker.prototype.options.icon.options
Icon.Default.mergeOptions({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIcon2xPng,
    shadowUrl: markerShadowPng,
})

export const Map: FunctionComponent = () => (
    <MapContainer center={disruptorBuildingLocation}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{height: "500px"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // TODO: option to use BAG WMS tiles
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
)
