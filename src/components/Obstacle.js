import { Container, Graphics } from "pixi.js";

/**
 * @class Initializes a new instance of an Obstacle.
 */
export default class Obstacle extends Container {
  constructor(x, y, h, pos) {
    super();
    this._createObstacle(x, y, h, pos);
  }
  /**
   * @method Draws a new obstacle.
   * @private
   * @param {number} x
   * @param {number} y
   * @param {number} h
   * @param {number} pos -"top or bottom"
   */
  _createObstacle(x, y, h, pos) {
    this._obstacle = new Graphics();
    this._obstacle.beginFill(0xf9dc5c);
    this._obstacle.drawRect(x, y, 80, h);
    if (pos === "top") {
      this._obstacle.beginFill(0xff9c00);
      this._obstacle.drawRect(x - 20, y + h - 10, 120, 10);
    } else {
      this._obstacle.beginFill(0xff9c00);
      this._obstacle.drawRect(x - 20, y, 120, 10);
    }
    this._obstacle.endFill();
    this.addChild(this._obstacle);
  }
}
