import logo from '../assets/images/baseball.png'
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import Cookies from 'js-cookie';
const { connectString } = require('../config.json')

function Header() {
    let userinfo = {}
    const [open, setOpen] = useState(false);
    const [openP, setOpenP] = useState(false);

    let userData = JSON.parse(localStorage.getItem("userInfo"))

    const handleOpen = () => {
      setOpen(!open);
      setOpenP(false);
    }

    const handleOpenProf = async () => {
      /* let response = await fetch(connectString + 'auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredntials: true,
          credentials: 'include',
          body: JSON.stringify({
              username: userData.username
          }),
      })
      .then(response=>response.json())
      .then(data=>{ 
          localStorage.setItem("userInfo", JSON.stringify(data))
       }) */
      setOpenP(!openP);
      setOpen(false);
    }

    return (
      <nav className="nav-bar">
        <div className="titlebox">
          <a href="/" ><img src={ logo } alt="Logo" className="logo" /></a>
          <h1 className="title">Season 7 - Coffee Break?</h1>
        </div>
        <br/>
        <ul className='wrap-me'>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/games">Games</a>
          </li>
          <li className="dropdown">
            <a onClick={handleOpen}>Info</a>
            {open ? (
              <ul className="menu">
                <li>
                  <a href="/schedule">Schedule</a>
                </li>
                <li>
                  <a href="/teams">Teams</a>
                </li>
                <li>
                  <a href="/players">Players</a>
                </li>
                <li>
                  <a href="/mods">Mods</a>
                </li>
              </ul>
            ) : null}
          </li>
          <li className="dropdown">
            { userData ?
            <>
              <a onClick={handleOpenProf}>Profile</a>
              {openP ? (
                <ul className="menu">
                  <li>
                    <a><img src="https://i.imgur.com/pf9t6B1.png" height="15px" title="Coin."></img> {userData.coins}</a>
                  </li>
                  <li>
                    <a><img src="https://i.imgur.com/yyoLqpN.png" height="15px" title="Ticket."></img> {userData.bets}</a>
                  </li>
                  <li>
                    <a href="/profile"> Profile </a>
                  </li>
                </ul>
              ) : null}
            </>
            : <a href="/register"> Register </a>
            }
          </li>
        </ul>
      </nav>
    )
  }

  export default Header;