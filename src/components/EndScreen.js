import { Container, Sprite, Text } from "pixi.js";
import gsap from "gsap";
import config from "../config";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class EndScreen extends Container {
  constructor() {
    super();
  }

  /**
   * @method Creates an endscreen that shows the players current score and best score.
   */
  endscreen() {
    const endScreen = new Sprite.from("endScreen");
    endScreen.width = config.view.width / 4;
    endScreen.height = config.view.height / 4;
    endScreen.anchor.set(0.5, 0.5);
    const currentScore = new Text(`${localStorage.getItem("currentScore")}`, {
      fontFamily: "Arial",
      fontSize: 150,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
    currentScore.anchor.set(0.5, 0.5);
    currentScore.x = endScreen.width / 1.75;
    currentScore.y = -endScreen.height / 1.5;
    const bestScore = new Text(`${localStorage.getItem("bestScore")}`, {
      fontFamily: "Arial",
      fontSize: 150,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
    bestScore.anchor.set(0.5, 0.5);
    bestScore.x = endScreen.width / 1.75;
    bestScore.y = endScreen.height / 1.5;
    endScreen.addChild(currentScore);
    endScreen.addChild(bestScore);
    endScreen.scale.x = 0;
    endScreen.scale.y = 0;
    this.addChild(endScreen);
    gsap.to(endScreen.scale, { x: 0.3, y: 0.3, ease: "bounce", duration: 1 });
  }
}
