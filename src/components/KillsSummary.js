import React, { useState, useEffect } from 'react';
import { useKills, useSelectedMonster } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'
import { Kills } from './Kills'
import { LoadingBar } from './LoadingBar'
import { ConsoleWriter } from 'istanbul-lib-report';

export const KillsSummary = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)
  const [summaryData, setSummaryData] = useState([])
  const { selectedMonster, setSelectedMonster} = useSelectedMonster('')
  const [showKillsModal, setShowKillsModal] = useState(false)
  const [totalKills, setTotalKills] = useState('')

  const calculateTotalKills = kills => kills.reduce((total, kill) => total + parseInt(kill.quantity), 0)

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    setTotalKills(calculateTotalKills(kills))
  }, [kills])

  //map over the monsterData and if the monsterId on firebase matches the monsterData monsterId
  //merge the objects together so we can setKillsData and pass to the IndividualKill component
  const findKills = (monsterData, kills) => {
    if (kills) {
      setShowLoading(false)
    }
    const killsData = []
    kills.map(kill => {
      let killedMonster = monsterData.filter(monster => 
        parseInt(kill.monsterId) === parseInt(monster.monsterId)
      )
      killedMonster = Object.assign({}, ...killedMonster, {...kill})
      killsData.push(killedMonster)
      return killsData
    })
    return killsData
  }

  //caluculate the summary data (total kill quantity) to display on home screen
  const calculateSummaryData = killsData => {
    let summaryData = []
    killsData.map(kill => {
      if (summaryData.some(monster => monster.monsterId === kill.monsterId)) {
        const toInc = summaryData.find(monster => monster.monsterId === kill.monsterId)
        toInc.quantity += kill.quantity
      } else {
        const summaryKillDataMultiple = {
          name: kill.name, 
          img: kill.img, 
          monsterId: kill.monsterId,
          quantity: kill.quantity
        }
        summaryData.push(summaryKillDataMultiple)
      }
    })
    return summaryData
  }

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    if (JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
    setShowLoading(false)
  },[monsterData, kills, killsData])

  //manages bar updating
  useEffect(() => {
    if (!showLoading) {
      return
    }  else if (loadingValue === 100 ) {
      return 
    }
    const fillBar = setInterval(() => setLoadingValue(loadingValue + 10), 1000)
    return () => {
      clearInterval(fillBar)
    }
  }, [showLoading, loadingValue])

  //filter killsData by sleected monster
  useEffect(() => {
    setSummaryData(calculateSummaryData(killsData))
  }, [killsData])

  const pixelateImages = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    img.src = 'https://5e.tools/img/bestiary/MM/Goblin.jpg';
    img.onload = function() {
      pixelate(canvas, ctx, img);
    };

  }

  const pixelate = (canvas, ctx, img) => {
    const size = .5
    const w = canvas.width * size
    const h = canvas.height * size
    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }

  // useEffect(() => {
  //   if (summaryData.length > 0) {
  //     return 
  //   }
  //   pixlateImages()
  // }, [summaryData])

  return (
    showLoading ? 
      <div className="rpgui-container framed">
        <p>summoning...</p>
        <LoadingBar loadingValue={loadingValue} data-testid="LoadingBarKillsSummary"/>
      </div>
      :
      summaryData.length > 0 && (
        <div className="rpgui-container framed kills-summary-container" data-testid="KillsSummary">
          <div className="rpgui-container framed-golden-2 selected-character">
            <h2>{selectedCharacter.name}</h2>
            <h3>Kills: {totalKills}</h3>
          </div>
          <div>{summaryData.map(kill => 
            <div
            className="kill-summary"
            onClick={()=> {
              setSelectedMonster(kill.monsterId)
              setShowKillsModal(true)
            }}
            key={kill.monsterId}>
              {/* <div className="rpgui-container framed monster-image-container">
                <img src={kill.img} alt={`${kill.name}`}/>
              </div> */}
              <canvas id="canvas"></canvas>
              <button
                onClick={()=>pixelateImages()}
              ></button>
              <h4>{kill.name}</h4>
              <h4>{kill.quantity}</h4>
            </div>
          )}</div>
          {showKillsModal && (
            <Kills selectedMonster={selectedMonster} killsData={killsData} setShowKillsModal={setShowKillsModal}/>
          )}
        </div>
      )
  )
}
