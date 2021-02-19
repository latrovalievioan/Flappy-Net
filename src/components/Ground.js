import { Container, Graphics } from "pixi.js";

/**
 * @class Initializes a new instance of Ground.
 */
export default class Ground extends Container {
  /**
   * @constructor
   * @param {object} config Configuration object.
   */
  constructor(config) {
    super();
    this._config = config;
    this._createGround();
    /**
     * Indicates ground object's x position.
     * @type {number}
     * @public
     */
    this.x = -this._config.view.width / 3;
    /**
     * Indicates ground object's x position.
     * @type {number}
     * @public
     */
    this.y = this._config.view.height / 2;
  }

  /**
   * @method Creates a new rect for ground container.
   * @private
   */
  _createGround() {
    this._body = new Graphics();
    this._body.beginFill(0x000000);
    this._body.drawRect(0, 0, 0, 0);
    this._body.endFill();
    this.addChild(this._body);
  }
}
