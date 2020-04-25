import React from 'react'; 
import styled from 'styled-components'; 

const HUD = () => { 

  return (
    <StyledDiv> 
      <div> HUD </div>
      <div>main info
        <p>direction</p>
        <p>speed</p>
        <p>elevation</p>
      </div>
      <div>controls
        <p>elevation (1, 2, 3)</p>
        <p>anchor (only when 1)</p>
        <p>equipped items</p>
        <p>toggle visible things(ie: trail)</p>
      </div>
    </StyledDiv> 
  ) 
}; 


export default HUD;


const StyledDiv = styled.div`

`;