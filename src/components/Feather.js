import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";
import { random } from "../core/utils";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class Feather extends Container {
  constructor() {
    super();
  }

  /**
   * @method Creates a feather from sprite.
   * @async
   * @param {{
   * scaleMin: number
   * scaleMax: number
   * } Object
   */
  async mkFeather({ scaleMin, scaleMax }) {
    this._feather = new Sprite.from("feather");
    this._feather.anchor.set(0.5, 0.5);
    this.addChild(this._feather);
    let scale = random(scaleMin, scaleMax);
    this._feather.scale.x = scale;
    this._feather.scale.y = scale;
    await this._animateFeatherFall();
    this.removeChild(this._feather);
  }

  /**
   * @method Animates feather's fall.
   * @private
   * @async
   */
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
