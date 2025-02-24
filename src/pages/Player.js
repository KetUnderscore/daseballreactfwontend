import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
const { connectString } = require('../config.json')

function Player () {
    const params = useParams()
    
    const [playerData, setPlayerData] = useState(null)
    const [playerHiddenData, setPlayerHiddenData] = useState(false)
    const [playerStatData, setPlayerStatData] = useState(null)
    const [playerLoaded, setPlayerLoaded] = useState(false)
    const [playerStatsLoaded, setPlayerStatsLoaded] = useState(false)
    const [seasonNumber, setSeasonNumber] = useState(8) // Default is Season 8
    const [seed, setSeed] = useState(1);
    
    let favoriteSeason
    let favoritePosition
    let favoriteStar
    
    let userData = JSON.parse(localStorage.getItem("userInfo"))

    useEffect( () => {
        fetchPlayerData()
    })

    const delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
    });

    const SeasonChanger = (x) => {
        if (x != seasonNumber) {
            setPlayerStatsLoaded(false)
            setSeasonNumber(x)
        }
    }

    const FetchSeason = () => {
        return (
            <div className='season-form'>
                <select value={seasonNumber} onChange={(e) => SeasonChanger(e.target.value)} className='season-select'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>
        )
    }

    const FetchHiddenButton = () => {
        return (
            <input type="image" src="https://i.imgur.com/GtRYDGw.png" onClick={ToggleHidden} className="hidden-button"></input>
        )
    }

    const FetchFavButton = () => {
        if (userData?.favPlayer === playerData[0].name) {
            return (
                <img src='https://i.imgur.com/ykhoXyC.png' height={"30px"} title="This player is your favorite!" />
            )
        } else {
            return (
                <input type="image" src='https://i.imgur.com/hGMqbba.png' onClick={FavoriteMe} height={"30px"} title="This player is not your favorite." />
            )
        }
    }

    const ToggleHidden = () => {
        if (playerHiddenData === false) {
            setPlayerHiddenData(true)
        } else {
            setPlayerHiddenData(false)
        }
    }

    const FavoriteMe = async () => {
        if (!userData) {
            console.log("Not signed in!")
            return
        } else {
                if (userData.favPlayer === playerData[0].name) {
                    console.log("Already ur fav!")
                } else {
                const response = await fetch(connectString + 'fav/player', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredntials: true,
                    credentials: 'include',
                    body: JSON.stringify({
                        username: userData.username,
                        player: playerData[0].name,
                    }),
                })
                .then(response=>response.json())
                .then(data=>{ 
                    console.log(data);
                    localStorage.setItem("userInfo", JSON.stringify(data))
                 })
                .catch(err => console.log(err))
                setSeed(Math.random())
                console.log("Faved!")
            }
        }
    }

    const fetchPlayerData = async () => {
        if (!playerLoaded) {await fetchPlayer().then(console.log(playerData))}
        if (!playerStatsLoaded) {await fetchPlayerStats().then(console.log(playerData))}
    }

    const fetchPlayer = async () => {
        await axios.get(connectString + 'player/'+params.id)
        .then(res => setPlayerData(res.data))
        .then(setPlayerLoaded(true))
        .catch(err => console.log(err))
    }

    const fetchPlayerStats = async () => {
        if (playerData != null) {
            await axios.get(connectString + 'playerData/'+playerData[0].name+'/'+seasonNumber)
            .then(res => setPlayerStatData(res.data))
            .then(setPlayerStatsLoaded(true))
            .catch(err => console.log(err))
        }
    }

    const Player = () => {
        return (
            <div className='player'>
                {
                    playerData != null ?
                    <div className="player-box">
                        <div id="liveAlertPlaceholder" />
                        <h1>{ playerData[0].teamEmoji } { playerData[0].name } <FetchFavButton key={seed} /></h1>
                        <div className="center row">
                            {  playerData[0]?.modifiers.map( (item) => {
                                return (
                                    modify(item, 0)
                                )}) 
                            }
                            {  playerData[0]?.item.modifiers.map( (item) => {
                                return (
                                    modify(item, 0)
                                )}) 
                            }
                        </div>
                        <h2>Pitching | { "★".repeat(Math.max(0, Math.floor(playerData[0].praying + playerData[0].publicity + playerData[0].pope) / 100)) + (Math.max(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope) % 100 >= 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope))) / 100) + (Math.abs(Math.min(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope)) % 100 >= 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Batting | { "★".repeat(Math.max(0, Math.floor(playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest) / 100)) + (Math.max(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest) % 100 >= 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest))) / 100) + (Math.abs(Math.min(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest)) % 100 >= 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Running | { "★".repeat(Math.max(0, Math.floor(playerData[0].hammer + playerData[0].stalin + playerData[0].sickle) / 100)) + (Math.max(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle) % 100 >= 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle))) / 100) + (Math.abs(Math.min(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle)) % 100 >= 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Fielding | { "★".repeat(Math.max(0, Math.floor(playerData[0].clooning + playerData[0].throwing + playerData[0].batman) / 100)) + (Math.max(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman) % 100 >= 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman))) / 100) + (Math.abs(Math.min(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman)) % 100 >= 50 ? '☆' : '')}</span>
                        </h2>
                    </div>
                    : 
                    <>
                    </>
                }
                {
                    playerData != null ?
                    <FetchHiddenButton />
                    : 
                    <>
                    </>
                }
                {
                    playerData != null && playerHiddenData != false ?
                    <div className="player-box">
                        <h1>FORBIDDEN STATS</h1>
                        <h2>PRY | {"★".repeat(Math.max(0, Math.floor(playerData[0].praying) / 33)) + (Math.max(0, playerData[0].praying) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].praying))) / 33) + (Math.abs(Math.min(0, playerData[0].praying)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>PUB | {"★".repeat(Math.max(0, Math.floor(playerData[0].publicity) / 33)) + (Math.max(0, playerData[0].publicity) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].publicity))) / 33) + (Math.abs(Math.min(0, playerData[0].publicity)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>POP | {"★".repeat(Math.max(0, Math.floor(playerData[0].pope) / 33)) + (Math.max(0, playerData[0].pope) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].pope))) / 33) + (Math.abs(Math.min(0, playerData[0].pope)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <br/>
                        <h2>BAT | {"★".repeat(Math.max(0, Math.floor(playerData[0].battery) / 33)) + (Math.max(0, playerData[0].battery) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].battery))) / 33) + (Math.abs(Math.min(0, playerData[0].battery)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>ASL | {"★".repeat(Math.max(0, Math.floor(playerData[0].assault) / 33)) + (Math.max(0, playerData[0].assault) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].assault))) / 33) + (Math.abs(Math.min(0, playerData[0].assault)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>REA | {"★".repeat(Math.max(0, Math.floor(playerData[0].resistingArrest) / 33)) + (Math.max(0, playerData[0].resistingArrest) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].resistingArrest))) / 33) + (Math.abs(Math.min(0, playerData[0].resistingArrest)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <br/>
                        <h2>HAM | {"★".repeat(Math.max(0, Math.floor(playerData[0].hammer) / 33)) + (Math.max(0, playerData[0].hammer) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].hammer))) / 33) + (Math.abs(Math.min(0, playerData[0].hammer)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>STL | {"★".repeat(Math.max(0, Math.floor(playerData[0].stalin) / 33)) + (Math.max(0, playerData[0].stalin) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].stalin))) / 33) + (Math.abs(Math.min(0, playerData[0].stalin)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>SIK | {"★".repeat(Math.max(0, Math.floor(playerData[0].sickle) / 33)) + (Math.max(0, playerData[0].sickle) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].sickle))) / 33) + (Math.abs(Math.min(0, playerData[0].sickle)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <br/>
                        <h2>CLO | {"★".repeat(Math.max(0, Math.floor(playerData[0].clooning) / 33)) + (Math.max(0, playerData[0].clooning) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].clooning))) / 33) + (Math.abs(Math.min(0, playerData[0].clooning)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>RT2 | {"★".repeat(Math.max(0, Math.floor(playerData[0].throwing) / 33)) + (Math.max(0, playerData[0].throwing) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].throwing))) / 33) + (Math.abs(Math.min(0, playerData[0].throwing)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                        <h2>BTM | {"★".repeat(Math.max(0, Math.floor(playerData[0].batman) / 33)) + (Math.max(0, playerData[0].batman) % 33 > 16 ? '☆' : '')}
                            <span className='red-text'>{"★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].batman))) / 33) + (Math.abs(Math.min(0, playerData[0].batman)) % 33 > 16 ? '☆' : '')}</span>
                        </h2>
                    </div>
                    : 
                    <>
                    </>
                }
                {
                    playerData != null ?
                        playerData[0].item.name != "None" ?
                        <div className="player-box">
                            <h1>ITEM</h1>
                            <h2>Name | {playerData[0].item.name}</h2>
                            <h3 className="center">{playerData[0].item.description}</h3>
                            <h2>Mods | {  playerData[0]?.item.modifiers.map( (item) => {
                                return (
                                    modify(item, 1)
                                )}) 
                            }</h2>
                            <h2>Prop | {playerData[0].item.property}</h2>
                            <h2>Pitching | { "★".repeat(Math.max(0, Math.floor(playerData[0].item.stats[3] + playerData[0].item.stats[4] + playerData[0].item.stats[5]) / 100)) + (Math.max(0, playerData[0].item.stats[3] + playerData[0].item.stats[4] + playerData[0].item.stats[5]) % 100 >= 50 ? '☆' : '') }
                                <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].item.stats[3] + playerData[0].item.stats[4] + playerData[0].item.stats[5]))) / 100) + (Math.abs(Math.min(0, playerData[0].item.stats[3] + playerData[0].item.stats[4] + playerData[0].item.stats[5])) % 100 >= 50 ? '☆' : '')}</span>
                            </h2>
                            <h2>Batting | { "★".repeat(Math.max(0, Math.floor(playerData[0].item.stats[0] + playerData[0].item.stats[1] + playerData[0].item.stats[2]) / 100)) + (Math.max(0, playerData[0].item.stats[0] + playerData[0].item.stats[1] + playerData[0].item.stats[2]) % 100 >= 50 ? '☆' : '') }
                                <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].item.stats[0] + playerData[0].item.stats[1] + playerData[0].item.stats[2]))) / 100) + (Math.abs(Math.min(0, playerData[0].item.stats[0] + playerData[0].item.stats[1] + playerData[0].item.stats[2])) % 100 >= 50 ? '☆' : '')}</span>
                            </h2>
                            <h2>Running | { "★".repeat(Math.max(0, Math.floor(playerData[0].item.stats[6] + playerData[0].item.stats[7] + playerData[0].item.stats[8]) / 100)) + (Math.max(0, playerData[0].item.stats[6] + playerData[0].item.stats[7] + playerData[0].item.stats[8]) % 100 >= 50 ? '☆' : '') }
                                <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].item.stats[6] + playerData[0].item.stats[7] + playerData[0].item.stats[8]))) / 100) + (Math.abs(Math.min(0, playerData[0].item.stats[6] + playerData[0].item.stats[7] + playerData[0].item.stats[8])) % 100 >= 50 ? '☆' : '')}</span>
                            </h2>
                            <h2>Fielding | { "★".repeat(Math.max(0, Math.floor(playerData[0].item.stats[9] + playerData[0].item.stats[10] + playerData[0].item.stats[11]) / 100)) + (Math.max(0, playerData[0].item.stats[9] + playerData[0].item.stats[10] + playerData[0].item.stats[11]) % 100 >= 50 ? '☆' : '') }
                                <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].item.stats[9] + playerData[0].item.stats[10] + playerData[0].item.stats[11]))) / 100) + (Math.abs(Math.min(0, playerData[0].item.stats[9] + playerData[0].item.stats[10] + playerData[0].item.stats[11])) % 100 >= 50 ? '☆' : '')}</span>
                            </h2>
                        </div>
                        : 
                        <>
                        </>
                    : 
                    <>
                    </>
                }
                {
                    playerData != null ?
                    <div className="player-box">
                        <h1>Interview Responses</h1>
                        <h2>Birthday | { playerData[0].birthday } </h2>
                        <h2>Favorite Number | { playerData[0].favNum } </h2>
                        <h2>Favorite Season | { playerData[0].favSes === 0 ? 'Spring':
                                                playerData[0].favSes === 1 ? 'Summer':
                                                playerData[0].favSes === 2 ? 'Fall' :
                                                'Winter' } </h2>
                        <h2>Favorite Holiday | { playerData[0].favHol } </h2>
                        <h2>Favorite Soup | { playerData[0].favSoup } </h2>
                        <h2>Favorite Lineup Spot | { playerData[0].favPos === 0 ? 'Pitcher' :
                                                     playerData[0].favPos === 1 ? 'Catcher' :
                                                     playerData[0].favPos === 2 ? 'First Base' :
                                                     playerData[0].favPos === 3 ? 'Second Base' :
                                                     playerData[0].favPos === 4 ? 'Third Base' :
                                                     playerData[0].favPos === 5 ? 'Shortstop' :
                                                     playerData[0].favPos === 6 ? 'Left Field' :
                                                     playerData[0].favPos === 7 ? 'Center Field' :
                                                     playerData[0].favPos === 8 ? 'Right Field' :
                                                     'Designated Hitter' } </h2>
                        <h2>Eye Count | { playerData[0].eyeCount } </h2>
                        <h2>Star Alignment | { playerData[0].starAlignment === 0 ? 'Red' :
                                               playerData[0].starAlignment === 1 ? 'Orange' :
                                               playerData[0].starAlignment === 2 ? 'Yellow' :
                                               playerData[0].starAlignment === 3 ? 'Blue':
                                               'Green' } </h2>
                    </div>
                    : 
                    <>
                    </>
                }
                <h1>Season {seasonNumber} Performance Stats</h1>
                <form>
                    <FetchSeason />
                </form>
                {
                    (playerStatData != null) && (playerStatData.length != 0) && (playerStatsLoaded) ?
                        (playerStatData[0].atbats >= 1) ?
                        <div className="player-box">
                            <h1>Batting Stats | {playerStatData[0].atbats} At Bats</h1>
                            <h2>Batting Average | {Math.round((Math.round((playerStatData[0].hitsgot/playerStatData[0].atbats)*100)/100)*100)/100}</h2>
                            <h2>On-base Percentage | {Math.round((Math.round(((playerStatData[0].hitsgot+playerStatData[0].walksgot)/playerStatData[0].atbats)*100)/100)*100)/100}</h2>
                            <h2>Slugging | {Math.round((Math.round((playerStatData[0].basesReached/playerStatData[0].atbats)*100)/100)*100)/100}</h2>
                            <h2>OPS | {Math.round(((Math.round(((playerStatData[0].hitsgot+playerStatData[0].walksgot)/playerStatData[0].atbats)*100)/100)+(Math.round((playerStatData[0].basesReached/playerStatData[0].atbats)*100)/100))*100)/100}</h2>
                        </div>
                        : 
                        <>
                        </>
                    : 
                    <>
                    </>
                }
                {
                    (playerStatData != null) && (playerStatData.length != 0) && (playerStatsLoaded) ?
                        (playerStatData[0].innings >= 1) ?
                        <div className="player-box">
                            <h1>Pitching Stats | {playerStatData[0].innings} Innings Pitched</h1>
                            <h2>Earned Run Average | {Math.round((Math.round((9*playerStatData[0].earnedruns/playerStatData[0].innings)*100)/100)*100)/100}</h2>
                            <h2>WHIP | {Math.round((Math.round(((playerStatData[0].hitsallowed+playerStatData[0].walksissued)/playerStatData[0].innings)*100)/100)*100)/100}</h2>
                        </div>
                        : 
                        <>
                        </>
                    : 
                    <>
                    </>
                }
            </div>
        )
    }

    return(
        <>
            <Player />
        </>
    )
}

export default Player

function modify(item, type) {
    let heightText = ""
    switch (type) {
        case 0:
            heightText = "30px"
            break;
        case 1:
            heightText = "20px"
            break;
        default:
            heightText = "30px"
            break;
    }
    return(
    <span> 
        { item.name === "Visitor" ? <img src="https://i.imgur.com/ZjehUbe.png" height={heightText} title="This player is a visitor from a far off land."></img> : '' }
        { item.name === "Hlockey" ? <img src="https://i.imgur.com/kUcBFL9.png" height={heightText} title="This player plays in Hlockey. This player has improved Assault."></img> : '' }
        { item.name === "TerrorBall" ? <img src="https://i.imgur.com/iRVkDQU.png" height={heightText} title="This player plays in Terror Ball. This player has improved Return Of The Killer Tomatoes 2."></img> : '' }
        { item.name === "NarrativeLeague" ? <img src="https://i.imgur.com/UOktOHC.png" height={heightText} title="This player plays for the Narrative League. Things will happen to this player."></img> : '' }
        { item.name === "AltLeague" ? <img src="https://i.imgur.com/MJlBNU0.png" height={heightText} title="This player plays for the Alternate League. This player has done this before."></img> : '' }
        { item.name === "BlittleLeague" ? <img src="https://i.imgur.com/keUYQ24.png" height={heightText} title="This player plays for the Blittle League. This player is still growing."></img> : '' }
        { item.name === "Reverberating" ? <img src="https://i.imgur.com/UdlzP7K.png" height={heightText} title="A Reverberating Player has a small chance of batting again after each of their At-Bats end."></img> : '' }
        
        { item.name === "Crown" ? <img src="https://i.imgur.com/ObKxsXM.png" height={heightText} title="This player is having a great season."></img> : '' }
        { item.name === "Noncon" ? <img src="https://i.imgur.com/KGGTgET.png" height={heightText} title="This player does not pay out..."></img> : '' }
        { item.name === "Icon" ? <img src="https://i.imgur.com/qbFbglH.png" height={heightText} title="This player is an icon. Doubled favorite payouts!"></img> : '' }
        { item.name === "Icon+" ? <img src="https://i.imgur.com/9jU25eY.png" height={heightText} title="This player is an icon+. Tripled favorite payouts!"></img> : '' }
        { item.name === "Icon++" ? <img src="https://i.imgur.com/Hb8yFtj.png" height={heightText} title="This player is an icon++. Quadrupled favorite payouts!"></img> : '' }
        { item.name === "Minimized" ? <img src="https://i.imgur.com/ZAxrqiz.png" height={heightText} title="This player was minimized to zero."></img> : '' }

        { item.name === "Old School" ? <img src="https://i.imgur.com/yvlrdat.png" height={heightText} title="This player enjoys the Null."></img> : '' }
        { item.name === "New Cool" ? <img src="https://i.imgur.com/MX8RFc4.png" height={heightText} title="This player enjoys the Sun."></img> : '' }
        { item.name === "Lucky" ? <img src="https://i.imgur.com/Mgx5muI.png" height={heightText} title="This player gets all the breaks!"></img> : '' }
        { item.name === "Lonely" ? <img src="https://i.imgur.com/vAuwVXq.png" height={heightText} title="This player plays better on larger teams."></img> : '' }
        { item.name === "Loner" ? <img src="https://i.imgur.com/6IXXrHo.png" height={heightText} title="This player plays better on smaller teams."></img> : '' }
        { item.name === "Misunderstood" ? <img src="https://imgur.com/a/3dduwPK" height={heightText} title="This player is just misunderstood."></img> : '' }
        { item.name === "Unlucky" ? <img src="https://i.imgur.com/sTrsKvH.png" height={heightText} title="This player just can't catch a break!"></img> : '' }
        { item.name === "Early Bird" ? <img src="https://i.imgur.com/4OKwfNk.png" height={heightText} title="This player draws a walk on three balls."></img> : '' }
        { item.name === "Multiple" ? <img src="https://i.imgur.com/P9EWUY3.png" height={heightText} title="This player scores twice."></img> : '' }
        { item.name === "Siren" ? <img src="https://i.imgur.com/3CsxZ4f.png" height={heightText} title="This player has an alluring voice."></img> : '' }
        { item.name === "Vampiric" ? <img src="https://i.imgur.com/Pn1UoAL.png" height={heightText} title="This player is vampiric."></img> : '' }
        { item.name === "Precognition" ? <img src="https://i.imgur.com/xCk0rVZ.png" height={heightText} title="This player can see a better future."></img> : '' }
        { item.name === "Trader" ? <img src="https://i.imgur.com/qIl8Jji.png" height={heightText} title="This player wants to trade!"></img> : '' }
        { item.name === "Gentleman" ? <img src="https://i.imgur.com/B93ztw2.png" height={heightText} title="This player is a gentleman thief."></img> : '' }
        { item.name === "Lightweight" ? <img src="https://i.imgur.com/uel3Avj.png" height={heightText} title="This player likes to travel light."></img> : '' }
        { item.name === "Tertiary" ? <img src="https://i.imgur.com/FheImZD.png" height={heightText} title="This player has an affinity for triples."></img> : '' }
        { item.name === "Mindful" ? <img src="https://i.imgur.com/ZSlUnbk.png" height={heightText} title="This player has a mind for others."></img> : '' }
        { item.name === "WellTraveled" ? <img src="https://i.imgur.com/zCTp2Lx.png" height={heightText} title="This player has a heart for adventure."></img> : '' }
        { item.name === "Homebody" ? <img src="https://i.imgur.com/HeewHag.png" height={heightText} title="This player prefers to be home."></img> : '' }

        { item.name === "Zodiac" ? <img src="https://i.imgur.com/qJlX78M.png" height="30px" title="This player is a zodiac player."></img> : '' }
        { item.name === "Shepard" ? <img src="https://i.imgur.com/zm2KgpM.png" height={heightText} title="This player plays better for every player on base."></img> : '' }
        { item.name === "Sunsetter" ? <img src="https://i.imgur.com/nsGvwgp.png" height={heightText} title="This player plays better later in the game."></img> : '' }
        { item.name === "Sprinter" ? <img src="https://i.imgur.com/xLI45y0.png" height={heightText} title="This player always tries to steal if able."></img> : '' }
        { item.name === "Puppet" ? <img src="https://i.imgur.com/aFXHBBC.png" height={heightText} title="This player is stuck on strings."></img> : '' }

        { item.name === "Lost" ? <img src="https://i.imgur.com/2Vyez52.png" height={heightText} title="This player is lost..."></img> : '' }
        { item.name === "Found" ? <img src="https://i.imgur.com/FJ30bdi.png" height={heightText} title="This player was found!"></img> : '' }
        { item.name === "Erased" ? <img src="https://i.imgur.com/4mvBVph.png" height={heightText} title="This player was erased..."></img> : '' }
        { item.name === "Data Leak" ? <img src="https://i.imgur.com/dLWhUNY.png" height={heightText} title="This player is leaking!"></img> : '' }
        { item.name === "Data Breach" ? <img src="https://i.imgur.com/ROhdf21.png" height={heightText} title="This player is breaking!"></img> : '' }
        { item.name === "Patched" ? <img src="https://i.imgur.com/ar8A2xZ.png" height={heightText} title="This player has been patched."></img> : '' }
        { item.name === "HeatingUp" ? <img src="https://i.imgur.com/wWxWKyI.png" height={heightText} title="This player is heating up..."></img> : '' }
        { item.name === "On Fire" ? <img src="https://i.imgur.com/N1MvyL6.png" height={heightText} title="This player is on fire!"></img> : '' }
        { item.name === "Burnt Out" ? <img src="https://i.imgur.com/qmw52U7.png" height={heightText} title="This player is burnt out..."></img> : '' }
        { item.name === "Wired" ? <img src="https://i.imgur.com/he4j9B0.png" height={heightText} title="This player is wired!"></img> : '' }
        { item.name === "Tired" ? <img src="https://i.imgur.com/OFRRbPE.png" height={heightText} title="This player is tired..."></img> : '' }
        { item.name === "Team Pillar" ? <img src="https://i.imgur.com/GXCcMj0.png" height={heightText} title="This player is a team pillar! They are immune!"></img> : '' }
        { item.name === "Welled" ? <img src="https://i.imgur.com/DqqNyTQ.png" height={heightText} title="This player is stuck in a well and unable to play."></img> : '' }
    </span>
    )
}