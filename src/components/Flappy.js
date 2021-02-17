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
import Ground from "./Ground";

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
    this._createGround();
    this._createScore();
    this._obstacles = [];
    this._createBird();
    this._createFeathers();
    this._createTitle();
    this._createObstacleSet();
    this._update();
    this._frameCounter = 1;
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

  _createGround() {
    this._ground = new Ground();
    this.addChild(this._ground);
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
    let i = 0;
    if (this._obstacles[i].scored && this._obstacles[1]) i = 1;
    if (
      this._obstacles[i].x + config.obstacle.width <
      this._bird.x - this._bird.width
    ) {
      this._score.increaseScore();
      this._obstacles[i].scored = true;
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
    this._detectCollision(this._bird.body.getBounds(), [
      this._obstacles[0].obstacleTop._body.getBounds(),
      this._obstacles[0].obstacleBot._body.getBounds(),
      this._ground._body.getBounds(),
    ])
      ? this._endGame()
      : requestAnimationFrame(() => this._update());
  }

  /**
   * @method Detects collision between bird and obstacle from the first obstacle set in obstacles array.
   * @private
   */
  _detectCollision(main, elems = []) {
    let hasCollision = false;
    elems.forEach((elem) => {
      if (
        main.x + main.width > elem.x + elem.width / 4 &&
        main.x < elem.x + elem.width &&
        main.y + main.height > elem.y &&
        main.y < elem.y + elem.height
      )
        hasCollision = true;
    });
    return hasCollision;
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
