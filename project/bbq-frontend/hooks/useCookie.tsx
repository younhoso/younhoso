import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { MealTypeEnum } from '@/types';

function setValue(key: string, data: any): string {
  setCookie(null, key, JSON.stringify(data), {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return key;
}

function getValue<T>(key: string): T | undefined {
  const cookies = parseCookies();
  const cookie = cookies[key];
  if (!cookie) return undefined;
  const data = JSON.parse(cookie);

  return data as T;
}

function destoryValue(key: string): void {
  destroyCookie(null, key, {
    path: '/',
  });
}

const COOKIE_LAST_SELECTED_MEAL_TYPE = '_lsmt';
const COOKIE_LAST_SELECTED_BRANCH_ID = '_lsbi';
const COOKIE_LAST_SELECTED_POSITION = '_lsp';

type Position = {
  lat: number;
  lng: number;
};

export interface CookieContextType {
  lastSelectedMealType?: MealTypeEnum;
  lastSelectedBranchId?: string;
  lastSelectedPosition?: Position;
  setLastSelectedMealType: (mealType: MealTypeEnum) => void;
  setLastSelectedBranchId: (branchId: string) => void;
  setLastSelectedPosition: (position: Position) => void;
  resetLastSelectedMealType: () => void;
  resetLastSelectedBranchId: () => void;
  resetLastSelectedPosition: () => void;
  reset: () => void;
}

const DEFAULT_COOKIE_CONTEXT: CookieContextType = {
  lastSelectedMealType: undefined, //getValue<MealTypeEnum>(COOKIE_LAST_SELECTED_MEAL_TYPE),
  lastSelectedBranchId: undefined, //getValue<string>(COOKIE_LAST_SELECTED_BRANCH_ID),
  lastSelectedPosition: undefined, //getValue<Position>(COOKIE_LAST_SELECTED_POSITION),
  setLastSelectedMealType: (mealType: MealTypeEnum) => {
    setValue(COOKIE_LAST_SELECTED_MEAL_TYPE, mealType);
  },
  setLastSelectedBranchId: (branchId: string) => {
    setValue(COOKIE_LAST_SELECTED_BRANCH_ID, branchId);
  },
  setLastSelectedPosition: (position: Position) => {
    setValue(COOKIE_LAST_SELECTED_POSITION, position);
  },
  resetLastSelectedMealType: () => {
    destoryValue(COOKIE_LAST_SELECTED_MEAL_TYPE);
  },
  resetLastSelectedBranchId: () => {
    destoryValue(COOKIE_LAST_SELECTED_BRANCH_ID);
  },
  resetLastSelectedPosition: () => {
    destoryValue(COOKIE_LAST_SELECTED_POSITION);
  },
  reset: () => {
    destoryValue(COOKIE_LAST_SELECTED_MEAL_TYPE);
    destoryValue(COOKIE_LAST_SELECTED_BRANCH_ID);
    destoryValue(COOKIE_LAST_SELECTED_POSITION);
  },
};

export const CookieContext = createContext<CookieContextType>(DEFAULT_COOKIE_CONTEXT);

export const useCookie = () => {
  const context = useContext(CookieContext);

  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
  const [refreshedCount, setRefreshedCount] = useState<number>(0);
  const router = useRouter();

  const lastSelectedMealType = useMemo<MealTypeEnum | undefined>(() => {
    return getValue<MealTypeEnum>(COOKIE_LAST_SELECTED_MEAL_TYPE); // ?? DEFAULT_COOKIE_CONTEXT.lastSelectedMealType
  }, [refreshedCount, router.pathname, router.query]);

  const lastSelectedBranchId = useMemo<string | undefined>(() => {
    return getValue<string>(COOKIE_LAST_SELECTED_BRANCH_ID); // ?? DEFAULT_COOKIE_CONTEXT.lastSelectedBranchId
  }, [refreshedCount, router.pathname, router.query]);

  const lastSelectedPosition = useMemo<Position | undefined>(() => {
    return getValue<Position>(COOKIE_LAST_SELECTED_POSITION); // ?? DEFAULT_COOKIE_CONTEXT.lastSelectedPosition
  }, [refreshedCount, router.pathname, router.query]);

  return (
    <CookieContext.Provider
      value={{
        lastSelectedMealType: lastSelectedMealType,
        lastSelectedBranchId: lastSelectedBranchId,
        lastSelectedPosition: lastSelectedPosition,
        setLastSelectedMealType: (mealType: MealTypeEnum) => {
          DEFAULT_COOKIE_CONTEXT.setLastSelectedMealType(mealType);
          setRefreshedCount(prev => prev + 1);
        },
        setLastSelectedBranchId: (branchId: string) => {
          DEFAULT_COOKIE_CONTEXT.setLastSelectedBranchId(branchId);
          setRefreshedCount(prev => prev + 1);
        },
        setLastSelectedPosition: (position: Position) => {
          DEFAULT_COOKIE_CONTEXT.setLastSelectedPosition(position);
          setRefreshedCount(prev => prev + 1);
        },
        resetLastSelectedMealType: () => {
          DEFAULT_COOKIE_CONTEXT.resetLastSelectedMealType();
          setRefreshedCount(prev => prev + 1);
        },
        resetLastSelectedBranchId: () => {
          DEFAULT_COOKIE_CONTEXT.resetLastSelectedBranchId();
          setRefreshedCount(prev => prev + 1);
        },
        resetLastSelectedPosition: () => {
          DEFAULT_COOKIE_CONTEXT.resetLastSelectedPosition();
          setRefreshedCount(prev => prev + 1);
        },
        reset: () => {
          DEFAULT_COOKIE_CONTEXT.reset();
          setRefreshedCount(prev => prev + 1);
        },
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
