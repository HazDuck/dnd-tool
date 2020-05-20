import React from 'react'
import { useAppValue } from '../context'

export const Header = () => {
  const { setShowSidebar, showSidebar, user } = useAppValue()
  
  return (
    <header className="header">
      {user && (
        <>
          <div className="top-header-container">
            <img 
              onClick={()=> setShowSidebar(!showSidebar)}
              className="hamburger" 
              src="/images/interface.png" 
              alt="hamburger menu"/>
            <div className="evil-wizard-container">
              <img className="header-image right" src="/images/evil-wizard.png" alt="evil wizard"/>
              <img className="speech" src="/images/speech-edit.png" alt="In speech bubble: Greetings traveller...add your character's mighty victories to my library. For knowledge is power! muahahaha!"/>
            </div>
          </div>
        </>
      )}
      <div className="heading-container">
        <h1>Larloch's Library</h1>
        <hr className="golden"></hr>
        <h3>Keeping track of who's killed what across the Realms</h3>
      </div>
    </header>
  )
}


