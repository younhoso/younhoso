import { useState } from 'react';

export default function Counter({
  initalValue,
  onChangeValue,
}: {
  initalValue: number;
  onChangeValue: (value: string) => number;
}) {
  const [count, setCount] = useState(initalValue);
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <button onClick={handleIncrease}>+</button>
      <input
        type="number"
        value={count}
        onChange={e => {
          onChangeValue(e.target.value);
        }}
      />
      <button onClick={handleDecrease}>-</button>
    </div>
  );
}
