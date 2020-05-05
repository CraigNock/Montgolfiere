import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import * as firebase from 'firebase';
// import { auth } from "../../../services/firebase";
// import { db } from "../../../services/firebase";

import paper from '../../assets/paper.jpg';
import ChatMessage from './ChatMessage';

import { 
  addChat, 
  updateCurrentChat, 
  setStatusAskChat, 
  setStatusNoChat, 
  setStatusInChat 
} from '../../reducersActions/chatActions';

const ChatInterface = () => { 
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user.profile);
  const { status, currentChat, chats } = useSelector(state => state.chat);

  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);

  // const [chatStream, setChatStream] = useState([])

  const handleStartChat = async (yes) => {
    if (yes) {
      dispatch(setStatusInChat());
      try{
        firebase.database().ref('conversations/' + chats[0] + '/content').on('child_added', 
        (snapshot, prevChildKey)=>{
          console.log('hsc snapshot', snapshot.val());
            dispatch( updateCurrentChat(snapshot.val()) );
        })
      } catch (err) {console.log('err', err)}
    } else {
      dispatch(setStatusNoChat());
      endChat();
      return;
    }
  }

  const endChat = () => {
    fetch(`/removeConversation/${currentChat.ChatId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log('send mesg');
    console.log('hsm currentChat', currentChat);
    fetch('/newChatMessage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: currentChat.chatId,
        userId: userId,
        timeStamp: Date.now(),
        content: content,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('nmsg res status', json.status);
        if(json.status===200) setContent('');
        setDisable(false);
      })
      .catch(err => {console.log('sendmsg err', err);})
  };


  return ( (status ==='inChat' && currentChat && currentChat.converstation)?
    <StyledDiv> 
      <ChatWindow>
      {currentChat.converstation.map(message => {
        return (
          <ChatMessage key={message.timeStamp} message={message} />
          // <div key={message.timeStamp + 1}>{message.content}</div>
        )
      })}
      </ChatWindow>
      <FormDiv>
        <form onSubmit={(e)=> {
          // setDisable(true);
          handleSendMessage(e)
        }} >
          <StyledInput 
            onChange={(e)=> setContent(e.target.value)} 
            value={content} 
          />
          <StyledButton 
            type='submit'
            disabled={false}
          >
            Send
          </StyledButton>
        </form>
      </FormDiv>
    </StyledDiv>

    : (status === 'askChat' && currentChat && currentChat.converstation)? 
    <StyledDiv>
      <ChatWindow>
      {currentChat.converstation.map(message => {
        return (
          <ChatMessage key={message.timeStamp} message={message} />
          // <div key={message.timeStamp}>{message.content}</div>
        )
      })} 
      </ChatWindow>
      <div>
        <StyledSpan>Chat?</StyledSpan>
        <StyledButton
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(true);
          }}
        >
          Yes
        </StyledButton>
        <StyledButton
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(false);
          }}
        >
          No
        </StyledButton>
      </div>
    </StyledDiv>

    : <StyledDiv><div>Loading...</div></StyledDiv>
  ) 
}; 


export default ChatInterface;


//message balloon reflect user balloon color?

const StyledDiv = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* max-width: 18vw; */
  /* min-width: fit-content; */
  width: 19vw;
  height: 75vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border: 3px solid #674c47;
  border-right: none;
  border-radius: 15px 5px 5px 15px;
  opacity: 0.9;
  padding: .5rem .25rem .5rem .25rem;
  
`;
const ChatWindow = styled.div`
  background: rgba(0,0,0,.3);
  width: 100%;
  height: 100%;
  overflow-Y: auto;
  overflow-X: hidden;
  border-radius: 5px;
  padding: .5rem 0;
  word-break: break-word;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 11px;
  };
  &::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
  };
  &::-webkit-scrollbar-thumb {
  background-color: var(#90A4AE) ;
  border-radius: 6px;
  border: 3px solid var(#CFD8DC);
  };
`;


const FormDiv = styled.div`
  max-width: 100%;
`;
const StyledInput = styled.input`
  max-width: 100%;
  margin: .25rem auto;
  font-family: 'Lobster';
`;
const StyledSpan = styled.span`
  font-family: 'Rye', cursive;
  font-size: .75rem;
  margin: 0 .5rem 0 0;
  color: black;
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  margin: 0 .1rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
  font-size: .75rem;
`;