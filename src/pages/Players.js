import { useState, useEffect } from 'react'

function Players() {
    const [playerData, setPlayerData] = useState([])
    const [playersLoaded, setPlayerLoaded] = useState(false)
    const [paramsData, setparamsData] = useState("total")

    useEffect( () => {
        fetchPlayers()
    })

    const fetchPlayers = async () => {
        if (!playersLoaded) {
            await fetch('https://daseballapi.adaptable.app/players/'+paramsData)
            .then(res => res.json())
            .then(data => setPlayerData(data))
            .then(setPlayerLoaded(true))
            .catch(err => console.log(err))
        }
    }

    const SortChanger = (x) => {
        if (x != paramsData) {
            setparamsData(x)
            setPlayerLoaded(false)
        }
    }

    const FetchSeason = () => {
        return (
            <div className='season-form'>
                <select value={paramsData} onChange={(e) => SortChanger(e.target.value)} className='season-select'>
                    <option value="total">Total</option>
                    <option value="pitching">Pitching</option>
                    <option value="batting">Batting</option>
                    <option value="running">Running</option>
                    <option value="fielding">Fielding</option>
                    <option value="battingaverage">Batting Average</option>
                    <option value="onbasepercentage">OBP</option>
                    <option value="slugging">Slugging</option>
                    <option value="ops">OPS</option>
                    <option value="era">ERA</option>
                    <option value="whip">WHIP</option>
                    <option value="fans">Fans</option>
                </select>
            </div>
        )
    }

    const Players = () => {
        return (
            <div>
                <p className="info-text">Sort By</p>
                <FetchSeason />
                <br/>
                {
                    playerData?.map( (item) => {
                        return (
                            <div className='player-link'>
                                <a href={'http://localhost:3000/player/'+item.name} value={item._id} key={item.name}>{ item.teamEmoji }{ item.name }</a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="player">
            <h1>Players</h1>
            <Players />
        </div>
    )
}

export default Players