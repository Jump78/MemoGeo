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
      const watchId = navigator.geolocation.watchPosition(pos => {
        const coords = pos.coords;
        markers.forEach((marker, i) => {
          const earthRadius = 6371e3; // metres
          const radiant1 = marker.props.position.lat * Math.PI/180;
          const radiant2 = coords.latitude * Math.PI/180;
          const dRadiantLat = (coords.latitude-marker.props.position.lat) * Math.PI/180;
          const dRadiantLng = (coords.longitude-marker.props.position.lng) * Math.PI/180;

          // Square of half the chord length between the points
          const a = Math.sin(dRadiantLat/2) * Math.sin(dRadiantLat/2) +
                    Math.cos(radiant1) * Math.cos(radiant2) *
                    Math.sin(dRadiantLng/2) * Math.sin(dRadiantLng/2);
          
          // Angular distance in radiant
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

          const dist = earthRadius * c; // in metres

          // Trigger Alarm if dist is less than 100 meters
          if(dist < 100) {
          }
        });

        setCurrent({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });

      return () => navigator.geolocation.clearWatch(watchId);
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