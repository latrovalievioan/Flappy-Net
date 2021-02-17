import { Container, Graphics } from "pixi.js";
import config from "../config";

/**
 * @class Initializes a new instance of Ground.
 */
export default class Ground extends Container {
  constructor() {
    super();
    this._createGround();
    this.x = -config.view.width / 3;
    this.y = config.view.height / 2;
  }
  _createGround() {
    this._body = new Graphics();
    this._body.beginFill(0x000000);
    this._body.drawRect(0, 0, 0, 0);
    this._body.endFill();
    this.addChild(this._body);
  }
}