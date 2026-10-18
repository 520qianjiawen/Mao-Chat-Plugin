import { n as E, r as m, t as p } from "./onnxruntime-web-B85o4HIl.js";
self.__ortPin = [
	E,
	m,
	p
];
function L(e, n) {
	const t = e.length;
	if (!(t <= 1)) {
		for (let o = 1, r = 0; o < t; o++) {
			let s = t >> 1;
			for (; r & s;) r ^= s, s >>= 1;
			r ^= s, o < r && ([e[o], e[r]] = [e[r], e[o]], [n[o], n[r]] = [n[r], n[o]]);
		}
		for (let o = 2; o <= t; o <<= 1) {
			const r = o >> 1, s = -2 * Math.PI / o, l = Math.cos(s), f = Math.sin(s);
			for (let a = 0; a < t; a += o) {
				let i = 1, u = 0;
				for (let c = 0; c < r; c++) {
					const d = e[a + c], g = n[a + c], A = e[a + c + r] * i - n[a + c + r] * u, w = e[a + c + r] * u + n[a + c + r] * i;
					e[a + c] = d + A, n[a + c] = g + w, e[a + c + r] = d - A, n[a + c + r] = g - w;
					const S = i * l - u * f;
					u = i * f + u * l, i = S;
				}
			}
		}
	}
}
function N(e, n) {
	const t = e.length;
	for (let o = 0; o < t; o++) n[o] = -n[o];
	L(e, n);
	for (let o = 0; o < t; o++) e[o] /= t, n[o] = -n[o] / t;
}
const P = 16e3;
function j(e) {
	const n = new Float32Array(e);
	for (let t = 0; t < e; t++) n[t] = Math.sqrt(.5 * (1 - Math.cos(2 * Math.PI * t / e)));
	return n;
}
function T(e, n) {
	for (let t = 0; t < e.length; t++) e[t] *= n[t];
}
function q(e) {
	const n = e.length, t = new Float32Array(n), o = new Float32Array(n);
	t.set(e), L(t, o);
	const r = n / 2 + 1;
	return [t.subarray(0, r), o.subarray(0, r)];
}
function z(e, n, t) {
	const o = new Float32Array(t), r = new Float32Array(t);
	o.set(e), r.set(n);
	for (let s = 1; s < t / 2; s++) o[t - s] = e[s], r[t - s] = -n[s];
	return N(o, r), o;
}
function B(e) {
	const n = new Float32Array(e.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t] / 32768;
	return n;
}
function D(e) {
	const n = new Int16Array(e.length);
	for (let t = 0; t < e.length; t++) {
		const o = Math.max(-1, Math.min(1, e[t]));
		n[t] = o < 0 ? o * 32768 : o * 32767;
	}
	return n;
}
function C(e, n, t) {
	if (n === t) return e;
	const o = n / t, r = Math.floor(e.length / o), s = new Float32Array(r);
	for (let l = 0; l < r; l++) {
		const f = l * o, a = Math.floor(f), i = f - a, u = e[a];
		s[l] = u + ((a + 1 < e.length ? e[a + 1] : u) - u) * i;
	}
	return s;
}
const x = 48e3;
let y = null, M, I, b, R, h = /* @__PURE__ */ new Float32Array(0), _ = /* @__PURE__ */ new Float32Array(512);
function k() {
	I = new m("float32", new Float32Array(512 * 33), [
		2,
		1,
		16,
		16,
		33
	]), b = new m("float32", /* @__PURE__ */ new Float32Array(96), [
		2,
		3,
		1,
		1,
		16
	]), R = new m("float32", /* @__PURE__ */ new Float32Array(1056), [
		2,
		1,
		33,
		16
	]), _ = /* @__PURE__ */ new Float32Array(512);
}
async function G(e, n) {
	try {
		p.wasm.wasmPaths = e, p.wasm.proxy = !1, p.wasm.numThreads = 1, y = await E.create(n, {
			executionProviders: ["wasm"],
			graphOptimizationLevel: "all"
		}), M = j(512), k(), self.postMessage({ type: "ready" });
	} catch (t) {
		self.postMessage({
			type: "error",
			message: `Failed to initialize GTCRN: ${t.message}`
		});
	}
}
async function U(e, n) {
	if (!y) throw new Error("Session not initialized");
	const t = new Float32Array(257 * 2);
	for (let a = 0; a < 257; a++) t[a * 2] = e[a], t[a * 2 + 1] = n[a];
	const o = {
		mix: new m("float32", t, [
			1,
			257,
			1,
			2
		]),
		conv_cache: I,
		tra_cache: b,
		inter_cache: R
	}, r = await y.run(o);
	I = r.conv_cache_out, b = r.tra_cache_out, R = r.inter_cache_out;
	const s = r.enh.data, l = /* @__PURE__ */ new Float32Array(257), f = /* @__PURE__ */ new Float32Array(257);
	for (let a = 0; a < 257; a++) l[a] = s[a * 2], f[a] = s[a * 2 + 1];
	return [l, f];
}
async function W(e) {
	if (!y) return;
	const n = C(B(e), x, P), t = new Float32Array(h.length + n.length);
	t.set(h), t.set(n, h.length), h = t;
	const o = [];
	for (; h.length >= 512;) {
		const a = /* @__PURE__ */ new Float32Array(512);
		a.set(h.subarray(0, 512)), h = h.subarray(256), T(a, M);
		const [i, u] = q(a), [c, d] = await U(i, u), g = z(c, d, 512);
		T(g, M);
		const A = /* @__PURE__ */ new Float32Array(256);
		for (let w = 0; w < 256; w++) A[w] = _[w + 256] + g[w];
		_.set(g), o.push(A);
	}
	if (o.length === 0) return;
	const r = o.reduce((a, i) => a + i.length, 0), s = new Float32Array(r);
	let l = 0;
	for (const a of o) s.set(a, l), l += a.length;
	const f = D(C(s, P, x));
	self.postMessage({
		type: "audio",
		audio: f
	}, { transfer: [f.buffer] });
}
let v = Promise.resolve();
function F(e) {
	v = v.then(() => e()).catch((n) => {
		const t = n instanceof Error ? n.message : String(n);
		self.postMessage({
			type: "error",
			message: `GTCRN worker error: ${t}`
		});
	});
}
self.onmessage = (e) => {
	const { type: n } = e.data;
	switch (n) {
		case "init":
			F(() => G(e.data.ortWasmBaseUrl, e.data.modelUrl));
			break;
		case "process":
			F(() => W(e.data.audio));
			break;
		case "reset":
			F(() => {
				k(), h = /* @__PURE__ */ new Float32Array(0), _ = /* @__PURE__ */ new Float32Array(512);
			});
			break;
		case "dispose":
			F(() => {
				y && (y.release(), y = null);
			});
			break;
	}
};
