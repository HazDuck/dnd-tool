import { useState, useEffect} from 'react'
import { firebase } from '../firebase'
import { orderObjectKeys } from '../helpers'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
      firebase
        .auth()
        .onAuthStateChanged(user => {
          setUser(user)
        })

      if (!user) {
        return
      }

      firebase
      .firestore()
      .collection('characters')
      .where('userId', '==', user.uid)
      .get()
      .then((data)=>{
        const allCharacters = data.docs.map(character => ({
          ...character.data(),
          //below used to find doc when it comes to deleting
          characterId: character.id
        }))
        if (JSON.stringify(orderObjectKeys(allCharacters)) !== JSON.stringify(orderObjectKeys(characters))) {
          setCharacters(allCharacters)
        }
      })
  },[characters, user])
  
  return { characters, setCharacters }
}

//----------------------------------------------------------//

// export const useSelectedCharacter = () => {
//   //store the selectedCharacter in local storage and parse it so we can extract character name
//   const [selectedCharacter, setSelectedCharacter] = useState(()=>{
//     const characterString = window.localStorage.getItem('selectedCharacter')
//     return JSON.parse(characterString)
//   })
//   window.localStorage.clear()
//   window.localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter))
//   return { selectedCharacter, setSelectedCharacter }
// }

export const useSelectedCharacter = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('')

  return { selectedCharacter, setSelectedCharacter }
}

//----------------------------------------------------------//

export const useSelectedMonster = () => {
  //store the selectedCharacter in local storage and parse it so we can extract character name
  const [selectedMonster, setSelectedMonster] = useState()

  return { selectedMonster, setSelectedMonster }
}

//----------------------------------------------------------//

export const useKills = (selectedCharacterId) => {
  const [kills, setKills] = useState([])
  
  useEffect(() => {
    let data = firebase
      .firestore()
      .collection('kills')
      .where('userId', '==', '12345')

    data = data.onSnapshot(snapshot => {
      const newKills = snapshot.docs.map(kill => ({
        killId: kill.id,
        ...kill.data()
      }))
        setKills(newKills.filter(kill => 
          kill.characterId === selectedCharacterId))
    })
    return () => {
      data()
    }
  }, [selectedCharacterId])

  return { kills, setKills }
}

//----------------------------------------------------------//

export const useDisplayState = () => {

  const [showKillsModal, setShowKillsModal] = useState(false)
  const [showKillsSummary, setShowKillsSummary] = useState(true)
  const [showAddKill, setShowAddKill] = useState(false)

  return { 
    showKillsModal, 
    setShowKillsModal, 
    showKillsSummary, 
    setShowKillsSummary, 
    showAddKill, 
    setShowAddKill 
  }
}

//----------------------------------------------------------//

export const useUser = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        setUser(user)
      })
  })

  return { user, setUser }
}

