import { Drawer, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

function SettingsDrawer({
  open,
  onClose,
  colors,
  onColorChange,
  logo,
  onLogoChange,
}) {
  const colorFields = [
    { name: "primary", label: "اللون الأساسي" },
    { name: "white", label: "الخلفية" },
    { name: "darkGray", label: "الكتابة" },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          padding: 2,
          boxSizing: "border-box",
          backgroundColor: "#fff",
        },
      }}
    >
      {/* زر الإغلاق */}
      <Box display="flex" justifyContent="flex-start">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* العنوان */}
      <Typography
        variant="h6"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        إعدادات الألوان
      </Typography>

      {/* الحقول */}
      <Box display="flex" flexDirection="column" gap={3}>
        {colorFields.map(({ name, label }) => (
          <Box
            key={name}
            display="flex"
            flexDirection="column"
            alignItems="start"
          >
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500", mb: 1 }}>
              {label}
            </Typography>
            <input
              type="color"
              value={colors[name]}
              onChange={(e) => onColorChange(name, e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* رفع اللوجو */}
      <Box mt={4}>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: "500", mb: 1 }}>
          لوجو الموقع
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                onLogoChange(reader.result); // حفظ base64
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <Box mt={2} sx={{ width: "100%", textAlign: "center" }}>
          <img
            src={logo}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: 100 }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default SettingsDrawer;
