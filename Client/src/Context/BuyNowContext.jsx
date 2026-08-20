import { createContext, useContext, useState } from "react";

const BuyNowContext = createContext();

export const BuyNowProvider = ({ children }) => {
  const [buyNowItem, setBuyNowItem] = useState(null);

  const setBuyNow = (product, size, quantity) => {
    setBuyNowItem({
      product,
      size,
      quantity,
    });
  };

  const clearBuyNow = () => {
    setBuyNowItem(null);
  };

  return (
    <BuyNowContext.Provider
      value={{
        buyNowItem,
        setBuyNow,
        clearBuyNow,
      }}
    >
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuyNow = () => {
  const context = useContext(BuyNowContext);

  if (!context) {
    throw new Error("useBuyNow must be used inside BuyNowProvider");
  }

  return context;
};
