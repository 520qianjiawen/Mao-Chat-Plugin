import { a as I, c as W, d as C, i as H, l as O, n as z, o as N, r as U, s as j, t as D, u as A } from "./hf-transformers-BbktiAaQ.js";
import { a as S, i as L, r as x } from "./onnxruntime-web-CyTPs-5B.js";
import { t as q } from "./vad-web-DxH35_KS.js";
self.__transformersPin = [
	C,
	A,
	D,
	I,
	z,
	U,
	W,
	O,
	N,
	j,
	H
];
self.__ortPin = [
	L,
	S,
	x
];
function $(e) {
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
function J(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = $(t.fileUrls);
}
var w = q();
const Q = .01;
function K(e) {
	const t = e?.threshold ?? .3, a = e?.negativeThreshold ?? Math.round((t - .15) * 100) / 100;
	return {
		positive: t,
		negative: Math.min(Math.max(a, Math.min(Q, t)), t)
	};
}
const P = A.fetch;
A.fetch = (e, t) => {
	const a = t?.headers;
	return (a instanceof Headers ? a.has("Range") : Array.isArray(a) ? a.some(([s]) => s.toLowerCase() === "range") : a && typeof a == "object" && "Range" in a) ? P(e, {
		...t,
		cache: "no-store"
	}) : P(e, t);
};
function u(e) {
	self.postMessage(e);
}
const X = {
	en: "English",
	fr: "French",
	de: "German",
	es: "Spanish",
	pt: "Portuguese",
	ja: "Japanese",
	it: "Italian",
	zh: "Mandarin Chinese"
}, M = 16e3, m = 512, G = m / M * 1e3;
let c = null, f = null, V = 625, p = 0, F = 0, _ = 0;
async function Y(e) {
	if (!c) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new S("float32", e, [1, m]), a = new S("int64", BigInt64Array.from([BigInt(M)]), []), s = await c.session.run({
		input: t,
		sr: a,
		state: c.state
	});
	c.state = s.stateN;
	const n = s.output.data[0];
	return {
		isSpeech: n,
		notSpeech: 1 - n
	};
}
function Z() {
	c && (c.state = new S("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function ee(e, t) {
	c = {
		session: await L.create(t || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new S("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	};
	const { positive: a, negative: s } = K(e), n = (e?.minSilenceDuration ?? 1.4) * 1e3, i = (e?.minSpeechDuration ?? .4) * 1e3, r = (e?.preSpeechPadDuration ?? .8) * 1e3, o = (e?.maxSpeechDuration ?? 20) * 1e3;
	V = Math.ceil(o / G), f = new w.FrameProcessor(Y, Z, {
		positiveSpeechThreshold: a,
		negativeSpeechThreshold: s,
		redemptionMs: n,
		minSpeechMs: i,
		preSpeechPadMs: r,
		submitUserSpeechOnPause: !1
	}, G), f.resume(), F = 0, _ = 0, p = 0;
}
let l = /* @__PURE__ */ new Float32Array(0);
function te(e, t) {
	const a = t / M, s = Math.floor(e.length / a), n = new Float32Array(s);
	for (let i = 0; i < s; i++) {
		const r = i * a, o = Math.floor(r), k = Math.min(o + 1, e.length - 1), T = r - o, g = e[o] / 32768;
		n[i] = g + (e[k] / 32768 - g) * T;
	}
	return n;
}
let h = null, d = null, E = "transcribe", y, b = !1;
function ae() {
	return E === "translate" && y ? `<|audio|>Translate the speech to ${X[y] || y}` : "<|audio|>Transcribe the speech to text";
}
async function se() {
	try {
		const e = self.navigator?.gpu;
		return e ? !!await e.requestAdapter() : !1;
	} catch {
		return !1;
	}
}
async function v(e, t) {
	if (!h || !d) return;
	const a = Math.round(e.length / M * 1e3), s = performance.now();
	try {
		const n = [{
			role: "user",
			content: ae()
		}], i = h.tokenizer.apply_chat_template(n, {
			add_generation_prompt: !0,
			tokenize: !1
		}), r = await h(i, e, { sampling_rate: M });
		let o = "";
		const k = new I(h.tokenizer, {
			skip_prompt: !0,
			skip_special_tokens: !0,
			callback_function: (B) => {
				o += B;
			}
		});
		await d.generate({
			...r,
			max_new_tokens: 256,
			streamer: k
		});
		const T = Math.round(performance.now() - s), g = o.trim();
		g && u({
			type: "result",
			text: g,
			startSample: t,
			durationMs: a,
			recognitionTimeMs: T
		});
	} catch (n) {
		u({
			type: "error",
			error: `Granite inference failed: ${n.message || n}`
		});
	}
}
async function ne(e, t) {
	if (!(!c || !f || !d || b)) {
		b = !0;
		try {
			const a = te(e, t), s = new Float32Array(l.length + a.length);
			for (s.set(l), s.set(a, l.length), l = s; l.length >= m;) {
				const n = l.slice(0, m);
				l = l.slice(m), F += m;
				const i = [];
				await f.process(n, (r) => i.push(r));
				for (const r of i) switch (r.msg) {
					case w.Message.SpeechStart:
						_ = F - m, p = 0, u({ type: "speech_start" });
						break;
					case w.Message.SpeechEnd:
						p = 0, await v(r.audio, _);
						break;
					case w.Message.VADMisfire:
						p = 0;
						break;
				}
				if (f.speaking) {
					if (p++, p >= V) {
						const r = [];
						f.endSegment((o) => r.push(o));
						for (const o of r) o.msg === w.Message.SpeechEnd && await v(o.audio, _);
						p = 0;
					}
				} else p = 0;
			}
		} finally {
			b = !1;
		}
	}
}
async function re(e) {
	try {
		const t = performance.now();
		if (e.ortWasmBaseUrl && x?.wasm && (x.wasm.wasmPaths = e.ortWasmBaseUrl), !await se()) {
			u({
				type: "error",
				error: "WebGPU is not available. Granite Speech requires WebGPU."
			});
			return;
		}
		u({
			type: "status",
			message: "Loading VAD model..."
		}), await ee(e.vadConfig, e.vadModelUrl), J(A, e), u({
			type: "status",
			message: "Loading Granite Speech model (WebGPU)..."
		}), h = await D.from_pretrained(e.hfModelId), d = await U.from_pretrained(e.hfModelId, {
			dtype: e.dtype,
			device: "webgpu"
		}), E = e.task, y = e.targetLanguage, u({
			type: "status",
			message: "Warming up WebGPU shaders..."
		});
		try {
			const a = h.tokenizer.apply_chat_template([{
				role: "user",
				content: "<|audio|>Transcribe the speech to text"
			}], {
				add_generation_prompt: !0,
				tokenize: !1
			}), s = await h(a, /* @__PURE__ */ new Float32Array(16e3), { sampling_rate: 16e3 });
			await d.generate({
				...s,
				max_new_tokens: 1
			});
		} catch {
			console.warn("[granite-worker] Warmup failed, first inference may be slower");
		}
		l = /* @__PURE__ */ new Float32Array(0), u({
			type: "ready",
			loadTimeMs: Math.round(performance.now() - t)
		});
	} catch (t) {
		u({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function R() {
	if (f?.speaking) {
		const e = [];
		f.endSegment((t) => e.push(t));
		for (const t of e) t.msg === w.Message.SpeechEnd && await v(t.audio, _);
	}
}
async function oe() {
	await R(), f = null, p = 0, c?.session && (await c.session.release(), c = null), d && (await d.dispose?.(), d = null), h = null, E = "transcribe", y = void 0, l = /* @__PURE__ */ new Float32Array(0), b = !1, u({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await re(t);
			break;
		case "audio":
			await ne(t.samples, t.sampleRate);
			break;
		case "flush":
			await R();
			break;
		case "dispose":
			await oe();
			break;
	}
};
