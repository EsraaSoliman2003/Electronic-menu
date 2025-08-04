import { useState } from 'react';

function Drawer({ onColorChange, onLogoChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#ff6200');

  const handleSave = () => {
    onColorChange(color);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded">
        Customize
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Customize Menu</h2>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={onLogoChange}
              className="mb-4"
            />
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
              Save
            </button>
            <button onClick={() => setIsOpen(false)} className="ml-2 bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;