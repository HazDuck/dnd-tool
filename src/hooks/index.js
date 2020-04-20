import { useState, useEffect} from 'react'
import { firebase } from '../firebase'
import { orderObjectKeys } from '../helpers'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])

  // useEffect(() => {
  //     firebase
  //     .firestore()
  //     .collection('characters')
  //     .where('userId', '==', '12345')
  //     .orderBy('name') i got rid of the index so probs delete this and do it without
  //     .get()
  //     .then((data)=>{
  //       const allCharacters = data.docs.map(character => ({
  //         ...character.data()
  //       }))
  //       console.log({allCharacters: allCharacters, characters: characters})
  //       this is currently not working as the order of the keys is chaning between allCharacters vs Characters...dunno why
  //       if (JSON.stringify(allCharacters) !== JSON.stringify(characters)) {
  //         setCharacters(allCharacters)
  //       }
  //     })
  // },[ 
  //   characters
  // ])

  useEffect(() => {
    const allCharacters = [{userId: '12345', name: 'Gresh', archived: false}, {userId: '12345', archived: false, name: 'Kennit',}]
    if (JSON.stringify(orderObjectKeys(allCharacters)) !== JSON.stringify(orderObjectKeys(characters))) {
      setCharacters(allCharacters)
    } 
  },[characters])
  
  return { characters, setCharacters }
}