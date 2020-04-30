import React from 'react'

export const Header = () => {
  
  return (
    <header className="header">
      <img className="header-image right" src="/images/evil-wizard.png" alt="evil wizard"/>
      <img className="speech" src="/images/speech-edit.png" alt="In speech bubble: Greetings traveller...add your character's mighty victories to my library. For knowledge is power! muahahaha!"/>
      <div className="heading-container">
        <h1>Larloch's Library</h1>
        <hr className="golden"></hr>
        <h3>- Keeping track of who's killed what across the Realms... -</h3>
      </div>
      {/* <img className="header-image right" src="/images/skelly2.png" alt="skelly"/> */}
    </header>
  )
}


