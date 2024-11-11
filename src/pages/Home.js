import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
    const params = useParams()
    console.log(params)

    const [seasonData, setSeasonData] = useState(null)
    const [seasonLoaded, setSeasonLoaded] = useState(false)
    const [seasonNumber, setSeasonNumber] = useState(4.2) // Default is Season 4.2
    const [paramsData, setparamsData] = useState(4.2)

    useEffect( () => {
        if (seasonNumber !== paramsData) {
            setparamsData(seasonNumber)
        }
        fetchSeasonData()
        .then(console.log(seasonData))
    })

    const fetchSeasonData = async () => {
        if (!seasonData && !seasonLoaded) {fetchSeason()}
    }

    const fetchSeason = async () => {
        await fetch('https://daseballapi.adaptable.app/season/')
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
    }

    const Events = () => {
        return (
            <div className='game-holder'>
                <div className='game-panel'>
                    <h1>Season Events</h1>
                    {
                        seasonData ?
                        seasonData[0]?.seasonEvents.map( (item) => {
                            return (
                                <div key={""+item.gameDay+item.gameNum}>
                                    <h2>Day {item.gameDay} Game {item.gameNum}</h2>
                                    <p>{item.events}</p>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="player">
            <h1>DASEBALL</h1>
            <h2>Data League Baseball</h2>
            <p>Daseball is a love letter to amatuer coding, Sport Simulations and the creative pursuit.
            <br/>Navigate with the nav bar at the top of the screen.
            <br/>
            <br/><a href="https://discord.gg/UZ3TfurF4N">Discord</a>
            </p>
            <br/>
            <p>Todo:</p>
            <ul>
                <li>Logging In</li>
                <li>Betting</li>
                <li>Add Votes Page</li>
                <li>Season Game Schedule</li>
                <li>Weather Compendium</li>
                <li>The Book</li>
                <li>Mobile Support (!)</li>
            </ul>
            <Events/>
            <br/>
            <h2>API HERE</h2>
            <h3 className="center">For code wizards and nerds only.</h3>
            <a href="https://daseballapi.adaptable.app/games/"><p>/games/</p></a>
            <p>Options: /games/seasonNumber/dayNumber</p>
            <a href="https://daseballapi.adaptable.app/playerData/"><p>/playerData/</p></a>
            <p>Options: /playerData/name/season</p>
            <br/>
            <br/>
        </div>
    )
}

export default Home