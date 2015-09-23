# timerjs
An extension for setTimeout and setInterval functions

Author Homepage:      http://djhvscf.github.io/Blog/<br />

## Current version
* **v1.0.0** `12/Sep/2015`

## Bugs & Enhancements (next version)

## Release history

| Version Number  | Date          |
| --------------- | -----------   |
| v1.0.0		  |	`12/Sep/2015` |

## Dependencies
* In this moment this plugin doesn't have dependencies

## How to Use

**Syntax Example**
```html
<script src="timerjs.js"></script>
```
```javascript
var timerjs;
(function() {
    timerjs = new timerjs({
        func: function() {
            //your code here...
        },
        time : 500,
        autostart : true
    });
})();
```
**Parameters**

| Parameter | Description | Default |
| ----------| ----------- | ------- |
| `func` | A function to be called by the timer | `undefined` |
| `time` | Defines the time in milliseconds that the timer will be executed | `0` |
| `autostart` | A boolean indicating if the timer will use the setInterval or the setTimeout function | `false` |


**Methods**

| Method | Description | Parameters | Parameters description
| ----------| ----------- | ----------| ----------- |
| `play` | Starts the timer | reset | Boolean that indicates if the timer should be reset. Defaults to false.
| `pause` | Pauses the timer | - | -
| `stop` | Pauses and resets the timer | - | -
| `toggle` | If the timer is paused then this function will start it; otherwise, if the timer is started then this function will pause it | - | -
| `once` | Execute one time the timer | time | Number that indicates the time that the timer should wait before execute the function
| `isActive` | Returns if the timer is active or not | - | -
| `remaining` | Returns the remaining time when it is paused| - | -

## Demo
[http://djhvscf.github.io/timerjs/](http://djhvscf.github.io/timerjs/)

## Known issues

## Reporting issues
Your feedback is very appreciated! <br />
Use this page to report issues (https://github.com/djhvscf/timerjs/issues)