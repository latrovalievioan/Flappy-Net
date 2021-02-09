import { Container, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";
import Obstacle from "./Obstacle";

export default class ObstacleSet extends Container {
  constructor() {
    super();
    this.obstacleTop = new Obstacle(
      window.innerWidth / 2,
      -window.innerHeight / 2,
      180
    );
    this.obstacleBot = new Obstacle(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.addChild(this.obstacleTop);
    this.addChild(this.obstacleBot);
  }
}
