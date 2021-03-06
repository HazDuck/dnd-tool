import React, { useState } from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
import { useAppValue } from '../context'

export const Auth = () => {
  const { user } = useAppValue()
  const [showSignup, setShowSignUp] = useState(false)

  return (
    !user && (
      <div className="auth-container">
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
          >Sign up</button>
        </>
        }
      </div>
    )
  )
}