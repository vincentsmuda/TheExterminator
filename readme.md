# The Exterminator
A lightweight QA helper for clients to use when reporting bugs. Still in a pre-alpha state

## Installation
First, set the params and include the script. include the script high up on your page... like super hight up in the head before anything else. This will allow the script to catch any js errors coming down the pipe later on. Since this script is only meant for QA, it should __not be used in production!__ so it's okay that we break some rendering/js blocking rules...
```html
<script type="text/javascript">
  ExterminatorSettings = {
    'action': 'http://path.to.your/script/',
    'method': 'POST',
    'email': 'who.this.will@send.to',
    'cc': ['some@other.dude']
  }
</script>
<script src="./path/to/exterminator.js" charset="utf-8"></script>
```

## Example email output
Action Taken:
Did something

Result:
nothing

Expected Result:
something

Page:
http://websites.dev/CallTheExterminator/dist/

Envirnoment:
Chrome 57.0.2987.133 on OS X 10.12.3 64-bit

Resolution:
(785 x 768) of (1366 x 768)

Scroll Position:
0 x 305

Locale:
en-US

AdBlock:
Enabled

Cookies:
Enabled

Errors:
No errors logged (After script init)

Screenshot:
http://your.server.somewhere/screenshot.Project-Name--Bug-Report--Sun-Apr-16-2017-150835-GMT-0400-EDT.1492369717.png

## Installation for modifications
First, you must run `$ npm install` or `$ yarn install`. Then after making modifications, run `$ webpack` to build the dist file (ES5 compatible) for use in all browsers. Make sure you have webpack installed globally. (`$ sudo npm install webpack -g`)

## Todos

### MVP
- Style nicely
- Add open/close animations
- Add option for User's Name
- Write documentation for non transpiling utilization
- Write documentation for options
- X browser testing

### Organization
- Break out screenshot into its own class

### Code
- Use promises in place of nested CBs

### Later
- Create a handler that highlights the problem element and on the page
- Allow user to click on problem element
- Create a quick link that mimics QA user's browser variables  
- Create a bookmark shortcut
- Create a wordpress plugin
- Create a shopify App

## Support
We are aiming to support IE8+ . If you find a bug any any of the browsers, let us know or make a pull request!
