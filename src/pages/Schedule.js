import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const { currentActiveSeason } = require('../config.json')

function Schedule() {
    const params = useParams()

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [seasonData, setSeasonData] = useState(null)
    const [seasonLoaded, setSeasonLoaded] = useState(false)
    const [gameDataFull, setgameDataFull] = useState([])
    const [pitcherData, setpitcherData] = useState([])
    const [gameLoaded, setgameLoaded] = useState(false)
    const [gameLoading, setgameLoading] = useState(false)
    const [pitcherLoaded, setpitcherLoaded] = useState(false)
    const [pitcherLoading, setpitcherLoading] = useState(false)

    useEffect( () => {
        fetchGameData()
    })

    const fetchGameData = async () => {
        if (!seasonLoaded) {fetchSeason()}
        if (seasonData != null && seasonLoaded && !gameLoaded && !gameLoading) {fetchGamesData()}
        if (gameDataFull != null && gameLoaded && !pitcherLoaded && !pitcherLoading) {fetchPitchersData()}
    }

    const fetchSeason = async () => {
        await fetch('https://daseballapi.adaptable.app/season/'+currentActiveSeason)
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
        await delay(3000);
        setSeasonLoaded(false)
    }

    const fetchGamesData = async () => {
        setgameLoading(true)
        let gameDataTemp = []
        for (let i = 0; i < 6; i++) {
            await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay-1][i]])
            .then(res => res.json())
            .then(data => gameDataTemp.push(data[0]))
            .catch(err => console.log(err))
        }
        for (let i = 0; i < 6; i++) {
            await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay][i]])
            .then(res => res.json())
            .then(data => gameDataTemp.push(data[0]))
            .catch(err => console.log(err))
        }
        for (let i = 0; i < 6; i++) {
            await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay+1][i]])
            .then(res => res.json())
            .then(data => gameDataTemp.push(data[0]))
            .catch(err => console.log(err))
        }
        setgameDataFull(gameDataTemp)
        setgameLoaded(true)
        await delay(2500);
        setgameLoading(false)
        setgameLoaded(false)
    }

    const fetchPitchersData = async () => {
        setpitcherLoading(true)
        let pitcherDataTemp = []
        if (seasonData[0].seasonDay % 2 == 0){
            for (let i = 0; i < 6; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay-2) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 6; i < 12; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay-1) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 12; i < 18; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
        } else{
            for (let i = 0; i < 6; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay-1) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 6; i < 12; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 12; i < 18; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay+1) / 2) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
        }
        console.log(pitcherDataTemp)
        setpitcherData(pitcherDataTemp)
        setpitcherLoaded(true)
        await delay(2500);
        setpitcherLoading(false)
        setpitcherLoaded(false)
    }

    const Schedule = () => {
        return (
            <div className='player'>
                {
                    gameDataFull.length > 0 && pitcherData.length > 0 && seasonData != null ?
                    <div className="player center">
                        <h2>Day {seasonData[0].seasonDay}</h2>
                        <div className='game-holder'>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[0].teamColor}}>{gameDataFull[0].teamEmoji}{gameDataFull[0].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[1].teamColor}}>{gameDataFull[1].teamEmoji}{gameDataFull[1].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[0].teamColor}}>{Math.round((gameDataFull[0].gamesWon/(gameDataFull[0].gamesWon+gameDataFull[1].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[1].teamColor}}>{Math.round((gameDataFull[1].gamesWon/(gameDataFull[1].gamesWon+gameDataFull[0].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[0].teamEmoji}{pitcherData[0]} <br/> 
                                VS <br/> {gameDataFull[1].teamEmoji}{pitcherData[1]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[2].teamColor}}>{gameDataFull[2].teamEmoji}{gameDataFull[2].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[3].teamColor}}>{gameDataFull[3].teamEmoji}{gameDataFull[3].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[2].teamColor}}>{Math.round((gameDataFull[2].gamesWon/(gameDataFull[2].gamesWon+gameDataFull[3].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[3].teamColor}}>{Math.round((gameDataFull[3].gamesWon/(gameDataFull[3].gamesWon+gameDataFull[2].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[2].teamEmoji}{pitcherData[2]} <br/> 
                                VS <br/> {gameDataFull[3].teamEmoji}{pitcherData[3]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[4].teamColor}}>{gameDataFull[4].teamEmoji}{gameDataFull[4].teamName}</span> <br/> 
                                VS <br/><span style={{color: "#"+gameDataFull[5].teamColor}}>{gameDataFull[5].teamEmoji}{gameDataFull[5].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[4].teamColor}}>{Math.round((gameDataFull[4].gamesWon/(gameDataFull[4].gamesWon+gameDataFull[5].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[5].teamColor}}>{Math.round((gameDataFull[5].gamesWon/(gameDataFull[5].gamesWon+gameDataFull[4].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[4].teamEmoji}{pitcherData[4]} <br/> 
                                VS <br/> {gameDataFull[5].teamEmoji}{pitcherData[5]}</h2>
                            </div>
                        </div>

                        <h2>Day {seasonData[0].seasonDay+1}</h2>
                        <div className='game-holder'>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[6].teamColor}}>{gameDataFull[6].teamEmoji}{gameDataFull[6].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[7].teamColor}}>{gameDataFull[7].teamEmoji}{gameDataFull[7].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[6].teamColor}}>{Math.round((gameDataFull[6].gamesWon/(gameDataFull[6].gamesWon+gameDataFull[7].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[7].teamColor}}>{Math.round((gameDataFull[7].gamesWon/(gameDataFull[7].gamesWon+gameDataFull[6].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[6].teamEmoji}{pitcherData[6]} <br/> 
                                VS <br/> {gameDataFull[7].teamEmoji}{pitcherData[7]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[8].teamColor}}>{gameDataFull[8].teamEmoji}{gameDataFull[8].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[9].teamColor}}>{gameDataFull[9].teamEmoji}{gameDataFull[9].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[8].teamColor}}>{Math.round((gameDataFull[8].gamesWon/(gameDataFull[8].gamesWon+gameDataFull[9].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[9].teamColor}}>{Math.round((gameDataFull[9].gamesWon/(gameDataFull[9].gamesWon+gameDataFull[8].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[8].teamEmoji}{pitcherData[8]} <br/> 
                                VS <br/> {gameDataFull[9].teamEmoji}{pitcherData[9]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[10].teamColor}}>{gameDataFull[10].teamEmoji}{gameDataFull[10].teamName}</span> <br/> 
                                VS <br/><span style={{color: "#"+gameDataFull[11].teamColor}}>{gameDataFull[11].teamEmoji}{gameDataFull[11].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[10].teamColor}}>{Math.round((gameDataFull[10].gamesWon/(gameDataFull[10].gamesWon+gameDataFull[11].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[11].teamColor}}>{Math.round((gameDataFull[11].gamesWon/(gameDataFull[11].gamesWon+gameDataFull[10].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[10].teamEmoji}{pitcherData[10]} <br/> 
                                VS <br/> {gameDataFull[11].teamEmoji}{pitcherData[11]}</h2>
                            </div>
                        </div>

                        <h2>Day {seasonData[0].seasonDay+2}</h2>
                        <div className='game-holder'>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[12].teamColor}}>{gameDataFull[12].teamEmoji}{gameDataFull[12].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[13].teamColor}}>{gameDataFull[13].teamEmoji}{gameDataFull[13].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[12].teamColor}}>{Math.round((gameDataFull[12].gamesWon/(gameDataFull[12].gamesWon+gameDataFull[13].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[13].teamColor}}>{Math.round((gameDataFull[13].gamesWon/(gameDataFull[13].gamesWon+gameDataFull[12].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[12].teamEmoji}{pitcherData[12]} <br/> 
                                VS <br/> {gameDataFull[13].teamEmoji}{pitcherData[13]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[14].teamColor}}>{gameDataFull[14].teamEmoji}{gameDataFull[14].teamName}</span> <br/>
                                VS <br/>
                                <span style={{color: "#"+gameDataFull[15].teamColor}}>{gameDataFull[15].teamEmoji}{gameDataFull[15].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[14].teamColor}}>{Math.round((gameDataFull[14].gamesWon/(gameDataFull[14].gamesWon+gameDataFull[15].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[15].teamColor}}>{Math.round((gameDataFull[15].gamesWon/(gameDataFull[15].gamesWon+gameDataFull[14].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[14].teamEmoji}{pitcherData[14]} <br/> 
                                VS <br/> {gameDataFull[15].teamEmoji}{pitcherData[15]}</h2>
                            </div>
                            <div className='game-panel'>
                                <h2><span style={{color: "#"+gameDataFull[16].teamColor}}>{gameDataFull[16].teamEmoji}{gameDataFull[16].teamName}</span> <br/> 
                                VS <br/><span style={{color: "#"+gameDataFull[17].teamColor}}>{gameDataFull[17].teamEmoji}{gameDataFull[17].teamName}</span></h2>
                                <h2><span style={{color: "#"+gameDataFull[16].teamColor}}>{Math.round((gameDataFull[16].gamesWon/(gameDataFull[16].gamesWon+gameDataFull[17].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[17].teamColor}}>{Math.round((gameDataFull[17].gamesWon/(gameDataFull[17].gamesWon+gameDataFull[16].gamesWon))*100)}%</span></h2>
                                <h2>{gameDataFull[16].teamEmoji}{pitcherData[16]} <br/> 
                                VS <br/> {gameDataFull[17].teamEmoji}{pitcherData[17]}</h2>
                            </div>
                        </div>
                    </div>
                    :
                    <h1>
                        Loading...
                    </h1>
                }
            </div>
        )
    }

    return (
        <>
            <Schedule />
        </>
    )
}

export default Schedule