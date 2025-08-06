import { DndContext, PointerSensor } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({
  item,
  index,
  colors,
  isEdit,
  handleEdit,
  handleDelete,
  category,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.name + index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col md:flex-row ${
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-4 mb-8 bg-white/10 rounded-xl shadow-md backdrop-blur-sm p-3`}
    >
      {/* مقبض السحب */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          fontSize: "3rem",
          userSelect: "none",
          color: colors.primary,
          display: !isEdit && "none",
        }}
      >
        ≡
      </div>

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
              onClick={() => handleEdit(category, index)}
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
              onClick={() => handleDelete(category, index)}
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
  );
}

export default SortableItem;
