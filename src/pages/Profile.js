import logo from '../assets/images/baseball.png'
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const { connectString } = require('../config.json')

function Header() {
    const navigate = useNavigate();

    const userRef = useRef()
    const errRef = useRef()
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleOpen = () => {
      setOpen(!open);
    }
    
    let userData = Cookies.get("userInfo")
    if (userData?.length > 0) {
        userData = JSON.parse(userData)
    } else {
        setSuccess(true)
    }

    const handleSignOut = async (e) => {
        Cookies.remove("jwt")
        Cookies.remove("userInfo")
        navigate('/');
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(connectString + 'auth/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredntials: true,
                credentials: 'include',
                body: JSON.stringify({
                    username: user,
                    password: pwd
                }),
            });
            // Reset States
            console.log(response)
            setUser('')
            setPwd('')
            if (JSON.stringify(response).length < 1) {
                setErrMsg('ERROR')
                setSuccess(false)
                return
            }
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
                console.log(err)
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 409) {
                setErrMsg('Incorrect Password')
            } else {
                setErrMsg('Login Failed')
            }
            setSuccess(false)
            errRef.current.focus()
        }
    }

    return (
      <>
        {
        success ? (
            <section>
                <h1>You've Been Signed Out!</h1>
                <h1>
                    <a href="/">Home</a>
                </h1>
            </section>
        ) : (
            <section className="registry">
                <h1>Info</h1>
                <p>Username: { userData?.username }</p>
                <p>Coins: { userData?.coins }</p>
                <p>Votes: { userData?.bets }</p>
                <p>Team: { userData?.favTeam }</p>
                <p>Icon: { userData?.favPlayer }</p>
                <p>Item: { userData?.item.name }</p>
                <br/>
                
                <h1>Update Profile Info</h1>
                <form>
                    <br/>

                    <p>
                        <label htmlFor='username'>
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </p>

                    <br/>

                    <p>
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </p>

                    <br/>

                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={handleSignOut}>Sign Out</button>
                </form>
            </section>
        )}
      </>
    )
  }

  export default Header;