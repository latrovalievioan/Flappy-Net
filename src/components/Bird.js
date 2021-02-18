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
    this._createBody();
    this._animateFall(config.bird.fall);
    /**
     * Indicates whether the bird is alive or not.
     * @type {boolean}
     * @public
     */
    this.alive = true;
  }

  /**
   * Creates a bird from sprite.
   * @method
   * @private
   */
  _createBody() {
    this.body = new Sprite.from("bird");
    this.body.anchor.set(0.5, 0.5);
    this.addChild(this.body);
  }

  /**
   * Animates the bird's fall.
   * @method
   * @private
   * @param {{
   * angle: number,
   * rotationDuration: number,
   * fallDuration: number,
   * }} Object
   */
  async _animateFall({ angle, rotationDuration, fallDuration }) {
    this._fallAnimation = gsap.timeline();
    await this._fallAnimation
      .fromTo(
        this,
        {
          y: this.y,
        },
        {
          y: config.view.height * 0.5,
          duration: fallDuration,
          ease: "Power1.easeIn",
        }
      )
      .fromTo(
        this,
        {
          angle: this.angle,
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
   * }} Object
   */
  async _animateThrust({ amount, rotationDuration, thrustDuration, angle }) {
    this._fallAnimation.pause();
    if (this._riseAnimation) this._riseAnimation.pause();
    this._riseAnimation = gsap.timeline();
    await this._riseAnimation
      .to(this, {
        y: this.y - amount,
        duration: thrustDuration,
        ease: "Power1.easeOut",
      })
      .to(
        this,
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
