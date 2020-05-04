import React from 'react'; 
import styled from 'styled-components'; 

import Header from '../../components/Header';
// import AlertBar from '../../components/AlertBar';
import MapMap from '../../components/MapMap';
import HUD from '../../components/HUD';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import NearbyDisplay from '../../components/NearbyDisplay';
// import ImageModal from '../../components/ImageModal';

// import ChatInterface from '../../components/ChatInterface';
// import TradeInterface from '../../components/TradeInterface';

import { useSelector } from 'react-redux';


const Homepage = () => { 
  const { status } = useSelector((state) => state.app);
  console.log('status', status);
  return (
    <StyledDiv> 
      <Header />
      {(status==='logged in')? 
      <>
      <MainContent>
      <LeftPanel><HUD/></LeftPanel>
      <CenterDiv>
      <MapMap />
      <BottomPanel><NearbyDisplay/></BottomPanel>
      </CenterDiv>
      <RightPanel><ConditionsDisplay/></RightPanel>
      </MainContent>
      
      </>
      : ''}
      
      
    </StyledDiv> 
  ) 
}; 


export default Homepage;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 100%; */

`;
const MainContent = styled.div`
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  overflow: hidden;
  height: 100vh;
`;
const LeftPanel = styled.div`
  position: relative;
  width: 16vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  background: transparent;
  margin: 1rem 0;
  /* border: 1px solid goldenrod; */
`;
const RightPanel = styled.div`
  position: relative;
  width: 16vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  background: transparent;
  margin: 1rem 0;
  /* border: 1px solid goldenrod; */
`;
const BottomPanel = styled.div`
  position: relative;
  /* bottom: 0;
  left: 16vw; */
  height: 25vh;
  width: 80vw;
  /* right: 0%; */
  margin: 0 auto;
  background: transparent;
  /* border: 1px solid goldenrod; */
  /* z-index: 200; */
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
