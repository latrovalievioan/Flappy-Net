import { Container, Graphics } from "pixi.js";
import config from "../config";

/**
 * @class Initializes a new instance of Ground.
 */
export default class Ground extends Container {
  _createGround() {
    this._body = new Graphics();
    this._body.beginFill(0xf9dc5c);
    this._body.drawRect(0, 0, 300, 300);
    this._body.endFill();
    this.addChild(this._body);
  }
}
