import React from 'react'

export const Characters = ({characters}) => {
  return (
    <p>Name: {characters && characters[0] ? characters[0].name : undefined}</p>
  )
}