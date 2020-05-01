import React, { useRef, useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { changeElevation 
} from '../../reducersActions/userActions';

import { GoFlame } from "react-icons/go";
import { GiFlame } from "react-icons/gi";
import { GiFire } from "react-icons/gi";

import paper from '../../assets/paper.jpg'


const HUD = () => { 
  const dispatch = useDispatch();

  const { elevation } = useSelector( state => state.user.profile);
  // console.log('elevation', elevation);
  // const [selection, setSelection] = useState(elevation)

  const handleElevation = async (e) => {
    const value = e.target.value;
    console.log('value', value);
    // setSelection(value);
    dispatch(changeElevation(value));
  };

  return (
    <StyledDiv> 
      <div> HUD </div>
      <div>main info
        <p>direction</p>
        <p>speed</p>
        <p>elevation</p>
      </div>
      <div>controls
        <ElevDiv>
          elevation
          <li style={{color: (elevation==3)? 'green' : 'blue'}} >
            <label htmlFor={'3'}>Three
            <input type='radio' name={3} value={3} 
            onChange={(e) => handleElevation(e)}
            checked={(elevation == 3)} />
            </label>
          </li>
          <li style={{color: (elevation==2)? 'green' : 'blue'}} >
            <label htmlFor={'2'}>Two
            <input type='radio' name={2} value={2} 
            onChange={(e) => handleElevation(e)}
            checked={(elevation == 2)} />
            </label>
          </li>
          <li style={{color: (elevation==1)? 'green' : 'blue'}} >
            <label htmlFor={'1'}>One
            <input type='radio' name={1} value={1}
            onChange={(e) => handleElevation(e)} 
            checked={(elevation == 1)} />
            </label>
          </li>
        </ElevDiv>
        {/* <FireDiv> */}
          <FlameoHotman>
          <GiFlame 
          style={{
            position: 'absolute', 
            bottom: '-10'
            }}/>
          <GiFire style={{
            position: 'absolute', 
            color: 'yellow', 
            fontSize: '1.5rem'
            }}/>
          <GoFlame style={{
            position: 'absolute', 
            color: 'lightblue', 
            fontSize: '1rem', 
            bottom: '-11'
            }}  />
          </FlameoHotman>
        {/* </FireDiv> */}
        

        <p>anchor </p>
        <p>equipped items</p>
        <p>toggle visible things(ie: trail)</p>
      </div>
      <Tag>V</Tag>
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
  width: 15vw;
  height: 80vh;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.53);
  border: 3px solid gray;
  border-radius: 5px;
  opacity: 0.9;
`;

const Tag = styled.div`
  width: 1rem;
  height: 2rem;
  z-index: 2;
`;

const ElevDiv = styled.ul`
  display: flex;
  flex-direction: column;
  margin: .5rem 0;
`;
const FireDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;
const FlameoHotman = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  font-size: 2rem;
`;
const FlameSmall = styled.div`
  position: 'absolute';
  color: 'lightblue'; 
  font-size: '1rem';
  bottom: '-11';
`;
const FlameMed = styled.div`
  position: 'absolute';
  color: 'yellow';
  font-size: '1.5rem';
`;
const FlameBig = styled.div`
  position: 'absolute';
  bottom: '-10';
`;