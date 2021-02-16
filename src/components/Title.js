import { Container, Sprite, Graphics } from "pixi.js";
import config from "../config";
/**
 * @class Initializes a new instance of Title.
 */
export default class Title extends Container {
  constructor() {
    super();
    this._mkTitle();
    this._mkBackground();
    this._graphics.addChild(this._title);
    this._graphics.y = -config.view.height / 2;
    this._graphics.x -= this._graphics.getBounds().width / 2;
  }
  /**
   * @method Makes the background of the title.
   * @private
   */
  _mkBackground() {
    this._graphics = new Graphics();
    this._graphics.beginFill(0x241f09);
    this._graphics.drawRect(
      0,
      0,
      this._title.getBounds().width + this._title.getBounds().width * 0.3,
      this._title.getBounds().height + this._title.getBounds().height * 0.3
    );
    this.addChild(this._graphics);
  }
  /**
   * @method Adds the title's text.
   * @private
   */
  _mkTitle() {
    this._title = new Sprite.from("title");
    this._title.anchor.set(-0.16, -0.16);
  }
}
