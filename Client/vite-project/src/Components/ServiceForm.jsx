import { useAuth } from '../custom-hooks';
import './ServiceStyle.css';
import collage from '../assets/images/collage.png';
import { React, useState, useEffect } from 'react';
import { createService } from '../api/services';
import { createNewOrder } from '../api/orders';
import { NavLink } from 'react-router-dom';
import AllServices from './Services';
import SlideShow from './SlideShow';
// import cjtimelapse from "../assets/videos/cjtimelapse.mp4"

const ServiceForm = ({ services, todaysDate }) => {
  const user = useAuth();
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [guests, setGuests] = useState(0);

  //************* LOGIN/REGISTER STATE **************/
  const [openPlease, setOpenPlease] = useState(false);
  const handlePlease = () => {
    setOpenPlease(!openPlease);
  };

  //************* CHECK BOX STATE **************/
  const [isBreweryChecked, setBreweryIsChecked] = useState(false);
  const [isCoffeeChecked, setCoffeeIsChecked] = useState(false);
  const [isHomeChecked, setHomeIsChecked] = useState(false);
  const [isOtherChecked, setOtherIsChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isKidChecked, setIsKidChecked] = useState(false);

  const redirHome = () => {
    window.location.href = '/';
    alert('Added To Your Cart!');
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (user.token) {
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

        let serviceId = newService.id;
        let todaysOrderDate = JSON.stringify(todaysDate);
        console.log('NEW dateeeeee', todaysOrderDate);
        let purchaserId = user.user.id;

        const newOrder = await createNewOrder(
          user.token,
          todaysOrderDate,
          purchaserId,
          serviceId
        );
        console.log('THIS IS THE NEW ORDERBABYYYY', newOrder);
        redirHome();
      } else {
        handlePlease();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='service-container'>
      <div id='flex-services'>
        <form id='service-form-big' onSubmit={(e) => submitHandler(e)}>
          <div id='service-form-inputs'>
            <h3>Customize Your Paint and Sip!</h3>
            <div id='type-box'>
              {' '}
              Type: &nbsp;&nbsp;
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
              <label>
                Kids
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
              <label id='guest-label'>
                # of Guests: &nbsp;
                <input
                  type='number'
                  value={guests}
                  id='input'
                  min='4'
                  max='20'
                  onChange={(e) => {
                    setGuests(e.target.value);
                    setCost(20 * e.target.value);
                  }}
                ></input>
              </label>
            </div>
            <div id='location-box'>
              Location: &nbsp;
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
              <br></br>
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
            </div>
            <div>
              <input
                value={notes}
                type='text'
                placeholder='Additional notes'
                onChange={(e) => setNotes(e.target.value)}
              ></input>
            </div>
            <div>
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
            </div>
            <button id='add-serv-butt' onClick={submitHandler} type={'submit'}>
              Add to Cart
            </button>
          </div>
        </form>
        {openPlease ? (
          <div id='not-a-user'>
            Please{' '}
            <span>
              <NavLink to='/signup'>register</NavLink>
            </span>{' '}
            or{' '}
            <span>
              <NavLink to='/login'>login! </NavLink>
            </span>
          </div>
        ) : null}

        {/* <div id='video-box'>
      <video width="100%" height="100%" >
  <source src={cjtimelapse.mp4} type='cjtimelapse/mp4'/>
Your browser does not support the video tag.
</video>
      </div> */}
      </div>
    </div>
  );
};
export default ServiceForm;
