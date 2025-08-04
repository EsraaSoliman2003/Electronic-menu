import React from 'react';

const MenuItem = ({ name, price, image }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-2">
      <img src={`/images/${image}`} alt={name} className="w-16 h-16 mr-4" />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-green-600">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;