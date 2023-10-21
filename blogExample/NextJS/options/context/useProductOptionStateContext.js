import { getData } from '@/service/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for product options state
const ProductOptionsStateContext = createContext();

// Provider component
export function ProductOptionsProvider ({ children }) {
  const [originOption, setOriginOption] = useState({});
  const [selected, setSelected] = useState({});

  const handleChange = (event, key) => {
    setSelected({...selected, [key]: event.target.value});
  };

  useEffect(() => {
    async function fetchData () {
      const data = await getData();
      setOriginOption(data)
    }
    fetchData();
  }, []);

  return (
    <ProductOptionsStateContext.Provider value={{ originOption, selected, handleChange }}>
      {children}
    </ProductOptionsStateContext.Provider>
  );
};

export function useProductOptionStateContext () {
  return useContext(ProductOptionsStateContext);
};
