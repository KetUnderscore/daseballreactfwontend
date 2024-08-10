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
        if (seasonData[0].seasonDay >= 46) {
            for (let i = 0; i < 4; i++) {
                await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].playoffTeams[seasonData[0].postSeasonSchedule[seasonData[0].seasonDay-46][i]])
                .then(res => res.json())
                .then(data => gameDataTemp.push(data[0]))
                .catch(err => console.log(err))
            }
            for (let i = 0; i < 4; i++) {
                await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].playoffTeams[seasonData[0].postSeasonSchedule[seasonData[0].seasonDay-45][i]])
                .then(res => res.json())
                .then(data => gameDataTemp.push(data[0]))
                .catch(err => console.log(err))
            }
            for (let i = 0; i < 4; i++) {
                await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].playoffTeams[seasonData[0].postSeasonSchedule[seasonData[0].seasonDay-44][i]])
                .then(res => res.json())
                .then(data => gameDataTemp.push(data[0]))
                .catch(err => console.log(err))
            }
        } else {
            for (let i = 0; i < 12; i++) {
                await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay-1][i]])
                .then(res => res.json())
                .then(data => gameDataTemp.push(data[0]))
                .catch(err => console.log(err))
            }
            if (seasonData[0].seasonDay < 45) {
                for (let i = 0; i < 12; i++) {
                    await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay][i]])
                    .then(res => res.json())
                    .then(data => gameDataTemp.push(data[0]))
                    .catch(err => console.log(err))
                }
            }
            if (seasonData[0].seasonDay+1 < 45) {
                for (let i = 0; i < 12; i++) {
                    await fetch('https://daseballapi.adaptable.app/team/'+seasonData[0].teamLayout[seasonData[0].schedule[seasonData[0].seasonDay+1][i]])
                    .then(res => res.json())
                    .then(data => gameDataTemp.push(data[0]))
                    .catch(err => console.log(err))
                }
            }
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
        if (seasonData[0].seasonDay >= 46) {
            for (let i = 0; i < 4; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay)) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 4; i < 8; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay+1)) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            for (let i = 8; i < 12; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[Math.floor((seasonData[0].seasonDay+2)) % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
        } else {
            for (let i = 0; i < 12; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[seasonData[0].seasonDay-1 % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }
            if (seasonData[0].seasonDay < 45) {
            for (let i = 12; i < 24; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[seasonData[0].seasonDay % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }}
            if (seasonData[0].seasonDay+1 < 45) {
            for (let i = 24; i < 36; i++) {
                await fetch('https://daseballapi.adaptable.app/playerbyid/'+gameDataFull[i].pitchingRotation[seasonData[0].seasonDay+1 % 3])
                .then(res => res.json())
                .then(data => pitcherDataTemp.push(data[0].name))
                .catch(err => console.log(err))
            }}
        }
        console.log(pitcherDataTemp)
        setpitcherData(pitcherDataTemp)
        setpitcherLoaded(true)
        await delay(2500);
        setpitcherLoading(false)
        setpitcherLoaded(false)
    }

    const Schedule = () => {
        let dayOneSched = []
        let dayTwoSched = []
        let dayThreeSched = []
        if (gameDataFull.length > 0 && pitcherData.length > 0 && seasonData != null) {
            for (let gn = 0; gn < 12; gn += 2) {
                dayOneSched.push(
                <div className='game-panel'>
                    <h2><span style={{color: "#"+gameDataFull[gn].teamColor}}>{gameDataFull[gn].teamEmoji}{gameDataFull[gn].teamName}</span> <br/>
                    VS <br/>
                    <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{gameDataFull[gn+1].teamEmoji}{gameDataFull[gn+1].teamName}</span></h2>
                    <h2>
                    {seasonData[0].seasonDay >= 41 ?
                    <div>
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    : 
                    <div>
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    }
                    
                    <span style={{color: "#"+gameDataFull[gn].teamColor}}>{Math.round((gameDataFull[gn].gamesWon/(gameDataFull[gn].gamesWon+gameDataFull[gn+1].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{Math.round((gameDataFull[gn+1].gamesWon/(gameDataFull[gn+1].gamesWon+gameDataFull[gn].gamesWon))*100)}%</span></h2>
                    <h2>{gameDataFull[gn].teamEmoji}{pitcherData[gn]} <br/> 
                    VS <br/> {gameDataFull[gn+1].teamEmoji}{pitcherData[gn+1]}</h2>
                </div>
                )
            }
            for (let gn = 12; gn < 24; gn += 2) {
                dayTwoSched.push(
                <div className='game-panel'>
                    <h2><span style={{color: "#"+gameDataFull[gn].teamColor}}>{gameDataFull[gn].teamEmoji}{gameDataFull[gn].teamName}</span> <br/>
                    VS <br/>
                    <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{gameDataFull[gn+1].teamEmoji}{gameDataFull[gn+1].teamName}</span></h2>
                    <h2>
                    {seasonData[0].seasonDay >= 41 ?
                    <div>
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    : 
                    <div>
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    }
                    
                    <span style={{color: "#"+gameDataFull[gn].teamColor}}>{Math.round((gameDataFull[gn].gamesWon/(gameDataFull[gn].gamesWon+gameDataFull[gn+1].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{Math.round((gameDataFull[gn+1].gamesWon/(gameDataFull[gn+1].gamesWon+gameDataFull[gn].gamesWon))*100)}%</span></h2>
                    <h2>{gameDataFull[gn].teamEmoji}{pitcherData[gn]} <br/> 
                    VS <br/> {gameDataFull[gn+1].teamEmoji}{pitcherData[gn+1]}</h2>
                </div>
                )
            }
            for (let gn = 24; gn < 36; gn += 2) {
                dayThreeSched.push(
                <div className='game-panel'>
                    <h2><span style={{color: "#"+gameDataFull[gn].teamColor}}>{gameDataFull[gn].teamEmoji}{gameDataFull[gn].teamName}</span> <br/>
                    VS <br/>
                    <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{gameDataFull[gn+1].teamEmoji}{gameDataFull[gn+1].teamName}</span></h2>
                    <h2>
                    {seasonData[0].seasonDay >= 41 ?
                    <div>
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    : 
                    <div>
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" class="weather" title="Coffee" alt='Coffee'></img> : ''}
                    </div>
                    }
                    
                    <span style={{color: "#"+gameDataFull[gn].teamColor}}>{Math.round((gameDataFull[gn].gamesWon/(gameDataFull[gn].gamesWon+gameDataFull[gn+1].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[gn+1].teamColor}}>{Math.round((gameDataFull[gn+1].gamesWon/(gameDataFull[gn+1].gamesWon+gameDataFull[gn].gamesWon))*100)}%</span></h2>
                    <h2>{gameDataFull[gn].teamEmoji}{pitcherData[gn]} <br/> 
                    VS <br/> {gameDataFull[gn+1].teamEmoji}{pitcherData[gn+1]}</h2>
                </div>
                )
            }
        }
        return (
            <div className='player'>
                {
                    gameDataFull.length > 0 && pitcherData.length > 0 && seasonData != null ?
                    <div className="player center">
                        <h2>Day {seasonData[0].seasonDay}</h2>
                        <div className='game-holder'>
                            
                            <div>{dayOneSched}</div>
                            
                        </div>
                        
                        {seasonData[0].seasonDay >= 41 && gameDataFull.length > 4 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+1}</h2>
                            <div className='game-holder'>
                                <div className='game-panel'>
                                    <h2><span style={{color: "#"+gameDataFull[4].teamColor}}>{gameDataFull[4].teamEmoji}{gameDataFull[4].teamName}</span> <br/>
                                    VS <br/>
                                    <span style={{color: "#"+gameDataFull[5].teamColor}}>{gameDataFull[5].teamEmoji}{gameDataFull[5].teamName}</span></h2>
                                    <h2>
                                    <div>
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                                    </div>
                                    <span style={{color: "#"+gameDataFull[4].teamColor}}> {Math.round((gameDataFull[4].gamesWon/(gameDataFull[4].gamesWon+gameDataFull[5].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[5].teamColor}}>{Math.round((gameDataFull[5].gamesWon/(gameDataFull[5].gamesWon+gameDataFull[4].gamesWon))*100)}%</span></h2>
                                    <h2>{gameDataFull[4].teamEmoji}{pitcherData[4]} <br/> 
                                    VS <br/> {gameDataFull[5].teamEmoji}{pitcherData[5]}</h2>
                                </div>
                                <div className='game-panel'>
                                    <h2><span style={{color: "#"+gameDataFull[6].teamColor}}>{gameDataFull[6].teamEmoji}{gameDataFull[6].teamName}</span> <br/>
                                    VS <br/>
                                    <span style={{color: "#"+gameDataFull[7].teamColor}}>{gameDataFull[7].teamEmoji}{gameDataFull[7].teamName}</span></h2>
                                    <h2>
                                    <div>
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-40][1] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                                    </div>
                                    <span style={{color: "#"+gameDataFull[6].teamColor}}> {Math.round((gameDataFull[6].gamesWon/(gameDataFull[6].gamesWon+gameDataFull[7].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[7].teamColor}}>{Math.round((gameDataFull[7].gamesWon/(gameDataFull[7].gamesWon+gameDataFull[6].gamesWon))*100)}%</span></h2>
                                    <h2>{gameDataFull[6].teamEmoji}{pitcherData[6]} <br/> 
                                    VS <br/> {gameDataFull[7].teamEmoji}{pitcherData[7]}</h2>
                                </div>
                            </div>
                        </div> : <></>}
                        
                        { seasonData[0].seasonDay <= 39 &&  gameDataFull.length > 6 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+1}</h2>
                            <div className='game-holder'>
                            
                                <div>{dayTwoSched}</div>

                            </div>
                        </div> :
                        <>
                        </>
                        }

                        {seasonData[0].seasonDay >= 41 && gameDataFull.length > 8 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+2}</h2>
                            <div className='game-holder'>
                                <div className='game-panel'>
                                    <h2><span style={{color: "#"+gameDataFull[8].teamColor}}>{gameDataFull[8].teamEmoji}{gameDataFull[8].teamName}</span> <br/>
                                    VS <br/>
                                    <span style={{color: "#"+gameDataFull[9].teamColor}}>{gameDataFull[9].teamEmoji}{gameDataFull[9].teamName}</span></h2>
                                    <h2>
                                    <div>
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                                    </div>
                                    <span style={{color: "#"+gameDataFull[8].teamColor}}> {Math.round((gameDataFull[8].gamesWon/(gameDataFull[8].gamesWon+gameDataFull[9].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[9].teamColor}}>{Math.round((gameDataFull[9].gamesWon/(gameDataFull[9].gamesWon+gameDataFull[8].gamesWon))*100)}%</span></h2>
                                    <h2>{gameDataFull[8].teamEmoji}{pitcherData[8]} <br/> 
                                    VS <br/> {gameDataFull[9].teamEmoji}{pitcherData[9]}</h2>
                                </div>
                                <div className='game-panel'>
                                    <h2><span style={{color: "#"+gameDataFull[10].teamColor}}>{gameDataFull[10].teamEmoji}{gameDataFull[10].teamName}</span> <br/>
                                    VS <br/>
                                    <span style={{color: "#"+gameDataFull[11].teamColor}}>{gameDataFull[11].teamEmoji}{gameDataFull[11].teamName}</span></h2>
                                    <h2>
                                    <div>
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" class="weather" title="Null" alt='Null'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" class="weather" title="Sunny" alt='Sunny'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-39][1] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" class="weather" title="Waves" alt='Waves'></img> : ''}
                                    </div>
                                    <span style={{color: "#"+gameDataFull[10].teamColor}}> {Math.round((gameDataFull[10].gamesWon/(gameDataFull[10].gamesWon+gameDataFull[11].gamesWon))*100)}%</span> - <span style={{color: "#"+gameDataFull[11].teamColor}}>{Math.round((gameDataFull[11].gamesWon/(gameDataFull[11].gamesWon+gameDataFull[10].gamesWon))*100)}%</span></h2>
                                    <h2>{gameDataFull[10].teamEmoji}{pitcherData[10]} <br/> 
                                    VS <br/> {gameDataFull[11].teamEmoji}{pitcherData[11]}</h2>
                                </div>
                            </div>
                        </div> : <></>
                        }

                        { seasonData[0].seasonDay <= 38 && gameDataFull.length > 12 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+2}</h2>
                            <div className='game-holder'>
                            
                                <div>{dayThreeSched}</div>

                            </div>
                        </div> :
                        <>
                        </>
                        }
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