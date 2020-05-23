"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n
}
: function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
}
;
!function() {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).jDiwork = function() {
        var f = {}
          , i = {}
          , n = {}
          , t = false
          , e = 0
          , o = "JDIWORK"
          , a = ["http://workbench.yyuap.com", "https://www.diwork.com", "https://workbench-daily.yyuap.com", "http://u8c-test.yyuap.com", "https://u8c-daily.yyuap.com"]
          , c = window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
        a.push(c);
        var l = function n() {
            return ++e
        }
          , d = function n(e) {
            try {
                var o = e.type.split(":");
                var t = o[0];
                var a = o[1];
                var c = typeof e.data === "undefined" ? false : e.data;
                var i = f[t];
                var l = typeof e.destroy === "undefined" ? true : e.destroy
            } catch (n) {
                console.log(n);
                return
            }
            if (i && i[a]) {
                clearTimeout(i[a].timer);
                var d = i[a].callback(c);
                if (l) {
                    delete i[a]
                }
                return d
            }
        }
          , u = function n(e, o, t) {
            t = typeof t === "undefined" ? true : t;
            var a = f[e];
            var c = l();
            var i = {
                callback: o,
                timer: t ? setTimeout(function() {
                    o && o(false);
                    delete a[c]
                }, 500) : 0
            };
            if (a) {
                a[c] = i
            } else {
                a = {};
                a[c] = i;
                f[e] = a
            }
            return e + ":" + c
        }
          , r = function n(e) {
            try {
                e = event.type.split(":");
                var o = e[0];
                var t = e[1];
                var a = f[o]
            } catch (n) {
                console.log(n);
                return
            }
            if (a && t && a[t]) {
                if (a[t].timer) {
                    clearTimeout(a[t].timer)
                }
                delete a[t]
            } else if (a && !t) {
                for (var c in a) {
                    if (a[c].timer) {
                        clearTimeout(a[t].timer)
                    }
                    delete a[c]
                }
            }
        }
          , s = function(n) {
            try {
                var e = n.type;
                var o = n.data;
                var t = i[e]
            } catch (n) {
                console.log(n);
                return
            }
            if (t && t.length) {
                for (var a = 0, c = t.length; a < c; a++) {
                    t[a](o)
                }
            }
        }
          , p = function n(e, o) {
            var t = i[e];
            if (t) {
                t.push(o)
            } else {
                i[e] = [o]
            }
        }
          , b = function n(e, o) {
            var t = i[e];
            if (t) {
                if (o) {
                    var a = t.indexOf(o);
                    if (a !== -1) {
                        t.splice(a, 1)
                    }
                } else {
                    delete i[e]
                }
            }
        }
          , k = function n(e) {
            e.messType = o;
            window.top.postMessage(JSON.stringify(e), "*")
        }
          , g = function n(e) {
            var o = {
                type: u("ready", e)
            };
            if (t) {
                d(o)
            } else {
                setTimeout(function() {
                    d(o)
                }, 0)
            }
        }
          , v = function n(e, o, t, a) {
            k({
                detail: {
                    serviceCode: e,
                    data: o,
                    type: t
                },
                callbackId: u("openService", a || function() {}
                )
            })
        }
          , I = function n(e, o) {
            k({
                detail: e,
                callbackId: u("reOpenService", o || function() {}
                )
            })
        }
          , y = function n(e, o, t) {
            k({
                detail: {
                    serviceCode: e,
                    data: o
                },
                callbackId: u("recordLog", t || function() {}
                )
            })
        }
          , h = function n(e, o, t) {
            k({
                detail: {
                    serviceCode: e,
                    data: o
                },
                callbackId: u("updateService", t || function() {}
                )
            })
        }
          , m = function n(e, o) {
            k({
                detail: {
                    serviceCode: e
                },
                callbackId: u("checkServiceOpen", o)
            })
        }
          , w = function n(e, o, t) {
            k({
                detail: {
                    serviceCode: e,
                    data: o
                },
                callbackId: u("postDataToService", t)
            })
        }
          , C = function n(e) {
            k({
                callbackId: u("getContext", e, false)
            })
        }
          , S = function n(e) {
            p("data", e)
        }
          , D = function n(e, o) {
            if (e.id || e.yht_id) {
                k({
                    detail: e,
                    callbackId: u("switchChatTo", o || function() {}
                    )
                })
            } else {
                console.log("function switchChatTo need id or yht_id")
            }
        }
          , O = function n(e) {
            k({
                callbackId: u("onGroupUpdated", e, false)
            })
        }
          , P = function n(e) {
            k({
                callbackId: u("getImGroupData", e || function() {}
                )
            })
        }
          , T = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openNotifyCenter", o || function() {}
                )
            })
        }
          , x = function n(e) {
            k({
                callbackId: u("onUnReadedNumChanged", e, false)
            })
        }
          , B = function n(e) {
            k({
                callbackId: u("refreshUserInfo", e || function() {}
                )
            })
        }
          , N = function n(e, o) {
            k({
                detail: e,
                callbackId: u("showDialog", o || function() {}
                )
            })
        }
          , F = function n(e, o) {
            k({
                detail: e,
                callbackId: u("closeDialogNew", o || function() {}
                )
            })
        }
          , G = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openWin", o || function() {}
                )
            })
        }
          , U = function n(e) {
            k({
                callbackId: u("closeWin", e || function() {}
                )
            })
        }
          , L = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openFrame", o || function() {}
                )
            })
        }
          , W = function n(e) {
            k({
                callbackId: u("closeFrame", e || function() {}
                )
            })
        }
          , H = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openServicePublish", o || function() {}
                )
            })
        }
          , _ = function n(e) {
            k({
                callbackId: u("closeServicePublish", e || function() {}
                )
            })
        }
          , E = function n(e) {
            k({
                callbackId: u("getPageParam", e, false)
            })
        }
          , M = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openHomePage", o || function() {}
                )
            })
        }
          , R = function n(e, o) {
            k({
                detail: e,
                callbackId: u("getData", o, false)
            })
        }
          , J = function n(e, o) {
            k({
                detail: e,
                callbackId: u("execScript", o || function() {}
                )
            })
        }
          , j = function n(e, o) {
            k({
                detail: e,
                callbackId: u("getHostForGlobal", o, false)
            })
        }
          , K = function n() {
            k({
                callbackId: "closeDialog"
            });
            r(this.onClose);
            if (this.btns) {
                this.btns.forEach(function(n) {
                    r(n.fun)
                })
            }
            r("openDialog")
        }
          , q = function n(t, e) {
            if (t.btns && t.btns.length) {
                t.btns = t.btns.map(function(n, e) {
                    if (n.fun) {
                        var o = n.fun;
                        n.fun = u("dialogBtnClick", function() {
                            o(K.bind(t))
                        }, false)
                    } else {
                        n.fun = u("dialogBtnClick", K.bind(t), false)
                    }
                    return n
                })
            }
            if (t.onClose) {
                var o = t.onClose;
                t.onClose = u("dialogOnClose", function() {
                    if (o()) {
                        K.call(t)
                    }
                }, false)
            } else {
                t.onClose = u("dialogOnClose", K.bind(t), false)
            }
            k({
                detail: {
                    options: t
                },
                callbackId: u("openDialog", e)
            })
        }
          , z = function n(e, o) {
            k({
                detail: {
                    name: e,
                    url: window.location.href
                },
                callbackId: u("addBrm", o)
            })
        }
          , A = function n(e, o) {
            k({
                detail: {
                    index: e,
                    url: window.location.href
                },
                callbackId: u("popBrm", o)
            })
        }
          , Q = function n(e) {
            k({
                callbackId: u("getBrm", e)
            })
        }
          , V = function n(e, o) {
            k({
                detail: e,
                callbackId: u("openMessage", o || function() {}
                )
            })
        };
        return window.addEventListener("DOMContentLoaded", function() {
            t = !0
        }, !1),
        window.addEventListener("message", function(n) {
            var e = n.data
              , o = n.origin || n.originalEvent.origin;
            if (!(a.indexOf(o) < 0 && o.indexOf("yyuap") < 0 && o.indexOf("diwork") < 0) && e) {
                try {
                    "string" == typeof e && (e = JSON.parse(e))
                } catch (n) {
                    return void console.log(n)
                }
                e && "object" === (void 0 === e ? "undefined" : _typeof(e)) && e.type && (e.type.indexOf(":") < 0 ? function(n) {
                    try {
                        var e = n.type;
                        var o = n.data;
                        var t = i[e]
                    } catch (n) {
                        console.log(n);
                        return
                    }
                    if (t && t.length) {
                        for (var a = 0, c = t.length; a < c; a++) {
                            t[a](o)
                        }
                    }
                }(e) : d(e))
            }
        }, !1),
        window.addEventListener("click", function() {
            k({
                callbackId: "rootClick"
            })
        }, !1),
        {
            ready: function n(e) {
                var o = {
                    type: u("ready", e)
                };
                if (t) {
                    d(o)
                } else {
                    setTimeout(function() {
                        d(o)
                    }, 0)
                }
            },
            openService: function n(e, o, t, a) {
                k({
                    detail: {
                        serviceCode: e,
                        data: o,
                        type: t
                    },
                    callbackId: u("openService", a || function() {}
                    )
                })
            },
            reOpenService: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("reOpenService", o || function() {}
                    )
                })
            },
            recordLog: function n(e, o, t) {
                k({
                    detail: {
                        serviceCode: e,
                        data: o
                    },
                    callbackId: u("recordLog", t || function() {}
                    )
                })
            },
            updateService: function n(e, o, t) {
                k({
                    detail: {
                        serviceCode: e,
                        data: o
                    },
                    callbackId: u("updateService", t || function() {}
                    )
                })
            },
            getContext: function n(e) {
                k({
                    callbackId: u("getContext", e, false)
                })
            },
            onData: function n(e) {
                p("data", e)
            },
            switchChatTo: function n(e, o) {
                if (e.id || e.yht_id) {
                    k({
                        detail: e,
                        callbackId: u("switchChatTo", o || function() {}
                        )
                    })
                } else {
                    console.log("function switchChatTo need id or yht_id")
                }
            },
            refreshUserInfo: function n(e) {
                k({
                    callbackId: u("refreshUserInfo", e || function() {}
                    )
                })
            },
            showDialog: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("showDialog", o || function() {}
                    )
                })
            },
            closeDialogNew: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("closeDialogNew", o || function() {}
                    )
                })
            },
            openWin: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openWin", o || function() {}
                    )
                })
            },
            closeWin: function n(e) {
                k({
                    callbackId: u("closeWin", e || function() {}
                    )
                })
            },
            getData: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("getData", o, false)
                })
            },
            openFrame: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openFrame", o || function() {}
                    )
                })
            },
            closeFrame: function n(e) {
                k({
                    callbackId: u("closeFrame", e || function() {}
                    )
                })
            },
            openServicePublish: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openServicePublish", o || function() {}
                    )
                })
            },
            closeServicePublish: function n(e) {
                k({
                    callbackId: u("closeServicePublish", e || function() {}
                    )
                })
            },
            getPageParam: function n(e) {
                k({
                    callbackId: u("getPageParam", e, false)
                })
            },
            openHomePage: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openHomePage", o || function() {}
                    )
                })
            },
            onGroupUpdated: function n(e) {
                k({
                    callbackId: u("onGroupUpdated", e, false)
                })
            },
            getImGroupData: function n(e) {
                k({
                    callbackId: u("getImGroupData", e || function() {}
                    )
                })
            },
            openNotifyCenter: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openNotifyCenter", o || function() {}
                    )
                })
            },
            onUnReadedNumChanged: function n(e) {
                k({
                    callbackId: u("onUnReadedNumChanged", e, false)
                })
            },
            checkServiceOpen: function n(e, o) {
                k({
                    detail: {
                        serviceCode: e
                    },
                    callbackId: u("checkServiceOpen", o)
                })
            },
            postDataToService: function n(e, o, t) {
                k({
                    detail: {
                        serviceCode: e,
                        data: o
                    },
                    callbackId: u("postDataToService", t)
                })
            },
            execScript: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("execScript", o || function() {}
                    )
                })
            },
            getHostForGlobal: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("getHostForGlobal", o, false)
                })
            },
            openDialog: function n(t, e) {
                if (t.btns && t.btns.length) {
                    t.btns = t.btns.map(function(n, e) {
                        if (n.fun) {
                            var o = n.fun;
                            n.fun = u("dialogBtnClick", function() {
                                o(K.bind(t))
                            }, false)
                        } else {
                            n.fun = u("dialogBtnClick", K.bind(t), false)
                        }
                        return n
                    })
                }
                if (t.onClose) {
                    var o = t.onClose;
                    t.onClose = u("dialogOnClose", function() {
                        if (o()) {
                            K.call(t)
                        }
                    }, false)
                } else {
                    t.onClose = u("dialogOnClose", K.bind(t), false)
                }
                k({
                    detail: {
                        options: t
                    },
                    callbackId: u("openDialog", e)
                })
            },
            addBrm: function n(e, o) {
                k({
                    detail: {
                        name: e,
                        url: window.location.href
                    },
                    callbackId: u("addBrm", o)
                })
            },
            popBrm: function n(e, o) {
                k({
                    detail: {
                        index: e,
                        url: window.location.href
                    },
                    callbackId: u("popBrm", o)
                })
            },
            getBrm: function n(e) {
                k({
                    callbackId: u("getBrm", e)
                })
            },
            openMessage: function n(e, o) {
                k({
                    detail: e,
                    callbackId: u("openMessage", o || function() {}
                    )
                })
            }
        }
    }()
}();
