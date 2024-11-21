import logo from '../assets/images/baseball.png'
import { useState, useEffect, useContext } from 'react';
import Context from './Context';

function Header() {
    const userData = useContext(Context)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    }

    return (
      <nav className="nav-bar">
        <div className="titlebox">
          <a href="/" ><img src={ logo } alt="Logo" className="logo" /></a>
          <h1 className="title">  Season 5 - OUTBREAK</h1>
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
        </ul>
      </nav>
    )
  }

  export default Header;