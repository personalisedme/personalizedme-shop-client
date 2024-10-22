/*!
 * PSPDFKit for Web 2024.4.0 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2024 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
(self.webpackChunkPSPDFKit = self.webpackChunkPSPDFKit || []).push([
  [1945],
  {
    93072: (t, e, r) => {
      t.exports = function () {
        return r(69855)(
          '/*!\n * PSPDFKit for Web 2024.4.0 (https://pspdfkit.com/web)\n *\n * Copyright (c) 2016-2024 PSPDFKit GmbH. All rights reserved.\n *\n * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW\n * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.\n * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.\n * This notice may not be removed from this file.\n *\n * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/\n */(()=>{"use strict";const t=function t(e){let r;return r=e instanceof Error?e:new Error(e),Object.setPrototypeOf(r,t.prototype),r};t.prototype=Object.create(Error.prototype,{name:{value:"PSPDFKitError",enumerable:!1}});const e=t;function r(t,r){if(!t)throw new e(`Assertion failed: ${r||"Condition not met"}\\n\\nFor further assistance, please go to: https://pspdfkit.com/support/request`)}["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]",\'[tabindex]:not([tabindex^="-"])\'].join(",");function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t){var e=function(t,e){if("object"!==n(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,e||"default");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===n(e)?e:String(e)}function i(t,e,r){return(e=o(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}new WeakMap;async function a(t){const r=(await async function(t){try{const r=await fetch(t).catch((r=>{throw new e(`Error fetching dynamic fonts file ${t}. ${r}`)}));if(200!==r.status)throw new e(`Error fetching dynamic fonts file ${t}. Status code: ${r.status}`);return r}catch(t){throw t}}(t)).json().catch((r=>{throw new e(`Error parsing dynamic fonts file ${t}. ${r}`)}));return r}let s=function(t){return t[t.pdf_a_1a=0]="pdf_a_1a",t[t.pdf_a_1b=1]="pdf_a_1b",t[t.pdf_a_2a=2]="pdf_a_2a",t[t.pdf_a_2u=3]="pdf_a_2u",t[t.pdf_a_2b=4]="pdf_a_2b",t[t.pdf_a_3a=5]="pdf_a_3a",t[t.pdf_a_3u=6]="pdf_a_3u",t[t.pdf_a_3b=7]="pdf_a_3b",t[t.pdf_a_4=8]="pdf_a_4",t[t.pdf_a_4e=9]="pdf_a_4e",t[t.pdf_a_4f=10]="pdf_a_4f",t}({});function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}const l="/create.pdf",u="/save.pdf",p="/create.docx",d="/save.docx",y="/templateData.json",b="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope;let m=null,g=null;function _(t){let e;r(g,"GdPicture WebAssembly is not loaded.");for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];for(const t of o)e=Object.assign(o[0],t);const a=JSON.stringify(f({type:t},e)),s=JSON.parse(g.CommandHandler(a));if(!s.success)throw new Error(s.errorReason+": "+s.errorMessage+"\\n"+s.error);return s}const w=new class{_mountCustomFonts(t,e){r(m,"WebAssembly module not loaded."),m.FS.mkdir(e);{const r=b?m.FS.filesystems.WORKERFS:m.FS.filesystems.MEMFS;m.FS.mount(r,{blobs:t},e)}}async loadModule(t,e,r,n,o,i,s){const{Assemblies:c,Module:f}=await async function(t,e){if("string"==typeof t){const r="pspdfkit-lib/",n=`${r}gdpicture-2df8622a/jit`,o=`${r}gdpicture-2df8622a/aot`;let i,a;e?(i=`${t}${o}/initDotnet.js`,a=`${t}${o}`):(i=`${t}${n}/initDotnet.js`,a=`${t}${n}`);const{initDotnet:s}=await import(i);return s(a)}throw new Error("GdPicture WASM loader not implemented")}(t,e);g=c.GdPictureWasm.API,m=f,_("gdpicture/setLicense",{origin:r},{licenseKey:n||"DEMO_PSPDFKIT_WEB"});const l=o?"/fonts":"";if(o&&!m.FS.analyzePath(l).exists&&(this._mountCustomFonts(o,l),_("gdpicture/setFonts",{fontPaths:[l]})),i){const t=await a(i);_("gdpicture/setDynamicFontLoading",{baseUrl:i.split("/").slice(0,-1).join("/"),allowedFonts:t.availableFonts,v:1})}s&&_("gdpicture/setFontSubstitutions",{fontSubstitutions:s})}toPdf(t,e){m.FS.writeFile(l,new Uint8Array(t));const r={file:u,format:"pdf"};e&&e in s&&(r.conformance=e);try{return _("gdpicture/process",{input:{file:l},output:r}),m.FS.readFile(u).buffer}finally{try{m.FS.unlink(u)}catch(t){}}}toOffice(t,e){m.FS.writeFile(l,new Uint8Array(t));const r=`/save.${e}`;try{return _("gdpicture/process",{input:{file:l},output:{file:r,format:e}}),m.FS.readFile(r).buffer}finally{try{m.FS.unlink(r)}catch(t){console.log(t.message)}}}async populateDocumentTemplate(t,e){let r;m.FS.writeFile(p,new Uint8Array(t));try{r=JSON.stringify(e,null,2)}catch(t){throw new Error("Invalid config data")}m.FS.writeFile(y,r);try{return _("gdpicture/process-office-template",{inputFile:p,modelAndConfigFile:y,outputFile:d}),m.FS.readFile(d).buffer}finally{try{m.FS.unlink(d),m.FS.unlink(y)}catch(t){console.log(t.message)}}}},S=self;S.global=S,S.module={},S.onmessage=async t=>{let e,r,{data:n}=t;try{const t=await w[n.action](...n.args);if(e={id:n.id,result:t},Array.isArray(t)){const e=t.filter((t=>t instanceof ArrayBuffer));e.length>0&&(r=e)}t instanceof ArrayBuffer&&(r=[t])}catch(t){const o=[...n.args].filter((t=>t instanceof ArrayBuffer));o.length>0&&(r=o),e={id:n.id,error:t.message||t.toString(),callArgs:n.args}}S.postMessage(e,r)}})();',
          null
        );
      };
    },
    69855: (t) => {
      'use strict';
      var e = window.URL || window.webkitURL;
      t.exports = function (t, r) {
        try {
          try {
            var n;
            try {
              (n = new (window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder)()).append(t),
                (n = n.getBlob());
            } catch (e) {
              n = new Blob([t]);
            }
            return new Worker(e.createObjectURL(n));
          } catch (e) {
            return new Worker('data:application/javascript,' + encodeURIComponent(t));
          }
        } catch (t) {
          if (!r) throw Error('Inline worker is not supported');
          return new Worker(r);
        }
      };
    }
  }
]);
