import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Players from '../pages/Players'
import Player from '../pages/Player'
import Teams from '../pages/Teams'
import Team from '../pages/Team'
import Games from '../pages/Games'
import Schedule from '../pages/Schedule'
import Mods from '../pages/Mods'
import Register from '../pages/Register'
import Login from '../pages/SignIn'
import Profile from '../pages/Profile'
import Book from '../pages/Book'
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
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/mods" element={<Mods />} />
                    <Route path="players" element={<Players />} />
                    <Route path="player/" element={<Player />} />
                    <Route path="player/:id" element={<Player />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="team/:teamName" element={<Team />} />
                    <Route path="games" element={<Games />} />
                    <Route path="Schedule" element={<Schedule />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/book" element={<Book />} />
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