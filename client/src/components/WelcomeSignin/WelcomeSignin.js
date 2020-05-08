import React from 'react'; 
import styled from 'styled-components'; 

import { AuthContext } from '../AuthContext/AuthContext';

import parchment2 from '../../assets/parchment2.png';


const WelcomeSignin = () => { 
  const { signInWithGoogle } = React.useContext(AuthContext);

  return (
    <StyledDiv> 
      <Intro> 
        <Title>Welcome Aeronaut!</Title>
        <p><span>Where <em>is</em> my Balloon?</span> uses the very latest in dirgible tracking technology.</p> 
        <p>Launch your balloon to travel the world, and float over new and exotic places!</p> <p>The wind will take you there.</p>
        
      </Intro>
      <SignIn>
        <p>Please sign in to start your voyage.</p>
        <StyledButton onClick={signInWithGoogle}>
            Sign In
        </StyledButton>
      </SignIn>
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
    margin-top: .5rem;
  }
  span{
    font-family: 'Rye', cursive;
    em{font-family: 'Rye', cursive;}
    color: gray;
  }
`;
const Title = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  color: darkgoldenrod;
`;
const SignIn = styled.div`
  p {
    font-family: 'Rye', cursive;
    font-size: .9rem;
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const StyledButton = styled.button`
  font-family: 'Rye', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  margin: 1rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
`;
