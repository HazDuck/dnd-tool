import React, { useState } from 'react'
import { firebase } from '../firebase';
import 'firebase/auth';

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => console.log(cred))
  }

  return (
    <div className='login-container'>
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
      <button
        type="button"
        className="rpgui-button"
        onClick={()=> authenticate()}
      >Signup</button>
    </div>
  )
}

