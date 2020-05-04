import React, { useState } from 'react'
import { firebase } from '../firebase';
import 'firebase/auth';
import { useUserValue } from '../context' 

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const loginIn = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      setEmail('')
      setPassword('')
    })
    .catch(error => setErrorMessage(error.message)
    )
  }

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        required
      />
      <p>{errorMessage}</p>
      <button
        type="button"
        className="rpgui-button"
        onClick={()=> loginIn()}
      >Login</button>
    </div>
  )
}