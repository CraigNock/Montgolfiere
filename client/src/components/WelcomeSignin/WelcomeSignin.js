import React from 'react'; 
import styled from 'styled-components'; 

import { AuthContext } from '../AuthContext/AuthContext';

import parchment2 from '../../assets/parchment2.png';


const WelcomeSignin = () => { 
  const { signInWithGoogle } = React.useContext(AuthContext);

  return (
    <StyledDiv> 
      <Intro> 
        <p>Welcome.</p>
        <p>Please Sign In.</p>
      </Intro>
      <StyledButton onClick={signInWithGoogle}>
          Sign In
      </StyledButton>
    </StyledDiv> 
  ) 
}; 


export default WelcomeSignin;


const StyledDiv = styled.div`
  margin: 20vh auto;
  width: 50vw;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-image: url(${parchment2});
  opacity: 0.9;
  
  background-size: cover;
  /* background: whitesmoke; */
  border: 10px ridge peru;
  border-radius: 10px;
  color: black;
`;
const Intro = styled.div`
  text-align: center;
  p {
    font-family: 'Rye', cursive;
  }
`;
const StyledButton = styled.button`
  font-family: 'Rye', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  margin: 2rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
`;
