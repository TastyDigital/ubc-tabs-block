!function(){var t,e={4314:function(t){!function(){"use strict";function e(t,e){t&&(this.el=t,this.tabTriggers=this.el.querySelector(":scope > ul").getElementsByClassName("js-tabs-trigger"),this.tabPanels=this.el.querySelectorAll(":scope > .js-tabs-panel"),this.accordionTriggers=this.el.querySelectorAll(":scope > .js-tabs-panel > .js-accordion-trigger"),this.options=this._extend({breakpoint:640,tabsAllowed:!0,selectedTab:0,startCollapsed:!1},e),"true"==t.getAttribute("data-tabs-allowed")?this.options.tabsAllowed=!0:"false"==t.getAttribute("data-tabs-allowed")&&(this.options.tabsAllowed=!1),t.getAttribute("data-breakpoint")&&(this.options.breakpoint=parseInt(t.getAttribute("data-breakpoint"))),t.getAttribute("data-selected-tab")&&(this.options.selectedTab=parseInt(t.getAttribute("data-selected-tab"))),"true"==t.getAttribute("data-start-collapsed")?this.options.startCollapsed=!0:"false"==t.getAttribute("data-start-collapsed")&&(this.options.startCollapsed=!1),0!==this.tabTriggers.length&&this.tabTriggers.length===this.tabPanels.length&&this._init())}e.prototype._init=function(){var t=this;this.tabTriggersLength=this.tabTriggers.length,this.accordionTriggersLength=this.accordionTriggers.length,this.selectedTab=0,this.prevSelectedTab=null,this.clickListener=this._clickEvent.bind(this),this.keydownListener=this._keydownEvent.bind(this),this.keys={prev:37,next:39,space:32,enter:13},window.innerWidth>=this.options.breakpoint&&this.options.tabsAllowed?this.isAccordion=!1:this.isAccordion=!0;for(var e=0;e<this.tabTriggersLength;e++)this.tabTriggers[e].index=e,this.tabTriggers[e].addEventListener("click",this.clickListener,!1),this.tabTriggers[e].addEventListener("keydown",this.keydownListener,!1),this.tabTriggers[e].classList.contains("is-selected")&&(this.selectedTab=e),this._hide(e);for(e=0;e<this.accordionTriggersLength;e++)this.accordionTriggers[e].index=e,this.accordionTriggers[e].addEventListener("click",this.clickListener,!1),this.accordionTriggers[e].addEventListener("keydown",this.keydownListener,!1),this.accordionTriggers[e].classList.contains("is-selected")&&(this.selectedTab=e);isNaN(this.options.selectedTab)||(this.selectedTab=this.options.selectedTab<this.tabTriggersLength?this.options.selectedTab:this.tabTriggersLength-1),this.el.classList.add("is-initialized"),this.options.tabsAllowed&&this.el.classList.add("tabs-allowed"),this.options.startCollapsed&&this.isAccordion||this.selectTab(this.selectedTab,!1);var s=this._debounce((function(){window.innerWidth>=t.options.breakpoint&&t.options.tabsAllowed?(t.isAccordion=!1,t.options.tabsAllowed&&t.el.classList.add("tabs-allowed"),t.selectTab(t.selectedTab)):(t.isAccordion=!0,t.el.classList.remove("tabs-allowed"),t.options.startCollapsed||t.selectTab(t.selectedTab))}),50);window.addEventListener("resize",s)},e.prototype._clickEvent=function(t){t.preventDefault();var e=this._getClosest(t.target,".js-tabs-trigger"),s=0;null==e?(e=this._getClosest(t.target,".js-accordion-trigger"),s=this._getClosest(e,".js-tabs-panel"),this.isAccordion=!0):this.isAccordion=!1;var i=null!=t.target.index?t.target.index:s.index;(i!==this.selectedTab||this.isAccordion)&&this.selectTab(i,!0)},e.prototype._keydownEvent=function(t){var e;if(t.keyCode===this.keys.prev||t.keyCode===this.keys.next||t.keyCode===this.keys.space||t.keyCode===this.keys.enter){if(t.preventDefault(),t.keyCode===this.keys.prev&&t.target.index>0&&!this.isAccordion)e=t.target.index-1;else if(t.keyCode===this.keys.next&&t.target.index<this.tabTriggersLength-1&&!this.isAccordion)e=t.target.index+1;else{if(t.keyCode!==this.keys.space&&t.keyCode!==this.keys.enter)return;e=t.target.index}this.selectTab(e,!0)}},e.prototype._show=function(t,e){this.tabPanels[t].removeAttribute("tabindex"),this.tabTriggers[t].removeAttribute("tabindex"),this.tabTriggers[t].classList.add("is-selected"),this.tabTriggers[t].setAttribute("aria-selected",!0),this.accordionTriggers[t].setAttribute("aria-expanded",!0);var s=this.tabPanels[t].getElementsByClassName("content")[0];s.setAttribute("aria-hidden",!1),s.classList.remove("is-hidden"),s.classList.add("is-open"),this.tabPanels[t].classList.remove("is-hidden"),this.tabPanels[t].classList.add("is-open"),e&&this.tabTriggers[t].focus()},e.prototype._hide=function(t){this.tabTriggers[t].classList.remove("is-selected"),this.tabTriggers[t].setAttribute("aria-selected",!1),this.tabTriggers[t].setAttribute("tabindex",-1),this.accordionTriggers[t].setAttribute("aria-expanded",!1);var e=this.tabPanels[t].getElementsByClassName("content")[0];e.setAttribute("aria-hidden",!0),e.classList.remove("is-open"),e.classList.add("is-hidden"),this.tabPanels[t].classList.remove("is-open"),this.tabPanels[t].classList.add("is-hidden"),this.tabPanels[t].setAttribute("tabindex",-1)},e.prototype.selectTab=function(t,e){if(null===t){if(this.isAccordion)return;t=0}if(!this.tabPanels[t].classList.contains("is-hidden")&&e)return t===this.selectedTab?this.selectedTab=null:(this.selectedTab=null,this.prevSelectedTab=t),void this._hide(t);if(this.isAccordion)this.prevSelectedTab=this.selectedTab,this.selectedTab=t;else{if(null!==this.prevSelectedTab&&this.isAccordion)this._hide(this.selectedTab);else for(var s=0;s<this.tabTriggersLength;s++)s!==t&&this._hide(s);this.prevSelectedTab=this.selectedTab,this.selectedTab=t}this._show(this.selectedTab,e)},e.prototype.destroy=function(){for(var t=0;t<this.tabTriggersLength;t++)this.tabTriggers[t].classList.remove("is-selected"),this.tabTriggers[t].removeAttribute("aria-selected"),this.tabTriggers[t].removeAttribute("tabindex"),this.tabPanels[t].classList.remove("is-hidden"),this.tabPanels[t].removeAttribute("aria-hidden"),this.tabPanels[t].removeAttribute("tabindex"),this.tabTriggers[t].removeEventListener("click",this.clickListener,!1),this.tabTriggers[t].removeEventListener("keydown",this.keydownListener,!1),delete this.tabTriggers[t].index;this.el.classList.remove("is-initialized")},e.prototype._getClosest=function(t,e){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),s=e.length;--s>=0&&e.item(s)!==this;);return s>-1});t&&t!==document;t=t.parentNode)if(t.matches(e))return t;return null},e.prototype._extend=function(){var t={},e=!1,s=0,i=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],s++);for(var r=function(s){for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e&&"[object Object]"===Object.prototype.toString.call(s[i])?t[i]=extend(!0,t[i],s[i]):t[i]=s[i])};s<i;s++)r(arguments[s]);return t},e.prototype._debounce=function(t,e,s){var i;return function(){var r=this,n=arguments,o=s&&!i;clearTimeout(i),i=setTimeout((function(){i=null,s||t.apply(r,n)}),e),o&&t.apply(r,n)}};var s=Array.prototype.slice;function i(){(".js-tabs",s.call(document.querySelectorAll(".js-tabs"))).forEach((function(t){new e(t)}))}"undefined"!=typeof Document&&("loading"!==document.readyState?i():document.addEventListener("DOMContentLoaded",i)),"undefined"!=typeof self&&(self.AccordionTabs=e),t.exports&&(t.exports=e)}()},8505:function(t,e,s){"use strict";if(s(4314),window.location.hash){const t=window.location.hash.substring(1);let e=document.getElementById(t);if(e){let t=0;for(;null!==(e=e.previousSibling);)t++;document.getElementsByClassName("wp-block-ubc-tabs")[0].dataset.selectedTab=t}}document.querySelectorAll(".wp-block-ubc-tabs").forEach((t=>new AccordionTabs(t)))}},s={};function i(t){var r=s[t];if(void 0!==r)return r.exports;var n=s[t]={exports:{}};return e[t](n,n.exports,i),n.exports}i.m=e,t=[],i.O=function(e,s,r,n){if(!s){var o=1/0;for(d=0;d<t.length;d++){s=t[d][0],r=t[d][1],n=t[d][2];for(var a=!0,l=0;l<s.length;l++)(!1&n||o>=n)&&Object.keys(i.O).every((function(t){return i.O[t](s[l])}))?s.splice(l--,1):(a=!1,n<o&&(o=n));if(a){t.splice(d--,1);var c=r();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[s,r,n]},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,{a:e}),e},i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={343:0,834:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var r,n,o=s[0],a=s[1],l=s[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);if(l)var d=l(i)}for(e&&e(s);c<o.length;c++)n=o[c],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(d)},s=self.webpackChunkubc_tab_block=self.webpackChunkubc_tab_block||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var r=i.O(void 0,[834],(function(){return i(8505)}));r=i.O(r)}();