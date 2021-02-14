import { Container } from "pixi.js";
import Obstacle from "./Obstacle";
import config from "../config";
/**
 * @class Initializes a new instance of an Obstacle Set.
 */
export default class ObstacleSet extends Container {
  constructor() {
    super();
    this._hole = 200;
    this._topHeight = this._randomInt();
    this._botHeight = config.view.height - this._topHeight - this._hole;
    this._mkObstacles();
  }

  /**
   * @method Generates an obstacle set from two instances of Obstacle Class.
   * @private
   */
  _mkObstacles() {
    this.obstacleTop = new Obstacle(
      config.view.width / 2,
      -config.view.height / 2,
      this._topHeight,
      "top"
    );
    this.obstacleBot = new Obstacle(
      config.view.width / 2,
      config.view.height / 2 - this._botHeight,
      this._botHeight,
      "bot"
    );
    this.addChild(this.obstacleTop);
    this.addChild(this.obstacleBot);
  }
  /**
   * @method Generates a random int.
   * @private
   */
  _randomInt() {
    return (
      Math.floor(Math.random() * (config.view.height - this._hole - 50)) + 1
    );
  }
}
