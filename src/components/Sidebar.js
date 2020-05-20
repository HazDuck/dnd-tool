import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'
import { useAppValue } from '../context'

export const Sidebar = () => {
  const { showSidebar, setShowSidebar, user } = useAppValue()

  return (
    user && (
      <>
        <div className={`side-bar-modal ${showSidebar ? '' : 'show'}`}></div>
        <aside className={`rpgui-container framed-golden side-bar ${showSidebar ? '' : 'show'}`}>
          <Characters setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>  
          <SignOut />     
        </aside>
      </>
    )
  )
}