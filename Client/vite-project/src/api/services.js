import React from 'react';
const APIURL = `https://creative-juices.fly.dev/api`;

export const getAllServices = async () => {
  try {
    const response = await fetch(`${APIURL}/services`);
    const results = await response.json();
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
  try {
    const response = await fetch(`${APIURL}/services`, {
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
    return results;
  } catch (error) {
    throw error;
  }
};
