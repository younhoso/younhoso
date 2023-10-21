import { getData } from '@/service/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for product options state
const ProductOptionsStateContext = createContext();

// Provider component
export function ProductOptionsProvider ({ children }) {
  const [selectorOptions, setSelectorOptions] = useState([]);
  const [originOption, setOriginOption] = useState({});

  useEffect(() => {
    async function fetchData () {
      const data = await getData();
      setOriginOption(data)
    }
    fetchData();
  }, []);

  return (
    <ProductOptionsStateContext.Provider value={{ selectorOptions, originOption }}>
      {children}
    </ProductOptionsStateContext.Provider>
  );
};

export function useProductOptionStateContext () {
  return useContext(ProductOptionsStateContext);
};
