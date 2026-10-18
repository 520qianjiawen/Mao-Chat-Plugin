import { a as P, c as D, d as R, i as O, l as U, n as V, o as W, r as B, s as C, t as I, u as v } from "./hf-transformers-BbktiAaQ.js";
import { a as _, i as j, r as A } from "./onnxruntime-web-CyTPs-5B.js";
import { t as G } from "./vad-web-DxH35_KS.js";
self.__transformersPin = [
	R,
	v,
	I,
	P,
	V,
	B,
	D,
	U,
	W,
	C,
	O
];
self.__ortPin = [
	j,
	_,
	A
];
function q(e) {
	return {
		async match(t) {
			if (!t) return;
			const a = typeof t == "string" ? t : t.url, s = a.indexOf("/resolve/main/");
			if (s === -1) return;
			const o = e[a.slice(s + 14)];
			if (o) return fetch(o);
		},
		async put(t, a) {}
	};
}
function H(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = q(t.fileUrls);
}
var m = G();
const N = .01;
function z(e) {
	const t = e?.threshold ?? .3, a = e?.negativeThreshold ?? Math.round((t - .15) * 100) / 100;
	return {
		positive: t,
		negative: Math.min(Math.max(a, Math.min(N, t)), t)
	};
}
const E = v.fetch;
v.fetch = (e, t) => {
	const a = t?.headers;
	return (a instanceof Headers ? a.has("Range") : Array.isArray(a) ? a.some(([s]) => s.toLowerCase() === "range") : a && typeof a == "object" && "Range" in a) ? E(e, {
		...t,
		cache: "no-store"
	}) : E(e, t);
};
function h(e) {
	self.postMessage(e);
}
const S = 16e3, d = 512, L = d / S * 1e3;
let c = null, l = null, T = 625, u = 0, F = 0, g = 0;
async function J(e) {
	if (!c) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new _("float32", e, [1, d]), a = new _("int64", BigInt64Array.from([BigInt(S)]), []), s = await c.session.run({
		input: t,
		sr: a,
		state: c.state
	});
	c.state = s.stateN;
	const o = s.output.data[0];
	return {
		isSpeech: o,
		notSpeech: 1 - o
	};
}
function $() {
	c && (c.state = new _("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function Q(e, t) {
	c = {
		session: await j.create(t || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new _("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	};
	const { positive: a, negative: s } = z(e), o = (e?.minSilenceDuration ?? 1.4) * 1e3, r = (e?.minSpeechDuration ?? .4) * 1e3, n = (e?.preSpeechPadDuration ?? .8) * 1e3, i = (e?.maxSpeechDuration ?? 20) * 1e3;
	T = Math.ceil(i / L), l = new m.FrameProcessor(J, $, {
		positiveSpeechThreshold: a,
		negativeSpeechThreshold: s,
		redemptionMs: o,
		minSpeechMs: r,
		preSpeechPadMs: n,
		submitUserSpeechOnPause: !1
	}, L), l.resume(), F = 0, g = 0, u = 0;
}
let f = /* @__PURE__ */ new Float32Array(0);
function K(e, t) {
	const a = t / S, s = Math.floor(e.length / a), o = new Float32Array(s);
	for (let r = 0; r < s; r++) {
		const n = r * a, i = Math.floor(n), k = Math.min(i + 1, e.length - 1), y = n - i, x = e[i] / 32768;
		o[r] = x + (e[k] / 32768 - x) * y;
	}
	return o;
}
let p = null, w, b = !1;
async function X(e, t) {
	if (e["config.json"]) try {
		const a = await (await fetch(e["config.json"])).json();
		if (a.model_type && a.model_type !== "whisper") {
			a.model_type = "whisper", a.architectures = ["WhisperForConditionalGeneration"];
			const s = new Blob([JSON.stringify(a)], { type: "application/json" });
			URL.revokeObjectURL(e["config.json"]), e["config.json"] = URL.createObjectURL(s);
		}
	} catch {}
	if (t && e["generation_config.json"]) try {
		const a = await (await fetch(e["generation_config.json"])).json();
		if (!a.is_multilingual) {
			a.is_multilingual = !0, a.lang_to_id || (a.lang_to_id = {
				"<|af|>": 50327,
				"<|am|>": 50334,
				"<|ar|>": 50272,
				"<|as|>": 50350,
				"<|az|>": 50304,
				"<|ba|>": 50355,
				"<|be|>": 50330,
				"<|bg|>": 50292,
				"<|bn|>": 50302,
				"<|bo|>": 50347,
				"<|br|>": 50309,
				"<|bs|>": 50315,
				"<|ca|>": 50270,
				"<|cs|>": 50283,
				"<|cy|>": 50297,
				"<|da|>": 50285,
				"<|de|>": 50261,
				"<|el|>": 50281,
				"<|en|>": 50259,
				"<|es|>": 50262,
				"<|et|>": 50307,
				"<|eu|>": 50310,
				"<|fa|>": 50300,
				"<|fi|>": 50277,
				"<|fo|>": 50338,
				"<|fr|>": 50265,
				"<|gl|>": 50319,
				"<|gu|>": 50333,
				"<|haw|>": 50352,
				"<|ha|>": 50354,
				"<|he|>": 50279,
				"<|hi|>": 50276,
				"<|hr|>": 50291,
				"<|ht|>": 50339,
				"<|hu|>": 50286,
				"<|hy|>": 50312,
				"<|id|>": 50275,
				"<|is|>": 50311,
				"<|it|>": 50274,
				"<|ja|>": 50266,
				"<|jw|>": 50356,
				"<|ka|>": 50329,
				"<|kk|>": 50316,
				"<|km|>": 50323,
				"<|kn|>": 50306,
				"<|ko|>": 50264,
				"<|la|>": 50294,
				"<|lb|>": 50345,
				"<|ln|>": 50353,
				"<|lo|>": 50336,
				"<|lt|>": 50293,
				"<|lv|>": 50301,
				"<|mg|>": 50349,
				"<|mi|>": 50295,
				"<|mk|>": 50308,
				"<|ml|>": 50296,
				"<|mn|>": 50314,
				"<|mr|>": 50320,
				"<|ms|>": 50282,
				"<|mt|>": 50343,
				"<|my|>": 50346,
				"<|ne|>": 50313,
				"<|nl|>": 50271,
				"<|nn|>": 50342,
				"<|no|>": 50288,
				"<|oc|>": 50328,
				"<|pa|>": 50321,
				"<|pl|>": 50269,
				"<|ps|>": 50340,
				"<|pt|>": 50267,
				"<|ro|>": 50284,
				"<|ru|>": 50263,
				"<|sa|>": 50344,
				"<|sd|>": 50332,
				"<|si|>": 50322,
				"<|sk|>": 50298,
				"<|sl|>": 50305,
				"<|sn|>": 50324,
				"<|so|>": 50326,
				"<|sq|>": 50317,
				"<|sr|>": 50303,
				"<|su|>": 50357,
				"<|sv|>": 50273,
				"<|sw|>": 50318,
				"<|ta|>": 50287,
				"<|te|>": 50299,
				"<|tg|>": 50331,
				"<|th|>": 50289,
				"<|tk|>": 50341,
				"<|tl|>": 50348,
				"<|tr|>": 50268,
				"<|tt|>": 50351,
				"<|uk|>": 50280,
				"<|ur|>": 50290,
				"<|uz|>": 50337,
				"<|vi|>": 50278,
				"<|yi|>": 50335,
				"<|yo|>": 50325,
				"<|yue|>": 50358,
				"<|zh|>": 50260
			}), a.task_to_id || (a.task_to_id = {
				transcribe: 50360,
				translate: 50359
			});
			const s = new Blob([JSON.stringify(a)], { type: "application/json" });
			URL.revokeObjectURL(e["generation_config.json"]), e["generation_config.json"] = URL.createObjectURL(s);
		}
	} catch {}
}
async function Y() {
	try {
		const e = self.navigator?.gpu;
		return e ? !!await e.requestAdapter() : !1;
	} catch {
		return !1;
	}
}
async function M(e, t) {
	if (!p) return;
	const a = Math.round(e.length / S * 1e3);
	let s = 0;
	for (let n = 0; n < e.length; n++) s += e[n] * e[n];
	const o = Math.sqrt(s / e.length);
	e.length, o.toFixed(5);
	const r = performance.now();
	try {
		const n = { no_repeat_ngram_size: 3 };
		w && (n.language = w, n.task = "transcribe");
		const i = await p(e, n), k = Math.round(performance.now() - r), y = (Array.isArray(i) ? i[0].text : i.text).trim();
		JSON.stringify(y), o.toFixed(5), y && h({
			type: "result",
			text: y,
			startSample: t,
			durationMs: a,
			recognitionTimeMs: k
		});
	} catch (n) {
		h({
			type: "error",
			error: `Whisper inference failed: ${n.message || n}`
		});
	}
}
async function Z(e, t) {
	if (!(!c || !l || !p || b)) {
		b = !0;
		try {
			const a = K(e, t), s = new Float32Array(f.length + a.length);
			for (s.set(f), s.set(a, f.length), f = s; f.length >= d;) {
				const o = f.slice(0, d);
				f = f.slice(d), F += d;
				const r = [];
				await l.process(o, (n) => r.push(n));
				for (const n of r) switch (n.msg) {
					case m.Message.SpeechStart:
						g = F - d, u = 0, h({ type: "speech_start" });
						break;
					case m.Message.SpeechEnd:
						u = 0, Math.round(n.audio.length / S * 1e3), await M(n.audio, g);
						break;
					case m.Message.VADMisfire:
						u = 0;
						break;
				}
				if (l.speaking) {
					if (u++, u >= T) {
						const n = [];
						l.endSegment((i) => n.push(i));
						for (const i of n) i.msg === m.Message.SpeechEnd && await M(i.audio, g);
						u = 0;
					}
				} else u = 0;
			}
		} finally {
			b = !1;
		}
	}
}
async function ee(e) {
	try {
		const t = performance.now();
		e.ortWasmBaseUrl && A?.wasm && (A.wasm.wasmPaths = e.ortWasmBaseUrl);
		const a = await Y(), s = a ? "webgpu" : "wasm";
		h({
			type: "status",
			message: `Loading Whisper model (${s})...`
		}), h({
			type: "status",
			message: "Loading VAD model..."
		}), await Q(e.vadConfig, e.vadModelUrl), await X(e.fileUrls, e.language), H(v, e), h({
			type: "status",
			message: `Loading Whisper model on ${s}...`
		});
		const o = e.dtype ?? {
			encoder_model: a ? "fp32" : "q8",
			decoder_model_merged: a ? "q4" : "q8"
		};
		if (p = await R("automatic-speech-recognition", e.hfModelId, {
			device: s,
			dtype: o
		}), w = e.language, a) {
			h({
				type: "status",
				message: "Warming up WebGPU shaders..."
			});
			try {
				const r = { max_new_tokens: 1 };
				w && (r.language = w, r.task = "transcribe"), await p(/* @__PURE__ */ new Float32Array(16e3), r);
			} catch {
				console.warn("[whisper-worker] Warmup failed, first inference may be slower");
			}
		}
		f = /* @__PURE__ */ new Float32Array(0), h({
			type: "ready",
			loadTimeMs: Math.round(performance.now() - t)
		});
	} catch (t) {
		h({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function te() {
	if (!l?.speaking) return;
	const e = [];
	l.endSegment((t) => e.push(t));
	for (const t of e) t.msg === m.Message.SpeechEnd && await M(t.audio, g);
	u = 0;
}
async function ae() {
	if (l?.speaking) {
		const e = [];
		l.endSegment((t) => e.push(t));
		for (const t of e) t.msg === m.Message.SpeechEnd && await M(t.audio, g);
	}
	l = null, u = 0, c?.session && (await c.session.release(), c = null), p && (await p.dispose?.(), p = null, w = void 0), f = /* @__PURE__ */ new Float32Array(0), b = !1, h({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await ee(t);
			break;
		case "audio":
			await Z(t.samples, t.sampleRate);
			break;
		case "flush":
			await te();
			break;
		case "dispose":
			await ae();
			break;
		default: console.warn("[whisper-worker] Unhandled message type:", t.type);
	}
};
