# Fluid Iframe

[![npm](https://badge.fury.io/js/%40threespot%2Fobject-fit-image.svg)](https://www.npmjs.com/package/@threespot/object-fit-image)
[![Build Status](https://travis-ci.org/Threespot/object-fit-image.svg?branch=master)](https://travis-ci.org/Threespot/object-fit-image)
[![Coverage Status](https://coveralls.io/repos/github/Threespot/object-fit-image/badge.svg)](https://coveralls.io/github/Threespot/object-fit-image)

Polyfills `object-fit: cover` on `<img>` or `<picture>` tags by applying the `src` as an inline “background-image” on a target wrapper. Required for IE 11- and Android 4.4-. We recommend using [Picturefill](https://scottjehl.github.io/picturefill) to polyfill the `<picture>` element itself.

## Install

```bash
yarn add @threespot/object-fit-image
```

## Usage

**Markup**
```html
  <div class="bg-image">
    <img class="bg-image-source" src="https://satyr.io/320x16:9" srcset="https://satyr.io/320x16:9 320w, https://satyr.io/640x16:9 640w" alt="Image description.">
  </div>
```

```js
import ObjectFitImage from "@threespot/object-fit-image";

var imageWrappers = document.querySelectorAll(".bg-image");

imageWrappers.forEach(el => new ObjectFitImage(el));

// With custom options
imageWrappers.forEach(el => new ObjectFitImage(el, {
  visuallyHiddenClass: "vh",
  backgroundPosition: "50% 0"
}));
```

Example styles for browsers that support `object-fit`:

```scss
  .bg-image {
    display: block;// for <picture> elements
    position: relative;

    &-source {
      height: 100%;
      left: 0;
      object-fit: cover;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
```

**Additional markup examples**
```html
  <!-- Picture tag -->
  <picture class="bg-image">
    <source srcset="https://satyr.io/768x16:9/3" media="(min-width: 768px)">
    <source srcset="https://satyr.io/480x16:9/2" media="(min-width: 480px)">
    <img class="bg-image-source" src="https://satyr.io/320x16:9/1" alt="Image description 2 test.">
  </picture>

  <!-- Picture tag with wrapper -->
  <div class="bg-image">
    <picture class="bg-image-source">
      <source srcset="https://satyr.io/768x16:9/3" media="(min-width: 768px)">
      <source srcset="https://satyr.io/480x16:9/2" media="(min-width: 480px)">
      <img src="https://satyr.io/320x16:9/1" alt="Image description 1 test.">
    </picture>
  </div>
```

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/object-fit-image/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
