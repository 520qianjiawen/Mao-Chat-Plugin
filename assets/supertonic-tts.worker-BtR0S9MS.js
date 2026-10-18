import { n as G, r as F, t as O } from "./onnxruntime-web-B85o4HIl.js";
self.__ortPin = [
	G,
	F,
	O
];
let p = null, h = null, g = null, E = null, k = 44100, $ = 16, j = 7, b = "wasm";
const X = [
	{
		key: "dpOrt",
		file: "onnx/duration_predictor.onnx"
	},
	{
		key: "textEncOrt",
		file: "onnx/text_encoder.onnx"
	},
	{
		key: "vectorEstOrt",
		file: "onnx/vector_estimator.onnx"
	},
	{
		key: "vocoderOrt",
		file: "onnx/vocoder.onnx"
	}
], Z = /* @__PURE__ */ new Set([
	"en",
	"ko",
	"ja",
	"ar",
	"bg",
	"cs",
	"da",
	"de",
	"el",
	"es",
	"et",
	"fi",
	"fr",
	"hi",
	"hr",
	"hu",
	"id",
	"it",
	"lt",
	"lv",
	"nl",
	"pl",
	"pt",
	"ro",
	"ru",
	"sk",
	"sl",
	"sv",
	"tr",
	"uk",
	"vi"
]), S = self;
function m(t, e) {
	e && e.length > 0 ? S.postMessage(t, e) : S.postMessage(t);
}
S.onmessage = async (t) => {
	const e = t.data;
	try {
		switch (e.type) {
			case "init":
				await nt(e);
				break;
			case "generate":
				await lt(e);
				break;
			case "dispose":
				await ct();
				break;
		}
	} catch (n) {
		m({
			type: "error",
			error: n instanceof Error ? n.message : String(n)
		});
	}
};
async function x(t) {
	const e = await fetch(t);
	if (!e.ok) throw new Error(`Failed to fetch ${t}: ${e.status}`);
	return await e.json();
}
async function tt(t) {
	const e = await fetch(t);
	if (!e.ok) throw new Error(`Failed to fetch ${t}: ${e.status}`);
	return await e.arrayBuffer();
}
function N(t) {
	if (!Array.isArray(t.dims)) throw new Error("voice JSON missing dims array");
	if (!Array.isArray(t.data)) throw new Error("voice JSON data must be a (nested) array");
	const e = t.data.flat(Infinity);
	return new F("float32", Float32Array.from(e), t.dims);
}
async function et(t) {
	const e = /* @__PURE__ */ new Map();
	for (const n of t) try {
		const a = await x(n.blobUrl);
		if (!a.style_ttl || !a.style_dp) {
			m({
				type: "status",
				message: `Skipping voice ${n.name} (sid ${n.sid}): missing style_ttl/style_dp`
			});
			continue;
		}
		e.set(n.sid, {
			styleTtl: N(a.style_ttl),
			styleDp: N(a.style_dp),
			name: n.name,
			source: n.source,
			gender: n.gender
		});
	} catch (a) {
		const s = a instanceof Error ? a.message : String(a);
		m({
			type: "status",
			message: `Skipping voice ${n.name} (sid ${n.sid}): ${s}`
		});
	}
	return e;
}
async function V(t, e) {
	const n = {
		executionProviders: [e],
		graphOptimizationLevel: "all",
		logSeverityLevel: 3
	}, a = {};
	try {
		for (const { key: s, file: i } of X) {
			const r = t[i];
			if (!r) throw new Error(`Missing model file: ${i}`);
			const l = await tt(r);
			a[s] = await G.create(l, n), m({
				type: "status",
				message: `Loaded ${i} (${e})`
			});
		}
		return a;
	} catch (s) {
		throw await I(a), s;
	}
}
async function I(t) {
	if (t) for (const e of Object.keys(t)) {
		const n = t[e];
		if (n) try {
			await n.release();
		} catch (a) {
			console.warn(`Supertonic worker: failed to release ${e}:`, a);
		}
	}
}
async function nt(t) {
	const e = performance.now(), { fileUrls: n, voiceList: a, ortWasmBaseUrl: s, ttsConfig: i } = t;
	typeof i?.totalStep == "number" && ($ = i.totalStep), typeof i?.defaultSid == "number" && (j = i.defaultSid), O.wasm.wasmPaths = s, O.wasm.numThreads = 1, b = typeof S.navigator < "u" && typeof S.navigator.gpu < "u" ? "webgpu" : "wasm", m({
		type: "status",
		message: `Initializing Supertonic 3 (backend: ${b})`
	});
	let r = b;
	try {
		p = await V(n, r);
	} catch (o) {
		if (r === "webgpu") m({
			type: "status",
			message: `WebGPU init failed (${o instanceof Error ? o.message : String(o)}), falling back to WASM`
		}), await I(p), p = null, r = "wasm", b = "wasm", p = await V(n, r);
		else throw o;
	}
	g = await x(n["onnx/tts.json"]), E = await x(n["onnx/unicode_indexer.json"]), k = g.ae.sample_rate, h = await et(a);
	const l = a.filter((o) => h.has(o.sid)).map((o) => ({
		sid: o.sid,
		name: o.name,
		source: o.source,
		gender: o.gender
	}));
	m({
		type: "ready",
		loadTimeMs: Math.round(performance.now() - e),
		numSpeakers: l.length,
		sampleRate: k,
		voices: l,
		backend: b
	});
}
function P(t, e) {
	const n = t.flat(Infinity).map((a) => BigInt(a));
	return new F("int64", BigInt64Array.from(n), e);
}
function v(t, e) {
	const n = t.flat(Infinity);
	return new F("float32", Float32Array.from(n), e);
}
function at(t) {
	if (!g) throw new Error("cfgs not loaded");
	const e = g.ae.base_chunk_size, n = g.ttl.chunk_compress_factor, a = g.ttl.latent_dim, s = t.length, i = Math.max(...t.map((d) => d[0][0])) * k, r = t.map((d) => Math.floor(d[0][0] * k)), l = e * n, o = Math.floor((i + l - 1) / l), u = a * n, c = new Float32Array(s * u * o);
	let _ = 0;
	for (let d = 0; d < s; d++) {
		const A = Math.floor((r[d] + l - 1) / l);
		for (let w = 0; w < u; w++) for (let y = 0; y < o; y++) if (y < A) {
			const M = Math.random(), T = Math.random();
			c[_++] = Math.sqrt(-2 * Math.log(M)) * Math.cos(2 * Math.PI * T);
		} else c[_++] = 0;
	}
	return {
		latentBuffer: c,
		latentDim: u,
		latentLen: o,
		latentMask: r.map((d) => {
			const A = Math.floor((d + l - 1) / l), w = new Array(o);
			for (let y = 0; y < o; y++) w[y] = y < A ? 1 : 0;
			return [w];
		})
	};
}
function st(t, e) {
	t = t.normalize("NFKD"), t = t.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+/gu, "");
	for (const [a, s] of Object.entries({
		"–": "-",
		"‑": "-",
		"—": "-",
		_: " ",
		"“": "\"",
		"”": "\"",
		"‘": "'",
		"’": "'",
		"´": "'",
		"`": "'",
		"[": " ",
		"]": " ",
		"|": " ",
		"/": " ",
		"#": " ",
		"→": " ",
		"←": " "
	})) t = t.split(a).join(s);
	t = t.replace(/[♥☆♡©\\]/g, "");
	for (const [a, s] of Object.entries({
		"@": " at ",
		"e.g.,": "for example,",
		"i.e.,": "that is,"
	})) t = t.split(a).join(s);
	for (t = t.replace(/ ,/g, ",").replace(/ \./g, ".").replace(/ !/g, "!").replace(/ \?/g, "?").replace(/ ;/g, ";").replace(/ :/g, ":").replace(/ '/g, "'"); t.includes("\"\"");) t = t.replace(/""/g, "\"");
	for (; t.includes("''");) t = t.replace(/''/g, "'");
	for (; t.includes("``");) t = t.replace(/``/g, "`");
	t = t.replace(/\s+/g, " ").trim(), /[.!?;:,'")\]}…。」』】〉》›»]$/.test(t) || (t += ".");
	let n = e ?? null;
	return e && !Z.has(e) && (m({
		type: "status",
		message: `Language '${e}' not supported; using language-agnostic mode (na)`
	}), n = null), t = n ? `<${n}>${t}</${n}>` : `<na>${t}</na>`, t;
}
function ot(t) {
	return Array.from(t).map((e) => e.charCodeAt(0));
}
function rt(t) {
	const e = Math.max(...t);
	return t.map((n) => {
		const a = new Array(e);
		for (let s = 0; s < e; s++) a[s] = s < n ? 1 : 0;
		return [a];
	});
}
function it(t) {
	if (!E) throw new Error("indexer not loaded");
	const e = t.map((i) => Array.from(i).length), n = Math.max(...e), a = [], s = /* @__PURE__ */ new Set();
	for (let i = 0; i < t.length; i++) {
		const r = new Array(n).fill(0), l = ot(t[i]), o = Array.from(t[i]);
		for (let u = 0; u < l.length; u++) {
			const c = E[String(l[u])];
			c == null || c === -1 ? (s.add(o[u]), r[u] = 0) : r[u] = c;
		}
		a.push(r);
	}
	return {
		textIds: a,
		textMask: rt(e),
		unsupportedChars: Array.from(s)
	};
}
async function lt(t) {
	if (!p) throw new Error("Engine not initialized");
	if (!h) throw new Error("Voices not loaded");
	const { text: e, sid: n, speed: a, lang: s } = t, i = performance.now();
	let r = h.get(n);
	if (!r && (m({
		type: "status",
		message: `sid ${n} not loaded; falling back to default sid ${j}`
	}), r = h.get(j), !r)) throw new Error("Default voice not available — engine misconfigured");
	const { textIds: l, textMask: o, unsupportedChars: u } = it([st(e, s)]);
	u.length > 0 && m({
		type: "status",
		message: `Unsupported characters skipped: ${u.map((f) => `"${f}"`).join(", ")}`
	});
	const c = 1, _ = [c, l[0].length], d = v(o, [
		c,
		1,
		o[0][0].length
	]), A = await p.dpOrt.run({
		text_ids: P(l, _),
		style_dp: r.styleDp,
		text_mask: d
	}), w = Array.from(A.duration.data), y = a && a > 0 ? 1 / a : 1;
	for (let f = 0; f < w.length; f++) w[f] *= y;
	const M = [];
	for (let f = 0; f < c; f++) M.push([[w[f]]]);
	const T = (await p.textEncOrt.run({
		text_ids: P(l, _),
		style_ttl: r.styleTtl,
		text_mask: d
	})).text_emb, { latentBuffer: L, latentDim: J, latentLen: W, latentMask: B } = at(M), z = [
		c,
		J,
		W
	], K = v(B, [
		c,
		1,
		B[0][0].length
	]), D = [c], q = v([new Array(c).fill($)], D), C = [];
	for (let f = 0; f < $; f++) C.push(v([new Array(c).fill(f)], D));
	for (let f = 0; f < $; f++) {
		const H = new F("float32", L, z), Q = await p.vectorEstOrt.run({
			noisy_latent: H,
			text_emb: T,
			style_ttl: r.styleTtl,
			text_mask: d,
			latent_mask: K,
			total_step: q,
			current_step: C[f]
		});
		L.set(Q.denoised_latent.data);
	}
	const R = (await p.vocoderOrt.run({ latent: new F("float32", L, z) })).wav_tts.data, Y = Math.floor(k * w[0]), U = R.slice(0, Y);
	m({
		type: "result",
		samples: U,
		sampleRate: k,
		generationTimeMs: Math.round(performance.now() - i)
	}, [U.buffer]);
}
async function ct() {
	p && (await I(p), p = null), h = null, g = null, E = null, m({ type: "disposed" });
}
