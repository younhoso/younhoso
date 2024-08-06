const deserializeCartForMap = (
  serializedText: string,
): {
  mainMenuId: number;
  quantity: number;
  subOptionItemIdSet: number[];
}[] => {
  return serializedText.split('--').map(item => {
    const [mainMenuId, quantity, subOptionItemIdSet] = item.split('-');
    return {
      mainMenuId: Number(mainMenuId),
      quantity: Number(quantity),
      subOptionItemIdSet: subOptionItemIdSet
        .split('_')
        .map(Number)
        .filter(v => v)
        .filter(v => !isNaN(v)),
    };
  });
};

export { deserializeCartForMap };
