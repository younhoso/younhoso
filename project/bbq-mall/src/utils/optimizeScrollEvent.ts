export function optimizeScrollEvent(callback: () => void, dismissCondition?: () => boolean) {
  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition?.()) {
        tick = false;
        return;
      }

      tick = false;
      return callback();
    });
  };
}
