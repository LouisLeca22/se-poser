'use client';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import Title from './Title';
import { MdLocationOn } from "react-icons/md";
const iconUrl =
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const markerIcon = icon({
    iconUrl: iconUrl,
    iconSize: [20, 30],
});

function PropertyMap({ address, latitude, longitude }: { address: string, latitude: number, longitude: number }) {
    const defaultLocation: [number, number] = [46.603354, 1.888334];
    const location: [number, number] = [latitude, longitude]
    return (
        <div className='mt-4'>
            <div className="mb-4">
                <Title text="Adresse de l'hébergement" />
                <div className='flex gap-2 items-center mb-2'>
                    <MdLocationOn /> {address}
                </div>
                <MapContainer scrollWheelZoom={false} zoomControl={false} center={location || defaultLocation} zoom={7} className='h-[50vh] rounded-lg relative z-0'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <ZoomControl position='bottomright' />
                    <Marker
                        position={location || defaultLocation}
                        icon={markerIcon}
                    ></Marker>
                </MapContainer>
            </div>
        </div>
    )
}
export default PropertyMap