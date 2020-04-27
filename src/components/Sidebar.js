import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'

export const Sidebar = () => (
  <aside className="rpgui-container framed-golden">
    <Characters />
    <SignOut />
  </aside>
)