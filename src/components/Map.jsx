import {useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import styles from "./Map.module.css";
import {useCities} from "../contexts/CitiesContext.jsx";
import flagEmojiToPng from "../utils/flagEmojiToPng.jsx";
import {useEffect} from "react";
import {useGeolocation} from "../hooks/useGeolocation.jsx";
import Button from "./Button.jsx";

function Map() {
    const {cities} = useCities();
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    const {isLoading: isGeoLocLoading, position: geoPosition, getPosition} = useGeolocation();

    useEffect(function () {
        if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng])
    }, [geoPosition]);

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    return (
        <div className={styles.mapContainer}>
            {!geoPosition && <Button onClick={() => getPosition()} type="position">{isGeoLocLoading ? "Loading" : "Set your geo location"}</Button>}
            <MapContainer center={mapPosition} zoom={6}
                          scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                    <Popup>
                        <span>{flagEmojiToPng(city.emoji)}</span><span>{city.cityName}</span>
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition}></ChangeCenter>
                <DetectClick></DetectClick>
            </MapContainer>

        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map;
