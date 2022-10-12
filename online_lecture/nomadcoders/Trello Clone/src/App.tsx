import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setMinutes(+value)
  };

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
