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
  [2333],
  {
    36344: (e, t, s) => {
      s.d(t, { InstantProvider: () => X });
      var i = s(17375),
        n = s(96156),
        o = s(35369),
        a = s(15359),
        r = s(11765),
        c = s(88133),
        l = s(24382);
      class d extends o.WV({ clientId: '', userId: null, presenceContent: {} }) {}
      class h extends o.WV({ status: 'offline', currentClient: null, clients: (0, o.D5)() }) {}
      var u = s(68944),
        m = s(79685);
      class p {
        constructor(e, t) {
          (this.callback = e), (this.timerCalc = t), (this.timer = null), (this.tries = 0);
        }
        reset() {
          (this.tries = 0), this.timer && clearTimeout(this.timer);
        }
        scheduleTimeout() {
          this.timer && clearTimeout(this.timer),
            (this.timer = setTimeout(
              () => {
                (this.tries = this.tries + 1), this.callback();
              },
              this.timerCalc(this.tries + 1)
            ));
        }
      }
      var k = s(82716);
      const f = '0.0.1',
        _ = 0,
        g = 1,
        C = 2,
        b = { name: 'PSPDFKit-Web' },
        y = (e) => [1e3, 2e3][e - 1] || 5e3;
      class F {
        constructor(e, t) {
          let {
            reconnectTimerCalc: s = y,
            enableReconnect: i = !0,
            events: n = []
          } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          (this.eventEmitter = new m.Z(['connect', 'disconnect', 'error'].concat(n))),
            (this.serverURL = e),
            (this.authPayload = t),
            (this.socket = null),
            (this.lastRequestId = 0),
            (this.requestsWaitingForAnswers = (0, o.D5)()),
            i &&
              (this.reconnectTimer = new p(() => {
                this.socket && (this.socket.close(), (this.socket = null)), this.connect();
              }, s)),
            this.clearAuthenticationInformation();
        }
        registerEvents(e) {
          this.eventEmitter.events.push(...e);
        }
        connect() {
          if (this.socket) return;
          const e = new WebSocket(this.serverURL);
          (e.onopen = this.onOpen.bind(this)),
            (e.onmessage = this.onMessage.bind(this)),
            (e.onerror = () => {
              (this.socket = null),
                this.eventEmitter.emit(
                  'error',
                  `Failed to create the WebSocket connection to ${this.serverURL}. Please check your firewall or proxy settings.`
                );
            }),
            (this.socket = e);
        }
        disconnect() {
          this.socket &&
            ((this.socket.onclose = () => {}),
            this.socket.close(),
            this.clearAuthenticationInformation(),
            this.abortOpenRequests(),
            this.eventEmitter.emit('disconnect'));
        }
        get connectionState() {
          switch (this.socket && this.socket.readyState) {
            case _:
              return 'connecting';
            case g:
              return 'open';
            case C:
              return 'closing';
            default:
              return 'closed';
          }
        }
        get isAuthenticated() {
          return '' !== this.clientId;
        }
        sendRequest(e, t) {
          return new Promise((s, i) => {
            if (!this.isAuthenticated || !this.socket)
              return void i(
                new a.p2('Cannot send request when the connection is not authenticated')
              );
            const n = this.nextRequestId(),
              o = JSON.stringify(t);
            this.requestsWaitingForAnswers = this.requestsWaitingForAnswers.set(n, {
              resolve: s,
              reject: i
            });
            this.socket.send(`${n}:${e}:${o}`);
          });
        }
        on(e, t) {
          this.eventEmitter.on(e, t);
        }
        off(e, t) {
          this.eventEmitter.off(e, t);
        }
        onOpen() {
          const e = this.socket;
          e && ((e.onerror = this.onError.bind(this)), (e.onclose = this.onClose.bind(this)));
        }
        onMessage(e) {
          const t = e.data;
          if (this.isAuthenticated) {
            const e = this.parseFrame(t);
            if (e.requestId) {
              const t = e.requestId;
              (0, k.k)(
                this.requestsWaitingForAnswers.has(t),
                'Received a reply with an unknown request ID.'
              );
              const s = this.requestsWaitingForAnswers.get(t);
              switch (((0, k.k)(s), e.action)) {
                case 'ok':
                  s.resolve(e.payload);
                  break;
                case 'error':
                  s.reject(new a.p2(e.payload.reason || 'Unknown error'));
                  break;
                default:
                  (0, k.k)(!1, `${e.action} is not a valid request reply`);
              }
              this.requestsWaitingForAnswers = this.requestsWaitingForAnswers.delete(t);
            } else
              this.eventEmitter.events.includes(e.action) &&
                this.eventEmitter.emit(e.action, e.payload),
                this.log('incoming info message', e);
          } else {
            const e = this.parseUnauthenticatedFrame(t);
            switch (e.action) {
              case 'hello':
                this.onHello(e.payload);
                break;
              case 'authenticated':
                this.onAuthenticated(e.payload);
                break;
              case 'error':
                this.eventEmitter.emit('error', e.payload.reason || 'Unknown error');
            }
          }
        }
        onClose(e) {
          this.clearAuthenticationInformation(),
            this.abortOpenRequests(),
            this.reconnectTimer && this.reconnectTimer.scheduleTimeout(),
            this.eventEmitter.emit('disconnect'),
            this.log('close', e);
        }
        onError(e) {
          this.reconnectTimer && this.reconnectTimer.scheduleTimeout(), this.log('error', e);
        }
        nextRequestId() {
          const e = this.lastRequestId + 1;
          return (this.lastRequestId = e), e;
        }
        onHello(e) {
          const t = this.socket;
          if (2 === e.protocol_version) {
            const e = {
              protocol_version: 2,
              client_version: f,
              client_info: b,
              auth_payload: this.authPayload
            };
            t.send(`hello_web:${JSON.stringify(e)}`);
          } else
            t.send(
              `handshake_failed:${JSON.stringify({ reason: 'protocol_mismatch', protocol_version: 2, client_version: f, client_info: b })}`
            ),
              this.eventEmitter.emit('error', 'protocol_mismatch');
        }
        onAuthenticated(e) {
          (0, k.k)(e.client_id, '`authenticated` message has no `client_id`'),
            (this.clientId = e.client_id),
            (this.userId = e.user_id || null),
            this.eventEmitter.emit('connect', { clientId: this.clientId, userId: this.userId });
        }
        log() {
          if ('development' === (0, u.zj)()) {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            console.log('SYNCConnection', ...t);
          }
        }
        parseFrame(e) {
          const [, t, s, i] = /^(\d+|info):([a-zA-Z-_]+):(.+)$/.exec(e.toString());
          let n = null;
          'info' !== t && (n = parseInt(t));
          return { requestId: n, action: s, payload: JSON.parse(i) };
        }
        parseUnauthenticatedFrame(e) {
          const [, t, s] = /^(hello|authenticated|error):(.+)$/.exec(e.toString());
          return { action: t, payload: JSON.parse(s) };
        }
        abortOpenRequests() {
          this.requestsWaitingForAnswers.forEach((e) => {
            e.reject(new a.p2('request aborted'));
          }),
            (this.requestsWaitingForAnswers = (0, o.D5)());
        }
        clearAuthenticationInformation() {
          (this.clientId = ''), (this.userId = null);
        }
      }
      function v(e) {
        return (
          (0, a.kG)('string' == typeof e.client_id, 'The client payload must have a `client_id`'),
          (0, a.kG)('object' == typeof e.presence, 'The client payload must have a `presence`'),
          new d({ clientId: e.client_id, userId: e.user_id, presenceContent: e.presence })
        );
      }
      class w {
        constructor() {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new h(),
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : F;
          (this.state = e), (this.connectionClass = t);
        }
        load(e, t, s) {
          return new Promise((i, n) => {
            (this.setState = (e) => {
              this.state = e;
            }),
              (this.connection = new this.connectionClass(e, t, { events: ['client_presence'] })),
              this.connection.on('connect', (e) => {
                const t = new d({ clientId: e.clientId, userId: e.userId, presenceContent: s });
                this.setState(this.state.set('status', 'online').set('currentClient', t)),
                  this.populateClients(s)
                    .then(() => {
                      i(this);
                    })
                    .catch(n);
              }),
              this.connection.on('error', (e) => {
                n(new a.p2(e.toString()));
              }),
              this.connection.on('client_presence', (e) => this.onInfoClientPresence(e)),
              this.connection.connect();
          });
        }
        populateClients(e) {
          return new Promise((t, s) => {
            this.connection
              .sendRequest('enter_layer', { presence: e })
              .then((e) => {
                this.setState(
                  (function (e, t) {
                    return (
                      (0, k.k)(t.clients, 'The payload must have a `clients` list'),
                      e.withMutations((s) => {
                        var i;
                        const n = (0, o.D5)(
                          t.clients.map((e) => v(e)).map((e) => [e.clientId, e])
                        ).set(
                          null === (i = e.currentClient) || void 0 === i ? void 0 : i.clientId,
                          e.currentClient
                        );
                        s.set('clients', n);
                      })
                    );
                  })(this.state, e)
                ),
                  t();
              })
              .catch(s);
          });
        }
        onInfoClientPresence(e) {
          if (
            (this.setState(
              (function (e, t) {
                (0, k.k)('object' == typeof t.clients, 'The payload must have `clients`');
                const s = e.clients.withMutations((s) => {
                  if (t.clients.entered)
                    for (const i of t.clients.entered) {
                      if (e.clients.has(i.client_id))
                        throw new a.p2('The client marked as entered is already known');
                      const t = v(i);
                      s.set(t.clientId, t);
                    }
                  if (t.clients.updated)
                    for (const i of t.clients.updated) {
                      (0, k.k)(
                        'string' == typeof i.client_id,
                        'The client payload must have a `client_id`'
                      ),
                        (0, k.k)(
                          'object' == typeof i.presence,
                          'The client payload must have a `presence`'
                        );
                      const t = e.clients.get(i.client_id);
                      if (!t) throw new a.p2('The client marked as updated is not known');
                      s.set(t.clientId, t.set('presenceContent', i.presence));
                    }
                  if (t.clients.left)
                    for (const i of t.clients.left) {
                      if (!e.clients.has(i))
                        throw new a.p2('The client marked as left is not known');
                      s.delete(i);
                    }
                });
                return e.set('clients', s);
              })(this.state, e)
            ),
            this.shouldFireClientUpdatesCallback)
          ) {
            let t = (0, o.D5)();
            if (e.clients.entered) {
              const s = e.clients.entered.map((e) => e.client_id);
              t = this.state.clients.filter((e) => -1 !== s.indexOf(e.clientId)).toMap();
            }
            let s = (0, o.D5)();
            if (e.clients.updated) {
              const t = e.clients.updated.map((e) => e.client_id);
              s = this.state.clients.filter((e) => -1 !== t.indexOf(e.clientId)).toMap();
            }
            let i = (0, o.aV)();
            e.clients.updated && (i = (0, o.aV)(e.clients.left)),
              this.clientUpdatesCallback(t, s, i);
          }
        }
        disconnect() {
          'offline' !== this.getStatus() &&
            (this.setState(this.state.set('status', 'offline')), this.connection.disconnect());
        }
        getStatus() {
          return this.state.status;
        }
        getCurrentClient() {
          return this.state.currentClient;
        }
        getClients() {
          return (this.shouldFireClientUpdatesCallback = !0), this.state.clients;
        }
        updatePresence(e) {
          return new Promise((t, s) => {
            if ('online' !== this.getStatus())
              return s(new a.p2('ClientsPresence is not connected'));
            this.connection.sendRequest('update_client_presence', { presence: e }).then(
              () => {
                this.setState(
                  (function (e, t) {
                    var s;
                    return e
                      .setIn(['currentClient', 'presenceContent'], t)
                      .setIn(
                        [
                          'clients',
                          null === (s = e.currentClient) || void 0 === s ? void 0 : s.clientId,
                          'presenceContent'
                        ],
                        t
                      );
                  })(this.state, e)
                ),
                  t(!0);
              },
              () => {
                s(new a.p2('Unable to update presence'));
              }
            );
          });
        }
        onClientUpdates(e) {
          if ('function' != typeof e) throw new TypeError('callback must be a function');
          this.clientUpdatesCallback = e;
        }
      }
      var I = s(74496);
      class R extends o.WV({
        content: null,
        attachments: null,
        id: null,
        type: null,
        isAnonymous: void 0,
        group: void 0,
        resolve: () => {},
        reject: () => {}
      }) {}
      var x = s(32249);
      class S extends o.WV({
        requestInfo: null,
        status: 'offline',
        currentClient: null,
        localRecordsContents: (0, o.zN)(),
        localRecordsChanges: (0, o.aV)(),
        stagedRecordsChanges: (0, o.aV)(),
        localRecordsRev: 0,
        requiredAttachmentIds: (0, o.l4)(),
        clients: (0, o.D5)()
      }) {}
      var V = s(5619);
      class P {
        getRecords() {
          return (
            (this._shouldFireRecordsUpdateCallback = !0),
            this._state.localRecordsContents
              .map((e, t) => {
                const { content: s, permissions: i, group: n, isAnonymous: o } = e;
                return { content: s, permissions: i, group: n, id: t, isAnonymous: o };
              })
              .toList()
          );
        }
        createRecord(e, t, s, i, n) {
          return new Promise((o, a) => {
            const r = new R({
              id: e,
              content: t,
              attachments: s,
              group: i,
              type: 'created',
              isAnonymous: n,
              resolve: o,
              reject: a
            });
            this.enqueueChangeRequest(r);
          });
        }
        updateRecord(e, t, s, i) {
          return new Promise((n, o) => {
            if (!this.isKnownRecordId(e)) return o(new a.p2(`Record with ID: ${e} not found.`));
            const r = new R({
              id: e,
              content: t,
              group: s,
              type: 'updated',
              isAnonymous: i,
              resolve: n,
              reject: o
            });
            this.enqueueChangeRequest(r);
          });
        }
        deleteRecord(e) {
          return new Promise((t, s) => {
            if (!this.isKnownRecordId(e)) return s(new a.p2(`Record with ID: ${e} not found.`));
            const i = new R({ id: e, type: 'deleted', resolve: t, reject: s });
            this.enqueueChangeRequest(i);
          });
        }
        onRecordsUpdates(e, t) {
          if ('function' != typeof e)
            throw new TypeError('recordsUpdateCallback must be a function');
          if ('function' != typeof t)
            throw new TypeError('acceptedRecordsCallback must be a function');
          (this._recordsUpdatesCallback = e), (this._acceptedRecordsResponseCallback = t);
        }
        destroy() {
          this._cycle && this._cycle.destroy();
        }
        constructor() {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new S(),
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : x.ZP;
          (0, n.Z)(this, '_recordsUpdatesCallback', () => {}),
            (0, n.Z)(this, '_acceptedRecordsResponseCallback', () => {}),
            (0, n.Z)(this, '_shouldFireRecordsUpdateCallback', !1),
            (0, n.Z)(this, 'onChanges', (e) => {
              if (this._shouldFireRecordsUpdateCallback) {
                const { created: t, updated: s, deleted: i } = e;
                this._recordsUpdatesCallback((0, o.aV)(t), (0, o.aV)(s), (0, o.aV)(i));
              }
            }),
            (0, n.Z)(this, 'onAcceptedRecords', (e) => {
              if (this._shouldFireRecordsUpdateCallback) {
                const { created: t, updated: s, deleted: i } = e;
                this._acceptedRecordsResponseCallback((0, o.aV)(t), (0, o.aV)(s), (0, o.aV)(i));
              }
            }),
            (0, n.Z)(this, 'setOnDocumentHandleConflictCallback', (e) => {
              if ('function' != typeof e) throw new TypeError('callback must be a function');
              this._cycle.setOnDocumentHandleConflictCallback(e);
            }),
            (0, n.Z)(
              this,
              'syncChanges',
              (0, V.k)(() => this._cycle.nextCycle())
            ),
            (this._state = e),
            (this._CycleClass = t);
        }
        load(e, t) {
          let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
          return new Promise((i, n) => {
            const o = this.setState.bind(this);
            this.setState(this._state.set('requestInfo', { serverURL: e, authPayload: t })),
              (this._cycle = new this._CycleClass({
                getState: () => this._state,
                setState: o,
                onChanges: this.onChanges,
                onAcceptedRecords: this.onAcceptedRecords,
                longPollingTimeout: s ? x.mH : 0
              })),
              this._cycle
                .nextCycle(0)
                .then(() => {
                  i(this);
                })
                .catch(n);
          });
        }
        setState(e) {
          this._state = e;
        }
        enqueueChangeRequest(e) {
          const t = (0, I.n)({
            oldChanges: this._state.localRecordsChanges,
            newChanges: (0, o.aV)([e])
          });
          this.setState(this._state.set('localRecordsChanges', t));
        }
        isKnownRecordId(e) {
          function t(t) {
            return 'created' === t.type && t.id === e;
          }
          const s = this._state.localRecordsContents.has(e),
            i = !!this._state.localRecordsChanges.find(t),
            n = !!this._state.stagedRecordsChanges.find(t);
          return s || i || n;
        }
      }
      var A = s(91038),
        O = s(48169);
      function T(e, t) {
        const s = e.get('annotations'),
          i = e.get('formFields'),
          n = e.get('comments'),
          o = e.get('formattedFormFieldValues');
        let a;
        return (
          t.id.startsWith('form-field-value/') && (a = t.id.split('/')[1]),
          s.get(t.id) || i.find((e) => e.id === t.id) || n.get(t.id) || (a ? o.get(a) : void 0)
        );
      }
      function q(e, t) {
        return Boolean(T(e, t));
      }
      var E = s(23951),
        U = s(56207),
        D = s(7654),
        Z = s(84610),
        G = s(12705),
        z = s(1858),
        j = s(45249),
        B = s(92310);
      const H = ['id'],
        $ = ['group', 'permissions'],
        W = ['id'],
        L = ['group', 'permissions', 'isAnonymous'],
        N = ['id', 'permissions', 'isAnonymous', 'group'],
        K = ['id'],
        M = ['id'],
        J = ['group', 'permissions', 'id'];
      function Q(e, t) {
        var s = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          t &&
            (i = i.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            s.push.apply(s, i);
        }
        return s;
      }
      function Y(e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(s), !0).forEach(function (t) {
                (0, n.Z)(e, t, s[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s))
              : Q(Object(s)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t));
                });
        }
        return e;
      }
      class X {
        constructor(e, t, s) {
          let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : A.q;
          (0, n.Z)(this, '_existingBookmarksIds', (0, o.l4)()),
            (0, n.Z)(this, '_existingFormFieldsIds', (0, o.l4)()),
            (0, n.Z)(this, '_existingFormFieldValuesIds', (0, o.l4)()),
            (0, n.Z)(this, '_existingCommentIds', (0, o.l4)()),
            (0, n.Z)(this, '_documentHandleConflictCallback', () => {}),
            (0, n.Z)(this, 'canCreateBackendOrphanWidgets', !0),
            (0, n.Z)(this, 'setDocumentHandleConflictCallback', (e) => {
              this._documentHandleConflictCallback = e;
            }),
            (0, n.Z)(this, 'setDocumentHandleOutdated', (e) => {
              this._setDocumentHandleOutdatedCallback = e;
            }),
            (0, n.Z)(this, 'onDocumentHandleConflict', () => {
              this._documentHandleConflictCallback && this._documentHandleConflictCallback(),
                this._setDocumentHandleOutdatedCallback &&
                  this._setDocumentHandleOutdatedCallback(!0);
            }),
            (this._serverURL = e),
            (this._documentURL = t),
            (this._authPayload = s),
            (this._settings = i),
            (this._hasLoadedInitialRecords = !1),
            (this._setReadStateCallbacksPromise = new Promise((e) => {
              this._setReadStateCallbacksPromiseResolve = e;
            }));
        }
        load() {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : w;
          const s = [];
          return (
            (this._sync = new e()),
            s.push(
              this._sync
                .load(
                  `${this._documentURL}/sync`,
                  this._authPayload,
                  this._settings.listenToServerChangesEnabled
                )
                .catch(a.vU)
            ),
            this._sync.setOnDocumentHandleConflictCallback(this.onDocumentHandleConflict),
            this._settings.clientsPresenceEnabled &&
              ((this._clients = new t()),
              s.push(
                this._clients
                  .load(
                    `${this._serverURL.replace(/^http/i, 'ws')}/websocket`,
                    this._authPayload,
                    {}
                  )
                  .then(() => {
                    const e = this._clients;
                    null != e &&
                      (e.onClientUpdates(() => this._onClientsChange(e.getClients())),
                      this._onClientsChange(e.getClients()));
                  })
                  .catch((e) => {
                    (0, a.ZK)(
                      'PSPDFKit: An error occurred while initializing the connected clients module. This might be due to a lack of support for WebSockets or a related failure.\n\nFailure details:\n\n' +
                        e.message
                    );
                  })
              )),
            Promise.all(s)
              .then(() => this)
              .catch((e) => {
                throw new a.p2(`Initialization of PSPDFKit Instant failed:\n${e.message}`);
              })
          );
        }
        destroy() {
          this._sync && this._sync.destroy();
        }
        setFormsEnabledInConfig(e) {
          this._formsEnabledInConfig = e;
        }
        setReadStateCallbacks(e) {
          var t;
          (this._readStateCallbacks = e),
            null === (t = this._setReadStateCallbacksPromiseResolve) ||
              void 0 === t ||
              t.call(this);
        }
        setAnnotationCallbacks(e) {
          this._annotationCallbacks = e;
        }
        setBookmarkCallbacks(e) {
          this._bookmarkCallbacks = e;
        }
        setFormFieldCallbacks(e) {
          this._formFieldCallbacks = e;
        }
        setFormFieldValueCallbacks(e) {
          this._formFieldValueCallbacks = e;
        }
        setCommentCallbacks(e) {
          this._commentCallbacks = e;
        }
        createAnnotation(e, t) {
          const s = (0, r.Hs)(e),
            { id: n } = s,
            o = (0, i.Z)(s, H),
            { group: c, permissions: l } = o,
            d = (0, i.Z)(o, $);
          return (
            (0, a.kG)(n, 'Annotation id must be defined.'),
            this._sync.createRecord(n, d, (0, r.Lw)(t), c)
          );
        }
        createComment(e) {
          const t = (0, B.o)(e, e.rootId),
            { id: s } = t,
            n = (0, i.Z)(t, W),
            { group: o, permissions: r, isAnonymous: c } = n,
            l = (0, i.Z)(n, L);
          return (
            (0, a.kG)(s, 'Comment id must be defined.'),
            (this._existingCommentIds = this._existingCommentIds.add(s)),
            this._sync.createRecord(s, l, {}, o, !!c)
          );
        }
        async updateComment(e) {
          try {
            await this.updateRecord((0, B.o)(e, e.rootId));
          } catch (e) {
            if (!(e instanceof a.p2)) throw e;
          }
        }
        deleteComment(e) {
          return (
            (this._existingCommentIds = this._existingCommentIds.delete(e)),
            this._sync.deleteRecord(e).then(() => {})
          );
        }
        setStateGetter(e) {
          this._getState = e;
        }
        async updateRecord(e) {
          var t;
          const s =
              'pspdfkit/comment' === e.type || 'pspdfkit/comment-marker' === e.type
                ? e
                : Y(Y({}, e), {}, { isAnonymous: void 0 }),
            { id: n, permissions: o, isAnonymous: r, group: c } = s,
            l = (0, i.Z)(s, N);
          return (
            (0, a.kG)(n, 'Record id must be defined.'),
            null !== (t = this._getState) &&
            void 0 !== t &&
            null !== (t = t.call(this)) &&
            void 0 !== t &&
            null !== (t = t.backend) &&
            void 0 !== t &&
            t.isCollaborationPermissionsEnabled()
              ? ((0, a.kG)(o, 'Permissions must be defined.'),
                this._sync.updateRecord(
                  n,
                  o.edit ? l : void 0,
                  o.setGroup && null != c ? c : void 0,
                  null != r ? r : void 0
                ))
              : this._sync.updateRecord(n, l, null != c ? c : void 0, null != r ? r : void 0)
          );
        }
        async updateAnnotation(e) {
          try {
            await this.updateRecord((0, r.Hs)(e));
          } catch (e) {
            if (!(e instanceof a.p2)) throw e;
          }
        }
        deleteAnnotation(e) {
          return this._sync.deleteRecord(e.id).then(() => {});
        }
        createBookmark(e) {
          const t = (0, c.a)(e),
            { id: s } = t,
            n = (0, i.Z)(t, K);
          return (
            (this._existingBookmarksIds = this._existingBookmarksIds.add(s)),
            this._sync.createRecord(s, n, {})
          );
        }
        async updateBookmark(e) {
          const t = (0, c.a)(e),
            { id: s } = t,
            n = (0, i.Z)(t, M);
          try {
            await this._sync.updateRecord(s, n);
          } catch (e) {
            if (!(e instanceof a.p2)) throw e;
          }
        }
        deleteBookmark(e) {
          return this._sync.deleteRecord(e).then(() => {
            this._existingBookmarksIds = this._existingBookmarksIds.delete(e);
          });
        }
        createFormField(e) {
          const t = (0, r.vD)(e),
            { group: s, permissions: n, id: o } = t,
            a = (0, i.Z)(t, J);
          return (
            (this._existingFormFieldsIds = this._existingFormFieldsIds.add(o)),
            this._sync.createRecord(o, a, {}, s)
          );
        }
        async updateFormField(e) {
          try {
            await this.updateRecord((0, r.vD)(e));
          } catch (e) {
            if (!(e instanceof a.p2)) throw e;
          }
        }
        deleteFormField(e) {
          return this._sync.deleteRecord(e.id).then(() => {
            this._existingFormFieldsIds = this._existingFormFieldsIds.delete(e.id);
          });
        }
        loadFormFields() {
          return this.loadAnnotationsForPageIndex();
        }
        createFormFieldValue(e) {
          const t = (0, r.kr)(e),
            s = (0, O.X)(e);
          return (
            (this._existingFormFieldValuesIds = this._existingFormFieldValuesIds.add(s)),
            this._sync.createRecord(s, t, {})
          );
        }
        async setFormFieldValue(e) {
          const t = (0, r.kr)(e);
          try {
            await this._sync.updateRecord((0, O.X)(e), t);
          } catch (e) {
            if (!(e instanceof a.p2)) throw e;
          }
        }
        deleteFormFieldValue(e) {
          return this._sync.deleteRecord(e).then(() => {
            this._existingFormFieldValuesIds = this._existingFormFieldValuesIds.delete(e);
          });
        }
        loadAnnotationsForPageIndex() {
          return (
            this._loadPromise ||
              (this._loadPromise = new Promise((e) => setTimeout(e, 0)).then(() => {
                this._hasLoadedInitialRecords ||
                  (this._sync.onRecordsUpdates(
                    (e, t, s) => this._onRecordsUpdates(e, t, s, l.z),
                    (e, t, s) => this._onAcceptedRecords(e, t, s)
                  ),
                  this._onRecordsUpdates(this._sync.getRecords(), (0, o.aV)(), (0, o.aV)(), l.y),
                  (this._hasLoadedInitialRecords = !0));
              })),
            this._loadPromise
          );
        }
        async loadBookmarks() {}
        syncChanges() {
          return this._sync.syncChanges();
        }
        _filterRecords(e) {
          return e.filter((e) => {
            let { content: t } = e;
            return this._formsEnabledInConfig || !(0, r._Q)(t);
          });
        }
        _onRecordsUpdates(e, t, s, i) {
          let n = (0, o.aV)();
          const l = [];
          let d = (0, o.aV)(),
            h = (0, o.aV)(),
            u = (0, o.l4)(),
            m = (0, o.l4)(),
            p = (0, o.l4)(),
            k = (0, o.l4)(),
            f = (0, o.l4)();
          const _ = this._getState ? this._getState() : void 0;
          let g = e,
            C = t,
            b = s;
          if (_ && _.backend && _.backend.isCollaborationPermissionsEnabled()) {
            g = g.filter((e) => {
              let { content: t } = e;
              return !!t;
            });
            const e = [];
            t.forEach((t, s) => {
              t.content
                ? q(_, t) || ((g = g.push(t)), e.push(s))
                : q(_, t)
                  ? ((b = b.push(t.id)), e.push(s))
                  : e.push(s);
            }),
              (C = C.filter((t, s) => !e.includes(s))),
              (b = b.filter(
                (e) =>
                  _.annotations.has(e) ||
                  this._existingFormFieldValuesIds.has(e) ||
                  this._existingFormFieldsIds.has(e) ||
                  this._existingCommentIds.has(e) ||
                  this._existingBookmarksIds.has(e)
              ));
          }
          let y = (0, o.aV)().withMutations((e) => {
            this._filterRecords(g).forEach((t) => {
              let { id: s, content: i, permissions: o, group: u, isAnonymous: m } = t;
              const p = { permissions: o, group: u, isAnonymous: m };
              try {
                (0, r._Q)(i)
                  ? (l.push((0, r.IN)(s, i, p)),
                    (this._existingFormFieldsIds = this._existingFormFieldsIds.add(s)))
                  : (0, r.Qp)(i)
                    ? ((d = d.push((0, r.u9)(i))),
                      (this._existingFormFieldValuesIds = this._existingFormFieldValuesIds.add(s)))
                    : (0, r.l9)(i)
                      ? ((n = n.push((0, c.i)(s, i))),
                        (this._existingBookmarksIds = this._existingBookmarksIds.add(s)))
                      : (0, r.Fd)(i)
                        ? ((this._existingCommentIds = this._existingCommentIds.add(s)),
                          (h = h.push((0, B.z)(s, i, p))))
                        : (0, r.$T)(i) || (0, r._o)(i) || e.push((0, r.vH)(s, i, p));
              } catch (e) {
                (0, a.um)(
                  `Skipped creating record #${s} from payload because an error occurred while deserializing.`,
                  i
                ),
                  (0, a.um)(e);
              }
            });
          });
          const F = !_ || (0, G.xW)(_.features, _.signatureFeatureAvailability);
          l.length > 0 &&
            ((0, a.kG)(this._formFieldCallbacks),
            _ && !F
              ? this._formFieldCallbacks.createFormFields(
                  (0, o.aV)(l.filter((e) => !(e instanceof z.Yo))),
                  i
                )
              : this._formFieldCallbacks.createFormFields((0, o.aV)(l), i)),
            y.size > 0 &&
              ((0, a.kG)(this._annotationCallbacks),
              _ &&
                !F &&
                (y = y.filter((e) => {
                  if (!(e instanceof j.x_)) return e;
                  const t =
                    l.find((t) => t.name === e.formFieldName) || _.formFields.get(e.formFieldName);
                  return !(t && t instanceof z.Yo);
                })),
              this._annotationCallbacks.createAnnotations(y, (0, o.D5)(), i)),
            d.size > 0 &&
              ((0, a.kG)(this._formFieldValueCallbacks),
              _ &&
                !F &&
                (d = d.filter((e) => {
                  const t = l.find((t) => t.name === e.name) || _.formFields.get(e.formFieldName);
                  return !(t && t instanceof z.Yo);
                })),
              this._formFieldValueCallbacks.createFormFieldValues((0, o.aV)(d), i)),
            h.size > 0 &&
              ((0, a.kG)(this._commentCallbacks), this._commentCallbacks.createComments(h, i)),
            n.size > 0 &&
              ((0, a.kG)(this._bookmarkCallbacks), this._bookmarkCallbacks.createBookmarks(n, i));
          const v = (0, o.aV)().asMutable(),
            w = [],
            I = [],
            R = [],
            x = (0, o.aV)().withMutations((e) => {
              this._filterRecords(C).forEach((t) => {
                let { id: s, content: i, group: n, permissions: o, isAnonymous: l } = t;
                const d = { permissions: o, group: n, isAnonymous: l };
                try {
                  if ((0, r._Q)(i))
                    try {
                      w.push((0, r.IN)(s, i, d));
                    } catch (e) {
                      (p = p.add(s)),
                        (0, a.um)(
                          `Skipped updating form field #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,
                          i
                        ),
                        (0, a.um)(e);
                    }
                  else if ((0, r.Qp)(i))
                    try {
                      I.push((0, r.u9)(i));
                    } catch (e) {
                      (k = k.add(s)),
                        (0, a.um)(
                          `Skipped updating form field value #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,
                          i
                        ),
                        (0, a.um)(e);
                    }
                  else if ((0, r.l9)(i))
                    try {
                      v.push((0, c.i)(s, i));
                    } catch (e) {
                      (m = m.add(s)),
                        (0, a.um)(
                          `Skipped updating bookmark #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,
                          i
                        ),
                        (0, a.um)(e);
                    }
                  else if ((0, r.Fd)(i))
                    try {
                      R.push((0, B.z)(s, i, d));
                    } catch (e) {
                      (f = f.add(s)),
                        (0, a.um)(
                          `Skipped updating comment #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,
                          i,
                          e
                        );
                    }
                  else e.push((0, r.vH)(s, i, d));
                } catch (e) {
                  (u = u.add(s)),
                    (0, a.um)(
                      `Skipped updating annotation #${s} from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state.`,
                      i
                    ),
                    (0, a.um)(e);
                }
              });
            });
          x.size > 0 &&
            ((0, a.kG)(this._annotationCallbacks), this._annotationCallbacks.updateAnnotations(x)),
            v.size > 0 &&
              ((0, a.kG)(this._bookmarkCallbacks), this._bookmarkCallbacks.updateBookmarks(v)),
            w.length > 0 &&
              ((0, a.kG)(this._formFieldCallbacks),
              this._formFieldCallbacks.updateFormFields((0, o.aV)(w))),
            I.length > 0 &&
              ((0, a.kG)(this._formFieldValueCallbacks),
              this._formFieldValueCallbacks.setFormFieldValues((0, o.aV)(I))),
            R.length > 0 &&
              ((0, a.kG)(this._commentCallbacks),
              this._commentCallbacks.updateComments((0, o.aV)(R))),
            (u = u.concat(
              b
                .filter(
                  (e) =>
                    !(
                      this._existingBookmarksIds.has(e) ||
                      this._existingFormFieldsIds.has(e) ||
                      this._existingFormFieldValuesIds.has(e) ||
                      this._existingCommentIds.has(e)
                    )
                )
                .toSet()
            )),
            u.size > 0 &&
              ((0, a.kG)(this._annotationCallbacks),
              this._annotationCallbacks.deleteAnnotations(u)),
            (m = m.concat(
              b
                .filter((e) => {
                  const t = this._existingBookmarksIds.has(e);
                  return (
                    t && (this._existingBookmarksIds = this._existingBookmarksIds.delete(e)), t
                  );
                })
                .toSet()
            )),
            m.size > 0 &&
              ((0, a.kG)(this._bookmarkCallbacks), this._bookmarkCallbacks.deleteBookmarks(m)),
            (p = p.concat(
              b
                .filter((e) => {
                  const t = this._existingFormFieldsIds.has(e);
                  return (
                    t && (this._existingFormFieldsIds = this._existingFormFieldsIds.delete(e)), t
                  );
                })
                .toSet()
            )),
            p.size > 0 &&
              ((0, a.kG)(this._formFieldCallbacks), this._formFieldCallbacks.deleteFormFields(p)),
            (k = k.concat(
              b
                .filter((e) => {
                  const t = this._existingFormFieldValuesIds.has(e);
                  return (
                    t &&
                      (this._existingFormFieldValuesIds =
                        this._existingFormFieldValuesIds.delete(e)),
                    t
                  );
                })
                .toSet()
            )),
            k.size > 0 &&
              ((0, a.kG)(this._formFieldValueCallbacks),
              this._formFieldValueCallbacks.deleteFormFieldValues(k)),
            (f = f.concat(
              b
                .filter((e) => {
                  const t = this._existingCommentIds.has(e);
                  return t && (this._existingCommentIds = this._existingCommentIds.delete(e)), t;
                })
                .toSet()
            )),
            f.size > 0 &&
              ((0, a.kG)(this._commentCallbacks), this._commentCallbacks.deleteComments(f));
        }
        _onAcceptedRecords(e, t) {
          const s = this._getState ? this._getState() : void 0;
          if (!s || !s.backend || !s.backend.isCollaborationPermissionsEnabled()) return;
          const i = [],
            n = [],
            r = [],
            c = [],
            l = [],
            d = [];
          function h(e) {
            const t = { permissions: e.permissions, group: e.group };
            let o = T(s, e);
            if (o && 'string' != typeof o) {
              (0, Z.G)(t);
              const e = (0, Z.a5)(t);
              (o = o.merge(e)),
                o instanceof E.Z
                  ? t.permissions && t.permissions.view
                    ? i.push(o)
                    : c.push(o.id)
                  : o instanceof U.ZP
                    ? t.permissions && t.permissions.view
                      ? n.push(o)
                      : ((0, a.kG)(o.id), l.push(o.id))
                    : o instanceof D.ZP &&
                      (t.permissions && t.permissions.view ? r.push(o) : d.push(o.id));
            }
          }
          e.isEmpty() || e.forEach(h),
            t.isEmpty() || t.forEach(h),
            i.length > 0 &&
              ((0, a.kG)(this._annotationCallbacks),
              this._annotationCallbacks.updateAnnotations((0, o.aV)(i), !0)),
            n.length > 0 &&
              ((0, a.kG)(this._commentCallbacks),
              this._commentCallbacks.updateComments((0, o.aV)(n))),
            r.length > 0 &&
              ((0, a.kG)(this._formFieldCallbacks),
              this._formFieldCallbacks.updateFormFields((0, o.aV)(r))),
            c.length > 0 &&
              ((0, a.kG)(this._annotationCallbacks),
              this._annotationCallbacks.deleteAnnotations((0, o.l4)(c), !0)),
            l.length > 0 &&
              ((0, a.kG)(this._commentCallbacks),
              this._commentCallbacks.deleteComments((0, o.l4)(l))),
            d.length > 0 &&
              ((0, a.kG)(this._formFieldCallbacks),
              this._formFieldCallbacks.deleteFormFields((0, o.l4)(d)));
        }
        onClientsChange(e) {
          if ('function' != typeof e) throw new TypeError('Callback must be a function');
          this.onClientsChangeCallback = e;
        }
        _onClientsChange(e) {
          this.onClientsChangeCallback.call(null, e);
        }
        async updateTabOrder() {
          throw new a.p2('setTabOrder is not supported on this backend.');
        }
        async setTabOrder() {
          throw new a.p2('setTabOrder is not supported on this backend.');
        }
      }
    }
  }
]);
