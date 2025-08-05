import "./App.css";
import MenuTabs from "./components/MenuTabs";

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="background-layer" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="fixed top-6 left-6 z-50">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 md:w-24 h-auto drop-shadow-md"
          />
        </div>
        <MenuTabs />
      </div>
    </div>
  );
}

export default App;
