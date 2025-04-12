import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie';
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

    const [betVal, setBetVal] = useState(10)
    const [teamVal, setTeamVal] = useState("")

    let userData = Cookies.get("userInfo")
    if (userData?.length > 0) {
        userData = JSON.parse(userData)
    }

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
        if (!x) {
            setBetVal(0)
            setSeasonLoaded(false)
            return
        }
        if (x != betVal) {
            setBetVal(x.target.value)
            setSeasonLoaded(false)
            return
        }
    };

    const handleClick = async (team, day, num) => {
        console.log(betVal)

        if (!userData) {
            console.log("Not signed in!")
            return
        } else {
            const response = await fetch(connectString + 'fav/bet', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                withCredntials: true,
                credentials: 'include',
                body: JSON.stringify({
                    username: userData.username,
                    betValue: betVal,
                    teamBet: team,
                    dayBet: day,
                    dayNum: num,
                }),
            });
            // Reset States
            console.log(response)
            console.log("Bet sent!")
        }
    }

    const loadDays = async () => {
        if (seasonData[0] != null && seasonData[0] != undefined && seasonData[0] != [] && seasonData[0].scheduleTeamInfo.length > 0) {
            setDaysLoaded(true)
            let teamLength = 12
            let teamSlotA = 0
            let teamSlotB = 0
            if (seasonData[0].seasonDay < 45) {
                for (let daysLeft = seasonData[0].seasonDay; daysLeft < seasonData[0].schedule.length; daysLeft++) {
                    for (let gn = 0; gn < teamLength; gn += 2) {
                        let team1 = seasonData[0].scheduleTeamInfo[seasonData[0].schedule[daysLeft][gn]]
                        let team2 = seasonData[0].scheduleTeamInfo[seasonData[0].schedule[daysLeft][gn+1]]
                        setDayOneSched(dayOneSched => [...dayOneSched, 
                            <div className='game-panel' key={gn}>
                            <h2>Day {daysLeft+1}</h2>
                            <h2><span>{team1.teamEmoji}<a style={{color: "#"+team1.teamColor}} href={'/team/'+team1.teamName}>{team1.teamName}</a></span> <br/>
                            <a style={{color: "#"+team1.teamColor}} href={'/player/'+team1.players[daysLeft%team1.players.length].name}>{team1.players[daysLeft%team1.players.length].name}</a> <br/> 
                            VS <br/>
                            <span>{team2.teamEmoji}<a style={{color: "#"+team2.teamColor}} href={'/team/'+team2.teamName}>{team2.teamName}</a></span><br/>
                            <a style={{color: "#"+team2.teamColor}} href={'/player/'+team2.players[daysLeft%team2.players.length].name}>{team2.players[daysLeft%team2.players.length].name}</a><br/></h2>
                            <h2>
                            <div>
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                                { seasonData[0].weather[daysLeft][0+(gn/2)] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                            </div>
                                
                            <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players[daysLeft%team1.players.length].praying+team1.players[daysLeft%team1.players.length].publicity+team1.players[daysLeft%team1.players.length].pope)/((team1.players[daysLeft%team1.players.length].praying+team1.players[daysLeft%team1.players.length].publicity+team1.players[daysLeft%team1.players.length].pope)+(team2.players[daysLeft%team2.players.length].praying+team2.players[daysLeft%team2.players.length].publicity+team2.players[daysLeft%team2.players.length].pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players[daysLeft%team2.players.length].praying+team2.players[daysLeft%team2.players.length].publicity+team2.players[daysLeft%team2.players.length].pope)/((team1.players[daysLeft%team1.players.length].praying+team1.players[daysLeft%team1.players.length].publicity+team1.players[daysLeft%team1.players.length].pope)+(team2.players[daysLeft%team2.players.length].praying+team2.players[daysLeft%team2.players.length].publicity+team2.players[daysLeft%team2.players.length].pope)))*20)}%</span>
                            <br/>
                            <form>
                                <button type="button" onClick={() => {handleClick(team1.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team1.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team1.teamEmoji}</button>{" "}
                                <button type="button" onClick={() => {handleClick(team2.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team2.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team2.teamEmoji}</button>
                            </form>
                            </h2>
                            </div>
                        ])
                    }
                }
            }
            if (seasonData[0].seasonDay >= 45) {
                for (let daysLeft = seasonData[0].seasonDay-45; daysLeft < seasonData[0].postSeasonSchedule.length; daysLeft++) {
                    if (daysLeft >= 45) {if (seasonData[0].postSeasonSchedule[seasonData[0].daysLeft].length == 2) {teamLength = 2} else {teamLength = 4}}
                    for (let gn = 0; gn < seasonData[0].postSeasonSchedule[daysLeft].length; gn += 2) {
                        let team1 = seasonData[0].scheduleTeamInfo[seasonData[0].postSeasonSchedule[daysLeft][gn]]
                        let team2 = seasonData[0].scheduleTeamInfo[seasonData[0].postSeasonSchedule[daysLeft][gn+1]]
                        setDayOneSched(dayOneSched => [...dayOneSched, 
                            <div className='game-panel' key={gn}>
                            <h2>Postseason Day {daysLeft+46}</h2>
                            <h2><span>{team1.teamEmoji}<a style={{color: "#"+team1.teamColor}} href={'/team/'+team1.teamName}>{team1.teamName}</a></span> <br/>
                            <a style={{color: "#"+team1.teamColor}} href={'/player/'+team1.players[(daysLeft+45)%team1.players.length].name}>{team1.players[(daysLeft+45)%team1.players.length].name}</a> <br/> 
                            VS <br/>
                            <span>{team2.teamEmoji}<a style={{color: "#"+team2.teamColor}} href={'/team/'+team2.teamName}>{team2.teamName}</a></span><br/>
                            <a style={{color: "#"+team2.teamColor}} href={'/player/'+team2.players[(daysLeft+45)%team2.players.length].name}>{team2.players[(daysLeft+45)%team2.players.length].name}</a><br/></h2>
                            <h2>
                            <div>
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="20px" className="weather" title="Null" alt='Null'></img> : ''}
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="20px" className="weather" title="Sunny" alt='Sunny'></img> : ''}
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="20px" className="weather" title="Shuffle" alt='Shuffle'></img> : ''}
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="20px" className="weather" title="Waves" alt='Waves'></img> : ''}
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="20px" className="weather" title="Coffee" alt='Coffee'></img> : ''}
                                { seasonData[0].postSeasonWeather[daysLeft][0+(gn/2)] === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="20px" className="weather" title="Skipping" alt='Skipping'></img> : ''}
                            </div>
                                
                            <span style={{color: "#"+team1.teamColor}}>{Math.round((team1.gamesWon/(team1.gamesWon+team2.gamesWon))*80)+Math.round(((team1.players[(daysLeft+45)%team1.players.length].praying+team1.players[(daysLeft+45)%team1.players.length].publicity+team1.players[(daysLeft+45)%team1.players.length].pope)/((team1.players[(daysLeft+45)%team1.players.length].praying+team1.players[(daysLeft+45)%team1.players.length].publicity+team1.players[(daysLeft+45)%team1.players.length].pope)+(team2.players[(daysLeft+45)%team2.players.length].praying+team2.players[(daysLeft+45)%team2.players.length].publicity+team2.players[(daysLeft+45)%team2.players.length].pope)))*20)}%</span> - <span style={{color: "#"+team2.teamColor}}>{Math.round((team2.gamesWon/(team2.gamesWon+team1.gamesWon))*80)+Math.round(((team2.players[(daysLeft+45)%team2.players.length].praying+team2.players[(daysLeft+45)%team2.players.length].publicity+team2.players[(daysLeft+45)%team2.players.length].pope)/((team1.players[(daysLeft+45)%team1.players.length].praying+team1.players[(daysLeft+45)%team1.players.length].publicity+team1.players[(daysLeft+45)%team1.players.length].pope)+(team2.players[(daysLeft+45)%team2.players.length].praying+team2.players[(daysLeft+45)%team2.players.length].publicity+team2.players[(daysLeft+45)%team2.players.length].pope)))*20)}%</span>
                            <br/>
                            <form>
                                <button type="button" onClick={() => {handleClick(team1.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team1.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team1.teamEmoji}</button>{" "}
                                <button type="button" onClick={() => {handleClick(team2.teamName, seasonData[0].seasonDay+1, gn/2)}} style={{backgroundColor: "#"+team2.teamColor, border: "none", width: "80px", height: "25px", borderRadius: "25px"}}>Bet {team2.teamEmoji}</button>
                            </form>
                            </h2>
                            </div>
                        ])
                    }
                }
            }
            setDaysLoaded(true)
        }
    }

    return (
        <div className='player center'>
            <h1>Season {currentActiveSeason} Schedule</h1>
            <h1 style={{color: "red"}}>BETTING NOT WORKING SORRY</h1>
            <form>
                <input type="text" name="name"
                value={betVal}
                onChange={(e) => inputHandler(e.target.value)} placeholder='Bet Value' />
            </form>
            {
                seasonData != null && daysLoaded ?
                <div className="player center">
                    { dayOneSched.length > 0 ?
                    <div>
                        <div className='game-holder'>
                            {dayOneSched.map((item, index) => (
                                
                                <div>
                                <div key={index}>
                                    {item}
                                </div>
                                {index%6 === 0 ? <br/> : <></>}
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

export default Schedule