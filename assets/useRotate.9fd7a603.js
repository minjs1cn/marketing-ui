import{f as e,l as t,k as n}from"./vendor.4fe08a48.js";function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var o=function(){function o(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.onUpdate=e,this.angle=0}var i,r,s;return i=o,(r=[{key:"idled",value:function(){var n=this;this.stop(),this.tw=e({from:this.angle,to:this.angle+360,duration:1e4,ease:t,repeat:1/0,onUpdate:function(e){n.angle=e,n.onUpdate(e)}})}},{key:"start",value:function(){var n=this;this.stop(),this.tw=e({from:this.angle,to:this.angle+360,duration:500,ease:t,repeat:1/0,onUpdate:function(e){n.angle=e,n.onUpdate(e)}})}},{key:"to",value:function(t){var a=this;this.stop();var o=0;if(void 0!==t.to)o=t.to;else if(void 0!==t.index){if(t.index<0||t.index>6)throw Error("index 范围 0-5");var i=this.getAngleRangeByIndex(t.index);o=(i[0]+i[1])/2}this.tw=e({from:this.angle,to:this.angle+720-this.angle%360+o,duration:t.duration||1e3,ease:n(.33,1,.68,1),onUpdate:function(e){a.angle=e,a.onUpdate(e)},onComplete:function(){t.complete()}})}},{key:"stop",value:function(){var e;null===(e=this.tw)||void 0===e||e.stop()}},{key:"getAngleRangeByIndex",value:function(e){return[0-60*e,60-60*e]}}])&&a(i.prototype,r),s&&a(i,s),o}();function i(e){return new o(e)}export{o as R,i as u};