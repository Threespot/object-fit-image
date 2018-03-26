//------------------------------------------------------------------------
//
//------------------------------------------------------------------------
"use strict";

/**
 * Polyfill “object-fit” (IE 11-, aOS 4.4-) by applying <img>/<picture> src as “background-image” on target wrapper
 * @param {HTMLElement} el - Image wrapper element
 * @param {Object} opts - Options
 * @param {string|boolean} [opts.visuallyHiddenClass=false] - Class to add to the image to visually hide it (defaults to using inline styles)
 * @param {string} [opts.backgroundPosition="50% 50%"] - Optional background-position coordinates
 */

// Use CSS.supports() to test for object-fit, since browsers that don’t
// support it also don’t support object-fit.
// https://caniuse.com/#feat=css-supports-api
// https://caniuse.com/#feat=object-fit
const supportsObjectFit = window.CSS && CSS.hasOwnProperty('supports');

// Visually hidden CSS
// https://github.com/h5bp/html5-boilerplate/blob/d6561f2c4792b10c181b62a17e78a064d0a27884/dist/css/main.css#L128-L147
const visuallyHiddenCSS = "border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; white-space: nowrap; width: 1px;";

export default class BackgroundPicture {
  constructor(el, opts) {
    // Do nothing if `object-fit` is supported
    if (supportsObjectFit) {
      return false;
    }

    // Use Object.assign() to merge “opts” object with default values in this.options
    this.options = Object.assign(
      {},
      {
        visuallyHiddenClass: false,
        backgroundPosition: "50% 50%"
      },
      opts
    );

    var self = this;
    this.el = el;
    this.img = this.el.querySelector('.bg-image-source');

    if (!this.img) {
      console.warn("BackgroundPicture: No source image found. Add “bg-image-source” class to target image.");
      return false;
    }

    // If target is a <picture> element, get img tag
    if (this.img.tagName.toLowerCase() !== "img") {
      this.img = this.img.getElementsByTagName("img")[0];

      if (!this.img) {
        console.warn("BackgroundPicture: No image tag found in “bg-image-source” element.");
        return false;
      }
    }

    // Visually hide the img tag to keep alt text accessible (as opposed to “display: none”)
    if (this.options.visuallyHiddenClass && this.options.visuallyHiddenClass.length) {
      this.img.classList.add(this.options.visuallyHiddenClass);
    } else {
      this.img.setAttribute("style", visuallyHiddenCSS);
    }

    // Check if “currentSrc” is supported
    this.supportsCurrentSrc = typeof this.img.currentSrc !== "undefined";

    // Bind to onload event, which will fire whenever the source changes
    this.img.onload = function() {
      self.update("onload");
    };

    // Update if “onload” event fired before this script was parsed
    // (we know this happened if “currentSrc” has already been set)
    if (this.supportsCurrentSrc && this.img.currentSrc.length) {
      this.update("init");
    } else if (this.img.src.length) {
      this.update("old browser init");
    }
  }

  // Update parent wrapper
  update(msg) {
    // console.log(msg, {currentSrc: `${this.img.currentSrc}`, src: `${this.img.src}`});
    var source = this.supportsCurrentSrc ? this.img.currentSrc : this.img.src;

    if (!source.length) {
      this.el.style.backgroundImage = "";
    } else {
      this.el.setAttribute("style", `background-image: url('${source}'); background-size: cover; background-position: ${this.options.backgroundPosition}; display: block;`);
    }
  }
}
