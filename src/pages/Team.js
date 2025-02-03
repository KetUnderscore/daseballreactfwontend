import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProgressBar from '../components/ProgressBar.js'
import Cookies from 'js-cookie';
const { connectString } = require('../config.json')

function Team() {
    const params = useParams()
    console.log(params)

    const [teamData, setTeamData] = useState(null)
    const [teamLoaded, setTeamLoaded] = useState(false)
    const [pitchingData, setPitchingData] = useState([])
    const [pitchingLoaded, setPitchingLoaded] = useState(false)
    const [pitchingLoading, setPitchingLoading] = useState(false)
    const [battingData, setBattingData] = useState([])
    const [battingLoaded, setBattingLoaded] = useState(false)
    const [battingLoading, setBattingLoading] = useState(false)
    const [pocketData, setPocketData] = useState([])
    const [pocketLoaded, setPocketLoaded] = useState(false)
    const [pocketLoading, setPocketLoading] = useState(false)
    const [playerHiddenData, setPlayerHiddenData] = useState(false)
    const [playerDetailedData, setPlayerDetailedData] = useState(false)
    const [seed, setSeed] = useState(1);
        
    let userData = JSON.parse(localStorage.getItem("userInfo"))

    let progbar
    if (teamData != null) {progbar = { bgcolor: "#" + teamData[0].teamColor, completed: Math.round((teamData[0].spiritFund / 10000)* 100) }}
    

    useEffect( () => {
        fetchTeamData()
        .then(console.log(teamData))
        .then(console.log(pitchingData))
        .then(console.log(battingData))
        .then(console.log(pocketData))
    })

    const fetchTeamData = async () => {
        if (!teamData && !teamLoaded) {fetchTeam()}
        if (teamData != null && teamLoaded && !pitchingLoaded && !pitchingLoading) {fetchPitchers()}
        if (teamData != null && teamLoaded && !battingLoaded && !battingLoading) {fetchBatters()}
        if (teamData != null && teamLoaded && !pocketLoaded && !pocketLoading) {fetchPockets()}
    }

    const fetchTeam = async () => {
        await fetch(connectString + 'team/'+params.teamName)
        .then(res => res.json())
        .then(data => setTeamData(data))
        .then(setTeamLoaded(true))
        .catch(err => console.log(err))
    }

    const fetchPitchers = async () => {
        setPitchingLoading(true)
        for (let i = 0; i < teamData[0].pitchingRotation.length; i++) {
            await fetch(connectString + 'playerbyid/'+teamData[0].pitchingRotation[i])
            .then(res => res.json())
            .then(data => pitchingData.push(data[0]))
            .catch(err => console.log(err))
        }
        setPitchingLoaded(true)
    }

    const fetchBatters = async () => {
        setBattingLoading(true)
        for (let i = 0; i < teamData[0].battingRotation.length; i++) {
            await fetch(connectString + 'playerbyid/'+teamData[0].battingRotation[i])
            .then(res => res.json())
            .then(data => battingData.push(data[0]))
            .catch(err => console.log(err))
        }
        setBattingLoaded(true)
    }

    const fetchPockets = async () => {
        setPocketLoading(true)
        for (let i = 0; i < teamData[0].shadowRotation.length; i++) {
            await fetch(connectString + 'playerbyid/'+teamData[0].shadowRotation[i])
            .then(res => res.json())
            .then(data => pocketData.push(data[0]))
            .catch(err => console.log(err))
        }
        setPocketLoaded(true)
    }

    const FetchHiddenButtons = () => {
        return (
            <div className='center-block'>
            <button onClick={ToggleHidden} ><img src="https://i.imgur.com/5Qf7Ksr.png" className="hidden-button" title="Show Mods"/></button>
            <button onClick={ToggleDetailed} ><img src="https://i.imgur.com/JjKUx3p.png" className="hidden-button" title="Show Detailed Stars"/></button>
            </div >
        )
    }

    const ToggleHidden = () => {
        if (playerHiddenData === false) {
            setPlayerDetailedData(false)
            setPlayerHiddenData(true)
        } else {
            setPlayerHiddenData(false)
        }
    }

    const ToggleDetailed = () => {
        if (playerDetailedData === false) {
            setPlayerHiddenData(false)
            setPlayerDetailedData(true)
        } else {
            setPlayerDetailedData(false)
        }
    }

    const FetchFavButton = () => {
        if (userData?.favTeam === teamData[0].teamName) {
            return (
                <img src='https://i.imgur.com/ykhoXyC.png' height={"30px"} title="This team is your favorite!" />
            )
        } else {
            return (
                <input type="image" src='https://i.imgur.com/hGMqbba.png' onClick={FavoriteMe} height={"30px"} title="This team is not your favorite." />
            )
        }
    }

    const FavoriteMe = async () => {
        if (!userData) {
            console.log("Not signed in!")
            return
        } else {
                if (userData.favPlayer === teamData[0].teamName) {
                    console.log("Already ur fav!")
                } else {
                const response = await fetch(connectString + 'fav/team', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredntials: true,
                    credentials: 'include',
                    body: JSON.stringify({
                        username: userData.username,
                        team: teamData[0].teamName,
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

    const Team = () => {
        return (
            <div className='player'>
                {
                    teamData != null ?
                    <div className="player">
                        <h1>{ teamData[0].teamEmoji }{ teamData[0].teamName }<FetchFavButton key={seed} /></h1>
                        <h1>W { teamData[0].gamesWon } / L { teamData[0].gamesLost }</h1>
                        <h1>{ "🟡".repeat(teamData[0].championshipWins) } | { "🔴".repeat(teamData[0].championshipLosses) }</h1>
                        <h2>Vibes | {   teamData[0].curVibe < -24 ? "↓↓↓↓ Devastating" :
                                        teamData[0].curVibe > -25 && teamData[0].curVibe < -15 ? "↓↓↓ Horrid" :
                                        teamData[0].curVibe > -16 && teamData[0].curVibe < -5 ?  "↓↓ Bad" :
                                        teamData[0].curVibe > -6 && teamData[0].curVibe < 0 ?   "↓ Not Great" :
                                        teamData[0].curVibe === 0 ?   "⟷ Meh" :
                                        teamData[0].curVibe > 0 && teamData[0].curVibe < 6 ?   "↑ Pretty Good" :
                                        teamData[0].curVibe > 5 && teamData[0].curVibe < 16 ?  "↑↑ Great" :
                                        teamData[0].curVibe > 14 && teamData[0].curVibe < 25 ?  "↑↑↑ Amazing" :
                                        teamData[0].curVibe > 24 ? "↑↑↑↑ Impeccable" :
                                        "None"
                                    }</h2>
                        <h2>Spirit Fund | {teamData[0].spiritFund } / {teamData[0].spiritMax }</h2>

                        <div className="center row">
                            {  teamData[0]?.teamMods.map( (item) => {
                                return (
                                    <span> 
                                        { item.modName === "Partying" ? <img src="https://i.imgur.com/83JqkX2.png" height="30px" title="This team is out of the running and partying!"></img> : '' }
                                        
                                        { item.modName === "Stable" ? <img src="https://i.imgur.com/TWKgRZQ.png" height="30px" title="This team is stable. Safe from Shuffle and Waves."></img> : '' }
                                        { item.modName === "Witness Protection" ? <img src="https://i.imgur.com/pclDlgi.png" height="30px" title="This team is protected. Safe from The Witness."></img> : '' }
                                        { item.modName === "Sunspotting" ? <img src="https://i.imgur.com/paSBr57.png" height="30px" title="This team is spotting the Sun."></img> : '' }
                                        { item.modName === "Nullspotting" ? <img src="https://i.imgur.com/xgFVMnL.png" height="30px" title="This team is spotting the Null."></img> : '' }
                                        
                                        { item.modName === "Suck Forever" ? <img src="https://i.imgur.com/G4L25nw.png" height="30px" title="This team will suck forever."></img> : '' }
                                        { item.modName === "Tape Lovers" ? <img src="https://i.imgur.com/NBMbLYO.png" height="30px" title="This team may start skipping."></img> : '' }
                                        { item.modName === "Coffee Lovers" ? <img src="https://i.imgur.com/1WdpOMz.png" height="30px" title="This team may start pouring coffee."></img> : '' }
                                        { item.modName === "Homefield Advantage" ? <img src="https://i.imgur.com/tCnQYQ2.png" height="30px" title="This team has a homefield advantage!"></img> : '' }
                                        { item.modName === "Trapped" ? <img src="https://i.imgur.com/AiC1xek.png" height="30px" title="This team has trapped their home."></img> : '' }
                                        { item.modName === "Vibing" ? <img src="https://i.imgur.com/2StV7YX.png" height="30px" title="This teams vibes are wild."></img> : '' }
                                        { item.modName === "Seasoned" ? <img src="https://i.imgur.com/KxZwfCp.png" height="30px" title="This team is being seasoned."></img> : '' }
                                    </span>
                                )}) 
                            }
                        </div>

                        {
                            teamData != null ?
                            <>
                                <FetchHiddenButtons />
                            </>
                            : 
                            <>
                            </>
                        }

                        <div>
                            <h2>Pitching Rotation</h2>
                            <h5>Pitching Stars</h5>
                            {
                                pitchingLoaded ?
                                pitchingData?.map( (item) => {
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'/player/'+item.name} value={item._id} key={item.name}>{item.item.name != "None" ? '📦' : ''}{ item.name }</a><span>
                                            {playerHiddenData != true && playerDetailedData != true ? "★".repeat(Math.max(0, (Math.floor((item.praying + item.publicity + item.pope) / 99)))) + "☆".repeat(Math.max(0, ((Math.round((item.praying + item.publicity + item.pope) / 99)) - Math.max(0, (Math.floor((item.praying + item.publicity + item.pope) / 99)))))) : ''}
                                            {playerDetailedData != false ? "★".repeat(Math.max(0, (Math.floor((item.praying + item.publicity + item.pope) / 99)))) + "☆".repeat(Math.max(0, ((Math.round((item.praying + item.publicity + item.pope) / 99)) -  Math.max(0, (Math.floor((item.praying + item.publicity + item.pope) / 99)))))) +"(" + (Math.floor(((item.praying + item.publicity + item.pope)/99)*10) / 10).toFixed(1).toString() +")" : ''}
                                            {playerHiddenData != false ? item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            {playerHiddenData != false ? item.item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            </span>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                </>
                            }
                        </div>
                        <div>
                            <h2>Batting Rotation</h2>
                            {playerDetailedData != true ? <h5>Batting Stars</h5> : <h5>Batting|Running|Fielding Stars</h5>}
                            {
                                battingLoaded ?
                                battingData?.map( (item) => {
                                    let statstotal = item.battery + item.assault + item.resistingArrest + item.hammer + item.stalin + item.sickle + item.clooning + item.throwing + item.batman
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'/player/'+item.name} value={item._id} key={item.name}>{item.item.name != "None" ? '📦' : ''}{ item.name }</a><span>
                                            {playerHiddenData != true && playerDetailedData != true ? "★".repeat(Math.max(0, (Math.floor((item.battery + item.assault + item.resistingArrest) / 99)))) + "☆".repeat(Math.max(0, ((Math.round((item.battery + item.assault + item.resistingArrest) / 99)))) - (Math.floor(Math.max(0, ((item.battery + item.assault + item.resistingArrest) / 99))))) : ''}
                                            {playerDetailedData != false ? "★".repeat(Math.max(0, Math.floor(statstotal / 297))) + (statstotal % 297 >= 148.5 ? '☆' : '') + "(" + (Math.floor((statstotal/297)*10) / 10).toFixed(1).toString() +")" : ''}
                                            {playerHiddenData != false ? item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            {playerHiddenData != false ? item.item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            </span>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                </>
                            }
                        </div>
                        <div>
                            <h2>Pocket Rotation</h2>
                            <h5>Total Stars</h5>
                            {
                                pocketLoaded ?
                                pocketData?.map( (item) => {
                                    let statstotal = item.battery + item.assault + item.resistingArrest + item.praying + item.publicity + item.pope + item.hammer + item.stalin + item.sickle + item.clooning + item.throwing + item.batman
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'/player/'+item.name} value={item._id} key={item.name}>{item.item.name != "None" ? '📦' : ''}{ item.name }</a><span>
                                            {playerHiddenData != true && playerDetailedData != true ? "★".repeat(Math.max(0, Math.floor(statstotal / 396))) + (statstotal % 396 >= 198 ? '☆' : '') : ''}
                                            {playerDetailedData != false ? "★".repeat(Math.max(0, Math.floor(statstotal / 396))) + (statstotal % 396 >= 198 ? '☆' : '') + "(" + (Math.floor(((statstotal)*10)/396) / 10).toFixed(1).toString() +")" : ''}
                                            {playerHiddenData != false ? item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            {playerHiddenData != false ? item.item.modifiers.map( (item) => {
                                                return (
                                                    modify(item, 1)
                                                )
                                            }) : ''}
                                            </span>
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
            <Team />
        </>
    )
}

export default Team

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
            heightText = "20px"
            break;
    }
    return(
    <> 
        { item.name === "Visitor" ? <img src="https://i.imgur.com/ZjehUbe.png" height={heightText} title="This player is a visitor from a far off land."></img> : '' }
        { item.name === "Hlockey" ? <img src="https://i.imgur.com/kUcBFL9.png" height={heightText} title="This player plays in Hlockey. This player has improved Assault."></img> : '' }
        { item.name === "TerrorBall" ? <img src="https://i.imgur.com/iRVkDQU.png" height={heightText} title="This player plays in Terror Ball. This player has improved Return Of The Killer Tomatoes 2."></img> : '' }
        { item.name === "NarrativeLeague" ? <img src="https://i.imgur.com/UOktOHC.png" height={heightText} title="This player plays for the Narrative League. Things will happen to this player."></img> : '' }
        { item.name === "AltLeague" ? <img src="https://i.imgur.com/MJlBNU0.png" height={heightText} title="This player plays for the Alternate League. This player has done this before."></img> : '' }
        { item.name === "BlittleLeague" ? <img src="https://i.imgur.com/keUYQ24.png" height={heightText} title="This player plays for the Blittle League. This player is still growing."></img> : '' }
        
        { item.name === "Crown" ? <img src="https://i.imgur.com/ObKxsXM.png" height={heightText} title="This player is having a great season."></img> : '' }
        { item.name === "Icon" ? <img src="https://i.imgur.com/qbFbglH.png" height={heightText} title="This player is an icon. Doubled favorite payouts!"></img> : '' }
        { item.name === "Icon+" ? <img src="https://i.imgur.com/9jU25eY.png" height={heightText} title="This player is an icon+. Tripled favorite payouts!"></img> : '' }
        { item.name === "Minimized" ? <img src="https://i.imgur.com/ZAxrqiz.png" height={heightText} title="This player was minimized to zero."></img> : '' }

        { item.name === "Old School" ? <img src="https://i.imgur.com/yvlrdat.png" height={heightText} title="This player enjoys the Null."></img> : '' }
        { item.name === "New Cool" ? <img src="https://i.imgur.com/MX8RFc4.png" height={heightText} title="This player enjoys the Sun."></img> : '' }
        { item.name === "Lucky" ? <img src="https://i.imgur.com/Mgx5muI.png" height={heightText} title="This player gets all the breaks!"></img> : '' }
        { item.name === "Lonely" ? <img src="https://i.imgur.com/vAuwVXq.png" height={heightText} title="This player plays better on larger teams."></img> : '' }
        { item.name === "Loner" ? <img src="https://i.imgur.com/6IXXrHo.png" height={heightText} title="This player plays better on smaller teams."></img> : '' }
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

        { item.name === "Zodiac" ? <img src="https://i.imgur.com/qJlX78M.png" height={heightText} title="This player is a zodiac player."></img> : '' }
        { item.name === "Shepard" ? <img src="https://i.imgur.com/zm2KgpM.png" height={heightText} title="This player plays better for every player on base."></img> : '' }
        { item.name === "Sunsetter" ? <img src="https://i.imgur.com/nsGvwgp.png" height={heightText} title="This player plays better later in the game."></img> : '' }
        { item.name === "Sprinter" ? <img src="https://i.imgur.com/xLI45y0.png" height={heightText} title="This player always tries to steal if able."></img> : '' }

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
    </>
    )
}