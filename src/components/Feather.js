import { Container, Graphics, Sprite, TilingSprite } from "pixi.js";
import gsap from "gsap/all";
import Bird from "./Bird";
import ObstacleSet from "./ObstacleSet";
import Assets from "../core/AssetManager";
import Title from "./Title";
import Score from "./Score";
import EndScreen from "./EndScreen";
import config from "../config";

export default class Feather extends Container {
  constructor() {
    super();
  }
  async mkFeather() {
    this._feather = new Sprite.from("feather");
    this._feather.anchor.set(0.5, 0.5);
    this.addChild(this._feather);
    this._feather.scale.x = 0.05;
    this._feather.scale.y = 0.05;
    await this._animateFeatherFall();
    this.removeChild(this._feather);
  }

  async _animateFeatherFall() {
    const tl = gsap.timeline();
    await tl
      .to(this._feather, {
        y: "+=300",
        alpha: 0,
        duration: 3,
      })
      .to(
        this._feather,
        {
          x: "-=50",
          repeat: -1,
          yoyo: true,
          ease: "Power1.easeInOut",
          duration: 0.7,
        },
        "<"
      );
  }
}
