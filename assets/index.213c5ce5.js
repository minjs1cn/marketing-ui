var e=Object.defineProperty,a=Object.defineProperties,r=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(a,r,t)=>r in a?e(a,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[r]=t;import{u as s,f as c,d as p}from"./index.852530ca.js";import{d as l,o as g,h as u,e as d,t as m,b as f,i as b,j as h}from"./vendor.4fe08a48.js";var z=l({setup(){const e=s();e.onTouchstart((async()=>{const{data:e}=await c("/marketing-ui/prize_banner.jpeg");l.prize=e})),e.onTouchmove(((a,r,t)=>{e.scrapeoff(r,t)})),e.onTouchend((()=>{l.prize&&(e.clear(),p(2e3).then((()=>{l.prize="",e.reset("/marketing-ui/coating/coating.png")})))})),g((()=>{e.init({el:"#my-coating",coating:"/marketing-ui/coating/coating.png"})}));const l=u({prize:""}),f=d((()=>""!==l.prize));return b=((e,a)=>{for(var r in a||(a={}))i.call(a,r)&&o(e,r,a[r]);if(t)for(var r of t(a))n.call(a,r)&&o(e,r,a[r]);return e})({},m(l)),a(b,r({showPrize:f}));var b},render(){return f(h("demo-block"),null,{default:()=>[f("div",{class:"coating"},[this.showPrize?f("img",{class:"coating-prize",width:"360",height:"200",alt:"中奖信息",src:this.prize},null):f("div",{class:"coating-prize"},[f("span",{class:"coating-prize__loading"},[b("loading")])]),f("div",{class:"coating-container"},[f(h("mk-coating"),{id:"my-coating"},null)])])]})}});export default z;
