import React from 'react';
const APIURL = `https://creative-juices.fly.dev/api`;

export const getAllBundles = async () => {
  console.log('calling get all bundles...');

  try {
    const response = await fetch(`${APIURL}/bundles`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};
