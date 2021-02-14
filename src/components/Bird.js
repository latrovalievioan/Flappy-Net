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
    this._animateFall();
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
        this._animateThrust();
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
   */
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
  /**
   * Animates the bird's thrust.
   * @method
   * @private
   */
  async _animateThrust() {
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
