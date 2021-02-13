import { Container, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";

export default class Obstacle extends Container {
  constructor(x, y, h) {
    super();

    this._obstacle = new Graphics();
    this._obstacle.beginFill(0xf9dc5c);
    this._obstacle.drawRect(x, y, 80, h);
    this._obstacle.endFill();
    this.addChild(this._obstacle);
  }

  get Y() {
    return this._obstacle.y;
  }
}
