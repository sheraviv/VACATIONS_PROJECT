import { useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from '../../server/index.axios'
import { AppDispatch, RootState } from "../../redux_features/store";
import { useDispatch } from "react-redux";
import { setVcDataUpdated } from "../../redux_features/vacations/vacationsDataSlice";


import { Alert, TextField } from "@mui/material";
import { DatePickerEnd, DatePickerStart } from "../../components/DatePickerEnd";


function EditVacation(props: any) {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const { id, selectedEditMode, setSelectedEditMode, currentData } = props;

    const [destination, setdestination] = useState(currentData.destination);
    const [description, setdescription] = useState(currentData.description);
    const [picture, setpicture] = useState(currentData.picture);
    const [date_start, setdate_start] = useState(currentData.date_start.slice(-24, -14));
    const [date_end, setdate_end] = useState(currentData.date_end.slice(-24, -14));
    const [price, setprice] = useState(Number(currentData.price));
    const [error, setError] = useState('');

 
    const sendButtonHandler = async () => {
        if (destination === '') { return alert("need name") }
        if (destination.length > 50) { return alert("name is to longer") }
        if (description === '') { return alert("need description") }
        if (picture === '') { return alert("need picture") }
        if (!date_start) { return alert("need date_start") }
        if (!date_end) { return alert("need date") }
        if (price < 1) { return alert("need  price") }


        let currentPicture = picture
        if (currentPicture.includes('http') === false || currentPicture === '') { currentPicture = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg" }

        const payload = {
            destination: destination,
            description: description,
            picture: currentPicture,
            date_start: date_start,
            date_end: date_end,
            price: price,
        }
        try {
            const { data } = await axiosInstance.post(`http://localhost:3500/vacations/updatevacation/${id}`, payload)
            console.log(data)
            setdestination('')
            setdescription('')
            setpicture('')

            setprice(0)
          
            setSelectedEditMode(false)

            dispatch(setVcDataUpdated())
            return data

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <><div className="cardForm">
            <div className="container">

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

                <div className="row">
                    <h5 className="center-align">Update Vacation</h5>

                    <div className="miniFormDiv">
                        <TextField value={destination} className="col s12" label="destination" variant="outlined"
                            onChange={(e) => setdestination(e.target.value)} /><br />

                    </div>
                    <div className="miniFormDiv">
                        <TextField value={description} className="col m12" label="description" variant="outlined"
                            onChange={(e) => setdescription(e.target.value)} /><br />

                    </div>

                    <div className="miniFormDiv">
                        <TextField value={picture} className="col m12" label="picture" variant="outlined"
                            onChange={(e) => setpicture(e.target.value)} /><br />


                    </div>
                    <div className="miniFormDiv">
                        <TextField value={Number(price)} className="col m12" label="price" variant="outlined"
                            type="number"
                            inputProps={{ min: 0, max: 100000 }}
                            onChange={(e) => setprice(Number(e.target.value))} /><br />

                    </div>

                    <div className="col m12 offset-10 center-align">
                        <p >from:</p>
                        <DatePickerStart
                            date_start={date_start}
                            setdate_start={setdate_start}
                        />
                        <p >to:</p>
                        <DatePickerEnd date_end={date_end}
                            setdate_end={setdate_end}
                        />
                    </div>

                    <Button className="col s12 m6 offset-m3 l4 offset-l4 teal lighten-2" variant="contained"
                        onClick={sendButtonHandler}>Save</Button>
                </div>
            </div>
        </div>
        </>
    );
}
export { EditVacation };


