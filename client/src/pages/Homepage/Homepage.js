import React, {useEffect, useState} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'; 

import { auth } from "../services/firebase";
import { db } from "../services/firebase";

import Header from '../../components/Header';
// import AlertBar from '../../components/AlertBar';
import HUD from '../../components/HUD';
import MapMap from '../../components/MapMap';
import NearbyDisplay from '../../components/NearbyDisplay';
// import ImageModal from '../../components/ImageModal';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import ChatInterface from '../../components/ChatInterface';

// import TradeInterface from '../../components/TradeInterface';

import { addChat, setStatusAskChat } from '../../reducersActions/chatActions';



const Homepage = () => { 
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.app);
  const { userId } = useSelector(state => state.user.profile);
  const { status, chats } = useSelector(state => state.chat);
  console.log('status', status);

  const getConversation = async (snapshot) => {
    //get conversation first and make current or whatever then change status
    fetch(`/getConversation/${snapshot.chatId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(convo => {
        console.log('convo', convo);
        
      })
      .catch(err => {console.log('getconv err', err);})
  };

  useEffect(()=>{
    if(status==='logged in'){
      try{
        db.ref('conversations').on('child_added', 
        (snapshot, prevChildKey)=>{
          if (snapshot.participants.includes(userId)){
            getConversation(snapshot);
            dispatch(addChat(snapshot.chatId));
            dispatch(setStatusAskChat());
          }
        })
      } catch (err) {console.log('err', err);}
    }
    return ()=>{}
  }, [status]);

  return (
    <StyledDiv> 
      <Header />
      {(status==='logged in')? 
      <>
      <MainContent>
        <LeftPanel>
          <HUD/>
        </LeftPanel>
        <CenterDiv>
          <MapMap />
          <BottomPanel><NearbyDisplay/></BottomPanel>
        </CenterDiv>
        <RightPanel>
          {(status !== 'noChat')? <ChatInterface/> : <ConditionsDisplay/>}
        </RightPanel>
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
