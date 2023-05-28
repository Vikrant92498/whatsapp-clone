import React from 'react'
import './Chat.css'
function chat() {
  return (
    <div className='chat'>
      <div className="chat_header">
       
        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">

        </div>
        
      </div>
      <div className="chat_body">
        <p className='chat_message'>
          <span className='chat_name'>Vikrant</span>
          This is a messgae
          <span className='chat_timestamp'>
            {new Date().toUTCString()}
          </span>
        </p>
        <p className='chat_message chat_receiver'>
          <span className='chat_name'>Vikrant</span>
          This is a messgae
          <span className='chat_timestamp'>
            {new Date().toUTCString()}
          </span>
        </p>
      </div>
      <div className="chat_footer">

        <form action="">
          <input 
          placeholder='Type a message'
          type='text'
          />
          <button  type='submit'>Send a message</button>
        </form>
      </div>
    </div>
  )
}

export default chat