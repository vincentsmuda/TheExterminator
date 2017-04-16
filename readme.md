# The Exterminator
A lightweight QA helper for clients to use when reporting bugs. Still in a pre-alpha state

## Installation
First, set the arguments and include the script. Put it high up on your page... before any other script. This will allow the exterminator to catch any js errors coming down the pipe. Since this script is only meant for QA, it should __not be used in production!__. That allows us to break some rendering/js blocking rules and dismiss the fact that it's a heavy file :)

```html
<script type="text/javascript">
  ExterminatorSettings = {
    'action': 'http://path.to.your/script/',
    'method': 'POST',
    'email': 'who.this.will@send.to',
    'cc': ['some@other.dude']
  }
</script>
<script src="./path/to/exterminator.js"></script>
```

## Example email output

Label | Info
----------------- | ---
__Subject__ | Project Name - Bug Report - Sun Apr 16 2017 15:08:35 GMT-0400 (EDT)
__Action Taken:__ | Did something
__Result:__ | nothing
__Expected Result:__ | something
__Page:__ | http://url.where.user/reported/bug
__Envirnoment:__ | Chrome 57.0.2987.133 on OS X 10.12.3 64-bit
__Resolution:__ | (785 x 768) of (1366 x 768)
__Scroll Position:__ | 0 x 305
__Locale:__ | en-US
__AdBlock:__ | Enabled
__Cookies:__ | Enabled
__Errors:__ | No errors logged (After script init)
__Screenshot:__ | http://some.server/screenshot[subject].png

## Arguments
Name | type | default | description
--- | --- | --- | --- |
base_class | string | 'exterminator' | The base of the BEM
submit_button_text | string | 'Report' | The submit button text
project | string | 'Project Name' | The name of the project
subject_format | string | '%project% - Bug Report -  %date_time%' | The formatting of the subject line
action | string (url) | 'mailto:' | Where the form will submit
method | string | 'GET' | The method of the form
email | string | 'somepm@someagency.com' | Who will receive the emails?
cc | array | [] | Add additional emails to be ccd
labels | boolean | false | Whether to show labels on the form
min_browser | int | 10 | Checking version of IE and complaining to client
sends_screenshot | boolean | false | Whether to send through a screenshot (Still experimental)

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
