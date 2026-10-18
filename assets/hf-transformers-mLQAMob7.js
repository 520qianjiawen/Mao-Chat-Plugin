var rh = Object.defineProperty, i0 = (e, t) => {
	let r = {};
	for (var s in e) rh(r, s, {
		get: e[s],
		enumerable: !0
	});
	return t || rh(r, Symbol.toStringTag, { value: "Module" }), r;
}, Qr = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), l0 = i0({
	InferenceSession: () => li,
	TRACE: () => jn,
	TRACE_EVENT_BEGIN: () => br,
	TRACE_EVENT_END: () => Mr,
	TRACE_FUNC_BEGIN: () => Dr,
	TRACE_FUNC_END: () => zr,
	Tensor: () => St,
	default: () => z0,
	env: () => De,
	registerBackend: () => Or
});
var oi = Object.defineProperty, c0 = Object.getOwnPropertyDescriptor, u0 = Object.getOwnPropertyNames, d0 = Object.prototype.hasOwnProperty, h0 = ((e) => typeof Qr < "u" ? Qr : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof Qr < "u" ? Qr : t)[r] }) : e)(function(e) {
	if (typeof Qr < "u") return Qr.apply(this, arguments);
	throw Error("Dynamic require of \"" + e + "\" is not supported");
}), pe = (e, t) => () => (e && (t = e(e = 0)), t), en = (e, t) => {
	for (var r in t) oi(e, r, {
		get: t[r],
		enumerable: !0
	});
}, f0 = (e, t, r, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (let n of u0(t)) !d0.call(e, n) && n !== r && oi(e, n, {
		get: () => t[n],
		enumerable: !(s = c0(t, n)) || s.enumerable
	});
	return e;
}, Un = (e) => f0(oi({}, "__esModule", { value: !0 }), e), Ds, _r, Or, sh, Nf, Df = pe(() => {
	"use strict";
	Ds = /* @__PURE__ */ new Map(), _r = [], Or = (e, t, r) => {
		if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
			let s = Ds.get(e);
			if (s === void 0) Ds.set(e, {
				backend: t,
				priority: r
			});
			else {
				if (s.priority > r) return;
				if (s.priority === r && s.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${r}`);
			}
			if (r >= 0) {
				let n = _r.indexOf(e);
				n !== -1 && _r.splice(n, 1);
				for (let a = 0; a < _r.length; a++) if (Ds.get(_r[a]).priority <= r) {
					_r.splice(a, 0, e);
					return;
				}
				_r.push(e);
			}
			return;
		}
		throw new TypeError("not a valid backend");
	}, sh = async (e) => {
		let t = Ds.get(e);
		if (!t) return "backend not found.";
		if (t.initialized) return t.backend;
		if (t.aborted) return t.error;
		{
			let r = !!t.initPromise;
			try {
				return r || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend;
			} catch (s) {
				return r || (t.error = `${s}`, t.aborted = !0), t.error;
			} finally {
				delete t.initPromise;
			}
		}
	}, Nf = async (e) => {
		let t = e.executionProviders || [], r = t.map((l) => typeof l == "string" ? l : l.name), s = r.length === 0 ? _r : r, n, a = [], o = /* @__PURE__ */ new Set();
		for (let l of s) {
			let c = await sh(l);
			typeof c == "string" ? a.push({
				name: l,
				err: c
			}) : (n || (n = c), n === c && o.add(l));
		}
		if (!n) throw new Error(`no available backend found. ERR: ${a.map((l) => `[${l.name}] ${l.err}`).join(", ")}`);
		for (let { name: l, err: c } of a) r.includes(l) && console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${c}`);
		let i = t.filter((l) => o.has(typeof l == "string" ? l : l.name));
		return [n, new Proxy(e, { get: (l, c) => c === "executionProviders" ? i : Reflect.get(l, c) })];
	};
}), _0 = pe(() => {
	"use strict";
	Df();
}), zf, p0 = pe(() => {
	"use strict";
	zf = "1.24.0-dev.20251116-b39e144322";
}), lo, Ye, Bf = pe(() => {
	"use strict";
	p0(), lo = "warning", Ye = {
		wasm: {},
		webgl: {},
		webgpu: {},
		versions: { common: zf },
		set logLevel(e) {
			if (e !== void 0) {
				if (typeof e != "string" || [
					"verbose",
					"info",
					"warning",
					"error",
					"fatal"
				].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
				lo = e;
			}
		},
		get logLevel() {
			return lo;
		}
	}, Object.defineProperty(Ye, "logLevel", { enumerable: !0 });
}), De, m0 = pe(() => {
	"use strict";
	Bf(), De = Ye;
}), Rf, Gf, g0 = pe(() => {
	"use strict";
	Rf = (e, t) => {
		let r = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
		r.width = e.dims[3], r.height = e.dims[2];
		let s = r.getContext("2d");
		if (s != null) {
			let n, a;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (n = e.dims[2], a = e.dims[3]) : (n = e.dims[3], a = e.dims[2]);
			let o = t?.format !== void 0 ? t.format : "RGB", i = t?.norm, l, c;
			i === void 0 || i.mean === void 0 ? l = [
				255,
				255,
				255,
				255
			] : typeof i.mean == "number" ? l = [
				i.mean,
				i.mean,
				i.mean,
				i.mean
			] : (l = [
				i.mean[0],
				i.mean[1],
				i.mean[2],
				0
			], i.mean[3] !== void 0 && (l[3] = i.mean[3])), i === void 0 || i.bias === void 0 ? c = [
				0,
				0,
				0,
				0
			] : typeof i.bias == "number" ? c = [
				i.bias,
				i.bias,
				i.bias,
				i.bias
			] : (c = [
				i.bias[0],
				i.bias[1],
				i.bias[2],
				0
			], i.bias[3] !== void 0 && (c[3] = i.bias[3]));
			let d = a * n, h = 0, _ = d, m = d * 2, v = -1;
			o === "RGBA" ? (h = 0, _ = d, m = d * 2, v = d * 3) : o === "RGB" ? (h = 0, _ = d, m = d * 2) : o === "RBG" && (h = 0, m = d, _ = d * 2);
			for (let w = 0; w < a; w++) for (let b = 0; b < n; b++) {
				let M = (e.data[h++] - c[0]) * l[0], E = (e.data[_++] - c[1]) * l[1], A = (e.data[m++] - c[2]) * l[2], k = v === -1 ? 255 : (e.data[v++] - c[3]) * l[3];
				s.fillStyle = "rgba(" + M + "," + E + "," + A + "," + k + ")", s.fillRect(b, w, 1, 1);
			}
			if ("toDataURL" in r) return r.toDataURL();
			throw new Error("toDataURL is not supported");
		} else throw new Error("Can not access image data");
	}, Gf = (e, t) => {
		let r = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), s;
		if (r != null) {
			let n, a, o;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (n = e.dims[2], a = e.dims[1], o = e.dims[3]) : (n = e.dims[3], a = e.dims[2], o = e.dims[1]);
			let i = t !== void 0 && t.format !== void 0 ? t.format : "RGB", l = t?.norm, c, d;
			l === void 0 || l.mean === void 0 ? c = [
				255,
				255,
				255,
				255
			] : typeof l.mean == "number" ? c = [
				l.mean,
				l.mean,
				l.mean,
				l.mean
			] : (c = [
				l.mean[0],
				l.mean[1],
				l.mean[2],
				255
			], l.mean[3] !== void 0 && (c[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? d = [
				0,
				0,
				0,
				0
			] : typeof l.bias == "number" ? d = [
				l.bias,
				l.bias,
				l.bias,
				l.bias
			] : (d = [
				l.bias[0],
				l.bias[1],
				l.bias[2],
				0
			], l.bias[3] !== void 0 && (d[3] = l.bias[3]));
			let h = a * n;
			if (t !== void 0 && (t.format !== void 0 && o === 4 && t.format !== "RGBA" || o === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
			let _ = 4, m = 0, v = 1, w = 2, b = 3, M = 0, E = h, A = h * 2, k = -1;
			i === "RGBA" ? (M = 0, E = h, A = h * 2, k = h * 3) : i === "RGB" ? (M = 0, E = h, A = h * 2) : i === "RBG" && (M = 0, A = h, E = h * 2), s = r.createImageData(n, a);
			for (let C = 0; C < a * n; m += _, v += _, w += _, b += _, C++) s.data[m] = (e.data[M++] - d[0]) * c[0], s.data[v] = (e.data[E++] - d[1]) * c[1], s.data[w] = (e.data[A++] - d[2]) * c[2], s.data[b] = k === -1 ? 255 : (e.data[k++] - d[3]) * c[3];
		} else throw new Error("Can not access image data");
		return s;
	};
}), Tn, $f, Vf, Uf, jf, qf, w0 = pe(() => {
	"use strict";
	ii(), Tn = (e, t) => {
		if (e === void 0) throw new Error("Image buffer must be defined");
		if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
		if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
		let { height: r, width: s } = t, n = t.norm ?? {
			mean: 255,
			bias: 0
		}, a, o;
		typeof n.mean == "number" ? a = [
			n.mean,
			n.mean,
			n.mean,
			n.mean
		] : a = [
			n.mean[0],
			n.mean[1],
			n.mean[2],
			n.mean[3] ?? 255
		], typeof n.bias == "number" ? o = [
			n.bias,
			n.bias,
			n.bias,
			n.bias
		] : o = [
			n.bias[0],
			n.bias[1],
			n.bias[2],
			n.bias[3] ?? 0
		];
		let i = t.format !== void 0 ? t.format : "RGBA", l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", c = r * s, d = l === "RGBA" ? new Float32Array(c * 4) : new Float32Array(c * 3), h = 4, _ = 0, m = 1, v = 2, w = 3, b = 0, M = c, E = c * 2, A = -1;
		i === "RGB" && (h = 3, _ = 0, m = 1, v = 2, w = -1), l === "RGBA" ? A = c * 3 : l === "RBG" ? (b = 0, E = c, M = c * 2) : l === "BGR" && (E = 0, M = c, b = c * 2);
		for (let k = 0; k < c; k++, _ += h, v += h, m += h, w += h) d[b++] = (e[_] + o[0]) / a[0], d[M++] = (e[m] + o[1]) / a[1], d[E++] = (e[v] + o[2]) / a[2], A !== -1 && w !== -1 && (d[A++] = (e[w] + o[3]) / a[3]);
		return l === "RGBA" ? new wt("float32", d, [
			1,
			4,
			r,
			s
		]) : new wt("float32", d, [
			1,
			3,
			r,
			s
		]);
	}, $f = async (e, t) => {
		let r = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, s = typeof ImageData < "u" && e instanceof ImageData, n = typeof ImageBitmap < "u" && e instanceof ImageBitmap, a = typeof e == "string", o, i = t ?? {}, l = () => {
			if (typeof document < "u") return document.createElement("canvas");
			if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
			throw new Error("Canvas is not supported");
		}, c = (d) => typeof HTMLCanvasElement < "u" && d instanceof HTMLCanvasElement || d instanceof OffscreenCanvas ? d.getContext("2d") : null;
		if (r) {
			let d = l();
			d.width = e.width, d.height = e.height;
			let h = c(d);
			if (h != null) {
				let _ = e.height, m = e.width;
				if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (_ = t.resizedHeight, m = t.resizedWidth), t !== void 0) {
					if (i = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
					i.tensorFormat = "RGBA", i.height = _, i.width = m;
				} else i.tensorFormat = "RGBA", i.height = _, i.width = m;
				h.drawImage(e, 0, 0), o = h.getImageData(0, 0, m, _).data;
			} else throw new Error("Can not access image data");
		} else if (s) {
			let d, h;
			if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (d = t.resizedHeight, h = t.resizedWidth) : (d = e.height, h = e.width), t !== void 0 && (i = t), i.format = "RGBA", i.height = d, i.width = h, t !== void 0) {
				let _ = l();
				_.width = h, _.height = d;
				let m = c(_);
				if (m != null) m.putImageData(e, 0, 0), o = m.getImageData(0, 0, h, d).data;
				else throw new Error("Can not access image data");
			} else o = e.data;
		} else if (n) {
			if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
			let d = l();
			d.width = e.width, d.height = e.height;
			let h = c(d);
			if (h != null) {
				let _ = e.height, m = e.width;
				return h.drawImage(e, 0, 0, m, _), o = h.getImageData(0, 0, m, _).data, i.height = _, i.width = m, Tn(o, i);
			} else throw new Error("Can not access image data");
		} else {
			if (a) return new Promise((d, h) => {
				let _ = l(), m = c(_);
				if (!e || !m) return h();
				let v = new Image();
				v.crossOrigin = "Anonymous", v.src = e, v.onload = () => {
					_.width = v.width, _.height = v.height, m.drawImage(v, 0, 0, _.width, _.height);
					let w = m.getImageData(0, 0, _.width, _.height);
					i.height = _.height, i.width = _.width, d(Tn(w.data, i));
				};
			});
			throw new Error("Input data provided is not supported - aborted tensor creation");
		}
		if (o !== void 0) return Tn(o, i);
		throw new Error("Input data provided is not supported - aborted tensor creation");
	}, Vf = (e, t) => {
		let { width: r, height: s, download: n, dispose: a } = t;
		return new wt({
			location: "texture",
			type: "float32",
			texture: e,
			dims: [
				1,
				s,
				r,
				4
			],
			download: n,
			dispose: a
		});
	}, Uf = (e, t) => {
		let { dataType: r, dims: s, download: n, dispose: a } = t;
		return new wt({
			location: "gpu-buffer",
			type: r ?? "float32",
			gpuBuffer: e,
			dims: s,
			download: n,
			dispose: a
		});
	}, jf = (e, t) => {
		let { dataType: r, dims: s, download: n, dispose: a } = t;
		return new wt({
			location: "ml-tensor",
			type: r ?? "float32",
			mlTensor: e,
			dims: s,
			download: n,
			dispose: a
		});
	}, qf = (e, t, r) => new wt({
		location: "cpu-pinned",
		type: e,
		data: t,
		dims: r ?? [t.length]
	});
}), Lr, Us, co, Wf, v0 = pe(() => {
	"use strict";
	Lr = /* @__PURE__ */ new Map([
		["float32", Float32Array],
		["uint8", Uint8Array],
		["int8", Int8Array],
		["uint16", Uint16Array],
		["int16", Int16Array],
		["int32", Int32Array],
		["bool", Uint8Array],
		["float64", Float64Array],
		["uint32", Uint32Array],
		["int4", Uint8Array],
		["uint4", Uint8Array]
	]), Us = /* @__PURE__ */ new Map([
		[Float32Array, "float32"],
		[Uint8Array, "uint8"],
		[Int8Array, "int8"],
		[Uint16Array, "uint16"],
		[Int16Array, "int16"],
		[Int32Array, "int32"],
		[Float64Array, "float64"],
		[Uint32Array, "uint32"]
	]), co = !1, Wf = () => {
		if (!co) {
			co = !0;
			let e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, r = globalThis.Float16Array, s = typeof r < "u" && r.from;
			e && (Lr.set("int64", BigInt64Array), Us.set(BigInt64Array, "int64")), t && (Lr.set("uint64", BigUint64Array), Us.set(BigUint64Array, "uint64")), s ? (Lr.set("float16", r), Us.set(r, "float16")) : Lr.set("float16", Uint16Array);
		}
	};
}), Hf, Qf, y0 = pe(() => {
	"use strict";
	ii(), Hf = (e) => {
		let t = 1;
		for (let r = 0; r < e.length; r++) {
			let s = e[r];
			if (typeof s != "number" || !Number.isSafeInteger(s)) throw new TypeError(`dims[${r}] must be an integer, got: ${s}`);
			if (s < 0) throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${s}`);
			t *= s;
		}
		return t;
	}, Qf = (e, t) => {
		switch (e.location) {
			case "cpu": return new wt(e.type, e.data, t);
			case "cpu-pinned": return new wt({
				location: "cpu-pinned",
				data: e.data,
				type: e.type,
				dims: t
			});
			case "texture": return new wt({
				location: "texture",
				texture: e.texture,
				type: e.type,
				dims: t
			});
			case "gpu-buffer": return new wt({
				location: "gpu-buffer",
				gpuBuffer: e.gpuBuffer,
				type: e.type,
				dims: t
			});
			case "ml-tensor": return new wt({
				location: "ml-tensor",
				mlTensor: e.mlTensor,
				type: e.type,
				dims: t
			});
			default: throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
		}
	};
}), wt, ii = pe(() => {
	"use strict";
	g0(), w0(), v0(), y0(), wt = class {
		constructor(e, t, r) {
			Wf();
			let s, n;
			if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, s = e.type, n = e.dims, e.location) {
				case "cpu-pinned": {
					let o = Lr.get(s);
					if (!o) throw new TypeError(`unsupported type "${s}" to create tensor from pinned buffer`);
					if (!(e.data instanceof o)) throw new TypeError(`buffer should be of type ${o.name}`);
					this.cpuData = e.data;
					break;
				}
				case "texture":
					if (s !== "float32") throw new TypeError(`unsupported type "${s}" to create tensor from texture`);
					this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "gpu-buffer":
					if (s !== "float32" && s !== "float16" && s !== "int32" && s !== "int64" && s !== "uint32" && s !== "uint8" && s !== "bool" && s !== "uint4" && s !== "int4") throw new TypeError(`unsupported type "${s}" to create tensor from gpu buffer`);
					this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "ml-tensor":
					if (s !== "float32" && s !== "float16" && s !== "int32" && s !== "int64" && s !== "uint32" && s !== "uint64" && s !== "int8" && s !== "uint8" && s !== "bool" && s !== "uint4" && s !== "int4") throw new TypeError(`unsupported type "${s}" to create tensor from MLTensor`);
					this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
					break;
				default: throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
			}
			else {
				let o, i;
				if (typeof e == "string") if (s = e, i = r, e === "string") {
					if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array.");
					o = t;
				} else {
					let l = Lr.get(e);
					if (l === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`);
					if (Array.isArray(t)) {
						if (e === "float16" && l === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);
						e === "uint64" || e === "int64" ? o = l.from(t, BigInt) : o = l.from(t);
					} else if (t instanceof l) o = t;
					else if (t instanceof Uint8ClampedArray) if (e === "uint8") o = Uint8Array.from(t);
					else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
					else if (e === "float16" && t instanceof Uint16Array && l !== Uint16Array) o = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);
					else throw new TypeError(`A ${s} tensor's data must be type of ${l}`);
				}
				else if (i = t, Array.isArray(e)) {
					if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
					let l = typeof e[0];
					if (l === "string") s = "string", o = e;
					else if (l === "boolean") s = "bool", o = Uint8Array.from(e);
					else throw new TypeError(`Invalid element type of data array: ${l}.`);
				} else if (e instanceof Uint8ClampedArray) s = "uint8", o = Uint8Array.from(e);
				else {
					let l = Us.get(e.constructor);
					if (l === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
					s = l, o = e;
				}
				if (i === void 0) i = [o.length];
				else if (!Array.isArray(i)) throw new TypeError("A tensor's dims must be a number array");
				n = i, this.cpuData = o, this.dataLocation = "cpu";
			}
			let a = Hf(n);
			if (this.cpuData && a !== this.cpuData.length && !((s === "uint4" || s === "int4") && Math.ceil(a / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);
			this.type = s, this.dims = n, this.size = a;
		}
		static async fromImage(e, t) {
			return $f(e, t);
		}
		static fromTexture(e, t) {
			return Vf(e, t);
		}
		static fromGpuBuffer(e, t) {
			return Uf(e, t);
		}
		static fromMLTensor(e, t) {
			return jf(e, t);
		}
		static fromPinnedBuffer(e, t, r) {
			return qf(e, t, r);
		}
		toDataURL(e) {
			return Rf(this, e);
		}
		toImageData(e) {
			return Gf(this, e);
		}
		get data() {
			if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
			return this.cpuData;
		}
		get location() {
			return this.dataLocation;
		}
		get texture() {
			if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
			return this.gpuTextureData;
		}
		get gpuBuffer() {
			if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
			return this.gpuBufferData;
		}
		get mlTensor() {
			if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
			return this.mlTensorData;
		}
		async getData(e) {
			switch (this.ensureValid(), this.dataLocation) {
				case "cpu":
				case "cpu-pinned": return this.data;
				case "texture":
				case "gpu-buffer":
				case "ml-tensor":
					if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
					if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
					try {
						this.isDownloading = !0;
						let t = await this.downloader();
						return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t;
					} finally {
						this.isDownloading = !1;
					}
				default: throw new Error(`cannot get data from location: ${this.dataLocation}`);
			}
		}
		dispose() {
			if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
			this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
		}
		ensureValid() {
			if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
		}
		reshape(e) {
			if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
			return Qf(this, e);
		}
	};
}), St, Xf = pe(() => {
	"use strict";
	ii(), St = wt;
}), jn, uo, Dr, zr, br, Mr, Yf = pe(() => {
	"use strict";
	Bf(), jn = (e, t) => {
		(typeof Ye.trace > "u" ? !Ye.wasm.trace : !Ye.trace) || console.timeStamp(`${e}::ORT::${t}`);
	}, uo = (e, t) => {
		let r = (/* @__PURE__ */ new Error()).stack?.split(/\r\n|\r|\n/g) || [], s = !1;
		for (let n = 0; n < r.length; n++) {
			if (s && !r[n].includes("TRACE_FUNC")) {
				let a = `FUNC_${e}::${r[n].trim().split(" ")[1]}`;
				t && (a += `::${t}`), jn("CPU", a);
				return;
			}
			r[n].includes("TRACE_FUNC") && (s = !0);
		}
	}, Dr = (e) => {
		(typeof Ye.trace > "u" ? !Ye.wasm.trace : !Ye.trace) || uo("BEGIN", e);
	}, zr = (e) => {
		(typeof Ye.trace > "u" ? !Ye.wasm.trace : !Ye.trace) || uo("END", e);
	}, br = (e) => {
		(typeof Ye.trace > "u" ? !Ye.wasm.trace : !Ye.trace) || console.time(`ORT::${e}`);
	}, Mr = (e) => {
		(typeof Ye.trace > "u" ? !Ye.wasm.trace : !Ye.trace) || console.timeEnd(`ORT::${e}`);
	};
}), Jf, b0 = pe(() => {
	"use strict";
	Df(), Xf(), Yf(), Jf = class Kf {
		constructor(t) {
			this.handler = t;
		}
		async run(t, r, s) {
			Dr(), br("InferenceSession.run");
			let n = {}, a = {};
			if (typeof t != "object" || t === null || t instanceof St || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
			let o = !0;
			if (typeof r == "object") {
				if (r === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
				if (r instanceof St) throw new TypeError("'fetches' cannot be a Tensor");
				if (Array.isArray(r)) {
					if (r.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
					o = !1;
					for (let c of r) {
						if (typeof c != "string") throw new TypeError("'fetches' must be a string array or an object.");
						if (this.outputNames.indexOf(c) === -1) throw new RangeError(`'fetches' contains invalid output name: ${c}.`);
						n[c] = null;
					}
					if (typeof s == "object" && s !== null) a = s;
					else if (typeof s < "u") throw new TypeError("'options' must be an object.");
				} else {
					let c = !1, d = Object.getOwnPropertyNames(r);
					for (let h of this.outputNames) if (d.indexOf(h) !== -1) {
						let _ = r[h];
						(_ === null || _ instanceof St) && (c = !0, o = !1, n[h] = _);
					}
					if (c) {
						if (typeof s == "object" && s !== null) a = s;
						else if (typeof s < "u") throw new TypeError("'options' must be an object.");
					} else a = r;
				}
			} else if (typeof r < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
			for (let c of this.inputNames) if (typeof t[c] > "u") throw new Error(`input '${c}' is missing in 'feeds'.`);
			if (o) for (let c of this.outputNames) n[c] = null;
			let i = await this.handler.run(t, n, a), l = {};
			for (let c in i) if (Object.hasOwnProperty.call(i, c)) {
				let d = i[c];
				d instanceof St ? l[c] = d : l[c] = new St(d.type, d.data, d.dims);
			}
			return Mr("InferenceSession.run"), zr(), l;
		}
		async release() {
			return this.handler.dispose();
		}
		static async create(t, r, s, n) {
			Dr(), br("InferenceSession.create");
			let a, o = {};
			if (typeof t == "string") {
				if (a = t, typeof r == "object" && r !== null) o = r;
				else if (typeof r < "u") throw new TypeError("'options' must be an object.");
			} else if (t instanceof Uint8Array) {
				if (a = t, typeof r == "object" && r !== null) o = r;
				else if (typeof r < "u") throw new TypeError("'options' must be an object.");
			} else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
				let d = t, h = 0, _ = t.byteLength;
				if (typeof r == "object" && r !== null) o = r;
				else if (typeof r == "number") {
					if (h = r, !Number.isSafeInteger(h)) throw new RangeError("'byteOffset' must be an integer.");
					if (h < 0 || h >= d.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);
					if (_ = t.byteLength - h, typeof s == "number") {
						if (_ = s, !Number.isSafeInteger(_)) throw new RangeError("'byteLength' must be an integer.");
						if (_ <= 0 || h + _ > d.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength - h}].`);
						if (typeof n == "object" && n !== null) o = n;
						else if (typeof n < "u") throw new TypeError("'options' must be an object.");
					} else if (typeof s < "u") throw new TypeError("'byteLength' must be a number.");
				} else if (typeof r < "u") throw new TypeError("'options' must be an object.");
				a = new Uint8Array(d, h, _);
			} else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
			let [i, l] = await Nf(o), c = await i.createInferenceSessionHandler(a, l);
			return Mr("InferenceSession.create"), zr(), new Kf(c);
		}
		startProfiling() {
			this.handler.startProfiling();
		}
		endProfiling() {
			this.handler.endProfiling();
		}
		get inputNames() {
			return this.handler.inputNames;
		}
		get outputNames() {
			return this.handler.outputNames;
		}
		get inputMetadata() {
			return this.handler.inputMetadata;
		}
		get outputMetadata() {
			return this.handler.outputMetadata;
		}
	};
}), li, M0 = pe(() => {
	"use strict";
	b0(), li = Jf;
}), x0 = pe(() => {
	"use strict";
}), k0 = pe(() => {
	"use strict";
}), T0 = pe(() => {
	"use strict";
}), E0 = pe(() => {
	"use strict";
}), Zf = {};
en(Zf, {
	InferenceSession: () => li,
	TRACE: () => jn,
	TRACE_EVENT_BEGIN: () => br,
	TRACE_EVENT_END: () => Mr,
	TRACE_FUNC_BEGIN: () => Dr,
	TRACE_FUNC_END: () => zr,
	Tensor: () => St,
	env: () => De,
	registerBackend: () => Or
});
var Br = pe(() => {
	"use strict";
	_0(), m0(), M0(), Xf(), x0(), k0(), Yf(), T0(), E0();
}), ci = pe(() => {
	"use strict";
}), e_ = {};
en(e_, { default: () => t_ });
var ho, fo, t_, A0 = pe(() => {
	"use strict";
	m_(), Rr(), ui(), ho = "ort-wasm-proxy-worker", fo = globalThis.self?.name === ho, fo && (self.onmessage = (e) => {
		let { type: t, in: r } = e.data;
		try {
			switch (t) {
				case "init-wasm":
					di(r.wasm).then(() => {
						mi(r).then(() => {
							postMessage({ type: t });
						}, (s) => {
							postMessage({
								type: t,
								err: s
							});
						});
					}, (s) => {
						postMessage({
							type: t,
							err: s
						});
					});
					break;
				case "init-ep": {
					let { epName: s, env: n } = r;
					gi(n, s).then(() => {
						postMessage({ type: t });
					}, (a) => {
						postMessage({
							type: t,
							err: a
						});
					});
					break;
				}
				case "copy-from": {
					let { buffer: s } = r, n = Hn(s);
					postMessage({
						type: t,
						out: n
					});
					break;
				}
				case "create": {
					let { model: s, options: n } = r;
					wi(s, n).then((a) => {
						postMessage({
							type: t,
							out: a
						});
					}, (a) => {
						postMessage({
							type: t,
							err: a
						});
					});
					break;
				}
				case "release":
					vi(r), postMessage({ type: t });
					break;
				case "run": {
					let { sessionId: s, inputIndices: n, inputs: a, outputIndices: o, options: i } = r;
					yi(s, n, a, o, new Array(o.length).fill(null), i).then((l) => {
						l.some((c) => c[3] !== "cpu") ? postMessage({
							type: t,
							err: "Proxy does not support non-cpu tensor location."
						}) : postMessage({
							type: t,
							out: l
						}, Mi([...a, ...l]));
					}, (l) => {
						postMessage({
							type: t,
							err: l
						});
					});
					break;
				}
				case "end-profiling":
					bi(r), postMessage({ type: t });
					break;
				default:
			}
		} catch (s) {
			postMessage({
				type: t,
				err: s
			});
		}
	}), t_ = fo ? null : (e) => new Worker(e ?? mt, {
		type: "module",
		name: ho
	});
}), r_ = {};
en(r_, { default: () => s_ });
async function nh(e = {}) {
	var t = e, r = !!globalThis.window, s = !!globalThis.WorkerGlobalScope, n = s && self.name?.startsWith("em-pthread");
	t.mountExternalData = (u, f) => {
		u.startsWith("./") && (u = u.substring(2)), (t.Uc || (t.Uc = /* @__PURE__ */ new Map())).set(u, f);
	}, t.unmountExternalData = () => {
		delete t.Uc;
	}, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({
		initial: 0,
		maximum: 0,
		shared: !0
	}).buffer.constructor;
	let a = () => {
		let u = (f) => (...p) => {
			let g = Vt;
			return p = f(...p), Vt != g ? new Promise((y, T) => {
				Va = {
					resolve: y,
					reject: T
				};
			}) : p;
		};
		(() => {
			for (let f of [
				"_OrtAppendExecutionProvider",
				"_OrtCreateSession",
				"_OrtRun",
				"_OrtRunWithBinding",
				"_OrtBindInput"
			]) t[f] = u(t[f]);
		})(), typeof jsepRunAsync < "u" && (t._OrtRun = jsepRunAsync(t._OrtRun), t._OrtRunWithBinding = jsepRunAsync(t._OrtRunWithBinding)), a = void 0;
	};
	t.asyncInit = () => {
		a?.();
	};
	var o, i, l = (u, f) => {
		throw f;
	}, c = import.meta.url, d = "";
	if (r || s) {
		try {
			d = new URL(".", c).href;
		} catch {}
		s && (i = (u) => {
			var f = new XMLHttpRequest();
			return f.open("GET", u, !1), f.responseType = "arraybuffer", f.send(null), new Uint8Array(f.response);
		}), o = async (u) => {
			if (O(u)) return new Promise((p, g) => {
				var y = new XMLHttpRequest();
				y.open("GET", u, !0), y.responseType = "arraybuffer", y.onload = () => {
					y.status == 200 || y.status == 0 && y.response ? p(y.response) : g(y.status);
				}, y.onerror = g, y.send(null);
			});
			var f = await fetch(u, { credentials: "same-origin" });
			if (f.ok) return f.arrayBuffer();
			throw Error(f.status + " : " + f.url);
		};
	}
	var h, _, m, v, w, b, M = console.log.bind(console), E = console.error.bind(console), A = M, k = E, C = !1, O = (u) => u.startsWith("file://");
	function x() {
		hr.buffer != R.buffer && Q();
	}
	if (n) {
		let u = function(f) {
			try {
				var p = f.data, g = p.Oc;
				if (g === "load") {
					let y = [];
					self.onmessage = (T) => y.push(T), b = () => {
						postMessage({ Oc: "loaded" });
						for (let T of y) u(T);
						self.onmessage = u;
					};
					for (let T of p.ce) t[T] && !t[T].proxy || (t[T] = (...P) => {
						postMessage({
							Oc: "callHandler",
							be: T,
							args: P
						});
					}, T == "print" && (A = t[T]), T == "printErr" && (k = t[T]));
					hr = p.ie, Q(), _ = p.je, ut(), kn();
				} else if (g === "run") {
					(function(y) {
						var T = (x(), F)[y + 52 >>> 2 >>> 0];
						y = (x(), F)[y + 56 >>> 2 >>> 0], fd(T, T - y), ee(T);
					})(p.Nc), eo(p.Nc, 0, 0, 1, 0, 0), eu(), Ra(p.Nc), q || (Xu(), q = !0);
					try {
						lw(p.ge, p.Wc);
					} catch (y) {
						if (y != "unwind") throw y;
					}
				} else p.target !== "setimmediate" && (g === "checkMailbox" ? q && mn() : g && (k(`worker: received unknown command ${g}`), k(p)));
			} catch (y) {
				throw ld(), y;
			}
		};
		var q = !1;
		self.onunhandledrejection = (f) => {
			throw f.reason || f;
		}, self.onmessage = u;
	}
	var R, G, W, H, D, F, U, ae, Z, I, N, B = !1;
	function Q() {
		var u = hr.buffer;
		t.HEAP8 = R = new Int8Array(u), W = new Int16Array(u), t.HEAPU8 = G = new Uint8Array(u), H = new Uint16Array(u), t.HEAP32 = D = new Int32Array(u), t.HEAPU32 = F = new Uint32Array(u), U = new Float32Array(u), ae = new Float64Array(u), Z = new BigInt64Array(u), I = new BigUint64Array(u);
	}
	function ue() {
		B = !0, n ? b() : sr._b();
	}
	function de(u) {
		throw k(u = "Aborted(" + u + ")"), C = !0, u = new WebAssembly.RuntimeError(u + ". Build with -sASSERTIONS for more info."), w?.(u), u;
	}
	function ve() {
		return { a: {
			f: cw,
			J: uw,
			k: dw,
			p: hw,
			l: fw,
			sa: _w,
			b: pw,
			ca: mw,
			Ja: ou,
			q: gw,
			da: uu,
			Za: du,
			Fa: hu,
			Ha: fu,
			_a: _u,
			Xa: pu,
			Qa: mu,
			Wa: gu,
			oa: wu,
			Ga: vu,
			Xb: yu,
			Ya: bu,
			Yb: Mu,
			db: ww,
			Da: yw,
			Sb: bw,
			Qb: xw,
			Ca: Tw,
			M: Ew,
			I: Aw,
			Rb: Cw,
			ja: Nw,
			Tb: Dw,
			Ta: zw,
			Vb: Rw,
			Ka: Gw,
			Ob: $w,
			ka: Vw,
			Sa: Ra,
			ab: Uw,
			U: Hw,
			n: Kw,
			c: za,
			rb: Zw,
			w: ev,
			L: tv,
			z: rv,
			j: sv,
			o: Pu,
			sb: nv,
			G: av,
			T: ov,
			h: iv,
			u: lv,
			m: cv,
			i: uv,
			Na: dv,
			Oa: hv,
			Pa: fv,
			La: Ou,
			Ma: Nu,
			Pb: Du,
			eb: pv,
			cb: wv,
			Y: vv,
			qb: yv,
			la: bv,
			bb: mv,
			fb: Mv,
			$a: xv,
			Wb: kv,
			N: _v,
			gb: Tv,
			X: Ev,
			Ub: Av,
			nb: Dv,
			C: zv,
			ra: Bv,
			qa: Rv,
			pb: Gv,
			W: $v,
			v: Vv,
			mb: Uv,
			lb: jv,
			kb: qv,
			ob: Wv,
			jb: Hv,
			ib: Qv,
			hb: Xv,
			Ua: Vu,
			Va: Uu,
			Ia: La,
			V: ju,
			na: qu,
			Ra: Wu,
			ma: Hu,
			Cb: a0,
			xa: Zy,
			Db: n0,
			ya: Ky,
			F: $y,
			e: Cy,
			s: Ey,
			x: Ty,
			B: By,
			Fb: Xy,
			ba: Qy,
			D: Fy,
			za: Yy,
			$: e0,
			ga: Hy,
			Gb: Wy,
			Hb: qy,
			Ba: Vy,
			Aa: jy,
			Ib: Uy,
			wa: s0,
			aa: Jy,
			d: Ay,
			A: Py,
			r: Sy,
			Bb: o0,
			t: Iy,
			y: Ry,
			H: Ly,
			E: Oy,
			K: Gy,
			R: t0,
			ia: zy,
			_: r0,
			Jb: Dy,
			Kb: Ny,
			g: Jv,
			a: hr,
			Nb: Vr,
			Eb: Kv,
			ha: Zv,
			O: ey,
			pa: ty,
			Lb: ry,
			ta: sy,
			Q: ny,
			yb: ay,
			zb: oy,
			ua: iy,
			ea: ly,
			P: cy,
			Ea: uy,
			va: dy,
			Z: hy,
			wb: fy,
			Zb: _y,
			S: py,
			Ab: my,
			tb: gy,
			ub: vy,
			vb: yy,
			fa: by,
			xb: My,
			Mb: xy
		} };
	}
	async function ut() {
		function u(g, y) {
			var T = sr = g.exports;
			g = {};
			for (let [P, L] of Object.entries(T)) typeof L == "function" ? (T = jw(L), g[P] = T) : g[P] = L;
			return sr = g, sr = (function() {
				var P = sr, L = (X) => (me) => X(me) >>> 0, $ = (X) => () => X() >>> 0;
				return (P = Object.assign({}, P)).$b = L(P.$b), P.Cc = $(P.Cc), P.Ec = L(P.Ec), P.rd = ((X) => (me, Y) => X(me, Y) >>> 0)(P.rd), P.wd = L(P.wd), P.xd = $(P.xd), P.Bd = L(P.Bd), P;
			})(), Kc.push(sr.id), Qu = (g = sr).$b, Xu = g.ac, t._OrtInit = g.bc, t._OrtGetLastError = g.cc, t._OrtCreateSessionOptions = g.dc, t._OrtAppendExecutionProvider = g.ec, t._OrtAddFreeDimensionOverride = g.fc, t._OrtAddSessionConfigEntry = g.gc, t._OrtReleaseSessionOptions = g.hc, t._OrtCreateSession = g.ic, t._OrtReleaseSession = g.jc, t._OrtGetInputOutputCount = g.kc, t._OrtGetInputOutputMetadata = g.lc, t._OrtFree = g.mc, t._OrtCreateTensor = g.nc, t._OrtGetTensorData = g.oc, t._OrtReleaseTensor = g.pc, t._OrtCreateRunOptions = g.qc, t._OrtAddRunConfigEntry = g.rc, t._OrtReleaseRunOptions = g.sc, t._OrtCreateBinding = g.tc, t._OrtBindInput = g.uc, t._OrtBindOutput = g.vc, t._OrtClearBoundOutputs = g.wc, t._OrtReleaseBinding = g.xc, t._OrtRunWithBinding = g.yc, t._OrtRun = g.zc, t._OrtEndProfiling = g.Ac, Qa = t._OrtGetWebGpuDevice = g.Bc, Mn = g.Cc, Ct = t._free = g.Dc, Hr = t._malloc = g.Ec, Yu = t._wgpuBufferRelease = g.Fc, Ju = t._wgpuCreateInstance = g.Gc, Ku = g.Hc, Zu = g.Ic, ed = g.Jc, td = g.Kc, rd = g.Lc, sd = g.Pc, nd = g.Zc, ad = g._c, od = g.$c, Xa = g.bd, Ya = g.cd, Ja = g.dd, Ka = g.ed, Is = g.fd, Za = g.gd, id = g.hd, eo = g.kd, ld = g.ld, cd = g.md, ud = g.nd, to = g.od, dd = g.pd, hd = g.qd, ro = g.rd, fe = g.sd, Os = g.td, fd = g.ud, ee = g.vd, xn = g.wd, te = g.xd, _d = g.yd, so = g.zd, pd = g.Ad, md = g.Bd, gd = g.Cd, no = g.Dd, wd = g.Ed, vd = g.Fd, yd = g.Gd, bd = g.Hd, Md = g.Id, xd = g.Jd, kd = g.Kd, Td = g.Ld, Ed = g.Md, Ad = g.Nd, Cd = g.Od, Sd = g.Pd, Pd = g.Qd, Fd = g.Rd, Ld = g.Td, Id = g.Ud, Od = g.Vd, Nd = g.Wd, Dd = g.Yd, zd = g.Zd, Bd = g._d, Rd = g.$d, Gd = g.ae, $d = g.oe, Vd = g.pe, Ud = g.qe, jd = g.re, qd = g.se, Wd = g.te, Hd = g.ue, Qd = g.ve, Xd = g.we, Yd = g.xe, Jd = g.ye, Kd = g.Ye, Zd = g.Ze, eh = g._e, th = g.$e, _ = y, sr;
		}
		var f, p = ve();
		return t.instantiateWasm ? new Promise((g) => {
			t.instantiateWasm(p, (y, T) => {
				g(u(y, T));
			});
		}) : n ? u(new WebAssembly.Instance(_, ve()), _) : (N ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.asyncify.wasm", d) : d + "ort-wasm-simd-threaded.asyncify.wasm" : new URL("" + new URL("ort-wasm-simd-threaded.asyncify-DMmc6YqF.wasm", import.meta.url).href, "" + import.meta.url).href, f = await (async function(g) {
			var y = N;
			if (!h && !O(y)) try {
				var T = fetch(y, { credentials: "same-origin" });
				return await WebAssembly.instantiateStreaming(T, g);
			} catch (P) {
				k(`wasm streaming compile failed: ${P}`), k("falling back to ArrayBuffer instantiation");
			}
			return (async function(P, L) {
				try {
					var $ = await (async function(X) {
						if (!h) try {
							var me = await o(X);
							return new Uint8Array(me);
						} catch {}
						if (X == N && h) X = new Uint8Array(h);
						else {
							if (!i) throw "both async and sync fetching of the wasm failed";
							X = i(X);
						}
						return X;
					})(P);
					return await WebAssembly.instantiate($, L);
				} catch (X) {
					k(`failed to asynchronously prepare wasm: ${X}`), de(X);
				}
			})(y, g);
		})(p), u(f.instance, f.module));
	}
	class Fe {
		name = "ExitStatus";
		constructor(f) {
			this.message = `Program terminated with exit(${f})`, this.status = f;
		}
	}
	var Qe = (u) => {
		u.terminate(), u.onmessage = () => {};
	}, ht = [], be = 0, Le = null, nt = (u) => {
		dr.length == 0 && (ru(), tu(dr[0]));
		var f = dr.pop();
		if (!f) return 6;
		Ps.push(f), Tr[u.Nc] = f, f.Nc = u.Nc;
		var p = {
			Oc: "run",
			ge: u.fe,
			Wc: u.Wc,
			Nc: u.Nc
		};
		return f.postMessage(p, u.Yc), 0;
	}, Me = 0, xe = (u, f, ...p) => {
		var g, y = 16 * p.length, T = te(), P = xn(y), L = P >>> 3;
		for (g of p) typeof g == "bigint" ? ((x(), Z)[L++ >>> 0] = 1n, (x(), Z)[L++ >>> 0] = g) : ((x(), Z)[L++ >>> 0] = 0n, (x(), ae)[L++ >>> 0] = g);
		return u = cd(u, 0, y, P, f), ee(T), u;
	};
	function Vr(u) {
		if (n) return xe(0, 1, u);
		if (m = u, !(0 < Me)) {
			for (var f of Ps) Qe(f);
			for (f of dr) Qe(f);
			dr = [], Ps = [], Tr = {}, C = !0;
		}
		l(0, new Fe(u));
	}
	function Ss(u) {
		if (n) return xe(1, 0, u);
		La(u);
	}
	var La = (u) => {
		if (m = u, n) throw Ss(u), "unwind";
		Vr(u);
	}, dr = [], Ps = [], Kc = [], Tr = {}, Zc = (u) => {
		var f = u.Nc;
		delete Tr[f], dr.push(u), Ps.splice(Ps.indexOf(u), 1), u.Nc = 0, ud(f);
	};
	function eu() {
		Kc.forEach((u) => u());
	}
	var tu = (u) => new Promise((f) => {
		u.onmessage = (y) => {
			var T = y.data;
			if (y = T.Oc, T.Vc && T.Vc != Mn()) {
				var P = Tr[T.Vc];
				P ? P.postMessage(T, T.Yc) : k(`Internal error! Worker sent a message "${y}" to target pthread ${T.Vc}, but that thread no longer exists!`);
			} else y === "checkMailbox" ? mn() : y === "spawnThread" ? nt(T) : y === "cleanupThread" ? dt(() => {
				Zc(Tr[T.he]);
			}) : y === "loaded" ? (u.loaded = !0, f(u)) : T.target === "setimmediate" ? u.postMessage(T) : y === "uncaughtException" ? u.onerror(T.error) : y === "callHandler" ? t[T.be](...T.args) : y && k(`worker sent an unknown command ${y}`);
		}, u.onerror = (y) => {
			throw k(`worker sent an error! ${y.filename}:${y.lineno}: ${y.message}`), y;
		};
		var p, g = [];
		for (p of []) t.propertyIsEnumerable(p) && g.push(p);
		u.postMessage({
			Oc: "load",
			ce: g,
			ie: hr,
			je: _
		});
	});
	function ru() {
		var u = new Worker((() => {
			let f = URL;
			return import.meta.url > "file:" && import.meta.url < "file;" ? new f("ort.webgpu.bundle.min.mjs", import.meta.url) : new URL(import.meta.url);
		})(), {
			type: "module",
			workerData: "em-pthread",
			name: "em-pthread"
		});
		dr.push(u);
	}
	var hr, lw = (u, f) => {
		Me = 0, u = no(u, f), 0 < Me ? m = u : to(u);
	}, _n = [], pn = 0, Ze = (u) => -9007199254740992 > u || 9007199254740992 < u ? NaN : Number(u);
	function cw(u) {
		var f = new Ia(u >>>= 0);
		return (x(), R)[f.Qc + 12 >>> 0] == 0 && (su(f, !0), pn--), nu(f, !1), _n.push(f), md(u);
	}
	var Ur = 0, uw = () => {
		fe(0, 0);
		var u = _n.pop();
		_d(u.Xc), Ur = 0;
	};
	function su(u, f) {
		f = f ? 1 : 0, (x(), R)[u.Qc + 12 >>> 0] = f;
	}
	function nu(u, f) {
		f = f ? 1 : 0, (x(), R)[u.Qc + 13 >>> 0] = f;
	}
	class Ia {
		constructor(f) {
			this.Xc = f, this.Qc = f - 24;
		}
	}
	var Oa = (u) => {
		var f = Ur;
		if (!f) return Os(0), 0;
		var p = new Ia(f);
		(x(), F)[p.Qc + 16 >>> 2 >>> 0] = f;
		var g = (x(), F)[p.Qc + 4 >>> 2 >>> 0];
		if (!g) return Os(0), f;
		for (var y of u) {
			if (y === 0 || y === g) break;
			if (pd(y, g, p.Qc + 16)) return Os(y), f;
		}
		return Os(g), f;
	};
	function dw() {
		return Oa([]);
	}
	function hw(u) {
		return Oa([u >>> 0]);
	}
	function fw(u, f, p, g) {
		return Oa([
			u >>> 0,
			f >>> 0,
			p >>> 0,
			g >>> 0
		]);
	}
	var _w = () => {
		var u = _n.pop();
		u || de("no exception to throw");
		var f = u.Xc;
		throw (x(), R)[u.Qc + 13 >>> 0] == 0 && (_n.push(u), nu(u, !0), su(u, !1), pn++), so(f), Ur = f;
	};
	function pw(u, f, p) {
		var g = new Ia(u >>>= 0);
		throw f >>>= 0, p >>>= 0, (x(), F)[g.Qc + 16 >>> 2 >>> 0] = 0, (x(), F)[g.Qc + 4 >>> 2 >>> 0] = f, (x(), F)[g.Qc + 8 >>> 2 >>> 0] = p, so(u), pn++, Ur = u;
	}
	var mw = () => pn;
	function au(u, f, p, g) {
		return n ? xe(2, 1, u, f, p, g) : ou(u, f, p, g);
	}
	function ou(u, f, p, g) {
		if (u >>>= 0, f >>>= 0, p >>>= 0, g >>>= 0, !globalThis.SharedArrayBuffer) return 6;
		var y = [];
		return n && y.length === 0 ? au(u, f, p, g) : (u = {
			fe: p,
			Nc: u,
			Wc: g,
			Yc: y
		}, n ? (u.Oc = "spawnThread", postMessage(u, y), 0) : nt(u));
	}
	function gw(u) {
		throw Ur ||= u >>> 0, Ur;
	}
	var iu = globalThis.TextDecoder && new TextDecoder(), lu = (u, f, p, g) => {
		if (p = f + p, g) return p;
		for (; u[f] && !(f >= p);) ++f;
		return f;
	}, cu = (u, f = 0, p, g) => {
		if (16 < (p = lu(u, f >>>= 0, p, g)) - f && u.buffer && iu) return iu.decode(u.buffer instanceof ArrayBuffer ? u.subarray(f, p) : u.slice(f, p));
		for (g = ""; f < p;) {
			var y = u[f++];
			if (128 & y) {
				var T = 63 & u[f++];
				if ((224 & y) == 192) g += String.fromCharCode((31 & y) << 6 | T);
				else {
					var P = 63 & u[f++];
					65536 > (y = (240 & y) == 224 ? (15 & y) << 12 | T << 6 | P : (7 & y) << 18 | T << 12 | P << 6 | 63 & u[f++]) ? g += String.fromCharCode(y) : (y -= 65536, g += String.fromCharCode(55296 | y >> 10, 56320 | 1023 & y));
				}
			} else g += String.fromCharCode(y);
		}
		return g;
	}, jr = (u, f, p) => (u >>>= 0) ? cu((x(), G), u, f, p) : "";
	function uu(u, f, p) {
		return n ? xe(3, 1, u, f, p) : 0;
	}
	function du(u, f) {
		if (n) return xe(4, 1, u, f);
	}
	function hu(u, f) {
		if (n) return xe(5, 1, u, f);
	}
	function fu(u, f, p) {
		if (n) return xe(6, 1, u, f, p);
	}
	function _u(u, f, p) {
		return n ? xe(7, 1, u, f, p) : 0;
	}
	function pu(u, f) {
		if (n) return xe(8, 1, u, f);
	}
	function mu(u, f, p) {
		if (n) return xe(9, 1, u, f, p);
	}
	function gu(u, f, p, g) {
		if (n) return xe(10, 1, u, f, p, g);
	}
	function wu(u, f, p, g) {
		if (n) return xe(11, 1, u, f, p, g);
	}
	function vu(u, f, p, g) {
		if (n) return xe(12, 1, u, f, p, g);
	}
	function yu(u) {
		if (n) return xe(13, 1, u);
	}
	function bu(u, f) {
		if (n) return xe(14, 1, u, f);
	}
	function Mu(u, f, p) {
		if (n) return xe(15, 1, u, f, p);
	}
	var ww = () => de(""), $t = (u) => {
		u >>>= 0;
		for (var f = "";;) {
			var p = (x(), G)[u++ >>> 0];
			if (!p) return f;
			f += String.fromCharCode(p);
		}
	}, Na = {}, Da = {}, vw = {}, qr = class extends Error {
		constructor(u) {
			super(u), this.name = "BindingError";
		}
	};
	function Kt(u, f, p = {}) {
		return (function(g, y, T = {}) {
			var P = y.name;
			if (!g) throw new qr(`type "${P}" must have a positive integer typeid pointer`);
			if (Da.hasOwnProperty(g)) {
				if (T.de) return;
				throw new qr(`Cannot register type '${P}' twice`);
			}
			Da[g] = y, delete vw[g], Na.hasOwnProperty(g) && (y = Na[g], delete Na[g], y.forEach((L) => L()));
		})(u, f, p);
	}
	var xu = (u, f, p) => {
		switch (f) {
			case 1: return p ? (g) => (x(), R)[g >>> 0] : (g) => (x(), G)[g >>> 0];
			case 2: return p ? (g) => (x(), W)[g >>> 1 >>> 0] : (g) => (x(), H)[g >>> 1 >>> 0];
			case 4: return p ? (g) => (x(), D)[g >>> 2 >>> 0] : (g) => (x(), F)[g >>> 2 >>> 0];
			case 8: return p ? (g) => (x(), Z)[g >>> 3 >>> 0] : (g) => (x(), I)[g >>> 3 >>> 0];
			default: throw new TypeError(`invalid integer width (${f}): ${u}`);
		}
	};
	function yw(u, f, p, g, y) {
		u >>>= 0, p >>>= 0, f = $t(f >>> 0);
		let T = (P) => P;
		if (g = g === 0n) {
			let P = 8 * p;
			T = (L) => BigInt.asUintN(P, L), y = T(y);
		}
		Kt(u, {
			name: f,
			Mc: T,
			Sc: (P, L) => (typeof L == "number" && (L = BigInt(L)), L),
			Rc: xu(f, p, !g),
			Tc: null
		});
	}
	function bw(u, f, p, g) {
		Kt(u >>>= 0, {
			name: f = $t(f >>> 0),
			Mc: function(y) {
				return !!y;
			},
			Sc: function(y, T) {
				return T ? p : g;
			},
			Rc: function(y) {
				return this.Mc((x(), G)[y >>> 0]);
			},
			Tc: null
		});
	}
	var ku = [], Er = [
		0,
		1,
		,
		1,
		null,
		1,
		!0,
		1,
		!1,
		1
	];
	function za(u) {
		9 < (u >>>= 0) && --Er[u + 1] == 0 && (Er[u] = void 0, ku.push(u));
	}
	var bt = (u) => {
		if (!u) throw new qr(`Cannot use deleted val. handle = ${u}`);
		return Er[u];
	}, At = (u) => {
		switch (u) {
			case void 0: return 2;
			case null: return 4;
			case !0: return 6;
			case !1: return 8;
			default:
				let f = ku.pop() || Er.length;
				return Er[f] = u, Er[f + 1] = 1, f;
		}
	};
	function Ba(u) {
		return this.Mc((x(), F)[u >>> 2 >>> 0]);
	}
	var Mw = {
		name: "emscripten::val",
		Mc: (u) => {
			var f = bt(u);
			return za(u), f;
		},
		Sc: (u, f) => At(f),
		Rc: Ba,
		Tc: null
	};
	function xw(u) {
		return Kt(u >>> 0, Mw);
	}
	var kw = (u, f) => {
		switch (f) {
			case 4: return function(p) {
				return this.Mc((x(), U)[p >>> 2 >>> 0]);
			};
			case 8: return function(p) {
				return this.Mc((x(), ae)[p >>> 3 >>> 0]);
			};
			default: throw new TypeError(`invalid float width (${f}): ${u}`);
		}
	};
	function Tw(u, f, p) {
		p >>>= 0, Kt(u >>>= 0, {
			name: f = $t(f >>> 0),
			Mc: (g) => g,
			Sc: (g, y) => y,
			Rc: kw(f, p),
			Tc: null
		});
	}
	function Ew(u, f, p, g, y) {
		u >>>= 0, p >>>= 0, f = $t(f >>> 0);
		let T = (L) => L;
		if (g === 0) {
			var P = 32 - 8 * p;
			T = (L) => L << P >>> P, y = T(y);
		}
		Kt(u, {
			name: f,
			Mc: T,
			Sc: (L, $) => $,
			Rc: xu(f, p, g !== 0),
			Tc: null
		});
	}
	function Aw(u, f, p) {
		function g(T) {
			var P = (x(), F)[T >>> 2 >>> 0];
			return T = (x(), F)[T + 4 >>> 2 >>> 0], new y((x(), R).buffer, T, P);
		}
		var y = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array,
			BigInt64Array,
			BigUint64Array
		][f];
		Kt(u >>>= 0, {
			name: p = $t(p >>> 0),
			Mc: g,
			Rc: g
		}, { de: !0 });
	}
	var Zt = (u, f, p) => {
		var g = (x(), G);
		if (f >>>= 0, 0 < p) {
			var y = f;
			p = f + p - 1;
			for (var T = 0; T < u.length; ++T) {
				var P = u.codePointAt(T);
				if (127 >= P) {
					if (f >= p) break;
					g[f++ >>> 0] = P;
				} else if (2047 >= P) {
					if (f + 1 >= p) break;
					g[f++ >>> 0] = 192 | P >> 6, g[f++ >>> 0] = 128 | 63 & P;
				} else if (65535 >= P) {
					if (f + 2 >= p) break;
					g[f++ >>> 0] = 224 | P >> 12, g[f++ >>> 0] = 128 | P >> 6 & 63, g[f++ >>> 0] = 128 | 63 & P;
				} else {
					if (f + 3 >= p) break;
					g[f++ >>> 0] = 240 | P >> 18, g[f++ >>> 0] = 128 | P >> 12 & 63, g[f++ >>> 0] = 128 | P >> 6 & 63, g[f++ >>> 0] = 128 | 63 & P, T++;
				}
			}
			g[f >>> 0] = 0, u = f - y;
		} else u = 0;
		return u;
	}, er = (u) => {
		for (var f = 0, p = 0; p < u.length; ++p) {
			var g = u.charCodeAt(p);
			127 >= g ? f++ : 2047 >= g ? f += 2 : 55296 <= g && 57343 >= g ? (f += 4, ++p) : f += 3;
		}
		return f;
	};
	function Cw(u, f) {
		Kt(u >>>= 0, {
			name: f = $t(f >>> 0),
			Mc(p) {
				var g = (x(), F)[p >>> 2 >>> 0];
				return g = jr(p + 4, g, !0), Ct(p), g;
			},
			Sc(p, g) {
				g instanceof ArrayBuffer && (g = new Uint8Array(g));
				var y = typeof g == "string";
				if (!(y || ArrayBuffer.isView(g) && g.BYTES_PER_ELEMENT == 1)) throw new qr("Cannot pass non-string to std::string");
				var T = y ? er(g) : g.length, P = Hr(4 + T + 1), L = P + 4;
				return (x(), F)[P >>> 2 >>> 0] = T, y ? Zt(g, L, T + 1) : (x(), G).set(g, L >>> 0), p !== null && p.push(Ct, P), P;
			},
			Rc: Ba,
			Tc(p) {
				Ct(p);
			}
		});
	}
	var Tu = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, Sw = (u, f, p) => {
		if (u >>>= 1, 16 < (f = lu((x(), H), u, f / 2, p)) - u && Tu) return Tu.decode((x(), H).slice(u, f));
		for (p = ""; u < f; ++u) {
			var g = (x(), H)[u >>> 0];
			p += String.fromCharCode(g);
		}
		return p;
	}, Pw = (u, f, p) => {
		if (p ??= 2147483647, 2 > p) return 0;
		var g = f;
		p = (p -= 2) < 2 * u.length ? p / 2 : u.length;
		for (var y = 0; y < p; ++y) {
			var T = u.charCodeAt(y);
			(x(), W)[f >>> 1 >>> 0] = T, f += 2;
		}
		return (x(), W)[f >>> 1 >>> 0] = 0, f - g;
	}, Fw = (u) => 2 * u.length, Lw = (u, f, p) => {
		var g = "";
		u >>>= 2;
		for (var y = 0; !(y >= f / 4); y++) {
			var T = (x(), F)[u + y >>> 0];
			if (!T && !p) break;
			g += String.fromCodePoint(T);
		}
		return g;
	}, Iw = (u, f, p) => {
		if (f >>>= 0, p ??= 2147483647, 4 > p) return 0;
		var g = f;
		p = g + p - 4;
		for (var y = 0; y < u.length; ++y) {
			var T = u.codePointAt(y);
			if (65535 < T && y++, (x(), D)[f >>> 2 >>> 0] = T, (f += 4) + 4 > p) break;
		}
		return (x(), D)[f >>> 2 >>> 0] = 0, f - g;
	}, Ow = (u) => {
		for (var f = 0, p = 0; p < u.length; ++p) 65535 < u.codePointAt(p) && p++, f += 4;
		return f;
	};
	function Nw(u, f, p) {
		if (u >>>= 0, f >>>= 0, p = $t(p >>>= 0), f === 2) var g = Sw, y = Pw, T = Fw;
		else g = Lw, y = Iw, T = Ow;
		Kt(u, {
			name: p,
			Mc: (P) => {
				var L = (x(), F)[P >>> 2 >>> 0];
				return L = g(P + 4, L * f, !0), Ct(P), L;
			},
			Sc: (P, L) => {
				if (typeof L != "string") throw new qr(`Cannot pass non-string to C++ string type ${p}`);
				var $ = T(L), X = Hr(4 + $ + f);
				return (x(), F)[X >>> 2 >>> 0] = $ / f, y(L, X + 4, $ + f), P !== null && P.push(Ct, X), X;
			},
			Rc: Ba,
			Tc(P) {
				Ct(P);
			}
		});
	}
	function Dw(u, f) {
		Kt(u >>>= 0, {
			ee: !0,
			name: f = $t(f >>> 0),
			Mc: () => {},
			Sc: () => {}
		});
	}
	function zw(u) {
		eo(u >>> 0, !s, 1, !r, 131072, !1), eu();
	}
	var dt = (u) => {
		if (!C) try {
			if (u(), !(0 < Me)) try {
				n ? Mn() && to(m) : La(m);
			} catch (f) {
				f instanceof Fe || f == "unwind" || l(0, f);
			}
		} catch (f) {
			f instanceof Fe || f == "unwind" || l(0, f);
		}
	}, Bw = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
	function Ra(u) {
		u >>>= 0, Bw || (Atomics.waitAsync((x(), D), u >>> 2, u).value.then(mn), u += 128, Atomics.store((x(), D), u >>> 2, 1));
	}
	var mn = () => dt(() => {
		var u = Mn();
		u && (Ra(u), hd());
	});
	function Rw(u, f) {
		(u >>>= 0) == f >>> 0 ? setTimeout(mn) : n ? postMessage({
			Vc: u,
			Oc: "checkMailbox"
		}) : (u = Tr[u]) && u.postMessage({ Oc: "checkMailbox" });
	}
	var Ga = [];
	function Gw(u, f, p, g, y) {
		for (f >>>= 0, y >>>= 0, Ga.length = 0, p = y >>> 3, g = y + g >>> 3; p < g;) {
			var T = (x(), Z)[p++ >>> 0] ? (x(), Z)[p++ >>> 0] : (x(), ae)[p++ >>> 0];
			Ga.push(T);
		}
		return (f ? ao[f] : ky[u])(...Ga);
	}
	var $w = () => {
		Me = 0;
	};
	function Vw(u) {
		u >>>= 0, n ? postMessage({
			Oc: "cleanupThread",
			he: u
		}) : Zc(Tr[u]);
	}
	function Uw(u) {}
	var gn = (u) => {
		try {
			u();
		} catch (f) {
			de(f);
		}
	};
	function jw(u) {
		var f = (...p) => {
			wn.push(u);
			try {
				return u(...p);
			} finally {
				C || (wn.pop(), Vt && fr === 1 && wn.length === 0 && (fr = 0, Me += 1, gn(Zd), typeof Fibers < "u" && Fibers.Be()));
			}
		};
		return Cu.set(u, f), f;
	}
	var fr = 0, Vt = null, Eu = 0, wn = [], $a = /* @__PURE__ */ new Map(), Au = /* @__PURE__ */ new Map(), Cu = /* @__PURE__ */ new Map(), qw = 0, Va = null, Ww = [], Su = (u) => (function(f) {
		if (!C) {
			if (fr === 0) {
				var p = !1, g = !1;
				f((y = 0) => {
					if (!C && (Eu = y, p = !0, g)) {
						fr = 2, gn(() => eh(Vt)), typeof MainLoop < "u" && MainLoop.Xd && MainLoop.resume(), y = !1;
						try {
							var T = (function() {
								var $ = (x(), D)[Vt + 8 >>> 2 >>> 0];
								return $ = Au.get($), $ = Cu.get($), --Me, $();
							})();
						} catch ($) {
							T = $, y = !0;
						}
						var P = !1;
						if (!Vt) {
							var L = Va;
							L && (Va = null, (y ? L.reject : L.resolve)(T), P = !0);
						}
						if (y && !P) throw T;
					}
				}), g = !0, p || (fr = 1, Vt = (function() {
					var y = Hr(65548), T = y + 12;
					if ((x(), F)[y >>> 2 >>> 0] = T, (x(), F)[y + 4 >>> 2 >>> 0] = T + 65536, T = wn[0], !$a.has(T)) {
						var P = qw++;
						$a.set(T, P), Au.set(P, T);
					}
					return T = $a.get(T), (x(), D)[y + 8 >>> 2 >>> 0] = T, y;
				})(), typeof MainLoop < "u" && MainLoop.Xd && MainLoop.pause(), gn(() => Kd(Vt)));
			} else fr === 2 ? (fr = 0, gn(th), Ct(Vt), Vt = null, Ww.forEach(dt)) : de(`invalid state: ${fr}`);
			return Eu;
		}
	})((f) => {
		u().then(f);
	});
	function Hw(u) {
		return u >>>= 0, Su(async () => At(await bt(u)));
	}
	var Ua = [], Qw = (u) => {
		var f = Ua.length;
		return Ua.push(u), f;
	}, Xw = (u, f) => {
		for (var p = Array(u), g = 0; g < u; ++g) {
			var y = g, T = (x(), F)[f + 4 * g >>> 2 >>> 0], P = Da[T];
			if (P === void 0) throw u = `parameter ${g}`, T = Qu(T), f = $t(T), Ct(T), new qr(`${u} has unknown type ${f}`);
			p[y] = P;
		}
		return p;
	}, Yw = (u, f, p) => {
		var g = [];
		return u = u(g, p), g.length && ((x(), F)[f >>> 2 >>> 0] = At(g)), u;
	}, Jw = {}, vn = (u) => {
		var f = Jw[u];
		return f === void 0 ? $t(u) : f;
	};
	function Kw(u, f, p) {
		var [g, ...y] = Xw(u, f >>> 0);
		f = g.Sc.bind(g);
		var T = y.map(($) => $.Rc.bind($));
		u--;
		var P = { toValue: bt };
		switch (u = T.map(($, X) => {
			var me = `argFromPtr${X}`;
			return P[me] = $, `${me}(args${X ? "+" + 8 * X : ""})`;
		}), p) {
			case 0:
				var L = "toValue(handle)";
				break;
			case 2:
				L = "new (toValue(handle))";
				break;
			case 3:
				L = "";
				break;
			case 1: P.getStringOrSymbol = vn, L = "toValue(handle)[getStringOrSymbol(methodName)]";
		}
		return L += `(${u})`, g.ee || (P.toReturnWire = f, P.emval_returnValue = Yw, L = `return emval_returnValue(toReturnWire, destructorsRef, ${L})`), L = `return function (handle, methodName, destructorsRef, args) {
  ${L}
  }`, p = new Function(Object.keys(P), L)(...Object.values(P)), L = `methodCaller<(${y.map(($) => $.name)}) => ${g.name}>`, Qw(Object.defineProperty(p, "name", { value: L }));
	}
	function Zw(u, f) {
		return f >>>= 0, (u = bt(u >>> 0)) == bt(f);
	}
	function ev(u) {
		return (u >>>= 0) ? (u = vn(u), At(globalThis[u])) : At(globalThis);
	}
	function tv(u) {
		return u = vn(u >>> 0), At(t[u]);
	}
	function rv(u, f) {
		return f >>>= 0, u = bt(u >>> 0), f = bt(f), At(u[f]);
	}
	function sv(u) {
		9 < (u >>>= 0) && (Er[u + 1] += 1);
	}
	function Pu(u, f, p, g, y) {
		return Ua[u >>> 0](f >>> 0, p >>> 0, g >>> 0, y >>> 0);
	}
	function nv(u, f, p, g, y) {
		return Pu(u >>> 0, f >>> 0, p >>> 0, g >>> 0, y >>> 0);
	}
	function av() {
		return At([]);
	}
	function ov(u) {
		u = bt(u >>> 0);
		for (var f = Array(u.length), p = 0; p < u.length; p++) f[p] = u[p];
		return At(f);
	}
	function iv(u) {
		return At(vn(u >>> 0));
	}
	function lv() {
		return At({});
	}
	function cv(u) {
		for (var f = bt(u >>>= 0); f.length;) {
			var p = f.pop();
			f.pop()(p);
		}
		za(u);
	}
	function uv(u, f, p) {
		f >>>= 0, p >>>= 0, u = bt(u >>> 0), f = bt(f), p = bt(p), u[f] = p;
	}
	function dv(u, f) {
		u = Ze(u), f >>>= 0, u = /* @__PURE__ */ new Date(1e3 * u), (x(), D)[f >>> 2 >>> 0] = u.getUTCSeconds(), (x(), D)[f + 4 >>> 2 >>> 0] = u.getUTCMinutes(), (x(), D)[f + 8 >>> 2 >>> 0] = u.getUTCHours(), (x(), D)[f + 12 >>> 2 >>> 0] = u.getUTCDate(), (x(), D)[f + 16 >>> 2 >>> 0] = u.getUTCMonth(), (x(), D)[f + 20 >>> 2 >>> 0] = u.getUTCFullYear() - 1900, (x(), D)[f + 24 >>> 2 >>> 0] = u.getUTCDay(), u = (u.getTime() - Date.UTC(u.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (x(), D)[f + 28 >>> 2 >>> 0] = u;
	}
	var Fu = (u) => u % 4 == 0 && (u % 100 != 0 || u % 400 == 0), Lu = [
		0,
		31,
		60,
		91,
		121,
		152,
		182,
		213,
		244,
		274,
		305,
		335
	], Iu = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	function hv(u, f) {
		u = Ze(u), f >>>= 0, u = /* @__PURE__ */ new Date(1e3 * u), (x(), D)[f >>> 2 >>> 0] = u.getSeconds(), (x(), D)[f + 4 >>> 2 >>> 0] = u.getMinutes(), (x(), D)[f + 8 >>> 2 >>> 0] = u.getHours(), (x(), D)[f + 12 >>> 2 >>> 0] = u.getDate(), (x(), D)[f + 16 >>> 2 >>> 0] = u.getMonth(), (x(), D)[f + 20 >>> 2 >>> 0] = u.getFullYear() - 1900, (x(), D)[f + 24 >>> 2 >>> 0] = u.getDay();
		var p = (Fu(u.getFullYear()) ? Lu : Iu)[u.getMonth()] + u.getDate() - 1 | 0;
		(x(), D)[f + 28 >>> 2 >>> 0] = p, (x(), D)[f + 36 >>> 2 >>> 0] = -60 * u.getTimezoneOffset(), p = new Date(u.getFullYear(), 6, 1).getTimezoneOffset();
		var g = new Date(u.getFullYear(), 0, 1).getTimezoneOffset();
		u = 0 | (p != g && u.getTimezoneOffset() == Math.min(g, p)), (x(), D)[f + 32 >>> 2 >>> 0] = u;
	}
	function fv(u) {
		u >>>= 0;
		var f = new Date((x(), D)[u + 20 >>> 2 >>> 0] + 1900, (x(), D)[u + 16 >>> 2 >>> 0], (x(), D)[u + 12 >>> 2 >>> 0], (x(), D)[u + 8 >>> 2 >>> 0], (x(), D)[u + 4 >>> 2 >>> 0], (x(), D)[u >>> 2 >>> 0], 0), p = (x(), D)[u + 32 >>> 2 >>> 0], g = f.getTimezoneOffset(), y = new Date(f.getFullYear(), 6, 1).getTimezoneOffset(), T = new Date(f.getFullYear(), 0, 1).getTimezoneOffset(), P = Math.min(T, y);
		return 0 > p ? (x(), D)[u + 32 >>> 2 >>> 0] = +(y != T && P == g) : 0 < p != (P == g) && (y = Math.max(T, y), f.setTime(f.getTime() + 6e4 * ((0 < p ? P : y) - g))), (x(), D)[u + 24 >>> 2 >>> 0] = f.getDay(), p = (Fu(f.getFullYear()) ? Lu : Iu)[f.getMonth()] + f.getDate() - 1 | 0, (x(), D)[u + 28 >>> 2 >>> 0] = p, (x(), D)[u >>> 2 >>> 0] = f.getSeconds(), (x(), D)[u + 4 >>> 2 >>> 0] = f.getMinutes(), (x(), D)[u + 8 >>> 2 >>> 0] = f.getHours(), (x(), D)[u + 12 >>> 2 >>> 0] = f.getDate(), (x(), D)[u + 16 >>> 2 >>> 0] = f.getMonth(), (x(), D)[u + 20 >>> 2 >>> 0] = f.getYear(), u = f.getTime(), BigInt(isNaN(u) ? -1 : u / 1e3);
	}
	function Ou(u, f, p, g, y, T, P) {
		return n ? xe(16, 1, u, f, p, g, y, T, P) : -52;
	}
	function Nu(u, f, p, g, y, T) {
		if (n) return xe(17, 1, u, f, p, g, y, T);
	}
	var Fs = {}, _v = () => performance.timeOrigin + performance.now();
	function Du(u, f) {
		return n ? xe(18, 1, u, f) : (Fs[u] && (clearTimeout(Fs[u].id), delete Fs[u]), f && (Fs[u] = {
			id: setTimeout(() => {
				delete Fs[u], dt(() => dd(u, performance.timeOrigin + performance.now()));
			}, f),
			Ae: f
		}), 0);
	}
	function pv(u, f, p, g) {
		u >>>= 0, f >>>= 0, p >>>= 0, g >>>= 0;
		var y = (/* @__PURE__ */ new Date()).getFullYear(), T = new Date(y, 0, 1).getTimezoneOffset();
		y = new Date(y, 6, 1).getTimezoneOffset();
		var P = Math.max(T, y);
		(x(), F)[u >>> 2 >>> 0] = 60 * P, (x(), D)[f >>> 2 >>> 0] = +(T != y), u = (f = (L) => {
			var $ = Math.abs(L);
			return `UTC${0 <= L ? "-" : "+"}${String(Math.floor($ / 60)).padStart(2, "0")}${String($ % 60).padStart(2, "0")}`;
		})(T), f = f(y), y < T ? (Zt(u, p, 17), Zt(f, g, 17)) : (Zt(u, g, 17), Zt(f, p, 17));
	}
	var mv = () => Date.now(), gv = 1;
	function wv(u, f, p) {
		if (p >>>= 0, !(0 <= u && 3 >= u)) return 28;
		if (u === 0) u = Date.now();
		else {
			if (!gv) return 52;
			u = performance.timeOrigin + performance.now();
		}
		return u = Math.round(1e6 * u), (x(), Z)[p >>> 3 >>> 0] = BigInt(u), 0;
	}
	var ja = [], zu = (u, f) => {
		ja.length = 0;
		for (var p; p = (x(), G)[u++ >>> 0];) {
			var g = p != 105;
			f += (g &= p != 112) && f % 8 ? 4 : 0, ja.push(p == 112 ? (x(), F)[f >>> 2 >>> 0] : p == 106 ? (x(), Z)[f >>> 3 >>> 0] : p == 105 ? (x(), D)[f >>> 2 >>> 0] : (x(), ae)[f >>> 3 >>> 0]), f += g ? 8 : 4;
		}
		return ja;
	};
	function vv(u, f, p) {
		return u >>>= 0, f = zu(f >>> 0, p >>> 0), ao[u](...f);
	}
	function yv(u, f, p) {
		return u >>>= 0, f = zu(f >>> 0, p >>> 0), ao[u](...f);
	}
	var bv = () => {};
	function Mv(u, f) {
		return k(jr(u >>> 0, f >>> 0));
	}
	var xv = () => {
		throw Me += 1, "unwind";
	};
	function kv() {
		return 4294901760;
	}
	var Tv = () => 1, Ev = () => navigator.hardwareConcurrency;
	function Av(u) {
		u >>>= 0;
		var f = (x(), G).length;
		if (u <= f || 4294901760 < u) return !1;
		for (var p = 1; 4 >= p; p *= 2) {
			var g = f * (1 + .2 / p);
			g = Math.min(g, u + 100663296);
			e: {
				g = (Math.min(4294901760, 65536 * Math.ceil(Math.max(u, g) / 65536)) - hr.buffer.byteLength + 65535) / 65536 | 0;
				try {
					hr.grow(g), Q();
					var y = 1;
					break e;
				} catch {}
				y = void 0;
			}
			if (y) return !0;
		}
		return !1;
	}
	var Ut = (u) => {
		var f = er(u) + 1, p = xn(f);
		return Zt(u, p, f), p;
	}, qa = (u, f) => {
		(x(), F)[u >>> 2 >>> 0] = f;
		var p = (x(), F)[u >>> 2 >>> 0];
		(x(), F)[u + 4 >>> 2 >>> 0] = (f - p) / 4294967296;
	}, Ls = (u) => (x(), F)[u >>> 2 >>> 0] + 4294967296 * (x(), D)[u + 4 >>> 2 >>> 0], et = [], Cv = (u, f) => {
		et[u >>> 0] = f;
	}, tr = [], yn = [], Wr = (u, f) => {
		yn[u] = new Promise((p) => f.finally(() => p(u)));
	}, K = (u) => {
		if (u) return et[u >>> 0];
	}, Sv = (u, f) => {
		for (u = (x(), F)[u >>> 2 >>> 0]; u; u = (x(), F)[u >>> 2 >>> 0]) f[(x(), D)[u + 4 >>> 2 >>> 0]](u);
	}, bn = (u, f, p) => {
		(x(), F)[u >>> 2 >>> 0] = f, (x(), F)[u + 4 >>> 2 >>> 0] = p;
	}, Bu = (u) => {
		var f = (x(), F)[u >>> 2 >>> 0];
		return u = (x(), F)[u + 4 >>> 2 >>> 0], jr(f, u);
	}, rr = (u) => {
		var f = (x(), F)[u >>> 2 >>> 0];
		return u = (x(), F)[u + 4 >>> 2 >>> 0], f ? jr(f, u) : u === 0 ? "" : void 0;
	}, Pv = (u) => {
		var f = rr(u + 4), p = (p = (x(), F)[u + 12 >>> 2 >>> 0]) ? K(p) : "auto";
		if (u += 16) {
			var g = K((x(), F)[u + 4 >>> 2 >>> 0]), y = (x(), F)[u + 16 >>> 2 >>> 0], T = (x(), F)[u + 20 >>> 2 >>> 0];
			if (y) {
				for (var P = {}, L = 0; L < y; ++L) {
					var $ = T + 24 * L;
					P[Bu($ + 4)] = (x(), ae)[$ + 16 >>> 3 >>> 0];
				}
				y = P;
			} else y = void 0;
			u = {
				module: g,
				constants: y,
				entryPoint: rr(u + 8)
			};
		} else u = void 0;
		return {
			label: f,
			layout: p,
			compute: u
		};
	}, Ru = (u, f) => {
		function p(g, y) {
			g = u[g], (x(), F)[f + y >>> 2 >>> 0] = g;
		}
		p("maxTextureDimension1D", 4), p("maxTextureDimension2D", 8), p("maxTextureDimension3D", 12), p("maxTextureArrayLayers", 16), p("maxBindGroups", 20), p("maxBindGroupsPlusVertexBuffers", 24), p("maxBindingsPerBindGroup", 28), p("maxDynamicUniformBuffersPerPipelineLayout", 32), p("maxDynamicStorageBuffersPerPipelineLayout", 36), p("maxSampledTexturesPerShaderStage", 40), p("maxSamplersPerShaderStage", 44), p("maxStorageBuffersPerShaderStage", 48), p("maxStorageTexturesPerShaderStage", 52), p("maxUniformBuffersPerShaderStage", 56), p("minUniformBufferOffsetAlignment", 80), p("minStorageBufferOffsetAlignment", 84), qa(f + 64, u.maxUniformBufferBindingSize), qa(f + 72, u.maxStorageBufferBindingSize), p("maxVertexBuffers", 88), qa(f + 96, u.maxBufferSize), p("maxVertexAttributes", 104), p("maxVertexBufferArrayStride", 108), p("maxInterStageShaderVariables", 112), p("maxColorAttachments", 116), p("maxColorAttachmentBytesPerSample", 120), p("maxComputeWorkgroupStorageSize", 124), p("maxComputeInvocationsPerWorkgroup", 128), p("maxComputeWorkgroupSizeX", 132), p("maxComputeWorkgroupSizeY", 136), p("maxComputeWorkgroupSizeZ", 140), p("maxComputeWorkgroupsPerDimension", 144), u.ze !== void 0 && p("maxImmediateSize", 148);
	}, Fv = [
		,
		"validation",
		"out-of-memory",
		"internal"
	], Lv = [
		,
		"compatibility",
		"core"
	], Gu = {
		1: "core-features-and-limits",
		2: "depth-clip-control",
		3: "depth32float-stencil8",
		4: "texture-compression-bc",
		5: "texture-compression-bc-sliced-3d",
		6: "texture-compression-etc2",
		7: "texture-compression-astc",
		8: "texture-compression-astc-sliced-3d",
		9: "timestamp-query",
		10: "indirect-first-instance",
		11: "shader-f16",
		12: "rg11b10ufloat-renderable",
		13: "bgra8unorm-storage",
		14: "float32-filterable",
		15: "float32-blendable",
		16: "clip-distances",
		17: "dual-source-blending",
		18: "subgroups",
		19: "texture-formats-tier1",
		20: "texture-formats-tier2",
		21: "primitive-index",
		22: "texture-component-swizzle",
		327692: "chromium-experimental-unorm16-texture-formats",
		327729: "chromium-experimental-multi-draw-indirect"
	}, Iv = [
		,
		"low-power",
		"high-performance"
	], Ov = [
		,
		"occlusion",
		"timestamp"
	], Nv = {
		undefined: 1,
		unknown: 1,
		destroyed: 2
	};
	function Dv(u, f, p, g, y, T) {
		f = Ze(f), p = Ze(p), g >>>= 0, y >>>= 0, T >>>= 0;
		var P = K(u >>> 0);
		if (u = {}, T) {
			var L = (x(), F)[T + 12 >>> 2 >>> 0];
			if (L) {
				var $ = (x(), F)[T + 16 >>> 2 >>> 0];
				u.requiredFeatures = Array.from((x(), F).subarray($ >>> 2 >>> 0, $ + 4 * L >>> 2 >>> 0), (Y) => Gu[Y]);
			}
			var X = (x(), F)[T + 20 >>> 2 >>> 0];
			if (X) {
				let Y = function(Pe, Xe, Ns = !1) {
					Xe = X + Xe, (Xe = (x(), F)[Xe >>> 2 >>> 0]) == 4294967295 || Ns && Xe == 0 || (me[Pe] = Xe);
				}, he = function(Pe, Xe) {
					Xe = X + Xe;
					var Ns = (x(), F)[Xe >>> 2 >>> 0], oo = (x(), F)[Xe + 4 >>> 2 >>> 0];
					Ns == 4294967295 && oo == 4294967295 || (me[Pe] = Ls(Xe));
				};
				var me = {};
				Y("maxTextureDimension1D", 4), Y("maxTextureDimension2D", 8), Y("maxTextureDimension3D", 12), Y("maxTextureArrayLayers", 16), Y("maxBindGroups", 20), Y("maxBindGroupsPlusVertexBuffers", 24), Y("maxDynamicUniformBuffersPerPipelineLayout", 32), Y("maxDynamicStorageBuffersPerPipelineLayout", 36), Y("maxSampledTexturesPerShaderStage", 40), Y("maxSamplersPerShaderStage", 44), Y("maxStorageBuffersPerShaderStage", 48), Y("maxStorageTexturesPerShaderStage", 52), Y("maxUniformBuffersPerShaderStage", 56), Y("minUniformBufferOffsetAlignment", 80), Y("minStorageBufferOffsetAlignment", 84), he("maxUniformBufferBindingSize", 64), he("maxStorageBufferBindingSize", 72), Y("maxVertexBuffers", 88), he("maxBufferSize", 96), Y("maxVertexAttributes", 104), Y("maxVertexBufferArrayStride", 108), Y("maxInterStageShaderVariables", 112), Y("maxColorAttachments", 116), Y("maxColorAttachmentBytesPerSample", 120), Y("maxComputeWorkgroupStorageSize", 124), Y("maxComputeInvocationsPerWorkgroup", 128), Y("maxComputeWorkgroupSizeX", 132), Y("maxComputeWorkgroupSizeY", 136), Y("maxComputeWorkgroupSizeZ", 140), Y("maxComputeWorkgroupsPerDimension", 144), Y("maxImmediateSize", 148, !0), u.requiredLimits = me;
			}
			(L = (x(), F)[T + 24 >>> 2 >>> 0]) && (L = { label: rr(L + 4) }, u.defaultQueue = L), u.label = rr(T + 4);
		}
		Me += 1, Wr(f, P.requestDevice(u).then((Y) => {
			--Me, dt(() => {
				et[y >>> 0] = Y.queue, et[g >>> 0] = Y, Me += 1, Wr(p, Y.lost.then((he) => {
					dt(() => {
						Y.onuncapturederror = () => {};
						var Pe = te(), Xe = Ut(he.message);
						Ya(p, Nv[he.reason], Xe), ee(Pe);
					}), --Me;
				})), Y.onuncapturederror = (he) => {
					var Pe = 5;
					he.error instanceof GPUValidationError ? Pe = 2 : he.error instanceof GPUOutOfMemoryError ? Pe = 3 : he.error instanceof GPUInternalError && (Pe = 4);
					var Xe = te();
					he = Ut(he.error.message), id(g, Pe, he), ee(Xe);
				}, "adapterInfo" in Y || (Y.adapterInfo = P.info), Za(f, 1, g, 0);
			});
		}, (Y) => {
			--Me, dt(() => {
				var he = te(), Pe = Ut(Y.message);
				Za(f, 3, g, Pe), p && Ya(p, 4, Pe), ee(he);
			});
		}));
	}
	function zv(u) {
		var f = K(u >>>= 0), p = tr[u];
		if (p) {
			for (var g = 0; g < p.length; ++g) p[g]();
			delete tr[u];
		}
		f.destroy();
	}
	function Bv(u, f, p) {
		p >>>= 0;
		var g = K(u >>>= 0);
		p == 4294967295 && (p = void 0);
		try {
			var y = g.getMappedRange(f >>> 0, p);
		} catch {
			return 0;
		}
		var T = ro(16, y.byteLength);
		return (x(), G).set(new Uint8Array(y), T >>> 0), tr[u].push(() => Ct(T)), T;
	}
	function Rv(u, f, p) {
		p >>>= 0;
		var g = K(u >>>= 0);
		p == 4294967295 && (p = void 0);
		try {
			var y = g.getMappedRange(f >>> 0, p);
		} catch {
			return 0;
		}
		var T = ro(16, y.byteLength);
		return (x(), G).fill(0, T, y.byteLength), tr[u].push(() => {
			new Uint8Array(y).set((x(), G).subarray(T >>> 0, T + y.byteLength >>> 0)), Ct(T);
		}), T;
	}
	function Gv(u, f, p, g, y) {
		u >>>= 0, f = Ze(f), p = Ze(p), y >>>= 0;
		var T = K(u);
		tr[u] = [], y == 4294967295 && (y = void 0), Me += 1, Wr(f, T.mapAsync(p, g >>> 0, y).then(() => {
			--Me, dt(() => {
				Ja(f, 1, 0);
			});
		}, (P) => {
			--Me, dt(() => {
				te();
				var L = Ut(P.message);
				Ja(f, P.name === "AbortError" ? 4 : P.name === "OperationError" ? 3 : 0, L), delete tr[u];
			});
		}));
	}
	function $v(u) {
		var f = K(u >>>= 0), p = tr[u];
		if (p) {
			for (var g = 0; g < p.length; ++g) p[g]();
			delete tr[u], f.unmap();
		}
	}
	function Vv(u) {
		delete et[u >>> 0];
	}
	function Uv(u, f, p) {
		u >>>= 0, f >>>= 0, p >>>= 0;
		var g = !!(x(), F)[f + 32 >>> 2 >>> 0];
		f = {
			label: rr(f + 4),
			usage: (x(), F)[f + 16 >>> 2 >>> 0],
			size: Ls(f + 24),
			mappedAtCreation: g
		}, u = K(u);
		try {
			var y = u.createBuffer(f);
		} catch {
			return !1;
		}
		return et[p >>> 0] = y, g && (tr[p] = []), !0;
	}
	function jv(u, f, p, g) {
		u >>>= 0, f = Ze(f), g >>>= 0, p = Pv(p >>> 0), u = K(u), Me += 1, Wr(f, u.createComputePipelineAsync(p).then((y) => {
			--Me, dt(() => {
				et[g >>> 0] = y, Xa(f, 1, g, 0);
			});
		}, (y) => {
			--Me, dt(() => {
				var T = te(), P = Ut(y.message);
				Xa(f, y.reason === "validation" ? 3 : y.reason === "internal" ? 4 : 0, g, P), ee(T);
			});
		}));
	}
	function qv(u, f, p) {
		u >>>= 0, f >>>= 0, p >>>= 0;
		var g = (x(), F)[f >>> 2 >>> 0], y = (x(), D)[g + 4 >>> 2 >>> 0];
		f = {
			label: rr(f + 4),
			code: ""
		}, y === 2 && (f.code = Bu(g + 8)), u = K(u).createShaderModule(f), et[p >>> 0] = u;
	}
	var Wv = (u) => {
		(u = K(u)).onuncapturederror = null, u.destroy();
	};
	function Hv(u, f) {
		f = Ze(f), u = K(u >>> 0), Me += 1, Wr(f, u.popErrorScope().then((p) => {
			--Me, dt(() => {
				var g = 5;
				p ? p instanceof GPUValidationError ? g = 2 : p instanceof GPUOutOfMemoryError ? g = 3 : p instanceof GPUInternalError && (g = 4) : g = 1;
				var y = te(), T = p ? Ut(p.message) : 0;
				Ka(f, 1, g, T), ee(y);
			});
		}, (p) => {
			--Me, dt(() => {
				var g = te(), y = Ut(p.message);
				Ka(f, 1, 5, y), ee(g);
			});
		}));
	}
	function Qv(u, f, p, g) {
		if (f = Ze(f), g >>>= 0, p >>>= 0) {
			var y = {
				featureLevel: Lv[(x(), D)[p + 4 >>> 2 >>> 0]],
				powerPreference: Iv[(x(), D)[p + 8 >>> 2 >>> 0]],
				forceFallbackAdapter: !!(x(), F)[p + 12 >>> 2 >>> 0]
			};
			(u = (x(), F)[p >>> 2 >>> 0]) !== 0 && (x(), y.De = !!(x(), F)[u + 8 >>> 2 >>> 0]);
		}
		"gpu" in navigator ? (Me += 1, Wr(f, navigator.gpu.requestAdapter(y).then((T) => {
			--Me, dt(() => {
				if (T) et[g >>> 0] = T, Is(f, 1, g, 0);
				else {
					var P = te(), L = Ut("WebGPU not available on this browser (requestAdapter returned null)");
					Is(f, 3, g, L), ee(P);
				}
			});
		}, (T) => {
			--Me, dt(() => {
				var P = te(), L = Ut(T.message);
				Is(f, 4, g, L), ee(P);
			});
		}))) : (y = te(), u = Ut("WebGPU not available on this browser (navigator.gpu is not available)"), Is(f, 3, g, u), ee(y));
	}
	function Xv(u, f, p) {
		return u >>>= 0, f >>>= 0, p >>>= 0, Su(async () => {
			var g = [];
			if (p) {
				var y = (x(), D)[p >>> 2 >>> 0];
				g.length = f + 1, g[f] = new Promise((L) => setTimeout(L, y, 0));
			} else g.length = f;
			for (var T = 0; T < f; ++T) {
				var P = Ls(u + 8 * T);
				if (!(P in yn)) return P;
				g[T] = yn[P];
			}
			return g = await Promise.race(g), delete yn[g], g;
		});
	}
	var Wa, Ha = {}, $u = () => {
		if (!Wa) {
			var u, f = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
				_: "./this.program"
			};
			for (u in Ha) Ha[u] === void 0 ? delete f[u] : f[u] = Ha[u];
			var p = [];
			for (u in f) p.push(`${u}=${f[u]}`);
			Wa = p;
		}
		return Wa;
	};
	function Vu(u, f) {
		if (n) return xe(19, 1, u, f);
		u >>>= 0, f >>>= 0;
		var p, g = 0, y = 0;
		for (p of $u()) {
			var T = f + g;
			(x(), F)[u + y >>> 2 >>> 0] = T, g += Zt(p, T, Infinity) + 1, y += 4;
		}
		return 0;
	}
	function Uu(u, f) {
		if (n) return xe(20, 1, u, f);
		u >>>= 0, f >>>= 0;
		var p = $u();
		for (var g of ((x(), F)[u >>> 2 >>> 0] = p.length, u = 0, p)) u += er(g) + 1;
		return (x(), F)[f >>> 2 >>> 0] = u, 0;
	}
	function ju(u) {
		return n ? xe(21, 1, u) : 52;
	}
	function qu(u, f, p, g) {
		return n ? xe(22, 1, u, f, p, g) : 52;
	}
	function Wu(u, f, p, g) {
		return n ? xe(23, 1, u, f, p, g) : 70;
	}
	var Yv = [
		null,
		[],
		[]
	];
	function Hu(u, f, p, g) {
		if (n) return xe(24, 1, u, f, p, g);
		f >>>= 0, p >>>= 0, g >>>= 0;
		for (var y = 0, T = 0; T < p; T++) {
			var P = (x(), F)[f >>> 2 >>> 0], L = (x(), F)[f + 4 >>> 2 >>> 0];
			f += 8;
			for (var $ = 0; $ < L; $++) {
				var X = u, me = (x(), G)[P + $ >>> 0], Y = Yv[X];
				me === 0 || me === 10 ? ((X === 1 ? A : k)(cu(Y)), Y.length = 0) : Y.push(me);
			}
			y += L;
		}
		return (x(), F)[g >>> 2 >>> 0] = y, 0;
	}
	function Jv(u) {
		return u >>> 0;
	}
	function Kv(u, f) {
		return Ru(K(u >>> 0).limits, f >>> 0), 1;
	}
	function Zv(u, f) {
		return K(u >>> 0).features.has(Gu[f]);
	}
	function ey(u) {
		return BigInt(K(u >>> 0).size);
	}
	function ty(u) {
		return BigInt(K(u >>> 0).usage);
	}
	function ry(u, f) {
		if (u >>>= 0, f >>>= 0) {
			var p = rr(f + 4);
			p = {
				label: p,
				timestampWrites: f = (f = (x(), F)[f + 12 >>> 2 >>> 0]) !== 0 ? {
					querySet: K((x(), F)[f + 4 >>> 2 >>> 0]),
					beginningOfPassWriteIndex: (x(), F)[f + 8 >>> 2 >>> 0],
					endOfPassWriteIndex: (x(), F)[f + 12 >>> 2 >>> 0]
				} : void 0
			};
		}
		return f = K(u), u = rd(0), p = f.beginComputePass(p), et[u >>> 0] = p, u;
	}
	function sy(u, f, p, g) {
		p = Ze(p), (g = Ze(g)) == -1 && (g = void 0), (u = K(u >>> 0)).clearBuffer(K(f >>> 0), p, g);
	}
	function ny(u, f, p, g, y, T) {
		p = Ze(p), y = Ze(y), T = Ze(T), K(u >>> 0).copyBufferToBuffer(K(f >>> 0), p, K(g >>> 0), y, T);
	}
	function ay(u) {
		var f = K(u >>> 0);
		return u = ed(0), f = f.finish(), et[u >>> 0] = f, u;
	}
	function oy(u, f, p, g, y, T) {
		T = Ze(T), K(u >>> 0).resolveQuerySet(K(f >>> 0), p, g, K(y >>> 0), T);
	}
	function iy(u, f, p, g) {
		K(u >>> 0).dispatchWorkgroups(f, p, g);
	}
	function ly(u, f, p) {
		p = Ze(p), K(u >>> 0).dispatchWorkgroupsIndirect(K(f >>> 0), p);
	}
	function cy(u) {
		K(u >>> 0).end();
	}
	function uy(u, f, p, g, y) {
		g >>>= 0, y >>>= 0, u = K(u >>> 0), p = K(p >>> 0), g == 0 ? u.setBindGroup(f, p) : u.setBindGroup(f, p, (x(), F), y >>> 2, g);
	}
	function dy(u, f) {
		K(u >>> 0).setPipeline(K(f >>> 0));
	}
	function hy(u, f, p) {
		K(u >>> 0).Ce(K(f >>> 0), p);
	}
	function fy(u, f) {
		var p = K(u >>> 0);
		return u = Zu(0), f = p.getBindGroupLayout(f), et[u >>> 0] = f, u;
	}
	function _y(u, f) {
		function p(y) {
			var T = (x(), F)[y + 8 >>> 2 >>> 0], P = (x(), F)[y + 32 >>> 2 >>> 0], L = (x(), F)[y + 36 >>> 2 >>> 0], $ = 0;
			return Sv(y, { 327681: (X) => {
				$ = (x(), F)[X + 8 >>> 2 >>> 0];
			} }), T ? ((P = Ls(y + 24)) == -1 && (P = void 0), T = {
				buffer: K(T),
				offset: Ls(y + 16),
				size: P
			}) : T = K(P || L || $), {
				binding: (x(), F)[y + 4 >>> 2 >>> 0],
				resource: T
			};
		}
		u >>>= 0, f = {
			label: rr(4 + (f >>>= 0)),
			layout: K((x(), F)[f + 12 >>> 2 >>> 0]),
			entries: (function(y, T) {
				for (var P = [], L = 0; L < y; ++L) P.push(p(T + 40 * L));
				return P;
			})((x(), F)[f + 16 >>> 2 >>> 0], (x(), F)[f + 20 >>> 2 >>> 0])
		}, u = K(u);
		var g = Ku(0);
		return Cv(g, u.createBindGroup(f)), g;
	}
	function py(u, f) {
		var p;
		return u >>>= 0, (f >>>= 0) && (p = { label: rr(f + 4) }), f = K(u), u = td(0), p = f.createCommandEncoder(p), et[u >>> 0] = p, u;
	}
	function my(u, f) {
		u >>>= 0, f >>>= 0, f = {
			type: Ov[(x(), D)[f + 12 >>> 2 >>> 0]],
			count: (x(), F)[f + 16 >>> 2 >>> 0]
		};
		var p = K(u);
		return u = sd(0), f = p.createQuerySet(f), et[u >>> 0] = f, u;
	}
	function gy(u, f) {
		u = K(u >>> 0).adapterInfo, f >>>= 0, (x(), F)[f + 52 >>> 2 >>> 0] = u.subgroupMinSize, (x(), F)[f + 56 >>> 2 >>> 0] = u.subgroupMaxSize;
		var p = u.vendor + u.architecture + u.device + u.description, g = er(p) + 1, y = Hr(g);
		return y && Zt(p, y, g), p = y, g = er(u.vendor), bn(f + 4, p, g), p += g, g = er(u.architecture), bn(f + 12, p, g), p += g, g = er(u.device), bn(f + 20, p, g), bn(f + 28, p + g, er(u.description)), (x(), D)[f + 36 >>> 2 >>> 0] = 2, u = u.isFallbackAdapter ? 3 : 4, (x(), D)[f + 40 >>> 2 >>> 0] = u, (x(), F)[f + 44 >>> 2 >>> 0] = 0, (x(), F)[f + 48 >>> 2 >>> 0] = 0, 1;
	}
	var wy = {
		"core-features-and-limits": 1,
		"depth-clip-control": 2,
		"depth32float-stencil8": 3,
		"texture-compression-bc": 4,
		"texture-compression-bc-sliced-3d": 5,
		"texture-compression-etc2": 6,
		"texture-compression-astc": 7,
		"texture-compression-astc-sliced-3d": 8,
		"timestamp-query": 9,
		"indirect-first-instance": 10,
		"shader-f16": 11,
		"rg11b10ufloat-renderable": 12,
		"bgra8unorm-storage": 13,
		"float32-filterable": 14,
		"float32-blendable": 15,
		"clip-distances": 16,
		"dual-source-blending": 17,
		subgroups: 18,
		"texture-formats-tier1": 19,
		"texture-formats-tier2": 20,
		"primitive-index": 21,
		"texture-component-swizzle": 22,
		"chromium-experimental-unorm16-texture-formats": 327692,
		"chromium-experimental-multi-draw-indirect": 327729
	};
	function vy(u, f) {
		f >>>= 0;
		var p = K(u >>> 0);
		u = Hr(4 * p.features.size);
		var g = 0, y = 0;
		for (let T of p.features) 0 <= (p = wy[T]) && ((x(), D)[u + g >>> 2 >>> 0] = p, g += 4, y++);
		(x(), F)[f + 4 >>> 2 >>> 0] = u, (x(), F)[f >>> 2 >>> 0] = y;
	}
	function yy(u, f) {
		return Ru(K(u >>> 0).limits, f >>> 0), 1;
	}
	function by(u, f) {
		K(u >>> 0).pushErrorScope(Fv[f]);
	}
	function My(u, f, p) {
		f >>>= 0, p >>>= 0, u = K(u >>> 0), f = Array.from((x(), D).subarray(p >>> 2 >>> 0, p + 4 * f >>> 2 >>> 0), (g) => K(g)), u.submit(f);
	}
	function xy(u, f, p, g, y) {
		p = Ze(p), g >>>= 0, y >>>= 0, u = K(u >>> 0), f = K(f >>> 0), g = (x(), G).subarray(g >>> 0, g + y >>> 0), u.writeBuffer(f, p, g, 0, y);
	}
	n || (function() {
		for (var u = t.numThreads - 1; u--;) ru();
		ht.push(async () => {
			var f = (async function() {
				if (!n) return Promise.all(dr.map(tu));
			})();
			be++, await f, --be == 0 && Le && (f = Le, Le = null, f());
		});
	})(), n || (hr = new WebAssembly.Memory({
		initial: 256,
		maximum: 65536,
		shared: !0
	}), Q()), t.wasmBinary && (h = t.wasmBinary), t.stackSave = () => te(), t.stackRestore = (u) => ee(u), t.stackAlloc = (u) => xn(u), t.setValue = function(u, f, p = "i8") {
		switch (p.endsWith("*") && (p = "*"), p) {
			case "i1":
			case "i8":
				(x(), R)[u >>> 0] = f;
				break;
			case "i16":
				(x(), W)[u >>> 1 >>> 0] = f;
				break;
			case "i32":
				(x(), D)[u >>> 2 >>> 0] = f;
				break;
			case "i64":
				(x(), Z)[u >>> 3 >>> 0] = BigInt(f);
				break;
			case "float":
				(x(), U)[u >>> 2 >>> 0] = f;
				break;
			case "double":
				(x(), ae)[u >>> 3 >>> 0] = f;
				break;
			case "*":
				(x(), F)[u >>> 2 >>> 0] = f;
				break;
			default: de(`invalid type for setValue: ${p}`);
		}
	}, t.getValue = function(u, f = "i8") {
		switch (f.endsWith("*") && (f = "*"), f) {
			case "i1":
			case "i8": return (x(), R)[u >>> 0];
			case "i16": return (x(), W)[u >>> 1 >>> 0];
			case "i32": return (x(), D)[u >>> 2 >>> 0];
			case "i64": return (x(), Z)[u >>> 3 >>> 0];
			case "float": return (x(), U)[u >>> 2 >>> 0];
			case "double": return (x(), ae)[u >>> 3 >>> 0];
			case "*": return (x(), F)[u >>> 2 >>> 0];
			default: de(`invalid type for getValue: ${f}`);
		}
	}, t.UTF8ToString = jr, t.stringToUTF8 = Zt, t.lengthBytesUTF8 = er;
	var Qu, Xu, Qa, Mn, Ct, Hr, Yu, Ju, Ku, Zu, ed, td, rd, sd, nd, ad, od, Xa, Ya, Ja, Ka, Is, Za, id, eo, ld, cd, ud, to, dd, hd, ro, fe, Os, fd, ee, xn, te, _d, so, pd, md, gd, no, wd, vd, yd, bd, Md, xd, kd, Td, Ed, Ad, Cd, Sd, Pd, Fd, Ld, Id, Od, Nd, Dd, zd, Bd, Rd, Gd, $d, Vd, Ud, jd, qd, Wd, Hd, Qd, Xd, Yd, Jd, Kd, Zd, eh, th, sr, ky = [
		Vr,
		Ss,
		au,
		uu,
		du,
		hu,
		fu,
		_u,
		pu,
		mu,
		gu,
		wu,
		vu,
		yu,
		bu,
		Mu,
		Ou,
		Nu,
		Du,
		Vu,
		Uu,
		ju,
		qu,
		Wu,
		Hu
	], ao = {
		970348: (u, f, p, g, y) => {
			if (t === void 0 || !t.Uc) return 1;
			if ((u = jr(Number(u >>> 0))).startsWith("./") && (u = u.substring(2)), !(u = t.Uc.get(u))) return 2;
			if (f = Number(f >>> 0), p = Number(p >>> 0), g = Number(g >>> 0), f + p > u.byteLength) return 3;
			try {
				let T = u.subarray(f, f + p);
				switch (y) {
					case 0:
						(x(), G).set(T, g >>> 0);
						break;
					case 1:
						t.ad ? t.ad(g, T) : t.ne(g, T);
						break;
					default: return 4;
				}
				return 0;
			} catch {
				return 4;
			}
		},
		971172: (u, f, p) => {
			t.Sd(u, (x(), G).subarray(f >>> 0, f + p >>> 0));
		},
		971236: () => t.le(),
		971278: (u) => {
			t.jd(u);
		},
		971315: () => typeof wasmOffsetConverter < "u"
	};
	function Ty(u, f, p, g) {
		var y = te();
		try {
			return Td(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function Ey(u, f, p) {
		var g = te();
		try {
			return Md(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			fe(1, 0);
		}
	}
	function Ay(u) {
		var f = te();
		try {
			wd(u);
		} catch (p) {
			if (ee(f), p !== p + 0) throw p;
			fe(1, 0);
		}
	}
	function Cy(u, f) {
		var p = te();
		try {
			return no(u, f);
		} catch (g) {
			if (ee(p), g !== g + 0) throw g;
			fe(1, 0);
		}
	}
	function Sy(u, f, p) {
		var g = te();
		try {
			gd(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			fe(1, 0);
		}
	}
	function Py(u, f) {
		var p = te();
		try {
			Ed(u, f);
		} catch (g) {
			if (ee(p), g !== g + 0) throw g;
			fe(1, 0);
		}
	}
	function Fy(u, f, p, g, y, T, P) {
		var L = te();
		try {
			return bd(u, f, p, g, y, T, P);
		} catch ($) {
			if (ee(L), $ !== $ + 0) throw $;
			fe(1, 0);
		}
	}
	function Ly(u, f, p, g, y, T) {
		var P = te();
		try {
			vd(u, f, p, g, y, T);
		} catch (L) {
			if (ee(P), L !== L + 0) throw L;
			fe(1, 0);
		}
	}
	function Iy(u, f, p, g) {
		var y = te();
		try {
			kd(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function Oy(u, f, p, g, y, T, P) {
		var L = te();
		try {
			Cd(u, f, p, g, y, T, P);
		} catch ($) {
			if (ee(L), $ !== $ + 0) throw $;
			fe(1, 0);
		}
	}
	function Ny(u, f, p, g, y, T, P) {
		var L = te();
		try {
			Sd(u, f, p, g, y, T, P);
		} catch ($) {
			if (ee(L), $ !== $ + 0) throw $;
			fe(1, 0);
		}
	}
	function Dy(u, f, p, g, y, T, P, L) {
		var $ = te();
		try {
			Bd(u, f, p, g, y, T, P, L);
		} catch (X) {
			if (ee($), X !== X + 0) throw X;
			fe(1, 0);
		}
	}
	function zy(u, f, p, g, y, T, P, L, $, X, me, Y) {
		var he = te();
		try {
			Pd(u, f, p, g, y, T, P, L, $, X, me, Y);
		} catch (Pe) {
			if (ee(he), Pe !== Pe + 0) throw Pe;
			fe(1, 0);
		}
	}
	function By(u, f, p, g, y) {
		var T = te();
		try {
			return Ad(u, f, p, g, y);
		} catch (P) {
			if (ee(T), P !== P + 0) throw P;
			fe(1, 0);
		}
	}
	function Ry(u, f, p, g, y) {
		var T = te();
		try {
			yd(u, f, p, g, y);
		} catch (P) {
			if (ee(T), P !== P + 0) throw P;
			fe(1, 0);
		}
	}
	function Gy(u, f, p, g, y, T, P, L) {
		var $ = te();
		try {
			xd(u, f, p, g, y, T, P, L);
		} catch (X) {
			if (ee($), X !== X + 0) throw X;
			fe(1, 0);
		}
	}
	function $y(u) {
		var f = te();
		try {
			return Rd(u);
		} catch (p) {
			if (ee(f), p !== p + 0) throw p;
			fe(1, 0);
		}
	}
	function Vy(u, f, p) {
		var g = te();
		try {
			return Gd(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			fe(1, 0);
		}
	}
	function Uy(u, f) {
		var p = te();
		try {
			return Jd(u, f);
		} catch (g) {
			if (ee(p), g !== g + 0) throw g;
			return fe(1, 0), 0n;
		}
	}
	function jy(u) {
		var f = te();
		try {
			return Fd(u);
		} catch (p) {
			if (ee(f), p !== p + 0) throw p;
			return fe(1, 0), 0n;
		}
	}
	function qy(u, f, p, g) {
		var y = te();
		try {
			return $d(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function Wy(u, f, p, g, y) {
		var T = te();
		try {
			return Vd(u, f, p, g, y);
		} catch (P) {
			if (ee(T), P !== P + 0) throw P;
			fe(1, 0);
		}
	}
	function Hy(u, f, p, g, y, T) {
		var P = te();
		try {
			return Ud(u, f, p, g, y, T);
		} catch (L) {
			if (ee(P), L !== L + 0) throw L;
			fe(1, 0);
		}
	}
	function Qy(u, f, p, g, y, T) {
		var P = te();
		try {
			return Dd(u, f, p, g, y, T);
		} catch (L) {
			if (ee(P), L !== L + 0) throw L;
			fe(1, 0);
		}
	}
	function Xy(u, f, p, g, y, T) {
		var P = te();
		try {
			return jd(u, f, p, g, y, T);
		} catch (L) {
			if (ee(P), L !== L + 0) throw L;
			fe(1, 0);
		}
	}
	function Yy(u, f, p, g, y, T, P, L) {
		var $ = te();
		try {
			return zd(u, f, p, g, y, T, P, L);
		} catch (X) {
			if (ee($), X !== X + 0) throw X;
			fe(1, 0);
		}
	}
	function Jy(u, f, p, g, y) {
		var T = te();
		try {
			return qd(u, f, p, g, y);
		} catch (P) {
			if (ee(T), P !== P + 0) throw P;
			return fe(1, 0), 0n;
		}
	}
	function Ky(u, f, p, g) {
		var y = te();
		try {
			return Wd(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function Zy(u, f, p, g) {
		var y = te();
		try {
			return Hd(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function e0(u, f, p, g, y, T, P, L, $, X, me, Y) {
		var he = te();
		try {
			return Qd(u, f, p, g, y, T, P, L, $, X, me, Y);
		} catch (Pe) {
			if (ee(he), Pe !== Pe + 0) throw Pe;
			fe(1, 0);
		}
	}
	function t0(u, f, p, g, y, T, P, L, $, X, me) {
		var Y = te();
		try {
			Xd(u, f, p, g, y, T, P, L, $, X, me);
		} catch (he) {
			if (ee(Y), he !== he + 0) throw he;
			fe(1, 0);
		}
	}
	function r0(u, f, p, g, y, T, P, L, $, X, me, Y, he, Pe, Xe, Ns) {
		var oo = te();
		try {
			Yd(u, f, p, g, y, T, P, L, $, X, me, Y, he, Pe, Xe, Ns);
		} catch (io) {
			if (ee(oo), io !== io + 0) throw io;
			fe(1, 0);
		}
	}
	function s0(u, f, p) {
		var g = te();
		try {
			return Id(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			return fe(1, 0), 0n;
		}
	}
	function n0(u, f, p) {
		var g = te();
		try {
			return Ld(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			fe(1, 0);
		}
	}
	function a0(u, f, p) {
		var g = te();
		try {
			return Od(u, f, p);
		} catch (y) {
			if (ee(g), y !== y + 0) throw y;
			fe(1, 0);
		}
	}
	function o0(u, f, p, g) {
		var y = te();
		try {
			Nd(u, f, p, g);
		} catch (T) {
			if (ee(y), T !== T + 0) throw T;
			fe(1, 0);
		}
	}
	function kn() {
		if (0 < be) Le = kn;
		else if (n) v?.(t), ue();
		else {
			for (var u = ht; 0 < u.length;) u.shift()(t);
			0 < be ? Le = kn : (t.calledRun = !0, C || (ue(), v?.(t)));
		}
	}
	return n || (sr = await ut(), kn()), t.PTR_SIZE = 4, t.webgpuInit = (u) => {
		let f = /* @__PURE__ */ new WeakMap(), p, g, y = 1;
		t.webgpuRegisterDevice = (L) => {
			if (g !== void 0) throw Error("another WebGPU EP inference session is being created.");
			if (L) {
				var $ = f.get(L);
				if (!$) {
					let X = ((me, Y = 0) => {
						var he = od(Y);
						return Y = ad(Y, he), et[he >>> 0] = me.queue, et[Y >>> 0] = me, Y;
					})(L, $ = Ju(0));
					$ = [
						y++,
						$,
						X
					], f.set(L, $);
				}
				return p = L, g = $[0], $;
			}
			p = void 0, g = 0;
		};
		let T = /* @__PURE__ */ new Map();
		t.webgpuOnCreateSession = (L) => {
			if (g !== void 0) {
				var $ = g;
				if (g = void 0, L) {
					let X = Qa($);
					T.set(L, X), $ === 0 && u(p ?? K(X));
				}
				p = void 0;
			}
		}, t.webgpuOnReleaseSession = (L) => {
			T.delete(L);
		};
		let P = Symbol("gpuBufferMetadata");
		t.webgpuRegisterBuffer = (L, $, X) => {
			if (X) return L[P] = [X, NaN], X;
			if (X = L[P]) return X[1]++, X[0];
			if (($ = T.get($)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
			return $ = ((me, Y = 0) => (me.mapState === "unmapped" || de(), Y = nd(Y), et[Y >>> 0] = me, Y))(L, $), L[P] = [$, 1], $;
		}, t.webgpuUnregisterBuffer = (L) => {
			let $ = L[P];
			if (!$) throw Error("Buffer is not registered");
			$[1]--, $[1] === 0 && (Yu($[0]), delete L[P]);
		}, t.webgpuGetBuffer = (L) => K(L), t.webgpuCreateDownloader = (L, $, X) => {
			if ((X = T.get(X)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
			let me = K(X), Y = 16 * Math.ceil(Number($) / 16);
			return async () => {
				let he = me.createBuffer({
					size: Y,
					usage: 9
				});
				try {
					let Pe = me.createCommandEncoder();
					return Pe.copyBufferToBuffer(L, 0, he, 0, Y), me.queue.submit([Pe.finish()]), await he.mapAsync(GPUMapMode.READ), he.getMappedRange().slice(0, $);
				} finally {
					he.destroy();
				}
			};
		}, t.ad = (L, $) => {
			var X = $.buffer;
			let me = $.byteOffset, Y = $.byteLength;
			if ($ = 16 * Math.ceil(Number(Y) / 16), L = K(L), !p) {
				var he = Qa(g);
				p = K(he);
			}
			let Pe = (he = p.createBuffer({
				mappedAtCreation: !0,
				size: $,
				usage: 6
			})).getMappedRange();
			new Uint8Array(Pe).set(new Uint8Array(X, me, Y)), he.unmap(), (X = p.createCommandEncoder()).copyBufferToBuffer(he, 0, L, 0, $), p.queue.submit([X.finish()]), he.destroy();
		};
	}, t.webnnInit = (u) => {
		let f = u[0];
		[t.le, t.jd, t.webnnEnsureTensor, t.Sd, t.webnnDownloadTensor, t.ke, t.webnnEnableTraceEvent] = u.slice(1), t.webnnReleaseTensorId = t.jd, t.webnnUploadTensor = t.Sd, t.webnnRegisterMLContext = t.ke, t.webnnOnRunStart = (p) => f.onRunStart(p), t.webnnOnRunEnd = f.onRunEnd.bind(f), t.webnnOnReleaseSession = (p) => {
			f.onReleaseSession(p);
		}, t.webnnCreateMLTensorDownloader = (p, g) => f.createMLTensorDownloader(p, g), t.webnnRegisterMLTensor = (p, g, y, T) => f.registerMLTensor(p, g, y, T), t.webnnCreateMLContext = (p) => f.createMLContext(p), t.webnnRegisterMLConstant = (p, g, y, T, P, L) => f.registerMLConstant(p, g, y, T, P, t.Uc, L), t.webnnRegisterGraphInput = f.registerGraphInput.bind(f), t.webnnIsGraphInput = f.isGraphInput.bind(f), t.webnnRegisterGraphOutput = f.registerGraphOutput.bind(f), t.webnnIsGraphOutput = f.isGraphOutput.bind(f), t.webnnCreateTemporaryTensor = f.createTemporaryTensor.bind(f), t.webnnIsGraphInputOutputTypeSupported = f.isGraphInputOutputTypeSupported.bind(f);
	}, B ? t : new Promise((u, f) => {
		v = u, w = f;
	});
}
var s_, ah, C0 = pe(() => {
	"use strict";
	s_ = nh, ah = globalThis.self?.name?.startsWith("em-pthread"), ah && nh();
}), _o, Vo, oh, mt, n_, En, ih, lh, po, ch, mo, a_, go, o_, ui = pe(() => {
	"use strict";
	ci(), _o = typeof location > "u" ? void 0 : location.origin, Vo = import.meta.url > "file:" && import.meta.url < "file;", oh = () => Vo ? new URL(new URL("ort.webgpu.bundle.min.mjs", import.meta.url).href, _o).href : import.meta.url, mt = oh(), n_ = () => {
		if (mt && !mt.startsWith("blob:")) return mt.substring(0, mt.lastIndexOf("/") + 1);
	}, En = (e, t) => {
		try {
			let r = t ?? mt;
			return (r ? new URL(e, r) : new URL(e)).origin === _o;
		} catch {
			return !1;
		}
	}, ih = (e, t) => {
		let r = t ?? mt;
		try {
			return (r ? new URL(e, r) : new URL(e)).href;
		} catch {
			return;
		}
	}, lh = (e, t) => `${t ?? "./"}${e}`, po = async (e) => {
		let t = await (await fetch(e, { credentials: "same-origin" })).blob();
		return URL.createObjectURL(t);
	}, ch = async (e) => (await import(e)).default, mo = (A0(), Un(e_)).default, a_ = async () => {
		if (!mt) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
		if (En(mt)) return [void 0, mo()];
		let e = await po(mt);
		return [e, mo(e)];
	}, go = (C0(), Un(r_)).default, o_ = async (e, t, r, s) => {
		let n = go && !(e || t);
		if (n) if (mt) n = En(mt) || s && !r;
		else if (s && !r) n = !0;
		else throw new Error("cannot determine the script source URL.");
		if (n) return [void 0, go];
		{
			let a = "ort-wasm-simd-threaded.asyncify.mjs", o = e ?? ih(a, t), i = r && o && !En(o, t), l = i ? await po(o) : o ?? lh(a, t);
			return [i ? l : void 0, await ch(l)];
		}
	};
}), wo, An, zs, vo, uh, dh, hh, di, Se, Rr = pe(() => {
	"use strict";
	ui(), An = !1, zs = !1, vo = !1, uh = () => {
		if (typeof SharedArrayBuffer > "u") return !1;
		try {
			return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				4,
				1,
				96,
				0,
				0,
				3,
				2,
				1,
				0,
				5,
				4,
				1,
				3,
				1,
				1,
				10,
				11,
				1,
				9,
				0,
				65,
				0,
				254,
				16,
				2,
				0,
				26,
				11
			]));
		} catch {
			return !1;
		}
	}, dh = () => {
		try {
			return WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				4,
				1,
				96,
				0,
				0,
				3,
				2,
				1,
				0,
				10,
				30,
				1,
				28,
				0,
				65,
				0,
				253,
				15,
				253,
				12,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				253,
				186,
				1,
				26,
				11
			]));
		} catch {
			return !1;
		}
	}, hh = () => {
		try {
			return WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				5,
				1,
				96,
				0,
				1,
				123,
				3,
				2,
				1,
				0,
				10,
				19,
				1,
				17,
				0,
				65,
				1,
				253,
				15,
				65,
				2,
				253,
				15,
				65,
				3,
				253,
				15,
				253,
				147,
				2,
				11
			]));
		} catch {
			return !1;
		}
	}, di = async (e) => {
		if (An) return Promise.resolve();
		if (zs) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
		if (vo) throw new Error("previous call to 'initializeWebAssembly()' failed.");
		zs = !0;
		let t = e.initTimeout, r = e.numThreads;
		if (e.simd !== !1) {
			if (e.simd === "relaxed") {
				if (!hh()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
			} else if (!dh()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
		}
		let s = uh();
		r > 1 && !s && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + r + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = r = 1);
		let n = e.wasmPaths, a = typeof n == "string" ? n : void 0, o = n?.mjs, i = o?.href ?? o, l = n?.wasm, c = l?.href ?? l, d = e.wasmBinary, [h, _] = await o_(i, a, r > 1, !!d || !!c), m = !1, v = [];
		if (t > 0 && v.push(new Promise((w) => {
			setTimeout(() => {
				m = !0, w();
			}, t);
		})), v.push(new Promise((w, b) => {
			let M = { numThreads: r };
			if (d) M.wasmBinary = d, M.locateFile = (E) => E;
			else if (c || a) M.locateFile = (E) => c ?? a + E;
			else if (i && i.indexOf("blob:") !== 0) M.locateFile = (E) => new URL(E, i).href;
			else if (h) {
				let E = n_();
				E && (M.locateFile = (A) => E + A);
			}
			_(M).then((E) => {
				zs = !1, An = !0, wo = E, w(), h && URL.revokeObjectURL(h);
			}, (E) => {
				zs = !1, vo = !0, b(E);
			});
		})), await Promise.race(v), m) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
	}, Se = () => {
		if (An && wo) return wo;
		throw new Error("WebAssembly is not initialized yet.");
	};
}), gt, qn, ke, hi = pe(() => {
	"use strict";
	Rr(), gt = (e, t) => {
		let r = Se(), s = r.lengthBytesUTF8(e) + 1, n = r._malloc(s);
		return r.stringToUTF8(e, n, s), t.push(n), n;
	}, qn = (e, t, r, s) => {
		if (typeof e == "object" && e !== null) {
			if (r.has(e)) throw new Error("Circular reference in options");
			r.add(e);
		}
		Object.entries(e).forEach(([n, a]) => {
			let o = t ? t + n : n;
			if (typeof a == "object") qn(a, o + ".", r, s);
			else if (typeof a == "string" || typeof a == "number") s(o, a.toString());
			else if (typeof a == "boolean") s(o, a ? "1" : "0");
			else throw new Error(`Can't handle extra config type: ${typeof a}`);
		});
	}, ke = (e) => {
		let t = Se(), r = t.stackSave();
		try {
			let s = t.PTR_SIZE, n = t.stackAlloc(2 * s);
			t._OrtGetLastError(n, n + s);
			let a = Number(t.getValue(n, s === 4 ? "i32" : "i64")), o = t.getValue(n + s, "*"), i = o ? t.UTF8ToString(o) : "";
			throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${i}`);
		} finally {
			t.stackRestore(r);
		}
	};
}), i_, S0 = pe(() => {
	"use strict";
	Rr(), hi(), i_ = (e) => {
		let t = Se(), r = 0, s = [], n = e || {};
		try {
			if (e?.logSeverityLevel === void 0) n.logSeverityLevel = 2;
			else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);
			if (e?.logVerbosityLevel === void 0) n.logVerbosityLevel = 0;
			else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
			e?.terminate === void 0 && (n.terminate = !1);
			let a = 0;
			return e?.tag !== void 0 && (a = gt(e.tag, s)), r = t._OrtCreateRunOptions(n.logSeverityLevel, n.logVerbosityLevel, !!n.terminate, a), r === 0 && ke("Can't create run options."), e?.extra !== void 0 && qn(e.extra, "", /* @__PURE__ */ new WeakSet(), (o, i) => {
				let l = gt(o, s), c = gt(i, s);
				t._OrtAddRunConfigEntry(r, l, c) !== 0 && ke(`Can't set a run config entry: ${o} - ${i}.`);
			}), [r, s];
		} catch (a) {
			throw r !== 0 && t._OrtReleaseRunOptions(r), s.forEach((o) => t._free(o)), a;
		}
	};
}), fh, _h, ph, Cn, pr, mh, l_, P0 = pe(() => {
	"use strict";
	Rr(), hi(), fh = (e) => {
		switch (e) {
			case "disabled": return 0;
			case "basic": return 1;
			case "extended": return 2;
			case "layout": return 3;
			case "all": return 99;
			default: throw new Error(`unsupported graph optimization level: ${e}`);
		}
	}, _h = (e) => {
		switch (e) {
			case "sequential": return 0;
			case "parallel": return 1;
			default: throw new Error(`unsupported execution mode: ${e}`);
		}
	}, ph = (e) => {
		e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
		let t = e.extra.session;
		t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some((r) => (typeof r == "string" ? r : r.name) === "webgpu") && (e.enableMemPattern = !1);
	}, Cn = (e, t, r, s) => {
		let n = gt(t, s), a = gt(r, s);
		Se()._OrtAddSessionConfigEntry(e, n, a) !== 0 && ke(`Can't set a session config entry: ${t} - ${r}.`);
	}, pr = (e, t, r, s) => {
		let n = gt(t, s), a = gt(r, s);
		e.push([n, a]);
	}, mh = async (e, t, r) => {
		let s = t.executionProviders;
		for (let n of s) {
			let a = typeof n == "string" ? n : n.name, o = [];
			switch (a) {
				case "webnn":
					if (a = "WEBNN", typeof n != "string") {
						let h = n?.deviceType;
						h && Cn(e, "deviceType", h, r);
					}
					break;
				case "webgpu":
					{
						a = "WebGPU";
						let h;
						if (typeof n != "string") {
							let m = n;
							if (m.device) if (typeof GPUDevice < "u" && m.device instanceof GPUDevice) h = m.device;
							else throw new Error("Invalid GPU device set in WebGPU EP options.");
							let { enableGraphCapture: v } = t;
							if (typeof v == "boolean" && v && pr(o, "enableGraphCapture", "1", r), typeof m.preferredLayout == "string" && pr(o, "preferredLayout", m.preferredLayout, r), m.forceCpuNodeNames) {
								let w = Array.isArray(m.forceCpuNodeNames) ? m.forceCpuNodeNames : [m.forceCpuNodeNames];
								pr(o, "forceCpuNodeNames", w.join(`
`), r);
							}
							m.validationMode && pr(o, "validationMode", m.validationMode, r);
						}
						let _ = Se().webgpuRegisterDevice(h);
						if (_) {
							let [m, v, w] = _;
							pr(o, "deviceId", m.toString(), r), pr(o, "webgpuInstance", v.toString(), r), pr(o, "webgpuDevice", w.toString(), r);
						}
					}
					break;
				case "wasm":
				case "cpu": continue;
				default: throw new Error(`not supported execution provider: ${a}`);
			}
			let i = gt(a, r), l = o.length, c = 0, d = 0;
			if (l > 0) {
				c = Se()._malloc(l * Se().PTR_SIZE), r.push(c), d = Se()._malloc(l * Se().PTR_SIZE), r.push(d);
				for (let h = 0; h < l; h++) Se().setValue(c + h * Se().PTR_SIZE, o[h][0], "*"), Se().setValue(d + h * Se().PTR_SIZE, o[h][1], "*");
			}
			await Se()._OrtAppendExecutionProvider(e, i, c, d, l) !== 0 && ke(`Can't append execution provider: ${a}.`);
		}
	}, l_ = async (e) => {
		let t = Se(), r = 0, s = [], n = e || {};
		ph(n);
		try {
			let a = fh(n.graphOptimizationLevel ?? "all"), o = _h(n.executionMode ?? "sequential"), i = typeof n.logId == "string" ? gt(n.logId, s) : 0, l = n.logSeverityLevel ?? 2;
			if (!Number.isInteger(l) || l < 0 || l > 4) throw new Error(`log severity level is not valid: ${l}`);
			let c = n.logVerbosityLevel ?? 0;
			if (!Number.isInteger(c) || c < 0 || c > 4) throw new Error(`log verbosity level is not valid: ${c}`);
			let d = typeof n.optimizedModelFilePath == "string" ? gt(n.optimizedModelFilePath, s) : 0;
			if (r = t._OrtCreateSessionOptions(a, !!n.enableCpuMemArena, !!n.enableMemPattern, o, !!n.enableProfiling, 0, i, l, c, d), r === 0 && ke("Can't create session options."), n.executionProviders && await mh(r, n, s), n.enableGraphCapture !== void 0) {
				if (typeof n.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);
				Cn(r, "enableGraphCapture", n.enableGraphCapture.toString(), s);
			}
			if (n.freeDimensionOverrides) for (let [h, _] of Object.entries(n.freeDimensionOverrides)) {
				if (typeof h != "string") throw new Error(`free dimension override name must be a string: ${h}`);
				if (typeof _ != "number" || !Number.isInteger(_) || _ < 0) throw new Error(`free dimension override value must be a non-negative integer: ${_}`);
				let m = gt(h, s);
				t._OrtAddFreeDimensionOverride(r, m, _) !== 0 && ke(`Can't set a free dimension override: ${h} - ${_}.`);
			}
			return n.extra !== void 0 && qn(n.extra, "", /* @__PURE__ */ new WeakSet(), (h, _) => {
				Cn(r, h, _, s);
			}), [r, s];
		} catch (a) {
			throw r !== 0 && t._OrtReleaseSessionOptions(r) !== 0 && ke("Can't release session options."), s.forEach((o) => t._free(o)), a;
		}
	};
}), Ir, Rn, es, Xs, Wn, fi, _i, Uo, us = pe(() => {
	"use strict";
	Ir = (e) => {
		switch (e) {
			case "int8": return 3;
			case "uint8": return 2;
			case "bool": return 9;
			case "int16": return 5;
			case "uint16": return 4;
			case "int32": return 6;
			case "uint32": return 12;
			case "float16": return 10;
			case "float32": return 1;
			case "float64": return 11;
			case "string": return 8;
			case "int64": return 7;
			case "uint64": return 13;
			case "int4": return 22;
			case "uint4": return 21;
			default: throw new Error(`unsupported data type: ${e}`);
		}
	}, Rn = (e) => {
		switch (e) {
			case 3: return "int8";
			case 2: return "uint8";
			case 9: return "bool";
			case 5: return "int16";
			case 4: return "uint16";
			case 6: return "int32";
			case 12: return "uint32";
			case 10: return "float16";
			case 1: return "float32";
			case 11: return "float64";
			case 8: return "string";
			case 7: return "int64";
			case 13: return "uint64";
			case 22: return "int4";
			case 21: return "uint4";
			default: throw new Error(`unsupported data type: ${e}`);
		}
	}, es = (e, t) => {
		let r = [
			-1,
			4,
			1,
			1,
			2,
			2,
			4,
			8,
			-1,
			1,
			2,
			8,
			4,
			8,
			-1,
			-1,
			-1,
			-1,
			-1,
			-1,
			-1,
			.5,
			.5
		][e], s = typeof t == "number" ? t : t.reduce((n, a) => n * a, 1);
		return r > 0 ? Math.ceil(s * r) : void 0;
	}, Xs = (e) => {
		switch (e) {
			case "float16": return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
			case "float32": return Float32Array;
			case "uint8": return Uint8Array;
			case "int8": return Int8Array;
			case "uint16": return Uint16Array;
			case "int16": return Int16Array;
			case "int32": return Int32Array;
			case "bool": return Uint8Array;
			case "float64": return Float64Array;
			case "uint32": return Uint32Array;
			case "int64": return BigInt64Array;
			case "uint64": return BigUint64Array;
			default: throw new Error(`unsupported type: ${e}`);
		}
	}, Wn = (e) => {
		switch (e) {
			case "verbose": return 0;
			case "info": return 1;
			case "warning": return 2;
			case "error": return 3;
			case "fatal": return 4;
			default: throw new Error(`unsupported logging level: ${e}`);
		}
	}, fi = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", _i = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", Uo = (e) => {
		switch (e) {
			case "none": return 0;
			case "cpu": return 1;
			case "cpu-pinned": return 2;
			case "texture": return 3;
			case "gpu-buffer": return 4;
			case "ml-tensor": return 5;
			default: throw new Error(`unsupported data location: ${e}`);
		}
	};
}), pi, c_ = pe(() => {
	"use strict";
	ci(), pi = async (e) => {
		if (typeof e == "string") {
			let t = await fetch(e);
			if (!t.ok) throw new Error(`failed to load external data file: ${e}`);
			let r = t.headers.get("Content-Length"), s = r ? parseInt(r, 10) : 0;
			if (s < 1073741824) return new Uint8Array(await t.arrayBuffer());
			{
				if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`);
				let n = t.body.getReader(), a;
				try {
					a = new ArrayBuffer(s);
				} catch (i) {
					if (i instanceof RangeError) {
						let l = Math.ceil(s / 65536);
						a = new WebAssembly.Memory({
							initial: l,
							maximum: l
						}).buffer;
					} else throw i;
				}
				let o = 0;
				for (;;) {
					let { done: i, value: l } = await n.read();
					if (i) break;
					let c = l.byteLength;
					new Uint8Array(a, o, c).set(l), o += c;
				}
				return new Uint8Array(a, 0, s);
			}
		} else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
	};
}), u_, F0 = pe(() => {
	"use strict";
	us(), u_ = (e, t) => new (Xs(t))(e);
}), gh, wh, vh, yh, d_, bh, at, h_ = pe(() => {
	"use strict";
	us(), gh = [
		"V",
		"I",
		"W",
		"E",
		"F"
	], wh = (e, t) => {
		console.log(`[${gh[e]},${(/* @__PURE__ */ new Date()).toISOString()}]${t}`);
	}, d_ = (e, t) => {
		vh = e, yh = t;
	}, bh = (e, t) => {
		let r = Wn(e);
		r >= Wn(vh) && wh(r, typeof t == "function" ? t() : t);
	}, at = (...e) => {
		yh && bh(...e);
	};
}), yo, jo, bo, Mh, Mo, xh, xo, ko, To, kh, f_, L0 = pe(() => {
	"use strict";
	us(), h_(), yo = /* @__PURE__ */ new Map([
		["float32", 32],
		["float16", 16],
		["int32", 32],
		["uint32", 32],
		["int64", 64],
		["uint64", 64],
		["int8", 8],
		["uint8", 8],
		["int4", 4],
		["uint4", 4]
	]), jo = (e, t) => {
		if (t === "int32") return e;
		let r = yo.get(t);
		if (!r) throw new Error(`WebNN backend does not support data type: ${t}`);
		let s = r / 8;
		if (e.byteLength % s !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${s}.`);
		let n = e.byteLength / s, a = new (Xs(t))(e.buffer, e.byteOffset, n);
		switch (t) {
			case "int64":
			case "uint64": {
				let o = new Int32Array(n);
				for (let i = 0; i < n; i++) {
					let l = a[i];
					if (l > 2147483647n || l < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range.");
					o[i] = Number(l);
				}
				return new Uint8Array(o.buffer);
			}
			case "int8":
			case "uint8":
			case "uint32": {
				if (t === "uint32" && a.some((i) => i > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range.");
				let o = Int32Array.from(a, Number);
				return new Uint8Array(o.buffer);
			}
			default: throw new Error(`Unsupported data conversion from ${t} to 'int32'`);
		}
	}, bo = (e, t) => {
		if (t === "int32") return e;
		if (e.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
		let r = e.byteLength / 4, s = new Int32Array(e.buffer, e.byteOffset, r);
		switch (t) {
			case "int64": {
				let n = BigInt64Array.from(s, BigInt);
				return new Uint8Array(n.buffer);
			}
			case "uint64": {
				if (s.some((a) => a < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found.");
				let n = BigUint64Array.from(s, BigInt);
				return new Uint8Array(n.buffer);
			}
			case "int8": {
				if (s.some((a) => a < -128 || a > 127)) throw new Error("Can not convert int32 data to int8 - value out of range.");
				let n = Int8Array.from(s, Number);
				return new Uint8Array(n.buffer);
			}
			case "uint8":
				if (s.some((n) => n < 0 || n > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range.");
				return Uint8Array.from(s, Number);
			case "uint32": {
				if (s.some((a) => a < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found.");
				let n = Uint32Array.from(s, Number);
				return new Uint8Array(n.buffer);
			}
			default: throw new Error(`Unsupported data conversion from 'int32' to ${t}`);
		}
	}, Mh = 1, Mo = () => Mh++, xh = /* @__PURE__ */ new Map([
		["int8", "int32"],
		["uint8", "int32"],
		["uint32", "int32"],
		["int64", "int32"]
	]), xo = (e, t) => {
		let r = yo.get(e);
		if (!r) throw new Error(`WebNN backend does not support data type: ${e}`);
		return t.length > 0 ? Math.ceil(t.reduce((s, n) => s * n) * r / 8) : 0;
	}, ko = class {
		constructor(e) {
			this.isDataConverted = !1;
			let { sessionId: t, context: r, tensor: s, dataType: n, shape: a, fallbackDataType: o } = e;
			this.sessionId = t, this.mlContext = r, this.mlTensor = s, this.dataType = n, this.tensorShape = a, this.fallbackDataType = o;
		}
		get tensor() {
			return this.mlTensor;
		}
		get type() {
			return this.dataType;
		}
		get fallbackType() {
			return this.fallbackDataType;
		}
		get shape() {
			return this.tensorShape;
		}
		get byteLength() {
			return xo(this.dataType, this.tensorShape);
		}
		destroy() {
			at("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
		}
		write(e) {
			this.mlContext.writeTensor(this.mlTensor, e);
		}
		async read(e) {
			if (this.fallbackDataType) {
				let t = await this.mlContext.readTensor(this.mlTensor), r = bo(new Uint8Array(t), this.dataType);
				if (e) {
					(e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)).set(r);
					return;
				} else return r.buffer;
			} else return e ? this.mlContext.readTensor(this.mlTensor, e) : this.mlContext.readTensor(this.mlTensor);
		}
		canReuseTensor(e, t, r) {
			return this.mlContext === e && this.dataType === t && this.tensorShape.length === r.length && this.tensorShape.every((s, n) => s === r[n]);
		}
		setIsDataConverted(e) {
			this.isDataConverted = e;
		}
	}, To = class {
		constructor(e, t) {
			this.tensorManager = e, this.wrapper = t;
		}
		get tensorWrapper() {
			return this.wrapper;
		}
		releaseTensor() {
			this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
		}
		async ensureTensor(e, t, r, s) {
			let n = this.tensorManager.getMLContext(e), a = this.tensorManager.getMLOpSupportLimits(e), o;
			if (!a?.input.dataTypes.includes(t)) {
				if (o = xh.get(t), !o || a?.input.dataTypes.includes(o)) throw new Error(`WebNN backend does not support data type: ${t}`);
				at("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`);
			}
			if (this.wrapper) {
				if (this.wrapper.canReuseTensor(n, t, r)) return this.wrapper.tensor;
				if (s) {
					if (this.wrapper.byteLength !== xo(t, r)) throw new Error("Unable to copy data to tensor with different size.");
					this.activeUpload = new Uint8Array(await this.wrapper.read());
				}
				this.tensorManager.releaseTensor(this.wrapper);
			}
			let i = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
			return this.wrapper = await this.tensorManager.getCachedTensor(e, t, r, i, !0, !0, o), s && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
		}
		upload(e) {
			let t = e;
			if (this.wrapper) {
				if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") t = jo(e, this.wrapper.type), this.wrapper.setIsDataConverted(!0);
				else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
				if (e.byteLength === this.wrapper.byteLength) {
					this.wrapper.write(t);
					return;
				} else at("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
			}
			this.activeUpload ? this.activeUpload.set(t) : this.activeUpload = new Uint8Array(t);
		}
		async download(e) {
			if (this.activeUpload) {
				let t = this.wrapper?.isDataConverted ? bo(this.activeUpload, this.wrapper?.type) : this.activeUpload;
				if (e) {
					e instanceof ArrayBuffer ? new Uint8Array(e).set(t) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength).set(t);
					return;
				} else return t.buffer;
			}
			if (!this.wrapper) throw new Error("Tensor has not been created.");
			return e ? this.wrapper.read(e) : this.wrapper.read();
		}
	}, kh = class {
		constructor(e) {
			this.backend = e, this.tensorTrackersById = /* @__PURE__ */ new Map(), this.freeTensors = [], this.externalTensors = /* @__PURE__ */ new Set();
		}
		getMLContext(e) {
			let t = this.backend.getMLContext(e);
			if (!t) throw new Error("MLContext not found for session.");
			return t;
		}
		getMLOpSupportLimits(e) {
			return this.backend.getMLOpSupportLimits(e);
		}
		reserveTensorId() {
			let e = Mo();
			return this.tensorTrackersById.set(e, new To(this)), e;
		}
		releaseTensorId(e) {
			let t = this.tensorTrackersById.get(e);
			t && (this.tensorTrackersById.delete(e), t.tensorWrapper && this.releaseTensor(t.tensorWrapper));
		}
		async ensureTensor(e, t, r, s, n) {
			at("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${s}, copyOld: ${n}}`);
			let a = this.tensorTrackersById.get(t);
			if (!a) throw new Error("Tensor not found.");
			return a.ensureTensor(e, r, s, n);
		}
		upload(e, t) {
			let r = this.tensorTrackersById.get(e);
			if (!r) throw new Error("Tensor not found.");
			r.upload(t);
		}
		async download(e, t) {
			at("verbose", () => `[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);
			let r = this.tensorTrackersById.get(e);
			if (!r) throw new Error("Tensor not found.");
			return r.download(t);
		}
		releaseTensorsForSession(e) {
			for (let t of this.freeTensors) t.sessionId === e && t.destroy();
			this.freeTensors = this.freeTensors.filter((t) => t.sessionId !== e);
		}
		registerTensor(e, t, r, s) {
			let n = this.getMLContext(e), a = Mo(), o = new ko({
				sessionId: e,
				context: n,
				tensor: t,
				dataType: r,
				shape: s
			});
			return this.tensorTrackersById.set(a, new To(this, o)), this.externalTensors.add(o), a;
		}
		async getCachedTensor(e, t, r, s, n, a, o) {
			let i = this.getMLContext(e);
			for (let [c, d] of this.freeTensors.entries()) if (d.canReuseTensor(i, t, r)) {
				at("verbose", () => `[WebNN] Reusing tensor {dataType: ${t}, ${o ? `fallbackDataType: ${o},` : ""} shape: ${r}`);
				let h = this.freeTensors.splice(c, 1)[0];
				return h.sessionId = e, h;
			}
			at("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${t}, ${o ? `fallbackDataType: ${o},` : ""} shape: ${r}}`);
			let l = await i.createTensor({
				dataType: o ?? t,
				shape: r,
				dimensions: r,
				usage: s,
				writable: n,
				readable: a
			});
			return new ko({
				sessionId: e,
				context: i,
				tensor: l,
				dataType: t,
				shape: r,
				fallbackDataType: o
			});
		}
		releaseTensor(e) {
			this.externalTensors.has(e) && this.externalTensors.delete(e), this.freeTensors.push(e);
		}
	}, f_ = (...e) => new kh(...e);
}), __ = {};
en(__, { WebNNBackend: () => p_ });
var Bs, Th, p_, I0 = pe(() => {
	"use strict";
	us(), Rr(), F0(), L0(), h_(), Bs = /* @__PURE__ */ new Map([
		[1, "float32"],
		[10, "float16"],
		[6, "int32"],
		[12, "uint32"],
		[7, "int64"],
		[13, "uint64"],
		[22, "int4"],
		[21, "uint4"],
		[3, "int8"],
		[2, "uint8"],
		[9, "uint8"]
	]), Th = (e, t) => {
		if (e === t) return !0;
		if (e === void 0 || t === void 0) return !1;
		let r = Object.keys(e).sort(), s = Object.keys(t).sort();
		return r.length === s.length && r.every((n, a) => n === s[a] && e[n] === t[n]);
	}, p_ = class {
		constructor(e) {
			this.tensorManager = f_(this), this.mlContextBySessionId = /* @__PURE__ */ new Map(), this.sessionIdsByMLContext = /* @__PURE__ */ new Map(), this.mlContextCache = [], this.sessionGraphInputs = /* @__PURE__ */ new Map(), this.sessionGraphOutputs = /* @__PURE__ */ new Map(), this.temporaryGraphInputs = [], this.temporaryGraphOutputs = [], this.temporarySessionTensorIds = /* @__PURE__ */ new Map(), this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map(), d_(e.logLevel, !!e.debug);
		}
		get currentSessionId() {
			if (this.activeSessionId === void 0) throw new Error("No active session");
			return this.activeSessionId;
		}
		onRunStart(e) {
			at("verbose", () => `[WebNN] onRunStart {sessionId: ${e}}`), this.activeSessionId = e;
		}
		onRunEnd(e) {
			at("verbose", () => `[WebNN] onRunEnd {sessionId: ${e}}`);
			let t = this.temporarySessionTensorIds.get(e);
			if (t) {
				for (let r of t) at("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${r}}`), this.tensorManager.releaseTensorId(r);
				this.temporarySessionTensorIds.delete(e), this.activeSessionId = void 0;
			}
		}
		async createMLContext(e) {
			if (e instanceof GPUDevice) {
				let r = this.mlContextCache.findIndex((s) => s.gpuDevice === e);
				if (r !== -1) return this.mlContextCache[r].mlContext;
				{
					let s = await navigator.ml.createContext(e);
					return this.mlContextCache.push({
						gpuDevice: e,
						mlContext: s
					}), s;
				}
			} else if (e === void 0) {
				let r = this.mlContextCache.findIndex((s) => s.options === void 0 && s.gpuDevice === void 0);
				if (r !== -1) return this.mlContextCache[r].mlContext;
				{
					let s = await navigator.ml.createContext();
					return this.mlContextCache.push({ mlContext: s }), s;
				}
			}
			let t = this.mlContextCache.findIndex((r) => Th(r.options, e));
			if (t !== -1) return this.mlContextCache[t].mlContext;
			{
				let r = await navigator.ml.createContext(e);
				return this.mlContextCache.push({
					options: e,
					mlContext: r
				}), r;
			}
		}
		registerMLContext(e, t) {
			this.mlContextBySessionId.set(e, t);
			let r = this.sessionIdsByMLContext.get(t);
			r || (r = /* @__PURE__ */ new Set(), this.sessionIdsByMLContext.set(t, r)), r.add(e), this.mlOpSupportLimitsBySessionId.has(e) || this.mlOpSupportLimitsBySessionId.set(e, t.opSupportLimits()), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(e, this.temporaryGraphInputs), this.temporaryGraphInputs = []), this.temporaryGraphOutputs.length > 0 && (this.sessionGraphOutputs.set(e, this.temporaryGraphOutputs), this.temporaryGraphOutputs = []);
		}
		onReleaseSession(e) {
			this.sessionGraphInputs.delete(e), this.sessionGraphOutputs.delete(e);
			let t = this.mlContextBySessionId.get(e);
			if (!t) return;
			this.tensorManager.releaseTensorsForSession(e), this.mlContextBySessionId.delete(e), this.mlOpSupportLimitsBySessionId.delete(e);
			let r = this.sessionIdsByMLContext.get(t);
			if (r.delete(e), r.size === 0) {
				this.sessionIdsByMLContext.delete(t);
				let s = this.mlContextCache.findIndex((n) => n.mlContext === t);
				s !== -1 && this.mlContextCache.splice(s, 1);
			}
		}
		getMLContext(e) {
			return this.mlContextBySessionId.get(e);
		}
		getMLOpSupportLimits(e) {
			return this.mlOpSupportLimitsBySessionId.get(e);
		}
		reserveTensorId() {
			return this.tensorManager.reserveTensorId();
		}
		releaseTensorId(e) {
			at("verbose", () => `[WebNN] releaseTensorId {tensorId: ${e}}`), this.tensorManager.releaseTensorId(e);
		}
		async ensureTensor(e, t, r, s, n) {
			let a = Bs.get(r);
			if (!a) throw new Error(`Unsupported ONNX data type: ${r}`);
			return this.tensorManager.ensureTensor(e ?? this.currentSessionId, t, a, s, n);
		}
		async createTemporaryTensor(e, t, r) {
			at("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);
			let s = Bs.get(t);
			if (!s) throw new Error(`Unsupported ONNX data type: ${t}`);
			let n = this.tensorManager.reserveTensorId();
			await this.tensorManager.ensureTensor(e, n, s, r, !1);
			let a = this.temporarySessionTensorIds.get(e);
			return a ? a.push(n) : this.temporarySessionTensorIds.set(e, [n]), n;
		}
		uploadTensor(e, t) {
			if (!Se().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
			at("verbose", () => `[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`), this.tensorManager.upload(e, t);
		}
		async downloadTensor(e, t) {
			return this.tensorManager.download(e, t);
		}
		createMLTensorDownloader(e, t) {
			return async () => {
				let r = await this.tensorManager.download(e);
				return u_(r, t);
			};
		}
		registerMLTensor(e, t, r, s) {
			let n = Bs.get(r);
			if (!n) throw new Error(`Unsupported ONNX data type: ${r}`);
			let a = this.tensorManager.registerTensor(e, t, n, s);
			return at("verbose", () => `[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${s}} -> {tensorId: ${a}}`), a;
		}
		registerMLConstant(e, t, r, s, n, a, o = !1) {
			if (!a) throw new Error("External mounted files are not available.");
			let i = e;
			e.startsWith("./") && (i = e.substring(2));
			let l = a.get(i);
			if (!l) throw new Error(`File with name ${i} not found in preloaded files.`);
			if (t + r > l.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
			let c = l.slice(t, t + r).buffer, d;
			switch (n.dataType) {
				case "float32":
					d = new Float32Array(c);
					break;
				case "float16":
					d = typeof Float16Array < "u" && Float16Array.from ? new Float16Array(c) : new Uint16Array(c);
					break;
				case "int32":
					d = new Int32Array(c);
					break;
				case "uint32":
					d = new Uint32Array(c);
					break;
				case "int64":
					if (o) {
						let h = jo(new Uint8Array(c), "int64");
						d = new Int32Array(h.buffer), n.dataType = "int32";
					} else d = new BigInt64Array(c);
					break;
				case "uint64":
					d = new BigUint64Array(c);
					break;
				case "int8":
					d = new Int8Array(c);
					break;
				case "int4":
				case "uint4":
				case "uint8":
					d = new Uint8Array(c);
					break;
				default: throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`);
			}
			return at("verbose", () => `[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${o ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`), s.constant(n, d);
		}
		registerGraphInput(e) {
			this.temporaryGraphInputs.push(e);
		}
		registerGraphOutput(e) {
			this.temporaryGraphOutputs.push(e);
		}
		isGraphInput(e, t) {
			let r = this.sessionGraphInputs.get(e);
			return r ? r.includes(t) : !1;
		}
		isGraphOutput(e, t) {
			let r = this.sessionGraphOutputs.get(e);
			return r ? r.includes(t) : !1;
		}
		isGraphInputOutputTypeSupported(e, t, r = !0) {
			let s = Bs.get(Ir(t)), n = this.mlOpSupportLimitsBySessionId.get(e);
			return typeof s > "u" ? !1 : r ? !!n?.input.dataTypes.includes(s) : !!n?.output.dataTypes.includes(s);
		}
		flush() {}
	};
}), Eh, mi, gi, mr, Ah, Eo, Hn, wi, vi, Ao, yi, bi, Mi, m_ = pe(() => {
	"use strict";
	Br(), S0(), P0(), us(), Rr(), hi(), c_(), Eh = (e, t) => {
		Se()._OrtInit(e, t) !== 0 && ke("Can't initialize onnxruntime.");
	}, mi = async (e) => {
		Eh(e.wasm.numThreads, Wn(e.logLevel));
	}, gi = async (e, t) => {
		Se().asyncInit?.();
		let r = e.webgpu.adapter;
		if (t === "webgpu") {
			if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
			if (r) {
				if (typeof r.limits != "object" || typeof r.features != "object" || typeof r.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
			} else {
				let s = e.webgpu.powerPreference;
				if (s !== void 0 && s !== "low-power" && s !== "high-performance") throw new Error(`Invalid powerPreference setting: "${s}"`);
				let n = e.webgpu.forceFallbackAdapter;
				if (n !== void 0 && typeof n != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);
				if (r = await navigator.gpu.requestAdapter({
					powerPreference: s,
					forceFallbackAdapter: n
				}), !r) throw new Error("Failed to get GPU adapter. You may need to enable flag \"--enable-unsafe-webgpu\" if you are using Chrome.");
			}
		}
		if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
		if (t === "webgpu" && Se().webgpuInit((s) => {
			e.webgpu.device = s;
		}), t === "webnn") {
			let s = new (I0(), Un(__)).WebNNBackend(e);
			Se().webnnInit([
				s,
				() => s.reserveTensorId(),
				(n) => s.releaseTensorId(n),
				async (n, a, o, i, l) => s.ensureTensor(n, a, o, i, l),
				(n, a) => {
					s.uploadTensor(n, a);
				},
				async (n, a) => s.downloadTensor(n, a),
				(n, a) => s.registerMLContext(n, a),
				!!e.trace
			]);
		}
	}, mr = /* @__PURE__ */ new Map(), Ah = (e) => {
		let t = Se(), r = t.stackSave();
		try {
			let s = t.PTR_SIZE, n = t.stackAlloc(2 * s);
			t._OrtGetInputOutputCount(e, n, n + s) !== 0 && ke("Can't get session input/output count.");
			let a = s === 4 ? "i32" : "i64";
			return [Number(t.getValue(n, a)), Number(t.getValue(n + s, a))];
		} finally {
			t.stackRestore(r);
		}
	}, Eo = (e, t) => {
		let r = Se(), s = r.stackSave(), n = 0;
		try {
			let a = r.PTR_SIZE, o = r.stackAlloc(2 * a);
			r._OrtGetInputOutputMetadata(e, t, o, o + a) !== 0 && ke("Can't get session input/output metadata.");
			let i = Number(r.getValue(o, "*"));
			n = Number(r.getValue(o + a, "*"));
			let l = r.HEAP32[n / 4];
			if (l === 0) return [i, 0];
			let c = r.HEAPU32[n / 4 + 1], d = [];
			for (let h = 0; h < c; h++) {
				let _ = Number(r.getValue(n + 8 + h * a, "*"));
				d.push(_ !== 0 ? r.UTF8ToString(_) : Number(r.getValue(n + 8 + (h + c) * a, "*")));
			}
			return [
				i,
				l,
				d
			];
		} finally {
			r.stackRestore(s), n !== 0 && r._OrtFree(n);
		}
	}, Hn = (e) => {
		let t = Se(), r = t._malloc(e.byteLength);
		if (r === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
		return t.HEAPU8.set(e, r), [r, e.byteLength];
	}, wi = async (e, t) => {
		let r, s, n = Se();
		Array.isArray(e) ? [r, s] = e : e.buffer === n.HEAPU8.buffer ? [r, s] = [e.byteOffset, e.byteLength] : [r, s] = Hn(e);
		let a = 0, o = 0, i = 0, l = [], c = [], d = [];
		try {
			if ([o, l] = await l_(t), t?.externalData && n.mountExternalData) {
				let k = [];
				for (let C of t.externalData) {
					let O = typeof C == "string" ? C : C.path;
					k.push(pi(typeof C == "string" ? C : C.data).then((x) => {
						n.mountExternalData(O, x);
					}));
				}
				await Promise.all(k);
			}
			for (let k of t?.executionProviders ?? []) if ((typeof k == "string" ? k : k.name) === "webnn") {
				if (n.shouldTransferToMLTensor = !1, typeof k != "string") {
					let C = k, O = C?.context, x = C?.gpuDevice, q = C?.deviceType, R = C?.powerPreference;
					O ? n.currentContext = O : x ? n.currentContext = await n.webnnCreateMLContext(x) : n.currentContext = await n.webnnCreateMLContext({
						deviceType: q,
						powerPreference: R
					});
				} else n.currentContext = await n.webnnCreateMLContext();
				break;
			}
			a = await n._OrtCreateSession(r, s, o), n.webgpuOnCreateSession?.(a), a === 0 && ke("Can't create a session."), n.jsepOnCreateSession?.(), n.currentContext && (n.webnnRegisterMLContext(a, n.currentContext), n.currentContext = void 0, n.shouldTransferToMLTensor = !0);
			let [h, _] = Ah(a), m = !!t?.enableGraphCapture, v = [], w = [], b = [], M = [], E = [];
			for (let k = 0; k < h; k++) {
				let [C, O, x] = Eo(a, k);
				C === 0 && ke("Can't get an input name."), c.push(C);
				let q = n.UTF8ToString(C);
				v.push(q), b.push(O === 0 ? {
					name: q,
					isTensor: !1
				} : {
					name: q,
					isTensor: !0,
					type: Rn(O),
					shape: x
				});
			}
			for (let k = 0; k < _; k++) {
				let [C, O, x] = Eo(a, k + h);
				C === 0 && ke("Can't get an output name."), d.push(C);
				let q = n.UTF8ToString(C);
				w.push(q), M.push(O === 0 ? {
					name: q,
					isTensor: !1
				} : {
					name: q,
					isTensor: !0,
					type: Rn(O),
					shape: x
				});
				{
					if (m && t?.preferredOutputLocation === void 0) {
						E.push("gpu-buffer");
						continue;
					}
					let R = typeof t?.preferredOutputLocation == "string" ? t.preferredOutputLocation : t?.preferredOutputLocation?.[q] ?? "cpu", G = n.webnnIsGraphOutput;
					if (R === "cpu" && G && G(a, q)) {
						E.push("ml-tensor-cpu-output");
						continue;
					}
					if (R !== "cpu" && R !== "cpu-pinned" && R !== "gpu-buffer" && R !== "ml-tensor") throw new Error(`Not supported preferred output location: ${R}.`);
					if (m && R !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${R}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
					E.push(R);
				}
			}
			let A = null;
			return E.some((k) => k === "gpu-buffer" || k === "ml-tensor" || k === "ml-tensor-cpu-output") && (i = n._OrtCreateBinding(a), i === 0 && ke("Can't create IO binding."), A = {
				handle: i,
				outputPreferredLocations: E,
				outputPreferredLocationsEncoded: E.map((k) => k === "ml-tensor-cpu-output" ? "ml-tensor" : k).map((k) => Uo(k))
			}), mr.set(a, [
				a,
				c,
				d,
				A,
				m,
				!1
			]), [
				a,
				v,
				w,
				b,
				M
			];
		} catch (h) {
			throw c.forEach((_) => n._OrtFree(_)), d.forEach((_) => n._OrtFree(_)), i !== 0 && n._OrtReleaseBinding(i) !== 0 && ke("Can't release IO binding."), a !== 0 && n._OrtReleaseSession(a) !== 0 && ke("Can't release session."), h;
		} finally {
			n._free(r), o !== 0 && n._OrtReleaseSessionOptions(o) !== 0 && ke("Can't release session options."), l.forEach((h) => n._free(h)), n.unmountExternalData?.();
		}
	}, vi = (e) => {
		let t = Se(), r = mr.get(e);
		if (!r) throw new Error(`cannot release session. invalid session id: ${e}`);
		let [s, n, a, o, i] = r;
		o && (i && t._OrtClearBoundOutputs(o.handle) !== 0 && ke("Can't clear bound outputs."), t._OrtReleaseBinding(o.handle) !== 0 && ke("Can't release IO binding.")), t.jsepOnReleaseSession?.(e), t.webnnOnReleaseSession?.(e), t.webgpuOnReleaseSession?.(e), n.forEach((l) => t._OrtFree(l)), a.forEach((l) => t._OrtFree(l)), t._OrtReleaseSession(s) !== 0 && ke("Can't release session."), mr.delete(e);
	}, Ao = async (e, t, r, s, n, a, o = !1) => {
		if (!e) {
			t.push(0);
			return;
		}
		let i = Se(), l = i.PTR_SIZE, c = e[0], d = e[1], h = e[3], _ = h, m, v;
		if (c === "string" && (h === "gpu-buffer" || h === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
		if (o && h !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);
		if (h === "gpu-buffer") {
			let M = e[2].gpuBuffer;
			v = es(Ir(c), d);
			{
				let E = i.webgpuRegisterBuffer;
				if (!E) throw new Error("Tensor location \"gpu-buffer\" is not supported without using WebGPU.");
				m = E(M, s);
			}
		} else if (h === "ml-tensor") {
			let M = e[2].mlTensor;
			v = es(Ir(c), d);
			let E = i.webnnRegisterMLTensor;
			if (!E) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
			m = E(s, M, Ir(c), d);
		} else {
			let M = e[2];
			if (Array.isArray(M)) {
				v = l * M.length, m = i._malloc(v), r.push(m);
				for (let E = 0; E < M.length; E++) {
					if (typeof M[E] != "string") throw new TypeError(`tensor data at index ${E} is not a string`);
					i.setValue(m + E * l, gt(M[E], r), "*");
				}
			} else {
				let E = i.webnnIsGraphInput, A = i.webnnIsGraphOutput;
				if (c !== "string" && E && A) {
					let k = i.UTF8ToString(n);
					if (E(s, k) || A(s, k)) {
						let C = Ir(c);
						v = es(C, d), _ = "ml-tensor";
						let O = i.webnnCreateTemporaryTensor, x = i.webnnUploadTensor;
						if (!O || !x) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
						let q = await O(s, C, d);
						x(q, new Uint8Array(M.buffer, M.byteOffset, M.byteLength)), m = q;
					} else v = M.byteLength, m = i._malloc(v), r.push(m), i.HEAPU8.set(new Uint8Array(M.buffer, M.byteOffset, v), m);
				} else v = M.byteLength, m = i._malloc(v), r.push(m), i.HEAPU8.set(new Uint8Array(M.buffer, M.byteOffset, v), m);
			}
		}
		let w = i.stackSave(), b = i.stackAlloc(4 * d.length);
		try {
			d.forEach((E, A) => i.setValue(b + A * l, E, l === 4 ? "i32" : "i64"));
			let M = i._OrtCreateTensor(Ir(c), m, v, b, d.length, Uo(_));
			M === 0 && ke(`Can't create tensor for input/output. session=${s}, index=${a}.`), t.push(M);
		} finally {
			i.stackRestore(w);
		}
	}, yi = async (e, t, r, s, n, a) => {
		let o = Se(), i = o.PTR_SIZE, l = mr.get(e);
		if (!l) throw new Error(`cannot run inference. invalid session id: ${e}`);
		let c = l[0], d = l[1], h = l[2], _ = l[3], m = l[4], v = l[5], w = t.length, b = s.length, M = 0, E = [], A = [], k = [], C = [], O = [], x = o.stackSave(), q = o.stackAlloc(w * i), R = o.stackAlloc(w * i), G = o.stackAlloc(b * i), W = o.stackAlloc(b * i);
		try {
			[M, E] = i_(a), br("wasm prepareInputOutputTensor");
			for (let U = 0; U < w; U++) await Ao(r[U], A, C, e, d[t[U]], t[U], m);
			for (let U = 0; U < b; U++) await Ao(n[U], k, C, e, h[s[U]], w + s[U], m);
			Mr("wasm prepareInputOutputTensor");
			for (let U = 0; U < w; U++) o.setValue(q + U * i, A[U], "*"), o.setValue(R + U * i, d[t[U]], "*");
			for (let U = 0; U < b; U++) o.setValue(G + U * i, k[U], "*"), o.setValue(W + U * i, h[s[U]], "*");
			if (_ && !v) {
				let { handle: U, outputPreferredLocations: ae, outputPreferredLocationsEncoded: Z } = _;
				if (d.length !== w) throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${d.length}).`);
				br("wasm bindInputsOutputs");
				for (let I = 0; I < w; I++) {
					let N = t[I];
					await o._OrtBindInput(U, d[N], A[I]) !== 0 && ke(`Can't bind input[${I}] for session=${e}.`);
				}
				for (let I = 0; I < b; I++) {
					let N = s[I];
					n[I]?.[3] ? (O.push(k[I]), o._OrtBindOutput(U, h[N], k[I], 0) !== 0 && ke(`Can't bind pre-allocated output[${I}] for session=${e}.`)) : o._OrtBindOutput(U, h[N], 0, Z[N]) !== 0 && ke(`Can't bind output[${I}] to ${ae[I]} for session=${e}.`);
				}
				Mr("wasm bindInputsOutputs"), mr.set(e, [
					c,
					d,
					h,
					_,
					m,
					!0
				]);
			}
			o.jsepOnRunStart?.(c), o.webnnOnRunStart?.(c);
			let H;
			_ ? H = await o._OrtRunWithBinding(c, _.handle, b, G, M) : H = await o._OrtRun(c, R, q, w, W, b, G, M), H !== 0 && ke("failed to call OrtRun().");
			let D = [], F = [];
			br("wasm ProcessOutputTensor");
			for (let U = 0; U < b; U++) {
				let ae = Number(o.getValue(G + U * i, "*"));
				if (ae === k[U] || O.includes(k[U])) {
					D.push(n[U]), ae !== k[U] && o._OrtReleaseTensor(ae) !== 0 && ke("Can't release tensor.");
					continue;
				}
				let Z = o.stackSave(), I = o.stackAlloc(4 * i), N = !1, B, Q = 0;
				try {
					o._OrtGetTensorData(ae, I, I + i, I + 2 * i, I + 3 * i) !== 0 && ke(`Can't access output tensor data on index ${U}.`);
					let ue = i === 4 ? "i32" : "i64", de = Number(o.getValue(I, ue));
					Q = o.getValue(I + i, "*");
					let ve = o.getValue(I + i * 2, "*"), ut = Number(o.getValue(I + i * 3, ue)), Fe = [];
					for (let be = 0; be < ut; be++) Fe.push(Number(o.getValue(ve + be * i, ue)));
					o._OrtFree(ve) !== 0 && ke("Can't free memory for tensor dims.");
					let Qe = Fe.reduce((be, Le) => be * Le, 1);
					B = Rn(de);
					let ht = _?.outputPreferredLocations[s[U]];
					if (B === "string") {
						if (ht === "gpu-buffer" || ht === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
						let be = [];
						for (let Le = 0; Le < Qe; Le++) {
							let nt = o.getValue(Q + Le * i, "*"), Me = o.getValue(Q + (Le + 1) * i, "*"), xe = Le === Qe - 1 ? void 0 : Me - nt;
							be.push(o.UTF8ToString(nt, xe));
						}
						D.push([
							B,
							Fe,
							be,
							"cpu"
						]);
					} else if (ht === "gpu-buffer" && Qe > 0) {
						let be = o.webgpuGetBuffer;
						if (!be) throw new Error("preferredLocation \"gpu-buffer\" is not supported without using WebGPU.");
						let Le = be(Q), nt = es(de, Qe);
						if (nt === void 0 || !fi(B)) throw new Error(`Unsupported data type: ${B}`);
						N = !0;
						{
							o.webgpuRegisterBuffer(Le, e, Q);
							let Me = o.webgpuCreateDownloader(Le, nt, e);
							D.push([
								B,
								Fe,
								{
									gpuBuffer: Le,
									download: async () => {
										let xe = await Me();
										return new (Xs(B))(xe);
									},
									dispose: () => {
										o._OrtReleaseTensor(ae) !== 0 && ke("Can't release tensor.");
									}
								},
								"gpu-buffer"
							]);
						}
					} else if (ht === "ml-tensor" && Qe > 0) {
						let be = o.webnnEnsureTensor, Le = o.webnnIsGraphInputOutputTypeSupported;
						if (!be || !Le) throw new Error("preferredLocation \"ml-tensor\" is not supported without using WebNN.");
						if (es(de, Qe) === void 0 || !_i(B)) throw new Error(`Unsupported data type: ${B}`);
						if (!Le(e, B, !1)) throw new Error(`preferredLocation "ml-tensor" for ${B} output is not supported by current WebNN Context.`);
						let nt = await be(e, Q, de, Fe, !1);
						N = !0, D.push([
							B,
							Fe,
							{
								mlTensor: nt,
								download: o.webnnCreateMLTensorDownloader(Q, B),
								dispose: () => {
									o.webnnReleaseTensorId(Q), o._OrtReleaseTensor(ae);
								}
							},
							"ml-tensor"
						]);
					} else if (ht === "ml-tensor-cpu-output" && Qe > 0) {
						let be = o.webnnCreateMLTensorDownloader(Q, B)(), Le = D.length;
						N = !0, F.push((async () => {
							let nt = [Le, await be];
							return o.webnnReleaseTensorId(Q), o._OrtReleaseTensor(ae), nt;
						})()), D.push([
							B,
							Fe,
							[],
							"cpu"
						]);
					} else {
						let be = new (Xs(B))(Qe);
						new Uint8Array(be.buffer, be.byteOffset, be.byteLength).set(o.HEAPU8.subarray(Q, Q + be.byteLength)), D.push([
							B,
							Fe,
							be,
							"cpu"
						]);
					}
				} finally {
					o.stackRestore(Z), B === "string" && Q && o._free(Q), N || o._OrtReleaseTensor(ae);
				}
			}
			_ && !m && (o._OrtClearBoundOutputs(_.handle) !== 0 && ke("Can't clear bound outputs."), mr.set(e, [
				c,
				d,
				h,
				_,
				m,
				!1
			]));
			for (let [U, ae] of await Promise.all(F)) D[U][2] = ae;
			return Mr("wasm ProcessOutputTensor"), D;
		} finally {
			o.webnnOnRunEnd?.(c), o.stackRestore(x), r.forEach((H) => {
				H && H[3] === "gpu-buffer" && o.webgpuUnregisterBuffer(H[2].gpuBuffer);
			}), n.forEach((H) => {
				H && H[3] === "gpu-buffer" && o.webgpuUnregisterBuffer(H[2].gpuBuffer);
			}), A.forEach((H) => o._OrtReleaseTensor(H)), k.forEach((H) => o._OrtReleaseTensor(H)), C.forEach((H) => o._free(H)), M !== 0 && o._OrtReleaseRunOptions(M), E.forEach((H) => o._free(H));
		}
	}, bi = (e) => {
		let t = Se(), r = mr.get(e);
		if (!r) throw new Error("invalid session id");
		let s = r[0], n = t._OrtEndProfiling(s);
		n === 0 && ke("Can't get an profile file name."), t._OrtFree(n);
	}, Mi = (e) => {
		let t = [];
		for (let r of e) {
			let s = r[2];
			!Array.isArray(s) && "buffer" in s && t.push(s.buffer);
		}
		return t;
	};
}), gr, Mt, Xr, Rs, Gs, Sn, Co, Pn, Ar, Cr, Ch, g_, w_, v_, y_, b_, M_, x_, k_ = pe(() => {
	"use strict";
	Br(), m_(), Rr(), ui(), gr = () => !!De.wasm.proxy && typeof document < "u", Xr = !1, Rs = !1, Gs = !1, Pn = /* @__PURE__ */ new Map(), Ar = (e, t) => {
		let r = Pn.get(e);
		r ? r.push(t) : Pn.set(e, [t]);
	}, Cr = () => {
		if (Xr || !Rs || Gs || !Mt) throw new Error("worker not ready");
	}, Ch = (e) => {
		switch (e.data.type) {
			case "init-wasm":
				Xr = !1, e.data.err ? (Gs = !0, Co[1](e.data.err)) : (Rs = !0, Co[0]()), Sn && (URL.revokeObjectURL(Sn), Sn = void 0);
				break;
			case "init-ep":
			case "copy-from":
			case "create":
			case "release":
			case "run":
			case "end-profiling": {
				let t = Pn.get(e.data.type);
				e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
				break;
			}
			default:
		}
	}, g_ = async () => {
		if (!Rs) {
			if (Xr) throw new Error("multiple calls to 'initWasm()' detected.");
			if (Gs) throw new Error("previous call to 'initWasm()' failed.");
			if (Xr = !0, gr()) return new Promise((e, t) => {
				Mt?.terminate(), a_().then(([r, s]) => {
					try {
						Mt = s, Mt.onerror = (a) => t(a), Mt.onmessage = Ch, Co = [e, t];
						let n = {
							type: "init-wasm",
							in: De
						};
						!n.in.wasm.wasmPaths && (r || Vo) && (n.in.wasm.wasmPaths = { wasm: new URL("" + new URL("ort-wasm-simd-threaded.asyncify-DMmc6YqF.wasm", import.meta.url).href, "" + import.meta.url).href }), Mt.postMessage(n), Sn = r;
					} catch (n) {
						t(n);
					}
				}, t);
			});
			try {
				await di(De.wasm), await mi(De), Rs = !0;
			} catch (e) {
				throw Gs = !0, e;
			} finally {
				Xr = !1;
			}
		}
	}, w_ = async (e) => {
		if (gr()) return Cr(), new Promise((t, r) => {
			Ar("init-ep", [t, r]);
			let s = {
				type: "init-ep",
				in: {
					epName: e,
					env: De
				}
			};
			Mt.postMessage(s);
		});
		await gi(De, e);
	}, v_ = async (e) => gr() ? (Cr(), new Promise((t, r) => {
		Ar("copy-from", [t, r]);
		let s = {
			type: "copy-from",
			in: { buffer: e }
		};
		Mt.postMessage(s, [e.buffer]);
	})) : Hn(e), y_ = async (e, t) => {
		if (gr()) {
			if (t?.preferredOutputLocation) throw new Error("session option \"preferredOutputLocation\" is not supported for proxy.");
			return Cr(), new Promise((r, s) => {
				Ar("create", [r, s]);
				let n = {
					type: "create",
					in: {
						model: e,
						options: { ...t }
					}
				}, a = [];
				e instanceof Uint8Array && a.push(e.buffer), Mt.postMessage(n, a);
			});
		} else return wi(e, t);
	}, b_ = async (e) => {
		if (gr()) return Cr(), new Promise((t, r) => {
			Ar("release", [t, r]);
			let s = {
				type: "release",
				in: e
			};
			Mt.postMessage(s);
		});
		vi(e);
	}, M_ = async (e, t, r, s, n, a) => {
		if (gr()) {
			if (r.some((o) => o[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
			if (n.some((o) => o)) throw new Error("pre-allocated output tensor is not supported for proxy.");
			return Cr(), new Promise((o, i) => {
				Ar("run", [o, i]);
				let l = r, c = {
					type: "run",
					in: {
						sessionId: e,
						inputIndices: t,
						inputs: l,
						outputIndices: s,
						options: a
					}
				};
				Mt.postMessage(c, Mi(l));
			});
		} else return yi(e, t, r, s, n, a);
	}, x_ = async (e) => {
		if (gr()) return Cr(), new Promise((t, r) => {
			Ar("end-profiling", [t, r]);
			let s = {
				type: "end-profiling",
				in: e
			};
			Mt.postMessage(s);
		});
		bi(e);
	};
}), So, Sh, T_, O0 = pe(() => {
	"use strict";
	Br(), k_(), us(), ci(), c_(), So = (e, t) => {
		switch (e.location) {
			case "cpu": return [
				e.type,
				e.dims,
				e.data,
				"cpu"
			];
			case "gpu-buffer": return [
				e.type,
				e.dims,
				{ gpuBuffer: e.gpuBuffer },
				"gpu-buffer"
			];
			case "ml-tensor": return [
				e.type,
				e.dims,
				{ mlTensor: e.mlTensor },
				"ml-tensor"
			];
			default: throw new Error(`invalid data location: ${e.location} for ${t()}`);
		}
	}, Sh = (e) => {
		switch (e[3]) {
			case "cpu": return new St(e[0], e[2], e[1]);
			case "gpu-buffer": {
				let t = e[0];
				if (!fi(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
				let { gpuBuffer: r, download: s, dispose: n } = e[2];
				return St.fromGpuBuffer(r, {
					dataType: t,
					dims: e[1],
					download: s,
					dispose: n
				});
			}
			case "ml-tensor": {
				let t = e[0];
				if (!_i(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
				let { mlTensor: r, download: s, dispose: n } = e[2];
				return St.fromMLTensor(r, {
					dataType: t,
					dims: e[1],
					download: s,
					dispose: n
				});
			}
			default: throw new Error(`invalid data location: ${e[3]}`);
		}
	}, T_ = class {
		async fetchModelAndCopyToWasmMemory(e) {
			return v_(await pi(e));
		}
		async loadModel(e, t) {
			Dr();
			let r;
			typeof e == "string" ? r = await this.fetchModelAndCopyToWasmMemory(e) : r = e, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await y_(r, t), zr();
		}
		async dispose() {
			return b_(this.sessionId);
		}
		async run(e, t, r) {
			Dr();
			let s = [], n = [];
			Object.entries(e).forEach((h) => {
				let _ = h[0], m = h[1], v = this.inputNames.indexOf(_);
				if (v === -1) throw new Error(`invalid input '${_}'`);
				s.push(m), n.push(v);
			});
			let a = [], o = [];
			Object.entries(t).forEach((h) => {
				let _ = h[0], m = h[1], v = this.outputNames.indexOf(_);
				if (v === -1) throw new Error(`invalid output '${_}'`);
				a.push(m), o.push(v);
			});
			let i = s.map((h, _) => So(h, () => `input "${this.inputNames[n[_]]}"`)), l = a.map((h, _) => h ? So(h, () => `output "${this.outputNames[o[_]]}"`) : null), c = await M_(this.sessionId, n, i, o, l, r), d = {};
			for (let h = 0; h < c.length; h++) d[this.outputNames[o[h]]] = a[h] ?? Sh(c[h]);
			return zr(), d;
		}
		startProfiling() {}
		endProfiling() {
			x_(this.sessionId);
		}
	};
}), E_ = {};
en(E_, {
	OnnxruntimeWebAssemblyBackend: () => Wo,
	initializeFlags: () => qo,
	wasmBackend: () => A_
});
var qo, Wo, A_, N0 = pe(() => {
	"use strict";
	Br(), k_(), O0(), qo = () => {
		(typeof De.wasm.initTimeout != "number" || De.wasm.initTimeout < 0) && (De.wasm.initTimeout = 0);
		let e = De.wasm.simd;
		if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`), De.wasm.simd = !1), typeof De.wasm.proxy != "boolean" && (De.wasm.proxy = !1), typeof De.wasm.trace != "boolean" && (De.wasm.trace = !1), typeof De.wasm.numThreads != "number" || !Number.isInteger(De.wasm.numThreads) || De.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) De.wasm.numThreads = 1;
		else {
			let t = typeof navigator > "u" ? h0("node:os").cpus().length : navigator.hardwareConcurrency;
			De.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
		}
	}, Wo = class {
		async init(e) {
			qo(), await g_(), await w_(e);
		}
		async createInferenceSessionHandler(e, t) {
			let r = new T_();
			return await r.loadModel(e, t), r;
		}
	}, A_ = new Wo();
});
Br();
Br();
Br();
var D0 = "1.26.0-dev.20260416-b7804b056c", z0 = Zf;
{
	let e = (N0(), Un(E_)).wasmBackend;
	Or("webgpu", e, 5), Or("webnn", e, 5), Or("cpu", e, 10), Or("wasm", e, 10);
}
Object.defineProperty(De.versions, "web", {
	value: D0,
	enumerable: !0
});
const B0 = "1.24.0-dev.20251116-b39e144322";
let Ph = "warning";
Object.defineProperty({
	wasm: {},
	webgl: {},
	webgpu: {},
	versions: { common: B0 },
	set logLevel(e) {
		if (e !== void 0) {
			if (typeof e != "string" || [
				"verbose",
				"info",
				"warning",
				"error",
				"fatal"
			].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
			Ph = e;
		}
	},
	get logLevel() {
		return Ph;
	}
}, "logLevel", { enumerable: !0 });
const G0 = (e, t) => {
	const r = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
	r.width = e.dims[3], r.height = e.dims[2];
	const s = r.getContext("2d");
	if (s != null) {
		let n, a;
		t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (n = e.dims[2], a = e.dims[3]) : (n = e.dims[3], a = e.dims[2]);
		const o = t?.format !== void 0 ? t.format : "RGB", i = t?.norm;
		let l, c;
		i === void 0 || i.mean === void 0 ? l = [
			255,
			255,
			255,
			255
		] : typeof i.mean == "number" ? l = [
			i.mean,
			i.mean,
			i.mean,
			i.mean
		] : (l = [
			i.mean[0],
			i.mean[1],
			i.mean[2],
			0
		], i.mean[3] !== void 0 && (l[3] = i.mean[3])), i === void 0 || i.bias === void 0 ? c = [
			0,
			0,
			0,
			0
		] : typeof i.bias == "number" ? c = [
			i.bias,
			i.bias,
			i.bias,
			i.bias
		] : (c = [
			i.bias[0],
			i.bias[1],
			i.bias[2],
			0
		], i.bias[3] !== void 0 && (c[3] = i.bias[3]));
		const d = a * n;
		let h = 0, _ = d, m = d * 2, v = -1;
		o === "RGBA" ? (h = 0, _ = d, m = d * 2, v = d * 3) : o === "RGB" ? (h = 0, _ = d, m = d * 2) : o === "RBG" && (h = 0, m = d, _ = d * 2);
		for (let w = 0; w < a; w++) for (let b = 0; b < n; b++) {
			const M = (e.data[h++] - c[0]) * l[0], E = (e.data[_++] - c[1]) * l[1], A = (e.data[m++] - c[2]) * l[2], k = v === -1 ? 255 : (e.data[v++] - c[3]) * l[3];
			s.fillStyle = "rgba(" + M + "," + E + "," + A + "," + k + ")", s.fillRect(b, w, 1, 1);
		}
		if ("toDataURL" in r) return r.toDataURL();
		throw new Error("toDataURL is not supported");
	} else throw new Error("Can not access image data");
}, $0 = (e, t) => {
	const r = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
	let s;
	if (r != null) {
		let n, a, o;
		t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (n = e.dims[2], a = e.dims[1], o = e.dims[3]) : (n = e.dims[3], a = e.dims[2], o = e.dims[1]);
		const i = t !== void 0 && t.format !== void 0 ? t.format : "RGB", l = t?.norm;
		let c, d;
		l === void 0 || l.mean === void 0 ? c = [
			255,
			255,
			255,
			255
		] : typeof l.mean == "number" ? c = [
			l.mean,
			l.mean,
			l.mean,
			l.mean
		] : (c = [
			l.mean[0],
			l.mean[1],
			l.mean[2],
			255
		], l.mean[3] !== void 0 && (c[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? d = [
			0,
			0,
			0,
			0
		] : typeof l.bias == "number" ? d = [
			l.bias,
			l.bias,
			l.bias,
			l.bias
		] : (d = [
			l.bias[0],
			l.bias[1],
			l.bias[2],
			0
		], l.bias[3] !== void 0 && (d[3] = l.bias[3]));
		const h = a * n;
		if (t !== void 0 && (t.format !== void 0 && o === 4 && t.format !== "RGBA" || o === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
		const _ = 4;
		let m = 0, v = 1, w = 2, b = 3, M = 0, E = h, A = h * 2, k = -1;
		i === "RGBA" ? (M = 0, E = h, A = h * 2, k = h * 3) : i === "RGB" ? (M = 0, E = h, A = h * 2) : i === "RBG" && (M = 0, A = h, E = h * 2), s = r.createImageData(n, a);
		for (let C = 0; C < a * n; m += _, v += _, w += _, b += _, C++) s.data[m] = (e.data[M++] - d[0]) * c[0], s.data[v] = (e.data[E++] - d[1]) * c[1], s.data[w] = (e.data[A++] - d[2]) * c[2], s.data[b] = k === -1 ? 255 : (e.data[k++] - d[3]) * c[3];
	} else throw new Error("Can not access image data");
	return s;
}, Po = (e, t) => {
	if (e === void 0) throw new Error("Image buffer must be defined");
	if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
	if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
	const { height: r, width: s } = t, n = t.norm ?? {
		mean: 255,
		bias: 0
	};
	let a, o;
	typeof n.mean == "number" ? a = [
		n.mean,
		n.mean,
		n.mean,
		n.mean
	] : a = [
		n.mean[0],
		n.mean[1],
		n.mean[2],
		n.mean[3] ?? 255
	], typeof n.bias == "number" ? o = [
		n.bias,
		n.bias,
		n.bias,
		n.bias
	] : o = [
		n.bias[0],
		n.bias[1],
		n.bias[2],
		n.bias[3] ?? 0
	];
	const i = t.format !== void 0 ? t.format : "RGBA", l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", c = r * s, d = l === "RGBA" ? new Float32Array(c * 4) : new Float32Array(c * 3);
	let h = 4, _ = 0, m = 1, v = 2, w = 3, b = 0, M = c, E = c * 2, A = -1;
	i === "RGB" && (h = 3, _ = 0, m = 1, v = 2, w = -1), l === "RGBA" ? A = c * 3 : l === "RBG" ? (b = 0, E = c, M = c * 2) : l === "BGR" && (E = 0, M = c, b = c * 2);
	for (let k = 0; k < c; k++, _ += h, v += h, m += h, w += h) d[b++] = (e[_] + o[0]) / a[0], d[M++] = (e[m] + o[1]) / a[1], d[E++] = (e[v] + o[2]) / a[2], A !== -1 && w !== -1 && (d[A++] = (e[w] + o[3]) / a[3]);
	return l === "RGBA" ? new Tt("float32", d, [
		1,
		4,
		r,
		s
	]) : new Tt("float32", d, [
		1,
		3,
		r,
		s
	]);
}, V0 = async (e, t) => {
	const r = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, s = typeof ImageData < "u" && e instanceof ImageData, n = typeof ImageBitmap < "u" && e instanceof ImageBitmap, a = typeof e == "string";
	let o, i = t ?? {};
	const l = () => {
		if (typeof document < "u") return document.createElement("canvas");
		if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
		throw new Error("Canvas is not supported");
	}, c = (d) => typeof HTMLCanvasElement < "u" && d instanceof HTMLCanvasElement || d instanceof OffscreenCanvas ? d.getContext("2d") : null;
	if (r) {
		const d = l();
		d.width = e.width, d.height = e.height;
		const h = c(d);
		if (h != null) {
			let _ = e.height, m = e.width;
			if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (_ = t.resizedHeight, m = t.resizedWidth), t !== void 0) {
				if (i = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
				i.tensorFormat = "RGBA", i.height = _, i.width = m;
			} else i.tensorFormat = "RGBA", i.height = _, i.width = m;
			h.drawImage(e, 0, 0), o = h.getImageData(0, 0, m, _).data;
		} else throw new Error("Can not access image data");
	} else if (s) {
		let d, h;
		if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (d = t.resizedHeight, h = t.resizedWidth) : (d = e.height, h = e.width), t !== void 0 && (i = t), i.format = "RGBA", i.height = d, i.width = h, t !== void 0) {
			const _ = l();
			_.width = h, _.height = d;
			const m = c(_);
			if (m != null) m.putImageData(e, 0, 0), o = m.getImageData(0, 0, h, d).data;
			else throw new Error("Can not access image data");
		} else o = e.data;
	} else if (n) {
		if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
		const d = l();
		d.width = e.width, d.height = e.height;
		const h = c(d);
		if (h != null) {
			const _ = e.height, m = e.width;
			return h.drawImage(e, 0, 0, m, _), o = h.getImageData(0, 0, m, _).data, i.height = _, i.width = m, Po(o, i);
		} else throw new Error("Can not access image data");
	} else {
		if (a) return new Promise((d, h) => {
			const _ = l(), m = c(_);
			if (!e || !m) return h();
			const v = new Image();
			v.crossOrigin = "Anonymous", v.src = e, v.onload = () => {
				_.width = v.width, _.height = v.height, m.drawImage(v, 0, 0, _.width, _.height);
				const w = m.getImageData(0, 0, _.width, _.height);
				i.height = _.height, i.width = _.width, d(Po(w.data, i));
			};
		});
		throw new Error("Input data provided is not supported - aborted tensor creation");
	}
	if (o !== void 0) return Po(o, i);
	throw new Error("Input data provided is not supported - aborted tensor creation");
}, U0 = (e, t) => {
	const { width: r, height: s, download: n, dispose: a } = t;
	return new Tt({
		location: "texture",
		type: "float32",
		texture: e,
		dims: [
			1,
			s,
			r,
			4
		],
		download: n,
		dispose: a
	});
}, j0 = (e, t) => {
	const { dataType: r, dims: s, download: n, dispose: a } = t;
	return new Tt({
		location: "gpu-buffer",
		type: r ?? "float32",
		gpuBuffer: e,
		dims: s,
		download: n,
		dispose: a
	});
}, q0 = (e, t) => {
	const { dataType: r, dims: s, download: n, dispose: a } = t;
	return new Tt({
		location: "ml-tensor",
		type: r ?? "float32",
		mlTensor: e,
		dims: s,
		download: n,
		dispose: a
	});
}, W0 = (e, t, r) => new Tt({
	location: "cpu-pinned",
	type: e,
	data: t,
	dims: r ?? [t.length]
}), rs = /* @__PURE__ */ new Map([
	["float32", Float32Array],
	["uint8", Uint8Array],
	["int8", Int8Array],
	["uint16", Uint16Array],
	["int16", Int16Array],
	["int32", Int32Array],
	["bool", Uint8Array],
	["float64", Float64Array],
	["uint32", Uint32Array],
	["int4", Uint8Array],
	["uint4", Uint8Array]
]), Gn = /* @__PURE__ */ new Map([
	[Float32Array, "float32"],
	[Uint8Array, "uint8"],
	[Int8Array, "int8"],
	[Uint16Array, "uint16"],
	[Int16Array, "int16"],
	[Int32Array, "int32"],
	[Float64Array, "float64"],
	[Uint32Array, "uint32"]
]);
let Fh = !1;
const H0 = () => {
	if (!Fh) {
		Fh = !0;
		const e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, r = globalThis.Float16Array, s = typeof r < "u" && r.from;
		e && (rs.set("int64", BigInt64Array), Gn.set(BigInt64Array, "int64")), t && (rs.set("uint64", BigUint64Array), Gn.set(BigUint64Array, "uint64")), s ? (rs.set("float16", r), Gn.set(r, "float16")) : rs.set("float16", Uint16Array);
	}
}, Q0 = (e) => {
	let t = 1;
	for (let r = 0; r < e.length; r++) {
		const s = e[r];
		if (typeof s != "number" || !Number.isSafeInteger(s)) throw new TypeError(`dims[${r}] must be an integer, got: ${s}`);
		if (s < 0) throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${s}`);
		t *= s;
	}
	return t;
}, X0 = (e, t) => {
	switch (e.location) {
		case "cpu": return new Tt(e.type, e.data, t);
		case "cpu-pinned": return new Tt({
			location: "cpu-pinned",
			data: e.data,
			type: e.type,
			dims: t
		});
		case "texture": return new Tt({
			location: "texture",
			texture: e.texture,
			type: e.type,
			dims: t
		});
		case "gpu-buffer": return new Tt({
			location: "gpu-buffer",
			gpuBuffer: e.gpuBuffer,
			type: e.type,
			dims: t
		});
		case "ml-tensor": return new Tt({
			location: "ml-tensor",
			mlTensor: e.mlTensor,
			type: e.type,
			dims: t
		});
		default: throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
	}
};
var Tt = class {
	constructor(e, t, r) {
		H0();
		let s, n;
		if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, s = e.type, n = e.dims, e.location) {
			case "cpu-pinned": {
				const o = rs.get(s);
				if (!o) throw new TypeError(`unsupported type "${s}" to create tensor from pinned buffer`);
				if (!(e.data instanceof o)) throw new TypeError(`buffer should be of type ${o.name}`);
				this.cpuData = e.data;
				break;
			}
			case "texture":
				if (s !== "float32") throw new TypeError(`unsupported type "${s}" to create tensor from texture`);
				this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
				break;
			case "gpu-buffer":
				if (s !== "float32" && s !== "float16" && s !== "int32" && s !== "int64" && s !== "uint32" && s !== "uint8" && s !== "bool" && s !== "uint4" && s !== "int4") throw new TypeError(`unsupported type "${s}" to create tensor from gpu buffer`);
				this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
				break;
			case "ml-tensor":
				if (s !== "float32" && s !== "float16" && s !== "int32" && s !== "int64" && s !== "uint32" && s !== "uint64" && s !== "int8" && s !== "uint8" && s !== "bool" && s !== "uint4" && s !== "int4") throw new TypeError(`unsupported type "${s}" to create tensor from MLTensor`);
				this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
				break;
			default: throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
		}
		else {
			let o, i;
			if (typeof e == "string") if (s = e, i = r, e === "string") {
				if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array.");
				o = t;
			} else {
				const l = rs.get(e);
				if (l === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`);
				if (Array.isArray(t)) {
					if (e === "float16" && l === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);
					e === "uint64" || e === "int64" ? o = l.from(t, BigInt) : o = l.from(t);
				} else if (t instanceof l) o = t;
				else if (t instanceof Uint8ClampedArray) if (e === "uint8") o = Uint8Array.from(t);
				else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
				else if (e === "float16" && t instanceof Uint16Array && l !== Uint16Array) o = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);
				else throw new TypeError(`A ${s} tensor's data must be type of ${l}`);
			}
			else if (i = t, Array.isArray(e)) {
				if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
				const l = typeof e[0];
				if (l === "string") s = "string", o = e;
				else if (l === "boolean") s = "bool", o = Uint8Array.from(e);
				else throw new TypeError(`Invalid element type of data array: ${l}.`);
			} else if (e instanceof Uint8ClampedArray) s = "uint8", o = Uint8Array.from(e);
			else {
				const l = Gn.get(e.constructor);
				if (l === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
				s = l, o = e;
			}
			if (i === void 0) i = [o.length];
			else if (!Array.isArray(i)) throw new TypeError("A tensor's dims must be a number array");
			n = i, this.cpuData = o, this.dataLocation = "cpu";
		}
		const a = Q0(n);
		if (this.cpuData && a !== this.cpuData.length && !((s === "uint4" || s === "int4") && Math.ceil(a / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);
		this.type = s, this.dims = n, this.size = a;
	}
	static async fromImage(e, t) {
		return V0(e, t);
	}
	static fromTexture(e, t) {
		return U0(e, t);
	}
	static fromGpuBuffer(e, t) {
		return j0(e, t);
	}
	static fromMLTensor(e, t) {
		return q0(e, t);
	}
	static fromPinnedBuffer(e, t, r) {
		return W0(e, t, r);
	}
	toDataURL(e) {
		return G0(this, e);
	}
	toImageData(e) {
		return $0(this, e);
	}
	get data() {
		if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
		return this.cpuData;
	}
	get location() {
		return this.dataLocation;
	}
	get texture() {
		if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
		return this.gpuTextureData;
	}
	get gpuBuffer() {
		if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
		return this.gpuBufferData;
	}
	get mlTensor() {
		if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
		return this.mlTensorData;
	}
	async getData(e) {
		switch (this.ensureValid(), this.dataLocation) {
			case "cpu":
			case "cpu-pinned": return this.data;
			case "texture":
			case "gpu-buffer":
			case "ml-tensor":
				if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
				if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
				try {
					this.isDownloading = !0;
					const t = await this.downloader();
					return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t;
				} finally {
					this.isDownloading = !1;
				}
			default: throw new Error(`cannot get data from location: ${this.dataLocation}`);
		}
	}
	dispose() {
		if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
		this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
	}
	ensureValid() {
		if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
	}
	reshape(e) {
		if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
		return X0(this, e);
	}
};
const Y0 = Tt;
var J0 = Object.defineProperty, ds = (e, t) => {
	for (var r in t) J0(e, r, {
		get: t[r],
		enumerable: !0
	});
}, vt = {}, Ht = {}, K0 = {}, Z0 = "4.2.0", xi = typeof self < "u", os = !F_(vt), C_ = !F_(Ht), Qn = xi && "caches" in self, eb = typeof globalThis.Deno < "u";
globalThis.Bun;
var na = eb && Qn && !os, S_ = typeof process < "u", P_ = S_ && process?.release?.name === "node" && !na, ki = typeof window < "u" && typeof window.document < "u", Ti = xi && [
	"DedicatedWorkerGlobalScope",
	"ServiceWorkerGlobalScope",
	"SharedWorkerGlobalScope"
].includes(self.constructor?.name), tb = ki || Ti || na, rb = P_ || typeof navigator < "u" && "gpu" in navigator, sb = typeof navigator < "u" && "ml" in navigator, nb = typeof crypto < "u" && typeof crypto.getRandomValues == "function", ab = typeof chrome < "u" && typeof chrome.runtime < "u" && typeof chrome.runtime.id == "string", ob = typeof ServiceWorkerGlobalScope < "u" && xi && self instanceof ServiceWorkerGlobalScope, ib = () => {
	if (typeof navigator > "u") return !1;
	const e = navigator.userAgent, t = (navigator.vendor || "").indexOf("Apple") > -1, r = !e.match(/CriOS|FxiOS|EdgiOS|OPiOS|mercury|brave/i) && !e.includes("Chrome") && !e.includes("Android");
	return t && r;
}, lb = ib(), ce = Object.freeze({
	IS_BROWSER_ENV: ki,
	IS_WEBWORKER_ENV: Ti,
	IS_WEB_ENV: tb,
	IS_SERVICE_WORKER_ENV: ob,
	IS_DENO_WEB_RUNTIME: na,
	IS_WEB_CACHE_AVAILABLE: Qn,
	IS_WEBGPU_AVAILABLE: rb,
	IS_WEBNN_AVAILABLE: sb,
	IS_SAFARI: lb,
	IS_PROCESS_AVAILABLE: S_,
	IS_NODE_ENV: P_,
	IS_FS_AVAILABLE: os,
	IS_PATH_AVAILABLE: C_,
	IS_CRYPTO_AVAILABLE: nb,
	IS_CHROME_AVAILABLE: ab
}), Ei = os && C_, Xn = "./";
if (Ei) {
	const e = Object(import.meta).url;
	e ? Xn = Ht.dirname(Ht.dirname(K0.fileURLToPath(e))) : typeof __dirname < "u" && (Xn = Ht.dirname(__dirname));
}
var cb = Ei ? Ht.join(Xn, "/.cache/") : null, Lh = "/models/", ub = Ei ? Ht.join(Xn, Lh) : Lh, db = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : void 0, Pt = Object.freeze({
	DEBUG: 10,
	INFO: 20,
	WARNING: 30,
	ERROR: 40,
	NONE: 50
}), Ih = Pt.WARNING, we = {
	version: Z0,
	backends: { onnx: {} },
	get logLevel() {
		return Ih;
	},
	set logLevel(e) {
		Ih = e, we.backends.onnx?.setLogLevel?.(e);
	},
	allowRemoteModels: !0,
	remoteHost: "https://huggingface.co/",
	remotePathTemplate: "{model}/resolve/{revision}/",
	allowLocalModels: !(ki || Ti || na),
	localModelPath: ub,
	useFS: os,
	useBrowserCache: Qn,
	useFSCache: os,
	cacheDir: cb,
	useCustomCache: !1,
	customCache: null,
	useWasmCache: Qn || os,
	cacheKey: "transformers-cache",
	experimental_useCrossOriginStorage: !1,
	fetch: db
};
function F_(e) {
	return Object.keys(e).length === 0;
}
var _t = class {
	constructor() {
		let e = function(...t) {
			return e._call(...t);
		};
		return Object.setPrototypeOf(e, new.target.prototype);
	}
	_call(...e) {
		throw Error("Must implement _call method in subclass");
	}
};
function yr(e, t) {
	e && e(t);
}
var Ho = class extends _t {
	constructor(e, t) {
		super(), this.callback = e, this.files_loading = t;
	}
	_call(e) {
		if (e.status === "progress") {
			this.files_loading[e.file] = {
				loaded: e.loaded,
				total: e.total
			};
			const t = Object.values(this.files_loading).reduce((n, a) => n + a.loaded, 0), r = Object.values(this.files_loading).reduce((n, a) => n + a.total, 0), s = r > 0 ? t / r * 100 : 0;
			this.callback({
				status: "progress_total",
				name: e.name,
				progress: s,
				loaded: t,
				total: r,
				files: structuredClone(this.files_loading)
			});
		}
		this.callback(e);
	}
};
function hb(e) {
	return Number.isInteger(e) || typeof e == "bigint";
}
function Oh(e) {
	return e == null || e === -1;
}
function Nh(e) {
	const t = [];
	let r = e;
	for (; Array.isArray(r);) t.push(r.length), r = r[0];
	return t;
}
function Ft(...e) {
	return Array.prototype.concat.apply([], e);
}
function fb(...e) {
	return e.reduce((t, r) => t.flatMap((s) => r.map((n) => [s, n])));
}
function Yn(e, t) {
	return Math.abs((e + t) % (2 * t) - t);
}
function Ke(e, t) {
	return Object.assign({}, ...t.map((r) => {
		if (e[r] !== void 0) return { [r]: e[r] };
	}));
}
function _b(e, t) {
	let r = 0;
	for (const s of e) s === t && ++r;
	return r;
}
var oe = {
	error(...e) {
		we.logLevel <= Pt.ERROR && console.error(...e);
	},
	warn(...e) {
		we.logLevel <= Pt.WARNING && console.warn(...e);
	},
	info(...e) {
		we.logLevel <= Pt.INFO && console.log(...e);
	},
	debug(...e) {
		we.logLevel <= Pt.DEBUG && console.log(...e);
	},
	log(...e) {
		this.info(...e);
	}
}, pb = class {
	constructor(e) {
		this.trie = this._build_trie(e);
	}
	_build_trie(e) {
		const t = Object.create(null);
		for (const r of e) {
			let s = t;
			for (let n = 0; n < r.length; ++n) {
				const a = r[n];
				s = s[a] ??= Object.create(null);
			}
			s.end = r;
		}
		return t;
	}
	split(e) {
		const t = [], r = e.length;
		let s = 0, n = 0;
		for (; n < r;) {
			let a = this.trie, o = null, i = n;
			for (; i < r && (a = a[e[i]]);) a.end && (o = a.end), ++i;
			o ? (n > s && t.push(e.slice(s, n)), t.push(o), n += o.length, s = n) : ++n;
		}
		return s < r && t.push(e.slice(s)), t;
	}
}, Dh = pb, mb = class {
	constructor(e) {
		this.content = e.content, this.id = e.id, this.single_word = e.single_word ?? !1, this.lstrip = e.lstrip ?? !1, this.rstrip = e.rstrip ?? !1, this.special = e.special ?? !1, this.normalized = e.normalized ?? !this.special;
	}
}, gb = mb, L_ = (() => {
	const e = [
		...Array.from({ length: 94 }, (n, a) => a + 33),
		...Array.from({ length: 12 }, (n, a) => a + 161),
		...Array.from({ length: 82 }, (n, a) => a + 174)
	], t = e.slice();
	let r = 0;
	for (let n = 0; n < 256; ++n) e.includes(n) || (e.push(n), t.push(256 + r), r += 1);
	const s = t.map((n) => String.fromCharCode(n));
	return Object.fromEntries(e.map((n, a) => [n, s[a]]));
})(), wb = (e) => Object.fromEntries(Object.entries(e).map(([t, r]) => [r, t])), vb = wb(L_), zh = ".,!?…。，、।۔،", yb = /* @__PURE__ */ new Map([
	["(?i:'s|'t|'re|'ve|'m|'ll|'d)", "(?:'([sS]|[tT]|[rR][eE]|[vV][eE]|[mM]|[lL][lL]|[dD]))"],
	["(?i:[sdmt]|ll|ve|re)", "(?:[sS]|[dD]|[mM]|[tT]|[lL][lL]|[vV][eE]|[rR][eE])"],
	["[^\\r\\n\\p{L}\\p{N}]?+", "[^\\r\\n\\p{L}\\p{N}]?"],
	["[^\\s\\p{L}\\p{N}]++", "[^\\s\\p{L}\\p{N}]+"],
	["(?>\\p{Nd}{510})", "(?:\\p{Nd}{510})"],
	["\\p{Nd}{3}+", "(?:\\p{Nd}{3})+"],
	["\\G", ""],
	[` ?[^(\\s|[${zh}])]+`, ` ?[^\\s${zh}]+`]
]), Jn = "\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E", Ai = (e) => e.replace(/ \./g, ".").replace(/ \?/g, "?").replace(/ \!/g, "!").replace(/ ,/g, ",").replace(/ \' /g, "'").replace(/ n't/g, "n't").replace(/ 'm/g, "'m").replace(/ 's/g, "'s").replace(/ 've/g, "'ve").replace(/ 're/g, "'re"), aa = (e, t = !0) => {
	if (e.Regex !== void 0) {
		let r = e.Regex.replace(/\\([#&~])/g, "$1");
		r = r.replace(/\\A/g, "^").replace(/\\z/g, "$").replace(/\\Z/g, "(?=\\r?\\n?$)");
		for (const [s, n] of yb) r = r.replaceAll(s, n);
		try {
			return new RegExp(r, "gu");
		} catch (s) {
			if (!(s instanceof SyntaxError) || !s.message.toLowerCase().includes("invalid property name")) throw s;
			let n = !1;
			const a = r.replace(/(\\[pP])\{([^}=]+)\}/g, (o, i, l) => {
				try {
					return new RegExp(`\\p{${l}}`, "u"), `${i}{${l}}`;
				} catch {
					return n = !0, `${i}{Script=${l}}`;
				}
			});
			if (!n) throw s;
			try {
				return new RegExp(a, "gu");
			} catch {
				throw s;
			}
		}
	} else if (e.String !== void 0) {
		const r = bb(e.String);
		return new RegExp(t ? r : `(${r})`, "gu");
	} else return console.warn("Unknown pattern type:", e), null;
}, bb = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Mb = (e, t, r) => {
	const s = [];
	let n = 0;
	for (; n < e.length;) {
		if (s.push(e[n]), (t.get(e[n]) ?? r) !== r) {
			++n;
			continue;
		}
		for (; ++n < e.length && (t.get(e[n]) ?? r) === r;) t.get(s.at(-1)) !== r && (s[s.length - 1] += e[n]);
	}
	return s;
}, xb = (e) => e >= 19968 && e <= 40959 || e >= 13312 && e <= 19903 || e >= 131072 && e <= 173791 || e >= 173824 && e <= 177983 || e >= 177984 && e <= 178207 || e >= 178208 && e <= 183983 || e >= 63744 && e <= 64255 || e >= 194560 && e <= 195103, kb = (e) => Number.isInteger(e) || typeof e == "bigint", Tb = (e) => {
	let t = 0;
	for (const r of e) ++t;
	return t;
}, Eb = (e) => I_(e.toLowerCase()), Lt = (...e) => Array.prototype.concat.apply([], e), Ci = (e) => new Map(Object.entries(e)), Ab = (e, t) => {
	const r = [];
	let s = 0;
	for (const n of e.matchAll(t)) {
		const a = n[0];
		s < n.index && r.push(e.slice(s, n.index)), a.length > 0 && r.push(a), s = n.index + a.length;
	}
	return s < e.length && r.push(e.slice(s)), r;
}, I_ = (e) => e.replace(/* @__PURE__ */ new RegExp("\\p{M}", "gu"), ""), Bh = (e, t, r = []) => {
	if (!e || Array.isArray(e) || typeof e != "object") return `${t} must be a valid object`;
	for (const s of r) if (!(s in e)) return `${t} must contain a "${s}" property`;
	return null;
}, Cb = (e) => e.match(/\S+/g) || [], Sb = class {
	constructor() {
		const e = function(...t) {
			return e._call(...t);
		};
		return Object.setPrototypeOf(e, new.target.prototype);
	}
}, tn = Sb, Pb = class extends tn {
	constructor(e) {
		super(), this.config = e;
	}
	_call(e) {
		return this.normalize(e);
	}
}, cr = Pb, Fb = class extends cr {
	tokenize_chinese_chars(e) {
		const t = [];
		for (let r = 0; r < e.length; ++r) {
			const s = e[r];
			xb(s.charCodeAt(0)) ? (t.push(" "), t.push(s), t.push(" ")) : t.push(s);
		}
		return t.join("");
	}
	strip_accents(e) {
		return e.normalize("NFD").replace(/* @__PURE__ */ new RegExp("\\p{Mn}", "gu"), "");
	}
	is_control(e) {
		switch (e) {
			case "	":
			case `
`:
			case "\r": return !1;
			default: return (/* @__PURE__ */ new RegExp("^\\p{Cc}|\\p{Cf}|\\p{Co}|\\p{Cs}$", "u")).test(e);
		}
	}
	clean_text(e) {
		const t = [];
		for (const r of e) {
			const s = r.charCodeAt(0);
			s === 0 || s === 65533 || this.is_control(r) || (/^\s$/.test(r) ? t.push(" ") : t.push(r));
		}
		return t.join("");
	}
	normalize(e) {
		return this.config.clean_text && (e = this.clean_text(e)), this.config.handle_chinese_chars && (e = this.tokenize_chinese_chars(e)), this.config.lowercase ? (e = e.toLowerCase(), this.config.strip_accents !== !1 && (e = this.strip_accents(e))) : this.config.strip_accents && (e = this.strip_accents(e)), e;
	}
}, Lb = Fb, Ib = class extends cr {
	constructor(e) {
		super(e), this.charsmap = e.precompiled_charsmap ?? null;
	}
	normalize(e) {
		return e = e.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm, ""), e = e.replace(/[\u0009\u000A\u000C\u000D\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u2581\u3000\uFEFF\uFFFD]/gm, " "), e.includes("～") ? e = e.split("～").map((t) => t.normalize("NFKC")).join("～") : e = e.normalize("NFKC"), e;
	}
}, Ob = Ib, Nb = class extends cr {
	constructor(e) {
		super(e), this.normalizers = (e.normalizers ?? []).map((t) => O_(t));
	}
	normalize(e) {
		return this.normalizers.reduce((t, r) => r ? r.normalize(t) : t, e);
	}
}, Db = Nb, zb = class extends cr {
	normalize(e) {
		const t = aa(this.config.pattern ?? {});
		return t === null ? e : e.replaceAll(t, this.config.content ?? "");
	}
}, Bb = zb, Rb = class extends cr {
	constructor() {
		super(...arguments), this.form = "NFC";
	}
	normalize(e) {
		return e = e.normalize(this.form), e;
	}
}, oa = Rb, Gb = class extends oa {
	constructor() {
		super(...arguments), this.form = "NFC";
	}
}, $b = Gb, Vb = class extends oa {
	constructor() {
		super(...arguments), this.form = "NFD";
	}
}, Ub = Vb, jb = class extends oa {
	constructor() {
		super(...arguments), this.form = "NFKC";
	}
}, qb = jb, Wb = class extends oa {
	constructor() {
		super(...arguments), this.form = "NFKD";
	}
}, Hb = Wb, Qb = class extends cr {
	normalize(e) {
		return this.config.strip_left && this.config.strip_right ? e = e.trim() : (this.config.strip_left && (e = e.trimStart()), this.config.strip_right && (e = e.trimEnd())), e;
	}
}, Xb = Qb, Yb = class extends cr {
	normalize(e) {
		return I_(e);
	}
}, Jb = Yb, Kb = class extends cr {
	normalize(e) {
		return e.toLowerCase();
	}
}, Zb = Kb, eM = class extends cr {
	normalize(e) {
		return e = this.config.prepend + e, e;
	}
}, tM = eM;
function rM(e) {
	if (e === null) return null;
	switch (e.type) {
		case "BertNormalizer": return new Lb(e);
		case "Precompiled": return new Ob(e);
		case "Sequence": return new Db(e);
		case "Replace": return new Bb(e);
		case "NFC": return new $b(e);
		case "NFD": return new Ub(e);
		case "NFKC": return new qb(e);
		case "NFKD": return new Hb(e);
		case "Strip": return new Xb(e);
		case "StripAccents": return new Jb(e);
		case "Lowercase": return new Zb(e);
		case "Prepend": return new tM(e);
		default: throw new Error(`Unknown Normalizer type: ${e.type}`);
	}
}
var O_ = rM, sM = class extends tn {
	pre_tokenize(e, t) {
		return (Array.isArray(e) ? e.map((r) => this.pre_tokenize_text(r, t)) : this.pre_tokenize_text(e, t)).flat();
	}
	_call(e, t) {
		return this.pre_tokenize(e, t);
	}
}, Dt = sM, nM = class extends Dt {
	constructor(e) {
		super(), this.config = e, this.add_prefix_space = this.config.add_prefix_space ?? !1, this.trim_offsets = this.config.trim_offsets ?? !1, this.use_regex = this.config.use_regex ?? !0, this.pattern = /* @__PURE__ */ new RegExp("'s|'t|'re|'ve|'m|'ll|'d| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+", "gu"), this.byte_encoder = L_, this.text_encoder = new TextEncoder();
	}
	pre_tokenize_text(e, t) {
		return this.add_prefix_space && !e.startsWith(" ") && (e = " " + e), (this.use_regex ? e.match(this.pattern) || [] : [e]).map((r) => Array.from(this.text_encoder.encode(r), (s) => this.byte_encoder[s]).join(""));
	}
}, aM = nM, oM = class extends Dt {
	pre_tokenize_text(e, t) {
		return e.match(/\w+|[^\w\s]+/g) || [];
	}
}, iM = oM, lM = class extends Dt {
	constructor(e) {
		super(), this.replacement = e.replacement ?? "▁", this.str_rep = e.str_rep || this.replacement, this.prepend_scheme = e.prepend_scheme ?? "always";
	}
	pre_tokenize_text(e, t) {
		const { section_index: r = void 0 } = t ?? {};
		let s = e.replaceAll(" ", this.str_rep);
		return !s.startsWith(this.replacement) && (this.prepend_scheme === "always" || this.prepend_scheme === "first" && r === 0) && (s = this.str_rep + s), [s];
	}
}, cM = lM, uM = class extends Dt {
	constructor(e) {
		super(), this.config = e, this.pattern = aa(this.config.pattern ?? {}, this.config.invert ?? !0);
	}
	pre_tokenize_text(e) {
		return this.pattern === null ? [] : this.config.invert ? e.match(this.pattern) || [] : this.config.behavior?.toLowerCase() === "removed" ? e.split(this.pattern).filter((t) => t) : Ab(e, this.pattern);
	}
}, dM = uM, hM = class extends Dt {
	constructor(e) {
		super(), this.config = e, this.pattern = new RegExp(`[^${Jn}]+|[${Jn}]+`, "gu");
	}
	pre_tokenize_text(e) {
		return e.match(this.pattern) || [];
	}
}, fM = hM, _M = class extends Dt {
	constructor(e) {
		super(), this.config = e;
		const t = `[^\\d]+|\\d${this.config.individual_digits ? "" : "+"}`;
		this.pattern = new RegExp(t, "gu");
	}
	pre_tokenize_text(e) {
		return e.match(this.pattern) || [];
	}
}, pM = _M, mM = class extends Dt {
	constructor() {
		super(), this.pattern = new RegExp(`[^\\s${Jn}]+|[${Jn}]`, "gu");
	}
	pre_tokenize_text(e, t) {
		return e.trim().match(this.pattern) || [];
	}
}, gM = mM, wM = class extends Dt {
	constructor(e) {
		super(), this.config = e, this.pattern = aa(this.config.pattern ?? {}), this.content = this.config.content ?? "";
	}
	pre_tokenize_text(e) {
		return this.pattern === null ? [e] : [e.replaceAll(this.pattern, this.config.content ?? "")];
	}
}, vM = wM, yM = class extends Dt {
	constructor(e) {
		super(), this.tokenizers = (e.pretokenizers ?? []).map((t) => N_(t));
	}
	pre_tokenize_text(e, t) {
		return this.tokenizers.reduce((r, s) => s ? s.pre_tokenize(r, t) : r, [e]);
	}
}, bM = yM, MM = class extends Dt {
	pre_tokenize_text(e) {
		return Cb(e);
	}
}, xM = MM, kM = class extends Dt {
	constructor(e) {
		super(), this.config = e, this._length = e.length;
	}
	pre_tokenize_text(e) {
		const t = [];
		for (let r = 0; r < e.length; r += this._length) t.push(e.slice(r, r + this._length));
		return t;
	}
}, TM = kM;
function EM(e) {
	if (e === null) return null;
	switch (e.type) {
		case "BertPreTokenizer": return new gM();
		case "Sequence": return new bM(e);
		case "Whitespace": return new iM();
		case "WhitespaceSplit": return new xM();
		case "Metaspace": return new cM(e);
		case "ByteLevel": return new aM(e);
		case "Split": return new dM(e);
		case "Punctuation": return new fM(e);
		case "Digits": return new pM(e);
		case "Replace": return new vM(e);
		case "FixedLength": return new TM(e);
		default: throw new Error(`Unknown PreTokenizer type: ${e.type}`);
	}
}
var N_ = EM, AM = class extends tn {
	constructor(e) {
		super(), this.config = e, this.vocab = [], this.tokens_to_ids = /* @__PURE__ */ new Map(), this.unk_token_id = void 0, this.unk_token = void 0, this.end_of_word_suffix = void 0, this.fuse_unk = this.config.fuse_unk ?? !1;
	}
	_call(e) {
		let t = this.encode(e);
		return this.fuse_unk && (t = Mb(t, this.tokens_to_ids, this.unk_token_id)), t;
	}
}, ia = AM, CM = class extends ia {
	constructor(e) {
		super(e), this.max_input_chars_per_word = 100, this.tokens_to_ids = Ci(e.vocab), this.unk_token_id = this.tokens_to_ids.get(e.unk_token), this.unk_token = e.unk_token, this.max_input_chars_per_word = e.max_input_chars_per_word ?? 100, this.vocab = new Array(this.tokens_to_ids.size);
		for (const [t, r] of this.tokens_to_ids) this.vocab[r] = t;
	}
	encode(e) {
		const t = [];
		for (const r of e) {
			const s = [...r];
			if (s.length > this.max_input_chars_per_word) {
				t.push(this.unk_token);
				continue;
			}
			let n = !1, a = 0;
			const o = [];
			for (; a < s.length;) {
				let i = s.length, l = null;
				for (; a < i;) {
					let c = s.slice(a, i).join("");
					if (a > 0 && (c = this.config.continuing_subword_prefix + c), this.tokens_to_ids.has(c)) {
						l = c;
						break;
					}
					--i;
				}
				if (l === null) {
					n = !0;
					break;
				}
				o.push(l), a = i;
			}
			n ? t.push(this.unk_token) : t.push(...o);
		}
		return t;
	}
}, Rh = CM, Gh = class D_ {
	constructor(t, r) {
		this.is_leaf = t, this.children = r;
	}
	static default() {
		return new D_(!1, /* @__PURE__ */ new Map());
	}
}, SM = class {
	constructor() {
		this.root = Gh.default();
	}
	extend(e) {
		for (const t of e) this.push(t);
	}
	push(e) {
		let t = this.root;
		for (const r of e) {
			let s = t.children.get(r);
			s === void 0 && (s = Gh.default(), t.children.set(r, s)), t = s;
		}
		t.is_leaf = !0;
	}
	*common_prefix_search(e) {
		let t = this.root;
		if (t === void 0) return;
		let r = "";
		for (const s of e) {
			if (r += s, t = t.children.get(s), t === void 0) return;
			t.is_leaf && (yield r);
		}
	}
}, PM = SM, Fo = class z_ {
	constructor(t, r, s, n, a) {
		this.token_id = t, this.node_id = r, this.pos = s, this.length = n, this.score = a, this.prev = null, this.backtrace_score = 0;
	}
	clone() {
		const t = new z_(this.token_id, this.node_id, this.pos, this.length, this.score);
		return t.prev = this.prev, t.backtrace_score = this.backtrace_score, t;
	}
}, FM = class {
	constructor(e, t, r) {
		this.chars = Array.from(e), this.len = this.chars.length, this.bos_token_id = t, this.eos_token_id = r, this.nodes = [], this.begin_nodes = Array.from({ length: this.len + 1 }, () => []), this.end_nodes = Array.from({ length: this.len + 1 }, () => []);
		const s = new Fo(this.bos_token_id ?? 0, 0, 0, 0, 0), n = new Fo(this.eos_token_id ?? 0, 1, this.len, 0, 0);
		this.nodes.push(s.clone()), this.nodes.push(n.clone()), this.begin_nodes[this.len].push(n), this.end_nodes[0].push(s);
	}
	insert(e, t, r, s) {
		const n = this.nodes.length, a = new Fo(s, n, e, t, r);
		this.begin_nodes[e].push(a), this.end_nodes[e + t].push(a), this.nodes.push(a);
	}
	viterbi() {
		const e = this.len;
		let t = 0;
		for (; t <= e;) {
			if (this.begin_nodes[t].length == 0) return [];
			for (let a of this.begin_nodes[t]) {
				a.prev = null;
				let o = 0, i = null;
				for (let l of this.end_nodes[t]) {
					const c = l.backtrace_score + a.score;
					(i === null || c > o) && (i = l.clone(), o = c);
				}
				if (i !== null) a.prev = i, a.backtrace_score = o;
				else return [];
			}
			++t;
		}
		const r = [], s = this.begin_nodes[e][0].prev;
		if (s === null) return [];
		let n = s.clone();
		for (; n.prev !== null;) r.push(n.clone()), n = n.clone().prev.clone();
		return r.reverse(), r;
	}
	piece(e) {
		return this.chars.slice(e.pos, e.pos + e.length).join("");
	}
	tokens() {
		return this.viterbi().map((e) => this.piece(e));
	}
	token_ids() {
		return this.viterbi().map((e) => e.token_id);
	}
}, LM = FM;
function IM(e) {
	if (e.length === 0) throw new Error("Array must not be empty");
	let t = e[0], r = 0;
	for (let s = 1; s < e.length; ++s) e[s] < t && (t = e[s], r = s);
	return [t, r];
}
var OM = class extends ia {
	constructor(e, t) {
		super(e);
		const r = e.vocab.length;
		this.vocab = new Array(r), this.scores = new Array(r);
		for (let s = 0; s < r; ++s) [this.vocab[s], this.scores[s]] = e.vocab[s];
		this.unk_token_id = e.unk_id, this.unk_token = this.vocab[e.unk_id], this.tokens_to_ids = new Map(this.vocab.map((s, n) => [s, n])), this.bos_token = " ", this.bos_token_id = this.tokens_to_ids.get(this.bos_token), this.eos_token = t, this.eos_token_id = this.tokens_to_ids.get(this.eos_token), this.unk_token = this.vocab[this.unk_token_id], this.min_score = IM(this.scores)[0], this.unk_score = this.min_score - 10, this.scores[this.unk_token_id] = this.unk_score, this.trie = new PM(), this.trie.extend(this.vocab), this.fuse_unk = !0;
	}
	populate_nodes(e) {
		const t = e.chars, r = 1;
		let s = 0;
		for (; s < t.length;) {
			let n = !1;
			const a = [], o = t.slice(s).join(""), i = this.trie.common_prefix_search(o);
			for (const l of i) {
				a.push(l);
				const c = this.tokens_to_ids.get(l), d = this.scores[c], h = Tb(l);
				e.insert(s, h, d, c), !n && h === r && (n = !0);
			}
			n || e.insert(s, r, this.unk_score, this.unk_token_id), s += r;
		}
	}
	tokenize(e) {
		const t = new LM(e, this.bos_token_id, this.eos_token_id);
		return this.populate_nodes(t), t.tokens();
	}
	encode(e) {
		const t = [];
		for (const r of e) {
			const s = this.tokenize(r);
			t.push(...s);
		}
		return t;
	}
}, $h = OM, NM = class {
	constructor(e = (r, s) => r > s, t = Infinity) {
		this._heap = [], this._comparator = e, this._max_size = t;
	}
	get size() {
		return this._heap.length;
	}
	is_empty() {
		return this.size === 0;
	}
	peek() {
		return this._heap[0];
	}
	push(...e) {
		return this.extend(e);
	}
	extend(e) {
		for (const t of e) if (this.size < this._max_size) this._heap.push(t), this._sift_up();
		else {
			const r = this._smallest();
			this._comparator(t, this._heap[r]) && (this._heap[r] = t, this._sift_up_from(r));
		}
		return this.size;
	}
	pop() {
		const e = this.peek(), t = this.size - 1;
		return t > 0 && this._swap(0, t), this._heap.pop(), this._sift_down(), e;
	}
	replace(e) {
		const t = this.peek();
		return this._heap[0] = e, this._sift_down(), t;
	}
	_parent(e) {
		return (e + 1 >>> 1) - 1;
	}
	_left(e) {
		return (e << 1) + 1;
	}
	_right(e) {
		return e + 1 << 1;
	}
	_greater(e, t) {
		return this._comparator(this._heap[e], this._heap[t]);
	}
	_swap(e, t) {
		const r = this._heap[e];
		this._heap[e] = this._heap[t], this._heap[t] = r;
	}
	_sift_up() {
		this._sift_up_from(this.size - 1);
	}
	_sift_up_from(e) {
		for (; e > 0 && this._greater(e, this._parent(e));) this._swap(e, this._parent(e)), e = this._parent(e);
	}
	_sift_down() {
		let e = 0;
		for (; this._left(e) < this.size && this._greater(this._left(e), e) || this._right(e) < this.size && this._greater(this._right(e), e);) {
			const t = this._right(e) < this.size && this._greater(this._right(e), this._left(e)) ? this._right(e) : this._left(e);
			this._swap(e, t), e = t;
		}
	}
	_smallest() {
		return 2 ** Math.floor(Math.log2(this.size)) - 1;
	}
}, DM = NM, zM = class {
	constructor(e) {
		this.capacity = e, this.cache = /* @__PURE__ */ new Map();
	}
	get(e) {
		if (!this.cache.has(e)) return;
		const t = this.cache.get(e);
		return this.cache.delete(e), this.cache.set(e, t), t;
	}
	put(e, t) {
		this.cache.has(e) && this.cache.delete(e), this.cache.set(e, t), this.cache.size > this.capacity && this.cache.delete(this.cache.keys().next().value);
	}
	clear() {
		this.cache.clear();
	}
}, BM = zM, RM = class extends ia {
	constructor(e) {
		super(e), this.tokens_to_ids = Ci(e.vocab), this.unk_token_id = this.tokens_to_ids.get(e.unk_token), this.unk_token = e.unk_token, this.vocab = new Array(this.tokens_to_ids.size);
		for (const [r, s] of this.tokens_to_ids) this.vocab[s] = r;
		const t = Array.isArray(e.merges[0]);
		this.merges = t ? e.merges : e.merges.map((r) => r.split(" ", 2)), this.bpe_ranks = new Map(this.merges.map((r, s) => [JSON.stringify(r), s])), this.end_of_word_suffix = e.end_of_word_suffix, this.continuing_subword_suffix = e.continuing_subword_suffix ?? null, this.byte_fallback = this.config.byte_fallback ?? !1, this.byte_fallback && (this.text_encoder = new TextEncoder()), this.ignore_merges = this.config.ignore_merges ?? !1, this.max_length_to_cache = 256, this.cache_capacity = 1e4, this.cache = new BM(this.cache_capacity);
	}
	clear_cache() {
		this.cache.clear();
	}
	bpe(e) {
		if (e.length === 0) return [];
		const t = this.cache.get(e);
		if (t !== void 0) return t;
		const r = Array.from(e);
		this.end_of_word_suffix && (r[r.length - 1] += this.end_of_word_suffix);
		let s = [];
		if (r.length > 1) {
			const n = new DM((i, l) => i.score < l.score);
			let a = {
				token: r[0],
				bias: 0,
				prev: null,
				next: null
			}, o = a;
			for (let i = 1; i < r.length; ++i) {
				const l = {
					bias: i / r.length,
					token: r[i],
					prev: o,
					next: null
				};
				o.next = l, this.add_node(n, o), o = l;
			}
			for (; !n.is_empty();) {
				const i = n.pop();
				if (i.deleted || !i.next || i.next.deleted) continue;
				if (i.deleted = !0, i.next.deleted = !0, i.prev) {
					const c = { ...i.prev };
					i.prev.deleted = !0, i.prev = c, c.prev ? c.prev.next = c : a = c;
				}
				const l = {
					token: i.token + i.next.token,
					bias: i.bias,
					prev: i.prev,
					next: i.next.next
				};
				l.prev ? (l.prev.next = l, this.add_node(n, l.prev)) : a = l, l.next && (l.next.prev = l, this.add_node(n, l));
			}
			for (let i = a; i !== null; i = i.next) s.push(i.token);
		} else s = r;
		if (this.continuing_subword_suffix) for (let n = 0; n < s.length - 1; ++n) s[n] += this.continuing_subword_suffix;
		return e.length < this.max_length_to_cache && this.cache.put(e, s), s;
	}
	add_node(e, t) {
		const r = this.bpe_ranks.get(JSON.stringify([t.token, t.next.token]));
		r !== void 0 && (t.score = r + t.bias, e.push(t));
	}
	encode(e) {
		const t = [];
		for (const r of e) {
			if (this.ignore_merges && this.tokens_to_ids.has(r)) {
				t.push(r);
				continue;
			}
			const s = this.bpe(r);
			for (const n of s) if (this.tokens_to_ids.has(n)) t.push(n);
			else if (this.byte_fallback) {
				const a = Array.from(this.text_encoder.encode(n)).map((o) => `<0x${o.toString(16).toUpperCase().padStart(2, "0")}>`);
				a.every((o) => this.tokens_to_ids.has(o)) ? t.push(...a) : this.unk_token != null && t.push(this.unk_token);
			} else this.unk_token != null && t.push(this.unk_token);
		}
		return t;
	}
}, Vh = RM, GM = class extends ia {
	constructor(e, t) {
		super(e);
		const r = e.vocab;
		this.tokens_to_ids = Ci(t.target_lang ? r[t.target_lang] : r), this.bos_token = t.bos_token, this.bos_token_id = this.tokens_to_ids.get(this.bos_token), this.eos_token = t.eos_token, this.eos_token_id = this.tokens_to_ids.get(this.eos_token), this.pad_token = t.pad_token, this.pad_token_id = this.tokens_to_ids.get(this.pad_token), this.unk_token = t.unk_token, this.unk_token_id = this.tokens_to_ids.get(this.unk_token), this.vocab = new Array(this.tokens_to_ids.size);
		for (const [s, n] of this.tokens_to_ids) this.vocab[n] = s;
	}
	encode(e) {
		return e;
	}
}, $M = GM;
function VM(e, t) {
	switch (e.type) {
		case "WordPiece": return new Rh(e);
		case "Unigram": return new $h(e, t.eos_token);
		case "BPE": return new Vh(e);
		default:
			if (e.vocab) return Array.isArray(e.vocab) ? new $h(e, t.eos_token) : Object.hasOwn(e, "continuing_subword_prefix") && Object.hasOwn(e, "unk_token") ? Object.hasOwn(e, "merges") ? new Vh(e) : new Rh(e) : new $M(e, {
				target_lang: t.target_lang,
				bos_token: t.bos_token,
				eos_token: t.eos_token,
				pad_token: t.pad_token,
				unk_token: t.unk_token
			});
			throw new Error(`Unknown TokenizerModel type: ${e?.type}`);
	}
}
var UM = VM, jM = class extends tn {
	constructor(e) {
		super(), this.config = e;
	}
	_call(e, ...t) {
		return this.post_process(e, ...t);
	}
}, rn = jM, qM = class extends rn {
	post_process(e, t = null, r = !0) {
		const s = t === null ? this.config.single : this.config.pair;
		let n = [], a = [];
		for (const o of s) "SpecialToken" in o ? r && (n.push(o.SpecialToken.id), a.push(o.SpecialToken.type_id)) : "Sequence" in o && (o.Sequence.id === "A" ? (n = Lt(n, e), a = Lt(a, new Array(e.length).fill(o.Sequence.type_id))) : o.Sequence.id === "B" && (n = Lt(n, t), a = Lt(a, new Array(t.length).fill(o.Sequence.type_id))));
		return {
			tokens: n,
			token_type_ids: a
		};
	}
}, WM = qM, HM = class extends rn {
	post_process(e, t = null) {
		return {
			tokens: e,
			tokens_pair: t
		};
	}
}, QM = HM, XM = class extends rn {
	constructor(e) {
		super(e), this.sep = e.sep, this.cls = e.cls;
	}
	post_process(e, t = null, r = !0) {
		r && (e = Lt([this.cls[0]], e, [this.sep[0]]));
		let s = new Array(e.length).fill(0);
		if (t) {
			const n = [], a = r ? [this.sep[0]] : [];
			e = Lt(e, n, t, a), s = Lt(s, new Array(t.length + n.length + a.length).fill(1));
		}
		return {
			tokens: e,
			token_type_ids: s
		};
	}
}, YM = XM, JM = class extends rn {
	constructor(e) {
		super(e), this.sep = e.sep, this.cls = e.cls;
	}
	post_process(e, t, r = !0) {
		r && (e = Lt([this.cls[0]], e, [this.sep[0]]));
		let s = new Array(e.length).fill(0);
		if (t) {
			const n = r ? [this.sep[0]] : [], a = r ? [this.sep[0]] : [];
			e = Lt(e, n, t, a), s = Lt(s, new Array(t.length + n.length + a.length).fill(1));
		}
		return {
			tokens: e,
			token_type_ids: s
		};
	}
}, KM = JM, ZM = class extends rn {
	constructor(e) {
		super(e), this.processors = (e.processors ?? []).map((t) => B_(t));
	}
	post_process(e, t = null, r = !0) {
		let s = {
			tokens: e,
			tokens_pair: t
		};
		for (const n of this.processors) s = n.post_process(s.tokens, s.tokens_pair, r);
		return s;
	}
}, ex = ZM;
function tx(e) {
	if (e === null) return null;
	switch (e.type) {
		case "TemplateProcessing": return new WM(e);
		case "ByteLevel": return new QM(e);
		case "BertProcessing": return new YM(e);
		case "RobertaProcessing": return new KM(e);
		case "Sequence": return new ex(e);
		default: throw new Error(`Unknown PostProcessor type: ${e.type}`);
	}
}
var B_ = tx, rx = class extends tn {
	constructor(e) {
		super(), this.config = e, this.added_tokens = [], this.end_of_word_suffix = null, this.trim_offsets = "trim_offsets" in e ? e.trim_offsets : !1;
	}
	_call(e) {
		return this.decode(e);
	}
	decode(e) {
		return this.decode_chain(e).join("");
	}
}, zt = rx, sx = class extends zt {
	constructor(e) {
		super(e), this.byte_decoder = vb, this.text_decoder = new TextDecoder("utf-8", {
			fatal: !1,
			ignoreBOM: !0
		}), this.end_of_word_suffix = null;
	}
	convert_tokens_to_string(e) {
		const t = e.join(""), r = new Uint8Array([...t].map((s) => this.byte_decoder[s]));
		return this.text_decoder.decode(r);
	}
	decode_chain(e) {
		const t = [];
		let r = [];
		for (const s of e) this.added_tokens.find((n) => n.content === s) !== void 0 ? (r.length > 0 && (t.push(this.convert_tokens_to_string(r)), r = []), t.push(s)) : r.push(s);
		return r.length > 0 && t.push(this.convert_tokens_to_string(r)), t;
	}
}, nx = sx, ax = class extends zt {
	constructor(e) {
		super(e), this.cleanup = e.cleanup;
	}
	decode_chain(e) {
		return e.map((t, r) => {
			if (r !== 0) {
				const s = this.config.prefix;
				s && t.startsWith(s) ? t = t.replace(s, "") : t = " " + t;
			}
			return this.cleanup && (t = Ai(t)), t;
		});
	}
}, ox = ax, ix = class extends zt {
	constructor(e) {
		super(e), this.replacement = e.replacement ?? "▁";
	}
	decode_chain(e) {
		const t = [];
		for (let r = 0; r < e.length; ++r) {
			let s = e[r].replaceAll(this.replacement, " ");
			r == 0 && s.startsWith(" ") && (s = s.substring(1)), t.push(s);
		}
		return t;
	}
}, lx = ix, cx = class extends zt {
	constructor(e) {
		super(e), this.suffix = e.suffix ?? "";
	}
	decode_chain(e) {
		return e.map((t, r) => t.replaceAll(this.suffix, r === e.length - 1 ? "" : " "));
	}
}, ux = cx, dx = class extends zt {
	constructor(e) {
		super(e), this.pad_token = e.pad_token ?? "", this.word_delimiter_token = e.word_delimiter_token ?? "", this.cleanup = e.cleanup;
	}
	convert_tokens_to_string(e) {
		if (e.length === 0) return "";
		const t = [e[0]];
		for (let s = 1; s < e.length; ++s) e[s] !== t.at(-1) && t.push(e[s]);
		let r = t.filter((s) => s !== this.pad_token).join("");
		return this.cleanup && (r = Ai(r).replaceAll(this.word_delimiter_token, " ").trim()), r;
	}
	decode_chain(e) {
		return [this.convert_tokens_to_string(e)];
	}
}, hx = dx, fx = class extends zt {
	constructor(e) {
		super(e), this.decoders = (e.decoders ?? []).map((t) => R_(t));
	}
	decode_chain(e) {
		return this.decoders.reduce((t, r) => r.decode_chain(t), e);
	}
}, _x = fx, px = class extends zt {
	decode_chain(e) {
		const t = aa(this.config.pattern), r = this.config.content ?? "";
		return t === null ? e : e.map((s) => s.replaceAll(t, r));
	}
}, mx = px, gx = class extends zt {
	decode_chain(e) {
		return [e.join("")];
	}
}, wx = gx, vx = class extends zt {
	constructor(e) {
		super(e), this.content = e.content ?? "", this.start = e.start ?? 0, this.stop = e.stop ?? 0;
	}
	decode_chain(e) {
		return e.map((t) => {
			let r = 0;
			for (let n = 0; n < this.start && t[n] === this.content; ++n) r = n + 1;
			let s = t.length;
			for (let n = 0; n < this.stop; ++n) {
				const a = t.length - n - 1;
				if (t[a] === this.content) {
					s = a;
					continue;
				} else break;
			}
			return t.slice(r, s);
		});
	}
}, yx = vx, bx = class extends zt {
	constructor(e) {
		super(e), this.text_decoder = new TextDecoder();
	}
	decode_chain(e) {
		const t = [];
		let r = [];
		for (const s of e) {
			let n = null;
			if (s.length === 6 && s.startsWith("<0x") && s.endsWith(">")) {
				const a = parseInt(s.slice(3, 5), 16);
				isNaN(a) || (n = a);
			}
			if (n !== null) r.push(n);
			else {
				if (r.length > 0) {
					const a = this.text_decoder.decode(Uint8Array.from(r));
					t.push(a), r = [];
				}
				t.push(s);
			}
		}
		if (r.length > 0) {
			const s = this.text_decoder.decode(Uint8Array.from(r));
			t.push(s), r = [];
		}
		return t;
	}
}, Mx = bx;
function xx(e) {
	if (e === null) return null;
	switch (e.type) {
		case "ByteLevel": return new nx(e);
		case "WordPiece": return new ox(e);
		case "Metaspace": return new lx(e);
		case "BPEDecoder": return new ux(e);
		case "CTC": return new hx(e);
		case "Sequence": return new _x(e);
		case "Replace": return new mx(e);
		case "Fuse": return new wx(e);
		case "Strip": return new yx(e);
		case "ByteFallback": return new Mx(e);
		default: throw new Error(`Unknown Decoder type: ${e.type}`);
	}
}
var R_ = xx, kx = class {
	constructor(e, t) {
		const r = Bh(e, "Tokenizer", [
			"model",
			"decoder",
			"post_processor",
			"pre_tokenizer",
			"normalizer"
		]);
		if (r) throw new Error(r);
		const s = Bh(t, "Config");
		if (s) throw new Error(s);
		this.tokenizer = e, this.config = t, this.normalizer = O_(this.tokenizer.normalizer), this.pre_tokenizer = N_(this.tokenizer.pre_tokenizer), this.model = UM(this.tokenizer.model, this.config), this.post_processor = B_(this.tokenizer.post_processor), this.decoder = R_(this.tokenizer.decoder), this.special_tokens = [], this.all_special_ids = [], this.added_tokens = [];
		const n = [], a = [];
		this.added_tokens_map = /* @__PURE__ */ new Map();
		for (const o of this.tokenizer.added_tokens) {
			const i = new gb(o);
			if (this.added_tokens.push(i), this.model.tokens_to_ids.set(i.content, i.id), this.model.vocab[i.id] = i.content, i.special && (this.special_tokens.push(i.content), this.all_special_ids.push(i.id)), this.added_tokens_map.set(i.content, i), i.normalized && this.normalizer !== null) {
				const l = this.normalizer(i.content);
				a.push(l), this.added_tokens_map.set(l, i);
			} else n.push(i.content);
		}
		(this.config.additional_special_tokens ?? []).forEach((o) => {
			this.special_tokens.includes(o) || this.special_tokens.push(o);
		}), this.decoder && (this.decoder.added_tokens = this.added_tokens, this.decoder.end_of_word_suffix = this.model.end_of_word_suffix), this.splitter_unnormalized = new Dh(n), this.splitter_normalized = new Dh(a), this.remove_space = this.config.remove_space, this.clean_up_tokenization_spaces = this.config.clean_up_tokenization_spaces ?? !0, this.do_lowercase_and_remove_accent = this.config.do_lowercase_and_remove_accent ?? !1;
	}
	encode(e, { text_pair: t = null, add_special_tokens: r = !0, return_token_type_ids: s = null } = {}) {
		const { tokens: n, token_type_ids: a } = this.tokenize_helper(e, {
			text_pair: t,
			add_special_tokens: r
		}), o = n.map((l) => this.added_tokens_map.get(l)?.id ?? this.model.tokens_to_ids.get(l) ?? this.model.unk_token_id), i = {
			ids: o,
			tokens: n,
			attention_mask: new Array(o.length).fill(1)
		};
		return s && a && (i.token_type_ids = a), i;
	}
	decode(e, t = {}) {
		if (!Array.isArray(e) || e.length === 0 || !kb(e[0])) throw Error("token_ids must be a non-empty array of integers.");
		let r = e.map((n) => this.model.vocab[Number(n)] ?? this.model.unk_token);
		t.skip_special_tokens && (r = r.filter((n) => !this.special_tokens.includes(n)));
		let s = this.decoder ? this.decoder(r) : r.join(" ");
		return this.decoder && this.decoder.end_of_word_suffix && (s = s.replaceAll(this.decoder.end_of_word_suffix, " "), t.skip_special_tokens && (s = s.trim())), (t.clean_up_tokenization_spaces ?? this.clean_up_tokenization_spaces) && (s = Ai(s)), s;
	}
	tokenize(e, { text_pair: t = null, add_special_tokens: r = !1 } = {}) {
		return this.tokenize_helper(e, {
			text_pair: t,
			add_special_tokens: r
		}).tokens;
	}
	encode_text(e) {
		if (e === null) return null;
		const t = this.splitter_unnormalized.split(e);
		return t.forEach((r, s) => {
			const n = this.added_tokens_map.get(r);
			n && (n.lstrip && s > 0 && (t[s - 1] = t[s - 1].trimEnd()), n.rstrip && s < t.length - 1 && (t[s + 1] = t[s + 1].trimStart()));
		}), t.flatMap((r, s) => {
			if (r.length === 0) return [];
			if (this.added_tokens_map.has(r)) return [r];
			if (this.remove_space === !0 && (r = r.trim().split(/\s+/).join(" ")), this.do_lowercase_and_remove_accent && (r = Eb(r)), this.normalizer !== null && (r = this.normalizer(r)), r.length === 0) return [];
			const n = this.splitter_normalized.split(r);
			return n.forEach((a, o) => {
				const i = this.added_tokens_map.get(a);
				i && (i.lstrip && o > 0 && (n[o - 1] = n[o - 1].trimEnd()), i.rstrip && o < n.length - 1 && (n[o + 1] = n[o + 1].trimStart()));
			}), n.flatMap((a) => {
				if (a.length === 0) return [];
				if (this.added_tokens_map.has(a)) return [a];
				const o = this.pre_tokenizer !== null ? this.pre_tokenizer(a, { section_index: s }) : [a];
				return this.model(o);
			});
		});
	}
	tokenize_helper(e, { text_pair: t = null, add_special_tokens: r = !0 }) {
		const s = this.encode_text(e), n = this.encode_text(t || null);
		return this.post_processor ? this.post_processor(s, n, r) : { tokens: Lt(s ?? [], n ?? []) };
	}
	token_to_id(e) {
		return this.model.tokens_to_ids.get(e);
	}
	id_to_token(e) {
		return this.model.vocab[e];
	}
	get_added_tokens_decoder() {
		const e = /* @__PURE__ */ new Map();
		for (const t of this.added_tokens) e.set(t.id, t);
		return e;
	}
	get_vocab(e = !0) {
		const t = /* @__PURE__ */ new Map();
		for (let r = 0; r < this.model.vocab.length; ++r) {
			const s = this.model.vocab[r];
			(e || !this.added_tokens_map.has(s)) && t.set(s, r);
		}
		return t;
	}
}, Tx = kx, z = Object.freeze({
	Text: "Text",
	NumericLiteral: "NumericLiteral",
	StringLiteral: "StringLiteral",
	Identifier: "Identifier",
	Equals: "Equals",
	OpenParen: "OpenParen",
	CloseParen: "CloseParen",
	OpenStatement: "OpenStatement",
	CloseStatement: "CloseStatement",
	OpenExpression: "OpenExpression",
	CloseExpression: "CloseExpression",
	OpenSquareBracket: "OpenSquareBracket",
	CloseSquareBracket: "CloseSquareBracket",
	OpenCurlyBracket: "OpenCurlyBracket",
	CloseCurlyBracket: "CloseCurlyBracket",
	Comma: "Comma",
	Dot: "Dot",
	Colon: "Colon",
	Pipe: "Pipe",
	CallOperator: "CallOperator",
	AdditiveBinaryOperator: "AdditiveBinaryOperator",
	MultiplicativeBinaryOperator: "MultiplicativeBinaryOperator",
	ComparisonBinaryOperator: "ComparisonBinaryOperator",
	UnaryOperator: "UnaryOperator",
	Comment: "Comment"
}), xt = class {
	constructor(e, t) {
		this.value = e, this.type = t;
	}
};
function Uh(e) {
	return /\w/.test(e);
}
function $s(e) {
	return /[0-9]/.test(e);
}
function jh(e) {
	return /\s/.test(e);
}
var Ex = [
	["{%", z.OpenStatement],
	["%}", z.CloseStatement],
	["{{", z.OpenExpression],
	["}}", z.CloseExpression],
	["(", z.OpenParen],
	[")", z.CloseParen],
	["{", z.OpenCurlyBracket],
	["}", z.CloseCurlyBracket],
	["[", z.OpenSquareBracket],
	["]", z.CloseSquareBracket],
	[",", z.Comma],
	[".", z.Dot],
	[":", z.Colon],
	["|", z.Pipe],
	["<=", z.ComparisonBinaryOperator],
	[">=", z.ComparisonBinaryOperator],
	["==", z.ComparisonBinaryOperator],
	["!=", z.ComparisonBinaryOperator],
	["<", z.ComparisonBinaryOperator],
	[">", z.ComparisonBinaryOperator],
	["+", z.AdditiveBinaryOperator],
	["-", z.AdditiveBinaryOperator],
	["~", z.AdditiveBinaryOperator],
	["*", z.MultiplicativeBinaryOperator],
	["/", z.MultiplicativeBinaryOperator],
	["%", z.MultiplicativeBinaryOperator],
	["=", z.Equals]
], Ax = /* @__PURE__ */ new Map([
	["n", `
`],
	["t", "	"],
	["r", "\r"],
	["b", "\b"],
	["f", "\f"],
	["v", "\v"],
	["'", "'"],
	["\"", "\""],
	["\\", "\\"]
]);
function Cx(e, t = {}) {
	return e.endsWith(`
`) && (e = e.slice(0, -1)), t.lstrip_blocks && (e = e.replace(/^[ \t]*({[#%-])/gm, "$1")), t.trim_blocks && (e = e.replace(/([#%-]})\n/g, "$1")), e.replace(/{%\s*(end)?generation\s*%}/gs, "");
}
function Sx(e, t = {}) {
	const r = [], s = Cx(e, t);
	let n = 0, a = 0;
	const o = (c) => {
		let d = "";
		for (; c(s[n]);) {
			if (s[n] === "\\") {
				if (++n, n >= s.length) throw new SyntaxError("Unexpected end of input");
				const h = s[n++], _ = Ax.get(h);
				if (_ === void 0) throw new SyntaxError(`Unexpected escaped character: ${h}`);
				d += _;
				continue;
			}
			if (d += s[n++], n >= s.length) throw new SyntaxError("Unexpected end of input");
		}
		return d;
	}, i = () => {
		const c = r.at(-1);
		c && c.type === z.Text && (c.value = c.value.trimEnd(), c.value === "" && r.pop());
	}, l = () => {
		for (; n < s.length && jh(s[n]);) ++n;
	};
	e: for (; n < s.length;) {
		const c = r.at(-1)?.type;
		if (c === void 0 || c === z.CloseStatement || c === z.CloseExpression || c === z.Comment) {
			let h = "";
			for (; n < s.length && !(s[n] === "{" && (s[n + 1] === "%" || s[n + 1] === "{" || s[n + 1] === "#"));) h += s[n++];
			if (h.length > 0) {
				r.push(new xt(h, z.Text));
				continue;
			}
		}
		if (s[n] === "{" && s[n + 1] === "#") {
			n += 2;
			const h = s[n] === "-";
			h && ++n;
			let _ = "";
			for (; s[n] !== "#" || s[n + 1] !== "}";) {
				if (n + 2 >= s.length) throw new SyntaxError("Missing end of comment tag");
				_ += s[n++];
			}
			const m = _.endsWith("-");
			m && (_ = _.slice(0, -1)), h && i(), r.push(new xt(_, z.Comment)), n += 2, m && l();
			continue;
		}
		if (s.slice(n, n + 3) === "{%-") {
			i(), r.push(new xt("{%", z.OpenStatement)), n += 3;
			continue;
		}
		if (s.slice(n, n + 3) === "{{-") {
			i(), r.push(new xt("{{", z.OpenExpression)), a = 0, n += 3;
			continue;
		}
		if (o(jh), s.slice(n, n + 3) === "-%}") {
			r.push(new xt("%}", z.CloseStatement)), n += 3, l();
			continue;
		}
		if (s.slice(n, n + 3) === "-}}") {
			r.push(new xt("}}", z.CloseExpression)), n += 3, l();
			continue;
		}
		const d = s[n];
		if (d === "-" || d === "+") {
			const h = r.at(-1)?.type;
			if (h === z.Text || h === void 0) throw new SyntaxError(`Unexpected character: ${d}`);
			switch (h) {
				case z.Identifier:
				case z.NumericLiteral:
				case z.StringLiteral:
				case z.CloseParen:
				case z.CloseSquareBracket: break;
				default: {
					++n;
					const _ = o($s);
					r.push(new xt(`${d}${_}`, _.length > 0 ? z.NumericLiteral : z.UnaryOperator));
					continue;
				}
			}
		}
		for (const [h, _] of Ex) if (!(h === "}}" && a > 0) && s.slice(n, n + h.length) === h) {
			r.push(new xt(h, _)), _ === z.OpenExpression ? a = 0 : _ === z.OpenCurlyBracket ? ++a : _ === z.CloseCurlyBracket && --a, n += h.length;
			continue e;
		}
		if (d === "'" || d === "\"") {
			++n;
			const h = o((_) => _ !== d);
			r.push(new xt(h, z.StringLiteral)), ++n;
			continue;
		}
		if ($s(d)) {
			let h = o($s);
			if (s[n] === "." && $s(s[n + 1])) {
				++n;
				const _ = o($s);
				h = `${h}.${_}`;
			}
			r.push(new xt(h, z.NumericLiteral));
			continue;
		}
		if (Uh(d)) {
			const h = o(Uh);
			r.push(new xt(h, z.Identifier));
			continue;
		}
		throw new SyntaxError(`Unexpected character: ${d}`);
	}
	return r;
}
var Bt = class {
	type = "Statement";
}, Px = class extends Bt {
	constructor(e) {
		super(), this.body = e;
	}
	type = "Program";
}, Fx = class extends Bt {
	constructor(e, t, r) {
		super(), this.test = e, this.body = t, this.alternate = r;
	}
	type = "If";
}, Lx = class extends Bt {
	constructor(e, t, r, s) {
		super(), this.loopvar = e, this.iterable = t, this.body = r, this.defaultBlock = s;
	}
	type = "For";
}, Ix = class extends Bt {
	type = "Break";
}, Ox = class extends Bt {
	type = "Continue";
}, Nx = class extends Bt {
	constructor(e, t, r) {
		super(), this.assignee = e, this.value = t, this.body = r;
	}
	type = "Set";
}, Dx = class extends Bt {
	constructor(e, t, r) {
		super(), this.name = e, this.args = t, this.body = r;
	}
	type = "Macro";
}, zx = class extends Bt {
	constructor(e) {
		super(), this.value = e;
	}
	type = "Comment";
}, yt = class extends Bt {
	type = "Expression";
}, Bx = class extends yt {
	constructor(e, t, r) {
		super(), this.object = e, this.property = t, this.computed = r;
	}
	type = "MemberExpression";
}, qh = class extends yt {
	constructor(e, t) {
		super(), this.callee = e, this.args = t;
	}
	type = "CallExpression";
}, Yr = class extends yt {
	constructor(e) {
		super(), this.value = e;
	}
	type = "Identifier";
}, hs = class extends yt {
	constructor(e) {
		super(), this.value = e;
	}
	type = "Literal";
}, Rx = class extends hs {
	type = "IntegerLiteral";
}, Gx = class extends hs {
	type = "FloatLiteral";
}, Wh = class extends hs {
	type = "StringLiteral";
}, $x = class extends hs {
	type = "ArrayLiteral";
}, Hh = class extends hs {
	type = "TupleLiteral";
}, Vx = class extends hs {
	type = "ObjectLiteral";
}, Vs = class extends yt {
	constructor(e, t, r) {
		super(), this.operator = e, this.left = t, this.right = r;
	}
	type = "BinaryExpression";
}, Ux = class extends yt {
	constructor(e, t) {
		super(), this.operand = e, this.filter = t;
	}
	type = "FilterExpression";
}, jx = class extends Bt {
	constructor(e, t) {
		super(), this.filter = e, this.body = t;
	}
	type = "FilterStatement";
}, qx = class extends yt {
	constructor(e, t) {
		super(), this.lhs = e, this.test = t;
	}
	type = "SelectExpression";
}, Wx = class extends yt {
	constructor(e, t, r) {
		super(), this.operand = e, this.negate = t, this.test = r;
	}
	type = "TestExpression";
}, Hx = class extends yt {
	constructor(e, t) {
		super(), this.operator = e, this.argument = t;
	}
	type = "UnaryExpression";
}, Qx = class extends yt {
	constructor(e = void 0, t = void 0, r = void 0) {
		super(), this.start = e, this.stop = t, this.step = r;
	}
	type = "SliceExpression";
}, Xx = class extends yt {
	constructor(e, t) {
		super(), this.key = e, this.value = t;
	}
	type = "KeywordArgumentExpression";
}, Yx = class extends yt {
	constructor(e) {
		super(), this.argument = e;
	}
	type = "SpreadExpression";
}, Jx = class extends Bt {
	constructor(e, t, r) {
		super(), this.call = e, this.callerArgs = t, this.body = r;
	}
	type = "CallStatement";
}, Kx = class extends yt {
	constructor(e, t, r) {
		super(), this.condition = e, this.trueExpr = t, this.falseExpr = r;
	}
	type = "Ternary";
};
function Zx(e) {
	const t = new Px([]);
	let r = 0;
	function s(I, N) {
		const B = e[r++];
		if (!B || B.type !== I) throw new Error(`Parser Error: ${N}. ${B.type} !== ${I}.`);
		return B;
	}
	function n(I) {
		if (!l(I)) throw new SyntaxError(`Expected ${I}`);
		++r;
	}
	function a() {
		switch (e[r].type) {
			case z.Comment: return new zx(e[r++].value);
			case z.Text: return c();
			case z.OpenStatement: return d();
			case z.OpenExpression: return h();
			default: throw new SyntaxError(`Unexpected token type: ${e[r].type}`);
		}
	}
	function o(...I) {
		return r + I.length <= e.length && I.every((N, B) => N === e[r + B].type);
	}
	function i(...I) {
		return e[r]?.type === z.OpenStatement && e[r + 1]?.type === z.Identifier && I.includes(e[r + 1]?.value);
	}
	function l(...I) {
		return r + I.length <= e.length && I.every((N, B) => e[r + B].type === "Identifier" && N === e[r + B].value);
	}
	function c() {
		return new Wh(s(z.Text, "Expected text token").value);
	}
	function d() {
		if (s(z.OpenStatement, "Expected opening statement token"), e[r].type !== z.Identifier) throw new SyntaxError(`Unknown statement, got ${e[r].type}`);
		const I = e[r].value;
		let N;
		switch (I) {
			case "set":
				++r, N = _();
				break;
			case "if":
				++r, N = m(), s(z.OpenStatement, "Expected {% token"), n("endif"), s(z.CloseStatement, "Expected %} token");
				break;
			case "macro":
				++r, N = v(), s(z.OpenStatement, "Expected {% token"), n("endmacro"), s(z.CloseStatement, "Expected %} token");
				break;
			case "for":
				++r, N = b(), s(z.OpenStatement, "Expected {% token"), n("endfor"), s(z.CloseStatement, "Expected %} token");
				break;
			case "call": {
				++r;
				let B = null;
				o(z.OpenParen) && (B = G());
				const Q = Z();
				if (Q.type !== "Identifier") throw new SyntaxError("Expected identifier following call statement");
				const ue = G();
				s(z.CloseStatement, "Expected closing statement token");
				const de = [];
				for (; !i("endcall");) de.push(a());
				s(z.OpenStatement, "Expected '{%'"), n("endcall"), s(z.CloseStatement, "Expected closing statement token"), N = new Jx(new qh(Q, ue), B, de);
				break;
			}
			case "break":
				++r, s(z.CloseStatement, "Expected closing statement token"), N = new Ix();
				break;
			case "continue":
				++r, s(z.CloseStatement, "Expected closing statement token"), N = new Ox();
				break;
			case "filter": {
				++r;
				let B = Z();
				B instanceof Yr && o(z.OpenParen) && (B = R(B)), s(z.CloseStatement, "Expected closing statement token");
				const Q = [];
				for (; !i("endfilter");) Q.push(a());
				s(z.OpenStatement, "Expected '{%'"), n("endfilter"), s(z.CloseStatement, "Expected '%}'"), N = new jx(B, Q);
				break;
			}
			default: throw new SyntaxError(`Unknown statement type: ${I}`);
		}
		return N;
	}
	function h() {
		s(z.OpenExpression, "Expected opening expression token");
		const I = M();
		return s(z.CloseExpression, "Expected closing expression token"), I;
	}
	function _() {
		const I = w();
		let N = null;
		const B = [];
		if (o(z.Equals)) ++r, N = w();
		else {
			for (s(z.CloseStatement, "Expected %} token"); !i("endset");) B.push(a());
			s(z.OpenStatement, "Expected {% token"), n("endset");
		}
		return s(z.CloseStatement, "Expected closing statement token"), new Nx(I, N, B);
	}
	function m() {
		const I = M();
		s(z.CloseStatement, "Expected closing statement token");
		const N = [], B = [];
		for (; !i("elif", "else", "endif");) N.push(a());
		if (i("elif")) {
			++r, ++r;
			const Q = m();
			B.push(Q);
		} else if (i("else")) for (++r, ++r, s(z.CloseStatement, "Expected closing statement token"); !i("endif");) B.push(a());
		return new Fx(I, N, B);
	}
	function v() {
		const I = Z();
		if (I.type !== "Identifier") throw new SyntaxError("Expected identifier following macro statement");
		const N = G();
		s(z.CloseStatement, "Expected closing statement token");
		const B = [];
		for (; !i("endmacro");) B.push(a());
		return new Dx(I, N, B);
	}
	function w(I = !1) {
		const N = I ? Z : M, B = [N()], Q = o(z.Comma);
		for (; Q && (++r, B.push(N()), !!o(z.Comma)););
		return Q ? new Hh(B) : B[0];
	}
	function b() {
		const I = w(!0);
		if (!(I instanceof Yr || I instanceof Hh)) throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${I.type} instead`);
		if (!l("in")) throw new SyntaxError("Expected `in` keyword following loop variable");
		++r;
		const N = M();
		s(z.CloseStatement, "Expected closing statement token");
		const B = [];
		for (; !i("endfor", "else");) B.push(a());
		const Q = [];
		if (i("else")) for (++r, ++r, s(z.CloseStatement, "Expected closing statement token"); !i("endfor");) Q.push(a());
		return new Lx(I, N, B, Q);
	}
	function M() {
		return E();
	}
	function E() {
		const I = A();
		if (l("if")) {
			++r;
			const N = A();
			return l("else") ? (++r, new Kx(N, I, E())) : new qx(I, N);
		}
		return I;
	}
	function A() {
		let I = k();
		for (; l("or");) {
			const N = e[r];
			++r;
			const B = k();
			I = new Vs(N, I, B);
		}
		return I;
	}
	function k() {
		let I = C();
		for (; l("and");) {
			const N = e[r];
			++r;
			const B = C();
			I = new Vs(N, I, B);
		}
		return I;
	}
	function C() {
		let I;
		for (; l("not");) {
			const N = e[r];
			++r, I = new Hx(N, C());
		}
		return I ?? O();
	}
	function O() {
		let I = x();
		for (;;) {
			let N;
			if (l("not", "in")) N = new xt("not in", z.Identifier), r += 2;
			else if (l("in")) N = e[r++];
			else if (o(z.ComparisonBinaryOperator)) N = e[r++];
			else break;
			const B = x();
			I = new Vs(N, I, B);
		}
		return I;
	}
	function x() {
		let I = F();
		for (; o(z.AdditiveBinaryOperator);) {
			const N = e[r];
			++r;
			const B = F();
			I = new Vs(N, I, B);
		}
		return I;
	}
	function q() {
		const I = D(Z());
		return o(z.OpenParen) ? R(I) : I;
	}
	function R(I) {
		let N = new qh(I, G());
		return N = D(N), o(z.OpenParen) && (N = R(N)), N;
	}
	function G() {
		s(z.OpenParen, "Expected opening parenthesis for arguments list");
		const I = W();
		return s(z.CloseParen, "Expected closing parenthesis for arguments list"), I;
	}
	function W() {
		const I = [];
		for (; !o(z.CloseParen);) {
			let N;
			if (e[r].type === z.MultiplicativeBinaryOperator && e[r].value === "*") ++r, N = new Yx(M());
			else if (N = M(), o(z.Equals)) {
				if (++r, !(N instanceof Yr)) throw new SyntaxError("Expected identifier for keyword argument");
				const B = M();
				N = new Xx(N, B);
			}
			I.push(N), o(z.Comma) && ++r;
		}
		return I;
	}
	function H() {
		const I = [];
		let N = !1;
		for (; !o(z.CloseSquareBracket);) o(z.Colon) ? (I.push(void 0), ++r, N = !0) : (I.push(M()), o(z.Colon) && (++r, N = !0));
		if (I.length === 0) throw new SyntaxError("Expected at least one argument for member/slice expression");
		if (N) {
			if (I.length > 3) throw new SyntaxError("Expected 0-3 arguments for slice expression");
			return new Qx(...I);
		}
		return I[0];
	}
	function D(I) {
		for (; o(z.Dot) || o(z.OpenSquareBracket);) {
			const N = e[r];
			++r;
			let B;
			const Q = N.type === z.OpenSquareBracket;
			if (Q) B = H(), s(z.CloseSquareBracket, "Expected closing square bracket");
			else if (B = Z(), B.type !== "Identifier") throw new SyntaxError("Expected identifier following dot operator");
			I = new Bx(I, B, Q);
		}
		return I;
	}
	function F() {
		let I = U();
		for (; o(z.MultiplicativeBinaryOperator);) {
			const N = e[r++], B = U();
			I = new Vs(N, I, B);
		}
		return I;
	}
	function U() {
		let I = ae();
		for (; l("is");) {
			++r;
			const N = l("not");
			N && ++r;
			const B = Z();
			if (!(B instanceof Yr)) throw new SyntaxError("Expected identifier for the test");
			I = new Wx(I, N, B);
		}
		return I;
	}
	function ae() {
		let I = q();
		for (; o(z.Pipe);) {
			++r;
			let N = Z();
			if (!(N instanceof Yr)) throw new SyntaxError("Expected identifier for the filter");
			o(z.OpenParen) && (N = R(N)), I = new Ux(I, N);
		}
		return I;
	}
	function Z() {
		const I = e[r++];
		switch (I.type) {
			case z.NumericLiteral: {
				const N = I.value;
				return N.includes(".") ? new Gx(Number(N)) : new Rx(Number(N));
			}
			case z.StringLiteral: {
				let N = I.value;
				for (; o(z.StringLiteral);) N += e[r++].value;
				return new Wh(N);
			}
			case z.Identifier: return new Yr(I.value);
			case z.OpenParen: {
				const N = w();
				return s(z.CloseParen, "Expected closing parenthesis, got ${tokens[current].type} instead."), N;
			}
			case z.OpenSquareBracket: {
				const N = [];
				for (; !o(z.CloseSquareBracket);) N.push(M()), o(z.Comma) && ++r;
				return ++r, new $x(N);
			}
			case z.OpenCurlyBracket: {
				const N = /* @__PURE__ */ new Map();
				for (; !o(z.CloseCurlyBracket);) {
					const B = M();
					s(z.Colon, "Expected colon between key and value in object literal");
					const Q = M();
					N.set(B, Q), o(z.Comma) && ++r;
				}
				return ++r, new Vx(N);
			}
			default: throw new SyntaxError(`Unexpected token: ${I.type}`);
		}
	}
	for (; r < e.length;) t.body.push(a());
	return t;
}
function e1(e, t, r = 1) {
	if (t === void 0 && (t = e, e = 0), r === 0) throw new Error("range() step must not be zero");
	const s = [];
	if (r > 0) for (let n = e; n < t; n += r) s.push(n);
	else for (let n = e; n > t; n += r) s.push(n);
	return s;
}
function Qh(e, t, r, s = 1) {
	const n = Math.sign(s);
	n >= 0 ? (t = (t ??= 0) < 0 ? Math.max(e.length + t, 0) : Math.min(t, e.length), r = (r ??= e.length) < 0 ? Math.max(e.length + r, 0) : Math.min(r, e.length)) : (t = (t ??= e.length - 1) < 0 ? Math.max(e.length + t, -1) : Math.min(t, e.length - 1), r = (r ??= -1) < -1 ? Math.max(e.length + r, -1) : Math.min(r, e.length - 1));
	const a = [];
	for (let o = t; n * o < n * r; o += s) a.push(e[o]);
	return a;
}
function t1(e) {
	return e.replace(/\b\w/g, (t) => t.toUpperCase());
}
function r1(e) {
	return s1(/* @__PURE__ */ new Date(), e);
}
function s1(e, t) {
	const r = new Intl.DateTimeFormat(void 0, { month: "long" }), s = new Intl.DateTimeFormat(void 0, { month: "short" }), n = (a) => a < 10 ? "0" + a : a.toString();
	return t.replace(/%[YmdbBHM%]/g, (a) => {
		switch (a) {
			case "%Y": return e.getFullYear().toString();
			case "%m": return n(e.getMonth() + 1);
			case "%d": return n(e.getDate());
			case "%b": return s.format(e);
			case "%B": return r.format(e);
			case "%H": return n(e.getHours());
			case "%M": return n(e.getMinutes());
			case "%%": return "%";
			default: return a;
		}
	});
}
function n1(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function a1(e, t, r, s) {
	if (s === 0) return e;
	let n = s == null || s < 0 ? Infinity : s;
	const a = t.length === 0 ? /* @__PURE__ */ new RegExp("(?=)", "gu") : new RegExp(n1(t), "gu");
	return e.replaceAll(a, (o) => n > 0 ? (--n, r) : o);
}
var Xh = class extends Error {}, Yh = class extends Error {}, Xt = class {
	type = "RuntimeValue";
	value;
	builtins = /* @__PURE__ */ new Map();
	constructor(e = void 0) {
		this.value = e;
	}
	__bool__() {
		return new se(!!this.value);
	}
	toString() {
		return String(this.value);
	}
}, le = class extends Xt {
	type = "IntegerValue";
}, Re = class extends Xt {
	type = "FloatValue";
	toString() {
		return this.value % 1 === 0 ? this.value.toFixed(1) : this.value.toString();
	}
}, J = class extends Xt {
	type = "StringValue";
	builtins = /* @__PURE__ */ new Map([
		["upper", new Oe(() => new J(this.value.toUpperCase()))],
		["lower", new Oe(() => new J(this.value.toLowerCase()))],
		["strip", new Oe(() => new J(this.value.trim()))],
		["title", new Oe(() => new J(t1(this.value)))],
		["capitalize", new Oe(() => new J(this.value.charAt(0).toUpperCase() + this.value.slice(1)))],
		["length", new le(this.value.length)],
		["rstrip", new Oe(() => new J(this.value.trimEnd()))],
		["lstrip", new Oe(() => new J(this.value.trimStart()))],
		["startswith", new Oe((e) => {
			if (e.length === 0) throw new Error("startswith() requires at least one argument");
			const t = e[0];
			if (t instanceof J) return new se(this.value.startsWith(t.value));
			if (t instanceof _e) {
				for (const r of t.value) {
					if (!(r instanceof J)) throw new Error("startswith() tuple elements must be strings");
					if (this.value.startsWith(r.value)) return new se(!0);
				}
				return new se(!1);
			}
			throw new Error("startswith() argument must be a string or tuple of strings");
		})],
		["endswith", new Oe((e) => {
			if (e.length === 0) throw new Error("endswith() requires at least one argument");
			const t = e[0];
			if (t instanceof J) return new se(this.value.endsWith(t.value));
			if (t instanceof _e) {
				for (const r of t.value) {
					if (!(r instanceof J)) throw new Error("endswith() tuple elements must be strings");
					if (this.value.endsWith(r.value)) return new se(!0);
				}
				return new se(!1);
			}
			throw new Error("endswith() argument must be a string or tuple of strings");
		})],
		["split", new Oe((e) => {
			const t = e[0] ?? new ze();
			if (!(t instanceof J || t instanceof ze)) throw new Error("sep argument must be a string or null");
			const r = e[1] ?? new le(-1);
			if (!(r instanceof le)) throw new Error("maxsplit argument must be a number");
			let s = [];
			if (t instanceof ze) {
				const n = this.value.trimStart();
				for (const { 0: a, index: o } of n.matchAll(/\S+/g)) {
					if (r.value !== -1 && s.length >= r.value && o !== void 0) {
						s.push(a + n.slice(o + a.length));
						break;
					}
					s.push(a);
				}
			} else {
				if (t.value === "") throw new Error("empty separator");
				s = this.value.split(t.value), r.value !== -1 && s.length > r.value && s.push(s.splice(r.value).join(t.value));
			}
			return new _e(s.map((n) => new J(n)));
		})],
		["replace", new Oe((e) => {
			if (e.length < 2) throw new Error("replace() requires at least two arguments");
			const t = e[0], r = e[1];
			if (!(t instanceof J && r instanceof J)) throw new Error("replace() arguments must be strings");
			let s;
			if (e.length > 2 ? e[2].type === "KeywordArgumentsValue" ? s = e[2].value.get("count") ?? new ze() : s = e[2] : s = new ze(), !(s instanceof le || s instanceof ze)) throw new Error("replace() count argument must be a number or null");
			return new J(a1(this.value, t.value, r.value, s.value));
		})]
	]);
}, se = class extends Xt {
	type = "BooleanValue";
}, o1 = /[\x7f-\uffff]/g;
function Jh(e) {
	return e.replace(o1, (t) => "\\u" + t.charCodeAt(0).toString(16).padStart(4, "0"));
}
function Nr(e, t = {}, r = 0, s = !0) {
	const { indent: n = null, ensureAscii: a = !1, separators: o = null, sortKeys: i = !1 } = t;
	let l, c;
	switch (o ? [l, c] = o : n ? (l = ",", c = ": ") : (l = ", ", c = ": "), e.type) {
		case "NullValue": return "null";
		case "UndefinedValue": return s ? "null" : "undefined";
		case "IntegerValue":
		case "FloatValue":
		case "BooleanValue": return JSON.stringify(e.value);
		case "StringValue": {
			let d = JSON.stringify(e.value);
			return a && (d = Jh(d)), d;
		}
		case "ArrayValue":
		case "ObjectValue": {
			const d = n ? " ".repeat(n) : "", h = `
` + d.repeat(r), _ = h + d;
			if (e.type === "ArrayValue") {
				const m = e.value.map((v) => Nr(v, t, r + 1, s));
				return n ? `[${_}${m.join(`${l}${_}`)}${h}]` : `[${m.join(l)}]`;
			} else {
				let m = Array.from(e.value.entries());
				i && (m = m.sort(([w], [b]) => w.localeCompare(b)));
				const v = m.map(([w, b]) => {
					let M = JSON.stringify(w);
					a && (M = Jh(M));
					const E = `${M}${c}${Nr(b, t, r + 1, s)}`;
					return n ? `${_}${E}` : E;
				});
				return n ? `{${v.join(l)}${h}}` : `{${v.join(l)}}`;
			}
		}
		default: throw new Error(`Cannot convert to JSON: ${e.type}`);
	}
}
var Je = class extends Xt {
	type = "ObjectValue";
	__bool__() {
		return new se(this.value.size > 0);
	}
	builtins = /* @__PURE__ */ new Map([
		["get", new Oe(([e, t]) => {
			if (!(e instanceof J)) throw new Error(`Object key must be a string: got ${e.type}`);
			return this.value.get(e.value) ?? t ?? new ze();
		})],
		["items", new Oe(() => this.items())],
		["keys", new Oe(() => this.keys())],
		["values", new Oe(() => this.values())],
		["dictsort", new Oe((e) => {
			let t = /* @__PURE__ */ new Map();
			const r = e.filter((o) => o instanceof js ? (t = o.value, !1) : !0), s = r.at(0) ?? t.get("case_sensitive") ?? new se(!1);
			if (!(s instanceof se)) throw new Error("case_sensitive must be a boolean");
			const n = r.at(1) ?? t.get("by") ?? new J("key");
			if (!(n instanceof J)) throw new Error("by must be a string");
			if (!["key", "value"].includes(n.value)) throw new Error("by must be either 'key' or 'value'");
			const a = r.at(2) ?? t.get("reverse") ?? new se(!1);
			if (!(a instanceof se)) throw new Error("reverse must be a boolean");
			return new _e(Array.from(this.value.entries()).map(([o, i]) => new _e([new J(o), i])).sort((o, i) => {
				const l = n.value === "key" ? 0 : 1, c = o.value[l], d = i.value[l], h = Qo(c, d, s.value);
				return a.value ? -h : h;
			}));
		})]
	]);
	items() {
		return new _e(Array.from(this.value.entries()).map(([e, t]) => new _e([new J(e), t])));
	}
	keys() {
		return new _e(Array.from(this.value.keys()).map((e) => new J(e)));
	}
	values() {
		return new _e(Array.from(this.value.values()));
	}
	toString() {
		return Nr(this, {}, 0, !1);
	}
}, js = class extends Je {
	type = "KeywordArgumentsValue";
}, _e = class extends Xt {
	type = "ArrayValue";
	builtins = /* @__PURE__ */ new Map([["length", new le(this.value.length)]]);
	__bool__() {
		return new se(this.value.length > 0);
	}
	toString() {
		return Nr(this, {}, 0, !1);
	}
}, Kh = class extends _e {
	type = "TupleValue";
}, Oe = class extends Xt {
	type = "FunctionValue";
}, ze = class extends Xt {
	type = "NullValue";
}, Ie = class extends Xt {
	type = "UndefinedValue";
}, Pr = class {
	constructor(e) {
		this.parent = e;
	}
	variables = /* @__PURE__ */ new Map([["namespace", new Oe((e) => {
		if (e.length === 0) return new Je(/* @__PURE__ */ new Map());
		if (e.length !== 1 || !(e[0] instanceof Je)) throw new Error("`namespace` expects either zero arguments or a single object argument");
		return e[0];
	})]]);
	tests = /* @__PURE__ */ new Map([
		["boolean", (e) => e.type === "BooleanValue"],
		["callable", (e) => e instanceof Oe],
		["odd", (e) => {
			if (!(e instanceof le)) throw new Error(`cannot odd on ${e.type}`);
			return e.value % 2 !== 0;
		}],
		["even", (e) => {
			if (!(e instanceof le)) throw new Error(`cannot even on ${e.type}`);
			return e.value % 2 === 0;
		}],
		["false", (e) => e.type === "BooleanValue" && !e.value],
		["true", (e) => e.type === "BooleanValue" && e.value],
		["none", (e) => e.type === "NullValue"],
		["string", (e) => e.type === "StringValue"],
		["number", (e) => e instanceof le || e instanceof Re],
		["integer", (e) => e instanceof le],
		["iterable", (e) => e.type === "ArrayValue" || e.type === "StringValue"],
		["mapping", (e) => e instanceof Je],
		["sequence", (e) => e instanceof _e || e instanceof Je || e instanceof J],
		["lower", (e) => {
			const t = e.value;
			return e.type === "StringValue" && t === t.toLowerCase();
		}],
		["upper", (e) => {
			const t = e.value;
			return e.type === "StringValue" && t === t.toUpperCase();
		}],
		["none", (e) => e.type === "NullValue"],
		["defined", (e) => e.type !== "UndefinedValue"],
		["undefined", (e) => e.type === "UndefinedValue"],
		["equalto", (e, t) => e.value === t.value],
		["eq", (e, t) => e.value === t.value]
	]);
	set(e, t) {
		return this.declareVariable(e, $n(t));
	}
	declareVariable(e, t) {
		if (this.variables.has(e)) throw new SyntaxError(`Variable already declared: ${e}`);
		return this.variables.set(e, t), t;
	}
	setVariable(e, t) {
		return this.variables.set(e, t), t;
	}
	resolve(e) {
		if (this.variables.has(e)) return this;
		if (this.parent) return this.parent.resolve(e);
		throw new Error(`Unknown variable: ${e}`);
	}
	lookupVariable(e) {
		try {
			return this.resolve(e).variables.get(e) ?? new Ie();
		} catch {
			return new Ie();
		}
	}
};
function i1(e) {
	e.set("false", !1), e.set("true", !0), e.set("none", null), e.set("raise_exception", (t) => {
		throw new Error(t);
	}), e.set("range", e1), e.set("strftime_now", r1), e.set("True", !0), e.set("False", !1), e.set("None", null);
}
function Zh(e, t) {
	const r = t.split(".");
	let s = e;
	for (const n of r) if (s instanceof Je) s = s.value.get(n) ?? new Ie();
	else if (s instanceof _e) {
		const a = parseInt(n, 10);
		if (!isNaN(a) && a >= 0 && a < s.value.length) s = s.value[a];
		else return new Ie();
	} else return new Ie();
	return s;
}
function Qo(e, t, r = !1) {
	if (e instanceof ze && t instanceof ze) return 0;
	if (e instanceof ze || t instanceof ze) throw new Error(`Cannot compare ${e.type} with ${t.type}`);
	if (e instanceof Ie && t instanceof Ie) return 0;
	if (e instanceof Ie || t instanceof Ie) throw new Error(`Cannot compare ${e.type} with ${t.type}`);
	const s = (a) => a instanceof le || a instanceof Re || a instanceof se, n = (a) => a instanceof se ? a.value ? 1 : 0 : a.value;
	if (s(e) && s(t)) {
		const a = n(e), o = n(t);
		return a < o ? -1 : a > o ? 1 : 0;
	}
	if (e.type !== t.type) throw new Error(`Cannot compare different types: ${e.type} and ${t.type}`);
	if (e.type === "StringValue") {
		let a = e.value, o = t.value;
		return r || (a = a.toLowerCase(), o = o.toLowerCase()), a < o ? -1 : a > o ? 1 : 0;
	} else throw new Error(`Cannot compare type: ${e.type}`);
}
var l1 = class {
	global;
	constructor(e) {
		this.global = e ?? new Pr();
	}
	run(e) {
		return this.evaluate(e, this.global);
	}
	evaluateBinaryExpression(e, t) {
		const r = this.evaluate(e.left, t);
		switch (e.operator.value) {
			case "and": return r.__bool__().value ? this.evaluate(e.right, t) : r;
			case "or": return r.__bool__().value ? r : this.evaluate(e.right, t);
		}
		const s = this.evaluate(e.right, t);
		switch (e.operator.value) {
			case "==": return new se(r.value == s.value);
			case "!=": return new se(r.value != s.value);
		}
		if (r instanceof Ie || s instanceof Ie) {
			if (s instanceof Ie && ["in", "not in"].includes(e.operator.value)) return new se(e.operator.value === "not in");
			throw new Error(`Cannot perform operation ${e.operator.value} on undefined values`);
		} else {
			if (r instanceof ze || s instanceof ze) throw new Error("Cannot perform operation on null values");
			if (e.operator.value === "~") return new J(r.value.toString() + s.value.toString());
			if ((r instanceof le || r instanceof Re) && (s instanceof le || s instanceof Re)) {
				const n = r.value, a = s.value;
				switch (e.operator.value) {
					case "+":
					case "-":
					case "*": {
						const o = e.operator.value === "+" ? n + a : e.operator.value === "-" ? n - a : n * a;
						return r instanceof Re || s instanceof Re ? new Re(o) : new le(o);
					}
					case "/": return new Re(n / a);
					case "%": {
						const o = n % a;
						return r instanceof Re || s instanceof Re ? new Re(o) : new le(o);
					}
					case "<": return new se(n < a);
					case ">": return new se(n > a);
					case ">=": return new se(n >= a);
					case "<=": return new se(n <= a);
				}
			} else if (r instanceof _e && s instanceof _e) {
				if (e.operator.value === "+") return new _e(r.value.concat(s.value));
			} else if (s instanceof _e) {
				const n = s.value.find((a) => a.value === r.value) !== void 0;
				switch (e.operator.value) {
					case "in": return new se(n);
					case "not in": return new se(!n);
				}
			}
		}
		if ((r instanceof J || s instanceof J) && e.operator.value === "+") return new J(r.value.toString() + s.value.toString());
		if (r instanceof J && s instanceof J) switch (e.operator.value) {
			case "in": return new se(s.value.includes(r.value));
			case "not in": return new se(!s.value.includes(r.value));
		}
		if (r instanceof J && s instanceof Je) switch (e.operator.value) {
			case "in": return new se(s.value.has(r.value));
			case "not in": return new se(!s.value.has(r.value));
		}
		throw new SyntaxError(`Unknown operator "${e.operator.value}" between ${r.type} and ${s.type}`);
	}
	evaluateArguments(e, t) {
		const r = [], s = /* @__PURE__ */ new Map();
		for (const n of e) if (n.type === "SpreadExpression") {
			const a = n, o = this.evaluate(a.argument, t);
			if (!(o instanceof _e)) throw new Error(`Cannot unpack non-iterable type: ${o.type}`);
			for (const i of o.value) r.push(i);
		} else if (n.type === "KeywordArgumentExpression") {
			const a = n;
			s.set(a.key.value, this.evaluate(a.value, t));
		} else {
			if (s.size > 0) throw new Error("Positional arguments must come before keyword arguments");
			r.push(this.evaluate(n, t));
		}
		return [r, s];
	}
	applyFilter(e, t, r) {
		if (t.type === "Identifier") {
			const s = t;
			if (s.value === "safe") return e;
			if (s.value === "tojson") return new J(Nr(e, {}));
			if (e instanceof _e) switch (s.value) {
				case "list": return e;
				case "first": return e.value[0];
				case "last": return e.value[e.value.length - 1];
				case "length": return new le(e.value.length);
				case "reverse": return new _e(e.value.slice().reverse());
				case "sort": return new _e(e.value.slice().sort((n, a) => Qo(n, a, !1)));
				case "join": return new J(e.value.map((n) => n.value).join(""));
				case "string": return new J(Nr(e, {}, 0, !1));
				case "unique": {
					const n = /* @__PURE__ */ new Set(), a = [];
					for (const o of e.value) n.has(o.value) || (n.add(o.value), a.push(o));
					return new _e(a);
				}
				default: throw new Error(`Unknown ArrayValue filter: ${s.value}`);
			}
			else if (e instanceof J) switch (s.value) {
				case "length":
				case "upper":
				case "lower":
				case "title":
				case "capitalize": {
					const n = e.builtins.get(s.value);
					if (n instanceof Oe) return n.value([], r);
					if (n instanceof le) return n;
					throw new Error(`Unknown StringValue filter: ${s.value}`);
				}
				case "trim": return new J(e.value.trim());
				case "indent": return new J(e.value.split(`
`).map((n, a) => a === 0 || n.length === 0 ? n : "    " + n).join(`
`));
				case "join":
				case "string": return e;
				case "int": {
					const n = parseInt(e.value, 10);
					return new le(isNaN(n) ? 0 : n);
				}
				case "float": {
					const n = parseFloat(e.value);
					return new Re(isNaN(n) ? 0 : n);
				}
				default: throw new Error(`Unknown StringValue filter: ${s.value}`);
			}
			else if (e instanceof le || e instanceof Re) switch (s.value) {
				case "abs": return e instanceof le ? new le(Math.abs(e.value)) : new Re(Math.abs(e.value));
				case "int": return new le(Math.floor(e.value));
				case "float": return new Re(e.value);
				case "string": return new J(e.toString());
				default: throw new Error(`Unknown NumericValue filter: ${s.value}`);
			}
			else if (e instanceof Je) switch (s.value) {
				case "items": return new _e(Array.from(e.value.entries()).map(([n, a]) => new _e([new J(n), a])));
				case "length": return new le(e.value.size);
				default: {
					const n = e.builtins.get(s.value);
					if (n) return n instanceof Oe ? n.value([], r) : n;
					throw new Error(`Unknown ObjectValue filter: ${s.value}`);
				}
			}
			else if (e instanceof se) switch (s.value) {
				case "bool": return new se(e.value);
				case "int": return new le(e.value ? 1 : 0);
				case "float": return new Re(e.value ? 1 : 0);
				case "string": return new J(e.value ? "true" : "false");
				default: throw new Error(`Unknown BooleanValue filter: ${s.value}`);
			}
			throw new Error(`Cannot apply filter "${s.value}" to type: ${e.type}`);
		} else if (t.type === "CallExpression") {
			const s = t;
			if (s.callee.type !== "Identifier") throw new Error(`Unknown filter: ${s.callee.type}`);
			const n = s.callee.value;
			if (n === "tojson") {
				const [, a] = this.evaluateArguments(s.args, r), o = a.get("indent") ?? new ze();
				if (!(o instanceof le || o instanceof ze)) throw new Error("If set, indent must be a number");
				const i = a.get("ensure_ascii") ?? new se(!1);
				if (!(i instanceof se)) throw new Error("If set, ensure_ascii must be a boolean");
				const l = a.get("sort_keys") ?? new se(!1);
				if (!(l instanceof se)) throw new Error("If set, sort_keys must be a boolean");
				const c = a.get("separators") ?? new ze();
				let d = null;
				if (c instanceof _e || c instanceof Kh) {
					if (c.value.length !== 2) throw new Error("separators must be a tuple of two strings");
					const [h, _] = c.value;
					if (!(h instanceof J) || !(_ instanceof J)) throw new Error("separators must be a tuple of two strings");
					d = [h.value, _.value];
				} else if (!(c instanceof ze)) throw new Error("If set, separators must be a tuple of two strings");
				return new J(Nr(e, {
					indent: o.value,
					ensureAscii: i.value,
					sortKeys: l.value,
					separators: d
				}));
			} else if (n === "join") {
				let a;
				if (e instanceof J) a = Array.from(e.value);
				else if (e instanceof _e) a = e.value.map((c) => c.value);
				else throw new Error(`Cannot apply filter "${n}" to type: ${e.type}`);
				const [o, i] = this.evaluateArguments(s.args, r), l = o.at(0) ?? i.get("separator") ?? new J("");
				if (!(l instanceof J)) throw new Error("separator must be a string");
				return new J(a.join(l.value));
			} else if (n === "int" || n === "float") {
				const [a, o] = this.evaluateArguments(s.args, r), i = a.at(0) ?? o.get("default") ?? (n === "int" ? new le(0) : new Re(0));
				if (e instanceof J) {
					const l = n === "int" ? parseInt(e.value, 10) : parseFloat(e.value);
					return isNaN(l) ? i : n === "int" ? new le(l) : new Re(l);
				} else {
					if (e instanceof le || e instanceof Re) return e;
					if (e instanceof se) return n === "int" ? new le(e.value ? 1 : 0) : new Re(e.value ? 1 : 0);
					throw new Error(`Cannot apply filter "${n}" to type: ${e.type}`);
				}
			} else if (n === "default") {
				const [a, o] = this.evaluateArguments(s.args, r), i = a[0] ?? new J(""), l = a[1] ?? o.get("boolean") ?? new se(!1);
				if (!(l instanceof se)) throw new Error("`default` filter flag must be a boolean");
				return e instanceof Ie || l.value && !e.__bool__().value ? i : e;
			}
			if (e instanceof _e) {
				switch (n) {
					case "sort": {
						const [a, o] = this.evaluateArguments(s.args, r), i = a.at(0) ?? o.get("reverse") ?? new se(!1);
						if (!(i instanceof se)) throw new Error("reverse must be a boolean");
						const l = a.at(1) ?? o.get("case_sensitive") ?? new se(!1);
						if (!(l instanceof se)) throw new Error("case_sensitive must be a boolean");
						const c = a.at(2) ?? o.get("attribute") ?? new ze();
						if (!(c instanceof J || c instanceof le || c instanceof ze)) throw new Error("attribute must be a string, integer, or null");
						const d = (h) => c instanceof ze ? h : Zh(h, c instanceof le ? String(c.value) : c.value);
						return new _e(e.value.slice().sort((h, _) => {
							const m = Qo(d(h), d(_), l.value);
							return i.value ? -m : m;
						}));
					}
					case "selectattr":
					case "rejectattr": {
						const a = n === "selectattr";
						if (e.value.some((d) => !(d instanceof Je))) throw new Error(`\`${n}\` can only be applied to array of objects`);
						if (s.args.some((d) => d.type !== "StringLiteral")) throw new Error(`arguments of \`${n}\` must be strings`);
						const [o, i, l] = s.args.map((d) => this.evaluate(d, r));
						let c;
						if (i) {
							const d = r.tests.get(i.value);
							if (!d) throw new Error(`Unknown test: ${i.value}`);
							c = d;
						} else c = (...d) => d[0].__bool__().value;
						return new _e(e.value.filter((d) => {
							const h = d.value.get(o.value), _ = h ? c(h, l) : !1;
							return a ? _ : !_;
						}));
					}
					case "map": {
						const [, a] = this.evaluateArguments(s.args, r);
						if (a.has("attribute")) {
							const o = a.get("attribute");
							if (!(o instanceof J)) throw new Error("attribute must be a string");
							const i = a.get("default");
							return new _e(e.value.map((l) => {
								if (!(l instanceof Je)) throw new Error("items in map must be an object");
								const c = Zh(l, o.value);
								return c instanceof Ie ? i ?? new Ie() : c;
							}));
						} else throw new Error("`map` expressions without `attribute` set are not currently supported.");
					}
				}
				throw new Error(`Unknown ArrayValue filter: ${n}`);
			} else if (e instanceof J) {
				switch (n) {
					case "indent": {
						const [a, o] = this.evaluateArguments(s.args, r), i = a.at(0) ?? o.get("width") ?? new le(4);
						if (!(i instanceof le)) throw new Error("width must be a number");
						const l = a.at(1) ?? o.get("first") ?? new se(!1), c = a.at(2) ?? o.get("blank") ?? new se(!1), d = e.value.split(`
`), h = " ".repeat(i.value);
						return new J(d.map((_, m) => !l.value && m === 0 || !c.value && _.length === 0 ? _ : h + _).join(`
`));
					}
					case "replace": {
						const a = e.builtins.get("replace");
						if (!(a instanceof Oe)) throw new Error("replace filter not available");
						const [o, i] = this.evaluateArguments(s.args, r);
						return a.value([...o, new js(i)], r);
					}
				}
				throw new Error(`Unknown StringValue filter: ${n}`);
			} else if (e instanceof Je) {
				const a = e.builtins.get(n);
				if (a && a instanceof Oe) {
					const [o, i] = this.evaluateArguments(s.args, r);
					return i.size > 0 && o.push(new js(i)), a.value(o, r);
				}
				throw new Error(`Unknown ObjectValue filter: ${n}`);
			} else throw new Error(`Cannot apply filter "${n}" to type: ${e.type}`);
		}
		throw new Error(`Unknown filter: ${t.type}`);
	}
	evaluateFilterExpression(e, t) {
		const r = this.evaluate(e.operand, t);
		return this.applyFilter(r, e.filter, t);
	}
	evaluateTestExpression(e, t) {
		const r = this.evaluate(e.operand, t), s = t.tests.get(e.test.value);
		if (!s) throw new Error(`Unknown test: ${e.test.value}`);
		const n = s(r);
		return new se(e.negate ? !n : n);
	}
	evaluateSelectExpression(e, t) {
		return this.evaluate(e.test, t).__bool__().value ? this.evaluate(e.lhs, t) : new Ie();
	}
	evaluateUnaryExpression(e, t) {
		const r = this.evaluate(e.argument, t);
		if (e.operator.value === "not") return new se(!r.value);
		throw new SyntaxError(`Unknown operator: ${e.operator.value}`);
	}
	evaluateTernaryExpression(e, t) {
		return this.evaluate(e.condition, t).__bool__().value ? this.evaluate(e.trueExpr, t) : this.evaluate(e.falseExpr, t);
	}
	evalProgram(e, t) {
		return this.evaluateBlock(e.body, t);
	}
	evaluateBlock(e, t) {
		let r = "";
		for (const s of e) {
			const n = this.evaluate(s, t);
			n.type !== "NullValue" && n.type !== "UndefinedValue" && (r += n.toString());
		}
		return new J(r);
	}
	evaluateIdentifier(e, t) {
		return t.lookupVariable(e.value);
	}
	evaluateCallExpression(e, t) {
		const [r, s] = this.evaluateArguments(e.args, t);
		s.size > 0 && r.push(new js(s));
		const n = this.evaluate(e.callee, t);
		if (n.type !== "FunctionValue") throw new Error(`Cannot call something that is not a function: got ${n.type}`);
		return n.value(r, t);
	}
	evaluateSliceExpression(e, t, r) {
		if (!(e instanceof _e || e instanceof J)) throw new Error("Slice object must be an array or string");
		const s = this.evaluate(t.start, r), n = this.evaluate(t.stop, r), a = this.evaluate(t.step, r);
		if (!(s instanceof le || s instanceof Ie)) throw new Error("Slice start must be numeric or undefined");
		if (!(n instanceof le || n instanceof Ie)) throw new Error("Slice stop must be numeric or undefined");
		if (!(a instanceof le || a instanceof Ie)) throw new Error("Slice step must be numeric or undefined");
		return e instanceof _e ? new _e(Qh(e.value, s.value, n.value, a.value)) : new J(Qh(Array.from(e.value), s.value, n.value, a.value).join(""));
	}
	evaluateMemberExpression(e, t) {
		const r = this.evaluate(e.object, t);
		let s;
		if (e.computed) {
			if (e.property.type === "SliceExpression") return this.evaluateSliceExpression(r, e.property, t);
			s = this.evaluate(e.property, t);
		} else s = new J(e.property.value);
		let n;
		if (r instanceof Je) {
			if (!(s instanceof J)) throw new Error(`Cannot access property with non-string: got ${s.type}`);
			n = r.value.get(s.value) ?? r.builtins.get(s.value);
		} else if (r instanceof _e || r instanceof J) if (s instanceof le) n = r.value.at(s.value), r instanceof J && (n = new J(r.value.at(s.value)));
		else if (s instanceof J) n = r.builtins.get(s.value);
		else throw new Error(`Cannot access property with non-string/non-number: got ${s.type}`);
		else {
			if (!(s instanceof J)) throw new Error(`Cannot access property with non-string: got ${s.type}`);
			n = r.builtins.get(s.value);
		}
		return n instanceof Xt ? n : new Ie();
	}
	evaluateSet(e, t) {
		const r = e.value ? this.evaluate(e.value, t) : this.evaluateBlock(e.body, t);
		if (e.assignee.type === "Identifier") {
			const s = e.assignee.value;
			t.setVariable(s, r);
		} else if (e.assignee.type === "TupleLiteral") {
			const s = e.assignee;
			if (!(r instanceof _e)) throw new Error(`Cannot unpack non-iterable type in set: ${r.type}`);
			const n = r.value;
			if (n.length !== s.value.length) throw new Error(`Too ${s.value.length > n.length ? "few" : "many"} items to unpack in set`);
			for (let a = 0; a < s.value.length; ++a) {
				const o = s.value[a];
				if (o.type !== "Identifier") throw new Error(`Cannot unpack to non-identifier in set: ${o.type}`);
				t.setVariable(o.value, n[a]);
			}
		} else if (e.assignee.type === "MemberExpression") {
			const s = e.assignee, n = this.evaluate(s.object, t);
			if (!(n instanceof Je)) throw new Error("Cannot assign to member of non-object");
			if (s.property.type !== "Identifier") throw new Error("Cannot assign to member with non-identifier property");
			n.value.set(s.property.value, r);
		} else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(e.assignee)}`);
		return new ze();
	}
	evaluateIf(e, t) {
		const r = this.evaluate(e.test, t);
		return this.evaluateBlock(r.__bool__().value ? e.body : e.alternate, t);
	}
	evaluateFor(e, t) {
		const r = new Pr(t);
		let s, n;
		if (e.iterable.type === "SelectExpression") {
			const c = e.iterable;
			n = this.evaluate(c.lhs, r), s = c.test;
		} else n = this.evaluate(e.iterable, r);
		if (!(n instanceof _e || n instanceof Je)) throw new Error(`Expected iterable or object type in for loop: got ${n.type}`);
		n instanceof Je && (n = n.keys());
		const a = [], o = [];
		for (let c = 0; c < n.value.length; ++c) {
			const d = new Pr(r), h = n.value[c];
			let _;
			if (e.loopvar.type === "Identifier") _ = (m) => m.setVariable(e.loopvar.value, h);
			else if (e.loopvar.type === "TupleLiteral") {
				const m = e.loopvar;
				if (h.type !== "ArrayValue") throw new Error(`Cannot unpack non-iterable type: ${h.type}`);
				const v = h;
				if (m.value.length !== v.value.length) throw new Error(`Too ${m.value.length > v.value.length ? "few" : "many"} items to unpack`);
				_ = (w) => {
					for (let b = 0; b < m.value.length; ++b) {
						if (m.value[b].type !== "Identifier") throw new Error(`Cannot unpack non-identifier type: ${m.value[b].type}`);
						w.setVariable(m.value[b].value, v.value[b]);
					}
				};
			} else throw new Error(`Invalid loop variable(s): ${e.loopvar.type}`);
			s && (_(d), !this.evaluate(s, d).__bool__().value) || (a.push(h), o.push(_));
		}
		let i = "", l = !0;
		for (let c = 0; c < a.length; ++c) {
			const d = /* @__PURE__ */ new Map([
				["index", new le(c + 1)],
				["index0", new le(c)],
				["revindex", new le(a.length - c)],
				["revindex0", new le(a.length - c - 1)],
				["first", new se(c === 0)],
				["last", new se(c === a.length - 1)],
				["length", new le(a.length)],
				["previtem", c > 0 ? a[c - 1] : new Ie()],
				["nextitem", c < a.length - 1 ? a[c + 1] : new Ie()]
			]);
			r.setVariable("loop", new Je(d)), o[c](r);
			try {
				const h = this.evaluateBlock(e.body, r);
				i += h.value;
			} catch (h) {
				if (h instanceof Yh) continue;
				if (h instanceof Xh) break;
				throw h;
			}
			l = !1;
		}
		if (l) {
			const c = this.evaluateBlock(e.defaultBlock, r);
			i += c.value;
		}
		return new J(i);
	}
	evaluateMacro(e, t) {
		return t.setVariable(e.name.value, new Oe((r, s) => {
			const n = new Pr(s);
			r = r.slice();
			let a;
			r.at(-1)?.type === "KeywordArgumentsValue" && (a = r.pop());
			for (let o = 0; o < e.args.length; ++o) {
				const i = e.args[o], l = r[o];
				if (i.type === "Identifier") {
					const c = i;
					if (!l) throw new Error(`Missing positional argument: ${c.value}`);
					n.setVariable(c.value, l);
				} else if (i.type === "KeywordArgumentExpression") {
					const c = i, d = l ?? a?.value.get(c.key.value) ?? this.evaluate(c.value, n);
					n.setVariable(c.key.value, d);
				} else throw new Error(`Unknown argument type: ${i.type}`);
			}
			return this.evaluateBlock(e.body, n);
		})), new ze();
	}
	evaluateCallStatement(e, t) {
		const r = new Oe((i, l) => {
			const c = new Pr(l);
			if (e.callerArgs) for (let d = 0; d < e.callerArgs.length; ++d) {
				const h = e.callerArgs[d];
				if (h.type !== "Identifier") throw new Error(`Caller parameter must be an identifier, got ${h.type}`);
				c.setVariable(h.value, i[d] ?? new Ie());
			}
			return this.evaluateBlock(e.body, c);
		}), [s, n] = this.evaluateArguments(e.call.args, t);
		s.push(new js(n));
		const a = this.evaluate(e.call.callee, t);
		if (a.type !== "FunctionValue") throw new Error(`Cannot call something that is not a function: got ${a.type}`);
		const o = new Pr(t);
		return o.setVariable("caller", r), a.value(s, o);
	}
	evaluateFilterStatement(e, t) {
		const r = this.evaluateBlock(e.body, t);
		return this.applyFilter(r, e.filter, t);
	}
	evaluate(e, t) {
		if (!e) return new Ie();
		switch (e.type) {
			case "Program": return this.evalProgram(e, t);
			case "Set": return this.evaluateSet(e, t);
			case "If": return this.evaluateIf(e, t);
			case "For": return this.evaluateFor(e, t);
			case "Macro": return this.evaluateMacro(e, t);
			case "CallStatement": return this.evaluateCallStatement(e, t);
			case "Break": throw new Xh();
			case "Continue": throw new Yh();
			case "IntegerLiteral": return new le(e.value);
			case "FloatLiteral": return new Re(e.value);
			case "StringLiteral": return new J(e.value);
			case "ArrayLiteral": return new _e(e.value.map((r) => this.evaluate(r, t)));
			case "TupleLiteral": return new Kh(e.value.map((r) => this.evaluate(r, t)));
			case "ObjectLiteral": {
				const r = /* @__PURE__ */ new Map();
				for (const [s, n] of e.value) {
					const a = this.evaluate(s, t);
					if (!(a instanceof J)) throw new Error(`Object keys must be strings: got ${a.type}`);
					r.set(a.value, this.evaluate(n, t));
				}
				return new Je(r);
			}
			case "Identifier": return this.evaluateIdentifier(e, t);
			case "CallExpression": return this.evaluateCallExpression(e, t);
			case "MemberExpression": return this.evaluateMemberExpression(e, t);
			case "UnaryExpression": return this.evaluateUnaryExpression(e, t);
			case "BinaryExpression": return this.evaluateBinaryExpression(e, t);
			case "FilterExpression": return this.evaluateFilterExpression(e, t);
			case "FilterStatement": return this.evaluateFilterStatement(e, t);
			case "TestExpression": return this.evaluateTestExpression(e, t);
			case "SelectExpression": return this.evaluateSelectExpression(e, t);
			case "Ternary": return this.evaluateTernaryExpression(e, t);
			case "Comment": return new ze();
			default: throw new SyntaxError(`Unknown node type: ${e.type}`);
		}
	}
};
function $n(e) {
	switch (typeof e) {
		case "number": return Number.isInteger(e) ? new le(e) : new Re(e);
		case "string": return new J(e);
		case "boolean": return new se(e);
		case "undefined": return new Ie();
		case "object": return e === null ? new ze() : Array.isArray(e) ? new _e(e.map($n)) : new Je(new Map(Object.entries(e).map(([t, r]) => [t, $n(r)])));
		case "function": return new Oe((t, r) => $n(e(...t.map((s) => s.value)) ?? null));
		default: throw new Error(`Cannot convert to runtime value: ${e}`);
	}
}
var qe = `
`, c1 = "{%- ", u1 = " -%}";
function d1(e) {
	switch (e.operator.type) {
		case "MultiplicativeBinaryOperator": return 4;
		case "AdditiveBinaryOperator": return 3;
		case "ComparisonBinaryOperator": return 2;
		case "Identifier": return e.operator.value === "and" ? 1 : e.operator.value === "in" || e.operator.value === "not in" ? 2 : 0;
	}
	return 0;
}
function h1(e, t = "	") {
	const r = typeof t == "number" ? " ".repeat(t) : t;
	return It(e.body, 0, r).replace(/\n$/, "");
}
function tt(...e) {
	return c1 + e.join(" ") + u1;
}
function It(e, t, r) {
	return e.map((s) => f1(s, t, r)).join(qe);
}
function f1(e, t, r) {
	const s = r.repeat(t);
	switch (e.type) {
		case "Program": return It(e.body, t, r);
		case "If": return _1(e, t, r);
		case "For": return p1(e, t, r);
		case "Set": return m1(e, t, r);
		case "Macro": return g1(e, t, r);
		case "Break": return s + tt("break");
		case "Continue": return s + tt("continue");
		case "CallStatement": return w1(e, t, r);
		case "FilterStatement": return v1(e, t, r);
		case "Comment": return s + "{# " + e.value + " #}";
		default: return s + "{{- " + ge(e) + " -}}";
	}
}
function _1(e, t, r) {
	const s = r.repeat(t), n = [];
	let a = e;
	for (; a && (n.push({
		test: a.test,
		body: a.body
	}), a.alternate.length === 1 && a.alternate[0].type === "If");) a = a.alternate[0];
	let o = s + tt("if", ge(n[0].test)) + qe + It(n[0].body, t + 1, r);
	for (let i = 1; i < n.length; ++i) o += qe + s + tt("elif", ge(n[i].test)) + qe + It(n[i].body, t + 1, r);
	return a && a.alternate.length > 0 && (o += qe + s + tt("else") + qe + It(a.alternate, t + 1, r)), o += qe + s + tt("endif"), o;
}
function p1(e, t, r) {
	const s = r.repeat(t);
	let n = "";
	if (e.iterable.type === "SelectExpression") {
		const o = e.iterable;
		n = `${ge(o.lhs)} if ${ge(o.test)}`;
	} else n = ge(e.iterable);
	let a = s + tt("for", ge(e.loopvar), "in", n) + qe + It(e.body, t + 1, r);
	return e.defaultBlock.length > 0 && (a += qe + s + tt("else") + qe + It(e.defaultBlock, t + 1, r)), a += qe + s + tt("endfor"), a;
}
function m1(e, t, r) {
	const s = r.repeat(t), n = ge(e.assignee), a = e.value ? ge(e.value) : "", o = s + tt("set", `${n}${e.value ? " = " + a : ""}`);
	return e.body.length === 0 ? o : o + qe + It(e.body, t + 1, r) + qe + s + tt("endset");
}
function g1(e, t, r) {
	const s = r.repeat(t), n = e.args.map(ge).join(", ");
	return s + tt("macro", `${e.name.value}(${n})`) + qe + It(e.body, t + 1, r) + qe + s + tt("endmacro");
}
function w1(e, t, r) {
	const s = r.repeat(t), n = e.callerArgs && e.callerArgs.length > 0 ? `(${e.callerArgs.map(ge).join(", ")})` : "", a = ge(e.call);
	let o = s + tt(`call${n}`, a) + qe;
	return o += It(e.body, t + 1, r) + qe, o += s + tt("endcall"), o;
}
function v1(e, t, r) {
	const s = r.repeat(t);
	let n = s + tt("filter", e.filter.type === "Identifier" ? e.filter.value : ge(e.filter)) + qe;
	return n += It(e.body, t + 1, r) + qe, n += s + tt("endfilter"), n;
}
function ge(e, t = -1) {
	switch (e.type) {
		case "SpreadExpression": return `*${ge(e.argument)}`;
		case "Identifier": return e.value;
		case "IntegerLiteral": return `${e.value}`;
		case "FloatLiteral": return `${e.value}`;
		case "StringLiteral": return JSON.stringify(e.value);
		case "BinaryExpression": {
			const r = e, s = d1(r), n = ge(r.left, s), a = ge(r.right, s + 1), o = `${n} ${r.operator.value} ${a}`;
			return s < t ? `(${o})` : o;
		}
		case "UnaryExpression": {
			const r = e;
			return r.operator.value + (r.operator.value === "not" ? " " : "") + ge(r.argument, Infinity);
		}
		case "CallExpression": {
			const r = e, s = r.args.map(ge).join(", ");
			return `${ge(r.callee)}(${s})`;
		}
		case "MemberExpression": {
			const r = e;
			let s = ge(r.object);
			[
				"Identifier",
				"MemberExpression",
				"CallExpression",
				"StringLiteral",
				"IntegerLiteral",
				"FloatLiteral",
				"ArrayLiteral",
				"TupleLiteral",
				"ObjectLiteral"
			].includes(r.object.type) || (s = `(${s})`);
			let n = ge(r.property);
			return !r.computed && r.property.type !== "Identifier" && (n = `(${n})`), r.computed ? `${s}[${n}]` : `${s}.${n}`;
		}
		case "FilterExpression": {
			const r = e, s = ge(r.operand, Infinity);
			return r.filter.type === "CallExpression" ? `${s} | ${ge(r.filter)}` : `${s} | ${r.filter.value}`;
		}
		case "SelectExpression": {
			const r = e;
			return `${ge(r.lhs)} if ${ge(r.test)}`;
		}
		case "TestExpression": {
			const r = e;
			return `${ge(r.operand)} is${r.negate ? " not" : ""} ${r.test.value}`;
		}
		case "ArrayLiteral":
		case "TupleLiteral": {
			const r = e.value.map(ge), s = e.type === "ArrayLiteral" ? "[]" : "()";
			return `${s[0]}${r.join(", ")}${s[1]}`;
		}
		case "ObjectLiteral": return `{${Array.from(e.value.entries()).map(([r, s]) => `${ge(r)}: ${ge(s)}`).join(", ")}}`;
		case "SliceExpression": {
			const r = e;
			return `${r.start ? ge(r.start) : ""}:${r.stop ? ge(r.stop) : ""}${r.step ? `:${ge(r.step)}` : ""}`;
		}
		case "KeywordArgumentExpression": {
			const r = e;
			return `${r.key.value}=${ge(r.value)}`;
		}
		case "Ternary": {
			const r = e, s = `${ge(r.trueExpr)} if ${ge(r.condition, 0)} else ${ge(r.falseExpr)}`;
			return t > -1 ? `(${s})` : s;
		}
		default: throw new Error(`Unknown expression type: ${e.type}`);
	}
}
var y1 = class {
	parsed;
	constructor(e) {
		const t = Sx(e, {
			lstrip_blocks: !0,
			trim_blocks: !0
		});
		this.parsed = Zx(t);
	}
	render(e) {
		const t = new Pr();
		if (i1(t), e) for (const [r, s] of Object.entries(e)) t.set(r, s);
		return new l1(t).run(this.parsed).value;
	}
	format(e) {
		return h1(this.parsed, e?.indent || "	");
	}
}, b1 = {
	txt: "text/plain",
	html: "text/html",
	css: "text/css",
	js: "text/javascript",
	json: "application/json",
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif"
}, Kn = class G_ {
	constructor(t) {
		if (this.filePath = t, this.headers = new Headers(), this.exists = vt.existsSync(t), this.exists) {
			this.status = 200, this.statusText = "OK";
			let r = vt.statSync(t);
			this.headers.set("content-length", r.size.toString()), this.updateContentType();
			const s = vt.createReadStream(t);
			this.body = new ReadableStream({
				start(n) {
					s.on("data", (a) => n.enqueue(a)), s.on("end", () => n.close()), s.on("error", (a) => n.error(a));
				},
				cancel() {
					s.destroy();
				}
			});
		} else this.status = 404, this.statusText = "Not Found", this.body = null;
	}
	updateContentType() {
		const t = this.filePath.toString().split(".").pop().toLowerCase();
		this.headers.set("content-type", b1[t] ?? "application/octet-stream");
	}
	clone() {
		let t = new G_(this.filePath);
		return t.exists = this.exists, t.status = this.status, t.statusText = this.statusText, t.headers = new Headers(this.headers), t;
	}
	async arrayBuffer() {
		return (await vt.promises.readFile(this.filePath)).buffer;
	}
	async blob() {
		const t = await vt.promises.readFile(this.filePath);
		return new Blob([t], { type: this.headers.get("content-type") });
	}
	async text() {
		return await vt.promises.readFile(this.filePath, "utf8");
	}
	async json() {
		return JSON.parse(await this.text());
	}
}, la = class {
	constructor(e) {
		this._mt = /* @__PURE__ */ new Uint32Array(624), this._idx = 625, this._gauss_next = null, this._random_fn = this.random.bind(this), this.seed(e);
	}
	seed(e) {
		if (e == null) if (ce.IS_CRYPTO_AVAILABLE) {
			const o = /* @__PURE__ */ new Uint32Array(1);
			crypto.getRandomValues(o), e = o[0];
		} else e = Date.now() >>> 0;
		const t = this._mt, r = (o, i) => Math.imul(o, i) >>> 0, s = [];
		for (let o = e || 0; o > 0; o = Math.floor(o / 4294967296)) s.push(o & 4294967295);
		s.length || s.push(0), t[0] = 19650218;
		for (let o = 1; o < 624; ++o) t[o] = r(1812433253, t[o - 1] ^ t[o - 1] >>> 30) + o >>> 0;
		let n = 1, a = 0;
		for (let o = Math.max(624, s.length); o > 0; --o, ++n, ++a) n >= 624 && (t[0] = t[623], n = 1), a >= s.length && (a = 0), t[n] = (t[n] ^ r(t[n - 1] ^ t[n - 1] >>> 30, 1664525)) + s[a] + a >>> 0;
		for (let o = 623; o > 0; --o, ++n) n >= 624 && (t[0] = t[623], n = 1), t[n] = (t[n] ^ r(t[n - 1] ^ t[n - 1] >>> 30, 1566083941)) - n >>> 0;
		t[0] = 2147483648, this._idx = 624, this._gauss_next = null;
	}
	_int32() {
		const e = this._mt;
		if (this._idx >= 624) {
			for (let r = 0; r < 624; ++r) {
				const s = e[r] & 2147483648 | e[(r + 1) % 624] & 2147483647;
				e[r] = (e[(r + 397) % 624] ^ s >>> 1 ^ (s & 1 ? 2567483615 : 0)) >>> 0;
			}
			this._idx = 0;
		}
		let t = e[this._idx++];
		return t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, t ^= t >>> 18, t >>> 0;
	}
	random() {
		return ((this._int32() >>> 5) * 67108864 + (this._int32() >>> 6)) / 9007199254740992;
	}
	gauss(e = 0, t = 1) {
		let r = this._gauss_next;
		if (this._gauss_next = null, r === null) {
			const s = this.random() * 2 * Math.PI, n = Math.sqrt(-2 * Math.log(1 - this.random()));
			r = Math.cos(s) * n, this._gauss_next = Math.sin(s) * n;
		}
		return e + r * t;
	}
	shuffle(e) {
		for (let t = e.length - 1; t > 0; --t) {
			const r = 32 - Math.clz32(t + 1);
			let s = this._int32() >>> 32 - r;
			for (; s > t;) s = this._int32() >>> 32 - r;
			const n = e[t];
			e[t] = e[s], e[s] = n;
		}
	}
	choices(e, t) {
		return e[$_(this._random_fn, t)];
	}
};
function $_(e, t) {
	let r = 0;
	for (let n = 0; n < t.length; ++n) r += t[n];
	let s = e() * r;
	for (let n = 0; n < t.length; ++n) if (s -= t[n], s < 0) return n;
	return t.length - 1;
}
var jt = new la(), Si = Object.freeze({
	Random: la,
	seed: jt.seed.bind(jt),
	random: jt.random.bind(jt),
	gauss: jt.gauss.bind(jt),
	shuffle: jt.shuffle.bind(jt),
	choices: jt.choices.bind(jt)
}), M1 = (e) => $_(Si.random, e), x1 = new la(), V_ = class {
	constructor(e) {
		this.path = e;
	}
	async match(e) {
		let t = new Kn(Ht.join(this.path, e));
		if (t.exists) return t;
	}
	async put(e, t, r = void 0) {
		const s = Ht.join(this.path, e), n = s + `.tmp.${ce.IS_PROCESS_AVAILABLE ? process.pid : Date.now()}.${x1._int32().toString(36)}`;
		try {
			const a = t.headers.get("Content-Length"), o = parseInt(a ?? "0");
			let i = 0;
			await vt.promises.mkdir(Ht.dirname(s), { recursive: !0 });
			const l = vt.createWriteStream(n), c = t.body.getReader();
			for (;;) {
				const { done: d, value: h } = await c.read();
				if (d) break;
				await new Promise((m, v) => {
					l.write(h, (w) => {
						if (w) {
							v(w);
							return;
						}
						m();
					});
				}), i += h.length;
				const _ = o ? i / o * 100 : 0;
				r?.({
					progress: _,
					loaded: i,
					total: o
				});
			}
			await new Promise((d, h) => {
				l.close((_) => _ ? h(_) : d());
			}), await vt.promises.rename(n, s);
		} catch (a) {
			try {
				await vt.promises.unlink(n);
			} catch {}
			throw a;
		}
	}
	async delete(e) {
		let t = Ht.join(this.path, e);
		try {
			return await vt.promises.unlink(t), !0;
		} catch {
			return !1;
		}
	}
}, k1 = {
	400: "Bad request error occurred while trying to load file",
	401: "Unauthorized access to file",
	403: "Forbidden access to file",
	404: "Could not locate file",
	408: "Request timeout error occurred while trying to load file",
	500: "Internal server error error occurred while trying to load file",
	502: "Bad gateway error occurred while trying to load file",
	503: "Service unavailable error occurred while trying to load file",
	504: "Gateway timeout error occurred while trying to load file"
}, ef = 100, T1 = /^(\b[\w\-.]+\b\/)?\b[\w\-.]{1,96}\b$/;
function Fn(...e) {
	return e = e.map((t, r) => (r && (t = t.replace(/* @__PURE__ */ new RegExp("^/"), "")), r !== e.length - 1 && (t = t.replace(/* @__PURE__ */ new RegExp("/$"), "")), t)), e.join("/");
}
function fs(e, t = null, r = null) {
	let s;
	try {
		s = new URL(e);
	} catch {
		return !1;
	}
	return !(t && !t.includes(s.protocol) || r && !r.includes(s.hostname));
}
function E1(e) {
	return !(!T1.test(e) || e.includes("..") || e.includes("--") || e.endsWith(".git") || e.endsWith(".ipynb"));
}
function A1(e, t, r) {
	if (!r) return null;
	const s = k1[e] ?? `Error (${e}) occurred while trying to load file`;
	throw Error(`${s}: "${t}".`);
}
async function C1(e, t, r) {
	const s = e.headers.get("Content-Length");
	let n = s ? parseInt(s, 10) : r ?? 0;
	s === null && !r && oe.warn("Unable to determine content-length from response headers. Will expand buffer when needed.");
	let a = new Uint8Array(n), o = 0;
	const i = e.body.getReader();
	async function l() {
		const { done: c, value: d } = await i.read();
		if (c) return;
		const h = o + d.length;
		if (h > n) {
			n = h;
			const _ = new Uint8Array(n);
			_.set(a), a = _;
		}
		return a.set(d, o), o = h, t({
			progress: o / n * 100,
			loaded: o,
			total: n
		}), l();
	}
	return await l(), a;
}
function tf(e) {
	return fs(e, ["blob:"]);
}
function rf(e) {
	let t;
	if (typeof location < "u" && location.href) t = location.href;
	else if (typeof import.meta < "u" && import.meta.url) t = import.meta.url;
	else return e;
	return new URL(e, t).href;
}
var U_ = "SHA-256", S1 = "experimental_transformers-hash-cache", sf = (e) => ({
	algorithm: U_,
	value: e
}), nf = class {
	#t = null;
	_getHashCache = () => (this.#t ??= caches.open(S1), this.#t);
	static isAvailable = () => typeof navigator < "u" && "crossOriginStorage" in navigator;
	match = async (e) => {
		const t = await this._getFileHash(e);
		if (t) try {
			const [r] = await navigator.crossOriginStorage.requestFileHandles([sf(t)]), s = await r.getFile();
			return new Response(s, { headers: { "Content-Length": String(s.size) } });
		} catch {
			return;
		}
	};
	put = async (e, t) => {
		const r = await this._getFileHash(e);
		if (r) {
			const s = await t.blob();
			await this._storeBlobInCOS(s, r);
		} else this._processAndStore(e, t.body);
	};
	_storeBlobInCOS = async (e, t) => {
		const [r] = await navigator.crossOriginStorage.requestFileHandles([sf(t)], { create: !0 }), s = await r.createWritable();
		await s.write(e), await s.close();
	};
	_processAndStore = async (e, t) => {
		try {
			const r = [];
			for await (const a of t) r.push(a);
			const s = new Blob(r), n = await this._getBlobHash(s);
			await this._storeBlobInCOS(s, n);
			try {
				await (await this._getHashCache()).put(e, new Response(n));
			} catch {}
		} catch {}
	};
	delete = async (e) => {
		try {
			return await (await this._getHashCache()).delete(e);
		} catch {
			return !1;
		}
	};
	_getFileHash = async (e) => {
		try {
			const t = await this._getHashCache(), r = await t.match(e);
			if (r) return r.text();
			const s = await this._getLfsFileHash(e);
			return s ? (await t.put(e, new Response(s)), s) : null;
		} catch {
			return null;
		}
	};
	_getLfsFileHash = async (e) => {
		if (!e.includes("/resolve/")) return null;
		const t = e.replace("/resolve/", "/raw/");
		try {
			const r = (await fetch(t).then((s) => s.text())).match(/^oid sha256:([0-9a-f]+)$/m);
			return r ? r[1] : null;
		} catch {
			return null;
		}
	};
	_getBlobHash = async (e) => {
		const t = await e.arrayBuffer(), r = await crypto.subtle.digest(U_, t);
		return Array.from(new Uint8Array(r)).map((s) => s.toString(16).padStart(2, "0")).join("");
	};
};
async function Pi(e = null) {
	let t = null;
	if (we.useCustomCache) {
		if (!we.customCache) throw Error("`env.useCustomCache=true`, but `env.customCache` is not defined.");
		if (!we.customCache.match || !we.customCache.put) throw new Error("`env.customCache` must be an object which implements the `match` and `put` functions of the Web Cache API. For more information, see https://developer.mozilla.org/en-US/docs/Web/API/Cache");
		t = we.customCache;
	}
	if (!t && we.experimental_useCrossOriginStorage && nf.isAvailable() && (t = new nf()), !t && we.useBrowserCache) {
		if (typeof caches > "u") throw Error("Browser cache is not available in this environment.");
		try {
			t = await caches.open(we.cacheKey);
		} catch (r) {
			oe.warn("An error occurred while opening the browser cache:", r);
		}
	}
	if (!t && we.useFSCache) {
		if (!ce.IS_FS_AVAILABLE) throw Error("File System Cache is not available in this environment.");
		t = new V_(e ?? we.cacheDir);
	}
	return t;
}
async function P1(e, ...t) {
	for (let r of t) try {
		let s = await e.match(r);
		if (s) return s;
	} catch {
		continue;
	}
}
var F1 = class {
	#t;
	#e;
	constructor(e) {
		this.#t = e, this.#e = /* @__PURE__ */ new Map();
	}
	get(e) {
		if (!this.#e.has(e)) return;
		const t = this.#e.get(e);
		return this.#e.delete(e), this.#e.set(e, t), t;
	}
	put(e, t) {
		this.#e.has(e) && this.#e.delete(e), this.#e.set(e, t), this.#e.size > this.#t && this.#e.delete(this.#e.keys().next().value);
	}
	delete(e) {
		return this.#e.delete(e);
	}
	clear() {
		this.#e.clear();
	}
}, Lo = new F1(100);
function j_(e, t) {
	const r = Lo.get(e);
	if (r !== void 0) return r;
	const s = t().then((n) => n, (n) => (Lo.delete(e), Promise.reject(n)));
	return Lo.put(e, s), s;
}
async function L1(e) {
	if (!fs(e, ["http:", "https:"])) return null;
	const t = q_(e);
	return t.set("Range", "bytes=0-0"), we.fetch(e, {
		method: "GET",
		headers: t,
		cache: "no-store"
	});
}
function sn(e, t, r = {}) {
	return j_(JSON.stringify([
		e,
		t,
		r?.revision,
		r?.cache_dir,
		r?.local_files_only
	]), () => I1(e, t, r));
}
async function I1(e, t, r) {
	const s = await Pi(r?.cache_dir), { localPath: n, remoteURL: a, proposedCacheKey: o, validModelId: i } = W_(e, t, r, s), l = await H_(s, n, o);
	if (l !== void 0 && typeof l != "string") {
		const c = l.headers.get("content-length"), d = l.headers.get("content-type");
		return {
			exists: !0,
			size: c ? parseInt(c, 10) : void 0,
			contentType: d || void 0,
			fromCache: !0
		};
	}
	if (we.allowLocalModels && !fs(n, ["http:", "https:"])) try {
		const c = await Ys(n);
		if (typeof c != "string" && c.status !== 404) {
			const d = c.headers.get("content-length"), h = c.headers.get("content-type");
			return {
				exists: !0,
				size: d ? parseInt(d, 10) : void 0,
				contentType: h || void 0,
				fromCache: !1
			};
		}
	} catch {}
	if (we.allowRemoteModels && !r.local_files_only && i) try {
		const c = await L1(a);
		if (c && c.status >= 200 && c.status < 300) {
			let d;
			const h = c.headers.get("content-type");
			if (c.status === 206) {
				const _ = c.headers.get("content-range");
				if (_) {
					const m = _.match(/bytes \d+-\d+\/(\d+)/);
					m && (d = parseInt(m[1], 10));
				}
			} else if (c.status === 200) try {
				await c.body?.cancel();
			} catch {}
			if (d === void 0) {
				const _ = c.headers.get("content-length");
				d = _ ? parseInt(_, 10) : void 0;
			}
			return {
				exists: !0,
				size: d,
				contentType: h || void 0,
				fromCache: !1
			};
		}
	} catch (c) {
		oe.warn(`Unable to fetch file metadata for "${a}": ${c}`);
	}
	return {
		exists: !1,
		fromCache: !1
	};
}
async function Ys(e) {
	return we.useFS && !fs(e, [
		"http:",
		"https:",
		"blob:"
	]) ? new Kn(e instanceof URL ? e.protocol === "file:" ? e.pathname : e.toString() : e) : we.fetch(e, { headers: q_(e) });
}
function q_(e) {
	const t = typeof process < "u" && process?.release?.name === "node", r = new Headers();
	if (t) {
		const s = !!{}.TESTING_REMOTELY, n = we.version;
		if (r.set("User-Agent", `transformers.js/${n}; is_ci/${s};`), fs(e, ["http:", "https:"], ["huggingface.co", "hf.co"])) {
			const a = {}.HF_TOKEN ?? {}.HF_ACCESS_TOKEN;
			a && r.set("Authorization", `Bearer ${a}`);
		}
	}
	return r;
}
function W_(e, t, r = {}, s = null) {
	const n = r.revision ?? "main", a = Fn(e, t), o = E1(e), i = o ? Fn(we.localModelPath, a) : a, l = Fn(we.remoteHost, we.remotePathTemplate.replaceAll("{model}", e).replaceAll("{revision}", encodeURIComponent(n)), t);
	return {
		requestURL: a,
		localPath: i,
		remoteURL: l,
		proposedCacheKey: s instanceof V_ ? n === "main" ? a : Fn(e, n, t) : l,
		validModelId: o
	};
}
async function H_(e, t, r) {
	if (e) return await P1(e, t, r);
}
async function O1(e, t, r, s, n, a, o = {}) {
	if (await r.match(s) === void 0) if (a) {
		if (typeof n != "string") {
			const i = new Headers(n.headers);
			i.set("content-length", a.byteLength.toString()), await r.put(s, new Response(a, { headers: i })).catch((l) => {
				oe.warn(`Unable to add response to browser cache: ${l}.`);
			});
		}
	} else {
		const i = o.progress_callback ? (l) => yr(o.progress_callback, {
			status: "progress",
			name: e,
			file: t,
			...l
		}) : void 0;
		await r.put(s, n, i);
	}
}
async function N1(e, t, r = !0, s = {}, n = !1, a = null) {
	const { requestURL: o, localPath: i, remoteURL: l, proposedCacheKey: c, validModelId: d } = W_(e, t, s, a);
	let h, _ = !1, m;
	m = await H_(a, i, c);
	const v = m !== void 0;
	if (v) h = c;
	else {
		if (we.allowLocalModels) if (fs(o, ["http:", "https:"])) {
			if (s.local_files_only) throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${o}.`);
			if (!we.allowRemoteModels) throw new Error(`\`env.allowRemoteModels=false\`, but attempted to load a remote file from: ${o}.`);
		} else try {
			m = await Ys(i), h = i;
		} catch (M) {
			oe.warn(`Unable to load from local path "${i}": "${M}"`);
		}
		if (m === void 0 || typeof m != "string" && m.status === 404) {
			if (s.local_files_only || !we.allowRemoteModels) {
				if (r) throw Error(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${i}".`);
				return null;
			}
			if (!d) throw Error(`Local file missing at "${i}" and download aborted due to invalid model ID "${e}".`);
			if (m = await Ys(l), m.status !== 200) return A1(m.status, l, r);
			h = c;
		}
		_ = a && typeof Response < "u" && m instanceof Response && m.status === 200;
	}
	yr(s.progress_callback, {
		status: "download",
		name: e,
		file: t
	});
	let w;
	if (!(ce.IS_NODE_ENV && n)) {
		let M;
		if (typeof m != "string") if (!s.progress_callback) M = new Uint8Array(await m.arrayBuffer());
		else if (v && typeof navigator < "u" && /firefox/i.test(navigator.userAgent)) M = new Uint8Array(await m.arrayBuffer()), yr(s.progress_callback, {
			status: "progress",
			name: e,
			file: t,
			progress: 100,
			loaded: M.length,
			total: M.length
		});
		else {
			let E;
			const A = m.headers.get("content-length");
			if (A) E = parseInt(A, 10);
			else try {
				const k = await sn(e, t, s);
				k.size && (E = k.size);
			} catch {}
			M = await C1(m, (k) => {
				yr(s.progress_callback, {
					status: "progress",
					name: e,
					file: t,
					...k
				});
			}, E);
		}
		w = M;
	}
	if (_ && h && typeof m != "string" && await O1(e, t, a, h, m, w, s), ce.IS_NODE_ENV && n && s.progress_callback && typeof m != "string") {
		const M = parseInt(m.headers.get("content-length"), 10) || 0;
		yr(s.progress_callback, {
			status: "progress",
			name: e,
			file: t,
			progress: 100,
			loaded: M,
			total: M
		});
	}
	if (yr(s.progress_callback, {
		status: "done",
		name: e,
		file: t
	}), w) {
		if (!ce.IS_NODE_ENV && n) throw new Error("Cannot return path in a browser environment.");
		return w;
	}
	if (m instanceof Kn) return m.filePath;
	const b = await a?.match(h);
	if (b instanceof Kn) return b.filePath;
	if (b instanceof Response) return new Uint8Array(await b.arrayBuffer());
	if (typeof b == "string") return b;
	throw new Error("Unable to get model file path or buffer.");
}
var Ln = /* @__PURE__ */ new Map();
async function Zn(e, t, r = !0, s = {}, n = !1) {
	if (!we.allowLocalModels) {
		if (s.local_files_only) throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).");
		if (!we.allowRemoteModels) throw Error("Invalid configuration detected: both local and remote models are disabled. Fix by setting `env.allowLocalModels` or `env.allowRemoteModels` to `true`.");
	}
	yr(s.progress_callback, {
		status: "initiate",
		name: e,
		file: t
	});
	const a = `${e}::${t}`;
	let o = Ln.get(a);
	return o || (o = N1(e, t, r, s, n, await Pi(s?.cache_dir)).then((i) => (Ln.delete(a), i), (i) => {
		throw Ln.delete(a), i;
	}), Ln.set(a, o)), await o;
}
async function Fi(e, t, r = !0, s = {}) {
	const n = await Zn(e, t, r, s, !1);
	return n === null ? null : new TextDecoder("utf-8").decode(n);
}
async function Yt(e, t, r = !0, s = {}) {
	const n = await Fi(e, t, r, s);
	return n === null ? {} : JSON.parse(n);
}
function D1(e, [t, r, s], [n, a], o = "bilinear", i = !1) {
	const l = a / s, c = n / r, d = new e.constructor(n * a * t), h = r * s, _ = n * a;
	for (let m = 0; m < n; ++m) for (let v = 0; v < a; ++v) {
		const w = m * a + v, b = (v + .5) / l - .5, M = (m + .5) / c - .5;
		let E = Math.floor(b), A = Math.floor(M);
		const k = Math.min(E + 1, s - 1), C = Math.min(A + 1, r - 1);
		E = Math.max(E, 0), A = Math.max(A, 0);
		const O = b - E, x = M - A, q = (1 - O) * (1 - x), R = O * (1 - x), G = (1 - O) * x, W = O * x, H = A * s, D = C * s, F = H + E, U = H + k, ae = D + E, Z = D + k;
		for (let I = 0; I < t; ++I) {
			const N = I * h;
			d[I * _ + w] = q * e[N + F] + R * e[N + U] + G * e[N + ae] + W * e[N + Z];
		}
	}
	return d;
}
function z1(e, t, r) {
	const s = new Array(r.length), n = new Array(r.length);
	for (let i = r.length - 1, l = 1; i >= 0; --i) n[i] = l, s[i] = t[r[i]], l *= s[i];
	const a = r.map((i, l) => n[r.indexOf(l)]), o = new e.constructor(e.length);
	for (let i = 0; i < e.length; ++i) {
		let l = 0;
		for (let c = t.length - 1, d = i; c >= 0; --c) l += d % t[c] * a[c], d = Math.floor(d / t[c]);
		o[l] = e[i];
	}
	return [o, s];
}
function rt(e) {
	const t = $e(e)[0], r = e.map((n) => Math.exp(n - t)), s = r.reduce((n, a) => n + a, 0);
	return r.map((n) => n / s);
}
function B1(e) {
	const t = $e(e)[0];
	let r = 0;
	for (let n = 0; n < e.length; ++n) r += Math.exp(e[n] - t);
	const s = Math.log(r);
	return e.map((n) => n - t - s);
}
function Xo(e) {
	if (e.length === 0) throw Error("Array must not be empty");
	let t = e[0], r = 0;
	for (let s = 1; s < e.length; ++s) e[s] < t && (t = e[s], r = s);
	return [t, r];
}
function $e(e) {
	if (e.length === 0) throw Error("Array must not be empty");
	let t = e[0], r = 0;
	for (let s = 1; s < e.length; ++s) e[s] > t && (t = e[s], r = s);
	return [t, r];
}
function Q_(e) {
	return e > 0 && (e & e - 1) === 0;
}
var X_ = class {
	constructor(e) {
		if (this.size = e | 0, this.size <= 1 || !Q_(this.size)) throw new Error("FFT size must be a power of two larger than 1");
		this._csize = e << 1, this.table = new Float64Array(this.size * 2);
		for (let r = 0; r < this.table.length; r += 2) {
			const s = Math.PI * r / this.size;
			this.table[r] = Math.cos(s), this.table[r + 1] = -Math.sin(s);
		}
		let t = 0;
		for (let r = 1; this.size > r; r <<= 1) ++t;
		this._width = t % 2 === 0 ? t - 1 : t, this._bitrev = new Int32Array(1 << this._width);
		for (let r = 0; r < this._bitrev.length; ++r) {
			this._bitrev[r] = 0;
			for (let s = 0; s < this._width; s += 2) {
				const n = this._width - s - 2;
				this._bitrev[r] |= (r >>> s & 3) << n;
			}
		}
	}
	createComplexArray() {
		return new Float64Array(this._csize);
	}
	fromComplexArray(e, t) {
		const r = t || new Array(e.length >>> 1);
		for (let s = 0; s < e.length; s += 2) r[s >>> 1] = e[s];
		return r;
	}
	toComplexArray(e, t) {
		const r = t || this.createComplexArray();
		for (let s = 0; s < r.length; s += 2) r[s] = e[s >>> 1], r[s + 1] = 0;
		return r;
	}
	transform(e, t) {
		if (e === t) throw new Error("Input and output buffers must be different");
		this._transform4(e, t, 1);
	}
	realTransform(e, t) {
		if (e === t) throw new Error("Input and output buffers must be different");
		this._realTransform4(e, t, 1);
	}
	inverseTransform(e, t) {
		if (e === t) throw new Error("Input and output buffers must be different");
		this._transform4(e, t, -1);
		for (let r = 0; r < e.length; ++r) e[r] /= this.size;
	}
	_transform4(e, t, r) {
		const s = this._csize;
		let n = 1 << this._width, a = s / n << 1, o, i;
		const l = this._bitrev;
		if (a === 4) for (o = 0, i = 0; o < s; o += a, ++i) {
			const d = l[i];
			this._singleTransform2(t, e, o, d, n);
		}
		else for (o = 0, i = 0; o < s; o += a, ++i) {
			const d = l[i];
			this._singleTransform4(t, e, o, d, n, r);
		}
		const c = this.table;
		for (n >>= 2; n >= 2; n >>= 2) {
			a = s / n << 1;
			const d = a >>> 2;
			for (o = 0; o < s; o += a) {
				const h = o + d - 1;
				for (let _ = o, m = 0; _ < h; _ += 2, m += n) {
					const v = _, w = v + d, b = w + d, M = b + d, E = e[v], A = e[v + 1], k = e[w], C = e[w + 1], O = e[b], x = e[b + 1], q = e[M], R = e[M + 1], G = c[m], W = r * c[m + 1], H = k * G - C * W, D = k * W + C * G, F = c[2 * m], U = r * c[2 * m + 1], ae = O * F - x * U, Z = O * U + x * F, I = c[3 * m], N = r * c[3 * m + 1], B = q * I - R * N, Q = q * N + R * I, ue = E + ae, de = A + Z, ve = E - ae, ut = A - Z, Fe = H + B, Qe = D + Q, ht = r * (H - B), be = r * (D - Q);
					e[v] = ue + Fe, e[v + 1] = de + Qe, e[w] = ve + be, e[w + 1] = ut - ht, e[b] = ue - Fe, e[b + 1] = de - Qe, e[M] = ve - be, e[M + 1] = ut + ht;
				}
			}
		}
	}
	_singleTransform2(e, t, r, s, n) {
		const a = e[s], o = e[s + 1], i = e[s + n], l = e[s + n + 1];
		t[r] = a + i, t[r + 1] = o + l, t[r + 2] = a - i, t[r + 3] = o - l;
	}
	_singleTransform4(e, t, r, s, n, a) {
		const o = n * 2, i = n * 3, l = e[s], c = e[s + 1], d = e[s + n], h = e[s + n + 1], _ = e[s + o], m = e[s + o + 1], v = e[s + i], w = e[s + i + 1], b = l + _, M = c + m, E = l - _, A = c - m, k = d + v, C = h + w, O = a * (d - v), x = a * (h - w);
		t[r] = b + k, t[r + 1] = M + C, t[r + 2] = E + x, t[r + 3] = A - O, t[r + 4] = b - k, t[r + 5] = M - C, t[r + 6] = E - x, t[r + 7] = A + O;
	}
	_realTransform4(e, t, r) {
		const s = this._csize;
		let n = 1 << this._width, a = s / n << 1, o, i;
		const l = this._bitrev;
		if (a === 4) for (o = 0, i = 0; o < s; o += a, ++i) {
			const h = l[i];
			this._singleRealTransform2(t, e, o, h >>> 1, n >>> 1);
		}
		else for (o = 0, i = 0; o < s; o += a, ++i) {
			const h = l[i];
			this._singleRealTransform4(t, e, o, h >>> 1, n >>> 1, r);
		}
		const c = this.table;
		for (n >>= 2; n >= 2; n >>= 2) {
			a = s / n << 1;
			const h = a >>> 1, _ = h >>> 1, m = _ >>> 1;
			for (o = 0; o < s; o += a) for (let v = 0, w = 0; v <= m; v += 2, w += n) {
				const b = o + v, M = b + _, E = M + _, A = E + _, k = e[b], C = e[b + 1], O = e[M], x = e[M + 1], q = e[E], R = e[E + 1], G = e[A], W = e[A + 1], H = k, D = C, F = c[w], U = r * c[w + 1], ae = O * F - x * U, Z = O * U + x * F, I = c[2 * w], N = r * c[2 * w + 1], B = q * I - R * N, Q = q * N + R * I, ue = c[3 * w], de = r * c[3 * w + 1], ve = G * ue - W * de, ut = G * de + W * ue, Fe = H + B, Qe = D + Q, ht = H - B, be = D - Q, Le = ae + ve, nt = Z + ut, Me = r * (ae - ve), xe = r * (Z - ut);
				if (e[b] = Fe + Le, e[b + 1] = Qe + nt, e[M] = ht + xe, e[M + 1] = be - Me, v === 0) {
					e[E] = Fe - Le, e[E + 1] = Qe - nt;
					continue;
				}
				if (v === m) continue;
				const Vr = o + _ - v, Ss = o + h - v;
				e[Vr] = ht - r * xe, e[Vr + 1] = -be - r * Me, e[Ss] = Fe - r * Le, e[Ss + 1] = -Qe + r * nt;
			}
		}
		const d = s >>> 1;
		for (let h = 2; h < d; h += 2) e[s - h] = e[h], e[s - h + 1] = -e[h + 1];
	}
	_singleRealTransform2(e, t, r, s, n) {
		const a = e[s], o = e[s + n];
		t[r] = a + o, t[r + 1] = 0, t[r + 2] = a - o, t[r + 3] = 0;
	}
	_singleRealTransform4(e, t, r, s, n, a) {
		const o = n * 2, i = n * 3, l = e[s], c = e[s + n], d = e[s + o], h = e[s + i], _ = l + d, m = l - d, v = c + h, w = a * (c - h);
		t[r] = _ + v, t[r + 1] = 0, t[r + 2] = m, t[r + 3] = -w, t[r + 4] = _ - v, t[r + 5] = 0, t[r + 6] = m, t[r + 7] = w;
	}
}, R1 = class {
	constructor(e) {
		const t = 2 * (e - 1), r = 2 * (2 * e - 1), s = 2 ** Math.ceil(Math.log2(r));
		this.bufferSize = s, this._a = t;
		const n = new Float64Array(r), a = new Float64Array(s);
		this._chirpBuffer = new Float64Array(s), this._buffer1 = new Float64Array(s), this._buffer2 = new Float64Array(s), this._outBuffer1 = new Float64Array(s), this._outBuffer2 = new Float64Array(s);
		const o = -2 * Math.PI / e, i = Math.cos(o), l = Math.sin(o);
		for (let c = 0; c < r >> 1; ++c) {
			const d = (c + 1 - e) ** 2 / 2, h = Math.sqrt(i ** 2 + l ** 2) ** d, _ = d * Math.atan2(l, i), m = 2 * c;
			n[m] = h * Math.cos(_), n[m + 1] = h * Math.sin(_), a[m] = n[m], a[m + 1] = -n[m + 1];
		}
		this._slicedChirpBuffer = n.subarray(t, r), this._f = new X_(s >> 1), this._f.transform(this._chirpBuffer, a);
	}
	_transform(e, t, r) {
		const s = this._buffer1, n = this._buffer2, a = this._outBuffer1, o = this._outBuffer2, i = this._chirpBuffer, l = this._slicedChirpBuffer, c = this._a;
		if (r) for (let d = 0; d < l.length; d += 2) {
			const h = d + 1, _ = t[d >> 1];
			s[d] = _ * l[d], s[h] = _ * l[h];
		}
		else for (let d = 0; d < l.length; d += 2) {
			const h = d + 1;
			s[d] = t[d] * l[d] - t[h] * l[h], s[h] = t[d] * l[h] + t[h] * l[d];
		}
		this._f.transform(a, s);
		for (let d = 0; d < i.length; d += 2) {
			const h = d + 1;
			n[d] = a[d] * i[d] - a[h] * i[h], n[h] = a[d] * i[h] + a[h] * i[d];
		}
		this._f.inverseTransform(o, n);
		for (let d = 0; d < o.length; d += 2) {
			const h = o[d + c], _ = o[d + c + 1], m = l[d], v = l[d + 1];
			e[d] = h * m - _ * v, e[d + 1] = h * v + _ * m;
		}
	}
	transform(e, t) {
		this._transform(e, t, !1);
	}
	realTransform(e, t) {
		this._transform(e, t, !0);
	}
}, G1 = class {
	constructor(e) {
		this.fft_length = e, this.isPowerOfTwo = Q_(e), this.isPowerOfTwo ? (this.fft = new X_(e), this.outputBufferSize = 2 * e) : (this.fft = new R1(e), this.outputBufferSize = this.fft.bufferSize);
	}
	realTransform(e, t) {
		this.fft.realTransform(e, t);
	}
	transform(e, t) {
		this.fft.transform(e, t);
	}
};
function $1(e, t) {
	if (t % 2 === 0 || t <= 0) throw new Error("Window size must be a positive odd number");
	const r = new e.constructor(e.length), s = new e.constructor(t), n = Math.floor(t / 2);
	for (let a = 0; a < e.length; ++a) {
		let o = 0;
		for (let i = -n; i <= n; ++i) {
			let l = a + i;
			l < 0 ? l = Math.abs(l) : l >= e.length && (l = 2 * (e.length - 1) - l), s[o++] = e[l];
		}
		s.sort(), r[a] = s[n];
	}
	return r;
}
function qs(e, t) {
	const r = Math.pow(10, t);
	return Math.round(e * r) / r;
}
function V1(e) {
	const t = Math.round(e);
	return Math.abs(e) % 1 === .5 ? t % 2 === 0 ? t : t - 1 : t;
}
function U1(e) {
	const t = e.length, r = e[0].length, s = [t + 1, r + 1], n = Array.from({ length: s[0] }, () => Array(s[1]).fill(Infinity));
	n[0][0] = 0;
	const a = Array.from({ length: s[0] }, () => Array(s[1]).fill(-1));
	for (let d = 1; d < s[1]; ++d) for (let h = 1; h < s[0]; ++h) {
		const _ = n[h - 1][d - 1], m = n[h - 1][d], v = n[h][d - 1];
		let w, b;
		_ < m && _ < v ? (w = _, b = 0) : m < _ && m < v ? (w = m, b = 1) : (w = v, b = 2), n[h][d] = e[h - 1][d - 1] + w, a[h][d] = b;
	}
	for (let d = 0; d < s[1]; ++d) a[0][d] = 2;
	for (let d = 0; d < s[0]; ++d) a[d][0] = 1;
	let o = t, i = r, l = [], c = [];
	for (; o > 0 || i > 0;) switch (l.push(o - 1), c.push(i - 1), a[o][i]) {
		case 0:
			--o, --i;
			break;
		case 1:
			--o;
			break;
		case 2:
			--i;
			break;
		default: throw new Error(`Internal error in dynamic time warping. Unexpected trace[${o}, ${i}]. Please file a bug report.`);
	}
	return l.reverse(), c.reverse(), [l, c];
}
var j1 = (function() {
	let e = null;
	return function(t) {
		if (!e) {
			e = /* @__PURE__ */ new Float32Array(65536);
			const a = /* @__PURE__ */ new ArrayBuffer(4), o = new Uint32Array(a), i = new Float32Array(a);
			for (let l = 0; l < e.length; ++l) {
				let c = 0;
				const d = (l & 32768) << 16, h = (l & 31744) >> 10;
				let _ = l & 1023;
				if (h === 31) c = d | 2139095040 | _ << 13;
				else if (h === 0) if (_ === 0) c = d;
				else {
					let m = 113;
					for (; (_ & 1024) === 0;) _ <<= 1, --m;
					_ &= -1025, c = d | m << 23 | _ << 13;
				}
				else c = d | h + 112 << 23 | _ << 13;
				o[0] = c, e[l] = i[0];
			}
		}
		const r = t.length, s = e, n = new Float32Array(r);
		for (let a = 0; a < r; ++a) n[a] = s[t[a]];
		return n;
	};
})(), Y_ = {};
ds(Y_, { default: () => q1 });
var q1 = {};
async function J_(e) {
	const t = e.split("/").pop();
	let r;
	try {
		if (r = await Pi(), r) {
			const n = await r.match(e);
			if (n) return n;
		}
	} catch (n) {
		oe.warn(`Failed to load ${t} from cache:`, n);
	}
	const s = await we.fetch(e);
	if (!s.ok) throw new Error(`Failed to fetch ${t}: ${s.status} ${s.statusText}`);
	if (r) try {
		await r.put(e, s.clone());
	} catch (n) {
		oe.warn(`Failed to cache ${t}:`, n);
	}
	return s;
}
async function W1(e) {
	const t = await J_(e);
	if (!t || typeof t == "string") return null;
	try {
		return await t.arrayBuffer();
	} catch (r) {
		return oe.warn("Failed to read WASM binary:", r), null;
	}
}
async function H1(e) {
	if (ce.IS_SERVICE_WORKER_ENV || ce.IS_CHROME_AVAILABLE) return e;
	const t = await J_(e);
	if (!t || typeof t == "string") return null;
	try {
		let r = await t.text();
		r = r.replaceAll("globalThis.process?.versions?.node", "false");
		const s = new Blob([r], { type: "text/javascript" });
		return URL.createObjectURL(s);
	} catch (r) {
		return oe.warn("Failed to read WASM factory:", r), null;
	}
}
var Q1 = Object.freeze({
	auto: null,
	gpu: null,
	cpu: "cpu",
	wasm: "wasm",
	webgpu: "webgpu",
	cuda: "cuda",
	dml: "dml",
	coreml: "coreml",
	webnn: {
		name: "webnn",
		deviceType: "cpu"
	},
	"webnn-npu": {
		name: "webnn",
		deviceType: "npu"
	},
	"webnn-gpu": {
		name: "webnn",
		deviceType: "gpu"
	},
	"webnn-cpu": {
		name: "webnn",
		deviceType: "cpu"
	}
});
function K_(e) {
	return e <= Pt.DEBUG ? 0 : e <= Pt.INFO ? 2 : e <= Pt.WARNING || e <= Pt.ERROR ? 3 : 4;
}
var X1 = {
	0: "verbose",
	1: "info",
	2: "warning",
	3: "error",
	4: "fatal"
}, kt = [], Yo, is, af = Symbol.for("onnxruntime");
if (af in globalThis) is = globalThis[af];
else if (ce.IS_NODE_ENV) {
	switch (is = Y_, process.platform) {
		case "win32":
			kt.push("dml");
			break;
		case "linux":
			process.arch === "x64" && kt.push("cuda");
			break;
		case "darwin":
			kt.push("coreml");
			break;
	}
	kt.push("webgpu"), kt.push("cpu"), Yo = ["cpu"];
} else is = l0, ce.IS_WEBNN_AVAILABLE && kt.push("webnn-npu", "webnn-gpu", "webnn-cpu", "webnn"), ce.IS_WEBGPU_AVAILABLE && kt.push("webgpu"), kt.push("wasm"), Yo = ["wasm"];
var Y1 = is.InferenceSession;
function J1(e = null) {
	if (!e) return Yo;
	switch (e) {
		case "auto": return kt;
		case "gpu": return kt.filter((t) => [
			"webgpu",
			"cuda",
			"dml",
			"webnn-gpu"
		].includes(t));
	}
	if (kt.includes(e)) return [Q1[e] ?? e];
	throw new Error(`Unsupported device: "${e}". Should be one of: ${kt.join(", ")}.`);
}
var of = Promise.resolve(), Jr = null;
async function K1() {
	if (Jr) return Jr;
	if (!(we.useWasmCache && typeof je?.wasm?.wasmPaths == "object" && je?.wasm?.wasmPaths?.wasm && je?.wasm?.wasmPaths?.mjs)) {
		if (ce.IS_DENO_WEB_RUNTIME) throw new Error("env.useWasmCache=false is not supported in Deno's web runtime. Remove the useWasmCache override.");
		return Jr = Promise.resolve(), Jr;
	}
	return Jr = (async () => {
		const e = je.wasm.wasmPaths;
		let t = !1;
		await Promise.all([e.wasm && !tf(e.wasm) ? (async () => {
			try {
				const r = await W1(rf(e.wasm));
				r && (je.wasm.wasmBinary = r, t = !0);
			} catch (r) {
				oe.warn("Failed to pre-load WASM binary:", r);
			}
		})() : Promise.resolve(), e.mjs && !tf(e.mjs) ? (async () => {
			try {
				const r = await H1(rf(e.mjs));
				r && (je.wasm.wasmPaths.mjs = r);
			} catch (r) {
				oe.warn("Failed to pre-load WASM factory:", r);
			}
		})() : Promise.resolve()]), t || (je.wasm.wasmPaths.mjs = e.mjs);
	})(), Jr;
}
async function Z_(e, t, r) {
	await K1();
	const s = K_(we.logLevel ?? Pt.WARNING), n = () => Y1.create(e, {
		logSeverityLevel: s,
		...t
	}), a = await (ce.IS_WEB_ENV ? of = of.then(n) : n());
	return a.config = r, a;
}
var lf = Promise.resolve();
async function ep(e, t) {
	const r = () => e.run(t);
	return ce.IS_WEB_ENV ? lf = lf.then(r) : r();
}
function tp(e) {
	return e instanceof is.Tensor;
}
var je = is?.env;
function Li() {
	return je?.wasm?.proxy;
}
if (je) {
	let e = function(t) {
		je.logLevel = X1[K_(t)];
	};
	if (je.wasm) {
		if (!(typeof ServiceWorkerGlobalScope < "u" && self instanceof ServiceWorkerGlobalScope) && je.versions?.web && !je.wasm.wasmPaths) {
			const t = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${je.versions.web}/dist/`;
			je.wasm.wasmPaths = ce.IS_SAFARI ? {
				mjs: `${t}ort-wasm-simd-threaded.mjs`,
				wasm: `${t}ort-wasm-simd-threaded.wasm`
			} : {
				mjs: `${t}ort-wasm-simd-threaded.asyncify.mjs`,
				wasm: `${t}ort-wasm-simd-threaded.asyncify.wasm`
			};
		}
		je.wasm.proxy = !1;
	}
	je.webgpu && (je.webgpu.powerPreference = "high-performance"), e(we.logLevel ?? Pt.WARNING), we.backends.onnx = {
		...je,
		setLogLevel: e
	};
}
var wr = async (e, t, r) => {
	const s = await Z_(new Uint8Array(e), t);
	return (async (n) => {
		const a = Li(), o = Object.fromEntries(Object.entries(n).map(([l, c]) => [l, (a ? c.clone() : c).ort_tensor])), i = await ep(s, o);
		return Array.isArray(r) ? r.map((l) => new V(i[l])) : new V(i[r]);
	});
}, ls = class {
	static session_options = {};
	static get nearest_interpolate_4d() {
		return this._nearest_interpolate_4d || (this._nearest_interpolate_4d = wr([
			8,
			10,
			18,
			0,
			58,
			129,
			1,
			10,
			41,
			10,
			1,
			120,
			10,
			0,
			10,
			0,
			10,
			1,
			115,
			18,
			1,
			121,
			34,
			6,
			82,
			101,
			115,
			105,
			122,
			101,
			42,
			18,
			10,
			4,
			109,
			111,
			100,
			101,
			34,
			7,
			110,
			101,
			97,
			114,
			101,
			115,
			116,
			160,
			1,
			3,
			18,
			1,
			114,
			90,
			31,
			10,
			1,
			120,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			90,
			15,
			10,
			1,
			115,
			18,
			10,
			10,
			8,
			8,
			7,
			18,
			4,
			10,
			2,
			8,
			4,
			98,
			31,
			10,
			1,
			121,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			66,
			2,
			16,
			21
		], this.session_options, "y")), this._nearest_interpolate_4d;
	}
	static get bilinear_interpolate_4d() {
		return this._bilinear_interpolate_4d || (this._bilinear_interpolate_4d = wr([
			8,
			9,
			18,
			0,
			58,
			128,
			1,
			10,
			40,
			10,
			1,
			120,
			10,
			0,
			10,
			0,
			10,
			1,
			115,
			18,
			1,
			121,
			34,
			6,
			82,
			101,
			115,
			105,
			122,
			101,
			42,
			17,
			10,
			4,
			109,
			111,
			100,
			101,
			34,
			6,
			108,
			105,
			110,
			101,
			97,
			114,
			160,
			1,
			3,
			18,
			1,
			114,
			90,
			31,
			10,
			1,
			120,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			90,
			15,
			10,
			1,
			115,
			18,
			10,
			10,
			8,
			8,
			7,
			18,
			4,
			10,
			2,
			8,
			4,
			98,
			31,
			10,
			1,
			121,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			66,
			2,
			16,
			20
		], this.session_options, "y")), this._bilinear_interpolate_4d;
	}
	static get bicubic_interpolate_4d() {
		return this._bicubic_interpolate_4d || (this._bicubic_interpolate_4d = wr([
			8,
			9,
			18,
			0,
			58,
			127,
			10,
			39,
			10,
			1,
			120,
			10,
			0,
			10,
			0,
			10,
			1,
			115,
			18,
			1,
			121,
			34,
			6,
			82,
			101,
			115,
			105,
			122,
			101,
			42,
			16,
			10,
			4,
			109,
			111,
			100,
			101,
			34,
			5,
			99,
			117,
			98,
			105,
			99,
			160,
			1,
			3,
			18,
			1,
			114,
			90,
			31,
			10,
			1,
			120,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			90,
			15,
			10,
			1,
			115,
			18,
			10,
			10,
			8,
			8,
			7,
			18,
			4,
			10,
			2,
			8,
			4,
			98,
			31,
			10,
			1,
			121,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			99,
			10,
			3,
			18,
			1,
			104,
			10,
			3,
			18,
			1,
			119,
			66,
			2,
			16,
			20
		], this.session_options, "y")), this._bicubic_interpolate_4d;
	}
	static get matmul() {
		return this._matmul || (this._matmul = wr([
			8,
			9,
			18,
			0,
			58,
			55,
			10,
			17,
			10,
			1,
			97,
			10,
			1,
			98,
			18,
			1,
			99,
			34,
			6,
			77,
			97,
			116,
			77,
			117,
			108,
			18,
			1,
			114,
			90,
			9,
			10,
			1,
			97,
			18,
			4,
			10,
			2,
			8,
			1,
			90,
			9,
			10,
			1,
			98,
			18,
			4,
			10,
			2,
			8,
			1,
			98,
			9,
			10,
			1,
			99,
			18,
			4,
			10,
			2,
			8,
			1,
			66,
			2,
			16,
			20
		], this.session_options, "c")), this._matmul;
	}
	static get stft() {
		return this._stft || (this._stft = wr([
			8,
			7,
			18,
			0,
			58,
			148,
			1,
			10,
			38,
			10,
			1,
			115,
			10,
			1,
			106,
			10,
			1,
			119,
			10,
			1,
			108,
			18,
			1,
			111,
			34,
			4,
			83,
			84,
			70,
			84,
			42,
			15,
			10,
			8,
			111,
			110,
			101,
			115,
			105,
			100,
			101,
			100,
			24,
			1,
			160,
			1,
			2,
			18,
			1,
			115,
			90,
			26,
			10,
			1,
			115,
			18,
			21,
			10,
			19,
			8,
			1,
			18,
			15,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			115,
			10,
			3,
			18,
			1,
			99,
			90,
			11,
			10,
			1,
			106,
			18,
			6,
			10,
			4,
			8,
			7,
			18,
			0,
			90,
			16,
			10,
			1,
			119,
			18,
			11,
			10,
			9,
			8,
			1,
			18,
			5,
			10,
			3,
			18,
			1,
			119,
			90,
			11,
			10,
			1,
			108,
			18,
			6,
			10,
			4,
			8,
			7,
			18,
			0,
			98,
			31,
			10,
			1,
			111,
			18,
			26,
			10,
			24,
			8,
			1,
			18,
			20,
			10,
			3,
			18,
			1,
			98,
			10,
			3,
			18,
			1,
			102,
			10,
			3,
			18,
			1,
			100,
			10,
			3,
			18,
			1,
			99,
			66,
			2,
			16,
			17
		], this.session_options, "o")), this._stft;
	}
	static get rfft() {
		return this._rfft || (this._rfft = wr([
			8,
			9,
			18,
			0,
			58,
			97,
			10,
			33,
			10,
			1,
			120,
			10,
			0,
			10,
			1,
			97,
			18,
			1,
			121,
			34,
			3,
			68,
			70,
			84,
			42,
			15,
			10,
			8,
			111,
			110,
			101,
			115,
			105,
			100,
			101,
			100,
			24,
			1,
			160,
			1,
			2,
			18,
			1,
			100,
			90,
			21,
			10,
			1,
			120,
			18,
			16,
			10,
			14,
			8,
			1,
			18,
			10,
			10,
			3,
			18,
			1,
			115,
			10,
			3,
			18,
			1,
			99,
			90,
			11,
			10,
			1,
			97,
			18,
			6,
			10,
			4,
			8,
			7,
			18,
			0,
			98,
			21,
			10,
			1,
			121,
			18,
			16,
			10,
			14,
			8,
			1,
			18,
			10,
			10,
			3,
			18,
			1,
			115,
			10,
			3,
			18,
			1,
			99,
			66,
			2,
			16,
			20
		], this.session_options, "y")), this._rfft;
	}
	static get top_k() {
		return this._top_k || (this._top_k = wr([
			8,
			10,
			18,
			0,
			58,
			73,
			10,
			18,
			10,
			1,
			120,
			10,
			1,
			107,
			18,
			1,
			118,
			18,
			1,
			105,
			34,
			4,
			84,
			111,
			112,
			75,
			18,
			1,
			116,
			90,
			9,
			10,
			1,
			120,
			18,
			4,
			10,
			2,
			8,
			1,
			90,
			15,
			10,
			1,
			107,
			18,
			10,
			10,
			8,
			8,
			7,
			18,
			4,
			10,
			2,
			8,
			1,
			98,
			9,
			10,
			1,
			118,
			18,
			4,
			10,
			2,
			8,
			1,
			98,
			9,
			10,
			1,
			105,
			18,
			4,
			10,
			2,
			8,
			7,
			66,
			2,
			16,
			21
		], this.session_options, ["v", "i"])), this._top_k;
	}
	static get slice() {
		return this._slice || (this._slice = wr([
			8,
			7,
			18,
			0,
			58,
			96,
			10,
			25,
			10,
			1,
			120,
			10,
			1,
			115,
			10,
			1,
			101,
			10,
			1,
			97,
			10,
			1,
			116,
			18,
			1,
			121,
			34,
			5,
			83,
			108,
			105,
			99,
			101,
			18,
			1,
			114,
			90,
			9,
			10,
			1,
			120,
			18,
			4,
			10,
			2,
			8,
			1,
			90,
			9,
			10,
			1,
			115,
			18,
			4,
			10,
			2,
			8,
			7,
			90,
			9,
			10,
			1,
			101,
			18,
			4,
			10,
			2,
			8,
			7,
			90,
			9,
			10,
			1,
			97,
			18,
			4,
			10,
			2,
			8,
			7,
			90,
			9,
			10,
			1,
			116,
			18,
			4,
			10,
			2,
			8,
			7,
			98,
			9,
			10,
			1,
			121,
			18,
			4,
			10,
			2,
			8,
			1,
			66,
			2,
			16,
			13
		], this.session_options, "y")), this._slice;
	}
}, Z1 = Object.freeze({
	auto: "auto",
	gpu: "gpu",
	cpu: "cpu",
	wasm: "wasm",
	webgpu: "webgpu",
	cuda: "cuda",
	dml: "dml",
	coreml: "coreml",
	webnn: "webnn",
	"webnn-npu": "webnn-npu",
	"webnn-gpu": "webnn-gpu",
	"webnn-cpu": "webnn-cpu"
}), Io = ce.IS_NODE_ENV ? "cpu" : "wasm";
function rp(e, t, { warn: r } = {}) {
	return e ? typeof e == "string" ? e : e.hasOwnProperty(t) ? e[t] : (r && r(`device not specified for "${t}". Using the default device (${Io}).`), Io) : Io;
}
var ek = (function() {
	let e;
	return async function() {
		if (e === void 0) if (!ce.IS_WEBGPU_AVAILABLE) e = !1;
		else try {
			e = (await navigator.gpu.requestAdapter()).features.has("shader-f16");
		} catch {
			e = !1;
		}
		return e;
	};
})(), Ve = Object.freeze({
	auto: "auto",
	fp32: "fp32",
	fp16: "fp16",
	q8: "q8",
	int8: "int8",
	uint8: "uint8",
	q4: "q4",
	bnb4: "bnb4",
	q4f16: "q4f16",
	q2: "q2",
	q2f16: "q2f16",
	q1: "q1",
	q1f16: "q1f16"
}), cf = Ve.fp32, uf = Object.freeze({ [Z1.wasm]: Ve.q8 }), ea = Object.freeze({
	[Ve.fp32]: "",
	[Ve.fp16]: "_fp16",
	[Ve.int8]: "_int8",
	[Ve.uint8]: "_uint8",
	[Ve.q8]: "_quantized",
	[Ve.q4]: "_q4",
	[Ve.q2]: "_q2",
	[Ve.q1]: "_q1",
	[Ve.q4f16]: "_q4f16",
	[Ve.q2f16]: "_q2f16",
	[Ve.q1f16]: "_q1f16",
	[Ve.bnb4]: "_bnb4"
});
function sp(e, t, r, { configDtype: s = null, warn: n } = {}) {
	let a, o = !1;
	e && typeof e != "string" ? e.hasOwnProperty(t) ? a = e[t] : (a = null, o = !0) : a = e;
	let i;
	if (a === Ve.auto) {
		if (s) {
			const l = typeof s == "string" ? s : s?.[t];
			if (l && l !== Ve.auto && Ve.hasOwnProperty(l)) return l;
		}
		i = uf[r] ?? cf;
	} else a && Ve.hasOwnProperty(a) ? i = a : i = uf[r] ?? cf;
	return o && n && n(`dtype not specified for "${t}". Using the default dtype (${i}) for this device (${r}).`), i;
}
var Js = Object.freeze({
	float32: Float32Array,
	float16: typeof Float16Array < "u" ? Float16Array : Uint16Array,
	float64: Float64Array,
	string: Array,
	int8: Int8Array,
	uint8: Uint8Array,
	int16: Int16Array,
	uint16: Uint16Array,
	int32: Int32Array,
	uint32: Uint32Array,
	int64: BigInt64Array,
	uint64: BigUint64Array,
	bool: Uint8Array,
	uint4: Uint8Array,
	int4: Int8Array
}), V = class Be {
	get dims() {
		return this.ort_tensor.dims;
	}
	set dims(t) {
		this.ort_tensor.dims = t;
	}
	get type() {
		return this.ort_tensor.type;
	}
	get data() {
		return this.ort_tensor.data;
	}
	get size() {
		return this.ort_tensor.size;
	}
	get location() {
		return this.ort_tensor.location;
	}
	ort_tensor;
	constructor(...t) {
		return tp(t[0]) ? this.ort_tensor = t[0] : this.ort_tensor = new Y0(t[0], t[1], t[2]), new Proxy(this, {
			get: (r, s) => {
				if (typeof s == "string") {
					let n = Number(s);
					if (Number.isInteger(n)) return r._getitem(n);
				}
				return r[s];
			},
			set: (r, s, n) => r[s] = n
		});
	}
	dispose() {
		this.ort_tensor.dispose();
	}
	*[Symbol.iterator]() {
		const [t, ...r] = this.dims;
		if (r.length > 0) {
			const s = r.reduce((n, a) => n * a);
			for (let n = 0; n < t; ++n) yield this._subarray(n, s, r);
		} else yield* this.data;
	}
	_getitem(t) {
		const [r, ...s] = this.dims;
		if (t = Wt(t, r), s.length > 0) {
			const n = s.reduce((a, o) => a * o);
			return this._subarray(t, n, s);
		} else return new Be(this.type, [this.data[t]], s);
	}
	indexOf(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) if (r[s] == t) return s;
		return -1;
	}
	_subarray(t, r, s) {
		const n = t * r, a = (t + 1) * r, o = "subarray" in this.data ? this.data.subarray(n, a) : this.data.slice(n, a);
		return new Be(this.type, o, s);
	}
	item() {
		const t = this.data;
		if (t.length !== 1) throw new Error(`a Tensor with ${t.length} elements cannot be converted to Scalar`);
		return t[0];
	}
	tolist() {
		return tk(this.data, this.dims);
	}
	sigmoid() {
		return this.clone().sigmoid_();
	}
	sigmoid_() {
		const t = this.data;
		for (let r = 0; r < t.length; ++r) t[r] = 1 / (1 + Math.exp(-t[r]));
		return this;
	}
	map(t) {
		return this.clone().map_(t);
	}
	map_(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) r[s] = t(r[s], s, r);
		return this;
	}
	mul(t) {
		return this.clone().mul_(t);
	}
	mul_(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) r[s] *= t;
		return this;
	}
	div(t) {
		return this.clone().div_(t);
	}
	div_(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) r[s] /= t;
		return this;
	}
	add(t) {
		return this.clone().add_(t);
	}
	add_(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) r[s] += t;
		return this;
	}
	sub(t) {
		return this.clone().sub_(t);
	}
	sub_(t) {
		const r = this.data;
		for (let s = 0; s < r.length; ++s) r[s] -= t;
		return this;
	}
	clone() {
		return new Be(this.type, this.data.slice(), this.dims.slice());
	}
	slice(...t) {
		const r = [], s = [];
		for (let d = 0; d < this.dims.length; ++d) {
			let h = t[d];
			if (h == null) s.push([0, this.dims[d]]), r.push(this.dims[d]);
			else if (typeof h == "number") h = Wt(h, this.dims[d], d), s.push([h, h + 1]);
			else if (Array.isArray(h) && h.length === 2) {
				let [_, m] = h;
				if (_ = _ === null ? 0 : Wt(_, this.dims[d], d, !1), m = m === null ? this.dims[d] : Wt(m, this.dims[d], d, !1), _ > m) throw new Error(`Invalid slice: ${h}`);
				const v = [Math.max(_, 0), Math.min(m, this.dims[d])];
				s.push(v), r.push(v[1] - v[0]);
			} else throw new Error(`Invalid slice: ${h}`);
		}
		const n = s.map(([d, h]) => h - d), a = n.reduce((d, h) => d * h), o = this.data, i = new o.constructor(a), l = this.stride();
		let c = !0;
		for (let d = 1; d < n.length; ++d) if (s[d][0] !== 0 || s[d][1] !== this.dims[d]) {
			c = !1;
			break;
		}
		if (c) {
			const d = s[0][0] * l[0], h = s[0][1] * l[0];
			if (ArrayBuffer.isView(o)) i.set(o.subarray(d, h));
			else if (Array.isArray(o)) {
				const _ = o.slice(d, h);
				for (let m = 0; m < _.length; ++m) i[m] = _[m];
			} else throw new Error("Unsupported data type for slicing");
		} else for (let d = 0; d < a; ++d) {
			let h = 0;
			for (let _ = n.length - 1, m = d; _ >= 0; --_) {
				const v = n[_];
				h += (m % v + s[_][0]) * l[_], m = Math.floor(m / v);
			}
			i[d] = o[h];
		}
		return new Be(this.type, i, r);
	}
	permute(...t) {
		return rk(this, t);
	}
	transpose(...t) {
		return this.permute(...t);
	}
	sum(t = null, r = !1) {
		return this.norm(1, t, r);
	}
	norm(t = "fro", r = null, s = !1) {
		if (t === "fro") t = 2;
		else if (typeof t == "string") throw Error(`Unsupported norm: ${t}`);
		const n = this.data, a = n instanceof BigInt64Array || n instanceof BigUint64Array;
		if (a && t !== 1) throw Error(`Expected a floating point tensor as input. Got ${this.type}`);
		let o, i;
		if (a ? (o = (h, _) => h + _, i = 0n) : (o = (h, _) => h + _ ** t, i = 0), r === null) {
			let h = n.reduce(o, i);
			return t !== 1 && (h = h ** (1 / t)), new Be(this.type, [h], []);
		}
		const [l, c, d] = Hs(o, this, r, s);
		if (t !== 1) for (let h = 0; h < c.length; ++h) c[h] = c[h] ** (1 / t);
		return new Be(l, c, d);
	}
	normalize_(t = 2, r = 1) {
		r = Wt(r, this.dims.length);
		const s = this.norm(t, r, !0), n = this.data, a = s.data;
		for (let o = 0; o < n.length; ++o) {
			let i = 0;
			for (let l = this.dims.length - 1, c = o, d = 1; l >= 0; --l) {
				const h = this.dims[l];
				if (l !== r) {
					const _ = c % h;
					i += _ * d, d *= this.dims[l];
				}
				c = Math.floor(c / h);
			}
			n[o] /= a[i];
		}
		return this;
	}
	normalize(t = 2, r = 1) {
		return this.clone().normalize_(t, r);
	}
	stride() {
		return Oo(this.dims);
	}
	squeeze(t = null) {
		return new Be(this.type, this.data, df(this.dims, t));
	}
	squeeze_(t = null) {
		return this.dims = df(this.dims, t), this;
	}
	unsqueeze(t) {
		return new Be(this.type, this.data, hf(this.dims, t));
	}
	unsqueeze_(t) {
		return this.dims = hf(this.dims, t), this;
	}
	flatten_(t = 0, r = -1) {
		r = (r + this.dims.length) % this.dims.length;
		let s = this.dims.slice(0, t), n = this.dims.slice(t, r + 1), a = this.dims.slice(r + 1);
		return this.dims = [
			...s,
			n.reduce((o, i) => o * i, 1),
			...a
		], this;
	}
	flatten(t = 0, r = -1) {
		return this.clone().flatten_(t, r);
	}
	view(...t) {
		let r = -1;
		for (let n = 0; n < t.length; ++n) if (t[n] === -1) {
			if (r !== -1) throw new Error("Only one dimension can be inferred");
			r = n;
		}
		const s = this.data;
		if (r !== -1) {
			const n = t.reduce((a, o, i) => i !== r ? a * o : a, 1);
			t[r] = s.length / n;
		}
		return new Be(this.type, s, t);
	}
	neg_() {
		const t = this.data;
		for (let r = 0; r < t.length; ++r) t[r] = -t[r];
		return this;
	}
	neg() {
		return this.clone().neg_();
	}
	gt(t) {
		const r = new Uint8Array(this.data.length), s = this.data;
		for (let n = 0; n < s.length; ++n) r[n] = s[n] > t ? 1 : 0;
		return new Be("bool", r, this.dims);
	}
	lt(t) {
		const r = new Uint8Array(this.data.length), s = this.data;
		for (let n = 0; n < s.length; ++n) r[n] = s[n] < t ? 1 : 0;
		return new Be("bool", r, this.dims);
	}
	clamp_(t, r) {
		const s = this.data;
		for (let n = 0; n < s.length; ++n) s[n] = Math.min(Math.max(s[n], t), r);
		return this;
	}
	clamp(t, r) {
		return this.clone().clamp_(t, r);
	}
	round_() {
		const t = this.data;
		for (let r = 0; r < t.length; ++r) t[r] = Math.round(t[r]);
		return this;
	}
	round() {
		return this.clone().round_();
	}
	mean(t = null, r = !1) {
		return Ii(this, t, r);
	}
	min(t = null, r = !1) {
		if (t === null) {
			const o = Xo(this.data)[0];
			return new Be(this.type, [o], []);
		}
		const [s, n, a] = Hs((o, i) => Math.min(o, i), this, t, r, Infinity);
		return new Be(s, n, a);
	}
	max(t = null, r = !1) {
		if (t === null) {
			const o = $e(this.data)[0];
			return new Be(this.type, [o], []);
		}
		const [s, n, a] = Hs((o, i) => Math.max(o, i), this, t, r, -Infinity);
		return new Be(s, n, a);
	}
	argmin(t = null, r = !1) {
		if (t !== null) throw new Error("`dim !== null` not yet implemented.");
		const s = Xo(this.data)[1];
		return new Be("int64", [BigInt(s)], []);
	}
	argmax(t = null, r = !1) {
		if (t !== null) throw new Error("`dim !== null` not yet implemented.");
		const s = $e(this.data)[1];
		return new Be("int64", [BigInt(s)], []);
	}
	repeat(...t) {
		if (t.length < this.dims.length) throw new Error(`Number of dimensions of repeat dims (${t.length}) cannot be smaller than number of dimensions of tensor (${this.dims.length})`);
		if (t.every((d) => d === 1)) {
			if (t.length === this.dims.length) return this.clone();
			const d = t.length - this.dims.length, h = Array(d).fill(1).concat(this.dims);
			return new Be(this.type, this.data.slice(), h);
		}
		const r = t.length - this.dims.length, s = Array(r).fill(1).concat(this.dims), n = s.map((d, h) => d * t[h]), a = n.reduce((d, h) => d * h, 1), o = this.data, i = new o.constructor(a), l = Oo(s), c = Oo(n);
		for (let d = 0; d < a; ++d) {
			let h = d, _ = 0;
			for (let m = 0; m < n.length; ++m) {
				const v = Math.floor(h / c[m]);
				h = h % c[m];
				const w = v % s[m];
				_ += w * l[m];
			}
			i[d] = o[_];
		}
		return new Be(this.type, i, n);
	}
	tile(...t) {
		if (t.length < this.dims.length) {
			const r = this.dims.length - t.length;
			t = Array(r).fill(1).concat(t);
		}
		return this.repeat(...t);
	}
	to(t) {
		if (this.type === t) return this;
		if (!Js.hasOwnProperty(t)) throw new Error(`Unsupported type: ${t}`);
		let r;
		const s = ["int64", "uint64"].includes(this.type), n = ["int64", "uint64"].includes(t);
		if (s && !n) r = Number;
		else if (!s && n) [
			"float16",
			"float32",
			"float64"
		].includes(this.type) ? r = (a) => BigInt(Math.floor(a)) : r = BigInt;
		else if (this.type === "float16" && t == "float32" && this.data instanceof Uint16Array) return new Be(t, j1(this.data), this.dims);
		return new Be(t, Js[t].from(this.data, r), this.dims);
	}
};
function tk(e, t) {
	const r = e.length;
	if (r !== t.reduce((n, a) => n * a)) throw Error(`cannot reshape array of size ${r} into shape (${t})`);
	let s = e;
	for (let n = t.length - 1; n >= 0; n--) s = s.reduce((a, o) => {
		let i = a[a.length - 1];
		return i.length < t[n] ? i.push(o) : a.push([o]), a;
	}, [[]]);
	return s[0];
}
function rk(e, t) {
	const [r, s] = z1(e.data, e.dims, t);
	return new V(e.type, r, s);
}
function np(e, [t, r], s = "bilinear", n = !1) {
	const a = e.dims.at(-3) ?? 1, o = e.dims.at(-2), i = e.dims.at(-1), l = D1(e.data, [
		a,
		o,
		i
	], [t, r], s, n);
	return new V(e.type, l, [
		a,
		t,
		r
	]);
}
async function Ot(e, { size: t = null, mode: r = "bilinear" } = {}) {
	if (e.dims.length !== 4) throw new Error("`interpolate_4d` currently only supports 4D input.");
	if (!t) throw new Error("`interpolate_4d` requires a `size` argument.");
	let s;
	if (t.length === 2) s = [...e.dims.slice(0, 2), ...t];
	else if (t.length === 3) s = [e.dims[0], ...t];
	else if (t.length === 4) s = t;
	else throw new Error("`size` must be of length 2, 3, or 4.");
	let n;
	if (r === "nearest") n = await ls.nearest_interpolate_4d;
	else if (r === "bilinear") n = await ls.bilinear_interpolate_4d;
	else if (r === "bicubic") n = await ls.bicubic_interpolate_4d;
	else throw new Error(`Unsupported mode: ${r}`);
	const a = new V("int64", new BigInt64Array(s.map(BigInt)), [s.length]);
	return await n({
		x: e,
		s: a
	});
}
async function sk(e, t) {
	return await (await ls.matmul)({
		a: e,
		b: t
	});
}
async function _s(e, t) {
	const r = await ls.top_k;
	return t == null ? t = e.dims.at(-1) : t = Math.min(t, e.dims.at(-1)), await r({
		x: e,
		k: new V("int64", [BigInt(t)], [1])
	});
}
var In = (e) => new V("int64", e, [e.length]);
async function ap(e, t, r, s, n) {
	return await (await ls.slice)({
		x: e,
		s: In(t),
		e: In(r),
		a: In(s),
		t: In(n ?? new Array(s.length).fill(1))
	});
}
function nk(e, t) {
	const r = e.data, s = t.data, n = [e.dims[0], e.dims[2]], a = new r.constructor(n[0] * n[1]), [o, i, l] = e.dims;
	let c = 0;
	for (let d = 0; d < o; ++d) {
		const h = d * l * i;
		for (let _ = 0; _ < l; ++_) {
			let m = 0, v = 0;
			const w = d * i, b = h + _;
			for (let E = 0; E < i; ++E) {
				const A = Number(s[w + E]);
				v += A, m += r[b + E * l] * A;
			}
			const M = m / v;
			a[c++] = M;
		}
	}
	return new V(e.type, a, n);
}
function df(e, t) {
	return e = e.slice(), t === null ? e = e.filter((r) => r !== 1) : typeof t == "number" ? e[t] === 1 && e.splice(t, 1) : Array.isArray(t) && (e = e.filter((r, s) => r !== 1 || !t.includes(s))), e;
}
function hf(e, t) {
	return t = Wt(t, e.length + 1), e = e.slice(), e.splice(t, 0, 1), e;
}
function Wt(e, t, r = null, s = !0) {
	if (e < -t || e >= t) {
		if (s) throw new Error(`IndexError: index ${e} is out of bounds for dimension${r === null ? "" : " " + r} with size ${t}`);
		return e < -t ? 0 : t;
	}
	return e < 0 && (e = (e % t + t) % t), e;
}
function Ne(e, t = 0) {
	t = Wt(t, e[0].dims.length);
	const r = e[0].dims.slice();
	r[t] = e.reduce((o, i) => o + i.dims[t], 0);
	const s = r.reduce((o, i) => o * i, 1), n = new e[0].data.constructor(s), a = e[0].type;
	if (t === 0) {
		let o = 0;
		for (const i of e) {
			const l = i.data;
			n.set(l, o), o += l.length;
		}
	} else {
		let o = 0;
		for (let i = 0; i < e.length; ++i) {
			const { data: l, dims: c } = e[i];
			for (let d = 0; d < l.length; ++d) {
				let h = 0;
				for (let _ = c.length - 1, m = d, v = 1; _ >= 0; --_) {
					const w = c[_];
					let b = m % w;
					_ === t && (b += o), h += b * v, v *= r[_], m = Math.floor(m / w);
				}
				n[h] = l[d];
			}
			o += c[t];
		}
	}
	return new V(a, n, r);
}
function or(e, t = 0) {
	return Ne(e.map((r) => r.unsqueeze(t)), t);
}
function Hs(e, t, r, s = !1, n = null) {
	const a = t.data, o = t.dims;
	r = Wt(r, o.length);
	const i = o.slice();
	i[r] = 1;
	const l = new a.constructor(a.length / o[r]);
	n !== null && l.fill(n);
	for (let c = 0; c < a.length; ++c) {
		let d = 0;
		for (let h = o.length - 1, _ = c, m = 1; h >= 0; --h) {
			const v = o[h];
			if (h !== r) {
				const w = _ % v;
				d += w * m, m *= i[h];
			}
			_ = Math.floor(_ / v);
		}
		l[d] = e(l[d], a[c], c, d);
	}
	return s || i.splice(r, 1), [
		t.type,
		l,
		i
	];
}
function ak(e, t = null, r = 1, s = !1) {
	const n = e.data, a = e.dims;
	if (t === null) {
		const h = n.reduce((v, w) => v + w, 0) / n.length, _ = Math.sqrt(n.reduce((v, w) => v + (w - h) ** 2, 0) / (n.length - r)), m = new V(e.type, [h], []);
		return [new V(e.type, [_], []), m];
	}
	t = Wt(t, a.length);
	const o = Ii(e, t, s), i = o.data, [l, c, d] = Hs((h, _, m, v) => h + (_ - i[v]) ** 2, e, t, s);
	for (let h = 0; h < c.length; ++h) c[h] = Math.sqrt(c[h] / (a[t] - r));
	return [new V(l, c, d), o];
}
function Ii(e, t = null, r = !1) {
	const s = e.dims, n = e.data;
	if (t === null) {
		const l = n.reduce((c, d) => c + d, 0);
		return new V(e.type, [l / n.length], []);
	}
	t = Wt(t, s.length);
	const [a, o, i] = Hs((l, c) => l + c, e, t, r);
	if (s[t] !== 1) for (let l = 0; l < o.length; ++l) o[l] /= s[t];
	return new V(a, o, i);
}
function Oo(e) {
	const t = new Array(e.length);
	for (let r = e.length - 1, s = 1; r >= 0; --r) t[r] = s, s *= e[r];
	return t;
}
function Oi(e, t, r, s) {
	return new V(r, new s(e.reduce((n, a) => n * a, 1)).fill(t), e);
}
function ot(e, t) {
	let r, s;
	if (typeof t == "number") r = "float32", s = Float32Array;
	else if (typeof t == "bigint") r = "int64", s = BigInt64Array;
	else if (typeof t == "boolean") r = "bool", s = Uint8Array;
	else throw new Error(`Unsupported data type: ${typeof t}`);
	return Oi(e, t, r, s);
}
function Jo(e, t) {
	return ot(e.dims, t);
}
function ft(e) {
	return Oi(e, 1n, "int64", BigInt64Array);
}
function op(e) {
	return ft(e.dims);
}
function ip(e) {
	return Oi(e, 0n, "int64", BigInt64Array);
}
function lp(e) {
	return ip(e.dims);
}
function ok(e) {
	const t = e.reduce((r, s) => r * s, 1);
	return new V("float32", Float32Array.from({ length: t }, () => Si.gauss()), e);
}
function ik(e, t) {
	if (e.dims.length !== 2) throw new Error("The tensor must have 2 dimensions");
	if (e.dims.at(-1) % 8 !== 0) throw new Error("The last dimension of the tensor must be a multiple of 8");
	if (!["binary", "ubinary"].includes(t)) throw new Error("The precision must be either 'binary' or 'ubinary'");
	const r = t === "binary", s = r ? "int8" : "uint8", n = r ? Int8Array : Uint8Array, a = e.data, o = new n(a.length / 8);
	for (let i = 0; i < a.length; ++i) {
		const l = a[i] > 0 ? 1 : 0, c = Math.floor(i / 8), d = i % 8;
		o[c] |= l << 7 - d, r && d === 0 && (o[c] -= 128);
	}
	return new V(s, o, [e.dims[0], e.dims[1] / 8]);
}
async function cp(e) {
	if (!e) throw new Error("modelId is required for get_tokenizer_files");
	return (await sn(e, "tokenizer_config.json", {})).exists ? ["tokenizer.json", "tokenizer_config.json"] : [];
}
async function up(e, t) {
	const r = await cp(e);
	return await Promise.all(r.map((s) => Yt(e, s, !0, t)));
}
function Ni(e) {
	const t = e.dims;
	switch (t.length) {
		case 1: return e.tolist();
		case 2:
			if (t[0] !== 1) throw new Error("Unable to decode tensor with `batch size !== 1`. Use `tokenizer.batch_decode(...)` for batched inputs.");
			return e.tolist()[0];
		default: throw new Error(`Expected tensor to have 1-2 dimensions, got ${t.length}.`);
	}
}
var lk = [
	"bos_token",
	"eos_token",
	"unk_token",
	"sep_token",
	"pad_token",
	"cls_token",
	"mask_token"
];
function ck(e, t, r, s) {
	for (const n of Object.keys(e)) {
		const a = t - e[n].length, o = r(n), i = new Array(a).fill(o);
		e[n] = s === "right" ? Ft(e[n], i) : Ft(i, e[n]);
	}
}
function uk(e, t) {
	for (const r of Object.keys(e)) e[r].length = t;
}
function Sr(e, ...t) {
	for (const r of t) {
		if (!Object.hasOwn(e, r)) continue;
		const s = e[r];
		if (s) if (typeof s == "object") {
			if (s.__type === "AddedToken") return s.content;
			throw Error(`Unknown token: ${s}`);
		} else return s;
	}
	return null;
}
function dk(e) {
	const t = [];
	for (const r of e.get_added_tokens_decoder().values()) r.special && t.push(r);
	return t;
}
var ne = class extends _t {
	return_token_type_ids = !1;
	padding_side = "right";
	constructor(e, t) {
		if (super(), this._tokenizerJSON = e, this._tokenizerConfig = t, this._tokenizer = new Tx(e, t), this.config = t, this.padding_side = t.padding_side ?? this.padding_side, this.mask_token = Sr(t, "mask_token"), this.mask_token_id = this._tokenizer.token_to_id(this.mask_token), this.pad_token = Sr(t, "pad_token", "eos_token"), this.pad_token_id = this._tokenizer.token_to_id(this.pad_token), this.sep_token = Sr(t, "sep_token"), this.sep_token_id = this._tokenizer.token_to_id(this.sep_token), this.unk_token = Sr(t, "unk_token"), this.unk_token_id = this._tokenizer.token_to_id(this.unk_token), this.bos_token = Sr(t, "bos_token"), this.bos_token_id = this._tokenizer.token_to_id(this.bos_token), this.eos_token = Sr(t, "eos_token"), this.eos_token_id = this._tokenizer.token_to_id(this.eos_token), this.chat_template = t.chat_template ?? null, Array.isArray(this.chat_template)) {
			const s = Object.create(null);
			for (const { name: n, template: a } of this.chat_template) {
				if (typeof n != "string" || typeof a != "string") throw new Error("Chat template must be a list of objects with \"name\" and \"template\" properties");
				s[n] = a;
			}
			this.chat_template = s;
		}
		this._compiled_template_cache = /* @__PURE__ */ new Map();
		const r = dk(this._tokenizer);
		this.all_special_ids = r.map((s) => s.id), this.all_special_tokens = r.map((s) => s.content);
	}
	static async from_pretrained(e, { progress_callback: t = null, config: r = null, cache_dir: s = null, local_files_only: n = !1, revision: a = "main" } = {}) {
		const o = await up(e, {
			progress_callback: t,
			config: r,
			cache_dir: s,
			local_files_only: n,
			revision: a
		});
		return new this(...o);
	}
	get_vocab() {
		return this._tokenizer.get_vocab();
	}
	get model_max_length() {
		return this._tokenizerConfig.model_max_length ?? Infinity;
	}
	get add_eos_token() {
		return this._tokenizerConfig.add_eos_token;
	}
	get add_bos_token() {
		return this._tokenizerConfig.add_bos_token;
	}
	convert_tokens_to_ids(e) {
		return typeof e == "string" ? this._tokenizer.token_to_id(e) : e.map((t) => this._tokenizer.token_to_id(t));
	}
	_call(e, t = {}) {
		const { text_pair: r = null, add_special_tokens: s = !0, padding: n = !1, return_token_type_ids: a = null } = t;
		let { truncation: o = null, max_length: i = null } = t;
		const l = t.return_tensor ?? !0, c = Array.isArray(e);
		let d;
		if (c) {
			if (e.length === 0) throw Error("text array must be non-empty");
			if (r !== null) {
				if (Array.isArray(r)) {
					if (e.length !== r.length) throw Error("text and text_pair must have the same length");
				} else throw Error("text_pair must also be an array");
				d = e.map((_, m) => this._encode_plus(_, {
					text_pair: r[m],
					add_special_tokens: s,
					return_token_type_ids: a
				}));
			} else d = e.map((_) => this._encode_plus(_, {
				add_special_tokens: s,
				return_token_type_ids: a
			}));
		} else {
			if (e == null) throw Error("text may not be null or undefined");
			if (Array.isArray(r)) throw Error("When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).");
			d = [this._encode_plus(e, {
				text_pair: r,
				add_special_tokens: s,
				return_token_type_ids: a
			})];
		}
		if (i === null ? i = this.model_max_length : o === null && (n === !0 ? (oe.warn("`max_length` is ignored when `padding: true` and there is no truncation strategy. To pad to max length, use `padding: 'max_length'`."), i = this.model_max_length) : n === !1 && (oe.warn("Truncation was not explicitly activated but `max_length` is provided a specific value, please use `truncation: true` to explicitly truncate examples to max length."), o = !0)), n === !0 && (i = Math.min($e(d.map((_) => _.input_ids.length))[0], i ?? Infinity)), i = Math.min(i, this.model_max_length ?? Infinity), n || o) for (let _ = 0; _ < d.length; ++_) d[_].input_ids.length !== i && (d[_].input_ids.length > i ? o && uk(d[_], i) : n && ck(d[_], i, (m) => m === "input_ids" ? this.pad_token_id : 0, this.padding_side));
		const h = {};
		if (l) {
			if (!(n && o) && d.some((m) => {
				for (const v of Object.keys(m)) if (m[v].length !== d[0][v]?.length) return !0;
				return !1;
			})) throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=true' and 'truncation=true' to have batched tensors with the same length.");
			const _ = [d.length, d[0].input_ids.length];
			for (const m of Object.keys(d[0])) h[m] = new V("int64", BigInt64Array.from(d.flatMap((v) => v[m]).map(BigInt)), _);
		} else {
			for (const _ of Object.keys(d[0])) h[_] = d.map((m) => m[_]);
			if (!c) for (const _ of Object.keys(h)) h[_] = h[_][0];
		}
		return h;
	}
	_encode_text(e) {
		return e === null ? null : this._tokenizer.encode(e).tokens;
	}
	_encode_plus(e, { text_pair: t = null, add_special_tokens: r = !0, return_token_type_ids: s = null } = {}) {
		const { ids: n, attention_mask: a, token_type_ids: o } = this._tokenizer.encode(e, {
			text_pair: t,
			add_special_tokens: r,
			return_token_type_ids: s ?? this.return_token_type_ids
		});
		return {
			input_ids: n,
			attention_mask: a,
			...o ? { token_type_ids: o } : {}
		};
	}
	tokenize(e, { pair: t = null, add_special_tokens: r = !1 } = {}) {
		return this._tokenizer.tokenize(e, {
			text_pair: t,
			add_special_tokens: r
		});
	}
	encode(e, { text_pair: t = null, add_special_tokens: r = !0, return_token_type_ids: s = null } = {}) {
		return this._tokenizer.encode(e, {
			text_pair: t,
			add_special_tokens: r,
			return_token_type_ids: s
		}).ids;
	}
	batch_decode(e, t = {}) {
		return e instanceof V && (e = e.tolist()), e.map((r) => this.decode(r, t));
	}
	decode(e, t = {}) {
		if (e instanceof V && (e = Ni(e)), !Array.isArray(e) || e.length === 0 || !hb(e[0])) throw Error("token_ids must be a non-empty array of integers.");
		return this.decode_single(e, t);
	}
	decode_single(e, { skip_special_tokens: t = !1, clean_up_tokenization_spaces: r = null }) {
		return this._tokenizer.decode(e, {
			skip_special_tokens: t,
			clean_up_tokenization_spaces: r
		});
	}
	get_chat_template({ chat_template: e = null, tools: t = null } = {}) {
		if (this.chat_template && typeof this.chat_template == "object") {
			const r = this.chat_template;
			if (e !== null && Object.hasOwn(r, e)) e = r[e];
			else if (e === null) if (t !== null && "tool_use" in r) e = r.tool_use;
			else if ("default" in r) e = r.default;
			else throw Error(`This model has multiple chat templates with no default specified! Please either pass a chat template or the name of the template you wish to use to the 'chat_template' argument. Available template names are ${Object.keys(r).sort()}.`);
		} else if (e === null) if (this.chat_template) e = this.chat_template;
		else throw Error("Cannot use apply_chat_template() because tokenizer.chat_template is not set and no template argument was passed! For information about writing templates and setting the tokenizer.chat_template attribute, please see the documentation at https://huggingface.co/docs/transformers/main/en/chat_templating");
		return e;
	}
	apply_chat_template(e, t = {}) {
		let { tools: r = null, documents: s = null, chat_template: n = null, add_generation_prompt: a = !1, tokenize: o = !0, padding: i = !1, truncation: l = !1, max_length: c = null, return_tensor: d = !0, return_dict: h = !0, tokenizer_kwargs: _ = {}, ...m } = t;
		if (n = this.get_chat_template({
			chat_template: n,
			tools: r
		}), typeof n != "string") throw Error(`chat_template must be a string, but got ${typeof n}`);
		let v = this._compiled_template_cache.get(n);
		v === void 0 && (v = new y1(n), this._compiled_template_cache.set(n, v));
		const w = Object.create(null);
		for (const M of lk) {
			const E = Sr(this.config, M);
			E && (w[M] = E);
		}
		const b = v.render({
			messages: e,
			add_generation_prompt: a,
			tools: r,
			documents: s,
			...w,
			...m
		});
		if (o) {
			const M = this._call(b, {
				add_special_tokens: !1,
				padding: i,
				truncation: l,
				max_length: c,
				return_tensor: d,
				..._
			});
			return h ? M : M.input_ids;
		}
		return b;
	}
};
function Di(e, t, r, s) {
	if (!("language_codes" in e) || !Array.isArray(e.language_codes)) throw new Error("Tokenizer must have `language_codes` attribute set and it should be an array of language ids.");
	if (!("languageRegex" in e) || !(e.languageRegex instanceof RegExp)) throw new Error("Tokenizer must have `languageRegex` attribute set and it should be a regular expression.");
	if (!("lang_to_token" in e) || typeof e.lang_to_token != "function") throw new Error("Tokenizer must have `lang_to_token` attribute set and it should be a function.");
	const n = s.src_lang, a = s.tgt_lang;
	if (!e.language_codes.includes(a)) throw new Error(`Target language code "${a}" is not valid. Must be one of: {${e.language_codes.join(", ")}}`);
	if (n !== void 0) {
		if (!e.language_codes.includes(n)) throw new Error(`Source language code "${n}" is not valid. Must be one of: {${e.language_codes.join(", ")}}`);
		for (const o of e._tokenizer.post_processor.config.single) if ("SpecialToken" in o && e.languageRegex.test(o.SpecialToken.id)) {
			o.SpecialToken.id = e.lang_to_token(n);
			break;
		}
	}
	return s.forced_bos_token_id = e._tokenizer.token_to_id(e.lang_to_token(a)), e._call(t, r);
}
var dp = {};
ds(dp, {
	AlbertTokenizer: () => hk,
	AutoTokenizer: () => Te,
	BartTokenizer: () => fk,
	BertTokenizer: () => _k,
	BlenderbotSmallTokenizer: () => pk,
	BlenderbotTokenizer: () => mk,
	BloomTokenizer: () => gk,
	CLIPTokenizer: () => vk,
	CamembertTokenizer: () => wk,
	CodeGenTokenizer: () => bk,
	CodeLlamaTokenizer: () => yk,
	CohereAsrTokenizer: () => xk,
	CohereTokenizer: () => Mk,
	ConvBertTokenizer: () => kk,
	DebertaTokenizer: () => Ek,
	DebertaV2Tokenizer: () => Tk,
	DistilBertTokenizer: () => Ak,
	ElectraTokenizer: () => Ck,
	EsmTokenizer: () => Sk,
	FalconTokenizer: () => Pk,
	GPT2Tokenizer: () => Ik,
	GPTNeoXTokenizer: () => Lk,
	GemmaTokenizer: () => Fk,
	HerbertTokenizer: () => Ok,
	LlamaTokenizer: () => Nk,
	M2M100Tokenizer: () => Dk,
	MBart50Tokenizer: () => Bk,
	MBartTokenizer: () => hp,
	MPNetTokenizer: () => $k,
	MarianTokenizer: () => zk,
	MgpstrTokenizer: () => Rk,
	MobileBertTokenizer: () => Gk,
	NllbTokenizer: () => Vk,
	NougatTokenizer: () => Uk,
	PreTrainedTokenizer: () => ne,
	Qwen2Tokenizer: () => jk,
	RoFormerTokenizer: () => Wk,
	RobertaTokenizer: () => qk,
	SiglipTokenizer: () => Hk,
	SpeechT5Tokenizer: () => Qk,
	SqueezeBertTokenizer: () => Xk,
	T5Tokenizer: () => Yk,
	TokenizersBackend: () => ne,
	VitsTokenizer: () => Kk,
	Wav2Vec2CTCTokenizer: () => Zk,
	WhisperTokenizer: () => sT,
	XLMRobertaTokenizer: () => nT,
	XLMTokenizer: () => aT
});
var hk = class extends ne {
	return_token_type_ids = !0;
}, fk = class extends ne {}, _k = class extends ne {
	return_token_type_ids = !0;
}, pk = class extends ne {}, mk = class extends ne {}, gk = class extends ne {}, wk = class extends ne {}, vk = class extends ne {}, yk = class extends ne {}, bk = class extends ne {}, Mk = class extends ne {}, xk = class extends ne {}, kk = class extends ne {
	return_token_type_ids = !0;
}, Tk = class extends ne {
	return_token_type_ids = !0;
}, Ek = class extends ne {
	return_token_type_ids = !0;
}, Ak = class extends ne {}, Ck = class extends ne {
	return_token_type_ids = !0;
}, Sk = class extends ne {}, Pk = class extends ne {}, Fk = class extends ne {}, Lk = class extends ne {}, Ik = class extends ne {}, Ok = class extends ne {
	return_token_type_ids = !0;
}, Nk = class extends ne {
	padding_side = "left";
}, Dk = class extends ne {
	constructor(e, t) {
		super(e, t), this.languageRegex = /^__[a-z]{2,3}__$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)).map((r) => r.slice(2, -2)), this.lang_to_token = (r) => `__${r}__`;
	}
	_build_translation_inputs(e, t, r) {
		return Di(this, e, t, r);
	}
}, zk = class extends ne {
	constructor(e, t) {
		super(e, t), this.languageRegex = /^(>>\w+<<)\s*/g, this.supported_language_codes = Array.from(this.get_vocab().keys()).filter((r) => this.languageRegex.test(r)), oe.warn("WARNING: `MarianTokenizer` is not yet supported by Hugging Face's \"fast\" tokenizers library. Therefore, you may experience slightly inaccurate results.");
	}
	_encode_text(e) {
		if (e === null) return null;
		const [t, ...r] = e.trim().split(this.languageRegex);
		if (r.length === 0) return super._encode_text(t);
		if (r.length === 2) {
			const [s, n] = r;
			return this.supported_language_codes.includes(s) || oe.warn(`Unsupported language code "${s}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`), Ft([s], super._encode_text(n));
		}
	}
}, hp = class extends ne {
	constructor(e, t) {
		super(e, t), this.languageRegex = /^[a-z]{2}_[A-Z]{2}$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)).map((r) => r), this.lang_to_token = (r) => r;
	}
	_build_translation_inputs(e, t, r) {
		return Di(this, e, t, r);
	}
}, Bk = class extends hp {}, Rk = class extends ne {}, Gk = class extends ne {
	return_token_type_ids = !0;
}, $k = class extends ne {}, Vk = class extends ne {
	constructor(e, t) {
		super(e, t), this.languageRegex = /^[a-z]{3}_[A-Z][a-z]{3}$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)), this.lang_to_token = (r) => r;
	}
	_build_translation_inputs(e, t, r) {
		return Di(this, e, t, r);
	}
}, Uk = class extends ne {}, jk = class extends ne {}, qk = class extends ne {}, Wk = class extends ne {
	return_token_type_ids = !0;
}, Hk = class extends ne {}, Qk = class extends ne {}, Xk = class extends ne {
	return_token_type_ids = !0;
}, Yk = class extends ne {}, Jk = class extends zt {
	decode_chain(e) {
		let t = "";
		for (let r = 1; r < e.length; r += 2) t += e[r];
		return [t];
	}
}, Kk = class extends ne {
	constructor(e, t) {
		super(e, t), this._tokenizer.decoder = new Jk({ type: "VitsDecoder" });
	}
}, Zk = class extends ne {}, fp = [
	["en", "english"],
	["zh", "chinese"],
	["de", "german"],
	["es", "spanish"],
	["ru", "russian"],
	["ko", "korean"],
	["fr", "french"],
	["ja", "japanese"],
	["pt", "portuguese"],
	["tr", "turkish"],
	["pl", "polish"],
	["ca", "catalan"],
	["nl", "dutch"],
	["ar", "arabic"],
	["sv", "swedish"],
	["it", "italian"],
	["id", "indonesian"],
	["hi", "hindi"],
	["fi", "finnish"],
	["vi", "vietnamese"],
	["he", "hebrew"],
	["uk", "ukrainian"],
	["el", "greek"],
	["ms", "malay"],
	["cs", "czech"],
	["ro", "romanian"],
	["da", "danish"],
	["hu", "hungarian"],
	["ta", "tamil"],
	["no", "norwegian"],
	["th", "thai"],
	["ur", "urdu"],
	["hr", "croatian"],
	["bg", "bulgarian"],
	["lt", "lithuanian"],
	["la", "latin"],
	["mi", "maori"],
	["ml", "malayalam"],
	["cy", "welsh"],
	["sk", "slovak"],
	["te", "telugu"],
	["fa", "persian"],
	["lv", "latvian"],
	["bn", "bengali"],
	["sr", "serbian"],
	["az", "azerbaijani"],
	["sl", "slovenian"],
	["kn", "kannada"],
	["et", "estonian"],
	["mk", "macedonian"],
	["br", "breton"],
	["eu", "basque"],
	["is", "icelandic"],
	["hy", "armenian"],
	["ne", "nepali"],
	["mn", "mongolian"],
	["bs", "bosnian"],
	["kk", "kazakh"],
	["sq", "albanian"],
	["sw", "swahili"],
	["gl", "galician"],
	["mr", "marathi"],
	["pa", "punjabi"],
	["si", "sinhala"],
	["km", "khmer"],
	["sn", "shona"],
	["yo", "yoruba"],
	["so", "somali"],
	["af", "afrikaans"],
	["oc", "occitan"],
	["ka", "georgian"],
	["be", "belarusian"],
	["tg", "tajik"],
	["sd", "sindhi"],
	["gu", "gujarati"],
	["am", "amharic"],
	["yi", "yiddish"],
	["lo", "lao"],
	["uz", "uzbek"],
	["fo", "faroese"],
	["ht", "haitian creole"],
	["ps", "pashto"],
	["tk", "turkmen"],
	["nn", "nynorsk"],
	["mt", "maltese"],
	["sa", "sanskrit"],
	["lb", "luxembourgish"],
	["my", "myanmar"],
	["bo", "tibetan"],
	["tl", "tagalog"],
	["mg", "malagasy"],
	["as", "assamese"],
	["tt", "tatar"],
	["haw", "hawaiian"],
	["ln", "lingala"],
	["ha", "hausa"],
	["ba", "bashkir"],
	["jw", "javanese"],
	["su", "sundanese"]
], Vn = new Map(fp), eT = new Map([
	...fp.map(([e, t]) => [t, e]),
	["burmese", "my"],
	["valencian", "ca"],
	["flemish", "nl"],
	["haitian", "ht"],
	["letzeburgesch", "lb"],
	["pushto", "ps"],
	["panjabi", "pa"],
	["moldavian", "ro"],
	["moldovan", "ro"],
	["sinhalese", "si"],
	["castilian", "es"]
]);
function tT(e) {
	e = e.toLowerCase();
	let t = eT.get(e);
	if (t === void 0) {
		const r = e.match(/^<\|([a-z]{2})\|>$/);
		if (r && (e = r[1]), Vn.has(e)) t = e;
		else {
			const s = e.length === 2 ? Vn.keys() : Vn.values();
			throw new Error(`Language "${e}" is not supported. Must be one of: ${JSON.stringify(Array.from(s))}`);
		}
	}
	return t;
}
var ff = /* @__PURE__ */ new RegExp("^[\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]+$", "gu"), rT = .1, sT = class extends ne {
	get timestamp_begin() {
		return this._tokenizer.token_to_id("<|notimestamps|>") + 1;
	}
	_decode_asr(e, { return_timestamps: t = !1, return_language: r = !1, time_precision: s = null, force_full_sequences: n = !0 } = {}) {
		if (s === null) throw Error("Must specify time_precision");
		let a = null;
		const o = t === "word";
		function i() {
			return {
				language: a,
				timestamp: [null, null],
				text: ""
			};
		}
		const l = [];
		let c = i(), d = 0;
		const h = this.timestamp_begin, _ = h + 1500;
		let m = [], v = [], w = !1, b = null;
		const M = new Set(this.all_special_ids);
		for (const k of e) {
			const C = k.tokens, O = o ? k.token_timestamps : null;
			let x = null, q = h;
			if ("stride" in k) {
				const [W, H, D] = k.stride;
				if (d -= H, b = W - D, H && (q = H / s + h), D) for (let F = C.length - 1; F >= 0; --F) {
					const U = Number(C[F]);
					if (U >= h) {
						if (x !== null && (U - h) * s < b) break;
						x = U;
					}
				}
			}
			let R = [], G = [];
			for (let W = 0; W < C.length; ++W) {
				const H = Number(C[W]);
				if (M.has(H)) {
					const D = this.decode([H]), F = Vn.get(D.slice(2, -2));
					if (F !== void 0) {
						if (a !== null && F !== a && !t) {
							m.push(R);
							const U = this.findLongestCommonSequence(m)[0], ae = this.decode(U);
							c.text = ae, l.push(c), m = [], R = [], c = i();
						}
						a = c.language = F;
					}
				} else if (H >= h && H <= _) {
					const D = qs((H - h) * s + d, 2);
					if (x !== null && H >= x) w = !0;
					else if (w || m.length > 0 && H < q) w = !1;
					else if (c.timestamp[0] === null) c.timestamp[0] = D;
					else if (D !== c.timestamp[0]) {
						c.timestamp[1] = D, m.push(R), o && v.push(G);
						const [F, U] = this.findLongestCommonSequence(m, v), ae = this.decode(F);
						if (c.text = ae, o && (c.words = this.collateWordTimestamps(F, U, a), c.words.length > 0 && c.timestamp[1] !== null)) for (const Z of c.words) Z.timestamp[1] > c.timestamp[1] && c.timestamp[1] >= Z.timestamp[0] && (Z.timestamp[1] = c.timestamp[1]);
						l.push(c), m = [], R = [], v = [], G = [], c = i();
					}
				} else if (R.push(H), o) {
					let D = qs(O[W] + d, 2), F;
					if (W + 1 < O.length) {
						F = qs(O[W + 1] + d, 2);
						const U = this.decode([H]);
						ff.test(U) && (F = qs(Math.min(D + s, F), 2));
					} else F = null;
					G.push([D, F]);
				}
			}
			if ("stride" in k) {
				const [W, H, D] = k.stride;
				d += W - D;
			}
			R.length > 0 ? (m.push(R), o && v.push(G)) : m.every((W) => W.length === 0) && (c = i(), m = [], R = [], v = [], G = []);
		}
		if (m.length > 0) {
			if (n && t) throw new Error("Whisper did not predict an ending timestamp, which can happen if audio is cut off in the middle of a word. Also make sure WhisperTimeStampLogitsProcessor was used during generation.");
			const [k, C] = this.findLongestCommonSequence(m, v), O = this.decode(k);
			c.text = O, o && (c.words = this.collateWordTimestamps(k, C, a)), l.push(c);
		}
		let E = Object.create(null);
		const A = l.map((k) => k.text).join("");
		if (t || r) {
			for (let k = 0; k < l.length; ++k) {
				const C = l[k];
				t || delete C.timestamp, r || delete C.language;
			}
			if (o) {
				const k = [];
				for (const C of l) for (const O of C.words) k.push(O);
				E = { chunks: k };
			} else E = { chunks: l };
		}
		return [A, E];
	}
	findLongestCommonSequence(e, t = null) {
		let r = e[0], s = r.length, n = [];
		const a = Array.isArray(t) && t.length > 0;
		let o = a ? [] : null, i = a ? t[0] : null;
		for (let l = 1; l < e.length; ++l) {
			const c = e[l];
			let d = 0, h = [
				s,
				s,
				0,
				0
			];
			const _ = c.length;
			for (let A = 1; A < s + _; ++A) {
				const k = Math.max(0, s - A), C = Math.min(s, s + _ - A), O = r.slice(k, C), x = Math.max(0, A - s), q = Math.min(_, A), R = c.slice(x, q);
				if (O.length !== R.length) throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");
				let G;
				a ? G = O.filter((D, F) => D === R[F] && i[k + F][0] - rT <= t[l][x + F][0]).length : G = O.filter((D, F) => D === R[F]).length;
				const W = A / 1e4, H = G / A + W;
				G > 1 && H > d && (d = H, h = [
					k,
					C,
					x,
					q
				]);
			}
			const [m, v, w, b] = h, M = Math.floor((v + m) / 2);
			let E = Math.floor((b + w) / 2);
			if (a && d === 0 && s > 0) {
				const A = i[s - 1][0], k = t[l].findIndex((C) => C[0] >= A);
				E = k === -1 ? c.length : k;
			}
			n.push(...r.slice(0, M)), r = c.slice(E), s = r.length, a && (o.push(...i.slice(0, M)), i = t[l].slice(E));
		}
		return n.push(...r), a ? (o.push(...i), [n, o]) : [n, []];
	}
	collateWordTimestamps(e, t, r) {
		const [s, n, a] = this.combineTokensIntoWords(e, r), o = [];
		for (let i = 0; i < s.length; ++i) {
			const l = a[i];
			o.push({
				text: s[i],
				timestamp: [t[l.at(0)][0], t[l.at(-1)][1]]
			});
		}
		return o;
	}
	combineTokensIntoWords(e, t, r = `"'“¡¿([{-`, s = `"'.。,，!！?？:：”)]}、`) {
		t = t ?? "english";
		let n, a, o;
		return [
			"chinese",
			"japanese",
			"thai",
			"lao",
			"myanmar"
		].includes(t) ? [n, a, o] = this.splitTokensOnUnicode(e) : [n, a, o] = this.splitTokensOnSpaces(e), this.mergePunctuations(n, a, o, r, s);
	}
	decode(e, t) {
		let r;
		return t?.decode_with_timestamps ? (e instanceof V && (e = Ni(e)), r = this.decodeWithTimestamps(e, t)) : r = super.decode(e, t), r;
	}
	decodeWithTimestamps(e, t) {
		const r = t?.time_precision ?? .02, s = this.all_special_ids.at(-1) + 1;
		let n = [[]];
		for (let a of e) if (a = Number(a), a >= s) {
			const o = ((a - s) * r).toFixed(2);
			n.push(`<|${o}|>`), n.push([]);
		} else n[n.length - 1].push(a);
		return n = n.map((a) => typeof a == "string" ? a : super.decode(a, t)), n.join("");
	}
	splitTokensOnUnicode(e) {
		const t = this.decode(e, { decode_with_timestamps: !0 }), r = "�", s = [], n = [], a = [];
		let o = [], i = [], l = 0;
		for (let c = 0; c < e.length; ++c) {
			const d = e[c];
			o.push(d), i.push(c);
			const h = this.decode(o, { decode_with_timestamps: !0 });
			(!h.includes(r) || t[l + h.indexOf(r)] === r) && (s.push(h), n.push(o), a.push(i), o = [], i = [], l += h.length);
		}
		return [
			s,
			n,
			a
		];
	}
	splitTokensOnSpaces(e) {
		const [t, r, s] = this.splitTokensOnUnicode(e), n = [], a = [], o = [];
		for (let i = 0; i < t.length; ++i) {
			const l = t[i], c = r[i], d = s[i], h = c[0] >= this._tokenizer.token_to_id("<|endoftext|>"), _ = l.startsWith(" "), m = l.trim(), v = ff.test(m);
			if (h || _ || v || n.length === 0) n.push(l), a.push(c), o.push(d);
			else {
				const w = n.length - 1;
				n[w] += l, a[w].push(...c), o[w].push(...d);
			}
		}
		return [
			n,
			a,
			o
		];
	}
	mergePunctuations(e, t, r, s, n) {
		const a = structuredClone(e), o = structuredClone(t), i = structuredClone(r);
		let l = a.length - 2, c = a.length - 1;
		for (; l >= 0;) a[l].startsWith(" ") && s.includes(a[l].trim()) ? (a[c] = a[l] + a[c], o[c] = Ft(o[l], o[c]), i[c] = Ft(i[l], i[c]), a[l] = "", o[l] = [], i[l] = []) : c = l, --l;
		for (l = 0, c = 1; c < a.length;) !a[l].endsWith(" ") && n.includes(a[c]) ? (a[l] += a[c], o[l] = Ft(o[l], o[c]), i[l] = Ft(i[l], i[c]), a[c] = "", o[c] = [], i[c] = []) : l = c, ++c;
		return [
			a.filter((d) => d),
			o.filter((d) => d.length > 0),
			i.filter((d) => d.length > 0)
		];
	}
}, nT = class extends ne {}, aT = class extends ne {
	return_token_type_ids = !0;
	constructor(e, t) {
		super(e, t), oe.warn("WARNING: `XLMTokenizer` is not yet supported by Hugging Face's \"fast\" tokenizers library. Therefore, you may experience slightly inaccurate results.");
	}
}, Te = class {
	static async from_pretrained(e, { progress_callback: t = null, config: r = null, cache_dir: s = null, local_files_only: n = !1, revision: a = "main" } = {}) {
		const [o, i] = await up(e, {
			progress_callback: t,
			config: r,
			cache_dir: s,
			local_files_only: n,
			revision: a
		}), l = i.tokenizer_class?.replace(/Fast$/, "") ?? "PreTrainedTokenizer";
		let c = dp[l];
		return c || (oe.warn(`Unknown tokenizer class "${l}", attempting to construct from base class.`), c = ne), new c(o, i);
	}
}, ca = "https://github.com/huggingface/transformers.js/issues/new/choose", zi = "preprocessor_config.json", Ks = zi, _p = "processor_config.json", pp = "chat_template.jinja", Ee = class extends _t {
	static classes = [
		"image_processor_class",
		"tokenizer_class",
		"feature_extractor_class"
	];
	static uses_processor_config = !1;
	static uses_chat_template_file = !1;
	constructor(e, t, r) {
		super(), this.config = e, this.components = t, this.chat_template = r;
	}
	get image_processor() {
		return this.components.image_processor;
	}
	get tokenizer() {
		return this.components.tokenizer;
	}
	get feature_extractor() {
		return this.components.feature_extractor;
	}
	apply_chat_template(e, t = {}) {
		if (!this.tokenizer) throw new Error("Unable to apply chat template without a tokenizer.");
		return this.tokenizer.apply_chat_template(e, {
			tokenize: !1,
			chat_template: this.chat_template ?? void 0,
			...t
		});
	}
	batch_decode(...e) {
		if (!this.tokenizer) throw new Error("Unable to decode without a tokenizer.");
		return this.tokenizer.batch_decode(...e);
	}
	decode(...e) {
		if (!this.tokenizer) throw new Error("Unable to decode without a tokenizer.");
		return this.tokenizer.decode(...e);
	}
	async _call(e, ...t) {
		for (const r of [
			this.image_processor,
			this.feature_extractor,
			this.tokenizer
		]) if (r) return r(e, ...t);
		throw new Error("No image processor, feature extractor, or tokenizer found.");
	}
	static async from_pretrained(e, t = {}) {
		const [r, s, n] = await Promise.all([
			this.uses_processor_config ? Yt(e, _p, !0, t) : {},
			Promise.all(this.classes.filter((a) => a in this).map(async (a) => {
				const o = await this[a].from_pretrained(e, t);
				return [a.replace(/_class$/, ""), o];
			})).then(Object.fromEntries),
			this.uses_chat_template_file ? Fi(e, pp, !0, t) : null
		]);
		return new this(r, s, n);
	}
}, Ko = {};
ds(Ko, {
	ChatterboxProcessor: () => DT,
	CohereAsrProcessor: () => BT,
	Florence2Processor: () => RE,
	Gemma3Processor: () => GE,
	Gemma3nProcessor: () => $E,
	Gemma4Processor: () => VE,
	Glm46VProcessor: () => UE,
	GraniteSpeechProcessor: () => jE,
	GroundingDinoProcessor: () => WE,
	Idefics3Processor: () => yf,
	JinaCLIPProcessor: () => JE,
	Lfm2VlProcessor: () => KE,
	LlavaProcessor: () => ZE,
	MgpstrProcessor: () => e2,
	MoonshineProcessor: () => t2,
	OwlViTProcessor: () => r2,
	PaliGemmaProcessor: () => n2,
	Phi3VProcessor: () => o2,
	PixtralProcessor: () => i2,
	Processor: () => Ee,
	PyAnnoteProcessor: () => l2,
	Qwen2VLProcessor: () => Ui,
	Qwen2_5_VLProcessor: () => Wp,
	Qwen3VLProcessor: () => c2,
	Sam2Processor: () => Qp,
	Sam2VideoProcessor: () => u2,
	SamProcessor: () => Hp,
	SmolVLMProcessor: () => yf,
	SpeechT5Processor: () => d2,
	UltravoxProcessor: () => h2,
	VLChatProcessor: () => YE,
	VoxtralProcessor: () => m2,
	VoxtralRealtimeProcessor: () => v2,
	Wav2Vec2Processor: () => y2,
	Wav2Vec2ProcessorWithLM: () => b2,
	WhisperProcessor: () => M2
});
var it = class extends _t {
	constructor(e) {
		super(), this.config = e;
	}
	static async from_pretrained(e, t = {}) {
		const r = await Yt(e, zi, !0, t);
		return new this(r);
	}
};
function st(e, t) {
	if (!(e instanceof Float32Array || e instanceof Float64Array)) throw new Error(`${t} expects input to be a Float32Array or a Float64Array, but got ${e?.constructor?.name ?? typeof e} instead. If using the feature extractor directly, remember to use \`read_audio(url, sampling_rate)\` to obtain the raw audio data of the file/url.`);
}
var Bi = {};
ds(Bi, {
	ASTFeatureExtractor: () => MT,
	ChatterboxFeatureExtractor: () => xT,
	ClapFeatureExtractor: () => kT,
	CohereAsrFeatureExtractor: () => ET,
	DacFeatureExtractor: () => bp,
	EncodecFeatureExtractor: () => vp,
	FeatureExtractor: () => it,
	Gemma3nAudioFeatureExtractor: () => Mp,
	Gemma4AudioFeatureExtractor: () => xp,
	GraniteSpeechFeatureExtractor: () => AT,
	MoonshineFeatureExtractor: () => CT,
	ParakeetFeatureExtractor: () => yp,
	PyAnnoteFeatureExtractor: () => kp,
	SeamlessM4TFeatureExtractor: () => ST,
	SnacFeatureExtractor: () => PT,
	SpeechT5FeatureExtractor: () => FT,
	VoxtralRealtimeFeatureExtractor: () => OT,
	Wav2Vec2FeatureExtractor: () => LT,
	WeSpeakerFeatureExtractor: () => IT,
	WhisperFeatureExtractor: () => NT
});
var oT = () => {}, iT = { fromWeb: oT }, lT = () => {}, cT = lT;
async function mp(e, t) {
	if (ce.IS_BROWSER_ENV) {
		if (ce.IS_WEBWORKER_ENV) throw new Error("Unable to save a file from a Web Worker.");
		const r = URL.createObjectURL(t), s = document.createElement("a");
		s.href = r, s.download = e, s.click(), s.remove(), URL.revokeObjectURL(r);
	} else if (ce.IS_FS_AVAILABLE) {
		const r = t.stream();
		await cT(iT.fromWeb(r), vt.createWriteStream(e));
	} else throw new Error("Unable to save because filesystem is disabled in this environment.");
}
async function uT(e, t) {
	if (typeof AudioContext > "u") throw Error("Unable to load audio from path/URL since `AudioContext` is not available in your environment. Instead, audio data should be passed directly to the pipeline/processor. For more information and some example code, see https://huggingface.co/docs/transformers.js/guides/node-audio-processing.");
	const r = await (await Ys(e)).arrayBuffer(), s = new AudioContext({ sampleRate: t });
	typeof t > "u" && oe.warn(`No sampling rate provided, using default of ${s.sampleRate}Hz.`);
	const n = await s.decodeAudioData(r);
	let a;
	if (n.numberOfChannels === 2) {
		const o = Math.sqrt(2), i = n.getChannelData(0), l = n.getChannelData(1);
		a = new Float32Array(i.length);
		for (let c = 0; c < n.length; ++c) a[c] = o * (i[c] + l[c]) / 2;
	} else a = n.getChannelData(0);
	return a;
}
var dT = uT;
function gp(e, t) {
	if (e < 1) return /* @__PURE__ */ new Float64Array();
	if (e === 1) return new Float64Array([1]);
	const r = 1 - t, s = 2 * Math.PI / (e - 1), n = new Float64Array(e);
	for (let a = 0; a < e; ++a) n[a] = t - r * Math.cos(a * s);
	return n;
}
function _f(e) {
	return gp(e, .5);
}
function hT(e) {
	return gp(e, .54);
}
var fT = {
	htk: (e) => 2595 * Math.log10(1 + e / 700),
	kaldi: (e) => 1127 * Math.log(1 + e / 700),
	slaney: (e, t = 1e3, r = 15, s = 27 / Math.log(6.4)) => e >= t ? r + Math.log(e / t) * s : 3 * e / 200
};
function No(e, t = "htk") {
	const r = fT[t];
	if (!r) throw new Error("mel_scale should be one of \"htk\", \"slaney\" or \"kaldi\".");
	return typeof e == "number" ? r(e) : e.map((s) => r(s));
}
var _T = {
	htk: (e) => 700 * (10 ** (e / 2595) - 1),
	kaldi: (e) => 700 * (Math.exp(e / 1127) - 1),
	slaney: (e, t = 1e3, r = 15, s = Math.log(6.4) / 27) => e >= r ? t * Math.exp(s * (e - r)) : 200 * e / 3
};
function pT(e, t = "htk") {
	const r = _T[t];
	if (!r) throw new Error("mel_scale should be one of \"htk\", \"slaney\" or \"kaldi\".");
	return typeof e == "number" ? r(e) : e.map((s) => r(s));
}
function mT(e, t) {
	const r = Float64Array.from({ length: t.length - 1 }, (o, i) => t[i + 1] - t[i]), s = Array.from({ length: e.length }, () => new Array(t.length));
	for (let o = 0; o < e.length; ++o) {
		const i = s[o];
		for (let l = 0; l < t.length; ++l) i[l] = t[l] - e[o];
	}
	const n = t.length - 2, a = Array.from({ length: n }, () => new Array(e.length));
	for (let o = 0; o < e.length; ++o) {
		const i = s[o];
		for (let l = 0; l < n; ++l) {
			const c = -i[l] / r[l], d = i[l + 2] / r[l + 1];
			a[l][o] = Math.max(0, Math.min(c, d));
		}
	}
	return a;
}
function pf(e, t, r) {
	const s = (t - e) / (r - 1);
	return Float64Array.from({ length: r }, (n, a) => e + s * a);
}
function Qt(e, t, r, s, n, a = null, o = "htk", i = !1) {
	if (a !== null && a !== "slaney") throw new Error("norm must be one of null or \"slaney\"");
	if (e < 2) throw new Error(`Require num_frequency_bins: ${e} >= 2`);
	if (r > s) throw new Error(`Require min_frequency: ${r} <= max_frequency: ${s}`);
	const l = pf(No(r, o), No(s, o), t + 2);
	let c = pT(l, o), d;
	if (i) {
		const _ = n / ((e - 1) * 2);
		d = No(Float64Array.from({ length: e }, (m, v) => v * _), o), c = l;
	} else d = pf(0, Math.floor(n / 2), e);
	const h = mT(d, c);
	if (a !== null && a === "slaney") for (let _ = 0; _ < t; ++_) {
		const m = h[_], v = 2 / (c[_ + 2] - c[_]);
		for (let w = 0; w < e; ++w) m[w] *= v;
	}
	return h;
}
function gT(e, t, r) {
	const s = new e.constructor(e.length + t + r), n = e.length - 1;
	for (let a = 0; a < e.length; ++a) s[t + a] = e[a];
	for (let a = 1; a <= t; ++a) s[t - a] = e[Yn(a, n)];
	for (let a = 1; a <= r; ++a) s[n + t + a] = e[Yn(n - a, n)];
	return s;
}
function wp(e, t, r, s, n) {
	if (r <= 0) throw new Error("reference must be greater than zero");
	if (s <= 0) throw new Error("min_value must be greater than zero");
	r = Math.max(s, r);
	const a = Math.log10(r);
	for (let o = 0; o < e.length; ++o) e[o] = t * Math.log10(Math.max(s, e[o]) - a);
	if (n !== null) {
		if (n <= 0) throw new Error("db_range must be greater than zero");
		const o = $e(e)[0] - n;
		for (let i = 0; i < e.length; ++i) e[i] = Math.max(e[i], o);
	}
	return e;
}
function wT(e, t = 1, r = 1e-5, s = null) {
	return wp(e, 20, t, r, s);
}
function vT(e, t = 1, r = 1e-10, s = null) {
	return wp(e, 10, t, r, s);
}
async function Jt(e, t, r, s, { fft_length: n = null, power: a = 1, center: o = !0, pad_mode: i = "reflect", onesided: l = !0, preemphasis: c = null, preemphasis_htk_flavor: d = !0, mel_filters: h = null, mel_floor: _ = 1e-10, log_mel: m = null, max_log_mel: v = null, reference: w = 1, min_value: b = 1e-10, db_range: M = null, remove_dc_offset: E = null, min_num_frames: A = null, max_num_frames: k = null, do_pad: C = !0, transpose: O = !1, mel_offset: x = 0, mel_floor_mode: q = "clamp" } = {}) {
	const R = t.length;
	if (n === null && (n = r), r > n) throw Error(`frame_length (${r}) may not be larger than fft_length (${n})`);
	if (R !== r) throw new Error(`Length of the window (${R}) must equal frame_length (${r})`);
	if (s <= 0) throw new Error("hop_length must be greater than zero");
	if (a === null && h !== null) throw new Error("You have provided `mel_filters` but `power` is `None`. Mel spectrogram computation is not yet supported for complex-valued spectrogram. Specify `power` to fix this issue.");
	if (!d) throw new Error("`preemphasis_htk_flavor=false` is not currently supported.");
	if (o) {
		const Q = Math.floor(r / 2);
		switch (i) {
			case "reflect":
				e = gT(e, Q, Q);
				break;
			case "constant": {
				const ue = new e.constructor(e.length + 2 * Q);
				ue.set(e, Q), e = ue;
				break;
			}
			case "semicausal": {
				const ue = new e.constructor(e.length + Q);
				ue.set(e, Q), e = ue;
				break;
			}
			default: throw new Error(`pad_mode="${i}" not implemented yet.`);
		}
	}
	let G = Math.floor(1 + Math.floor((e.length - r) / s));
	A !== null && G < A && (G = A);
	const W = l ? Math.floor(n / 2) + 1 : n;
	let H = G, D = G;
	k !== null && (k > G ? C && (D = k) : D = H = k);
	const F = new G1(n), U = new Float64Array(n), ae = new Float64Array(F.outputBufferSize), Z = new Float32Array(W * D);
	for (let Q = 0; Q < H; ++Q) {
		const ue = Q * s, de = Math.min(e.length - ue, r);
		de !== r && U.fill(0, 0, r);
		for (let ve = 0; ve < de; ++ve) U[ve] = e[ue + ve];
		if (E) {
			let ve = 0;
			for (let Fe = 0; Fe < de; ++Fe) ve += U[Fe];
			const ut = ve / de;
			for (let Fe = 0; Fe < de; ++Fe) U[Fe] -= ut;
		}
		if (c !== null) {
			for (let ve = de - 1; ve >= 1; --ve) U[ve] -= c * U[ve - 1];
			U[0] *= 1 - c;
		}
		for (let ve = 0; ve < t.length; ++ve) U[ve] *= t[ve];
		F.realTransform(ae, U);
		for (let ve = 0; ve < W; ++ve) {
			const ut = ve << 1;
			Z[ve * D + Q] = ae[ut] ** 2 + ae[ut + 1] ** 2;
		}
	}
	if (a !== null && a !== 2) {
		const Q = a / 2;
		for (let ue = 0; ue < Z.length; ++ue) Z[ue] **= Q;
	}
	const I = h.length;
	let N = await sk(new V("float32", h.flat(), [I, W]), new V("float32", Z, [W, D]));
	O && (N = N.transpose(1, 0));
	const B = N.data;
	if (q === "add") for (let Q = 0; Q < B.length; ++Q) B[Q] = x + B[Q] + _;
	else for (let Q = 0; Q < B.length; ++Q) B[Q] = x + Math.max(_, B[Q]);
	if (a !== null && m !== null) {
		const Q = Math.min(B.length, H * I);
		switch (m) {
			case "log":
				for (let ue = 0; ue < Q; ++ue) B[ue] = Math.log(B[ue]);
				break;
			case "log10":
				for (let ue = 0; ue < Q; ++ue) B[ue] = Math.log10(B[ue]);
				break;
			case "log10_max_norm": {
				for (let de = 0; de < Q; ++de) B[de] = Math.log10(B[de]);
				const ue = (v ?? $e(B)[0]) - 8;
				for (let de = 0; de < Q; ++de) B[de] = (Math.max(B[de], ue) + 4) / 4;
				break;
			}
			case "dB":
				if (a === 1) wT(B, w, b, M);
				else if (a === 2) vT(B, w, b, M);
				else throw new Error(`Cannot use log_mel option '${m}' with power ${a}`);
				break;
			default: throw new Error(`log_mel must be one of null, 'log', 'log10', 'log10_max_norm', or 'dB'. Got '${m}'`);
		}
	}
	return N;
}
function ur(e, t, { periodic: r = !0, frame_length: s = null, center: n = !0 } = {}) {
	const a = r ? e + 1 : e;
	let o;
	switch (t) {
		case "boxcar":
			o = new Float64Array(a).fill(1);
			break;
		case "hann":
		case "hann_window":
			o = _f(a);
			break;
		case "hamming":
			o = hT(a);
			break;
		case "povey":
			o = _f(a).map((c) => Math.pow(c, .85));
			break;
		default: throw new Error(`Unknown window type ${t}.`);
	}
	if (r && (o = o.subarray(0, e)), s === null || e === s) return o;
	if (e > s) throw new Error(`Length of the window (${e}) may not be larger than frame_length (${s})`);
	const i = new Float64Array(s), l = n ? Math.floor((s - e) / 2) : 0;
	return i.set(o, l), i;
}
function yT(e, t) {
	const r = e.reduce((a, o) => a + o.length, 0), s = /* @__PURE__ */ new ArrayBuffer(44), n = new DataView(s);
	return On(n, 0, "RIFF"), n.setUint32(4, 36 + r * 4, !0), On(n, 8, "WAVE"), On(n, 12, "fmt "), n.setUint32(16, 16, !0), n.setUint16(20, 3, !0), n.setUint16(22, 1, !0), n.setUint32(24, t, !0), n.setUint32(28, t * 4, !0), n.setUint16(32, 4, !0), n.setUint16(34, 32, !0), On(n, 36, "data"), n.setUint32(40, r * 4, !0), new Blob([s, ...e.map((a) => a.buffer)], { type: "audio/wav" });
}
function On(e, t, r) {
	for (let s = 0; s < r.length; ++s) e.setUint8(t + s, r.charCodeAt(s));
}
var bT = class {
	constructor(e, t) {
		this.audio = e, this.sampling_rate = t;
	}
	get data() {
		if (Array.isArray(this.audio)) {
			if (this.audio.length === 0) return /* @__PURE__ */ new Float32Array(0);
			if (this.audio.length === 1) return this.audio[0];
			const e = this.audio.reduce((s, n) => s + n.length, 0), t = new Float32Array(e);
			let r = 0;
			for (const s of this.audio) t.set(s, r), r += s.length;
			return t;
		} else return this.audio;
	}
	toBlob() {
		let e = this.audio;
		return e instanceof Float32Array && (e = [e]), yT(e, this.sampling_rate);
	}
	async save(e) {
		return mp(e, this.toBlob());
	}
}, MT = class extends it {
	constructor(e) {
		super(e);
		const t = this.config.sampling_rate, r = Qt(257, this.config.num_mel_bins, 20, Math.floor(t / 2), t, null, "kaldi", !0);
		this.mel_filters = r, this.window = ur(400, "hann", { periodic: !1 }), this.mean = this.config.mean, this.std = this.config.std;
	}
	async _extract_fbank_features(e, t) {
		return Jt(e, this.window, 400, 160, {
			fft_length: 512,
			power: 2,
			center: !1,
			preemphasis: .97,
			mel_filters: this.mel_filters,
			log_mel: "log",
			mel_floor: 1.192092955078125e-7,
			remove_dc_offset: !0,
			max_num_frames: t,
			transpose: !0
		});
	}
	async _call(e) {
		st(e, "ASTFeatureExtractor");
		const t = await this._extract_fbank_features(e, this.config.max_length);
		if (this.config.do_normalize) {
			const r = this.std * 2, s = t.data;
			for (let n = 0; n < s.length; ++n) s[n] = (s[n] - this.mean) / r;
		}
		return { input_values: t.unsqueeze_(0) };
	}
}, vp = class extends it {
	async _call(e) {
		st(e, "EncodecFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
		const t = this.config.feature_size;
		if (e.length % t !== 0) throw new Error(`The length of the audio data must be a multiple of the number of channels (${t}).`);
		const r = [
			1,
			t,
			e.length / t
		];
		return { input_values: new V("float32", e, r) };
	}
}, xT = class extends it {
	async _call(e) {
		st(e, "ChatterboxFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
		const t = [1, e.length];
		return { input_values: new V("float32", e, t) };
	}
}, kT = class extends it {
	constructor(e) {
		super(e), this.mel_filters = Qt(this.config.nb_frequency_bins, this.config.feature_size, this.config.frequency_min, this.config.frequency_max, this.config.sampling_rate, null, "htk"), this.mel_filters_slaney = Qt(this.config.nb_frequency_bins, this.config.feature_size, this.config.frequency_min, this.config.frequency_max, this.config.sampling_rate, "slaney", "slaney"), this.window = ur(this.config.fft_window_size, "hann");
	}
	async _get_input_mel(e, t, r, s) {
		let n;
		const a = e.length - t;
		if (a > 0) if (r === "rand_trunc") {
			const o = Math.floor(Si.random() * (a + 1));
			e = e.subarray(o, o + t), n = await this._extract_fbank_features(e, this.mel_filters_slaney, this.config.nb_max_samples);
		} else throw new Error(`Truncation strategy "${r}" not implemented`);
		else {
			if (a < 0) {
				let o = new Float64Array(t);
				if (o.set(e), s === "repeat") for (let i = e.length; i < t; i += e.length) o.set(e.subarray(0, Math.min(e.length, t - i)), i);
				else if (s === "repeatpad") for (let i = e.length; i < -a; i += e.length) o.set(e, i);
				e = o;
			}
			if (r === "fusion") throw new Error(`Truncation strategy "${r}" not implemented`);
			n = await this._extract_fbank_features(e, this.mel_filters_slaney, this.config.nb_max_samples);
		}
		return n.unsqueeze_(0);
	}
	async _extract_fbank_features(e, t, r = null) {
		return Jt(e, this.window, this.config.fft_window_size, this.config.hop_length, {
			power: 2,
			mel_filters: t,
			log_mel: "dB",
			max_num_frames: r,
			do_pad: !1,
			transpose: !0
		});
	}
	async _call(e, { max_length: t = null } = {}) {
		return st(e, "ClapFeatureExtractor"), { input_features: (await this._get_input_mel(e, t ?? this.config.nb_max_samples, this.config.truncation, this.config.padding)).unsqueeze_(0) };
	}
}, TT = 1e-5, yp = class extends it {
	constructor(e) {
		super(e), this.config.mel_filters ??= Qt(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, this.config.sampling_rate / 2, this.config.sampling_rate, "slaney", "slaney");
		const t = ur(this.config.win_length, "hann", { periodic: !1 });
		this.window = new Float64Array(this.config.n_fft);
		const r = Math.floor((this.config.n_fft - this.config.win_length) / 2);
		this.window.set(t, r);
	}
	async _extract_fbank_features(e) {
		const t = this.config.preemphasis;
		e = new Float64Array(e);
		for (let r = e.length - 1; r >= 1; --r) e[r] -= t * e[r - 1];
		return await Jt(e, this.window, this.window.length, this.config.hop_length, {
			fft_length: this.config.n_fft,
			power: 2,
			mel_filters: this.config.mel_filters,
			log_mel: "log",
			mel_floor: -Infinity,
			pad_mode: "constant",
			center: !0,
			transpose: !0,
			mel_offset: 2 ** -24
		});
	}
	async _call(e) {
		st(e, "ParakeetFeatureExtractor");
		const t = await this._extract_fbank_features(e), r = Math.floor((e.length + Math.floor(this.config.n_fft / 2) * 2 - this.config.n_fft) / this.config.hop_length), s = t.data;
		s.fill(0, r * t.dims[1]);
		const [n, a] = t.dims, o = new Float64Array(a), i = new Float64Array(a);
		for (let d = 0; d < r; ++d) {
			const h = d * a;
			for (let _ = 0; _ < a; ++_) {
				const m = s[h + _];
				o[_] += m, i[_] += m * m;
			}
		}
		const l = r > 1 ? r - 1 : 1;
		for (let d = 0; d < a; ++d) {
			const h = o[d] / r, _ = (i[d] - r * h * h) / l, m = 1 / (Math.sqrt(_) + TT);
			for (let v = 0; v < r; ++v) {
				const w = v * a + d;
				s[w] = (s[w] - h) * m;
			}
		}
		const c = new BigInt64Array(n);
		return c.fill(1n, 0, r), {
			input_features: t.unsqueeze_(0),
			attention_mask: new V("int64", c, [1, n])
		};
	}
}, ET = class extends yp {
	_apply_dither(e) {
		const t = this.config.dither ?? 0;
		if (t <= 0) return e;
		const r = new la(e.length);
		for (let s = 0; s < e.length; ++s) e[s] += t * r.gauss();
		return e;
	}
	split_audio(e) {
		const t = this.config.max_audio_clip_s ?? 35, r = this.config.overlap_chunk_second ?? 5, s = this.config.min_energy_window_samples ?? 1600, n = this.config.sampling_rate, a = Math.max(1, Math.round(t * n)), o = Math.max(1, Math.round(r * n));
		if (e.length <= a) return [e];
		const i = [];
		let l = 0;
		const c = e.length;
		for (; l < c;) {
			if (l + a >= c) {
				i.push(e.slice(l, c));
				break;
			}
			const d = Math.max(l, l + a - o), h = Math.min(l + a, c);
			let _;
			h <= d ? _ = l + a : _ = this._find_split_point_energy(e, d, h, s), _ = Math.max(l + 1, Math.min(_, c)), i.push(e.slice(l, _)), l = _;
		}
		return i;
	}
	_find_split_point_energy(e, t, r, s) {
		const n = r - t;
		if (n <= s) return Math.floor((t + r) / 2);
		let a = Infinity, o = t;
		const i = n - s;
		for (let l = 0; l <= i; l += s) {
			let c = 0;
			for (let d = 0; d < s; ++d) {
				const h = e[t + l + d];
				c += h * h;
			}
			c = Math.sqrt(c / s), c < a && (a = c, o = t + l);
		}
		return o;
	}
	async _call(e) {
		st(e, "CohereAsrFeatureExtractor");
		const t = new Float64Array(e);
		return this._apply_dither(t), super._call(t);
	}
}, bp = class extends vp {}, Mp = class extends it {
	constructor(e) {
		super(e);
		const { fft_length: t, feature_size: r, min_frequency: s, max_frequency: n, sampling_rate: a, frame_length: o } = this.config, i = Qt(Math.floor(1 + t / 2), r, s, n, a, null, "htk", !1);
		this.mel_filters = i, this.window = ur(o, "hann");
	}
	async _extract_fbank_features(e, t) {
		return Jt(e, this.window, this.config.frame_length, this.config.hop_length, {
			fft_length: this.config.fft_length,
			center: !1,
			onesided: !0,
			preemphasis: this.config.preemphasis,
			preemphasis_htk_flavor: this.config.preemphasis_htk_flavor,
			mel_filters: this.mel_filters,
			log_mel: "log",
			mel_floor: this.config.mel_floor,
			remove_dc_offset: !1,
			transpose: !0
		});
	}
	async _call(e, { max_length: t = 48e4, truncation: r = !0, padding: s = !0, pad_to_multiple_of: n = 128 } = {}) {
		if (st(e, "Gemma3nAudioFeatureExtractor"), r && e.length > t && (e = e.slice(0, t)), s && e.length % n !== 0) {
			const i = n - e.length % n, l = new Float64Array(e.length + i);
			l.set(e), this.config.padding_value !== 0 && l.fill(this.config.padding_value, e.length), e = l;
		}
		const a = await this._extract_fbank_features(e, this.config.max_length), o = ot([1, a.dims[0]], !0);
		return {
			input_features: a.unsqueeze_(0),
			input_features_mask: o
		};
	}
}, xp = class extends Mp {
	async _extract_fbank_features(e, t) {
		const { frame_length: r, hop_length: s, fft_length: n } = this.config, a = Math.floor(r / 2), o = Math.floor((e.length + a - (r + 1)) / s) + 1;
		return Jt(e, this.window, r, s, {
			fft_length: n,
			center: !0,
			pad_mode: "semicausal",
			onesided: !0,
			preemphasis: this.config.preemphasis,
			preemphasis_htk_flavor: this.config.preemphasis_htk_flavor,
			mel_filters: this.mel_filters,
			log_mel: "log",
			mel_floor: this.config.mel_floor,
			mel_floor_mode: "add",
			remove_dc_offset: !1,
			transpose: !0,
			max_num_frames: o
		});
	}
	async _call(e, t = {}) {
		st(e, "Gemma4AudioFeatureExtractor");
		const r = e.length, s = await super._call(e, t), { input_features: n } = s, [, a, o] = n.dims, { frame_length: i, hop_length: l } = this.config, c = Math.floor(i / 2), d = i + 1, h = new Uint8Array(r + c + (t.pad_to_multiple_of ?? 128));
		h.fill(1, c, c + r);
		const _ = new Uint8Array(a);
		for (let v = 0; v < a; ++v) _[v] = h[v * l + d - 1] ? 1 : 0;
		const m = n.data;
		for (let v = 0; v < a; ++v) _[v] || m.fill(0, v * o, (v + 1) * o);
		return s.input_features_mask = new V("bool", _, [1, a]), s;
	}
}, AT = class extends it {
	constructor(e) {
		super(e);
		const { n_fft: t, win_length: r, n_mels: s, sample_rate: n } = e.melspec_kwargs;
		this.mel_filters = Qt(Math.floor(1 + t / 2), s, 0, n / 2, n, null, "htk");
		const a = ur(r, "hann");
		this.window = new Float64Array(t);
		const o = Math.floor((t - r) / 2);
		this.window.set(a, o);
	}
	async _call(e) {
		st(e, "GraniteSpeechFeatureExtractor");
		const { n_fft: t, hop_length: r, n_mels: s } = this.config.melspec_kwargs, n = 1 + Math.floor((e.length - 1) / r), a = n - n % 2;
		return { input_features: (await Jt(e, this.window, t, r, {
			power: 2,
			mel_filters: this.mel_filters,
			log_mel: "log10_max_norm",
			transpose: !0,
			max_num_frames: a,
			do_pad: !1
		})).view(-1, 2 * s).unsqueeze_(0) };
	}
}, CT = class extends it {
	async _call(e) {
		st(e, "MoonshineFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
		const t = [1, e.length];
		return { input_values: new V("float32", e, t) };
	}
}, kp = class extends it {
	async _call(e) {
		st(e, "PyAnnoteFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
		const t = [
			1,
			1,
			e.length
		];
		return { input_values: new V("float32", e, t) };
	}
	samples_to_frames(e) {
		return (e - this.config.offset) / this.config.step;
	}
	post_process_speaker_diarization(e, t) {
		const r = t / this.samples_to_frames(t) / this.config.sampling_rate, s = [];
		for (const n of e.tolist()) {
			const a = [];
			let o = -1;
			for (let i = 0; i < n.length; ++i) {
				const [l, c] = $e(rt(n[i])), [d, h] = [i, i + 1];
				c !== o ? (o = c, a.push({
					id: c,
					start: d,
					end: h,
					score: l
				})) : (a.at(-1).end = h, a.at(-1).score += l);
			}
			s.push(a.map(({ id: i, start: l, end: c, score: d }) => ({
				id: i,
				start: l * r,
				end: c * r,
				confidence: d / (c - l)
			})));
		}
		return s;
	}
}, ST = class extends it {
	constructor(e) {
		super(e);
		const t = this.config.sampling_rate, r = Qt(257, this.config.num_mel_bins, 20, Math.floor(t / 2), t, null, "kaldi", !0);
		this.mel_filters = r, this.window = ur(400, "povey", { periodic: !1 });
	}
	async _extract_fbank_features(e, t) {
		return e = e.map((r) => r * 32768), Jt(e, this.window, 400, 160, {
			fft_length: 512,
			power: 2,
			center: !1,
			preemphasis: .97,
			mel_filters: this.mel_filters,
			log_mel: "log",
			mel_floor: 1.192092955078125e-7,
			remove_dc_offset: !0,
			max_num_frames: t,
			transpose: !0
		});
	}
	async _call(e, { padding: t = !0, pad_to_multiple_of: r = 2, do_normalize_per_mel_bins: s = !0, return_attention_mask: n = !0 } = {}) {
		st(e, "SeamlessM4TFeatureExtractor");
		let a = await this._extract_fbank_features(e, this.config.max_length);
		if (s) {
			const [_, m] = a.dims, v = a.data;
			for (let w = 0; w < m; ++w) {
				let b = 0;
				for (let k = 0; k < _; ++k) b += v[k * m + w];
				const M = b / _;
				let E = 0;
				for (let k = 0; k < _; ++k) E += (v[k * m + w] - M) ** 2;
				E /= _ - 1;
				const A = Math.sqrt(E + 1e-7);
				for (let k = 0; k < _; ++k) {
					const C = k * m + w;
					v[C] = (v[C] - M) / A;
				}
			}
		}
		let o;
		if (t) {
			const [_, m] = a.dims, v = a.data, w = _ % r;
			if (w > 0) {
				const b = new Float32Array(m * (_ + w));
				b.set(v), b.fill(this.config.padding_value, v.length);
				const M = _ + w;
				a = new V(a.type, b, [M, m]), n && (o = new V("int64", new BigInt64Array(M), [1, M]), o.data.fill(1n, 0, _));
			}
		}
		const [i, l] = a.dims, c = this.config.stride;
		if (i % c !== 0) throw new Error(`The number of frames (${i}) must be a multiple of the stride (${c}).`);
		const d = a.view(1, Math.floor(i / c), l * c), h = { input_features: d };
		if (n) {
			const _ = d.dims[1], m = new BigInt64Array(_);
			if (o) {
				const v = o.data;
				for (let w = 1, b = 0; w < i; w += c, ++b) m[b] = v[w];
			} else m.fill(1n);
			h.attention_mask = new V("int64", m, [1, _]);
		}
		return h;
	}
}, PT = class extends bp {}, FT = class extends it {}, LT = class extends it {
	_zero_mean_unit_var_norm(e) {
		const t = e.reduce((s, n) => s + n, 0) / e.length, r = e.reduce((s, n) => s + (n - t) ** 2, 0) / e.length;
		return e.map((s) => (s - t) / Math.sqrt(r + 1e-7));
	}
	async _call(e) {
		st(e, "Wav2Vec2FeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
		let t = e;
		this.config.do_normalize && (t = this._zero_mean_unit_var_norm(t));
		const r = [1, t.length];
		return {
			input_values: new V("float32", t, r),
			attention_mask: new V("int64", new BigInt64Array(t.length).fill(1n), r)
		};
	}
}, IT = class extends it {
	constructor(e) {
		super(e);
		const t = this.config.sampling_rate, r = Qt(257, this.config.num_mel_bins, 20, Math.floor(t / 2), t, null, "kaldi", !0);
		this.mel_filters = r, this.window = ur(400, "hamming", { periodic: !1 }), this.min_num_frames = this.config.min_num_frames;
	}
	async _extract_fbank_features(e) {
		return e = e.map((t) => t * 32768), Jt(e, this.window, 400, 160, {
			fft_length: 512,
			power: 2,
			center: !1,
			preemphasis: .97,
			mel_filters: this.mel_filters,
			log_mel: "log",
			mel_floor: 1.192092955078125e-7,
			remove_dc_offset: !0,
			transpose: !0,
			min_num_frames: this.min_num_frames
		});
	}
	async _call(e) {
		st(e, "WeSpeakerFeatureExtractor");
		const t = (await this._extract_fbank_features(e)).unsqueeze_(0);
		if (this.config.fbank_centering_span === null) {
			const r = t.mean(1).data, s = t.data, [n, a, o] = t.dims;
			for (let i = 0; i < n; ++i) {
				const l = i * a * o, c = i * o;
				for (let d = 0; d < a; ++d) {
					const h = l + d * o;
					for (let _ = 0; _ < o; ++_) s[h + _] -= r[c + _];
				}
			}
		}
		return { input_features: t };
	}
}, OT = class extends it {
	constructor(e) {
		super(e), this.config.mel_filters ??= Qt(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, 8e3, this.config.sampling_rate, "slaney", "slaney"), this.window = ur(this.config.n_fft, "hann");
	}
	async _extract_fbank_features(e, { center: t = !0 } = {}) {
		const { n_fft: r, hop_length: s, mel_filters: n, global_log_mel_max: a } = this.config, o = Math.floor(t ? e.length / s : (e.length - r) / s);
		return await Jt(e, this.window, r, s, {
			power: 2,
			mel_filters: n,
			log_mel: "log10_max_norm",
			max_log_mel: a,
			center: t,
			max_num_frames: o,
			do_pad: !1
		});
	}
	async _call(e, { center: t = !0 } = {}) {
		return st(e, "VoxtralRealtimeFeatureExtractor"), { input_features: (await this._extract_fbank_features(e, { center: t })).unsqueeze_(0) };
	}
}, NT = class extends it {
	constructor(e) {
		super(e), this.config.mel_filters ??= Qt(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, 8e3, this.config.sampling_rate, "slaney", "slaney"), this.window = ur(this.config.n_fft, "hann");
	}
	async _extract_fbank_features(e) {
		return await Jt(e, this.window, this.config.n_fft, this.config.hop_length, {
			power: 2,
			mel_filters: this.config.mel_filters,
			log_mel: "log10_max_norm",
			max_num_frames: Math.min(Math.floor(e.length / this.config.hop_length), this.config.nb_max_frames)
		});
	}
	async _call(e, { max_length: t = null } = {}) {
		st(e, "WhisperFeatureExtractor");
		let r;
		const s = t ?? this.config.n_samples;
		return e.length > s ? (e.length > this.config.n_samples && oe.warn("Attempting to extract features for audio longer than 30 seconds. If using a pipeline to extract transcript from a long audio clip, remember to specify `chunk_length_s` and/or `stride_length_s`."), r = e.slice(0, s)) : (r = new Float32Array(s), r.set(e)), { input_features: (await this._extract_fbank_features(r)).unsqueeze_(0) };
	}
}, Et = class {
	static async from_pretrained(e, t = {}) {
		const r = await Yt(e, zi, !0, t), s = r.feature_extractor_type, n = Bi[s];
		if (!n) throw new Error(`Unknown feature_extractor_type: '${s}'. Please report this at ${ca}.`);
		return new n(r);
	}
}, DT = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e, t = null) {
		const r = this.tokenizer(e), s = t ? await this.feature_extractor(t) : {};
		return {
			...r,
			...s
		};
	}
}, zT = /* @__PURE__ */ new Set(["ja", "zh"]), BT = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	static uses_processor_config = !0;
	get_decoder_prompt_ids(e = "en") {
		const t = [
			"▁",
			"<|startofcontext|>",
			"<|startoftranscript|>",
			"<|emo:undefined|>",
			`<|${e}|>`,
			`<|${e}|>`,
			"<|pnc|>",
			"<|noitn|>",
			"<|notimestamp|>",
			"<|nodiarize|>"
		];
		return this.tokenizer.convert_tokens_to_ids(t);
	}
	static join_chunks(e, t = "en") {
		const r = e.filter((n) => n && n.trim());
		if (r.length === 0) return "";
		const s = zT.has(t) ? "" : " ";
		return [r[0].trimEnd(), ...r.slice(1).map((n) => n.trim())].join(s);
	}
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, Zo = {}, Fr, Tp, vr;
if (ce.IS_WEB_ENV) Fr = (e, t) => {
	if (!self.OffscreenCanvas) throw new Error("OffscreenCanvas not supported by this environment.");
	return new self.OffscreenCanvas(e, t);
}, vr = self.createImageBitmap, Tp = self.ImageData;
else if (Zo) vr = async (e) => {
	const t = (await e.metadata()).channels, { data: r, info: s } = await e.rotate().raw().toBuffer({ resolveWithObject: !0 }), n = new Nt(new Uint8ClampedArray(r), s.width, s.height, s.channels);
	return t !== void 0 && t !== s.channels && n.convert(t), n;
};
else throw new Error("Unable to load image processing library.");
var RT = {
	0: "nearest",
	1: "lanczos",
	2: "bilinear",
	3: "bicubic",
	4: "box",
	5: "hamming"
}, GT = /* @__PURE__ */ new Map([
	["png", "image/png"],
	["jpg", "image/jpeg"],
	["jpeg", "image/jpeg"],
	["gif", "image/gif"]
]), Nt = class qt {
	constructor(t, r, s, n) {
		this.data = t, this.width = r, this.height = s, this.channels = n;
	}
	get size() {
		return [this.width, this.height];
	}
	static async read(t) {
		if (t instanceof qt) return t;
		if (typeof t == "string" || t instanceof URL) return await this.fromURL(t);
		if (t instanceof Blob) return await this.fromBlob(t);
		if (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas) return this.fromCanvas(t);
		throw new Error(`Unsupported input type: ${typeof t}`);
	}
	static fromCanvas(t) {
		if (!ce.IS_WEB_ENV) throw new Error("fromCanvas() is only supported in browser environments.");
		const r = t.getContext("2d").getImageData(0, 0, t.width, t.height).data;
		return new qt(r, t.width, t.height, 4);
	}
	static async fromURL(t) {
		const r = await Ys(t);
		if (r.status !== 200) throw new Error(`Unable to read image from "${t}" (${r.status} ${r.statusText})`);
		const s = await r.blob();
		return this.fromBlob(s);
	}
	static async fromBlob(t) {
		if (ce.IS_WEB_ENV) {
			const r = await vr(t), s = Fr(r.width, r.height).getContext("2d");
			return s.drawImage(r, 0, 0), new this(s.getImageData(0, 0, r.width, r.height).data, r.width, r.height, 4);
		} else {
			const r = Zo(await t.arrayBuffer());
			return await vr(r);
		}
	}
	static fromTensor(t, r = "CHW") {
		if (t.dims.length !== 3) throw new Error(`Tensor should have 3 dimensions, but has ${t.dims.length} dimensions.`);
		if (r === "CHW") t = t.transpose(1, 2, 0);
		else if (r !== "HWC") throw new Error(`Unsupported channel format: ${r}`);
		if (!(t.data instanceof Uint8ClampedArray || t.data instanceof Uint8Array)) throw new Error(`Unsupported tensor type: ${t.type}`);
		switch (t.dims[2]) {
			case 1:
			case 2:
			case 3:
			case 4: return new qt(t.data, t.dims[1], t.dims[0], t.dims[2]);
			default: throw new Error(`Unsupported number of channels: ${t.dims[2]}`);
		}
	}
	grayscale() {
		if (this.channels === 1) return this;
		const t = new Uint8ClampedArray(this.width * this.height * 1);
		switch (this.channels) {
			case 3:
			case 4:
				for (let r = 0, s = 0; r < this.data.length; r += this.channels) {
					const n = this.data[r], a = this.data[r + 1], o = this.data[r + 2];
					t[s++] = Math.round(.2989 * n + .587 * a + .114 * o);
				}
				break;
			default: throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
		}
		return this._update(t, this.width, this.height, 1);
	}
	rgb() {
		if (this.channels === 3) return this;
		const t = new Uint8ClampedArray(this.width * this.height * 3);
		switch (this.channels) {
			case 1:
				for (let r = 0, s = 0; r < this.data.length; ++r) t[s++] = this.data[r], t[s++] = this.data[r], t[s++] = this.data[r];
				break;
			case 4:
				for (let r = 0, s = 0; r < this.data.length; r += 4) t[s++] = this.data[r], t[s++] = this.data[r + 1], t[s++] = this.data[r + 2];
				break;
			default: throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
		}
		return this._update(t, this.width, this.height, 3);
	}
	rgba() {
		if (this.channels === 4) return this;
		const t = new Uint8ClampedArray(this.width * this.height * 4);
		switch (this.channels) {
			case 1:
				for (let r = 0, s = 0; r < this.data.length; ++r) t[s++] = this.data[r], t[s++] = this.data[r], t[s++] = this.data[r], t[s++] = 255;
				break;
			case 3:
				for (let r = 0, s = 0; r < this.data.length; r += 3) t[s++] = this.data[r], t[s++] = this.data[r + 1], t[s++] = this.data[r + 2], t[s++] = 255;
				break;
			default: throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
		}
		return this._update(t, this.width, this.height, 4);
	}
	putAlpha(t) {
		if (t.width !== this.width || t.height !== this.height) throw new Error(`Expected mask size to be ${this.width}x${this.height}, but got ${t.width}x${t.height}`);
		if (t.channels !== 1) throw new Error(`Expected mask to have 1 channel, but got ${t.channels}`);
		const r = this.data, s = t.data, n = this.width * this.height;
		if (this.channels === 3) {
			const a = new Uint8ClampedArray(n * 4);
			for (let o = 0, i = 0, l = 0; o < n; ++o) a[l++] = r[i++], a[l++] = r[i++], a[l++] = r[i++], a[l++] = s[o];
			return this._update(a, this.width, this.height, 4);
		} else if (this.channels === 4) {
			for (let a = 0; a < n; ++a) r[4 * a + 3] = s[a];
			return this;
		}
		throw new Error(`Expected image to have 3 or 4 channels, but got ${this.channels}`);
	}
	async resize(t, r, { resample: s = 2 } = {}) {
		if (this.width === t && this.height === r) return this;
		let n = RT[s] ?? s;
		const a = Oh(t), o = Oh(r);
		if (a && o) return this;
		if (a ? t = r / this.height * this.width : o && (r = t / this.width * this.height), ce.IS_WEB_ENV) {
			const i = this.channels, l = this.toCanvas(), c = Fr(t, r).getContext("2d");
			return c.drawImage(l, 0, 0, t, r), new qt(c.getImageData(0, 0, t, r).data, t, r, 4).convert(i);
		} else {
			let i = this.toSharp();
			switch (n) {
				case "box":
				case "hamming": (n === "box" || n === "hamming") && (oe.warn(`Resampling method ${n} is not yet supported. Using bilinear instead.`), n = "bilinear");
				case "nearest":
				case "bilinear":
				case "bicubic":
					i = i.affine([
						t / this.width,
						0,
						0,
						r / this.height
					], { interpolator: n });
					break;
				case "lanczos":
					i = i.resize({
						width: t,
						height: r,
						fit: "fill",
						kernel: "lanczos3"
					});
					break;
				default: throw new Error(`Resampling method ${n} is not supported.`);
			}
			return await vr(i);
		}
	}
	async pad([t, r, s, n]) {
		if (t = Math.max(t, 0), r = Math.max(r, 0), s = Math.max(s, 0), n = Math.max(n, 0), t === 0 && r === 0 && s === 0 && n === 0) return this;
		if (ce.IS_WEB_ENV) {
			const a = this.channels, o = this.toCanvas(), i = this.width + t + r, l = this.height + s + n, c = Fr(i, l).getContext("2d");
			return c.drawImage(o, 0, 0, this.width, this.height, t, s, this.width, this.height), new qt(c.getImageData(0, 0, i, l).data, i, l, 4).convert(a);
		} else {
			const a = this.toSharp().extend({
				left: t,
				right: r,
				top: s,
				bottom: n
			});
			return await vr(a);
		}
	}
	async crop([t, r, s, n]) {
		if (t = Math.max(t, 0), r = Math.max(r, 0), s = Math.min(s, this.width - 1), n = Math.min(n, this.height - 1), t === 0 && r === 0 && s === this.width - 1 && n === this.height - 1) return this;
		const a = s - t + 1, o = n - r + 1;
		if (ce.IS_WEB_ENV) {
			const i = this.channels, l = this.toCanvas(), c = Fr(a, o).getContext("2d");
			return c.drawImage(l, t, r, a, o, 0, 0, a, o), new qt(c.getImageData(0, 0, a, o).data, a, o, 4).convert(i);
		} else {
			const i = this.toSharp().extract({
				left: t,
				top: r,
				width: a,
				height: o
			});
			return await vr(i);
		}
	}
	async center_crop(t, r) {
		if (this.width === t && this.height === r) return this;
		const s = (this.width - t) / 2, n = (this.height - r) / 2;
		if (ce.IS_WEB_ENV) {
			const a = this.channels, o = this.toCanvas(), i = Fr(t, r).getContext("2d");
			let l = 0, c = 0, d = 0, h = 0;
			return s >= 0 ? l = s : d = -s, n >= 0 ? c = n : h = -n, i.drawImage(o, l, c, t, r, d, h, t, r), new qt(i.getImageData(0, 0, t, r).data, t, r, 4).convert(a);
		} else {
			let a = this.toSharp();
			if (s >= 0 && n >= 0) a = a.extract({
				left: Math.floor(s),
				top: Math.floor(n),
				width: t,
				height: r
			});
			else if (s <= 0 && n <= 0) {
				const o = Math.floor(-n), i = Math.floor(-s);
				a = a.extend({
					top: o,
					left: i,
					right: t - this.width - i,
					bottom: r - this.height - o
				});
			} else {
				let o = [0, 0], i = 0;
				n < 0 ? (o[0] = Math.floor(-n), o[1] = r - this.height - o[0]) : i = Math.floor(n);
				let l = [0, 0], c = 0;
				s < 0 ? (l[0] = Math.floor(-s), l[1] = t - this.width - l[0]) : c = Math.floor(s), a = a.extend({
					top: o[0],
					bottom: o[1],
					left: l[0],
					right: l[1]
				}).extract({
					left: c,
					top: i,
					width: t,
					height: r
				});
			}
			return await vr(a);
		}
	}
	async toBlob(t = "image/png", r = 1) {
		if (!ce.IS_WEB_ENV) throw new Error("toBlob() is only supported in browser environments.");
		return await this.toCanvas().convertToBlob({
			type: t,
			quality: r
		});
	}
	toTensor(t = "CHW") {
		let r = new V("uint8", new Uint8Array(this.data), [
			this.height,
			this.width,
			this.channels
		]);
		if (t !== "HWC") if (t === "CHW") r = r.permute(2, 0, 1);
		else throw new Error(`Unsupported channel format: ${t}`);
		return r;
	}
	toCanvas() {
		if (!ce.IS_WEB_ENV) throw new Error("toCanvas() is only supported in browser environments.");
		const t = this.clone().rgba(), r = Fr(t.width, t.height), s = new Tp(t.data, t.width, t.height);
		return r.getContext("2d").putImageData(s, 0, 0), r;
	}
	split() {
		const { data: t, width: r, height: s, channels: n } = this, a = t.constructor, o = t.length / n, i = Array.from({ length: n }, () => new a(o));
		for (let l = 0; l < o; ++l) {
			const c = n * l;
			for (let d = 0; d < n; ++d) i[d][l] = t[c + d];
		}
		return i.map((l) => new qt(l, r, s, 1));
	}
	_update(t, r, s, n = null) {
		return this.data = t, this.width = r, this.height = s, n !== null && (this.channels = n), this;
	}
	clone() {
		return new qt(this.data.slice(), this.width, this.height, this.channels);
	}
	convert(t) {
		if (this.channels === t) return this;
		switch (t) {
			case 1:
				this.grayscale();
				break;
			case 3:
				this.rgb();
				break;
			case 4:
				this.rgba();
				break;
			default: throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
		}
		return this;
	}
	async save(t) {
		if (ce.IS_WEB_ENV) {
			if (ce.IS_WEBWORKER_ENV) throw new Error("Unable to save an image from a Web Worker.");
			const r = t.split(".").pop().toLowerCase(), s = GT.get(r) ?? "image/png";
			return mp(t, await this.toBlob(s));
		} else if (ce.IS_FS_AVAILABLE) await this.toSharp().toFile(t);
		else throw new Error("Unable to save the image because filesystem is disabled in this environment.");
	}
	toSharp() {
		if (ce.IS_WEB_ENV) throw new Error("toSharp() is only supported in server-side environments.");
		return Zo(this.data, { raw: {
			width: this.width,
			height: this.height,
			channels: this.channels
		} });
	}
};
Nt.read.bind(Nt);
function mf(e, t, r = 0, s = null) {
	const n = e / t;
	let a = V1(n) * t;
	return s !== null && a > s && (a = Math.floor(n) * t), a < r && (a = Math.ceil(n) * t), a;
}
function gf([e, t], r) {
	return [Math.max(Math.floor(e / r), 1) * r, Math.max(Math.floor(t / r), 1) * r];
}
function Ep([e, t, r, s]) {
	return [
		e - r / 2,
		t - s / 2,
		e + r / 2,
		t + s / 2
	];
}
function ua(e, t = .5, r = null, s = !1) {
	const n = e.logits, a = e.pred_boxes, [o, i, l] = n.dims;
	if (r !== null && r.length !== o) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
	let c = [];
	for (let d = 0; d < o; ++d) {
		let h = r !== null ? r[d] : null, _ = {
			boxes: [],
			classes: [],
			scores: []
		}, m = n[d], v = a[d];
		for (let w = 0; w < i; ++w) {
			let b = m[w], M = [], E;
			if (s) {
				E = b.sigmoid().data;
				for (let A = 0; A < E.length; ++A) E[A] > t && M.push(A);
			} else {
				let A = $e(b.data)[1];
				if (A === l - 1 || (E = rt(b.data), E[A] < t)) continue;
				M.push(A);
			}
			for (const A of M) {
				let k = v[w].data;
				k = Ep(k), h !== null && (k = k.map((C, O) => C * h[(O + 1) % 2])), _.boxes.push(k), _.classes.push(A), _.scores.push(E[A]);
			}
		}
		c.push(_);
	}
	return c;
}
function Ap(e, t = null) {
	const r = e.logits, s = r.dims[0];
	if (t !== null && t.length !== s) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
	const n = [];
	for (let a = 0; a < s; ++a) {
		const o = t !== null ? t[a] : null;
		let i = r[a];
		o !== null && (i = np(i, o, "bilinear", !1));
		const [l, c] = o ?? i.dims.slice(-2), d = new V("int32", new Int32Array(l * c), [l, c]), h = i[0].data, _ = d.data;
		for (let w = 1; w < i.dims[0]; ++w) {
			const b = i[w].data;
			for (let M = 0; M < b.length; ++M) b[M] > h[M] && (h[M] = b[M], _[M] = w);
		}
		const m = new Array(i.dims[0]);
		for (let w = 0; w < _.length; ++w) {
			const b = _[w];
			m[b] = b;
		}
		const v = m.filter((w) => w !== void 0);
		n.push({
			segmentation: d,
			labels: v
		});
	}
	return n;
}
function $T(e, t, r, s) {
	const n = [], a = [], o = [];
	for (let i = 0; i < e.dims[0]; ++i) {
		const l = e[i], c = t[i], d = $e(l.data)[1];
		if (d === s) continue;
		const h = rt(l.data)[d];
		h > r && (n.push(c), a.push(h), o.push(d));
	}
	return [
		n,
		a,
		o
	];
}
function VT(e, t, r, s = .5, n = .8) {
	const a = [];
	let o = 0, i = 0;
	const l = t[r].data;
	for (let d = 0; d < e.length; ++d) e[d] === r && (a.push(d), ++o), l[d] >= s && ++i;
	let c = o > 0 && i > 0;
	return c && (c = o / i > n), [c, a];
}
function UT(e, t, r, s, n, a = null, o = null) {
	const [i, l] = o ?? e[0].dims, c = new V("int32", new Int32Array(i * l), [i, l]), d = [];
	if (o !== null) for (let w = 0; w < e.length; ++w) e[w] = np(e[w], o, "bilinear", !1);
	const h = new Int32Array(e[0].data.length), _ = new Float32Array(e[0].data.length);
	for (let w = 0; w < e.length; ++w) {
		let b = t[w];
		const M = e[w].data;
		for (let E = 0; E < M.length; ++E) M[E] *= b, M[E] > _[E] && (h[E] = w, _[E] = M[E]);
	}
	let m = 0;
	const v = c.data;
	for (let w = 0; w < r.length; ++w) {
		const b = r[w], [M, E] = VT(h, e, w, s, n);
		if (M) {
			++m;
			for (const A of E) v[A] = m;
			d.push({
				id: m,
				label_id: b,
				score: t[w]
			});
		}
	}
	return [c, d];
}
function Ri(e, t, r = 28, s = 3136, n = 784 * 1280, a = 1) {
	if (e < r || t < r) {
		const l = Math.max(r / e, r / t);
		e = Math.round(e * l), t = Math.round(t * l);
	}
	if (Math.max(e, t) / Math.min(e, t) > 200) throw new Error(`absolute aspect ratio must be smaller than 200, got ${Math.max(e, t) / Math.min(e, t)}`);
	let o = Math.round(e / r) * r, i = Math.round(t / r) * r;
	if (a * o * i > n) {
		const l = Math.sqrt(a * e * t / n);
		o = Math.max(r, Math.floor(e / l / r) * r), i = Math.max(r, Math.floor(t / l / r) * r);
	} else if (a * o * i < s) {
		const l = Math.sqrt(s / (a * e * t));
		o = Math.ceil(e * l / r) * r, i = Math.ceil(t * l / r) * r;
	}
	return [i, o];
}
function Cp(e, t = .5, r = .5, s = .8, n = null, a = null) {
	n === null && (oe.warn("`label_ids_to_fuse` unset. No instance will be fused."), n = /* @__PURE__ */ new Set());
	const o = e.class_queries_logits ?? e.logits, i = (e.masks_queries_logits ?? e.pred_masks).sigmoid();
	let [l, c, d] = o.dims;
	if (d -= 1, a !== null && a.length !== l) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
	let h = [];
	for (let _ = 0; _ < l; ++_) {
		let m = a !== null ? a[_] : null, v = o[_], w = i[_], [b, M, E] = $T(v, w, t, d);
		if (E.length === 0) {
			let [C, O] = m ?? w.dims.slice(-2), x = new V("int32", new Int32Array(C * O).fill(-1), [C, O]);
			h.push({
				segmentation: x,
				segments_info: []
			});
			continue;
		}
		let [A, k] = UT(b, M, E, r, s, n, m);
		h.push({
			segmentation: A,
			segments_info: k
		});
	}
	return h;
}
function Sp(e, t = .5, r = null) {
	throw new Error("`post_process_instance_segmentation` is not yet implemented.");
}
var ie = class extends _t {
	constructor(e) {
		super(), this.image_mean = e.image_mean ?? e.mean, this.image_std = e.image_std ?? e.std, this.resample = e.resample ?? 2, this.do_rescale = e.do_rescale ?? !0, this.rescale_factor = e.rescale_factor ?? 1 / 255, this.do_normalize = e.do_normalize, this.do_thumbnail = e.do_thumbnail, this.size = e.size ?? e.image_size, this.do_resize = e.do_resize ?? this.size !== void 0, this.size_divisibility = e.size_divisibility ?? e.size_divisor, this.do_center_crop = e.do_center_crop, this.crop_size = e.crop_size, this.do_convert_rgb = e.do_convert_rgb ?? !0, this.do_crop_margin = e.do_crop_margin, this.pad_size = e.pad_size, this.do_pad = e.do_pad, this.min_pixels = e.min_pixels, this.max_pixels = e.max_pixels, this.do_pad && !this.pad_size && !this.size_divisibility && this.size && this.size.width !== void 0 && this.size.height !== void 0 && (this.pad_size = this.size), this.do_flip_channel_order = e.do_flip_channel_order ?? !1, this.config = e;
	}
	async thumbnail(e, t, r = 2) {
		const s = e.height, n = e.width, a = t.height, o = t.width;
		let i = Math.min(s, a), l = Math.min(n, o);
		return i === s && l === n ? e : (s > n ? l = Math.floor(n * i / s) : n > s && (i = Math.floor(s * l / n)), await e.resize(l, i, { resample: r }));
	}
	async crop_margin(e, t = 200) {
		const r = e.clone().grayscale(), s = Xo(r.data)[0], n = $e(r.data)[0] - s;
		if (n === 0) return e;
		const a = t / 255;
		let o = r.width, i = r.height, l = 0, c = 0;
		const d = r.data;
		for (let h = 0; h < r.height; ++h) {
			const _ = h * r.width;
			for (let m = 0; m < r.width; ++m) (d[_ + m] - s) / n < a && (o = Math.min(o, m), i = Math.min(i, h), l = Math.max(l, m), c = Math.max(c, h));
		}
		return e = await e.crop([
			o,
			i,
			l,
			c
		]), e;
	}
	pad_image(e, t, r, { mode: s = "constant", center: n = !1, constant_values: a = 0 } = {}) {
		const [o, i, l] = t;
		let c, d;
		if (typeof r == "number" ? (c = r, d = r) : r === "square" ? c = d = Math.max(o, i) : (c = r.width, d = r.height), c !== i || d !== o) {
			const h = new Float32Array(c * d * l);
			if (Array.isArray(a)) for (let v = 0; v < h.length; ++v) h[v] = a[v % l];
			else a !== 0 && h.fill(a);
			const [_, m] = n ? [Math.floor((c - i) / 2), Math.floor((d - o) / 2)] : [0, 0];
			for (let v = 0; v < o; ++v) {
				const w = (v + m) * c, b = v * i;
				for (let M = 0; M < i; ++M) {
					const E = (w + M + _) * l, A = (b + M) * l;
					for (let k = 0; k < l; ++k) h[E + k] = e[A + k];
				}
			}
			if (s === "symmetric") {
				if (n) throw new Error("`center` padding is not supported when `mode` is set to `symmetric`.");
				const v = o - 1, w = i - 1;
				for (let b = 0; b < d; ++b) {
					const M = b * c, E = Yn(b, v) * i;
					for (let A = 0; A < c; ++A) {
						if (b < o && A < i) continue;
						const k = (M + A) * l, C = (E + Yn(A, w)) * l;
						for (let O = 0; O < l; ++O) h[k + O] = e[C + O];
					}
				}
			}
			e = h, t = [
				d,
				c,
				l
			];
		}
		return [e, t];
	}
	rescale(e) {
		for (let t = 0; t < e.length; ++t) e[t] = this.rescale_factor * e[t];
	}
	get_resize_output_image_size(e, t) {
		const [r, s] = e.size;
		let n, a;
		if (this.do_thumbnail) {
			const { height: o, width: i } = t;
			n = Math.min(o, i);
		} else Number.isInteger(t) ? (n = t, a = this.config.max_size ?? n) : t !== void 0 && (n = t.shortest_edge, a = t.longest_edge);
		if (n !== void 0 || a !== void 0) {
			const o = n === void 0 ? 1 : Math.max(n / r, n / s), i = r * o, l = s * o, c = a === void 0 ? 1 : Math.min(a / i, a / l);
			let d = Math.floor(Number((i * c).toFixed(2))), h = Math.floor(Number((l * c).toFixed(2)));
			return this.size_divisibility !== void 0 && ([d, h] = gf([d, h], this.size_divisibility)), [d, h];
		} else if (t !== void 0 && t.width !== void 0 && t.height !== void 0) {
			let o = t.width, i = t.height;
			if (this.config.keep_aspect_ratio && this.config.ensure_multiple_of) {
				let l = i / s, c = o / r;
				Math.abs(1 - c) < Math.abs(1 - l) ? l = c : c = l, i = mf(l * s, this.config.ensure_multiple_of), o = mf(c * r, this.config.ensure_multiple_of);
			}
			return [o, i];
		} else {
			if (this.size_divisibility !== void 0) return gf([r, s], this.size_divisibility);
			throw new Error(`Could not resize image due to unsupported \`this.size\` option in config: ${JSON.stringify(t)}`);
		}
	}
	async resize(e) {
		const [t, r] = this.get_resize_output_image_size(e, this.size);
		return await e.resize(t, r, { resample: this.resample });
	}
	async preprocess(e, { do_normalize: t = null, do_pad: r = null, do_convert_rgb: s = null, do_convert_grayscale: n = null, do_flip_channel_order: a = null } = {}) {
		this.do_crop_margin && (e = await this.crop_margin(e));
		const [o, i] = e.size;
		if (s ?? this.do_convert_rgb ? e = e.rgb() : n && (e = e.grayscale()), this.do_resize && (e = await this.resize(e)), this.do_thumbnail && (e = await this.thumbnail(e, this.size, this.resample)), this.do_center_crop) {
			let _, m;
			Number.isInteger(this.crop_size) ? (_ = this.crop_size, m = this.crop_size) : (_ = this.crop_size.width, m = this.crop_size.height), e = await e.center_crop(_, m);
		}
		const l = [e.height, e.width];
		let c = Float32Array.from(e.data), d = [
			e.height,
			e.width,
			e.channels
		];
		if (this.do_rescale && this.rescale(c), t ?? this.do_normalize) {
			let _ = this.image_mean;
			Array.isArray(this.image_mean) || (_ = new Array(e.channels).fill(_));
			let m = this.image_std;
			if (Array.isArray(this.image_std) || (m = new Array(e.channels).fill(m)), _.length !== e.channels || m.length !== e.channels) throw new Error(`When set to arrays, the length of \`image_mean\` (${_.length}) and \`image_std\` (${m.length}) must match the number of channels in the image (${e.channels}).`);
			for (let v = 0; v < c.length; v += e.channels) for (let w = 0; w < e.channels; ++w) c[v + w] = (c[v + w] - _[w]) / m[w];
		}
		if (r ?? this.do_pad) {
			if (this.pad_size) [c, d] = this.pad_image(c, [
				e.height,
				e.width,
				e.channels
			], this.pad_size);
			else if (this.size_divisibility) {
				const _ = Math.ceil(d[1] / this.size_divisibility) * this.size_divisibility, m = Math.ceil(d[0] / this.size_divisibility) * this.size_divisibility;
				[c, d] = this.pad_image(c, d, {
					width: _,
					height: m
				});
			}
		}
		if (a ?? this.do_flip_channel_order) {
			if (d[2] !== 3) throw new Error("Flipping channel order is only supported for RGB images.");
			for (let _ = 0; _ < c.length; _ += 3) {
				const m = c[_];
				c[_] = c[_ + 2], c[_ + 2] = m;
			}
		}
		const h = new V("float32", c, d).permute(2, 0, 1);
		return {
			original_size: [i, o],
			reshaped_input_size: l,
			pixel_values: h
		};
	}
	async _call(e, ...t) {
		Array.isArray(e) || (e = [e]);
		const r = await Promise.all(e.map((s) => this.preprocess(s)));
		return {
			pixel_values: or(r.map((s) => s.pixel_values), 0),
			original_sizes: r.map((s) => s.original_size),
			reshaped_input_sizes: r.map((s) => s.reshaped_input_size)
		};
	}
	static async from_pretrained(e, t = {}) {
		const r = await Yt(e, Ks, !0, t);
		return new this(r);
	}
}, ta = {};
ds(ta, {
	BeitFeatureExtractor: () => jT,
	BitImageProcessor: () => qT,
	CHMv2ImageProcessor: () => HT,
	CLIPFeatureExtractor: () => QT,
	CLIPImageProcessor: () => Pp,
	ChineseCLIPFeatureExtractor: () => WT,
	ConvNextFeatureExtractor: () => XT,
	ConvNextImageProcessor: () => Fp,
	DINOv3ViTImageProcessor: () => KT,
	DPTFeatureExtractor: () => eE,
	DPTImageProcessor: () => Op,
	DeiTFeatureExtractor: () => YT,
	DeiTImageProcessor: () => Lp,
	DetrFeatureExtractor: () => JT,
	DetrImageProcessor: () => Ip,
	DonutFeatureExtractor: () => ZT,
	DonutImageProcessor: () => Gi,
	EfficientNetImageProcessor: () => tE,
	GLPNFeatureExtractor: () => oE,
	Gemma3ImageProcessor: () => rE,
	Gemma4ImageProcessor: () => Np,
	Glm46VImageProcessor: () => aE,
	GroundingDinoImageProcessor: () => iE,
	Idefics3ImageProcessor: () => wf,
	ImageFeatureExtractor: () => ie,
	ImageProcessor: () => ie,
	JinaCLIPImageProcessor: () => cE,
	Lfm2VlImageProcessor: () => _E,
	LlavaOnevisionImageProcessor: () => pE,
	Mask2FormerImageProcessor: () => gE,
	MaskFormerFeatureExtractor: () => mE,
	MaskFormerImageProcessor: () => $i,
	MobileNetV1FeatureExtractor: () => wE,
	MobileNetV1ImageProcessor: () => zp,
	MobileNetV2FeatureExtractor: () => vE,
	MobileNetV2ImageProcessor: () => Bp,
	MobileNetV3FeatureExtractor: () => yE,
	MobileNetV3ImageProcessor: () => Rp,
	MobileNetV4FeatureExtractor: () => bE,
	MobileNetV4ImageProcessor: () => Gp,
	MobileViTFeatureExtractor: () => ME,
	MobileViTImageProcessor: () => $p,
	NougatImageProcessor: () => xE,
	OwlViTFeatureExtractor: () => kE,
	OwlViTImageProcessor: () => Vi,
	Owlv2ImageProcessor: () => TE,
	Phi3VImageProcessor: () => AE,
	PixtralImageProcessor: () => CE,
	PvtImageProcessor: () => SE,
	Qwen2VLImageProcessor: () => Dp,
	RTDetrImageProcessor: () => PE,
	Sam2ImageProcessor: () => Bo,
	Sam3ImageProcessor: () => Bo,
	SamImageProcessor: () => Bo,
	SapiensFeatureExtractor: () => FE,
	SapiensImageProcessor: () => Vp,
	SegformerFeatureExtractor: () => LE,
	SegformerImageProcessor: () => Up,
	SiglipImageProcessor: () => IE,
	SmolVLMImageProcessor: () => wf,
	Swin2SRImageProcessor: () => OE,
	VLMImageProcessor: () => lE,
	ViTFeatureExtractor: () => NE,
	ViTImageProcessor: () => jp,
	VitMatteImageProcessor: () => DE,
	VitPoseImageProcessor: () => zE,
	YolosFeatureExtractor: () => BE,
	YolosImageProcessor: () => qp
});
var jT = class extends ie {}, qT = class extends ie {}, WT = class extends ie {}, HT = class extends ie {}, Pp = class extends ie {}, QT = class extends Pp {}, Fp = class extends ie {
	constructor(e) {
		super(e), this.crop_pct = this.config.crop_pct ?? 224 / 256;
	}
	async resize(e) {
		const t = this.size?.shortest_edge;
		if (t === void 0) throw new Error("Size dictionary must contain 'shortest_edge' key.");
		if (t < 384) {
			const r = Math.floor(t / this.crop_pct), [s, n] = this.get_resize_output_image_size(e, { shortest_edge: r });
			e = await e.resize(s, n, { resample: this.resample }), e = await e.center_crop(t, t);
		} else e = await e.resize(t, t, { resample: this.resample });
		return e;
	}
}, XT = class extends Fp {}, Lp = class extends ie {}, YT = class extends Lp {}, Ip = class extends ie {
	async _call(e) {
		const t = await super._call(e), r = ot([
			t.pixel_values.dims[0],
			64,
			64
		], 1n);
		return {
			...t,
			pixel_mask: r
		};
	}
	post_process_object_detection(...e) {
		return ua(...e);
	}
	post_process_panoptic_segmentation(...e) {
		return Cp(...e);
	}
	post_process_instance_segmentation(...e) {
		return Sp(...e);
	}
}, JT = class extends Ip {}, KT = class extends ie {}, Gi = class extends ie {
	pad_image(e, t, r, s = {}) {
		const [n, a, o] = t;
		let i = this.image_mean;
		Array.isArray(this.image_mean) || (i = new Array(o).fill(i));
		let l = this.image_std;
		Array.isArray(l) || (l = new Array(o).fill(i));
		const c = i.map((d, h) => -d / l[h]);
		return super.pad_image(e, t, r, {
			center: !0,
			constant_values: c,
			...s
		});
	}
}, ZT = class extends Gi {}, Op = class extends ie {}, eE = class extends Op {}, tE = class extends ie {
	constructor(e) {
		super(e), this.include_top = this.config.include_top ?? !0, this.include_top && (this.image_std = this.image_std.map((t) => t * t));
	}
}, rE = class extends ie {};
function sE(e, t, r, s, n) {
	const a = s * r ** 2, o = Math.sqrt(a / (e * t)), i = n * r;
	let l = Math.floor(o * e / i) * i, c = Math.floor(o * t / i) * i;
	if (l === 0 && c === 0) throw new Error(`Attempting to resize to a 0 x 0 image. Resized height should be divisible by \`pooling_kernel_size * patch_size\`=${i}.`);
	const d = Math.floor(s / n ** 2) * i;
	return l === 0 ? (l = i, c = Math.min(Math.floor(t / e) * i, d)) : c === 0 && (c = i, l = Math.min(Math.floor(e / t) * i, d)), [l, c];
}
function nE(e, t, r, s, n, a, o) {
	const i = Math.floor(t / n), l = Math.floor(r / n), c = i * l, d = n * n * s, h = new Float32Array(a * d);
	let _ = 0;
	for (let w = 0; w < i; ++w) for (let b = 0; b < l; ++b) for (let M = 0; M < n; ++M) {
		const E = (w * n + M) * r * s + b * n * s;
		for (let A = 0; A < n; ++A) {
			const k = E + A * s;
			for (let C = 0; C < s; ++C) h[_++] = e[k + C];
		}
	}
	const m = new BigInt64Array(a * 2).fill(-1n);
	let v = 0;
	for (let w = 0; w < i; ++w) for (let b = 0; b < l; ++b) m[v++] = BigInt(b), m[v++] = BigInt(w);
	return {
		patches: new V("float32", h, [a, d]),
		positions: new V("int64", m, [a, 2]),
		num_soft_tokens: Math.floor(c / o ** 2)
	};
}
var Np = class extends _t {
	constructor(e) {
		super(), this.config = e, this.patch_size = e.patch_size ?? 16, this.max_soft_tokens = e.max_soft_tokens ?? 280, this.pooling_kernel_size = e.pooling_kernel_size ?? 3, this.resample = e.resample ?? 3, this.rescale_factor = e.rescale_factor ?? 1 / 255, this.do_rescale = e.do_rescale ?? !0, this.do_resize = e.do_resize ?? !0, this.do_convert_rgb = e.do_convert_rgb ?? !0;
	}
	async _call(e) {
		Array.isArray(e) || (e = [e]);
		const { patch_size: t, pooling_kernel_size: r } = this, s = this.max_soft_tokens * r ** 2, n = [], a = [], o = [];
		for (let i of e) {
			if (this.do_convert_rgb && (i = i.rgb()), this.do_resize) {
				const [_, m] = sE(i.height, i.width, t, s, r);
				(_ !== i.height || m !== i.width) && (i = await i.resize(m, _, { resample: this.resample }));
			}
			const l = Float32Array.from(i.data);
			if (this.do_rescale) for (let _ = 0; _ < l.length; ++_) l[_] *= this.rescale_factor;
			const { patches: c, positions: d, num_soft_tokens: h } = nE(l, i.height, i.width, i.channels, t, s, r);
			n.push(c), a.push(d), o.push(h);
		}
		return {
			pixel_values: or(n, 0),
			image_position_ids: or(a, 0),
			num_soft_tokens_per_image: o
		};
	}
}, Dp = class extends ie {
	constructor(e) {
		super(e), this.min_pixels = e.min_pixels ?? e.size?.shortest_edge, this.max_pixels = e.max_pixels ?? e.size?.longest_edge, this.patch_size = e.patch_size, this.merge_size = e.merge_size;
	}
	get_resize_output_image_size(e, t) {
		const r = this.patch_size * this.merge_size;
		return Ri(e.height, e.width, r, this.min_pixels, this.max_pixels);
	}
	async _call(e, ...t) {
		const { pixel_values: r, original_sizes: s, reshaped_input_sizes: n } = await super._call(e, ...t);
		let a = r;
		const { temporal_patch_size: o, merge_size: i, patch_size: l } = this.config;
		a.dims[0] === 1 && (a = Ne(Array.from({ length: o }, () => a), 0));
		const c = a.dims[0] / o, d = a.dims[1], h = Math.floor(a.dims[2] / l), _ = Math.floor(a.dims[3] / l);
		return {
			pixel_values: a.view(c, o, d, Math.floor(h / i), i, l, Math.floor(_ / i), i, l).permute(0, 3, 6, 4, 7, 2, 1, 5, 8).view(c * h * _, d * o * l * l),
			image_grid_thw: new V("int64", [
				c,
				h,
				_
			], [1, 3]),
			original_sizes: s,
			reshaped_input_sizes: n
		};
	}
}, aE = class extends Dp {
	get_resize_output_image_size(e, t) {
		const r = this.patch_size * this.merge_size, s = this.config.temporal_patch_size ?? 2;
		return Ri(e.height, e.width, r, this.min_pixels, this.max_pixels, s);
	}
}, oE = class extends ie {}, iE = class extends ie {
	async _call(e) {
		const t = await super._call(e), r = t.pixel_values.dims, s = ft([
			r[0],
			r[2],
			r[3]
		]);
		return {
			...t,
			pixel_mask: s
		};
	}
}, wf = class extends ie {
	constructor(e) {
		super(e), this.do_image_splitting = e.do_image_splitting ?? !0, this.max_image_size = e.max_image_size;
	}
	get_resize_for_vision_encoder(e, t) {
		let [r, s] = e.dims.slice(-2);
		const n = s / r;
		return s >= r ? (s = Math.ceil(s / t) * t, r = Math.floor(s / n), r = Math.ceil(r / t) * t) : (r = Math.ceil(r / t) * t, s = Math.floor(r * n), s = Math.ceil(s / t) * t), {
			height: r,
			width: s
		};
	}
	async _call(e, { do_image_splitting: t = null, return_row_col_info: r = !1 } = {}) {
		let s;
		if (!Array.isArray(e)) s = [[e]];
		else {
			if (e.length === 0 || !e[0]) throw new Error("No images provided.");
			Array.isArray(e[0]) ? s = e : s = [e];
		}
		let n = [], a = [], o = [];
		const i = [], l = [];
		for (const b of s) {
			let M = await Promise.all(b.map((k) => this.preprocess(k)));
			i.push(...M.map((k) => k.original_size)), l.push(...M.map((k) => k.reshaped_input_size)), M.forEach((k) => k.pixel_values.unsqueeze_(0));
			const { longest_edge: E } = this.max_image_size;
			let A;
			if (t ?? this.do_image_splitting) {
				let k = new Array(M.length), C = new Array(M.length);
				A = await Promise.all(M.map(async (O, x) => {
					const q = this.get_resize_for_vision_encoder(O.pixel_values, E), R = await Ot(O.pixel_values, { size: [q.height, q.width] }), { frames: G, num_splits_h: W, num_splits_w: H } = await this.split_image(R, this.max_image_size);
					return k[x] = W, C[x] = H, Ne(G, 0);
				})), a.push(k), o.push(C);
			} else {
				const k = [E, E];
				A = await Promise.all(M.map((C) => Ot(C.pixel_values, { size: k }))), a.push(new Array(M.length).fill(0)), o.push(new Array(M.length).fill(0));
			}
			n.push(Ne(A, 0));
		}
		const c = n.length, [d, h, _, m] = n[0].dims;
		let v, w;
		if (c === 1) v = n[0].unsqueeze_(0), w = ot([
			c,
			d,
			_,
			m
		], !0);
		else {
			const b = Math.max(...n.map((A) => A.dims.at(0)));
			w = ot([
				c,
				b,
				_,
				m
			], !0);
			const M = w.data, E = b * _ * m;
			for (let A = 0; A < c; ++A) {
				const k = n[A].dims[0];
				if (k < b) {
					n[A] = Ne([n[A], ot([
						b - k,
						h,
						_,
						m
					], 0)], 0);
					const C = A * E + k * _ * m, O = (A + 1) * E;
					M.fill(!1, C, O);
				}
			}
			v = or(n, 0);
		}
		return {
			pixel_values: v,
			pixel_attention_mask: w,
			original_sizes: i,
			reshaped_input_sizes: l,
			...r ? {
				rows: a,
				cols: o
			} : {}
		};
	}
	async split_image(e, { longest_edge: t }) {
		const r = t, s = t, n = [], [a, o] = e.dims.slice(-2);
		let i = 0, l = 0;
		if (a > r || o > s) {
			i = Math.ceil(a / r), l = Math.ceil(o / s);
			const c = Math.ceil(a / i), d = Math.ceil(o / l);
			for (let m = 0; m < i; ++m) for (let v = 0; v < l; ++v) {
				let w, b, M, E;
				m === i - 1 ? (b = a - c, E = a) : (b = m * c, E = (m + 1) * c), v === l - 1 ? (w = o - d, M = o) : (w = v * d, M = (v + 1) * d);
				const A = await ap(e, [b, w], [E, M], [2, 3]);
				n.push(A);
			}
			const h = r, _ = s;
			(a !== h || o !== _) && (e = await Ot(e, { size: [h, _] }));
		}
		return n.push(e), {
			frames: n,
			num_splits_h: i,
			num_splits_w: l
		};
	}
}, lE = class extends ie {
	constructor(e) {
		super({
			do_pad: !0,
			pad_size: {
				width: e.image_size,
				height: e.image_size
			},
			...e
		}), this.constant_values = this.config.background_color.map((t) => t * this.rescale_factor);
	}
	pad_image(e, t, r, s) {
		return super.pad_image(e, t, r, {
			constant_values: this.constant_values,
			center: !0,
			...s
		});
	}
}, cE = class extends ie {
	constructor(e) {
		const { resize_mode: t, fill_color: r, interpolation: s, size: n, ...a } = e, o = t === "squash" ? {
			width: n,
			height: n
		} : t === "shortest" ? { shortest_edge: n } : { longest_edge: n }, i = s === "bicubic" ? 3 : 2;
		super({
			...a,
			size: o,
			resample: i,
			do_center_crop: !0,
			crop_size: n,
			do_normalize: !0
		});
	}
};
function vf(e, t) {
	return Math.round(e / t) * t;
}
function uE(e, t, r, s, n) {
	let a = Infinity, o = [1, 1];
	const i = r * s;
	for (const l of t) {
		const c = Math.abs(e - l[0] / l[1]);
		c < a ? (a = c, o = l) : c === a && i > .5 * n * n * l[0] * l[1] && (o = l);
	}
	return o;
}
function dE(e, t) {
	const r = [], s = /* @__PURE__ */ new Set();
	for (let n = e; n <= t; ++n) for (let a = 1; a <= n; ++a) for (let o = 1; o <= n; ++o) {
		const i = a * o;
		if (i >= e && i <= t) {
			const l = a << 16 | o;
			s.has(l) || (s.add(l), r.push([a, o]));
		}
	}
	return r.sort((n, a) => n[0] * n[1] - a[0] * a[1]);
}
function hE(e, t) {
	const [r, s, n, a] = e.dims, o = Math.floor(n / t), i = Math.floor(a / t), l = t * t * s, c = e.data, d = new Float32Array(r * o * i * l), h = n * a;
	for (let _ = 0; _ < r; ++_) {
		const m = _ * s * h, v = _ * o * i * l;
		for (let w = 0; w < o; ++w) for (let b = 0; b < i; ++b) {
			let M = v + (w * i + b) * l;
			for (let E = 0; E < t; ++E) {
				const A = (w * t + E) * a + b * t;
				for (let k = 0; k < t; ++k) {
					const C = A + k;
					for (let O = 0; O < s; ++O) d[M++] = c[m + O * h + C];
				}
			}
		}
	}
	return new V("float32", d, [
		r,
		o * i,
		l
	]);
}
function fE(e, t) {
	const [, r, s] = e.dims, n = new BigInt64Array(t);
	n.fill(1n, 0, r);
	let a = e;
	if (r < t) {
		const o = new Float32Array(t * s);
		o.set(e.data), a = new V("float32", o, [
			1,
			t,
			s
		]);
	}
	return {
		padded: a,
		mask: new V("int64", n, [t])
	};
}
var _E = class extends ie {
	constructor(e) {
		super(e), this.downsample_factor = e.downsample_factor ?? 2, this.do_image_splitting = e.do_image_splitting ?? !0, this.min_tiles = e.min_tiles ?? 2, this.max_tiles = e.max_tiles ?? 10, this.use_thumbnail = e.use_thumbnail ?? !0, this.min_image_tokens = e.min_image_tokens ?? 64, this.max_image_tokens = e.max_image_tokens ?? 256, this.encoder_patch_size = e.encoder_patch_size ?? e.patch_size ?? 16, this.tile_size = e.tile_size ?? 512, this.max_pixels_tolerance = e.max_pixels_tolerance ?? 2, this.return_row_col_info = e.return_row_col_info ?? !1;
		const t = this.max_image_tokens * this.downsample_factor ** 2, r = this.do_image_splitting ? (this.tile_size / this.encoder_patch_size) ** 2 : 0;
		this.max_num_patches = Math.max(t, r);
	}
	_is_image_too_large(e, t) {
		const r = this.encoder_patch_size * this.downsample_factor;
		return Math.max(this.encoder_patch_size, vf(e, r)) * Math.max(this.encoder_patch_size, vf(t, r)) > this.max_image_tokens * (this.encoder_patch_size * this.downsample_factor) ** 2 * this.max_pixels_tolerance;
	}
	_get_grid_layout(e, t) {
		const r = dE(this.min_tiles, this.max_tiles), [s, n] = uE(t / e, r, t, e, this.tile_size);
		return {
			grid_width: s,
			grid_height: n,
			target_width: this.tile_size * s,
			target_height: this.tile_size * n
		};
	}
	async _call(e, { return_row_col_info: t = null } = {}) {
		let r;
		Array.isArray(e) ? Array.isArray(e[0]) ? r = e : r = [e] : r = [[e]];
		const s = [], n = [], a = [], o = [], i = [], l = [];
		for (const d of r) {
			const h = await Promise.all(d.map((_) => this.preprocess(_, { do_pad: !1 })));
			for (const { pixel_values: _ } of h) {
				const [, m, v] = _.dims, w = _.unsqueeze_(0), b = this.encoder_patch_size * this.downsample_factor, M = b ** 2, [E, A] = Ri(Math.max(b, m), Math.max(b, v), b, this.min_image_tokens * M, this.max_image_tokens * M).map((R) => Math.max(b, R));
				let k, C = 1, O = 1;
				const x = this._is_image_too_large(m, v), q = this.do_image_splitting && !(this.min_tiles === 1 && this.max_tiles === 1);
				if (x && q) {
					const { grid_width: R, grid_height: G, target_width: W, target_height: H } = this._get_grid_layout(m, v);
					C = G, O = R;
					const D = await Ot(w, { size: [H, W] });
					k = [];
					for (let F = 0; F < G; ++F) for (let U = 0; U < R; ++U) {
						const ae = F * this.tile_size, Z = U * this.tile_size;
						k.push(D.slice(null, null, [ae, ae + this.tile_size], [Z, Z + this.tile_size]));
					}
					this.use_thumbnail && R * G !== 1 && k.push(await Ot(w, { size: [A, E] }));
				} else k = [await Ot(w, { size: [A, E] })];
				for (const R of k) {
					const [, , G, W] = R.dims, { padded: H, mask: D } = fE(hE(R, this.encoder_patch_size), this.max_num_patches);
					s.push(H), n.push(D), a.push([Math.floor(G / this.encoder_patch_size), Math.floor(W / this.encoder_patch_size)]);
				}
				o.push(C), i.push(O), l.push([A, E]);
			}
		}
		const c = {
			pixel_values: Ne(s, 0),
			pixel_attention_mask: or(n, 0),
			spatial_shapes: new V("int64", BigInt64Array.from(a.flat(), BigInt), [a.length, 2])
		};
		return (t ?? this.return_row_col_info) && (c.image_rows = o, c.image_cols = i, c.image_sizes = l), c;
	}
}, pE = class extends ie {}, $i = class extends ie {
	post_process_panoptic_segmentation(...e) {
		return Cp(...e);
	}
	post_process_instance_segmentation(...e) {
		return Sp(...e);
	}
}, mE = class extends $i {}, gE = class extends $i {}, zp = class extends ie {}, wE = class extends zp {}, Bp = class extends ie {}, vE = class extends Bp {}, Rp = class extends ie {}, yE = class extends Rp {}, Gp = class extends ie {}, bE = class extends Gp {}, $p = class extends ie {}, ME = class extends $p {}, xE = class extends Gi {}, Vi = class extends ie {
	post_process_object_detection(...e) {
		return ua(...e);
	}
}, kE = class extends Vi {}, TE = class extends Vi {}, pt = 336, EE = [2, 3], { ceil: Do, floor: Kr, sqrt: zo } = Math, AE = class extends ie {
	constructor(e) {
		super({
			...e,
			do_normalize: !0,
			do_pad: !0,
			pad_size: "custom",
			do_convert_rgb: !0,
			do_resize: !0
		}), this._num_crops = e.num_crops;
	}
	calc_num_image_tokens_from_image_size(e, t) {
		const { num_img_tokens: r } = this.config;
		return Kr((Kr(t / pt) * Kr(e / pt) + 1) * r + 1 + (Kr(t / pt) + 1) * zo(r));
	}
	get_resize_output_image_size(e, t) {
		const r = this._num_crops, [s, n] = e.size;
		let a = s / n, o = 1;
		for (; o * Math.ceil(o / a) <= r;) o += 1;
		o -= 1;
		const i = Math.floor(o * 336);
		return [i, Math.floor(i / a)];
	}
	pad_image(e, t, r, s = {}) {
		const [n, a] = t, o = pt * Do(n / pt), i = pt * Do(a / pt), l = [
			1,
			1,
			1
		].map((c, d) => (c - this.image_mean[d]) / this.image_std[d]);
		return super.pad_image(e, t, {
			width: i,
			height: o
		}, {
			center: !0,
			constant_values: l,
			...s
		});
	}
	async _call(e, { num_crops: t = null } = {}) {
		if (this._num_crops = t ??= this.config.num_crops, t < 4 || zo(t) % 1 !== 0) throw new Error("num_crops must be a square number >= 4");
		Array.isArray(e) || (e = [e]);
		const r = e.length, s = await Promise.all(e.map((c) => this.preprocess(c))), n = s.map((c) => c.original_size), a = s.map((c) => c.reshaped_input_size), o = [];
		for (const { pixel_values: c } of s) {
			c.unsqueeze_(0);
			const [d, h] = c.dims.slice(-2), _ = await Ot(c, {
				size: [pt, pt],
				mode: "bicubic"
			});
			if (t > 0) {
				const m = [], v = zo(t), w = Kr(h / v), b = Kr(d / v);
				for (let E = 0; E < v; ++E) for (let A = 0; A < v; ++A) {
					let k, C, O, x;
					E === v - 1 ? (C = d - b, x = d) : (C = E * b, x = (E + 1) * b), A === v - 1 ? (k = h - w, O = h) : (k = A * w, O = (A + 1) * w);
					const q = await ap(c, [C, k], [x, O], EE);
					m.push(q);
				}
				const M = await Ot(Ne(m, 0), {
					size: [pt, pt],
					mode: "bicubic"
				});
				o.push(Ne([_, M], 0));
			} else o.push(_);
		}
		const i = or(o, 0), l = a.map((c) => c.map((d) => pt * Do(d / pt)));
		return {
			pixel_values: i,
			original_sizes: n,
			reshaped_input_sizes: a,
			image_sizes: new V("int64", l.flat(), [r, 2]),
			num_img_tokens: l.map(([c, d]) => this.calc_num_image_tokens_from_image_size(d, c))
		};
	}
}, CE = class extends ie {
	get_resize_output_image_size(e, t) {
		const { longest_edge: r } = t;
		if (r === void 0) throw new Error("size must contain 'longest_edge'");
		const [s, n] = e.size, a = Math.max(s, n) / r;
		let o = s, i = n;
		a > 1 && (o = Math.floor(s / a), i = Math.floor(n / a));
		const { patch_size: l, spatial_merge_size: c } = this.config;
		if (!c) throw new Error("config must contain 'spatial_merge_size'");
		const d = l * c, h = Math.floor((o - 1) / d) + 1, _ = Math.floor((i - 1) / d) + 1;
		return [h * d, _ * d];
	}
}, SE = class extends ie {}, PE = class extends ie {
	post_process_object_detection(...e) {
		return ua(...e);
	}
}, Bo = class extends ie {
	reshape_input_points(e, t, r, s = !1) {
		e = structuredClone(e);
		let n = Nh(e);
		if (n.length === 3) s || (n = [1, ...n]), e = [e];
		else if (n.length !== 4) throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.");
		for (let a = 0; a < e.length; ++a) {
			const [o, i] = t[a], [l, c] = r[a], d = [c / i, l / o];
			for (let h = 0; h < e[a].length; ++h) for (let _ = 0; _ < e[a][h].length; ++_) for (let m = 0; m < e[a][h][_].length; ++m) e[a][h][_][m] *= d[m % 2];
		}
		return new V("float32", Float32Array.from(e.flat(Infinity)), n);
	}
	add_input_labels(e, t) {
		let r = Nh(e);
		if (r.length === 2) r = [1, ...r], e = [e];
		else if (r.length !== 3) throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.");
		if (r.some((s, n) => s !== t.dims[n])) throw Error(`The first ${r.length} dimensions of 'input_points' and 'input_labels' must be the same.`);
		return new V("int64", e.flat(Infinity).map(BigInt), r);
	}
	async _call(e, { input_points: t = null, input_labels: r = null, input_boxes: s = null } = {}) {
		const n = await super._call(e);
		if (t && (n.input_points = this.reshape_input_points(t, n.original_sizes, n.reshaped_input_sizes)), r) {
			if (!n.input_points) throw Error("`input_points` must be provided if `input_labels` are provided.");
			n.input_labels = this.add_input_labels(r, n.input_points);
		}
		return s && (n.input_boxes = this.reshape_input_points(s, n.original_sizes, n.reshaped_input_sizes, !0)), n;
	}
	async post_process_masks(e, t, r, { mask_threshold: s = 0, binarize: n = !0, pad_size: a = null } = {}) {
		const o = [];
		a = a ?? this.pad_size ?? this.size;
		const i = [a.height, a.width];
		for (let l = 0; l < t.length; ++l) {
			const c = t[l], d = r[l];
			let h = await Ot(e[l], {
				mode: "bilinear",
				size: i
			});
			if (h = h.slice(null, null, [0, d[0]], [0, d[1]]), h = await Ot(h, {
				mode: "bilinear",
				size: c
			}), n) {
				const _ = h.data, m = new Uint8Array(_.length);
				for (let v = 0; v < _.length; ++v) _[v] > s && (m[v] = 1);
				h = new V("bool", m, h.dims);
			}
			o.push(h);
		}
		return o;
	}
	generate_crop_boxes(e, t, { crop_n_layers: r = 0, overlap_ratio: s = 512 / 1500, points_per_crop: n = 32, crop_n_points_downscale_factor: a = 1 } = {}) {}
}, Vp = class extends ie {
	post_process_semantic_segmentation(...e) {
		return Ap(...e);
	}
}, FE = class extends Vp {}, Up = class extends ie {
	post_process_semantic_segmentation(...e) {
		return Ap(...e);
	}
}, LE = class extends Up {}, IE = class extends ie {}, OE = class extends ie {
	pad_image(e, t, r, s = {}) {
		const [n, a, o] = t;
		return super.pad_image(e, t, {
			width: a + (r - a % r) % r,
			height: n + (r - n % r) % r
		}, {
			mode: "symmetric",
			center: !1,
			constant_values: -1,
			...s
		});
	}
}, jp = class extends ie {}, NE = class extends jp {}, DE = class extends ie {
	async _call(e, t) {
		Array.isArray(e) || (e = [e]), Array.isArray(t) || (t = [t]);
		const r = await Promise.all(e.map((n) => this.preprocess(n))), s = await Promise.all(t.map((n) => this.preprocess(n, {
			do_normalize: !1,
			do_convert_rgb: !1,
			do_convert_grayscale: !0
		})));
		return {
			pixel_values: or(r.map((n, a) => Ne([n.pixel_values, s[a].pixel_values], 0)), 0),
			original_sizes: r.map((n) => n.original_size),
			reshaped_input_sizes: r.map((n) => n.reshaped_input_size)
		};
	}
}, zE = class extends ie {
	post_process_pose_estimation(e, t, { threshold: r = null } = {}) {
		const s = e.tolist(), [n, a, o, i] = e.dims, l = [];
		for (let c = 0; c < n; ++c) {
			const d = s[c], h = t[c], _ = [];
			for (let m = 0; m < h.length; ++m) {
				const v = h[m], w = [], b = [], M = [], E = v.at(-2) / i, A = v.at(-1) / o;
				for (let k = 0; k < d.length; ++k) {
					let [C, O] = [0, 0], x = 0, q = -Infinity;
					const R = d[k];
					for (let W = 0; W < R.length; ++W) {
						const H = R[W];
						for (let D = 0; D < H.length; ++D) {
							const F = H[D];
							x += F, q = Math.max(q, F), C += (D + .5) * F, O += W * F;
						}
					}
					if (r != null && q < r) continue;
					const G = [E * C / x, A * O / x];
					w.push(G), M.push(k), b.push(q);
				}
				_.push({
					bbox: v,
					scores: b,
					labels: M,
					keypoints: w
				});
			}
			l.push(_);
		}
		return l;
	}
}, qp = class extends ie {
	post_process_object_detection(...e) {
		return ua(...e);
	}
}, BE = class extends qp {}, lt = class {
	static async from_pretrained(e, t = {}) {
		const r = await Yt(e, Ks, !0, t), s = r.image_processor_type ?? r.feature_extractor_type;
		let n = ta[s?.replace(/Fast$/, "")];
		return n || (s !== void 0 && oe.warn(`Image processor type '${s}' not found, assuming base ImageProcessor. Please report this at ${ca}.`), n = ie), new n(r);
	}
}, RE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	constructor(e, t, r) {
		super(e, t, r);
		const { tasks_answer_post_processing_type: s, task_prompts_without_inputs: n, task_prompts_with_input: a } = this.image_processor.config;
		this.tasks_answer_post_processing_type = new Map(Object.entries(s ?? {})), this.task_prompts_without_inputs = new Map(Object.entries(n ?? {})), this.task_prompts_with_input = new Map(Object.entries(a ?? {})), this.regexes = {
			quad_boxes: /(.+?)<loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)>/gm,
			bboxes: /([^<]+)?<loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)>/gm
		}, this.size_per_bin = 1e3;
	}
	construct_prompts(e) {
		typeof e == "string" && (e = [e]);
		const t = [];
		for (const r of e) if (this.task_prompts_without_inputs.has(r)) t.push(this.task_prompts_without_inputs.get(r));
		else {
			for (const [s, n] of this.task_prompts_with_input) if (r.includes(s)) {
				t.push(n.replaceAll("{input}", r).replaceAll(s, ""));
				break;
			}
			t.length !== e.length && t.push(r);
		}
		return t;
	}
	post_process_generation(e, t, r) {
		const s = this.tasks_answer_post_processing_type.get(t) ?? "pure_text";
		e = e.replaceAll("<s>", "").replaceAll("</s>", "");
		let n;
		switch (s) {
			case "pure_text":
				n = e;
				break;
			case "description_with_bboxes":
			case "bboxes":
			case "phrase_grounding":
			case "ocr":
				const a = s === "ocr" ? "quad_boxes" : "bboxes", o = e.matchAll(this.regexes[a]), i = [], l = [];
				for (const [c, d, ...h] of o) i.push(d ? d.trim() : i.at(-1) ?? ""), l.push(h.map((_, m) => (Number(_) + .5) / this.size_per_bin * r[m % 2]));
				n = {
					labels: i,
					[a]: l
				};
				break;
			default: throw new Error(`Task "${t}" (of type "${s}") not yet implemented.`);
		}
		return { [t]: n };
	}
	async _call(e, t = null, r = {}) {
		if (!e && !t) throw new Error("Either text or images must be provided");
		const s = await this.image_processor(e, r), n = t ? this.tokenizer(this.construct_prompts(t), r) : {};
		return {
			...s,
			...n
		};
	}
}, GE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	static uses_processor_config = !0;
	static uses_chat_template_file = !0;
	constructor(e, t, r) {
		super(e, t, r), this.image_seq_length = this.config.image_seq_length;
		const { boi_token: s, image_token: n, eoi_token: a } = this.tokenizer.config;
		this.boi_token = s, this.image_token = n, this.eoi_token = a;
		const o = n.repeat(this.image_seq_length);
		this.full_image_sequence = `

${s}${o}${a}

`;
	}
	async _call(e, t = null, r = {}) {
		typeof e == "string" && (e = [e]);
		let s;
		return t && (s = await this.image_processor(t, r), e = e.map((n) => n.replaceAll(this.boi_token, this.full_image_sequence))), {
			...this.tokenizer(e, r),
			...s
		};
	}
}, $E = class extends Ee {
	static image_processor_class = lt;
	static feature_extractor_class = Et;
	static tokenizer_class = Te;
	static uses_processor_config = !0;
	static uses_chat_template_file = !0;
	constructor(e, t, r) {
		super(e, t, r), this.audio_seq_length = this.config.audio_seq_length, this.image_seq_length = this.config.image_seq_length;
		const { audio_token_id: s, boa_token: n, audio_token: a, eoa_token: o, image_token_id: i, boi_token: l, image_token: c, eoi_token: d } = this.tokenizer.config;
		this.audio_token_id = s, this.boa_token = n, this.audio_token = a;
		const h = a.repeat(this.audio_seq_length);
		this.full_audio_sequence = `

${n}${h}${o}

`, this.image_token_id = i, this.boi_token = l, this.image_token = c;
		const _ = c.repeat(this.image_seq_length);
		this.full_image_sequence = `

${l}${_}${d}

`;
	}
	async _call(e, t = null, r = null, s = {}) {
		typeof e == "string" && (e = [e]);
		let n;
		r && (n = await this.feature_extractor(r, s), e = e.map((o) => o.replaceAll(this.audio_token, this.full_audio_sequence)));
		let a;
		return t && (a = await this.image_processor(t, s), e = e.map((o) => o.replaceAll(this.image_token, this.full_image_sequence))), {
			...this.tokenizer(e, s),
			...a,
			...n
		};
	}
}, VE = class extends Ee {
	static uses_processor_config = !0;
	static uses_chat_template_file = !0;
	constructor(e, t, r) {
		super(e, t, r), this.audio_ms_per_token = this.config.audio_ms_per_token ?? 40, this.audio_seq_length = this.config.audio_seq_length ?? 750, this.image_seq_length = this.config.image_seq_length ?? 280;
		const { audio_token: s, boa_token: n, eoa_token: a, image_token: o, boi_token: i, eoi_token: l } = this.tokenizer.config;
		this.audio_token = s, this.boa_token = n, this.eoa_token = a, this.image_token = o, this.boi_token = i, this.eoi_token = l;
	}
	static async from_pretrained(e, t = {}) {
		const [r, s, n] = await Promise.all([
			Yt(e, _p, !0, t),
			Te.from_pretrained(e, t),
			Fi(e, pp, !1, t)
		]), a = { tokenizer: s };
		return r.image_processor && (a.image_processor = new Np(r.image_processor)), r.feature_extractor && (a.feature_extractor = new xp(r.feature_extractor)), new this(r, a, n);
	}
	_compute_audio_num_tokens(e, t) {
		const r = Math.round(t * 20 / 1e3), s = Math.round(t * 10 / 1e3), n = Math.floor(r / 2);
		let a = Math.floor((e + n - r - 1) / s) + 1;
		if (a <= 0) return 0;
		for (let o = 0; o < 2; ++o) a = Math.floor((a - 1) / 2) + 1;
		return Math.min(a, this.audio_seq_length);
	}
	async _call(e, t = null, r = null, s = {}) {
		typeof e == "string" && (e = [e]);
		let n;
		if (t) {
			n = await this.image_processor(t, s);
			const o = n.num_soft_tokens_per_image;
			let i = 0;
			e = e.map((l) => l.replaceAll(this.image_token, () => `

${this.boi_token}${this.image_token.repeat(o[i++])}${this.eoi_token}

`));
		}
		let a;
		if (r) {
			const o = Array.isArray(r) ? r : [r];
			a = await this.feature_extractor(o[0], s);
			const i = this.feature_extractor.config.sampling_rate ?? 16e3;
			let l = 0;
			e = e.map((c) => c.replaceAll(this.audio_token, () => `

${this.boa_token}${this.audio_token.repeat(this._compute_audio_num_tokens(o[l++].length, i))}${this.eoa_token}

`));
		}
		return {
			...this.tokenizer(e, s),
			...n,
			...a
		};
	}
}, Ui = class extends Ee {
	static image_processor_class = lt;
	static tokenizer_class = Te;
	static image_token = "<|image_pad|>";
	async _call(e, t = null, ...r) {
		Array.isArray(e) || (e = [e]);
		let s, n;
		if (t && (s = await this.image_processor(t), n = s.image_grid_thw), n) {
			let a = this.image_processor.config.merge_size ** 2, o = 0;
			const i = this.constructor.image_token, l = n.tolist();
			e = e.map((c) => {
				for (; c.includes(i);) {
					const d = Number(l[o++].reduce((h, _) => h * _, 1n));
					c = c.replace(i, "<|placeholder|>".repeat(Math.floor(d / a)));
				}
				return c.replaceAll("<|placeholder|>", i);
			});
		}
		return {
			...this.tokenizer(e),
			...s
		};
	}
}, UE = class extends Ui {
	static image_token = "<|image|>";
}, jE = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	static uses_processor_config = !0;
	_get_num_audio_features(e) {
		const { hop_length: t } = this.feature_extractor.config.melspec_kwargs, { projector_window_size: r, projector_downsample_rate: s } = this.feature_extractor.config, n = Math.floor(r / s), a = Math.floor(e / t) + 1, o = Math.floor(a / 2);
		return Math.ceil(o / r) * n;
	}
	async _call(e, t = null, r = {}) {
		if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
		let s = {};
		if (t) {
			const { input_features: n } = await this.feature_extractor(t);
			s.input_features = n;
			const a = this._get_num_audio_features(t.length);
			s.input_features_mask = new V("bool", new Uint8Array(a).fill(1), [1, a]);
			const o = this.config.audio_token ?? "<|audio|>";
			if (!e.includes(o)) throw new Error(`The input text does not contain the audio token ${o}.`);
			e = e.replaceAll(o, o.repeat(a));
		}
		return {
			...this.tokenizer(e, {
				add_special_tokens: !1,
				...r
			}),
			...s
		};
	}
};
function qE(e, t) {
	const r = e.dims.at(-1) - 1, s = e.tolist();
	s.fill(!1, 0, 1), s.fill(!1, r);
	const n = t.tolist();
	return s.map((a, o) => a ? o : null).filter((a) => a !== null).map((a) => n[a]);
}
var WE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	async _call(e, t, r = {}) {
		const s = e ? await this.image_processor(e, r) : {};
		return {
			...t ? this.tokenizer(t, r) : {},
			...s
		};
	}
	post_process_grounded_object_detection(e, t, { box_threshold: r = .25, text_threshold: s = .25, target_sizes: n = null } = {}) {
		const { logits: a, pred_boxes: o } = e, i = a.dims[0];
		if (n !== null && n.length !== i) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
		const l = a.dims.at(1), c = a.sigmoid(), d = c.max(-1).tolist(), h = o.tolist().map((m) => m.map((v) => Ep(v))), _ = [];
		for (let m = 0; m < i; ++m) {
			const v = n !== null ? n[m] : null;
			v !== null && (h[m] = h[m].map((A) => A.map((k, C) => k * v[(C + 1) % 2])));
			const w = d[m], b = [], M = [], E = [];
			for (let A = 0; A < l; ++A) {
				const k = w[A];
				if (k <= r) continue;
				const C = h[m][A], O = c[m][A];
				b.push(k), E.push(C);
				const x = qE(O.gt(s), t[m]);
				M.push(x);
			}
			_.push({
				scores: b,
				boxes: E,
				labels: this.batch_decode(M)
			});
		}
		return _;
	}
};
function HE(e, t, r, s, n, a) {
	let o = "";
	for (let i = 0; i < t; ++i) {
		for (let l = 0; l < r; ++l) o += s + `<row_${i + 1}_col_${l + 1}>` + n.repeat(e);
		o += `
`;
	}
	return o += `
${s}${a}` + n.repeat(e) + `${s}`, o;
}
function QE(e, t, r, s) {
	return `${t}${s}` + r.repeat(e) + `${t}`;
}
function XE(e, t, r, s, n, a) {
	return e === 0 && t === 0 ? QE(r, s, n, a) : HE(r, e, t, s, n, a);
}
var yf = class extends Ee {
	static image_processor_class = lt;
	static tokenizer_class = Te;
	static uses_processor_config = !0;
	fake_image_token = "<fake_token_around_image>";
	image_token = "<image>";
	global_img_token = "<global-img>";
	async _call(e, t = null, r = {}) {
		r.return_row_col_info ??= !0;
		let s;
		t && (s = await this.image_processor(t, r)), Array.isArray(e) || (e = [e]);
		const n = s.rows ?? [new Array(e.length).fill(0)], a = s.cols ?? [new Array(e.length).fill(0)], o = this.config.image_seq_len, i = [], l = [];
		for (let c = 0; c < e.length; ++c) {
			const d = e[c], h = n[c], _ = a[c];
			i.push(_b(d, this.image_token));
			const m = h.map((b, M) => XE(b, _[M], o, this.fake_image_token, this.image_token, this.global_img_token)), v = d.split(this.image_token);
			if (v.length === 0) throw new Error("The image token should be present in the text.");
			let w = v[0];
			for (let b = 0; b < m.length; ++b) w += m[b] + v[b + 1];
			l.push(w);
		}
		return {
			...this.tokenizer(l),
			...s
		};
	}
}, YE = class extends Ee {
	static image_processor_class = lt;
	static tokenizer_class = Te;
	static uses_processor_config = !0;
	constructor(e, t, r) {
		super(e, t, r), this.image_tag = this.config.image_tag, this.image_start_tag = this.config.image_start_tag, this.image_end_tag = this.config.image_end_tag, this.num_image_tokens = this.config.num_image_tokens;
	}
	async _call(e, { images: t = null, chat_template: r = "default" } = {}) {
		t ? Array.isArray(t) || (t = [t]) : t = await Promise.all(e.filter((w) => w.images).flatMap((w) => w.images).map((w) => Nt.read(w)));
		const s = this.tokenizer, n = s.apply_chat_template(e, {
			tokenize: !1,
			add_generation_prompt: !0,
			chat_template: r
		}), a = (w) => s.encode(w, { add_special_tokens: !1 }), o = n.split(this.image_tag), i = o.length - 1;
		if (t.length !== i) throw new Error(`Number of images provided (${t.length}) does not match number of "${this.image_tag}" image tags (${i})`);
		const [l, c, d] = s.convert_tokens_to_ids([
			this.image_tag,
			this.image_start_tag,
			this.image_end_tag
		]);
		let h = a(o[0]), _ = new Array(h.length).fill(!1);
		for (let w = 1; w < o.length; ++w) {
			const b = new Array(this.num_image_tokens).fill(l), M = a(o[w]);
			h = Ft(h, [c], b, [d], M);
			const E = new Array(this.num_image_tokens).fill(!0);
			_ = Ft(_, [!1], E, [!1], new Array(M.length).fill(!1));
		}
		const m = [1, h.length], v = {
			input_ids: new V("int64", h, m),
			attention_mask: new V("int64", new Array(h.length).fill(1), m),
			images_seq_mask: new V("bool", _, m),
			images_emb_mask: new V("bool", new Array(i * this.num_image_tokens).fill(!0), [
				1,
				i,
				this.num_image_tokens
			])
		};
		if (t && t.length > 0) {
			const w = await this.image_processor(t);
			return w.pixel_values.unsqueeze_(0), {
				...v,
				...w
			};
		}
		return v;
	}
}, JE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	async _call(e = null, t = null, r = {}) {
		if (!e && !t) throw new Error("Either text or images must be provided");
		const s = e ? this.tokenizer(e, r) : {}, n = t ? await this.image_processor(t, r) : {};
		return {
			...s,
			...n
		};
	}
}, KE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	async _call(e, t = null, r = {}) {
		const { image_rows: s, image_cols: n, image_sizes: a, ...o } = await this.image_processor(e, {
			...r,
			return_row_col_info: !0
		});
		if (t) {
			const i = this.config.image_token ?? "<image>", { tile_size: l = 512, downsample_factor: c = 2, encoder_patch_size: d = 16, use_thumbnail: h = !0 } = this.image_processor.config, _ = (E) => Math.ceil(Math.floor(E / d) / c), m = _(l) ** 2, v = this.config.image_start_token ?? "<|image_start|>", w = this.config.image_end_token ?? "<|image_end|>", b = this.config.image_thumbnail ?? "<|img_thumbnail|>";
			Array.isArray(t) || (t = [t]);
			let M = 0;
			t = t.map((E) => {
				const A = E.split(i);
				return A[0] + A.slice(1).map((k) => {
					const C = M++, [O, x] = a[C], q = s[C], R = n[C], G = _(O) * _(x);
					let W = v;
					if (q > 1 || R > 1) {
						const H = i.repeat(m);
						for (let D = 0; D < q; ++D) for (let F = 0; F < R; ++F) W += `<|img_row_${D + 1}_col_${F + 1}|>` + H;
						h && (W += b + i.repeat(G));
					} else W += i.repeat(G);
					return W + w + k;
				}).join("");
			});
		}
		return {
			...o,
			...t ? this.tokenizer(t, r) : {}
		};
	}
}, ZE = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	static uses_processor_config = !0;
	async _call(e, t = null, r = {}) {
		const s = await this.image_processor(e, r);
		if (t) {
			const [a, o] = s.pixel_values.dims.slice(-2), { image_token: i, patch_size: l, num_additional_image_tokens: c } = this.config, d = Math.floor(a / l) * Math.floor(o / l) + c;
			t = structuredClone(t), Array.isArray(t) || (t = [t]);
			for (let h = 0; h < t.length; ++h) t[h] = t[h].replace(i, i.repeat(d));
		}
		const n = t ? this.tokenizer(t, r) : {};
		return {
			...s,
			...n
		};
	}
}, bf = {
	char: ["char_decode", 1],
	bpe: ["bpe_decode", 2],
	wp: ["wp_decode", 102]
}, e2 = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	get char_tokenizer() {
		return this.components.char_tokenizer;
	}
	get bpe_tokenizer() {
		return this.components.bpe_tokenizer;
	}
	get wp_tokenizer() {
		return this.components.wp_tokenizer;
	}
	_decode_helper(e, t) {
		if (!bf.hasOwnProperty(t)) throw new Error(`Format ${t} is not supported.`);
		const [r, s] = bf[t], n = this[r].bind(this), [a, o] = e.dims, i = [], l = [], c = e.tolist();
		for (let d = 0; d < a; ++d) {
			const h = c[d], _ = [], m = [];
			for (let w = 1; w < o; ++w) {
				const [b, M] = $e(rt(h[w]));
				if (m.push(b), M == s) break;
				_.push(M);
			}
			const v = m.length > 0 ? m.reduce((w, b) => w * b, 1) : 0;
			l.push(_), i.push(v);
		}
		return [n(l), i];
	}
	char_decode(e) {
		return this.char_tokenizer.batch_decode(e).map((t) => t.replaceAll(" ", ""));
	}
	bpe_decode(e) {
		return this.bpe_tokenizer.batch_decode(e);
	}
	wp_decode(e) {
		return this.wp_tokenizer.batch_decode(e).map((t) => t.replaceAll(" ", ""));
	}
	batch_decode([e, t, r]) {
		const [s, n] = this._decode_helper(e, "char"), [a, o] = this._decode_helper(t, "bpe"), [i, l] = this._decode_helper(r, "wp"), c = [], d = [];
		for (let h = 0; h < s.length; ++h) {
			const [_, m] = $e([
				n[h],
				o[h],
				l[h]
			]);
			c.push([
				s[h],
				a[h],
				i[h]
			][m]), d.push(_);
		}
		return {
			generated_text: c,
			scores: d,
			char_preds: s,
			bpe_preds: a,
			wp_preds: i
		};
	}
	static async from_pretrained(...e) {
		const t = await super.from_pretrained(...e), r = await Te.from_pretrained("Xenova/gpt2"), s = await Te.from_pretrained("Xenova/bert-base-uncased");
		return t.components = {
			image_processor: t.image_processor,
			char_tokenizer: t.tokenizer,
			bpe_tokenizer: r,
			wp_tokenizer: s
		}, t;
	}
	async _call(e, t = null) {
		const r = await this.image_processor(e);
		return t && (r.labels = this.tokenizer(t).input_ids), r;
	}
}, t2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, r2 = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
}, Zr = "<image>";
function s2(e, t, r, s, n) {
	return `${s.repeat(r * n)}${t}${e}
`;
}
var n2 = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	static uses_processor_config = !1;
	async _call(e, t = null, r = {}) {
		t || (oe.warn("You are using PaliGemma without a text prefix. It will perform as a picture-captioning model."), t = ""), Array.isArray(e) || (e = [e]), Array.isArray(t) || (t = [t]);
		const s = this.tokenizer.bos_token, n = this.image_processor.config.image_seq_length;
		let a;
		t.some((i) => i.includes(Zr)) ? a = t.map((i) => {
			const l = i.replaceAll(Zr, Zr.repeat(n)), c = l.lastIndexOf(Zr), d = c === -1 ? 0 : c + Zr.length;
			return l.slice(0, d) + s + l.slice(d) + `
`;
		}) : (oe.warn("You are passing both `text` and `images` to `PaliGemmaProcessor`. The processor expects special image tokens in the text, as many tokens as there are images per each text. It is recommended to add `<image>` tokens in the very beginning of your text. For this call, we will infer how many images each text has and add special tokens."), a = t.map((i) => s2(i, s, n, Zr, e.length)));
		const o = this.tokenizer(a, r);
		return {
			...await this.image_processor(e, r),
			...o
		};
	}
}, Mf = "<|image|>", a2 = /<\|image_\d+\|>/g, o2 = class extends Ee {
	static image_processor_class = lt;
	static tokenizer_class = Te;
	async _call(e, t = null, { padding: r = !0, truncation: s = !0, num_crops: n = null } = {}) {
		Array.isArray(e) || (e = [e]);
		let a, o;
		if (t) {
			o = await this.image_processor(t, { num_crops: n });
			const { num_img_tokens: i } = o, l = e.map((d, h) => d.split(a2).join(Mf.repeat(i[h])));
			a = this.tokenizer(l, {
				padding: r,
				truncation: s
			});
			const c = this.tokenizer._tokenizer.token_to_id(Mf);
			a.input_ids.map_((d) => d == c ? -d : d);
		} else a = this.tokenizer(e);
		return {
			...a,
			...o
		};
	}
}, i2 = class extends Ee {
	static tokenizer_class = Te;
	static image_processor_class = lt;
	static uses_processor_config = !0;
	async _call(e, t = null, r = {}) {
		const s = await this.image_processor(e, r);
		if (t) {
			const [a, o] = s.pixel_values.dims.slice(-2), { image_token: i, image_break_token: l, image_end_token: c, patch_size: d, spatial_merge_size: h } = this.config, _ = d * h, m = Math.floor(a / _), v = Math.floor(o / _);
			t = structuredClone(t), Array.isArray(t) || (t = [t]);
			for (let w = 0; w < t.length; ++w) {
				const b = i.repeat(v), M = b + l, E = b + c, A = M.repeat(m - 1) + E;
				t[w] = t[w].replace(i, A);
			}
		}
		const n = t ? this.tokenizer(t, r) : {};
		return {
			...s,
			...n
		};
	}
}, l2 = class extends Ee {
	static feature_extractor_class = kp;
	async _call(e) {
		return await this.feature_extractor(e);
	}
	post_process_speaker_diarization(...e) {
		return this.feature_extractor.post_process_speaker_diarization(...e);
	}
	get sampling_rate() {
		return this.feature_extractor.config.sampling_rate;
	}
}, Wp = class extends Ui {}, c2 = class extends Wp {}, Hp = class extends Ee {
	static image_processor_class = lt;
	async _call(...e) {
		return await this.image_processor(...e);
	}
	post_process_masks(...e) {
		return this.image_processor.post_process_masks(...e);
	}
	reshape_input_points(...e) {
		return this.image_processor.reshape_input_points(...e);
	}
}, Qp = class extends Hp {}, u2 = class extends Qp {}, d2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, h2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	static uses_processor_config = !0;
	async _call(e, t = null, r = {}) {
		if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
		let s = {};
		if (t) {
			const n = t.length, { input_features: a } = await this.feature_extractor(t, {
				...r,
				max_length: n
			}), o = Math.round(n / this.config.encoder_ds_factor + 1e-4), i = 1 + Math.ceil(o / this.config.stack_factor);
			s.audio_token_len = [i], s.audio_values = a;
			const l = this.config.audio_placeholder;
			if (!e.includes(l)) throw new Error(`The input text does not contain the image token ${l}.`);
			e = e.replaceAll(l, l.repeat(i));
		}
		return {
			...this.tokenizer(e, {
				add_special_tokens: !1,
				...r
			}),
			...s
		};
	}
}, Nn = "[AUDIO]", f2 = "[BEGIN_AUDIO]", _2 = 375;
function p2(e, t) {
	const r = [];
	for (let s = 0; s < e.length; s += t) r.push(e.subarray(s, Math.min(s + t, e.length)));
	return r;
}
var m2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	static uses_processor_config = !1;
	async _call(e, t = null, r = {}) {
		if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
		const s = {};
		if (t) {
			if (!e.includes(Nn)) throw new Error(`The input text does not contain the audio token ${Nn}.`);
			Array.isArray(t) || (t = [t]);
			const n = e.split(Nn), a = n.length - 1;
			if (a !== t.length) throw new Error(`The number of audio inputs (${t.length}) does not match the number of audio tokens in the text (${a}).`);
			const o = this.feature_extractor.config.n_samples, i = t.map((_) => p2(_, o)), l = i.map((_) => _.length), c = i.flat(), d = (await Promise.all(c.map((_) => this.feature_extractor(_, r)))).map((_) => _.input_features);
			s.audio_values = d.length > 1 ? Ne(d, 0) : d[0];
			let h = n[0];
			for (let _ = 0; _ < l.length; ++_) {
				h += f2;
				for (let m = 0; m < l[_]; ++m) h += Nn.repeat(_2);
				h += n[_ + 1];
			}
			e = h;
		}
		return {
			...this.tokenizer(e, {
				add_special_tokens: !1,
				...r
			}),
			...s
		};
	}
}, xf = 32, Ro = 6, Dn = 8, g2 = 10, w2 = 32, v2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	static uses_processor_config = !1;
	get num_mel_frames_first_audio_chunk() {
		return (Ro + 1) * Dn;
	}
	get num_samples_first_audio_chunk() {
		const { hop_length: e, n_fft: t } = this.feature_extractor.config;
		return (this.num_mel_frames_first_audio_chunk - 1) * e + Math.floor(t / 2);
	}
	get num_samples_per_audio_chunk() {
		const { hop_length: e, n_fft: t } = this.feature_extractor.config;
		return Dn * e + t;
	}
	get num_right_pad_tokens() {
		return Ro + 1 + g2;
	}
	get audio_length_per_tok() {
		return Dn;
	}
	get raw_audio_length_per_tok() {
		return Dn * this.feature_extractor.config.hop_length;
	}
	async _call(e, { is_streaming: t = !1, is_first_audio_chunk: r = !0 } = {}) {
		if (st(e, "VoxtralRealtimeProcessor"), !t && !r) throw new Error("In non-streaming mode (`is_streaming=false`), `is_first_audio_chunk` must be `true`.");
		if (r) if (t) {
			const s = xf * this.raw_audio_length_per_tok, n = new Float32Array(s + e.length);
			n.set(e, s);
			const a = await this.feature_extractor(n, { center: !0 }), o = 1 + (xf + Ro), i = new BigInt64Array(o).fill(BigInt(w2));
			return i[0] = 1n, {
				input_ids: new V("int64", i, [1, o]),
				...a
			};
		} else {
			const s = this.num_right_pad_tokens * this.raw_audio_length_per_tok, n = new Float32Array(e.length + s);
			return n.set(e), await this.feature_extractor(n, { center: !0 });
		}
		else return await this.feature_extractor(e, { center: !1 });
	}
}, y2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, b2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, M2 = class extends Ee {
	static tokenizer_class = Te;
	static feature_extractor_class = Et;
	async _call(e) {
		return await this.feature_extractor(e);
	}
}, x2 = class {
	static async from_pretrained(e, t = {}) {
		const r = await Yt(e, Ks, !0, t), { image_processor_type: s, feature_extractor_type: n, processor_class: a } = r;
		if (a && Ko[a]) return Ko[a].from_pretrained(e, t);
		if (!s && !n) throw new Error("No `image_processor_type` or `feature_extractor_type` found in the config.");
		const o = {};
		if (s) {
			const i = ta[s.replace(/Fast$/, "")];
			if (!i) throw new Error(`Unknown image_processor_type: '${s}'.`);
			o.image_processor = new i(r);
		}
		if (n) {
			const i = ta[n];
			if (i) o.image_processor = new i(r);
			else {
				const l = Bi[n];
				if (!l) throw new Error(`Unknown feature_extractor_type: '${n}'.`);
				o.feature_extractor = new l(r);
			}
		}
		return new Ee({}, o, null);
	}
};
async function k2(e, t) {
	return await Yt(e, "config.json", !0, t);
}
function ts(e) {
	const t = {};
	let r = {};
	switch (e.model_type) {
		case "llava":
		case "paligemma":
		case "gemma3":
		case "florence2":
		case "llava_onevision":
		case "idefics3":
		case "granite_speech":
		case "ultravox":
		case "voxtral":
		case "voxtral_realtime":
		case "smolvlm":
		case "gemma3n":
		case "gemma4":
		case "lfm2_vl":
		case "chatterbox":
		case "lighton_ocr":
		case "glm_ocr":
		case "mistral3":
		case "qwen2_5_vl":
		case "qwen3_vl":
		case "qwen3_vl_moe":
			r = ts(e.text_config);
			break;
		case "moondream1":
			r = ts(e.phi_config);
			break;
		case "musicgen":
			r = ts(e.decoder);
			break;
		case "multi_modality":
			r = ts(e.language_config);
			break;
		case "gpt2":
		case "gptj":
		case "jais":
		case "codegen":
		case "gpt_bigcode":
			t.num_heads = "n_head", t.num_layers = "n_layer", t.hidden_size = "n_embd";
			break;
		case "gpt_neox":
		case "stablelm":
		case "opt":
		case "falcon":
		case "modernbert-decoder":
			t.num_heads = "num_attention_heads", t.num_layers = "num_hidden_layers", t.hidden_size = "hidden_size";
			break;
		case "gpt_oss":
		case "llama":
		case "llama4_text":
		case "nanochat":
		case "apertus":
		case "arcee":
		case "afmoe":
		case "lfm2":
		case "lfm2_moe":
		case "smollm3":
		case "olmo":
		case "olmo2":
		case "olmo3":
		case "mobilellm":
		case "granite":
		case "granitemoehybrid":
		case "cohere":
		case "cohere2":
		case "mistral":
		case "voxtral_realtime_text":
		case "voxtral_realtime_encoder":
		case "starcoder2":
		case "qwen2":
		case "qwen2_moe":
		case "qwen2_vl":
		case "qwen2_vl_text":
		case "qwen2_5_vl_text":
		case "qwen3_moe":
		case "qwen3_vl_text":
		case "qwen3_vl_moe_text":
		case "phi":
		case "phi3":
		case "phi3_v":
		case "llava_qwen2":
			t.num_heads = "num_key_value_heads", t.num_layers = "num_hidden_layers", t.hidden_size = "hidden_size", t.num_attention_heads = "num_attention_heads", t.dim_kv = "head_dim";
			break;
		case "qwen3":
		case "solar_open":
		case "glm_ocr_text":
		case "gemma":
		case "gemma2":
		case "vaultgemma":
		case "gemma3_text":
		case "gemma3n_text":
		case "gemma4_text":
		case "glm":
		case "helium":
		case "ernie4_5":
		case "hunyuan_v1_dense":
		case "falcon_h1":
		case "nemotron_h":
		case "ministral":
		case "ministral3":
			t.num_heads = "num_key_value_heads", t.num_layers = "num_hidden_layers", t.dim_kv = "head_dim";
			break;
		case "openelm":
			t.num_heads = "num_kv_heads", t.num_layers = "num_transformer_layers", t.dim_kv = "head_dim";
			break;
		case "gpt_neo":
		case "donut-swin":
			t.num_heads = "num_heads", t.num_layers = "num_layers", t.hidden_size = "hidden_size";
			break;
		case "bloom":
			t.num_heads = "n_head", t.num_layers = "n_layer", t.hidden_size = "hidden_size";
			break;
		case "mpt":
			t.num_heads = "n_heads", t.num_layers = "n_layers", t.hidden_size = "d_model";
			break;
		case "exaone":
			t.num_heads = "num_key_value_heads", t.num_layers = "num_layers", t.dim_kv = "head_dim", t.num_attention_heads = "num_attention_heads";
			break;
		case "youtu":
		case "deepseek_v3":
		case "glm_moe_dsa":
		case "mistral4":
			t.num_heads = "num_key_value_heads", t.num_layers = "num_hidden_layers", t.dim_kv = "qk_head_dim", t.num_attention_heads = "num_attention_heads";
			break;
		case "t5":
		case "mt5":
		case "longt5":
			t.num_decoder_layers = "num_decoder_layers", t.num_decoder_heads = "num_heads", t.decoder_dim_kv = "d_kv", t.num_encoder_layers = "num_layers", t.num_encoder_heads = "num_heads", t.encoder_dim_kv = "d_kv";
			break;
		case "bart":
		case "mbart":
		case "marian":
		case "whisper":
		case "lite-whisper":
		case "m2m_100":
		case "blenderbot":
		case "blenderbot-small":
		case "florence2_language":
			t.num_decoder_layers = "decoder_layers", t.num_decoder_heads = "decoder_attention_heads", t.decoder_hidden_size = "d_model", t.num_encoder_layers = "encoder_layers", t.num_encoder_heads = "encoder_attention_heads", t.encoder_hidden_size = "d_model";
			break;
		case "speecht5":
			t.num_decoder_layers = "decoder_layers", t.num_decoder_heads = "decoder_attention_heads", t.decoder_hidden_size = "hidden_size", t.num_encoder_layers = "encoder_layers", t.num_encoder_heads = "encoder_attention_heads", t.encoder_hidden_size = "hidden_size";
			break;
		case "trocr":
			t.num_encoder_layers = t.num_decoder_layers = "decoder_layers", t.num_encoder_heads = t.num_decoder_heads = "decoder_attention_heads", t.encoder_hidden_size = t.decoder_hidden_size = "d_model";
			break;
		case "musicgen_decoder":
			t.num_encoder_layers = t.num_decoder_layers = "num_hidden_layers", t.num_encoder_heads = t.num_decoder_heads = "num_attention_heads", t.encoder_hidden_size = t.decoder_hidden_size = "hidden_size";
			break;
		case "moonshine":
			t.num_decoder_layers = "decoder_num_hidden_layers", t.num_decoder_heads = "decoder_num_key_value_heads", t.num_encoder_layers = "encoder_num_hidden_layers", t.num_encoder_heads = "encoder_num_key_value_heads", t.encoder_hidden_size = t.decoder_hidden_size = "hidden_size";
			break;
		case "cohere_asr":
			t.num_decoder_layers = "num_hidden_layers", t.num_decoder_heads = "num_key_value_heads", t.decoder_hidden_size = "hidden_size", t.decoder_dim_kv = "head_dim";
			const { num_hidden_layers: n, num_attention_heads: a, hidden_size: o } = e.encoder_config;
			r = {
				num_encoder_layers: n,
				num_encoder_heads: a,
				encoder_hidden_size: o,
				encoder_dim_kv: e.head_dim
			};
			break;
		case "vision-encoder-decoder":
			const i = ts(e.decoder), l = "num_decoder_layers" in i, c = Ke(e, ["model_type", "is_encoder_decoder"]);
			return l ? (c.num_decoder_layers = i.num_decoder_layers, c.num_decoder_heads = i.num_decoder_heads, c.decoder_hidden_size = i.decoder_hidden_size, c.num_encoder_layers = i.num_encoder_layers, c.num_encoder_heads = i.num_encoder_heads, c.encoder_hidden_size = i.encoder_hidden_size) : (c.num_layers = i.num_layers, c.num_heads = i.num_heads, c.hidden_size = i.hidden_size), c;
	}
	const s = {
		...r,
		...Ke(e, [
			"model_type",
			"multi_query",
			"is_encoder_decoder"
		])
	};
	for (const n in t) s[n] = e[t[n]];
	return s;
}
function da(e, t) {
	e instanceof ei || (e = new ei(e));
	const r = t?.prefix ?? "past_key_values", s = r === "present" ? "present" : "past", n = /* @__PURE__ */ new Set();
	if (["lfm2", "lfm2_moe"].includes(e.model_type)) {
		const { layer_types: a } = e;
		for (let o = 0; o < a.length; ++o) if (a[o] === "full_attention") n.add(`${r}.${o}.key`), n.add(`${r}.${o}.value`);
		else if (a[o] === "conv") n.add(`${s}_conv.${o}`);
		else throw new Error(`Unsupported layer type: ${a[o]}`);
		return n;
	} else if ([
		"granitemoehybrid",
		"falcon_h1",
		"nemotron_h"
	].includes(e.model_type)) {
		const a = e, o = a.layer_types ?? a.layers_block_type, i = a.num_hidden_layers ?? o?.length;
		for (let l = 0; l < i; ++l) (!o || o[l] === "mamba") && (n.add(`${s}_conv.${l}`), n.add(`${s}_ssm.${l}`)), (!o || o[l] === "attention") && (n.add(`${r}.${l}.key`), n.add(`${r}.${l}.value`));
		return n;
	} else if ([
		"qwen3_next",
		"qwen3_5_text",
		"qwen3_5_moe_text",
		"olmo_hybrid"
	].includes(e.model_type)) {
		const { layer_types: a } = e;
		for (let o = 0; o < a.length; ++o) if (a[o] === "full_attention") n.add(`${r}.${o}.key`), n.add(`${r}.${o}.value`);
		else if (a[o] === "linear_attention") e.model_type === "olmo_hybrid" ? (n.add(`${s}_conv.${o}.key`), n.add(`${s}_conv.${o}.value`), n.add(`${s}_conv.${o}.query`)) : n.add(`${s}_conv.${o}`), n.add(`${s}_recurrent.${o}`);
		else throw new Error(`Unsupported layer type: ${a[o]}`);
		return n;
	} else if (["gemma4", "gemma4_text"].includes(e.model_type)) {
		const a = e.model_type === "gemma4" ? e.text_config : e, o = a.num_hidden_layers - (a.num_kv_shared_layers ?? 0);
		for (let i = 0; i < o; ++i) n.add(`${r}.${i}.key`), n.add(`${r}.${i}.value`);
		return n;
	} else if ([
		"lfm2_vl",
		"qwen3_5",
		"qwen3_5_moe",
		"voxtral_realtime"
	].includes(e.model_type)) {
		let a;
		return e.model_type === "voxtral_realtime" && t?.session_name === "audio_encoder" ? a = e.audio_config : a = e.text_config, da(a, t);
	}
	return T2(e, { prefix: r });
}
function T2(e, { prefix: t = "past_key_values" } = {}) {
	const r = /* @__PURE__ */ new Set(), s = e.normalized_config;
	if (s.is_encoder_decoder && "num_encoder_heads" in s && "num_decoder_heads" in s) for (let n = 0; n < s.num_decoder_layers; ++n) r.add(`${t}.${n}.encoder.key`), r.add(`${t}.${n}.encoder.value`), r.add(`${t}.${n}.decoder.key`), r.add(`${t}.${n}.decoder.value`);
	else if (s.multi_query) for (let n = 0; n < s.num_layers; ++n) r.add(`${t}.${n}.key_value`);
	else for (let n = 0; n < s.num_layers; ++n) r.add(`${t}.${n}.key`), r.add(`${t}.${n}.value`);
	return r;
}
var ei = class ti {
	model_type = null;
	is_encoder_decoder = !1;
	max_position_embeddings;
	"transformers.js_config";
	constructor(t) {
		Object.assign(this, t), this.normalized_config = ts(this);
	}
	static async from_pretrained(t, { progress_callback: r = null, config: s = null, cache_dir: n = null, local_files_only: a = !1, revision: o = "main" } = {}) {
		s && !(s instanceof ti) && (s = new ti(s));
		const i = s ?? await k2(t, {
			progress_callback: r,
			config: s,
			cache_dir: n,
			local_files_only: a,
			revision: o
		});
		return new this(i);
	}
}, Zs = class {
	static async from_pretrained(...e) {
		return ei.from_pretrained(...e);
	}
};
function Xp(e, t, r) {
	return e ? typeof e == "object" && e !== null ? e.hasOwnProperty(t) ? +e[t] : e.hasOwnProperty(r) ? +e[r] : 0 : +e : 0;
}
function Yp(e, t) {
	const r = [];
	for (let s = 0; s < t; ++s) r.push(`${e}_data${s === 0 ? "" : "_" + s}`);
	return r;
}
async function E2(e, t, r, s) {
	const n = `${t}${s}.onnx`;
	return await Zn(e, `${r.subfolder ?? ""}/${n}`, !0, r, ce.IS_NODE_ENV);
}
async function A2(e, t, r, s, n, a = {}) {
	const o = `${t}${r}.onnx`, i = ce.IS_NODE_ENV;
	let l = [];
	const c = Xp(n, o, t);
	if (c > 0) {
		if (c > ef) throw new Error(`The number of external data chunks (${c}) exceeds the maximum allowed value (${ef}).`);
		const d = Yp(o, c);
		for (const h of d) {
			const _ = `${s.subfolder ?? ""}/${h}`;
			l.push(new Promise(async (m, v) => {
				const w = await Zn(e, _, !0, s, i);
				m(w instanceof Uint8Array ? {
					path: h,
					data: w
				} : h);
			}));
		}
	} else a.externalData !== void 0 && (l = a.externalData.map(async (d) => {
		if (typeof d.data == "string") {
			const h = await Zn(e, d.data, !0, s);
			return {
				...d,
				data: h
			};
		}
		return d;
	}));
	return Promise.all(l);
}
async function C2(e, t, r, s = !1, n = void 0) {
	let a = r.config?.["transformers.js_config"] ?? {};
	const o = rp(r.device ?? a.device, t, { warn: (w) => oe.info(w) }), i = J1(o), l = a.device_config ?? {};
	l.hasOwnProperty(o) && (a = {
		...a,
		...l[o]
	});
	const c = sp(r.dtype ?? a.dtype, t, o, {
		configDtype: a.dtype,
		warn: (w) => oe.info(w)
	});
	if (ea.hasOwnProperty(c)) {
		if (o === "webgpu" && !ce.IS_NODE_ENV && c === Ve.fp16 && !await ek()) throw new Error(`The device (${o}) does not support fp16.`);
	} else throw new Error(`Invalid dtype: ${c}. Should be one of: ${Object.keys(Ve).join(", ")}`);
	const d = ea[c], h = { ...r.session_options };
	h.executionProviders ??= i;
	const _ = a.free_dimension_overrides;
	_ ? h.freeDimensionOverrides ??= _ : o.startsWith("webnn") && !h.freeDimensionOverrides && oe.warn(`WebNN does not currently support dynamic shapes and requires 'free_dimension_overrides' to be set in config.json, preferably as a field within config["transformers.js_config"]["device_config"]["${o}"]. When 'free_dimension_overrides' is not set, you may experience significant performance degradation.`);
	const m = E2(e, t, r, d), v = await A2(e, t, d, r, r.use_external_data_format ?? a.use_external_data_format, h);
	if (v.length > 0 && (!ce.IS_NODE_ENV || v.some((w) => typeof w != "string")) && (h.externalData = v), s && o === "webgpu") {
		const w = da(r.config, {
			prefix: "present",
			session_name: n
		});
		if (w.size > 0 && !Li()) {
			const b = {};
			for (const M of w) b[M] = "gpu-buffer";
			h.preferredOutputLocation = b;
		}
	}
	return {
		buffer_or_path: await m,
		session_options: h,
		session_config: {
			dtype: c,
			device: o
		}
	};
}
async function S2(e, t, r, s = void 0) {
	return Object.fromEntries(await Promise.all(Object.keys(t).map(async (n) => {
		const a = s?.[n] ?? !1, { buffer_or_path: o, session_options: i, session_config: l } = await C2(e, t[n], r, a, n);
		return [n, await Z_(o, i, l)];
	})));
}
function Jp(e) {
	for (let t in e) tp(e[t]) ? e[t] = new V(e[t]) : typeof e[t] == "object" && Jp(e[t]);
	return e;
}
async function ye(e, t) {
	const r = P2(e, t);
	try {
		return Jp(await ep(e, Object.fromEntries(Object.entries(r).map(([s, n]) => {
			const a = n.ort_tensor;
			return ce.IS_NODE_ENV && typeof Float16Array < "u" && a.cpuData instanceof Float16Array && (a.cpuData = new Uint16Array(a.cpuData.buffer)), [s, a];
		}))));
	} catch (s) {
		const n = Object.fromEntries(Object.entries(r).map(([a, o]) => {
			const i = {
				type: o.type,
				dims: o.dims,
				location: o.location
			};
			return i.location !== "gpu-buffer" && (i.data = o.data), [a, i];
		}));
		throw oe.error(`An error occurred during model execution: "${s}".`), oe.error("Inputs given to model:", n), s;
	}
}
function P2(e, t) {
	const r = Object.create(null), s = [];
	for (const o of e.inputNames) {
		const i = t[o];
		if (!(i instanceof V)) {
			s.push(o);
			continue;
		}
		r[o] = Li() ? i.clone() : i;
	}
	if (s.length > 0) throw new Error(`An error occurred during model execution: "Missing the following inputs: ${s.join(", ")}.`);
	const n = Object.keys(t).length, a = e.inputNames.length;
	if (n > a) {
		let o = Object.keys(t).filter((i) => !e.inputNames.includes(i));
		oe.warn(`WARNING: Too many inputs were provided (${n} > ${a}). The following inputs will be ignored: "${o.join(", ")}".`);
	}
	return r;
}
var We = class {}, re = class extends We {
	constructor({ logits: e, ...t }) {
		super(), this.logits = e;
		const r = Object.values(t);
		r.length > 0 && (this.attentions = r);
	}
}, Ue = class extends We {
	constructor({ logits: e }) {
		super(), this.logits = e;
	}
}, He = class extends We {
	constructor({ logits: e }) {
		super(), this.logits = e;
	}
}, ct = class extends We {
	constructor({ start_logits: e, end_logits: t }) {
		super(), this.start_logits = e, this.end_logits = t;
	}
}, Gr = class extends We {
	constructor({ logits: e }) {
		super(), this.logits = e;
	}
}, F2 = class extends We {
	constructor({ alphas: e }) {
		super(), this.alphas = e;
	}
}, Rt = class extends _t {
	_call(e, t) {
		throw Error("`_call` should be implemented in a subclass");
	}
}, L2 = class extends _t {
	_call(e, t) {
		throw Error("`_call` should be implemented in a subclass");
	}
}, ri = class extends _t {
	constructor() {
		super(), this.processors = [];
	}
	push(e) {
		this.processors.push(e);
	}
	extend(e) {
		this.processors.push(...e);
	}
	_call(e, t) {
		let r = t;
		for (const s of this.processors) r = s(e, r);
		return r;
	}
	[Symbol.iterator]() {
		return this.processors.values();
	}
}, I2 = class extends Rt {
	constructor(e) {
		super(), this.bos_token_id = e;
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) if (e[r].length === 1) {
			const s = t[r].data;
			s.fill(-Infinity), s[this.bos_token_id] = 0;
		}
		return t;
	}
}, O2 = class extends Rt {
	constructor(e, t) {
		super(), this.max_length = e, this.eos_token_id = Array.isArray(t) ? t : [t];
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) if (e[r].length === this.max_length - 1) {
			const s = t[r].data;
			s.fill(-Infinity);
			for (const n of this.eos_token_id) s[n] = 0;
		}
		return t;
	}
}, N2 = class extends Rt {
	constructor(e) {
		super(), this.suppress_tokens = e;
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) {
			const s = t[r].data;
			for (const n of this.suppress_tokens) s[n] = -Infinity;
		}
		return t;
	}
}, Kp = class extends Rt {
	constructor(e, t) {
		super(), this.begin_suppress_tokens = e, this.begin_index = t;
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) if (e[r].length === this.begin_index) {
			const s = t[r].data;
			for (const n of this.begin_suppress_tokens) s[n] = -Infinity;
		}
		return t;
	}
}, D2 = class extends Rt {
	constructor(e, t) {
		super(), this.eos_token_id = Array.isArray(e.eos_token_id) ? e.eos_token_id[0] : e.eos_token_id, this.no_timestamps_token_id = e.no_timestamps_token_id, this.timestamp_begin = this.no_timestamps_token_id + 1, this.begin_index = t.length, t.at(-1) === this.no_timestamps_token_id && (this.begin_index -= 1), this.max_initial_timestamp_index = e.max_initial_timestamp_index;
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) {
			const s = t[r].data;
			if (s[this.no_timestamps_token_id] = -Infinity, e[r].length === this.begin_index) {
				s.subarray(0, this.timestamp_begin).fill(-Infinity);
				continue;
			}
			const n = e[r].slice(this.begin_index), a = n.length >= 1 && n[n.length - 1] >= this.timestamp_begin, o = n.length < 2 || n[n.length - 2] >= this.timestamp_begin;
			if (a && (o ? s.subarray(this.timestamp_begin).fill(-Infinity) : s.subarray(0, this.eos_token_id).fill(-Infinity)), e[r].length === this.begin_index && this.max_initial_timestamp_index !== null) {
				const l = this.timestamp_begin + this.max_initial_timestamp_index;
				s.subarray(l + 1).fill(-Infinity);
			}
			const i = B1(s);
			Math.log(i.subarray(this.timestamp_begin).map(Math.exp).reduce((l, c) => l + c)) > $e(i.subarray(0, this.timestamp_begin))[0] && s.subarray(0, this.timestamp_begin).fill(-Infinity);
		}
		return t;
	}
}, z2 = class extends Rt {
	constructor(e) {
		super(), this.no_repeat_ngram_size = e;
	}
	getNgrams(e) {
		const t = e.length, r = [];
		for (let n = 0; n < t + 1 - this.no_repeat_ngram_size; ++n) {
			const a = [];
			for (let o = 0; o < this.no_repeat_ngram_size; ++o) a.push(e[n + o]);
			r.push(a.map(Number));
		}
		const s = /* @__PURE__ */ new Map();
		for (const n of r) {
			const a = n.slice(0, n.length - 1), o = JSON.stringify(a), i = s.get(o) ?? [];
			i.push(n[n.length - 1]), s.set(o, i);
		}
		return s;
	}
	getGeneratedNgrams(e, t) {
		const r = t.slice(t.length + 1 - this.no_repeat_ngram_size, t.length);
		return e.get(JSON.stringify(r.map(Number))) ?? [];
	}
	calcBannedNgramTokens(e) {
		const t = [];
		if (e.length + 1 < this.no_repeat_ngram_size) return t;
		{
			const r = this.getNgrams(e);
			return this.getGeneratedNgrams(r, e);
		}
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) {
			const s = t[r].data, n = this.calcBannedNgramTokens(e[r]);
			for (const a of n) s[a] = -Infinity;
		}
		return t;
	}
}, B2 = class extends Rt {
	constructor(e) {
		super(), this.penalty = e;
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) {
			const s = t[r].data;
			for (const n of new Set(e[r])) {
				const a = Number(n);
				s[a] < 0 ? s[a] *= this.penalty : s[a] /= this.penalty;
			}
		}
		return t;
	}
}, R2 = class extends Rt {
	constructor(e, t) {
		super(), this.min_length = e, this.eos_token_id = Array.isArray(t) ? t : [t];
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) if (e[r].length < this.min_length) {
			const s = t[r].data;
			for (const n of this.eos_token_id) s[n] = -Infinity;
		}
		return t;
	}
}, G2 = class extends Rt {
	constructor(e, t, r) {
		super(), this.prompt_length_to_skip = e, this.min_new_tokens = t, this.eos_token_id = Array.isArray(r) ? r : [r];
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) if (e[r].length - this.prompt_length_to_skip < this.min_new_tokens) {
			const s = t[r].data;
			for (const n of this.eos_token_id) s[n] = -Infinity;
		}
		return t;
	}
}, $2 = class extends Rt {
	constructor(e, t) {
		super(), this.bad_words_ids = e, this.eos_token_id = Array.isArray(t) ? t : [t];
	}
	_call(e, t) {
		for (let r = 0; r < e.length; ++r) {
			const s = t[r].data, n = e[r];
			for (const a of this.bad_words_ids) {
				if (n.length < a.length - 1) continue;
				let o = !0;
				for (let i = 1; i <= a.length - 1; ++i) if (a.at(-i - 1) != n.at(-i)) {
					o = !1;
					break;
				}
				o && (s[a.at(-1)] = -Infinity);
			}
		}
		return t;
	}
}, V2 = class extends Rt {
	constructor(e) {
		if (super(), e <= 1) throw new Error(`Require guidance scale >1 to use the classifier free guidance processor, got guidance scale ${e}.`);
		this.guidance_scale = e;
	}
	_call(e, t) {
		if (t.dims[0] !== 2 * e.length) throw new Error(`Logits should have twice the batch size of the input ids, the first half of batches corresponding to the conditional inputs, and the second half of batches corresponding to the unconditional inputs. Got batch size ${t.dims[0]} for the logits and ${e.length} for the input ids.`);
		const r = e.length, s = t.slice([0, r], null), n = t.slice([r, t.dims[0]], null);
		for (let a = 0; a < n.data.length; ++a) n.data[a] += (s.data[a] - n.data[a]) * this.guidance_scale;
		return n;
	}
}, U2 = class extends L2 {
	constructor(e) {
		if (super(), typeof e != "number" || e <= 0) {
			let t = `\`temperature\` (=${e}) must be a strictly positive float, otherwise your next token scores will be invalid.`;
			e === 0 && (t += " If you're looking for greedy decoding strategies, set `do_sample=false`.");
		}
		this.temperature = e;
	}
	_call(e, t) {
		const r = t.data;
		for (let s = 0; s < r.length; ++s) r[s] /= this.temperature;
		return t;
	}
}, Zp = class {
	max_length = 20;
	max_new_tokens = null;
	min_length = 0;
	min_new_tokens = null;
	early_stopping = !1;
	max_time = null;
	do_sample = !1;
	num_beams = 1;
	num_beam_groups = 1;
	penalty_alpha = null;
	use_cache = !0;
	temperature = 1;
	top_k = 50;
	top_p = 1;
	typical_p = 1;
	epsilon_cutoff = 0;
	eta_cutoff = 0;
	diversity_penalty = 0;
	repetition_penalty = 1;
	encoder_repetition_penalty = 1;
	length_penalty = 1;
	no_repeat_ngram_size = 0;
	bad_words_ids = null;
	force_words_ids = null;
	renormalize_logits = !1;
	constraints = null;
	forced_bos_token_id = null;
	forced_eos_token_id = null;
	remove_invalid_values = !1;
	exponential_decay_length_penalty = null;
	suppress_tokens = null;
	streamer = null;
	begin_suppress_tokens = null;
	forced_decoder_ids = null;
	guidance_scale = null;
	num_return_sequences = 1;
	output_attentions = !1;
	output_hidden_states = !1;
	output_scores = !1;
	return_dict_in_generate = !1;
	pad_token_id = null;
	bos_token_id = null;
	eos_token_id = null;
	encoder_no_repeat_ngram_size = 0;
	decoder_start_token_id = null;
	generation_kwargs = {};
	constructor(e) {
		Object.assign(this, Ke(e, Object.getOwnPropertyNames(this)));
	}
}, ha = class extends _t {
	_call(e, t) {
		throw Error("StoppingCriteria needs to be subclassed");
	}
}, em = class tm extends _t {
	constructor() {
		super(), this.criteria = [];
	}
	push(t) {
		this.criteria.push(t);
	}
	extend(t) {
		t instanceof tm ? t = t.criteria : t instanceof ha && (t = [t]), this.criteria.push(...t);
	}
	_call(t, r) {
		const s = new Array(t.length).fill(!1);
		for (const n of this.criteria) {
			const a = n(t, r);
			for (let o = 0; o < s.length; ++o) s[o] ||= a[o];
		}
		return s;
	}
	[Symbol.iterator]() {
		return this.criteria.values();
	}
}, j2 = class extends ha {
	constructor(e, t = null) {
		super(), this.max_length = e, this.max_position_embeddings = t;
	}
	_call(e) {
		return e.map((t) => t.length >= this.max_length);
	}
}, q2 = class extends ha {
	constructor(e) {
		super(), Array.isArray(e) || (e = [e]), this.eos_token_id = e;
	}
	_call(e, t) {
		return e.map((r) => {
			const s = r.at(-1);
			return this.eos_token_id.some((n) => s == n);
		});
	}
}, fa = class extends _t {
	constructor(e) {
		super(), this.generation_config = e;
	}
	async _call(e) {
		return this.sample(e);
	}
	async sample(e) {
		throw Error("sample should be implemented in subclasses.");
	}
	getLogits(e, t) {
		let r = e.dims.at(-1), s = e.data;
		if (t === -1) s = s.slice(-r);
		else {
			let n = t * r;
			s = s.slice(n, n + r);
		}
		return s;
	}
	randomSelect(e) {
		return M1(e);
	}
	static getSampler(e) {
		if (e.do_sample) return new H2(e);
		if (e.num_beams > 1) return new Q2(e);
		if (e.num_return_sequences > 1) throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${e.num_return_sequences}.`);
		return new W2(e);
	}
}, W2 = class extends fa {
	async sample(e) {
		const t = $e(e.data)[1];
		return [[BigInt(t), 0]];
	}
}, H2 = class extends fa {
	async sample(e) {
		let t = e.dims.at(-1);
		this.generation_config.top_k > 0 && (t = Math.min(this.generation_config.top_k, t));
		const [r, s] = await _s(e, t), n = rt(r.data);
		return Array.from({ length: this.generation_config.num_beams }, () => {
			const a = this.randomSelect(n);
			return [s.data[a], Math.log(n[a])];
		});
	}
}, Q2 = class extends fa {
	async sample(e) {
		let t = e.dims.at(-1);
		this.generation_config.top_k > 0 && (t = Math.min(this.generation_config.top_k, t));
		const [r, s] = await _s(e, t), n = rt(r.data);
		return Array.from({ length: this.generation_config.num_beams }, (a, o) => [s.data[o], Math.log(n[o])]);
	}
}, X2 = class {
	constructor(e) {
		if (e) for (const t in e) {
			if (t in this) throw new TypeError(`Key "${t}" conflicts with an existing property on DynamicCache`);
			const r = e[t];
			if (!(r instanceof V)) throw new TypeError(`Expected a Tensor for key "${t}", got ${typeof r}`);
			this[t] = r;
		}
	}
	get_seq_length() {
		const e = this;
		if (Object.keys(e).length === 0) return 0;
		for (const t in e) if (t.startsWith("past_key_values.")) return e[t].dims.at(-2);
		throw new Error("Unable to determine sequence length from the cache.");
	}
	update(e) {
		for (const t in e) {
			const r = this[t], s = e[t];
			r && r !== s && r.location === "gpu-buffer" && r.dispose(), this[t] = s;
		}
	}
	async dispose() {
		const e = [];
		for (const t of Object.values(this)) t.location === "gpu-buffer" && e.push(t.dispose());
		await Promise.all(e);
	}
}, ji = X2, j = {
	EncoderOnly: 0,
	EncoderDecoder: 1,
	Seq2Seq: 2,
	Vision2Seq: 3,
	DecoderOnly: 4,
	DecoderOnlyWithoutHead: 5,
	MaskGeneration: 6,
	ImageTextToText: 7,
	Musicgen: 8,
	MultiModality: 9,
	Phi3V: 10,
	AudioTextToText: 11,
	AutoEncoder: 12,
	ImageAudioTextToText: 13,
	Supertonic: 14,
	Chatterbox: 15,
	VoxtralRealtime: 16
}, nr = {
	[j.DecoderOnly]: {
		sessions: (e, t) => ({ model: t.model_file_name ?? "model" }),
		cache_sessions: { model: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.DecoderOnlyWithoutHead]: { sessions: (e, t) => ({ model: t.model_file_name ?? "model" }) },
	[j.Seq2Seq]: {
		sessions: () => ({
			model: "encoder_model",
			decoder_model_merged: "decoder_model_merged"
		}),
		cache_sessions: { decoder_model_merged: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.Vision2Seq]: {
		sessions: () => ({
			model: "encoder_model",
			decoder_model_merged: "decoder_model_merged"
		}),
		cache_sessions: { decoder_model_merged: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.Musicgen]: {
		sessions: () => ({
			model: "text_encoder",
			decoder_model_merged: "decoder_model_merged",
			encodec_decode: "encodec_decode"
		}),
		cache_sessions: { decoder_model_merged: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.EncoderDecoder]: {
		sessions: () => ({
			model: "encoder_model",
			decoder_model_merged: "decoder_model_merged"
		}),
		cache_sessions: { decoder_model_merged: !0 }
	},
	[j.MaskGeneration]: { sessions: () => ({
		model: "vision_encoder",
		prompt_encoder_mask_decoder: "prompt_encoder_mask_decoder"
	}) },
	[j.ImageTextToText]: {
		text_only_sessions: {
			embed_tokens: "embed_tokens",
			decoder_model_merged: "decoder_model_merged"
		},
		sessions: (e, t, r) => {
			const s = { ...nr[j.ImageTextToText].text_only_sessions };
			return r || (s.vision_encoder = "vision_encoder"), e.is_encoder_decoder && (s.model = "encoder_model"), s;
		},
		cache_sessions: { decoder_model_merged: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.AudioTextToText]: {
		text_only_sessions: {
			embed_tokens: "embed_tokens",
			decoder_model_merged: "decoder_model_merged"
		},
		sessions: (e, t, r) => {
			const s = { ...nr[j.AudioTextToText].text_only_sessions };
			return r || (s.audio_encoder = "audio_encoder"), s;
		},
		cache_sessions: { decoder_model_merged: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.ImageAudioTextToText]: {
		text_only_sessions: {
			embed_tokens: "embed_tokens",
			decoder_model_merged: "decoder_model_merged"
		},
		sessions: (e, t, r) => {
			const s = { ...nr[j.ImageAudioTextToText].text_only_sessions };
			return r || (s.audio_encoder = "audio_encoder", s.vision_encoder = "vision_encoder"), s;
		},
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.Phi3V]: {
		sessions: () => ({
			prepare_inputs_embeds: "prepare_inputs_embeds",
			model: "model",
			vision_encoder: "vision_encoder"
		}),
		cache_sessions: { model: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.MultiModality]: {
		sessions: () => ({
			prepare_inputs_embeds: "prepare_inputs_embeds",
			model: "language_model",
			lm_head: "lm_head",
			gen_head: "gen_head",
			gen_img_embeds: "gen_img_embeds",
			image_decode: "image_decode"
		}),
		cache_sessions: { model: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.AutoEncoder]: { sessions: () => ({
		encoder_model: "encoder_model",
		decoder_model: "decoder_model"
	}) },
	[j.Supertonic]: { sessions: () => ({
		text_encoder: "text_encoder",
		latent_denoiser: "latent_denoiser",
		voice_decoder: "voice_decoder"
	}) },
	[j.Chatterbox]: {
		sessions: () => ({
			embed_tokens: "embed_tokens",
			speech_encoder: "speech_encoder",
			model: "language_model",
			conditional_decoder: "conditional_decoder"
		}),
		cache_sessions: { model: !0 },
		optional_configs: { generation_config: "generation_config.json" }
	},
	[j.VoxtralRealtime]: {
		text_only_sessions: {
			embed_tokens: "embed_tokens",
			decoder_model_merged: "decoder_model_merged"
		},
		sessions: (e, t, r) => {
			const s = { ...nr[j.VoxtralRealtime].text_only_sessions };
			return r || (s.audio_encoder = "audio_encoder"), s;
		},
		cache_sessions: {
			decoder_model_merged: !0,
			audio_encoder: !0
		},
		optional_configs: { generation_config: "generation_config.json" }
	},
	default: { sessions: (e, t) => ({ model: t.model_file_name ?? "model" }) }
};
function Y2(e) {
	return nr[e]?.text_only_sessions ?? null;
}
function J2(e, t, r = {}) {
	const s = nr[e] ?? nr.default;
	return {
		sessions: s.sessions(t, r, r.textOnly ?? !1),
		cache_sessions: s.cache_sessions,
		optional_configs: s.optional_configs
	};
}
function rm(e, { warn: t = !0 } = {}) {
	const r = e.architectures || [];
	for (const s of r) {
		const n = ar.get(s);
		if (n !== void 0) return n;
	}
	if (e.model_type) {
		const s = ar.get(e.model_type);
		if (s !== void 0) return s;
		for (const n of Object.values(ss)) if (n.has(e.model_type)) {
			const a = ar.get(n.get(e.model_type));
			if (a !== void 0) return a;
		}
	}
	if (t) {
		const s = r.length > 0 ? r.join(", ") : "(none)";
		oe.warn(`[resolve_model_type] Architecture(s) not found in MODEL_TYPE_MAPPING: [${s}] for model type '${e.model_type}'. Falling back to EncoderOnly (single model.onnx file). If you encounter issues, please report at: ${ca}`);
	}
	return j.EncoderOnly;
}
function sm(e, { config: t = null, cache_dir: r = null, local_files_only: s = !1, revision: n = "main" } = {}) {
	return t !== null ? Zs.from_pretrained(e, {
		config: t,
		cache_dir: r,
		local_files_only: s,
		revision: n
	}) : j_(JSON.stringify([
		e,
		r,
		s,
		n
	]), () => Zs.from_pretrained(e, {
		config: t,
		cache_dir: r,
		local_files_only: s,
		revision: n
	}));
}
async function nm(e, { config: t = null, dtype: r = null, device: s = null, model_file_name: n = null } = {}) {
	t = await sm(e, { config: t });
	const a = ["config.json"], o = t["transformers.js_config"] ?? {}, i = o.use_external_data_format, l = "onnx", c = s ?? o.device;
	let d = r ?? o.dtype;
	const h = rm(t), _ = (w, b = null) => {
		b = b ?? w;
		const M = rp(c, w), E = ea[sp(d, w, M)] ?? "", A = `${b}${E}.onnx`, k = `${l}/${A}`;
		a.push(k);
		const C = Xp(i, A, w);
		for (const O of Yp(A, C)) {
			const x = `${l}/${O}`;
			a.push(x);
		}
	}, { sessions: m, optional_configs: v } = J2(h, t, { model_file_name: n });
	for (const [w, b] of Object.entries(m)) _(w, b);
	if (v) for (const w of Object.values(v)) a.push(w);
	return a;
}
var ss = null;
function K2(e) {
	ss = e;
}
function si(e) {
	if (e instanceof V) return e;
	if (e.length === 0) throw Error("items must be non-empty");
	if (Array.isArray(e[0])) {
		if (e.some((t) => t.length !== e[0].length)) throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.");
		return new V("int64", BigInt64Array.from(e.flat().map((t) => BigInt(t))), [e.length, e[0].length]);
	} else return new V("int64", BigInt64Array.from(e.map((t) => BigInt(t))), [1, e.length]);
}
function am(e) {
	return new V("bool", [e], [1]);
}
var kf = {
	[j.DecoderOnly]: {
		can_generate: !0,
		forward: ir,
		prepare_inputs: Qs
	},
	[j.DecoderOnlyWithoutHead]: {
		can_generate: !1,
		forward: ir,
		prepare_inputs: Qs
	},
	[j.Seq2Seq]: {
		can_generate: !0,
		forward: zn,
		prepare_inputs: ra
	},
	[j.Vision2Seq]: {
		can_generate: !0,
		forward: zn,
		prepare_inputs: ra
	},
	[j.Musicgen]: {
		can_generate: !0,
		forward: zn
	},
	[j.EncoderDecoder]: {
		can_generate: !1,
		forward: zn
	},
	[j.ImageTextToText]: {
		can_generate: !0,
		forward: rA,
		prepare_inputs: Bn
	},
	[j.AudioTextToText]: {
		can_generate: !0,
		forward: tA,
		prepare_inputs: Bn
	},
	[j.ImageAudioTextToText]: {
		can_generate: !0,
		prepare_inputs: Bn
	},
	[j.Phi3V]: {
		can_generate: !0,
		prepare_inputs: Bn
	},
	[j.MultiModality]: { can_generate: !0 },
	[j.AutoEncoder]: {
		can_generate: !1,
		forward: Z2
	},
	[j.Chatterbox]: {
		can_generate: !0,
		forward: xr
	},
	[j.VoxtralRealtime]: {
		can_generate: !0,
		prepare_inputs: Qs
	},
	default: {
		can_generate: !1,
		forward: xr
	}
};
function Tf(e, t) {
	let r = ar.get(e), s = !1;
	const n = t?.architectures?.[0];
	if (n && n !== e && e?.endsWith("ForCausalLM") && n.endsWith("ForConditionalGeneration")) {
		const i = ar.get(n);
		i !== void 0 && (r = i, s = !0);
	}
	const a = kf[r] ?? kf.default, o = nr[r] ?? nr.default;
	return {
		typeConfig: {
			...a,
			...o
		},
		textOnly: s,
		modelType: r
	};
}
var ar = /* @__PURE__ */ new Map(), qi = /* @__PURE__ */ new Map(), cs = /* @__PURE__ */ new Map(), S = class extends _t {
	main_input_name = "input_ids";
	forward_params = ["input_ids", "attention_mask"];
	_return_dict_in_generate_keys = null;
	constructor(e, t, r) {
		super(), this.config = e, this.sessions = t, this.configs = r;
		const { typeConfig: s } = Tf(cs.get(this.constructor), e);
		this.can_generate = s.can_generate, this._forward = s.forward, this._prepare_inputs_for_generation = s.prepare_inputs, this.can_generate && this.forward_params.push("past_key_values"), this.custom_config = this.config["transformers.js_config"] ?? {};
	}
	async dispose() {
		const e = [];
		for (const t of Object.values(this.sessions)) e.push(t.release?.());
		return await Promise.all(e);
	}
	static async from_pretrained(e, { progress_callback: t = null, config: r = null, cache_dir: s = null, local_files_only: n = !1, revision: a = "main", model_file_name: o = null, subfolder: i = "onnx", device: l = null, dtype: c = null, use_external_data_format: d = null, session_options: h = {} } = {}) {
		const _ = {
			progress_callback: t,
			config: r,
			cache_dir: s,
			local_files_only: n,
			revision: a,
			model_file_name: o,
			subfolder: i,
			device: l,
			dtype: c,
			use_external_data_format: d,
			session_options: h
		}, m = cs.get(this);
		r = _.config = await Zs.from_pretrained(e, _);
		const { typeConfig: v, textOnly: w, modelType: b } = Tf(m, r);
		if (b === void 0) {
			const A = m ?? r?.model_type;
			A !== "custom" && oe.warn(`Model type for '${A}' not found, assuming encoder-only architecture. Please report this at ${ca}.`);
		}
		if (t && !(t instanceof Ho)) {
			const A = {};
			try {
				const k = await nm(e, {
					config: r,
					dtype: c,
					device: l,
					model_file_name: o
				});
				(await Promise.all(k.map((C) => sn(e, C, _)))).forEach((C, O) => {
					if (C.exists) {
						const x = k[O] === "config.json";
						A[k[O]] = {
							loaded: x ? C.size ?? 0 : 0,
							total: C.size ?? 0
						};
					}
				});
			} catch (k) {
				oe.warn(`Unable to fetch model file metadata for total progress tracking: ${k}`);
			}
			Object.keys(A).length > 0 && (_.progress_callback = new Ho(t, A));
		}
		const M = [S2(e, v.sessions(r, _, w), _, v.cache_sessions)];
		v.optional_configs && M.push(nA(e, v.optional_configs, _));
		const E = await Promise.all(M);
		return new this(r, ...E);
	}
	async _call(e) {
		return await this.forward(e);
	}
	async forward(e) {
		return await this._forward(this, e);
	}
	get generation_config() {
		return this.configs?.generation_config ?? null;
	}
	_get_logits_processor(e, t, r = null) {
		const s = new ri();
		if (e.repetition_penalty !== null && e.repetition_penalty !== 1 && s.push(new B2(e.repetition_penalty)), e.no_repeat_ngram_size !== null && e.no_repeat_ngram_size > 0 && s.push(new z2(e.no_repeat_ngram_size)), e.bad_words_ids !== null && s.push(new $2(e.bad_words_ids, e.eos_token_id)), e.min_length !== null && e.eos_token_id !== null && e.min_length > 0 && s.push(new R2(e.min_length, e.eos_token_id)), e.min_new_tokens !== null && e.eos_token_id !== null && e.min_new_tokens > 0 && s.push(new G2(t, e.min_new_tokens, e.eos_token_id)), e.forced_bos_token_id !== null && s.push(new I2(e.forced_bos_token_id)), e.forced_eos_token_id !== null && s.push(new O2(e.max_length, e.forced_eos_token_id)), e.suppress_tokens !== null && s.push(new N2(e.suppress_tokens)), e.begin_suppress_tokens !== null) {
			const n = t > 1 || e.forced_bos_token_id === null ? t : t + 1;
			s.push(new Kp(e.begin_suppress_tokens, n));
		}
		return e.guidance_scale !== null && e.guidance_scale > 1 && s.push(new V2(e.guidance_scale)), e.temperature === 0 && e.do_sample && (oe.warn("`do_sample` changed to false because `temperature: 0` implies greedy sampling (always selecting the most likely token), which is incompatible with `do_sample: true`."), e.do_sample = !1), e.do_sample && e.temperature !== null && e.temperature !== 1 && s.push(new U2(e.temperature)), r !== null && s.extend(r), s;
	}
	_prepare_generation_config(e, t, r = Zp) {
		const s = { ...this.config };
		for (const a of [
			"decoder",
			"generator",
			"text_config"
		]) a in s && Object.assign(s, s[a]);
		const n = new r(s);
		return Object.assign(n, this.generation_config ?? {}), e && Object.assign(n, e), t && Object.assign(n, Ke(t, Object.getOwnPropertyNames(n))), n;
	}
	_get_stopping_criteria(e, t = null) {
		const r = new em();
		return e.max_length !== null && r.push(new j2(e.max_length, this.config.max_position_embeddings ?? null)), e.eos_token_id !== null && r.push(new q2(e.eos_token_id)), t && r.extend(t), r;
	}
	_validate_model_class() {
		if (!this.can_generate) {
			const e = [
				ss.MODEL_FOR_CAUSAL_LM_MAPPING_NAMES,
				ss.MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES,
				ss.MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES,
				ss.MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES
			].filter(Boolean), t = cs.get(this.constructor), r = /* @__PURE__ */ new Set(), s = this.config.model_type;
			for (const a of e) {
				const o = a?.get(s);
				o && r.add(o);
			}
			let n = `The current model class (${t}) is not compatible with \`.generate()\`, as it doesn't have a language model head.`;
			throw r.size > 0 && (n += ` Please use the following class instead: ${[...r].join(", ")}`), Error(n);
		}
	}
	prepare_inputs_for_generation(...e) {
		if (!this._prepare_inputs_for_generation) throw new Error("prepare_inputs_for_generation is not implemented for this model.");
		return this._prepare_inputs_for_generation(this, ...e);
	}
	_update_model_kwargs_for_generation({ generated_input_ids: e, outputs: t, model_inputs: r, is_encoder_decoder: s }) {
		return r.past_key_values = ni(t, r.past_key_values), r.input_ids = new V("int64", e.flat(), [e.length, 1]), s ? "decoder_attention_mask" in r && (r.decoder_attention_mask = Ne([r.decoder_attention_mask, ft([r.decoder_attention_mask.dims[0], 1])], 1)) : r.attention_mask = Ne([r.attention_mask, ft([r.attention_mask.dims[0], 1])], 1), r.position_ids = null, r;
	}
	_prepare_model_inputs({ inputs: e, bos_token_id: t, model_kwargs: r }) {
		const s = Ke(r, this.forward_params), n = this.main_input_name;
		if (n in s) {
			if (e) throw new Error("`inputs`: {inputs}` were passed alongside {input_name} which is not allowed. Make sure to either pass {inputs} or {input_name}=...");
		} else s[n] = e;
		return {
			inputs_tensor: s[n],
			model_inputs: s,
			model_input_name: n
		};
	}
	async _prepare_encoder_decoder_kwargs_for_generation({ inputs_tensor: e, model_inputs: t, model_input_name: r, generation_config: s }) {
		if (this.sessions.model.inputNames.includes("inputs_embeds") && !t.inputs_embeds && "_prepare_inputs_embeds" in this) {
			const { input_ids: a, pixel_values: o, attention_mask: i, ...l } = t, c = await this._prepare_inputs_embeds(t);
			t = {
				...l,
				...Ke(c, ["inputs_embeds", "attention_mask"])
			};
		}
		let { last_hidden_state: n } = await xr(this, t);
		if (s.guidance_scale !== null && s.guidance_scale > 1) n = Ne([n, Jo(n, 0)], 0), "attention_mask" in t && (t.attention_mask = Ne([t.attention_mask, lp(t.attention_mask)], 0));
		else if (t.decoder_input_ids) {
			const a = si(t.decoder_input_ids).dims[0];
			if (a !== n.dims[0]) {
				if (n.dims[0] !== 1) throw new Error(`The encoder outputs have a different batch size (${n.dims[0]}) than the decoder inputs (${a}).`);
				n = Ne(Array.from({ length: a }, () => n), 0);
			}
		}
		return t.encoder_outputs = n, t;
	}
	_prepare_decoder_input_ids_for_generation({ batch_size: e, model_input_name: t, model_kwargs: r, decoder_start_token_id: s, bos_token_id: n, generation_config: a }) {
		let { decoder_input_ids: o, ...i } = r;
		if (!(o instanceof V)) {
			if (o) Array.isArray(o[0]) || (o = Array.from({ length: e }, () => o));
			else if (s ??= n, this.config.model_type === "musicgen") o = Array.from({ length: e * this.config.decoder.num_codebooks }, () => [s]);
			else if (Array.isArray(s)) {
				if (s.length !== e) throw new Error(`\`decoder_start_token_id\` expcted to have length ${e} but got ${s.length}`);
				o = s;
			} else o = Array.from({ length: e }, () => [s]);
			o = si(o);
		}
		return i.decoder_attention_mask = op(o), {
			input_ids: o,
			model_inputs: i
		};
	}
	async generate({ inputs: e = null, generation_config: t = null, logits_processor: r = null, stopping_criteria: s = null, streamer: n = null, ...a }) {
		this._validate_model_class(), t = this._prepare_generation_config(t, a);
		let { inputs_tensor: o, model_inputs: i, model_input_name: l } = this._prepare_model_inputs({
			inputs: e,
			model_kwargs: a
		});
		const c = this.config.is_encoder_decoder;
		c && ("encoder_outputs" in i || (i = await this._prepare_encoder_decoder_kwargs_for_generation({
			inputs_tensor: o,
			model_inputs: i,
			model_input_name: l,
			generation_config: t
		})));
		let d;
		c ? {input_ids: d, model_inputs: i} = this._prepare_decoder_input_ids_for_generation({
			batch_size: i[l].dims.at(0),
			model_input_name: l,
			model_kwargs: i,
			decoder_start_token_id: t.decoder_start_token_id,
			bos_token_id: t.bos_token_id,
			generation_config: t
		}) : d = i[l];
		let h = d.dims.at(-1);
		t.max_new_tokens !== null && (t.max_length = h + t.max_new_tokens);
		const _ = this._get_logits_processor(t, h, r), m = this._get_stopping_criteria(t, s), v = i[l].dims.at(0), w = fa.getSampler(t), b = new Array(v).fill(0), M = d.tolist();
		n && n.put(M);
		let E, A = {}, k = {};
		for (;;) {
			if (i = this.prepare_inputs_for_generation(M, i, t), E = await this.forward(i), t.return_dict_in_generate) if (t.output_attentions) {
				const G = eA(E);
				for (const W in G) W in A || (A[W] = []), A[W].push(G[W]);
			} else this._return_dict_in_generate_keys && Object.assign(k, Ke(E, this._return_dict_in_generate_keys));
			const q = _(M, E.logits.slice(null, -1, null).to("float32")), R = [];
			for (let G = 0; G < q.dims.at(0); ++G) {
				const W = q[G], H = await w(W);
				for (const [D, F] of H) {
					const U = BigInt(D);
					b[G] += F, M[G].push(U), R.push([U]);
					break;
				}
			}
			if (n && n.put(R), m(M).every((G) => G)) break;
			i = this._update_model_kwargs_for_generation({
				generated_input_ids: R,
				outputs: E,
				model_inputs: i,
				is_encoder_decoder: c
			});
		}
		n && n.end();
		const C = new V("int64", M.flat(), [M.length, M[0].length]), O = ni(E, i.past_key_values), x = new Set(Object.values(O));
		for (const q of Object.values(E)) q.location === "gpu-buffer" && !x.has(q) && q.dispose();
		return "past_key_values" in a || t.return_dict_in_generate || await O.dispose(), t.return_dict_in_generate ? {
			sequences: C,
			past_key_values: O,
			...A,
			...k
		} : C;
	}
	async _encode_input(e, t, r) {
		if (!Object.hasOwn(this.sessions, e)) throw new Error(`Model does not have a ${e} session.`);
		const s = this.sessions[e];
		return (await ye(s, Ke(t, s.inputNames)))[r];
	}
	async encode_image(e) {
		return this._encode_input("vision_encoder", e, "image_features");
	}
	async encode_text(e) {
		return this._encode_input("embed_tokens", e, "inputs_embeds");
	}
	async encode_audio(e) {
		return this._encode_input("audio_encoder", e, "audio_features");
	}
};
async function zn(e, t) {
	let { encoder_outputs: r, input_ids: s, decoder_input_ids: n, decoder_attention_mask: a, ...o } = t;
	return r || (r = (await xr(e, Ke(t, e.sessions.model.inputNames))).last_hidden_state), o.input_ids = n, o.encoder_hidden_states = r, e.sessions.decoder_model_merged.inputNames.includes("encoder_attention_mask") && (o.encoder_attention_mask = t.attention_mask), a && !o.attention_mask && (o.attention_mask = a), await ir(e, o, !0);
}
async function xr(e, t) {
	const r = e.sessions.model, s = Ke(t, r.inputNames);
	if (r.inputNames.includes("inputs_embeds") && !s.inputs_embeds) {
		if (!t.input_ids) throw new Error("Both `input_ids` and `inputs_embeds` are missing in the model inputs.");
		s.inputs_embeds = await e.encode_text({ input_ids: t.input_ids });
	}
	if (r.inputNames.includes("token_type_ids") && !s.token_type_ids) {
		if (!s.input_ids) throw new Error("Both `input_ids` and `token_type_ids` are missing in the model inputs.");
		s.token_type_ids = lp(s.input_ids);
	}
	if (r.inputNames.includes("pixel_mask") && !s.pixel_mask) {
		if (!s.pixel_values) throw new Error("Both `pixel_values` and `pixel_mask` are missing in the model inputs.");
		const n = s.pixel_values.dims;
		s.pixel_mask = ft([
			n[0],
			n[2],
			n[3]
		]);
	}
	return await ye(r, s);
}
async function Z2(e, t) {
	const r = await e.encode(t);
	return await e.decode(r);
}
function ni(e, t) {
	const r = Object.create(null);
	for (const s in e) if (s.startsWith("present")) {
		const n = s.replace("present_ssm", "past_ssm").replace("present_conv", "past_conv").replace("present_recurrent", "past_recurrent").replace("present", "past_key_values");
		s.includes("encoder") && t ? r[n] = t[n] : r[n] = e[s];
	}
	return t ? (t.update(r), t) : new ji(r);
}
function eA(e) {
	const t = {};
	for (const r of [
		"cross_attentions",
		"encoder_attentions",
		"decoder_attentions"
	]) for (const s in e) s.startsWith(r) && (r in t || (t[r] = []), t[r].push(e[s]));
	return t;
}
function om(e, t) {
	return e.map((r) => typeof r == "number" ? r : t[r] ?? 0);
}
function Wi(e, t, r) {
	if (r && Object.keys(r).length > 0) return Object.assign(t, r), r;
	const s = e.sessions.decoder_model_merged ?? e.sessions.model, n = (t[e.main_input_name] ?? t.attention_mask)?.dims?.[0] ?? 1, a = da(e.config), o = e.config?.normalized_config?.num_heads, i = { batch_size: n };
	typeof o == "number" && (i["batch_size x num_heads"] = n * o);
	const l = Object.create(null);
	for (const c of s.inputMetadata) {
		if (!a.has(c.name)) continue;
		const d = om(c.shape, i), h = d.reduce((v, w) => v * w, 1), _ = Js[c.type], m = new V(c.type, new _(h), d);
		t[c.name] = m, l[c.name] = m;
	}
	return r ? (r.update(l), r) : new ji(l);
}
async function ir(e, t, r = !1) {
	const s = e.sessions[r ? "decoder_model_merged" : "model"], { past_key_values: n, ...a } = t;
	return s.inputNames.includes("use_cache_branch") && (a.use_cache_branch = am(n != null && Object.keys(n).length > 0)), s.inputNames.includes("position_ids") && a.attention_mask && !a.position_ids && (a.position_ids = sA(a, n, [
		"paligemma",
		"gemma3_text",
		"gemma3"
	].includes(e.config.model_type) ? 1 : 0)), s.inputNames.includes("num_logits_to_keep") && !a.num_logits_to_keep && (a.num_logits_to_keep = new V("int64", [0n], [])), Wi(e, a, n), await ye(s, Ke(a, s.inputNames));
}
async function im(e, { encode_function: t, merge_function: r, modality_input_names: s, modality_output_name: n, input_ids: a = null, attention_mask: o = null, position_ids: i = null, inputs_embeds: l = null, past_key_values: c = null, generation_config: d = null, logits_processor: h = null, ..._ }) {
	if (!l) {
		l = await e.encode_text({
			input_ids: a,
			..._
		});
		const m = Ke(_, s);
		if (Object.keys(m).length > 0) {
			if (a.dims[1] !== 1) {
				const v = await t({
					...m,
					..._
				});
				({inputs_embeds: l, attention_mask: o} = r({
					[n]: v,
					inputs_embeds: l,
					input_ids: a,
					attention_mask: o
				}));
			} else if (c && a.dims[1] === 1) {
				const v = a.dims[1], w = c.get_seq_length();
				o = Ne([ft([a.dims[0], w]), o.slice(null, [o.dims[1] - v, o.dims[1]])], 1);
			}
		}
	}
	if (!i && [
		"qwen2_vl",
		"qwen2_vl_text",
		"qwen2_5_vl",
		"qwen2_5_vl_text",
		"qwen3_vl",
		"qwen3_vl_text",
		"qwen3_vl_moe",
		"qwen3_vl_moe_text",
		"qwen3_5",
		"qwen3_5_text",
		"qwen3_5_moe",
		"qwen3_5_moe_text",
		"glm_ocr",
		"glm_ocr_text"
	].includes(e.config.model_type)) {
		const { image_grid_thw: m, video_grid_thw: v } = _;
		[i] = e.get_rope_index(a, m, v, o);
	}
	return await ir(e, {
		inputs_embeds: l,
		past_key_values: c,
		attention_mask: o,
		position_ids: i,
		generation_config: d,
		logits_processor: h
	}, !0);
}
async function tA(e, t) {
	return await im(e, {
		...t,
		modality_input_names: ["audio_values", "input_features"],
		modality_output_name: "audio_features",
		encode_function: e.encode_audio.bind(e),
		merge_function: e._merge_input_ids_with_audio_features.bind(e)
	});
}
async function rA(e, t) {
	return await im(e, {
		...t,
		modality_input_names: ["pixel_values"],
		modality_output_name: "image_features",
		encode_function: e.encode_image.bind(e),
		merge_function: e._merge_input_ids_with_image_features.bind(e)
	});
}
function lm(e, t = 0) {
	const [r, s] = e.dims, n = e.data, a = new BigInt64Array(n.length);
	for (let o = 0; o < r; ++o) {
		const i = o * s;
		let l = BigInt(t);
		for (let c = 0; c < s; ++c) {
			const d = i + c;
			n[d] === 0n ? a[d] = BigInt(1) : (a[d] = l, l += n[d]);
		}
	}
	return {
		data: a,
		dims: e.dims
	};
}
function sA(e, t = null, r = 0) {
	const { input_ids: s, inputs_embeds: n, attention_mask: a } = e, { data: o, dims: i } = lm(a, r);
	let l = new V("int64", o, i);
	if (t) {
		const c = -(s ?? n).dims.at(1);
		l = l.slice(null, [c, null]);
	}
	return l;
}
function Qs(e, t, r, s) {
	const n = r.past_key_values ? r.past_key_values.get_seq_length() : 0;
	if ((e.sessions.decoder_model_merged ?? e.sessions.model)?.inputNames.includes("num_logits_to_keep") && !r.num_logits_to_keep && (r.num_logits_to_keep = new V("int64", [1n], [])), !r.attention_mask) {
		let a;
		for (const o of [
			"input_ids",
			"inputs_embeds",
			"position_ids"
		]) if (r[o]) {
			a = r[o].dims;
			break;
		}
		if (!a) throw new Error("attention_mask is not provided, and unable to infer its shape from model inputs.");
		r.attention_mask = ft([a[0], n + a[1]]);
	}
	if (r.past_key_values) {
		const { input_ids: a, attention_mask: o } = r;
		o && o.dims[1] > a.dims[1] || n < a.dims[1] && (r.input_ids = a.slice(null, [n, null]));
	}
	return r;
}
function ra(e, t, r, s) {
	return r.past_key_values && (t = t.map((n) => [n.at(-1)])), {
		...r,
		decoder_input_ids: si(t)
	};
}
function Bn(e, ...t) {
	return e.config.is_encoder_decoder ? ra(e, ...t) : Qs(e, ...t);
}
function cm({ modality_token_id: e, inputs_embeds: t, modality_features: r, input_ids: s, attention_mask: n }) {
	const a = s.tolist().map((c) => c.reduce((d, h, _) => (h == e && d.push(_), d), [])), o = a.reduce((c, d) => c + d.length, 0), i = r.dims[0];
	if (o !== i) throw new Error(`Number of tokens and features do not match: tokens: ${o}, features ${i}`);
	let l = 0;
	for (let c = 0; c < a.length; ++c) {
		const d = a[c], h = t[c];
		for (let _ = 0; _ < d.length; ++_) h[d[_]].data.set(r[l++].data);
	}
	return {
		inputs_embeds: t,
		attention_mask: n
	};
}
function Hi({ image_token_id: e, inputs_embeds: t, image_features: r, input_ids: s, attention_mask: n }) {
	return cm({
		modality_token_id: e,
		inputs_embeds: t,
		modality_features: r,
		input_ids: s,
		attention_mask: n
	});
}
function um({ audio_token_id: e, inputs_embeds: t, audio_features: r, input_ids: s, attention_mask: n }) {
	return cm({
		modality_token_id: e,
		inputs_embeds: t,
		modality_features: r,
		input_ids: s,
		attention_mask: n
	});
}
async function nA(e, t, r) {
	return Object.fromEntries(await Promise.all(Object.keys(t).map(async (s) => [s, await Yt(e, t[s], !1, r)])));
}
var Qi = {};
ds(Qi, {
	ASTForAudioClassification: () => mA,
	ASTModel: () => pA,
	ASTPreTrainedModel: () => Ki,
	AfmoeForCausalLM: () => hA,
	AfmoeModel: () => dA,
	AfmoePreTrainedModel: () => Yi,
	AlbertForMaskedLM: () => lA,
	AlbertForQuestionAnswering: () => iA,
	AlbertForSequenceClassification: () => oA,
	AlbertModel: () => aA,
	AlbertPreTrainedModel: () => nn,
	ApertusForCausalLM: () => uA,
	ApertusModel: () => cA,
	ApertusPreTrainedModel: () => Xi,
	ArceeForCausalLM: () => _A,
	ArceeModel: () => fA,
	ArceePreTrainedModel: () => Ji,
	BartForConditionalGeneration: () => wA,
	BartForSequenceClassification: () => vA,
	BartModel: () => gA,
	BartPretrainedModel: () => _a,
	BeitForImageClassification: () => bA,
	BeitModel: () => yA,
	BeitPreTrainedModel: () => Zi,
	BertForMaskedLM: () => xA,
	BertForQuestionAnswering: () => EA,
	BertForSequenceClassification: () => kA,
	BertForTokenClassification: () => TA,
	BertModel: () => MA,
	BertPreTrainedModel: () => ps,
	BlenderbotForConditionalGeneration: () => CA,
	BlenderbotModel: () => AA,
	BlenderbotPreTrainedModel: () => el,
	BlenderbotSmallForConditionalGeneration: () => PA,
	BlenderbotSmallModel: () => SA,
	BlenderbotSmallPreTrainedModel: () => tl,
	BloomForCausalLM: () => LA,
	BloomModel: () => FA,
	BloomPreTrainedModel: () => rl,
	CHMv2ForDepthEstimation: () => GA,
	CHMv2PreTrainedModel: () => _m,
	CLIPModel: () => VA,
	CLIPPreTrainedModel: () => $r,
	CLIPSegForImageSegmentation: () => HA,
	CLIPSegModel: () => WA,
	CLIPSegPreTrainedModel: () => sl,
	CLIPTextModel: () => UA,
	CLIPTextModelWithProjection: () => gm,
	CLIPVisionModel: () => jA,
	CLIPVisionModelWithProjection: () => qA,
	CamembertForMaskedLM: () => OA,
	CamembertForQuestionAnswering: () => zA,
	CamembertForSequenceClassification: () => NA,
	CamembertForTokenClassification: () => DA,
	CamembertModel: () => IA,
	CamembertPreTrainedModel: () => ms,
	ChatterboxModel: () => hm,
	ChatterboxPreTrainedModel: () => dm,
	ChineseCLIPModel: () => RA,
	ChineseCLIPPreTrainedModel: () => fm,
	ClapAudioModelWithProjection: () => mm,
	ClapModel: () => $A,
	ClapPreTrainedModel: () => pa,
	ClapTextModelWithProjection: () => pm,
	CodeGenForCausalLM: () => XA,
	CodeGenModel: () => QA,
	CodeGenPreTrainedModel: () => nl,
	Cohere2ForCausalLM: () => ZA,
	Cohere2Model: () => KA,
	Cohere2PreTrainedModel: () => ol,
	CohereAsrForConditionalGeneration: () => tC,
	CohereAsrModel: () => eC,
	CohereAsrPreTrainedModel: () => il,
	CohereForCausalLM: () => JA,
	CohereModel: () => YA,
	CoherePreTrainedModel: () => al,
	ConvBertForMaskedLM: () => sC,
	ConvBertForQuestionAnswering: () => oC,
	ConvBertForSequenceClassification: () => nC,
	ConvBertForTokenClassification: () => aC,
	ConvBertModel: () => rC,
	ConvBertPreTrainedModel: () => gs,
	ConvNextForImageClassification: () => lC,
	ConvNextModel: () => iC,
	ConvNextPreTrainedModel: () => ll,
	ConvNextV2ForImageClassification: () => uC,
	ConvNextV2Model: () => cC,
	ConvNextV2PreTrainedModel: () => cl,
	DFineForObjectDetection: () => _C,
	DFineModel: () => fC,
	DFinePreTrainedModel: () => dl,
	DINOv3ConvNextModel: () => GC,
	DINOv3ConvNextPreTrainedModel: () => Em,
	DINOv3ViTModel: () => $C,
	DINOv3ViTPreTrainedModel: () => Am,
	DPTForDepthEstimation: () => XC,
	DPTModel: () => QC,
	DPTPreTrainedModel: () => gl,
	DacDecoderModel: () => bm,
	DacDecoderOutput: () => vm,
	DacEncoderModel: () => ym,
	DacEncoderOutput: () => wm,
	DacModel: () => pC,
	DacPreTrainedModel: () => ma,
	DebertaForMaskedLM: () => gC,
	DebertaForQuestionAnswering: () => yC,
	DebertaForSequenceClassification: () => wC,
	DebertaForTokenClassification: () => vC,
	DebertaModel: () => mC,
	DebertaPreTrainedModel: () => ws,
	DebertaV2ForMaskedLM: () => kC,
	DebertaV2ForQuestionAnswering: () => AC,
	DebertaV2ForSequenceClassification: () => TC,
	DebertaV2ForTokenClassification: () => EC,
	DebertaV2Model: () => xC,
	DebertaV2PreTrainedModel: () => vs,
	DecisionTransformerModel: () => CC,
	DecisionTransformerPreTrainedModel: () => Mm,
	DeepseekV3ForCausalLM: () => MC,
	DeepseekV3Model: () => bC,
	DeepseekV3PreTrainedModel: () => hl,
	DeiTForImageClassification: () => PC,
	DeiTModel: () => SC,
	DeiTPreTrainedModel: () => fl,
	DepthAnythingForDepthEstimation: () => FC,
	DepthAnythingPreTrainedModel: () => xm,
	DepthProForDepthEstimation: () => LC,
	DepthProPreTrainedModel: () => km,
	DetrForObjectDetection: () => OC,
	DetrForSegmentation: () => NC,
	DetrModel: () => IC,
	DetrObjectDetectionOutput: () => _l,
	DetrPreTrainedModel: () => ga,
	DetrSegmentationOutput: () => Tm,
	Dinov2ForImageClassification: () => zC,
	Dinov2Model: () => DC,
	Dinov2PreTrainedModel: () => pl,
	Dinov2WithRegistersForImageClassification: () => RC,
	Dinov2WithRegistersModel: () => BC,
	Dinov2WithRegistersPreTrainedModel: () => ml,
	DistilBertForMaskedLM: () => WC,
	DistilBertForQuestionAnswering: () => qC,
	DistilBertForSequenceClassification: () => UC,
	DistilBertForTokenClassification: () => jC,
	DistilBertModel: () => VC,
	DistilBertPreTrainedModel: () => ys,
	DonutSwinModel: () => HC,
	DonutSwinPreTrainedModel: () => Cm,
	EdgeTamModel: () => oI,
	EfficientNetForImageClassification: () => JC,
	EfficientNetModel: () => YC,
	EfficientNetPreTrainedModel: () => wl,
	ElectraForMaskedLM: () => ZC,
	ElectraForQuestionAnswering: () => rS,
	ElectraForSequenceClassification: () => eS,
	ElectraForTokenClassification: () => tS,
	ElectraModel: () => KC,
	ElectraPreTrainedModel: () => bs,
	Ernie4_5ForCausalLM: () => nS,
	Ernie4_5Model: () => sS,
	Ernie4_5PretrainedModel: () => vl,
	EsmForMaskedLM: () => oS,
	EsmForSequenceClassification: () => iS,
	EsmForTokenClassification: () => lS,
	EsmModel: () => aS,
	EsmPreTrainedModel: () => on,
	EuroBertForMaskedLM: () => uS,
	EuroBertForSequenceClassification: () => dS,
	EuroBertForTokenClassification: () => hS,
	EuroBertModel: () => cS,
	EuroBertPreTrainedModel: () => ln,
	ExaoneForCausalLM: () => _S,
	ExaoneModel: () => fS,
	ExaonePreTrainedModel: () => yl,
	FalconForCausalLM: () => mS,
	FalconH1ForCausalLM: () => wS,
	FalconH1Model: () => gS,
	FalconH1PreTrainedModel: () => Ml,
	FalconModel: () => pS,
	FalconPreTrainedModel: () => bl,
	FastViTForImageClassification: () => yS,
	FastViTModel: () => vS,
	FastViTPreTrainedModel: () => xl,
	Florence2ForConditionalGeneration: () => bS,
	Florence2PreTrainedModel: () => Sm,
	GLPNForDepthEstimation: () => BS,
	GLPNModel: () => zS,
	GLPNPreTrainedModel: () => Fl,
	GPT2LMHeadModel: () => QS,
	GPT2Model: () => HS,
	GPT2PreTrainedModel: () => Dl,
	GPTBigCodeForCausalLM: () => GS,
	GPTBigCodeModel: () => RS,
	GPTBigCodePreTrainedModel: () => Ll,
	GPTJForCausalLM: () => YS,
	GPTJModel: () => XS,
	GPTJPreTrainedModel: () => zl,
	GPTNeoForCausalLM: () => VS,
	GPTNeoModel: () => $S,
	GPTNeoPreTrainedModel: () => Il,
	GPTNeoXForCausalLM: () => jS,
	GPTNeoXModel: () => US,
	GPTNeoXPreTrainedModel: () => Ol,
	Gemma2ForCausalLM: () => TS,
	Gemma2Model: () => kS,
	Gemma2PreTrainedModel: () => Tl,
	Gemma3ForCausalLM: () => SS,
	Gemma3ForConditionalGeneration: () => Lm,
	Gemma3Model: () => CS,
	Gemma3PreTrainedModel: () => Fm,
	Gemma3nForCausalLM: () => PS,
	Gemma3nForConditionalGeneration: () => wa,
	Gemma3nPreTrainedModel: () => Im,
	Gemma4ForCausalLM: () => FS,
	Gemma4ForConditionalGeneration: () => El,
	GemmaForCausalLM: () => xS,
	GemmaModel: () => MS,
	GemmaPreTrainedModel: () => kl,
	GlmForCausalLM: () => IS,
	GlmModel: () => LS,
	GlmMoeDsaForCausalLM: () => NS,
	GlmMoeDsaModel: () => OS,
	GlmMoeDsaPreTrainedModel: () => Cl,
	GlmOcrForConditionalGeneration: () => DS,
	GlmPreTrainedModel: () => Al,
	GptOssForCausalLM: () => WS,
	GptOssModel: () => qS,
	GptOssPreTrainedModel: () => Nl,
	GraniteForCausalLM: () => KS,
	GraniteModel: () => JS,
	GraniteMoeHybridForCausalLM: () => eP,
	GraniteMoeHybridModel: () => ZS,
	GraniteMoeHybridPreTrainedModel: () => Rl,
	GranitePreTrainedModel: () => Bl,
	GraniteSpeechForConditionalGeneration: () => tP,
	GroundingDinoForObjectDetection: () => rP,
	GroundingDinoPreTrainedModel: () => Bm,
	GroupViTModel: () => sP,
	GroupViTPreTrainedModel: () => Rm,
	HeliumForCausalLM: () => aP,
	HeliumModel: () => nP,
	HeliumPreTrainedModel: () => $l,
	HieraForImageClassification: () => iP,
	HieraModel: () => oP,
	HieraPreTrainedModel: () => Vl,
	HubertForCTC: () => _P,
	HubertForSequenceClassification: () => pP,
	HubertModel: () => fP,
	HubertPreTrainedModel: () => hP,
	HunYuanDenseV1ForCausalLM: () => gP,
	HunYuanDenseV1Model: () => mP,
	HunYuanDenseV1PreTrainedModel: () => Ul,
	IJepaForImageClassification: () => vP,
	IJepaModel: () => wP,
	IJepaPreTrainedModel: () => jl,
	Idefics3ForConditionalGeneration: () => Gm,
	JAISLMHeadModel: () => bP,
	JAISModel: () => yP,
	JAISPreTrainedModel: () => ql,
	JinaCLIPModel: () => MP,
	JinaCLIPPreTrainedModel: () => va,
	JinaCLIPTextModel: () => $m,
	JinaCLIPVisionModel: () => xP,
	Lfm2ForCausalLM: () => TP,
	Lfm2Model: () => kP,
	Lfm2MoeForCausalLM: () => CP,
	Lfm2MoeModel: () => AP,
	Lfm2MoePreTrainedModel: () => Hl,
	Lfm2PreTrainedModel: () => Wl,
	Lfm2VlForConditionalGeneration: () => SP,
	LightOnOcrForConditionalGeneration: () => EP,
	LiteWhisperForConditionalGeneration: () => AO,
	Llama4ForCausalLM: () => LP,
	Llama4PreTrainedModel: () => Vm,
	LlamaForCausalLM: () => FP,
	LlamaModel: () => PP,
	LlamaPreTrainedModel: () => Ql,
	LlavaForConditionalGeneration: () => lr,
	LlavaOnevisionForConditionalGeneration: () => lr,
	LlavaPreTrainedModel: () => Pm,
	LlavaQwen2ForCausalLM: () => AS,
	LongT5ForConditionalGeneration: () => OP,
	LongT5Model: () => IP,
	LongT5PreTrainedModel: () => Xl,
	M2M100ForConditionalGeneration: () => DP,
	M2M100Model: () => NP,
	M2M100PreTrainedModel: () => Yl,
	MBartForCausalLM: () => jP,
	MBartForConditionalGeneration: () => VP,
	MBartForSequenceClassification: () => UP,
	MBartModel: () => $P,
	MBartPreTrainedModel: () => cn,
	MPNetForMaskedLM: () => PF,
	MPNetForQuestionAnswering: () => IF,
	MPNetForSequenceClassification: () => FF,
	MPNetForTokenClassification: () => LF,
	MPNetModel: () => SF,
	MPNetPreTrainedModel: () => Ms,
	MT5ForConditionalGeneration: () => zF,
	MT5Model: () => DF,
	MT5PreTrainedModel: () => ic,
	MarianMTModel: () => BP,
	MarianModel: () => zP,
	MarianPreTrainedModel: () => Jl,
	MaskFormerForInstanceSegmentation: () => GP,
	MaskFormerModel: () => RP,
	MaskFormerPreTrainedModel: () => Kl,
	Metric3DForDepthEstimation: () => qP,
	Metric3DPreTrainedModel: () => Um,
	Metric3Dv2ForDepthEstimation: () => WP,
	Metric3Dv2PreTrainedModel: () => jm,
	MgpstrForSceneTextRecognition: () => HP,
	MgpstrModelOutput: () => qm,
	MgpstrPreTrainedModel: () => Wm,
	MimiDecoderModel: () => Ym,
	MimiDecoderOutput: () => Qm,
	MimiEncoderModel: () => Xm,
	MimiEncoderOutput: () => Hm,
	MimiModel: () => QP,
	MimiPreTrainedModel: () => ya,
	Mistral4ForCausalLM: () => KP,
	Mistral4Model: () => JP,
	Mistral4PreTrainedModel: () => ec,
	MistralForCausalLM: () => YP,
	MistralModel: () => XP,
	MistralPreTrainedModel: () => Zl,
	MobileBertForMaskedLM: () => eF,
	MobileBertForQuestionAnswering: () => rF,
	MobileBertForSequenceClassification: () => tF,
	MobileBertModel: () => ZP,
	MobileBertPreTrainedModel: () => un,
	MobileLLMForCausalLM: () => nF,
	MobileLLMModel: () => sF,
	MobileLLMPreTrainedModel: () => tc,
	MobileNetV1ForImageClassification: () => oF,
	MobileNetV1ForSemanticSegmentation: () => iF,
	MobileNetV1Model: () => aF,
	MobileNetV1PreTrainedModel: () => ba,
	MobileNetV2ForImageClassification: () => cF,
	MobileNetV2ForSemanticSegmentation: () => uF,
	MobileNetV2Model: () => lF,
	MobileNetV2PreTrainedModel: () => Ma,
	MobileNetV3ForImageClassification: () => hF,
	MobileNetV3ForSemanticSegmentation: () => fF,
	MobileNetV3Model: () => dF,
	MobileNetV3PreTrainedModel: () => xa,
	MobileNetV4ForImageClassification: () => pF,
	MobileNetV4ForSemanticSegmentation: () => mF,
	MobileNetV4Model: () => _F,
	MobileNetV4PreTrainedModel: () => ka,
	MobileViTForImageClassification: () => wF,
	MobileViTModel: () => gF,
	MobileViTPreTrainedModel: () => rc,
	MobileViTV2ForImageClassification: () => yF,
	MobileViTV2Model: () => vF,
	MobileViTV2PreTrainedModel: () => sc,
	ModernBertDecoderForCausalLM: () => EF,
	ModernBertDecoderModel: () => TF,
	ModernBertDecoderPreTrainedModel: () => nc,
	ModernBertForMaskedLM: () => MF,
	ModernBertForSequenceClassification: () => xF,
	ModernBertForTokenClassification: () => kF,
	ModernBertModel: () => bF,
	ModernBertPreTrainedModel: () => dn,
	Moondream1ForConditionalGeneration: () => ES,
	MoonshineForConditionalGeneration: () => CF,
	MoonshineModel: () => AF,
	MoonshinePreTrainedModel: () => ac,
	MptForCausalLM: () => NF,
	MptModel: () => OF,
	MptPreTrainedModel: () => oc,
	MultiModalityCausalLM: () => BF,
	MultiModalityPreTrainedModel: () => Jm,
	MusicgenForCausalLM: () => GF,
	MusicgenForConditionalGeneration: () => Km,
	MusicgenModel: () => RF,
	MusicgenPreTrainedModel: () => lc,
	NanoChatForCausalLM: () => VF,
	NanoChatModel: () => $F,
	NanoChatPreTrainedModel: () => cc,
	NemotronHForCausalLM: () => jF,
	NemotronHModel: () => UF,
	NemotronHPreTrainedModel: () => uc,
	NeoBertForMaskedLM: () => WF,
	NeoBertForQuestionAnswering: () => XF,
	NeoBertForSequenceClassification: () => HF,
	NeoBertForTokenClassification: () => QF,
	NeoBertModel: () => qF,
	NeoBertPreTrainedModel: () => xs,
	NomicBertModel: () => YF,
	NomicBertPreTrainedModel: () => Zm,
	OPTForCausalLM: () => uL,
	OPTModel: () => cL,
	OPTPreTrainedModel: () => gc,
	Olmo2ForCausalLM: () => eL,
	Olmo2Model: () => ZF,
	Olmo2PreTrainedModel: () => hc,
	Olmo3ForCausalLM: () => rL,
	Olmo3Model: () => tL,
	Olmo3PreTrainedModel: () => fc,
	OlmoForCausalLM: () => KF,
	OlmoHybridForCausalLM: () => nL,
	OlmoHybridModel: () => sL,
	OlmoHybridPreTrainedModel: () => _c,
	OlmoModel: () => JF,
	OlmoPreTrainedModel: () => dc,
	OpenAIPrivacyFilterForTokenClassification: () => oL,
	OpenAIPrivacyFilterModel: () => aL,
	OpenAIPrivacyFilterPreTrainedModel: () => pc,
	OpenELMForCausalLM: () => lL,
	OpenELMModel: () => iL,
	OpenELMPreTrainedModel: () => mc,
	OwlViTForObjectDetection: () => _L,
	OwlViTModel: () => fL,
	OwlViTPreTrainedModel: () => vc,
	Owlv2ForObjectDetection: () => hL,
	Owlv2Model: () => dL,
	Owlv2PreTrainedModel: () => wc,
	PaliGemmaForConditionalGeneration: () => pL,
	ParakeetForCTC: () => mL,
	ParakeetPreTrainedModel: () => eg,
	PatchTSMixerForPrediction: () => wL,
	PatchTSMixerModel: () => gL,
	PatchTSMixerPreTrainedModel: () => yc,
	PatchTSTForPrediction: () => yL,
	PatchTSTModel: () => vL,
	PatchTSTPreTrainedModel: () => bc,
	Phi3ForCausalLM: () => kL,
	Phi3Model: () => xL,
	Phi3PreTrainedModel: () => xc,
	Phi3VForCausalLM: () => rg,
	Phi3VPreTrainedModel: () => tg,
	PhiForCausalLM: () => ML,
	PhiModel: () => bL,
	PhiPreTrainedModel: () => Mc,
	PreTrainedModel: () => S,
	PvtForImageClassification: () => EL,
	PvtModel: () => TL,
	PvtPreTrainedModel: () => kc,
	PyAnnoteForAudioFrameClassification: () => CL,
	PyAnnoteModel: () => AL,
	PyAnnotePreTrainedModel: () => Tc,
	Qwen2ForCausalLM: () => PL,
	Qwen2Model: () => SL,
	Qwen2MoeForCausalLM: () => LL,
	Qwen2MoeModel: () => FL,
	Qwen2MoePreTrainedModel: () => Ac,
	Qwen2PreTrainedModel: () => Ec,
	Qwen2VLForCausalLM: () => Nm,
	Qwen2VLForConditionalGeneration: () => Sl,
	Qwen2VLPreTrainedModel: () => Om,
	Qwen2_5_VLForCausalLM: () => Dm,
	Qwen2_5_VLForConditionalGeneration: () => Pl,
	Qwen3ForCausalLM: () => OL,
	Qwen3Model: () => IL,
	Qwen3MoeForCausalLM: () => DL,
	Qwen3MoeModel: () => NL,
	Qwen3MoePreTrainedModel: () => Sc,
	Qwen3NextForCausalLM: () => BL,
	Qwen3NextModel: () => zL,
	Qwen3NextPreTrainedModel: () => Pc,
	Qwen3PreTrainedModel: () => Cc,
	Qwen3VLForCausalLM: () => sg,
	Qwen3VLForConditionalGeneration: () => Fc,
	Qwen3VLMoeForCausalLM: () => GL,
	Qwen3VLMoeForConditionalGeneration: () => RL,
	Qwen3_5ForCausalLM: () => ng,
	Qwen3_5ForConditionalGeneration: () => Lc,
	Qwen3_5MoeForCausalLM: () => VL,
	Qwen3_5MoeForConditionalGeneration: () => $L,
	RFDetrForObjectDetection: () => WL,
	RFDetrModel: () => qL,
	RFDetrObjectDetectionOutput: () => ag,
	RFDetrPreTrainedModel: () => Oc,
	RTDetrForObjectDetection: () => hC,
	RTDetrModel: () => dC,
	RTDetrObjectDetectionOutput: () => an,
	RTDetrPreTrainedModel: () => ul,
	RTDetrV2ForObjectDetection: () => nI,
	RTDetrV2Model: () => sI,
	RTDetrV2ObjectDetectionOutput: () => og,
	RTDetrV2PreTrainedModel: () => Nc,
	ResNetForImageClassification: () => jL,
	ResNetModel: () => UL,
	ResNetPreTrainedModel: () => Ic,
	RoFormerForMaskedLM: () => ZL,
	RoFormerForQuestionAnswering: () => rI,
	RoFormerForSequenceClassification: () => eI,
	RoFormerForTokenClassification: () => tI,
	RoFormerModel: () => KL,
	RoFormerPreTrainedModel: () => Ts,
	RobertaForMaskedLM: () => QL,
	RobertaForQuestionAnswering: () => JL,
	RobertaForSequenceClassification: () => XL,
	RobertaForTokenClassification: () => YL,
	RobertaModel: () => HL,
	RobertaPreTrainedModel: () => ks,
	Sam2ImageSegmentationOutput: () => cg,
	Sam2Model: () => Dc,
	Sam2PreTrainedModel: () => ug,
	Sam3TrackerModel: () => iI,
	SamImageSegmentationOutput: () => ig,
	SamModel: () => aI,
	SamPreTrainedModel: () => lg,
	SapiensForDepthEstimation: () => cI,
	SapiensForNormalEstimation: () => uI,
	SapiensForSemanticSegmentation: () => lI,
	SapiensPreTrainedModel: () => Ta,
	SegformerForImageClassification: () => hI,
	SegformerForSemanticSegmentation: () => fI,
	SegformerModel: () => dI,
	SegformerPreTrainedModel: () => Ea,
	SiglipModel: () => _I,
	SiglipPreTrainedModel: () => zc,
	SiglipTextModel: () => dg,
	SiglipVisionModel: () => pI,
	SmolLM3ForCausalLM: () => gI,
	SmolLM3Model: () => mI,
	SmolLM3PreTrainedModel: () => Bc,
	SmolVLMForConditionalGeneration: () => wI,
	SnacDecoderModel: () => fg,
	SnacEncoderModel: () => hg,
	SnacModel: () => vI,
	SnacPreTrainedModel: () => Aa,
	SolarOpenForCausalLM: () => bI,
	SolarOpenModel: () => yI,
	SolarOpenPreTrainedModel: () => Rc,
	SpeechT5ForSpeechToText: () => xI,
	SpeechT5ForTextToSpeech: () => kI,
	SpeechT5HifiGan: () => TI,
	SpeechT5Model: () => MI,
	SpeechT5PreTrainedModel: () => Ca,
	SqueezeBertForMaskedLM: () => AI,
	SqueezeBertForQuestionAnswering: () => SI,
	SqueezeBertForSequenceClassification: () => CI,
	SqueezeBertModel: () => EI,
	SqueezeBertPreTrainedModel: () => hn,
	StableLmForCausalLM: () => FI,
	StableLmModel: () => PI,
	StableLmPreTrainedModel: () => Gc,
	Starcoder2ForCausalLM: () => II,
	Starcoder2Model: () => LI,
	Starcoder2PreTrainedModel: () => $c,
	StyleTextToSpeech2Model: () => OI,
	StyleTextToSpeech2PreTrainedModel: () => _g,
	SupertonicForConditionalGeneration: () => mg,
	SupertonicPreTrainedModel: () => pg,
	Swin2SRForImageSuperResolution: () => RI,
	Swin2SRModel: () => BI,
	Swin2SRPreTrainedModel: () => Vc,
	SwinForImageClassification: () => DI,
	SwinForSemanticSegmentation: () => zI,
	SwinModel: () => NI,
	SwinPreTrainedModel: () => Sa,
	T5ForConditionalGeneration: () => $I,
	T5Model: () => GI,
	T5PreTrainedModel: () => Uc,
	TableTransformerForObjectDetection: () => UI,
	TableTransformerModel: () => VI,
	TableTransformerObjectDetectionOutput: () => gg,
	TableTransformerPreTrainedModel: () => jc,
	TrOCRForCausalLM: () => jI,
	TrOCRPreTrainedModel: () => wg,
	UltravoxModel: () => Gl,
	UltravoxPreTrainedModel: () => zm,
	UniSpeechForCTC: () => WI,
	UniSpeechForSequenceClassification: () => HI,
	UniSpeechModel: () => qI,
	UniSpeechPreTrainedModel: () => Pa,
	UniSpeechSatForAudioFrameClassification: () => JI,
	UniSpeechSatForCTC: () => XI,
	UniSpeechSatForSequenceClassification: () => YI,
	UniSpeechSatModel: () => QI,
	UniSpeechSatPreTrainedModel: () => fn,
	VaultGemmaForCausalLM: () => ZI,
	VaultGemmaModel: () => KI,
	VaultGemmaPreTrainedModel: () => qc,
	ViTForImageClassification: () => rO,
	ViTMAEModel: () => sO,
	ViTMAEPreTrainedModel: () => vg,
	ViTMSNForImageClassification: () => aO,
	ViTMSNModel: () => nO,
	ViTMSNPreTrainedModel: () => Hc,
	ViTModel: () => tO,
	ViTPreTrainedModel: () => Wc,
	VisionEncoderDecoderModel: () => eO,
	VitMatteForImageMatting: () => oO,
	VitMattePreTrainedModel: () => yg,
	VitPoseForPoseEstimation: () => iO,
	VitPosePreTrainedModel: () => bg,
	VitsModel: () => lO,
	VitsModelOutput: () => Mg,
	VitsPreTrainedModel: () => xg,
	VoxtralForConditionalGeneration: () => cO,
	VoxtralRealtimeForConditionalGeneration: () => Tg,
	VoxtralRealtimePreTrainedModel: () => kg,
	Wav2Vec2BertForCTC: () => gO,
	Wav2Vec2BertForSequenceClassification: () => wO,
	Wav2Vec2BertModel: () => mO,
	Wav2Vec2BertPreTrainedModel: () => Fa,
	Wav2Vec2ForAudioFrameClassification: () => dP,
	Wav2Vec2ForCTC: () => cP,
	Wav2Vec2ForSequenceClassification: () => uP,
	Wav2Vec2Model: () => lP,
	Wav2Vec2PreTrainedModel: () => kr,
	WavLMForAudioFrameClassification: () => xO,
	WavLMForCTC: () => yO,
	WavLMForSequenceClassification: () => bO,
	WavLMForXVector: () => MO,
	WavLMModel: () => vO,
	WavLMPreTrainedModel: () => Es,
	WeSpeakerResNetModel: () => kO,
	WeSpeakerResNetPreTrainedModel: () => Ag,
	WhisperForConditionalGeneration: () => Cg,
	WhisperModel: () => EO,
	WhisperPreTrainedModel: () => Qc,
	XLMForQuestionAnswering: () => LO,
	XLMForSequenceClassification: () => PO,
	XLMForTokenClassification: () => FO,
	XLMModel: () => CO,
	XLMPreTrainedModel: () => As,
	XLMRobertaForMaskedLM: () => OO,
	XLMRobertaForQuestionAnswering: () => zO,
	XLMRobertaForSequenceClassification: () => NO,
	XLMRobertaForTokenClassification: () => DO,
	XLMRobertaModel: () => IO,
	XLMRobertaPreTrainedModel: () => Cs,
	XLMWithLMHeadModel: () => SO,
	XVectorOutput: () => Eg,
	YolosForObjectDetection: () => RO,
	YolosModel: () => BO,
	YolosObjectDetectionOutput: () => Sg,
	YolosPreTrainedModel: () => Xc,
	YoutuForCausalLM: () => $O,
	YoutuModel: () => GO,
	YoutuPreTrainedModel: () => Yc
});
var nn = class extends S {}, aA = class extends nn {}, oA = class extends nn {
	async _call(e) {
		return new re(await super._call(e));
	}
}, iA = class extends nn {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, lA = class extends nn {
	async _call(e) {
		return new He(await super._call(e));
	}
}, Xi = class extends S {}, cA = class extends Xi {}, uA = class extends Xi {}, Yi = class extends S {}, dA = class extends Yi {}, hA = class extends Yi {}, Ji = class extends S {}, fA = class extends Ji {}, _A = class extends Ji {}, Ki = class extends S {}, pA = class extends Ki {}, mA = class extends Ki {}, _a = class extends S {}, gA = class extends _a {}, wA = class extends _a {}, vA = class extends _a {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Zi = class extends S {}, yA = class extends Zi {}, bA = class extends Zi {
	async _call(e) {
		return new re(await super._call(e));
	}
}, ps = class extends S {}, MA = class extends ps {}, xA = class extends ps {
	async _call(e) {
		return new He(await super._call(e));
	}
}, kA = class extends ps {
	async _call(e) {
		return new re(await super._call(e));
	}
}, TA = class extends ps {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, EA = class extends ps {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, el = class extends S {}, AA = class extends el {}, CA = class extends el {}, tl = class extends S {}, SA = class extends tl {}, PA = class extends tl {}, rl = class extends S {}, FA = class extends rl {}, LA = class extends rl {}, ms = class extends S {}, IA = class extends ms {}, OA = class extends ms {
	async _call(e) {
		return new He(await super._call(e));
	}
}, NA = class extends ms {
	async _call(e) {
		return new re(await super._call(e));
	}
}, DA = class extends ms {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, zA = class extends ms {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, BA = 4299n, Ef = 6561n, dm = class extends S {
	forward_params = [
		"input_ids",
		"inputs_embeds",
		"attention_mask",
		"position_ids",
		"audio_values",
		"exaggeration",
		"audio_features",
		"audio_tokens",
		"speaker_embeddings",
		"speaker_features",
		"past_key_values"
	];
	main_input_name = "input_ids";
	_return_dict_in_generate_keys = [
		"audio_tokens",
		"speaker_embeddings",
		"speaker_features"
	];
}, hm = class extends dm {
	async encode_speech(e) {
		return ye(this.sessions.speech_encoder, { audio_values: e });
	}
	async forward({ input_ids: e = null, attention_mask: t = null, audio_values: r = null, exaggeration: s = null, position_ids: n = null, inputs_embeds: a = null, past_key_values: o = null, generation_config: i = null, logits_processor: l = null, audio_features: c = null, audio_tokens: d = null, speaker_embeddings: h = null, speaker_features: _ = null, ...m }) {
		let v;
		if (!a) {
			const w = this.sessions.embed_tokens.inputNames, b = { input_ids: e };
			if (w.includes("exaggeration")) {
				if (!(s instanceof V)) {
					const M = e.dims[0];
					if (s == null) s = ot([M], .5);
					else if (typeof s == "number") s = ot([M], s);
					else if (Array.isArray(s)) s = new V("float32", s, [M]);
					else throw new Error("Unsupported type for `exaggeration` input");
				}
				b.exaggeration = s;
			}
			if (w.includes("position_ids") && (b.position_ids = n), {inputs_embeds: a} = await ye(this.sessions.embed_tokens, b), c && d && h && _ && (v = {
				audio_features: c,
				audio_tokens: d,
				speaker_embeddings: h,
				speaker_features: _
			}), v || r) v ??= await this.encode_speech(r), a = Ne([v.audio_features, a], 1), t = ft([a.dims[0], a.dims[1]]);
			else {
				const M = a.dims[1];
				if (!o || M !== 1) throw new Error("Incorrect state encountered during generation.");
				const E = o.get_seq_length();
				t = ft([a.dims[0], E + M]);
			}
		}
		return {
			...await ir(this, {
				inputs_embeds: a,
				past_key_values: o,
				attention_mask: t,
				generation_config: i,
				logits_processor: l
			}, !1),
			...v
		};
	}
	prepare_inputs_for_generation(e, t, r) {
		return !t.position_ids && this.sessions.embed_tokens.inputNames.includes("position_ids") && (t.input_ids.dims[1] === 1 ? t.position_ids = new V("int64", Array.from({ length: e.length }, (s, n) => e[n].length - e[n].findLastIndex((a) => a == Ef) - 1), [e.length, 1]) : t.position_ids = new V("int64", t.input_ids.tolist().map((s) => {
			let n = 0;
			return s.map((a) => a >= Ef ? 0 : n++);
		}).flat(), t.input_ids.dims)), t.input_ids.dims[1] === 1 && (delete t.audio_values, delete t.audio_features, delete t.audio_tokens, delete t.speaker_embeddings, delete t.speaker_features), Qs(this, e, t, r);
	}
	async generate(e) {
		const { sequences: t, audio_tokens: r, speaker_embeddings: s, speaker_features: n } = await super.generate({
			...e,
			return_dict_in_generate: !0
		}), a = t.slice(null, [e.input_ids.dims[1], -1]), o = Ne([
			r,
			a,
			ot([a.dims[0], 3], BA)
		], 1), { waveform: i } = await ye(this.sessions.conditional_decoder, {
			speech_tokens: o,
			speaker_features: n,
			speaker_embeddings: s
		});
		return i;
	}
}, fm = class extends S {}, RA = class extends fm {}, _m = class extends S {}, GA = class extends _m {}, pa = class extends S {}, $A = class extends pa {}, pm = class extends pa {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "text_model"
		});
	}
}, mm = class extends pa {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "audio_model"
		});
	}
}, $r = class extends S {}, VA = class extends $r {}, UA = class extends $r {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "text_model"
		});
	}
}, gm = class extends $r {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "text_model"
		});
	}
}, jA = class extends $r {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "vision_model"
		});
	}
}, qA = class extends $r {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "vision_model"
		});
	}
}, sl = class extends S {}, WA = class extends sl {}, HA = class extends sl {}, nl = class extends S {}, QA = class extends nl {}, XA = class extends nl {}, al = class extends S {}, YA = class extends al {}, JA = class extends al {}, ol = class extends S {}, KA = class extends ol {}, ZA = class extends ol {}, il = class extends S {
	requires_attention_mask = !1;
	main_input_name = "input_features";
	forward_params = [
		"input_features",
		"decoder_input_ids",
		"decoder_attention_mask",
		"past_key_values"
	];
}, eC = class extends il {}, tC = class extends il {}, gs = class extends S {}, rC = class extends gs {}, sC = class extends gs {
	async _call(e) {
		return new He(await super._call(e));
	}
}, nC = class extends gs {
	async _call(e) {
		return new re(await super._call(e));
	}
}, aC = class extends gs {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, oC = class extends gs {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, ll = class extends S {}, iC = class extends ll {}, lC = class extends ll {
	async _call(e) {
		return new re(await super._call(e));
	}
}, cl = class extends S {}, cC = class extends cl {}, uC = class extends cl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, ul = class extends S {}, dC = class extends ul {}, hC = class extends ul {
	async _call(e) {
		return new an(await super._call(e));
	}
}, an = class extends We {
	constructor({ logits: e, pred_boxes: t }) {
		super(), this.logits = e, this.pred_boxes = t;
	}
}, dl = class extends S {}, fC = class extends dl {}, _C = class extends dl {
	async _call(e) {
		return new an(await super._call(e));
	}
}, wm = class extends We {
	constructor({ audio_codes: e }) {
		super(), this.audio_codes = e;
	}
}, vm = class extends We {
	constructor({ audio_values: e }) {
		super(), this.audio_values = e;
	}
}, ma = class extends S {
	main_input_name = "input_values";
	forward_params = ["input_values"];
}, pC = class extends ma {
	async encode(e) {
		return new wm(await ye(this.sessions.encoder_model, e));
	}
	async decode(e) {
		return new vm(await ye(this.sessions.decoder_model, e));
	}
}, ym = class extends ma {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "encoder_model"
		});
	}
}, bm = class extends ma {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "decoder_model"
		});
	}
}, ws = class extends S {}, mC = class extends ws {}, gC = class extends ws {
	async _call(e) {
		return new He(await super._call(e));
	}
}, wC = class extends ws {
	async _call(e) {
		return new re(await super._call(e));
	}
}, vC = class extends ws {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, yC = class extends ws {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, hl = class extends S {}, bC = class extends hl {}, MC = class extends hl {}, vs = class extends S {}, xC = class extends vs {}, kC = class extends vs {
	async _call(e) {
		return new He(await super._call(e));
	}
}, TC = class extends vs {
	async _call(e) {
		return new re(await super._call(e));
	}
}, EC = class extends vs {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, AC = class extends vs {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Mm = class extends S {}, CC = class extends Mm {}, fl = class extends S {}, SC = class extends fl {}, PC = class extends fl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, xm = class extends S {}, FC = class extends xm {}, km = class extends S {}, LC = class extends km {}, ga = class extends S {}, IC = class extends ga {}, OC = class extends ga {
	async _call(e) {
		return new _l(await super._call(e));
	}
}, NC = class extends ga {
	async _call(e) {
		return new Tm(await super._call(e));
	}
}, _l = class extends We {
	constructor({ logits: e, pred_boxes: t }) {
		super(), this.logits = e, this.pred_boxes = t;
	}
}, Tm = class extends We {
	constructor({ logits: e, pred_boxes: t, pred_masks: r }) {
		super(), this.logits = e, this.pred_boxes = t, this.pred_masks = r;
	}
}, pl = class extends S {}, DC = class extends pl {}, zC = class extends pl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, ml = class extends S {}, BC = class extends ml {}, RC = class extends ml {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Em = class extends S {}, GC = class extends Em {}, Am = class extends S {}, $C = class extends Am {}, ys = class extends S {}, VC = class extends ys {}, UC = class extends ys {
	async _call(e) {
		return new re(await super._call(e));
	}
}, jC = class extends ys {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, qC = class extends ys {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, WC = class extends ys {
	async _call(e) {
		return new He(await super._call(e));
	}
}, Cm = class extends S {}, HC = class extends Cm {}, gl = class extends S {}, QC = class extends gl {}, XC = class extends gl {}, wl = class extends S {}, YC = class extends wl {}, JC = class extends wl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, bs = class extends S {}, KC = class extends bs {}, ZC = class extends bs {
	async _call(e) {
		return new He(await super._call(e));
	}
}, eS = class extends bs {
	async _call(e) {
		return new re(await super._call(e));
	}
}, tS = class extends bs {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, rS = class extends bs {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, vl = class extends S {}, sS = class extends vl {}, nS = class extends vl {}, on = class extends S {}, aS = class extends on {}, oS = class extends on {
	async _call(e) {
		return new He(await super._call(e));
	}
}, iS = class extends on {
	async _call(e) {
		return new re(await super._call(e));
	}
}, lS = class extends on {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, ln = class extends S {}, cS = class extends ln {}, uS = class extends ln {
	async _call(e) {
		return new He(await super._call(e));
	}
}, dS = class extends ln {
	async _call(e) {
		return new re(await super._call(e));
	}
}, hS = class extends ln {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, yl = class extends S {}, fS = class extends yl {}, _S = class extends yl {}, bl = class extends S {}, pS = class extends bl {}, mS = class extends bl {}, Ml = class extends S {}, gS = class extends Ml {}, wS = class extends Ml {}, xl = class extends S {}, vS = class extends xl {}, yS = class extends xl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Sm = class extends S {
	forward_params = [
		"input_ids",
		"inputs_embeds",
		"attention_mask",
		"pixel_values",
		"encoder_outputs",
		"decoder_input_ids",
		"decoder_inputs_embeds",
		"decoder_attention_mask",
		"past_key_values"
	];
	main_input_name = "inputs_embeds";
}, bS = class extends Sm {
	_merge_input_ids_with_image_features({ inputs_embeds: e, image_features: t, input_ids: r, attention_mask: s }) {
		return {
			inputs_embeds: Ne([t, e], 1),
			attention_mask: Ne([ft(t.dims.slice(0, 2)), s], 1)
		};
	}
	async _prepare_inputs_embeds({ input_ids: e, pixel_values: t, inputs_embeds: r, attention_mask: s }) {
		if (!e && !t) throw new Error("Either `input_ids` or `pixel_values` should be provided.");
		let n, a;
		return e && (n = await this.encode_text({ input_ids: e })), t && (a = await this.encode_image({ pixel_values: t })), n && a ? {inputs_embeds: r, attention_mask: s} = this._merge_input_ids_with_image_features({
			inputs_embeds: n,
			image_features: a,
			input_ids: e,
			attention_mask: s
		}) : r = n || a, {
			inputs_embeds: r,
			attention_mask: s
		};
	}
	async forward({ input_ids: e, pixel_values: t, attention_mask: r, decoder_input_ids: s, decoder_attention_mask: n, encoder_outputs: a, past_key_values: o, inputs_embeds: i, decoder_inputs_embeds: l }) {
		if (i || ({inputs_embeds: i, attention_mask: r} = await this._prepare_inputs_embeds({
			input_ids: e,
			pixel_values: t,
			inputs_embeds: i,
			attention_mask: r
		})), !a) {
			let { last_hidden_state: d } = await xr(this, {
				inputs_embeds: i,
				attention_mask: r
			});
			a = d;
		}
		if (!l) {
			if (!s) throw new Error("Either `decoder_input_ids` or `decoder_inputs_embeds` should be provided.");
			l = await this.encode_text({ input_ids: s });
		}
		return await ir(this, {
			inputs_embeds: l,
			attention_mask: n,
			encoder_attention_mask: r,
			encoder_hidden_states: a,
			past_key_values: o
		}, !0);
	}
}, kl = class extends S {}, MS = class extends kl {}, xS = class extends kl {}, Tl = class extends S {}, kS = class extends Tl {}, TS = class extends Tl {}, Pm = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"pixel_values",
		"position_ids",
		"past_key_values"
	];
}, lr = class extends Pm {
	_merge_input_ids_with_image_features(e) {
		const t = e.image_features.dims.at(-1), r = e.image_features.view(-1, t);
		return Hi({
			image_token_id: this.config.image_token_index ?? this.config.image_token_id,
			...e,
			image_features: r
		});
	}
}, ES = class extends lr {}, AS = class extends lr {}, Fm = class extends S {}, CS = class extends Fm {}, Lm = class extends lr {}, SS = class extends Lm {}, Im = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"inputs_embeds",
		"per_layer_inputs",
		"position_ids",
		"pixel_values",
		"input_features",
		"input_features_mask",
		"past_key_values"
	];
}, wa = class extends Im {
	async forward({ input_ids: e = null, attention_mask: t = null, pixel_values: r = null, input_features: s = null, input_features_mask: n = null, position_ids: a = null, inputs_embeds: o = null, per_layer_inputs: i = null, past_key_values: l = null, generation_config: c = null, logits_processor: d = null, ...h }) {
		if ((!o || !i) && ({inputs_embeds: o, per_layer_inputs: i} = await ye(this.sessions.embed_tokens, { input_ids: e }), e.dims[1] !== 1)) {
			if (r) {
				const { image_features: _ } = await this._encode_vision({
					pixel_values: r,
					...h
				});
				({inputs_embeds: o, attention_mask: t} = this._merge_input_ids_with_image_features({
					image_features: _,
					inputs_embeds: o,
					input_ids: e,
					attention_mask: t
				}));
			}
			if (s) {
				const { audio_features: _ } = await ye(this.sessions.audio_encoder, {
					input_features: s,
					input_features_mask: n
				});
				({inputs_embeds: o, attention_mask: t} = this._merge_input_ids_with_audio_features({
					audio_features: _,
					inputs_embeds: o,
					input_ids: e,
					attention_mask: t
				}));
			}
		}
		return await ir(this, {
			inputs_embeds: o,
			per_layer_inputs: i,
			past_key_values: l,
			attention_mask: t,
			position_ids: a,
			generation_config: c,
			logits_processor: d
		}, !0);
	}
	_encode_vision(e) {
		return ye(this.sessions.vision_encoder, { pixel_values: e.pixel_values });
	}
	_merge_input_ids_with_image_features(e) {
		const t = e.image_features.dims.at(-1), r = e.image_features.view(-1, t);
		return Hi({
			image_token_id: this.config.image_token_id,
			...e,
			image_features: r
		});
	}
	_merge_input_ids_with_audio_features(e) {
		const t = e.audio_features.dims.at(-1), r = e.audio_features.view(-1, t);
		return um({
			audio_token_id: this.config.audio_token_id,
			...e,
			audio_features: r
		});
	}
}, PS = class extends wa {}, El = class extends wa {
	forward_params = [
		"input_ids",
		"attention_mask",
		"inputs_embeds",
		"per_layer_inputs",
		"position_ids",
		"pixel_values",
		"image_position_ids",
		"input_features",
		"input_features_mask",
		"past_key_values"
	];
	_encode_vision(e) {
		return ye(this.sessions.vision_encoder, {
			pixel_values: e.pixel_values,
			pixel_position_ids: e.image_position_ids
		});
	}
}, FS = class extends El {}, Al = class extends S {}, LS = class extends Al {}, IS = class extends Al {}, Cl = class extends S {}, OS = class extends Cl {}, NS = class extends Cl {}, Om = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"position_ids",
		"past_key_values",
		"pixel_values",
		"image_grid_thw"
	];
}, Sl = class extends Om {
	image_grid_thw_name = "grid_thw";
	_get_text_only_rope_index(e, t) {
		if (t) {
			const { data: r, dims: s } = lm(t), n = BigInt64Array.from({ length: 3 * r.length }, (o, i) => r[i % r.length]), a = Array.from({ length: s[0] }, (o, i) => $e(r.subarray(s[1] * i, s[1] * (i + 1)))[0] + 1n + BigInt(s[1]));
			return [new V("int64", n, [3, ...s]), new V("int64", a, [a.length, 1])];
		} else {
			const [r, s] = e.dims;
			return [new V("int64", BigInt64Array.from({ length: 3 * r * s }, (n, a) => BigInt(Math.floor(a % s / r))), [3, ...e.dims]), ip([r, 1])];
		}
	}
	_reorder_and_write_positions(e, t, r, s) {
		const n = e.reduce((l, c) => l + c.length, 0), a = new Array(n);
		let o = 0;
		for (let l = 0; l < 3; ++l) for (const c of e) {
			const d = c.length / 3;
			for (let h = l * d; h < (l + 1) * d; ++h) a[o++] = c[h];
		}
		let i = 0;
		for (let l = 0; l < t.length; ++l) if (t[l] == 1) {
			for (let c = 0; c < 3; ++c) r[c][s][l] = a[c * n / 3 + i];
			++i;
		}
		return a;
	}
	_get_multimodal_rope_positions({ filtered_ids: e, image_grid_thw_list: t, video_grid_thw_list: r, spatial_merge_size: s, state: n }) {
		const { image_token_id: a, video_token_id: o, vision_start_token_id: i } = this.config, l = e, c = l.reduce((b, M, E) => (M == i && b.push(E), b), []).map((b) => l[b + 1]), d = c.filter((b) => b == a).length, h = c.filter((b) => b == o).length, _ = [];
		let m = 0, v = d, w = h;
		for (let b = 0; b < c.length; ++b) {
			const M = l.findIndex((N, B) => B > m && N == a), E = l.findIndex((N, B) => B > m && N == o), A = v > 0 && M !== -1 ? M : l.length + 1, k = w > 0 && E !== -1 ? E : l.length + 1;
			let C, O, x, q;
			A < k ? ([O, x, q] = t[n.image_index], ++n.image_index, --v, C = A) : ([O, x, q] = r[n.video_index], ++n.video_index, --w, C = k);
			const [R, G, W] = [
				Number(O),
				Math.floor(Number(x) / s),
				Math.floor(Number(q) / s)
			], H = C - m, D = _.length > 0 ? $e(_.at(-1))[0] + 1 : 0;
			_.push(Array.from({ length: 3 * H }, (N, B) => D + B % H));
			const F = H + D, U = R * G * W, ae = Array.from({ length: U }, (N, B) => F + Math.floor(B / (G * W))), Z = Array.from({ length: U }, (N, B) => F + Math.floor(B / W) % G), I = Array.from({ length: U }, (N, B) => F + B % W);
			_.push([
				ae,
				Z,
				I
			].flat()), m = C + U;
		}
		if (m < l.length) {
			const b = _.length > 0 ? $e(_.at(-1))[0] + 1 : 0, M = l.length - m;
			_.push(Array.from({ length: 3 * M }, (E, A) => b + A % M));
		}
		return _;
	}
	get_rope_index(e, t, r, s) {
		const { vision_config: n } = this.config, a = n.spatial_merge_size ?? 2;
		if (t || r) {
			const o = e.tolist();
			s || (s = op(e));
			const i = s.tolist(), l = Array.from({ length: 3 }, () => Array.from({ length: e.dims[0] }, () => Array.from({ length: e.dims[1] }, () => 0))), c = t ? t.tolist() : [], d = r ? r.tolist() : [], h = {
				image_index: 0,
				video_index: 0
			}, _ = [];
			for (let m = 0; m < o.length; ++m) {
				const v = o[m].filter((M, E) => i[m][E] == 1), w = this._get_multimodal_rope_positions({
					filtered_ids: v,
					image_grid_thw_list: c,
					video_grid_thw_list: d,
					spatial_merge_size: a,
					state: h
				}), b = this._reorder_and_write_positions(w, i[m], l, m);
				_.push($e(b)[0] + 1 - o[m].length);
			}
			return [new V("int64", l.flat(Infinity), [
				3,
				e.dims[0],
				e.dims[1]
			]), new V("int64", _, [_.length, 1])];
		} else return this._get_text_only_rope_index(e, s);
	}
	async encode_image({ pixel_values: e, image_grid_thw: t }) {
		return (await ye(this.sessions.vision_encoder, {
			pixel_values: e,
			[this.image_grid_thw_name]: t
		})).image_features;
	}
	_merge_input_ids_with_image_features(e) {
		return Hi({
			image_token_id: this.config.image_token_id,
			...e
		});
	}
	prepare_inputs_for_generation(e, t, r) {
		if (!t.attention_mask || t.position_ids || !(this.sessions.decoder_model_merged ?? this.sessions.model).inputNames.includes("position_ids")) return t;
		if (!t.past_key_values) [t.position_ids, t.rope_deltas] = this.get_rope_index(t.input_ids, t.image_grid_thw, t.video_grid_thw, t.attention_mask);
		else {
			t.pixel_values = null;
			const s = t.past_key_values.get_seq_length();
			if (s < t.input_ids.dims[1]) {
				const [n, a] = this.get_rope_index(t.input_ids, t.image_grid_thw, t.video_grid_thw, t.attention_mask);
				t.rope_deltas = a, t.position_ids = n.slice(null, null, [s, null]), t.input_ids = t.input_ids.slice(null, [s, null]);
			} else {
				t.rope_deltas || ([, t.rope_deltas] = this.get_rope_index(t.input_ids, t.image_grid_thw, t.video_grid_thw, t.attention_mask));
				const n = BigInt(s), a = t.rope_deltas.map((o) => n + o);
				t.position_ids = or([
					a,
					a,
					a
				], 0);
			}
		}
		return t;
	}
}, Nm = class extends Sl {}, Pl = class extends Sl {
	image_grid_thw_name = "image_grid_thw";
}, Dm = class extends Nm {
	image_grid_thw_name = "image_grid_thw";
}, DS = class extends Pl {
	get_vision_position_ids(e, t, r, s) {
		const n = Math.floor(t[0] / r), a = Math.floor(t[1] / s), o = Math.floor(t[2] / s), i = a * o * n, l = Array.from({ length: i }, () => e), c = Array.from({ length: i }, (h, _) => e + Math.floor(_ / (o * n))), d = Array.from({ length: i }, (h, _) => e + _ % o);
		return [
			...l,
			...c,
			...d
		];
	}
	_get_multimodal_rope_positions({ filtered_ids: e, image_grid_thw_list: t, video_grid_thw_list: r, spatial_merge_size: s, state: n }) {
		const { image_token_id: a } = this.config, o = [];
		let i = 0, l = e[0] == a ? 1 : 0;
		for (let h = 1; h <= e.length; ++h) {
			const _ = h < e.length ? e[h] == a ? 1 : 0 : -1;
			_ !== l && (o.push([
				l,
				i,
				h
			]), i = h, l = _);
		}
		let c = 0;
		const d = [];
		for (const [h, _, m] of o) if (h === 0) {
			const v = m - _;
			d.push(Array.from({ length: 3 * v }, (w, b) => c + b % v)), c += v;
		} else {
			const v = t[n.image_index++].map(Number), w = v[0];
			d.push(this.get_vision_position_ids(c, v, w, s)), c += Math.max(v[1], v[2]) / s;
		}
		return d;
	}
}, Fl = class extends S {}, zS = class extends Fl {}, BS = class extends Fl {}, Ll = class extends S {}, RS = class extends Ll {}, GS = class extends Ll {}, Il = class extends S {}, $S = class extends Il {}, VS = class extends Il {}, Ol = class extends S {}, US = class extends Ol {}, jS = class extends Ol {}, Nl = class extends S {}, qS = class extends Nl {}, WS = class extends Nl {}, Dl = class extends S {}, HS = class extends Dl {}, QS = class extends Dl {}, zl = class extends S {}, XS = class extends zl {}, YS = class extends zl {}, Bl = class extends S {}, JS = class extends Bl {}, KS = class extends Bl {}, Rl = class extends S {}, ZS = class extends Rl {}, eP = class extends Rl {}, zm = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"position_ids",
		"audio_values",
		"past_key_values"
	];
}, Gl = class extends zm {
	_merge_input_ids_with_audio_features(e) {
		const t = e.audio_features.dims.at(-1), r = e.audio_features.view(-1, t);
		return um({
			audio_token_id: this.config.ignore_index ?? this.config.audio_token_id ?? this.config.audio_token_index,
			...e,
			audio_features: r
		});
	}
}, tP = class extends Gl {
	forward_params = [
		"input_ids",
		"attention_mask",
		"input_features",
		"past_key_values"
	];
}, Bm = class extends S {}, rP = class extends Bm {}, Rm = class extends S {}, sP = class extends Rm {}, $l = class extends S {}, nP = class extends $l {}, aP = class extends $l {}, Vl = class extends S {}, oP = class extends Vl {}, iP = class extends Vl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, kr = class extends S {}, lP = class extends kr {}, cP = class extends kr {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, uP = class extends kr {
	async _call(e) {
		return new re(await super._call(e));
	}
}, dP = class extends kr {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, hP = class extends S {}, fP = class extends kr {}, _P = class extends kr {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, pP = class extends kr {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Ul = class extends S {}, mP = class extends Ul {}, gP = class extends Ul {}, Gm = class extends lr {
	forward_params = [
		"input_ids",
		"attention_mask",
		"pixel_values",
		"pixel_attention_mask",
		"position_ids",
		"past_key_values"
	];
}, jl = class extends S {}, wP = class extends jl {}, vP = class extends jl {
	async _call(e) {
		return new re(await super._call(e));
	}
}, ql = class extends S {}, yP = class extends ql {}, bP = class extends ql {}, va = class extends S {}, MP = class extends va {
	async forward(e) {
		const t = !e.input_ids, r = !e.pixel_values;
		if (t && r) throw new Error("Either `input_ids` or `pixel_values` should be provided.");
		if (t && (e.input_ids = ft([e.pixel_values.dims[0], 1])), r) {
			const { image_size: l } = this.config.vision_config;
			e.pixel_values = ot([
				0,
				3,
				l,
				l
			], 0);
		}
		const { text_embeddings: s, image_embeddings: n, l2norm_text_embeddings: a, l2norm_image_embeddings: o } = await super.forward(e), i = {};
		return t || (i.text_embeddings = s, i.l2norm_text_embeddings = a), r || (i.image_embeddings = n, i.l2norm_image_embeddings = o), i;
	}
}, $m = class extends va {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "text_model"
		});
	}
}, xP = class extends va {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "vision_model"
		});
	}
}, Wl = class extends S {}, kP = class extends Wl {}, TP = class extends Wl {}, EP = class extends lr {}, Hl = class extends S {}, AP = class extends Hl {}, CP = class extends Hl {}, SP = class extends lr {
	forward_params = [
		"input_ids",
		"attention_mask",
		"pixel_values",
		"pixel_attention_mask",
		"spatial_shapes",
		"position_ids",
		"past_key_values"
	];
}, Ql = class extends S {}, PP = class extends Ql {}, FP = class extends Ql {}, Vm = class extends S {}, LP = class extends Vm {}, Xl = class extends S {}, IP = class extends Xl {}, OP = class extends Xl {}, Yl = class extends S {}, NP = class extends Yl {}, DP = class extends Yl {}, Jl = class extends S {}, zP = class extends Jl {}, BP = class extends Jl {}, Kl = class extends S {}, RP = class extends Kl {}, GP = class extends Kl {}, cn = class extends S {}, $P = class extends cn {}, VP = class extends cn {}, UP = class extends cn {
	async _call(e) {
		return new re(await super._call(e));
	}
}, jP = class extends cn {}, Um = class extends S {}, qP = class extends Um {}, jm = class extends S {}, WP = class extends jm {}, qm = class extends We {
	constructor({ char_logits: e, bpe_logits: t, wp_logits: r }) {
		super(), this.char_logits = e, this.bpe_logits = t, this.wp_logits = r;
	}
	get logits() {
		return [
			this.char_logits,
			this.bpe_logits,
			this.wp_logits
		];
	}
}, Wm = class extends S {}, HP = class extends Wm {
	async _call(e) {
		return new qm(await super._call(e));
	}
}, Hm = class extends We {
	constructor({ audio_codes: e }) {
		super(), this.audio_codes = e;
	}
}, Qm = class extends We {
	constructor({ audio_values: e }) {
		super(), this.audio_values = e;
	}
}, ya = class extends S {
	main_input_name = "input_values";
	forward_params = ["input_values"];
}, QP = class extends ya {
	async encode(e) {
		return new Hm(await ye(this.sessions.encoder_model, e));
	}
	async decode(e) {
		return new Qm(await ye(this.sessions.decoder_model, e));
	}
}, Xm = class extends ya {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "encoder_model"
		});
	}
}, Ym = class extends ya {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "decoder_model"
		});
	}
}, Zl = class extends S {}, XP = class extends Zl {}, YP = class extends Zl {}, ec = class extends S {}, JP = class extends ec {}, KP = class extends ec {}, un = class extends S {}, ZP = class extends un {}, eF = class extends un {
	async _call(e) {
		return new He(await super._call(e));
	}
}, tF = class extends un {
	async _call(e) {
		return new re(await super._call(e));
	}
}, rF = class extends un {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, tc = class extends S {}, sF = class extends tc {}, nF = class extends tc {}, ba = class extends S {}, aF = class extends ba {}, oF = class extends ba {
	async _call(e) {
		return new re(await super._call(e));
	}
}, iF = class extends ba {}, Ma = class extends S {}, lF = class extends Ma {}, cF = class extends Ma {
	async _call(e) {
		return new re(await super._call(e));
	}
}, uF = class extends Ma {}, xa = class extends S {}, dF = class extends xa {}, hF = class extends xa {
	async _call(e) {
		return new re(await super._call(e));
	}
}, fF = class extends xa {}, ka = class extends S {}, _F = class extends ka {}, pF = class extends ka {
	async _call(e) {
		return new re(await super._call(e));
	}
}, mF = class extends ka {}, rc = class extends S {}, gF = class extends rc {}, wF = class extends rc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, sc = class extends S {}, vF = class extends sc {}, yF = class extends sc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, dn = class extends S {}, bF = class extends dn {}, MF = class extends dn {
	async _call(e) {
		return new He(await super._call(e));
	}
}, xF = class extends dn {
	async _call(e) {
		return new re(await super._call(e));
	}
}, kF = class extends dn {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, nc = class extends S {}, TF = class extends nc {}, EF = class extends nc {}, ac = class extends S {
	requires_attention_mask = !1;
	main_input_name = "input_values";
	forward_params = [
		"input_values",
		"decoder_input_ids",
		"past_key_values"
	];
}, AF = class extends ac {}, CF = class extends ac {}, Ms = class extends S {}, SF = class extends Ms {}, PF = class extends Ms {
	async _call(e) {
		return new He(await super._call(e));
	}
}, FF = class extends Ms {
	async _call(e) {
		return new re(await super._call(e));
	}
}, LF = class extends Ms {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, IF = class extends Ms {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, oc = class extends S {}, OF = class extends oc {}, NF = class extends oc {}, ic = class extends S {}, DF = class extends ic {}, zF = class extends ic {}, Jm = class extends S {}, BF = class extends Jm {
	forward_params = [
		"input_ids",
		"pixel_values",
		"images_seq_mask",
		"images_emb_mask",
		"attention_mask",
		"position_ids",
		"past_key_values"
	];
	constructor(...e) {
		super(...e), this._generation_mode = "text";
	}
	async forward(e) {
		const t = this._generation_mode ?? "text";
		let r;
		if (t === "text" || !e.past_key_values) {
			const i = this.sessions.prepare_inputs_embeds;
			r = await ye(i, Ke(e, i.inputNames));
		} else {
			const i = this.sessions.gen_img_embeds;
			r = await ye(i, Ke({ image_ids: e.input_ids }, i.inputNames));
		}
		const s = {
			...e,
			...r
		}, n = await ir(this, s), a = this.sessions[t === "text" ? "lm_head" : "gen_head"];
		if (!a) throw new Error(`Unable to find "${a}" generation head`);
		const o = await ye(a, Ke(n, a.inputNames));
		return {
			...r,
			...n,
			...o
		};
	}
	prepare_inputs_for_generation(e, t, r) {
		const s = !!t.past_key_values;
		return r.guidance_scale !== null && r.guidance_scale > 1 && (s ? t.input_ids = Ne([t.input_ids, t.input_ids], 0) : (t.input_ids = Ne([t.input_ids, Jo(t.input_ids, BigInt(r.pad_token_id))], 0), t.attention_mask = Ne([t.attention_mask, Jo(t.attention_mask, 0n)], 0))), (s || !t.pixel_values) && (t.pixel_values = ot([
			0,
			0,
			3,
			384,
			384
		], 1)), s && (t.images_seq_mask = new V("bool", new Array(1).fill(!0).fill(!1, 0, 1), [1, 1]), t.images_emb_mask = new V("bool", new Array(0).fill(!1), [
			1,
			1,
			0
		])), t;
	}
	async generate(e) {
		return this._generation_mode = "text", super.generate(e);
	}
	async generate_images(e) {
		this._generation_mode = "image";
		const t = (e.inputs ?? e[this.main_input_name]).dims[1], r = (await super.generate(e)).slice(null, [t, null]), s = this.sessions.image_decode, { decoded_image: n } = await ye(s, { generated_tokens: r }), a = n.add_(1).mul_(255 / 2).clamp_(0, 255).to("uint8"), o = [];
		for (const i of a) {
			const l = Nt.fromTensor(i);
			o.push(l);
		}
		return o;
	}
}, lc = class extends S {}, RF = class extends lc {}, GF = class extends lc {}, Km = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"encoder_outputs",
		"decoder_input_ids",
		"decoder_attention_mask",
		"past_key_values"
	];
	_apply_and_filter_by_delay_pattern_mask(e) {
		const [t, r] = e.dims, s = this.config.decoder.num_codebooks, n = r - s;
		let a = 0;
		for (let l = 0; l < e.size; ++l) {
			if (e.data[l] == this.config.decoder.pad_token_id) continue;
			const c = l % r - Math.floor(l / r) % s;
			c > 0 && c <= n && (e.data[a++] = e.data[l]);
		}
		const o = Math.floor(t / s), i = a / (o * s);
		return new V(e.type, e.data.slice(0, a), [
			o,
			s,
			i
		]);
	}
	prepare_inputs_for_generation(e, t, r) {
		const s = BigInt(this.config.decoder.pad_token_id);
		let n = structuredClone(e);
		for (let a = 0; a < n.length; ++a) for (let o = 0; o < n[a].length; ++o) a % this.config.decoder.num_codebooks >= o && (n[a][o] = s);
		return r.guidance_scale !== null && r.guidance_scale > 1 && (n = n.concat(n)), ra(this, n, t, r);
	}
	async generate(e) {
		const t = await super.generate(e), r = this._apply_and_filter_by_delay_pattern_mask(t).unsqueeze_(0), { audio_values: s } = await ye(this.sessions.encodec_decode, { audio_codes: r });
		return s;
	}
}, cc = class extends S {}, $F = class extends cc {}, VF = class extends cc {}, uc = class extends S {}, UF = class extends uc {}, jF = class extends uc {}, xs = class extends S {}, qF = class extends xs {}, WF = class extends xs {
	async _call(e) {
		return new He(await super._call(e));
	}
}, HF = class extends xs {
	async _call(e) {
		return new re(await super._call(e));
	}
}, QF = class extends xs {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, XF = class extends xs {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Zm = class extends S {}, YF = class extends Zm {}, dc = class extends S {}, JF = class extends dc {}, KF = class extends dc {}, hc = class extends S {}, ZF = class extends hc {}, eL = class extends hc {}, fc = class extends S {}, tL = class extends fc {}, rL = class extends fc {}, _c = class extends S {}, sL = class extends _c {}, nL = class extends _c {}, pc = class extends S {}, aL = class extends pc {}, oL = class extends pc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, mc = class extends S {}, iL = class extends mc {}, lL = class extends mc {}, gc = class extends S {}, cL = class extends gc {}, uL = class extends gc {}, wc = class extends S {}, dL = class extends wc {}, hL = class extends wc {}, vc = class extends S {}, fL = class extends vc {}, _L = class extends vc {}, pL = class extends lr {}, eg = class extends S {}, mL = class extends eg {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, yc = class extends S {}, gL = class extends yc {}, wL = class extends yc {}, bc = class extends S {}, vL = class extends bc {}, yL = class extends bc {}, Mc = class extends S {}, bL = class extends Mc {}, ML = class extends Mc {}, xc = class extends S {}, xL = class extends xc {}, kL = class extends xc {}, tg = class extends S {
	forward_params = [
		"input_ids",
		"inputs_embeds",
		"attention_mask",
		"position_ids",
		"pixel_values",
		"image_sizes",
		"past_key_values"
	];
}, rg = class extends tg {
	async forward({ input_ids: e = null, attention_mask: t = null, pixel_values: r = null, image_sizes: s = null, position_ids: n = null, inputs_embeds: a = null, past_key_values: o = null, generation_config: i = null, logits_processor: l = null, ...c }) {
		if (!a) {
			let d;
			if (r && e.dims[1] !== 1) {
				if (!s) throw new Error("`image_sizes` must be provided when `pixel_values` is provided.");
				({image_features: d} = await ye(this.sessions.vision_encoder, {
					pixel_values: r,
					image_sizes: s
				}));
			} else {
				const h = this.config.normalized_config.hidden_size;
				d = new V("float32", [], [0, h]);
			}
			({inputs_embeds: a} = await ye(this.sessions.prepare_inputs_embeds, {
				input_ids: e,
				image_features: d
			}));
		}
		return await ir(this, {
			inputs_embeds: a,
			past_key_values: o,
			attention_mask: t,
			position_ids: n,
			generation_config: i,
			logits_processor: l
		}, !1);
	}
}, kc = class extends S {}, TL = class extends kc {}, EL = class extends kc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Tc = class extends S {}, AL = class extends Tc {}, CL = class extends Tc {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, Ec = class extends S {}, SL = class extends Ec {}, PL = class extends Ec {}, Ac = class extends S {}, FL = class extends Ac {}, LL = class extends Ac {}, Cc = class extends S {}, IL = class extends Cc {}, OL = class extends Cc {}, Sc = class extends S {}, NL = class extends Sc {}, DL = class extends Sc {}, Pc = class extends S {}, zL = class extends Pc {}, BL = class extends Pc {}, Fc = class extends Pl {}, sg = class extends Dm {}, RL = class extends Fc {}, GL = class extends sg {}, Lc = class extends Fc {}, ng = class extends Lc {}, $L = class extends Lc {}, VL = class extends ng {}, Ic = class extends S {}, UL = class extends Ic {}, jL = class extends Ic {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Oc = class extends S {}, qL = class extends Oc {}, WL = class extends Oc {
	async _call(e) {
		return new ag(await super._call(e));
	}
}, ag = class extends an {}, ks = class extends S {}, HL = class extends ks {}, QL = class extends ks {
	async _call(e) {
		return new He(await super._call(e));
	}
}, XL = class extends ks {
	async _call(e) {
		return new re(await super._call(e));
	}
}, YL = class extends ks {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, JL = class extends ks {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Ts = class extends S {}, KL = class extends Ts {}, ZL = class extends Ts {
	async _call(e) {
		return new He(await super._call(e));
	}
}, eI = class extends Ts {
	async _call(e) {
		return new re(await super._call(e));
	}
}, tI = class extends Ts {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, rI = class extends Ts {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Nc = class extends S {}, sI = class extends Nc {}, nI = class extends Nc {
	async _call(e) {
		return new og(await super._call(e));
	}
}, og = class extends an {}, ig = class extends We {
	constructor({ iou_scores: e, pred_masks: t }) {
		super(), this.iou_scores = e, this.pred_masks = t;
	}
}, lg = class extends S {}, aI = class extends lg {
	async get_image_embeddings({ pixel_values: e }) {
		return await xr(this, { pixel_values: e });
	}
	async forward(e) {
		!e.image_embeddings || !e.image_positional_embeddings ? e = {
			...e,
			...await this.get_image_embeddings(e)
		} : e = { ...e }, e.input_labels ??= ft(e.input_points.dims.slice(0, -1));
		const t = {
			image_embeddings: e.image_embeddings,
			image_positional_embeddings: e.image_positional_embeddings
		};
		return e.input_points && (t.input_points = e.input_points), e.input_labels && (t.input_labels = e.input_labels), e.input_boxes && (t.input_boxes = e.input_boxes), await ye(this.sessions.prompt_encoder_mask_decoder, t);
	}
	async _call(e) {
		return new ig(await super._call(e));
	}
}, cg = class extends We {
	constructor({ iou_scores: e, pred_masks: t, object_score_logits: r }) {
		super(), this.iou_scores = e, this.pred_masks = t, this.object_score_logits = r;
	}
}, ug = class extends S {}, Dc = class extends ug {
	async get_image_embeddings({ pixel_values: e }) {
		return await xr(this, { pixel_values: e });
	}
	async forward(e) {
		const { num_feature_levels: t } = this.config.vision_config;
		if (Array.from({ length: t }, (s, n) => `image_embeddings.${n}`).some((s) => !e[s]) ? e = {
			...e,
			...await this.get_image_embeddings(e)
		} : e = { ...e }, e.input_points) {
			if (e.input_boxes && e.input_boxes.dims[1] !== 1) throw new Error("When both `input_points` and `input_boxes` are provided, the number of boxes per image must be 1.");
			const s = e.input_points.dims;
			e.input_labels ??= ft(s.slice(0, -1)), e.input_boxes ??= ot([
				s[0],
				0,
				4
			], 0);
		} else if (e.input_boxes) {
			const s = e.input_boxes.dims;
			e.input_labels = ot([
				s[0],
				s[1],
				0
			], -1n), e.input_points = ot([
				s[0],
				1,
				0,
				2
			], 0);
		} else throw new Error("At least one of `input_points` or `input_boxes` must be provided.");
		const r = this.sessions.prompt_encoder_mask_decoder;
		return await ye(r, Ke(e, r.inputNames));
	}
	async _call(e) {
		return new cg(await super._call(e));
	}
}, oI = class extends Dc {}, iI = class extends Dc {}, Ta = class extends S {}, lI = class extends Ta {}, cI = class extends Ta {}, uI = class extends Ta {}, Ea = class extends S {}, dI = class extends Ea {}, hI = class extends Ea {}, fI = class extends Ea {}, zc = class extends S {}, _I = class extends zc {}, dg = class extends zc {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "text_model"
		});
	}
}, pI = class extends $r {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "vision_model"
		});
	}
}, Bc = class extends S {}, mI = class extends Bc {}, gI = class extends Bc {}, wI = class extends Gm {}, Aa = class extends S {
	main_input_name = "input_values";
	forward_params = ["input_values"];
}, vI = class extends Aa {
	async encode(e) {
		return await ye(this.sessions.encoder_model, e);
	}
	async decode(e) {
		return await ye(this.sessions.decoder_model, e);
	}
}, hg = class extends Aa {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "encoder_model"
		});
	}
}, fg = class extends Aa {
	static async from_pretrained(e, t = {}) {
		return super.from_pretrained(e, {
			...t,
			model_file_name: t.model_file_name ?? "decoder_model"
		});
	}
}, Rc = class extends S {}, yI = class extends Rc {}, bI = class extends Rc {}, Ca = class extends S {}, MI = class extends Ca {}, xI = class extends Ca {}, kI = class extends Ca {
	async generate_speech(e, t, { threshold: r = .5, minlenratio: s = 0, maxlenratio: n = 20, vocoder: a = null } = {}) {
		const o = { input_ids: e }, { encoder_outputs: i, encoder_attention_mask: l } = await xr(this, o), c = i.dims[1] / this.config.reduction_factor, d = Math.floor(c * n), h = Math.floor(c * s), _ = this.config.num_mel_bins;
		let m = [], v = null, w = null, b = 0;
		for (;;) {
			++b;
			const A = am(!!w);
			let k;
			w ? k = w.output_sequence_out : k = new V("float32", new Float32Array(_), [
				1,
				1,
				_
			]);
			let C = {
				use_cache_branch: A,
				output_sequence: k,
				encoder_attention_mask: l,
				speaker_embeddings: t,
				encoder_hidden_states: i
			};
			Wi(this, C, v), w = await ye(this.sessions.decoder_model_merged, C), v = ni(w, v);
			const { prob: O, spectrum: x } = w;
			if (m.push(x), b >= h && (Array.from(O.data).filter((q) => q >= r).length > 0 || b >= d)) break;
		}
		const M = Ne(m), { waveform: E } = await ye(a.sessions.model, { spectrogram: M });
		return {
			spectrogram: M,
			waveform: E
		};
	}
}, TI = class extends S {
	main_input_name = "spectrogram";
}, hn = class extends S {}, EI = class extends hn {}, AI = class extends hn {
	async _call(e) {
		return new He(await super._call(e));
	}
}, CI = class extends hn {
	async _call(e) {
		return new re(await super._call(e));
	}
}, SI = class extends hn {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Gc = class extends S {}, PI = class extends Gc {}, FI = class extends Gc {}, $c = class extends S {}, LI = class extends $c {}, II = class extends $c {}, _g = class extends S {}, OI = class extends _g {}, pg = class extends S {}, mg = class extends pg {
	async generate_speech({ input_ids: e, attention_mask: t, style: r, num_inference_steps: s = 5, speed: n = 1.05 }) {
		const { sampling_rate: a, chunk_compress_factor: o, base_chunk_size: i, latent_dim: l } = this.config, { last_hidden_state: c, durations: d } = await ye(this.sessions.text_encoder, {
			input_ids: e,
			attention_mask: t,
			style: r
		}), h = d.div(n).mul_(a), _ = i * o, m = h.data, v = Int32Array.from(m, (R) => Math.ceil(R / _)), w = Math.max(...v), b = e.dims[0], M = new BigInt64Array(b * w);
		for (let R = 0; R < b; ++R) M.fill(1n, R * w, R * w + v[R]);
		const E = new V("int64", M, [b, w]), A = l * o, k = A * w;
		let C = ok([
			b,
			A,
			w
		]);
		const O = C.data;
		for (let R = 0; R < b; ++R) if (v[R] !== w) for (let G = 0; G < A; ++G) O.fill(0, R * k + G * w + v[R], R * k + (G + 1) * w);
		const x = ot([b], s);
		for (let R = 0; R < s; ++R) {
			const G = ot([b], R);
			({denoised_latents: C} = await ye(this.sessions.latent_denoiser, {
				style: r,
				noisy_latents: C,
				latent_mask: E,
				encoder_outputs: c,
				attention_mask: t,
				timestep: G,
				num_inference_steps: x
			}));
		}
		const { waveform: q } = await ye(this.sessions.voice_decoder, { latents: C });
		return {
			waveform: q,
			durations: h
		};
	}
}, Sa = class extends S {}, NI = class extends Sa {}, DI = class extends Sa {
	async _call(e) {
		return new re(await super._call(e));
	}
}, zI = class extends Sa {}, Vc = class extends S {}, BI = class extends Vc {}, RI = class extends Vc {}, Uc = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"encoder_outputs",
		"decoder_input_ids",
		"decoder_attention_mask",
		"past_key_values"
	];
}, GI = class extends Uc {}, $I = class extends Uc {}, jc = class extends S {}, VI = class extends jc {}, UI = class extends jc {
	async _call(e) {
		return new gg(await super._call(e));
	}
}, gg = class extends _l {}, wg = class extends S {}, jI = class extends wg {}, Pa = class extends S {}, qI = class extends Pa {}, WI = class extends Pa {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, HI = class extends Pa {
	async _call(e) {
		return new re(await super._call(e));
	}
}, fn = class extends S {}, QI = class extends fn {}, XI = class extends fn {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, YI = class extends fn {
	async _call(e) {
		return new re(await super._call(e));
	}
}, JI = class extends fn {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, qc = class extends S {}, KI = class extends qc {}, ZI = class extends qc {}, eO = class extends S {
	main_input_name = "pixel_values";
	forward_params = [
		"pixel_values",
		"decoder_input_ids",
		"encoder_hidden_states",
		"past_key_values"
	];
}, Wc = class extends S {}, tO = class extends Wc {}, rO = class extends Wc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, vg = class extends S {}, sO = class extends vg {}, Hc = class extends S {}, nO = class extends Hc {}, aO = class extends Hc {
	async _call(e) {
		return new re(await super._call(e));
	}
}, yg = class extends S {}, oO = class extends yg {
	async _call(e) {
		return new F2(await super._call(e));
	}
}, bg = class extends S {}, iO = class extends bg {}, Mg = class extends We {
	constructor({ waveform: e, spectrogram: t }) {
		super(), this.waveform = e, this.spectrogram = t;
	}
}, xg = class extends S {}, lO = class extends xg {
	async _call(e) {
		return new Mg(await super._call(e));
	}
}, cO = class extends Gl {}, Af = 2, uO = 1, Go = /* @__PURE__ */ new WeakMap();
function dO(e, t) {
	const { text_config: r, audio_config: s } = e.config, n = e.sessions.audio_encoder, { num_mel_bins: a, hidden_size: o } = s, i = a + o, l = new ji(), c = da(s), d = { batch_size: 1 };
	let h = "float32";
	for (const w of n.inputMetadata) {
		if (w.name === "past_padding_cache") {
			h = w.type;
			continue;
		}
		if (!c.has(w.name)) continue;
		const b = om(w.shape, d), M = b.reduce((A, k) => A * k, 1), E = Js[w.type];
		l[w.name] = new V(w.type, new E(M), b);
	}
	const _ = Js[h], m = new V(h, new _(i * Af), [
		1,
		i,
		Af
	]), v = t[Symbol.asyncIterator]?.() ?? t[Symbol.iterator]?.();
	if (!v) throw new Error("input_features must be iterable or async iterable");
	return {
		encoder_session: n,
		enc_kv_cache: l,
		enc_padding_cache: m,
		enc_past_seq_len: 0,
		audio_embed_queue: [],
		audio_embed_total_tokens: 0,
		audio_queue_offset: 0,
		audio_consumed: 0,
		stream_exhausted: !1,
		chunks_iter: v,
		text_hidden_size: r.hidden_size
	};
}
async function hO(e, t) {
	const r = t.dims[2], s = Math.floor((uO + r - 3) / 2) + 1, n = new V("int64", BigInt64Array.from({ length: s }, (d, h) => BigInt(e.enc_past_seq_len + h)), [1, s]), a = e.enc_past_seq_len + s, o = ft([1, a]), { audio_embeds: i, present_padding_cache: l, ...c } = await ye(e.encoder_session, {
		input_features: t,
		attention_mask: o,
		position_ids: n,
		past_padding_cache: e.enc_padding_cache,
		...e.enc_kv_cache
	});
	e.enc_padding_cache.location === "gpu-buffer" && e.enc_padding_cache.dispose(), e.enc_padding_cache = l;
	for (const d in c) if (d.startsWith("present.")) {
		const h = d.replace("present", "past_key_values"), _ = e.enc_kv_cache[h];
		_?.location === "gpu-buffer" && _.dispose(), e.enc_kv_cache[h] = c[d];
	}
	return e.enc_past_seq_len = a, i;
}
async function fO(e, t) {
	for (; e.audio_embed_total_tokens < t && !e.stream_exhausted;) {
		const r = await e.chunks_iter.next();
		if (r.done) {
			e.stream_exhausted = !0;
			break;
		}
		const s = await hO(e, r.value);
		e.audio_embed_queue.push({
			data: s.data,
			tokens: s.dims[1]
		}), e.audio_embed_total_tokens += s.dims[1];
	}
}
function _O(e, t, r) {
	if (e.audio_embed_queue.length === 0) return;
	const s = t.data;
	let n = 0, a = r;
	for (; a > 0 && e.audio_embed_queue.length > 0;) {
		const o = e.audio_embed_queue[0], i = o.tokens - e.audio_queue_offset, l = Math.min(a, i), c = e.audio_queue_offset * e.text_hidden_size;
		for (let d = 0; d < l * e.text_hidden_size; ++d) s[n * e.text_hidden_size + d] += o.data[c + d];
		n += l, a -= l, e.audio_queue_offset += l, e.audio_queue_offset >= o.tokens && (e.audio_embed_queue.shift(), e.audio_queue_offset = 0);
	}
	e.audio_consumed += r - a;
}
var pO = class extends ha {
	constructor(e) {
		super(), this._s = e;
	}
	_call(e) {
		const t = this._s.stream_exhausted && this._s.audio_embed_queue.length === 0;
		return e.map(() => t);
	}
}, kg = class extends S {
	forward_params = [
		"input_ids",
		"attention_mask",
		"position_ids",
		"past_key_values"
	];
}, Tg = class extends kg {
	async forward({ input_ids: e, past_key_values: t, ...r }) {
		const s = e.dims[1], n = Go.get(this);
		n && await fO(n, n.audio_consumed + s);
		const { inputs_embeds: a } = await ye(this.sessions.embed_tokens, { input_ids: e });
		n && _O(n, a, s);
		const o = {
			inputs_embeds: a,
			...r
		};
		Wi(this, o, t);
		const i = this.sessions.decoder_model_merged;
		return await ye(i, Ke(o, i.inputNames));
	}
	async generate({ input_features: e, stopping_criteria: t, ...r }) {
		if (!e) throw new Error("input_features (generator/iterable) must be provided");
		const s = dO(this, e);
		Go.set(this, s);
		const n = new em();
		n.push(new pO(s)), t && n.extend(t);
		try {
			return await super.generate({
				...r,
				stopping_criteria: n
			});
		} finally {
			s.enc_kv_cache.dispose(), Go.delete(this);
		}
	}
}, Fa = class extends S {}, mO = class extends Fa {}, gO = class extends Fa {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, wO = class extends Fa {
	async _call(e) {
		return new re(await super._call(e));
	}
}, Eg = class extends We {
	constructor({ logits: e, embeddings: t }) {
		super(), this.logits = e, this.embeddings = t;
	}
}, Es = class extends S {}, vO = class extends Es {}, yO = class extends Es {
	async _call(e) {
		return new Gr(await super._call(e));
	}
}, bO = class extends Es {
	async _call(e) {
		return new re(await super._call(e));
	}
}, MO = class extends Es {
	async _call(e) {
		return new Eg(await super._call(e));
	}
}, xO = class extends Es {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, Ag = class extends S {}, kO = class extends Ag {}, TO = class extends Zp {
	return_timestamps = null;
	return_token_timestamps = null;
	num_frames = null;
	alignment_heads = null;
	task = null;
	language = null;
	no_timestamps_token_id = null;
	prompt_ids = null;
	is_multilingual = null;
	lang_to_id = null;
	task_to_id = null;
	max_initial_timestamp_index = 1;
}, Qc = class extends S {
	requires_attention_mask = !1;
	main_input_name = "input_features";
	forward_params = [
		"input_features",
		"attention_mask",
		"decoder_input_ids",
		"decoder_attention_mask",
		"past_key_values"
	];
}, EO = class extends Qc {}, Cg = class extends Qc {
	_prepare_generation_config(e, t) {
		return super._prepare_generation_config(e, t, TO);
	}
	_retrieve_init_tokens(e) {
		const t = [e.decoder_start_token_id];
		let r = e.language;
		const s = e.task;
		if (e.is_multilingual) {
			r || (oe.warn("No language specified - defaulting to English (en)."), r = "en");
			const n = `<|${tT(r)}|>`;
			t.push(e.lang_to_id[n]), t.push(e.task_to_id[s ?? "transcribe"]);
		} else if (r || s) throw new Error("Cannot specify `task` or `language` for an English-only model. If the model is intended to be multilingual, pass `is_multilingual=true` to generate, or update the generation config.");
		return !e.return_timestamps && e.no_timestamps_token_id && t.at(-1) !== e.no_timestamps_token_id ? t.push(e.no_timestamps_token_id) : e.return_timestamps && t.at(-1) === e.no_timestamps_token_id && (oe.warn("<|notimestamps|> prompt token is removed from generation_config since `return_timestamps` is set to `true`."), t.pop()), t.filter((n) => n != null);
	}
	async generate({ inputs: e = null, generation_config: t = null, logits_processor: r = null, stopping_criteria: s = null, ...n }) {
		t = this._prepare_generation_config(t, n);
		const a = n.decoder_input_ids instanceof V ? Ni(n.decoder_input_ids) : n.decoder_input_ids ?? this._retrieve_init_tokens(t);
		if (t.return_timestamps && (r ??= new ri(), r.push(new D2(t, a))), t.begin_suppress_tokens && (r ??= new ri(), r.push(new Kp(t.begin_suppress_tokens, a.length))), t.return_token_timestamps) {
			if (!t.alignment_heads) throw new Error("Model generation config has no `alignment_heads`, token-level timestamps not available. See https://gist.github.com/hollance/42e32852f24243b748ae6bc1f985b13a on how to add this property to the generation config.");
			t.task === "translate" && oe.warn("Token-level timestamps may not be reliable for task 'translate'."), t.output_attentions = !0, t.return_dict_in_generate = !0;
		}
		if (t.return_timestamps && !n.max_new_tokens) return this._generate_with_seek({
			inputs: e,
			generation_config: t,
			logits_processor: r,
			init_tokens: a,
			kwargs: n
		});
		const o = await super.generate({
			inputs: e,
			generation_config: t,
			logits_processor: r,
			decoder_input_ids: a,
			...n
		});
		return t.return_token_timestamps && (o.token_timestamps = this._extract_token_timestamps(o, t.alignment_heads, t.num_frames, .02, a.length)), o;
	}
	async _generate_with_seek({ inputs: e, generation_config: t, logits_processor: r, init_tokens: s, kwargs: n }) {
		const a = t.no_timestamps_token_id + 1, o = Array.isArray(t.eos_token_id) ? t.eos_token_id[0] : t.eos_token_id, i = t.return_token_timestamps, l = e, c = l.dims[2], d = 2, h = d * this.config.max_source_positions;
		let _ = 0;
		const m = [], v = [];
		for (; _ < c;) {
			const b = Math.min(_ + h, c), M = l.slice(null, null, [_, b]);
			let E;
			const A = M.dims[2];
			if (A < h) {
				const F = l.dims[1], U = new Float32Array(F * h), ae = M.data;
				for (let Z = 0; Z < F; ++Z) U.set(ae.subarray(Z * A, (Z + 1) * A), Z * h);
				E = new V("float32", U, [
					1,
					F,
					h
				]);
			} else E = M;
			if (r) for (const F of r) "begin_index" in F && (F.begin_index = s.length);
			const k = await super.generate({
				inputs: E,
				generation_config: t,
				logits_processor: r,
				decoder_input_ids: s,
				...n
			}), C = (i ? k.sequences : k)[0].tolist().map(Number).slice(s.length);
			let O;
			if (i) {
				k.token_timestamps = this._extract_token_timestamps(k, t.alignment_heads, Math.floor((b - _) / d), .02, s.length);
				const F = _ / d * .02;
				O = k.token_timestamps[0].tolist().slice(s.length).map((U) => U + F);
			}
			if (C.length > 0 && C.at(-1) === o && C.pop(), C.length === 0) break;
			const x = C.map((F) => F >= a), q = C.length >= 2 && x[C.length - 1] && !x[C.length - 2], R = [];
			for (let F = 0; F < C.length - 1; ++F) x[F] && x[F + 1] && R.push(F + 1);
			let G, W = C.length;
			if (R.length > 0) if (q) G = b - _;
			else {
				const F = R.at(-1);
				G = (C[F - 1] - a) * d, W = F;
			}
			else G = b - _;
			const H = Math.floor(_ / d), D = a + 1500;
			for (let F = 0; F < W; ++F) C[F] >= a && (C[F] = Math.min(C[F] + H, D));
			m.push(...C.slice(0, W)), O && v.push(...O.slice(0, W)), _ += G;
		}
		m.push(o);
		const w = [...s, ...m];
		if (i) {
			const b = new V("int64", w.map(BigInt), [1, w.length]), M = [
				...new Array(s.length).fill(0),
				...v,
				0
			];
			return {
				sequences: b,
				token_timestamps: new V("float32", new Float32Array(M), [1, M.length])
			};
		}
		return new V("int64", w.map(BigInt), [1, w.length]);
	}
	_extract_token_timestamps(e, t, r = null, s = .02, n = 0) {
		if (!e.cross_attentions) throw new Error("Model outputs must contain cross attentions to extract timestamps. This is most likely because the model was not exported with `output_attentions=True`.");
		r == null && oe.warn("`num_frames` has not been set, meaning the entire audio will be analyzed. This may lead to inaccurate token-level timestamps for short audios (< 30 seconds).");
		let a = this.config.median_filter_width;
		a === void 0 && (oe.warn("Model config has no `median_filter_width`, using default value of 7."), a = 7);
		const o = e.cross_attentions, i = Array.from({ length: this.config.decoder_layers }, (w, b) => Ne(o.map((M) => M[b]), 2)), l = or(t.map(([w, b]) => {
			if (w >= i.length) throw new Error(`Layer index ${w} is out of bounds for cross attentions (length ${i.length}).`);
			return r ? i[w].slice(null, b, null, [0, r]) : i[w].slice(null, b);
		})).transpose(1, 0, 2, 3), [c, d] = ak(l, -2, 0, !0), h = l.clone();
		for (let w = 0; w < h.dims[0]; ++w) {
			const b = h[w];
			for (let M = 0; M < b.dims[0]; ++M) {
				const E = b[M], A = c[w][M][0].data, k = d[w][M][0].data;
				for (let C = 0; C < E.dims[0]; ++C) {
					let O = E[C].data;
					for (let x = 0; x < O.length; ++x) O[x] = (O[x] - k[x]) / A[x];
					O.set($1(O, a));
				}
			}
		}
		const _ = [Ii(n > 0 ? h.slice(null, null, [n, h.dims[2]], null) : h, 1)], m = e.sequences.dims, v = new V("float32", new Float32Array(m[0] * m[1]), m);
		for (let w = 0; w < m[0]; ++w) {
			const [b, M] = U1(_[w].neg().squeeze_(0).tolist()), E = Ft([1], Array.from({ length: b.length - 1 }, (C, O) => b[O + 1] - b[O])).map((C) => !!C), A = [];
			for (let C = 0; C < E.length; ++C) E[C] && A.push(M[C] * s);
			const k = new Array(n).fill(0);
			k.push(...A), A.length > 0 && k.push(A.at(-1)), v[w].data.set(k);
		}
		return v;
	}
}, AO = class extends Cg {}, As = class extends S {}, CO = class extends As {}, SO = class extends As {
	async _call(e) {
		return new He(await super._call(e));
	}
}, PO = class extends As {
	async _call(e) {
		return new re(await super._call(e));
	}
}, FO = class extends As {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, LO = class extends As {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Cs = class extends S {}, IO = class extends Cs {}, OO = class extends Cs {
	async _call(e) {
		return new He(await super._call(e));
	}
}, NO = class extends Cs {
	async _call(e) {
		return new re(await super._call(e));
	}
}, DO = class extends Cs {
	async _call(e) {
		return new Ue(await super._call(e));
	}
}, zO = class extends Cs {
	async _call(e) {
		return new ct(await super._call(e));
	}
}, Xc = class extends S {}, BO = class extends Xc {}, RO = class extends Xc {
	async _call(e) {
		return new Sg(await super._call(e));
	}
}, Sg = class extends We {
	constructor({ logits: e, pred_boxes: t }) {
		super(), this.logits = e, this.pred_boxes = t;
	}
}, Yc = class extends S {}, GO = class extends Yc {}, $O = class extends Yc {}, VO = /* @__PURE__ */ new Map([
	["bert", "BertModel"],
	["eurobert", "EuroBertModel"],
	["neobert", "NeoBertModel"],
	["modernbert", "ModernBertModel"],
	["nomic_bert", "NomicBertModel"],
	["roformer", "RoFormerModel"],
	["electra", "ElectraModel"],
	["esm", "EsmModel"],
	["convbert", "ConvBertModel"],
	["camembert", "CamembertModel"],
	["deberta", "DebertaModel"],
	["deberta-v2", "DebertaV2Model"],
	["mpnet", "MPNetModel"],
	["albert", "AlbertModel"],
	["distilbert", "DistilBertModel"],
	["roberta", "RobertaModel"],
	["xlm", "XLMModel"],
	["xlm-roberta", "XLMRobertaModel"],
	["clap", "ClapModel"],
	["clip", "CLIPModel"],
	["clipseg", "CLIPSegModel"],
	["chinese_clip", "ChineseCLIPModel"],
	["siglip", "SiglipModel"],
	["jina_clip", "JinaCLIPModel"],
	["mobilebert", "MobileBertModel"],
	["squeezebert", "SqueezeBertModel"],
	["wav2vec2", "Wav2Vec2Model"],
	["wav2vec2-bert", "Wav2Vec2BertModel"],
	["unispeech", "UniSpeechModel"],
	["unispeech-sat", "UniSpeechSatModel"],
	["hubert", "HubertModel"],
	["wavlm", "WavLMModel"],
	["audio-spectrogram-transformer", "ASTModel"],
	["vits", "VitsModel"],
	["pyannote", "PyAnnoteModel"],
	["wespeaker-resnet", "WeSpeakerResNetModel"],
	["detr", "DetrModel"],
	["rt_detr", "RTDetrModel"],
	["rt_detr_v2", "RTDetrV2Model"],
	["rf_detr", "RFDetrModel"],
	["d_fine", "DFineModel"],
	["table-transformer", "TableTransformerModel"],
	["vit", "ViTModel"],
	["ijepa", "IJepaModel"],
	["pvt", "PvtModel"],
	["vit_msn", "ViTMSNModel"],
	["vit_mae", "ViTMAEModel"],
	["groupvit", "GroupViTModel"],
	["fastvit", "FastViTModel"],
	["mobilevit", "MobileViTModel"],
	["mobilevitv2", "MobileViTV2Model"],
	["owlvit", "OwlViTModel"],
	["owlv2", "Owlv2Model"],
	["beit", "BeitModel"],
	["deit", "DeiTModel"],
	["hiera", "HieraModel"],
	["convnext", "ConvNextModel"],
	["convnextv2", "ConvNextV2Model"],
	["dinov2", "Dinov2Model"],
	["dinov2_with_registers", "Dinov2WithRegistersModel"],
	["dinov3_vit", "DINOv3ViTModel"],
	["dinov3_convnext", "DINOv3ConvNextModel"],
	["resnet", "ResNetModel"],
	["swin", "SwinModel"],
	["swin2sr", "Swin2SRModel"],
	["donut-swin", "DonutSwinModel"],
	["yolos", "YolosModel"],
	["dpt", "DPTModel"],
	["glpn", "GLPNModel"],
	["hifigan", "SpeechT5HifiGan"],
	["efficientnet", "EfficientNetModel"],
	["decision_transformer", "DecisionTransformerModel"],
	["patchtst", "PatchTSTModel"],
	["patchtsmixer", "PatchTSMixerModel"],
	["mobilenet_v1", "MobileNetV1Model"],
	["mobilenet_v2", "MobileNetV2Model"],
	["mobilenet_v3", "MobileNetV3Model"],
	["mobilenet_v4", "MobileNetV4Model"],
	["maskformer", "MaskFormerModel"],
	["mgp-str", "MgpstrForSceneTextRecognition"],
	["style_text_to_speech_2", "StyleTextToSpeech2Model"],
	["openai_privacy_filter", "OpenAIPrivacyFilterModel"]
]), UO = /* @__PURE__ */ new Map([
	["t5", "T5Model"],
	["longt5", "LongT5Model"],
	["mt5", "MT5Model"],
	["bart", "BartModel"],
	["mbart", "MBartModel"],
	["marian", "MarianModel"],
	["whisper", "WhisperModel"],
	["cohere_asr", "CohereAsrModel"],
	["m2m_100", "M2M100Model"],
	["blenderbot", "BlenderbotModel"],
	["blenderbot-small", "BlenderbotSmallModel"]
]), jO = /* @__PURE__ */ new Map([
	["mimi", "MimiModel"],
	["dac", "DacModel"],
	["snac", "SnacModel"]
]), qO = /* @__PURE__ */ new Map([
	["bloom", "BloomModel"],
	["jais", "JAISModel"],
	["gpt2", "GPT2Model"],
	["gpt_oss", "GptOssModel"],
	["gptj", "GPTJModel"],
	["gpt_bigcode", "GPTBigCodeModel"],
	["gpt_neo", "GPTNeoModel"],
	["gpt_neox", "GPTNeoXModel"],
	["codegen", "CodeGenModel"],
	["llama", "LlamaModel"],
	["apertus", "ApertusModel"],
	["nanochat", "NanoChatModel"],
	["arcee", "ArceeModel"],
	["afmoe", "AfmoeModel"],
	["lfm2", "Lfm2Model"],
	["lfm2_moe", "Lfm2MoeModel"],
	["smollm3", "SmolLM3Model"],
	["exaone", "ExaoneModel"],
	["olmo", "OlmoModel"],
	["olmo2", "Olmo2Model"],
	["olmo3", "Olmo3Model"],
	["olmo_hybrid", "OlmoHybridModel"],
	["mobilellm", "MobileLLMModel"],
	["granite", "GraniteModel"],
	["granitemoehybrid", "GraniteMoeHybridModel"],
	["cohere", "CohereModel"],
	["cohere2", "Cohere2Model"],
	["gemma", "GemmaModel"],
	["gemma2", "Gemma2Model"],
	["vaultgemma", "VaultGemmaModel"],
	["gemma3_text", "Gemma3Model"],
	["helium", "HeliumModel"],
	["glm", "GlmModel"],
	["glm_moe_dsa", "GlmMoeDsaModel"],
	["openelm", "OpenELMModel"],
	["qwen2", "Qwen2Model"],
	["qwen2_moe", "Qwen2MoeModel"],
	["qwen3", "Qwen3Model"],
	["qwen3_moe", "Qwen3MoeModel"],
	["qwen3_next", "Qwen3NextModel"],
	["phi", "PhiModel"],
	["phi3", "Phi3Model"],
	["mpt", "MptModel"],
	["opt", "OPTModel"],
	["mistral", "MistralModel"],
	["mistral4", "Mistral4Model"],
	["ministral", "MinistralModel"],
	["ministral3", "Ministral3Model"],
	["ernie4_5", "Ernie4_5ForCausalLM"],
	["starcoder2", "Starcoder2Model"],
	["deepseek_v3", "DeepseekV3Model"],
	["falcon", "FalconModel"],
	["falcon_h1", "FalconH1Model"],
	["nemotron_h", "NemotronHModel"],
	["solar_open", "SolarOpenModel"],
	["stablelm", "StableLmModel"],
	["modernbert-decoder", "ModernBertDecoderModel"],
	["hunyuan_v1_dense", "HunYuanDenseV1Model"],
	["youtu", "YoutuModel"]
]), Pg = /* @__PURE__ */ new Map([
	["speecht5", "SpeechT5ForSpeechToText"],
	["whisper", "WhisperForConditionalGeneration"],
	["lite-whisper", "LiteWhisperForConditionalGeneration"],
	["moonshine", "MoonshineForConditionalGeneration"],
	["cohere_asr", "CohereAsrForConditionalGeneration"]
]), Fg = /* @__PURE__ */ new Map([["speecht5", "SpeechT5ForTextToSpeech"]]), Lg = /* @__PURE__ */ new Map([
	["vits", "VitsModel"],
	["musicgen", "MusicgenForConditionalGeneration"],
	["supertonic", "SupertonicForConditionalGeneration"]
]), Ig = /* @__PURE__ */ new Map([
	["bert", "BertForSequenceClassification"],
	["eurobert", "EuroBertForSequenceClassification"],
	["neobert", "NeoBertForSequenceClassification"],
	["modernbert", "ModernBertForSequenceClassification"],
	["roformer", "RoFormerForSequenceClassification"],
	["electra", "ElectraForSequenceClassification"],
	["esm", "EsmForSequenceClassification"],
	["convbert", "ConvBertForSequenceClassification"],
	["camembert", "CamembertForSequenceClassification"],
	["deberta", "DebertaForSequenceClassification"],
	["deberta-v2", "DebertaV2ForSequenceClassification"],
	["mpnet", "MPNetForSequenceClassification"],
	["albert", "AlbertForSequenceClassification"],
	["distilbert", "DistilBertForSequenceClassification"],
	["roberta", "RobertaForSequenceClassification"],
	["xlm", "XLMForSequenceClassification"],
	["xlm-roberta", "XLMRobertaForSequenceClassification"],
	["bart", "BartForSequenceClassification"],
	["mbart", "MBartForSequenceClassification"],
	["mobilebert", "MobileBertForSequenceClassification"],
	["squeezebert", "SqueezeBertForSequenceClassification"]
]), Og = /* @__PURE__ */ new Map([
	["bert", "BertForTokenClassification"],
	["eurobert", "EuroBertForTokenClassification"],
	["neobert", "NeoBertForTokenClassification"],
	["modernbert", "ModernBertForTokenClassification"],
	["roformer", "RoFormerForTokenClassification"],
	["electra", "ElectraForTokenClassification"],
	["esm", "EsmForTokenClassification"],
	["convbert", "ConvBertForTokenClassification"],
	["camembert", "CamembertForTokenClassification"],
	["deberta", "DebertaForTokenClassification"],
	["deberta-v2", "DebertaV2ForTokenClassification"],
	["mpnet", "MPNetForTokenClassification"],
	["distilbert", "DistilBertForTokenClassification"],
	["roberta", "RobertaForTokenClassification"],
	["xlm", "XLMForTokenClassification"],
	["xlm-roberta", "XLMRobertaForTokenClassification"],
	["openai_privacy_filter", "OpenAIPrivacyFilterForTokenClassification"]
]), Ng = /* @__PURE__ */ new Map([
	["t5", "T5ForConditionalGeneration"],
	["longt5", "LongT5ForConditionalGeneration"],
	["mt5", "MT5ForConditionalGeneration"],
	["bart", "BartForConditionalGeneration"],
	["mbart", "MBartForConditionalGeneration"],
	["marian", "MarianMTModel"],
	["m2m_100", "M2M100ForConditionalGeneration"],
	["blenderbot", "BlenderbotForConditionalGeneration"],
	["blenderbot-small", "BlenderbotSmallForConditionalGeneration"]
]), Dg = /* @__PURE__ */ new Map([
	["bloom", "BloomForCausalLM"],
	["gpt2", "GPT2LMHeadModel"],
	["gpt_oss", "GptOssForCausalLM"],
	["jais", "JAISLMHeadModel"],
	["gptj", "GPTJForCausalLM"],
	["gpt_bigcode", "GPTBigCodeForCausalLM"],
	["gpt_neo", "GPTNeoForCausalLM"],
	["gpt_neox", "GPTNeoXForCausalLM"],
	["codegen", "CodeGenForCausalLM"],
	["llama", "LlamaForCausalLM"],
	["nanochat", "NanoChatForCausalLM"],
	["apertus", "ApertusForCausalLM"],
	["llama4_text", "Llama4ForCausalLM"],
	["arcee", "ArceeForCausalLM"],
	["afmoe", "AfmoeForCausalLM"],
	["lfm2", "Lfm2ForCausalLM"],
	["lfm2_moe", "Lfm2MoeForCausalLM"],
	["smollm3", "SmolLM3ForCausalLM"],
	["exaone", "ExaoneForCausalLM"],
	["olmo", "OlmoForCausalLM"],
	["olmo2", "Olmo2ForCausalLM"],
	["olmo3", "Olmo3ForCausalLM"],
	["olmo_hybrid", "OlmoHybridForCausalLM"],
	["mobilellm", "MobileLLMForCausalLM"],
	["granite", "GraniteForCausalLM"],
	["granitemoehybrid", "GraniteMoeHybridForCausalLM"],
	["cohere", "CohereForCausalLM"],
	["cohere2", "Cohere2ForCausalLM"],
	["gemma", "GemmaForCausalLM"],
	["gemma2", "Gemma2ForCausalLM"],
	["vaultgemma", "VaultGemmaForCausalLM"],
	["gemma3_text", "Gemma3ForCausalLM"],
	["gemma3", "Gemma3ForCausalLM"],
	["helium", "HeliumForCausalLM"],
	["glm", "GlmForCausalLM"],
	["glm_moe_dsa", "GlmMoeDsaForCausalLM"],
	["openelm", "OpenELMForCausalLM"],
	["qwen2", "Qwen2ForCausalLM"],
	["qwen2_moe", "Qwen2MoeForCausalLM"],
	["qwen3", "Qwen3ForCausalLM"],
	["qwen3_moe", "Qwen3MoeForCausalLM"],
	["qwen3_next", "Qwen3NextForCausalLM"],
	["qwen2_vl", "Qwen2VLForCausalLM"],
	["qwen2_5_vl", "Qwen2_5_VLForCausalLM"],
	["qwen3_vl", "Qwen3VLForCausalLM"],
	["qwen3_vl_moe", "Qwen3VLMoeForCausalLM"],
	["qwen3_5", "Qwen3_5ForCausalLM"],
	["qwen3_5_text", "Qwen3_5ForCausalLM"],
	["qwen3_5_moe", "Qwen3_5MoeForCausalLM"],
	["gemma3n", "Gemma3nForCausalLM"],
	["gemma4", "Gemma4ForCausalLM"],
	["phi", "PhiForCausalLM"],
	["phi3", "Phi3ForCausalLM"],
	["mpt", "MptForCausalLM"],
	["opt", "OPTForCausalLM"],
	["mbart", "MBartForCausalLM"],
	["mistral", "MistralForCausalLM"],
	["mistral4", "Mistral4ForCausalLM"],
	["ministral", "MinistralForCausalLM"],
	["ministral3", "Ministral3ForCausalLM"],
	["ernie4_5", "Ernie4_5ForCausalLM"],
	["starcoder2", "Starcoder2ForCausalLM"],
	["deepseek_v3", "DeepseekV3ForCausalLM"],
	["falcon", "FalconForCausalLM"],
	["falcon_h1", "FalconH1ForCausalLM"],
	["nemotron_h", "NemotronHForCausalLM"],
	["trocr", "TrOCRForCausalLM"],
	["solar_open", "SolarOpenForCausalLM"],
	["stablelm", "StableLmForCausalLM"],
	["modernbert-decoder", "ModernBertDecoderForCausalLM"],
	["hunyuan_v1_dense", "HunYuanDenseV1ForCausalLM"],
	["youtu", "YoutuForCausalLM"],
	["phi3_v", "Phi3VForCausalLM"]
]), WO = /* @__PURE__ */ new Map([["multi_modality", "MultiModalityCausalLM"]]), zg = /* @__PURE__ */ new Map([
	["bert", "BertForMaskedLM"],
	["eurobert", "EuroBertForMaskedLM"],
	["neobert", "NeoBertForMaskedLM"],
	["modernbert", "ModernBertForMaskedLM"],
	["roformer", "RoFormerForMaskedLM"],
	["electra", "ElectraForMaskedLM"],
	["esm", "EsmForMaskedLM"],
	["convbert", "ConvBertForMaskedLM"],
	["camembert", "CamembertForMaskedLM"],
	["deberta", "DebertaForMaskedLM"],
	["deberta-v2", "DebertaV2ForMaskedLM"],
	["mpnet", "MPNetForMaskedLM"],
	["albert", "AlbertForMaskedLM"],
	["distilbert", "DistilBertForMaskedLM"],
	["roberta", "RobertaForMaskedLM"],
	["xlm", "XLMWithLMHeadModel"],
	["xlm-roberta", "XLMRobertaForMaskedLM"],
	["mobilebert", "MobileBertForMaskedLM"],
	["squeezebert", "SqueezeBertForMaskedLM"]
]), Bg = /* @__PURE__ */ new Map([
	["bert", "BertForQuestionAnswering"],
	["neobert", "NeoBertForQuestionAnswering"],
	["roformer", "RoFormerForQuestionAnswering"],
	["electra", "ElectraForQuestionAnswering"],
	["convbert", "ConvBertForQuestionAnswering"],
	["camembert", "CamembertForQuestionAnswering"],
	["deberta", "DebertaForQuestionAnswering"],
	["deberta-v2", "DebertaV2ForQuestionAnswering"],
	["mpnet", "MPNetForQuestionAnswering"],
	["albert", "AlbertForQuestionAnswering"],
	["distilbert", "DistilBertForQuestionAnswering"],
	["roberta", "RobertaForQuestionAnswering"],
	["xlm", "XLMForQuestionAnswering"],
	["xlm-roberta", "XLMRobertaForQuestionAnswering"],
	["mobilebert", "MobileBertForQuestionAnswering"],
	["squeezebert", "SqueezeBertForQuestionAnswering"]
]), Rg = /* @__PURE__ */ new Map([
	["vision-encoder-decoder", "VisionEncoderDecoderModel"],
	["idefics3", "Idefics3ForConditionalGeneration"],
	["smolvlm", "SmolVLMForConditionalGeneration"]
]), Gg = /* @__PURE__ */ new Map([
	["llava", "LlavaForConditionalGeneration"],
	["llava_onevision", "LlavaOnevisionForConditionalGeneration"],
	["moondream1", "Moondream1ForConditionalGeneration"],
	["florence2", "Florence2ForConditionalGeneration"],
	["qwen2_vl", "Qwen2VLForConditionalGeneration"],
	["qwen2_5_vl", "Qwen2_5_VLForConditionalGeneration"],
	["qwen3_vl", "Qwen3VLForConditionalGeneration"],
	["qwen3_vl_moe", "Qwen3VLMoeForConditionalGeneration"],
	["qwen3_5", "Qwen3_5ForConditionalGeneration"],
	["qwen3_5_moe", "Qwen3_5MoeForConditionalGeneration"],
	["lfm2_vl", "Lfm2VlForConditionalGeneration"],
	["idefics3", "Idefics3ForConditionalGeneration"],
	["smolvlm", "SmolVLMForConditionalGeneration"],
	["paligemma", "PaliGemmaForConditionalGeneration"],
	["llava_qwen2", "LlavaQwen2ForCausalLM"],
	["gemma3", "Gemma3ForConditionalGeneration"],
	["gemma3n", "Gemma3nForConditionalGeneration"],
	["gemma4", "Gemma4ForConditionalGeneration"],
	["mis" + "tral3", "Mistral3ForConditionalGeneration"],
	["lighton_ocr", "LightOnOcrForConditionalGeneration"],
	["glm_ocr", "GlmOcrForConditionalGeneration"]
]), $g = /* @__PURE__ */ new Map([
	["granite_speech", "GraniteSpeechForConditionalGeneration"],
	["ultravox", "UltravoxModel"],
	["voxtral", "VoxtralForConditionalGeneration"],
	["voxtral_realtime", "VoxtralRealtimeForConditionalGeneration"]
]), HO = /* @__PURE__ */ new Map([["vision-encoder-decoder", "VisionEncoderDecoderModel"]]), Vg = /* @__PURE__ */ new Map([
	["vit", "ViTForImageClassification"],
	["ijepa", "IJepaForImageClassification"],
	["pvt", "PvtForImageClassification"],
	["vit_msn", "ViTMSNForImageClassification"],
	["fastvit", "FastViTForImageClassification"],
	["mobilevit", "MobileViTForImageClassification"],
	["mobilevitv2", "MobileViTV2ForImageClassification"],
	["beit", "BeitForImageClassification"],
	["deit", "DeiTForImageClassification"],
	["hiera", "HieraForImageClassification"],
	["convnext", "ConvNextForImageClassification"],
	["convnextv2", "ConvNextV2ForImageClassification"],
	["dinov2", "Dinov2ForImageClassification"],
	["dinov2_with_registers", "Dinov2WithRegistersForImageClassification"],
	["resnet", "ResNetForImageClassification"],
	["swin", "SwinForImageClassification"],
	["segformer", "SegformerForImageClassification"],
	["efficientnet", "EfficientNetForImageClassification"],
	["mobilenet_v1", "MobileNetV1ForImageClassification"],
	["mobilenet_v2", "MobileNetV2ForImageClassification"],
	["mobilenet_v3", "MobileNetV3ForImageClassification"],
	["mobilenet_v4", "MobileNetV4ForImageClassification"]
]), Ug = /* @__PURE__ */ new Map([
	["detr", "DetrForObjectDetection"],
	["rt_detr", "RTDetrForObjectDetection"],
	["rt_detr_v2", "RTDetrV2ForObjectDetection"],
	["rf_detr", "RFDetrForObjectDetection"],
	["d_fine", "DFineForObjectDetection"],
	["table-transformer", "TableTransformerForObjectDetection"],
	["yolos", "YolosForObjectDetection"]
]), jg = /* @__PURE__ */ new Map([
	["owlvit", "OwlViTForObjectDetection"],
	["owlv2", "Owlv2ForObjectDetection"],
	["grounding-dino", "GroundingDinoForObjectDetection"]
]), ns = /* @__PURE__ */ new Map([["detr", "DetrForSegmentation"], ["clipseg", "CLIPSegForImageSegmentation"]]), qg = /* @__PURE__ */ new Map([
	["segformer", "SegformerForSemanticSegmentation"],
	["sapiens", "SapiensForSemanticSegmentation"],
	["swin", "SwinForSemanticSegmentation"],
	["mobilenet_v1", "MobileNetV1ForSemanticSegmentation"],
	["mobilenet_v2", "MobileNetV2ForSemanticSegmentation"],
	["mobilenet_v3", "MobileNetV3ForSemanticSegmentation"],
	["mobilenet_v4", "MobileNetV4ForSemanticSegmentation"]
]), Wg = /* @__PURE__ */ new Map([["detr", "DetrForSegmentation"], ["maskformer", "MaskFormerForInstanceSegmentation"]]), Hg = /* @__PURE__ */ new Map([
	["sam", "SamModel"],
	["sam2", "Sam2Model"],
	["edgetam", "EdgeTamModel"],
	["sam3_tracker", "Sam3TrackerModel"]
]), Qg = /* @__PURE__ */ new Map([
	["wav2vec2", "Wav2Vec2ForCTC"],
	["wav2vec2-bert", "Wav2Vec2BertForCTC"],
	["unispeech", "UniSpeechForCTC"],
	["unispeech-sat", "UniSpeechSatForCTC"],
	["wavlm", "WavLMForCTC"],
	["hubert", "HubertForCTC"],
	["parakeet_ctc", "ParakeetForCTC"]
]), Xg = /* @__PURE__ */ new Map([
	["wav2vec2", "Wav2Vec2ForSequenceClassification"],
	["wav2vec2-bert", "Wav2Vec2BertForSequenceClassification"],
	["unispeech", "UniSpeechForSequenceClassification"],
	["unispeech-sat", "UniSpeechSatForSequenceClassification"],
	["wavlm", "WavLMForSequenceClassification"],
	["hubert", "HubertForSequenceClassification"],
	["audio-spectrogram-transformer", "ASTForAudioClassification"]
]), Yg = /* @__PURE__ */ new Map([["wavlm", "WavLMForXVector"]]), Jg = /* @__PURE__ */ new Map([
	["unispeech-sat", "UniSpeechSatForAudioFrameClassification"],
	["wavlm", "WavLMForAudioFrameClassification"],
	["wav2vec2", "Wav2Vec2ForAudioFrameClassification"],
	["pyannote", "PyAnnoteForAudioFrameClassification"]
]), Kg = /* @__PURE__ */ new Map([["vitmatte", "VitMatteForImageMatting"]]), QO = /* @__PURE__ */ new Map([["patchtst", "PatchTSTForPrediction"], ["patchtsmixer", "PatchTSMixerForPrediction"]]), Zg = /* @__PURE__ */ new Map([["swin2sr", "Swin2SRForImageSuperResolution"]]), ew = /* @__PURE__ */ new Map([
	["chmv2", "CHMv2ForDepthEstimation"],
	["dpt", "DPTForDepthEstimation"],
	["depth_anything", "DepthAnythingForDepthEstimation"],
	["glpn", "GLPNForDepthEstimation"],
	["sapiens", "SapiensForDepthEstimation"],
	["depth_pro", "DepthProForDepthEstimation"],
	["metric3d", "Metric3DForDepthEstimation"],
	["metric3dv2", "Metric3Dv2ForDepthEstimation"]
]), tw = /* @__PURE__ */ new Map([["sapiens", "SapiensForNormalEstimation"]]), rw = /* @__PURE__ */ new Map([["vitpose", "VitPoseForPoseEstimation"]]), sw = /* @__PURE__ */ new Map([
	["clip", "CLIPVisionModelWithProjection"],
	["siglip", "SiglipVisionModel"],
	["jina_clip", "JinaCLIPVisionModel"]
]), nw = [
	[VO, j.EncoderOnly],
	[UO, j.EncoderDecoder],
	[qO, j.DecoderOnlyWithoutHead],
	[jO, j.AutoEncoder],
	[Ig, j.EncoderOnly],
	[Og, j.EncoderOnly],
	[Ng, j.Seq2Seq],
	[Pg, j.Seq2Seq],
	[Dg, j.DecoderOnly],
	[WO, j.MultiModality],
	[zg, j.EncoderOnly],
	[Bg, j.EncoderOnly],
	[Rg, j.Vision2Seq],
	[Gg, j.ImageTextToText],
	[$g, j.AudioTextToText],
	[Vg, j.EncoderOnly],
	[ns, j.EncoderOnly],
	[Wg, j.EncoderOnly],
	[qg, j.EncoderOnly],
	[Kg, j.EncoderOnly],
	[QO, j.EncoderOnly],
	[Zg, j.EncoderOnly],
	[ew, j.EncoderOnly],
	[tw, j.EncoderOnly],
	[rw, j.EncoderOnly],
	[Ug, j.EncoderOnly],
	[jg, j.EncoderOnly],
	[Hg, j.MaskGeneration],
	[Qg, j.EncoderOnly],
	[Xg, j.EncoderOnly],
	[Fg, j.Seq2Seq],
	[Lg, j.EncoderOnly],
	[Yg, j.EncoderOnly],
	[Jg, j.EncoderOnly],
	[sw, j.EncoderOnly]
];
for (const [e, t] of nw) for (const r of e.values()) {
	ar.set(r, t);
	const s = Qi[r];
	cs.set(s, r), qi.set(r, s);
}
var XO = [
	[
		"MusicgenForConditionalGeneration",
		Km,
		j.Musicgen
	],
	[
		"Phi3VForCausalLM",
		rg,
		j.Phi3V
	],
	[
		"CLIPTextModelWithProjection",
		gm,
		j.EncoderOnly
	],
	[
		"SiglipTextModel",
		dg,
		j.EncoderOnly
	],
	[
		"JinaCLIPTextModel",
		$m,
		j.EncoderOnly
	],
	[
		"ClapTextModelWithProjection",
		pm,
		j.EncoderOnly
	],
	[
		"ClapAudioModelWithProjection",
		mm,
		j.EncoderOnly
	],
	[
		"DacEncoderModel",
		ym,
		j.EncoderOnly
	],
	[
		"DacDecoderModel",
		bm,
		j.EncoderOnly
	],
	[
		"MimiEncoderModel",
		Xm,
		j.EncoderOnly
	],
	[
		"MimiDecoderModel",
		Ym,
		j.EncoderOnly
	],
	[
		"SnacEncoderModel",
		hg,
		j.EncoderOnly
	],
	[
		"SnacDecoderModel",
		fg,
		j.EncoderOnly
	],
	[
		"Gemma3nForConditionalGeneration",
		wa,
		j.ImageAudioTextToText
	],
	[
		"Gemma4ForConditionalGeneration",
		El,
		j.ImageAudioTextToText
	],
	[
		"SupertonicForConditionalGeneration",
		mg,
		j.Supertonic
	],
	[
		"ChatterboxModel",
		hm,
		j.Chatterbox
	],
	[
		"VoxtralRealtimeForConditionalGeneration",
		Tg,
		j.VoxtralRealtime
	]
];
for (const [e, t, r] of XO) ar.set(e, r), cs.set(t, e), qi.set(e, t);
var aw = /* @__PURE__ */ new Map([
	["modnet", ns],
	["birefnet", ns],
	["isnet", ns],
	["ben", ns]
]);
for (const [e, t] of aw.entries()) t.set(e, "PreTrainedModel"), ar.set(e, j.EncoderOnly), qi.set(e, S);
var YO = new Set(aw.keys());
ar.set("PreTrainedModel", j.EncoderOnly);
cs.set(S, "PreTrainedModel");
var Ae = {
	MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES: Ig,
	MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES: Og,
	MODEL_FOR_TEXT_TO_SPECTROGRAM_MAPPING_NAMES: Fg,
	MODEL_FOR_TEXT_TO_WAVEFORM_MAPPING_NAMES: Lg,
	MODEL_FOR_MASKED_LM_MAPPING_NAMES: zg,
	MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES: Bg,
	MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES: Vg,
	MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES: ns,
	MODEL_FOR_SEMANTIC_SEGMENTATION_MAPPING_NAMES: qg,
	MODEL_FOR_UNIVERSAL_SEGMENTATION_MAPPING_NAMES: Wg,
	MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES: Ug,
	MODEL_FOR_ZERO_SHOT_OBJECT_DETECTION_MAPPING_NAMES: jg,
	MODEL_FOR_MASK_GENERATION_MAPPING_NAMES: Hg,
	MODEL_FOR_CTC_MAPPING_NAMES: Qg,
	MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES: Xg,
	MODEL_FOR_AUDIO_XVECTOR_MAPPING_NAMES: Yg,
	MODEL_FOR_AUDIO_FRAME_CLASSIFICATION_MAPPING_NAMES: Jg,
	MODEL_FOR_DOCUMENT_QUESTION_ANSWERING_MAPPING_NAMES: HO,
	MODEL_FOR_IMAGE_MATTING_MAPPING_NAMES: Kg,
	MODEL_FOR_IMAGE_TO_IMAGE_MAPPING_NAMES: Zg,
	MODEL_FOR_DEPTH_ESTIMATION_MAPPING_NAMES: ew,
	MODEL_FOR_NORMAL_ESTIMATION_MAPPING_NAMES: tw,
	MODEL_FOR_POSE_ESTIMATION_MAPPING_NAMES: rw,
	MODEL_FOR_IMAGE_FEATURE_EXTRACTION_MAPPING_NAMES: sw,
	MODEL_FOR_IMAGE_TEXT_TO_TEXT_MAPPING_NAMES: Gg,
	MODEL_FOR_AUDIO_TEXT_TO_TEXT_MAPPING_NAMES: $g,
	MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES: Ng,
	MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES: Pg,
	MODEL_FOR_CAUSAL_LM_MAPPING_NAMES: Dg,
	MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES: Rg
};
K2(Ae);
var Ce = class {
	static MODEL_CLASS_MAPPINGS = null;
	static BASE_IF_FAIL = !1;
	static supports(e) {
		if (!this.MODEL_CLASS_MAPPINGS) return !1;
		for (const t of this.MODEL_CLASS_MAPPINGS) if (t.has(e)) return !0;
		return this.BASE_IF_FAIL;
	}
	static async from_pretrained(e, { progress_callback: t = null, config: r = null, cache_dir: s = null, local_files_only: n = !1, revision: a = "main", model_file_name: o = null, subfolder: i = "onnx", device: l = null, dtype: c = null, use_external_data_format: d = null, session_options: h = {} } = {}) {
		const _ = {
			progress_callback: t,
			config: r,
			cache_dir: s,
			local_files_only: n,
			revision: a,
			model_file_name: o,
			subfolder: i,
			device: l,
			dtype: c,
			use_external_data_format: d,
			session_options: h
		};
		if (_.config = await Zs.from_pretrained(e, _), !this.MODEL_CLASS_MAPPINGS) throw new Error("`MODEL_CLASS_MAPPINGS` not implemented for this type of `AutoClass`: " + this.name);
		const { model_type: m } = _.config;
		for (const v of this.MODEL_CLASS_MAPPINGS) {
			let w = v.get(m);
			if (!w) {
				for (const b of v.values()) if (b[0] === m) {
					w = b;
					break;
				}
				if (!w) continue;
			}
			return await Qi[w].from_pretrained(e, _);
		}
		if (this.BASE_IF_FAIL) return YO.has(m) || oe.warn(`Unknown model class "${m}", attempting to construct from base class.`), await S.from_pretrained(e, _);
		throw Error(`Unsupported model type: ${m}`);
	}
}, Ws = class extends Ce {
	static MODEL_CLASS_MAPPINGS = nw.map((e) => e[0]);
	static BASE_IF_FAIL = !0;
}, Cf = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES];
}, JO = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES];
}, $o = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES];
}, KO = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES];
}, ZO = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_TEXT_TO_SPECTROGRAM_MAPPING_NAMES];
}, eN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_TEXT_TO_WAVEFORM_MAPPING_NAMES];
}, tN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_CAUSAL_LM_MAPPING_NAMES];
}, rN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_MASKED_LM_MAPPING_NAMES];
}, sN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES];
}, nN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES];
}, aN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES];
}, Sf = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES];
}, Pf = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_SEMANTIC_SEGMENTATION_MAPPING_NAMES];
}, Ff = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_UNIVERSAL_SEGMENTATION_MAPPING_NAMES];
}, oN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES];
}, iN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_ZERO_SHOT_OBJECT_DETECTION_MAPPING_NAMES];
};
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_MASK_GENERATION_MAPPING_NAMES];
});
var lN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_CTC_MAPPING_NAMES];
}, cN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES];
};
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_AUDIO_XVECTOR_MAPPING_NAMES];
});
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_AUDIO_FRAME_CLASSIFICATION_MAPPING_NAMES];
});
var uN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_DOCUMENT_QUESTION_ANSWERING_MAPPING_NAMES];
};
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_MATTING_MAPPING_NAMES];
});
var dN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_TO_IMAGE_MAPPING_NAMES];
}, hN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_DEPTH_ESTIMATION_MAPPING_NAMES];
};
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_NORMAL_ESTIMATION_MAPPING_NAMES];
});
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_POSE_ESTIMATION_MAPPING_NAMES];
});
var fN = class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_FEATURE_EXTRACTION_MAPPING_NAMES];
};
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_IMAGE_TEXT_TO_TEXT_MAPPING_NAMES];
});
(class extends Ce {
	static MODEL_CLASS_MAPPINGS = [Ae.MODEL_FOR_AUDIO_TEXT_TO_TEXT_MAPPING_NAMES];
});
async function Gt(e) {
	return Array.isArray(e) || (e = [e]), await Promise.all(e.map((t) => Nt.read(t)));
}
async function as(e, t) {
	return Array.isArray(e) || (e = [e]), await Promise.all(e.map((r) => typeof r == "string" || r instanceof URL ? dT(r, t) : r instanceof Float64Array ? new Float32Array(r) : r));
}
function ai(e, t) {
	t && (e = e.map((o) => o | 0));
	const [r, s, n, a] = e;
	return {
		xmin: r,
		ymin: s,
		xmax: n,
		ymax: a
	};
}
var Ge = class extends _t {
	constructor({ task: e, model: t, tokenizer: r = null, processor: s = null }) {
		super(), this.task = e, this.model = t, this.tokenizer = r, this.processor = s;
	}
	async dispose() {
		await this.model.dispose();
	}
}, _N = class extends Ge {
	async _call(e, { top_k: t = 1 } = {}) {
		const r = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), s = await this.model(r), { problem_type: n, id2label: a } = this.model.config, o = n === "multi_label_classification" ? (l) => l.sigmoid() : (l) => new V("float32", rt(l.data), l.dims), i = [];
		for (const l of s.logits) {
			const c = await _s(o(l), t), d = c[0].tolist(), h = c[1].tolist().map((_, m) => ({
				label: a ? a[_] : `LABEL_${_}`,
				score: d[m]
			}));
			t === 1 ? i.push(...h) : i.push(h);
		}
		return Array.isArray(e) || t === 1 ? i : i[0];
	}
}, pN = class extends Ge {
	async _call(e, { ignore_labels: t = ["O"], aggregation_strategy: r = "none" } = {}) {
		if (r !== "none" && r !== "simple") throw new Error(`Invalid aggregation_strategy: "${r}". Must be one of "none" or "simple".`);
		const s = Array.isArray(e), n = this.tokenizer(s ? e : [e], {
			padding: !0,
			truncation: !0
		}), a = (await this.model(n)).logits, o = this.model.config.id2label, i = [];
		for (let l = 0; l < a.dims[0]; ++l) {
			const c = n.input_ids[l].tolist(), d = a[l], h = [];
			for (let _ = 0; _ < d.dims[0]; ++_) {
				const m = d[_], v = $e(m.data)[1], w = o ? o[v] : `LABEL_${v}`;
				if (t.includes(w)) continue;
				const b = this.tokenizer.decode([c[_]], { skip_special_tokens: !0 });
				if (b === "") continue;
				const M = rt(m.data);
				h.push({
					entity: w,
					score: M[v],
					index: _,
					word: b
				});
			}
			i.push(r === "simple" ? gN(h, c, this.tokenizer) : h);
		}
		return s ? i : i[0];
	}
};
function mN(e) {
	const t = e[0];
	return e[1] === "-" && (t === "B" || t === "I" || t === "E" || t === "S") ? [t, e.slice(2)] : ["I", e];
}
function gN(e, t, r) {
	const s = [];
	let n = null;
	for (let a = 0; a < e.length; ++a) {
		const [o, i] = mN(e[a].entity);
		n === i && o !== "B" && o !== "S" ? (s[s.length - 1].end = a + 1, o === "E" && (n = null)) : (s.push({
			tag: i,
			start: a,
			end: a + 1
		}), n = o === "S" ? null : i);
	}
	return s.map(({ tag: a, start: o, end: i }) => {
		let l = 0;
		const c = [];
		for (let d = o; d < i; ++d) l += e[d].score, c.push(t[e[d].index]);
		return {
			entity_group: a,
			score: l / (i - o),
			word: r.decode(c, { skip_special_tokens: !0 })
		};
	});
}
var wN = class extends Ge {
	async _call(e, t, { top_k: r = 1 } = {}) {
		const s = this.tokenizer(e, {
			text_pair: t,
			padding: !0,
			truncation: !0
		}), n = Array.isArray(e), { start_logits: a, end_logits: o } = await this.model(s), i = s.input_ids.tolist(), l = s.attention_mask.tolist(), { all_special_ids: c, sep_token_id: d } = this.tokenizer, h = [];
		for (let _ = 0; _ < a.dims[0]; ++_) {
			const m = i[_], v = m.findIndex((C) => C == d), w = a[_].tolist(), b = o[_].tolist();
			for (let C = 1; C < w.length; ++C) (l[_] == 0 || C <= v || c.findIndex((O) => O == m[C]) !== -1) && (w[C] = -Infinity, b[C] = -Infinity);
			const M = rt(w).map((C, O) => [C, O]), E = rt(b).map((C, O) => [C, O]);
			M[0][0] = 0, E[0][0] = 0;
			const A = fb(M, E).filter((C) => C[0][1] <= C[1][1]).map((C) => [
				C[0][1],
				C[1][1],
				C[0][0] * C[1][0]
			]).sort((C, O) => O[2] - C[2]), k = [];
			for (let C = 0; C < Math.min(A.length, r); ++C) {
				const [O, x, q] = A[C], R = m.slice(O, x + 1), G = this.tokenizer.decode(R, { skip_special_tokens: !0 });
				k.push({
					answer: G,
					score: q
				});
			}
			r === 1 ? h.push(...k) : h.push(k);
		}
		return n ? h : h[0];
	}
}, vN = class extends Ge {
	async _call(e, { top_k: t = 5 } = {}) {
		const { mask_token_id: r, mask_token: s } = this.tokenizer, n = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), { logits: a } = await this.model(n), o = [], i = n.input_ids.tolist();
		for (let l = 0; l < i.length; ++l) {
			const c = i[l], d = c.findIndex((w) => w == r);
			if (d === -1) throw Error(`Mask token (${s}) not found in text.`);
			const h = a[l][d], _ = await _s(new V("float32", rt(h.data), h.dims), t), m = _[0].tolist(), v = _[1].tolist();
			o.push(v.map((w, b) => {
				const M = c.slice();
				return M[d] = w, {
					score: m[b],
					token: Number(w),
					token_str: this.tokenizer.decode([w]),
					sequence: this.tokenizer.decode(M, { skip_special_tokens: !0 })
				};
			}));
		}
		return Array.isArray(e) ? o : o[0];
	}
}, Jc = class extends Ge {
	_default_generation_config = { max_new_tokens: 256 };
	_key = "generated_text";
	async _call(e, t = {}) {
		Array.isArray(e) || (e = [e]), this.model.config.prefix && (e = e.map((i) => this.model.config.prefix + i));
		const r = this.model.config.task_specific_params;
		r && r[this.task] && r[this.task].prefix && (e = e.map((i) => r[this.task].prefix + i));
		const s = this.tokenizer, n = {
			padding: !0,
			truncation: !0
		};
		let a;
		this.task === "translation" && "_build_translation_inputs" in s ? a = s._build_translation_inputs(e, n, t) : a = s(e, n);
		const o = await this.model.generate({
			...a,
			...this._default_generation_config,
			...t
		});
		return s.batch_decode(o, { skip_special_tokens: !0 }).map((i) => ({ [this._key]: i }));
	}
}, yN = class extends Jc {
	_key = "summary_text";
}, bN = class extends Jc {
	_key = "translation_text";
};
function Lf(e) {
	return Array.isArray(e) && e.every((t) => "role" in t && "content" in t);
}
var MN = class extends Ge {
	_default_generation_config = { max_new_tokens: 256 };
	async _call(e, t = {}) {
		const { add_special_tokens: r, return_full_text: s, tools: n, documents: a, chat_template: o, tokenizer_encode_kwargs: i, ...l } = t;
		let c = !1, d = !1, h = r ?? (this.tokenizer.add_bos_token || this.tokenizer.add_eos_token) ?? !1, _ = i, m;
		if (typeof e == "string") m = e = [e];
		else if (Array.isArray(e) && e.every((k) => typeof k == "string")) c = !0, m = e;
		else {
			if (Lf(e)) e = [e];
			else if (Array.isArray(e) && e.every(Lf)) c = !0;
			else throw new Error("Input must be a string, an array of strings, a Chat, or an array of Chats");
			d = !0;
			const k = {
				tokenize: !1,
				add_generation_prompt: !0,
				...Ke({
					tools: n,
					documents: a,
					chat_template: o
				}, [
					"tools",
					"documents",
					"chat_template"
				]),
				..._
			};
			m = e.map((C) => this.tokenizer.apply_chat_template(C, k)), h = !1, _ = void 0;
		}
		const v = d ? !1 : s ?? !0;
		this.tokenizer.padding_side = "left";
		const w = this.tokenizer(m, {
			add_special_tokens: h,
			padding: !0,
			truncation: !0,
			..._
		}), b = await this.model.generate({
			...w,
			...this._default_generation_config,
			...l
		}), M = this.tokenizer.batch_decode(b, { skip_special_tokens: !0 });
		let E;
		!v && w.input_ids.dims.at(-1) > 0 && (E = this.tokenizer.batch_decode(w.input_ids, { skip_special_tokens: !0 }).map((k) => k.length));
		const A = Array.from({ length: e.length }, (k) => []);
		for (let k = 0; k < M.length; ++k) {
			const C = Math.floor(k / b.dims[0] * e.length);
			E && (M[k] = M[k].slice(E[C])), A[C].push({ generated_text: d ? [...e[C], {
				role: "assistant",
				content: M[k]
			}] : M[k] });
		}
		return !c && A.length === 1 ? A[0] : A;
	}
}, xN = class extends Ge {
	constructor(e) {
		super(e), this.label2id = Object.fromEntries(Object.entries(this.model.config.label2id).map(([t, r]) => [t.toLowerCase(), r])), this.entailment_id = this.label2id.entailment, this.entailment_id === void 0 && (oe.warn("Could not find 'entailment' in label2id mapping. Using 2 as entailment_id."), this.entailment_id = 2), this.contradiction_id = this.label2id.contradiction ?? this.label2id.not_entailment, this.contradiction_id === void 0 && (oe.warn("Could not find 'contradiction' in label2id mapping. Using 0 as contradiction_id."), this.contradiction_id = 0);
	}
	async _call(e, t, { hypothesis_template: r = "This example is {}.", multi_label: s = !1 } = {}) {
		const n = Array.isArray(e);
		n || (e = [e]), Array.isArray(t) || (t = [t]);
		const a = t.map((l) => r.replace("{}", l)), o = s || t.length === 1, i = [];
		for (const l of e) {
			const c = [];
			for (const h of a) {
				const _ = this.tokenizer(l, {
					text_pair: h,
					padding: !0,
					truncation: !0
				}), m = await this.model(_);
				o ? c.push([m.logits.data[this.contradiction_id], m.logits.data[this.entailment_id]]) : c.push(m.logits.data[this.entailment_id]);
			}
			const d = (o ? c.map((h) => rt(h)[1]) : rt(c)).map((h, _) => [h, _]).sort((h, _) => _[0] - h[0]);
			i.push({
				sequence: l,
				labels: d.map((h) => t[h[1]]),
				scores: d.map((h) => h[0])
			});
		}
		return n ? i : i[0];
	}
}, kN = class extends Ge {
	async _call(e, { top_k: t = 5 } = {}) {
		const r = this.processor.feature_extractor.config.sampling_rate, s = await as(e, r), n = this.model.config.id2label, a = [];
		for (const o of s) {
			const i = await this.processor(o), l = (await this.model(i)).logits[0], c = await _s(new V("float32", rt(l.data), l.dims), t), d = c[0].tolist(), h = c[1].tolist().map((_, m) => ({
				label: n ? n[_] : `LABEL_${_}`,
				score: d[m]
			}));
			a.push(h);
		}
		return Array.isArray(e) ? a : a[0];
	}
}, TN = class extends Ge {
	async _call(e, t, { hypothesis_template: r = "This is a sound of {}." } = {}) {
		const s = !Array.isArray(e);
		s && (e = [e]);
		const n = t.map((c) => r.replace("{}", c)), a = this.tokenizer(n, {
			padding: !0,
			truncation: !0
		}), o = this.processor.feature_extractor.config.sampling_rate, i = await as(e, o), l = [];
		for (const c of i) {
			const d = await this.processor(c), h = rt((await this.model({
				...a,
				...d
			})).logits_per_audio.data);
			l.push([...h].map((_, m) => ({
				score: _,
				label: t[m]
			})));
		}
		return s ? l[0] : l;
	}
}, EN = class extends Ge {
	_default_generation_config = {};
	async _call(e, t = {}) {
		switch (t = {
			...this._default_generation_config,
			...t
		}, this.model.config.model_type) {
			case "whisper":
			case "lite-whisper": return this._call_whisper(e, t);
			case "wav2vec2":
			case "wav2vec2-bert":
			case "unispeech":
			case "unispeech-sat":
			case "hubert":
			case "parakeet_ctc": return this._call_wav2vec2(e, t);
			case "moonshine": return this._call_moonshine(e, t);
			case "cohere_asr": return this._call_cohere_asr(e, t);
			default: throw new Error(`AutomaticSpeechRecognitionPipeline does not support model type '${this.model.config.model_type}'.`);
		}
	}
	async _call_wav2vec2(e, t) {
		t.language && oe.warn("`language` parameter is not yet supported for `wav2vec2` models, defaulting to \"English\"."), t.task && oe.warn("`task` parameter is not yet supported for `wav2vec2` models, defaulting to \"transcribe\".");
		const r = !Array.isArray(e), s = r ? [e] : e, n = this.processor.feature_extractor.config.sampling_rate, a = await as(s, n), o = [];
		for (const i of a) {
			const l = await this.processor(i), c = (await this.model(l)).logits[0], d = [];
			for (const _ of c) d.push($e(_.data)[1]);
			const h = this.tokenizer.decode(d, { skip_special_tokens: !0 }).trim();
			o.push({ text: h });
		}
		return r ? o[0] : o;
	}
	async _call_whisper(e, t) {
		const r = t.return_timestamps ?? !1, s = t.chunk_length_s ?? 0, n = t.force_full_sequences ?? !1;
		let a = t.stride_length_s ?? null;
		const o = { ...t };
		r === "word" && (o.return_token_timestamps = !0, o.return_timestamps = !0);
		const i = !Array.isArray(e), l = i ? [e] : e, c = this.processor.feature_extractor.config, d = c.chunk_length / this.model.config.max_source_positions, h = c.hop_length, _ = c.sampling_rate, m = await as(l, _), v = [];
		for (const w of m) {
			let b = [];
			if (s > 0) {
				if (a === null) a = s / 6;
				else if (s <= a) throw Error("`chunk_length_s` must be larger than `stride_length_s`.");
				const A = _ * s, k = _ * a, C = A - 2 * k;
				let O = 0;
				for (;;) {
					const x = O + A, q = w.subarray(O, x), R = await this.processor(q), G = O === 0, W = x >= w.length;
					if (b.push({
						stride: [
							q.length,
							G ? 0 : k,
							W ? 0 : k
						],
						input_features: R.input_features,
						is_last: W
					}), W) break;
					O += C;
				}
			} else b = [{
				stride: [
					w.length,
					0,
					0
				],
				input_features: (await this.processor(w)).input_features,
				is_last: !0
			}];
			for (const A of b) {
				o.num_frames = Math.floor(A.stride[0] / h);
				const k = await this.model.generate({
					inputs: A.input_features,
					...o
				});
				if (r === "word") {
					const C = k.sequences.tolist()[0], O = k.token_timestamps.tolist()[0], x = this.tokenizer.timestamp_begin, q = Math.max(C.findIndex((R) => Number(R) >= x), 0);
					A.tokens = C.slice(q), A.token_timestamps = O.slice(q).map((R) => qs(R, 2));
				} else A.tokens = k[0].tolist();
				A.stride = A.stride.map((C) => C / _);
			}
			const [M, E] = this.tokenizer._decode_asr(b, {
				time_precision: d,
				return_timestamps: r,
				force_full_sequences: n
			});
			v.push({
				text: M,
				...E
			});
		}
		return i ? v[0] : v;
	}
	async _call_moonshine(e, t) {
		const r = !Array.isArray(e), s = r ? [e] : e, n = this.processor.feature_extractor.config.sampling_rate, a = await as(s, n), o = [];
		for (const i of a) {
			const l = await this.processor(i), c = Math.floor(i.length / n) * 6, d = await this.model.generate({
				max_new_tokens: c,
				...t,
				...l
			}), h = this.processor.batch_decode(d, { skip_special_tokens: !0 })[0];
			o.push({ text: h });
		}
		return r ? o[0] : o;
	}
	async _call_cohere_asr(e, t) {
		const r = !Array.isArray(e), s = r ? [e] : e, n = this.processor.feature_extractor, a = n.config.sampling_rate, o = await as(s, a), i = t.language ?? "en", l = this.processor.get_decoder_prompt_ids(i), c = [];
		for (const d of o) {
			const h = n.split_audio(d), _ = [];
			for (const v of h) {
				const w = await this.processor(v), b = await this.model.generate({
					...w,
					decoder_input_ids: l,
					...t
				}), M = this.tokenizer.decode(b[0].tolist(), { skip_special_tokens: !0 }).trim();
				_.push(M);
			}
			const m = this.processor.constructor.join_chunks(_, i);
			c.push({ text: m });
		}
		return r ? c[0] : c;
	}
}, AN = class extends Ge {
	DEFAULT_VOCODER_ID = "Xenova/speecht5_hifigan";
	constructor(e) {
		super(e), this.vocoder = e.vocoder ?? null;
	}
	async _prepare_speaker_embeddings(e, t) {
		if ((typeof e == "string" || e instanceof URL) && (e = new Float32Array(await (await we.fetch(e)).arrayBuffer())), e instanceof Float32Array) e = new V("float32", e, [e.length]);
		else if (!(e instanceof V)) throw new Error("Speaker embeddings must be a `Tensor`, `Float32Array`, `string`, or `URL`.");
		if (t > 1) {
			if (e.dims[0] === 1) e = e.repeat(t, 1);
			else if (e.dims[0] !== t) throw new Error(`Expected speaker embeddings batch size to be 1 or ${t}, but got ${e.dims[0]}.`);
		}
		return e;
	}
	_postprocess_waveform(e, t, r, s = null) {
		const n = t.data, [a, o] = t.dims, i = s ? s.data : null, l = [];
		for (let c = 0; c < a; ++c) {
			const d = i ? Math.min(Math.ceil(i[c]), o) : o, h = c * o;
			l.push(new bT(n.slice(h, h + d), r));
		}
		return Array.isArray(e) ? l : l[0];
	}
	async _call(e, t) {
		return this.processor ? this._call_text_to_spectrogram(e, t) : this.model.config.model_type === "supertonic" ? this._call_supertonic(e, t) : this._call_text_to_waveform(e);
	}
	async _call_supertonic(e, { speaker_embeddings: t, num_inference_steps: r, speed: s }) {
		if (!t) throw new Error("Speaker embeddings must be provided for Supertonic models.");
		const { sampling_rate: n, style_dim: a } = this.model.config, o = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), i = o.input_ids.dims[0];
		t = await this._prepare_speaker_embeddings(t, i), t = t.view(i, -1, a);
		const { waveform: l, durations: c } = await this.model.generate_speech({
			...o,
			style: t,
			num_inference_steps: r,
			speed: s
		});
		return this._postprocess_waveform(e, l, n, c);
	}
	async _call_text_to_waveform(e) {
		const t = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), { waveform: r } = await this.model(t), s = this.model.config.sampling_rate;
		return this._postprocess_waveform(e, r, s);
	}
	async _call_text_to_spectrogram(e, { speaker_embeddings: t }) {
		this.vocoder || (oe.info("No vocoder specified, using default HifiGan vocoder."), this.vocoder = await Ws.from_pretrained(this.DEFAULT_VOCODER_ID, { dtype: "fp32" }));
		const { input_ids: r } = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), s = r.dims[0];
		t = await this._prepare_speaker_embeddings(t, s), t = t.view(s, -1);
		const { waveform: n } = await this.model.generate_speech(r, t, { vocoder: this.vocoder }), a = this.processor.feature_extractor.config.sampling_rate;
		return this._postprocess_waveform(e, n, a);
	}
}, CN = class extends Ge {
	async _call(e, t = {}) {
		const r = Array.isArray(e), s = await Gt(e), { pixel_values: n } = await this.processor(s), a = [];
		for (const o of n) {
			o.dims = [1, ...o.dims];
			const i = await this.model.generate({
				inputs: o,
				...t
			}), l = this.tokenizer.batch_decode(i, { skip_special_tokens: !0 }).map((c) => ({ generated_text: c.trim() }));
			a.push(l);
		}
		return r ? a : a[0];
	}
}, SN = class extends Ge {
	async _call(e, { top_k: t = 5 } = {}) {
		const r = await Gt(e), { pixel_values: s } = await this.processor(r), n = await this.model({ pixel_values: s }), { id2label: a } = this.model.config, o = [];
		for (const i of n.logits) {
			const l = await _s(new V("float32", rt(i.data), i.dims), t), c = l[0].tolist(), d = l[1].tolist().map((h, _) => ({
				label: a ? a[h] : `LABEL_${h}`,
				score: c[_]
			}));
			o.push(d);
		}
		return Array.isArray(e) ? o : o[0];
	}
}, If = {
	panoptic: "post_process_panoptic_segmentation",
	instance: "post_process_instance_segmentation",
	semantic: "post_process_semantic_segmentation"
}, ow = class extends Ge {
	async _call(e, { threshold: t = .5, mask_threshold: r = .5, overlap_mask_area_threshold: s = .8, label_ids_to_fuse: n = null, target_sizes: a = null, subtask: o = null } = {}) {
		if (Array.isArray(e) && e.length !== 1) throw Error("Image segmentation pipeline currently only supports a batch size of 1.");
		const i = await Gt(e), l = i.map((b) => [b.height, b.width]), c = await this.processor(i), { inputNames: d, outputNames: h } = this.model.sessions.model;
		if (!d.includes("pixel_values")) {
			if (d.length !== 1) throw Error(`Expected a single input name, but got ${d.length} inputs: ${d}.`);
			const b = d[0];
			if (b in c) throw Error(`Input name ${b} already exists in the inputs.`);
			c[b] = c.pixel_values;
		}
		const _ = await this.model(c);
		let m = null;
		if (o !== null) m = If[o];
		else if (this.processor.image_processor) {
			for (const [b, M] of Object.entries(If)) if (M in this.processor.image_processor) {
				m = this.processor.image_processor[M].bind(this.processor.image_processor), o = b;
				break;
			}
		}
		const v = this.model.config.id2label, w = [];
		if (o) if (o === "panoptic" || o === "instance") {
			const b = m(_, t, r, s, n, a ?? l)[0], M = b.segmentation;
			for (const E of b.segments_info) {
				const A = new Uint8ClampedArray(M.data.length);
				for (let C = 0; C < M.data.length; ++C) M.data[C] === E.id && (A[C] = 255);
				const k = new Nt(A, M.dims[1], M.dims[0], 1);
				w.push({
					score: E.score,
					label: v[E.label_id],
					mask: k
				});
			}
		} else if (o === "semantic") {
			const { segmentation: b, labels: M } = m(_, a ?? l)[0];
			for (const E of M) {
				const A = new Uint8ClampedArray(b.data.length);
				for (let C = 0; C < b.data.length; ++C) b.data[C] === E && (A[C] = 255);
				const k = new Nt(A, b.dims[1], b.dims[0], 1);
				w.push({
					score: null,
					label: v[E],
					mask: k
				});
			}
		} else throw Error(`Subtask ${o} not supported.`);
		else {
			const b = _[h[0]];
			for (let M = 0; M < l.length; ++M) {
				const E = l[M], A = b[M];
				A.data.some((C) => C < -1e-5 || C > 1.00001) && A.sigmoid_();
				const k = await Nt.fromTensor(A.mul_(255).to("uint8")).resize(E[1], E[0]);
				w.push({
					label: null,
					score: null,
					mask: k
				});
			}
		}
		return w;
	}
}, PN = class extends ow {
	async _call(e, t = {}) {
		const r = await Gt(e), s = await super._call(e, t), n = r.map((a, o) => {
			const i = a.clone();
			return i.putAlpha(s[o].mask), i;
		});
		return Array.isArray(e) ? n : n[0];
	}
}, FN = class extends Ge {
	async _call(e, t, { hypothesis_template: r = "This is a photo of {}" } = {}) {
		const s = Array.isArray(e), n = await Gt(e), a = t.map((h) => r.replace("{}", h)), o = this.tokenizer(a, {
			padding: this.model.config.model_type === "siglip" ? "max_length" : !0,
			truncation: !0
		}), { pixel_values: i } = await this.processor(n), l = await this.model({
			...o,
			pixel_values: i
		}), c = this.model.config.model_type === "siglip" ? (h) => h.sigmoid().data : (h) => rt(h.data), d = [];
		for (const h of l.logits_per_image) {
			const _ = [...c(h)].map((m, v) => ({
				score: m,
				label: t[v]
			}));
			_.sort((m, v) => v.score - m.score), d.push(_);
		}
		return s ? d : d[0];
	}
}, LN = class extends Ge {
	async _call(e, { threshold: t = .9, percentage: r = !1 } = {}) {
		const s = Array.isArray(e);
		if (s && e.length !== 1) throw Error("Object detection pipeline currently only supports a batch size of 1.");
		const n = await Gt(e), a = r ? null : n.map((_) => [_.height, _.width]), { pixel_values: o, pixel_mask: i } = await this.processor(n), l = await this.model({
			pixel_values: o,
			pixel_mask: i
		}), c = this.processor.image_processor.post_process_object_detection(l, t, a), { id2label: d } = this.model.config, h = c.map((_) => _.boxes.map((m, v) => ({
			score: _.scores[v],
			label: d[_.classes[v]],
			box: ai(m, !r)
		})));
		return s ? h : h[0];
	}
}, IN = class extends Ge {
	async _call(e, t, { threshold: r = .1, top_k: s = null, percentage: n = !1 } = {}) {
		const a = Array.isArray(e), o = await Gt(e), i = this.tokenizer(t, {
			padding: !0,
			truncation: !0
		}), l = await this.processor(o), c = [];
		for (let d = 0; d < o.length; ++d) {
			const h = o[d], _ = n ? null : [[h.height, h.width]], m = l.pixel_values[d].unsqueeze_(0), v = await this.model({
				...i,
				pixel_values: m
			});
			let w;
			if ("post_process_grounded_object_detection" in this.processor) {
				const b = this.processor.post_process_grounded_object_detection(v, i.input_ids, {
					box_threshold: r,
					text_threshold: r,
					target_sizes: _
				})[0];
				w = b.boxes.map((M, E) => ({
					score: b.scores[E],
					label: b.labels[E],
					box: ai(M, !n)
				}));
			} else {
				const b = this.processor.image_processor.post_process_object_detection(v, r, _, !0)[0];
				w = b.boxes.map((M, E) => ({
					score: b.scores[E],
					label: t[b.classes[E]],
					box: ai(M, !n)
				}));
			}
			w.sort((b, M) => M.score - b.score), s !== null && (w = w.slice(0, s)), c.push(w);
		}
		return a ? c : c[0];
	}
}, ON = class extends Ge {
	_default_generation_config = { max_new_tokens: 256 };
	async _call(e, t, r = {}) {
		if (Array.isArray(e)) {
			if (e.length !== 1) throw Error("Document Question Answering pipeline currently only supports a batch size of 1.");
			e = e[0];
		}
		const s = (await Gt(e))[0], { pixel_values: n } = await this.processor(s), a = `<s_docvqa><s_question>${t}</s_question><s_answer>`, o = this.tokenizer(a, {
			add_special_tokens: !1,
			padding: !0,
			truncation: !0
		}).input_ids, i = await this.model.generate({
			inputs: n,
			max_length: this.model.config.decoder.max_position_embeddings,
			decoder_input_ids: o,
			...this._default_generation_config,
			...r
		}), l = this.tokenizer.batch_decode(i)[0].match(/<s_answer>(.*?)<\/s_answer>/);
		let c = null;
		return l && l.length >= 2 && (c = l[1].trim()), [{ answer: c }];
	}
}, NN = class extends Ge {
	async _call(e) {
		const t = await Gt(e), r = await this.processor(t), s = await this.model(r), n = [];
		for (const a of s.reconstruction) {
			const o = a.squeeze().clamp_(0, 1).mul_(255).round_().to("uint8");
			n.push(Nt.fromTensor(o));
		}
		return Array.isArray(e) ? n : n[0];
	}
}, DN = class extends Ge {
	async _call(e) {
		const t = await Gt(e), r = await this.processor(t), { predicted_depth: s } = await this.model(r), n = [];
		for (let a = 0; a < t.length; ++a) {
			const o = s[a], [i, l] = o.dims.slice(-2), [c, d] = t[a].size, h = (await Ot(o.view(1, 1, i, l), {
				size: [d, c],
				mode: "bilinear"
			})).view(d, c), _ = h.min().item(), m = h.max().item(), v = h.sub(_).div_(m - _).mul_(255).to("uint8").unsqueeze(0), w = Nt.fromTensor(v);
			n.push({
				predicted_depth: h,
				depth: w
			});
		}
		return Array.isArray(e) ? n : n[0];
	}
}, zN = class extends Ge {
	async _call(e, { pooling: t = "none", normalize: r = !1, quantize: s = !1, precision: n = "binary" } = {}) {
		const a = this.tokenizer(e, {
			padding: !0,
			truncation: !0
		}), o = await this.model(a);
		let i = o.last_hidden_state ?? o.logits ?? o.token_embeddings;
		switch (t) {
			case "none": break;
			case "mean":
				i = nk(i, a.attention_mask);
				break;
			case "first_token":
			case "cls":
				i = i.slice(null, 0);
				break;
			case "last_token":
			case "eos":
				i = i.slice(null, -1);
				break;
			default: throw Error(`Pooling method '${t}' not supported.`);
		}
		return r && (i = i.normalize(2, -1)), s && (i = ik(i, n)), i;
	}
}, BN = class extends Ge {
	async _call(e, { pool: t = null } = {}) {
		const r = await Gt(e), { pixel_values: s } = await this.processor(r), n = await this.model({ pixel_values: s });
		let a;
		if (t) {
			if (!("pooler_output" in n)) throw Error("No pooled output was returned. Make sure the model has a 'pooler' layer when using the 'pool' option.");
			a = n.pooler_output;
		} else a = n.last_hidden_state ?? n.logits ?? n.image_embeds;
		return a;
	}
}, sa = Object.freeze({
	"text-classification": {
		pipeline: _N,
		model: Cf,
		default: { model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english" },
		type: "text"
	},
	"token-classification": {
		pipeline: pN,
		model: JO,
		default: { model: "Xenova/bert-base-multilingual-cased-ner-hrl" },
		type: "text"
	},
	"question-answering": {
		pipeline: wN,
		model: sN,
		default: { model: "Xenova/distilbert-base-cased-distilled-squad" },
		type: "text"
	},
	"fill-mask": {
		pipeline: vN,
		model: rN,
		default: {
			model: "onnx-community/ettin-encoder-32m-ONNX",
			dtype: "fp32"
		},
		type: "text"
	},
	summarization: {
		pipeline: yN,
		model: $o,
		default: { model: "Xenova/distilbart-cnn-6-6" },
		type: "text"
	},
	translation: {
		pipeline: bN,
		model: $o,
		default: { model: "Xenova/t5-small" },
		type: "text"
	},
	"text2text-generation": {
		pipeline: Jc,
		model: $o,
		default: { model: "Xenova/flan-t5-small" },
		type: "text"
	},
	"text-generation": {
		pipeline: MN,
		model: tN,
		default: {
			model: "onnx-community/Qwen3-0.6B-ONNX",
			dtype: "q4"
		},
		type: "text"
	},
	"zero-shot-classification": {
		pipeline: xN,
		model: Cf,
		default: { model: "Xenova/distilbert-base-uncased-mnli" },
		type: "text"
	},
	"audio-classification": {
		pipeline: kN,
		model: cN,
		default: { model: "Xenova/wav2vec2-base-superb-ks" },
		type: "audio"
	},
	"zero-shot-audio-classification": {
		pipeline: TN,
		model: Ws,
		default: { model: "Xenova/clap-htsat-unfused" },
		type: "multimodal"
	},
	"automatic-speech-recognition": {
		pipeline: EN,
		model: [KO, lN],
		default: { model: "Xenova/whisper-tiny.en" },
		type: "multimodal"
	},
	"text-to-audio": {
		pipeline: AN,
		model: [eN, ZO],
		default: {
			model: "onnx-community/Supertonic-TTS-ONNX",
			dtype: "fp32"
		},
		type: "text"
	},
	"image-to-text": {
		pipeline: CN,
		model: nN,
		default: { model: "Xenova/vit-gpt2-image-captioning" },
		type: "multimodal"
	},
	"image-classification": {
		pipeline: SN,
		model: aN,
		default: { model: "Xenova/vit-base-patch16-224" },
		type: "multimodal"
	},
	"image-segmentation": {
		pipeline: ow,
		model: [
			Sf,
			Pf,
			Ff
		],
		default: { model: "Xenova/detr-resnet-50-panoptic" },
		type: "multimodal"
	},
	"background-removal": {
		pipeline: PN,
		model: [
			Sf,
			Pf,
			Ff
		],
		default: { model: "Xenova/modnet" },
		type: "image"
	},
	"zero-shot-image-classification": {
		pipeline: FN,
		model: Ws,
		default: { model: "Xenova/clip-vit-base-patch32" },
		type: "multimodal"
	},
	"object-detection": {
		pipeline: LN,
		model: oN,
		default: { model: "Xenova/detr-resnet-50" },
		type: "multimodal"
	},
	"zero-shot-object-detection": {
		pipeline: IN,
		model: iN,
		default: { model: "Xenova/owlvit-base-patch32" },
		type: "multimodal"
	},
	"document-question-answering": {
		pipeline: ON,
		model: uN,
		default: { model: "Xenova/donut-base-finetuned-docvqa" },
		type: "multimodal"
	},
	"image-to-image": {
		pipeline: NN,
		model: dN,
		default: { model: "Xenova/swin2SR-classical-sr-x2-64" },
		type: "image"
	},
	"depth-estimation": {
		pipeline: DN,
		model: hN,
		default: { model: "onnx-community/depth-anything-v2-small" },
		type: "image"
	},
	"feature-extraction": {
		pipeline: zN,
		model: Ws,
		default: {
			model: "onnx-community/all-MiniLM-L6-v2-ONNX",
			dtype: "fp32"
		},
		type: "text"
	},
	"image-feature-extraction": {
		pipeline: BN,
		model: [fN, Ws],
		default: {
			model: "onnx-community/dinov3-vits16-pretrain-lvd1689m-ONNX",
			dtype: "fp32"
		},
		type: "image"
	}
}), iw = Object.freeze({
	"sentiment-analysis": "text-classification",
	ner: "token-classification",
	asr: "automatic-speech-recognition",
	"text-to-speech": "text-to-audio",
	embeddings: "feature-extraction"
});
async function RN(e) {
	if (!e) throw new Error("modelId is required");
	return (await sn(e, Ks, {})).exists ? [Ks] : [];
}
async function GN(e, { config: t = null, dtype: r = null, device: s = null, model_file_name: n = null, include_tokenizer: a = !0, include_processor: o = !0 } = {}) {
	const i = await nm(e, {
		config: t,
		dtype: r,
		device: s,
		model_file_name: n
	});
	if (a) {
		const l = await cp(e);
		i.push(...l);
	}
	if (o) {
		const l = await RN(e);
		i.push(...l);
	}
	return i;
}
async function $N(e, t, r = {}) {
	e = iw[e] ?? e;
	const s = sa[e];
	if (!s) throw new Error(`Unsupported pipeline task: ${e}. Must be one of [${Object.keys(sa).join(", ")}]`);
	const { type: n } = s, i = await GN(t, {
		...r,
		include_tokenizer: n !== "audio" && n !== "image",
		include_processor: n !== "text"
	});
	if (e === "text-generation") {
		const l = Y2(rm(await sm(t, r)));
		if (l) {
			const c = Object.values(l).map((d) => `onnx/${d}`);
			return i.filter((d) => !d.startsWith("onnx/") || c.some((h) => d.startsWith(h)));
		}
	}
	return i;
}
async function ZN(e, t = null, { progress_callback: r = null, config: s = null, cache_dir: n = null, local_files_only: a = !1, revision: o = "main", device: i = null, dtype: l = null, subfolder: c = "onnx", use_external_data_format: d = null, model_file_name: h = null, session_options: _ = {} } = {}) {
	e = iw[e] ?? e;
	const m = sa[e.split("_", 1)[0]];
	if (!m) throw Error(`Unsupported pipeline: ${e}. Must be one of [${Object.keys(sa)}]`);
	t || (t = m.default.model, oe.info(`No model specified. Using default model: "${t}".`), !l && m.default.dtype && (l = m.default.dtype));
	const v = await $N(e, t, {
		device: i,
		dtype: l
	});
	let w = {};
	r && (await Promise.all(v.map(async (G) => sn(t, G)))).forEach((G, W) => {
		G.exists && (w[v[W]] = {
			loaded: 0,
			total: G.size ?? 0
		});
	});
	const b = {
		progress_callback: r ? new Ho(r, w) : void 0,
		config: s,
		cache_dir: n,
		local_files_only: a,
		revision: o,
		device: i,
		dtype: l,
		subfolder: c,
		use_external_data_format: d,
		model_file_name: h,
		session_options: _
	}, M = v.includes("tokenizer.json"), E = v.includes("preprocessor_config.json"), A = m.model;
	let k;
	if (Array.isArray(A)) {
		const G = s ?? await Zs.from_pretrained(t, b), { model_type: W } = G, H = A.find((D) => D.supports(W));
		if (!H) throw Error(`Unsupported model type "${W}" for task "${e}". None of the candidate model classes support this type.`);
		k = H.from_pretrained(t, {
			...b,
			config: G
		});
	} else k = A.from_pretrained(t, b);
	const [C, O, x] = await Promise.all([
		M ? Te.from_pretrained(t, b) : null,
		E ? x2.from_pretrained(t, b) : null,
		k
	]), q = {
		task: e,
		model: x
	};
	C && (q.tokenizer = C), O && (q.processor = O), yr(r, {
		status: "ready",
		task: e,
		model: t
	});
	const R = m.pipeline;
	return new R(q);
}
var VN = (e) => e >= 19968 && e <= 40959 || e >= 13312 && e <= 19903 || e >= 131072 && e <= 173791 || e >= 173824 && e <= 177983 || e >= 177984 && e <= 178207 || e >= 178208 && e <= 183983 || e >= 63744 && e <= 64255 || e >= 194560 && e <= 195103, UN = class {
	put(e) {
		throw Error("Not implemented");
	}
	end() {
		throw Error("Not implemented");
	}
}, Of = ce.IS_PROCESS_AVAILABLE ? (e) => process.stdout.write(e) : (e) => console.log(e), e3 = class extends UN {
	constructor(e, { skip_prompt: t = !1, callback_function: r = null, token_callback_function: s = null, skip_special_tokens: n = !0, decode_kwargs: a = {}, ...o } = {}) {
		super(), this.tokenizer = e, this.skip_prompt = t, this.callback_function = r ?? Of, this.token_callback_function = s, this.decode_kwargs = {
			skip_special_tokens: n,
			...a,
			...o
		}, this.token_cache = [], this.print_len = 0, this.next_tokens_are_prompt = !0, this.special_ids = new Set(this.tokenizer.all_special_ids.map(BigInt));
	}
	put(e) {
		if (e.length > 1) throw Error("TextStreamer only supports batch size of 1");
		const t = this.next_tokens_are_prompt;
		if (t && (this.next_tokens_are_prompt = !1, this.skip_prompt)) return;
		const r = e[0];
		if (this.token_callback_function?.(r), r.length === 1 && this.special_ids.has(r[0])) {
			if (this.decode_kwargs.skip_special_tokens) return;
			if (this.token_cache.length > 0) {
				const o = this.tokenizer.decode(this.token_cache, this.decode_kwargs).slice(this.print_len);
				this.on_finalized_text(o, !1), this.token_cache = [], this.print_len = 0;
			}
			const a = this.tokenizer.decode(r, this.decode_kwargs);
			this.on_finalized_text(a, !1);
			return;
		}
		this.token_cache = Ft(this.token_cache, r);
		const s = this.tokenizer.decode(this.token_cache, this.decode_kwargs);
		let n;
		t || s.endsWith(`
`) ? (n = s.slice(this.print_len), this.token_cache = [], this.print_len = 0) : s.length > 0 && VN(s.charCodeAt(s.length - 1)) ? (n = s.slice(this.print_len), this.print_len += n.length) : (n = s.slice(this.print_len, s.lastIndexOf(" ") + 1), this.print_len += n.length), this.on_finalized_text(n, !1);
	}
	end() {
		let e;
		this.token_cache.length > 0 ? (e = this.tokenizer.decode(this.token_cache, this.decode_kwargs).slice(this.print_len), this.token_cache = [], this.print_len = 0) : e = "", this.next_tokens_are_prompt = !0, this.on_finalized_text(e, !0);
	}
	on_finalized_text(e, t) {
		e.length > 0 && this.callback_function?.(e), t && this.callback_function === Of && ce.IS_PROCESS_AVAILABLE && this.callback_function?.(`
`);
	}
};
Object.keys(ea);
export { e3 as a, Tg as c, ZN as d, Lc as i, v2 as l, UN as n, cO as o, tP as r, m2 as s, x2 as t, we as u };
