import { React, useState } from 'react';
import { createService } from '../api/services';
// import Dropdown from './Dropdown';

const ServiceForm = ({ service, setService }) => {
  const [type, setType] = useState('');
  const [guests, setGuests] = useState(0);
  const [cost, setCost] = useState(0.0);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [isBrewery, setBreweryLocation] = useState();
  const [isBreweryChecked, setBreweryIsChecked] = useState(false);
  const [isCoffee, setCoffeeLocation] = useState();
  const [isCoffeeChecked, setCoffeeIsChecked] = useState(false);
  const [isHome, setHomeLocation] = useState();
  const [isHomeChecked, setHomeIsChecked] = useState(false);
  const [isOther, setOtherLocation] = useState();
  const [isOtherChecked, setOtherIsChecked] = useState(false);
  

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // const newService = await createService(
      //   // token,
      //   type,
      //   guests,
      //   cost,
      //   location,
      //   date,
      //   notes,
      //   isActive
      // );
      console.log('this is the isBreweryState in submitHandler', isOther);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id='service-form'>
      <form onSubmit={submitHandler}>
        <div id='service-form-inputs'>
          <div>IsRemote Dropdown</div>
          <div>add/sub clicker</div>
          <div>Location
            <label>Brewery
            <input id='brewery'
                label='brewery'
                value='brewery'
                type='checkbox'
                checked={isBreweryChecked}
                onChange={(e) => {
                  setBreweryIsChecked(e.target.checked);
                  setBreweryLocation(e.target.value);
                }}>
              </input>
              </label>
              <label>Coffee Shop
              <input id='coffee-shop'
                label='coffee-shop'
                value='coffee-shop'
                type='checkbox'
                checked={isCoffeeChecked}
                onChange={(e) => {
                  setCoffeeIsChecked(e.target.checked);
                  setCoffeeLocation(e.target.value);
                }}>
              </input>
              </label>
              <label>Home
              <input id='home'
                label='home'
                value='home'
                type='checkbox'
                checked={isHomeChecked}
                onChange={(e) => {
                  setHomeIsChecked(e.target.checked);
                  setHomeLocation(e.target.value);
                }}>
              </input>
              </label>
              <label>Other
              <input id='other'
                label='other'
                value='other'
                type='checkbox'
                checked={isOtherChecked}
                onChange={(e) => {
                  setOtherIsChecked(e.target.checked);
                  setOtherLocation(e.target.value);
                }}>
              </input>
              </label>
          </div>
          <div>
            <input
              value={date}
              type='text'
              placeholder='Date of Event'
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <input
              value={notes}
              type='text'
              placeholder='Additional notes for Shelley'
              onChange={(e) => setNotes(e.target.value)}
            ></input>
            <label>
              Select Here to make it Virtual!
              <input
                id='dropdown-virtual'
                type='checkbox'
                checked={isRemote}
                onChange={(e) => {
                  setIsRemote(e.target.checked);
                }}
              ></input>
            </label>

            <button onClick={submitHandler} type={'submit'}>
              Submit
            </button>
          </div>
        </div>
      </form>
      {/* <Dropdown isRemote={isRemote} /> */}
    </div>
  );
};
export default ServiceForm;
