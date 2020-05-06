import React, {useEffect, useState} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'; 

import * as firebase from 'firebase';

import Header from '../../components/Header';
// import AlertBar from '../../components/AlertBar';
import HUD from '../../components/HUD';
import MapMap from '../../components/MapMap';
import NearbyDisplay from '../../components/NearbyDisplay';
// import ImageModal from '../../components/ImageModal';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import ChatInterface from '../../components/ChatInterface';

// import TradeInterface from '../../components/TradeInterface';

import { addChat, setStatusAskChat, setStatusNoChat, changeCurrentChat } from '../../reducersActions/chatActions';



const Homepage = () => { 
  const dispatch = useDispatch();
  const { appStatus } = useSelector((state) => state.app);
  const { profile } = useSelector(state => state.user);
  const { status, chats } = useSelector(state => state.chat);
  // console.log('appStatus', appStatus);

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
        console.log('convo.data', convo.data);
        dispatch(changeCurrentChat(convo.data))
      })
      .catch(err => {console.log('getconv err', err);})
  };

  useEffect(()=>{
    if(appStatus==='logged in'){
      const listenForChats = async () => {
        try{
          firebase.database().ref('conversations').on('child_added', 
          (snapshot, prevChildKey)=>{
            if (snapshot.val().participants.includes(profile.userId)){
              console.log('snapshot', snapshot.val());
              getConversation(snapshot.val());
              dispatch(addChat(snapshot.val().chatId));
              dispatch(setStatusAskChat());
            }
          })
        } catch (err) {console.log('err', err);}
      };
      listenForChats();
    }
    return ()=>{
      // console.log('conversation added .off');
      // firebase.database().ref('conversations').off('child_added');
    }
  }, [appStatus]);

  useEffect(()=> {
    if(status !== 'noChat'){
      const listenForChatEnd = async () => {
        try{
          firebase.database().ref('conversations').on('child_removed', 
          (snapshot, prevChildKey)=>{
            if (snapshot.val().participants.includes(profile.userId)){
              // console.log('snapshot', snapshot.val());
              dispatch(setStatusNoChat());
              dispatch( changeCurrentChat(null) );
            }
          })
        } catch (err) {console.log('err', err);}
      };
      listenForChatEnd();
    }
    return () => {
      firebase.database().ref('conversations').off('child_removed', (snapshot) => {})
    }
  }, [status]);



  return (
    <StyledDiv> 
      <Header />
      {(appStatus==='logged in')? 
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
