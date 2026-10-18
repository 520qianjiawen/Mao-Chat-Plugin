import { t as P } from "./rolldown-runtime-B9TO9Vfv.js";
import { n as G, t as J } from "./onnxruntime-web-CyTPs-5B.js";
var z = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.baseAssetPath = void 0;
	const g = typeof window < "u" && typeof window.document < "u" ? window.document.currentScript : null;
	let l = "/";
	g && (l = g.src.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^/]+$/, "/")), e.baseAssetPath = l;
})), N = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.defaultModelFetcher = void 0;
	const g = (l) => fetch(l).then((v) => v.arrayBuffer());
	e.defaultModelFetcher = g;
})), V = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.log = void 0;
	const g = (l) => (v) => {
		console.log(`VAD | ${l} >`, v);
	};
	e.log = {
		error: g("error"),
		debug: g("debug"),
		warn: g("warn")
	};
})), B = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Message = void 0;
	var g;
	(function(l) {
		l.AudioFrame = "AUDIO_FRAME", l.SpeechStart = "SPEECH_START", l.VADMisfire = "VAD_MISFIRE", l.SpeechEnd = "SPEECH_END", l.SpeechStop = "SPEECH_STOP", l.SpeechRealStart = "SPEECH_REAL_START", l.FrameProcessed = "FRAME_PROCESSED";
	})(g || (e.Message = g = {}));
})), L = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.FrameProcessor = e.validateOptions = e.defaultFrameProcessorOptions = void 0;
	const g = V(), l = B();
	e.defaultFrameProcessorOptions = {
		positiveSpeechThreshold: .3,
		negativeSpeechThreshold: .25,
		preSpeechPadMs: 800,
		redemptionMs: 1400,
		minSpeechMs: 400,
		submitUserSpeechOnPause: !1
	};
	function v(t) {
		(t.positiveSpeechThreshold < 0 || t.positiveSpeechThreshold > 1) && g.log.error("positiveSpeechThreshold should be a number between 0 and 1"), (t.negativeSpeechThreshold < 0 || t.negativeSpeechThreshold > t.positiveSpeechThreshold) && g.log.error("negativeSpeechThreshold should be between 0 and positiveSpeechThreshold"), t.preSpeechPadMs < 0 && g.log.error("preSpeechPadMs should be positive"), t.redemptionMs < 0 && g.log.error("redemptionMs should be positive"), t.minSpeechMs < 0 && g.log.error("minSpeechMs should be positive");
	}
	e.validateOptions = v;
	const _ = (t) => {
		const r = t.reduce((h, n) => (h.push(h.at(-1) + n.length), h), [0]), i = new Float32Array(r.at(-1));
		return t.forEach((h, n) => {
			const s = r[n];
			i.set(h, s);
		}), i;
	};
	function m(t, r) {
		return {
			redemptionFrames: Math.floor(t.redemptionMs / r),
			preSpeechPadFrames: Math.floor(t.preSpeechPadMs / r),
			minSpeechFrames: Math.floor(t.minSpeechMs / r)
		};
	}
	var c = class {
		constructor(t, r, i, h) {
			this.modelProcessFunc = t, this.modelResetFunc = r, this.options = i, this.msPerFrame = h, this.speaking = !1, this.redemptionCounter = 0, this.speechFrameCount = 0, this.active = !1, this.speechRealStartFired = !1, this.setOptions = (u) => {
				this.options = {
					...this.options,
					...u
				};
				const { redemptionFrames: p, preSpeechPadFrames: o, minSpeechFrames: y } = m(this.options, this.msPerFrame);
				this.redemptionFrames = p, this.preSpeechPadFrames = o, this.minSpeechFrames = y;
			}, this.reset = () => {
				this.speaking = !1, this.speechRealStartFired = !1, this.audioBuffer = [], this.modelResetFunc(), this.redemptionCounter = 0, this.speechFrameCount = 0;
			}, this.pause = (u) => {
				this.active = !1, this.options.submitUserSpeechOnPause ? this.endSegment(u) : this.reset();
			}, this.resume = () => {
				this.active = !0;
			}, this.endSegment = (u) => {
				const p = this.audioBuffer;
				this.audioBuffer = [];
				const o = this.speaking;
				if (this.reset(), o) if (p.reduce((y, M) => M.isSpeech ? y + 1 : y, 0) >= this.minSpeechFrames) {
					const y = _(p.map((M) => M.frame));
					u({
						msg: l.Message.SpeechEnd,
						audio: y
					});
				} else u({ msg: l.Message.VADMisfire });
				return {};
			}, this.process = async (u, p) => {
				if (!this.active) return;
				const o = await this.modelProcessFunc(u), y = o.isSpeech >= this.options.positiveSpeechThreshold;
				if (p({
					probs: o,
					msg: l.Message.FrameProcessed,
					frame: u
				}), this.audioBuffer.push({
					frame: u,
					isSpeech: y
				}), y && (this.speechFrameCount++, this.redemptionCounter = 0), y && !this.speaking && (this.speaking = !0, p({ msg: l.Message.SpeechStart })), this.speaking && this.speechFrameCount === this.minSpeechFrames && !this.speechRealStartFired && (this.speechRealStartFired = !0, p({ msg: l.Message.SpeechRealStart })), o.isSpeech < this.options.negativeSpeechThreshold && this.speaking && ++this.redemptionCounter >= this.redemptionFrames) {
					this.redemptionCounter = 0, this.speechFrameCount = 0, this.speaking = !1, this.speechRealStartFired = !1;
					const M = this.audioBuffer;
					if (this.audioBuffer = [], M.reduce((S, d) => d.isSpeech ? S + 1 : S, 0) >= this.minSpeechFrames) {
						const S = _(M.map((d) => d.frame));
						p({
							msg: l.Message.SpeechEnd,
							audio: S
						});
					} else p({ msg: l.Message.VADMisfire });
				}
				if (!this.speaking) {
					for (; this.audioBuffer.length > this.preSpeechPadFrames;) this.audioBuffer.shift();
					this.speechFrameCount = 0;
				}
			}, this.audioBuffer = [];
			const { redemptionFrames: n, preSpeechPadFrames: s, minSpeechFrames: a } = m(this.options, this.msPerFrame);
			this.redemptionFrames = n, this.preSpeechPadFrames = s, this.minSpeechFrames = a, this.reset();
		}
	};
	e.FrameProcessor = c;
})), K = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
})), Q = P(((e) => {
	var g;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SileroLegacy = void 0;
	const l = V();
	var v = class {
		constructor(_, m, c, t, r) {
			this.ortInstance = _, this._session = m, this._h = c, this._c = t, this._sr = r, this.reset_state = () => {
				const i = Array(128).fill(0);
				this._h = new this.ortInstance.Tensor("float32", i, [
					2,
					1,
					64
				]), this._c = new this.ortInstance.Tensor("float32", i, [
					2,
					1,
					64
				]);
			}, this.process = async (i) => {
				const h = {
					input: new this.ortInstance.Tensor("float32", i, [1, i.length]),
					h: this._h,
					c: this._c,
					sr: this._sr
				}, n = await this._session.run(h);
				this._h = n.hn, this._c = n.cn;
				const [s] = n.output?.data;
				return {
					notSpeech: 1 - s,
					isSpeech: s
				};
			}, this.release = async () => {
				await this._session.release(), this._h.dispose(), this._c.dispose(), this._sr.dispose();
			};
		}
	};
	e.SileroLegacy = v, g = v, v.new = async (_, m) => {
		l.log.debug("initializing vad");
		const c = await m(), t = await _.InferenceSession.create(c), r = new _.Tensor("int64", [16000n]), i = Array(128).fill(0), h = new _.Tensor("float32", i, [
			2,
			1,
			64
		]), n = new _.Tensor("float32", i, [
			2,
			1,
			64
		]);
		return l.log.debug("vad is initialized"), new g(_, t, h, n, r);
	};
})), X = P(((e) => {
	var g;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SileroV5 = void 0;
	const l = V();
	function v(m) {
		const c = Array(256).fill(0);
		return new m.Tensor("float32", c, [
			2,
			1,
			128
		]);
	}
	var _ = class {
		constructor(m, c, t, r) {
			this._session = m, this._state = c, this._sr = t, this.ortInstance = r, this.reset_state = () => {
				this._state = v(this.ortInstance);
			}, this.process = async (i) => {
				const h = {
					input: new this.ortInstance.Tensor("float32", i, [1, i.length]),
					state: this._state,
					sr: this._sr
				}, n = await this._session.run(h);
				if (!n.stateN) throw new Error("No state from model");
				if (this._state = n.stateN, !n.output?.data) throw new Error("No output from model");
				const s = n.output.data[0];
				if (typeof s != "number") throw new Error("Weird output data");
				return {
					notSpeech: 1 - s,
					isSpeech: s
				};
			}, this.release = async () => {
				await this._session.release(), this._state.dispose(), this._sr.dispose();
			};
		}
	};
	e.SileroV5 = _, g = _, _.new = async (m, c) => {
		l.log.debug("Loading VAD...");
		const t = await c(), r = await m.InferenceSession.create(t), i = new m.Tensor("int64", [16000n]), h = v(m);
		return l.log.debug("...finished loading VAD"), new g(r, h, i, m);
	};
})), k = P(((e) => {
	var g = e && e.__createBinding || (Object.create ? (function(m, c, t, r) {
		r === void 0 && (r = t);
		var i = Object.getOwnPropertyDescriptor(c, t);
		(!i || ("get" in i ? !c.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: function() {
				return c[t];
			}
		}), Object.defineProperty(m, r, i);
	}) : (function(m, c, t, r) {
		r === void 0 && (r = t), m[r] = c[t];
	})), l = e && e.__exportStar || function(m, c) {
		for (var t in m) t !== "default" && !Object.prototype.hasOwnProperty.call(c, t) && g(c, m, t);
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SileroV5 = e.SileroLegacy = void 0, l(K(), e);
	var v = Q();
	Object.defineProperty(e, "SileroLegacy", {
		enumerable: !0,
		get: function() {
			return v.SileroLegacy;
		}
	});
	var _ = X();
	Object.defineProperty(e, "SileroV5", {
		enumerable: !0,
		get: function() {
			return _.SileroV5;
		}
	});
})), I = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Resampler = void 0;
	const g = V();
	var l = class {
		constructor(v) {
			this.options = v, this.process = (_) => {
				const m = [];
				for (const c of _) for (this.inputBuffer.push(c); this.hasEnoughDataForFrame();) {
					const t = this.generateOutputFrame();
					m.push(t);
				}
				return m;
			}, v.nativeSampleRate < 16e3 && g.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"), this.inputBuffer = [];
		}
		async *stream(v) {
			for (const _ of v) for (this.inputBuffer.push(_); this.hasEnoughDataForFrame();) yield this.generateOutputFrame();
		}
		hasEnoughDataForFrame() {
			return this.inputBuffer.length * this.options.targetSampleRate / this.options.nativeSampleRate >= this.options.targetFrameSize;
		}
		generateOutputFrame() {
			const v = new Float32Array(this.options.targetFrameSize);
			let _ = 0, m = 0;
			for (; _ < this.options.targetFrameSize;) {
				let c = 0, t = 0;
				for (; m < Math.min(this.inputBuffer.length, (_ + 1) * this.options.nativeSampleRate / this.options.targetSampleRate);) {
					const r = this.inputBuffer[m];
					r !== void 0 && (c += r, t++), m++;
				}
				v[_] = c / t, _++;
			}
			return this.inputBuffer = this.inputBuffer.slice(m), v;
		}
	};
	e.Resampler = l;
})), Y = P(((e) => {
	var g = e && e.__createBinding || (Object.create ? (function(s, a, u, p) {
		p === void 0 && (p = u);
		var o = Object.getOwnPropertyDescriptor(a, u);
		(!o || ("get" in o ? !a.__esModule : o.writable || o.configurable)) && (o = {
			enumerable: !0,
			get: function() {
				return a[u];
			}
		}), Object.defineProperty(s, p, o);
	}) : (function(s, a, u, p) {
		p === void 0 && (p = u), s[p] = a[u];
	})), l = e && e.__setModuleDefault || (Object.create ? (function(s, a) {
		Object.defineProperty(s, "default", {
			enumerable: !0,
			value: a
		});
	}) : function(s, a) {
		s.default = a;
	}), v = e && e.__importStar || function(s) {
		if (s && s.__esModule) return s;
		var a = {};
		if (s != null) for (var u in s) u !== "default" && Object.prototype.hasOwnProperty.call(s, u) && g(a, s, u);
		return l(a, s), a;
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NonRealTimeVAD = e.defaultNonRealTimeVADOptions = void 0;
	const _ = v(G()), m = z(), c = N(), t = L(), r = B(), i = k(), h = I();
	e.defaultNonRealTimeVADOptions = {
		...t.defaultFrameProcessorOptions,
		modelURL: m.baseAssetPath + "silero_vad_legacy.onnx",
		modelFetcher: c.defaultModelFetcher
	};
	var n = class {
		static async new(s = {}) {
			const a = {
				...e.defaultNonRealTimeVADOptions,
				...s
			};
			(0, t.validateOptions)(a), a.ortConfig !== void 0 && a.ortConfig(_);
			const u = () => a.modelFetcher(a.modelURL), p = await i.SileroLegacy.new(_, u), o = new t.FrameProcessor(p.process, p.reset_state, {
				positiveSpeechThreshold: a.positiveSpeechThreshold,
				negativeSpeechThreshold: a.negativeSpeechThreshold,
				redemptionMs: a.redemptionMs,
				preSpeechPadMs: a.preSpeechPadMs,
				minSpeechMs: a.minSpeechMs,
				submitUserSpeechOnPause: a.submitUserSpeechOnPause
			}, 1536 / 16);
			return o.resume(), new this(u, _, a, o);
		}
		constructor(s, a, u, p) {
			this.modelFetcher = s, this.ort = a, this.options = u, this.frameProcessor = p, this.frameSamples = 1536;
		}
		async *run(s, a) {
			const u = {
				nativeSampleRate: a,
				targetSampleRate: 16e3,
				targetFrameSize: this.frameSamples
			}, p = new h.Resampler(u);
			let o = 0, y = 0, M = 0;
			for await (const d of p.stream(s)) {
				const f = [];
				await this.frameProcessor.process(d, (b) => {
					f.push(b);
				});
				for (const b of f) switch (b.msg) {
					case r.Message.SpeechStart:
						o = M * this.frameSamples / 16;
						break;
					case r.Message.SpeechEnd:
						y = (M + 1) * this.frameSamples / 16, yield {
							audio: b.audio,
							start: o,
							end: y
						};
						break;
					default: break;
				}
				M++;
			}
			const S = [];
			this.frameProcessor.endSegment((d) => {
				S.push(d);
			});
			for (const d of S) d.msg === r.Message.SpeechEnd && (yield {
				audio: d.audio,
				start: o,
				end: M * this.frameSamples / 16
			});
		}
	};
	e.NonRealTimeVAD = n;
})), Z = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.audioFileToArray = e.encodeWAV = e.arrayBufferToBase64 = e.minFramesForTargetMS = void 0;
	function g(r, i, h = 16e3) {
		return Math.ceil(r * h / 1e3 / i);
	}
	e.minFramesForTargetMS = g;
	function l(r) {
		const i = new Uint8Array(r), h = i.byteLength, n = new Array(h);
		for (let s = 0; s < h; s++) {
			const a = i[s];
			if (a === void 0) break;
			n[s] = String.fromCharCode(a);
		}
		return btoa(n.join(""));
	}
	e.arrayBufferToBase64 = l;
	function v(r, i = 3, h = 16e3, n = 1, s = 32) {
		const a = s / 8, u = n * a, p = new ArrayBuffer(44 + r.length * a), o = new DataView(p);
		return c(o, 0, "RIFF"), o.setUint32(4, 36 + r.length * a, !0), c(o, 8, "WAVE"), c(o, 12, "fmt "), o.setUint32(16, 16, !0), o.setUint16(20, i, !0), o.setUint16(22, n, !0), o.setUint32(24, h, !0), o.setUint32(28, h * u, !0), o.setUint16(32, u, !0), o.setUint16(34, s, !0), c(o, 36, "data"), o.setUint32(40, r.length * a, !0), i === 1 ? m(o, 44, r) : _(o, 44, r), p;
	}
	e.encodeWAV = v;
	function _(r, i, h) {
		for (let n = 0; n < h.length; n++, i += 4) r.setFloat32(i, h[n], !0);
	}
	function m(r, i, h) {
		for (let n = 0; n < h.length; n++, i += 2) {
			const s = Math.max(-1, Math.min(1, h[n]));
			r.setInt16(i, s < 0 ? s * 32768 : s * 32767, !0);
		}
	}
	function c(r, i, h) {
		for (let n = 0; n < h.length; n++) r.setUint8(i + n, h.charCodeAt(n));
	}
	async function t(r) {
		const i = new OfflineAudioContext(1, 1, 44100), h = new FileReader();
		let n = null;
		if (await new Promise((u) => {
			h.addEventListener("loadend", () => {
				const p = h.result;
				i.decodeAudioData(p, (o) => {
					n = o, i.startRendering().then(() => {
						console.log("Rendering completed successfully"), u();
					}).catch((y) => {
						console.error("Rendering failed: ", y);
					});
				}, (o) => {
					console.log("Error with decoding audio data: ", o);
				});
			}), h.readAsArrayBuffer(r);
		}), n === null) throw Error("some shit");
		const s = n, a = new Float32Array(s.length);
		for (let u = 0; u < s.length; u++) for (let p = 0; p < s.numberOfChannels; p++) {
			const o = s.getChannelData(p)[u], y = a[u];
			if (o === void 0 || y === void 0) throw new Error("sample or out[i] is undefined");
			a[u] = y + o;
		}
		return {
			audio: a,
			sampleRate: s.sampleRate
		};
	}
	e.audioFileToArray = t;
})), x = P(((e) => {
	var g = e && e.__createBinding || (Object.create ? (function(S, d, f, b) {
		b === void 0 && (b = f);
		var A = Object.getOwnPropertyDescriptor(d, f);
		(!A || ("get" in A ? !d.__esModule : A.writable || A.configurable)) && (A = {
			enumerable: !0,
			get: function() {
				return d[f];
			}
		}), Object.defineProperty(S, b, A);
	}) : (function(S, d, f, b) {
		b === void 0 && (b = f), S[b] = d[f];
	})), l = e && e.__setModuleDefault || (Object.create ? (function(S, d) {
		Object.defineProperty(S, "default", {
			enumerable: !0,
			value: d
		});
	}) : function(S, d) {
		S.default = d;
	}), v = e && e.__importStar || function(S) {
		if (S && S.__esModule) return S;
		var d = {};
		if (S != null) for (var f in S) f !== "default" && Object.prototype.hasOwnProperty.call(S, f) && g(d, S, f);
		return l(d, S), d;
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MicVAD = e.getDefaultRealTimeVADOptions = e.ort = e.DEFAULT_MODEL = void 0;
	const _ = v(J()), m = N(), c = L(), t = V(), r = B(), i = k(), h = I();
	e.DEFAULT_MODEL = "legacy", e.ort = _;
	const n = "vad.worklet.bundle.min.js", s = "silero_vad_v5.onnx", a = "silero_vad_legacy.onnx", u = (S) => ({
		...c.defaultFrameProcessorOptions,
		onFrameProcessed: () => {},
		onVADMisfire: () => {
			t.log.debug("VAD misfire");
		},
		onSpeechStart: () => {
			t.log.debug("Detected speech start");
		},
		onSpeechEnd: () => {
			t.log.debug("Detected speech end");
		},
		onSpeechRealStart: () => {
			t.log.debug("Detected real speech start");
		},
		baseAssetPath: "./",
		onnxWASMBasePath: "./",
		model: S,
		workletOptions: {},
		getStream: async () => await navigator.mediaDevices.getUserMedia({ audio: {
			channelCount: 1,
			echoCancellation: !0,
			autoGainControl: !0,
			noiseSuppression: !0
		} }),
		pauseStream: async (d) => {
			d.getTracks().forEach((f) => {
				f.stop();
			});
		},
		resumeStream: async () => await navigator.mediaDevices.getUserMedia({ audio: {
			channelCount: 1,
			echoCancellation: !0,
			autoGainControl: !0,
			noiseSuppression: !0
		} }),
		ortConfig: (d) => {
			d.env.logLevel = "error";
		},
		startOnLoad: !0,
		processorType: "auto"
	});
	e.getDefaultRealTimeVADOptions = u;
	const p = (S) => "audioWorklet" in S && typeof AudioWorkletNode == "function" ? "AudioWorklet" : "ScriptProcessor";
	async function o(S, d, f, b, A) {
		await f.audioWorklet.addModule(S), d.processorOptions = {
			...d.processorOptions ?? {},
			frameSamples: b
		};
		const D = new AudioWorkletNode(f, "vad-helper-worklet", d);
		return D.port.onmessage = async (O) => {
			const F = O.data;
			if (!(typeof F == "object" && F && "message" in F)) {
				console.error("Invalid message event", F);
				return;
			}
			switch (F.message) {
				case r.Message.AudioFrame:
					if (!("data" in F && F.data instanceof ArrayBuffer)) {
						console.log("Audio frame message has no data");
						return;
					}
					await A(new Float32Array(F.data));
					break;
			}
		}, D;
	}
	async function y(S, d, f) {
		const b = new h.Resampler({
			nativeSampleRate: S.sampleRate,
			targetSampleRate: 16e3,
			targetFrameSize: d
		});
		t.log.debug("using script processor");
		const A = S.createScriptProcessor(4096, 1, 1);
		let D = !1;
		return A.onaudioprocess = async (O) => {
			if (!D) {
				D = !0;
				try {
					const F = O.inputBuffer.getChannelData(0);
					O.outputBuffer.getChannelData(0).fill(0);
					const R = b.process(F);
					for (const E of R) await f(E);
				} catch (F) {
					console.error("Error processing audio:", F);
				} finally {
					D = !1;
				}
			}
		}, A.connect(S.destination), A;
	}
	e.MicVAD = class W {
		constructor(d, f, b, A, D = !1, O = null, F = null, R = null, E = null, C = null, T = null, q = "uninitialized", $ = !1) {
			this.options = d, this.frameProcessor = f, this.model = b, this.frameSamples = A, this.listening = D, this.errored = O, this._stream = F, this._audioContext = R, this._vadNode = E, this._mediaStreamAudioSourceNode = C, this._audioProcessorAdapterType = T, this.initializationState = q, this.ownsAudioContext = $, this.getAudioInstances = () => {
				if (this._stream === null || this._audioContext === null || this._vadNode == null || this._mediaStreamAudioSourceNode == null) throw new Error("MicVAD has null stream, audio context, or processor adapter");
				return {
					stream: this._stream,
					audioContext: this._audioContext,
					vadNode: this._vadNode,
					mediaStreamAudioSourceNode: this._mediaStreamAudioSourceNode
				};
			}, this.setErrored = (w) => {
				this.initializationState = "errored", this.errored = w;
			}, this.start = async () => {
				switch (this.initializationState) {
					case "uninitialized":
						t.log.debug("initializing micVAD"), this.initializationState = "initializing", this.frameProcessor.resume();
						try {
							this._stream = await this.options.getStream();
						} catch (w) {
							throw w instanceof Error ? this.setErrored(w.message) : this.setErrored(String(w)), w;
						}
						if (this.options.audioContext ? (console.log("using custom audio context"), this._audioContext = this.options.audioContext) : (console.log("using default audio context"), this._audioContext = new AudioContext(), this.ownsAudioContext = !0), !this._audioContext) throw this.setErrored("Audio context is null"), Error("Audio context is null");
						switch (this._audioProcessorAdapterType = this.options.processorType == "auto" ? p(this._audioContext) : this.options.processorType, this._audioProcessorAdapterType) {
							case "AudioWorklet":
								this._vadNode = await o(this.options.baseAssetPath + n, this.options.workletOptions, this._audioContext, this.frameSamples, this.processFrame);
								break;
							case "ScriptProcessor":
								this._vadNode = await y(this._audioContext, this.frameSamples, this.processFrame);
								break;
							default: throw new Error(`Unsupported audio processor adapter type: ${this._audioProcessorAdapterType}`);
						}
						this._mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(this._audioContext, { mediaStream: this._stream }), this._mediaStreamAudioSourceNode.connect(this._vadNode), t.log.debug("started micVAD"), this.listening = !0, this.initializationState = "initialized";
						break;
					case "initializing":
						t.log.warn("start called while initializing");
						break;
					case "initialized": {
						if (this.listening) return;
						this.listening = !0, this.frameProcessor.resume();
						const { stream: w, audioContext: j, vadNode: H } = this.getAudioInstances();
						this._stream = await this.options.resumeStream(w);
						const U = new MediaStreamAudioSourceNode(j, { mediaStream: this._stream });
						this._mediaStreamAudioSourceNode = U, U.connect(H);
						break;
					}
					case "destroyed":
						t.log.warn("start called after destroyed");
						break;
					case "errored":
						t.log.error("start called after errored");
						break;
					default:
						t.log.warn("weird initialization state");
						break;
				}
			}, this.pause = async () => {
				if (!this.listening) return;
				this.listening = !1;
				const { stream: w, mediaStreamAudioSourceNode: j } = this.getAudioInstances();
				await this.options.pauseStream(w), j.disconnect(), this.frameProcessor.pause(this.handleFrameProcessorEvent);
			}, this.destroy = async () => {
				t.log.debug("destroy called"), this.initializationState = "destroyed";
				const { vadNode: w } = this.getAudioInstances();
				w instanceof AudioWorkletNode && w.port.postMessage(r.Message.SpeechStop), this.listening && await this.pause(), await this.model.release(), this.ownsAudioContext && await this._audioContext?.close();
			}, this.setOptions = (w) => {
				this.frameProcessor.setOptions(w);
			}, this.processFrame = async (w) => {
				await this.frameProcessor.process(w, this.handleFrameProcessorEvent);
			}, this.handleFrameProcessorEvent = (w) => {
				switch (w.msg) {
					case r.Message.FrameProcessed:
						this.options.onFrameProcessed(w.probs, w.frame);
						break;
					case r.Message.SpeechStart:
						this.options.onSpeechStart();
						break;
					case r.Message.SpeechRealStart:
						this.options.onSpeechRealStart();
						break;
					case r.Message.VADMisfire:
						this.options.onVADMisfire();
						break;
					case r.Message.SpeechEnd:
						this.options.onSpeechEnd(w.audio);
						break;
				}
			};
		}
		static async new(d = {}) {
			const f = {
				...(0, e.getDefaultRealTimeVADOptions)(d.model ?? e.DEFAULT_MODEL),
				...d
			};
			(0, c.validateOptions)(f), e.ort.env.wasm.wasmPaths = f.onnxWASMBasePath, f.ortConfig !== void 0 && f.ortConfig(e.ort);
			const b = f.model === "v5" ? s : a, A = f.baseAssetPath + b, D = f.model === "v5" ? i.SileroV5.new : i.SileroLegacy.new;
			let O;
			try {
				O = await D(e.ort, () => (0, m.defaultModelFetcher)(A));
			} catch (T) {
				throw console.error(`Encountered an error while loading model file ${A}`), T;
			}
			const F = f.model === "v5" ? 512 : 1536, R = F / 16, E = new c.FrameProcessor(O.process, O.reset_state, {
				positiveSpeechThreshold: f.positiveSpeechThreshold,
				negativeSpeechThreshold: f.negativeSpeechThreshold,
				redemptionMs: f.redemptionMs,
				preSpeechPadMs: f.preSpeechPadMs,
				minSpeechMs: f.minSpeechMs,
				submitUserSpeechOnPause: f.submitUserSpeechOnPause
			}, R), C = new W(f, E, O, F);
			if (f.startOnLoad) try {
				await C.start();
			} catch (T) {
				throw console.error("Error starting micVad", T), T;
			}
			return C;
		}
	};
})), re = P(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getDefaultRealTimeVADOptions = e.MicVAD = e.DEFAULT_MODEL = e.utils = e.NonRealTimeVAD = e.Message = e.FrameProcessor = e.defaultModelFetcher = e.baseAssetPath = void 0;
	var g = z();
	Object.defineProperty(e, "baseAssetPath", {
		enumerable: !0,
		get: function() {
			return g.baseAssetPath;
		}
	});
	var l = N();
	Object.defineProperty(e, "defaultModelFetcher", {
		enumerable: !0,
		get: function() {
			return l.defaultModelFetcher;
		}
	});
	var v = L();
	Object.defineProperty(e, "FrameProcessor", {
		enumerable: !0,
		get: function() {
			return v.FrameProcessor;
		}
	});
	var _ = B();
	Object.defineProperty(e, "Message", {
		enumerable: !0,
		get: function() {
			return _.Message;
		}
	});
	var m = Y();
	Object.defineProperty(e, "NonRealTimeVAD", {
		enumerable: !0,
		get: function() {
			return m.NonRealTimeVAD;
		}
	});
	const c = Z();
	e.utils = {
		audioFileToArray: c.audioFileToArray,
		minFramesForTargetMS: c.minFramesForTargetMS,
		arrayBufferToBase64: c.arrayBufferToBase64,
		encodeWAV: c.encodeWAV
	};
	var t = x();
	Object.defineProperty(e, "DEFAULT_MODEL", {
		enumerable: !0,
		get: function() {
			return t.DEFAULT_MODEL;
		}
	}), Object.defineProperty(e, "MicVAD", {
		enumerable: !0,
		get: function() {
			return t.MicVAD;
		}
	}), Object.defineProperty(e, "getDefaultRealTimeVADOptions", {
		enumerable: !0,
		get: function() {
			return t.getDefaultRealTimeVADOptions;
		}
	});
}));
export { re as t };
