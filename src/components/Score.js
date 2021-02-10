import { Container, Sprite, Text, Graphics } from "pixi.js";
import Assets from "../core/AssetManager";
export default class score_score extends Container {
  constructor() {
    super();
    this.count = 0;
    this._mkScore();
    this._mkBackground();
    this.addChild(this._graphics);
    this._graphics.addChild(this._scoreContainer);
    this._graphics.y = -window.innerHeight / 2;
    this._graphics.x = window.innerWidth / 4;
  }

  _mkBackground() {
    this._graphics = new Graphics();
    this._graphics.beginFill(0x241f09);
    this._graphics.drawRect(
      0,
      0,
      this._scoreContainer.getBounds().width +
        this._scoreContainer.getBounds().width * 0.3,
      this._scoreContainer.getBounds().height +
        this._scoreContainer.getBounds().height * 0.3
    );
  }
  _mkScore() {
    this._scoreContainer = new Container();
    this._score = new Text("Score", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xf9dc5c,
      align: "center",
    });
    this._score.anchor.set(-0.17, 0);
    this._counter = new Text(`${this.count}`, {
      fontFamily: "Arial",
      fontSize: 30,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
    this._counter.anchor.set(-1.17, -1);
    this._scoreContainer.addChild(this._score);
    this._scoreContainer.addChild(this._counter);
  }

  score() {
    Assets.sounds.score.play();
    this._graphics.removeChild(this._scoreContainer);
    this.count++;
    this._mkScore();
    this._graphics.addChild(this._scoreContainer);
  }
}
