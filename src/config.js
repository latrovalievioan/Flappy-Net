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
};
