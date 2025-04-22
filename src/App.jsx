import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ProductDisplay from "./components/ProductDisplay";
import Card404 from "./components/Card404";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnectionChange = () => {
      if (!navigator.onLine) {
        navigate("/offline");
      }
    };

    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDisplay" element={<ProductDisplay />} />
        <Route path="/offline" element={<Card404 />} />
         <Route path="*" element={<Card404 />}/>
      </Routes>
      
    </>
  );
}

export default App;
