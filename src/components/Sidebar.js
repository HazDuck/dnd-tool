import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'
import { useUserValue, useDisplayStateContextValue } from '../context'

export const Sidebar = () => {
  const { user } = useUserValue()
  const { showSidebar, setShowSidebar } = useDisplayStateContextValue()

  return (
    user && (
      <>
        <div className={`side-bar-modal ${showSidebar ? '' : 'show'}`}></div>
        <aside className={`rpgui-container framed-golden side-bar ${showSidebar ? '' : 'show'}`}>
          <Characters />
          <SignOut />     
          <div className="sidebar-close">
            <hr className="golden"></hr>
            <button 
              onClick={()=>setShowSidebar(!showSidebar)}
              className="rpgui-button">Close</button>
          </div>   
        </aside>
      </>
    )
  )
}