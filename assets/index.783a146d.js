import{f as t,r as n}from"./index.852530ca.js";import{f as e,l as o,k as i,d as a,r,b as s,j as d,m as u}from"./vendor.4fe08a48.js";function c(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var l=function(){function t(n,e){var o,i,a;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),a=0,(i="_index")in(o=this)?Object.defineProperty(o,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[i]=a,this.onUpdate=n,this.count=e}var n,a,r;return n=t,(a=[{key:"index",get:function(){return this._index}},{key:"idled",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;this.stop(),0===this.index?this.tw=e({from:this.index,to:this.count,duration:n*this.count,ease:o,repeat:1/0,onUpdate:function(n){t._index=Math.floor(n),t.onUpdate(t.index)}}):this.tw=e({from:this.index,to:this.count,duration:n*(this.count-this.index),ease:o,onUpdate:function(n){t._index=Math.floor(n),t.onUpdate(t.index)},onComplete:function(){t.tw=e({from:t.index,to:t.count,duration:n*t.count,ease:o,repeat:1/0,onUpdate:function(n){t._index=Math.floor(n),t.onUpdate(t.index)}})}})}},{key:"start",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:200;this.stop(),this.tw=e({from:this.index,to:this.count,duration:n*(this.count-this.index),ease:o,onUpdate:function(n){t._index=Math.floor(n),t.onUpdate(t.index)},onComplete:function(){t.tw=e({from:0,to:t.count,duration:n*t.count,ease:o,repeat:1/0,onUpdate:function(n){t._index=Math.floor(n),t.onUpdate(t.index)}})}})}},{key:"to",value:function(t){var n=this;this.stop(),this.tw=e({from:this.index,to:t.index,duration:t.duration||1e3,ease:i(.33,1,.68,1),onUpdate:function(t){n._index=Math.floor(t),n.onUpdate(n.index)},onComplete:function(){t.complete()}})}},{key:"stop",value:function(){var t;null===(t=this.tw)||void 0===t||t.stop()}},{key:"getAngleRangeByIndex",value:function(t){return[0-60*t,60-60*t]}}])&&c(n.prototype,a),r&&c(n,r),t}();var f=a({setup(){const e=r(0),o=new l((t=>{e.value=t}),8);return{onStart:async()=>{o.start(),await t(n())},activeIndex:e,options:Array.from({length:8}).map(((t,n)=>({title:`${n+1}等奖`,image:`/marketing-ui/option/option_${n+1}.png`})))}},render(){let t;return s(d("demo-block"),null,{default:()=>{return[s("div",{class:"grids"},[s(d("mk-grids"),{row:3},(n=t=this.options.map(((t,n)=>s("div",{class:"grids-option "+(n%2==0?"grids-option__1":"grids-option__2")+(this.activeIndex===n?" grids-option_active":"")},[t.title]))),"function"==typeof n||"[object Object]"===Object.prototype.toString.call(n)&&!u(n)?t:{default:()=>[t]})),s("div",{class:"grids-btn",onClick:this.onStart},null)])];var n}})}});export default f;