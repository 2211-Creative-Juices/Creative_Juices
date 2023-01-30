import React from 'react';
// const APIURL = `https://creative-juices.fly.dev/api`;
const BASE_API = `/api`;

export const getAllServices = async () => {
  try {
    const response = await fetch(`${BASE_API}/services`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getMyServices = async (token, username) => {
  console.log('token and user:', token, username);

  try {
    const response = await fetch(`${BASE_API}/services/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    console.log('this is results in services for me api', results);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createService = async (
  token,
  type,
  isremote,
  guests,
  cost,
  location,
  date,
  notes
) => {
  console.log('CS token:', token);
  console.log('CS this is the selected loca:', location);
  console.log('CS this is the selected type:', type);
  console.log('CS this is the set date:', date);
  console.log('CS these are the notes', notes);
  console.log('CS number of guests', guests);
  console.log('CS cost:', cost);
  try {
    const response = await fetch(`${BASE_API}/services`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        isremote,
        guests,
        cost,
        location,
        date,
        notes,
      }),
    });

    const results = await response.json();
    console.log('look at our results:', results);
    return results;
  } catch (error) {
    console.error('what a horrible happening:', error);
    throw error;
  }
};
