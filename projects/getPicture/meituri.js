(function(r, l) {
    "function" == typeof define && define.amd ? define([], l) : "object" == typeof exports ? module.exports = l() : r.download = l()
})(this, function() {
    return function l(a, e, k) {
        function q(a) {
            var h = a.split(/[:;,]/);
            a = h[1];
            var h = ("base64" == h[2] ? atob : decodeURIComponent)(h.pop()),
                d = h.length,
                b = 0,
                c = new Uint8Array(d);
            for (b; b < d; ++b) c[b] = h.charCodeAt(b);
            return new f([c], {
                type: a
            })
        }

        function m(a, b) {
            if ("download" in d) return d.href = a, d.setAttribute("download", n), d.className = "download-js-link", d.innerHTML = "downloading...", d.style.display = "none", document.body.appendChild(d), setTimeout(function() {
                d.click(), document.body.removeChild(d), !0 === b && setTimeout(function() {
                    g.URL.revokeObjectURL(d.href)
                }, 250)
            }, 66), !0;
            if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) return /^data:/.test(a) && (a = "data:" + a.replace(/^data:([\w\/\-\+]+)/, "application/octet-stream")), !window.open(a) && confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = a), !0;
            var c = document.createElement("iframe");
            document.body.appendChild(c), !b && /^data:/.test(a) && (a = "data:" + a.replace(/^data:([\w\/\-\+]+)/, "application/octet-stream")), c.src = a, setTimeout(function() {
                document.body.removeChild(c)
            }, 333)
        }
        var g = window,
            b = k || "application/octet-stream",
            c = !e && !k && a,
            d = document.createElement("a");
        k = function(a) {
            return String(a)
        };
        var f = g.Blob || g.MozBlob || g.WebKitBlob || k,
            n = e || "download",
            f = f.call ? f.bind(g) : Blob;
        "true" === String(this) && (a = [a, b], b = a[0], a = a[1]);
        if (c && 2048 > c.length && (n = c.split("/").pop().split("?")[0], d.href = c, -1 !== d.href.indexOf(c))) {
            var p = new XMLHttpRequest;
            return p.open("GET", c, !0), p.responseType = "blob", p.onload = function(a) {
                l(a.target.response, n, "application/octet-stream")
            }, setTimeout(function() {
                p.send()
            }, 0), p
        }
        if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(a)) {
            if (!(2096103.424 < a.length && f !== k)) return navigator.msSaveBlob ? navigator.msSaveBlob(q(a), n) : m(a);
            a = q(a), b = a.type || "application/octet-stream"
        } else if (/([\x80-\xff])/.test(a)) {
            e = 0;
            var c = new Uint8Array(a.length),
                t = c.length;
            for (e; e < t; ++e) c[e] = a.charCodeAt(e);
            a = new f([c], {
                type: b
            })
        }
        a = a instanceof f ? a : new f([a], {
            type: b
        });
        if (navigator.msSaveBlob) return navigator.msSaveBlob(a, n);
        if (g.URL) m(g.URL.createObjectURL(a), !0);
        else {
            if ("string" == typeof a || a.constructor === k) try {
                return m("data:" + b + ";base64," + g.btoa(a))
            } catch (h) {
                return m("data:" + b + "," + encodeURIComponent(a))
            }
            b = new FileReader, b.onload = function(a) {
                m(this.result)
            }, b.readAsDataURL(a)
        }
        return !0
    }
});

$('#list .selected img').each((index, item) => {
  const src = item.src
	download(src)
})
