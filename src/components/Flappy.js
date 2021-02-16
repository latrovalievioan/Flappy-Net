import { Container } from "pixi.js";
import Bird from "./Bird";
import ObstacleSet from "./ObstacleSet";
import Assets from "../core/AssetManager";
import Title from "./Title";
import Score from "./Score";
import EndScreen from "./EndScreen";
import config from "../config";
import Feather from "./Feather";
import { random } from "../core/utils";

/**
 * @class Initializes a new instance of a Flappy game.
 */
export default class Flappy extends Container {
  constructor() {
    super();
    this._scored = false;
  }
  /**
   * @method Starts the game.
   */
  startGame() {
    localStorage.setItem("currentScore", 0);
    this.removeChildren();
    this._mkScore();
    this._mkTitle();
    this._obstacles = [];
    this._mkBird();
    this._mkFeathers();
    this._update();
    this._counter = 0;
  }
  /**
   * @method Adds a new instance of feathers to the game.
   * @private
   */
  _mkFeathers() {
    document.addEventListener("keydown", (e) => {
      this._feathers = new Feather();
      this.addChild(this._feathers);
      this._feathers.x = this._bird.Xy[0];
      this._feathers.y = this._bird.Xy[1];
      if (e.code === "Space" && this._bird.running) {
        const feathersAmount = random(1, 3);
        for (let i = 0; i < feathersAmount; i++)
          this._feathers.mkFeather(config.feather);
      }
    });
  }

  /**
   * @method Adds a new instance of scoreboard to the game.
   * @private
   */
  _mkScore() {
    this._score = new Score();
    this.addChild(this._score);
  }
  /**
   * @method Adds a new instance of title to the game.
   * @private
   */
  _mkTitle() {
    this._title = new Title();
    this.addChild(this._title);
  }
  /**
   * @method Adds a new instance of bird to the game.
   * @private
   */
  _mkBird() {
    this._bird = null;
    this._bird = new Bird();
    this.addChild(this._bird);
  }
  /**
   * @method Adds a new instance of obstacles to the game.
   * @private
   */
  _mkObstacleSet() {
    const _obstacleSet = new ObstacleSet();
    this.addChild(_obstacleSet);
    this._obstacles.push(_obstacleSet);
  }
  /**
   * @method Represents the game's ticker.
   * @private
   */
  _update() {
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
        : requestAnimationFrame(this._update.bind(this));
    }
  }

  /**
   * @method Detects collision between bird and obstacle from the first obstacle set in obstacles array.
   * @private
   */
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
  /**
   * @method Handles collision.
   * @private
   */
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
