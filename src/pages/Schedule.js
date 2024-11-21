import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const { currentActiveSeason } = require('../config.json')

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

    useEffect( () => {
        fetchGameData()
    })

    const fetchGameData = async () => {
        if (!seasonLoaded) {fetchSeason()}
        if (seasonLoaded && seasonData != null && dayOneSched.length < 1) {loadDays()}
    }

    const fetchSeason = async () => {
        await fetch('https://daseballapi.adaptable.app/seasonSchedule/'+currentActiveSeason)
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
        await delay(3000);
        setSeasonLoaded(false)
    }

    const loadDays = async () => {
        if (seasonData != null) {
            setDaysLoaded(true)
            for (let gn = 0; gn < 12; gn += 2) {
                let team1 = seasonData[0].scheduleTeamInfo[0][gn]
                let team2 = seasonData[0].scheduleTeamInfo[0][gn+1]
                setDayOneSched(dayOneSched => [...dayOneSched, 
                <div className='game-panel' key={gn}>
                    <h2><span style={{color: "#"+team1.teamColor}}>{team1.teamEmoji}{team1.teamName}</span> <br/>
                    VS <br/>
                    <span style={{color: "#"+team2.teamColor}}>{team2.teamEmoji}{team2.teamName}</span></h2>
                    <h2>
                    {seasonData[0].seasonDay >= 46 ?
                    <div>
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-46][0] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                    </div>
                    : 
                    <div>
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        { seasonData[0].weather[seasonData[0].seasonDay-1][0+(gn/2)] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                    </div>
                    }
                    
                    <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span></h2>
                    <h2>{team1.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                        VS <br/> {team2.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team2.players.name}>{team2.players.name}</a></h2>
                </div>
                ])
            }
            if (seasonData[0].scheduleTeamInfo.length > 1) {
                for (let gn = 12; gn < 24; gn += 2) {
                    let team1 = seasonData[0].scheduleTeamInfo[1][gn-12]
                    let team2 = seasonData[0].scheduleTeamInfo[1][gn-11]
                    setDayTwoSched(dayTwoSched => [...dayTwoSched, (
                    <div className='game-panel'>
                        <h2><span style={{color: "#"+team1.teamColor}}>{team1.teamEmoji}{team1.teamName}</span> <br/>
                        VS <br/>
                        <span style={{color: "#"+team2.teamColor}}>{team2.teamEmoji}{team2.teamName}</span></h2>
                        <h2>
                        {seasonData[0].seasonDay >= 41 ?
                        <div>
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-45][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        : 
                        <div>
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay][0+((gn-12)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        }
                        
                        <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span></h2>
                        <h2>{team1.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                        VS <br/> {team2.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team2.players.name}>{team2.players.name}</a></h2>
                    </div>
                    )])
                }
            }
            if (seasonData[0].scheduleTeamInfo.length > 2) {
                for (let gn = 24; gn < 36; gn += 2) {
                    let team1 = seasonData[0].scheduleTeamInfo[2][gn-24]
                    let team2 = seasonData[0].scheduleTeamInfo[2][gn-23]
                    setDayThreeSched(dayThreeSched => [...dayThreeSched, (
                    <div className='game-panel'>
                        <h2><span style={{color: "#"+team1.teamColor}}>{team1.teamEmoji}{team1.teamName}</span> <br/>
                        VS <br/>
                        <span style={{color: "#"+team2.teamColor}}>{team2.teamEmoji}{team2.teamName}</span></h2>
                        <h2>
                        {seasonData[0].seasonDay >= 41 ?
                        <div>
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].postSeasonWeather[seasonData[0].seasonDay-44][0] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        : 
                        <div>
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="20px" className="weather" title="WITNESS" alt='WITNESS'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                            { seasonData[0].weather[seasonData[0].seasonDay+1][0+((gn-24)/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                        </div>
                        }
                        
                        <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players.praying+team1.players.publicity+team1.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players.praying+team2.players.publicity+team2.players.pope)/((team1.players.praying+team1.players.publicity+team1.players.pope)+(team2.players.praying+team2.players.publicity+team2.players.pope)))*20)}%</span></h2>
                        <h2>{team1.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team1.players.name}>{team1.players.name}</a> <br/> 
                        VS <br/> {team2.teamEmoji}<a href={'https://daseball.netlify.app/player/'+team2.players.name}>{team2.players.name}</a></h2>
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
                        { dayOneSched.length > 0 ?
                        <div>
                            <h2>Day {seasonData[0].seasonDay}</h2>
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
                            <h2>Day {seasonData[0].seasonDay+1}</h2>
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
                            <h2>Day {seasonData[0].seasonDay+2}</h2>
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