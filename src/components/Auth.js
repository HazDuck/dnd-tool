import React, { useEffect } from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
import { userStatus } from '../auth'
import { useUserValue } from '../context'

export const Auth = () => {
  const { user, setUser} = useUserValue()

  return (
    !user && (
      <>
        <Signup />
        <Login />
      </>
    )
  )
}