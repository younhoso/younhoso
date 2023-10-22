export default function Options({multiLevelOptions, selected, selectOptionNo, handleChange}) {
  const allSelected = Object.keys(multiLevelOptions).every(key => selected[key] && multiLevelOptions[key]?.find(option => option.value === selected[key]));

  return (
      <div data-optionno={selectOptionNo}>
         {multiLevelOptions && Object.entries(multiLevelOptions).map(([key, value], idx) => {
            return (
              <div key={idx}> 
                <strong>{key}</strong>

                <div>
                  <select defaultValue="default" onChange={(e) => handleChange(e, key)}>
                    <option value="default" disabled>
                      선택
                    </option>
                    {(!idx || selected[Object.keys(multiLevelOptions)[idx-1]]) &&
                      value.map((optionObj, idx) => {
                        return (
                          <option key={idx} value={optionObj.value}>{optionObj.value}</option>
                        )
                    })}
                  </select>
                </div>
              </div>
            )
          })}
          {allSelected && 
            (<div>
              {Object.entries(selected).map(([key, value], idx) => {
                const option = multiLevelOptions[key]?.find(option => option.value === value);
                return option ? option.value : '';
              }).filter(Boolean).join('-')}
            </div>)
          }
      </div>
  )
}