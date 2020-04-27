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

import { useDispatch, useSelector } from 'react-redux';


const Homepage = () => { 
  const { profile, active, loggedIn } = useSelector((state) => state.user);
  return (
    <StyledDiv> 
      <Header />
      
      {profile? <MapMap /> : ''}
      
    </StyledDiv> 
  ) 
}; 


export default Homepage;


const StyledDiv = styled.div`

`;