import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Player () {
    const params = useParams()

    const [playerData, setPlayerData] = useState(null)
    const [playerHiddenData, setPlayerHiddenData] = useState(false)
    const [playerStatData, setPlayerStatData] = useState(null)
    const [playerLoaded, setPlayerLoaded] = useState(false)
    const [playerStatsLoaded, setPlayerStatsLoaded] = useState(false)
    const [seasonNumber, setSeasonNumber] = useState(4.2) // Default is Season 4.2

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
                </select>
            </div>
        )
    }

    const FetchHiddenButton = () => {
        return (
            <input type="image" src="https://i.imgur.com/GtRYDGw.png" onClick={ToggleHidden} className="hidden-button"></input>
        )
    }

    const ToggleHidden = () => {
        if (playerHiddenData === false) {
            setPlayerHiddenData(true)
        } else {
            setPlayerHiddenData(false)
        }
    }

    const fetchPlayerData = async () => {
        if (!playerLoaded) {await fetchPlayer().then(console.log(playerData))}
        if (!playerStatsLoaded) {await fetchPlayerStats().then(console.log(playerData))}
    }

    const fetchPlayer = async () => {
        await axios.get('https://daseballapi.adaptable.app/player/'+params.id)
        .then(res => setPlayerData(res.data))
        .then(setPlayerLoaded(true))
        .catch(err => console.log(err))
    }

    const fetchPlayerStats = async () => {
        if (playerData != null) {
            await axios.get('https://daseballapi.adaptable.app/playerData/'+playerData[0].name+'/'+seasonNumber)
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
                        <h1>{ playerData[0].teamEmoji } { playerData[0].name }</h1>
                        <div className="center row">
                            {  playerData[0]?.modifiers.map( (item) => {
                                return (
                                    <span> 
                                        { item.name === "Visitor" ? <img src="https://i.imgur.com/ZjehUbe.png" height="30px" title="This player is a visitor from a far off land."></img> : '' }
                                        { item.name === "Hlockey" ? <img src="https://i.imgur.com/kUcBFL9.png" height="30px" title="This player plays in Hlockey. This player has improved Assault."></img> : '' }
                                        { item.name === "TerrorBall" ? <img src="https://i.imgur.com/iRVkDQU.png" height="30px" title="This player plays in Terror Ball. This player has improved Return Of The Killer Tomatoes 2."></img> : '' }
                                        { item.name === "NarrativeLeague" ? <img src="https://i.imgur.com/UOktOHC.png" height="30px" title="This player plays for the Narrative League. Things will happen to this player."></img> : '' }
                                        { item.name === "AltLeague" ? <img src="https://i.imgur.com/MJlBNU0.png" height="30px" title="This player plays for the Alternate League. This player has done this before."></img> : '' }
                                        { item.name === "BlittleLeague" ? <img src="https://i.imgur.com/keUYQ24.png" height="30px" title="This player plays for the Blittle League. This player is still growing."></img> : '' }
                                        
                                        { item.name === "Crown" ? <img src="https://i.imgur.com/ObKxsXM.png" height="30px" title="This player is having a great season."></img> : '' }
                                        { item.name === "Icon" ? <img src="https://i.imgur.com/qbFbglH.png" height="30px" title="This player is an icon. Doubled favorite payouts!"></img> : '' }
                                        { item.name === "Minimized" ? <img src="https://i.imgur.com/ZAxrqiz.png" height="30px" title="This player was minimized to zero."></img> : '' }

                                        { item.name === "Old School" ? <img src="https://i.imgur.com/yvlrdat.png" height="30px" title="This player enjoys the Null."></img> : '' }
                                        { item.name === "New Cool" ? <img src="https://i.imgur.com/MX8RFc4.png" height="30px" title="This player enjoys the Sun."></img> : '' }
                                        { item.name === "Lucky" ? <img src="https://i.imgur.com/Mgx5muI.png" height="30px" title="This player gets all the breaks!"></img> : '' }
                                        { item.name === "Lonely" ? <img src="https://i.imgur.com/vAuwVXq.png" height="30px" title="This player plays better on larger teams."></img> : '' }
                                        { item.name === "Loner" ? <img src="https://i.imgur.com/6IXXrHo.png" height="30px" title="This player plays better on smaller teams."></img> : '' }
                                        { item.name === "Unlucky" ? <img src="https://i.imgur.com/sTrsKvH.png" height="30px" title="This player just can't catch a break!"></img> : '' }
                                        { item.name === "Early Bird" ? <img src="https://i.imgur.com/4OKwfNk.png" height="30px" title="This player draws a walk on three balls."></img> : '' }
                                        { item.name === "Multiple" ? <img src="https://i.imgur.com/P9EWUY3.png" height="30px" title="This player scores twice."></img> : '' }
                                        { item.name === "Siren" ? <img src="https://i.imgur.com/3CsxZ4f.png" height="30px" title="This player has an alluring voice."></img> : '' }
                                        { item.name === "Vampiric" ? <img src="https://i.imgur.com/Pn1UoAL.png" height="30px" title="This player is vampiric."></img> : '' }

                                        { item.name === "Shepard" ? <img src="https://i.imgur.com/zm2KgpM.png" height="30px" title="This player plays better for every player on base."></img> : '' }
                                        { item.name === "Sunsetter" ? <img src="https://i.imgur.com/nsGvwgp.png" height="30px" title="This player plays better later in the game."></img> : '' }
                                        { item.name === "Sprinter" ? <img src="https://i.imgur.com/xLI45y0.png" height="30px" title="This player always tries to steal if able."></img> : '' }

                                        { item.name === "Lost" ? <img src="https://i.imgur.com/2Vyez52.png" height="30px" title="This player is lost..."></img> : '' }
                                        { item.name === "Found" ? <img src="https://i.imgur.com/FJ30bdi.png" height="30px" title="This player was found!"></img> : '' }
                                        { item.name === "Erased" ? <img src="https://i.imgur.com/4mvBVph.png" height="30px" title="This player was erased..."></img> : '' }
                                        { item.name === "Data Leak" ? <img src="https://i.imgur.com/dLWhUNY.png" height="30px" title="This player is leaking!"></img> : '' }
                                        { item.name === "HeatingUp" ? <img src="https://i.imgur.com/wWxWKyI.png" height="30px" title="This player is heating up..."></img> : '' }
                                        { item.name === "On Fire" ? <img src="https://i.imgur.com/N1MvyL6.png" height="30px" title="This player is on fire!"></img> : '' }
                                        { item.name === "Burnt Out" ? <img src="https://i.imgur.com/qmw52U7.png" height="30px" title="This player is burnt out..."></img> : '' }
                                        { item.name === "Wired" ? <img src="https://i.imgur.com/he4j9B0.png" height="30px" title="This player is wired!"></img> : '' }
                                        { item.name === "Tired" ? <img src="https://i.imgur.com/OFRRbPE.png" height="30px" title="This player is tired..."></img> : '' }
                                    </span>
                                )}) 
                            }
                        </div>
                        <h2>Pitching | { "★".repeat(Math.max(0, Math.floor(playerData[0].praying + playerData[0].publicity + playerData[0].pope) / 100)) + (Math.max(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope) % 100 > 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope))) / 100) + (Math.abs(Math.min(0, playerData[0].praying + playerData[0].publicity + playerData[0].pope)) % 100 > 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Batting | { "★".repeat(Math.max(0, Math.floor(playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest) / 100)) + (Math.max(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest) % 100 > 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest))) / 100) + (Math.abs(Math.min(0, playerData[0].battery + playerData[0].assault + playerData[0].resistingArrest)) % 100 > 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Running | { "★".repeat(Math.max(0, Math.floor(playerData[0].hammer + playerData[0].stalin + playerData[0].sickle) / 100)) + (Math.max(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle) % 100 > 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle))) / 100) + (Math.abs(Math.min(0, playerData[0].hammer + playerData[0].stalin + playerData[0].sickle)) % 100 > 50 ? '☆' : '')}</span>
                        </h2>
                        <h2>Fielding | { "★".repeat(Math.max(0, Math.floor(playerData[0].clooning + playerData[0].throwing + playerData[0].batman) / 100)) + (Math.max(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman) % 100 > 50 ? '☆' : '') }
                            <span className='red-text'>{ "★".repeat(Math.floor(Math.abs(Math.min(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman))) / 100) + (Math.abs(Math.min(0, playerData[0].clooning + playerData[0].throwing + playerData[0].batman)) % 100 > 50 ? '☆' : '')}</span>
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