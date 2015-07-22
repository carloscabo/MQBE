# MQBE. Media Query Breakpoint Events

This small function creates JS events that are fired when you enter or leave a CSS media query _state_, for instance from desktop to tablet... etc. It's useful when you need to start or stop some JS functionallity depending on MediaQuery changes / states.

 I developed it for a project where several sliders must be created on mobile only.

# Requirements

`JQuery`

# Usage

## First

First part depends on a little piece of CSS, where you define your mediaquery breakpoints. You must add an string to idenfy that state from the JS. It's easier that it sounds. Take a look to the code below.

**Use only [a-zA-Z_] chars to define the string, and don't use hyphens ` - `**

````css
/* DESKTOP */
@media all and (min-width:1px) {
  body {
    background-color: grey;
  }
  body:after {
    content: 'desktop'; /* <- string that defines this state */
    display:none;
  }
}

/* SMALL DESKTOP */
@media only screen and (max-width: 1200px) {
  body {
    background-color: orange;
  }
  /* To check from MQBE */
  body:after {
    content: 'small_desktop'; /* <- string that defines this state */
    display:none;
  }
}

/* TABLET */
@media only screen and (max-width: 1024px) {
  body {
    background-color: cyan;
  }
  /* To check from MQBE */
  body:after {
    content: 'tablet'; /* <- string that defines this state */
    display:none;
  }
}

@media only screen and (max-width: 768px) {
  body {
    background-color: pink;
  }
  /* To check from MQBE */
  body:after {
    content: 'mobile'; /* <- string that defines this state */
    display:none;
  }
}
````

## Second

Include the JS library `jquery.mq_breakpoint_events.js` in you project, and be sure you have `JQuery` included too.

## Third

Define you events related to your CSS breakpoint names on `domready`.
You have two events available for each MediaQuery state: `enter`, and `leave`. `enter` its also fired when the page loads the first time.

Finally remember initialize MQBE with `MBQE.init();`.
Below you have an example.

````javascript
$(document).ready(function() {

  MQBE.on('enter', 'mobile', function() {
    // Especial flexsliders
    $('.flexslider-mobile-only').flexslider({
      animation: "slide",
      controlNav: false
    });
    // Filter groups
    $('.list-filters > .title').on('click', function() {
      $(this).parent().toggleClass('expanded');
    });
    // Nested flexslider
  });

  MQBE.on('leave', 'mobile', function() {
    flexdestroy('.flexslider-mobile-only');
  });

  // Allways remember to initialize
  MQBE.init();

});
````

You can clean the events from any state using the `off` method.

````javascript
MQBE.off('enter', 'desktop');
````

And also _chain_ several calls to the methods...

````javascript
MQBE.on('enter', 'desktop', function() {
    $('body').prepend('<p>Entered desktop</p>')
  }).on('enter', 'desktop', function() {
    console.log('Secondary event added to the very state!');
  }).on('enter', 'mobile', function() {
    //...
  });
````

## Take a look to the example

In the repo you have an example, I recommend you to take a look to it to fully understand the idea.

[Demo included in this repo](http://htmlpreview.github.io/?https://github.com/carloscabo/MQBE/blob/master/index.html)

## Fixes

- V.1.03 Added event queue, and nex syntax. Added **off** method, and method chainning.

- V.1.01 Chrome 43 returns state with single quotes **"'desktop'"**, added regex to clean that extra quotes

