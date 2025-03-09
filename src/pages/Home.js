import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const { connectString } = require('../config.json')

function Home() {
    const params = useParams()
    console.log(params)

    const [seasonData, setSeasonData] = useState(null)
    const [seasonLoaded, setSeasonLoaded] = useState(false)
    const [seasonNumber, setSeasonNumber] = useState(9) // Default is Season 9
    const [paramsData, setparamsData] = useState(9)
    const [holdNum, setholdNum] = useState(0)

    useEffect( () => {
        if (seasonNumber !== paramsData) {
            setparamsData(seasonNumber)
        }
        fetchSeasonData()
        console.log(seasonData)
    })

    const fetchSeasonData = async () => {
        if (!seasonData && !seasonLoaded) {fetchSeason()}
    }

    const fetchSeason = async () => {
        await fetch(connectString + 'season/'+seasonNumber)
        .then(res => res.json())
        .then(data => setSeasonData(data))
        .then(setSeasonLoaded(true))
        .catch(err => console.log(err))
    }

    const Events = () => {
        let rows = []
        if (seasonData != null) {
            for (let i = Math.max(seasonData[0].seasonDay-9, 0); i < seasonData[0].seasonDay; i++) {
                let dayGames = seasonData[0].seasonEvents.filter(function (el) {
                    return el.gameDay === i
                })
                rows.push(
                    dayGames.map( (item) => {
                        return (
                            <div className='mod'>
                                <h2>Day {item.gameDay} Game {item.gameNum}</h2>
                                <p>{item.events.split("\n").map(function(item) {
                                        return (
                                            <span>
                                                {item}
                                                <br/>
                                            </span>
                                        )
                                    })}</p>
                            </div>
                        )
                    })
                )
            }
        }
        return (
            <div>
                <h1 className="center">Season {seasonNumber} Events</h1>
                <div className="mod-container">
                    {
                        seasonData != null ?
                        rows.toReversed().map( (item, index) => {
                            console.log(rows)
                            console.log(item)
                            if (item.length >= 1) {
                                return (
                                    <div className='mod' key={index}>
                                        <p>{item}</p>
                                    </div>
                                )
                            } else { return(<></>)}
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
            <p>Daseball is a love letter to <span className="bold">amatuer</span> coding, Sport Simulations and the creative pursuit.
            <br/>Navigate with the nav bar at the top of the screen.
            <br/>Games start at <time datetime="10:00-08:00">10:00AM PST</time>.
            <br/>
            <br/><a href="https://discord.gg/UZ3TfurF4N">Discord</a> <a href="https://ko-fi.com/ketdaseball">Kofi</a>
            </p>
            <br/>
            <p>Todo:</p>
            <ul>
                <li>Website Logging In</li>
                <li>Website Betting</li>
                <li>Website Votes Page</li>
                <li>Weather Compendium</li>
                <li>The Book</li>
                <li>Mobile Support (!)</li>
            </ul>
            <Events/>
            <br/>
            <h2>API HERE</h2>
            <h3 className="center">For code wizards and nerds only.</h3>
            <a href="https://daseball-api-05f8b0ed36e2.herokuapp.com/"><p>API Home</p></a>
            <br/>
            <br/>
        </div>
    )
}

export default Home