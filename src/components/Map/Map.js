import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100vw',
  height: '100vh',
};
 
function MyComponent(props) {
  const [map, setMap] = React.useState(null);
  const [current, setCurrent] = React.useState({lat: 0, lng:0});

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);  
    setMap(map);
  }, []);

  React.useEffect(() => {
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
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB0jeFpm7KXwieo16XlTucRtRriTPuZTtI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={current}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
 
export default React.memo(MyComponent);