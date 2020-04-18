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
    monster.name.includes('Dragon') && !excludedDragonTypes.some(dragonType => containsExcludedMonsterType(monster.name, dragonType)) ?
    true : false
    
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
      monster.entries[0].entries[0].entries[0] : 'There are many mysteries yet known',
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