import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";
import { random } from "../core/utils";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class Feather extends Container {
  /**
   * @constructor
   * @param {{Object}} Object - Configuration object.
   */
  constructor({ config }) {
    super();
    this._config = config;
  }
  /**
   * @method Creates a feather from sprite.
   * @async
   * @param {{
   * scaleMin: number
   * scaleMax: number
   * }} Object
   */
  async createFeather() {
    this._feather = new Sprite.from("feather");
    this._feather.anchor.set(0.5, 0.5);
    this.addChild(this._feather);
    const scale = random(this._config.scaleMin, this._config.scaleMax);
    this._feather.scale.x = scale;
    this._feather.scale.y = scale;
    await this._animateFeatherFall();
    this.removeChildren();
  }

  /**
   * @method Animates feather's fall.
   * @private
   * @async
   * @param {{
   * fall: number
   * swing: number
   * }} Object
   */
  async _animateFeatherFall() {
    console.log(this._config);
    const swingAmount = random(
      this._config.animation.swing.amountMin,
      this._config.animation.swing.amountMax
    );
    const fallSpeed = random(
      this._config.animation.fall.maxSpeed,
      this._config.animation.fall.minSpeed
    );
    const tl = gsap.timeline();
    await tl
      .to(this._feather, {
        y: this._config.animation.fall.amount,
        alpha: 0,
        duration: fallSpeed,
      })
      .to(
        this._feather,
        {
          x: `-=${swingAmount}`,
          repeat: -1,
          yoyo: true,
          ease: "Power1.easeInOut",
          duration: this._config.animation.swing.speed,
        },
        "<"
      );
  }
}
