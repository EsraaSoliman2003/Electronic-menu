import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

function EditDialog({
  open,
  onClose,
  values,
  onChange,
  onSave,
  title = "تعديل العنصر",
  isAdding = false,
}) {
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.25rem" }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {isAdding && (
            <Box>
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "500", mb: 1 }}>
                صورة العنصر
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      onChange((prev) => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                }}
              />
              {values.image && (
                <Box mt={2} textAlign="center">
                  <img
                    src={values.image}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}

          {/* الاسم */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
              الاسم
            </label>
            <input
              type="text"
              value={values.name}
              onChange={(e) => onChange({ ...values, name: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fefefe",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* الوصف */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
              الوصف
            </label>
            <textarea
              rows={3}
              value={values.details}
              onChange={(e) => onChange({ ...values, details: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fefefe",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          {/* السعر */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
              السعر
            </label>
            <input
              type="number"
              value={values.price}
              onChange={(e) => onChange({ ...values, price: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fefefe",
                fontSize: "1rem",
              }}
            />
          </div>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#f3f4f6",
            color: "#333",
            fontWeight: "500",
            px: 3,
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          }}
        >
          إلغاء
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            backgroundColor: "#16a34a",
            color: "#fff",
            fontWeight: "500",
            px: 4,
            "&:hover": {
              backgroundColor: "#15803d",
            },
          }}
        >
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
