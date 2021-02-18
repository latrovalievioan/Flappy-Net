import { Container } from "pixi.js";
import Obstacle from "./Obstacle";
import config from "../config";
/**
 * @class Initializes a new instance of an Obstacle Set.
 */
export default class ObstacleSet extends Container {
  constructor() {
    super();
    /**
     * Indicates the distance between top and bot obstacles.
     * @type {number}
     * @private
     */
    this._hole = config.obstacleSet.hole;
    /**
     * Indicates the height of top obstacle.
     * @type {number}
     * @private
     */
    this._topHeight = this._randomInt();
    /**
     * Indicates the height of bottom obstacle.
     * @type {number}
     * @private
     */
    this._botHeight = config.view.height - this._topHeight - this._hole;
    this._createObstacles();
    this.x = config.view.width / 2;
    /**
     * Indicates whether the obstacle set has been passed from the bird.
     * @type {boolean}
     * @public
     */
    this.scored = false;
  }

  /**
   * @method Moves the obstacle-set container.
   */
  move() {
    this.x -= config.obstacleSet.speed;
  }

  /**
   * @method Generates an obstacle set from two instances of Obstacle Class.
   * @private
   */
  _createObstacles() {
    this.obstacleTop = new Obstacle(
      -config.view.height / 2,
      this._topHeight,
      "top"
    );
    this.obstacleBot = new Obstacle(
      config.view.height / 2 - this._botHeight,
      this._botHeight,
      "bottom"
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
