import { useState, useEffect} from 'react'
import { firebase } from '../firebase'
import { orderObjectKeys } from '../helpers'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
      firebase
      .firestore()
      .collection('characters')
      .where('userId', '==', '12345')
      // .orderBy('name') i got rid of the index so probs delete this and do it without
      .get()
      .then((data)=>{
        const allCharacters = data.docs.map(character => ({
          ...character.data()
        }))
        console.log(characters)
        if (JSON.stringify(orderObjectKeys(allCharacters)) !== JSON.stringify(orderObjectKeys(characters))) {
          setCharacters(allCharacters)
          console.log(characters)
        }
      })
  },[characters])
  
  return { characters, setCharacters }
}

//----------------------------------------------------------//

export const useSelectedCharacter = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('')

  return { selectedCharacter, setSelectedCharacter }
}