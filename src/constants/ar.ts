export const AR_CONFIG = {
  scripts: {
    aframe: "https://aframe.io/releases/1.4.0/aframe.min.js",
    arjs: "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js",
  },
  scene: {
    arjs: "sourceType: webcam; debugUIEnabled: false; trackingMethod: best; sourceWidth: 1920; sourceHeight: 1080; displayWidth: 1920; displayHeight: 1080;",
    renderer: "antialias: true; alpha: true; precision: high;",
  },
  defaultMarker: "hiro",
};
