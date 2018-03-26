import FluidIframe from "../index";

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\s{2,}/g,'').trim();
}

const youtubeEmbed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen=""></iframe>';

test('Basic test', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div style="padding-top: 56.25%; position: relative;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen="" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;"></iframe>
    </div>`));
});

test('Multiple classes', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe, {
    classes: "foo bar"
  });

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div class="foo bar" style="padding-top: 56.25%; position: relative;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen="" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;"></iframe>
    </div>`));
});

test('No wrapper', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe, {
    wrap: false,
    classes: "video-wide"
  });

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen="" class="video-wide" style="display: block; height: 56.25vw; margin-left: auto; margin-right: auto; max-height: 315px; max-width: 100%; width: 560px;"></iframe>`));
});


test('No inline styles', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe, {
    inlineStyles: false,
    classes: "video-wide"
  });

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div class="video-wide">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen=""></iframe>
    </div>`));
});


test('Default aspect ratio', () => {
  document.body.innerHTML = '<iframe src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen=""></iframe>';

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div style="padding-top: 56.25%; position: relative;">
      <iframe src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen="" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;"></iframe>
    </div>`));
});


test('Force aspect ratio', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe, {forceRatio: 3 / 4});

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div style="padding-top: 75%; position: relative;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FuYW3GdPhsc" frameborder="0" allowfullscreen="" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;"></iframe>
    </div>`));
});


test('Invalid options', () => {
  document.body.innerHTML = youtubeEmbed;

  var iframe = document.querySelector("iframe");

  new FluidIframe(iframe, {inlineStyles: false});

  expect(minify(document.body.innerHTML)).toBe(minify(youtubeEmbed));
});

test('Not iframe', () => {
  document.body.innerHTML = "<p>Test</p>";

  var iframe = document.querySelector("p");

  new FluidIframe(iframe);

  expect(document.body.innerHTML).toBe("<p>Test</p>");
});