import React from 'react'; 
import styled from 'styled-components'; 

import { useDispatch, useSelector } from 'react-redux';

import paper from '../../assets/paper.jpg';

import { GiSextant } from "react-icons/gi";

const NearbyDisplay = () => { 

  return (
    <StyledDiv> 
      <div> NearbyDisplay </div>
    </StyledDiv> 
  ) 
}; 


export default NearbyDisplay;


const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 16vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.53);
  border: 3px double #836953;
  border-left: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 5px 3rem 80% 5px;
  opacity: 0.9;
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
