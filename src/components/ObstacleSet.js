import { Container, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";
import Obstacle from "./Obstacle";
import Assets from "../core/AssetManager";

export default class ObstacleSet extends Container {
  constructor() {
    super();
    this._hole = 200;
    this._topHeight = this._randomInt();
    this._botHeight = window.innerHeight - this._topHeight - this._hole;
    this._mkObstacles();
  }
  _mkObstacles() {
    this.obstacleTop = new Obstacle(
      window.innerWidth / 2,
      -window.innerHeight / 2,
      this._topHeight,
      "top"
    );
    this.obstacleBot = new Obstacle(
      window.innerWidth / 2,
      window.innerHeight / 2 - this._botHeight,
      this._botHeight,
      "bot"
    );
    this.addChild(this.obstacleTop);
    this.addChild(this.obstacleBot);
  }

  _randomInt() {
    return (
      Math.floor(Math.random() * (window.innerHeight - this._hole - 50)) + 1
    );
  }
}
