import { Container } from "pixi.js";
import Bird from "../components/Bird";
import ObstacleSet from "../components/ObstacleSet";
import Assets from "../core/AssetManager";
import Title from "../components/Title";
import Score from "../components/Score";
import EndScreen from "../components/EndScreen";
import config from "../config";
import Feather from "../components/Feather";
import { random } from "../core/utils";
import { delay } from "../core/utils";
import { detectCollision } from "../core/utils";
import Ground from "../components/Ground";

/**
 * @class Initializes a new instance of a Flappy game.
 */
export default class Flappy extends Container {
  constructor() {
    super();
    this.sortableChildren = true;
    this._scored = false;
    this._thrustListener = (e) => this._birdThrust(e);
    this._restartGameHandler();
  }
  /**
   * @method Starts the game.
   */
  startGame() {
    Assets.sounds.over.stop();
    localStorage.setItem("currentScore", 0);
    this.removeChildren();
    this._createGround();
    this._obstacles = [];
    this._createBird();
    this._birdThrustListener();
    this._createScore();
    this._createTitle();
    this._createObstacleSet();
    this._update();
    this._frameCounter = 1;
  }

  /**
   *@method Restarts the game on keydon - "Space" if the bird is not alive.
   *@private
   */
  _restartGameHandler() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this._bird.alive) {
        this.startGame();
      }
    });
  }
  /**
   * @method Creates feathers instance.
   * @private
   */
  _createFeathers() {
    this._feathers = new Feather({ config: config.feather });
    this.addChild(this._feathers);
    this._feathers.x = this._bird.x;
    this._feathers.y = this._bird.y;
    const feathersAmount = random(
      config.feather.minFeathersAmount,
      config.feather.maxFeathersAmount
    );
    for (let i = 0; i < feathersAmount; i++) this._feathers.createFeather();
  }

  /**
   * @method Bird thrusts on keydown - "Space" if the bird is alive.
   * @private
   * @param {Event} e
   */
  _birdThrust(e) {
    if (e.code === "Space" && this._bird.alive) {
      this._createFeathers();
      this._bird._animateThrust(config.bird.thrust);
      Assets.sounds.wing.play();
    }
  }

  /**
   * @method Adds a new instance of feathers to the game. ?///??///???
   * @private
   */
  _birdThrustListener() {
    document.addEventListener("keydown", this._thrustListener);
  }
  /**
   * @method Adds a new instance of ground to the game.
   * @private
   */
  _createGround() {
    this._ground = new Ground(config);
    this.addChild(this._ground);
  }

  /**
   * @method Adds a new instance of scoreboard to the game.
   * @private
   */
  _createScore() {
    this._score = new Score(config);
    this.addChild(this._score);
    this._score.zIndex = 1;
  }
  /**
   * @method Adds a new instance of title to the game.
   * @private
   */
  _createTitle() {
    this.removeChild(this._title);
    this._title = new Title(config);
    this._title.zIndex = 1;
    this.addChild(this._title);
  }
  /**
   * @method Adds a new instance of bird to the game.
   * @private
   */
  _createBird() {
    this.removeChild(this._bird);
    this._bird = new Bird();
    this.addChild(this._bird);
    this._bird.x = -(config.view.width / 3);
  }
  /**
   * @method Adds a new instance of obstacles to the game.
   * @private
   */
  _createObstacleSet() {
    const _obstacleSet = new ObstacleSet(config);

    this.addChild(_obstacleSet);
    this._obstacles.push(_obstacleSet);
  }
  /**
   * @method Updates the first obstacle set from this._obstacles.
   * @private
   */
  _updateFirstObstacleSet() {
    if (!this._obstacles[0]) return;
    if (this._obstacles[0].x >= -config.view.width / 2 - config.obstacle.width)
      return;
    this.removeChild(this._obstacles[0]);
    this._obstacles.shift();
  }

  /**
   * @method Updates obstacle sets's positions.
   * @private
   */
  _updateObstaclesPosition() {
    this._obstacles.forEach((set) => {
      set.move();
    });
    this._updateFirstObstacleSet();
  }
  /**
   * @method Updates current score when the bird passes through a obstacle set.
   * @private
   */
  _updateScore() {
    this._obstacles.forEach((obstacle) => {
      if (
        !obstacle.scored &&
        obstacle.x + config.obstacle.width < this._bird.x - this._bird.width
      ) {
        this._score.increaseScore();
        obstacle.scored = true;
      }
    });
  }
  /**
   * @method Represents the game's ticker.
   * @private
   */
  _update() {
    if (this._frameCounter % config.obstacleSet.interval === 0) {
      this._createObstacleSet();
    }
    this._frameCounter++;
    this._updateObstaclesPosition();
    this._updateScore();
    const birdBody = this._bird.body;
    const obstacleTopBody = this._obstacles[0].obstacleTop._body;
    const obstacleBottomBody = this._obstacles[0].obstacleBottom._body;
    const groundBody = this._ground._body;
    if (
      detectCollision(birdBody, obstacleTopBody) ||
      detectCollision(birdBody, obstacleBottomBody) ||
      detectCollision(birdBody, groundBody)
    )
      this._endGame();
    else requestAnimationFrame(() => this._update());
  }

  /**
   * @method Handles game end.
   * @private
   */
  async _endGame() {
    this._score.setBestScore();
    document.removeEventListener("keydown", this._thrustListener);
    Assets.sounds.hit.play();
    await delay(Assets.sounds.hit.duration() * 1000);
    Assets.sounds.over.play();
    const endScreen = new EndScreen({
      splitScale: config.endScreen.splitScale,
    });
    this.addChild(endScreen);
    endScreen.show();
    this._bird.alive = false;
    await delay(Assets.sounds.over.duration() * 1000);
    if (!this._bird.alive) {
      this.startGame();
    }
  }
}
