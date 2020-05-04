import React, { useEffect, useState } from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
import { useUserValue } from '../context'

export const Auth = () => {
  const { user, setUser} = useUserValue()
  const [showSignup, setShowSignUp] = useState(true)
  return (
    !user && (
      <div>
        {showSignup ? 
        <>
          <Signup /> 
          <span>If you already have an account...</span>
          <button 
          onClick={()=>setShowSignUp(!showSignup)}
          className="rpgui-button"
          >Login</button>
        </>
        : 
        <>
          <Login />
          <span>To create a new account...</span>
          <button 
          onClick={()=>setShowSignUp(!showSignup)}
          className="rpgui-button"
          >Signup</button>
        </>
        }
      </div>
    )
  )
}