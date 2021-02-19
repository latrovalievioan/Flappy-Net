import { Container, Graphics, Sprite, Text } from "pixi.js";
import gsap from "gsap";
import { scaleSprite } from "../core/utils";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class EndScreen extends Container {
  /**
   * @constructor
   * @param {{
   * splitSclale : number
   * }} Object - Configuration object.
   */
  constructor({ splitScale }) {
    super();
    this._splitScale = splitScale;
    this._leftContainer = new Container();
    this.addChild(this._leftContainer);

    this._rightContainer = new Container();
    this.addChild(this._rightContainer);

    /**
     * Indicates the container's background width.
     * @type {number}
     * @private
     */
    this._backgroundWidth = null;
    /**
     * Indicates the container's background height.
     * @type {number}
     * @private
     */
    this._backgroundHeight = null;
  }

  /**
   * @method Shows the endscreen.
   */
  show() {
    this._createRightSide();
    this._createLeftSide();
    this._animateEndscreen();
  }

  /**
   * @method Creates score text from scoreNum inside container.
   * @private
   * @param {object} container
   * @param {number} scoreNum
   */
  _createScore(container, scoreNum) {
    const score = new Text(scoreNum, {
      fontFamily: "Arial Black",
      fontSize: 200 * this._splitScale,
      fill: 0x000000,
      align: "center",
    });
    score.anchor.set(0.5, 0.5);
    container.addChild(score);
  }
  /**
   * @method Creates a background for container.
   * @private
   * @param {object} container
   * @param {string} spriteName
   */
  _createBackground(container, spriteName) {
    const background = new Sprite.from(spriteName);
    background.anchor.set(0.5, 0.5);
    scaleSprite(background, this._splitScale);
    container.addChild(background);
    this._backgroundWidth = background.width;
    this._backgroundHeight = background.height;
    if (container === this._rightContainer)
      container.x -= this._backgroundWidth / 2;
    if (container === this._leftContainer)
      container.x += this._backgroundWidth / 2;
  }
  /**
   * @method Creates a mask for container.
   * @private
   * @param {object} container
   */
  _createMask(container) {
    const mask = new Graphics();
    this.addChild(mask);
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this._backgroundWidth, this._backgroundHeight);
    mask.pivot.x = this._backgroundWidth / 2;
    mask.pivot.y = this._backgroundHeight / 2;
    if (container === this._rightContainer) mask.x += this._backgroundWidth / 2;
    if (container === this._leftContainer) mask.x -= this._backgroundWidth / 2;
    container.mask = mask;
  }

  /**
   * @method Animates the endscreen containers.
   * @private
   */
  _animateEndscreen() {
    const tl = gsap.timeline();
    tl.to(this._leftContainer, {
      x: `-=${this._backgroundWidth}`,
    }).to(
      this._rightContainer,
      {
        x: `+=${this._backgroundWidth}`,
      },
      "<"
    );
  }

  /**
   * @method Creates left side of EndScreen.
   * @private
   */
  _createLeftSide() {
    this._createBackground(this._leftContainer, "endscreenScore");
    this._createScore(
      this._leftContainer,
      localStorage.getItem("currentScore")
    );
    this._createMask(this._leftContainer);
  }

  /**
   * @method Creates right side of EndScreen.
   * @private
   */
  _createRightSide() {
    this._createBackground(this._rightContainer, "endscreenBest");
    this._createScore(this._rightContainer, localStorage.getItem("bestScore"));
    this._createMask(this._rightContainer);
  }
}
