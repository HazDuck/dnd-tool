import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'
import { useUserValue } from '../context'

export const Sidebar = () => {
  const { user, setUser} = useUserValue()

  return (
    user && (
      <aside className="rpgui-container framed-golden side-bar">
        <Characters />
        <SignOut />
      </aside>
    )
  )
}