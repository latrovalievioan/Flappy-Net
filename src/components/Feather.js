import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";
import { random } from "../core/utils";
import config from "../config";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class Feather extends Container {
  /**
   * @method Creates a feather from sprite.
   * @async
   * @param {{
   * scaleMin: number
   * scaleMax: number
   * }} Object
   */
  async createFeather({ scaleMin, scaleMax }) {
    this._feather = new Sprite.from("feather");
    this._feather.anchor.set(0.5, 0.5);
    this.addChild(this._feather);
    const scale = random(scaleMin, scaleMax);
    this._feather.scale.x = scale;
    this._feather.scale.y = scale;
    await this._animateFeatherFall(config.feather.animation);
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
  async _animateFeatherFall({ fall, swing }) {
    const swingAmount = random(swing.amountMin, swing.amountMax);
    const fallSpeed = random(fall.maxSpeed, fall.minSpeed);
    const tl = gsap.timeline();
    await tl
      .to(this._feather, {
        y: fall.amount,
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
          duration: swing.speed,
        },
        "<"
      );
  }
}
