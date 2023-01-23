import React from 'react';

const AllBundles = ({ bundles }) => {
  return (
    <div id='bundles-container'>
      <h2 id='bundles-header'>Bundles</h2>
      <div id='bundles-map-container'>
        {bundles &&
          bundles.map((bundle) => {
            return (
              <div
                key={bundle.id}
                className='bundle'
              >
                <h3>Bundle Name: {bundle.bundlename}</h3>
                <p>Quantity: {bundle.quantity}</p>
                <p>Bundle Cost: {bundle.bundlecost}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllBundles;
