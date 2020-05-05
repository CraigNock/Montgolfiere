import React from 'react'; 
import styled from 'styled-components'; 

import { AuthContext } from '../AuthContext/AuthContext';

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
  background: whitesmoke;
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
  margin: 2rem;
  font-family: 'Rye', cursive;
`;
