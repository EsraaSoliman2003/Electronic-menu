// src/components/EditDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}
      >
        {isAdding && (
          <Box mb={2}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500", mb: 1 }}>
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
            />
          </Box>
        )}
        {isAdding && values.image && (
          <Box mt={2} textAlign="center">
            <img
              src={values.image}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        )}

        <TextField
          label="الاسم"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
        />
        <TextField
          label="الوصف"
          value={values.details}
          onChange={(e) => onChange({ ...values, details: e.target.value })}
        />
        <TextField
          label="السعر"
          type="number"
          value={values.price}
          onChange={(e) => onChange({ ...values, price: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
