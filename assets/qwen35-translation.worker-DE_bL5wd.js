import { a as f, c as _, d as k, i as h, l as b, n as M, o as g, r as x, s as P, t as m, u as w } from "./hf-transformers-mLQAMob7.js";
self.__transformersPin = [
	k,
	w,
	m,
	f,
	M,
	x,
	_,
	b,
	g,
	P,
	h
];
function T(e) {
	return {
		async match(t) {
			if (!t) return;
			const s = typeof t == "string" ? t : t.url, r = s.indexOf("/resolve/main/");
			if (r === -1) return;
			const n = e[s.slice(r + 14)];
			if (n) return fetch(n);
		},
		async put(t, s) {}
	};
}
function S(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = T(t.fileUrls);
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
}, I = {
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
}, C = {
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
function G(e, t) {
	const s = e === "auto" ? "the detected source language" : u[e] || e, r = u[t] || t, n = I[t], l = n ? `${n} (${r})` : r, c = /* @__PURE__ */ new Set([e, t]), a = /* @__PURE__ */ new Set();
	for (const d of c) for (const p of C[d] || []) a.add(p);
	return a.size === 0 && (a.add("um"), a.add("uh")), `You are a translator. Translate the speech transcript inside <transcript> tags from ${s} to ${l}.
Drop fillers (${Array.from(a).join(", ")}). Fix stuttering and repetitions.
Output ONLY the ${l} translation. No explanation, no refusal.`;
}
let i = null, o = null;
async function N(e) {
	try {
		const t = performance.now();
		self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId
		});
		const s = self.navigator?.gpu;
		if (!s) {
			self.postMessage({
				type: "error",
				error: "WebGPU not available. Qwen3.5 translation requires WebGPU."
			});
			return;
		}
		if (!await s.requestAdapter()) {
			self.postMessage({
				type: "error",
				error: "No WebGPU adapter found. Qwen3.5 translation requires WebGPU."
			});
			return;
		}
		S(w, e), self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId,
			device: "webgpu"
		}), o = await m.from_pretrained(e.hfModelId);
		const r = e.dtype || {
			embed_tokens: "q4",
			vision_encoder: "q4",
			decoder_model_merged: "q4"
		};
		i = await h.from_pretrained(e.hfModelId, {
			dtype: r,
			device: "webgpu"
		});
		const n = Math.round(performance.now() - t);
		self.postMessage({
			type: "ready",
			modelId: e.hfModelId,
			loadTimeMs: n,
			device: "webgpu"
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			error: t.message || String(t)
		});
	}
}
async function A(e) {
	if (!i || !o) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: "Qwen3.5 model not loaded"
		});
		return;
	}
	try {
		const t = performance.now(), s = `${e.systemPrompt && e.systemPrompt.trim() ? e.systemPrompt : G(e.sourceLang, e.targetLang)} /no_think`, r = e.wrapTranscript ? `<transcript>${e.text}</transcript>` : e.text, n = [{
			role: "system",
			content: s
		}, {
			role: "user",
			content: r
		}], l = o.apply_chat_template(n, {
			add_generation_prompt: !0,
			tokenizer_kwargs: { enable_thinking: !1 }
		}), c = await o(l);
		let a = "";
		const d = new f(o.tokenizer, {
			skip_prompt: !0,
			skip_special_tokens: !0,
			callback_function: (y) => {
				a += y;
			}
		});
		await i.generate({
			...c,
			max_new_tokens: 256,
			do_sample: !1,
			streamer: d
		}), a = a.trim(), a = a.replace(/<think>[\s\S]*?(<\/think>|$)/g, "").trim();
		const p = Math.round(performance.now() - t);
		self.postMessage({
			type: "result",
			id: e.id,
			sourceText: e.text,
			translatedText: a,
			inferenceTimeMs: p,
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
async function U() {
	i && (await i?.dispose?.(), i = null), o = null, self.postMessage({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await N(t);
			break;
		case "translate":
			await A(t);
			break;
		case "dispose":
			await U();
			break;
	}
};
