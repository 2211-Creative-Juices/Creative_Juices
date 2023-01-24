import {React, useState} from "react";
import { createService } from "../api/services"

const ServiceForm = ({service, setService}) => {
    const [type, setType] = useState ('');
    const [guests, setGuests] = useState (0);
    const [cost, setCost] = useState (0.0);
    const [location, setLocation] = useState ('');
    const [date, setDate] = useState ('');
    const [notes, setNotes] = useState ('');
    const [isActive, setIsActive] = useState (false);
    const submitHandler = async (e) => {
    try {
        e.preventDefault();
    } catch (error) {
        console.error(error);
    }
};
return (
    <div id='service-form'>
        <form onSubmit={submitHandler}>
            <div id='service-form-inputs'>
                <div>Service Type Dropdown</div>
                <div>IsRemote Dropdown</div>
                <div>add/sub clicker</div>
                <div>Location Dropdown</div>
                <div>
                    <input value={date} 
                    type="text" 
                    placeholder="Date of Event" 
                    onChange={(e) => setDate(e.target.value)}></input>
                    <input value={notes} 
                    type="text" 
                    placeholder="Additional notes for Shelley" 
                    onChange={(e) => setNotes(e.target.value)}></input>
                <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>
)
};
export default ServiceForm;