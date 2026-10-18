const P = {
	no: "nb",
	zh: "zh-Hans",
	"zh-cn": "zh-Hans",
	"zh-tw": "zh-Hant",
	"zh-hk": "zh-Hant",
	cantonese: "yue"
}, M = new Set([
	"af",
	"ar",
	"bg",
	"bn",
	"bs",
	"ca",
	"cs",
	"cy",
	"da",
	"de",
	"el",
	"en",
	"es",
	"et",
	"fa",
	"fi",
	"fil",
	"fj",
	"fr",
	"ga",
	"he",
	"hi",
	"hr",
	"ht",
	"hu",
	"id",
	"is",
	"it",
	"ja",
	"kk",
	"km",
	"ko",
	"lt",
	"lv",
	"mg",
	"ml",
	"mr",
	"ms",
	"mt",
	"mww",
	"my",
	"nb",
	"no",
	"nl",
	"or",
	"otq",
	"pa",
	"pl",
	"pt",
	"ro",
	"ru",
	"sk",
	"sl",
	"sm",
	"sr",
	"sv",
	"sw",
	"ta",
	"te",
	"th",
	"tlh",
	"to",
	"tr",
	"ty",
	"uk",
	"ur",
	"vi",
	"yua",
	"yue",
	"zh",
	"zh-cn",
	"zh-tw",
	"zh-hk",
	"cantonese"
].map((t) => t.toLowerCase()));
function b(t) {
	return t ? M.has(t.toLowerCase()) : !1;
}
function T(t) {
	const e = (t || "").toLowerCase();
	if (!M.has(e)) throw new Error(`unsupported language code: "${t}"`);
	return P[e] ?? e;
}
var h = class extends Error {
	errorType = "token";
	constructor(t) {
		super(t), this.name = "BingTokenFetchError";
	}
}, y = class extends Error {
	errorType = "unsupported";
	constructor(t) {
		super(t), this.name = "BingUnsupportedLanguageError";
	}
}, a = class extends Error {
	errorType = "network";
	constructor(t) {
		super(t), this.name = "BingTranslateError";
	}
};
const H = "https://edge.microsoft.com/translate/auth", _ = "https://api-edge.cognitive.microsofttranslator.com/translate", z = 12e3, A = 6e4, B = ["https://www.bing.com", "https://cn.bing.com"];
function D(t) {
	try {
		const e = t.split(".")[1];
		if (!e) return 0;
		const r = e.replace(/-/g, "+").replace(/_/g, "/"), s = r + "=".repeat((4 - r.length % 4) % 4), n = JSON.parse(atob(s));
		return typeof n.exp == "number" ? n.exp * 1e3 : 0;
	} catch {
		return 0;
	}
}
function G(t) {
	const e = t.match(/IG:"([0-9A-Fa-f]+)"/)?.[1];
	if (!e) throw new h("could not find IG in translator page");
	const r = t.match(/data-iid="([^"]+)"/)?.[1];
	if (!r) throw new h("could not find IID in translator page");
	const s = t.match(/params_AbusePreventionHelper\s*=\s*\[\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*\d+\s*\]/);
	if (!s) throw new h("could not find token (params_AbusePreventionHelper) in translator page");
	return {
		ig: e,
		iid: r,
		key: s[1],
		token: s[2]
	};
}
var O = class {
	fetchFn;
	now;
	fetchTimeoutMs;
	preferredTransport;
	scrapeHosts;
	token = null;
	tokenExpiresAt = 0;
	authInFlight = null;
	edgeDisabled = !1;
	scrapeSession = null;
	scrapeInFlight = null;
	constructor(t = {}) {
		this.fetchFn = t.fetchFn ?? fetch.bind(globalThis), this.now = t.now ?? (() => Date.now()), this.fetchTimeoutMs = t.fetchTimeoutMs ?? z, this.preferredTransport = t.transport ?? "auto", this.scrapeHosts = t.scrapeHosts ?? B;
	}
	async translate(t, e, r) {
		if (e.trim().toLowerCase() !== "auto" && !b(e)) throw new y(`source language not supported: ${e}`);
		if (!b(r)) throw new y(`target language not supported: ${r}`);
		const s = this.now(), n = t.trim();
		if (!n) return {
			translatedText: "",
			inferenceTimeMs: 0
		};
		const o = this.transportOrder();
		let i;
		for (const l of o) try {
			return l === "edge" ? await this.translateViaEdge(n, e, r, s) : await this.translateViaScrape(n, e, r, s);
		} catch (c) {
			if (i = c, l === "edge") {
				if (c instanceof h) {
					this.edgeDisabled = !0, this.token = null, this.tokenExpiresAt = 0;
					continue;
				}
				if (c instanceof a && this.looksLikeTokenError(c.message)) {
					this.token = null, this.tokenExpiresAt = 0;
					continue;
				}
			}
		}
		throw i instanceof Error ? i : new a(String(i));
	}
	transportOrder() {
		return this.preferredTransport === "edge" ? ["edge"] : this.preferredTransport === "scrape" ? ["scrape"] : this.edgeDisabled ? ["scrape"] : ["scrape", "edge"];
	}
	looksLikeTokenError(t) {
		return /token|unauthori[sz]ed|401|403|jwt|auth/i.test(t);
	}
	async translateViaEdge(t, e, r, s) {
		try {
			return await this.doEdgeTranslate(t, e, r, s);
		} catch (n) {
			if (n instanceof a && this.looksLikeTokenError(n.message)) return this.token = null, this.tokenExpiresAt = 0, this.authInFlight = null, await this.doEdgeTranslate(t, e, r, s);
			throw n;
		}
	}
	async getEdgeToken() {
		if (this.token && this.tokenExpiresAt > this.now() + A) return this.token;
		if (this.authInFlight) try {
			return await this.authInFlight;
		} catch {}
		return this.authInFlight = this.refreshEdgeToken().finally(() => {
			this.authInFlight = null;
		}), this.authInFlight;
	}
	async refreshEdgeToken() {
		const t = await this.fetchWithTimeout(H, {
			method: "GET",
			headers: { Accept: "*/*" }
		}, (s) => new h(s));
		if (!t.ok) throw new h(`auth request failed: HTTP ${t.status}`);
		const e = (await t.text()).trim();
		if (!e || e.split(".").length < 3) throw new h("auth endpoint did not return a JWT (got empty or non-token body). Check network / region access to edge.microsoft.com.");
		const r = D(e);
		return this.token = e, this.tokenExpiresAt = r > 0 ? r : this.now() + 10 * 6e4, e;
	}
	async doEdgeTranslate(t, e, r, s) {
		const n = await this.getEdgeToken(), o = T(r), i = new URLSearchParams({
			"api-version": "3.0",
			to: o
		});
		e.trim().toLowerCase() !== "auto" && i.set("from", T(e));
		const l = `${_}?${i.toString()}`, c = await this.fetchWithTimeout(l, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${n}`
			},
			body: JSON.stringify([{ Text: t }])
		});
		if (!c.ok) {
			const m = (await c.text().catch(() => "")).slice(0, 200);
			throw new a(`translate request failed: HTTP ${c.status}${m ? ` — ${m}` : ""}`);
		}
		const d = await c.json().catch(() => null);
		if (!Array.isArray(d) || d.length === 0) throw new a("unexpected response shape (not array)");
		const u = d[0];
		if (u.error?.message) throw new a(u.error.message);
		const w = u.translations?.[0]?.text;
		if (typeof w != "string") throw new a("empty translations[]");
		return {
			translatedText: w,
			detectedLanguage: u.detectedLanguage,
			inferenceTimeMs: this.now() - s
		};
	}
	async translateViaScrape(t, e, r, s) {
		try {
			return await this.doScrapeTranslate(t, e, r, s);
		} catch (n) {
			if (n instanceof a && this.looksLikeTokenError(n.message)) return this.scrapeSession = null, await this.doScrapeTranslate(t, e, r, s);
			throw n;
		}
	}
	async getScrapeSession() {
		if (this.scrapeSession && this.scrapeSession.expiresAt > this.now() + A) return this.scrapeSession;
		if (this.scrapeInFlight) try {
			return await this.scrapeInFlight;
		} catch {}
		return this.scrapeInFlight = this.refreshScrapeSession().finally(() => {
			this.scrapeInFlight = null;
		}), this.scrapeInFlight;
	}
	async refreshScrapeSession() {
		let t;
		for (const e of this.scrapeHosts) try {
			const r = await this.fetchScrapeSession(e);
			return this.scrapeSession = r, r;
		} catch (r) {
			t = r;
		}
		throw t instanceof Error ? t : new h(String(t));
	}
	async fetchScrapeSession(t) {
		const e = `${t}/translator`, r = await this.fetchWithTimeout(e, {
			method: "GET",
			headers: { Accept: "text/html,application/xhtml+xml" },
			credentials: "include"
		}, (l) => new h(l));
		if (!r.ok) throw new h(`translator page failed: HTTP ${r.status} (${t})`);
		const s = G(await r.text()), n = Number(s.key), o = Number.isFinite(n) && n > 0 ? n + 55 * 6e4 : this.now() + 55 * 6e4;
		let i = t;
		try {
			r.url && (i = new URL(r.url).origin);
		} catch {}
		return {
			host: i,
			page: s,
			expiresAt: o,
			cookie: I(r.headers)
		};
	}
	async doScrapeTranslate(t, e, r, s) {
		const n = await this.getScrapeSession(), o = e.trim().toLowerCase() === "auto" ? "auto-detect" : T(e), i = T(r), { ig: l, iid: c, key: d, token: u } = n.page, w = `${n.host}/ttranslatev3?isVertical=1&IG=${encodeURIComponent(l)}&IID=${encodeURIComponent(c)}`, m = new URLSearchParams({
			fromLang: o,
			text: t,
			to: i,
			token: u,
			key: d
		}), E = {
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "application/json"
		};
		n.cookie && (E.Cookie = n.cookie);
		const f = await this.fetchWithTimeout(w, {
			method: "POST",
			headers: E,
			body: m.toString(),
			credentials: "include"
		});
		if (!f.ok) {
			const x = (await f.text().catch(() => "")).slice(0, 200);
			throw new a(`ttranslatev3 failed: HTTP ${f.status}${x ? ` — ${x}` : ""}`);
		}
		const p = C(await f.json().catch(() => null));
		if (!p) throw new a("unexpected ttranslatev3 response shape");
		if (p.error?.message) throw new a(p.error.message);
		const S = p.translations?.[0]?.text;
		if (typeof S != "string") throw new a("empty translations[] from ttranslatev3");
		const L = I(f.headers);
		return L && (n.cookie = R(n.cookie, L)), {
			translatedText: S,
			detectedLanguage: p.detectedLanguage,
			usedLLM: p.usedLLM,
			inferenceTimeMs: this.now() - s
		};
	}
	async fetchWithTimeout(t, e, r = (s) => new a(s)) {
		const s = new AbortController(), n = setTimeout(() => s.abort(), this.fetchTimeoutMs);
		try {
			return await this.fetchFn(t, {
				...e,
				signal: s.signal
			});
		} catch (o) {
			throw r(o instanceof Error && o.name === "AbortError" ? `request timed out after ${this.fetchTimeoutMs}ms` : o instanceof Error ? o.message : String(o));
		} finally {
			clearTimeout(n);
		}
	}
};
function C(t) {
	if (!t) return null;
	if (Array.isArray(t)) {
		const e = t[0];
		if (Array.isArray(e)) return C(e);
		if (e && typeof e == "object") return e;
	}
	return typeof t == "object" ? t : null;
}
function I(t) {
	const e = typeof t.getSetCookie == "function" ? t.getSetCookie() : (() => {
		const s = t.get("set-cookie");
		return s ? [s] : [];
	})(), r = [];
	for (const s of e) {
		const n = s.split(";")[0]?.trim();
		n && n.includes("=") && r.push(n);
	}
	return r.join("; ");
}
function R(t, e) {
	const r = /* @__PURE__ */ new Map();
	for (const s of `${t}; ${e}`.split(";")) {
		const n = s.trim();
		if (!n) continue;
		const o = n.indexOf("=");
		o <= 0 || r.set(n.slice(0, o), n.slice(o + 1));
	}
	return [...r.entries()].map(([s, n]) => `${s}=${n}`).join("; ");
}
let k = null, $ = "", F = "";
const v = self;
function g(t) {
	v.postMessage(t);
}
v.onmessage = async (t) => {
	const e = t.data;
	switch (e.type) {
		case "init": {
			const r = performance.now();
			$ = e.sourceLang, F = e.targetLang, k = new O(), g({
				type: "ready",
				device: "cloud",
				loadTimeMs: performance.now() - r
			});
			break;
		}
		case "translate":
			if (!k) {
				g({
					type: "error",
					id: e.id,
					error: "worker not initialized"
				});
				return;
			}
			try {
				const r = await k.translate(e.text, $, F);
				g({
					type: "result",
					id: e.id,
					sourceText: e.text,
					translatedText: r.translatedText,
					inferenceTimeMs: r.inferenceTimeMs,
					detectedLanguage: r.detectedLanguage,
					usedLLM: r.usedLLM
				});
			} catch (r) {
				const s = j(r), n = r instanceof Error ? r.message : String(r);
				g({
					type: "error",
					id: e.id,
					error: `[bing:${s}] ${n}`
				});
			}
			break;
		case "dispose":
			k = null, g({ type: "disposed" });
			break;
	}
};
function j(t) {
	return t instanceof h ? "token" : t instanceof y ? "unsupported" : t instanceof a ? "network" : "unknown";
}
