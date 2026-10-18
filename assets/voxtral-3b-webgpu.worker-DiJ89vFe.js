import { a as V, c as W, d as H, i as $, l as z, n as j, o as I, r as Q, s as D, t as q, u as E } from "./hf-transformers-BbktiAaQ.js";
import { a as _, i as L, r as P } from "./onnxruntime-web-CyTPs-5B.js";
import { t as J } from "./vad-web-DxH35_KS.js";
self.__transformersPin = [
	H,
	E,
	q,
	V,
	j,
	Q,
	W,
	z,
	I,
	D,
	$
];
self.__ortPin = [
	L,
	_,
	P
];
function K(e) {
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
function X(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = K(t.fileUrls);
}
var w = J();
const Y = .01;
function Z(e) {
	const t = e?.threshold ?? .3, a = e?.negativeThreshold ?? Math.round((t - .15) * 100) / 100;
	return {
		positive: t,
		negative: Math.min(Math.max(a, Math.min(Y, t)), t)
	};
}
const R = E.fetch;
E.fetch = (e, t) => {
	const a = t?.headers;
	return (a instanceof Headers ? a.has("Range") : Array.isArray(a) ? a.some(([s]) => s.toLowerCase() === "range") : a && typeof a == "object" && "Range" in a) ? R(e, {
		...t,
		cache: "no-store"
	}) : R(e, t);
};
function i(e) {
	self.postMessage(e);
}
const S = 16e3, g = 512, B = g / S * 1e3;
let l = null, u = null, C = 625, d = 0;
async function ee(e) {
	if (!l) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new _("float32", e, [1, g]), a = new _("int64", BigInt64Array.from([BigInt(S)]), []), s = await l.session.run({
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
function te() {
	l && (l.state = new _("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function ae(e, t) {
	l = {
		session: await L.create(t || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new _("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	};
	const { positive: a, negative: s } = Z(e), n = (e?.minSilenceDuration ?? 1.4) * 1e3, o = (e?.minSpeechDuration ?? .4) * 1e3, r = (e?.preSpeechPadDuration ?? .8) * 1e3, c = (e?.maxSpeechDuration ?? 20) * 1e3;
	C = Math.ceil(c / B), u = new w.FrameProcessor(ee, te, {
		positiveSpeechThreshold: a,
		negativeSpeechThreshold: s,
		redemptionMs: n,
		minSpeechMs: o,
		preSpeechPadMs: r,
		submitUserSpeechOnPause: !1
	}, B), u.resume(), d = 0;
}
let p = /* @__PURE__ */ new Float32Array(0);
function se(e, t) {
	const a = t / S, s = Math.floor(e.length / a), n = new Float32Array(s);
	for (let o = 0; o < s; o++) {
		const r = o * a, c = Math.floor(r), M = Math.min(c + 1, e.length - 1), k = r - c;
		n[o] = e[c] / 32768 + (e[M] / 32768 - e[c] / 32768) * k;
	}
	return n;
}
let h = null, f = null, y, A = !1, m = null;
const U = /* @__PURE__ */ new Set([
	"en",
	"es",
	"fr",
	"pt",
	"hi",
	"de",
	"nl",
	"it"
]);
function G(e) {
	return e ? e.trim().toLowerCase().split(/[-_]/)[0] : "";
}
function T(e) {
	const t = (async () => {
		if (m) try {
			await m;
		} catch {}
		if (!h || !f) return;
		const a = Math.round(e.length / S * 1e3), s = performance.now();
		let n = "";
		try {
			const o = G(y), r = [{
				role: "user",
				content: [{ type: "audio" }, {
					type: "text",
					text: U.has(o) ? `lang:${o} [TRANSCRIBE]` : "[TRANSCRIBE]"
				}]
			}], c = f.apply_chat_template(r, { tokenize: !1 }), M = await f(c, e), k = new V(f.tokenizer, {
				skip_prompt: !0,
				skip_special_tokens: !0,
				callback_function: (F) => {
					n += F, i({
						type: "partial",
						text: n
					});
				}
			}), N = await h.generate({
				...M,
				max_new_tokens: 500,
				streamer: k
			});
			let v = n.trim();
			try {
				const F = M.input_ids.dims.at(-1), O = N.slice(null, [F, null]), b = f.batch_decode(O, { skip_special_tokens: !0 }), x = Array.isArray(b) ? b[0] : b;
				x && typeof x == "string" && x.trim() && (v = x.trim());
			} catch {}
			v && i({
				type: "result",
				text: v,
				durationMs: a,
				recognitionTimeMs: Math.round(performance.now() - s)
			});
		} catch (o) {
			i({
				type: "error",
				error: `Voxtral 3B inference failed: ${o?.message || o}`
			});
		}
	})();
	return m = t, t;
}
async function ne(e, t) {
	if (!(!l || !u || !h || A)) {
		A = !0;
		try {
			const a = se(e, t), s = new Float32Array(p.length + a.length);
			for (s.set(p), s.set(a, p.length), p = s; p.length >= g;) {
				const n = p.slice(0, g);
				p = p.slice(g);
				const o = [];
				await u.process(n, (r) => o.push(r));
				for (const r of o) switch (r.msg) {
					case w.Message.SpeechStart:
						d = 0, i({ type: "speech_start" });
						break;
					case w.Message.SpeechEnd:
						d = 0, T(r.audio);
						break;
					case w.Message.VADMisfire:
						d = 0;
						break;
				}
				if (u.speaking) {
					if (d++, d >= C) {
						const r = [];
						u.endSegment((c) => r.push(c));
						for (const c of r) c.msg === w.Message.SpeechEnd && T(c.audio);
						d = 0;
					}
				} else d = 0;
			}
		} finally {
			A = !1;
		}
	}
}
async function oe(e) {
	try {
		const t = performance.now();
		e.ortWasmBaseUrl && P?.wasm && (P.wasm.wasmPaths = e.ortWasmBaseUrl), i({
			type: "status",
			message: "Loading VAD model..."
		}), await ae(e.vadConfig, e.vadModelUrl), X(E, e), i({
			type: "status",
			message: "Loading Voxtral 3B processor..."
		}), f = await D.from_pretrained(e.hfModelId), i({
			type: "status",
			message: "Loading Voxtral 3B model (WebGPU)..."
		}), h = await I.from_pretrained(e.hfModelId, {
			dtype: e.dtype,
			device: "webgpu",
			progress_callback: (s) => {
				s.status === "progress" && s.file?.endsWith(".onnx_data") && s.total > 0 && i({
					type: "status",
					message: `Loading model... ${Math.round(s.loaded / s.total * 100)}%`
				});
			}
		}), y = e.language;
		const a = G(y);
		U.has(a) ? i({
			type: "status",
			message: `Voxtral 3B language hint: lang:${a} [TRANSCRIBE]`
		}) : y && i({
			type: "status",
			message: `Voxtral 3B: source language '${y}' not in supported set; using auto-detect`
		}), i({
			type: "status",
			message: "Warming up WebGPU shaders..."
		});
		try {
			const s = new Float32Array(S), n = f.apply_chat_template([{
				role: "user",
				content: [{ type: "audio" }, {
					type: "text",
					text: "[TRANSCRIBE]"
				}]
			}], { tokenize: !1 }), o = await f(n, s);
			await h.generate({
				...o,
				max_new_tokens: 1
			});
		} catch {}
		p = /* @__PURE__ */ new Float32Array(0), i({
			type: "ready",
			loadTimeMs: Math.round(performance.now() - t)
		});
	} catch (t) {
		i({
			type: "error",
			error: t?.message || String(t)
		});
	}
}
async function re() {
	if (u?.speaking) {
		const e = [];
		u.endSegment((t) => e.push(t));
		for (const t of e) t.msg === w.Message.SpeechEnd && T(t.audio);
	}
	if (m) try {
		await m;
	} catch {}
}
async function ie() {
	if (u?.speaking) {
		const e = [];
		u.endSegment((t) => e.push(t));
		for (const t of e) t.msg === w.Message.SpeechEnd && T(t.audio);
	}
	if (m) {
		try {
			await m;
		} catch {}
		m = null;
	}
	if (u = null, d = 0, l?.session && (await l.session.release(), l = null), h) {
		try {
			await h.dispose?.();
		} catch {}
		h = null;
	}
	f = null, y = void 0, p = /* @__PURE__ */ new Float32Array(0), A = !1, i({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await oe(t);
			break;
		case "audio":
			await ne(t.samples, t.sampleRate);
			break;
		case "flush":
			await re();
			break;
		case "dispose":
			await ie();
			break;
	}
};
