import React, { useEffect, useState } from 'react';
import offers from '../data/offers.json';
import '../styles/header.css';

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-offers">
      <p>{offers[currentIndex]}</p>
    </div>
  );
};

export default Header;
