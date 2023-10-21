import { useState } from "react";

export default function Options({combinedObjects}) {

  const [selected, setSelected] = useState({});

  const handleChange = (event, key) => {
    setSelected({...selected, [key]: event.target.value});
  };

  return (
      <div>
         {combinedObjects && Object.entries(combinedObjects).map(([key, value], idx) => {
            return (
              <div key={idx}> 
                <strong>{key}</strong>

                <div>
                <select defaultValue="default" onChange={(e) => handleChange(e, key)}>
                  <option value="default" disabled>
                    선택
                  </option>
                  {(!idx || selected[Object.keys(combinedObjects)[idx-1]]) &&
                    value.map(({value}, idx) => {
                      return (
                        <option key={idx}>{value}</option>
                      )
                    })}
                </select>
                </div>
              </div>
            )
          })}
      </div>
  )
}