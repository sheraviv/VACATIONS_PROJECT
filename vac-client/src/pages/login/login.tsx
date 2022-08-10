
import { useState } from "react";
import { Alert, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {  AppDispatch } from '../../redux_features/store'
import { setUserName } from '../../redux_features/users/vacationsUserDataSlice'

function Login() {
    const [userNameLocal, setuserNameLocal] = useState('');
    const [passwordLocal, setpasswordLocal] = useState('');
    const [error, setError] = useState('');

   

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const sendButtonHandler = async () => {
        if (userNameLocal === '') { return alert('need username') }
        if (passwordLocal === '') { return alert('need  password') }

        const payload = {
            userName: userNameLocal,
            password: passwordLocal,
        }

        try {
            const { data } = await axios.post(`http://localhost:3500/login/`, payload)
            setTokenLS(data.token)
            setuserNameLocal('')
            setpasswordLocal('')
            dispatch(setUserName(userNameLocal))

            return data

        } catch (err) {
            console.log(err)
            alert("password alert")
            setuserNameLocal('')
            setpasswordLocal('')
        }
    }


    function setTokenLS(token: string) {
        if (!token) return;
        localStorage.setItem("token", token)
    }

    function getTokenLS() {
        return localStorage.getItem("token")
    }

    if (typeof getTokenLS() === "string") return <Navigate to="vacationsmain/" />;

    return (
        <>
            <div className="container">
                <div className="row">

                    {error ? <Alert severity="error" style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: "40%",
                        top: "0%",
                        right: "40%",
                        textAlign: 'center',
                    }}>{error}</Alert> : null}

                    <h4 className="center-align">Login</h4>
                    <div className="center-align">

                        <div className="formDiv">
                            <TextField value={userNameLocal} className="col s12 m6 offset-m3 l4 offset-l4" label="User Name" variant="outlined"
                                onChange={(e) => setuserNameLocal(e.target.value)} /><br />
                        </div>

                        <div className="formDiv">
                            <TextField value={passwordLocal} className="col s12 m6 offset-m3 l4 offset-l4" label="Password" variant="outlined"
                                onChange={(e) => setpasswordLocal(e.target.value)} /><br />

                        </div>
                        <Button className="col s2 m2 offset-m3 2 offset-l5 teal lighten-2 " variant="contained"
                            onClick={sendButtonHandler}>Login</Button><br />
                    </div>
                </div>

                <div className="center-align"><Link to="/registration">Or register new user</Link></div>
            </div>
        </>
    );
}
export { Login };
