import { data, dragonDescription } from '../data'

//data from dnd monsters api is passed in and anything unnecassary is stripped out. All dragon types are given the 
//top level dragon description because they are the coolest. If the description is buried too deep currently just give generic DM style message
export const dataCleanUp = () => {
  const parsedData = JSON.parse(data)
  const cleanedData = parsedData.monsterFluff.map((monster, index) => {
    const containsExcludedMonsterType = (monsterName, excluded) =>  monsterName.includes(excluded)
    
    //****** DRAGON CLEANUP ******
    const excludedDragonTypes = ['Faerie', 'Shadow', 'Half-', 'Turtle']
    const giveGeneralDragonDescription = 
    monster.name.includes('Dragon') && !excludedDragonTypes.some(dragonType => 
      containsExcludedMonsterType(monster.name, dragonType)) ? true : false
    
    return monster = {
      monsterId: index,
      name: monster.name,
      description: 
      giveGeneralDragonDescription ? 
      dragonDescription 
      : monster.entries && 
      monster.entries[0] &&
      monster.entries[0].entries &&
      monster.entries[0].entries[0] &&
      monster.entries[0].entries[0].entries ? 
      monster.entries[0].entries[0].entries[0] : undefined,
      img: `https://5e.tools/img/${
        monster.images &&
        monster.images[0] &&
        monster.images[0].href ? 
        monster.images[0].href.path : undefined
      }`
    }
  })
  return cleanedData
}

//generate a random id that matches how firebase has it
//grabbed the function from interweb
export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'

  const lastRandChars = []

  return function() {
    let now = new Date().getTime()

    const timeStampChars = new Array(8)
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64)
      now = Math.floor(now / 64)
    }

    let id = timeStampChars.join('')

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i])
    }

    return id;
  }
})()

//when using stringify to compare two objects to see if updating info is required keys order was being changed,
//this function alphabetizes the key order to a true comparision is possible
export const orderObjectKeys = unorderedCharacters => {
  const orderedCharacters = []
  unorderedCharacters.map(character => {
    const orderedCharacter = {}
    Object.keys(character).sort().map(key => 
      orderedCharacter[key] = character[key])
      return orderedCharacters.push(orderedCharacter)
    }
  )
  return orderedCharacters
}