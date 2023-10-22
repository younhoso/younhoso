import { getCustomFlatOptions } from '@/lib/getOptions';
import { getData } from '@/service/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

const test = [
  {
      "optionNo": 138013399,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "택배배송(무료)|미드나이트|8GB 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 200,
      "reservationStockCnt": 0,
      "saleType": "AVAILABLE",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013869,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "택배배송(무료)|미드나이트|16G 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 200,
      "reservationStockCnt": 0,
      "saleType": "AVAILABLE",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013871,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "택배배송(무료)|스트라이트|8GB 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 200,
      "reservationStockCnt": 0,
      "saleType": "AVAILABLE",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013873,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "택배배송(무료)|스트라이트|16G 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 200,
      "reservationStockCnt": 0,
      "saleType": "AVAILABLE",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013875,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "직접방문수령(무료)|미드나이트|8GB 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 0,
      "reservationStockCnt": 0,
      "saleType": "SOLDOUT",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013877,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "직접방문수령(무료)|미드나이트|16G 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 0,
      "reservationStockCnt": 0,
      "saleType": "SOLDOUT",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013879,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "직접방문수령(무료)|스트라이트|8GB 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 0,
      "reservationStockCnt": 0,
      "saleType": "SOLDOUT",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  },
  {
      "optionNo": 138013881,
      "label": "배송방법|색상|메모리|저장 장치|키보드 언어",
      "value": "직접방문수령(무료)|스트라이트|16G 통합 메모리|256GB SSD 저장 장치|한국어",
      "addPrice": 0,
      "saleCnt": 0,
      "stockCnt": 0,
      "reservationStockCnt": 0,
      "saleType": "SOLDOUT",
      "main": true,
      "images": [],
      "optionManagementCd": "",
      "buyPrice": 9000,
      "forcedSoldOut": false,
      "rentalInfo": []
  }
]

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
