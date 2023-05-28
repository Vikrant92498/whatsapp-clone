import React from 'react'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
function sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <div className="sidebar_headerRight">
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <input type="text" placeholder='Search or start new chat'/>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div> 
  )
} 

export default sidebar