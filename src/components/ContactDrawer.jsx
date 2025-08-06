import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";

// helpers/colorUtils.js
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ContactDrawer({ colors, isDrawerOpen }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const content = (
    <Box
      sx={{
        width: "100%",
        padding: 4,
        textAlign: "center",
        minHeight: "200px",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
      >
        تواصل معنا عبر الارقام التالية
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {["01146815591"].map((phone, i) => (
          <a
            key={`wa-${i}`}
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "#1b5e20",
                fontWeight: 500,
              }}
            >
              <WhatsAppIcon sx={{ color: "#25D366" }} />
              {phone}
            </Typography>
          </a>
        ))}

        {["01146815591", "01146815591"].map((phone, i) => (
          <a
            key={`call-${i}`}
            href={`tel:${phone}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "#1b5e20",
                fontWeight: 500,
              }}
            >
              <CallIcon sx={{ color: "blue" }} />
              {phone}
            </Typography>
          </a>
        ))}

        <a
          href="https://maps.app.goo.gl/ZNAiFEbVqX4jSrXo7?g_st=com.google.maps.preview.copy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#c62828",
              fontWeight: 500,
            }}
          >
            <LocationOnIcon sx={{ color: "#c62828" }} />
            شارع الجيش, منوف, المنوفية, مصر
          </Typography>
        </a>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          backgroundColor: colors.primary,
          "&:hover": {
            backgroundColor: colors.primary,
          },
          position: "fixed",
          bottom: 24,
          right: !isDrawerOpen ? 24 : 260,
          width: 60,
          height: 60,
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1300,
          transition: "0.2s",
        }}
      >
        <ModeCommentOutlinedIcon fontSize="large" />
      </IconButton>

      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            background: `linear-gradient(
              to bottom,
              rgba(255, 248, 240, 0.85),
              ${hexToRgba(colors.primary, 0.85)}
            )`,
            backdropFilter: "blur(4px)",
            padding: 4,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            minHeight: "200px",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {content}
        </Box>
      </SwipeableDrawer>
    </>
  );
}
