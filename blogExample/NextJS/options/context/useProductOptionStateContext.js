import { getData } from '@/service/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductOptionsStateContext = createContext();

export function ProductOptionsProvider ({ children }) {
  const [selectOptionNo, setSelectOptionNo] = useState(0);
  const [originOption, setOriginOption] = useState({});
  const [selected, setSelected] = useState({});

  const handleChange = (event, key) => {
    setSelected({...selected, [key]: event.target.value});
  };

  // 선택한 값의 optionNo를 찾는 재귀 함수
   const findOptionNo = (optionsArray) => {
     for(let i=0; i<optionsArray.length; i++) {
       let option = optionsArray[i];
       
       if(selected[option.label] === option.value) {
         if(option.children && option.children.length > 0) {
           return findOptionNo(option.children);
          } else if(option.optionNo) {
          return option.optionNo;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    async function fetchData () {
      const data = await getData();
      setOriginOption(data);

      if(data.multiLevelOptions?.length > 0) {
        const selectoptionNo = findOptionNo(data.multiLevelOptions);
        setSelectOptionNo(selectoptionNo);
      }
    }
    
    fetchData();
  }, [selected]);

  return (
    <ProductOptionsStateContext.Provider value={{ originOption, selected, selectOptionNo, handleChange }}>
      {children}
    </ProductOptionsStateContext.Provider>
  );
};

export function useProductOptionStateContext () {
  return useContext(ProductOptionsStateContext);
};
