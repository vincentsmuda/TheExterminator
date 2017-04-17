# The Exterminator
An easy to use QA helper for clients to use when reporting bugs. Still in a pre-alpha state.

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

## Mailto fallback
If by some chance your server is down or you are blocked by a xorigin, the script will automatically fallback to a mailto which will format the message exactly the same short of the screenshot (if enabled).

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
base_class | String | 'exterminator' | The base of the BEM
submit_button_text | String | 'Report' | The submit button text
project | String | 'Project Name' | The name of the project
subject_format | String | '%project% - Bug Report -  %date_time%' | The formatting of the subject line
action | String (URL) | 'mailto:' | Where the form will submit
method | String | 'POST' | The method of the form
email | String | 'somepm@someagency.com' | Who will receive the emails?
cc | Array[String] | [] | Add additional emails to be ccd
labels | Boolean | false | Whether to show labels on the form
min_browser | Integer | 10 | Checking version of IE and complaining to client
sends_screenshot | Boolean | false | Whether to send through a screenshot (Still experimental)
custom_logs | Array[Object] | [] | See "Adding custom Logs" below

## Adding Custom Logs
Do you want to add some server info or custom rows to your generated email without re-bulding the script? First let's create our arguments variable with a __custom_logs__ parameter:

```html
<script type="text/javascript">
  ExterminatorSettings = {
    ...
    'custom_logs': [],
    ...
  }
</script>
```

Next we'll Add an object to the custom logs array like so with the params of __label__ and __callback__:

```html
<script type="text/javascript">
  ExterminatorSettings = {
    ...
    'custom_logs': [
      {
        label: 'POST Variables',
        callback: {}
      }
    ],
    ...
  }
</script>
```

Finally, we'll add two params within the callback object with the keys of __name__ and __fn__:

```html
<script type="text/javascript">
  ExterminatorSettings = {
    ...
    'custom_logs': [
      {
        label: 'POST Variables',
        callback: {
          name: 'postVars',
          fn: function () {
            return '<?= implode(" - ", $_POST) ?>' || 'Nothing posted.';
          }
        }
      }
    ],
    ...
  }
</script>
```

## Installation for modifications
First, you must run `$ npm install` or `$ yarn install`. Then after making modifications, run `$ webpack` to build the dist file (ES5 compatible) for use in all browsers. Make sure you have webpack installed globally. (`$ sudo npm install webpack -g`)

## Todos

### MVP
- Style nicely
- Add open/close animations
- Add option for User's Name
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
