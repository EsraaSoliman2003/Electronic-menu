import { useState, useEffect } from 'react';

function Slider() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const offers = [
    { id: 1, text: '20% off Grilled Chicken!' },
    { id: 2, text: 'Buy 1 Get 1 Free on Kofta!' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-yellow-500 text-white text-center py-2">
      <p>{offers[currentOffer].text}</p>
    </div>
  );
}

export default Slider;