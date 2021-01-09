import { Container, Graphics, Sprite } from 'pixi.js';
import gsap from 'gsap';

export default class Footer extends Container {
  constructor() {
    super();

    this.name = 'footer';

    this._addBg();
    this._addHighlight();
    this._addLogo();

    this.height = 70;
  }

  /**
   * @private
   */
  _addBg() {
    const bg = new Graphics();
    bg.beginFill(0x000000);
    bg.drawRect(0, 0, window.innerWidth, 70);
    bg.endFill();
    this.addChild(bg);
  }

  /**
   * @private
   */
  _addHighlight() {
    const highlight = new Graphics();
    highlight.beginFill(0xffd800);
    highlight.drawRect(0, 0, window.innerWidth, 70);
    highlight.scale.x = 1;
    highlight.endFill();
    this.addChild(highlight);

    gsap.to(highlight.scale, { x: 0.005, duration: 1.5, ease: 'circ.inOut' });
  }

  /**
   * @private
   */
  _addLogo() {
    const logo = Sprite.from('logo');
    logo.x = window.innerWidth - logo.width - 20;
    logo.y = logo.height;
    this.addChild(logo);

    logo.interactive = true;
    logo.buttonMode = true;

    logo.on('pointerdown', () => window.location = 'https://www.booost.bg/');
  }
}