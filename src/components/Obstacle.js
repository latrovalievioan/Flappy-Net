import { Container, Graphics } from "pixi.js";
import config from "../config";

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
   * @param {number} y
   * @param {number} h
   * @param {number} pos -"top or bottom"
   */
  _createObstacle(y, h, pos) {
    this._body = new Graphics();
    this._body.beginFill(0xf9dc5c);
    this._body.drawRect(0, y, config.obstacle.width, h);
    if (pos === "top") {
      this._body.beginFill(0xff9c00);
      this._body.drawRect(0 - 20, y + h - 10, 120, 10);
    } else {
      this._body.beginFill(0xff9c00);
      this._body.drawRect(0 - 20, y, 120, 10);
    }
    this._body.endFill();
    this.addChild(this._body);
  }
}
