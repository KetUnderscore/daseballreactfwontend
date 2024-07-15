function Home() {
    return (
        <div className="player">
            <h1>DASEBALL</h1>
            <h2>Data League Baseball</h2>
            <p>Daseball is a love letter to amatuer coding, Sport Simulations and the creative pursuit.
            <br/>Navigate with the nav bar at the top of the screen.
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
                <li>Recent Events Page</li>
            </ul>
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