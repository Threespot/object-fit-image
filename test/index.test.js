/* TODO: Add more tests */

import ObjectFitImage from "../index";

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\s{2,}/g,'').trim();
}

test('Basic test', () => {
  document.body.innerHTML = '<div class="bg-image"><img class="bg-image-source" src="https://satyr.io/320x16:9" srcset="https://satyr.io/320x16:9 320w, https://satyr.io/640x16:9 640w, https://satyr.io/980x16:9 980w" alt="Image description test."></div>';

  var imageWrapper = document.querySelector(".bg-image");

  new ObjectFitImage(imageWrapper);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div class="bg-image" style="background-image: url('https://satyr.io/320x16:9'); background-size: cover; background-position: 50% 50%; display: block;">
      <img class="bg-image-source" src="https://satyr.io/320x16:9" srcset="https://satyr.io/320x16:9 320w, https://satyr.io/640x16:9 640w, https://satyr.io/980x16:9 980w" alt="Image description test." style="border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; white-space: nowrap; width: 1px;">
    </div>`));
});


test('Custom options', () => {
  document.body.innerHTML = '<div class="bg-image"><img class="bg-image-source" src="https://satyr.io/320x16:9" srcset="https://satyr.io/320x16:9 320w, https://satyr.io/640x16:9 640w, https://satyr.io/980x16:9 980w" alt="Image description test."></div>';

  var imageWrapper = document.querySelector(".bg-image");

  new ObjectFitImage(imageWrapper, {
    visuallyHiddenClass: "vh",
    backgroundPosition: "50% 0"
  });

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div class="bg-image" style="background-image: url('https://satyr.io/320x16:9'); background-size: cover; background-position: 50% 0; display: block;">
      <img class="bg-image-source vh" src="https://satyr.io/320x16:9" srcset="https://satyr.io/320x16:9 320w, https://satyr.io/640x16:9 640w, https://satyr.io/980x16:9 980w" alt="Image description test.">
    </div>`));
});


test('No “bg-image-source” class', () => {
  global.console = { warn: jest.fn() };

  document.body.innerHTML = '<div class="bg-image"><img src="#" alt="no class"></div>';

  var imageWrapper = document.querySelector(".bg-image");

  new ObjectFitImage(imageWrapper);

  expect(console.warn).toBeCalled();
});


test('No img tag', () => {
  global.console = { warn: jest.fn() };

  document.body.innerHTML = '<div class="bg-image"><p class="bg-image-source">Not an image</p></div>';

  var imageWrapper = document.querySelector(".bg-image");

  new ObjectFitImage(imageWrapper);

  expect(console.warn).toBeCalled();
});
