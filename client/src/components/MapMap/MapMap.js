import React, { useRef, useEffect } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

//spotify workshop for apikey handlers
const MapMap = () => { 
  const { profile, active, loggedIn } = useSelector((state) => state.user);
  console.log('profile', profile);

  const panToOptions = {
      animate: true,
      duration: 60, //seconds
      easeLinearity: 1,
    };
  
  
  const mapRef = useRef();
  useEffect(() => {
    console.log('mapRef', mapRef);
    const { current } = mapRef;
    const { leafletElement } = current;
    setTimeout(()=>{
      leafletElement.panTo([1.46, 103.95], panToOptions)
    }, 5000)
  }, [mapRef]);



  
  const panno = () => {
    
  };

  return ( 
    <StyledDiv> 
      
      <Map 
        ref={mapRef}
        center={profile.location} 
        zoom={12}
        zoomControl={false}
        onClick={()=>panno()}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors'
        />
      </Map>

    </StyledDiv>
    
  ) 
}; 




export default MapMap;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;