import { Container, Sprite, Text, Graphics } from "pixi.js";
import Assets from "../core/AssetManager";
import config from "../config";
/**
 * @class Initializes a new instance of an Obstacle Set.
 */
export default class Score extends Container {
  constructor() {
    super();
    this.count = 0;
    this._createScore();
  }
  /**
   * @method Generates a scoreboard.
   * @private
   */
  _createScore() {
    const background = new Sprite.from("score");
    background.anchor.set(0.5, 0.5);
    background.scale.x = 0.4;
    background.scale.y = 0.4;
    background.y = -config.view.height / 2 + background.height / 2;
    background.x = config.view.width / 3;
    const score = new Text(`${this.count}`, {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
    background.addChild(score);
    score.anchor.set(0.5);
    score.y = background.height / 2 - score.height / 4;

    this.addChild(background);
  }
  /**
   * @method Adds 1 to current score and plays a sound.
   */
  score() {
    Assets.sounds.score.play();
    this.count++;
    this._createScore();
    localStorage.setItem("currentScore", this.count);
  }
  /**
   * @method Caches player's best score in local storage.
   */
  setBestScore() {
    if (!localStorage.getItem("bestScore"))
      localStorage.setItem("bestScore", 0);

    if (localStorage.getItem("bestScore") < this.count)
      localStorage.setItem("bestScore", this.count);
  }
}
