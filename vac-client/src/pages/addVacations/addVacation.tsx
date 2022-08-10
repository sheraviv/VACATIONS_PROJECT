import { useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from '../../server/index.axios'


import { Alert, TextField } from "@mui/material";
import axios from "axios";
import { DatePickerEnd, DatePickerStart } from "../../components/DatePickerEnd";

function AddVacationForm() {
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const [date_start, setDate_start] = useState(`${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate() + 1}`);
    const [date_end, setDate_end] = useState(`${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate() + 1}`)
    const [price, setPrice] = useState(0);

    const [error, setError] = useState('');

   

    const sendButtonHandler = async () => {

        if (destination === '') { return alert("need name") }
        if (destination.length > 50) { return alert("to long") }
        if (description === '') { return alert("need description") }
        if (picture === '') { return alert("need picture") }
        if (!date_start) { return alert("need date") }
        if (!date_end) { return alert("need date") }
        if (price < 1) { return alert("need price") }

        let currentPicture = picture
        if (currentPicture.includes('http') === false) { currentPicture = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg" }


        const payload = {
            destination: destination,
            description: description,
            picture: currentPicture,
            date_start: date_start,
            date_end: date_end,
            price: price,
        }
        try {
            const { data } = await axiosInstance.post(`http://localhost:3500/vacations/`, payload)
            setDestination('')
            setDescription('')
            setPicture('')
            
            setPrice(0)
            alert("Success");
            return data

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row ">

                    {error ? <Alert severity="error" style={{
                        position: "fixed",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: "40%",
                        top: "0%",
                        right: "40%",
                        textAlign: 'center',
                        zIndex: 3,
                    }}>{error}</Alert> : null}

                    <h3 className="center-align ">Add New Vacation</h3>
                    <div>

                        <div className="formDiv">
                            <TextField value={destination} className="col s12 m6 offset-m3 l4 offset-l4 " label="destination" variant="outlined"
                                onChange={(e) => setDestination(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">

                            <TextField value={description} className="col s12 m6 offset-m3 l4 offset-l4 " label="description" variant="outlined"
                                onChange={(e) => setDescription(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">


                            <TextField value={picture} className="col s12 m6 offset-m3 l4 offset-l4 " label="picture" variant="outlined"
                                onChange={(e) => setPicture(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">


                            <TextField value={Number(price)} className="col s12 m6 offset-m3 l4 offset-l4 "
                                type="number"
                                inputProps={{ min: 0, max: 100000 }}

                                label="price" variant="outlined"
                                onChange={(e) => setPrice(Number(e.target.value))} /><br />

                        </div>
                        <div className="formDiv">

                            <div className="col s12 m6 offset-m3 l4 offset-l4 center-align">
                                <p >Date Start:</p>

                                <DatePickerStart
                                    date_start={date_start}
                                    setDate_start={setDate_start}
                                />

                                <p >Date End:</p>

                                <DatePickerEnd date_end={date_end}
                                    setDate_end={setDate_end}
                                />
                            </div>
                        </div>



                        <Button className="col s2 m2 offset-m3 2 offset-l5 teal lighten-2" variant="contained"
                            onClick={sendButtonHandler}>Post</Button>

                    </div>
                </div>
            </div>
        </>
    );
}
export { AddVacationForm };
