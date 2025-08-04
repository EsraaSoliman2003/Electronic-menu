import React from 'react';
import MenuItem from './MenuItem';

const MenuSection = ({ title, items }) => {
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold text-orange-600">{title}</h2>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default MenuSection;