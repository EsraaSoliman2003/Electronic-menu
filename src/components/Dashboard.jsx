import React, { useState } from 'react';

const Dashboard = ({ onUpdate }) => {
  const [logo, setLogo] = useState('');
  const [color, setColor] = useState('#ffcc00');
  const [items, setItems] = useState({
    "Mighty Mini Meals": [{ name: "Chicken Little Nuggets", price: "6.99", image: "nuggets.png" }],
  });

  const handleUpdate = () => {
    onUpdate({ logo, color, items });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <label>Logo URL: <input value={logo} onChange={e => setLogo(e.target.value)} className="border p-2" /></label>
      </div>
      <div className="mb-4">
        <label>Theme Color: <input type="color" value={color} onChange={e => setColor(e.target.value)} className="border p-2" /></label>
      </div>
      <div>
        <h3 className="text-lg font-bold">Edit Items</h3>
        {Object.entries(items).map(([section, sectionItems]) => (
          <div key={section} className="mb-2">
            <h4 className="font-bold">{section}</h4>
            {sectionItems.map((item, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input value={item.name} onChange={e => {
                  const newItems = { ...items };
                  newItems[section][idx].name = e.target.value;
                  setItems(newItems);
                }} className="border p-1 mr-2" />
                <input value={item.price} onChange={e => {
                  const newItems = { ...items };
                  newItems[section][idx].price = e.target.value;
                  setItems(newItems);
                }} className="border p-1 mr-2" />
                <input value={item.image} onChange={e => {
                  const newItems = { ...items };
                  newItems[section][idx].image = e.target.value;
                  setItems(newItems);
                }} className="border p-1" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white p-2 rounded">Update</button>
    </div>
  );
};

export default Dashboard;