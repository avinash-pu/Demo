import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    // Default position if geolocation is not available
    const defaultPosition = {
      lat: 37.7749, // Default latitude (San Francisco)
      lng: -122.4194 // Default longitude (San Francisco)
    };

    // Attempt to get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setHasLocation(true);
      },
      (error) => {
        console.error(error);
        setPosition(defaultPosition);
        setHasLocation(false);
      }
    );
  }, []);

  // Fallback to default position if no location data is available
  const positionToUse = position || {
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194 // Default longitude (San Francisco)
  };

  return (
    <MapContainer center={positionToUse} zoom={13} style={{ height: '100%', width: '100%' }}>
     
      <Marker position={positionToUse} icon={L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })}>
        <Popup>
          {hasLocation ? 'You are here!' : 'Default Location'}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
