export function getCustomMultiLevelOptions(multiLevelOptions) {
  let groupedObjects = {};

  const helper = (options, depth) => {
    if (!options || depth > 5) return;

    for (let option of options) {
      const { label, value, children } = option;
      
      // 동일한 뎁스의 라벨별로 객체 그룹화 시킴
      if (!groupedObjects[label]) {
        groupedObjects[label] = [];
      }
      
      groupedObjects[label].push({ value: value });

      // 재귀 호출
      helper(children, depth+1);
    }
  };

  helper(multiLevelOptions, 0);

  // Set을 사용하여 중복 항목을 제거하고 다시 배열로 변환
  for(let key in groupedObjects){
    const unique = Array.from(new Set(groupedObjects[key].map(item => JSON.stringify( item ))));
    groupedObjects[key] = unique.map(JSON.parse);
  }

  return groupedObjects;
};

export function getCustomFlatOptions(options, combinedValue) {
  for (let i = 0; i < options?.length; i++) {
    if (options[i].value === combinedValue) {
      return options[i].optionNo;
    }
  }

  return null;
};

export function findOption(options, selectedValue) {
  for (let i = 0; i < options?.length; i++) {
    if (options[i].optionNo === selectedValue) {
      return options[i].optionNo;
    }
    
    if (options[i].children) {
        const result = findOption(options[i].children, selectedValue);
        if (result) return result;
      }
  }

  return null;
};