import { Container, Sprite, Graphics } from "pixi.js";
/**
 * @class Initializes a new instance of Title.
 */
export default class Title extends Container {
  /**
   * @constructor
   * @param {object} config Configuration object.
   */
  constructor(config) {
    super();
    this._createTitle();
    this._createBackground();
    this._graphics.y = -config.view.height / 2;
    this._graphics.x -= this._graphics.getBounds().width / 2;
  }
  /**
   * @method Makes the background of the title.
   * @private
   */
  _createBackground() {
    this._graphics = new Graphics();
    this._graphics.beginFill(0x241f09);
    this._graphics.drawRect(
      0,
      0,
      this._body.getBounds().width + this._body.getBounds().width * 0.3,
      this._body.getBounds().height + this._body.getBounds().height * 0.3
    );
    this.addChild(this._graphics);
    this._graphics.addChild(this._body);
  }
  /**
   * @method Adds the title's text.
   * @private
   */
  _createTitle() {
    this._body = new Sprite.from("title");
    this._body.anchor.set(-0.16, -0.16);
  }
}
