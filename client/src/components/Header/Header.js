import React from 'react'; 
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';
// import { GrSettingsOption } from "react-icons/gr";
import Icon from 'react-icons-kit';
import {cogs} from 'react-icons-kit/icomoon/cogs'

import { AuthContext } from '../AuthContext/AuthContext';

const Header = () => { 
  const { currentUser, handleSignOut } = React.useContext(AuthContext);
  const [showMenu, setShowMenu] = React.useState(false);


  return (
    <StyledBar>
      <Title> 
        <StyledLink to={'/'}>
          Where <span>is</span> my Balloon? 
        </StyledLink>
      </Title>
      <Settings>
        <IconDiv onClick={()=>setShowMenu(!showMenu)}>
          <Icon icon={cogs} size={30} />
        </IconDiv>
        <Menu style={{display: showMenu? 'flex' : 'none' }}>
          <StyledLink to={'/profile'}>
            Profile
          </StyledLink>
          <StyledLink to={'/'}>
            Settings
          </StyledLink>
          <StyledLink to={'/About'}>
            About
          </StyledLink>
          <StyledButton onClick={handleSignOut}>
            Sign Out
          </StyledButton>
        </Menu>
      </Settings>
    </StyledBar> 
  ) 
}; 


export default Header;

//opacity default 0
const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  color: whitesmoke;
  background: rgba(0,0,0,.5);
  margin-bottom: 1rem;
  height: 2.5rem;
  opacity: 0;
  transition: opacity 2s;
  &:hover {
    opacity: 1;
    transition: opacity 2s;
  }
`;
const Title = styled.div`
  padding: .5rem 1rem;
  /* cursor: context-menu; */
  span{
    font-style: italic;
  }
`;
const Settings = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* padding: 0 2rem 0 2rem; */
  height: 100%;
  box-sizing: border-box;
  &:hover{
    background: rgba(0,0,0,.25);
  }
`;
const IconDiv = styled.div`
  width:100%;
  padding: 0 2rem 0 2rem;
  &:hover{
    cursor: pointer;
  }
`;
const Menu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: rgba(0,0,0,.5);
  border-radius: 0 0 0 7px;
  padding: 0 0 .25rem 0;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: whitesmoke;
  padding: .25rem .5rem .25rem .75rem;
  &:hover{
    background: rgba(0,0,0,.25);
  }
`;
const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: whitesmoke;
  text-align: left;
  padding-left: .75rem;
  &:hover{
    background: rgba(0,0,0,.25);
  }
`;
