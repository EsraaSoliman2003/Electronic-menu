import React from 'react';
import menuData from '../data/menu.json';
import ItemCard from './ItemCard';
import '../styles/CategoryList.css';


const CategoryList = () => {
  return (
    <div className="category-list">
      {menuData.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.category}</h2>
          <div className="items-grid">
            {category.items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
