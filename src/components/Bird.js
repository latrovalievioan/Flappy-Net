import { Container, Sprite } from "pixi.js";
import gsap from "gsap";
import Assets from "../core/AssetManager";
import config from "../config";

export default class Bird extends Container {
  constructor() {
    super();
    console.log(config);
    this._mkBird();
    this._animateFall();
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && this.running) {
        this._animateRise();
        Assets.sounds.wing.play();
      }
    });
  }
  _mkBird() {
    this._bird = new Sprite.from("bird");
    this._bird.x = -(config.view.width / 3);
    this._bird.anchor.set(0.5, 0.5);
    this.addChild(this._bird);
    this.running = true;
  }
  get Xy() {
    return [this._bird.x, this._bird.y];
  }

  async _animateFall() {
    this._fallAnimation = gsap.timeline();
    await this._fallAnimation
      .fromTo(
        this._bird,
        {
          y: this._bird.y,
        },
        {
          y: config.view.height * 0.5,
          duration: 1,
          ease: "Power1.easeIn",
        }
      )
      .fromTo(
        this._bird,
        {
          angle: this._bird.angle,
        },
        {
          angle: 90,
          duration: 0.6,
          ease: "Power1.easeIn",
        },
        "<"
      );
  }
  async _animateRise() {
    this._fallAnimation.pause();
    if (this._riseAnimation) this._riseAnimation.pause();
    this._riseAnimation = gsap.timeline();
    await this._riseAnimation
      .to(this._bird, {
        y: this._bird.y - 100,
        duration: 0.4,
        ease: "Power1.easeOut",
      })
      .to(
        this._bird,
        {
          angle: -20,
          duration: 0.4,
          ease: "Power2.easeOut",
        },
        "<"
      );
    this._animateFall();
  }
}
