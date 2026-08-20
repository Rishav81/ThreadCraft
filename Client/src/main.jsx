import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AuthModalProvider } from "./Context/AuthModelContext.jsx";
import { BuyNowProvider } from "./Context/BuyNowContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AuthModalProvider>
      <ProductProvider>
        <BuyNowProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </BuyNowProvider>
      </ProductProvider>
    </AuthModalProvider>
  </AuthProvider>,
);
