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
 * @function Detects collision between two objects.
 * @private
 * @param {object} elem1
 * @param {object} elem2
 */
export function detectCollision(elem1, elem2) {
  return (
    elem1.x + elem1.width > elem2.x + elem2.width / 4 &&
    elem1.x < elem2.x + elem2.width &&
    elem1.y + elem1.height > elem2.y &&
    elem1.y < elem2.y + elem2.height
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
