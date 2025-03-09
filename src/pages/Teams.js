import { useState, useEffect } from 'react'
const { connectString } = require('../config.json')

function Teams() {
    const [teamData, setTeamData] = useState(null)
    const [osteamData, ossetTeamData] = useState([])
    const [nsteamData, nssetTeamData] = useState([])
    const [octeamData, ocsetTeamData] = useState([])
    const [ncteamData, ncsetTeamData] = useState([])
    const [teamLoaded, setTeamLoaded] = useState(false)
    const [teamsLoaded, setTeamsLoaded] = useState(false)

    useEffect( () => {
        fetchTeamData()
        .then(console.log(teamData))
    })

    const fetchTeamData = async () => {
        if (!teamData && !teamLoaded) {fetchTeams()}
        if (teamData && !teamsLoaded) {loadTeams()}
    }

    const fetchTeams = async () => {
        await fetch(connectString + 'teams/')
        .then(res => res.json())
        .then(data => setTeamData(data))
        .then(setTeamLoaded(true))
        .catch(err => console.log(err))
    }

    const loadTeams = async () => {
        if (osteamData) {
            ossetTeamData(teamData[0])
        }
        if (nsteamData) {
            nssetTeamData(teamData[1])
        }
        if (octeamData) {
            ocsetTeamData(teamData[2])
        }
        if (ncteamData) {
            ncsetTeamData(teamData[3])
        }
        if (!teamsLoaded) {
            setTeamsLoaded(true)
        }
    }

    const Teams = () => {
        return (
            <div className='player'>
                {/* <h1 style={{color:'#fcc603'}}>The Boston Bee Boys are your Season 7 Champions!</h1> */}
                <br/>
                <h1>Teams</h1>
                <div className="divisions">
                    <div className="team">
                        <h2>Old School</h2>
                        {
                            osteamData?.map( (item) => {
                                return (
                                    <div className='team-link'>
                                        <div className='split-para-full'>
                                        <a href={'/team/'+item.teamName} value={item._id} key={item.teamName}><h3>{ item.teamEmoji }{ item.teamName }</h3></a><span><h3>W | { item.gamesWon+item.playoffGamesWon } L | { item.gamesLost+item.playoffGamesLost }</h3></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br/>
                    <div className="team">
                        <h2>New School</h2>
                        {
                            nsteamData?.map( (item) => {
                                return (
                                    <div className='team-link'>
                                        <div className='split-para-full'>
                                        <a href={'/team/'+item.teamName} value={item._id} key={item.teamName}><h3>{ item.teamEmoji }{ item.teamName }</h3></a><span><h3>W | { item.gamesWon+item.playoffGamesWon } L | { item.gamesLost+item.playoffGamesLost }</h3></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br/>
                    <div className="team">
                        <h2>Old Cool</h2>
                        {
                            octeamData?.map( (item) => {
                                return (
                                    <div className='team-link'>
                                        <div className='split-para-full'>
                                        <a href={'/team/'+item.teamName} value={item._id} key={item.teamName}><h3>{ item.teamEmoji }{ item.teamName }</h3></a><span><h3>W | { item.gamesWon+item.playoffGamesWon } L | { item.gamesLost+item.playoffGamesLost }</h3></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br/>
                    <div className="team">
                        <h2>New Cool</h2>
                        {
                            ncteamData?.map( (item) => {
                                return (
                                    <div className='team-link'>
                                        <div className='split-para-full'>
                                        <a href={'/team/'+item.teamName} value={item._id} key={item.teamName}><h3>{ item.teamEmoji }{ item.teamName }</h3></a><span><h3>W | { item.gamesWon+item.playoffGamesWon } L | { item.gamesLost+item.playoffGamesLost }</h3></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Teams />
        </>
    )
}

export default Teams