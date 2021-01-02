import Application from './core/Application';
import * as PIXI from 'pixi.js';

if (process.env.NODE_ENV === 'development') {
  // required for pixi dev tools to work
  window.PIXI = PIXI;
  
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();

  // Used for automated testing only
  if (process.env.NODE_ENV === 'development') {
    window.__PIXI_APP = app;
  };
});
