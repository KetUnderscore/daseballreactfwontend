import {useRef, useState, useEffect} from "react"
const { connectString } = require('../config.json')

const USER_REGEX = /^[A-z][A-z0-9-_]{3,31}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,32}$/;

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])
    
    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        console.log(errMsg)
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        const body = {
            username: user,
            password: pwd
        };

        try {
            console.log(JSON.stringify({
                username: user,
                password: pwd
            }))
            const response = await fetch(connectString + 'users/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user,
                    password: pwd
                }),
            });
            // Reset States
            setUser('')
            setPwd('')
            setMatchPwd('')
            if (response?.status === 409) {
                setErrMsg('Username Taken')
                setUser('')
                setPwd('')
                setMatchPwd('')
                setSuccess(false)
                return
            }
            if (response?.status === 503) {
                setErrMsg('Server Unavailable')
                setUser('')
                setPwd('')
                setMatchPwd('')
                setSuccess(false)
                return
            }
            if (response?.status === 401) {
                setErrMsg('Unauthorized')
                setUser('')
                setPwd('')
                setMatchPwd('')
                setSuccess(false)
                return
            }
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
            setSuccess(false)
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successfully Registered!</h1>
                    <h1>
                        <a href="/signin">Sign In</a>
                    </h1>
                </section>
            ) : (
                <section className="registry">
                    <h1>Register</h1>
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
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <br/>4 to 32 characters. <br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
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
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <br/>4 to 32 characters. <br/>
                                Must include upercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: ! @ # $ %.
                            </p>
                        </p>

                        <br/>
                        
                        <p>
                            <label htmlFor='confirm_pwd'>
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <br/>Must match first password input field.
                            </p>
                        </p>

                        <br/>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                            Sign Up
                        </button>
                    </form>

                    <p>
                        Already registered?<br/>
                        <a href="/signin">Sign In</a>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register