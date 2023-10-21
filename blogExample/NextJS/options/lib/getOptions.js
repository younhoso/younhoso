export const getCustomMultiLevelOptions = (multiLevelOptions) => {
  let groupedObjects = {};

  const helper = (options, depth) => {
    if (!options || depth > 5) return;

    for (let option of options) {
      const { label, value, children, optionNo, addPrice} = option;
      
      // 동일한 뎁스의 라벨별로 객체 그룹화 시킴
      if (!groupedObjects[label]) {
        groupedObjects[label] = [];
      }
      
      groupedObjects[label].push({ value: value, optionNo: optionNo, addPrice: addPrice });

      // 재귀 호출
      helper(children, depth+1);
    }
  };

  helper(multiLevelOptions, 0);

  // Remove duplicates using Set and convert back to array
  for(let key in groupedObjects){
    const unique = Array.from(new Set(groupedObjects[key].map(item => JSON.stringify({ value: item.value }))));
    groupedObjects[key] = unique.map(JSON.parse);
  }

  return groupedObjects;
};