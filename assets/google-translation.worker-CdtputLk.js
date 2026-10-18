const E = {
	zh: "zh-CN",
	"zh-cn": "zh-CN",
	"zh-tw": "zh-TW",
	"zh-hk": "zh-TW",
	cantonese: "zh-TW",
	he: "he",
	nb: "no",
	fil: "tl"
}, y = new Set([
	"af",
	"am",
	"ar",
	"az",
	"be",
	"bg",
	"bn",
	"bs",
	"ca",
	"ceb",
	"co",
	"cs",
	"cy",
	"da",
	"de",
	"el",
	"en",
	"eo",
	"es",
	"et",
	"eu",
	"fa",
	"fi",
	"fil",
	"fr",
	"fy",
	"ga",
	"gd",
	"gl",
	"gu",
	"ha",
	"haw",
	"he",
	"hi",
	"hmn",
	"hr",
	"ht",
	"hu",
	"hy",
	"id",
	"ig",
	"is",
	"it",
	"ja",
	"jv",
	"ka",
	"kk",
	"km",
	"kn",
	"ko",
	"ku",
	"ky",
	"la",
	"lb",
	"lo",
	"lt",
	"lv",
	"mg",
	"mi",
	"mk",
	"ml",
	"mn",
	"mr",
	"ms",
	"mt",
	"my",
	"ne",
	"nl",
	"no",
	"nb",
	"ny",
	"or",
	"pa",
	"pl",
	"ps",
	"pt",
	"ro",
	"ru",
	"rw",
	"sd",
	"si",
	"sk",
	"sl",
	"sm",
	"sn",
	"so",
	"sq",
	"sr",
	"st",
	"su",
	"sv",
	"sw",
	"ta",
	"te",
	"tg",
	"th",
	"tk",
	"tl",
	"tr",
	"tt",
	"ug",
	"uk",
	"ur",
	"uz",
	"vi",
	"xh",
	"yi",
	"yo",
	"zu",
	"zh",
	"zh-cn",
	"zh-tw",
	"zh-hk",
	"cantonese"
].map((t) => t.toLowerCase()));
function p(t) {
	return t ? y.has(t.toLowerCase()) : !1;
}
function m(t) {
	const e = (t || "").toLowerCase();
	if (!y.has(e)) throw new Error(`unsupported language code: "${t}"`);
	return E[e] ?? e;
}
var h = class extends Error {
	errorType = "network";
	constructor(t) {
		super(t), this.name = "GoogleTranslateError";
	}
}, d = class extends Error {
	errorType = "unsupported";
	constructor(t) {
		super(t), this.name = "GoogleUnsupportedLanguageError";
	}
};
const z = "https://translate.googleapis.com/translate_a/single", b = 12e3, G = 1800;
var M = class {
	fetchFn;
	now;
	fetchTimeoutMs;
	endpoint;
	constructor(t = {}) {
		this.fetchFn = t.fetchFn ?? fetch.bind(globalThis), this.now = t.now ?? (() => Date.now()), this.fetchTimeoutMs = t.fetchTimeoutMs ?? b, this.endpoint = t.endpoint ?? z;
	}
	async translate(t, e, n) {
		if (e.trim().toLowerCase() !== "auto" && !p(e)) throw new d(`source language not supported: ${e}`);
		if (!p(n)) throw new d(`target language not supported: ${n}`);
		const a = this.now(), r = t.trim();
		if (!r) return {
			translatedText: "",
			inferenceTimeMs: 0
		};
		const l = x(r), o = [];
		let i;
		for (const s of l) {
			const c = await this.translateChunk(s, e, n);
			c.translatedText && o.push(c.translatedText), i ??= c.detectedLanguage;
		}
		return {
			translatedText: A(o, n),
			detectedLanguage: i,
			inferenceTimeMs: this.now() - a
		};
	}
	async translateChunk(t, e, n) {
		const a = e.trim().toLowerCase() === "auto" ? "auto" : m(e), r = m(n), l = new URLSearchParams({
			client: "gtx",
			dt: "t",
			dj: "1",
			ie: "UTF-8",
			sl: a,
			tl: r,
			q: t
		}), o = `${this.endpoint}?${l.toString()}`, i = await this.fetchWithTimeout(o, {
			method: "GET",
			headers: { Accept: "application/json" }
		});
		if (!i.ok) {
			const g = (await i.text().catch(() => "")).slice(0, 160);
			throw new h(`translate request failed: HTTP ${i.status}${g ? ` — ${g}` : ""}`);
		}
		const s = await i.json().catch(() => null);
		if (!s || !Array.isArray(s.sentences)) throw new h("unexpected response shape (missing sentences[])");
		const c = s.sentences.map((g) => g.trans ?? "").join("").trim();
		if (!c) throw new h("empty translation");
		return {
			translatedText: c,
			detectedLanguage: s.src ? {
				language: s.src,
				score: 1
			} : void 0,
			inferenceTimeMs: 0
		};
	}
	async fetchWithTimeout(t, e) {
		const n = new AbortController(), a = setTimeout(() => n.abort(), this.fetchTimeoutMs);
		try {
			return await this.fetchFn(t, {
				...e,
				signal: n.signal
			});
		} catch (r) {
			throw new h(r instanceof Error && r.name === "AbortError" ? `request timed out after ${this.fetchTimeoutMs}ms` : r instanceof Error ? r.message : String(r));
		} finally {
			clearTimeout(a);
		}
	}
};
function x(t, e = G) {
	const n = t.trim();
	if (!n) return [];
	if (n.length <= e) return [n];
	const a = (i) => {
		const s = [];
		for (let c = 0; c < i.length; c += e) s.push(i.slice(c, c + e));
		return s;
	}, r = [], l = /[^.!?。！？；;]+[.!?。！？；;]?/gu;
	let o = "";
	for (const i of n.match(l) ?? [n]) {
		const s = i.trim();
		if (s) {
			if (s.length > e) {
				o && (r.push(o), o = ""), r.push(...a(s));
				continue;
			}
			if (!o) {
				o = s;
				continue;
			}
			o.length + 1 + s.length <= e ? o = `${o} ${s}`.replace(/\s+/g, " ").trim() : (r.push(o), o = s);
		}
	}
	return o && r.push(o), r.length ? r : a(n);
}
function A(t, e) {
	if (t.length <= 1) return t[0] ?? "";
	const n = /^(zh|ja|yue)/i.test(e) || e.toLowerCase().startsWith("zh");
	return t.map((a) => a.trim()).filter(Boolean).join(n ? "" : " ");
}
let f = null, w = "", T = "";
const k = self;
function u(t) {
	k.postMessage(t);
}
k.onmessage = async (t) => {
	const e = t.data;
	switch (e.type) {
		case "init": {
			const n = performance.now();
			w = e.sourceLang, T = e.targetLang, f = new M(), u({
				type: "ready",
				device: "cloud",
				loadTimeMs: performance.now() - n
			});
			break;
		}
		case "translate":
			if (!f) {
				u({
					type: "error",
					id: e.id,
					error: "worker not initialized"
				});
				return;
			}
			try {
				const n = await f.translate(e.text, w, T);
				u({
					type: "result",
					id: e.id,
					sourceText: e.text,
					translatedText: n.translatedText,
					inferenceTimeMs: n.inferenceTimeMs,
					detectedLanguage: n.detectedLanguage
				});
			} catch (n) {
				const a = S(n), r = n instanceof Error ? n.message : String(n);
				u({
					type: "error",
					id: e.id,
					error: `[google:${a}] ${r}`
				});
			}
			break;
		case "dispose":
			f = null, u({ type: "disposed" });
			break;
	}
};
function S(t) {
	return t instanceof d ? "unsupported" : t instanceof h ? "network" : "unknown";
}
