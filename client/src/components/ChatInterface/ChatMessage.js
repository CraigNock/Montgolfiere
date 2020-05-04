import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import tipRec from '../../assets/tip-received.svg';
import tipSent from '../../assets/tip-sent.svg';


// {
//   id: 'a',
//   userName: elaine,
//   body: 'How about you bring me back something?',
//   timestamp: '11:38',
// },

const ChatMessage = ( message ) => { 
    const { displayName, userId } = useSelector(state => state.user.profile);


    console.log(message);
    
    if(message.userId !== userId) {
        
        return (
        <div className="chat-message">
            <p className="user-name">{message.userName}</p>
            <p className="other-message">
                {message.body}
                <img className="other-tip" src={tipRec} alt="speechtip"/>
            </p>
            
        </div>
    )} else {
        return (
        <div className="message-line">
            <p className="user-message">
                props.message.body}
                <img className="user-tip" src="/assets/tip-sent.svg" alt="speechtip"/>
            </p>
        </div>
        )
    };
    
};




export default ChatMessage;