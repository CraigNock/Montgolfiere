import React from 'react'; 
import styled from 'styled-components'; 

import Header from '../../components/Header';
import AlertBar from '../../components/AlertBar';
import MapMap from '../../components/MapMap';
import HUD from '../../components/HUD';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import NearbyDisplay from '../../components/NearbyDisplay';
import ImageModal from '../../components/ImageModal';

import ChatInterface from '../../components/ChatInterface';
import TradeInterface from '../../components/TradeInterface';




const Homepage = () => { 

  return (
    <StyledDiv> 
      <Header />
      
      <MapMap />
      
    </StyledDiv> 
  ) 
}; 


export default Homepage;


const StyledDiv = styled.div`

`;