import { Container, Sprite, Text, Graphics } from "pixi.js";
import Assets from "../core/AssetManager";
/**
 * @class Initializes a new instance of an Obstacle Set.
 */
export default class Score extends Container {
  /**
   * @constructor
   * @param {object} config Configuration object.
   */
  constructor(config) {
    super();
    /**
     * Indicates the current score.
     * @type {number}
     * @public
     */
    this.currentScore = 0;
    /**
     * Configurations object.
     * @type {object}
     * @private
     */
    this._config = config;
    this._createScore();
  }
  /**
   * @method Generates a scoreboard.
   * @private
   */
  _createScore() {
    const background = new Sprite.from("score");
    background.anchor.set(0.5, 0.5);
    background.scale.x = 0.23;
    background.scale.y = 0.23;
    background.y = -this._config.view.height / 2 + background.height / 2;
    background.x = this._config.view.width / 3;
    const score = new Text(`${this.currentScore}`, {
      fontFamily: "Arial Black",
      fontSize: 150,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
    background.addChild(score);
    score.anchor.set(0.5);
    score.y = background.height - background.height / 3;

    this.addChild(background);
  }
  /**
   * @method Adds 1 to current score and plays a sound.
   */
  increaseScore() {
    Assets.sounds.score.play();
    this.currentScore++;
    this._createScore();
    localStorage.setItem("currentScore", this.currentScore);
  }
  /**
   * @method Caches player's best score in local storage.
   */
  setBestScore() {
    if (!localStorage.getItem("bestScore"))
      localStorage.setItem("bestScore", 0);

    if (localStorage.getItem("bestScore") < this.currentScore)
      localStorage.setItem("bestScore", this.currentScore);
  }
}
