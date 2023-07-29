import { useState } from "react";
import data, { Category } from "./data";

type SearchFilter = {
  list: number;
  keyword: string;
  category: Category;
  maxPrice: number;
};

const useFakeQuery = () => {
  const [filters, setFilters] = useState<SearchFilter>({
    list: 0,
    keyword: "",
    category: Category.All,
    maxPrice: 10000,
  });

  const fireQuery = ({ variables }: { variables: SearchFilter }) => {
    setFilters((prev) => ({
      ...prev,
      ...variables,
    }));
  };

  return {
    query: fireQuery,
    data: data.filter(({ name, category, price }) => {
      const regexVar = new RegExp(filters.keyword, "g");
      const keywordMatch = name.search(regexVar) !== -1;
      const categoryMatch =
        category === filters.category || filters.category === Category.All;
      const priceMatch = price <= filters.maxPrice;

      return keywordMatch && categoryMatch && priceMatch;
    }),
  };
};

export default useFakeQuery;
