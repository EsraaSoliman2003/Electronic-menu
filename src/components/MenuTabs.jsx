import { useState } from "react";
import menuData from "../data/menu.json";
import ContactDrawer from "./ContactDrawer.jsx";

function MenuTabs() {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
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
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: isActive ? "#f97316" : "#f3f4f6",
                color: isActive ? "white" : "#4b5563",
                border: "none",
                outline: "none",
                position: "relative",
                zIndex: isActive ? 2100 : 2000,
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "#fed7aa";
                if (!isActive) e.currentTarget.style.color = "#ea580c";
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

      {/* الأصناف */}
      <div className="space-y-8">
        {menuData[selectedCategory].map((item, index) => (
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
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#ddd",
                  margin: "0.5rem 0",
                }}
              >
                {item.details}
              </p>

              <p
                style={{
                  color: "#facc15",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                }}
              >
                ${item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ContactDrawer />
    </div>
  );
}

export default MenuTabs;
