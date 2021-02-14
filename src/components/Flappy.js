import { Container, Graphics, Sprite, TilingSprite } from "pixi.js";
import gsap from "gsap/all";
import Bird from "./Bird";
import ObstacleSet from "./ObstacleSet";
import Assets from "../core/AssetManager";
import Title from "./Title";
import Score from "./Score";
import EndScreen from "./EndScreen";
import config from "../config";
import Feather from "./Feather";

export default class Flappy extends Container {
  constructor() {
    super();
    this._scored = false;
  }

  startGame() {
    localStorage.setItem("currentScore", 0);
    this.removeChildren();
    this._mkScore();
    this._mkTitle();
    this._obstacles = [];
    this._mkBird();
    this._mkFeathers();
    this.update();
    this._counter = 0;
  }

  _mkFeathers() {
    document.addEventListener("keydown", (e) => {
      console.log(this._feathers);
      this._feathers = new Feather();
      this.addChild(this._feathers);
      this._feathers.x = this._bird.Xy[0];
      this._feathers.y = this._bird.Xy[1];
      if (e.code === "Space" && this._bird.running) {
        this._feathers.mkFeather();
      }
    });
  }

  _mkScore() {
    this._score = new Score();
    this.addChild(this._score);
  }

  _mkTitle() {
    this._title = new Title();
    this.addChild(this._title);
  }
  _mkBird() {
    this._bird = null;
    this._bird = new Bird();
    this.addChild(this._bird);
  }
  _mkObstacleSet() {
    const _obstacleSet = new ObstacleSet();
    this.addChild(_obstacleSet);
    this._obstacles.push(_obstacleSet);
  }

  update() {
    if (this._counter % 100 === 0) this._mkObstacleSet();
    this._counter++;
    this._obstacles.forEach((set) => {
      set.x -= config.view.width * 0.003;
      if (set.x < -config.view.width - this._obstacles[0].getBounds().width) {
        this.removeChild(this._obstacles[0]);
        this._obstacles.shift();
        setTimeout(() => (this._scored = false), 500);
      }
      if (
        set.x <
          -config.view.width -
            this._obstacles[0].getBounds().width +
            this._bird.getBounds().x &&
        !this._scored
      ) {
        this._scored = true;
        this._score.score();
      }
    });
    if (
      this._bird.getBounds().y >=
      config.view.height - this._bird.getBounds().height
    ) {
      this._onCollision();
    } else {
      this._detectCollision()
        ? this._onCollision()
        : requestAnimationFrame(this.update.bind(this));
    }
  }

  _detectCollision() {
    if (this._obstacles[0] == undefined) return;
    const birdBounds = this._bird.getBounds();
    const topColumnBounds = this._obstacles[0].obstacleTop.getBounds();
    const botColumnBounds = this._obstacles[0].obstacleBot.getBounds();

    return (
      (birdBounds.x + birdBounds.width > topColumnBounds.x &&
        birdBounds.x < topColumnBounds.x + topColumnBounds.width &&
        birdBounds.y + birdBounds.height > topColumnBounds.y &&
        birdBounds.y < topColumnBounds.y + topColumnBounds.height) ||
      (birdBounds.x + birdBounds.width > botColumnBounds.x &&
        birdBounds.x < botColumnBounds.x + botColumnBounds.width &&
        birdBounds.y + birdBounds.height > botColumnBounds.y &&
        birdBounds.y < botColumnBounds.y + botColumnBounds.height)
    );
  }

  _onCollision() {
    this._score.setBestScore();
    this._bird.running = false;
    Assets.sounds.hit.play();
    setTimeout(() => {
      Assets.sounds.over.play();
      const endScreen = new EndScreen();
      this.addChild(endScreen);
      endScreen.endscreen();
      setTimeout(() => {
        this.startGame();
      }, 3500);
    }, 300);
  }
}
