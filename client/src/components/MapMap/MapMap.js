import React, { useRef, useEffect, useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L, { Icon } from "leaflet";
import { DriftMarker } from "leaflet-drift-marker";

import balloon from '../../assets/balloon.svg'
import useInterval from '../../hooks/use-interval-hook';
import { updateLocation 
} from '../../reducersActions/userActions';
import { updateCurrentConditions 
} from '../../reducersActions/conditionsActions';
import fetchConditions from './fetchConditions'
import findNextLoc from './findNextLoc';

const ballooon = new Icon({
  iconUrl: balloon,
  iconSize: [25, 25]
});


const MapMap = () => { 
  // console.log('LOAD MAP');

  const { profile } = useSelector((state) => state.user);
  //add late if active===false stop everything(toggle active else where)
  // console.log('profile', profile);
  const { windSum, windBearing } = useSelector((state) => state.conditions.current);
  
  
  const dispatch = useDispatch();

  const [launch, setLaunch] = useState(false);
  const [newLoc, setNewLoc] = useState(profile.location);
  const [currentCenter, setCurrentCenter] = useState(profile.location)
  const [ggg, setggg] = useState(false);

//ON MOUNT FETCH CONDITIONS
  const dothecondition = async () => {
    let conno = await fetchConditions(profile.location);
    console.log('conno', conno);
    dispatch(updateCurrentConditions(conno));
  };
  useEffect(() => {
    dothecondition();
//on dismount clear the location update interval below
    return ()=> clearInterval(check);
  }, []);
  

  const mapRef = useRef();
  // const markRef = useRef();
  const panToOptions = {
        animate: true,
        duration: 60, //seconds
        easeLinearity: 1,
      };
  useEffect(() => {
  //   console.log('useeffect mapRef', mapRef);
    const { current } = mapRef;
    const { leafletElement } = current;
    setTimeout(()=>{
      console.log('panTo');
      leafletElement.panTo(newLoc, panToOptions)
    }, 100);
  }, [mapRef, newLoc, ggg]);


//KEEPS BALLOON MOVING - 
//use findNextLoc on stored speed and bearing with current center then set as newloc
  const newLeg = async () => {
    console.log('newLeg windSum', windSum);
    let newDest = await findNextLoc(
      mapRef.current.viewport.center[0], 
      mapRef.current.viewport.center[1], 
      windBearing,
      (windSum * 10 *  profile.elevation) 
    );
    console.log('newDest', newDest);
    setNewLoc(newDest);
  }
  useInterval(()=>{
    if(launch) newLeg();
  },59000);


  const updateVector = async () => {
    console.log('vector update');
    try{
      fetch('/newLastVector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.userId,
          lastActive: (new Date()).getTime(),
          lastLocation: [...mapRef.current.viewport.center], ///stale
          lastBearing: windBearing,
          lastWindSum: windSum,
          lastElevation: profile.elevation,
        }),
      })
    } catch (err) {console.log('err', err);}
  };

//STORES BALLOON LOCATION EVERY 10 SECONDS lastVector
  const check = useInterval(()=>{
    // console.log('int 10s viewcenter', mapRef.current.viewport.center);
    dispatch(updateLocation([...mapRef.current.viewport.center]));
    updateVector();
  }, 10000);


//KEEPS BALLOON MARKED CENTERED
  const centerMark = () => {
    setCurrentCenter(mapRef.current.viewport.center);//WHY???
    
  };

  return ( 
    <StyledDiv> 
      
      <Map 
        ref={mapRef}
        defaultCenter={profile.location} 
        zoom={14}
        zoomSnap={2}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={'center'}
        scrollWheelZoom={'center'}
        touchZoom={'center'}
        onZoomEnd={()=> setggg(!ggg)}
        // onClick={()=>newnew()}
        // onMove={centerMark}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors' /> */}
        <TileLayer
          url={`https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_MAPTILES_KEY}`}
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors' />



        {/* <StyledMarker
          ref={markRef}
          position={currentCenter} 
          icon={ballooon}
        >
        </StyledMarker> */}

        <StyledBalloon src={balloon} />
        
        <StyledButton 
          onClick={()=>{
            setLaunch(true);
            newLeg();
          }}
          style={{display: launch? 'none' : 'flex'}}
        >Launch!</StyledButton>

        {/* <DriftMarker 
          // ref={markRef} 
          position={newLoc} 
          duration={60000}
          icon={ballooon}
          // keepAtCenter={true}
        ></DriftMarker>  */}
      </Map>
    </StyledDiv>
    
  ) 
}; 




export default MapMap;


const balloonBob = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
  100% {
    transform: translateY(0);
  }
`;


const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 60vh;
  width: 60vw;
  border: 8px ridge goldenrod;
  border-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.53);

`;

const StyledMarker = styled(Marker)`
  /* -webkit-transition: transform 3s linear;
  -moz-transition: transform 3s linear;
  -o-transition: transform 3s linear;
  -ms-transition: transform 3s linear;
  transition: transform 3s linear;  */
`;

//make this it's own component, custom color/balloon
const StyledBalloon = styled.img`
  position: absolute;
  top: 50% ;
  left: 50%;
  height: 30px;
  width: 30px;
  margin: -15px 0 0 -15px;
  z-index: 2000;
  animation: ${balloonBob} 4s ease-in-out infinite ;
`;
const StyledButton = styled.button`
  position: absolute;
  justify-content: center;
  width: 4rem;
  top: 50%;
  left: 50%;
  margin: 30px 0 0 -2rem;
  z-index: 2000;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
`;

const Pinpoint = styled.div`
  height:1px;
  width: 1px;
  position: absolute;
  top: 50% ;
  left: 50%;
  z-index: 2002;
  background: pink;
`;