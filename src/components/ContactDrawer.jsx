import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";
export default function ContactDrawer() {
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
        {["0100 123 4567"].map((phone, i) => (
          <Typography
            key={i}
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
        ))}
        {["0100 123 4567", "0112 345 6789"].map((phone, i) => (
          <Typography
            key={i}
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
        ))}

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
          شارع الجامعة، الجيزة، مصر
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          backgroundColor: "#ff9800",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "#fb8c00",
          },
          zIndex: 1300,
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
            background:
              "linear-gradient(to bottom, rgba(255, 248, 240, 0.85), rgba(255, 224, 178, 0.85))",
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
