import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'
import { useUserValue, useDisplayStateContextValue } from '../context'

export const Sidebar = () => {
  const { user, setUser} = useUserValue()
  const { showSidebar } = useDisplayStateContextValue()

  return (
    <>
    {user && (
      <aside className={`rpgui-container framed-golden side-bar ${showSidebar ? '' : 'show'}`}>
        <Characters />
        <SignOut />
      </aside>
    )}
    </>
  )
}