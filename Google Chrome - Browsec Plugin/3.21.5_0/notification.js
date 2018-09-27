(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

require('polyfills/Promise.prototype.finally');

require('polyfills/regeneratorRuntime');

var _insertStyle = require('tools/insertStyle');

var _insertStyle2 = _interopRequireDefault(_insertStyle);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var css = "._Notification{\n  position: fixed;\n  bottom: 30px;\n\tright: 30px;\n  z-index: 44444444;\n  font-size: 14px;\n  line-height: 1.4;\n\tfont-family: tahoma, arial, sans-serif;\n}\n._Notification,\n._Notification *{\n  margin: 0;\n  padding: 0;\n}\n\n._Notification_Small,\n._Notification_Big{\n  display: none;\n}\n._Notification_Small{\n  width: 48px;\n\theight: 48px;\n\tborder-radius: 50%;\n\tbackground-color: #FFF;\n\tbox-shadow: 0 2px 7px rgba(0,0,0,.2);\n\topacity: .5;\n\ttransition: opacity .3s;\n  cursor: pointer;\n  display: none;\n}\n._Notification_Small:hover {\n\topacity: 1;\n}\n\n._Notification_Small:before,\n._Notification_Small:after{\n  content: ' ';\n  display:block;\n}\n._Notification_Small:before{\n  position: absolute;\n  left: 8px;\n  top: 8px;\n  width: 32px;\n  overflow:hidden;font-size:0;text-indent:-9999px;height:0;padding-top:32px;\n  box-sizing: content-box;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTkzNTc0NjhGREZDMTFFNkFDMzRBNTQ2QTYyRDhGQ0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTkzNTc0NjlGREZDMTFFNkFDMzRBNTQ2QTYyRDhGQ0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOTM1NzQ2NkZERkMxMUU2QUMzNEE1NDZBNjJEOEZDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOTM1NzQ2N0ZERkMxMUU2QUMzNEE1NDZBNjJEOEZDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiPs7a8AAAW0SURBVHjaxFdpUFNXFP6ygIArqCCyi6OAOiquA+4VZCplGSsOtorYATsqZUas2Fp1sB2B1jpF+aHYVm0V3KbBpY6KW0HUFltrka0gyBIgQSCIUIG8vN7zLJGExdD84DKXvHvvd77z5d5zz8kT8TyPgWxiQ4GKuoaxzxpUURoNfzbz3sPCNZviVGyap8/bdx8Ws/lztE64fimgHeirPy4snbbh43hZhVyhZg742cvW8/bTAoROrfN5pm84X1ev4hmOIzzZvYlb2P3eFl62tZntSkw54OgZyN17kMurmpr5CV4hWof6AqjTOuEIT3bM/iDx9CWgxyNQPmu0CwqLvfd92qUofx9v8ezpHghYuw2trS/73E1aJ9wshg/0WyBm9puJh/gMjoEaRb19cPj2bNpCGsdti8ApWQZKy+UGHSnhTp67ii+2bxDGxBO0LjabeA0RYJ5bWHKpoqrWiQbvvrMEw4YMxo6EQ/2Kq91fpcBskClCg32EcaVc4US8xN+ngDPnb3y5yGvG1PuXv4XXrCmIjgjB9cwcqNWafgkgPNltDF8h8BDfYsZL/L0KyCsq89y2J3njjKVhkNcocerw53B2sEVuUen/ut9kR/bEU11bB0/GS/zsSDy74kSdiSgiJl525eb9oM6F7dFr8OHaYKg5DhKxBKUV1fj9USEe/FmA/KIyVFQpkJeViknzV8PR3gYeE10wc5o7Zkx1wzjHseA0HKQSCQ79IENC0o9ah35L5qYf+fqTYB0BLHnYzfH7oILTaLQ7cvpYHEbYmiEyPRoLXebBd/wSjLdyxUiLETCVmkIsen16Gl6DdnU76ltVKGl4gmslN/FL2R2kBCWhSdGOkLU7tViJWKz59cp3jjajrYSoltI/9s2Duzqn5upoj0z5HeGZyKjrtzuRVzEvZVmvx/BYkY+F9gt05sgP+Qtb9XayNgbu5uQu0jceMXQY8pWFRuX5PGZPPPqNJarFOkFYXFY5WR9kKjFBbbPCKAFlDeUwkUi7zRc9qZikI6BWWW+rDxKJRFC21BkloLZFqRMrXQqbrf4tGIiaLNIK8Jgf2tT8olXnsCofnseK1PeheNH7LrwpCC1MLXBtnQwO0wN15ocOsXien5U2XHsE7ErU9FSmrQePNuorjhlsLVxR/dbVnyBgwjjHx/qgdq4DY4baGCXAxcoJHZy62zzzl6cjgOXr2/ogVctzeFi7GSVgErMnHv3G/N3SEcDSo4wyVFfQ0+oqgcCYNtnGA09rdMs4+aF03DmW/ncmcp9Fsy90rQUZWb8hJnzNK8WOc7B8oi/Gj3SFlYUlBklep2IKRDrnNq4djf+oUPysBJf/zkB2+X24WDrhm4upOgLID/NX1a0YUZXyfy8mpzMle7g542paEjo0HWybxKhskrPMViB0eq5tVuJs6HGsTAtjsWINh+F2bMfchU7PGvZnIjbBstXRyC94qv32F0/smzXF3fWPbgKo7Uo8cvD0heubk/duxVvzZ4LjORSz4hIp+6jf1zAl+AAmsOIlFklwI+sBNn+6D6sClibviY2I6rEcC5HfobZgCfCusq5x6pbdSXBwHoX42E3wORoAtUZjsACpWIyM8AvYuf8wyoprsT8uGtajLR+xdOdlYiJt7fUXkSlbVHdw/iGRn5WzAoXTZ2/heWsLtsyL6lfwRXttxMv2NpxMzaBCh5URO8qJV995jz9Kzc0HVcmOJnhPdhv3l3AsCUfgP9EP9sPtDHJOuED35dgRn/LqJjCe9GOJ3sRr8JuR9ShLefrxxLnrQ/2TL13J1uQ8ykdKYBLMpWZ9Oqd1whH+/M+ZGrInHuIz5s1oeuTWvbLKaoW6oUXFB51YzXsf9hU6tc5nmq9/0cgzHBcRs1eWW/DE06g3I/3OSvbYuvrGKI7jzt3Mzy6KPLOliQTQJxsXs/mf2KtZFOEM5aQuGui34wEX8K8AAwDBE6hyr22tyQAAAABJRU5ErkJggg==\");\n}\n._Notification_Small:after{\n  position: absolute;\n\tright: 2px;\n\ttop: 2px;\n\twidth: 10px;\n\toverflow:hidden;font-size:0;text-indent:-9999px;height:0;padding-top:10px;\n  box-sizing: content-box;\n\tbackground-color: #993B3B;\n\tborder-radius: 50%;\n}\n\n._Notification_Big{\n  background-color: #FFF;\n\tcolor: #494B4D;\n\tbox-shadow: 0 5px 15px rgba(0,0,0,.15);\n\tborder-radius: 4px;\n\twidth: 340px;\n}\n\n._Notification_Big:before {\n  content: ' ';\n  display: block;\n\tborder-radius: 4px 4px 0 0;\n\tposition: relative;\n\toverflow:hidden;font-size:0;text-indent:-9999px;height:0;padding-top:54px;\n  box-sizing: content-box;\n\tbackground: #1C304E url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAiCAYAAACTHwETAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTkzNTc0NjRGREZDMTFFNkFDMzRBNTQ2QTYyRDhGQ0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTkzNTc0NjVGREZDMTFFNkFDMzRBNTQ2QTYyRDhGQ0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOTM1NzQ2MkZERkMxMUU2QUMzNEE1NDZBNjJEOEZDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOTM1NzQ2M0ZERkMxMUU2QUMzNEE1NDZBNjJEOEZDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmyAFe0AAAsKSURBVHja7FwJVBRXFn10s6tRwaBEcUMUEBONqCcI6mhEj0vQo2gwEYlRZCTKHJeoUROdZBRHYwZHjRInY8wRUMxgxi2IWRTcQERiQAkoKiJb3FDZpLvnveIVKYrqBuzjGZjp57mnqL+8X/X/++/d/3+1ZjqdDkxiEvMmlH0JMQUxDNEP0QnRFvEQUYJIR5xEfIO4Y+raFibkERqALyJOo9HoysordFqtVpeclqELXrxeR0LXc6kZQjrlUzkqz/XAhJYBMwOhwQ0RWlFZFbo75jCMH+0NtjZWMC5gEdwp+k0okJf2LTgN8BP+7uRgD8eiP4Pyiko4kpAEQW9OAGsry22YtR2RaZpyzVtUetKDafCOnjgT6uY9Hfp79IYXWtuC14TgWiOQS2HxXRg6MVgoR+WpHtXHrAzWZ5IWZgjL0M3vDF2+CeYt3QDjRnnB4AHu8Ebg+1BWVmFQGeVTuUFYfqKvj1Cf9JA+0mvq7pZjCPM0Gm24/9xV8O/4RCFh7ftzISYuAa7fzG+UQiq390A8fLJ8nnBPeqbOWQmkl/Sburz5G4I7YkfypQxIvpghJEydOBJdfStYGb6jSUo/2hhJ/AACJo8W7lPSMoH0kn5uxyTN2BDmX/w5Cwa+7Abnju4Cr0H9IGzuNDhxKgWqq7VNUkrlqd78d6YIekifJ+ol/dSOqdubryH4VlRUhU59dwUMfH0W5BcUQ8zOj6G7kyNczrr+TIqpHtUnPXcKS+BV1Ev6cVVBBNLXyOemuHVJARcoGiEWIlqbhrfxIi4f47b/85tJ67fsqc1YHjYTQgInQ7VGA2qVGq7fugOp6VfhwqUrkJmVC7duF0FGYhT09ZkBXbt0BPc+PcCzvxsMfMUVenZ9CTRaDZir1bBjTxyER3xdq3fFwkDyFAfxz8lGPPcDcjyIJFm6PaI3wgFxEzGcryZphCF0RlZ/u9eQqfC0WlObsW/3WmjnaA3BB8NgeA9v8O01EnrZOYO9bTuwNLcEldnvUUWr00JVdRXcLXsAOfeuwfGcH+BkbhJEToqAh0VVMC1wdW1ZC3M15Jw/ACqVqgve5hthCOQBRujxcksRRE5jEdNMw9yw0Bbz5F+v5dUxAhLnrl3gVH7NhKNBJcglKTgevCPH6FX+S1EmDO8yrE4atUPtubp0I4+w9Tm8ExGaDbxCGSbLs0TYIh6zRyHpycaTo6DLGdEd8YiiHaJcj74yRJWCQXaFmu33J/IJCDXb81VcV6qPyLQ1LcAQxQbe0wrRH2GDyG7kpOrFz1TK+zvl0ocdcfJsWr0a7dq8AJnFV40akQysT3rkcvLsRbr84TkbeaXCAMxA3Ed4Q815SQriGuI9WbkxPPBkHCcQ53lAN/LAi+LG+j5VaH8oIhexWiFvJNeTEueZUHNGQ4NxFlHEnCdAwYhWsJGcQ/yIuI34jgdZSUYhfmaD+Z7fu4Sf20Y0BI8zKZfr1bRUW0DhoyKjRiL33k2wUNc/1zpd017f52gE4xGuiP168nsgfmI+EcWdI8psxDGKYvz3INYXj1jCZW24LB20ZTHfMZO1IYYkf4X2pyKInO3jew/EbnKiPEEGQs1urFahPi3B1zEpHszvGYbwoq5lniSV6YjjTJ7n8vu8we+/SOwjGiXHK9m59cmDmRkUPykxajQKnxTX4RKiXM2+QRdHIwebOMafZGn0sq8iJhEBRvxZT911PPNosO5J0ikMfM55wzmEiHIUsQrxMetdyul7+X4Iz1BxgtFJbR6HHhrYVEmeHxPdPE4by+kh1D2cRm5zF6KV5BlGsIHs5LKiZLEH+4E9kNgv1Mdfsifwkr3rITaE08Kd7r8rz3pa9qABveWIDYgOsnpBnF+MaK+g96+cP1RPu0Su0xGPEVac5sJ1PpWU8+E0Py4brpAXIkmbw2kRCBsD7x2FqNTz7IRERInkfhXrHddQn5JHKB08dvYLBUV360wZOlmcEvU2FD3W7xUaIou2lrZwPCiu9oRSFMeO9pD83ZelRnoEsuQJsjSaPZ3Zva5gtzhYgXTt5hgtl9d41pzR0ya582951nnwLM/mqz+HDh17Guq4w4iDHOdXSPKqeUUjCoWnObz/8TbXiWV+Ui0p58ncwU/P8xHx7MB9kM9eoIJDQ4OrhgJXl+71DIGsxKHViwYNoSHp1MpBWFrKBdujS4GRhlDNy0j5spI6IJmJ1gl24Utl5ZL16GzN4cDQZ1uiAUlJYzRiE4elNA4L9IGOhnnAWxw6zjOfSEDclQ2gN3OHIEQg85OrbCCnJYZOHGCNgee7KXm21qy7ujE7i78MHfRyvYwqzVPo1KajUSPVw64bPNXUfwYvz37Ay5fnKSIBVCKld/XUyePZ1M6AXldJh4sSw8bjz6sFR57lwLOxlPOGsP4oPYYdw3yBZjXtwHbkWC7yBFodFDKXMYRsLn8LYQc1X5c1aAg/DX9tQP0dmyel4O7gatRI9MX6pEcuI7xo4gjLnucpnnwt0uPilYTcvppdtJI4cLhJ5U4WJZ/Jnz+7/gLJLK5k7yDmVbDrNyT0+R990PMRoj3CRUJYu/HyU0nUsnuxncV6ylvz3oVgCHG9nZ2EHT+p3LhzWxhIY8SjozvcKKi7z0HtuGB7jeiMZxULXu6JS8d/NKHu18y+P2R2Ll0SOvHsbKMQasQ4TyuEdzlUSGPifq4fwsb2WFaXXP16BU/kwXrEMLqVDZvOAuRuvDfvD4RJ0v7F4YhWEQug7iFjVw5Rh0WOkK9SqQ4umf9WnbOGhMRkWPzOzBpX3nUIjO/jC73sncHOtj1YqX/fYibCSDygUlMF98sfQPZvOXD01wQ4ffMc9GjfDf52qK4XxHZAje2xmzNGvBU4ghhHzXk3cLbCeYQhoZ2+cTzzxI9pUthV+3CZID3e7ADi77zHEKsQpu7z7I5RqGvHm1rkiU6x+38FMYC5R5EkpE3kwUvj5WIee4lhTIpPy3ZZaSl9BLGFDeIC84xh/L6B0kMn3/KKyvi+PgG1W83urt0hPjoCnmqfohmpIO9hPmQUXxFAfxc+KobYgK/AP3oWcgkHcGrbGT2ImwD6W4v/LFQWMGZGGGReuVHrDTISo8HG2mpMY5isAdkuI2u1O9hsHOk8ex8qGM8cPocwtG1K7nIWd6ITz+AkbveGgXrhzA+CFMLPIuYPMzhcKG3/zmQeYc8TJVrPppgdc4jRbFwlPLs/1zM5zHnAp/D7POLwtll8H+nHq1uPJJwJXbQmArauWwKjfDxBo9NA9r1rEBy3sMnLx8jJW6C3nTN6DjV8n3gB3vtgE2xeEwbjR3ttU9jSNUkzOHSqnWU4SKFjRg6BouJ7EBCyGpy6d4D1y0LBXKWCam3jP06h8i52PWHV5h2Qm10Im9eGQcapKOFYmmeVSZqZSMkDfXIegvEbFq76DOj8YV/sj1Ba9gQWeS9oktIwr/lQUVUJe6MSBD0LVm4mXgBMlkyftjdzQyDZaWZmtjz2i09goq+3kPBh+Bcwoc9Y6NK2c+MOALCcn9t4WLk+UrgnPQd2/YXOLpYzATNJCzAEkg24ivjj9g1LYefGZXD0+BlISc+ESL8IsDG3NqiM8qkclT90LFGoT3pIH9R8I2CSFmQIJHTU2Xfc617briTtg4vpWVB6vxz2v7kHXmzVQbECpe+b/pVQLvVSFmQmxgDV5529HaaububyLL99PJdzUbcw7gPhWIuuZ3NS+bePlabfPv4P/vZRLuKvoemcXvw1NH1+VMobGZd5o8X0a+gWKGam/x/BJIY4gkn+z+Q/AgwASUNL2c7/pfQAAAAASUVORK5CYII=') no-repeat center center;\n}\n\n._Notification_Big_In {\n\tpadding: 25px 30px 28px;\n\ttext-align: center;\n}\n\n._Notification_Big_Title {\n\tmargin-bottom: 11px;\n\tfont-size: 18px;\n\tfont-weight: 600;\n\tcolor: #3B9946;\n\ttext-align: center;\n}\n\n._Notification_Big_Text {\n\tfont-size: 14px;\n\tline-height: 22px;\n\ttext-align: center;\n  padding-bottom: 20px;\n}\n\na._Notification_Big_Button {\n\tborder-radius: 3px;\n\tdisplay: block;\n\tfont-size: 14px;\n\tbackground-color: #3B9946;\n\tline-height: 20px;\n  padding: 10px 15px;\n  box-sizing: content-box;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor: #fff;\n\ttransition: background .3s;\n}\na._Notification_Big_Button:hover{\n\tbackground: #308139;\n  color: #fff;\n\ttext-decoration: none;\n}\n\n._Notification_Later{\n  padding-top: 15px;\n  text-align: center;\n}\n._Notification_Later_In{\n  cursor: pointer;\n  color: #1C304E;\n  text-decoration: underline;\n}\n._Notification_Later_In:hover{\n  color: #1C304E;\n  text-decoration: none;\n}\n\n._Notification._Notification_stSmall ._Notification_Small,\n._Notification._Notification_stBig ._Notification_Big{\n  display: block!important;\n}\n"; // NOTE URL relative to package.json


/** @type {integer} */
var minClassLength = function () {
  var lengths = css.split('{').slice(0, -1).reduce(function (carry, part, index) {
    part = part.trim();
    if (index) part = part.split('}')[1];

    /** @type {Array<integer>} */
    var parts = part.split(',').map(function (item) {
      return item.trim().replace(/^\./g, '').length;
    });

    return carry.concat(parts);
  }, []);

  return Math.min.apply(Math, lengths);
}();

/** @type {Object<integer>} - class modification parameter */
var modifierOptions = {
  'offset': 1 + Math.floor(Math.random() * (minClassLength - 1)),
  'value': Math.floor(Math.random() * 999999)
};

/**
@param {String} className
@return {String} */
var modifier = function modifier(className) {
  /** @type {String} */
  var left = className.slice(0, modifierOptions.offset);

  /** @type {String} */
  var right = className.slice(modifierOptions.offset);

  return left + modifierOptions.value + right;
};

/** @type {String} */
css = css.split('}').slice(0, -1).map(function (part) {
  var _part$split$map = part.split('{').map(function (item) {
    return item.trim();
  }),
      _part$split$map2 = _slicedToArray(_part$split$map, 2),
      selectors = _part$split$map2[0],
      rules = _part$split$map2[1];

  /** @type {String} */

  rules = '{' + rules + '}';

  /** @type {String} */
  selectors = selectors.split(',').map(function (selector) {
    return selector.trim().replace(/\.([_a-zA-Z]+)/g, function (match, className) {
      return '.' + modifier(className);
    });
  }).join(',');

  return selectors + rules;
}).join('');

/**
@param {*} message
@return {Promise} */
var sendMessage = function sendMessage(message) {
  if (typeof browser !== 'undefined') {
    return browser.runtime.sendMessage(message);
  }

  return new Promise(function (resolve) {
    chrome.runtime.sendMessage(message, resolve);
  });
};

/** User's language
@type {string} */
var language = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();

/** Intitial call to get popup status + translation
(When page fully loaded + message received) */
var initialPromise = new Promise(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sendMessage({
              language: language,
              'type': 'notification:request:initial',
              'url': location.href
            });

          case 2:
            data = _context.sent;

            if (!(!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || !data.show)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:

            resolve(data);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/** When promise resolved */
initialPromise.then(
/**
@param {string} link
@param {string} size - 'small' or 'big'
@param {object} translation - translation object for user's language */
function (_ref2) {
  var link = _ref2.link,
      size = _ref2.size,
      translation = _ref2.translation;

  // Inserting styles in <head>
  (0, _insertStyle2.default)(css);

  /** @type {Object<Element>} */
  var elements = {};

  /**
  @param {Object} object
  @return {Element} */
  var createElement = function createElement(object) {
    var element = document.createElement(object.tag);
    if (object.class) {
      var className = object.class.split(' ').map(function (part) {
        return modifier(part);
      }).join(' ');
      element.setAttribute('class', className);
    }
    if (object.attributes) {
      Object.keys(object.attributes).forEach(function (attribute) {
        if (['href', 'target'].indexOf(attribute) === -1) return;

        var value = object.attributes[attribute];
        element.setAttribute(attribute, value);
      });
    }
    if (object.node) object.node(element);
    if (object.text) element.textContent = object.text;

    if (object.children) {
      /** @type {Array<Element>} */
      var children = [];
      object.children.forEach(function (child) {
        children.push(createElement(child));
      });

      children.forEach(function (child) {
        element.appendChild(child);
      });
    }

    return element;
  };

  /** @type {Object} */
  var structure = {
    'tag': 'div',
    'class': '_Notification ' + (size === 'small' ? '_Notification_stSmall' : '_Notification_stBig'),
    'node': function node(_node) {
      elements.parent = _node;
    },
    'children': [{
      'tag': 'div',
      'class': '_Notification_Small',
      'node': function node(_node2) {
        elements.makeBig = _node2;
      }
    }, {
      'tag': 'div',
      'class': '_Notification_Big',
      'children': [{
        'tag': 'div',
        'class': '_Notification_Big_In',
        'children': [{
          'tag': 'div',
          'class': '_Notification_Big_Title',
          'text': translation.title
        }, {
          'tag': 'div',
          'class': '_Notification_Big_Text',
          'text': translation.price_description
        }, {
          'tag': 'a',
          'class': '_Notification_Big_Button',
          'attributes': {
            'href': link,
            'target': '_blank'
          },
          'text': translation.upgrade_to_premium_now
        }, {
          'tag': 'div',
          'class': '_Notification_Later',
          'children': [{
            'tag': 'div',
            'class': '_Notification_Later_In',
            'node': function node(_node3) {
              elements.makeSmall = _node3;
            },
            'text': translation.remind_me_later
          }]
        }]
      }]
    }]
  };

  createElement(structure);

  /** Set visibility
  @param {boolean} visible - true if visible
  @return {undefined} */
  var setVisibility = function setVisibility(visible) {
    sendMessage({ 'type': 'notification:request:setVisibility', visible: visible });

    if (visible) {
      elements.parent.classList.add(modifier('_Notification_stBig'));
      elements.parent.classList.remove(modifier('_Notification_stSmall'));
    } else {
      elements.parent.classList.remove(modifier('_Notification_stBig'));
      elements.parent.classList.add(modifier('_Notification_stSmall'));
    }
  };

  elements.makeBig.addEventListener('click', function () {
    setVisibility(true);
  });
  elements.makeSmall.addEventListener('click', function () {
    setVisibility(false);
  });

  // Inserting into actual DOM with delay
  setTimeout(function () {
    document.body.appendChild(elements.parent);
  }, 10 * 1000);

  // Ping to check all is OK
  /** @function */
  var ping = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                try {
                  sendMessage({ 'type': 'notification:ping' }).then(function (state) {
                    if (state === 'ok') resolve();
                  });
                  setTimeout(function () {
                    reject(new Error('Ping timeout reached'));
                  }, 3000);
                } catch (error) {
                  reject(error);
                }
              });

            case 3:
              setTimeout(ping, 4000);
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              document.body.removeChild(elements.parent);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 6]]);
    }));

    return function ping() {
      return _ref3.apply(this, arguments);
    };
  }();
  ping();
});

},{"polyfills/Promise.prototype.finally":2,"polyfills/regeneratorRuntime":3,"tools/insertStyle":4}],2:[function(require,module,exports){
"use strict";

(function () {
  if (window.Promise.prototype.finally) return;

  /**
  @method
  @param {Function}
  @return {Promise} initial */
  window.Promise.prototype.finally = function (onFinally) {
    // eslint-disable-line no-extend-native
    this.then(onFinally, onFinally);

    return this;
  };
})();

},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this ? this : typeof self !== 'undefined' ? self : undefined;
}() || Function("return this")());

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/** Добавляет текстовый стиль в страницу
@param {string} css - аля '.class{ display: block; }'
@return {undefined} */
exports.default = function (css) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) style.styleSheet.cssText = css;else style.appendChild(document.createTextNode(css));

  head.appendChild(style);
};

},{}]},{},[1]);
