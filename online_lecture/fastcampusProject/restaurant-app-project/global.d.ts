// global.d.ts
declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(container: HTMLElement | null, options: { center: LatLng; level: number });
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  function load(callback: () => void): void;
}
