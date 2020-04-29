import React from 'react'

export const Header = () => {
  
  return (
    <header className="header">
      <img className="header-skelly" src="/images/skelly2.png" alt="skelly"/>
      <div className="heading-container">
        <h1>Larloch's Library</h1>
        <hr className="golden"></hr>
        <h3>- Keeping track of who's killed what across the Realms... -</h3>
      </div>
      <img className="header-skelly right" src="/images/skelly2.png" alt="skelly"/>
    </header>
  )
}


