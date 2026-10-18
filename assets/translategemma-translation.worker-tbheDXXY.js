import { a as c, c as f, d as l, i as p, l as u, n as y, o as m, r as g, s as w, t as x, u as d } from "./hf-transformers-mLQAMob7.js";
self.__transformersPin = [
	l,
	d,
	x,
	c,
	y,
	g,
	f,
	u,
	m,
	w,
	p
];
function h(e) {
	return {
		async match(t) {
			if (!t) return;
			const a = typeof t == "string" ? t : t.url, r = a.indexOf("/resolve/main/");
			if (r === -1) return;
			const n = e[a.slice(r + 14)];
			if (n) return fetch(n);
		},
		async put(t, a) {}
	};
}
function M(e, t) {
	e.backends?.onnx?.wasm && (e.backends.onnx.wasm.proxy = !1, t.ortWasmBaseUrl && (e.backends.onnx.wasm.wasmPaths = t.ortWasmBaseUrl)), e.allowRemoteModels = !1, e.allowLocalModels = !0, e.useBrowserCache = !1, e.useCustomCache = !0, e.customCache = h(t.fileUrls);
}
let s = null;
async function b(e) {
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
				error: "WebGPU not available. TranslateGemma requires WebGPU."
			});
			return;
		}
		if (!await a.requestAdapter()) {
			self.postMessage({
				type: "error",
				error: "No WebGPU adapter found. TranslateGemma requires WebGPU."
			});
			return;
		}
		M(d, e), self.postMessage({
			type: "status",
			status: "loading",
			modelId: e.hfModelId,
			device: "webgpu"
		}), s = await l("text-generation", e.hfModelId, {
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
async function _(e) {
	if (!s) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: "TranslateGemma model not loaded"
		});
		return;
	}
	try {
		const t = performance.now(), a = [{
			role: "user",
			content: [{
				type: "text",
				source_lang_code: e.sourceLang,
				target_lang_code: e.targetLang,
				text: e.text
			}]
		}], r = await s(a, { max_new_tokens: 1024 }), n = Math.round(performance.now() - t);
		let i = "";
		if (Array.isArray(r) && r.length > 0) {
			const o = r[0];
			o.generated_text && (Array.isArray(o.generated_text) ? i = o.generated_text[o.generated_text.length - 1]?.content || "" : i = o.generated_text);
		}
		self.postMessage({
			type: "result",
			id: e.id,
			sourceText: e.text,
			translatedText: i,
			inferenceTimeMs: n
		});
	} catch (t) {
		self.postMessage({
			type: "error",
			id: e.id,
			error: t.message || String(t)
		});
	}
}
async function G() {
	if (s) try {
		await s?.dispose?.();
	} catch {} finally {
		s = null;
	}
	self.postMessage({ type: "disposed" });
}
self.onmessage = async (e) => {
	const t = e.data;
	switch (t.type) {
		case "init":
			await b(t);
			break;
		case "translate":
			await _(t);
			break;
		case "dispose":
			await G();
			break;
	}
};
