import { useState, useEffect} from 'react'
import { firebase } from '../firebase'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
      firebase
      .firestore()
      .collection('characters')
      .where('userId', '==', '12345')
      .get()
      .then((data)=>{
        const allCharacters = data.docs.map(character => character.data() )
        setCharacters(allCharacters)
      })
  },[])

  return { characters, setCharacters }
}