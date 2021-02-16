import { Container, Sprite } from "pixi.js";
import gsap from "gsap";
import Assets from "../core/AssetManager";
import config from "../config";

/**
 * @class Initializes a new instance of a Bird.
 */
export default class Bird extends Container {
  constructor() {
    super();
    this._mkBird();
    this._animateFall(config.bird.fall);
    this._thrust();
  }

  /**
   * Uses a bird animation method and a sound to represent a bird thrust.
   * @method
   * @private
   */
  _thrust() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && this.running) {
        this._animateThrust(config.bird.thrust);
        Assets.sounds.wing.play();
      }
    });
  }
  /**
   * Creates a bird from sprite.
   * @method
   * @private
   */
  _mkBird() {
    this._bird = new Sprite.from("bird");
    this._bird.x = -(config.view.width / 3);
    this._bird.anchor.set(0.5, 0.5);
    this.addChild(this._bird);
    this.running = true;
  }

  /**
   * @returns Bird's container current positions.
   */
  get Xy() {
    return [this._bird.x, this._bird.y];
  }

  /**
   * Animates the bird's fall.
   * @method
   * @private
   * @param {{
   * angle: number,
   * rotationDuration: number,
   * fallDuration: number,
   * }} Object - from config.js
   */
  async _animateFall({ angle, rotationDuration, fallDuration }) {
    this._fallAnimation = gsap.timeline();
    await this._fallAnimation
      .fromTo(
        this._bird,
        {
          y: this._bird.y,
        },
        {
          y: config.view.height * 0.5,
          duration: fallDuration,
          ease: "Power1.easeIn",
        }
      )
      .fromTo(
        this._bird,
        {
          angle: this._bird.angle,
        },
        {
          angle: angle,
          duration: rotationDuration,
          ease: "Power1.easeIn",
        },
        "<"
      );
  }
  /**
   * Animates the bird's thrust.
   * @method
   * @private
   * @param {{
   * amount: number
   * rotationDuration: number
   * thrustDuration: number
   * angle: number
   * }} Object - from config.js
   */
  async _animateThrust({ amount, rotationDuration, thrustDuration, angle }) {
    this._fallAnimation.pause();
    if (this._riseAnimation) this._riseAnimation.pause();
    this._riseAnimation = gsap.timeline();
    await this._riseAnimation
      .to(this._bird, {
        y: this._bird.y - amount,
        duration: thrustDuration,
        ease: "Power1.easeOut",
      })
      .to(
        this._bird,
        {
          angle: angle,
          duration: rotationDuration,
          ease: "Power2.easeOut",
        },
        "<"
      );
    this._animateFall(config.bird.fall);
  }
}
