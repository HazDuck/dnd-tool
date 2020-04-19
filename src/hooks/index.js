import { useState, useEffect} from 'react'
import { firebase } from '../firebase'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])
  console.log(characters)

  useEffect(() => {
      firebase
      .firestore()
      .collection('characters')
      .where('userId', '==', '12345')
      .orderBy('name')
      .get()
      .then((data)=>{
        const allCharacters = data.docs.map(character => character.data())
        //allows to pass [characters] into useEffect - only setCharacters if there has been a change
        if (JSON.stringify(allCharacters) !== JSON.stringify(characters)) {
          setCharacters(allCharacters)
        }
      })
  },[characters])

  return { characters, setCharacters }
}