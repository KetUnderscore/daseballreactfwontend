import logo from '../assets/images/baseball.png'

function Header() {
    return (
      <nav className="nav-bar">
        <img src={ logo } alt="Logo" className="logo" />
        <ul>
          <li>
            <a href="https://discord.gg/UZ3TfurF4N">Discord</a>
          </li>
        </ul>
      </nav>
    )
  }

  export default Header;