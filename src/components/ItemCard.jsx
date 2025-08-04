import React from 'react';
import '../styles/ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span className="item-price">{item.price} EGP</span>
    </div>
  );
};

export default ItemCard;
