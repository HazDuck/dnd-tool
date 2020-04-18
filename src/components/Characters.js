import React from 'react'
import { useCharacters } from '../hooks';

export const Characters = () => {
  const { characters } = useCharacters()
  console.log(characters)
  return (
    <p>Name:</p>
  )
}