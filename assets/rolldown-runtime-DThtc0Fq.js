var t = (e, r) => () => (r || (e((r = { exports: {} }).exports, r), e = null), r.exports), i = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (r, n) => (typeof require < "u" ? require : r)[n] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
export { i as n, t };
