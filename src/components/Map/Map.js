import React, { useState, useCallback, useEffect, memo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100vw',
  height: '100vh',
};
 
function Map(props) {
  const [map, setMap] = useState(null);
  const [current, setCurrent] = useState({lat: 0, lng:0});
  const [markers, setMarkers] = useState([]);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);  
    setMap(map);
  }, []);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        setCurrent({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  });
 
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onClick = (event) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const newMarker = <Marker position={position} key={Date.now()}/>;
    const newMarkers = [...markers, newMarker];
    setMarkers(newMarkers);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB0jeFpm7KXwieo16XlTucRtRriTPuZTtI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={current}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {[...markers]}
      </GoogleMap>
    </LoadScript>
  );
}
 
export default memo(Map);