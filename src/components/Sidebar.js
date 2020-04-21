import React from 'react'
import { Characters } from './Characters';
import { SignOut } from './SignOut'

export const Sidebar = () => (
  <aside>
    <Characters />
    <SignOut />
  </aside>
)