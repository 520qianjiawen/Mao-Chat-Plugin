import { a as f, c as p, d as i, i as u, l as m, n as h, o as y, r as w, s as M, t as x, u as l } from "./hf-transformers-mLQAMob7.js";
self.__transformersPin = [
	i,
	l,
	x,
	f,
	h,
	w,
	p,
	m,
	y,
	M,
	u
];
function _(e) {
	return {
		async match(t) {
			if (!t) return;
			const a = typeof t == "string" ? t : t.url, s = a.indexOf("/resolve/main/");
			if (s === -1) return;
			const r = e[a.slice(s + 14)];
			if (r) return fetch(r);
		},
		async put(t, a) {}
	};
}
function T(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = _(t.fileUrls);
}
let n = null;
async function b(e) {
	try {
		const t = performance.now();
		self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId
		}), T(l, e);
		const a = console.warn;
		console.warn = (...o) => {
			typeof o[0] == "string" && o[0].includes("MarianTokenizer") || a.apply(console, o);
		};
		const s = "wasm";
		self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId,
			device: s
		}), n = await i("translation", e.hfModelId, {
			dtype: "q8",
			device: s,
			session_options: { graphOptimizationLevel: "basic" }
		}), console.warn = a, e.hfModelId;
		const r = Math.round(performance.now() - t);
		self.postMessage({
			type: "ready",
			modelId: e.hfModelId,
			loadTimeMs: r,
			device: s
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function k(e) {
	if (!n) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: "Translator not initialized"
		});
		return;
	}
	try {
		const t = performance.now(), a = e.text.trim(), s = a.split(/\s+/).filter(Boolean).length > 1 ? Math.ceil(Array.from(a).length / 3) : Array.from(a).length, r = Math.min(192, Math.max(24, s * 2)), o = await n(e.text, {
			max_new_tokens: r,
			repetition_penalty: 1.15,
			no_repeat_ngram_size: 3
		}), c = Math.round(performance.now() - t), d = Array.isArray(o) ? o[0].translation_text : o.translation_text;
		self.postMessage({
			type: "result",
			id: e.id,
			sourceText: e.text,
			translatedText: d,
			inferenceTimeMs: c
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: t.message || String(t)
		});
	}
}
async function g() {
	n && (await n?.dispose?.(), n = null), self.postMessage({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await b(t);
			break;
		case "translate":
			await k(t);
			break;
		case "dispose":
			await g();
			break;
	}
};
