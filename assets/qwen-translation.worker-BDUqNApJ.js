import { a as m, c as w, d as p, i as y, l as g, n as x, o as M, r as b, s as k, t as _, u as f } from "./hf-transformers-mLQAMob7.js";
self.__transformersPin = [
	p,
	f,
	_,
	m,
	x,
	b,
	w,
	g,
	M,
	k,
	y
];
function P(e) {
	return {
		async match(t) {
			if (!t) return;
			const r = typeof t == "string" ? t : t.url, a = r.indexOf("/resolve/main/");
			if (a === -1) return;
			const s = e[r.slice(a + 14)];
			if (s) return fetch(s);
		},
		async put(t, r) {}
	};
}
function T(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = P(t.fileUrls);
}
const u = {
	ja: "Japanese",
	zh: "Chinese",
	en: "English",
	ko: "Korean",
	de: "German",
	fr: "French",
	es: "Spanish",
	ru: "Russian",
	ar: "Arabic",
	pt: "Portuguese",
	th: "Thai",
	vi: "Vietnamese",
	id: "Indonesian",
	tr: "Turkish",
	nl: "Dutch",
	pl: "Polish",
	it: "Italian",
	hi: "Hindi",
	sv: "Swedish",
	da: "Danish",
	fi: "Finnish",
	hu: "Hungarian",
	ro: "Romanian",
	no: "Norwegian",
	uk: "Ukrainian",
	cs: "Czech",
	et: "Estonian",
	af: "Afrikaans"
}, A = {
	ja: "日本語",
	zh: "中文",
	en: "English",
	ko: "한국어",
	de: "Deutsch",
	fr: "Français",
	es: "Español",
	ru: "Русский",
	ar: "العربية",
	pt: "Português",
	th: "ไทย",
	vi: "Tiếng Việt"
}, I = {
	en: [
		"um",
		"uh",
		"well",
		"like"
	],
	ja: [
		"えーと",
		"あのー",
		"まあ"
	],
	zh: [
		"那个",
		"嗯",
		"就是"
	],
	ko: [
		"음",
		"그",
		"저기"
	]
};
function S(e, t) {
	const r = e === "auto" ? "the detected source language" : u[e] || e, a = u[t] || t, s = A[t], d = s ? `${s} (${a})` : a, c = /* @__PURE__ */ new Set([e, t]), n = /* @__PURE__ */ new Set();
	for (const o of c) for (const i of I[o] || []) n.add(i);
	return n.size === 0 && (n.add("um"), n.add("uh")), `You are a translator. Translate the speech transcript inside <transcript> tags from ${r} to ${d}.
Drop fillers (${Array.from(n).join(", ")}). Fix stuttering and repetitions.
Output ONLY the ${d} translation. No explanation, no refusal.`;
}
let l = null, h = "";
async function C(e) {
	try {
		const t = performance.now();
		self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId
		});
		const r = self.navigator?.gpu;
		if (!r) {
			self.postMessage({
				type: "error",
				error: "WebGPU not available. Qwen translation requires WebGPU."
			});
			return;
		}
		if (!await r.requestAdapter()) {
			self.postMessage({
				type: "error",
				error: "No WebGPU adapter found. Qwen translation requires WebGPU."
			});
			return;
		}
		T(f, e), self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId,
			device: "webgpu"
		}), l = await p("text-generation", e.hfModelId, {
			dtype: e.dtype || "q4",
			device: "webgpu"
		});
		const a = Math.round(performance.now() - t);
		h = e.hfModelId, self.postMessage({
			type: "ready",
			modelId: e.hfModelId,
			loadTimeMs: a,
			device: "webgpu"
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function G(e) {
	if (!l) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: "Qwen model not loaded"
		});
		return;
	}
	try {
		const t = performance.now(), r = h.toLowerCase().includes("qwen3"), a = e.systemPrompt && e.systemPrompt.trim() ? e.systemPrompt : S(e.sourceLang, e.targetLang), s = r ? `${a} /no_think` : a, d = e.wrapTranscript ? `<transcript>${e.text}</transcript>` : e.text, c = await l([{
			role: "system",
			content: s
		}, {
			role: "user",
			content: d
		}], {
			max_new_tokens: 256,
			do_sample: !1,
			temperature: 0,
			tokenizer_encode_kwargs: { enable_thinking: !1 }
		}), n = Math.round(performance.now() - t);
		let o = "";
		if (Array.isArray(c) && c.length > 0) {
			const i = c[0];
			i.generated_text && (Array.isArray(i.generated_text) ? o = i.generated_text[i.generated_text.length - 1]?.content || "" : o = i.generated_text);
		}
		o = o.replace(/<think>[\s\S]*?(<\/think>|$)/g, "").trim(), self.postMessage({
			type: "result",
			id: e.id,
			sourceText: e.text,
			translatedText: o,
			inferenceTimeMs: n,
			systemPrompt: s
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: t.message || String(t)
		});
	}
}
async function N() {
	l && (await l?.dispose?.(), l = null), self.postMessage({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await C(t);
			break;
		case "translate":
			await G(t);
			break;
		case "dispose":
			await N();
			break;
	}
};
