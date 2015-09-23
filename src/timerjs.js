/**
 * timerjs.js
 * @version: v1.0.0
 * @author: Dennis Hern�ndez
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hern�ndez on 12/Sep/2015.
 *
 * Copyright (c) 2015 Dennis Hern�ndez http://djhvscf.github.io/Blog
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

;(function (window) {

    'use strict';

    function _extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function _set (that) {
        that.init = true;
        if (typeof that.options.func === 'object') {
            var paramList = ['autostart', 'time'];
            for(var arg in paramList) {
                if(that.options.func[paramList[arg]] !== undefined) {
                    eval(paramList[arg] + " = func[paramList[arg]]");
                }
            }
            that.options.func = that.options.func.action;
        }
        if (typeof that.options.func === 'function') {
            that.action = that.options.func;
        }
        if (!isNaN(that.options.time)) {
            that.intervalTime = that.options.time;
        }
        if (!that.isActive) {
            that.isActive = true;
            that.setTimer();
        }
        return that;
    }

    function timerjs(options) {
        this.options = _extend(this.options, options);
        if (this.init) {
            return new timerjs(this.options);
        } else {
            _set(this);
            return this;
        }
    }

    timerjs.prototype.options = {
        func: undefined,
        time: 0,
        autostart: false
    };

    timerjs.prototype.once = function(time) {
        var timer = this;
        window.setTimeout(function() {
            timer.action();
        }, isNaN(time) ? 0 : time);
        return this;
    };

    timerjs.prototype.play = function(reset, preserveTime) {
        if (!this.isActive) {
            if(reset) {
                this.setTimer();
            } else {
                this.setTimer(preserveTime ? this.options.time : this.remaining);
            }
            this.isActive = true;
        }
        return this;
    };

    timerjs.prototype.pause = function() {
        if (this.isActive) {
            this.isActive = false;
            this.remaining -= new Date() - this.last;
            this.clearTimer();
        }
        return this;
    };

    timerjs.prototype.stop = function() {
        this.isActive = false;
        this.remaining = this.intervalTime;
        this.clearTimer();
        return this;
    };

    timerjs.prototype.toggle = function(preserveTime, reset) {
        if (this.isActive) {
            this.pause();
        } else {
            this.play(reset ? true : false, preserveTime);
        }
        return this;
    };

    timerjs.prototype.reset = function() {
        this.isActive = false;
        this.play(true);
        return this;
    };

    timerjs.prototype.clearTimer = function() {
        if (this.options.autostart) {
            window.clearInterval(this.timeoutObject);
        } else {
            window.clearTimeout(this.timeoutObject);
        }
    };

    timerjs.prototype.setTimer = function(time) {
        var timer = this;
        if (typeof this.action !== 'function') {
            return;
        }

        time = isNaN(time) ? this.intervalTime : time;
        this.remaining = time;
        this.last = new Date();
        this.clearTimer();
        if (this.options.autostart) {
            this.timeoutObject = window.setInterval(function () {
                timer.go();
            }, time);
        } else {
            this.timeoutObject = window.setTimeout(function () {
                timer.go();
            }, time);
        }
    };
    timerjs.prototype.go = function() {
        if (this.isActive) {
            this.action();
        }
    };

    /**
     * Adds the plugin to namespace
     */
    window.timerjs = timerjs;

})(window);