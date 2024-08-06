const serializeCart = (
  items: {
    menuId: number;
    quantity: number;
    subOptionIds: number[];
  }[],
) => {
  return items
    .map(item => {
      return `${item.menuId}-${item.quantity}-${item.subOptionIds.join('_')}`;
    })
    .join('--');
};

export { serializeCart };
