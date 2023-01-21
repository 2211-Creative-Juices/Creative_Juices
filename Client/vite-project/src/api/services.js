import React from 'react';
const APIURL = `http://localhost:8000/api`;

export const getAllServices = async () => {
  try {
    const response = await fetch(`${APIURL}/services`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};
