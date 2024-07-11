import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Players from '../pages/Players'
import Player from '../pages/Player'
import Teams from '../pages/Teams'
import Team from '../pages/Team'
import Games from '../pages/Games'
import Mods from '../pages/Mods'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function Router () {

    const Layout = () => {
      return(
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )
    }

    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/mods" element={<Mods />} />
                    <Route path="players" element={<Players />} />
                    <Route path="player/" element={<Player />} />
                    <Route path="player/:id" element={<Player />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="team/:teamName" element={<Team />} />
                    <Route path="games" element={<Games />} />
                </Route>
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRoutes />
    );
}

export default Router