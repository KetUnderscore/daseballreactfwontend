import {useRef, useState, useEffect, useContext} from "react"
import AuthContext from "../context/AuthProvider";
import DataContext from "../context/DataContext";
import Cookies from 'js-cookie';
const { connectString } = require('../config.json')

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const { userData, setData, clearContext } = useContext(DataContext)
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [userDatas, setUserData] = useState(false)

    const [userDataUsed, setuserDataUsed] = useState(null)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let response = await fetch(connectString + 'auth/', {
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
            })
            console.log(response)
            localStorage.setItem("userInfo", response.body)
            localStorage.setItem("dawg", 10)
            // Reset States
            setuserDataUsed(response.data)
            setUser('')
            setPwd('')
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
        {success ? (
                <section>
                    <h1>Successfully Signed In!</h1>
                    <h1>
                        <a href="/">Home</a>
                    </h1>
                </section>
            ) : (
                <section className="registry">
                    <h1>Sign In</h1>
                    <p ref={errRef} className={errMsg ? "instructions" : "instructions"}>
                        {errMsg}
                    </p>
                    <form onSubmit={handleSubmit}>
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

                        <button>
                            Sign In
                        </button>
                    </form>

                    <p>
                        Don't have an account?<br/>
                        <a href="/register">Sign Up</a>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login