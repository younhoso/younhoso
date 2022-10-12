import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setMinutes(+value)
  };

  const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setHours(+value)
  };

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
