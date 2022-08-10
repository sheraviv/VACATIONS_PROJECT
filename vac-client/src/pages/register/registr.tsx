import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'
import { Alert, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';

import axios from "axios";

function Register() {
    const [userName, setuserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [password, setpassword] = useState('');
    const [configPassword, setConfigPassword] = useState('');

    const [error, setError] = useState('');

    


    const sendButtonHandler = async () => {
        if (!userName) return alert("need user name")
        if (!firstName) return alert("need  first name")
        if (!lastName) return alert("need  last name")
        if (!password) return alert("need enter password")
        if (!configPassword) return alert("need password")

        if (password !== configPassword) return alert("not good password")
        const payload = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
        }
        try {
            const { data } = await axios.post(`http://localhost:3500/regester`, payload)
            setuserName('')
            setFirstName('')
            setLastName('')
            setpassword('')
            setConfigPassword('')

            alert("registration done");
            return data

        } catch (err) {
            console.log(err)
        }
    }
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


                    <h4 className="center-align">Registration</h4>
                    <div className="formDiv">
                        <TextField value={userName} className="col s12 m6 offset-m3 l4 offset-l4" label="User Name" variant="outlined"
                            onChange={(e) => setuserName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={firstName} className="col s12 m6 offset-m3 l4 offset-l4" label="First Name" variant="outlined"
                            onChange={(e) => setFirstName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={lastName} className="col s12 m6 offset-m3 l4 offset-l4" label="Last Name" variant="outlined"
                            onChange={(e) => setLastName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={password} className="col s12 m6 offset-m3 l4 offset-l4" label="Password" variant="outlined"
                            onChange={(e) => setpassword(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={configPassword} id="input" className="col s12 m6 offset-m3 l4 offset-l4" label=" Config Password" variant="outlined"
                            onChange={(e) => setConfigPassword(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <Button className="col s2 m2 offset-m3 2 offset-l5 teal lighten-2 " variant="contained"
                            onClick={sendButtonHandler}>Register</Button>
                    </div>


                </div>
                <div className="center-align"><Link to="/">Back to Login Page</Link></div>
            </div>
        </>
    );
}
export { Register };
