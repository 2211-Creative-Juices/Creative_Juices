import { useAuth } from '../custom-hooks';
import { React, useState } from 'react';
import { createService } from '../api/services';
import { AuthContext } from '../context/AuthContext';

const ServiceForm = ({ service, setService }) => {
  const user = useAuth();
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [guests, setGuests] = useState(0);

  //************* CHECK BOX STATE **************/
  const [isBrewery, setBreweryLocation] = useState('');
  const [isBreweryChecked, setBreweryIsChecked] = useState(false);
  const [isCoffee, setCoffeeLocation] = useState('');
  const [isCoffeeChecked, setCoffeeIsChecked] = useState(false);
  const [isHome, setHomeLocation] = useState('');
  const [isHomeChecked, setHomeIsChecked] = useState(false);
  const [isOther, setOtherLocation] = useState('');
  const [isOtherChecked, setOtherIsChecked] = useState(false);
  const [adult, setAdult] = useState('');
  const [isAdult, setIsAdultChecked] = useState(false);
  const [kid, setKid] = useState('');
  const [isKid, setIsKidChecked] = useState(false);

  const submitHandler = async (e) => {
    console.log('thi is isAdult', adult);
    try {
      e.preventDefault();
      if (isHome.length > 0) {
        setLocation(isHome);
      }

      if (isCoffee.length > 0) {
        setLocation(isCoffee);
      }

      if (isBrewery.length > 0) {
        setLocation(isBrewery);
      }

      if (isOther.length > 0) {
        setLocation(isOther);
      }

      if (adult) {
        await setType(adult);
      }

      if (kid.length > 0) {
        setType(kid);
      }
      console.log('this is the selected loca:', location);
      console.log('this is the selected type:', type);
      console.log('this is the set date:', date);
      console.log('these are the notes', notes);
      console.log('number of guests', guests);
      console.log('user:', user);
      console.log('cost:', cost);

      const newService = await createService(
        user.token,
        type,
        isRemote,
        guests,
        cost,
        location,
        date,
        notes
      );

      console.log('this is the new service!', newService);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id='service-form'>
      <form onSubmit={(e) => submitHandler(e)}>
        <div id='service-form-inputs'>
          <div>
            {' '}
            Type:
            <label>
              Adults
              <input
                id='adult'
                label='Adult'
                value='adult'
                type='checkbox'
                // checked={isAdult}
                onChange={(e) => {
                  setIsAdultChecked(!isAdult);
                  setAdult(e.target.value);
                  // adult ? setType(adult) : setType('');
                }}
              ></input>
            </label>{' '}
            Type:
            <label>
              Kid
              <input
                id='kid'
                label='Kid'
                value='kid'
                type='checkbox'
                checked={isKid}
                onChange={(e) => {
                  setIsKidChecked(e.target.checked);
                  setKid(e.target.value);
                }}
              ></input>
            </label>
          </div>
          <div>
            <label>
              # of Guests
              <input
                type='number'
                value={guests}
                id='input'
                onChange={(e) => {
                  setGuests(e.target.value);
                  setCost(20 * e.target.value);
                }}
              ></input>
            </label>
          </div>
          <div>
            Location
            <label>
              Brewery
              <input
                id='brewery'
                label='brewery'
                value='brewery'
                type='checkbox'
                checked={isBreweryChecked}
                onChange={(e) => {
                  setBreweryIsChecked(e.target.checked);
                  setBreweryLocation(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Coffee Shop
              <input
                id='coffee-shop'
                label='coffee-shop'
                value='coffee-shop'
                type='checkbox'
                checked={isCoffeeChecked}
                onChange={(e) => {
                  setCoffeeIsChecked(e.target.checked);
                  setCoffeeLocation(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Home
              <input
                id='home'
                label='home'
                value='home'
                type='checkbox'
                checked={isHomeChecked}
                onChange={(e) => {
                  setHomeIsChecked(e.target.checked);
                  setHomeLocation(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Other
              <input
                id='other'
                label='other'
                value='other'
                type='checkbox'
                checked={isOtherChecked}
                onChange={(e) => {
                  setOtherIsChecked(e.target.checked);
                  setOtherLocation(e.target.value);
                }}
              ></input>
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
    </div>
  );
};
export default ServiceForm;
