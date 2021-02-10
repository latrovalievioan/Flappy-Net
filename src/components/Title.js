import { Container, Sprite, Graphics } from "pixi.js";
export default class Title extends Container {
  constructor() {
    super();
    this._mkTitle();
    this._mkBackground();
    this.addChild(this._graphics);
    this._graphics.addChild(this._title);
    this._graphics.y = -window.innerHeight / 2;
    this._graphics.x -= this._graphics.getBounds().width / 2;
  }

  _mkBackground() {
    this._graphics = new Graphics();
    this._graphics.beginFill(0x241f09);
    this._graphics.drawRect(
      0,
      0,
      this._title.getBounds().width + this._title.getBounds().width * 0.3,
      this._title.getBounds().height + this._title.getBounds().height * 0.3
    );
  }
  _mkTitle() {
    this._title = new Sprite.from("title");
    this._title.anchor.set(-0.16, -0.16);
  }
}
