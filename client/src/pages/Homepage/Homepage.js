import React from 'react'; 
import styled from 'styled-components'; 

import MapMap from '../../components/MapMap';
import Header from '../../components/Header';
// import Clouds from '../../components/Clouds';

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