/**
 * @desc fits display object, by altering its scale, into passed width and height
 * @param {PIXI.DisplayObject} element
 * @param {Object} size
 * @param {Number} size.width
 * @param {Number} size.height
 * @param {Boolean} [ignoreRatio = true]
 * @param {Boolean} [overscale = false] - if true the scaled elememnt may have scale bigger then 1
 */
export function fit(
  element,
  { width, height },
  ignoreRatio = false,
  overscale = false
) {
  const wScale = width / element.width;
  const hScale = height / element.height;
  const max = overscale ? Infinity : 1;
  const scale = Math.min(wScale, hScale, max);

  /* eslint-disable no-param-reassign */
  element.scale.x *= ignoreRatio ? wScale : scale;
  element.scale.y *= ignoreRatio ? hScale : scale;
  /* eslint-enable no-param-reassign */
}

/**
 * @desc centers a display /vertically, horizontally or both/ object into its parent
 * @param {PIXI.DisplayObject} element
 * @param {Number} width
 * @param {Number} height
 * @param {Boolean} vertically
 * @param {Boolean} horizontally
 */
export function center(
  element,
  { width, height },
  { vertically = true, horizontally = true } = {}
) {
  /* eslint-disable no-param-reassign */
  element.x = horizontally ? width / 2 - element.width / 2 : element.x;
  element.y = vertically ? height / 2 - element.height / 2 : element.y;
  /* eslint-enable no-param-reassign */
}

/**
 * @param {Number} min
 * @param {Number} max
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * @function Detects collision between two display-objects.
 * @private
 * @param {object} elem1
 * @param {object} elem2
 */
export function detectCollision(elem1, elem2) {
  return (
    elem1.getBounds().x + elem1.getBounds().width >
      elem2.getBounds().x + elem2.getBounds().width / 4 &&
    elem1.getBounds().x < elem2.getBounds().x + elem2.getBounds().width &&
    elem1.getBounds().y + elem1.getBounds().height > elem2.getBounds().y &&
    elem1.getBounds().y < elem2.getBounds().y + elem2.getBounds().height
  );
}

/**
 * @function Scales a sprite's x and y by the same amount.
 * @param {object} sprite
 * @param {number} num
 */
export function scaleSprite(sprite, num) {
  sprite.scale.x = num;
  sprite.scale.y = num;
}

/**
 * @function Alternative to setTimeout.
 * @param {number} time - miliseconds.
 * @returns {Promise} - can be awaited.
 */
export function delay(time) {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove();
    }, time);
  });
}
