import { a as k, c as V, d as F, i as L, l as R, n as I, o as U, r as B, s as C, t as G, u as A } from "./hf-transformers-BbktiAaQ.js";
import { a as y, i as P, r as T } from "./onnxruntime-web-CyTPs-5B.js";
import { t as W } from "./vad-web-DxH35_KS.js";
self.__transformersPin = [
	F,
	A,
	G,
	k,
	I,
	B,
	V,
	R,
	U,
	C,
	L
];
self.__ortPin = [
	P,
	y,
	T
];
function O(e) {
	return {
		async match(t) {
			if (!t) return;
			const a = typeof t == "string" ? t : t.url, s = a.indexOf("/resolve/main/");
			if (s === -1) return;
			const n = e[a.slice(s + 14)];
			if (n) return fetch(n);
		},
		async put(t, a) {}
	};
}
function H(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = O(t.fileUrls);
}
var m = W();
const N = .01;
function j(e) {
	const t = e?.threshold ?? .3, a = e?.negativeThreshold ?? Math.round((t - .15) * 100) / 100;
	return {
		positive: t,
		negative: Math.min(Math.max(a, Math.min(N, t)), t)
	};
}
const v = A.fetch;
A.fetch = (e, t) => {
	const a = t?.headers;
	return (a instanceof Headers ? a.has("Range") : Array.isArray(a) ? a.some(([s]) => s.toLowerCase() === "range") : a && typeof a == "object" && "Range" in a) ? v(e, {
		...t,
		cache: "no-store"
	}) : v(e, t);
};
function c(e) {
	self.postMessage(e);
}
const b = 16e3, g = 512, E = g / b * 1e3;
let l = null, u = null, D = 625, d = 0;
async function $(e) {
	if (!l) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new y("float32", e, [1, g]), a = new y("int64", BigInt64Array.from([BigInt(b)]), []), s = await l.session.run({
		input: t,
		sr: a,
		state: l.state
	});
	l.state = s.stateN;
	const n = s.output.data[0];
	return {
		isSpeech: n,
		notSpeech: 1 - n
	};
}
function q() {
	l && (l.state = new y("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function z(e, t) {
	l = {
		session: await P.create(t || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new y("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	};
	const { positive: a, negative: s } = j(e), n = (e?.minSilenceDuration ?? 1.4) * 1e3, o = (e?.minSpeechDuration ?? .4) * 1e3, r = (e?.preSpeechPadDuration ?? .8) * 1e3, i = (e?.maxSpeechDuration ?? 20) * 1e3;
	D = Math.ceil(i / E), u = new m.FrameProcessor($, q, {
		positiveSpeechThreshold: a,
		negativeSpeechThreshold: s,
		redemptionMs: n,
		minSpeechMs: o,
		preSpeechPadMs: r,
		submitUserSpeechOnPause: !1
	}, E), u.resume(), d = 0;
}
let f = /* @__PURE__ */ new Float32Array(0);
function Q(e, t) {
	const a = t / b, s = Math.floor(e.length / a), n = new Float32Array(s);
	for (let o = 0; o < s; o++) {
		const r = o * a, i = Math.floor(r), S = Math.min(i + 1, e.length - 1), x = r - i;
		n[o] = e[i] / 32768 + (e[S] / 32768 - e[i] / 32768) * x;
	}
	return n;
}
let h = null, w, _ = !1, p = null;
function M(e) {
	const t = (async () => {
		if (p) try {
			await p;
		} catch {}
		if (!h) return;
		const a = Math.round(e.length / b * 1e3), s = performance.now();
		let n = "";
		try {
			const o = {
				max_new_tokens: 1024,
				streamer: new k(h.tokenizer, {
					skip_prompt: !0,
					skip_special_tokens: !0,
					callback_function: (x) => {
						n += x, c({
							type: "partial",
							text: n
						});
					}
				})
			};
			w && (o.language = w);
			const r = await h(e, o), i = Math.round(performance.now() - s), S = (Array.isArray(r) ? r[0].text : r.text).trim();
			S && c({
				type: "result",
				text: S,
				durationMs: a,
				recognitionTimeMs: i
			});
		} catch (o) {
			c({
				type: "error",
				error: `Cohere Transcribe inference failed: ${o.message || o}`
			});
		}
	})();
	return p = t, t;
}
async function J(e, t) {
	if (!(!l || !u || !h || _)) {
		_ = !0;
		try {
			const a = Q(e, t), s = new Float32Array(f.length + a.length);
			for (s.set(f), s.set(a, f.length), f = s; f.length >= g;) {
				const n = f.slice(0, g);
				f = f.slice(g);
				const o = [];
				await u.process(n, (r) => o.push(r));
				for (const r of o) switch (r.msg) {
					case m.Message.SpeechStart:
						d = 0, c({ type: "speech_start" });
						break;
					case m.Message.SpeechEnd:
						d = 0, await M(r.audio);
						break;
					case m.Message.VADMisfire:
						d = 0;
						break;
				}
				if (u.speaking) {
					if (d++, d >= D) {
						const r = [];
						u.endSegment((i) => r.push(i));
						for (const i of r) i.msg === m.Message.SpeechEnd && await M(i.audio);
						d = 0;
					}
				} else d = 0;
			}
		} finally {
			_ = !1;
		}
	}
}
async function K(e) {
	try {
		if (!e.language) throw new Error("Cohere Transcribe requires an explicit source language");
		const t = performance.now();
		e.ortWasmBaseUrl && T?.wasm && (T.wasm.wasmPaths = e.ortWasmBaseUrl), c({
			type: "status",
			message: "Loading VAD model..."
		}), await z(e.vadConfig, e.vadModelUrl), H(A, e), c({
			type: "status",
			message: "Loading Cohere Transcribe model (WebGPU)..."
		}), h = await F("automatic-speech-recognition", e.hfModelId, {
			dtype: e.dtype,
			device: "webgpu",
			progress_callback: (a) => {
				a.status === "progress" && a.file.endsWith(".onnx_data") && a.total > 0 && c({
					type: "status",
					message: `Loading model... ${Math.round(a.loaded / a.total * 100)}%`
				});
			}
		}), w = e.language, c({
			type: "status",
			message: "Warming up WebGPU shaders..."
		});
		try {
			const a = { max_new_tokens: 1 };
			w && (a.language = w), await h(/* @__PURE__ */ new Float32Array(16e3), a);
		} catch {
			console.warn("[cohere-transcribe-worker] Warmup failed, first inference may be slower");
		}
		f = /* @__PURE__ */ new Float32Array(0), c({
			type: "ready",
			loadTimeMs: Math.round(performance.now() - t)
		});
	} catch (t) {
		c({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function X() {
	if (u?.speaking) {
		const e = [];
		u.endSegment((t) => e.push(t));
		for (const t of e) t.msg === m.Message.SpeechEnd && await M(t.audio);
	}
	p && await p;
}
async function Y() {
	if (u?.speaking) {
		const e = [];
		u.endSegment((t) => e.push(t));
		for (const t of e) t.msg === m.Message.SpeechEnd && await M(t.audio);
	}
	if (p) {
		try {
			await p;
		} catch {}
		p = null;
	}
	u = null, d = 0, l?.session && (await l.session.release(), l = null), h && (await h.dispose?.(), h = null, w = void 0), f = /* @__PURE__ */ new Float32Array(0), _ = !1, c({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await K(t);
			break;
		case "audio":
			await J(t.samples, t.sampleRate);
			break;
		case "flush":
			await X();
			break;
		case "dispose":
			await Y();
			break;
	}
};
