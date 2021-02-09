import { Container, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";

export default class Obstacle extends Container {
  constructor(x, y, angle = 0) {
    super();
    this._obstacle = new Sprite.from("obsticle");
    this._obstacle.x = x;
    this._obstacle.y = y;
    this._obstacle.angle = angle;
    this._obstacle.anchor.set(0.5, 1);
    this.addChild(this._obstacle);
  }

  get Y() {
    return this._obstacle.y;
  }
}
