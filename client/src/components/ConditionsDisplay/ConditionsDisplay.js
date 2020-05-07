import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import paper from '../../assets/paper.jpg';



const ConditionsDisplay = () => { 
  const { 
    time,
    summary,
    // icon,
    nearestStormDistance,
    nearestStormBearing,
    precipIntensity,
    precipProbability,
    temperature,
    apparentTemperature,
    // dewPoint,
    humidity,
    // pressure,
    windSpeed,
    windGust,
    windBearing,
    cloudCover,
    uvIndex,
    visibility,
    // ozone,
  } = useSelector( state => state.conditions.current);


  return ( time? 
    <StyledDiv> 
        <P1>Local Time:</P1> <P2>{time}</P2>
      <StyledSubDiv1>
        <P1>Temperature:</P1> <P2>{temperature.toFixed(1)}°C</P2>
        <P1>Feels Like:</P1> <P2>{apparentTemperature.toFixed(1)}°C</P2>
        <P1>Conditions:</P1> <P2>{summary}</P2>
      </StyledSubDiv1>
      <StyledSubDiv2>
        <P1>Rain Chance:</P1> <P2>{precipProbability}%</P2>
        <P1>Rainfall:</P1> <P2>{precipIntensity.toFixed(1)} mm/hr</P2>
        <P1>Humidity:</P1> <P2>{humidity.toFixed(1)}</P2>
        <P1>UV Index:</P1> <P2>{uvIndex}</P2>
      </StyledSubDiv2>
    </StyledDiv> 
    : ''
  ) 
}; 


export default ConditionsDisplay;


const StyledDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 15vw;
  /* min-width: fit-content; */
  height: 80vh;
  min-height: 60vh;
  overflow: hidden;
  /* background-image: url(${paper});
  background-size: cover;
  opacity: 0.9; */
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border: 3px solid #674c47;
  border-right: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 3rem 5px 5px 80%;
  padding: 1rem;
  
`;
const StyledSubDiv1 = styled.div`
  text-align: right;
  border-top: 2px solid gray;
`;
const StyledSubDiv2 = styled.div`
  text-align: right;
  font-size: .85rem;
  margin: .5rem 0;
  border-top: 2px solid gray;
`;
const P1 = styled.p`
  /* font-size: .95rem; */
  font-family: 'Rye', cursive;
  color: black;
  /* color: maroon; */
  margin: .25rem 0;
`;
const P2 = styled(P1)`
  /* font-size: .85rem; */
  color: #36454f;
`;