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
    this._createFeathersHandler = (e) => this._createFeathersHandlerXX(e);
  }
  /**
   * @method Starts the game.
   */
  startGame() {
    localStorage.setItem("currentScore", 0);
    this.removeChildren();
    this._createScore();
    this._obstacles = [];
    this._createBird();
    this._createFeathers();
    this._createTitle();
    this._update();
    this._frameCounter = 0;
  }

  _createFeathersHandlerXX(e) {
    this._feathers = new Feather();
    this.addChild(this._feathers);
    this._feathers.x = this._bird.x;
    this._feathers.y = this._bird.y;
    if (e.code === "Space" && this._bird.alive) {
      const feathersAmount = random(0, 3);
      for (let i = 0; i < feathersAmount; i++)
        this._feathers.createFeather(config.feather);
    }
  }

  /**
   * @method Adds a new instance of feathers to the game.
   * @private
   */
  _createFeathers() {
    document.addEventListener("keydown", this._createFeathersHandler);
  }

  /**
   * @method Adds a new instance of scoreboard to the game.
   * @private
   */
  _createScore() {
    this._score = new Score();
    this.addChild(this._score);
  }
  /**
   * @method Adds a new instance of title to the game.
   * @private
   */
  _createTitle() {
    this.removeChild(this._title);
    this._title = new Title();
    this.addChild(this._title);
  }
  /**
   * @method Adds a new instance of bird to the game.
   * @private
   */
  _createBird() {
    this._bird = null;
    this._bird = new Bird();
    this.addChild(this._bird);
    this._bird.x = -(config.view.width / 3);
  }
  /**
   * @method Adds a new instance of obstacles to the game.
   * @private
   */
  _createObstacleSet() {
    const _obstacleSet = new ObstacleSet();
    this.addChild(_obstacleSet);
    this._obstacles.push(_obstacleSet);
  }

  _updateFirstObstacleSet() {
    if (!this._obstacles[0]) return;
    if (this._obstacles[0].x >= -config.view.width / 2 - config.obstacle.width)
      return;
    this.removeChild(this._obstacles[0]);
    this._obstacles.shift();
  }

  _updateObstacles() {
    this._obstacles.forEach((set) => {
      set.move();
    });
    this._updateFirstObstacleSet();
  }

  _updateScore() {
    if (!this._obstacles[0]) return;
    console.log(this._obstacles[0].x, this._bird.x);
    if (this._obstacles[0].x < this._bird.x) {
      // console.log("pi6ki");
    }
  }
  /**
   * @method Represents the game's ticker.
   * @private
   */
  _update() {
    if (this._frameCounter % 100 === 0) {
      this._createObstacleSet();
      this._createTitle();
    }
    this._frameCounter++;
    this._updateObstacles();
    this._updateScore();
    // this._obstacles.forEach((set) => {
    //   if (
    //     set.x <
    //       -config.view.width -
    //         this._obstacles[0].getBounds().width +
    //         this._bird.getBounds().x &&
    //     !this._scored
    //   ) {
    //     this._scored = true;
    //     this._score.increaseScore();
    //   }
    // });
    if (
      this._bird.getBounds().y >=
      config.view.height - this._bird.getBounds().height
    ) {
      this._endGame();
    } else {
      this._detectCollision()
        ? this._endGame()
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
  _endGame() {
    this._score.setBestScore();
    this._bird.alive = false;
    Assets.sounds.hit.play();
    document.removeEventListener("keydown", this._createFeathersHandler);
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
