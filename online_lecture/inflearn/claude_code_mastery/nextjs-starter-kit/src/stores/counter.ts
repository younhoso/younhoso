import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// devtools 미들웨어로 Redux DevTools에서 상태 확인 가능
export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, "increment"),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, "decrement"),
      reset: () => set({ count: 0 }, false, "reset"),
    }),
    { name: "counter-store" }
  )
);
