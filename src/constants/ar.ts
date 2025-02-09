export const AR_CONFIG = {
  scripts: {
    aframe: "https://aframe.io/releases/1.4.0/aframe.min.js",
    arjs: "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js",
  },
  scene: {
    arjs: "sourceType: webcam; debugUIEnabled: false; trackingMethod: best;",
    renderer: "antialias: true; alpha: true;",
  },
  defaultMarker: "hiro",
};
