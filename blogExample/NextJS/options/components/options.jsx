export default function Options({combinedObjects}) {

  return (
      <div>
         {combinedObjects && Object.entries(combinedObjects).map(([key, value], idx) => {
            return (
              <div key={idx}> 
                <strong>{key}</strong>

                <div>
                  <select defaultValue="default">
                    <option value="default" disabled>
                      선택
                    </option>
                    {value.map(({value}, idx) => {
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