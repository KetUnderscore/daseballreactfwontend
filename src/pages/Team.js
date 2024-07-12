import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
        await fetch('https://daseballapi.adaptable.app/team/'+params.teamName)
        .then(res => res.json())
        .then(data => setTeamData(data))
        .then(setTeamLoaded(true))
        .catch(err => console.log(err))
    }

    const fetchPitchers = async () => {
        setPitchingLoading(true)
        for (let i = 0; i < teamData[0].pitchingRotation.length; i++) {
            await fetch('https://daseballapi.adaptable.app/playerbyid/'+teamData[0].pitchingRotation[i])
            .then(res => res.json())
            .then(data => pitchingData.push(data[0]))
            .catch(err => console.log(err))
        }
        setPitchingLoaded(true)
    }

    const fetchBatters = async () => {
        setBattingLoading(true)
        for (let i = 0; i < teamData[0].battingRotation.length; i++) {
            await fetch('https://daseballapi.adaptable.app/playerbyid/'+teamData[0].battingRotation[i])
            .then(res => res.json())
            .then(data => battingData.push(data[0]))
            .catch(err => console.log(err))
        }
        setBattingLoaded(true)
    }

    const fetchPockets = async () => {
        setPocketLoading(true)
        for (let i = 0; i < teamData[0].shadowRotation.length; i++) {
            await fetch('https://daseballapi.adaptable.app/playerbyid/'+teamData[0].shadowRotation[i])
            .then(res => res.json())
            .then(data => pocketData.push(data[0]))
            .catch(err => console.log(err))
        }
        setPocketLoaded(true)
    }

    const Team = () => {
        return (
            <div className='player'>
                {
                    teamData != null ?
                    <div className="player">
                        <h1>{ teamData[0].teamEmoji }{ teamData[0].teamName }</h1>

                        <div className="center row">
                            {  teamData[0]?.teamMods.map( (item) => {
                                return (
                                    <span> 
                                        { item.modName === "Partying" ? <img src="https://i.imgur.com/83JqkX2.png" height="30px" title="This team is out of the running and partying!"></img> : '' }
                                        
                                        { item.modName === "Stable" ? <img src="https://i.imgur.com/TWKgRZQ.png" height="30px" title="This team is stable. Safe from Shuffle and Waves."></img> : '' }
                                        
                                        { item.modName === "Suck Forever" ? <img src="https://i.imgur.com/G4L25nw.png" height="30px" title="This team will suck forever."></img> : '' }
                                    </span>
                                )}) 
                            }
                        </div>

                        <div>
                            <h2>Pitching Rotation</h2>
                            {
                                pitchingLoaded ?
                                pitchingData?.map( (item) => {
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'https://daseball.netlify.app/player/'+item.name} value={item._id} key={item.name}>{ item.name }</a><span>{ "★".repeat(Math.max(0, (Math.floor((item.praying + item.publicity + item.pope) / 100)))) + "☆".repeat(Math.max(0, ((Math.round((item.praying + item.publicity + item.pope) / 100)) - (Math.floor((item.praying + item.publicity + item.pope) / 100))))) }</span>
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
                            {
                                battingLoaded ?
                                battingData?.map( (item) => {
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'https://daseball.netlify.app/player/'+item.name} value={item._id} key={item.name}>{ item.name }</a><span>{ "★".repeat(Math.max(0, (Math.floor((item.battery + item.assault + item.resistingArrest) / 100)))) + "☆".repeat(Math.max(0, ((Math.round((item.battery + item.assault + item.resistingArrest) / 100)))) - (Math.floor(Math.max(0, ((item.battery + item.assault + item.resistingArrest) / 100))))) }</span>
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
                            {
                                pocketLoaded ?
                                pocketData?.map( (item) => {
                                    let statstotal = item.battery + item.assault + item.resistingArrest + item.praying + item.publicity + item.pope + item.hammer + item.stalin + item.sickle + item.clooning + item.throwing + item.batman
                                    return (
                                        <div className='player-link'>
                                            <div className='split-para'>
                                            <a href={'https://daseball.netlify.app/player/'+item.name} value={item._id} key={item.name}>{ item.name }</a><span>{"★".repeat(Math.max(0, Math.floor(statstotal / 400))) + (statstotal % 400 >= 200 ? '☆' : '')}</span>
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