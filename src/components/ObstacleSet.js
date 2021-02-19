import { Container, TilingSprite } from "pixi.js";
import Obstacle from "./Obstacle";
/**
 * @class Initializes a new instance of an Obstacle Set.
 */
export default class ObstacleSet extends Container {
  /**
   * @constructor
   * @param {object} config Configuration object.
   */
  constructor(config) {
    super();
    /**
     * Configurations object.
     * @type {object}
     * @private
     */
    this._config = config;
    /**
     * Indicates the distance between top and bottom obstacles.
     * @type {number}
     * @private
     */
    this._hole = this._config.obstacleSet.hole;

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
    this._bottomHeight =
      this._config.view.height - this._topHeight - this._hole;
    this._createObstacles();
    this.x = this._config.view.width / 2;
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
    this.x -= this._config.obstacleSet.speed;
  }

  /**
   * @method Generates an obstacle set from two instances of Obstacle Class.
   * @private
   */
  _createObstacles() {
    this.obstacleTop = new Obstacle(
      -this._config.view.height / 2,
      this._topHeight,
      this._config.obstacle.width,
      Obstacle.positions.TOP
    );
    this.obstacleBottom = new Obstacle(
      this._config.view.height / 2 - this._bottomHeight,
      this._bottomHeight,
      this._config.obstacle.width,
      Obstacle.positions.BOTTOM
    );
    this.addChild(this.obstacleTop);
    this.addChild(this.obstacleBottom);
  }
  /**
   * @method Generates a random int.
   * @private
   */
  _randomInt() {
    return (
      Math.floor(Math.random() * (this._config.view.height - this._hole - 50)) +
      1
    );
  }
}
