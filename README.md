# MQBE. Media Query Breakpoint Events

This small function creates JS events that are fired when you enter or leave a CSS media query, state, for instance from desktop to tablet... etc. Its useful when you need to launc or stop some JS functionallity when MediaQuery chancges.

I developped it firstly for a project where several sliders must to be created on mobile only.

# Requirements

`JQuery`

# Usage

## First

First part depends on a little piece of CSS, where you define your mediaquery breakpoint you must add an string to idenfy that state from the JS. It's easier that it sounds. Take a look to the code below.

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
        content: 'small-desktop'; /* <- string that defines this state */
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

## Second

Include the JS library `jquery.mq_breakpoint_events.js` in you project, and be sure you have `JQuery` too.

## Third

Define you events related to your CSS breakpoints in `domready`.
You have two events avalibale for each MediaQuery state: `onenter`, and `onleave`. `onenter` its also fired when the page loads the first time.

Finally remember initialize MQBE with `MBQE.init();`.
Below you have an example.

    $(document).ready(function() {

      MQBE.onenter_mobile = function() {
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
      };

      MQBE.onleave_mobile = function() {
        //flexdestroy('.flexslider-mobile-only');
        $('body').html('<p>Entered mobile</p>');
      };

      MQBE.init();

    });

## Take a look to the example

In the repo you have an example, I recommend yopu to take a look to it to fully understand the idea.


