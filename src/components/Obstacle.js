import { Container, Graphics } from "pixi.js";
import config from "../config";

/**
 * @class Initializes a new instance of an Obstacle.
 */
export default class Obstacle extends Container {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   * @param {number} height
   * @param {number} width
   * @param {string} position
   */
  constructor(x, y, height, width, position) {
    super();
    this._createObstacle(x, y, height, width, position);
  }

  static get positions() {
    return {
      TOP: "top",
      BOTTOM: "bottom",
    };
  }

  /**
   * @method Draws a new obstacle.
   * @private
   * @param {number} y
   * @param {number} height
   * @param {number} width
   * @param {string} position
   */
  _createObstacle(y, height, width, position) {
    this._body = new Graphics();
    this._body.beginFill(0xf9dc5c);
    this._body.drawRect(0, y, width, height);
    if (position === "top") {
      this._body.beginFill(0xff9c00);
      this._body.drawRect(0 - 20, y + height - 10, 120, 10);
    } else if (position === "bottom") {
      this._body.beginFill(0xff9c00);
      this._body.drawRect(0 - 20, y, 120, 10);
    }
    this._body.endFill();
    this.addChild(this._body);
  }
}
