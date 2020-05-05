import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import tipRec from '../../assets/tip-received.svg';
import tipSent from '../../assets/tip-sent.svg';


// {
// chatId: currentChat.chatId,
// userId: userId,
// timeStamp: Date.now(),
// content: content,
// },

const ChatMessage = ( {message} ) => { 
  const { displayName, userId } = useSelector(state => state.user.profile);

  console.log(message);
  
  if(message.userId !== userId) {
      
    return (
      <>
        <UserName>{message.userId}</UserName>
        <OtherMess>
            {message.content}
            {/* <OtherTip src={tipRec} alt="speechtip"/> */}
        </OtherMess>
      </>
    )
  } else {
    return (
      <MessLine>
        <UserMess>
          {message.content}
          {/* <UserTip src={tipSent} alt="speechtip"/> */}
        </UserMess>
      </MessLine>
    )
  };
};


export default ChatMessage;


const UserName = styled.p`
  font-weight: bold;
  width: 100%;
  padding-left: .5rem;
  margin: 0;
  font-size: .5rem;
`;
const UserMess = styled.p`
  position: relative;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  padding: .15rem .5rem;
  margin: .1rem;
  font-size: 1rem;
  font-family: 'Lobster';
  color: black;
  background-color: goldenrod;
  word-wrap: break-word;
  
`;
const OtherMess = styled(UserMess)`
  background-color: #E9E9EB;
  
`;
const MessLine = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
  width: 100%;
`;
const UserTip = styled.img`
  position: absolute;
  right: -8px;
  top: .9rem;
`;
const OtherTip = styled.img`
  position: absolute;
  left: -8px;
  top: 1.1rem;
`;