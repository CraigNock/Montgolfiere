import React, { useRef, useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { DriftMarker } from "leaflet-drift-marker";

import balloon from '../../assets/balloon.svg'
import useInterval from '../../hooks/use-interval-hook';

const ballooon = new Icon({
  iconUrl: balloon,
  iconSize: [25, 25]
});


//spotify workshop for apikey handlers
const MapMap = () => { 
  const { profile, active, loggedIn } = useSelector((state) => state.user);
  // console.log('profile', profile);

  const [newLoc, setNewLoc] = useState(profile.location);
  const [checkpoint, setCheckpoint] = useState(profile.location);
  const [guff, setguff] = useState(0);

  const panToOptions = {
      animate: true,
      duration: 60, //seconds
      easeLinearity: 1,
    };
  
  
  const mapRef = useRef();
  const markRef = useRef();

  // useEffect(() => {
  //   console.log('useeffect mapRef', mapRef);
  //   const { current } = mapRef;
  //   const { leafletElement } = current;
    
  //   setTimeout(()=>{
  //     console.log('pan5');
  //     leafletElement.panTo(newLoc, panToOptions)
  //   }, 100);

  // //   if (markRef){
  // //     console.log('markRef', markRef);
  // //   const { current } = markRef || {};
  // //   const { leafletElement } = current || {};
  // // return ()=> clearInterval(check);
  // }, [mapRef, newLoc, guff]);

  // console.log('checkpoint', checkpoint);
  // console.log('mapRefout', mapRef);
  const launch = () => {
    // setNewLoc([newLoc[0], newLoc[1]+.01]);
    
  };
  //   setTimeout(()=>{
  //     console.log('launch');
  //     launch();
  // }, 10000)
useInterval(()=>{setNewLoc([checkpoint[0], checkpoint[1]+.1])},10000)


  const check = useInterval(()=>{
    // console.log('checkpoint', checkpoint);
      // console.log('current.viewport.center', ( mapRef.current.viewport.center));
      setCheckpoint(mapRef.current.viewport.center || profile.location)
  }, 1000);

  

//current.map.viewport.center
  return ( 
    <StyledDiv> 
      
      <Map 
        ref={mapRef}
        center={profile.location} 
        zoom={14}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={'center'}
        scrollWheelZoom={'center'}
        touchZoom={'center'}
        // onZoomEnd={()=> launch()}
        // onLoad={}
        // onClick={()=>launch()}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors' />
        
        {/* <StyledMarker
          position={newLoc} 
        >

        </StyledMarker> */}


        <DriftMarker 
          ref={markRef} 
          position={newLoc} 
          duration={60000}
          icon={ballooon}
          keepAtCenter={true}
        ></DriftMarker>
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

const StyledMarker = styled(Marker)`
  -webkit-transition: transform 3s linear;
  -moz-transition: transform 3s linear;
  -o-transition: transform 3s linear;
  -ms-transition: transform 3s linear;
  transition: transform 3s linear !important; 
`;