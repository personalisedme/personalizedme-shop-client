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
'use strict';
(self.webpackChunkPSPDFKit = self.webpackChunkPSPDFKit || []).push([
  [4267],
  {
    86528: (e, t, n) => {
      n.d(t, { V: () => s });
      var i = n(87463),
        r = n(33427),
        a = n(11765),
        o = n(21853);
      class s {
        constructor(e) {
          this.ctx = e;
        }
        renderTile(e, t, n, s, c, l) {
          let d;
          l &&
            (d = {
              annotations: l.annotations
                .filter(r.d)
                .map(a.Hs)
                .toJS()
                .map((e) => ({ content: e })),
              formFieldValues: l.formFieldValues.map(a.kr).toJS(),
              formFields: l.formFields.map(a.vD).toJS(),
              signatures: l.signatures || [],
              attachments: l.attachments
            });
          const h = i.f.Renderer.renderTile(
            this.ctx,
            e,
            t,
            n,
            {
              renderForPrinting: s,
              renderText: c,
              priority:
                t.width === n.width && t.height === n.height
                  ? i.f.Priority.High
                  : i.f.Priority.Normal
            },
            d
          ).then((e) =>
            (0, o.R9)({
              buffer: e.buffer,
              width: n.width,
              height: n.height,
              format: e.format
            }).then((e) => {
              if (null === e) throw new Error('Image handle is null');
              return e;
            })
          );
          return { promise: h.promise, cancel: h.cancel };
        }
      }
    },
    87460: (e, t, n) => {
      n.d(t, { W: () => m });
      var i = n(96156),
        r = n(35369),
        a = n(15359),
        o = n(45249),
        s = n(33427),
        c = n(60209),
        l = n(30006);
      function d(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          t &&
            (i = i.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, i);
        }
        return n;
      }
      function h(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(Object(n), !0).forEach(function (t) {
                (0, i.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : d(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      class m {
        constructor() {
          (0, i.Z)(this, 'attachmentsCache', (0, r.D5)()),
            (0, i.Z)(this, 'cachedAPStreams', (0, r.D5)()),
            (0, i.Z)(this, 'pageAPStreamsPromises', (0, r.D5)()),
            (0, i.Z)(this, 'annotationAPStreamPromises', (0, r.D5)()),
            (0, i.Z)(this, '_cachedRenderedAnnotation', {
              index: '',
              width: 0,
              height: 0,
              APStreamPromise: Promise.resolve(void 0)
            });
        }
        getAnnotationFormFieldAndValue(e) {
          var t;
          const n = this.provider;
          (0, a.kG)(n instanceof n.constructor, 'Backend can only use backend annotation provider');
          const i =
            e instanceof o.x_
              ? null === (t = n._readStateCallbacks) || void 0 === t
                ? void 0
                : t.getFormFieldByName(e.formFieldName)
              : null;
          return {
            formField: i,
            formFieldValue:
              !i || i instanceof o.Yo
                ? null
                : new o.KD({
                    name: i.name,
                    value:
                      void 0 !== i.formattedValue
                        ? i.formattedValue
                        : 'string' == typeof i.value
                          ? i.value
                          : i.values
                  })
          };
        }
        getAnnotationAvailableVariants(e) {
          var t;
          const n = this.provider;
          (0, a.kG)(n instanceof n.constructor, 'Backend can only use backend annotation provider');
          return [
            ...((null === (t = n._readStateCallbacks) || void 0 === t
              ? void 0
              : t.getAvailableVariants(e)) || []),
            'normal'
          ];
        }
        cachedRenderAnnotation(e, t, n, i, r) {
          const o = this.provider;
          (0, a.kG)(o instanceof o.constructor, 'Backend can only use backend annotation provider');
          const { formField: c, formFieldValue: l } = this.getAnnotationFormFieldAndValue(e);
          if (!(0, s._R)(e, c)) return this.renderAnnotation(e, l, t, n, i, r);
          const d = this.getAnnotationAvailableVariants(e);
          let m = !1,
            u = () => {
              m = !0;
            };
          return {
            promise: new Promise(async (a, o) => {
              const s = (t) => {
                  const n = this.annotationAPStreamPromises.get(e.id);
                  n &&
                    ((this.annotationAPStreamPromises = this.annotationAPStreamPromises.delete(
                      e.id
                    )),
                    n(t));
                },
                c = this.annotationAPStreamPromises.get(e.id);
              (this.annotationAPStreamPromises = this.annotationAPStreamPromises.set(e.id, a)),
                c && c(null);
              try {
                const o = this.pageAPStreamsPromises.get(e.pageIndex);
                if (!o) {
                  const t = new Promise((t) => {
                    this.annotationAPStreamPromises = this.annotationAPStreamPromises.set(e.id, t);
                  });
                  return void a(await t);
                }
                await o;
                const c = this.cachedAPStreams.get(e.pageIndex);
                if (c) {
                  const t = c ? c.get(e.id) : null;
                  if (t) return void s(this.getAPStream(t, r));
                }
                const { promise: p, cancel: f } = this.renderAPStream(e, l, t, n, i, d, r);
                if (m) s(null);
                else if (((u = f), d.length > 1)) {
                  const t = await Promise.all(p.map((e) => e.promise));
                  s(t[d.indexOf(r || 'normal')]),
                    t.some(Boolean) &&
                      this.cacheAPStream(
                        d.reduce((e, n, i) => h(h({}, e), {}, { [n]: t[i] }), {}),
                        e
                      );
                } else {
                  const t = await p,
                    n = t ? this.getAPStream(t, r) : null;
                  s(n), n && this.cacheAPStream(t, e);
                }
              } catch (e) {
                o(e);
              }
            }),
            cancel: u
          };
        }
        cacheAPStream(e, t) {
          let n = this.cachedAPStreams.get(t.pageIndex);
          n ||
            ((this.cachedAPStreams = this.cachedAPStreams.set(t.pageIndex, (0, r.D5)())),
            (n = this.cachedAPStreams.get(t.pageIndex))),
            (this.cachedAPStreams = this.cachedAPStreams.setIn([t.pageIndex, t.id], e));
        }
        clearAllPageAPStreams(e) {
          const t = this.cachedAPStreams.get(e);
          t &&
            (t.forEach((e) => {
              this.releaseAPStream(e);
            }),
            (this.cachedAPStreams = this.cachedAPStreams.delete(e))),
            (this.pageAPStreamsPromises = this.pageAPStreamsPromises.delete(e));
        }
        clearPageAPStreams(e, t) {
          const n = this.cachedAPStreams.get(e);
          n &&
            (n
              .filter((e, n) => t.has(n))
              .forEach((e) => {
                this.releaseAPStream(e);
              }),
            (this.cachedAPStreams = this.cachedAPStreams.updateIn([e], (e) =>
              e.filter((e, n) => !t.has(n))
            )));
        }
        getAPStream(e, t) {
          return e instanceof c.Z ? e : (null == e ? void 0 : e[t || 'normal']) || null;
        }
        renderAPStream(e, t, n, i, r, a, o) {
          if (a.length > 1) {
            const o = a.map((a) =>
              this.renderAnnotation(e, t, n, i, r, 'normal' !== a ? a : void 0)
            );
            return {
              promise: o,
              cancel: () => {
                o.forEach((e) => {
                  e.cancel();
                });
              }
            };
          }
          return this.renderAnnotation(e, t, n, i, r, o);
        }
        releaseAPStream(e) {
          e instanceof c.Z
            ? e.release()
            : Object.values(e).forEach((e) => {
                e.release();
              });
        }
        isVisuallyIdenticalStampAnnotationCached(e) {
          let { annotation: t, width: n, height: i } = e;
          const r = (0, s.et)(t);
          return (0, l.Gx)({
            annotation: t,
            annotationVisualPropertiesString: r,
            width: n,
            height: i,
            secondAnnotationVisualPropertiesString: this._cachedRenderedAnnotation.index,
            secondAnnotationWidth: this._cachedRenderedAnnotation.width,
            secondAnnotationHeight: this._cachedRenderedAnnotation.height
          });
        }
        cachedStampAnnotationDiscardablePromise(e) {
          let { promise: t, resolve: n, reject: i } = e;
          return (
            this._cachedRenderedAnnotation.APStreamPromise.then((e) => {
              let t;
              e && ((e.release = () => {}), (t = new c.Z(e.element.cloneNode(!0), () => {}))), n(t);
            }).catch(i),
            { promise: t, cancel: () => {} }
          );
        }
      }
    },
    67055: (e, t, n) => {
      n.d(t, { i: () => s });
      var i = n(35369);
      class r extends i.WV({
        id: '',
        attachmentId: '',
        description: null,
        fileName: null,
        fileSize: null,
        updatedAt: null
      }) {}
      var a = n(34923);
      function o(e, t) {
        return t;
      }
      function s(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return o(0, n)
          ? new r({
              id: (0, a.C)(),
              description: t.fileDescription,
              attachmentId: e,
              fileName: t.fileName || null,
              fileSize: t.fileSize || null,
              updatedAt: t.modificationDate ? new Date(t.modificationDate) : null
            })
          : new r({
              id: e,
              description: t.description,
              attachmentId: t.fileAttachmentId,
              fileName: t.fileName || null,
              fileSize: t.fileSize || null,
              updatedAt: new Date(t.updatedAt) || null
            });
      }
    },
    7407: (e, t, n) => {
      n.d(t, { a: () => c, i: () => l });
      var i = n(15359),
        r = n(35369),
        a = n(96029),
        o = n(74751),
        s = n(45249);
      function c(e) {
        return {
          type: 'pspdfkit/outline-element',
          children: e.children && e.children.map((e) => c(e)).toJS(),
          title: e.title,
          color: e.color && (0, o.C)(e.color),
          isBold: e.isBold,
          isItalic: e.isItalic,
          isExpanded: e.isExpanded,
          action: e.action && (0, a.vP)(e.action)
        };
      }
      function l(e) {
        let t, n;
        (0, i.kG)('pspdfkit/outline-element' === e.type, 'invalid outline element type.'),
          (0, i.kG)(
            null == e.children || Array.isArray(e.children),
            'children must be an Array<OutlineElement>.'
          ),
          (0, i.kG)('string' == typeof e.title, 'title must be a string.'),
          (0, i.kG)(null == e.isBold || 'boolean' == typeof e.isBold, 'isBold must be a boolean.'),
          (0, i.kG)(
            null == e.isItalic || 'boolean' == typeof e.isItalic,
            'isItalic must be a boolean.'
          ),
          (0, i.kG)(
            null == e.isExpanded || 'boolean' == typeof e.isExpanded,
            'isExpanded must be a boolean.'
          );
        try {
          t = e.action && (0, a.lk)(e.action);
        } catch (t) {
          (0, i.ZK)(`PDF Action not supported ${JSON.stringify(e.action)})`);
        }
        try {
          n = e.color && (0, o.b)(e.color);
        } catch (t) {
          (0, i.ZK)(`Invalid color:\n\n${e.color}`);
        }
        const c = {
          title: e.title,
          color: n,
          isBold: !0 === e.isBold,
          isItalic: !0 === e.isItalic,
          isExpanded: !0 === e.isExpanded,
          action: t,
          children: (0, r.aV)()
        };
        return (
          e.children && e.children.length > 0 && (c.children = (0, r.aV)(e.children.map(l))),
          new s.sT(c)
        );
      }
    },
    88265: (e, t, n) => {
      n.d(t, { M: () => o });
      var i = n(96156);
      function r(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          t &&
            (i = i.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, i);
        }
        return n;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? r(Object(n), !0).forEach(function (t) {
                (0, i.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : r(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      function o(e, t, n, i, r, o) {
        let s;
        return (
          e.has(n) ? (s = e.get(n)) : ((s = r.toString()), (t[s] = n), e.set(n, s)),
          a(a({}, i), {}, { [o]: s })
        );
      }
    },
    84254: (e, t, n) => {
      n.d(t, { E: () => s });
      var i = n(35369),
        r = n(15359),
        a = n(98492),
        o = n(68804);
      function s(e) {
        return (
          (0, r.kG)(Array.isArray(e), 'Wrong `json` field'),
          (0, i.aV)(
            e
              .map(
                (e) => (
                  (0, r.kG)('number' == typeof e.pageIndex, 'Wrong `pageIndex` field'),
                  (0, r.kG)('string' == typeof e.previewText, 'Wrong `previewText` field'),
                  (0, r.kG)(Array.isArray(e.rangeInPreview), 'Wrong `rangeInPreview` field'),
                  (0, r.kG)(Array.isArray(e.rectsOnPage), 'Wrong `rectsOnPage` field'),
                  new o.Z({
                    pageIndex: e.pageIndex,
                    previewText: e.previewText,
                    locationInPreview: e.rangeInPreview[0],
                    lengthInPreview: e.rangeInPreview[1],
                    rectsOnPage: (0, i.aV)(e.rectsOnPage).map((e) => (0, a.k)(e)),
                    isAnnotation: !!e.isAnnotation,
                    annotationRect: e.annotationRect ? (0, a.k)(e.annotationRect) : null
                  })
                )
              )
              .filter(Boolean)
          )
        );
      }
    }
  }
]);
