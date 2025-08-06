import { useState } from "react";
import menuData from "../data/menu.json";
import EditDialog from "./EditDialog";
import SortableItem from "./SortableItem";
import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function MenuTabs({ colors, isEdit }) {
  const isSmallScreen = useMediaQuery("(max-width:700px)");

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
      image: newItem.image || "/imgs/placeholder.jpg",
    };
    newData[selectedCategory] = [...newData[selectedCategory], item];
    setData(newData);
    setAddDialogOpen(false);
    setNewItem({ name: "", details: "", price: "", image: "" });
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = data[selectedCategory].findIndex(
        (i, idx) => active.id === i.name + idx
      );
      const newIndex = data[selectedCategory].findIndex(
        (i, idx) => over.id === i.name + idx
      );
      const reordered = arrayMove(data[selectedCategory], oldIndex, newIndex);
      setData((prev) => ({ ...prev, [selectedCategory]: reordered }));
    }
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
          direction: "rtl",
          maxWidth: isSmallScreen && "300px",
          margin: "auto",
          marginBottom: "1.5rem",
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data[selectedCategory].map((item, index) => item.name + index)}
          strategy={verticalListSortingStrategy}
        >
          {data[selectedCategory].map((item, index) => (
            <SortableItem
              key={item.name + index}
              item={item}
              index={index}
              colors={colors}
              isEdit={isEdit}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              category={selectedCategory}
            />
          ))}
        </SortableContext>
      </DndContext>

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
