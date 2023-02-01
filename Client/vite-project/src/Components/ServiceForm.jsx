import { useAuth } from '../custom-hooks';
import { React, useState, useEffect } from 'react';
import { createService } from '../api/services';
import { createNewOrder } from '../api/orders';
import AllServices from './Services';

const ServiceForm = ({ services, todaysDate }) => {
  const user = useAuth();
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [guests, setGuests] = useState(0);

  //************* CHECK BOX STATE **************/
  const [isBreweryChecked, setBreweryIsChecked] = useState(false);
  const [isCoffeeChecked, setCoffeeIsChecked] = useState(false);
  const [isHomeChecked, setHomeIsChecked] = useState(false);
  const [isOtherChecked, setOtherIsChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isKidChecked, setIsKidChecked] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      let newService = await createService(
        user.token,
        type,
        isRemote,
        guests,
        cost,
        location,
        date,
        notes
      );

      console.log('HTIS IS MY NEWSERVCIE', newService);

      let serviceId = newService.id;
      console.log('NEW SERVICEID', serviceId);
      let todaysOrderDate = todaysDate;
      console.log('NEW dateeeeee', todaysOrderDate);
      let purchaserId = user.user.id;
      console.log('NEW users.users.id', user.user.id);
      // let bundlekitId = 0;
      // let isintheCart = setisinCart(true);
      // console.log('NEW isintheCart', isintheCart);
      const newOrder = await createNewOrder(
        user.token,
        todaysOrderDate,
        purchaserId,

        serviceId
        // bundlekitId
      );
      console.log('THIS IS THE NEW ORDERBABYYYY', newOrder);

      // console.log('this is the new service!', newService);
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
                checked={isAdultChecked}
                onChange={(e) => {
                  setIsAdultChecked(!isAdultChecked);
                  setType(e.target.value);
                  isKidChecked && setIsKidChecked(!isKidChecked);
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
                checked={isKidChecked}
                onChange={(e) => {
                  setType(e.target.value);
                  setIsKidChecked(!isKidChecked);
                  isAdultChecked && setIsAdultChecked(!isAdultChecked);
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
                  setBreweryIsChecked(!isBreweryChecked);
                  setLocation(e.target.value);
                  isOtherChecked && setOtherIsChecked(!isOtherChecked);
                  isCoffeeChecked && setCoffeeIsChecked(!isCoffeeChecked);
                  isHomeChecked && setHomeIsChecked(!isHomeChecked);
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
                  setCoffeeIsChecked(!isCoffeeChecked);
                  setLocation(e.target.value);
                  isBreweryChecked && setBreweryIsChecked(!isBreweryChecked);
                  isOtherChecked && setOtherIsChecked(!isOtherChecked);
                  isHomeChecked && setHomeIsChecked(!isHomeChecked);
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
                  setHomeIsChecked(!isHomeChecked);
                  setLocation(e.target.value);
                  isBreweryChecked && setBreweryIsChecked(!isBreweryChecked);
                  isOtherChecked && setOtherIsChecked(!isOtherChecked);
                  isCoffeeChecked && setCoffeeIsChecked(!isCoffeeChecked);
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
                  setOtherIsChecked(!isOtherChecked);
                  setLocation(e.target.value);
                  isBreweryChecked && setBreweryIsChecked(!isBreweryChecked);
                  isCoffeeChecked && setCoffeeIsChecked(!isCoffeeChecked);
                  isHomeChecked && setHomeIsChecked(!isHomeChecked);
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
      <div>
        <AllServices services={services} />
      </div>
    </div>
  );
};
export default ServiceForm;
