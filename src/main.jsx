import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Api from "./service/Api.jsx";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <CartProvider>
        <Api>
          <App />
        </Api>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
