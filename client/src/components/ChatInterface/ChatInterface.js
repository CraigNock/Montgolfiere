import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import paper from '../../assets/paper.jpg';

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

  const [chatStream, setChatStream] = useState([])

  const handleStartChat = async (yes) => {
    if (yes) {
      dispatch(setStatusInChat());
      try{
        db.ref('conversations/' + chats[0]).on('child_added', 
        (snapshot, prevChildKey)=>{
            dispatch( updateCurrentChat(snapshot) );
            
        })
        
      } catch (err) {console.log('err', err)}
    } else {
      dispatch(setStatusNoChat());

      return;
    }
  }

  const endChat = () => {

  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
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


  return ( (status ==='inChat')?
    <StyledDiv> 

      <div> ChatInterface </div>
      <div>message display</div>
      {currentChat.content.map(message => {
        return (
          <ChatMessage message={message} />
        )
      })}
      <div>message input</div>
      <form onSubmit={(e)=> {
        setDisable(true);
        handleSendMessage(e)
      }} >
        <input 
          onChange={(e)=> setContent(e.target.value)} 
          value={content} 
        />
        <button 
          type='submit'
          disabled={disable}
        >
          Send
        </button>
      </form>

    </StyledDiv>

    : (status === 'askChat')? 
    <StyledDiv>
      {currentChat.content.map(message => {
        return (
          <ChatMessage message={message} />
        )
      })} 
      <div>Join Chat?
        <button
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(true);
          }}
        >
          Yes
        </button>
        <button
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(false);
          }}
        >
          No
        </button>
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
  align-items: flex-end;
  width: 18vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border: 3px solid #674c47;
  border-right: none;
  border-radius: 5px 5px 5px 5px;
  opacity: 0.9;
  padding: .5rem;
  
`;
const ChatWindow = styled.div`
  background: gray;

`;
const UserMessage = styled.div`
  background: lightgray;
  color: whitesmoke;
`;
const OtherMessage = styled(UserMessage)`
  background: whitesmoke;
  color: darkgray;
`;