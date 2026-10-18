var i = Object.defineProperty, o = (e, r) => () => (r || (e((r = { exports: {} }).exports, r), e = null), r.exports), u = (e, r) => {
	let t = {};
	for (var n in e) i(t, n, {
		get: e[n],
		enumerable: !0
	});
	return r || i(t, Symbol.toStringTag, { value: "Module" }), t;
}, a = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
export { u as n, a as r, o as t };
