import logo from '../assets/images/baseball.png'
import { useContext } from 'react';
import Context from './Context';

function Header() {
    const userData = useContext(Context)

    return (
      <nav className="nav-bar">
        <a href="/" ><img src={ logo } alt="Logo" className="logo" /></a>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/mods">Mods</a>
          </li>
          <li>
            <a href="/players">Players</a>
          </li>
          <li>
            <a href="/teams">Teams</a>
          </li>
          <li>
            <a href="/games">Games</a>
          </li>
        </ul>
      </nav>
    )
  }

  export default Header;