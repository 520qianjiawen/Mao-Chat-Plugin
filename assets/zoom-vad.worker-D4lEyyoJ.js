import { a as d, i as _, r as M } from "./onnxruntime-web-LT8OesUC.js";
import { t as b } from "./vad-web-D9yVZdRa.js";
self.__ortPin = [
	_,
	d,
	M
];
var u = b();
const m = 16e3, p = 512, F = p / m * 1e3;
let r = null, i = null, n = /* @__PURE__ */ new Float32Array(0), P = Math.ceil(2e4 / F), c = 0;
const w = (e, t) => self.postMessage(e, t ?? []);
function k(e, t) {
	const a = new Float32Array(e.length);
	for (let s = 0; s < e.length; s++) a[s] = e[s] / 32768;
	if (t === m) return a;
	const o = m / t, l = Math.floor(a.length * o), h = new Float32Array(l);
	for (let s = 0; s < l; s++) {
		const f = s / o, g = Math.floor(f), E = f - g, S = a[g] ?? 0;
		h[s] = S + ((a[g + 1] ?? S) - S) * E;
	}
	return h;
}
async function B(e) {
	if (!r) return {
		isSpeech: 0,
		notSpeech: 1
	};
	const t = new d("float32", e, [1, p]), a = new d("int64", BigInt64Array.from([BigInt(m)]), []), o = await r.session.run({
		input: t,
		sr: a,
		state: r.state
	});
	r.state = o.stateN;
	const l = o.output.data[0];
	return {
		isSpeech: l,
		notSpeech: 1 - l
	};
}
function U() {
	r && (r.state = new d("float32", /* @__PURE__ */ new Float32Array(256), [
		2,
		1,
		128
	]));
}
async function V(e) {
	r = {
		session: await _.create(e || "./wasm/vad/silero_vad_v5.onnx", { executionProviders: ["wasm"] }),
		state: new d("float32", /* @__PURE__ */ new Float32Array(256), [
			2,
			1,
			128
		])
	}, i = new u.FrameProcessor(B, U, {
		positiveSpeechThreshold: .3,
		negativeSpeechThreshold: .25,
		redemptionMs: 1400,
		minSpeechMs: 400,
		preSpeechPadMs: 800,
		submitUserSpeechOnPause: !1
	}, F), i.resume(), n = /* @__PURE__ */ new Float32Array(0), w({ type: "ready" });
}
function A(e) {
	w({
		type: "utterance",
		audio: e
	}, [e.buffer]);
}
async function x(e, t) {
	if (!r || !i) return;
	const a = k(e, t), o = new Float32Array(n.length + a.length);
	for (o.set(n), o.set(a, n.length), n = o; n.length >= p;) {
		const l = n.slice(0, p);
		n = n.slice(p);
		const h = [];
		await i.process(l, (s) => h.push(s));
		for (const s of h) switch (s.msg) {
			case u.Message.SpeechStart:
				c = 0, w({ type: "speech_start" });
				break;
			case u.Message.SpeechEnd:
				c = 0, A(s.audio);
				break;
			case u.Message.VADMisfire:
				c = 0;
				break;
		}
		if (i.speaking) {
			if (c++, c >= P) {
				const s = [];
				i.endSegment((f) => s.push(f));
				for (const f of s) f.msg === u.Message.SpeechEnd && A(f.audio);
				c = 0;
			}
		} else c = 0;
	}
}
function D() {
	if (!i) return;
	const e = [];
	i.endSegment((t) => e.push(t));
	for (const t of e) t.msg === u.Message.SpeechEnd && A(t.audio);
	c = 0;
}
const v = [];
let y = !1;
self.onmessage = (e) => {
	v.push(e.data), I();
};
async function I() {
	if (!y) {
		y = !0;
		try {
			for (; v.length;) {
				const e = v.shift();
				try {
					await R(e);
				} catch (t) {
					w({
						type: "error",
						message: t instanceof Error ? t.message : String(t)
					});
				}
			}
		} finally {
			y = !1;
		}
	}
}
async function R(e) {
	switch (e.type) {
		case "init":
			e.ortWasmBaseUrl && M?.wasm && (M.wasm.wasmPaths = e.ortWasmBaseUrl), await V(e.vadModelUrl);
			break;
		case "audio":
			await x(e.pcm, e.sampleRate);
			break;
		case "flush":
			D();
			break;
		case "dispose":
			r?.session?.release?.(), r = null, i = null, n = /* @__PURE__ */ new Float32Array(0);
			break;
	}
}
