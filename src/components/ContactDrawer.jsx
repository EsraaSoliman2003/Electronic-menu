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

export default function ContactDrawer({ colors, isDrawerOpen, isEdit }) {
  const [whatsAppNumbers, setWhatsAppNumbers] = React.useState([
    "201065875960",
  ]);
  const [callNumbers, setCallNumbers] = React.useState([
    "01146815591",
    "01146815591",
  ]);

  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingType, setEditingType] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [editingAddressIndex, setEditingAddressIndex] = React.useState(null);
  const [tempAddressText, setTempAddressText] = React.useState("");
  const [tempAddressUrl, setTempAddressUrl] = React.useState("");

  const [addresses, setAddresses] = React.useState([
    {
      text: "شارع الجيش, منوف, المنوفية, مصر",
      url: "https://maps.app.goo.gl/ZNAiFEbVqX4jSrXo7?g_st=com.google.maps.preview.copy",
    },
  ]);
  const editTextRef = React.useRef(null);
  const editUrlRef = React.useRef(null);
  const addTextRef = React.useRef(null);
  const addUrlRef = React.useRef(null);

  const [showAddWhatsApp, setShowAddWhatsApp] = React.useState(false);
  const [showAddCall, setShowAddCall] = React.useState(false);
  const [newWhatsApp, setNewWhatsApp] = React.useState("");
  const [newCall, setNewCall] = React.useState("");

  const [newAddressText, setNewAddressText] = React.useState("");
  const [newAddressUrl, setNewAddressUrl] = React.useState("");
  const [showAddAddress, setShowAddAddress] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleBlurEditInputs = (i) => {
    setTimeout(() => {
      const active = document.activeElement;
      if (active !== editTextRef.current && active !== editUrlRef.current) {
        const updated = [...addresses];
        updated[i] = {
          text: tempAddressText,
          url: tempAddressUrl,
        };
        setAddresses(updated);
        setEditingAddressIndex(null);
      }
    }, 0);
  };

  const handleBlurAddInputs = () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (active !== addTextRef.current && active !== addUrlRef.current) {
        setNewAddressText("");
        setNewAddressUrl("");
        setShowAddAddress(false);
      }
    }, 0);
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
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
      >
        تواصل معنا عبر الارقام التالية
      </Typography>

      {isEdit && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <button
            onClick={() => {
              setShowAddWhatsApp(true);
              setShowAddCall(false);
              setShowAddAddress(false);
            }}
          >
            ➕ واتساب
          </button>
          <button
            onClick={() => {
              setShowAddWhatsApp(false);
              setShowAddCall(true);
              setShowAddAddress(false);
            }}
          >
            ➕ اتصال
          </button>
          <button
            onClick={() => {
              setShowAddWhatsApp(false);
              setShowAddCall(false);
              setShowAddAddress(true);
            }}
          >
            ➕ عنوان
          </button>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {whatsAppNumbers.map((phone, i) => (
          <Box
            key={`wa-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {editingIndex === i && editingType === "whatsapp" ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  const updated = [...whatsAppNumbers];
                  updated[i] = editValue;
                  setWhatsAppNumbers(updated);
                  setEditingIndex(null);
                  setEditingType(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const updated = [...whatsAppNumbers];
                    updated[i] = editValue;
                    setWhatsAppNumbers(updated);
                    setEditingIndex(null);
                    setEditingType(null);
                  }
                }}
                style={{ fontSize: "1rem", padding: "4px 8px" }}
                autoFocus
              />
            ) : (
              <>
                <a
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
                      gap: 1,
                      color: "#1b5e20",
                      fontWeight: 500,
                    }}
                  >
                    <WhatsAppIcon sx={{ color: "#25D366" }} />
                    {phone.replace(/^201/, "010")}
                  </Typography>
                </a>

                {isEdit && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingIndex(i);
                        setEditingType("whatsapp");
                        setEditValue(phone);
                      }}
                    >
                      ✏️
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setWhatsAppNumbers((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      ❌
                    </IconButton>
                  </>
                )}
              </>
            )}
          </Box>
        ))}

        {showAddWhatsApp && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <input
              type="text"
              value={newWhatsApp}
              onChange={(e) => setNewWhatsApp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newWhatsApp.trim()) {
                  setWhatsAppNumbers((prev) => [...prev, newWhatsApp.trim()]);
                  setNewWhatsApp("");
                  setShowAddWhatsApp(false);
                }
              }}
              placeholder="رقم واتساب جديد"
              autoFocus
              style={{
                padding: "8px",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "60%",
              }}
            />
          </Box>
        )}

        {callNumbers.map((phone, i) => (
          <Box
            key={`call-${i}`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {editingIndex === i && editingType === "call" ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  const updated = [...callNumbers];
                  updated[i] = editValue;
                  setCallNumbers(updated);
                  setEditingIndex(null);
                  setEditingType(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const updated = [...callNumbers];
                    updated[i] = editValue;
                    setCallNumbers(updated);
                    setEditingIndex(null);
                    setEditingType(null);
                  }
                }}
                style={{ fontSize: "1rem", padding: "4px 8px" }}
                autoFocus
              />
            ) : (
              <>
                <a href={`tel:${phone}`} style={{ textDecoration: "none" }}>
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

                {isEdit && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingIndex(i);
                        setEditingType("call");
                        setEditValue(phone);
                      }}
                    >
                      ✏️
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setCallNumbers((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      ❌
                    </IconButton>
                  </>
                )}
              </>
            )}
          </Box>
        ))}

        {showAddCall && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <input
              type="text"
              value={newCall}
              onChange={(e) => setNewCall(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newCall.trim()) {
                  setCallNumbers((prev) => [...prev, newCall.trim()]);
                  setNewCall("");
                  setShowAddCall(false);
                }
              }}
              placeholder="رقم اتصال جديد"
              autoFocus
              style={{
                padding: "8px",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "60%",
              }}
            />
          </Box>
        )}

        {addresses.map((addr, i) => (
          <Box
            key={`address-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mt: 1,
              flexDirection: "column",
            }}
          >
            {editingAddressIndex === i ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                <input
                  ref={editTextRef}
                  type="text"
                  value={tempAddressText}
                  onChange={(e) => setTempAddressText(e.target.value)}
                  placeholder="نص العنوان"
                  style={{
                    padding: "8px",
                    fontSize: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  autoFocus
                  onBlur={() => handleBlurEditInputs(i)}
                />
                <input
                  ref={editUrlRef}
                  type="text"
                  value={tempAddressUrl}
                  onChange={(e) => setTempAddressUrl(e.target.value)}
                  placeholder="رابط العنوان"
                  style={{
                    padding: "8px",
                    fontSize: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const updated = [...addresses];
                      updated[i] = {
                        text: tempAddressText,
                        url: tempAddressUrl,
                      };
                      setAddresses(updated);
                      setEditingAddressIndex(null);
                    }
                  }}
                  // onBlur={() => {
                  //   setTimeout(() => {
                  //     const active = document.activeElement;
                  //     if (active?.tagName !== "INPUT") {
                  //       const updated = [...addresses];
                  //       updated[i] = {
                  //         text: tempAddressText,
                  //         url: tempAddressUrl,
                  //       };
                  //       setAddresses(updated);
                  //       setEditingAddressIndex(null);
                  //     }
                  //   }, 0);
                  // }}
                  onBlur={() => handleBlurEditInputs(i)}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <a
                  href={addr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#c62828",
                      fontWeight: 500,
                    }}
                  >
                    <LocationOnIcon sx={{ color: "#c62828" }} />
                    {addr.text}
                  </Typography>
                </a>

                {isEdit && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingAddressIndex(i);
                        setTempAddressText(addr.text);
                        setTempAddressUrl(addr.url);
                      }}
                    >
                      ✏️
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setAddresses((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      ❌
                    </IconButton>
                  </>
                )}
              </Box>
            )}
          </Box>
        ))}

        {showAddAddress && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <input
              ref={addTextRef}
              type="text"
              placeholder="نص العنوان"
              value={newAddressText}
              onChange={(e) => setNewAddressText(e.target.value)}
              style={{ width: "60%", padding: "8px", fontSize: "1rem" }}
              onBlur={handleBlurAddInputs}
            />
            <input
              ref={addUrlRef}
              type="text"
              placeholder="رابط العنوان"
              value={newAddressUrl}
              onChange={(e) => setNewAddressUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newAddressText && newAddressUrl) {
                  setAddresses((prev) => [
                    ...prev,
                    { text: newAddressText, url: newAddressUrl },
                  ]);
                  setNewAddressText("");
                  setNewAddressUrl("");
                  setShowAddAddress(false);
                }
              }}
              style={{ width: "60%", padding: "8px", fontSize: "1rem" }}
              onBlur={handleBlurAddInputs}
            />
          </Box>
        )}
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
        >
          {content}
        </Box>
      </SwipeableDrawer>
    </>
  );
}
