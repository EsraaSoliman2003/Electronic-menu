import { useState } from "react";
import menuData from "../data/menu.json";
import EditDialog from "./EditDialog";

function MenuTabs({ colors, isEdit }) {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const [data, setData] = useState(menuData);

  const handleDelete = (category, itemIndex) => {
    const newData = { ...data };
    newData[category] = newData[category].filter((_, i) => i !== itemIndex);
    setData(newData);
  };
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
    details: "",
    price: "",
  });
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const handleEdit = (category, index) => {
    const item = data[category][index];
    setEditValues({
      name: item.name,
      details: item.details,
      price: item.price,
    });
    setEditCategory(category);
    setEditItemIndex(index);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const newData = { ...data };
    newData[editCategory][editItemIndex] = {
      ...newData[editCategory][editItemIndex],
      ...editValues,
      price: parseFloat(editValues.price),
    };
    setData(newData);
    setEditDialogOpen(false);
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    details: "",
    price: "",
    image: "",
  });

  const handleSaveNewItem = () => {
    const newData = { ...data };
    const item = {
      ...newItem,
      price: parseFloat(newItem.price),
      image: newItem.image || "/imgs/placeholder.jpg", // صورة افتراضية لو مفيش
    };
    newData[selectedCategory] = [...newData[selectedCategory], item];
    setData(newData);
    setAddDialogOpen(false);
    setNewItem({ name: "", details: "", price: "", image: "" });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* التبويبات */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          direction: "rtl",
        }}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor: isActive ? colors.primary : colors.white,
                color: isActive ? colors.white : colors.darkGray,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: "none",
                outline: "none",
                position: "relative",
                zIndex: isActive ? 2100 : 2000,
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = hexToRgba(
                    colors.primary,
                    0.3
                  );

                if (!isActive) e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                if (!isActive) e.currentTarget.style.color = "#4b5563";
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {isEdit && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => setAddDialogOpen(true)}
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            + إضافة عنصر
          </button>
        </div>
      )}

      {/* الأصناف */}
      <div className="space-y-8">
        {data[selectedCategory].map((item, index) => (
          <div
            key={item.name + index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-4 mb-8 bg-white/10 rounded-xl shadow-md backdrop-blur-sm p-3`}
          >
            {/* الصورة */}
            <div className="w-full md:w-1/3">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg shadow"
                />
              </div>
            </div>

            {/* التفاصيل */}
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "16px",
                backgroundColor: "rgba(17, 24, 39, 0.7)",
                borderRadius: "12px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: colors.white,
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: colors.white,
                  margin: "0.5rem 0",
                }}
              >
                {item.details}
              </p>
              <p
                style={{
                  color: colors.primary,
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                }}
              >
                ${item.price}
              </p>

              {isEdit && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => handleEdit(selectedCategory, index)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => handleDelete(selectedCategory, index)}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    حذف
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        values={editValues}
        onChange={setEditValues}
        onSave={handleSaveEdit}
      />
      <EditDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        values={newItem}
        onChange={setNewItem}
        onSave={handleSaveNewItem}
        title="إضافة عنصر جديد"
        isAdding={true}
      />
    </div>
  );
}

export default MenuTabs;
