import React from 'react'; 
import styled from 'styled-components'; 

import { useDispatch, useSelector } from 'react-redux';

import paper from '../../assets/paper.jpg';

import { GiSextant } from "react-icons/gi";

const NearbyDisplay = () => { 
  const { nearestCity } = useSelector(state => state.conditions);
  const { location } = useSelector((state) => state.user.profile);
  // console.log('nearestCity', nearestCity);

  const distanceTo = (pointA, pointB) => {
    const φ1 = pointA[0] * Math.PI/180;
    const φ2 = pointB[0] * Math.PI/180;
    const Δλ = (pointB[1]-pointA[1]) * Math.PI/180;
    const R = 6371e3;
    const distance = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
    return distance;
  };

  return ( nearestCity.tags?
    <StyledDiv> 
      <p> 
        <span>Nearest City: </span>
        {nearestCity.tags.name}
      </p>
      <p> 
        <span>Distance: </span>
        {(distanceTo([nearestCity.lat, nearestCity.lon], location)/1000).toFixed()} km
      </p>
    </StyledDiv> 

    : <StyledDiv><p><span>Nearest City: </span>Atlantis</p></StyledDiv>
  ) 
}; 


export default NearbyDisplay;


const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items:center;
  width: 100%;
  /* min-width: fit-content; */
  height: 100%;
  /* min-height: 60vh; */
  overflow: hidden;
  /* background-image: url(${paper});
  background-size: cover;
  opacity: 0.9; */
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.33);
  border: 3px solid #674c47;
  border-bottom: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 80% 80% 5px 5px;
  padding: 1rem;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    /* color: maroon; */
    margin: .25rem 0;
    
  }
  span{
    font-family: 'Rye', cursive;
    /* color: #36454f; */
    color: black;
  }
`;
