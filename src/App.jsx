import "./App.css";
import { useState } from "react";
import MenuTabs from "./components/MenuTabs";
import ContactDrawer from "./components/ContactDrawer";
import SettingsDrawer from "./components/SettingsDrawer";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";

// الألوان الافتراضية
const defaultColors = {
  primary: "#f97316",
  white: "#ffffff",
  darkGray: "#4b5563",
};

const drawerWidth = 240;

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [colors, setColors] = useState(defaultColors);

  const [logo, setLogo] = useState("/logo.png");

  const handleToggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleColorChange = (key, value) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="background-layer" />

      {/* الدراور المخصص للألوان */}
      <SettingsDrawer
        open={settingsOpen}
        onClose={handleToggleSettings}
        colors={colors}
        onColorChange={handleColorChange}
        logo={logo}
        onLogoChange={setLogo}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* اللوجو */}
        <div className="fixed top-3 left-3 z-50">
          <img
            src={logo}
            alt="Logo"
            className="w-20 md:w-24 h-auto drop-shadow-md"
          />
        </div>

        {/* أيقونة الإعدادات */}
        {!settingsOpen && !isSmallScreen && (
          <div className="fixed top-6 right-6 z-50">
            <IconButton
              onClick={handleToggleSettings}
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: colors.primary,
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                "&:hover": {
                  backgroundColor: colors.primary,
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </div>
        )}

        {/* المحتوى مع الإزاحة عند فتح الدراور */}
        <div
          style={{
            transition: "margin 0.3s ease",
            marginRight:
              settingsOpen && !isSmallScreen ? `${drawerWidth}px` : 0,
          }}
        >
          <MenuTabs isEdit={settingsOpen} colors={colors} />
        </div>

        <ContactDrawer
          colors={colors}
          isDrawerOpen={settingsOpen && !isSmallScreen}
        />
      </div>
    </div>
  );
}

export default App;
