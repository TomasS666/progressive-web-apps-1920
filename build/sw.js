var serviceWorkerOption = {
  "assets": [
    "/style.8b725feca41fedcd1875.css",
    "/index.67fc03013ff1e37503e6.js"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=["/","/offline"].concat(serviceWorkerOption.assets);self.addEventListener("install",(function(e){console.log("Installing sw"),e.waitUntil(caches.open("pwa-v15").then((function(e){return e.addAll(n)})))})),self.addEventListener("notificationclick",(function(e){var t=e.notification,n=(t.data.primaryKey,e.action);console.log(n),"close"===n?t.close():"update"===n?(console.log("updating!!"),self.skipWaiting().then((function(){return console.log("skip and waited")}))):t.close()})),self.addEventListener("fetch",(function(e){var t,r;console.log("Fetch: ",e.request.url),"GET"===(t=e.request).method&&n.includes((r=t.url,new URL(r).pathname))?(console.log("Core get req: ",e.request.url),e.respondWith(caches.open("pwa-v15").then((function(t){return t.match(e.request.url)})))):function(e){return"GET"===e.method&&null!==e.headers.get("accept")&&e.headers.get("accept").indexOf("text/html")>-1}(e.request)&&(console.log("html get request",e.request.url),e.respondWith(caches.open("pwa-v15").then((function(t){return t.match(e.request.url)})).then((function(t){return t||function(e,t){return fetch(e).then((function(n){if(!n.ok)throw new TypeError("Bad response status");var r=n.clone();return caches.open(t).then((function(t){return t.put(e,r)})),n}))}(e.request,"pwa-v15")})).catch((function(e){return console.log("Ben ik offline?"),caches.open("pwa-v15").then((function(e){return e.match("/offline")}))}))))}))}]);