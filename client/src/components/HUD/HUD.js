import React, { useRef, useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { changeElevation 
} from '../../reducersActions/userActions';
import { toggleLens, setViewRange 
} from '../../reducersActions/appActions';

import { GoFlame } from "react-icons/go";
import { GiFlame } from "react-icons/gi";
import { GiFire } from "react-icons/gi";

import paper from '../../assets/paper.jpg'


const HUD = () => { 
  const dispatch = useDispatch();

  const { lens, viewRange } = useSelector( state => state.app );
  const { elevation } = useSelector( state => state.user.profile);
  const { windSum, windBearing } = useSelector( state => state.conditions.current);
  // console.log('elevation', elevation);
  // console.log('viewRange', viewRange);

  const handleElevation = async (e) => {
    const value = Number(e.target.value);
    // console.log('value', value);
    dispatch(changeElevation(value));
  };
  const handleViewRange = async (e) => {
    const value = Number(e.target.value);
    // console.log('value', value);
    dispatch(setViewRange(value));
  };

  return (
    <StyledDiv> 
      <h3> HUD </h3>
      <InfoDiv>
        <p>
          <span>Bearing: </span>
          {windBearing}°
        </p>
        <p>
          <span>Speed: </span>
          {parseInt(windSum * 10 * elevation)} kph
        </p>
        
      </InfoDiv>
      <ControlsDiv>
        <FlexDiv>
          <ElevUl>
            Elevation
            <li style={{color: (elevation==3)? 'green' : 'slategray'}} >
              <label htmlFor={'High'}>
              <input type='radio' name={'High'} value={3} 
              onChange={(e) => handleElevation(e)}
              checked={(elevation == 3)} />High
              </label>
            </li>
            <li style={{color: (elevation==2)? 'green' : 'slategray'}} >
              <label htmlFor={'Med'}>
              <input type='radio' name={'Med'} value={2} 
              onChange={(e) => handleElevation(e)}
              checked={(elevation == 2)} />Med
              </label>
            </li>
            <li style={{color: (elevation==1)? 'green' : 'slategray'}} >
              <label htmlFor={'Low'}>
              <input type='radio' name={'Low'} value={1}
              onChange={(e) => handleElevation(e)} 
              checked={(elevation == 1)} />Low
              </label>
            </li>
            </ElevUl>
            <FlameoHotman>
              <GiFlame 
              style={{
                display: (elevation > 2)? 'block' : 'none',
                position: 'absolute', 
                color: 'orange',
                fontSize: '3rem',
                marginTop: '-.5rem'
                }}/>
              <GiFire style={{
                display: (elevation > 1)? 'block' : 'none',
                position: 'absolute', 
                color: 'yellow', 
                fontSize: '2rem',
                // bottom: '-10'
                }}/>
              <GoFlame style={{
                position: 'absolute', 
                color: 'lightblue', 
                fontSize: '1.5rem', 
                // bottom: '-11'
                }}  />
            </FlameoHotman>

        </FlexDiv>
        
        <FlexDiv>
          <ViewRange>
            View range
            <li style={{color: (viewRange === 3)? 'green' : 'slategray'}}>
              <label htmlFor={'global'}>
              <input type='radio' name={'global'} value={3} 
              onChange={(e) => handleViewRange(e)}
              checked={(viewRange === 3)} />Global
              </label>
            </li>
            <li style={{color: (viewRange === 2)? 'green' : 'slategray'}}>
              <label htmlFor={'radius'}>
              <input type='radio' name={'radius'} value={2} 
              onChange={(e) => handleViewRange(e)}
              checked={(viewRange === 2)} />Radius
              </label>
            </li>
            <li style={{color: (viewRange === 1)? 'green' : 'slategray'}}>
              <label htmlFor={'local'}>
              <input type='radio' name={'local'} value={1}
              onChange={(e) => handleViewRange(e)} 
              checked={(viewRange === 1)} />Local
              </label>
            </li>
          </ViewRange>
          <ViewCircle>
            <div style={{
                display: (viewRange === 3)? 'block' : 'none',
            }}
            >
              map
            </div>
            <div style={{
                display: (viewRange === 2)? 'block' : 'none',
            }}
            >
              big
            </div>
            <div style={{
                display: (viewRange === 1)? 'block' : 'none',
            }}
            >
              small
            </div>
          </ViewCircle>
        </FlexDiv>
        <LensSwitch>
          <span>Lens:</span>
          <StyledButton onClick={ () => dispatch(toggleLens()) }>
            { lens? 'ON' : 'OFF'}
          </StyledButton>
        </LensSwitch>

        <p>equipped items</p>
        
        
      </ControlsDiv>
      <Tag></Tag>
      
    </StyledDiv> 
  ) 
}; 


export default HUD;


const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  top: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 18vw;
  /* min-width: fit-content; */
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.53);
  border: 3px solid gray;
  border-radius: 5px 50% 50% 5px;
  opacity: 0.9;
  padding: 1rem;
  
`;
const FlexDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: none;
`;

const Tag = styled.div`
  width: 1rem;
  height: 2rem;
  z-index: 2;
`;
const InfoDiv = styled.div`
  margin: 2rem 0 0;
`;
const ControlsDiv = styled.div`
  margin: 0 0;
`;
const ElevUl = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: .5rem 0;
`;
const FlameoHotman = styled.div`
  position: relative;
  margin: 2rem 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  /* font-size: 2rem; */
`;
const ViewRange = styled.ul`
  margin: .5rem 0;
`;
const ViewCircle = styled.div`
  position: relative;
  /* margin: 3rem 0 0 1rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const LensSwitch = styled.div`
  margin: .5rem 0;
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  margin: 0 .5rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
`;
