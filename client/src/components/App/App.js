import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalStyles from '../../GlobalStyles';
import WelcomeSignin from '../WelcomeSignin';
import Homepage from '../../pages/Homepage';
import Profile from '../../pages/Profile';//longterm->other :user profile pages
import About from '../../pages/About';
import Clouds from '../../components/Clouds';


import { AuthContext } from '../AuthContext/AuthContext';


const App = () => {
  const { currentUser } = React.useContext(AuthContext);

  const { current } = useSelector( state => state.conditions);

  // if(current.time)


  return (
    <Router>
      <Wrapper>
        <GlobalStyles />
        <CloudBackground/>
        <Clouds/>
        {currentUser && currentUser.email? (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        ) : (
          <WelcomeSignin />
        )}
      </Wrapper>
    </Router>
  );

};


const Wrapper = styled.div`
  overflow: hidden;
  filter: brightness(75%);
`;
const CloudBackground = styled.div`
  position: absolute;
  width:100vw;
  height:100vh;
  /* min-width: 1000px; */
  /* min-height: 700px; */
  z-index: -100;
  overflow: hidden;
  /* background: 
  linear-gradient(180deg, 
    rgba(0,122,235,1) 0%, 
  rgba(157,207,255,1) 83%); */

  /* background: rgb(0,4,47);
  background: linear-gradient(180deg, rgba(0,4,47,1) 0%, rgba(0,40,78,1) 83%); */
  background: rgb(0,3,34);
  background: linear-gradient(180deg, rgba(0,3,34,1) 0%, rgba(0,18,54,1) 83%);

  /* background: rgb(0,21,87);
  background: linear-gradient(180deg, rgba(0,21,87,1) 0%, rgba(255,164,126,1) 100%); */
  /* background: rgb(9,0,85);
  background: linear-gradient(180deg, rgba(9,0,85,1) 0%, rgba(0,63,181,1) 50%, rgba(255,148,65,1) 100%); */
  
  /* background: rgb(9,0,85);
  background: linear-gradient(180deg, rgba(9,0,85,1) 0%, rgba(0,63,181,1) 50%, rgba(255,252,171,1) 100%); */
`;



export default App;
