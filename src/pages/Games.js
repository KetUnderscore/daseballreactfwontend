import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const { currentActiveSeason } = require('../config.json')

function Games() {
    const params = useParams()

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [seasonData, setSeasonData] = useState(null)
    const [seasonLoaded, setSeasonLoaded] = useState(false)
    const [gameData, setgameData] = useState([])
    const [gameLoaded, setgameLoaded] = useState(false)
    const [gameLoading, setgameLoading] = useState(false)

    useEffect( () => {
        fetchGameData()
    })

    const fetchGameData = async () => {
        if (!seasonLoaded) {fetchSeason()}
        if (seasonData != null && seasonLoaded && !gameLoaded && !gameLoading) {fetchGamesData()}
    }

    const fetchSeason = async () => {
        await fetch('https://daseballapi.adaptable.app/season/'+currentActiveSeason)
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
        await delay(3500);
        setSeasonLoaded(false)
    }

    const fetchGamesData = async () => {
        setgameLoading(true)
        await fetch('https://daseballapi.adaptable.app/games/'+seasonData[0].seasonNumber+'/'+seasonData[0].seasonDay)
        .then(res => res.json())
        .then(data => setgameData(data))
        .catch(err => console.log(err))
        setgameLoaded(true)
        await delay(3500);
        setgameLoading(false)
        setgameLoaded(false)
    }

    const Games = () => {
        return (
            <div className='player'>
                {
                    gameData != null && seasonData != null ?
                    <div className="player">
                        <div>
                            <h2>Season {seasonData[0].seasonNumber}</h2>
                            <h3 className='center'>Day {seasonData[0].seasonDay} Games</h3>
                            {
                                gameData ?
                                gameData?.map( (item) => {
                                    return (
                                        <div className='game-holder'>
                                            <div className='game-panel'>
                                                <h3 className='center'>Day {item.gameDay} Game {item.gameNumber}</h3>
                                                <h3 className='split-para-old'>
                                                    {
                                                        item.weather === 0 ? <img src="https://i.imgur.com/yvlrdat.png" height="30px" class="weather" title="Null" alt='Null'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 0 ? <img src="https://i.imgur.com/sfWGuST.png" height="30px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 1 ? <img src="https://i.imgur.com/MX8RFc4.png" height="30px" class="weather" title="Sunny" alt='Sunny'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 1 ? <img src="https://i.imgur.com/sfWGuST.png" height="30px" class="weather" title="WITNESS" alt='WITNESS'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 2 ? <img src="https://i.imgur.com/K3DWIqZ.png" height="30px" class="weather" title="Shuffle" alt='Shuffle'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 3 ? <img src="https://i.imgur.com/YDH7LQT.png" height="30px" class="weather" title="Waves" alt='Waves'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 4 ? <img src="https://i.imgur.com/FfuBnBD.png" height="30px" class="weather" title="Coffee" alt='Coffee'></img> : ''
                                                    }
                                                    {
                                                        item.weather === 5 ? <img src="https://i.imgur.com/NBMbLYO.png" height="30px" class="weather" title="Skipping" alt='Skipping'></img> : ''
                                                    }
                                                    {
                                                        (item.homeScore > item.awayScore && item.inningNumber > 8 && item.topOfInning === false) ? <img src="https://i.imgur.com/PVobD6N.png" height="30px" class="shame" title="Shame" alt='Shame'></img> : ''
                                                    }
                                                    {
                                                        (item.topOfInning) ?
                                                        <span>🔺 of {item.inningNumber}</span>
                                                        :
                                                        <span>🔻 of {item.inningNumber}</span>
                                                    }
                                                </h3>
                                                <h3 className='split-para-old' style={{color: "#"+item.homeTeam.teamColor}}>{item.homeTeam.teamEmoji}{item.homeTeam.teamName} <span style={{color: 'white'}}>{item.homeScore}</span></h3>
                                                <h3 className='split-para-old' style={{color: "#"+item.awayTeam.teamColor}}>{item.awayTeam.teamEmoji}{item.awayTeam.teamName} <span style={{color: 'white'}}>{item.awayScore}</span></h3>
                                            </div>
                                            <div className='game-panel'>
                                                <div className='inline'>
                                                    {
                                                        (item.baseThree === true) ?
                                                            <img className="base-three" src="https://i.imgur.com/Jo55R5U.png" height="50px" title='Thirdbase' alt='Thirdbase'></img>
                                                            : 
                                                            <img className="base-three" src="https://i.imgur.com/C4kBgYH.png" height="50px" alt='Thirdbase'></img>
                                                    }
                                                    {
                                                        (item.baseTwo === true) ?
                                                            <img className="base-two" src="https://i.imgur.com/Jo55R5U.png" height="50px" title='Secondbase' alt='Secondbase'></img>
                                                            : 
                                                            <img className="base-two" src="https://i.imgur.com/C4kBgYH.png" height="50px" alt='Secondbase'></img>
                                                    }
                                                    {
                                                        (item.baseOne === true) ?
                                                            <img className="base-one" src="https://i.imgur.com/Jo55R5U.png" height="50px" title='Firstbase' alt='Firstbase'></img>
                                                            : 
                                                            <img className="base-one" src="https://i.imgur.com/C4kBgYH.png" height="50px" alt='Firstbase'></img>
                                                    }
                                                </div>
                                                <div className="right">
                                                    <p>Balls : {'🟠'.repeat(item.currentBalls) + '🔵'.repeat(Math.max(0,(item.ballsNeeded - item.currentBalls)))}</p>
                                                    <p>Strikes : {'🟠'.repeat(item.currentStrikes) + '🔵'.repeat(Math.max(0,(3 - item.currentStrikes)))}</p>
                                                    <p>Outs : {'🟠'.repeat(item.currentOuts) + '🔵'.repeat(Math.max(0,(3 - item.currentOuts)))}</p>
                                                </div>
                                                <p className='split-para-old'>Pitcher <span>{item.currentPitcher.teamEmoji}<a style={item.topOfInning ? {color: "#"+item.homeTeam.teamColor} : {color: "#"+item.awayTeam.teamColor}} href={'http://daseball.netlify.app/player/'+item.currentPitcher.name}>{item.currentPitcher.name}</a></span></p>
                                                <p className='split-para-old'>Batter <span>{item.currentBatter.teamEmoji}<a style={item.topOfInning ? {color: "#"+item.awayTeam.teamColor} : {color: "#"+item.homeTeam.teamColor}} href={'http://daseball.netlify.app/player/'+item.currentBatter.name}>{item.currentBatter.name}</a></span></p>
                                            </div>
                                            <div className='game-panel'>
                                                <p>
                                                    {item.gameText.split("\n").map(function(item, idx) {
                                                        return (
                                                            <span key={idx}>
                                                                {item}
                                                                <br/>
                                                            </span>
                                                        )
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                    :
                    <>
                    </>
                }
            </div>
        )
    }

    return (
        <>
            <Games />
        </>
    )
}

export default Games