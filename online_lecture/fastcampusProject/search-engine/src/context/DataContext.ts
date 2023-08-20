import { createContext } from 'react';
import { DataContextType, QueryContextType } from 'types';

export const DataContext = createContext<DataContextType | undefined>(
    undefined
);
export const QueryContext = createContext<QueryContextType | undefined>(
    undefined
);
