import React, { useEffect } from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
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