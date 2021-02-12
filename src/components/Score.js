import { Container, Sprite, Text, Graphics } from "pixi.js";
import Assets from "../core/AssetManager";
export default class Score extends Container {
  constructor() {
    super();
    this.count = 0;
    this._mkScore();
    this._mkBackground();
  }

  _mkBackground() {
    this._scoreBackground = new Sprite.from("score");
    this._scoreBackground.scale.y = 0.4;
    this._scoreBackground.scale.x = 0.4;
    this._scoreBackground.y = -window.innerHeight / 2;
    this._scoreBackground.x = window.innerWidth / 4;
    this._scoreBackground.addChild(this._currentCounter);
    this.addChild(this._scoreBackground);
  }
  _mkScore() {
    this._currentCounter = new Text(`${this.count}`, {
      fontFamily: "Arial",
      fontSize: 80,
      fill: 0xf9dc5c,
      align: "center",
      fontWeight: 800,
    });
  }

  score() {
    Assets.sounds.score.play();
    this._scoreBackground.removeChild(this._scoreContainer);
    this.count++;
    this._mkScore();
    this._scoreBackground.addChild(this._scoreContainer);
  }
}
