import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../GlobalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomeSignin from '../WelcomeSignin';
import Homepage from '../../pages/Homepage';
import Profile from '../../pages/Profile';//longterm->other :user profile pages
import About from '../../pages/About';
import Clouds from '../../components/Clouds';


import { AuthContext } from '../AuthContext/AuthContext';


const App = () => {
  const { 
    currentUser, 
    handleSignOut 
  } = React.useContext(AuthContext);


  return (
    <Router>
      <Wrapper>
        <GlobalStyles />
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
  
`;



export default App;
