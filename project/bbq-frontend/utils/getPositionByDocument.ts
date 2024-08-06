export const getPositionByDocument = (elem: any): { left: number; top: number } => {
  var _elem: any = elem;
  var left = 0,
    top = 0;

  do {
    left += _elem.offsetLeft - _elem.scrollLeft;
    top += _elem.offsetTop - _elem.scrollTop;
  } while ((_elem = _elem.offsetParent));

  return { left, top };
};
