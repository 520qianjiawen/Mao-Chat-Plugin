import { a as c, c as u, d as l, i as f, l as p, n as h, o as g, r as m, s as y, t as w, u as d } from "./hf-transformers-mLQAMob7.js";
self.__transformersPin = [
	l,
	d,
	w,
	c,
	h,
	m,
	u,
	p,
	g,
	y,
	f
];
function M(e) {
	return {
		async match(t) {
			if (!t) return;
			const a = typeof t == "string" ? t : t.url, r = a.indexOf("/resolve/main/");
			if (r === -1) return;
			const s = e[a.slice(r + 14)];
			if (s) return fetch(s);
		},
		async put(t, a) {}
	};
}
function b(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = M(t.fileUrls);
}
const x = {
	zh: "Chinese",
	en: "English",
	fr: "French",
	pt: "Portuguese",
	es: "Spanish",
	ja: "Japanese",
	tr: "Turkish",
	ru: "Russian",
	ar: "Arabic",
	ko: "Korean",
	th: "Thai",
	it: "Italian",
	de: "German",
	vi: "Vietnamese",
	ms: "Malay",
	id: "Indonesian",
	tl: "Filipino",
	hi: "Hindi",
	pl: "Polish",
	cs: "Czech",
	nl: "Dutch",
	km: "Khmer",
	my: "Burmese",
	fa: "Persian",
	gu: "Gujarati",
	ur: "Urdu",
	te: "Telugu",
	mr: "Marathi",
	he: "Hebrew",
	bn: "Bengali",
	ta: "Tamil",
	uk: "Ukrainian",
	bo: "Tibetan",
	kk: "Kazakh",
	mn: "Mongolian",
	ug: "Uyghur"
};
let n = null;
async function k(e) {
	try {
		const t = performance.now();
		self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId
		});
		const a = self.navigator?.gpu;
		if (!a) {
			self.postMessage({
				type: "error",
				error: "WebGPU not available. HY-MT translation requires WebGPU."
			});
			return;
		}
		if (!await a.requestAdapter()) {
			self.postMessage({
				type: "error",
				error: "No WebGPU adapter found. HY-MT translation requires WebGPU."
			});
			return;
		}
		b(d, e), self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId,
			device: "webgpu"
		}), n = await l("text-generation", e.hfModelId, {
			dtype: e.dtype || "q4",
			device: "webgpu"
		});
		const r = Math.round(performance.now() - t);
		self.postMessage({
			type: "ready",
			modelId: e.hfModelId,
			loadTimeMs: r,
			device: "webgpu"
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function T(e) {
	if (!n) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: "HY-MT model not loaded"
		});
		return;
	}
	try {
		const t = performance.now(), a = x[e.targetLang];
		a || console.warn(`[hy-mt-worker] Unknown targetLang '${e.targetLang}', falling back to raw code`);
		const r = `Translate the following segment into ${a ?? e.targetLang}, without additional explanation.

${e.text}`, s = await n([{
			role: "user",
			content: r
		}], {
			max_new_tokens: 512,
			do_sample: !1
		});
		let o = "";
		if (Array.isArray(s) && s.length > 0) {
			const i = s[0];
			i?.generated_text && (Array.isArray(i.generated_text) ? o = i.generated_text[i.generated_text.length - 1]?.content || "" : o = i.generated_text);
		}
		o = o.trim(), self.postMessage({
			type: "result",
			id: e.id,
			sourceText: e.text,
			translatedText: o,
			inferenceTimeMs: Math.round(performance.now() - t),
			systemPrompt: r
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: t.message || String(t)
		});
	}
}
async function P() {
	if (n) try {
		await n?.dispose?.();
	} catch {} finally {
		n = null;
	}
	self.postMessage({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await k(t);
			break;
		case "translate":
			await T(t);
			break;
		case "dispose":
			await P();
			break;
	}
};
