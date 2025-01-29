import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const { connectString } = require('../config.json')

function Book() {
    const [bookSection, setBookSection] = useState(0)

    const ToggleSectionH = () => {
        if (bookSection != 0) {
            setBookSection(0)
        }
    }

    const ToggleSectionA = () => {
        if (bookSection != 1) {
            setBookSection(1)
        }
    }

    const ToggleSectionW = () => {
        if (bookSection != 2) {
            setBookSection(2)
        }
    }

    const SectionH = () => {
        return (
            <div style={{maxWidth: 1000, margin: "auto"}}>
                <h2 className="center row">Section H</h2>
                {/* Section 1 */}
                <div className="censored">
                    <p>H1-O <span>███ ██ ████████</span></p>
                    <p>H1-O <span>███ ██████ ████████████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ████ ████████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ █████████ ██████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ███████ ████████ █████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ███████ ████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ████ █████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ ██████ ██████ ████ ███ ███████</span></p>
                    <p>H1-O <span>███ █████ ██████</span></p>
                </div>
                <br/>
                {/* Section 1.5 */}
                <div className="uncensored">
                    <p>H10-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>DATA LOST</span></p>
                    <br/>
                    <p>H20-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>DATA LOST</span></p>
                    <br/>
                    <p>H30-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>DATA LOST</span></p>
                    <br/>
                    <p>H40-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>DATA LOST</span></p>
                </div>
                <br/>
                {/* Section 2 */}
                <div className="censored">
                    <p>H41-O <span>███ ████ ██ ██████</span></p>
                    <p>H41-O <span>███ █████ ███ ███████ █████ █████</span></p>
                    <p>H41-O <span>█████ ██████</span></p>
                </div>
                <br/>
                {/* Section 3 */}
                <div className="censored">
                    <p>H41-R1 <span>█████ █████ ██ ███ ████ ████████ ████████ █████ ██ ███ ████ ██████</span></p>
                    <p>H41-R1 <span>████ ███████ ████ ████ █████ ███ ███ ████</span></p>
                </div>
                <br/>
                {/* Section 4 */}
                <div className="censored">
                    <p>H60-P <span>███ ████ ████████ ████ █ █████████</span></p>
                    <p>H60-P <span>███ █████████ ██████ ████ █ █████████</span></p>
                    <p>H60-P <span>███ █████████ ████████ ████ ███ ███████</span></p>
                    <p>H60-P <span>███ ███████ ███ █████ ████ ███ ███████</span></p>
                </div>
                <br/>
                {/* Section 5 */}
                <div className="censored">
                    <p>H70-P <span>███ ███████ ████████ ███ ███ ████ █████</span></p>
                    <p>H70-P <span>█ ████ ████ █████ ██████ ███ █████</span></p>
                    <p>H70-P <span>███ ████ ████ ███ █████</span></p>
                    <p>H70-P <span>███ ████ ████ ██████ ███ ██████ ██ ██████████</span></p>
                    <p>H70-P <span>█████████ ██ █████████</span></p>
                    <p>H70-P <span>████ ██████</span></p>
                </div>
                <br/>
                {/* Section 6 */}
                <div className="uncensored">
                    <p>H70-F <span>THE TEAM IS UP AGAINST THE MOONSTONE RAPBITS!</span></p>
                    <p>H70-F <span>TEWI INABA OF THE MOONSTONE RAPBITS ATTACKED THE OF THE TEAM!</span></p>
                    <p>H70-F <span>BOTH PLAYERS HAVE BEEN TAKEN OFF THE ICE!</span></p>
                    <p>H70-F <span>ARLON HOOMBLEFUMPER OF THE MOONSTONE RAPBITS SCORED! 3 TO 15</span></p>
                    <p>H70-F <span>THE MOONSTONE RAPBITS BEAT THE TEAM, 18 TO 3!</span></p>
                    <p>H70-F <span>THE TEAM HAVE BEEN ABDUCTED.</span></p>
                </div>
                <br/>
                {/* Section 7 */}
                <div className="censored">
                    <p>H70-O <span>███ ███ ████ ████ ███ ███████</span></p>
                </div>
                <br/>
                {/* Section 8 */}
                <div className="censored">
                    <p>H90-P <span>███ ███ ██████</span></p>
                    <p>H90-P <span>███ ████████████ ███ ████</span></p>
                    <p>H90-P <span>███ █████ ████ ████ ████</span></p>
                    <p>H90-P <span>███ ██████ ███ ██████</span></p>
                </div>
                <br/>
                {/* Section 8.5 */}
                <div className="censored">
                    <p>H90-P <span>███ ████ ███████ ███ ███████</span></p>
                    <p>H90-P <span>███ ████ ████████ ███████ ███ ███████</span></p>
                    <p>H90-P <span>███ █████████ ██████ ███████ ███ ███████</span></p>
                    <p>H90-P <span>███ ███████ ███████ ████ ███ ███████</span></p>
                    <p>H90-P <span>███ █████████ ███████ ████ ███ ███████</span></p>
                    <p>H90-P <span>███ █████████ ██████ ████ ███ ███████</span></p>
                    <p>H90-P <span>███ ██████ ████ ████ ███ ███████</span></p>
                    <p>H90-P <span>███ ███████████ ██████ ████ ███ ███████</span></p>
                    <p>H90-P <span>███ ██████ ██ ██████</span></p>
                    <p>H90-P <span>████████</span></p>
                    <p>H90-P <span>████████</span></p>
                    <p>H90-P <span>████████</span></p>
                    <p>H90-P <span>█████████</span></p>
                </div>
                <br/>
                {/* Section 9 */}
                <div className="censored">
                    <p>H90-V <span>███ ███████ █████ ██ █████</span></p>
                    <p>H90-V <span>████ █ ████████ ███ ████ █████</span></p>
                    <p>H90-V <span>████████</span></p>
                    <p>H90-V <span>██████</span></p>
                    <p>H90-V <span>█████████</span></p>
                </div>
                <br/>
                {/* Section 10 */}
                <div className="censored">
                    <p>H95-R1 <span>█████ █████ █████████</span></p>
                    <p>H95-R1 <span>██████ ██████ ███</span></p>
                </div>
                <br/>
                {/* Section 11 */}
                <div className="uncensored">
                    <p>H100-P <span>THE SEASON 100 CHAMPIONS HAVE BEEN BLESSED BY THE STARS.</span></p>
                    <p>H100-P <span>CONGRATS POSERS.</span></p>
                    <p>H100-P <span>PIECES OF THE MOON WERE RECOVERED.</span></p>
                    <p>H100-P <span>SECTIONS OF THE COUNTRY WERE RECLAIMED.</span></p>
                    <p>H100-P <span>STADIUM GENERICA FALLS.</span></p>
                </div>
                <br/>
                {/* Section 12 */}
                <div className="censored">
                    <p>H100-V <span>███ █████ ███████</span></p>
                    <p>H100-V <span>███ █████ ███ ████████</span></p>
                    <p>H100-V <span>███ ██████ ███ ███████████</span></p>
                    <p>H100-V <span>███ ████████ ██████████</span></p>
                    <p>H100-V <span>█████ ███████</span></p>
                    <p>H100-V <span>███ █████ ███████</span></p>
                </div>
                <br/>
                {/* Section 13 */}
                <div className="censored">
                    <p>H100-O <span>███ ██████ ████ ███████████</span></p>
                    <p>H100-O <span>█ ███ ███ █████</span></p>
                    <p>H100-O <span>████ ████ ████ █████████ ███ ██ ███ █████████ ██████ █████</span></p>
                    <p>H100-O <span>████ ███ ██████ ██ █ ████ ██████ ██ ████ █████ ██ ██████</span></p>
                    <p>H100-O <span>████ █████ ██ ███ ███████</span></p>
                    <p>H100-O <span>██ ██████████ █████████ █████</span></p>
                    <p>H100-O <span>█████ ███ ██████████</span></p>
                    <p>H100-O <span>████ ███ ████ ██ █████████</span></p>
                    <p>H100-O <span>████ ██ ███ ███████</span></p>
                    <p>H100-O <span>███ ████████</span></p>
                </div>
                <br/>
                {/* Section 14 */}
                <div className="censored">
                    <p>H110-V <span>███ █████ ██ █████</span></p>
                    <p>H110-V <span>████ ███ ███████████</span></p>
                    <p>H110-V <span>███ ████████ ████ ████ ██████ ██████</span></p>
                </div>
                <br/>
                {/* Section 15 */}
                <div className="censored">
                    <p>H110-O <span>███ █████ ███ ██████ ████ ██ ███ ████</span></p>
                    <p>H110-O <span>████ █████</span></p>
                    <p>H110-O <span>██ █████ ██████</span></p>
                    <p>H110-O <span>█████ ███ █████████ ████</span></p>
                </div>
                <br/>
                {/* Section 16 */}
                <div className="censored">
                    <p>H120-V <span>███ █████ █████ ██ █████ ███ ██████ ██ ████ ███</span></p>
                    <p>H120-V <span>████ ███████ ██████</span></p>
                    <p>H120-V <span>███ ██████ ███ ███████ ██ ███ ██████</span></p>
                    <p>H120-V <span>████████ ███████</span></p>
                </div>
                <br/>
                {/* Section 17 */}
                <div className="censored">
                    <p>H125-V <span>███ █████ █████ ██ █████ ███ ██████ ██ ████ ███</span></p>
                    <p>H125-V <span>████ ███████ ██████</span></p>
                    <p>H125-V <span>███ ██████ ███ ███████ ██ ███ ██████</span></p>
                    <p>H125-V <span>████████ ███████</span></p>
                </div>
                <br/>
                {/* Section 18 */}
                <div className="censored">
                    <p>H130-V <span>███ ████████ ████ ██████████████</span></p>
                    <p>H130-V <span>█████ ███ ████ ███ ████ ███ ████████</span></p>
                    <p>H130-V <span>████████</span></p>
                    <p>H130-V <span>████████</span></p>
                    <p>H130-V <span>██████████</span></p>
                    <p>H130-V <span>████ ███ ██████████</span></p>
                    <p>H130-V <span>██████</span></p>
                    <p>H130-V <span>████ ██ ██████</span></p>
                    <p>H130-V <span>███ █████ ██ ███ ████ ████████</span></p>
                </div>
                <br/>
                {/* Section 19 */}
                <div className="censored">
                    <p>H140-V <span>███ ████ ██ █████</span></p>
                    <p>H140-V <span>████████ ███████ ███ ███████</span></p>
                    <p>H140-V <span>██ ███ ██ ███████████</span></p>
                    <p>H140-V <span>█ █████ ██ ██████████</span></p>
                </div>
                <br/>
                {/* Section 19.5 */}
                <div className="censored">
                    <p>H140-O <span>███ ██████ ████ ███ █████ ███ ███ ███████</span></p>
                    <p>H140-O <span>███</span></p>
                    <p>H140-O <span>███ ███ ████ ████████</span></p>
                </div>
                <br/>
                {/* Section 20 */}
                <div className="censored">
                    <p>H141-R13 <span>███ ████ ███████ ██████ ████ ███ ████</span></p>
                    <p>H141-R13 <span>███ ████ ███████ █████ ██████ ██████ ███ ██████ ████ ███</span></p>
                </div>
                <br/>
                {/* Section 21 */}
                <div className="censored">
                    <p>H141-P <span>█ ███████ ██████</span></p>
                    <p>H141-P <span>█ █████████</span></p>
                    <p>H141-P <span>██ █████████</span></p>
                </div>
                <br/>
                {/* Section 22 */}
                <div className="censored">
                    <p>H141-V <span>███ ███████ ███ ████ ████████</span></p>
                    <p>H141-V <span>████ ███ █████ █████</span></p>
                    <p>H141-V <span>███ ██████ █████████ ██ ███ ████ ██ ███████</span></p>
                    <p>H141-V <span>████ ███ ██████ ████ ███ ███ ████████</span></p>
                    <p>H141-V <span>████████ ██ ████████</span></p>
                </div>
                <br/>
                {/* Section 23 */}
                <div className="censored">
                    <p>H141-O <span>█ ███ █████ ██████</span></p>
                    <p>H141-O <span>████ ███ ███████</span></p>
                    <p>H141-O <span>██████ ██ ███</span></p>
                    <p>H141-O <span>███</span></p>
                    <p>H141-O <span>██ ███ █████</span></p>
                    <p>H141-O <span>███ █ ███████ █████</span></p>
                </div>
                <br/>
                {/* Section 24 */}
                <div className="censored">
                    <p>H142-V <span>██████ ██ ██████ ████ ████ ███ ██████████</span></p>
                    <p>H142-V <span>██████ ██ ███ █████</span></p>
                    <p>H142-V <span>████</span></p>
                    <p>H142-V <span>█████ ██ ███ ███████</span></p>
                </div>
                <br/>
                {/* Section 25 */}
                <div className="censored">
                    <p>H142-V <span>██████ ████████</span></p>
                    <p>H142-V <span>██████ ██ ███ ███████</span></p>
                    <p>H142-V <span>██████ ██ ███ █████</span></p>
                    <p>H142-V <span>██████ ██ ███ ████████</span></p>
                    <p>H142-V <span>██████ ██ ███ ████ ████████</span></p>
                </div>
                <br/>
                {/* Section 26 */}
                <div className="censored">
                    <p>H143-P <span>█████ ████ ██████ ████</span></p>
                    <p>H143-P <span>███████ ███ █████████ ███ ███ █████████</span></p>
                    <p>H143-P <span>███ █████ ██ █████</span></p>
                    <p>H143-P <span>█████ ███ ███ ████████</span></p>
                    <p>H143-P <span>██ ████ ███████</span></p>
                </div>
                <h2 className="center row">THUS ENDS ██████</h2>
            </div>
        )
    }

    const SectionA = () => {
        return (
            <div style={{maxWidth: 1000, margin: "auto"}}>
                <h2 className="center row">Section A</h2>
                {/* Section 1 */}
                <div className="uncensored">
                    <p>A1-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>PLEASE WAIT...</span></p>
                    <p>A1-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>RECORDS ARE BEING REPAIRED...</span></p>
                </div>
            </div>
        )
    }

    const SectionW = () => {
        return (
            <div style={{maxWidth: 1000, margin: "auto"}}>
                <h2 className="center row">Section W</h2>
                {/* Section 1 */}
                <div className="uncensored">
                    <p>W1-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>PLEASE WAIT...</span></p>
                    <p>W1-X <span style={{color: "red", textShadow: "0px 0px 5px red"}}>RECORDS ARE BEING REPAIRED...</span></p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>THE OLD BURIED BOOK</h1>
            <div className="center row">
                <img src="https://i.imgur.com/F9q71Xd.png" onClick={ToggleSectionH} height={"50px"} title="H"></img>{" "}{" "}{" "}
                <img src="https://i.imgur.com/yN6Xr4m.png" onClick={ToggleSectionA} height={"50px"} title="A"></img>{" "}{" "}{" "}
                <img src="https://i.imgur.com/gx8bP9D.png" onClick={ToggleSectionW} height={"50px"} title="W"></img>
            </div>

            {
                bookSection === 0 ?
                <SectionH />
                : 
                <>
                </>
            }

            {
                bookSection === 1 ?
                <SectionA />
                : 
                <>
                </>
            }

            {
                bookSection === 2 ?
                <SectionW />
                : 
                <>
                </>
            }
        </div>
    )
}

export default Book