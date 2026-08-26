import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AuthModalProvider } from "./Context/AuthModelContext.jsx";
import { BuyNowProvider } from "./Context/BuyNowContext.jsx";
import { WishlistProvider } from "./Context/WishListContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <AuthModalProvider>
        <ProductProvider>
          <WishlistProvider>
            <BuyNowProvider>
              <CartProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </CartProvider>
            </BuyNowProvider>
          </WishlistProvider>
        </ProductProvider>
      </AuthModalProvider>
    </AuthProvider>
  </HelmetProvider>,
);
