import { a as X, c as C, d as Y, i as Z, l as H, n as W, o as ee, r as te, s as se, t as ne, u as v } from "./hf-transformers-BbktiAaQ.js";
import { a as T, i as q, r as D } from "./onnxruntime-web-CyTPs-5B.js";
import { t as ae } from "./vad-web-DxH35_KS.js";
self.__transformersPin = [
	Y,
	v,
	ne,
	X,
	W,
	te,
	C,
	H,
	ee,
	se,
	Z
];
self.__ortPin = [
	q,
	T,
	D
];
function re(e) {
	return {
		async match(t) {
			if (!t) return;
			const s = typeof t == "string" ? t : t.url, n = s.indexOf("/resolve/main/");
			if (n === -1) return;
			const r = e[s.slice(n + 14)];
			if (r) return fetch(r);
		},
		async put(t, s) {}
	};
}
function ie(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = re(t.fileUrls);
}
var y = ae();
const oe = .01;
function ce(e) {
	const t = e?.threshold ?? .3, s = e?.negativeThreshold ?? Math.round((t - .15) * 100) / 100;
	return {
		positive: t,
		negative: Math.min(Math.max(s, Math.min(oe, t)), t)
	};
}
function le(e) {
	return 7 * e;
}
function I(e, t) {
	const s = new Float32Array(e.length + t.length);
	return s.set(e), s.set(t, e.length), s;
}
var ue = class {
	active = /* @__PURE__ */ new Float32Array(0);
	staged = /* @__PURE__ */ new Float32Array(0);
	_finishing = !1;
	_stopped = !1;
	get audio() {
		return this.active;
	}
	get finishing() {
		return this._finishing;
	}
	get stopped() {
		return this._stopped;
	}
	append(e) {
		e.length !== 0 && (this._finishing || this._stopped ? this.staged = I(this.staged, e) : this.active = I(this.active, e));
	}
	requestFinish(e) {
		this._finishing || (e > 0 && (this.active = I(this.active, new Float32Array(e))), this._finishing = !0);
	}
	requestStop() {
		this._stopped = !0;
	}
	hasSamples(e) {
		return this.active.length >= e;
	}
	readyFor(e) {
		return this._stopped || this._finishing || this.hasSamples(e);
	}
	complete() {
		this.active = this.staged, this.staged = /* @__PURE__ */ new Float32Array(0), this._finishing = !1, this._stopped = !1;
	}
	clear() {
		this.active = /* @__PURE__ */ new Float32Array(0), this.staged = /* @__PURE__ */ new Float32Array(0), this._finishing = !1, this._stopped = !1;
	}
};
const he = /[.。!?！？]\s*$/;
var de = class {
	decode;
	options;
	cache = [];
	printLen = 0;
	pendingText = "";
	constructor(e, t) {
		this.decode = e, this.options = t;
	}
	get pending() {
		return this.pendingText;
	}
	push(e) {
		e.length !== 0 && (this.cache = this.cache.concat(e), this.flush());
	}
	end(e) {
		if (e?.discard) {
			this.reset();
			return;
		}
		this.flush();
		const t = this.pendingText.trim();
		this.reset(), t && this.options.onResult(t);
	}
	reset() {
		this.cache = [], this.printLen = 0, this.pendingText = "";
	}
	flush() {
		if (this.cache.length === 0) return;
		const e = this.decode(this.cache).slice(this.printLen);
		if (e.length === 0) return;
		const t = e.indexOf("�"), s = t === -1 ? e : e.slice(0, t);
		if (s.length !== 0 && (this.printLen += s.length, this.pendingText += s, this.options.onPartial(this.pendingText), this.options.punctuationEndpoint !== !1 && he.test(this.pendingText))) {
			const n = this.pendingText.trim();
			this.pendingText = "", this.options.onResult(n);
		}
	}
};
const B = v.fetch;
v.fetch = (e, t) => {
	const s = t?.headers;
	return (s instanceof Headers ? s.has("Range") : Array.isArray(s) ? s.some(([n]) => n.toLowerCase() === "range") : s && typeof s == "object" && "Range" in s) ? B(e, {
		...t,
		cache: "no-store"
	}) : B(e, t);
};
function d(e) {
	self.postMessage(e);
}
const V = 16e3, S = 512, G = S / V * 1e3;
let p = null, _ = null, $ = 625, m = 0;
async function pe(e) {
	if (!p) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new T("float32", e, [1, S]), s = new T("int64", BigInt64Array.from([BigInt(V)]), []), n = await p.session.run({
		input: t,
		sr: s,
		state: p.state
	});
	p.state = n.stateN;
	const r = n.output.data[0];
	return {
		isSpeech: r,
		notSpeech: 1 - r
	};
}
function fe() {
	p && (p.state = new T("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function me(e, t) {
	p = {
		session: await q.create(t || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new T("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	};
	const { positive: s, negative: n } = ce(e), r = (e?.minSilenceDuration ?? 1.4) * 1e3, i = (e?.minSpeechDuration ?? .4) * 1e3, o = (e?.preSpeechPadDuration ?? .8) * 1e3, c = (e?.maxSpeechDuration ?? 20) * 1e3;
	$ = Math.ceil(c / G), _ = new y.FrameProcessor(pe, fe, {
		positiveSpeechThreshold: s,
		negativeSpeechThreshold: n,
		redemptionMs: r,
		minSpeechMs: i,
		preSpeechPadMs: o,
		submitUserSpeechOnPause: !1
	}, G), _.resume(), m = 0;
}
let f = /* @__PURE__ */ new Float32Array(0);
function _e(e, t) {
	const s = t / V, n = Math.floor(e.length / s), r = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		const o = i * s, c = Math.floor(o), F = Math.min(c + 1, e.length - 1), k = o - c;
		r[i] = e[c] / 32768 + (e[F] / 32768 - e[c] / 32768) * k;
	}
	return r;
}
let g = null, l = null;
const ge = !0;
let w = !1, A = !1, x = !1;
const a = new ue();
function we() {
	return l ? le(l.raw_audio_length_per_tok) : 0;
}
function O(e) {
	return new Promise((t) => {
		if (e()) return t();
		const s = setInterval(() => {
			e() && (clearInterval(s), t());
		}, 50);
	});
}
async function j() {
	if (!g || !l || w) return;
	w = !0;
	const e = performance.now(), t = () => a.audio;
	let s = null;
	try {
		const n = l.num_samples_first_audio_chunk;
		if (await O(() => a.readyFor(n)), a.stopped || !a.hasSamples(n)) return;
		const r = await l(t().subarray(0, n), {
			is_streaming: !0,
			is_first_audio_chunk: !0
		}), { hop_length: i, n_fft: o } = l.feature_extractor.config, c = Math.floor(o / 2), F = l.audio_length_per_tok * i;
		async function* k() {
			yield r.input_features;
			let u = l.num_mel_frames_first_audio_chunk, h = u * i - c;
			for (; !a.stopped;) {
				const P = h + l.num_samples_per_audio_chunk;
				if (await O(() => a.readyFor(P)), a.stopped || !a.hasSamples(P)) break;
				const J = t().length;
				let b = P;
				for (; b + F <= J;) b += F;
				const U = await l(t().slice(h, b), {
					is_streaming: !0,
					is_first_audio_chunk: !1
				});
				yield U.input_features, u += U.input_features.dims[2], h = u * i - c;
			}
		}
		const R = l.tokenizer, K = new Set(R.all_special_ids.map(BigInt));
		let E = !0, N = e;
		s = new de((u) => R.decode(u, { skip_special_tokens: !0 }), {
			onPartial: (u) => d({
				type: "partial",
				text: u
			}),
			onResult: (u) => {
				const h = performance.now();
				d({
					type: "result",
					text: u,
					durationMs: Math.round(h - N),
					recognitionTimeMs: Math.round(h - e)
				}), N = h;
			},
			punctuationEndpoint: ge
		});
		const Q = new class extends W {
			put(u) {
				if (a.stopped) return;
				if (E) {
					E = !1;
					return;
				}
				const h = u[0];
				h.length === 1 && K.has(h[0]) || s.push(h);
			}
			end() {
				s.end({ discard: x }), E = !0;
			}
		}();
		await g.generate({
			input_ids: r.input_ids,
			input_features: k(),
			max_new_tokens: 4096,
			streamer: Q
		});
	} catch (n) {
		a.stopped || d({
			type: "error",
			error: `Voxtral inference failed: ${n.message || n}`
		});
	} finally {
		s?.end({ discard: x }), w = !1, a.complete(), A && !x && (A = !1, j());
	}
}
function L() {
	if (!w) {
		a.clear();
		return;
	}
	a.requestFinish(we());
}
function z() {
	a.requestStop(), w || a.clear();
}
let M = !1;
async function ye(e, t) {
	if (!(!p || !_ || !g || M)) {
		M = !0;
		try {
			const s = _e(e, t);
			a.append(s);
			const n = new Float32Array(f.length + s.length);
			for (n.set(f), n.set(s, f.length), f = n; f.length >= S;) {
				const r = f.slice(0, S);
				f = f.slice(S);
				const i = [];
				await _.process(r, (o) => i.push(o));
				for (const o of i) switch (o.msg) {
					case y.Message.SpeechStart:
						m = 0, d({ type: "speech_start" }), w ? A = !0 : j();
						break;
					case y.Message.SpeechEnd:
						m = 0, L();
						break;
					case y.Message.VADMisfire:
						m = 0, z();
						break;
				}
				if (_.speaking) {
					if (m++, m >= $) {
						const o = [];
						_.endSegment((c) => o.push(c));
						for (const c of o) c.msg === y.Message.SpeechEnd && L();
						m = 0;
					}
				} else m = 0;
			}
		} finally {
			M = !1;
		}
	}
}
async function Se(e) {
	try {
		const t = performance.now();
		e.ortWasmBaseUrl && D?.wasm && (D.wasm.wasmPaths = e.ortWasmBaseUrl), d({
			type: "status",
			message: "Loading VAD model..."
		}), await me(e.vadConfig, e.vadModelUrl), ie(v, e), d({
			type: "status",
			message: "Loading Voxtral model (WebGPU)..."
		});
		const s = typeof e.dtype == "string" ? {
			audio_encoder: e.dtype,
			embed_tokens: e.dtype,
			decoder_model_merged: e.dtype
		} : e.dtype;
		g = await C.from_pretrained(e.hfModelId, {
			dtype: s,
			device: "webgpu",
			progress_callback: (n) => {
				n.status === "progress" && n.file.endsWith(".onnx_data") && n.total > 0 && d({
					type: "status",
					message: `Loading model... ${Math.round(n.loaded / n.total * 100)}%`
				});
			}
		}), d({
			type: "status",
			message: "Loading processor..."
		}), l = await H.from_pretrained(e.hfModelId), f = /* @__PURE__ */ new Float32Array(0), a.clear(), A = !1, x = !1, d({
			type: "ready",
			loadTimeMs: Math.round(performance.now() - t)
		});
	} catch (t) {
		d({
			type: "error",
			error: t.message || String(t)
		});
	}
}
function xe() {
	L();
}
async function Te() {
	x = !0, z(), await new Promise((e) => setTimeout(e, 100)), _ = null, m = 0, p?.session && (await p.session.release(), p = null), g && (await g.dispose?.(), g = null), l = null, f = /* @__PURE__ */ new Float32Array(0), a.clear(), A = !1, M = !1, w = !1, d({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await Se(t);
			break;
		case "audio":
			await ye(t.samples, t.sampleRate);
			break;
		case "flush":
			xe();
			break;
		case "dispose":
			await Te();
			break;
	}
};
