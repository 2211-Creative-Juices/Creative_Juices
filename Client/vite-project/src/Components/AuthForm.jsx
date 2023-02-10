import React, { useState } from 'react';
import { authenticateUser } from '../api/auth';
import { Link } from 'react-router-dom';
import { useAuth } from '../custom-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const eye = <FontAwesomeIcon icon={faEye} />;
import './style.css';

const AuthForm = ({ name, buttonName }) => {
  const { user, token } = useAuth();
  const { updateAuthStatus } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formName = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (!username || !password) {
      alert('you need a valid username and password');
      console.log('Either no input or password too short');
      return;
    }
    if (password.length < 8) {
      alert('password must be 8 or more characters');
      return;
    }
    // if (name === 'login' && user.user.password != event.target.password.value) {
    //   alert('password is incorrect');
    //   return;
    // }
    // if (name === 'login' && user.user.username != event.target.username.value) {
    //   alert('password is incorrect');
    //   return;
    // }
    if (formName === 'login') {
      await authenticateUser(username, password, formName);
      updateAuthStatus();
    } else {
      const fullName = event.target.fullname.value;
      const zipcode = event.target.zipcode.value;
      const email = event.target.email.value;

      await authenticateUser(
        username,
        password,
        formName,
        fullName,
        zipcode,
        email
      );
      updateAuthStatus();
    }

    const reload = () => {
      window.location.href = '/';
    };
    reload();

    // if (token) {
    //   const reload = () => {
    //     window.location.href = '/';
    //   };
    //   reload();
    // } else {
    //   console.log('not a user, sign up!');
    // }
  };

  return (
    <div id='whole-login-form-box'>
      {name === 'login' ? (
        <div>
          <h2>Welcome Back!</h2>
          <h3>Please Log in.</h3>
        </div>
      ) : (
        <div>
          <h2>Welcome To Creative Juices!</h2>
          <h3>Please Register Here.</h3>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        name={name}
      >
        <div className='login-form'>
          {' '}
          {/* <div className='login-form'> */}
          <label htmlFor='username'>Username </label>
          <input
            type='text'
            name='username'
          />
          {/* </div> */}
          {/* <div > */}
          <label htmlFor='password'>Password </label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name='password'
          />
          {/* </div> */}
        </div>
        <i
          id='eyeball'
          onClick={togglePasswordVisiblity}
        >
          {eye}
        </i>{' '}
        <p> password must be at least 8 characters long</p>
        {name === 'login' ? (
          <button className='login-button'>{buttonName}</button>
        ) : (
          <div>
            <div className='login-form'>
              {/* <div  className='login-form'> */}
              <label htmlFor='name'>Full Name </label>
              <input
                type='text'
                name='fullname'
              />
              {/* </div> */}

              {/* <div  className='login-form'> */}
              <label htmlFor='zip'>ZIP code </label>
              <input
                type='text'
                name='zipcode'
              />
              {/* </div> */}

              {/* <div  > */}
              <label htmlFor='email'>Email </label>
              <input
                type='text'
                name='email'
              />
              {/* </div> */}
            </div>
            <button className='login-button'>{buttonName}</button>
          </div>
        )}
      </form>
      <div>
        {name === 'login' ? (
          <p>
            Not a user yet?
            <Link
              to='/signup'
              className='login-links'
            >
              Sign Up Here
            </Link>
            !
          </p>
        ) : (
          <p>
            Already have an account?
            <Link
              to='/login'
              className='login-links'
            >
              Login Here
            </Link>
            !
          </p>
        )}
      </div>
    </div>
  );
};

export const Login = (
  <AuthForm
    name={'login'}
    buttonName={'Login'}
  />
);
export const Signup = (
  <AuthForm
    name={'register'}
    buttonName={'Register'}
  />
);
