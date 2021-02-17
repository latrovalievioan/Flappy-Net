import { Container, Graphics, Sprite, Text } from "pixi.js";
import gsap from "gsap";
import config from "../config";
import { scaleSprite } from "../core/utils";

/**
 * @class Initializes a new instance of a EndScreen.
 */
export default class EndScreen extends Container {
  constructor() {
    super();
    this.leftContainer = new Container();
    this.addChild(this.leftContainer);

    this.rightContainer = new Container();
    this.addChild(this.rightContainer);

    this.backgroundWidth = null;
    this.backgroundHeight = null;
  }

  show() {
    this._createRightSide();
    this._createLeftSide();
    this._animateEndscreen();
  }
  _createScore(container, scoreNum) {
    const score = new Text(scoreNum, {
      fontFamily: "Arial Black",
      fontSize: 200 * config.endScreen.splitScale,
      fill: 0x000000,
      align: "center",
    });
    score.anchor.set(0.5, 0.5);
    container.addChild(score);
  }

  _createBackground(container, spriteName) {
    const background = new Sprite.from(spriteName);
    background.anchor.set(0.5, 0.5);
    scaleSprite(background, config.endScreen.splitScale);
    container.addChild(background);
    this.backgroundWidth = background.width;
    this.backgroundHeight = background.height;
    if (container === this.rightContainer)
      container.x -= this.backgroundWidth / 2;
    if (container === this.leftContainer)
      container.x += this.backgroundWidth / 2;
  }
  _createLeftSide() {
    this._createBackground(this.leftContainer, "endscreenScore");
    this._createScore(this.leftContainer, localStorage.getItem("currentScore"));
    this._createMask(this.leftContainer);
  }
  _createRightSide() {
    this._createBackground(this.rightContainer, "endscreenBest");
    this._createScore(this.rightContainer, localStorage.getItem("bestScore"));
    this._createMask(this.rightContainer);
  }
  _createMask(container) {
    const mask = new Graphics();
    this.addChild(mask);
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this.backgroundWidth, this.backgroundHeight);
    mask.pivot.x = this.backgroundWidth / 2;
    mask.pivot.y = this.backgroundHeight / 2;
    if (container === this.rightContainer) mask.x += this.backgroundWidth / 2;
    if (container === this.leftContainer) mask.x -= this.backgroundWidth / 2;
    container.mask = mask;
  }
  _animateEndscreen() {
    const tl = gsap.timeline();
    tl.to(this.leftContainer, {
      x: `-=${this.backgroundWidth}`,
    }).to(
      this.rightContainer,
      {
        x: `+=${this.backgroundWidth}`,
      },
      "<"
    );
  }
}
