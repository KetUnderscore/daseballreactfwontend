import './App.css';
import Router from './components/Router'
import Context from './components/Context'

function App() {

  const userInfo = {
    username: 'Ket',
    loggedIn: true,
    favTeam: 'None',
    favPlayer: 'None',
    coins: 10,
    bets: 10
  }

  return(
      <>
      <Context.Provider value={userInfo}>
        <Router />
      </Context.Provider>
    </>
  )
}

export default App;
