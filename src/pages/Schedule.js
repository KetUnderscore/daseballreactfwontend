import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
const { currentActiveSeason, connectString } = require('../config.json')

function Schedule() {
    const params = useParams()
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const [seasonData, setSeasonData] = useState(null)
    const [seasonLoaded, setSeasonLoaded] = useState(false)
    const [gameDataFull, setgameDataFull] = useState([])
    const [daysLoaded, setDaysLoaded] = useState(false)
    
    const [dayOneSched, setDayOneSched] = useState([])
    const [dayTwoSched, setDayTwoSched] = useState([])
    const [dayThreeSched, setDayThreeSched] = useState([])

    const [betVal, setBetVal] = useState(null)
    const [teamVal, setTeamVal] = useState("")

    useEffect( () => {
        fetchGameData()
        console.log(seasonData)
    })

    const fetchGameData = async () => {
        if (!seasonLoaded) {fetchSeason()}
        if (seasonLoaded && seasonData != null && dayOneSched.length < 1) {loadDays()}
    }

    const fetchSeason = async () => {
        await fetch(connectString + 'seasonSchedule')
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
        await delay(10000);
        setSeasonLoaded(false)
    }
     
    const inputHandler = (x) => {
        if (x !== betVal) {
            setBetVal(parseInt(x))
            setSeasonLoaded(false)
        }
    };

    const handleClick = (team, day, num) => {
        setTeamVal(team)
        console.log(betVal)
        alert(`${betVal} ${team} ${day} ${num}`)
    }

    const loadDays = async () => {
        if (seasonData != null) {
            setDaysLoaded(true)
            let teamLength = 12
            let teamSlotA = 0
            let teamSlotB = 0
            if (seasonData[0].seasonDay >= 45) {if (seasonData[0].scheduleTeamInfo[seasonData[0].seasonDay-45].length == 2) {teamLength = 2} else {teamLength = 4}}
            for (let gn = 0; gn < teamLength; gn += 2) {
                let team1 = seasonData[0].scheduleTeamInfo[0][gn-teamSlotA]
                let team2 = seasonData[0].scheduleTeamInfo[0][gn+1-teamSlotB]
                setDayOneSched(dayOneSched => [...dayOneSched, 
                <div className='game-panel' key={gn}>
                    <h2><span>{team1.teamEmoji}<a style={{color: "#"+team1.teamColor}} href={'/team/'+team1.teamName}>{team1.teamName}</a></span> <br/>
                    <a style={{color: "#"+team1.teamColor}} href={'/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                    VS <br/>
                    <span>{team2.teamEmoji}<a style={{color: "#"+team2.teamColor}} href={'/team/'+team2.teamName}>{team2.teamName}</a></span><br/>
                    <a style={{color: "#"+team2.teamColor}} href={'/player/'+team2.players.name}>{team2.players.name}</a><br/></h2>
                    <h2>
                    {seasonData[0].seasonDay >= 45 ?
                    <div>
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0+(gn/2)] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                    </div>
                    : 
                    <div>
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay][0+(gn/2)] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                    </div>
                    }
                        
                    <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span>
                    <br/>
                    <form>
                        <button type="submit" onClick={() => {handleClick(team1.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team1.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team1.teamEmoji}</button>{" "}
                        <button type="submit" onClick={() => {handleClick(team2.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team2.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team2.teamEmoji}</button>
                    </form>
                    </h2>
                </div>
                ])
            }
            if (seasonData[0].scheduleTeamInfo.length > 1) {
                let teamLength = 12
                let teamSlotA = 0
                let teamSlotB = 0
                if (seasonData[0].seasonDay >= 45) {
                    if (seasonData[0].scheduleTeamInfo[seasonData[0].seasonDay-44].length == 2) {teamLength = 2} else {teamLength = 4}
                    teamSlotA = 0
                    teamSlotB = 0
                }
                for (let gn = 0; gn < teamLength; gn += 2) {
                    let team1 = seasonData[0].scheduleTeamInfo[1][gn-teamSlotA]
                    let team2 = seasonData[0].scheduleTeamInfo[1][gn+1-teamSlotB]
                    setDayTwoSched(dayTwoSched => [...dayTwoSched, (
                    <div className='game-panel'>
                        <h2><span>{team1.teamEmoji}<a style={{color: "#"+team1.teamColor}} href={'/team/'+team1.teamName}>{team1.teamName}</a></span> <br/>
                        <a style={{color: "#"+team1.teamColor}} href={'/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                        VS <br/>
                        <span>{team2.teamEmoji}<a style={{color: "#"+team2.teamColor}} href={'/team/'+team2.teamName}>{team2.teamName}</a></span><br/>
                        <a style={{color: "#"+team2.teamColor}} href={'/player/'+team2.players.name}>{team2.players.name}</a><br/></h2>
                        <h2>
                        {seasonData[0].seasonDay >= 45 ?
                        <div>
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        : 
                        <div>
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        }
                        
                        <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span>
                        <br/>
                        <button style={{backgroundColor: "#"+team1.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team1.teamEmoji}</button>{" "}
                        <button style={{backgroundColor: "#"+team2.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team2.teamEmoji}</button></h2>
                    </div>
                    )])
                }
            }
            if (seasonData[0].scheduleTeamInfo.length > 2) {
                let teamLength = 12
                let teamSlotA = 0
                let teamSlotB = 0
                if (seasonData[0].seasonDay >= 45) {
                    if (seasonData[0].scheduleTeamInfo[seasonData[0].seasonDay-43].length == 2) {teamLength = 2} else {teamLength = 4}
                    teamSlotA = 0
                    teamSlotB = 0
                }
                for (let gn = 0; gn < teamLength; gn += 2) {
                    let team1 = seasonData[0].scheduleTeamInfo[2][gn-teamSlotA]
                    let team2 = seasonData[0].scheduleTeamInfo[2][gn+1-teamSlotB]
                    setDayThreeSched(dayThreeSched => [...dayThreeSched, (
                    <div className='game-panel'>
                        <h2><span>{team1.teamEmoji}<a style={{color: "#"+team1.teamColor}} href={'/team/'+team1.teamName}>{team1.teamName}</a></span> <br/>
                        <a style={{color: "#"+team1.teamColor}} href={'/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                        VS <br/>
                        <span>{team2.teamEmoji}<a style={{color: "#"+team2.teamColor}} href={'/team/'+team2.teamName}>{team2.teamName}</a></span><br/>
                        <a style={{color: "#"+team2.teamColor}} href={'/player/'+team2.players.name}>{team2.players.name}</a><br/></h2>
                        <h2>
                        {seasonData[0].seasonDay >= 45 ?
                        <div>
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-43][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        : 
                        <div>
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+2][0+((gn)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        }
                        
                        <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span>
                        <br/>
                        <button style={{backgroundColor: "#"+team1.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team1.teamEmoji}</button>{" "}
                        <button style={{backgroundColor: "#"+team2.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team2.teamEmoji}</button></h2>
                    </div>
                    )])
                }
            }
            setDaysLoaded(true)
        }
    }

    const Schedule = () => {
        return (
            <div className='player'>
                {
                    seasonData != null && daysLoaded ?
                    <div className="player center">
                        <h1>Season {currentActiveSeason} Schedule</h1>
                        <h1 style={{color: "red"}}>BETTING NOT WORKING SORRY</h1>
                        <form>
                            <input type="text" name="name"
                            value={betVal}
                            onChange={(e) => inputHandler(e.target.value)} placeholder='Bet Value' />
                        </form>
                        { dayOneSched.length > 0 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+1}</h2>
                            <div className='game-holder'>

                                {dayOneSched.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))}
                                
                            </div>
                        </div> :
                        <></>
                        }
                        { dayTwoSched.length > 1 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+2}</h2>
                            <div className='game-holder'>
                                
                                {dayTwoSched.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))}
                                
                            </div>
                        </div> :
                        <></>
                        }
                        { dayThreeSched.length > 1 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay+3}</h2>
                            <div className='game-holder'>
                                
                                {dayThreeSched.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))}
                                
                            </div>
                        </div> :
                        <></>
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