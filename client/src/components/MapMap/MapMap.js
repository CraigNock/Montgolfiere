import React from 'react'; 
import styled from 'styled-components'; 

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";


const MapMap = () => { 

  return (
    <StyledDiv> 
      
      <Map 
        center={[45.50, -73.60]} 
        zoom={12}
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