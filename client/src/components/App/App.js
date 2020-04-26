import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../GlobalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Homepage from '../../pages/Homepage';
import Profile from '../../pages/Profile';//longterm->other :user profile pages
import About from '../../pages/About';
import Clouds from '../../components/Clouds';


const App = () => {

  return (
    <Router>
      <Wrapper>
        <GlobalStyles />
        <Clouds/>
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
      </Wrapper>
    </Router>
  );

};


const Wrapper = styled.div`
  overflow: hidden;
  
`;



export default App;
