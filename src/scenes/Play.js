import { Sprite } from "pixi.js";
import Scene from "./Scene";
import gsap from "gsap";
import Bird from "../components/Bird";
import Flappy from "../components/Flappy";

export default class Play extends Scene {
  async onCreated() {
    const game = new Flappy();
    this.addChild(game);
    game.startGame();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
