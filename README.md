# MQBE. Media Query Breakpoint Events

This small function creates JQuery events that are fired when you enter or leave a CSS media query _state_, for instance from desktop to tablet... etc. It's useful when you need to start or stop some JS functionallity depending on MediaQuery changes / states.

 I developed it for a project where several sliders must be created on mobile only.

# Usage

## First - Include CSS

First part depends on a little piece of CSS, where you can define your media query breakpoints. You must add an string to identify that state from the JS. It's easier that it sounds. Take a look to the code below.

**Use only [a-zA-Z_] chars to define the string, and don't use hyphens ` - `**

```css
/* DESKTOP */
@media all and (min-width:1px) {
  body:after {
    content: 'desktop'; /* <- string that defines this state */
  }
}

/* SMALL DESKTOP */
@media only screen and (max-device-width: 1200px) {
  body:after {
    content: 'small_desktop'; /* <- string that defines this state */
  }
}

/* TABLET */
@media only screen and (max-device-width: 1024px) {
  body:after {
    content: 'tablet'; /* <- string that defines this state */
  }
}

@media only screen and (max-device-width: 768px) {
  body:after {
    content: 'mobile'; /* <- string that defines this state */
  }
}
```

For the lazy ones, you can just include `dist/mqbe.min.css` which defines this 4 media queries.

## Second - Include JS

Include the JS library `dist/mqbe.min.js` in you project.

## Third - Add events

Define you events related to your CSS breakpoint names on `domready`.
You have two events available for each Media Query state: `enter`, and `leave`.
`enter` its also fired when the page loads the first time.

Below you have an example.

```javascript
$(document)
  .on('enter.mobile.mqbe', function() {
    // Especial flexsliders
    $('.flexslider-mobile-only').flexslider({
      animation: "slide",
      controlNav: false
    });
    // Filter groups
    $('.list-filters > .title').on('click', function() {
      $(this).parent().toggleClass('expanded');
    });
  })

  .on('leave.mobile.mqbe', function() {
    flexdestroy('.flexslider-mobile-only');
  });
```

All events are in the namespace `mqbe` so you can add a generic listener than will be triggered on every breakpoint.

```javascript
$(document).on('mqbe', function() {
  // Do whatever you need on every defined breakpoints
});
```

You can clean the events from any state using the jquery `off` method.

```javascript
$(document).off('enter.desktop.mqbe');
```

Also you can disable all mqbe events

```javascript
$(document).off('mqbe');
```

## Take a look to the example

You have an example in the demo directory, I recommend you to take a look to it to fully understand the idea.

[Demo included in this repo](http://htmlpreview.github.io/?https://github.com/carloscabo/MQBE/blob/master/demo/index.html).

## Demo / Dist

MQBE uses `gulp` to serve a demo/test server and build dist versions.

### Prerequisites
First you need to have node and gulp-cli installed on your environment.

Then install all dependencies, in repo's root:

```
$ npm install
```

### Demo

To test and develop you can start a connect server watching `src/*.js` and `src/*.scss` at `http://localhost:3000/`.

```bash
$ gulp server
## or just
$ gulp
```

To build minified versions of MQBE in `dist/` you must run.

```
$ gulp dist
```

## Fixes / Changelog

- V.2.0.1 Changing max-width to max-device-width in mediaqueries due to browser zoom issues.

- V.2.0.0 Delegate events on jquery instead custom queues. Namespace `.mqbe`. Add generic event `.mqbe` on every breakpoint.

- V.1.0.5 Added gulp to generate minified and demo files.

- V.1.04 Renamed to MQBE.v.js. Added debounced resize. Now library initializes itself.

- V.1.03 Added event queue, and nex syntax. Added **off** method, and method chainning.

- V.1.01 Chrome 43 returns state with single quotes **"'desktop'"**, added regex to clean that extra quotes
