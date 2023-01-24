import React from 'react';
import { authenticateUser } from '../api/auth';
import { Link } from 'react-router-dom';
import { useAuth } from '../custom-hooks';

const AuthForm = ({ name, buttonName }) => {
  const { updateAuthStatus } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formName = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (!username || !password || password.length < 5) {
      console.log('Either no input or password too short');
      return;
    }
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
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        name={name}
      >
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
          />
        </div>
        {name === 'login' ? (
          <button>{buttonName}</button>
        ) : (
          <div>
            <label htmlFor='name'>Full Name:</label>
            <input
              type='text'
              name='fullname'
            />
            <label htmlFor='zip'>ZIP code:</label>
            <input
              type='text'
              name='zipcode'
            />
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
            />
            <button>{buttonName}</button>
          </div>
        )}
      </form>
      {name === 'login' ? (
        <p>
          Not a user yet?
          <Link to='/signup'>Sign Up Here</Link>!
        </p>
      ) : (
        <p>
          Alreay have an account?
          <Link to='/login'>Login Here</Link>!
        </p>
      )}
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
