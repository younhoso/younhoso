const deserializeCart = (
  serializedText: string,
): {
  menuId: number;
  quantity: number;
  subOptionIds: number[];
}[] => {
  return serializedText.split('--').map(item => {
    const [mainMenuId, quantity, subOptionItemIdSet] = item.split('-');
    return {
      menuId: Number(mainMenuId),
      quantity: Number(quantity),
      subOptionIds: subOptionItemIdSet
        .split('_')
        .map(Number)
        .filter(v => v)
        .filter(v => !isNaN(v)),
    };
  });
};

export { deserializeCart };
