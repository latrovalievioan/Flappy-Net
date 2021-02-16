export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    worldWidth: 1000,
    worldHeight: 500,
    resizeTo: window,
    centerOnResize: true,
  },
  game: {
    width: 1000,
    height: 500,
    drag: false,
    pinch: true,
    decelerate: true,
    wheel: false,
  },
  scenes: {
    Splash: {
      hideDelay: 0,
    },
  },
  assets: {
    root: "/",
  },
  events: {
    SHOW_START: "show_start",
    SHOW_END: "show_end",
    GAME_START: "game_start",
    GAME_END: "game_end",
    HIDE_START: "hide_start",
    HIDE_END: "hide_end",
  },
  bird: {
    thrust: {
      amount: 100,
      rotationDuration: 0.4,
      thrustDuration: 0.4,
      angle: -20,
    },
    fall: {
      angle: 90,
      rotationDuration: 0.6,
      fallDuration: 1,
    },
  },
  feather: {
    scaleMin: 0.01,
    scaleMax: 0.06,
  },
};
