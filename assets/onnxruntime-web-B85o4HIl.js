var Mt = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
var Ca = Object.defineProperty, kg = Object.getOwnPropertyDescriptor, Tg = Object.getOwnPropertyNames, Ig = Object.prototype.hasOwnProperty, Eg = ((e) => typeof Mt < "u" ? Mt : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof Mt < "u" ? Mt : t)[r] }) : e)(function(e) {
	if (typeof Mt < "u") return Mt.apply(this, arguments);
	throw Error("Dynamic require of \"" + e + "\" is not supported");
}), U = (e, t) => () => (e && (t = e(e = 0)), t), Wt = (e, t) => {
	for (var r in t) Ca(e, r, {
		get: t[r],
		enumerable: !0
	});
}, zg = (e, t, r, i) => {
	if (t && typeof t == "object" || typeof t == "function") for (let a of Tg(t)) !Ig.call(e, a) && a !== r && Ca(e, a, {
		get: () => t[a],
		enumerable: !(i = kg(t, a)) || i.enumerable
	});
	return e;
}, lr = (e) => zg(Ca({}, "__esModule", { value: !0 }), e), jt, ct, Ut, Qs, Ad, Od = U(() => {
	"use strict";
	jt = /* @__PURE__ */ new Map(), ct = [], Ut = (e, t, r) => {
		if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
			let i = jt.get(e);
			if (i === void 0) jt.set(e, {
				backend: t,
				priority: r
			});
			else {
				if (i.priority > r) return;
				if (i.priority === r && i.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${r}`);
			}
			if (r >= 0) {
				let a = ct.indexOf(e);
				a !== -1 && ct.splice(a, 1);
				for (let n = 0; n < ct.length; n++) if (jt.get(ct[n]).priority <= r) {
					ct.splice(n, 0, e);
					return;
				}
				ct.push(e);
			}
			return;
		}
		throw new TypeError("not a valid backend");
	}, Qs = async (e) => {
		let t = jt.get(e);
		if (!t) return "backend not found.";
		if (t.initialized) return t.backend;
		if (t.aborted) return t.error;
		{
			let r = !!t.initPromise;
			try {
				return r || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend;
			} catch (i) {
				return r || (t.error = `${i}`, t.aborted = !0), t.error;
			} finally {
				delete t.initPromise;
			}
		}
	}, Ad = async (e) => {
		let t = e.executionProviders || [], r = t.map((d) => typeof d == "string" ? d : d.name), i = r.length === 0 ? ct : r, a, n = [], s = /* @__PURE__ */ new Set();
		for (let d of i) {
			let p = await Qs(d);
			typeof p == "string" ? n.push({
				name: d,
				err: p
			}) : (a || (a = p), a === p && s.add(d));
		}
		if (!a) throw new Error(`no available backend found. ERR: ${n.map((d) => `[${d.name}] ${d.err}`).join(", ")}`);
		for (let { name: d, err: p } of n) r.includes(d) && console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);
		let u = t.filter((d) => s.has(typeof d == "string" ? d : d.name));
		return [a, new Proxy(e, { get: (d, p) => p === "executionProviders" ? u : Reflect.get(d, p) })];
	};
}), Cg = U(() => {
	"use strict";
	Od();
}), Rd, Ag = U(() => {
	"use strict";
	Rd = "1.24.0-dev.20251116-b39e144322";
}), _i, Ie, Bd = U(() => {
	"use strict";
	Ag(), _i = "warning", Ie = {
		wasm: {},
		webgl: {},
		webgpu: {},
		versions: { common: Rd },
		set logLevel(e) {
			if (e !== void 0) {
				if (typeof e != "string" || [
					"verbose",
					"info",
					"warning",
					"error",
					"fatal"
				].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
				_i = e;
			}
		},
		get logLevel() {
			return _i;
		}
	}, Object.defineProperty(Ie, "logLevel", { enumerable: !0 });
}), ve, Og = U(() => {
	"use strict";
	Bd(), ve = Ie;
}), Nd, Md, Rg = U(() => {
	"use strict";
	Nd = (e, t) => {
		let r = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
		r.width = e.dims[3], r.height = e.dims[2];
		let i = r.getContext("2d");
		if (i != null) {
			let a, n;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], n = e.dims[3]) : (a = e.dims[3], n = e.dims[2]);
			let s = t?.format !== void 0 ? t.format : "RGB", u = t?.norm, d, p;
			u === void 0 || u.mean === void 0 ? d = [
				255,
				255,
				255,
				255
			] : typeof u.mean == "number" ? d = [
				u.mean,
				u.mean,
				u.mean,
				u.mean
			] : (d = [
				u.mean[0],
				u.mean[1],
				u.mean[2],
				0
			], u.mean[3] !== void 0 && (d[3] = u.mean[3])), u === void 0 || u.bias === void 0 ? p = [
				0,
				0,
				0,
				0
			] : typeof u.bias == "number" ? p = [
				u.bias,
				u.bias,
				u.bias,
				u.bias
			] : (p = [
				u.bias[0],
				u.bias[1],
				u.bias[2],
				0
			], u.bias[3] !== void 0 && (p[3] = u.bias[3]));
			let f = n * a, c = 0, g = f, y = f * 2, _ = -1;
			s === "RGBA" ? (c = 0, g = f, y = f * 2, _ = f * 3) : s === "RGB" ? (c = 0, g = f, y = f * 2) : s === "RBG" && (c = 0, y = f, g = f * 2);
			for (let $ = 0; $ < n; $++) for (let S = 0; S < a; S++) {
				let x = (e.data[c++] - p[0]) * d[0], b = (e.data[g++] - p[1]) * d[1], T = (e.data[y++] - p[2]) * d[2], I = _ === -1 ? 255 : (e.data[_++] - p[3]) * d[3];
				i.fillStyle = "rgba(" + x + "," + b + "," + T + "," + I + ")", i.fillRect(S, $, 1, 1);
			}
			if ("toDataURL" in r) return r.toDataURL();
			throw new Error("toDataURL is not supported");
		} else throw new Error("Can not access image data");
	}, Md = (e, t) => {
		let r = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), i;
		if (r != null) {
			let a, n, s;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], n = e.dims[1], s = e.dims[3]) : (a = e.dims[3], n = e.dims[2], s = e.dims[1]);
			let u = t !== void 0 && t.format !== void 0 ? t.format : "RGB", d = t?.norm, p, f;
			d === void 0 || d.mean === void 0 ? p = [
				255,
				255,
				255,
				255
			] : typeof d.mean == "number" ? p = [
				d.mean,
				d.mean,
				d.mean,
				d.mean
			] : (p = [
				d.mean[0],
				d.mean[1],
				d.mean[2],
				255
			], d.mean[3] !== void 0 && (p[3] = d.mean[3])), d === void 0 || d.bias === void 0 ? f = [
				0,
				0,
				0,
				0
			] : typeof d.bias == "number" ? f = [
				d.bias,
				d.bias,
				d.bias,
				d.bias
			] : (f = [
				d.bias[0],
				d.bias[1],
				d.bias[2],
				0
			], d.bias[3] !== void 0 && (f[3] = d.bias[3]));
			let c = n * a;
			if (t !== void 0 && (t.format !== void 0 && s === 4 && t.format !== "RGBA" || s === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
			let g = 4, y = 0, _ = 1, $ = 2, S = 3, x = 0, b = c, T = c * 2, I = -1;
			u === "RGBA" ? (x = 0, b = c, T = c * 2, I = c * 3) : u === "RGB" ? (x = 0, b = c, T = c * 2) : u === "RBG" && (x = 0, T = c, b = c * 2), i = r.createImageData(a, n);
			for (let E = 0; E < n * a; y += g, _ += g, $ += g, S += g, E++) i.data[y] = (e.data[x++] - f[0]) * p[0], i.data[_] = (e.data[b++] - f[1]) * p[1], i.data[$] = (e.data[T++] - f[2]) * p[2], i.data[S] = I === -1 ? 255 : (e.data[I++] - f[3]) * p[3];
		} else throw new Error("Can not access image data");
		return i;
	};
}), Sr, Dd, Ud, Pd, qd, Ld, Bg = U(() => {
	"use strict";
	Aa(), Sr = (e, t) => {
		if (e === void 0) throw new Error("Image buffer must be defined");
		if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
		if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
		let { height: r, width: i } = t, a = t.norm ?? {
			mean: 255,
			bias: 0
		}, n, s;
		typeof a.mean == "number" ? n = [
			a.mean,
			a.mean,
			a.mean,
			a.mean
		] : n = [
			a.mean[0],
			a.mean[1],
			a.mean[2],
			a.mean[3] ?? 255
		], typeof a.bias == "number" ? s = [
			a.bias,
			a.bias,
			a.bias,
			a.bias
		] : s = [
			a.bias[0],
			a.bias[1],
			a.bias[2],
			a.bias[3] ?? 0
		];
		let u = t.format !== void 0 ? t.format : "RGBA", d = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", p = r * i, f = d === "RGBA" ? new Float32Array(p * 4) : new Float32Array(p * 3), c = 4, g = 0, y = 1, _ = 2, $ = 3, S = 0, x = p, b = p * 2, T = -1;
		u === "RGB" && (c = 3, g = 0, y = 1, _ = 2, $ = -1), d === "RGBA" ? T = p * 3 : d === "RBG" ? (S = 0, b = p, x = p * 2) : d === "BGR" && (b = 0, x = p, S = p * 2);
		for (let I = 0; I < p; I++, g += c, _ += c, y += c, $ += c) f[S++] = (e[g] + s[0]) / n[0], f[x++] = (e[y] + s[1]) / n[1], f[b++] = (e[_] + s[2]) / n[2], T !== -1 && $ !== -1 && (f[T++] = (e[$] + s[3]) / n[3]);
		return d === "RGBA" ? new Me("float32", f, [
			1,
			4,
			r,
			i
		]) : new Me("float32", f, [
			1,
			3,
			r,
			i
		]);
	}, Dd = async (e, t) => {
		let r = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, i = typeof ImageData < "u" && e instanceof ImageData, a = typeof ImageBitmap < "u" && e instanceof ImageBitmap, n = typeof e == "string", s, u = t ?? {}, d = () => {
			if (typeof document < "u") return document.createElement("canvas");
			if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
			throw new Error("Canvas is not supported");
		}, p = (f) => typeof HTMLCanvasElement < "u" && f instanceof HTMLCanvasElement || f instanceof OffscreenCanvas ? f.getContext("2d") : null;
		if (r) {
			let f = d();
			f.width = e.width, f.height = e.height;
			let c = p(f);
			if (c != null) {
				let g = e.height, y = e.width;
				if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (g = t.resizedHeight, y = t.resizedWidth), t !== void 0) {
					if (u = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
					u.tensorFormat = "RGBA", u.height = g, u.width = y;
				} else u.tensorFormat = "RGBA", u.height = g, u.width = y;
				c.drawImage(e, 0, 0), s = c.getImageData(0, 0, y, g).data;
			} else throw new Error("Can not access image data");
		} else if (i) {
			let f, c;
			if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (f = t.resizedHeight, c = t.resizedWidth) : (f = e.height, c = e.width), t !== void 0 && (u = t), u.format = "RGBA", u.height = f, u.width = c, t !== void 0) {
				let g = d();
				g.width = c, g.height = f;
				let y = p(g);
				if (y != null) y.putImageData(e, 0, 0), s = y.getImageData(0, 0, c, f).data;
				else throw new Error("Can not access image data");
			} else s = e.data;
		} else if (a) {
			if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
			let f = d();
			f.width = e.width, f.height = e.height;
			let c = p(f);
			if (c != null) {
				let g = e.height, y = e.width;
				return c.drawImage(e, 0, 0, y, g), s = c.getImageData(0, 0, y, g).data, u.height = g, u.width = y, Sr(s, u);
			} else throw new Error("Can not access image data");
		} else {
			if (n) return new Promise((f, c) => {
				let g = d(), y = p(g);
				if (!e || !y) return c();
				let _ = new Image();
				_.crossOrigin = "Anonymous", _.src = e, _.onload = () => {
					g.width = _.width, g.height = _.height, y.drawImage(_, 0, 0, g.width, g.height);
					let $ = y.getImageData(0, 0, g.width, g.height);
					u.height = g.height, u.width = g.width, f(Sr($.data, u));
				};
			});
			throw new Error("Input data provided is not supported - aborted tensor creation");
		}
		if (s !== void 0) return Sr(s, u);
		throw new Error("Input data provided is not supported - aborted tensor creation");
	}, Ud = (e, t) => {
		let { width: r, height: i, download: a, dispose: n } = t;
		return new Me({
			location: "texture",
			type: "float32",
			texture: e,
			dims: [
				1,
				i,
				r,
				4
			],
			download: a,
			dispose: n
		});
	}, Pd = (e, t) => {
		let { dataType: r, dims: i, download: a, dispose: n } = t;
		return new Me({
			location: "gpu-buffer",
			type: r ?? "float32",
			gpuBuffer: e,
			dims: i,
			download: a,
			dispose: n
		});
	}, qd = (e, t) => {
		let { dataType: r, dims: i, download: a, dispose: n } = t;
		return new Me({
			location: "ml-tensor",
			type: r ?? "float32",
			mlTensor: e,
			dims: i,
			download: a,
			dispose: n
		});
	}, Ld = (e, t, r) => new Me({
		location: "cpu-pinned",
		type: e,
		data: t,
		dims: r ?? [t.length]
	});
}), St, ar, vi, Wd, Ng = U(() => {
	"use strict";
	St = /* @__PURE__ */ new Map([
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
	]), ar = /* @__PURE__ */ new Map([
		[Float32Array, "float32"],
		[Uint8Array, "uint8"],
		[Int8Array, "int8"],
		[Uint16Array, "uint16"],
		[Int16Array, "int16"],
		[Int32Array, "int32"],
		[Float64Array, "float64"],
		[Uint32Array, "uint32"]
	]), vi = !1, Wd = () => {
		if (!vi) {
			vi = !0;
			let e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, r = globalThis.Float16Array, i = typeof r < "u" && r.from;
			e && (St.set("int64", BigInt64Array), ar.set(BigInt64Array, "int64")), t && (St.set("uint64", BigUint64Array), ar.set(BigUint64Array, "uint64")), i ? (St.set("float16", r), ar.set(r, "float16")) : St.set("float16", Uint16Array);
		}
	};
}), Vd, Gd, Mg = U(() => {
	"use strict";
	Aa(), Vd = (e) => {
		let t = 1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (typeof i != "number" || !Number.isSafeInteger(i)) throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);
			if (i < 0) throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);
			t *= i;
		}
		return t;
	}, Gd = (e, t) => {
		switch (e.location) {
			case "cpu": return new Me(e.type, e.data, t);
			case "cpu-pinned": return new Me({
				location: "cpu-pinned",
				data: e.data,
				type: e.type,
				dims: t
			});
			case "texture": return new Me({
				location: "texture",
				texture: e.texture,
				type: e.type,
				dims: t
			});
			case "gpu-buffer": return new Me({
				location: "gpu-buffer",
				gpuBuffer: e.gpuBuffer,
				type: e.type,
				dims: t
			});
			case "ml-tensor": return new Me({
				location: "ml-tensor",
				mlTensor: e.mlTensor,
				type: e.type,
				dims: t
			});
			default: throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
		}
	};
}), Me, Aa = U(() => {
	"use strict";
	Rg(), Bg(), Ng(), Mg(), Me = class {
		constructor(e, t, r) {
			Wd();
			let i, a;
			if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, i = e.type, a = e.dims, e.location) {
				case "cpu-pinned": {
					let s = St.get(i);
					if (!s) throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);
					if (!(e.data instanceof s)) throw new TypeError(`buffer should be of type ${s.name}`);
					this.cpuData = e.data;
					break;
				}
				case "texture":
					if (i !== "float32") throw new TypeError(`unsupported type "${i}" to create tensor from texture`);
					this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "gpu-buffer":
					if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);
					this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "ml-tensor":
					if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint64" && i !== "int8" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);
					this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
					break;
				default: throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
			}
			else {
				let s, u;
				if (typeof e == "string") if (i = e, u = r, e === "string") {
					if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array.");
					s = t;
				} else {
					let d = St.get(e);
					if (d === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`);
					if (Array.isArray(t)) {
						if (e === "float16" && d === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);
						e === "uint64" || e === "int64" ? s = d.from(t, BigInt) : s = d.from(t);
					} else if (t instanceof d) s = t;
					else if (t instanceof Uint8ClampedArray) if (e === "uint8") s = Uint8Array.from(t);
					else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
					else if (e === "float16" && t instanceof Uint16Array && d !== Uint16Array) s = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);
					else throw new TypeError(`A ${i} tensor's data must be type of ${d}`);
				}
				else if (u = t, Array.isArray(e)) {
					if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
					let d = typeof e[0];
					if (d === "string") i = "string", s = e;
					else if (d === "boolean") i = "bool", s = Uint8Array.from(e);
					else throw new TypeError(`Invalid element type of data array: ${d}.`);
				} else if (e instanceof Uint8ClampedArray) i = "uint8", s = Uint8Array.from(e);
				else {
					let d = ar.get(e.constructor);
					if (d === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
					i = d, s = e;
				}
				if (u === void 0) u = [s.length];
				else if (!Array.isArray(u)) throw new TypeError("A tensor's dims must be a number array");
				a = u, this.cpuData = s, this.dataLocation = "cpu";
			}
			let n = Vd(a);
			if (this.cpuData && n !== this.cpuData.length && !((i === "uint4" || i === "int4") && Math.ceil(n / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);
			this.type = i, this.dims = a, this.size = n;
		}
		static async fromImage(e, t) {
			return Dd(e, t);
		}
		static fromTexture(e, t) {
			return Ud(e, t);
		}
		static fromGpuBuffer(e, t) {
			return Pd(e, t);
		}
		static fromMLTensor(e, t) {
			return qd(e, t);
		}
		static fromPinnedBuffer(e, t, r) {
			return Ld(e, t, r);
		}
		toDataURL(e) {
			return Nd(this, e);
		}
		toImageData(e) {
			return Md(this, e);
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
			return Gd(this, e);
		}
	};
}), et, Hd = U(() => {
	"use strict";
	Aa(), et = Me;
}), Pr, bi, tt, Ke, It, Et, Fd = U(() => {
	"use strict";
	Bd(), Pr = (e, t) => {
		(typeof Ie.trace > "u" ? !Ie.wasm.trace : !Ie.trace) || console.timeStamp(`${e}::ORT::${t}`);
	}, bi = (e, t) => {
		let r = (/* @__PURE__ */ new Error()).stack?.split(/\r\n|\r|\n/g) || [], i = !1;
		for (let a = 0; a < r.length; a++) {
			if (i && !r[a].includes("TRACE_FUNC")) {
				let n = `FUNC_${e}::${r[a].trim().split(" ")[1]}`;
				t && (n += `::${t}`), Pr("CPU", n);
				return;
			}
			r[a].includes("TRACE_FUNC") && (i = !0);
		}
	}, tt = (e) => {
		(typeof Ie.trace > "u" ? !Ie.wasm.trace : !Ie.trace) || bi("BEGIN", e);
	}, Ke = (e) => {
		(typeof Ie.trace > "u" ? !Ie.wasm.trace : !Ie.trace) || bi("END", e);
	}, It = (e) => {
		(typeof Ie.trace > "u" ? !Ie.wasm.trace : !Ie.trace) || console.time(`ORT::${e}`);
	}, Et = (e) => {
		(typeof Ie.trace > "u" ? !Ie.wasm.trace : !Ie.trace) || console.timeEnd(`ORT::${e}`);
	};
}), jd, Dg = U(() => {
	"use strict";
	Od(), Hd(), Fd(), jd = class Kd {
		constructor(t) {
			this.handler = t;
		}
		async run(t, r, i) {
			tt(), It("InferenceSession.run");
			let a = {}, n = {};
			if (typeof t != "object" || t === null || t instanceof et || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
			let s = !0;
			if (typeof r == "object") {
				if (r === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
				if (r instanceof et) throw new TypeError("'fetches' cannot be a Tensor");
				if (Array.isArray(r)) {
					if (r.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
					s = !1;
					for (let p of r) {
						if (typeof p != "string") throw new TypeError("'fetches' must be a string array or an object.");
						if (this.outputNames.indexOf(p) === -1) throw new RangeError(`'fetches' contains invalid output name: ${p}.`);
						a[p] = null;
					}
					if (typeof i == "object" && i !== null) n = i;
					else if (typeof i < "u") throw new TypeError("'options' must be an object.");
				} else {
					let p = !1, f = Object.getOwnPropertyNames(r);
					for (let c of this.outputNames) if (f.indexOf(c) !== -1) {
						let g = r[c];
						(g === null || g instanceof et) && (p = !0, s = !1, a[c] = g);
					}
					if (p) {
						if (typeof i == "object" && i !== null) n = i;
						else if (typeof i < "u") throw new TypeError("'options' must be an object.");
					} else n = r;
				}
			} else if (typeof r < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
			for (let p of this.inputNames) if (typeof t[p] > "u") throw new Error(`input '${p}' is missing in 'feeds'.`);
			if (s) for (let p of this.outputNames) a[p] = null;
			let u = await this.handler.run(t, a, n), d = {};
			for (let p in u) if (Object.hasOwnProperty.call(u, p)) {
				let f = u[p];
				f instanceof et ? d[p] = f : d[p] = new et(f.type, f.data, f.dims);
			}
			return Et("InferenceSession.run"), Ke(), d;
		}
		async release() {
			return this.handler.dispose();
		}
		static async create(t, r, i, a) {
			tt(), It("InferenceSession.create");
			let n, s = {};
			if (typeof t == "string") {
				if (n = t, typeof r == "object" && r !== null) s = r;
				else if (typeof r < "u") throw new TypeError("'options' must be an object.");
			} else if (t instanceof Uint8Array) {
				if (n = t, typeof r == "object" && r !== null) s = r;
				else if (typeof r < "u") throw new TypeError("'options' must be an object.");
			} else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
				let f = t, c = 0, g = t.byteLength;
				if (typeof r == "object" && r !== null) s = r;
				else if (typeof r == "number") {
					if (c = r, !Number.isSafeInteger(c)) throw new RangeError("'byteOffset' must be an integer.");
					if (c < 0 || c >= f.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);
					if (g = t.byteLength - c, typeof i == "number") {
						if (g = i, !Number.isSafeInteger(g)) throw new RangeError("'byteLength' must be an integer.");
						if (g <= 0 || c + g > f.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength - c}].`);
						if (typeof a == "object" && a !== null) s = a;
						else if (typeof a < "u") throw new TypeError("'options' must be an object.");
					} else if (typeof i < "u") throw new TypeError("'byteLength' must be a number.");
				} else if (typeof r < "u") throw new TypeError("'options' must be an object.");
				n = new Uint8Array(f, c, g);
			} else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
			let [u, d] = await Ad(s), p = await u.createInferenceSessionHandler(n, d);
			return Et("InferenceSession.create"), Ke(), new Kd(p);
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
}), Zd, Ug = U(() => {
	"use strict";
	Dg(), Zd = jd;
}), Pg = U(() => {
	"use strict";
}), qg = U(() => {
	"use strict";
}), Lg = U(() => {
	"use strict";
}), Wg = U(() => {
	"use strict";
});
Wt({}, {
	InferenceSession: () => Zd,
	TRACE: () => Pr,
	TRACE_EVENT_BEGIN: () => It,
	TRACE_EVENT_END: () => Et,
	TRACE_FUNC_BEGIN: () => tt,
	TRACE_FUNC_END: () => Ke,
	Tensor: () => et,
	env: () => ve,
	registerBackend: () => Ut
});
var qe = U(() => {
	"use strict";
	Cg(), Og(), Ug(), Hd(), Pg(), qg(), Fd(), Lg(), Wg();
}), Oa = U(() => {
	"use strict";
}), Xd = {};
Wt(Xd, { default: () => Qd });
var $i, wi, Qd, Gg = U(() => {
	"use strict";
	rf(), Ot(), Ra(), $i = "ort-wasm-proxy-worker", wi = globalThis.self?.name === $i, wi && (self.onmessage = (e) => {
		let { type: t, in: r } = e.data;
		try {
			switch (t) {
				case "init-wasm":
					Ba(r.wasm).then(() => {
						Qa(r).then(() => {
							postMessage({ type: t });
						}, (i) => {
							postMessage({
								type: t,
								err: i
							});
						});
					}, (i) => {
						postMessage({
							type: t,
							err: i
						});
					});
					break;
				case "init-ep": {
					let { epName: i, env: a } = r;
					Ya(a, i).then(() => {
						postMessage({ type: t });
					}, (n) => {
						postMessage({
							type: t,
							err: n
						});
					});
					break;
				}
				case "copy-from": {
					let { buffer: i } = r, a = Fr(i);
					postMessage({
						type: t,
						out: a
					});
					break;
				}
				case "create": {
					let { model: i, options: a } = r;
					Ja(i, a).then((n) => {
						postMessage({
							type: t,
							out: n
						});
					}, (n) => {
						postMessage({
							type: t,
							err: n
						});
					});
					break;
				}
				case "release":
					en(r), postMessage({ type: t });
					break;
				case "run": {
					let { sessionId: i, inputIndices: a, inputs: n, outputIndices: s, options: u } = r;
					tn(i, a, n, s, new Array(s.length).fill(null), u).then((d) => {
						d.some((p) => p[3] !== "cpu") ? postMessage({
							type: t,
							err: "Proxy does not support non-cpu tensor location."
						}) : postMessage({
							type: t,
							out: d
						}, an([...n, ...d]));
					}, (d) => {
						postMessage({
							type: t,
							err: d
						});
					});
					break;
				}
				case "end-profiling":
					rn(r), postMessage({ type: t });
					break;
				default:
			}
		} catch (i) {
			postMessage({
				type: t,
				err: i
			});
		}
	}), Qd = wi ? null : (e) => new Worker(e ?? Ne, {
		type: "module",
		name: $i
	});
}), Yd = {};
Wt(Yd, { default: () => Jd });
async function Ys(e = {}) {
	var t = e, r = !!globalThis.window, i = !!globalThis.WorkerGlobalScope, a = i && self.name?.startsWith("em-pthread");
	t.mountExternalData = (o, l) => {
		o.startsWith("./") && (o = o.substring(2)), (t.Xc || (t.Xc = /* @__PURE__ */ new Map())).set(o, l);
	}, t.unmountExternalData = () => {
		delete t.Xc;
	}, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({
		initial: 0,
		maximum: 0,
		shared: !0
	}).buffer.constructor;
	let n = (o) => async (...l) => {
		try {
			if (t.Yc) throw Error("Session already started");
			let m = t.Yc = {
				Kd: l[0],
				errors: []
			}, h = await o(...l);
			if (t.Yc !== m) throw Error("Session mismatch");
			t.dd?.flush();
			let v = m.errors;
			if (0 < v.length) {
				let k = await Promise.all(v);
				if (k = k.filter((z) => z), 0 < k.length) throw Error(k.join(`
`));
			}
			return h;
		} finally {
			t.Yc = null;
		}
	};
	t.jsepInit = (o, l) => {
		if (o === "webgpu") {
			[t.dd, t.Ad, t.Ed, t.ed, t.Dd, t.$b, t.Fd, t.Hd, t.Bd, t.Cd, t.Gd] = l;
			let m = t.dd;
			t.jsepRegisterBuffer = (h, v, k, z) => m.registerBuffer(h, v, k, z), t.jsepGetBuffer = (h) => m.getBuffer(h), t.jsepCreateDownloader = (h, v, k) => m.createDownloader(h, v, k), t.jsepOnCreateSession = (h) => {
				m.onCreateSession(h);
			}, t.jsepOnReleaseSession = (h) => {
				m.onReleaseSession(h);
			}, t.jsepOnRunStart = (h) => m.onRunStart(h), t.Id = (h, v) => {
				m.upload(h, v);
			};
		} else if (o === "webnn") {
			let m = l[0];
			[t.Wd, t.sd, t.webnnEnsureTensor, t.td, t.webnnDownloadTensor, t.Rd, t.webnnEnableTraceEvent] = l.slice(1), t.webnnReleaseTensorId = t.sd, t.webnnUploadTensor = t.td, t.webnnRegisterMLContext = t.Rd, t.webnnOnRunStart = (h) => m.onRunStart(h), t.webnnOnRunEnd = m.onRunEnd.bind(m), t.webnnOnReleaseSession = (h) => {
				m.onReleaseSession(h);
			}, t.webnnCreateMLTensorDownloader = (h, v) => m.createMLTensorDownloader(h, v), t.webnnRegisterMLTensor = (h, v, k, z) => m.registerMLTensor(h, v, k, z), t.webnnCreateMLContext = (h) => m.createMLContext(h), t.webnnRegisterMLConstant = (h, v, k, z, B, L) => m.registerMLConstant(h, v, k, z, B, t.Xc, L), t.webnnRegisterGraphInput = m.registerGraphInput.bind(m), t.webnnIsGraphInput = m.isGraphInput.bind(m), t.webnnRegisterGraphOutput = m.registerGraphOutput.bind(m), t.webnnIsGraphOutput = m.isGraphOutput.bind(m), t.webnnCreateTemporaryTensor = m.createTemporaryTensor.bind(m), t.webnnIsGraphInputOutputTypeSupported = m.isGraphInputOutputTypeSupported.bind(m);
		}
	};
	let s = () => {
		let o = (l) => (...m) => {
			let h = Qe;
			return m = l(...m), Qe != h ? new Promise((v, k) => {
				ni = {
					resolve: v,
					reject: k
				};
			}) : m;
		};
		(() => {
			for (let l of [
				"_OrtAppendExecutionProvider",
				"_OrtCreateSession",
				"_OrtRun",
				"_OrtRunWithBinding",
				"_OrtBindInput"
			]) t[l] = o(t[l]);
		})(), n !== void 0 && (t._OrtRun = n(t._OrtRun), t._OrtRunWithBinding = n(t._OrtRunWithBinding)), s = void 0;
	};
	t.asyncInit = () => {
		s?.();
	};
	var u, d, p = (o, l) => {
		throw l;
	}, f = import.meta.url, c = "";
	if (r || i) {
		try {
			c = new URL(".", f).href;
		} catch {}
		i && (d = (o) => {
			var l = new XMLHttpRequest();
			return l.open("GET", o, !1), l.responseType = "arraybuffer", l.send(null), new Uint8Array(l.response);
		}), u = async (o) => {
			if (A(o)) return new Promise((m, h) => {
				var v = new XMLHttpRequest();
				v.open("GET", o, !0), v.responseType = "arraybuffer", v.onload = () => {
					v.status == 200 || v.status == 0 && v.response ? m(v.response) : h(v.status);
				}, v.onerror = h, v.send(null);
			});
			var l = await fetch(o, { credentials: "same-origin" });
			if (l.ok) return l.arrayBuffer();
			throw Error(l.status + " : " + l.url);
		};
	}
	var g, y, _, $, S, x, b = console.log.bind(console), T = console.error.bind(console), I = b, E = T, C = !1, A = (o) => o.startsWith("file://");
	function w() {
		ut.buffer != q.buffer && oe();
	}
	if (a) {
		let o = function(l) {
			try {
				var m = l.data, h = m.Sc;
				if (h === "load") {
					let v = [];
					self.onmessage = (k) => v.push(k), x = () => {
						postMessage({ Sc: "loaded" });
						for (let k of v) o(k);
						self.onmessage = o;
					};
					for (let k of m.xd) t[k] && !t[k].proxy || (t[k] = (...z) => {
						postMessage({
							Sc: "callHandler",
							wd: k,
							args: z
						});
					}, k == "print" && (I = t[k]), k == "printErr" && (E = t[k]));
					ut = m.Od, oe(), y = m.Pd, Ae(), xr();
				} else if (h === "run") {
					(function(v) {
						var k = (w(), D)[v + 52 >>> 2 >>> 0];
						v = (w(), D)[v + 56 >>> 2 >>> 0], os(k, k - v), se(k);
					})(m.Rc), di(m.Rc, 0, 0, 1, 0, 0), un(), ri(m.Rc), P || (ts(), P = !0);
					try {
						mf(m.Md, m.bd);
					} catch (v) {
						if (v != "unwind") throw v;
					}
				} else m.target !== "setimmediate" && (h === "checkMailbox" ? P && gr() : h && (E(`worker: received unknown command ${h}`), E(m)));
			} catch (v) {
				throw rs(), v;
			}
		};
		var P = !1;
		self.onunhandledrejection = (l) => {
			throw l.reason || l;
		}, self.onmessage = o;
	}
	var q, Q, K, X, R, D, G, Y, ee, te, M, H = !1;
	function oe() {
		var o = ut.buffer;
		t.HEAP8 = q = new Int8Array(o), K = new Int16Array(o), t.HEAPU8 = Q = new Uint8Array(o), X = new Uint16Array(o), t.HEAP32 = R = new Int32Array(o), t.HEAPU32 = D = new Uint32Array(o), G = new Float32Array(o), Y = new Float64Array(o), ee = new BigInt64Array(o), te = new BigUint64Array(o);
	}
	function ne() {
		H = !0, a ? x() : it.sb();
	}
	function V(o) {
		throw E(o = "Aborted(" + o + ")"), C = !0, o = new WebAssembly.RuntimeError(o + ". Build with -sASSERTIONS for more info."), S?.(o), o;
	}
	function Be() {
		return { a: {
			la: qm,
			gb: Pm,
			g: gf,
			J: yf,
			f: _f,
			p: vf,
			h: bf,
			ga: $f,
			b: wf,
			S: xf,
			Ha: fn,
			n: Sf,
			_: _n,
			Xa: vn,
			Da: bn,
			Fa: $n,
			Ya: wn,
			Va: xn,
			Oa: Sn,
			Ua: kn,
			ja: Tn,
			Ea: In,
			Ba: En,
			Wa: zn,
			Ca: Cn,
			bb: kf,
			da: If,
			wa: Ef,
			ua: Cf,
			ca: Of,
			O: Rf,
			H: Bf,
			va: Nf,
			Z: Wf,
			xa: Vf,
			Ra: Gf,
			za: Ff,
			Ia: jf,
			sa: Kf,
			ea: Zf,
			Qa: ri,
			_a: Xf,
			Q: em,
			r: nm,
			c: ei,
			hb: sm,
			y: om,
			M: um,
			D: lm,
			l: dm,
			s: Un,
			ib: pm,
			I: cm,
			R: hm,
			j: fm,
			u: mm,
			q: gm,
			k: ym,
			La: _m,
			Ma: vm,
			Na: bm,
			Ja: Wn,
			Ka: Vn,
			ta: Gn,
			db: wm,
			ab: km,
			v: Tm,
			$: Im,
			fa: Em,
			$a: xm,
			V: zm,
			Za: Cm,
			Aa: Am,
			F: $m,
			T: Om,
			ka: $r,
			ya: Bm,
			fb: Rm,
			eb: Nm,
			Sa: Kn,
			Ta: Zn,
			Ga: Zr,
			U: Xn,
			ia: Qn,
			Pa: Yn,
			ha: Jn,
			kb: wg,
			ma: yg,
			lb: $g,
			na: gg,
			G: sg,
			e: Gm,
			t: Wm,
			w: Lm,
			B: eg,
			mb: hg,
			K: ig,
			x: jm,
			oa: fg,
			X: _g,
			aa: cg,
			nb: pg,
			ob: dg,
			qa: og,
			pa: lg,
			pb: ug,
			N: ag,
			Y: mg,
			d: Vm,
			A: Fm,
			m: Hm,
			jb: xg,
			o: Zm,
			z: Xm,
			C: Km,
			E: Qm,
			L: tg,
			qb: ng,
			P: vg,
			ba: rg,
			W: bg,
			rb: Jm,
			ra: Ym,
			i: Dm,
			a: ut,
			cb: Kr
		} };
	}
	async function Ae() {
		function o(h, v) {
			var k = it = h.exports;
			h = {};
			for (let [z, B] of Object.entries(k)) typeof B == "function" ? (k = Qf(B), h[z] = k) : h[z] = B;
			return it = h, it = (function() {
				var z = it, B = (W) => (ae) => W(ae) >>> 0, L = (W) => () => W() >>> 0;
				return (z = Object.assign({}, z)).tb = B(z.tb), z.Xb = L(z.Xb), z.Zb = B(z.Zb), z.lc = B(z.lc), z.mc = L(z.mc), z.qc = B(z.qc), z;
			})(), sn.push(it._b), es = (h = it).tb, ts = h.ub, t._OrtInit = h.vb, t._OrtGetLastError = h.wb, t._OrtCreateSessionOptions = h.xb, t._OrtAppendExecutionProvider = h.yb, t._OrtAddFreeDimensionOverride = h.zb, t._OrtAddSessionConfigEntry = h.Ab, t._OrtReleaseSessionOptions = h.Bb, t._OrtCreateSession = h.Cb, t._OrtReleaseSession = h.Db, t._OrtGetInputOutputCount = h.Eb, t._OrtGetInputOutputMetadata = h.Fb, t._OrtFree = h.Gb, t._OrtCreateTensor = h.Hb, t._OrtGetTensorData = h.Ib, t._OrtReleaseTensor = h.Jb, t._OrtCreateRunOptions = h.Kb, t._OrtAddRunConfigEntry = h.Lb, t._OrtReleaseRunOptions = h.Mb, t._OrtCreateBinding = h.Nb, t._OrtBindInput = h.Ob, t._OrtBindOutput = h.Pb, t._OrtClearBoundOutputs = h.Qb, t._OrtReleaseBinding = h.Rb, t._OrtRunWithBinding = h.Sb, t._OrtRun = h.Tb, t._OrtEndProfiling = h.Ub, t._JsepOutput = h.Vb, t._JsepGetNodeName = h.Wb, wr = h.Xb, Ye = t._free = h.Yb, Ht = t._malloc = h.Zb, di = h.ac, rs = h.bc, is = h.cc, as = h.dc, pi = h.ec, ns = h.fc, ss = h.gc, le = h.hc, Ft = h.ic, os = h.jc, se = h.kc, ci = h.lc, ue = h.mc, us = h.nc, hi = h.oc, ls = h.pc, ds = h.qc, ps = h.rc, fi = h.sc, cs = h.tc, hs = h.uc, fs = h.vc, ms = h.wc, gs = h.xc, ys = h.yc, _s = h.zc, vs = h.Ac, bs = h.Bc, $s = h.Cc, ws = h.Dc, xs = h.Ec, Ss = h.Fc, ks = h.Gc, Ts = h.Hc, Is = h.Ic, Es = h.Jc, zs = h.Kc, Cs = h.Lc, As = h.Mc, Os = h.Nc, Rs = h.Pc, Bs = h.Qc, Ns = h.$c, Ms = h.ad, Ds = h.fd, Us = h.jd, Ps = h.kd, qs = h.ld, Ls = h.md, Ws = h.nd, Vs = h.od, Gs = h.pd, Hs = h.qd, Fs = h.vd, js = h.Sd, Ks = h.Td, Zs = h.Ud, Xs = h.Vd, y = v, it;
		}
		var l, m = Be();
		return t.instantiateWasm ? new Promise((h) => {
			t.instantiateWasm(m, (v, k) => {
				h(o(v, k));
			});
		}) : a ? o(new WebAssembly.Instance(y, Be()), y) : (M ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.jsep.wasm", c) : c + "ort-wasm-simd-threaded.jsep.wasm" : new URL("" + new URL("ort-wasm-simd-threaded.jsep-CCdEhX4k.wasm", import.meta.url).href, "" + import.meta.url).href, l = await (async function(h) {
			var v = M;
			if (!g && !A(v)) try {
				var k = fetch(v, { credentials: "same-origin" });
				return await WebAssembly.instantiateStreaming(k, h);
			} catch (z) {
				E(`wasm streaming compile failed: ${z}`), E("falling back to ArrayBuffer instantiation");
			}
			return (async function(z, B) {
				try {
					var L = await (async function(W) {
						if (!g) try {
							var ae = await u(W);
							return new Uint8Array(ae);
						} catch {}
						if (W == M && g) W = new Uint8Array(g);
						else {
							if (!d) throw "both async and sync fetching of the wasm failed";
							W = d(W);
						}
						return W;
					})(z);
					return await WebAssembly.instantiate(L, B);
				} catch (W) {
					E(`failed to asynchronously prepare wasm: ${W}`), V(W);
				}
			})(v, h);
		})(m), o(l.instance, l.module));
	}
	class be {
		name = "ExitStatus";
		constructor(l) {
			this.message = `Program terminated with exit(${l})`, this.status = l;
		}
	}
	var ze = (o) => {
		o.terminate(), o.onmessage = () => {};
	}, pe = [], ke = 0, Oe = null, pr = (o) => {
		ot.length == 0 && (dn(), ln(ot[0]));
		var l = ot.pop();
		if (!l) return 6;
		Vt.push(l), yt[o.Rc] = l, l.Rc = o.Rc;
		var m = {
			Sc: "run",
			Md: o.Ld,
			bd: o.bd,
			Rc: o.Rc
		};
		return l.postMessage(m, o.rd), 0;
	}, Ze = 0, $e = (o, l, ...m) => {
		var h, v = 16 * m.length, k = ue(), z = ci(v), B = z >>> 3;
		for (h of m) typeof h == "bigint" ? ((w(), ee)[B++ >>> 0] = 1n, (w(), ee)[B++ >>> 0] = h) : ((w(), ee)[B++ >>> 0] = 0n, (w(), Y)[B++ >>> 0] = h);
		return o = is(o, 0, v, z, l), se(k), o;
	};
	function Kr(o) {
		if (a) return $e(0, 1, o);
		if (_ = o, !(0 < Ze)) {
			for (var l of Vt) ze(l);
			for (l of ot) ze(l);
			ot = [], Vt = [], yt = {}, C = !0;
		}
		p(0, new be(o));
	}
	function nn(o) {
		if (a) return $e(1, 0, o);
		Zr(o);
	}
	var Zr = (o) => {
		if (_ = o, a) throw nn(o), "unwind";
		Kr(o);
	}, ot = [], Vt = [], sn = [], yt = {}, on = (o) => {
		var l = o.Rc;
		delete yt[l], ot.push(o), Vt.splice(Vt.indexOf(o), 1), o.Rc = 0, as(l);
	};
	function un() {
		sn.forEach((o) => o());
	}
	var ln = (o) => new Promise((l) => {
		o.onmessage = (v) => {
			var k = v.data;
			if (v = k.Sc, k.Zc && k.Zc != wr()) {
				var z = yt[k.Zc];
				z ? z.postMessage(k, k.rd) : E(`Internal error! Worker sent a message "${v}" to target pthread ${k.Zc}, but that thread no longer exists!`);
			} else v === "checkMailbox" ? gr() : v === "spawnThread" ? pr(k) : v === "cleanupThread" ? mr(() => {
				on(yt[k.Nd]);
			}) : v === "loaded" ? (o.loaded = !0, l(o)) : k.target === "setimmediate" ? o.postMessage(k) : v === "uncaughtException" ? o.onerror(k.error) : v === "callHandler" ? t[k.wd](...k.args) : v && E(`worker sent an unknown command ${v}`);
		}, o.onerror = (v) => {
			throw E(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`), v;
		};
		var m, h = [];
		for (m of []) t.propertyIsEnumerable(m) && h.push(m);
		o.postMessage({
			Sc: "load",
			xd: h,
			Od: ut,
			Pd: y
		});
	});
	function dn() {
		var o = new Worker((() => {
			let l = URL;
			return import.meta.url > "file:" && import.meta.url < "file;" ? new l("ort.bundle.min.mjs", import.meta.url) : new URL(import.meta.url);
		})(), {
			type: "module",
			workerData: "em-pthread",
			name: "em-pthread"
		});
		ot.push(o);
	}
	var ut, mf = (o, l) => {
		Ze = 0, o = fi(o, l), 0 < Ze ? _ = o : pi(o);
	}, cr = [], hr = 0;
	function gf(o) {
		var l = new Xr(o >>>= 0);
		return (w(), q)[l.Tc + 12 >>> 0] == 0 && (pn(l, !0), hr--), cn(l, !1), cr.push(l), ds(o);
	}
	var Bt = 0, yf = () => {
		le(0, 0);
		var o = cr.pop();
		us(o.cd), Bt = 0;
	};
	function pn(o, l) {
		l = l ? 1 : 0, (w(), q)[o.Tc + 12 >>> 0] = l;
	}
	function cn(o, l) {
		l = l ? 1 : 0, (w(), q)[o.Tc + 13 >>> 0] = l;
	}
	class Xr {
		constructor(l) {
			this.cd = l, this.Tc = l - 24;
		}
	}
	var Qr = (o) => {
		var l = Bt;
		if (!l) return Ft(0), 0;
		var m = new Xr(l);
		(w(), D)[m.Tc + 16 >>> 2 >>> 0] = l;
		var h = (w(), D)[m.Tc + 4 >>> 2 >>> 0];
		if (!h) return Ft(0), l;
		for (var v of o) {
			if (v === 0 || v === h) break;
			if (ls(v, h, m.Tc + 16)) return Ft(v), l;
		}
		return Ft(h), l;
	};
	function _f() {
		return Qr([]);
	}
	function vf(o) {
		return Qr([o >>> 0]);
	}
	function bf(o, l, m, h) {
		return Qr([
			o >>> 0,
			l >>> 0,
			m >>> 0,
			h >>> 0
		]);
	}
	var $f = () => {
		var o = cr.pop();
		o || V("no exception to throw");
		var l = o.cd;
		throw (w(), q)[o.Tc + 13 >>> 0] == 0 && (cr.push(o), cn(o, !0), pn(o, !1), hr++), hi(l), Bt = l;
	};
	function wf(o, l, m) {
		var h = new Xr(o >>>= 0);
		throw l >>>= 0, m >>>= 0, (w(), D)[h.Tc + 16 >>> 2 >>> 0] = 0, (w(), D)[h.Tc + 4 >>> 2 >>> 0] = l, (w(), D)[h.Tc + 8 >>> 2 >>> 0] = m, hi(o), hr++, Bt = o;
	}
	var xf = () => hr;
	function hn(o, l, m, h) {
		return a ? $e(2, 1, o, l, m, h) : fn(o, l, m, h);
	}
	function fn(o, l, m, h) {
		if (o >>>= 0, l >>>= 0, m >>>= 0, h >>>= 0, !globalThis.SharedArrayBuffer) return 6;
		var v = [];
		return a && v.length === 0 ? hn(o, l, m, h) : (o = {
			Ld: m,
			Rc: o,
			bd: h,
			rd: v
		}, a ? (o.Sc = "spawnThread", postMessage(o, v), 0) : pr(o));
	}
	function Sf(o) {
		throw Bt ||= o >>> 0, Bt;
	}
	var mn = globalThis.TextDecoder && new TextDecoder(), gn = (o, l, m, h) => {
		if (m = l + m, h) return m;
		for (; o[l] && !(l >= m);) ++l;
		return l;
	}, yn = (o, l = 0, m, h) => {
		if (16 < (m = gn(o, l >>>= 0, m, h)) - l && o.buffer && mn) return mn.decode(o.buffer instanceof ArrayBuffer ? o.subarray(l, m) : o.slice(l, m));
		for (h = ""; l < m;) {
			var v = o[l++];
			if (128 & v) {
				var k = 63 & o[l++];
				if ((224 & v) == 192) h += String.fromCharCode((31 & v) << 6 | k);
				else {
					var z = 63 & o[l++];
					65536 > (v = (240 & v) == 224 ? (15 & v) << 12 | k << 6 | z : (7 & v) << 18 | k << 12 | z << 6 | 63 & o[l++]) ? h += String.fromCharCode(v) : (v -= 65536, h += String.fromCharCode(55296 | v >> 10, 56320 | 1023 & v));
				}
			} else h += String.fromCharCode(v);
		}
		return h;
	}, Se = (o, l, m) => (o >>>= 0) ? yn((w(), Q), o, l, m) : "";
	function _n(o, l, m) {
		return a ? $e(3, 1, o, l, m) : 0;
	}
	function vn(o, l) {
		if (a) return $e(4, 1, o, l);
	}
	function bn(o, l) {
		if (a) return $e(5, 1, o, l);
	}
	function $n(o, l, m) {
		if (a) return $e(6, 1, o, l, m);
	}
	function wn(o, l, m) {
		return a ? $e(7, 1, o, l, m) : 0;
	}
	function xn(o, l) {
		if (a) return $e(8, 1, o, l);
	}
	function Sn(o, l, m) {
		if (a) return $e(9, 1, o, l, m);
	}
	function kn(o, l, m, h) {
		if (a) return $e(10, 1, o, l, m, h);
	}
	function Tn(o, l, m, h) {
		if (a) return $e(11, 1, o, l, m, h);
	}
	function In(o, l, m, h) {
		if (a) return $e(12, 1, o, l, m, h);
	}
	function En(o) {
		if (a) return $e(13, 1, o);
	}
	function zn(o, l) {
		if (a) return $e(14, 1, o, l);
	}
	function Cn(o, l, m) {
		if (a) return $e(15, 1, o, l, m);
	}
	var kf = () => V(""), Xe = (o) => {
		o >>>= 0;
		for (var l = "";;) {
			var m = (w(), Q)[o++ >>> 0];
			if (!m) return l;
			l += String.fromCharCode(m);
		}
	}, Yr = {}, Jr = {}, Tf = {}, Nt = class extends Error {
		constructor(o) {
			super(o), this.name = "BindingError";
		}
	};
	function rt(o, l, m = {}) {
		return (function(h, v, k = {}) {
			var z = v.name;
			if (!h) throw new Nt(`type "${z}" must have a positive integer typeid pointer`);
			if (Jr.hasOwnProperty(h)) {
				if (k.yd) return;
				throw new Nt(`Cannot register type '${z}' twice`);
			}
			Jr[h] = v, delete Tf[h], Yr.hasOwnProperty(h) && (v = Yr[h], delete Yr[h], v.forEach((B) => B()));
		})(o, l, m);
	}
	var An = (o, l, m) => {
		switch (l) {
			case 1: return m ? (h) => (w(), q)[h >>> 0] : (h) => (w(), Q)[h >>> 0];
			case 2: return m ? (h) => (w(), K)[h >>> 1 >>> 0] : (h) => (w(), X)[h >>> 1 >>> 0];
			case 4: return m ? (h) => (w(), R)[h >>> 2 >>> 0] : (h) => (w(), D)[h >>> 2 >>> 0];
			case 8: return m ? (h) => (w(), ee)[h >>> 3 >>> 0] : (h) => (w(), te)[h >>> 3 >>> 0];
			default: throw new TypeError(`invalid integer width (${l}): ${o}`);
		}
	};
	function If(o, l, m, h, v) {
		o >>>= 0, m >>>= 0, l = Xe(l >>> 0);
		let k = (z) => z;
		if (h = h === 0n) {
			let z = 8 * m;
			k = (B) => BigInt.asUintN(z, B), v = k(v);
		}
		rt(o, {
			name: l,
			Oc: k,
			Vc: (z, B) => (typeof B == "number" && (B = BigInt(B)), B),
			Uc: An(l, m, !h),
			Wc: null
		});
	}
	function Ef(o, l, m, h) {
		rt(o >>>= 0, {
			name: l = Xe(l >>> 0),
			Oc: function(v) {
				return !!v;
			},
			Vc: function(v, k) {
				return k ? m : h;
			},
			Uc: function(v) {
				return this.Oc((w(), Q)[v >>> 0]);
			},
			Wc: null
		});
	}
	var On = [], _t = [
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
	function ei(o) {
		9 < (o >>>= 0) && --_t[o + 1] == 0 && (_t[o] = void 0, On.push(o));
	}
	var Ue = (o) => {
		if (!o) throw new Nt(`Cannot use deleted val. handle = ${o}`);
		return _t[o];
	}, Le = (o) => {
		switch (o) {
			case void 0: return 2;
			case null: return 4;
			case !0: return 6;
			case !1: return 8;
			default:
				let l = On.pop() || _t.length;
				return _t[l] = o, _t[l + 1] = 1, l;
		}
	};
	function ti(o) {
		return this.Oc((w(), D)[o >>> 2 >>> 0]);
	}
	var zf = {
		name: "emscripten::val",
		Oc: (o) => {
			var l = Ue(o);
			return ei(o), l;
		},
		Vc: (o, l) => Le(l),
		Uc: ti,
		Wc: null
	};
	function Cf(o) {
		return rt(o >>> 0, zf);
	}
	var Af = (o, l) => {
		switch (l) {
			case 4: return function(m) {
				return this.Oc((w(), G)[m >>> 2 >>> 0]);
			};
			case 8: return function(m) {
				return this.Oc((w(), Y)[m >>> 3 >>> 0]);
			};
			default: throw new TypeError(`invalid float width (${l}): ${o}`);
		}
	};
	function Of(o, l, m) {
		m >>>= 0, rt(o >>>= 0, {
			name: l = Xe(l >>> 0),
			Oc: (h) => h,
			Vc: (h, v) => v,
			Uc: Af(l, m),
			Wc: null
		});
	}
	function Rf(o, l, m, h, v) {
		o >>>= 0, m >>>= 0, l = Xe(l >>> 0);
		let k = (B) => B;
		if (h === 0) {
			var z = 32 - 8 * m;
			k = (B) => B << z >>> z, v = k(v);
		}
		rt(o, {
			name: l,
			Oc: k,
			Vc: (B, L) => L,
			Uc: An(l, m, h !== 0),
			Wc: null
		});
	}
	function Bf(o, l, m) {
		function h(k) {
			var z = (w(), D)[k >>> 2 >>> 0];
			return k = (w(), D)[k + 4 >>> 2 >>> 0], new v((w(), q).buffer, k, z);
		}
		var v = [
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
		][l];
		rt(o >>>= 0, {
			name: m = Xe(m >>> 0),
			Oc: h,
			Uc: h
		}, { yd: !0 });
	}
	var lt = (o, l, m) => {
		var h = (w(), Q);
		if (l >>>= 0, 0 < m) {
			var v = l;
			m = l + m - 1;
			for (var k = 0; k < o.length; ++k) {
				var z = o.codePointAt(k);
				if (127 >= z) {
					if (l >= m) break;
					h[l++ >>> 0] = z;
				} else if (2047 >= z) {
					if (l + 1 >= m) break;
					h[l++ >>> 0] = 192 | z >> 6, h[l++ >>> 0] = 128 | 63 & z;
				} else if (65535 >= z) {
					if (l + 2 >= m) break;
					h[l++ >>> 0] = 224 | z >> 12, h[l++ >>> 0] = 128 | z >> 6 & 63, h[l++ >>> 0] = 128 | 63 & z;
				} else {
					if (l + 3 >= m) break;
					h[l++ >>> 0] = 240 | z >> 18, h[l++ >>> 0] = 128 | z >> 12 & 63, h[l++ >>> 0] = 128 | z >> 6 & 63, h[l++ >>> 0] = 128 | 63 & z, k++;
				}
			}
			h[l >>> 0] = 0, o = l - v;
		} else o = 0;
		return o;
	}, fr = (o) => {
		for (var l = 0, m = 0; m < o.length; ++m) {
			var h = o.charCodeAt(m);
			127 >= h ? l++ : 2047 >= h ? l += 2 : 55296 <= h && 57343 >= h ? (l += 4, ++m) : l += 3;
		}
		return l;
	};
	function Nf(o, l) {
		rt(o >>>= 0, {
			name: l = Xe(l >>> 0),
			Oc(m) {
				var h = (w(), D)[m >>> 2 >>> 0];
				return h = Se(m + 4, h, !0), Ye(m), h;
			},
			Vc(m, h) {
				h instanceof ArrayBuffer && (h = new Uint8Array(h));
				var v = typeof h == "string";
				if (!(v || ArrayBuffer.isView(h) && h.BYTES_PER_ELEMENT == 1)) throw new Nt("Cannot pass non-string to std::string");
				var k = v ? fr(h) : h.length, z = Ht(4 + k + 1), B = z + 4;
				return (w(), D)[z >>> 2 >>> 0] = k, v ? lt(h, B, k + 1) : (w(), Q).set(h, B >>> 0), m !== null && m.push(Ye, z), z;
			},
			Uc: ti,
			Wc(m) {
				Ye(m);
			}
		});
	}
	var Rn = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, Mf = (o, l, m) => {
		if (o >>>= 1, 16 < (l = gn((w(), X), o, l / 2, m)) - o && Rn) return Rn.decode((w(), X).slice(o, l));
		for (m = ""; o < l; ++o) {
			var h = (w(), X)[o >>> 0];
			m += String.fromCharCode(h);
		}
		return m;
	}, Df = (o, l, m) => {
		if (m ??= 2147483647, 2 > m) return 0;
		var h = l;
		m = (m -= 2) < 2 * o.length ? m / 2 : o.length;
		for (var v = 0; v < m; ++v) {
			var k = o.charCodeAt(v);
			(w(), K)[l >>> 1 >>> 0] = k, l += 2;
		}
		return (w(), K)[l >>> 1 >>> 0] = 0, l - h;
	}, Uf = (o) => 2 * o.length, Pf = (o, l, m) => {
		var h = "";
		o >>>= 2;
		for (var v = 0; !(v >= l / 4); v++) {
			var k = (w(), D)[o + v >>> 0];
			if (!k && !m) break;
			h += String.fromCodePoint(k);
		}
		return h;
	}, qf = (o, l, m) => {
		if (l >>>= 0, m ??= 2147483647, 4 > m) return 0;
		var h = l;
		m = h + m - 4;
		for (var v = 0; v < o.length; ++v) {
			var k = o.codePointAt(v);
			if (65535 < k && v++, (w(), R)[l >>> 2 >>> 0] = k, (l += 4) + 4 > m) break;
		}
		return (w(), R)[l >>> 2 >>> 0] = 0, l - h;
	}, Lf = (o) => {
		for (var l = 0, m = 0; m < o.length; ++m) 65535 < o.codePointAt(m) && m++, l += 4;
		return l;
	};
	function Wf(o, l, m) {
		if (o >>>= 0, l >>>= 0, m = Xe(m >>>= 0), l === 2) var h = Mf, v = Df, k = Uf;
		else h = Pf, v = qf, k = Lf;
		rt(o, {
			name: m,
			Oc: (z) => {
				var B = (w(), D)[z >>> 2 >>> 0];
				return B = h(z + 4, B * l, !0), Ye(z), B;
			},
			Vc: (z, B) => {
				if (typeof B != "string") throw new Nt(`Cannot pass non-string to C++ string type ${m}`);
				var L = k(B), W = Ht(4 + L + l);
				return (w(), D)[W >>> 2 >>> 0] = L / l, v(B, W + 4, L + l), z !== null && z.push(Ye, W), W;
			},
			Uc: ti,
			Wc(z) {
				Ye(z);
			}
		});
	}
	function Vf(o, l) {
		rt(o >>>= 0, {
			zd: !0,
			name: l = Xe(l >>> 0),
			Oc: () => {},
			Vc: () => {}
		});
	}
	function Gf(o) {
		di(o >>> 0, !i, 1, !r, 131072, !1), un();
	}
	var mr = (o) => {
		if (!C) try {
			if (o(), !(0 < Ze)) try {
				a ? wr() && pi(_) : Zr(_);
			} catch (l) {
				l instanceof be || l == "unwind" || p(0, l);
			}
		} catch (l) {
			l instanceof be || l == "unwind" || p(0, l);
		}
	}, Hf = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
	function ri(o) {
		o >>>= 0, Hf || (Atomics.waitAsync((w(), R), o >>> 2, o).value.then(gr), o += 128, Atomics.store((w(), R), o >>> 2, 1));
	}
	var gr = () => mr(() => {
		var o = wr();
		o && (ri(o), ss());
	});
	function Ff(o, l) {
		(o >>>= 0) == l >>> 0 ? setTimeout(gr) : a ? postMessage({
			Zc: o,
			Sc: "checkMailbox"
		}) : (o = yt[o]) && o.postMessage({ Sc: "checkMailbox" });
	}
	var ii = [];
	function jf(o, l, m, h, v) {
		for (l >>>= 0, v >>>= 0, ii.length = 0, m = v >>> 3, h = v + h >>> 3; m < h;) {
			var k = (w(), ee)[m++ >>> 0] ? (w(), ee)[m++ >>> 0] : (w(), Y)[m++ >>> 0];
			ii.push(k);
		}
		return (l ? mi[l] : Um[o])(...ii);
	}
	var Kf = () => {
		Ze = 0;
	};
	function Zf(o) {
		o >>>= 0, a ? postMessage({
			Sc: "cleanupThread",
			Nd: o
		}) : on(yt[o]);
	}
	function Xf(o) {}
	var yr = (o) => {
		try {
			o();
		} catch (l) {
			V(l);
		}
	};
	function Qf(o) {
		var l = (...m) => {
			_r.push(o);
			try {
				return o(...m);
			} finally {
				C || (_r.pop(), Qe && dt === 1 && _r.length === 0 && (dt = 0, Ze += 1, yr(Ks), typeof Fibers < "u" && Fibers.Zd()));
			}
		};
		return Mn.set(o, l), l;
	}
	var dt = 0, Qe = null, Bn = 0, _r = [], ai = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new Map(), Mn = /* @__PURE__ */ new Map(), Yf = 0, ni = null, Jf = [], Dn = (o) => (function(l) {
		if (!C) {
			if (dt === 0) {
				var m = !1, h = !1;
				l((v = 0) => {
					if (!C && (Bn = v, m = !0, h)) {
						dt = 2, yr(() => Zs(Qe)), typeof MainLoop < "u" && MainLoop.ud && MainLoop.resume(), v = !1;
						try {
							var k = (function() {
								var L = (w(), R)[Qe + 8 >>> 2 >>> 0];
								return L = Nn.get(L), L = Mn.get(L), --Ze, L();
							})();
						} catch (L) {
							k = L, v = !0;
						}
						var z = !1;
						if (!Qe) {
							var B = ni;
							B && (ni = null, (v ? B.reject : B.resolve)(k), z = !0);
						}
						if (v && !z) throw k;
					}
				}), h = !0, m || (dt = 1, Qe = (function() {
					var v = Ht(65548), k = v + 12;
					if ((w(), D)[v >>> 2 >>> 0] = k, (w(), D)[v + 4 >>> 2 >>> 0] = k + 65536, k = _r[0], !ai.has(k)) {
						var z = Yf++;
						ai.set(k, z), Nn.set(z, k);
					}
					return k = ai.get(k), (w(), R)[v + 8 >>> 2 >>> 0] = k, v;
				})(), typeof MainLoop < "u" && MainLoop.ud && MainLoop.pause(), yr(() => js(Qe)));
			} else dt === 2 ? (dt = 0, yr(Xs), Ye(Qe), Qe = null, Jf.forEach(mr)) : V(`invalid state: ${dt}`);
			return Bn;
		}
	})((l) => {
		o().then(l);
	});
	function em(o) {
		return o >>>= 0, Dn(async () => Le(await Ue(o)));
	}
	var si = [], tm = (o) => {
		var l = si.length;
		return si.push(o), l;
	}, rm = (o, l) => {
		for (var m = Array(o), h = 0; h < o; ++h) {
			var v = h, k = (w(), D)[l + 4 * h >>> 2 >>> 0], z = Jr[k];
			if (z === void 0) throw o = `parameter ${h}`, k = es(k), l = Xe(k), Ye(k), new Nt(`${o} has unknown type ${l}`);
			m[v] = z;
		}
		return m;
	}, im = (o, l, m) => {
		var h = [];
		return o = o(h, m), h.length && ((w(), D)[l >>> 2 >>> 0] = Le(h)), o;
	}, am = {}, vr = (o) => {
		var l = am[o];
		return l === void 0 ? Xe(o) : l;
	};
	function nm(o, l, m) {
		var [h, ...v] = rm(o, l >>> 0);
		l = h.Vc.bind(h);
		var k = v.map((L) => L.Uc.bind(L));
		o--;
		var z = { toValue: Ue };
		switch (o = k.map((L, W) => {
			var ae = `argFromPtr${W}`;
			return z[ae] = L, `${ae}(args${W ? "+" + 8 * W : ""})`;
		}), m) {
			case 0:
				var B = "toValue(handle)";
				break;
			case 2:
				B = "new (toValue(handle))";
				break;
			case 3:
				B = "";
				break;
			case 1: z.getStringOrSymbol = vr, B = "toValue(handle)[getStringOrSymbol(methodName)]";
		}
		return B += `(${o})`, h.zd || (z.toReturnWire = l, z.emval_returnValue = im, B = `return emval_returnValue(toReturnWire, destructorsRef, ${B})`), B = `return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`, m = new Function(Object.keys(z), B)(...Object.values(z)), B = `methodCaller<(${v.map((L) => L.name)}) => ${h.name}>`, tm(Object.defineProperty(m, "name", { value: B }));
	}
	function sm(o, l) {
		return l >>>= 0, (o = Ue(o >>> 0)) == Ue(l);
	}
	function om(o) {
		return (o >>>= 0) ? (o = vr(o), Le(globalThis[o])) : Le(globalThis);
	}
	function um(o) {
		return o = vr(o >>> 0), Le(t[o]);
	}
	function lm(o, l) {
		return l >>>= 0, o = Ue(o >>> 0), l = Ue(l), Le(o[l]);
	}
	function dm(o) {
		9 < (o >>>= 0) && (_t[o + 1] += 1);
	}
	function Un(o, l, m, h, v) {
		return si[o >>> 0](l >>> 0, m >>> 0, h >>> 0, v >>> 0);
	}
	function pm(o, l, m, h, v) {
		return Un(o >>> 0, l >>> 0, m >>> 0, h >>> 0, v >>> 0);
	}
	function cm() {
		return Le([]);
	}
	function hm(o) {
		o = Ue(o >>> 0);
		for (var l = Array(o.length), m = 0; m < o.length; m++) l[m] = o[m];
		return Le(l);
	}
	function fm(o) {
		return Le(vr(o >>> 0));
	}
	function mm() {
		return Le({});
	}
	function gm(o) {
		for (var l = Ue(o >>>= 0); l.length;) {
			var m = l.pop();
			l.pop()(m);
		}
		ei(o);
	}
	function ym(o, l, m) {
		l >>>= 0, m >>>= 0, o = Ue(o >>> 0), l = Ue(l), m = Ue(m), o[l] = m;
	}
	function _m(o, l) {
		o = -9007199254740992 > o || 9007199254740992 < o ? NaN : Number(o), l >>>= 0, o = /* @__PURE__ */ new Date(1e3 * o), (w(), R)[l >>> 2 >>> 0] = o.getUTCSeconds(), (w(), R)[l + 4 >>> 2 >>> 0] = o.getUTCMinutes(), (w(), R)[l + 8 >>> 2 >>> 0] = o.getUTCHours(), (w(), R)[l + 12 >>> 2 >>> 0] = o.getUTCDate(), (w(), R)[l + 16 >>> 2 >>> 0] = o.getUTCMonth(), (w(), R)[l + 20 >>> 2 >>> 0] = o.getUTCFullYear() - 1900, (w(), R)[l + 24 >>> 2 >>> 0] = o.getUTCDay(), o = (o.getTime() - Date.UTC(o.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (w(), R)[l + 28 >>> 2 >>> 0] = o;
	}
	var Pn = (o) => o % 4 == 0 && (o % 100 != 0 || o % 400 == 0), qn = [
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
	], Ln = [
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
	function vm(o, l) {
		o = -9007199254740992 > o || 9007199254740992 < o ? NaN : Number(o), l >>>= 0, o = /* @__PURE__ */ new Date(1e3 * o), (w(), R)[l >>> 2 >>> 0] = o.getSeconds(), (w(), R)[l + 4 >>> 2 >>> 0] = o.getMinutes(), (w(), R)[l + 8 >>> 2 >>> 0] = o.getHours(), (w(), R)[l + 12 >>> 2 >>> 0] = o.getDate(), (w(), R)[l + 16 >>> 2 >>> 0] = o.getMonth(), (w(), R)[l + 20 >>> 2 >>> 0] = o.getFullYear() - 1900, (w(), R)[l + 24 >>> 2 >>> 0] = o.getDay();
		var m = (Pn(o.getFullYear()) ? qn : Ln)[o.getMonth()] + o.getDate() - 1 | 0;
		(w(), R)[l + 28 >>> 2 >>> 0] = m, (w(), R)[l + 36 >>> 2 >>> 0] = -60 * o.getTimezoneOffset(), m = new Date(o.getFullYear(), 6, 1).getTimezoneOffset();
		var h = new Date(o.getFullYear(), 0, 1).getTimezoneOffset();
		o = 0 | (m != h && o.getTimezoneOffset() == Math.min(h, m)), (w(), R)[l + 32 >>> 2 >>> 0] = o;
	}
	function bm(o) {
		o >>>= 0;
		var l = new Date((w(), R)[o + 20 >>> 2 >>> 0] + 1900, (w(), R)[o + 16 >>> 2 >>> 0], (w(), R)[o + 12 >>> 2 >>> 0], (w(), R)[o + 8 >>> 2 >>> 0], (w(), R)[o + 4 >>> 2 >>> 0], (w(), R)[o >>> 2 >>> 0], 0), m = (w(), R)[o + 32 >>> 2 >>> 0], h = l.getTimezoneOffset(), v = new Date(l.getFullYear(), 6, 1).getTimezoneOffset(), k = new Date(l.getFullYear(), 0, 1).getTimezoneOffset(), z = Math.min(k, v);
		return 0 > m ? (w(), R)[o + 32 >>> 2 >>> 0] = +(v != k && z == h) : 0 < m != (z == h) && (v = Math.max(k, v), l.setTime(l.getTime() + 6e4 * ((0 < m ? z : v) - h))), (w(), R)[o + 24 >>> 2 >>> 0] = l.getDay(), m = (Pn(l.getFullYear()) ? qn : Ln)[l.getMonth()] + l.getDate() - 1 | 0, (w(), R)[o + 28 >>> 2 >>> 0] = m, (w(), R)[o >>> 2 >>> 0] = l.getSeconds(), (w(), R)[o + 4 >>> 2 >>> 0] = l.getMinutes(), (w(), R)[o + 8 >>> 2 >>> 0] = l.getHours(), (w(), R)[o + 12 >>> 2 >>> 0] = l.getDate(), (w(), R)[o + 16 >>> 2 >>> 0] = l.getMonth(), (w(), R)[o + 20 >>> 2 >>> 0] = l.getYear(), o = l.getTime(), BigInt(isNaN(o) ? -1 : o / 1e3);
	}
	function Wn(o, l, m, h, v, k, z) {
		return a ? $e(16, 1, o, l, m, h, v, k, z) : -52;
	}
	function Vn(o, l, m, h, v, k) {
		if (a) return $e(17, 1, o, l, m, h, v, k);
	}
	var Gt = {}, $m = () => performance.timeOrigin + performance.now();
	function Gn(o, l) {
		return a ? $e(18, 1, o, l) : (Gt[o] && (clearTimeout(Gt[o].id), delete Gt[o]), l && (Gt[o] = {
			id: setTimeout(() => {
				delete Gt[o], mr(() => ns(o, performance.timeOrigin + performance.now()));
			}, l),
			Yd: l
		}), 0);
	}
	function wm(o, l, m, h) {
		o >>>= 0, l >>>= 0, m >>>= 0, h >>>= 0;
		var v = (/* @__PURE__ */ new Date()).getFullYear(), k = new Date(v, 0, 1).getTimezoneOffset();
		v = new Date(v, 6, 1).getTimezoneOffset();
		var z = Math.max(k, v);
		(w(), D)[o >>> 2 >>> 0] = 60 * z, (w(), R)[l >>> 2 >>> 0] = +(k != v), o = (l = (B) => {
			var L = Math.abs(B);
			return `UTC${0 <= B ? "-" : "+"}${String(Math.floor(L / 60)).padStart(2, "0")}${String(L % 60).padStart(2, "0")}`;
		})(k), l = l(v), v < k ? (lt(o, m, 17), lt(l, h, 17)) : (lt(o, h, 17), lt(l, m, 17));
	}
	var xm = () => Date.now(), Sm = 1;
	function km(o, l, m) {
		if (m >>>= 0, !(0 <= o && 3 >= o)) return 28;
		if (o === 0) o = Date.now();
		else {
			if (!Sm) return 52;
			o = performance.timeOrigin + performance.now();
		}
		return o = Math.round(1e6 * o), (w(), ee)[m >>> 3 >>> 0] = BigInt(o), 0;
	}
	var oi = [], Hn = (o, l) => {
		oi.length = 0;
		for (var m; m = (w(), Q)[o++ >>> 0];) {
			var h = m != 105;
			l += (h &= m != 112) && l % 8 ? 4 : 0, oi.push(m == 112 ? (w(), D)[l >>> 2 >>> 0] : m == 106 ? (w(), ee)[l >>> 3 >>> 0] : m == 105 ? (w(), R)[l >>> 2 >>> 0] : (w(), Y)[l >>> 3 >>> 0]), l += h ? 8 : 4;
		}
		return oi;
	};
	function Tm(o, l, m) {
		return o >>>= 0, l = Hn(l >>> 0, m >>> 0), mi[o](...l);
	}
	function Im(o, l, m) {
		return o >>>= 0, l = Hn(l >>> 0, m >>> 0), mi[o](...l);
	}
	var Em = () => {};
	function zm(o, l) {
		return E(Se(o >>> 0, l >>> 0));
	}
	var Cm = () => {
		throw Ze += 1, "unwind";
	};
	function Am() {
		return 4294901760;
	}
	var Om = () => navigator.hardwareConcurrency, vt = {}, br = (o) => {
		var l;
		return (l = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o)) ? +l[1] : (l = /:(\d+):\d+(?:\)|$)/.exec(o)) ? 2147483648 | +l[1] : 0;
	}, Fn = (o) => {
		for (var l of o) (o = br(l)) && (vt[o] = l);
	};
	function Rm() {
		var o = Error().stack.toString().split(`
`);
		return o[0] == "Error" && o.shift(), Fn(o), vt.gd = br(o[3]), vt.Jd = o, vt.gd;
	}
	function $r(o) {
		if (!(o = vt[o >>> 0])) return 0;
		var l;
		if (l = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o)) o = l[1];
		else if (l = /^\s+at (.*) \(.*\)$/.exec(o)) o = l[1];
		else {
			if (!(l = /^(.+?)@/.exec(o))) return 0;
			o = l[1];
		}
		Ye($r.hd ?? 0), l = fr(o) + 1;
		var m = Ht(l);
		return m && lt(o, m, l), $r.hd = m, $r.hd;
	}
	function Bm(o) {
		o >>>= 0;
		var l = (w(), Q).length;
		if (o <= l || 4294901760 < o) return !1;
		for (var m = 1; 4 >= m; m *= 2) {
			var h = l * (1 + .2 / m);
			h = Math.min(h, o + 100663296);
			e: {
				h = (Math.min(4294901760, 65536 * Math.ceil(Math.max(o, h) / 65536)) - ut.buffer.byteLength + 65535) / 65536 | 0;
				try {
					ut.grow(h), oe();
					var v = 1;
					break e;
				} catch {}
				v = void 0;
			}
			if (v) return !0;
		}
		return !1;
	}
	function Nm(o, l, m) {
		if (o >>>= 0, l >>>= 0, vt.gd == o) var h = vt.Jd;
		else (h = Error().stack.toString().split(`
`))[0] == "Error" && h.shift(), Fn(h);
		for (var v = 3; h[v] && br(h[v]) != o;) ++v;
		for (o = 0; o < m && h[o + v]; ++o) (w(), R)[l + 4 * o >>> 2 >>> 0] = br(h[o + v]);
		return o;
	}
	var ui, li = {}, jn = () => {
		if (!ui) {
			var o, l = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
				_: "./this.program"
			};
			for (o in li) li[o] === void 0 ? delete l[o] : l[o] = li[o];
			var m = [];
			for (o in l) m.push(`${o}=${l[o]}`);
			ui = m;
		}
		return ui;
	};
	function Kn(o, l) {
		if (a) return $e(19, 1, o, l);
		o >>>= 0, l >>>= 0;
		var m, h = 0, v = 0;
		for (m of jn()) {
			var k = l + h;
			(w(), D)[o + v >>> 2 >>> 0] = k, h += lt(m, k, Infinity) + 1, v += 4;
		}
		return 0;
	}
	function Zn(o, l) {
		if (a) return $e(20, 1, o, l);
		o >>>= 0, l >>>= 0;
		var m = jn();
		for (var h of ((w(), D)[o >>> 2 >>> 0] = m.length, o = 0, m)) o += fr(h) + 1;
		return (w(), D)[l >>> 2 >>> 0] = o, 0;
	}
	function Xn(o) {
		return a ? $e(21, 1, o) : 52;
	}
	function Qn(o, l, m, h) {
		return a ? $e(22, 1, o, l, m, h) : 52;
	}
	function Yn(o, l, m, h) {
		return a ? $e(23, 1, o, l, m, h) : 70;
	}
	var Mm = [
		null,
		[],
		[]
	];
	function Jn(o, l, m, h) {
		if (a) return $e(24, 1, o, l, m, h);
		l >>>= 0, m >>>= 0, h >>>= 0;
		for (var v = 0, k = 0; k < m; k++) {
			var z = (w(), D)[l >>> 2 >>> 0], B = (w(), D)[l + 4 >>> 2 >>> 0];
			l += 8;
			for (var L = 0; L < B; L++) {
				var W = o, ae = (w(), Q)[z + L >>> 0], ce = Mm[W];
				ae === 0 || ae === 10 ? ((W === 1 ? I : E)(yn(ce)), ce.length = 0) : ce.push(ae);
			}
			v += B;
		}
		return (w(), D)[h >>> 2 >>> 0] = v, 0;
	}
	function Dm(o) {
		return o >>> 0;
	}
	a || (function() {
		for (var o = t.numThreads - 1; o--;) dn();
		pe.push(async () => {
			var l = (async function() {
				if (!a) return Promise.all(ot.map(ln));
			})();
			ke++, await l, --ke == 0 && Oe && (l = Oe, Oe = null, l());
		});
	})(), a || (ut = new WebAssembly.Memory({
		initial: 256,
		maximum: 65536,
		shared: !0
	}), oe()), t.wasmBinary && (g = t.wasmBinary), t.stackSave = () => ue(), t.stackRestore = (o) => se(o), t.stackAlloc = (o) => ci(o), t.setValue = function(o, l, m = "i8") {
		switch (m.endsWith("*") && (m = "*"), m) {
			case "i1":
			case "i8":
				(w(), q)[o >>> 0] = l;
				break;
			case "i16":
				(w(), K)[o >>> 1 >>> 0] = l;
				break;
			case "i32":
				(w(), R)[o >>> 2 >>> 0] = l;
				break;
			case "i64":
				(w(), ee)[o >>> 3 >>> 0] = BigInt(l);
				break;
			case "float":
				(w(), G)[o >>> 2 >>> 0] = l;
				break;
			case "double":
				(w(), Y)[o >>> 3 >>> 0] = l;
				break;
			case "*":
				(w(), D)[o >>> 2 >>> 0] = l;
				break;
			default: V(`invalid type for setValue: ${m}`);
		}
	}, t.getValue = function(o, l = "i8") {
		switch (l.endsWith("*") && (l = "*"), l) {
			case "i1":
			case "i8": return (w(), q)[o >>> 0];
			case "i16": return (w(), K)[o >>> 1 >>> 0];
			case "i32": return (w(), R)[o >>> 2 >>> 0];
			case "i64": return (w(), ee)[o >>> 3 >>> 0];
			case "float": return (w(), G)[o >>> 2 >>> 0];
			case "double": return (w(), Y)[o >>> 3 >>> 0];
			case "*": return (w(), D)[o >>> 2 >>> 0];
			default: V(`invalid type for getValue: ${l}`);
		}
	}, t.UTF8ToString = Se, t.stringToUTF8 = lt, t.lengthBytesUTF8 = fr;
	var es, ts, wr, Ye, Ht, di, rs, is, as, pi, ns, ss, le, Ft, os, se, ci, ue, us, hi, ls, ds, ps, fi, cs, hs, fs, ms, gs, ys, _s, vs, bs, $s, ws, xs, Ss, ks, Ts, Is, Es, zs, Cs, As, Os, Rs, Bs, Ns, Ms, Ds, Us, Ps, qs, Ls, Ws, Vs, Gs, Hs, Fs, js, Ks, Zs, Xs, it, Um = [
		Kr,
		nn,
		hn,
		_n,
		vn,
		bn,
		$n,
		wn,
		xn,
		Sn,
		kn,
		Tn,
		In,
		En,
		zn,
		Cn,
		Wn,
		Vn,
		Gn,
		Kn,
		Zn,
		Xn,
		Qn,
		Yn,
		Jn
	], mi = {
		967452: (o, l, m, h, v) => {
			if (t === void 0 || !t.Xc) return 1;
			if ((o = Se(Number(o >>> 0))).startsWith("./") && (o = o.substring(2)), !(o = t.Xc.get(o))) return 2;
			if (l = Number(l >>> 0), m = Number(m >>> 0), h = Number(h >>> 0), l + m > o.byteLength) return 3;
			try {
				let k = o.subarray(l, l + m);
				switch (v) {
					case 0:
						(w(), Q).set(k, h >>> 0);
						break;
					case 1:
						t.Qd ? t.Qd(h, k) : t.Id(h, k);
						break;
					default: return 4;
				}
				return 0;
			} catch {
				return 4;
			}
		},
		968276: (o, l, m) => {
			t.td(o, (w(), Q).subarray(l >>> 0, l + m >>> 0));
		},
		968340: () => t.Wd(),
		968382: (o) => {
			t.sd(o);
		},
		968419: () => {
			t.Bd();
		},
		968450: () => {
			t.Cd();
		},
		968479: () => {
			t.Gd();
		},
		968504: (o) => t.Ad(o),
		968537: (o) => t.Ed(o),
		968569: (o, l, m) => {
			t.ed(Number(o), Number(l), Number(m), !0);
		},
		968632: (o, l, m) => {
			t.ed(Number(o), Number(l), Number(m));
		},
		968689: () => typeof wasmOffsetConverter < "u",
		968746: (o) => {
			t.$b("Abs", o, void 0);
		},
		968797: (o) => {
			t.$b("Neg", o, void 0);
		},
		968848: (o) => {
			t.$b("Floor", o, void 0);
		},
		968901: (o) => {
			t.$b("Ceil", o, void 0);
		},
		968953: (o) => {
			t.$b("Reciprocal", o, void 0);
		},
		969011: (o) => {
			t.$b("Sqrt", o, void 0);
		},
		969063: (o) => {
			t.$b("Exp", o, void 0);
		},
		969114: (o) => {
			t.$b("Erf", o, void 0);
		},
		969165: (o) => {
			t.$b("Sigmoid", o, void 0);
		},
		969220: (o, l, m) => {
			t.$b("HardSigmoid", o, {
				alpha: l,
				beta: m
			});
		},
		969299: (o) => {
			t.$b("Log", o, void 0);
		},
		969350: (o) => {
			t.$b("Sin", o, void 0);
		},
		969401: (o) => {
			t.$b("Cos", o, void 0);
		},
		969452: (o) => {
			t.$b("Tan", o, void 0);
		},
		969503: (o) => {
			t.$b("Asin", o, void 0);
		},
		969555: (o) => {
			t.$b("Acos", o, void 0);
		},
		969607: (o) => {
			t.$b("Atan", o, void 0);
		},
		969659: (o) => {
			t.$b("Sinh", o, void 0);
		},
		969711: (o) => {
			t.$b("Cosh", o, void 0);
		},
		969763: (o) => {
			t.$b("Asinh", o, void 0);
		},
		969816: (o) => {
			t.$b("Acosh", o, void 0);
		},
		969869: (o) => {
			t.$b("Atanh", o, void 0);
		},
		969922: (o) => {
			t.$b("Tanh", o, void 0);
		},
		969974: (o) => {
			t.$b("Not", o, void 0);
		},
		970025: (o, l, m) => {
			t.$b("Clip", o, {
				min: l,
				max: m
			});
		},
		970094: (o) => {
			t.$b("Clip", o, void 0);
		},
		970146: (o, l) => {
			t.$b("Elu", o, { alpha: l });
		},
		970204: (o) => {
			t.$b("Gelu", o, void 0);
		},
		970256: (o) => {
			t.$b("Relu", o, void 0);
		},
		970308: (o, l) => {
			t.$b("LeakyRelu", o, { alpha: l });
		},
		970372: (o, l) => {
			t.$b("ThresholdedRelu", o, { alpha: l });
		},
		970442: (o, l) => {
			t.$b("Cast", o, { to: l });
		},
		970500: (o) => {
			t.$b("Add", o, void 0);
		},
		970551: (o) => {
			t.$b("Sub", o, void 0);
		},
		970602: (o) => {
			t.$b("Mul", o, void 0);
		},
		970653: (o) => {
			t.$b("Div", o, void 0);
		},
		970704: (o) => {
			t.$b("Pow", o, void 0);
		},
		970755: (o) => {
			t.$b("Equal", o, void 0);
		},
		970808: (o) => {
			t.$b("Greater", o, void 0);
		},
		970863: (o) => {
			t.$b("GreaterOrEqual", o, void 0);
		},
		970925: (o) => {
			t.$b("Less", o, void 0);
		},
		970977: (o) => {
			t.$b("LessOrEqual", o, void 0);
		},
		971036: (o, l, m, h, v) => {
			t.$b("ReduceMean", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		971211: (o, l, m, h, v) => {
			t.$b("ReduceMax", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		971385: (o, l, m, h, v) => {
			t.$b("ReduceMin", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		971559: (o, l, m, h, v) => {
			t.$b("ReduceProd", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		971734: (o, l, m, h, v) => {
			t.$b("ReduceSum", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		971908: (o, l, m, h, v) => {
			t.$b("ReduceL1", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		972081: (o, l, m, h, v) => {
			t.$b("ReduceL2", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		972254: (o, l, m, h, v) => {
			t.$b("ReduceLogSum", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		972431: (o, l, m, h, v) => {
			t.$b("ReduceSumSquare", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		972611: (o, l, m, h, v) => {
			t.$b("ReduceLogSumExp", o, {
				keepDims: !!l,
				noopWithEmptyAxes: !!m,
				axes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		972791: (o) => {
			t.$b("Where", o, void 0);
		},
		972844: (o, l, m) => {
			t.$b("Transpose", o, { perm: l ? Array.from((w(), R).subarray(Number(l) >>> 0, Number(m) >>> 0)) : [] });
		},
		972968: (o, l, m, h) => {
			t.$b("DepthToSpace", o, {
				blocksize: l,
				mode: Se(m),
				format: h ? "NHWC" : "NCHW"
			});
		},
		973101: (o, l, m, h) => {
			t.$b("DepthToSpace", o, {
				blocksize: l,
				mode: Se(m),
				format: h ? "NHWC" : "NCHW"
			});
		},
		973234: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e, pt) => {
			t.$b("ConvTranspose", o, {
				format: L ? "NHWC" : "NCHW",
				autoPad: l,
				dilations: [m],
				group: h,
				kernelShape: [v],
				pads: [k, z],
				strides: [B],
				wIsConst: () => !!(w(), q)[W >>> 0],
				outputPadding: ae ? Array.from((w(), R).subarray(Number(ae) >>> 0, Number(ce) >>> 0)) : [],
				outputShape: ge ? Array.from((w(), R).subarray(Number(ge) >>> 0, Number(_e) >>> 0)) : [],
				activation: Se(pt)
			});
		},
		973667: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("ConvTranspose", o, {
				format: B ? "NHWC" : "NCHW",
				autoPad: l,
				dilations: Array.from((w(), R).subarray(Number(m) >>> 0, 2 + (Number(m) >>> 0) >>> 0)),
				group: h,
				kernelShape: Array.from((w(), R).subarray(Number(v) >>> 0, 2 + (Number(v) >>> 0) >>> 0)),
				pads: Array.from((w(), R).subarray(Number(k) >>> 0, 4 + (Number(k) >>> 0) >>> 0)),
				strides: Array.from((w(), R).subarray(Number(z) >>> 0, 2 + (Number(z) >>> 0) >>> 0)),
				wIsConst: () => !!(w(), q)[L >>> 0],
				outputPadding: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				outputShape: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : [],
				activation: Se(_e)
			});
		},
		974328: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e, pt) => {
			t.$b("ConvTranspose", o, {
				format: L ? "NHWC" : "NCHW",
				autoPad: l,
				dilations: [m],
				group: h,
				kernelShape: [v],
				pads: [k, z],
				strides: [B],
				wIsConst: () => !!(w(), q)[W >>> 0],
				outputPadding: ae ? Array.from((w(), R).subarray(Number(ae) >>> 0, Number(ce) >>> 0)) : [],
				outputShape: ge ? Array.from((w(), R).subarray(Number(ge) >>> 0, Number(_e) >>> 0)) : [],
				activation: Se(pt)
			});
		},
		974761: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("ConvTranspose", o, {
				format: B ? "NHWC" : "NCHW",
				autoPad: l,
				dilations: Array.from((w(), R).subarray(Number(m) >>> 0, 2 + (Number(m) >>> 0) >>> 0)),
				group: h,
				kernelShape: Array.from((w(), R).subarray(Number(v) >>> 0, 2 + (Number(v) >>> 0) >>> 0)),
				pads: Array.from((w(), R).subarray(Number(k) >>> 0, 4 + (Number(k) >>> 0) >>> 0)),
				strides: Array.from((w(), R).subarray(Number(z) >>> 0, 2 + (Number(z) >>> 0) >>> 0)),
				wIsConst: () => !!(w(), q)[L >>> 0],
				outputPadding: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				outputShape: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : [],
				activation: Se(_e)
			});
		},
		975422: (o, l) => {
			t.$b("GlobalAveragePool", o, { format: l ? "NHWC" : "NCHW" });
		},
		975513: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("AveragePool", o, {
				format: _e ? "NHWC" : "NCHW",
				auto_pad: l,
				ceil_mode: m,
				count_include_pad: h,
				storage_order: v,
				dilations: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [],
				kernel_shape: B ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
				pads: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				strides: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
			});
		},
		975992: (o, l) => {
			t.$b("GlobalAveragePool", o, { format: l ? "NHWC" : "NCHW" });
		},
		976083: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("AveragePool", o, {
				format: _e ? "NHWC" : "NCHW",
				auto_pad: l,
				ceil_mode: m,
				count_include_pad: h,
				storage_order: v,
				dilations: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [],
				kernel_shape: B ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
				pads: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				strides: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
			});
		},
		976562: (o, l) => {
			t.$b("GlobalMaxPool", o, { format: l ? "NHWC" : "NCHW" });
		},
		976649: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("MaxPool", o, {
				format: _e ? "NHWC" : "NCHW",
				auto_pad: l,
				ceil_mode: m,
				count_include_pad: h,
				storage_order: v,
				dilations: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [],
				kernel_shape: B ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
				pads: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				strides: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
			});
		},
		977124: (o, l) => {
			t.$b("GlobalMaxPool", o, { format: l ? "NHWC" : "NCHW" });
		},
		977211: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e) => {
			t.$b("MaxPool", o, {
				format: _e ? "NHWC" : "NCHW",
				auto_pad: l,
				ceil_mode: m,
				count_include_pad: h,
				storage_order: v,
				dilations: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [],
				kernel_shape: B ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
				pads: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				strides: ce ? Array.from((w(), R).subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
			});
		},
		977686: (o, l, m, h, v) => {
			t.$b("Gemm", o, {
				alpha: l,
				beta: m,
				transA: h,
				transB: v
			});
		},
		977790: (o) => {
			t.$b("MatMul", o, void 0);
		},
		977844: (o, l, m, h) => {
			t.$b("ArgMax", o, {
				keepDims: !!l,
				selectLastIndex: !!m,
				axis: h
			});
		},
		977952: (o, l, m, h) => {
			t.$b("ArgMin", o, {
				keepDims: !!l,
				selectLastIndex: !!m,
				axis: h
			});
		},
		978060: (o, l) => {
			t.$b("Softmax", o, { axis: l });
		},
		978123: (o, l) => {
			t.$b("Concat", o, { axis: l });
		},
		978183: (o, l, m, h, v) => {
			t.$b("Split", o, {
				axis: l,
				numOutputs: m,
				splitSizes: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		978339: (o) => {
			t.$b("Expand", o, void 0);
		},
		978393: (o, l) => {
			t.$b("Gather", o, { axis: Number(l) });
		},
		978464: (o, l) => {
			t.$b("GatherElements", o, { axis: Number(l) });
		},
		978543: (o, l) => {
			t.$b("GatherND", o, { batch_dims: Number(l) });
		},
		978622: (o, l, m, h, v, k, z, B, L, W, ae) => {
			t.$b("Resize", o, {
				antialias: l,
				axes: m ? Array.from((w(), R).subarray(Number(m) >>> 0, Number(h) >>> 0)) : [],
				coordinateTransformMode: Se(v),
				cubicCoeffA: k,
				excludeOutside: z,
				extrapolationValue: B,
				keepAspectRatioPolicy: Se(L),
				mode: Se(W),
				nearestMode: Se(ae)
			});
		},
		978984: (o, l, m, h, v, k, z) => {
			t.$b("Slice", o, {
				starts: l ? Array.from((w(), R).subarray(Number(l) >>> 0, Number(m) >>> 0)) : [],
				ends: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : [],
				axes: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : []
			});
		},
		979248: (o) => {
			t.$b("Tile", o, void 0);
		},
		979300: (o, l, m) => {
			t.$b("InstanceNormalization", o, {
				epsilon: l,
				format: m ? "NHWC" : "NCHW"
			});
		},
		979414: (o, l, m) => {
			t.$b("InstanceNormalization", o, {
				epsilon: l,
				format: m ? "NHWC" : "NCHW"
			});
		},
		979528: (o) => {
			t.$b("Range", o, void 0);
		},
		979581: (o, l) => {
			t.$b("Einsum", o, { equation: Se(l) });
		},
		979662: (o, l, m, h, v) => {
			t.$b("Pad", o, {
				mode: l,
				value: m,
				pads: h ? Array.from((w(), R).subarray(Number(h) >>> 0, Number(v) >>> 0)) : []
			});
		},
		979805: (o, l, m, h, v, k) => {
			t.$b("BatchNormalization", o, {
				epsilon: l,
				momentum: m,
				spatial: !!v,
				trainingMode: !!h,
				format: k ? "NHWC" : "NCHW"
			});
		},
		979974: (o, l, m, h, v, k) => {
			t.$b("BatchNormalization", o, {
				epsilon: l,
				momentum: m,
				spatial: !!v,
				trainingMode: !!h,
				format: k ? "NHWC" : "NCHW"
			});
		},
		980143: (o, l, m) => {
			t.$b("CumSum", o, {
				exclusive: Number(l),
				reverse: Number(m)
			});
		},
		980240: (o, l, m) => {
			t.$b("DequantizeLinear", o, {
				axis: l,
				blockSize: m
			});
		},
		980330: (o, l, m, h, v) => {
			t.$b("GridSample", o, {
				align_corners: l,
				mode: Se(m),
				padding_mode: Se(h),
				format: v ? "NHWC" : "NCHW"
			});
		},
		980500: (o, l, m, h, v) => {
			t.$b("GridSample", o, {
				align_corners: l,
				mode: Se(m),
				padding_mode: Se(h),
				format: v ? "NHWC" : "NCHW"
			});
		},
		980670: (o, l) => {
			t.$b("ScatterND", o, { reduction: Se(l) });
		},
		980755: (o, l, m, h, v, k, z, B, L) => {
			t.$b("Attention", o, {
				numHeads: l,
				isUnidirectional: m,
				maskFilterValue: h,
				scale: v,
				doRotary: k,
				qkvHiddenSizes: z ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(B) + z >>> 0)) : [],
				pastPresentShareBuffer: !!L
			});
		},
		981027: (o) => {
			t.$b("BiasAdd", o, void 0);
		},
		981082: (o) => {
			t.$b("BiasSplitGelu", o, void 0);
		},
		981143: (o) => {
			t.$b("FastGelu", o, void 0);
		},
		981199: (o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e, pt, gi) => {
			t.$b("Conv", o, {
				format: ce ? "NHWC" : "NCHW",
				auto_pad: l,
				dilations: m ? Array.from((w(), R).subarray(Number(m) >>> 0, Number(h) >>> 0)) : [],
				group: v,
				kernel_shape: k ? Array.from((w(), R).subarray(Number(k) >>> 0, Number(z) >>> 0)) : [],
				pads: B ? Array.from((w(), R).subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
				strides: W ? Array.from((w(), R).subarray(Number(W) >>> 0, Number(ae) >>> 0)) : [],
				w_is_const: () => !!(w(), q)[Number(ge) >>> 0],
				activation: Se(_e),
				activation_params: pt ? Array.from((w(), G).subarray(Number(pt) >>> 0, Number(gi) >>> 0)) : []
			});
		},
		981783: (o) => {
			t.$b("Gelu", o, void 0);
		},
		981835: (o, l, m, h, v, k, z, B, L) => {
			t.$b("GroupQueryAttention", o, {
				numHeads: l,
				kvNumHeads: m,
				scale: h,
				softcap: v,
				doRotary: k,
				rotaryInterleaved: z,
				smoothSoftmax: B,
				localWindowSize: L
			});
		},
		982052: (o, l, m, h) => {
			t.$b("LayerNormalization", o, {
				axis: l,
				epsilon: m,
				simplified: !!h
			});
		},
		982163: (o, l, m, h) => {
			t.$b("LayerNormalization", o, {
				axis: l,
				epsilon: m,
				simplified: !!h
			});
		},
		982274: (o, l, m, h, v, k) => {
			t.$b("MatMulNBits", o, {
				k: l,
				n: m,
				accuracyLevel: h,
				bits: v,
				blockSize: k
			});
		},
		982401: (o, l, m, h, v, k) => {
			t.$b("MultiHeadAttention", o, {
				numHeads: l,
				isUnidirectional: m,
				maskFilterValue: h,
				scale: v,
				doRotary: k
			});
		},
		982560: (o, l) => {
			t.$b("QuickGelu", o, { alpha: l });
		},
		982624: (o, l, m, h, v) => {
			t.$b("RotaryEmbedding", o, {
				interleaved: !!l,
				numHeads: m,
				rotaryEmbeddingDim: h,
				scale: v
			});
		},
		982763: (o, l, m) => {
			t.$b("SkipLayerNormalization", o, {
				epsilon: l,
				simplified: !!m
			});
		},
		982865: (o, l, m) => {
			t.$b("SkipLayerNormalization", o, {
				epsilon: l,
				simplified: !!m
			});
		},
		982967: (o, l, m, h) => {
			t.$b("GatherBlockQuantized", o, {
				gatherAxis: l,
				quantizeAxis: m,
				blockSize: h
			});
		},
		983088: (o) => {
			t.Fd(o);
		},
		983122: (o, l) => t.Hd(Number(o), Number(l), t.Yc.Kd, t.Yc.errors)
	};
	function Pm(o, l, m) {
		return Dn(async () => {
			await t.Dd(Number(o), Number(l), Number(m));
		});
	}
	function qm() {
		return typeof wasmOffsetConverter < "u";
	}
	function Lm(o, l, m, h) {
		var v = ue();
		try {
			return vs(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function Wm(o, l, m) {
		var h = ue();
		try {
			return ms(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			le(1, 0);
		}
	}
	function Vm(o) {
		var l = ue();
		try {
			cs(o);
		} catch (m) {
			if (se(l), m !== m + 0) throw m;
			le(1, 0);
		}
	}
	function Gm(o, l) {
		var m = ue();
		try {
			return fi(o, l);
		} catch (h) {
			if (se(m), h !== h + 0) throw h;
			le(1, 0);
		}
	}
	function Hm(o, l, m) {
		var h = ue();
		try {
			ps(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			le(1, 0);
		}
	}
	function Fm(o, l) {
		var m = ue();
		try {
			bs(o, l);
		} catch (h) {
			if (se(m), h !== h + 0) throw h;
			le(1, 0);
		}
	}
	function jm(o, l, m, h, v, k, z) {
		var B = ue();
		try {
			return ys(o, l, m, h, v, k, z);
		} catch (L) {
			if (se(B), L !== L + 0) throw L;
			le(1, 0);
		}
	}
	function Km(o, l, m, h, v, k) {
		var z = ue();
		try {
			hs(o, l, m, h, v, k);
		} catch (B) {
			if (se(z), B !== B + 0) throw B;
			le(1, 0);
		}
	}
	function Zm(o, l, m, h) {
		var v = ue();
		try {
			_s(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function Xm(o, l, m, h, v) {
		var k = ue();
		try {
			fs(o, l, m, h, v);
		} catch (z) {
			if (se(k), z !== z + 0) throw z;
			le(1, 0);
		}
	}
	function Qm(o, l, m, h, v, k, z) {
		var B = ue();
		try {
			ws(o, l, m, h, v, k, z);
		} catch (L) {
			if (se(B), L !== L + 0) throw L;
			le(1, 0);
		}
	}
	function Ym(o, l, m, h, v, k, z) {
		var B = ue();
		try {
			xs(o, l, m, h, v, k, z);
		} catch (L) {
			if (se(B), L !== L + 0) throw L;
			le(1, 0);
		}
	}
	function Jm(o, l, m, h, v, k, z, B) {
		var L = ue();
		try {
			Is(o, l, m, h, v, k, z, B);
		} catch (W) {
			if (se(L), W !== W + 0) throw W;
			le(1, 0);
		}
	}
	function eg(o, l, m, h, v) {
		var k = ue();
		try {
			return $s(o, l, m, h, v);
		} catch (z) {
			if (se(k), z !== z + 0) throw z;
			le(1, 0);
		}
	}
	function tg(o, l, m, h, v, k, z, B) {
		var L = ue();
		try {
			Es(o, l, m, h, v, k, z, B);
		} catch (W) {
			if (se(L), W !== W + 0) throw W;
			le(1, 0);
		}
	}
	function rg(o, l, m, h, v, k, z, B, L, W, ae, ce) {
		var ge = ue();
		try {
			Ss(o, l, m, h, v, k, z, B, L, W, ae, ce);
		} catch (_e) {
			if (se(ge), _e !== _e + 0) throw _e;
			le(1, 0);
		}
	}
	function ig(o, l, m, h, v, k) {
		var z = ue();
		try {
			return ks(o, l, m, h, v, k);
		} catch (B) {
			if (se(z), B !== B + 0) throw B;
			le(1, 0);
		}
	}
	function ag(o, l, m) {
		var h = ue();
		try {
			return zs(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			return le(1, 0), 0n;
		}
	}
	function ng(o, l, m, h, v, k, z, B, L) {
		var W = ue();
		try {
			gs(o, l, m, h, v, k, z, B, L);
		} catch (ae) {
			if (se(W), ae !== ae + 0) throw ae;
			le(1, 0);
		}
	}
	function sg(o) {
		var l = ue();
		try {
			return Cs(o);
		} catch (m) {
			if (se(l), m !== m + 0) throw m;
			le(1, 0);
		}
	}
	function og(o, l, m) {
		var h = ue();
		try {
			return As(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			le(1, 0);
		}
	}
	function ug(o, l) {
		var m = ue();
		try {
			return Fs(o, l);
		} catch (h) {
			if (se(m), h !== h + 0) throw h;
			return le(1, 0), 0n;
		}
	}
	function lg(o) {
		var l = ue();
		try {
			return Os(o);
		} catch (m) {
			if (se(l), m !== m + 0) throw m;
			return le(1, 0), 0n;
		}
	}
	function dg(o, l, m, h) {
		var v = ue();
		try {
			return Us(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function pg(o, l, m, h, v) {
		var k = ue();
		try {
			return Ps(o, l, m, h, v);
		} catch (z) {
			if (se(k), z !== z + 0) throw z;
			le(1, 0);
		}
	}
	function cg(o, l, m, h, v, k) {
		var z = ue();
		try {
			return qs(o, l, m, h, v, k);
		} catch (B) {
			if (se(z), B !== B + 0) throw B;
			le(1, 0);
		}
	}
	function hg(o, l, m, h, v, k) {
		var z = ue();
		try {
			return Ls(o, l, m, h, v, k);
		} catch (B) {
			if (se(z), B !== B + 0) throw B;
			le(1, 0);
		}
	}
	function fg(o, l, m, h, v, k, z, B) {
		var L = ue();
		try {
			return Ts(o, l, m, h, v, k, z, B);
		} catch (W) {
			if (se(L), W !== W + 0) throw W;
			le(1, 0);
		}
	}
	function mg(o, l, m, h, v) {
		var k = ue();
		try {
			return Ws(o, l, m, h, v);
		} catch (z) {
			if (se(k), z !== z + 0) throw z;
			return le(1, 0), 0n;
		}
	}
	function gg(o, l, m, h) {
		var v = ue();
		try {
			return Vs(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function yg(o, l, m, h) {
		var v = ue();
		try {
			return Gs(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function _g(o, l, m, h, v, k, z, B, L, W, ae, ce) {
		var ge = ue();
		try {
			return Hs(o, l, m, h, v, k, z, B, L, W, ae, ce);
		} catch (_e) {
			if (se(ge), _e !== _e + 0) throw _e;
			le(1, 0);
		}
	}
	function vg(o, l, m, h, v, k, z, B, L, W, ae) {
		var ce = ue();
		try {
			Ms(o, l, m, h, v, k, z, B, L, W, ae);
		} catch (ge) {
			if (se(ce), ge !== ge + 0) throw ge;
			le(1, 0);
		}
	}
	function bg(o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e, pt, gi) {
		var Sg = ue();
		try {
			Ds(o, l, m, h, v, k, z, B, L, W, ae, ce, ge, _e, pt, gi);
		} catch (yi) {
			if (se(Sg), yi !== yi + 0) throw yi;
			le(1, 0);
		}
	}
	function $g(o, l, m) {
		var h = ue();
		try {
			return Rs(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			le(1, 0);
		}
	}
	function wg(o, l, m) {
		var h = ue();
		try {
			return Bs(o, l, m);
		} catch (v) {
			if (se(h), v !== v + 0) throw v;
			le(1, 0);
		}
	}
	function xg(o, l, m, h) {
		var v = ue();
		try {
			Ns(o, l, m, h);
		} catch (k) {
			if (se(v), k !== k + 0) throw k;
			le(1, 0);
		}
	}
	function xr() {
		if (0 < ke) Oe = xr;
		else if (a) $?.(t), ne();
		else {
			for (var o = pe; 0 < o.length;) o.shift()(t);
			0 < ke ? Oe = xr : (t.calledRun = !0, C || (ne(), $?.(t)));
		}
	}
	return a || (it = await Ae(), xr()), t.PTR_SIZE = 4, H ? t : new Promise((o, l) => {
		$ = o, S = l;
	});
}
var Jd, Js, Hg = U(() => {
	"use strict";
	Jd = Ys, Js = globalThis.self?.name?.startsWith("em-pthread"), Js && Ys();
}), xi, fa, eo, Ne, ep, kr, to, ro, Si, io, ki, tp, Ti, rp, Ra = U(() => {
	"use strict";
	Oa(), xi = typeof location > "u" ? void 0 : location.origin, fa = import.meta.url > "file:" && import.meta.url < "file;", eo = () => fa ? new URL(new URL("ort.bundle.min.mjs", import.meta.url).href, xi).href : import.meta.url, Ne = eo(), ep = () => {
		if (Ne && !Ne.startsWith("blob:")) return Ne.substring(0, Ne.lastIndexOf("/") + 1);
	}, kr = (e, t) => {
		try {
			let r = t ?? Ne;
			return (r ? new URL(e, r) : new URL(e)).origin === xi;
		} catch {
			return !1;
		}
	}, to = (e, t) => {
		let r = t ?? Ne;
		try {
			return (r ? new URL(e, r) : new URL(e)).href;
		} catch {
			return;
		}
	}, ro = (e, t) => `${t ?? "./"}${e}`, Si = async (e) => {
		let t = await (await fetch(e, { credentials: "same-origin" })).blob();
		return URL.createObjectURL(t);
	}, io = async (e) => (await import(e)).default, ki = (Gg(), lr(Xd)).default, tp = async () => {
		if (!Ne) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
		if (kr(Ne)) return [void 0, ki()];
		let e = await Si(Ne);
		return [e, ki(e)];
	}, Ti = (Hg(), lr(Yd)).default, rp = async (e, t, r, i) => {
		let a = Ti && !(e || t);
		if (a) if (Ne) a = kr(Ne) || i && !r;
		else if (i && !r) a = !0;
		else throw new Error("cannot determine the script source URL.");
		if (a) return [void 0, Ti];
		{
			let n = "ort-wasm-simd-threaded.jsep.mjs", s = e ?? to(n, t), u = r && s && !kr(s, t), d = u ? await Si(s) : s ?? ro(n, t);
			return [u ? d : void 0, await io(d)];
		}
	};
}), Ii, Tr, Kt, Ei, ao, no, so, Ba, ye, Ot = U(() => {
	"use strict";
	Ra(), Tr = !1, Kt = !1, Ei = !1, ao = () => {
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
	}, no = () => {
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
	}, so = () => {
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
	}, Ba = async (e) => {
		if (Tr) return Promise.resolve();
		if (Kt) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
		if (Ei) throw new Error("previous call to 'initializeWebAssembly()' failed.");
		Kt = !0;
		let t = e.initTimeout, r = e.numThreads;
		if (e.simd !== !1) {
			if (e.simd === "relaxed") {
				if (!so()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
			} else if (!no()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
		}
		let i = ao();
		r > 1 && !i && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + r + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = r = 1);
		let a = e.wasmPaths, n = typeof a == "string" ? a : void 0, s = a?.mjs, u = s?.href ?? s, d = a?.wasm, p = d?.href ?? d, f = e.wasmBinary, [c, g] = await rp(u, n, r > 1, !!f || !!p), y = !1, _ = [];
		if (t > 0 && _.push(new Promise(($) => {
			setTimeout(() => {
				y = !0, $();
			}, t);
		})), _.push(new Promise(($, S) => {
			let x = { numThreads: r };
			if (f) x.wasmBinary = f, x.locateFile = (b) => b;
			else if (p || n) x.locateFile = (b) => p ?? n + b;
			else if (u && u.indexOf("blob:") !== 0) x.locateFile = (b) => new URL(b, u).href;
			else if (c) {
				let b = ep();
				b && (x.locateFile = (T) => b + T);
			}
			g(x).then((b) => {
				Kt = !1, Tr = !0, Ii = b, $(), c && URL.revokeObjectURL(c);
			}, (b) => {
				Kt = !1, Ei = !0, S(b);
			});
		})), await Promise.race(_), y) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
	}, ye = () => {
		if (Tr && Ii) return Ii;
		throw new Error("WebAssembly is not initialized yet.");
	};
}), je, qr, me, Na = U(() => {
	"use strict";
	Ot(), je = (e, t) => {
		let r = ye(), i = r.lengthBytesUTF8(e) + 1, a = r._malloc(i);
		return r.stringToUTF8(e, a, i), t.push(a), a;
	}, qr = (e, t, r, i) => {
		if (typeof e == "object" && e !== null) {
			if (r.has(e)) throw new Error("Circular reference in options");
			r.add(e);
		}
		Object.entries(e).forEach(([a, n]) => {
			let s = t ? t + a : a;
			if (typeof n == "object") qr(n, s + ".", r, i);
			else if (typeof n == "string" || typeof n == "number") i(s, n.toString());
			else if (typeof n == "boolean") i(s, n ? "1" : "0");
			else throw new Error(`Can't handle extra config type: ${typeof n}`);
		});
	}, me = (e) => {
		let t = ye(), r = t.stackSave();
		try {
			let i = t.PTR_SIZE, a = t.stackAlloc(2 * i);
			t._OrtGetLastError(a, a + i);
			let n = Number(t.getValue(a, i === 4 ? "i32" : "i64")), s = t.getValue(a + i, "*"), u = s ? t.UTF8ToString(s) : "";
			throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`);
		} finally {
			t.stackRestore(r);
		}
	};
}), ip, Fg = U(() => {
	"use strict";
	Ot(), Na(), ip = (e) => {
		let t = ye(), r = 0, i = [], a = e || {};
		try {
			if (e?.logSeverityLevel === void 0) a.logSeverityLevel = 2;
			else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);
			if (e?.logVerbosityLevel === void 0) a.logVerbosityLevel = 0;
			else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
			e?.terminate === void 0 && (a.terminate = !1);
			let n = 0;
			return e?.tag !== void 0 && (n = je(e.tag, i)), r = t._OrtCreateRunOptions(a.logSeverityLevel, a.logVerbosityLevel, !!a.terminate, n), r === 0 && me("Can't create run options."), e?.extra !== void 0 && qr(e.extra, "", /* @__PURE__ */ new WeakSet(), (s, u) => {
				let d = je(s, i), p = je(u, i);
				t._OrtAddRunConfigEntry(r, d, p) !== 0 && me(`Can't set a run config entry: ${s} - ${u}.`);
			}), [r, i];
		} catch (n) {
			throw r !== 0 && t._OrtReleaseRunOptions(r), i.forEach((s) => t._free(s)), n;
		}
	};
}), oo, uo, lo, Zt, po, ap, jg = U(() => {
	"use strict";
	Ot(), Na(), oo = (e) => {
		switch (e) {
			case "disabled": return 0;
			case "basic": return 1;
			case "extended": return 2;
			case "layout": return 3;
			case "all": return 99;
			default: throw new Error(`unsupported graph optimization level: ${e}`);
		}
	}, uo = (e) => {
		switch (e) {
			case "sequential": return 0;
			case "parallel": return 1;
			default: throw new Error(`unsupported execution mode: ${e}`);
		}
	}, lo = (e) => {
		e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
		let t = e.extra.session;
		t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some((r) => (typeof r == "string" ? r : r.name) === "webgpu") && (e.enableMemPattern = !1);
	}, Zt = (e, t, r, i) => {
		let a = je(t, i), n = je(r, i);
		ye()._OrtAddSessionConfigEntry(e, a, n) !== 0 && me(`Can't set a session config entry: ${t} - ${r}.`);
	}, po = async (e, t, r) => {
		let i = t.executionProviders;
		for (let a of i) {
			let n = typeof a == "string" ? a : a.name, s = [];
			switch (n) {
				case "webnn":
					if (n = "WEBNN", typeof a != "string") {
						let c = a?.deviceType;
						c && Zt(e, "deviceType", c, r);
					}
					break;
				case "webgpu":
					if (n = "JS", typeof a != "string") {
						let c = a;
						if (c?.preferredLayout) {
							if (c.preferredLayout !== "NCHW" && c.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);
							Zt(e, "preferredLayout", c.preferredLayout, r);
						}
					}
					break;
				case "wasm":
				case "cpu": continue;
				default: throw new Error(`not supported execution provider: ${n}`);
			}
			let u = je(n, r), d = s.length, p = 0, f = 0;
			if (d > 0) {
				p = ye()._malloc(d * ye().PTR_SIZE), r.push(p), f = ye()._malloc(d * ye().PTR_SIZE), r.push(f);
				for (let c = 0; c < d; c++) ye().setValue(p + c * ye().PTR_SIZE, s[c][0], "*"), ye().setValue(f + c * ye().PTR_SIZE, s[c][1], "*");
			}
			await ye()._OrtAppendExecutionProvider(e, u, p, f, d) !== 0 && me(`Can't append execution provider: ${n}.`);
		}
	}, ap = async (e) => {
		let t = ye(), r = 0, i = [], a = e || {};
		lo(a);
		try {
			let n = oo(a.graphOptimizationLevel ?? "all"), s = uo(a.executionMode ?? "sequential"), u = typeof a.logId == "string" ? je(a.logId, i) : 0, d = a.logSeverityLevel ?? 2;
			if (!Number.isInteger(d) || d < 0 || d > 4) throw new Error(`log severity level is not valid: ${d}`);
			let p = a.logVerbosityLevel ?? 0;
			if (!Number.isInteger(p) || p < 0 || p > 4) throw new Error(`log verbosity level is not valid: ${p}`);
			let f = typeof a.optimizedModelFilePath == "string" ? je(a.optimizedModelFilePath, i) : 0;
			if (r = t._OrtCreateSessionOptions(n, !!a.enableCpuMemArena, !!a.enableMemPattern, s, !!a.enableProfiling, 0, u, d, p, f), r === 0 && me("Can't create session options."), a.executionProviders && await po(r, a, i), a.enableGraphCapture !== void 0) {
				if (typeof a.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);
				Zt(r, "enableGraphCapture", a.enableGraphCapture.toString(), i);
			}
			if (a.freeDimensionOverrides) for (let [c, g] of Object.entries(a.freeDimensionOverrides)) {
				if (typeof c != "string") throw new Error(`free dimension override name must be a string: ${c}`);
				if (typeof g != "number" || !Number.isInteger(g) || g < 0) throw new Error(`free dimension override value must be a non-negative integer: ${g}`);
				let y = je(c, i);
				t._OrtAddFreeDimensionOverride(r, y, g) !== 0 && me(`Can't set a free dimension override: ${c} - ${g}.`);
			}
			return a.extra !== void 0 && qr(a.extra, "", /* @__PURE__ */ new WeakSet(), (c, g) => {
				Zt(r, c, g, i);
			}), [r, i];
		} catch (n) {
			throw r !== 0 && t._OrtReleaseSessionOptions(r) !== 0 && me("Can't release session options."), i.forEach((s) => t._free(s)), n;
		}
	};
}), kt, nt, Tt, jr, Lr, Ma, Da, ma, J = U(() => {
	"use strict";
	kt = (e) => {
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
	}, nt = (e) => {
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
	}, Tt = (e, t) => {
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
		][e], i = typeof t == "number" ? t : t.reduce((a, n) => a * n, 1);
		return r > 0 ? Math.ceil(i * r) : void 0;
	}, jr = (e) => {
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
	}, Lr = (e) => {
		switch (e) {
			case "verbose": return 0;
			case "info": return 1;
			case "warning": return 2;
			case "error": return 3;
			case "fatal": return 4;
			default: throw new Error(`unsupported logging level: ${e}`);
		}
	}, Ma = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", Da = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", ma = (e) => {
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
}), Ua, np = U(() => {
	"use strict";
	Oa(), Ua = async (e) => {
		if (typeof e == "string") {
			let t = await fetch(e);
			if (!t.ok) throw new Error(`failed to load external data file: ${e}`);
			let r = t.headers.get("Content-Length"), i = r ? parseInt(r, 10) : 0;
			if (i < 1073741824) return new Uint8Array(await t.arrayBuffer());
			{
				if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`);
				let a = t.body.getReader(), n;
				try {
					n = new ArrayBuffer(i);
				} catch (u) {
					if (u instanceof RangeError) {
						let d = Math.ceil(i / 65536);
						n = new WebAssembly.Memory({
							initial: d,
							maximum: d
						}).buffer;
					} else throw u;
				}
				let s = 0;
				for (;;) {
					let { done: u, value: d } = await a.read();
					if (u) break;
					let p = d.byteLength;
					new Uint8Array(n, s, p).set(d), s += p;
				}
				return new Uint8Array(n, 0, i);
			}
		} else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
	};
}), co, ho, fo, mo, Pa, go, de, st = U(() => {
	"use strict";
	J(), co = [
		"V",
		"I",
		"W",
		"E",
		"F"
	], ho = (e, t) => {
		console.log(`[${co[e]},${(/* @__PURE__ */ new Date()).toISOString()}]${t}`);
	}, Pa = (e, t) => {
		fo = e, mo = t;
	}, go = (e, t) => {
		let r = Lr(e);
		r >= Lr(fo) && ho(r, typeof t == "function" ? t() : t);
	}, de = (...e) => {
		mo && go(...e);
	};
}), yo, qt, O, Wr, sp, op, up, re = U(() => {
	"use strict";
	yo = class {
		static calcMatMulShape(e, t) {
			return e[1] !== t[0] ? void 0 : [e[0], t[1]];
		}
	}, qt = class {
		static calcShape(e, t, r = !1) {
			let i = e.length, a = t.length;
			if (i === 0) return t;
			if (a === 0) return e;
			let n = Math.max(e.length, t.length), s = new Array(n);
			if (r) {
				if (i < 2 || a < 2) return;
				let u = yo.calcMatMulShape([e[i - 2], e[i - 1]], [t[a - 2], t[a - 1]]);
				if (u === void 0) return;
				[s[n - 2], s[n - 1]] = u;
			}
			for (let u = r ? 3 : 1; u <= n; u++) {
				let d = i - u < 0 ? 1 : e[i - u], p = a - u < 0 ? 1 : t[a - u];
				if (d !== p && d > 1 && p > 1) return;
				let f = Math.max(d, p);
				if (d && p) s[n - u] = Math.max(d, p);
				else {
					if (f > 1) return;
					s[n - u] = 0;
				}
			}
			return s;
		}
		static isValidBroadcast(e, t) {
			let r = e.length, i = t.length;
			if (r > i) return !1;
			for (let a = 1; a <= r; a++) if (e[r - a] !== 1 && e[r - a] !== t[i - a]) return !1;
			return !0;
		}
	}, O = class Dr {
		static size(t) {
			return Dr.getSizeFromDimensionRange(t, 0, t.length);
		}
		static convertShape(t, r = 4) {
			let i = t.length;
			if (i === 0) return [];
			let a = new Array(i), n = i - 1;
			for (; n >= 0;) {
				if (t[n] % r === 0) {
					a[n] = t[n] / r;
					break;
				}
				if (r % t[n] !== 0) throw new Error("cannot convert shape");
				a[n] = 1, r /= t[n], n--;
			}
			for (n--; n >= 0; n--) a[n] = t[n];
			return a;
		}
		static sizeFromDimension(t, r) {
			if (r < 0 || r > t.length) throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);
			return Dr.getSizeFromDimensionRange(t, r, t.length);
		}
		static sizeToDimension(t, r) {
			if (r < 0 || r > t.length) throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);
			return Dr.getSizeFromDimensionRange(t, 0, r);
		}
		static getSizeFromDimensionRange(t, r, i) {
			let a = 1;
			for (let n = r; n < i; n++) {
				if (t[n] < 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");
				a *= Number(t[n]);
			}
			return a;
		}
		static computeStrides(t) {
			let r = t.length;
			if (r === 0) return [];
			if (r === 1) return [1];
			let i = new Array(r);
			i[r - 1] = 1, i[r - 2] = t[r - 1];
			for (let a = r - 3; a >= 0; --a) i[a] = i[a + 1] * t[a + 1];
			return i;
		}
		static normalizeAxis(t, r) {
			if (t < -r && t >= r) throw new Error("unsupported axis for this operation.");
			return t < 0 ? t + r : t;
		}
		static normalizeAxes(t, r) {
			return t.map((i) => this.normalizeAxis(i, r ?? t.length));
		}
		static sortBasedOnPerm(t, r) {
			return r ? r.map((i) => t[i]) : t.slice().reverse();
		}
		static padShape(t, r) {
			let i = t.length;
			return t.map((a, n) => a + r[n] + r[n + i]);
		}
		static areEqual(t, r) {
			return t.length !== r.length ? !1 : t.every((i, a) => i === r[a]);
		}
	}, Wr = class nr {
		static adjustPoolAttributes(t, r, i, a, n, s) {
			if (!t && i.length !== r.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");
			if (t) for (let u = 0; u < r.length - 2; u++) u >= i.length ? i.push(r[u + 2]) : i[u] = r[u + 2];
			for (let u = 0; u < i.length; u++) if (u < a.length) {
				if (a[u] < 0) throw new Error("strides should be greater than or equal to 1");
			} else a.push(1);
			for (let u = 0; u < i.length; u++) if (u < n.length) {
				if (n[u] < 0) throw new Error("dilations should be greater than or equal to 1");
			} else n.push(1);
			for (let u = 0; u < i.length * 2; u++) if (u < s.length) {
				if (s[u] < 0) throw new Error("pad should be greater than or equal to 1");
			} else s.push(0);
			for (let u = 0; u < i.length; u++) {
				if (i[u] <= 0) throw new Error("kernel shapes need to be greater than 0");
				if (s[u] >= i[u] || s[u + i.length] >= i[u]) throw new Error("pads should be smaller than kernel");
			}
		}
		static adjustPadsBasedOnAutoPad(t, r, i, a, n, s, u) {
			if (u) {
				if (n.length !== 2 * (t.length - 2)) throw new Error("length of pads should be twice the length of data dimensions");
				if (r.length !== t.length - 2) throw new Error("length of strides should be the length of data dimensions");
				if (a.length !== t.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions");
				for (let d = 0; d < t.length - 2; d++) nr.adjustPadAndReturnShape(t[d + (s ? 1 : 2)], r[d], i[d], a[d], n, d, d + t.length - 2, u);
			}
		}
		static computePoolOutputShape(t, r, i, a, n, s, u) {
			if (r.length <= 0) throw new Error("input shape must be of size greater than 0");
			let d = [r[0], r[1]];
			return nr.computeShapeHelper(t, r, d, i, a, n, s, u), d;
		}
		static computeConvOutputShape(t, r, i, a, n, s, u) {
			if (t.length <= 0 || r.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
			let d = [t[0], r[0]];
			return nr.computeShapeHelper(!1, t, d, i, a, n, s, u), d;
		}
		static computeShapeHelper(t, r, i, a, n, s, u, d) {
			if (t) for (let p = 0; p < r.length - 2; p++) i.push(1);
			else for (let p = 0; p < r.length - 2; p++) i.push(nr.adjustPadAndReturnShape(r[p + 2], a[p], n[p], s[p], u, p, p + r.length - 2, d));
		}
		static adjustPadAndReturnShape(t, r, i, a, n, s, u, d) {
			let p = i * (a - 1) + 1;
			if (d && d !== "NOTSET") switch (d) {
				case "VALID": return n[s] = 0, n[u] = 0, Math.floor((t - p) / r + 1);
				case "SAME_LOWER":
				case "SAME_UPPER":
					if (i !== 1) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");
					{
						let f = ((t + r - 1) / r - 1) * r + a - t;
						return n[s] = Math.floor(d === "SAME_LOWER" ? (f + 1) / 2 : f / 2), n[u] = f - n[s], Math.floor((t + f - a) / r + 1);
					}
				default: throw new Error("Unsupported AutoPad type");
			}
			else return Math.floor((t + n[s] + n[u] - p) / r + 1);
		}
	}, sp = class {
		static getShapeOfGemmResult(e, t, r, i, a) {
			if (e.length !== 2 || r.length !== 2) throw new Error("shape need to be of size 2");
			let n, s, u;
			t ? (n = e[1], s = e[0]) : (n = e[0], s = e[1]);
			let d = -1;
			if (i ? (u = r[0], d = 1) : (u = r[1], d = 0), r[d] !== s) throw new Error("dimension mismatch");
			if (n <= 0 || u <= 0 || s <= 0) throw new Error("invalid shape specified");
			if (a && !qt.isValidBroadcast(a, [n, u])) throw new Error("gemm: invalid bias shape for broadcast");
			return [
				n,
				u,
				s
			];
		}
	}, op = -34028234663852886e22, up = 34028234663852886e22;
}), qa, lp = U(() => {
	"use strict";
	J(), qa = (e, t) => new (jr(t))(e);
}), zi, ga, Ci, _o, Ai, vo, Oi, Ri, Bi, bo, dp, Kg = U(() => {
	"use strict";
	J(), st(), zi = /* @__PURE__ */ new Map([
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
	]), ga = (e, t) => {
		if (t === "int32") return e;
		let r = zi.get(t);
		if (!r) throw new Error(`WebNN backend does not support data type: ${t}`);
		let i = r / 8;
		if (e.byteLength % i !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);
		let a = e.byteLength / i, n = new (jr(t))(e.buffer, e.byteOffset, a);
		switch (t) {
			case "int64":
			case "uint64": {
				let s = new Int32Array(a);
				for (let u = 0; u < a; u++) {
					let d = n[u];
					if (d > 2147483647n || d < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range.");
					s[u] = Number(d);
				}
				return new Uint8Array(s.buffer);
			}
			case "int8":
			case "uint8":
			case "uint32": {
				if (t === "uint32" && n.some((u) => u > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range.");
				let s = Int32Array.from(n, Number);
				return new Uint8Array(s.buffer);
			}
			default: throw new Error(`Unsupported data conversion from ${t} to 'int32'`);
		}
	}, Ci = (e, t) => {
		if (t === "int32") return e;
		if (e.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
		let r = e.byteLength / 4, i = new Int32Array(e.buffer, e.byteOffset, r);
		switch (t) {
			case "int64": {
				let a = BigInt64Array.from(i, BigInt);
				return new Uint8Array(a.buffer);
			}
			case "uint64": {
				if (i.some((n) => n < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found.");
				let a = BigUint64Array.from(i, BigInt);
				return new Uint8Array(a.buffer);
			}
			case "int8": {
				if (i.some((n) => n < -128 || n > 127)) throw new Error("Can not convert int32 data to int8 - value out of range.");
				let a = Int8Array.from(i, Number);
				return new Uint8Array(a.buffer);
			}
			case "uint8":
				if (i.some((a) => a < 0 || a > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range.");
				return Uint8Array.from(i, Number);
			case "uint32": {
				if (i.some((n) => n < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found.");
				let a = Uint32Array.from(i, Number);
				return new Uint8Array(a.buffer);
			}
			default: throw new Error(`Unsupported data conversion from 'int32' to ${t}`);
		}
	}, _o = 1, Ai = () => _o++, vo = /* @__PURE__ */ new Map([
		["int8", "int32"],
		["uint8", "int32"],
		["uint32", "int32"],
		["int64", "int32"]
	]), Oi = (e, t) => {
		let r = zi.get(e);
		if (!r) throw new Error(`WebNN backend does not support data type: ${e}`);
		return t.length > 0 ? Math.ceil(t.reduce((i, a) => i * a) * r / 8) : 0;
	}, Ri = class {
		constructor(e) {
			this.isDataConverted = !1;
			let { sessionId: t, context: r, tensor: i, dataType: a, shape: n, fallbackDataType: s } = e;
			this.sessionId = t, this.mlContext = r, this.mlTensor = i, this.dataType = a, this.tensorShape = n, this.fallbackDataType = s;
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
			return Oi(this.dataType, this.tensorShape);
		}
		destroy() {
			de("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
		}
		write(e) {
			this.mlContext.writeTensor(this.mlTensor, e);
		}
		async read(e) {
			if (this.fallbackDataType) {
				let t = await this.mlContext.readTensor(this.mlTensor), r = Ci(new Uint8Array(t), this.dataType);
				if (e) {
					(e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)).set(r);
					return;
				} else return r.buffer;
			} else return e ? this.mlContext.readTensor(this.mlTensor, e) : this.mlContext.readTensor(this.mlTensor);
		}
		canReuseTensor(e, t, r) {
			return this.mlContext === e && this.dataType === t && this.tensorShape.length === r.length && this.tensorShape.every((i, a) => i === r[a]);
		}
		setIsDataConverted(e) {
			this.isDataConverted = e;
		}
	}, Bi = class {
		constructor(e, t) {
			this.tensorManager = e, this.wrapper = t;
		}
		get tensorWrapper() {
			return this.wrapper;
		}
		releaseTensor() {
			this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
		}
		async ensureTensor(e, t, r, i) {
			let a = this.tensorManager.getMLContext(e), n = this.tensorManager.getMLOpSupportLimits(e), s;
			if (!n?.input.dataTypes.includes(t)) {
				if (s = vo.get(t), !s || n?.input.dataTypes.includes(s)) throw new Error(`WebNN backend does not support data type: ${t}`);
				de("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`);
			}
			if (this.wrapper) {
				if (this.wrapper.canReuseTensor(a, t, r)) return this.wrapper.tensor;
				if (i) {
					if (this.wrapper.byteLength !== Oi(t, r)) throw new Error("Unable to copy data to tensor with different size.");
					this.activeUpload = new Uint8Array(await this.wrapper.read());
				}
				this.tensorManager.releaseTensor(this.wrapper);
			}
			let u = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
			return this.wrapper = await this.tensorManager.getCachedTensor(e, t, r, u, !0, !0, s), i && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
		}
		upload(e) {
			let t = e;
			if (this.wrapper) {
				if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") t = ga(e, this.wrapper.type), this.wrapper.setIsDataConverted(!0);
				else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
				if (e.byteLength === this.wrapper.byteLength) {
					this.wrapper.write(t);
					return;
				} else de("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
			}
			this.activeUpload ? this.activeUpload.set(t) : this.activeUpload = new Uint8Array(t);
		}
		async download(e) {
			if (this.activeUpload) {
				let t = this.wrapper?.isDataConverted ? Ci(this.activeUpload, this.wrapper?.type) : this.activeUpload;
				if (e) {
					e instanceof ArrayBuffer ? new Uint8Array(e).set(t) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength).set(t);
					return;
				} else return t.buffer;
			}
			if (!this.wrapper) throw new Error("Tensor has not been created.");
			return e ? this.wrapper.read(e) : this.wrapper.read();
		}
	}, bo = class {
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
			let e = Ai();
			return this.tensorTrackersById.set(e, new Bi(this)), e;
		}
		releaseTensorId(e) {
			let t = this.tensorTrackersById.get(e);
			t && (this.tensorTrackersById.delete(e), t.tensorWrapper && this.releaseTensor(t.tensorWrapper));
		}
		async ensureTensor(e, t, r, i, a) {
			de("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);
			let n = this.tensorTrackersById.get(t);
			if (!n) throw new Error("Tensor not found.");
			return n.ensureTensor(e, r, i, a);
		}
		upload(e, t) {
			let r = this.tensorTrackersById.get(e);
			if (!r) throw new Error("Tensor not found.");
			r.upload(t);
		}
		async download(e, t) {
			de("verbose", () => `[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);
			let r = this.tensorTrackersById.get(e);
			if (!r) throw new Error("Tensor not found.");
			return r.download(t);
		}
		releaseTensorsForSession(e) {
			for (let t of this.freeTensors) t.sessionId === e && t.destroy();
			this.freeTensors = this.freeTensors.filter((t) => t.sessionId !== e);
		}
		registerTensor(e, t, r, i) {
			let a = this.getMLContext(e), n = Ai(), s = new Ri({
				sessionId: e,
				context: a,
				tensor: t,
				dataType: r,
				shape: i
			});
			return this.tensorTrackersById.set(n, new Bi(this, s)), this.externalTensors.add(s), n;
		}
		async getCachedTensor(e, t, r, i, a, n, s) {
			let u = this.getMLContext(e);
			for (let [p, f] of this.freeTensors.entries()) if (f.canReuseTensor(u, t, r)) {
				de("verbose", () => `[WebNN] Reusing tensor {dataType: ${t}, ${s ? `fallbackDataType: ${s},` : ""} shape: ${r}`);
				let c = this.freeTensors.splice(p, 1)[0];
				return c.sessionId = e, c;
			}
			de("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${t}, ${s ? `fallbackDataType: ${s},` : ""} shape: ${r}}`);
			let d = await u.createTensor({
				dataType: s ?? t,
				shape: r,
				dimensions: r,
				usage: i,
				writable: a,
				readable: n
			});
			return new Ri({
				sessionId: e,
				context: u,
				tensor: d,
				dataType: t,
				shape: r,
				fallbackDataType: s
			});
		}
		releaseTensor(e) {
			this.externalTensors.has(e) && this.externalTensors.delete(e), this.freeTensors.push(e);
		}
	}, dp = (...e) => new bo(...e);
}), Xt, $o, pp, Zg = U(() => {
	"use strict";
	J(), Ot(), lp(), Kg(), st(), Xt = /* @__PURE__ */ new Map([
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
	]), $o = (e, t) => {
		if (e === t) return !0;
		if (e === void 0 || t === void 0) return !1;
		let r = Object.keys(e).sort(), i = Object.keys(t).sort();
		return r.length === i.length && r.every((a, n) => a === i[n] && e[a] === t[a]);
	}, pp = class {
		constructor(e) {
			this.tensorManager = dp(this), this.mlContextBySessionId = /* @__PURE__ */ new Map(), this.sessionIdsByMLContext = /* @__PURE__ */ new Map(), this.mlContextCache = [], this.sessionGraphInputs = /* @__PURE__ */ new Map(), this.sessionGraphOutputs = /* @__PURE__ */ new Map(), this.temporaryGraphInputs = [], this.temporaryGraphOutputs = [], this.temporarySessionTensorIds = /* @__PURE__ */ new Map(), this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map(), Pa(e.logLevel, !!e.debug);
		}
		get currentSessionId() {
			if (this.activeSessionId === void 0) throw new Error("No active session");
			return this.activeSessionId;
		}
		onRunStart(e) {
			de("verbose", () => `[WebNN] onRunStart {sessionId: ${e}}`), this.activeSessionId = e;
		}
		onRunEnd(e) {
			de("verbose", () => `[WebNN] onRunEnd {sessionId: ${e}}`);
			let t = this.temporarySessionTensorIds.get(e);
			if (t) {
				for (let r of t) de("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${r}}`), this.tensorManager.releaseTensorId(r);
				this.temporarySessionTensorIds.delete(e), this.activeSessionId = void 0;
			}
		}
		async createMLContext(e) {
			if (e instanceof GPUDevice) {
				let r = this.mlContextCache.findIndex((i) => i.gpuDevice === e);
				if (r !== -1) return this.mlContextCache[r].mlContext;
				{
					let i = await navigator.ml.createContext(e);
					return this.mlContextCache.push({
						gpuDevice: e,
						mlContext: i
					}), i;
				}
			} else if (e === void 0) {
				let r = this.mlContextCache.findIndex((i) => i.options === void 0 && i.gpuDevice === void 0);
				if (r !== -1) return this.mlContextCache[r].mlContext;
				{
					let i = await navigator.ml.createContext();
					return this.mlContextCache.push({ mlContext: i }), i;
				}
			}
			let t = this.mlContextCache.findIndex((r) => $o(r.options, e));
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
				let i = this.mlContextCache.findIndex((a) => a.mlContext === t);
				i !== -1 && this.mlContextCache.splice(i, 1);
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
			de("verbose", () => `[WebNN] releaseTensorId {tensorId: ${e}}`), this.tensorManager.releaseTensorId(e);
		}
		async ensureTensor(e, t, r, i, a) {
			let n = Xt.get(r);
			if (!n) throw new Error(`Unsupported ONNX data type: ${r}`);
			return this.tensorManager.ensureTensor(e ?? this.currentSessionId, t, n, i, a);
		}
		async createTemporaryTensor(e, t, r) {
			de("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);
			let i = Xt.get(t);
			if (!i) throw new Error(`Unsupported ONNX data type: ${t}`);
			let a = this.tensorManager.reserveTensorId();
			await this.tensorManager.ensureTensor(e, a, i, r, !1);
			let n = this.temporarySessionTensorIds.get(e);
			return n ? n.push(a) : this.temporarySessionTensorIds.set(e, [a]), a;
		}
		uploadTensor(e, t) {
			if (!ye().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
			de("verbose", () => `[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`), this.tensorManager.upload(e, t);
		}
		async downloadTensor(e, t) {
			return this.tensorManager.download(e, t);
		}
		createMLTensorDownloader(e, t) {
			return async () => {
				let r = await this.tensorManager.download(e);
				return qa(r, t);
			};
		}
		registerMLTensor(e, t, r, i) {
			let a = Xt.get(r);
			if (!a) throw new Error(`Unsupported ONNX data type: ${r}`);
			let n = this.tensorManager.registerTensor(e, t, a, i);
			return de("verbose", () => `[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`), n;
		}
		registerMLConstant(e, t, r, i, a, n, s = !1) {
			if (!n) throw new Error("External mounted files are not available.");
			let u = e;
			e.startsWith("./") && (u = e.substring(2));
			let d = n.get(u);
			if (!d) throw new Error(`File with name ${u} not found in preloaded files.`);
			if (t + r > d.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
			let p = d.slice(t, t + r).buffer, f;
			switch (a.dataType) {
				case "float32":
					f = new Float32Array(p);
					break;
				case "float16":
					f = typeof Float16Array < "u" && Float16Array.from ? new Float16Array(p) : new Uint16Array(p);
					break;
				case "int32":
					f = new Int32Array(p);
					break;
				case "uint32":
					f = new Uint32Array(p);
					break;
				case "int64":
					if (s) {
						let c = ga(new Uint8Array(p), "int64");
						f = new Int32Array(c.buffer), a.dataType = "int32";
					} else f = new BigInt64Array(p);
					break;
				case "uint64":
					f = new BigUint64Array(p);
					break;
				case "int8":
					f = new Int8Array(p);
					break;
				case "int4":
				case "uint4":
				case "uint8":
					f = new Uint8Array(p);
					break;
				default: throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`);
			}
			return de("verbose", () => `[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`), i.constant(a, f);
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
			let i = Xt.get(kt(t)), a = this.mlOpSupportLimitsBySessionId.get(e);
			return typeof i > "u" ? !1 : r ? !!a?.input.dataTypes.includes(i) : !!a?.output.dataTypes.includes(i);
		}
		flush() {}
	};
}), La = U(() => {
	"use strict";
}), Ni, Ir, Er, wo, xo, Mi, ya, So, cp, Xg = U(() => {
	"use strict";
	st(), La(), Ni = /* @__PURE__ */ new Map([
		[64, 250],
		[128, 200],
		[256, 200],
		[512, 200],
		[2048, 230],
		[4096, 200],
		[8192, 50],
		[16384, 50],
		[32768, 50],
		[65536, 50],
		[131072, 50],
		[262144, 50],
		[524288, 50],
		[1048576, 50],
		[2097152, 30],
		[4194304, 20],
		[8388608, 10],
		[12582912, 10],
		[16777216, 10],
		[26214400, 15],
		[33554432, 22],
		[44236800, 2],
		[58982400, 6],
		[67108864, 6],
		[134217728, 6],
		[167772160, 6]
	]), Ir = [], Er = (e) => Math.ceil(Number(e) / 16) * 16, wo = (e) => {
		for (let t = 0; t < Ir.length; t++) {
			let r = Ir[t];
			if (e <= r) return r;
		}
		return Math.ceil(e / 16) * 16;
	}, xo = 1, Mi = () => xo++, ya = async (e, t, r, i) => {
		let a = Er(r), n = e.device.createBuffer({
			size: a,
			usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
		});
		try {
			let s = e.getCommandEncoder();
			e.endComputePass(), s.copyBufferToBuffer(t, 0, n, 0, a), e.flush(), await n.mapAsync(GPUMapMode.READ);
			let u = n.getMappedRange();
			if (i) {
				let d = i();
				return d.set(new Uint8Array(u, 0, r)), d;
			} else return new Uint8Array(u.slice(0, r));
		} finally {
			n.destroy();
		}
	}, So = class {
		constructor(e) {
			this.backend = e, this.storageCache = /* @__PURE__ */ new Map(), this.freeBuffers = /* @__PURE__ */ new Map(), this.freeUniformBuffers = /* @__PURE__ */ new Map(), this.buffersPending = [], this.capturedPendingBuffers = /* @__PURE__ */ new Map();
			for (let [t] of Ni) Ir.push(t), this.freeBuffers.set(t, []), this.freeUniformBuffers.set(t, []);
			this.sessionCount = 0;
		}
		upload(e, t) {
			let r = t.buffer, i = t.byteOffset, a = t.byteLength, n = Er(a), s = this.storageCache.get(e);
			if (!s) throw new Error("gpu data for uploading does not exist");
			if (Number(s.originalSize) !== a) throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);
			let u = this.backend.device.createBuffer({
				mappedAtCreation: !0,
				size: n,
				usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
			}), d = u.getMappedRange();
			new Uint8Array(d).set(new Uint8Array(r, i, a)), u.unmap();
			let p = this.backend.device.createCommandEncoder();
			p.copyBufferToBuffer(u, 0, s.gpuData.buffer, 0, n), this.backend.device.queue.submit([p.finish()]), u.destroy(), de("verbose", () => `[WebGPU] GpuDataManager.upload(id=${e})`);
		}
		memcpy(e, t) {
			let r = this.storageCache.get(e);
			if (!r) throw new Error("source gpu data for memcpy does not exist");
			let i = this.storageCache.get(t);
			if (!i) throw new Error("destination gpu data for memcpy does not exist");
			if (r.originalSize !== i.originalSize) throw new Error("inconsistent source and destination gpu data size");
			let a = Er(r.originalSize), n = this.backend.getCommandEncoder();
			this.backend.endComputePass(), n.copyBufferToBuffer(r.gpuData.buffer, 0, i.gpuData.buffer, 0, a);
		}
		registerExternalBuffer(e, t, r) {
			let i;
			if (r) {
				if (i = r[0], e === r[1]) return de("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`), i;
				if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);
			} else i = Mi();
			return this.storageCache.set(i, {
				gpuData: {
					id: i,
					type: 0,
					buffer: e
				},
				originalSize: t
			}), de("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`), i;
		}
		unregisterExternalBuffer(e) {
			e !== void 0 && (this.storageCache.delete(e), de("verbose", () => `[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`));
		}
		create(e, t = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST) {
			let r = wo(e), i, a = (t & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE, n = (t & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM;
			if (a || n) {
				let u = (a ? this.freeBuffers : this.freeUniformBuffers).get(r);
				u ? u.length > 0 ? i = u.pop() : i = this.backend.device.createBuffer({
					size: r,
					usage: t
				}) : i = this.backend.device.createBuffer({
					size: r,
					usage: t
				});
			} else i = this.backend.device.createBuffer({
				size: r,
				usage: t
			});
			let s = {
				id: Mi(),
				type: 0,
				buffer: i
			};
			return this.storageCache.set(s.id, {
				gpuData: s,
				originalSize: Number(e)
			}), de("verbose", () => `[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`), s;
		}
		get(e) {
			return this.storageCache.get(e)?.gpuData;
		}
		release(e) {
			let t = typeof e == "bigint" ? Number(e) : e, r = this.storageCache.get(t);
			if (!r) {
				if (this.storageCache.size === 0) return 0;
				throw new Error("releasing data does not exist");
			}
			return de("verbose", () => `[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`), this.storageCache.delete(t), this.buffersPending.push(r.gpuData.buffer), r.originalSize;
		}
		async download(e, t) {
			let r = this.storageCache.get(Number(e));
			if (!r) throw new Error("data does not exist");
			await ya(this.backend, r.gpuData.buffer, r.originalSize, t);
		}
		refreshPendingBuffers() {
			if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") {
				for (let e of this.buffersPending) {
					let t = Ni.get(e.size);
					if ((e.usage & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE) {
						let r = this.freeBuffers.get(e.size) || [];
						t === void 0 || r.length >= t ? e.destroy() : r.push(e);
					} else if ((e.usage & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM) {
						let r = this.freeUniformBuffers.get(e.size) || [];
						t === void 0 || r.length >= t ? e.destroy() : r.push(e);
					} else e.destroy();
				}
				this.buffersPending = [];
			} else {
				let e = this.capturedPendingBuffers.get(this.backend.currentSessionId);
				e || (e = [], this.capturedPendingBuffers.set(this.backend.currentSessionId, e));
				for (let t of this.buffersPending) e.push(t);
				this.buffersPending = [];
			}
		}
		dispose() {
			this.freeBuffers.forEach((e) => {
				e.forEach((t) => {
					t.destroy();
				});
			}), this.freeUniformBuffers.forEach((e) => {
				e.forEach((t) => {
					t.destroy();
				});
			}), this.storageCache.forEach((e) => {
				e.gpuData.buffer.destroy();
			}), this.capturedPendingBuffers.forEach((e) => {
				e.forEach((t) => {
					t.destroy();
				});
			}), this.storageCache = /* @__PURE__ */ new Map(), this.freeBuffers = /* @__PURE__ */ new Map(), this.freeUniformBuffers = /* @__PURE__ */ new Map(), this.capturedPendingBuffers = /* @__PURE__ */ new Map();
		}
		onCreateSession() {
			this.sessionCount += 1;
		}
		onReleaseSession(e) {
			let t = this.capturedPendingBuffers.get(e);
			t && (t.forEach((r) => {
				r.destroy();
			}), this.capturedPendingBuffers.delete(e)), this.sessionCount -= 1, this.sessionCount === 0 && (de("warning", () => "[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach((r) => {
				r.gpuData.buffer.destroy();
			}), this.storageCache = /* @__PURE__ */ new Map());
		}
	}, cp = (...e) => new So(...e);
}), ko, fe, xe = U(() => {
	"use strict";
	ko = class {
		constructor(e) {
			Object.assign(this, e);
		}
		get cacheKey() {
			return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map((e) => `${this[e]}`).join(";")), this.key;
		}
	}, fe = (e) => new ko(e);
}), Lt, zr, Te, Ce, Z, we, _a, Pt, mt, j, Qt, N, F, hp, Wa, To, fp, ie = U(() => {
	"use strict";
	J(), re(), Lt = 64, zr = (e, t) => {
		if (t === 3) throw new Error("vec3 has same alignment as vec4, use vec4 instead");
		switch (Number(e)) {
			case 10: return t > 1 ? `vec${t}<f16>` : "f16";
			case 1: return t > 1 ? `vec${t}<f32>` : "f32";
			case 6: return t > 1 ? `vec${t}<i32>` : "i32";
			case 12: return t > 1 ? `vec${t}<u32>` : "u32";
			case 7:
				if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
				return ["vec2<u32>", "i32"];
			case 13:
				if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
				return ["vec2<u32>", "u32"];
			case 9:
				if (t !== 4) throw new Error("bool must be vec4");
				return ["u32", "vec4<bool>"];
			case 22: return "i32";
			case 21: return "u32";
			default: throw new Error(`Unknown data type: ${e}`);
		}
	}, Te = (e, t = 1) => {
		let r = zr(e, t);
		return typeof r == "string" ? r : r[0];
	}, Ce = (e, t = 1) => {
		let r = zr(e, t);
		return typeof r == "string" ? r : r[1];
	}, Z = (...e) => {
		let t = [];
		return e.forEach((r) => {
			r.length !== 0 && t.push({
				type: 12,
				data: r
			}, {
				type: 12,
				data: O.computeStrides(r)
			});
		}), t;
	}, we = (e) => e % 4 === 0 ? 4 : e % 2 === 0 ? 2 : 1, _a = (e = "f32", t, r = "0") => !t || t === 1 ? `${e}(${r})` : `vec${t}<${e}>(${r})`, Pt = (e, t, r) => e === "f32" ? r : t === 1 ? `f32(${r})` : `vec${t}<f32>(${r})`, mt = (e, t) => t === 4 ? `(${e}.x + ${e}.y + ${e}.z + ${e}.w)` : t === 2 ? `(${e}.x + ${e}.y)` : t === 3 ? `(${e}.x + ${e}.y + ${e}.z)` : e, j = (e, t, r, i) => e.startsWith("uniforms.") && r > 4 ? typeof t == "string" ? i === "f16" ? `${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]` : `${e}[(${t}) / 4][(${t}) % 4]` : i === "f16" ? `${e}[${Math.floor(t / 8)}][${Math.floor(t % 8 / 4)}][${t % 8 % 4}]` : `${e}[${Math.floor(t / 4)}][${t % 4}]` : r > 1 ? `${e}[${t}]` : e, Qt = (e, t, r, i, a) => {
		let n = typeof r == "number", s = n ? r : r.length, u = [...new Array(s).keys()], d = s < 2 ? "u32" : s <= 4 ? `vec${s}<u32>` : `array<u32, ${s}>`, p = zr(t, a), f = typeof p == "string" ? p : p[1], c = {
			indices: d,
			value: f,
			storage: typeof p == "string" ? p : p[0],
			tensor: t
		}, g = (M) => typeof M == "string" ? M : `${M}u`, y = {
			offsetToIndices: !1,
			indicesToOffset: !1,
			broadcastedIndicesToOffset: !1,
			set: !1,
			setByIndices: !1,
			get: !1,
			getByIndices: !1
		}, _ = n ? "uniforms." : "", $ = `${_}${e}_shape`, S = `${_}${e}_strides`, x = "";
		for (let M = 0; M < s - 1; M++) x += `
    let dim${M} = current / ${j(S, M, s)};
    let rest${M} = current % ${j(S, M, s)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;
		x += `indices[${s - 1}] = current;`;
		let b = s < 2 ? "" : `
  fn o2i_${e}(offset: u32) -> ${c.indices} {
    var indices: ${c.indices};
    var current = offset;
    ${x}
    return indices;
  }`, T = (M) => (y.offsetToIndices = !0, s < 2 ? M : `o2i_${e}(${M})`), I = [];
		if (s >= 2) for (let M = s - 1; M >= 0; M--) I.push(`${j(S, M, s)} * (indices[${M}])`);
		let E = s < 2 ? "" : `
  fn i2o_${e}(indices: ${c.indices}) -> u32 {
    return ${I.join("+")};
  }`, C = (M) => (y.indicesToOffset = !0, s < 2 ? M : `i2o_${e}(${M})`), A = (...M) => s === 0 ? "0u" : `${c.indices}(${M.map(g).join(",")})`, w = (M, H) => s < 2 ? `${M}` : `${j(M, H, s)}`, P = (M, H, oe) => s < 2 ? `${M}=${oe};` : `${j(M, H, s)}=${oe};`, q = {}, Q = (M, H) => {
			y.broadcastedIndicesToOffset = !0;
			let oe = `${H.name}broadcastedIndicesTo${e}Offset`;
			if (oe in q) return `${oe}(${M})`;
			let ne = [];
			for (let V = s - 1; V >= 0; V--) {
				let Be = H.indicesGet("outputIndices", V + H.rank - s);
				ne.push(`${w(S, V)} * (${Be} % ${w($, V)})`);
			}
			return q[oe] = `fn ${oe}(outputIndices: ${H.type.indices}) -> u32 {
             return ${ne.length > 0 ? ne.join("+") : "0u"};
           }`, `${oe}(${M})`;
		}, K = (M, H) => (() => {
			if (c.storage === c.value) return `${e}[${M}]=${H};`;
			if (c.storage === "vec2<u32>" && c.value === "i32") return `${e}[${M}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;
			if (c.storage === "vec2<u32>" && c.value === "u32") return `${e}[${M}]=vec2<u32>(u32(${H}), 0u);`;
			if (c.storage === "u32" && c.value === "vec4<bool>") return `${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;
			throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`);
		})(), X = (M) => (() => {
			if (c.storage === c.value) return `${e}[${M}]`;
			if (c.storage === "vec2<u32>" && c.value === "i32") return `i32(${e}[${M}].x)`;
			if (c.storage === "vec2<u32>" && c.value === "u32") return `u32(${e}[${M}].x)`;
			if (c.storage === "u32" && c.value === "vec4<bool>") return `vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;
			throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`);
		})(), R = s < 2 ? "" : `
  fn get_${e}ByIndices(indices: ${c.indices}) -> ${f} {
    return ${X(`i2o_${e}(indices)`)};
  }`, D = s < 2 ? "" : (() => {
			let M = u.map((oe) => `d${oe}: u32`).join(", "), H = u.map((oe) => `d${oe}`).join(", ");
			return `
  fn get_${e}(${M}) -> ${f} {
    return get_${e}ByIndices(${A(H)});
  }`;
		})(), G = (...M) => {
			if (M.length !== s) throw new Error(`indices length must be ${s}`);
			let H = M.map(g).join(",");
			return s === 0 ? X("0u") : s === 1 ? X(H[0]) : (y.get = !0, y.getByIndices = !0, y.indicesToOffset = !0, `get_${e}(${H})`);
		}, Y = (M) => s < 2 ? X(M) : (y.getByIndices = !0, y.indicesToOffset = !0, `get_${e}ByIndices(${M})`), ee = s < 2 ? "" : `
  fn set_${e}ByIndices(indices: ${c.indices}, value: ${f}) {
    ${K(`i2o_${e}(indices)`, "value")}
  }`, te = s < 2 ? "" : (() => {
			let M = u.map((oe) => `d${oe}: u32`).join(", "), H = u.map((oe) => `d${oe}`).join(", ");
			return `
  fn set_${e}(${M}, value: ${f}) {
    set_${e}ByIndices(${A(H)}, value);
  }`;
		})();
		return {
			impl: () => {
				let M = [], H = !1;
				return y.offsetToIndices && (M.push(b), H = !0), y.indicesToOffset && (M.push(E), H = !0), y.broadcastedIndicesToOffset && (Object.values(q).forEach((oe) => M.push(oe)), H = !0), y.set && (M.push(te), H = !0), y.setByIndices && (M.push(ee), H = !0), y.get && (M.push(D), H = !0), y.getByIndices && (M.push(R), H = !0), !n && H && M.unshift(`const ${$} = ${c.indices}(${r.join(",")});`, `const ${S} = ${c.indices}(${O.computeStrides(r).join(",")});`), M.join(`
`);
			},
			type: c,
			offsetToIndices: T,
			indicesToOffset: C,
			broadcastedIndicesToOffset: Q,
			indices: A,
			indicesGet: w,
			indicesSet: P,
			set: (...M) => {
				if (M.length !== s + 1) throw new Error(`indices length must be ${s}`);
				let H = M[s];
				if (typeof H != "string") throw new Error("value must be string");
				let oe = M.slice(0, s).map(g).join(",");
				return s === 0 ? K("0u", H) : s === 1 ? K(oe[0], H) : (y.set = !0, y.setByIndices = !0, y.indicesToOffset = !0, `set_${e}(${oe}, ${H})`);
			},
			setByOffset: K,
			setByIndices: (M, H) => s < 2 ? K(M, H) : (y.setByIndices = !0, y.indicesToOffset = !0, `set_${e}ByIndices(${M}, ${H});`),
			get: G,
			getByOffset: X,
			getByIndices: Y,
			usage: i,
			name: e,
			strides: S,
			shape: $,
			rank: s
		};
	}, N = (e, t, r, i = 1) => Qt(e, t, r, "input", i), F = (e, t, r, i = 1) => Qt(e, t, r, "output", i), hp = (e, t, r) => Qt(e, t, r, "atomicOutput", 1), Wa = (e, t, r, i = 1) => Qt(e, t, r, "internal", i), To = class {
		constructor(e, t) {
			this.normalizedDispatchGroup = e, this.limits = t, this.internalVariables = [], this.variables = [], this.uniforms = [], this.variableIndex = 0;
		}
		guardAgainstOutOfBoundsWorkgroupSizes(e) {
			return `if (global_idx >= ${typeof e == "number" ? `${e}u` : e}) { return; }`;
		}
		mainStart(e = Lt) {
			let t = typeof e == "number" ? e : e[0], r = typeof e == "number" ? 1 : e[1], i = typeof e == "number" ? 1 : e[2];
			if (t > this.limits.maxComputeWorkgroupSizeX || r > this.limits.maxComputeWorkgroupSizeY || i > this.limits.maxComputeWorkgroupSizeZ) throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);
			if (t * r * i > this.limits.maxComputeInvocationsPerWorkgroup) throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);
			let a = this.normalizedDispatchGroup[1] === 1 && this.normalizedDispatchGroup[2] === 1;
			return `@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a ? `@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>` : `@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`}) {
    ${a ? `let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;` : `let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t * r * i}u + local_idx;`}
  `;
		}
		appendVariableUniforms(e) {
			e.rank !== 0 && (e.shape.startsWith("uniforms.") && this.uniforms.push({
				name: e.shape.replace("uniforms.", ""),
				type: "u32",
				length: e.rank
			}), e.strides.startsWith("uniforms.") && this.uniforms.push({
				name: e.strides.replace("uniforms.", ""),
				type: "u32",
				length: e.rank
			}));
		}
		declareVariable(e, t) {
			if (e.usage === "internal") throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");
			this.variables.push(e), this.appendVariableUniforms(e);
			let r = e.usage === "input" ? "read" : "read_write", i = e.usage === "atomicOutput" ? "atomic<i32>" : e.type.storage;
			return `@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`;
		}
		declareVariables(...e) {
			return e.map((t) => this.declareVariable(t, this.variableIndex++)).join(`
`);
		}
		registerInternalVariable(e) {
			if (e.usage !== "internal") throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");
			this.internalVariables.push(e), this.appendVariableUniforms(e);
		}
		registerInternalVariables(...e) {
			return e.forEach((t) => this.registerInternalVariable(t)), this;
		}
		registerUniform(e, t, r = 1) {
			return this.uniforms.push({
				name: e,
				type: t,
				length: r
			}), this;
		}
		registerUniforms(e) {
			return this.uniforms = this.uniforms.concat(e), this;
		}
		uniformDeclaration() {
			if (this.uniforms.length === 0) return "";
			let e = [];
			for (let { name: t, type: r, length: i } of this.uniforms) if (i && i > 4) r === "f16" ? e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i / 8)}>`) : e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i / 4)}>`);
			else {
				let a = i == null || i === 1 ? r : `vec${i}<${r}>`;
				e.push(`${t}:${a}`);
			}
			return `
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`;
		}
		get additionalImplementations() {
			return this.uniformDeclaration() + this.variables.map((e) => e.impl()).join(`
`) + this.internalVariables.map((e) => e.impl()).join(`
`);
		}
		get variablesInfo() {
			if (this.uniforms.length === 0) return;
			let e = (t) => [
				12,
				10,
				1,
				6
			][[
				"u32",
				"f16",
				"f32",
				"i32"
			].indexOf(t)];
			return this.uniforms.map((t) => [e(t.type), t.length ?? 1]);
		}
	}, fp = (e, t) => new To(e, t);
}), Io, Di, Eo, zo, Co, Ao, De, mp, gp, gt = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Io = (e, t) => {
		if (!e || e.length !== 1) throw new Error("Transpose requires 1 input.");
		if (t.length !== 0 && t.length !== e[0].dims.length) throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`);
	}, Di = (e, t) => t.length !== 0 ? t : [...new Array(e).keys()].reverse(), Eo = (e, t) => O.sortBasedOnPerm(e, Di(e.length, t)), zo = (e, t, r, i) => {
		let a = `fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;
		for (let n = 0; n < t; ++n) a += `a[${e[n]}]=i[${n}];`;
		return a += "return a;}";
	}, Co = (e, t) => {
		let r = [], i = [];
		for (let a = 0; a < e.length; ++a) e[a] !== 1 && r.push(e[a]), e[t[a]] !== 1 && i.push(t[a]);
		return {
			newShape: r,
			newPerm: i
		};
	}, Ao = (e, t) => {
		let r = 0;
		for (let i = 0; i < e.length; ++i) if (t[e[i]] !== 1) {
			if (e[i] < r) return !1;
			r = e[i];
		}
		return !0;
	}, De = (e, t) => {
		let r = e.dataType, i = e.dims.length, a = Di(i, t), n = Eo(e.dims, a), s = e.dims, u = n, d = i < 2 || Ao(a, e.dims), p;
		if (d) return p = (_) => {
			let $ = N("input", r, s, 4), S = F("output", r, u, 4);
			return `
  ${_.registerUniform("output_size", "u32").declareVariables($, S)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`;
		}, {
			name: "TransposeCopy",
			shaderCache: { inputDependencies: ["type"] },
			getRunData: () => {
				let _ = O.size(n);
				return {
					outputs: [{
						dims: n,
						dataType: e.dataType
					}],
					dispatchGroup: { x: Math.ceil(_ / 64 / 4) },
					programUniforms: [{
						type: 12,
						data: Math.ceil(_ / 4)
					}]
				};
			},
			getShaderSource: p
		};
		let { newShape: f, newPerm: c } = Co(e.dims, a), g = O.areEqual(c, [
			2,
			3,
			1
		]), y = O.areEqual(c, [
			3,
			1,
			2
		]);
		if (f.length === 2 || g || y) {
			s = g ? [f[0], f[1] * f[2]] : y ? [f[0] * f[1], f[2]] : f, u = [s[1], s[0]];
			let _ = 16;
			return p = ($) => {
				let S = N("a", r, s.length), x = F("output", r, u.length);
				return `
  ${$.registerUniform("output_size", "u32").declareVariables(S, x)}
  var<workgroup> tile : array<array<${x.type.value}, 17>, ${_}>;
  ${$.mainStart([
					_,
					_,
					1
				])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`, "tile[local_id.x][local_id.y]")}
    }
  }`;
			}, {
				name: "TransposeShared",
				shaderCache: { inputDependencies: ["type"] },
				getRunData: () => {
					let $ = O.size(n);
					return {
						outputs: [{
							dims: n,
							dataType: e.dataType
						}],
						dispatchGroup: {
							x: Math.ceil(u[1] / _),
							y: Math.ceil(u[0] / _)
						},
						programUniforms: [{
							type: 12,
							data: $
						}, ...Z(s, u)]
					};
				},
				getShaderSource: p
			};
		}
		return p = (_) => {
			let $ = N("a", r, s.length), S = F("output", r, u.length);
			return `
  ${_.registerUniform("output_size", "u32").declareVariables($, S)}

  ${zo(a, i, $, S)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx", $.getByIndices("aIndices"))}
  }`;
		}, {
			name: "Transpose",
			shaderCache: {
				hint: `${t}`,
				inputDependencies: ["rank"]
			},
			getRunData: () => {
				let _ = O.size(n);
				return {
					outputs: [{
						dims: n,
						dataType: e.dataType
					}],
					dispatchGroup: { x: Math.ceil(_ / 64) },
					programUniforms: [{
						type: 12,
						data: _
					}, ...Z(s, u)]
				};
			},
			getShaderSource: p
		};
	}, mp = (e, t) => {
		Io(e.inputs, t.perm), e.compute(De(e.inputs[0], t.perm));
	}, gp = (e) => fe({ perm: e.perm });
}), Oo, Ro, Bo, No, Mo, Do, Uo, Po, qo, Lo, We, yp, _p, vp, bp, $p, wp, xp, Sp, kp, Tp, Qg = U(() => {
	"use strict";
	J(), re(), ie(), Va(), gt(), Oo = {
		max: "select(bestValue, candidate, candidate > bestValue)",
		min: "select(bestValue, candidate, candidate < bestValue)",
		mean: "bestValue + candidate",
		sum: "bestValue + candidate",
		prod: "bestValue * candidate",
		sumSquare: "bestValue + candidate * candidate",
		logSumExp: "bestValue + exp(candidate)",
		l1: "bestValue + abs(candidate)",
		l2: "bestValue + candidate * candidate",
		logSum: "bestValue + candidate"
	}, Ro = {
		max: "select(bestValue, candidate, candidate > bestValue)",
		min: "select(bestValue, candidate, candidate < bestValue)",
		mean: "bestValue + candidate",
		sum: "bestValue + candidate",
		prod: "bestValue * candidate",
		sumSquare: "bestValue + candidate",
		logSumExp: "bestValue + candidate",
		l1: "bestValue + candidate",
		l2: "bestValue + candidate",
		logSum: "bestValue + candidate"
	}, Bo = {
		max: "_A[offset]",
		min: "_A[offset]",
		mean: "0",
		sum: "0",
		prod: "1",
		sumSquare: "0",
		logSumExp: "0",
		l1: "0",
		l2: "0",
		logSum: "0"
	}, No = {
		max: "bestValue",
		min: "bestValue",
		sum: "bestValue",
		prod: "bestValue",
		sumSquare: "bestValue",
		logSumExp: "log(bestValue)",
		l1: "bestValue",
		l2: "sqrt(bestValue)",
		logSum: "log(bestValue)"
	}, Mo = (e, t) => {
		let r = [];
		for (let i = t - e; i < t; ++i) r.push(i);
		return r;
	}, Do = (e, t) => {
		let r = [], i = e.length;
		for (let a = 0; a < i; a++) t.indexOf(a) === -1 && r.push(e[a]);
		return [r, t.map((a) => e[a])];
	}, Uo = (e, t) => {
		let r = e.length + t.length, i = [], a = 0;
		for (let n = 0; n < r; n++) t.indexOf(n) === -1 ? i.push(e[a++]) : i.push(1);
		return i;
	}, Po = (e, t) => {
		for (let r = 0; r < e.length; ++r) if (e[e.length - r - 1] !== t - 1 - r) return !1;
		return !0;
	}, qo = (e, t) => {
		let r = [];
		if (!Po(e, t)) {
			for (let i = 0; i < t; ++i) e.indexOf(i) === -1 && r.push(i);
			e.forEach((i) => r.push(i));
		}
		return r;
	}, Lo = (e, t, r, i, a, n, s) => {
		let u = r[0].dims, d = O.size(n), p = O.size(s), f = N("_A", r[0].dataType, u), c = F("output", a, n), g = 64;
		d === 1 && (g = 256);
		let y = `
          var<workgroup> aBestValues : array<f32, ${g}>;
       `, _ = ($) => `
        ${$.registerUniform("reduceSize", "u32").declareVariables(f, c)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Bo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${Oo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Ro[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex", `${i === "mean" ? `${c.type.storage}(bestValue / f32(uniforms.reduceSize))` : `${c.type.storage}(${No[i]})`}`)};
         }
        }`;
		return {
			name: e,
			shaderCache: {
				hint: `${t};${g}`,
				inputDependencies: ["type"]
			},
			getShaderSource: _,
			getRunData: () => ({
				outputs: [{
					dims: n,
					dataType: a
				}],
				dispatchGroup: { x: d },
				programUniforms: [{
					type: 12,
					data: p
				}]
			})
		};
	}, We = (e, t, r, i) => {
		let a = e.inputs.length === 1 ? r : va(e.inputs, r), n = a.axes;
		n.length === 0 && !a.noopWithEmptyAxes && (n = e.inputs[0].dims.map((y, _) => _));
		let s = O.normalizeAxes(n, e.inputs[0].dims.length), u = s, d = e.inputs[0], p = qo(u, e.inputs[0].dims.length);
		p.length > 0 && (d = e.compute(De(e.inputs[0], p), {
			inputs: [0],
			outputs: [-1]
		})[0], u = Mo(u.length, d.dims.length));
		let [f, c] = Do(d.dims, u), g = f;
		a.keepDims && (g = Uo(f, s)), e.compute(Lo(t, a.cacheKey, [d], i, e.inputs[0].dataType, g, c), { inputs: [d] });
	}, yp = (e, t) => {
		We(e, "ReduceMeanShared", t, "mean");
	}, _p = (e, t) => {
		We(e, "ReduceL1Shared", t, "l1");
	}, vp = (e, t) => {
		We(e, "ReduceL2Shared", t, "l2");
	}, bp = (e, t) => {
		We(e, "ReduceLogSumExpShared", t, "logSumExp");
	}, $p = (e, t) => {
		We(e, "ReduceMaxShared", t, "max");
	}, wp = (e, t) => {
		We(e, "ReduceMinShared", t, "min");
	}, xp = (e, t) => {
		We(e, "ReduceProdShared", t, "prod");
	}, Sp = (e, t) => {
		We(e, "ReduceSumShared", t, "sum");
	}, kp = (e, t) => {
		We(e, "ReduceSumSquareShared", t, "sumSquare");
	}, Tp = (e, t) => {
		We(e, "ReduceLogSumShared", t, "logSum");
	};
}), Ve, Wo, Vr, va, Ge, Vo, Go, Ho, Fo, jo, Ko, Zo, Xo, Qo, Yo, He, Ip, Ep, zp, Cp, Ap, Op, Rp, Bp, Np, Mp, Va = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Qg(), Ve = (e) => {
		if (!e || e.length === 0 || e.length > 2) throw new Error("Reduce op requires 1 or 2 inputs.");
		if (e.length === 2 && e[1].dims.length !== 1) throw new Error("Invalid axes input dims.");
	}, Wo = (e) => [
		"",
		"",
		`var value = ${e.getByIndices("input_indices")};`,
		""
	], Vr = (e, t, r, i, a, n, s = !1, u = !1) => {
		let d = [], p = r[0].dims, f = p.length, c = O.normalizeAxes(a, f), g = !u && c.length === 0;
		p.forEach(($, S) => {
			g || c.indexOf(S) >= 0 ? s && d.push(1) : d.push($);
		});
		let y = d.length, _ = O.size(d);
		return {
			name: e,
			shaderCache: t,
			getShaderSource: ($) => {
				let S = [], x = N("_A", r[0].dataType, f), b = F("output", n, y), T = i(x, b, c), I = T[2];
				for (let E = 0, C = 0; E < f; E++) g || c.indexOf(E) >= 0 ? (s && C++, I = `for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${T[2].includes("last_index") ? `let last_index = j${E};` : ""}
                  ${x.indicesSet("input_indices", E, `j${E}`)}
                  ${I}
                }`) : (S.push(`${x.indicesSet("input_indices", E, b.indicesGet("output_indices", C))};`), C++);
				return `

        ${$.registerUniform("output_size", "u32").declareVariables(x, b)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${I}
          ${T[3]}
          ${T.length === 4 ? b.setByOffset("global_idx", "value") : T.slice(4).join(`
`)}
        }`;
			},
			getRunData: () => ({
				outputs: [{
					dims: d,
					dataType: n
				}],
				dispatchGroup: { x: Math.ceil(_ / 64) },
				programUniforms: [{
					type: 12,
					data: _
				}, ...Z(p, d)]
			})
		};
	}, va = (e, t) => {
		let r = [];
		return e[1].dims[0] > 0 && e[1].getBigInt64Array().forEach((i) => r.push(Number(i))), fe({
			axes: r,
			keepDims: t.keepDims,
			noopWithEmptyAxes: t.noopWithEmptyAxes
		});
	}, Ge = (e, t, r, i) => {
		let a = e.inputs, n = a.length === 1 ? r : va(a, r);
		e.compute(Vr(t, {
			hint: n.cacheKey,
			inputDependencies: ["rank"]
		}, [a[0]], n.noopWithEmptyAxes && n.axes.length === 0 ? Wo : i, n.axes, a[0].dataType, n.keepDims, n.noopWithEmptyAxes), { inputs: [0] });
	}, Vo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceLogSum", t, (r, i) => [
			`var value = ${i.type.storage}(0);`,
			"",
			`value += ${r.getByIndices("input_indices")};`,
			"value = log(value);"
		]);
	}, Go = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceL1", t, (r, i) => [
			`var value = ${i.type.storage}(0);`,
			"",
			`value += abs(${r.getByIndices("input_indices")});`,
			""
		]);
	}, Ho = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceL2", t, (r, i) => [
			`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,
			"",
			`t = ${r.getByIndices("input_indices")}; value += (t * t);`,
			"value = sqrt(value);"
		]);
	}, Fo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceLogSumExp", t, (r, i) => [
			`var value = ${i.type.storage}(0);`,
			"",
			`value += exp(${r.getByIndices("input_indices")});`,
			"value = log(value);"
		]);
	}, jo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceMax", t, (r, i, a) => {
			let n = [];
			for (let s = 0; s < r.rank; s++) (a.indexOf(s) >= 0 || a.length === 0) && n.push(r.indicesSet("input_indices", s, 0));
			return [
				`${n.join(`
`)}`,
				`var value = ${r.getByIndices("input_indices")};`,
				`value = max(value, ${r.getByIndices("input_indices")});`,
				""
			];
		});
	}, Ko = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceMean", t, (r, i, a) => {
			let n = 1;
			for (let s = 0; s < r.rank; s++) (a.indexOf(s) >= 0 || a.length === 0) && (n *= e.inputs[0].dims[s]);
			return [
				"var sum = f32(0);",
				"",
				`sum += f32(${r.getByIndices("input_indices")});`,
				`let value = ${i.type.value}(sum / ${n});`
			];
		});
	}, Zo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceMin", t, (r, i, a) => {
			let n = [];
			for (let s = 0; s < r.rank; s++) (a.indexOf(s) >= 0 || a.length === 0) && n.push(`input_indices[${s}] = 0;`);
			return [
				`${n.join(`
`)}`,
				`var value = ${r.getByIndices("input_indices")};`,
				`value = min(value, ${r.getByIndices("input_indices")});`,
				""
			];
		});
	}, Xo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceProd", t, (r, i) => [
			`var value = ${i.type.storage}(1);`,
			"",
			`value *= ${r.getByIndices("input_indices")};`,
			""
		]);
	}, Qo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceSum", t, (r, i) => [
			`var value = ${i.type.storage}(0);`,
			"",
			`value += ${r.getByIndices("input_indices")};`,
			""
		]);
	}, Yo = (e, t) => {
		Ve(e.inputs), Ge(e, "ReduceSumSquare", t, (r, i) => [
			`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,
			"",
			`t = ${r.getByIndices("input_indices")}; value += t * t;`,
			""
		]);
	}, He = (e, t, r) => {
		if (t.length === 0) return r;
		let i = 1, a = 1;
		for (let n = 0; n < t.length; n++) t.indexOf(n) === -1 ? i *= e[n] : a *= e[n];
		return a < 32 && i > 1024;
	}, Ip = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Ko(e, t) : yp(e, t);
	}, Ep = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Go(e, t) : _p(e, t);
	}, zp = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Ho(e, t) : vp(e, t);
	}, Cp = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Fo(e, t) : bp(e, t);
	}, Ap = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? jo(e, t) : $p(e, t);
	}, Op = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Zo(e, t) : wp(e, t);
	}, Rp = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Xo(e, t) : xp(e, t);
	}, Bp = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Qo(e, t) : Sp(e, t);
	}, Np = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Yo(e, t) : kp(e, t);
	}, Mp = (e, t) => {
		He(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Vo(e, t) : Tp(e, t);
	};
}), Ui, Dp, Up, ba, Yg = U(() => {
	"use strict";
	J(), xe(), Va(), Ui = (e) => {
		if (!e || e.length === 0 || e.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");
		if (e[0].dataType !== 1) throw new Error("Invalid input type.");
	}, Dp = (e, t) => {
		Ui(e.inputs);
		let r = (i, a, n) => {
			let s = [];
			for (let u = 0; u < i.rank; u++) (n.indexOf(u) >= 0 || n.length === 0) && s.push(`input_indices[${u}] = 0;`);
			return [
				`${s.join(`
`)}`,
				`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,
				`if (${i.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? "<=" : "<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,
				"",
				a.setByOffset("global_idx", "best_index")
			];
		};
		e.compute(Vr("ArgMin", {
			hint: t.cacheKey,
			inputDependencies: ["rank"]
		}, [e.inputs[0]], r, [t.axis], 7, t.keepDims), { inputs: [0] });
	}, Up = (e, t) => {
		Ui(e.inputs);
		let r = (i, a, n) => {
			let s = [];
			for (let u = 0; u < i.rank; u++) (n.indexOf(u) >= 0 || n.length === 0) && s.push(`input_indices[${u}] = 0;`);
			return [
				`${s.join(`
`)}`,
				`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,
				`if (${i.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? ">=" : ">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,
				"",
				a.setByOffset("global_idx", "best_index")
			];
		};
		e.compute(Vr("argMax", {
			hint: t.cacheKey,
			inputDependencies: ["rank"]
		}, [e.inputs[0]], r, [t.axis], 7, t.keepDims), { inputs: [0] });
	}, ba = (e) => fe(e);
}), Jo, Cr, eu, tu, ru, dr, iu, Pp, Ga = U(() => {
	"use strict";
	J(), re(), La(), ie(), Jo = (e, t) => {
		let r = e[0], i = e[1], a = e[2], n = e[3], s = e[4], u = e[5];
		if (s && u) throw new Error("Attention cannot have both past and attention_bias");
		if (r.dims.length !== 3) throw new Error("Input \"input\" must have 3 dimensions");
		let d = r.dims[0], p = r.dims[1], f = r.dims[2];
		if (a.dims.length !== 1) throw new Error("Input \"bias\" is expected to have 1 dimensions");
		if (i.dims.length !== 2) throw new Error("Input \"weights\" is expected to have 2 dimensions");
		if (i.dims[0] !== f) throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");
		if (a.dims[0] !== i.dims[1]) throw new Error("Input \"bias\" dimension 0 should have same length as dimension 1 of input \"weights\"");
		let c = a.dims[0] / 3, g = c, y = g;
		if (t.qkvHiddenSizes.length > 0) {
			if (t.qkvHiddenSizes.length !== 3) throw new Error("qkv_hidden_sizes attribute should have 3 elements");
			for (let T of t.qkvHiddenSizes) if (T % t.numHeads !== 0) throw new Error("qkv_hidden_sizes should be divisible by num_heads");
			c = t.qkvHiddenSizes[0], g = t.qkvHiddenSizes[1], y = t.qkvHiddenSizes[2];
		}
		let _ = p;
		if (c !== g) throw new Error("qkv_hidden_sizes first element should be same as the second");
		if (a.dims[0] !== c + g + y) throw new Error("Input \"bias\" dimension 0 should have same length as sum of Q/K/V hidden sizes");
		let $ = 0;
		if (s) {
			if (g !== y) throw new Error("Input \"past\" expect k_hidden_size == v_hidden_size");
			if (s.dims.length !== 5) throw new Error("Input \"past\" must have 5 dimensions");
			if (s.dims[0] !== 2) throw new Error("Input \"past\" first dimension must be 2");
			if (s.dims[1] !== d) throw new Error("Input \"past\" second dimension must be batch_size");
			if (s.dims[2] !== t.numHeads) throw new Error("Input \"past\" third dimension must be num_heads");
			if (s.dims[4] !== g / t.numHeads) throw new Error("Input \"past\" fifth dimension must be k_hidden_size / num_heads");
			t.pastPresentShareBuffer || ($ = s.dims[3]);
		}
		let S = _ + $, x = -1, b = 0;
		if (n) throw new Error("Mask not supported");
		if (s) throw new Error("past is not supported");
		if (u) {
			if (u.dims.length !== 4) throw new Error("Input \"attention_bias\" must have 4 dimensions");
			if (u.dims[0] !== d || u.dims[1] !== t.numHeads || u.dims[2] !== p || u.dims[3] !== S) throw new Error("Expect \"attention_bias\" shape (batch_size, num_heads, sequence_length, total_sequence_length)");
		}
		return {
			batchSize: d,
			sequenceLength: p,
			pastSequenceLength: $,
			kvSequenceLength: _,
			totalSequenceLength: S,
			maxSequenceLength: x,
			inputHiddenSize: f,
			hiddenSize: c,
			vHiddenSize: y,
			headSize: Math.floor(c / t.numHeads),
			vHeadSize: Math.floor(y / t.numHeads),
			numHeads: t.numHeads,
			isUnidirectional: !1,
			pastPresentShareBuffer: !1,
			maskFilterValue: t.maskFilterValue,
			maskType: b,
			scale: t.scale,
			broadcastResPosBias: !1,
			passPastInKv: !1,
			qkvFormat: 1
		};
	}, Cr = (e, t, r) => t && e ? `
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       ` : `
    ${r ? "let past_sequence_length = uniforms.past_sequence_length" : ""};
    let present_sequence_length = total_sequence_length;
    `, eu = (e, t, r, i, a, n, s, u) => {
		let d = we(s ? 1 : n), p = 64, f = n / d;
		f < p && (p = 32);
		let c = Math.ceil(n / d / p), g = [
			{
				type: 12,
				data: t
			},
			{
				type: 12,
				data: r
			},
			{
				type: 12,
				data: i
			},
			{
				type: 12,
				data: a
			},
			{
				type: 12,
				data: f
			},
			{
				type: 12,
				data: c
			}
		], y = Te(e.dataType, d), _ = Ce(1, d), $ = ["type"];
		s && $.push("type"), u && $.push("type");
		let S = (x) => {
			let b = F("x", e.dataType, e.dims, d), T = [b], I = s ? N("seq_lens", s.dataType, s.dims) : void 0;
			I && T.push(I);
			let E = u ? N("total_sequence_length_input", u.dataType, u.dims) : void 0;
			E && T.push(E);
			let C = Ce(e.dataType);
			return `
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${x.registerUniforms([
				{
					name: "batch_size",
					type: "u32"
				},
				{
					name: "num_heads",
					type: "u32"
				},
				{
					name: "past_sequence_length",
					type: "u32"
				},
				{
					name: "sequence_length",
					type: "u32"
				},
				{
					name: "total_sequence_length",
					type: "u32"
				},
				{
					name: "elements_per_thread",
					type: "u32"
				}
			]).declareVariables(...T)}
  ${x.mainStart([
				p,
				1,
				1
			])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Cr(I, E, !1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s ? "u32(past_sequence_length + workgroup_id.y + 1)" : "total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(() => {
				switch (d) {
					case 1: return "thread_max_vector";
					case 2: return "max(thread_max_vector.x, thread_max_vector.y)";
					case 4: return "max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";
					default: throw new Error(`Unsupported components: ${d}`);
				}
			})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(() => {
				switch (d) {
					case 1: return "sum_vector";
					case 2: return "sum_vector.x + sum_vector.y";
					case 4: return "sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";
					default: throw new Error(`Unsupported components: ${d}`);
				}
			})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s ? `
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${C}(0));
        }` : ""};
  }`;
		};
		return {
			name: "AttentionProbsSoftmax",
			shaderCache: {
				hint: `${p};${y};${d}`,
				inputDependencies: $
			},
			getShaderSource: S,
			getRunData: () => ({
				outputs: [],
				dispatchGroup: {
					x: 1,
					y: a,
					z: t * r
				},
				programUniforms: g
			})
		};
	}, tu = (e, t, r, i, a, n, s, u, d) => {
		let p = s + n.kvSequenceLength, f = [
			n.batchSize,
			n.numHeads,
			n.sequenceLength,
			p
		], c = e > 1 && i, g = n.kvNumHeads ? n.kvNumHeads : n.numHeads, y = c ? [
			n.batchSize,
			g,
			p,
			n.headSize
		] : void 0, _ = n.nReps ? n.nReps : 1, $ = n.scale === 0 ? 1 / Math.sqrt(n.headSize) : n.scale, S = we(n.headSize), x = n.headSize / S, b = 12, T = {
			x: Math.ceil(p / b),
			y: Math.ceil(n.sequenceLength / b),
			z: n.batchSize * n.numHeads
		}, I = [
			{
				type: 12,
				data: n.sequenceLength
			},
			{
				type: 12,
				data: x
			},
			{
				type: 12,
				data: p
			},
			{
				type: 12,
				data: n.numHeads
			},
			{
				type: 12,
				data: n.headSize
			},
			{
				type: 1,
				data: $
			},
			{
				type: 12,
				data: s
			},
			{
				type: 12,
				data: n.kvSequenceLength
			},
			{
				type: 12,
				data: _
			}
		], E = c && i && O.size(i.dims) > 0, C = ["type", "type"];
		E && C.push("type"), a && C.push("type"), u && C.push("type"), d && C.push("type");
		let A = [{
			dims: f,
			dataType: t.dataType,
			gpuDataType: 0
		}];
		c && A.push({
			dims: y,
			dataType: t.dataType,
			gpuDataType: 0
		});
		let w = (P) => {
			let q = N("q", t.dataType, t.dims, S), Q = [q, N("key", r.dataType, r.dims, S)];
			if (E) {
				let Y = N("past_key", i.dataType, i.dims, S);
				Q.push(Y);
			}
			a && Q.push(N("attention_bias", a.dataType, a.dims));
			let K = u ? N("seq_lens", u.dataType, u.dims) : void 0;
			K && Q.push(K);
			let X = d ? N("total_sequence_length_input", d.dataType, d.dims) : void 0;
			X && Q.push(X);
			let R = F("output", t.dataType, f), D = [R];
			c && D.push(F("present_key", t.dataType, y, S));
			let G = Ce(1, S);
			return `
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${b * b}>;
  var<workgroup> tileK: array<${q.type.storage}, ${b * b}>;
  ${P.registerUniforms([
				{
					name: "M",
					type: "u32"
				},
				{
					name: "K",
					type: "u32"
				},
				{
					name: "N",
					type: "u32"
				},
				{
					name: "num_heads",
					type: "u32"
				},
				{
					name: "head_size",
					type: "u32"
				},
				{
					name: "alpha",
					type: "f32"
				},
				{
					name: "past_sequence_length",
					type: "u32"
				},
				{
					name: "kv_sequence_length",
					type: "u32"
				},
				{
					name: "n_reps",
					type: "u32"
				}
			]).declareVariables(...Q, ...D)}
  ${P.mainStart([
				b,
				b,
				1
			])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_ === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_ === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Cr(K, X, !0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E && c ? "let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;" : ""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c ? "let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;" : ""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E && c ? `
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }` : `
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${c ? `if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }` : ""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(() => {
				switch (S) {
					case 1: return "value";
					case 2: return "value.x + value.y";
					case 4: return "value.x + value.y + value.z + value.w";
					default: throw new Error(`Unsupported components: ${S}`);
				}
			})()};
        output[outputIdx] = ${R.type.value} (sum * uniforms.alpha) + ${a ? "attention_bias[outputIdx]" : "0.0"};
    }
  }`;
		};
		return {
			name: "AttentionProbs",
			shaderCache: {
				hint: `${S};${a !== void 0};${i !== void 0};${e}`,
				inputDependencies: C
			},
			getRunData: () => ({
				outputs: A,
				dispatchGroup: T,
				programUniforms: I
			}),
			getShaderSource: w
		};
	}, ru = (e, t, r, i, a, n, s = void 0, u = void 0) => {
		let d = n + a.kvSequenceLength, p = a.nReps ? a.nReps : 1, f = a.vHiddenSize * p, c = e > 1 && i, g = a.kvNumHeads ? a.kvNumHeads : a.numHeads, y = c ? [
			a.batchSize,
			g,
			d,
			a.headSize
		] : void 0, _ = [
			a.batchSize,
			a.sequenceLength,
			f
		], $ = 12, S = {
			x: Math.ceil(a.vHeadSize / $),
			y: Math.ceil(a.sequenceLength / $),
			z: a.batchSize * a.numHeads
		}, x = [
			{
				type: 12,
				data: a.sequenceLength
			},
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: a.vHeadSize
			},
			{
				type: 12,
				data: a.numHeads
			},
			{
				type: 12,
				data: a.headSize
			},
			{
				type: 12,
				data: f
			},
			{
				type: 12,
				data: n
			},
			{
				type: 12,
				data: a.kvSequenceLength
			},
			{
				type: 12,
				data: p
			}
		], b = c && i && O.size(i.dims) > 0, T = ["type", "type"];
		b && T.push("type"), s && T.push("type"), u && T.push("type");
		let I = [{
			dims: _,
			dataType: t.dataType,
			gpuDataType: 0
		}];
		c && I.push({
			dims: y,
			dataType: t.dataType,
			gpuDataType: 0
		});
		let E = (C) => {
			let A = N("probs", t.dataType, t.dims), w = [A, N("v", r.dataType, r.dims)];
			b && w.push(N("past_value", i.dataType, i.dims));
			let P = s ? N("seq_lens", s.dataType, s.dims) : void 0;
			s && w.push(P);
			let q = u ? N("total_sequence_length_input", u.dataType, u.dims) : void 0;
			u && w.push(q);
			let Q = [F("output", t.dataType, _)];
			return c && Q.push(F("present_value", t.dataType, y)), `
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${A.type.value}, ${$ * $}>;
  var<workgroup> tileV: array<${A.type.value}, ${$ * $}>;
  ${C.registerUniforms([
				{
					name: "M",
					type: "u32"
				},
				{
					name: "K",
					type: "u32"
				},
				{
					name: "N",
					type: "u32"
				},
				{
					name: "num_heads",
					type: "u32"
				},
				{
					name: "head_size",
					type: "u32"
				},
				{
					name: "v_hidden_size",
					type: "u32"
				},
				{
					name: "past_sequence_length",
					type: "u32"
				},
				{
					name: "kv_sequence_length",
					type: "u32"
				},
				{
					name: "n_reps",
					type: "u32"
				}
			]).declareVariables(...w, ...Q)}
  ${C.mainStart([
				$,
				$,
				1
			])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Cr(P, q, !0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b && c ? "let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;" : ""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c ? "let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;" : ""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b && c ? `
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      ` : `
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${c ? `
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }` : ""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`;
		};
		return {
			name: "AttentionScore",
			shaderCache: {
				hint: `${i !== void 0};${e}`,
				inputDependencies: T
			},
			getRunData: () => ({
				outputs: I,
				dispatchGroup: S,
				programUniforms: x
			}),
			getShaderSource: E
		};
	}, dr = (e, t, r, i, a, n, s, u, d, p, f = void 0, c = void 0) => {
		let g = Math.min(e.outputCount, 1 + (s ? 1 : 0) + (u ? 1 : 0)), y = g > 1 ? p.pastSequenceLength : 0, _ = y + p.kvSequenceLength, $ = d && O.size(d.dims) > 0 ? d : void 0, S = [t, r];
		g > 1 && s && O.size(s.dims) > 0 && S.push(s), $ && S.push($), f && S.push(f), c && S.push(c);
		let x = e.compute(tu(g, t, r, s, $, p, y, f, c), {
			inputs: S,
			outputs: g > 1 ? [-1, 1] : [-1]
		})[0];
		e.compute(eu(x, p.batchSize, p.numHeads, y, p.sequenceLength, _, f, c), {
			inputs: f && c ? [
				x,
				f,
				c
			] : [x],
			outputs: []
		});
		let b = [x, i];
		g > 1 && u && O.size(u.dims) > 0 && b.push(u), f && b.push(f), c && b.push(c), e.compute(ru(g, x, i, u, p, y, f, c), {
			inputs: b,
			outputs: g > 1 ? [0, 2] : [0]
		});
	}, iu = (e, t) => {
		let r = [
			t.batchSize,
			t.numHeads,
			t.sequenceLength,
			t.headSize
		], i = t.sequenceLength, a = t.inputHiddenSize, n = t.headSize, s = 12, u = {
			x: Math.ceil(t.headSize / s),
			y: Math.ceil(t.sequenceLength / s),
			z: t.batchSize * t.numHeads
		}, d = [
			e.inputs[0],
			e.inputs[1],
			e.inputs[2]
		], p = [
			{
				type: 12,
				data: i
			},
			{
				type: 12,
				data: a
			},
			{
				type: 12,
				data: n
			},
			{
				type: 12,
				data: t.numHeads
			},
			{
				type: 12,
				data: t.headSize
			},
			{
				type: 12,
				data: t.hiddenSize
			},
			{
				type: 12,
				data: t.hiddenSize + t.hiddenSize + t.vHiddenSize
			}
		], f = (c) => {
			let g = F("output_q", d[0].dataType, r), y = F("output_k", d[0].dataType, r), _ = F("output_v", d[0].dataType, r), $ = N("input", d[0].dataType, d[0].dims), S = N("weight", d[1].dataType, d[1].dims), x = N("bias", d[2].dataType, d[2].dims), b = $.type.storage;
			return `
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s * s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s * s}>;
  var<workgroup> tileWeightK: array<${b}, ${s * s}>;
  var<workgroup> tileWeightV: array<${b}, ${s * s}>;
  ${c.registerUniforms([
				{
					name: "M",
					type: "u32"
				},
				{
					name: "K",
					type: "u32"
				},
				{
					name: "N",
					type: "u32"
				},
				{
					name: "num_heads",
					type: "u32"
				},
				{
					name: "head_size",
					type: "u32"
				},
				{
					name: "hidden_size",
					type: "u32"
				},
				{
					name: "ldb",
					type: "u32"
				}
			]).declareVariables($, S, x, g, y, _)}
  ${c.mainStart([
				s,
				s,
				1
			])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`;
		};
		return e.compute({
			name: "AttentionPrepare",
			shaderCache: { inputDependencies: [
				"type",
				"type",
				"type"
			] },
			getRunData: () => ({
				outputs: [
					{
						dims: r,
						dataType: e.inputs[0].dataType,
						gpuDataType: 0
					},
					{
						dims: r,
						dataType: e.inputs[0].dataType,
						gpuDataType: 0
					},
					{
						dims: r,
						dataType: e.inputs[0].dataType,
						gpuDataType: 0
					}
				],
				dispatchGroup: u,
				programUniforms: p
			}),
			getShaderSource: f
		}, {
			inputs: d,
			outputs: [
				-1,
				-1,
				-1
			]
		});
	}, Pp = (e, t) => {
		let r = Jo(e.inputs, t), [i, a, n] = iu(e, r);
		return dr(e, i, a, n, e.inputs[4], void 0, void 0, void 0, e.inputs[5], r);
	};
}), au, nu, su, qp, Jg = U(() => {
	"use strict";
	qe(), J(), re(), xe(), ie(), au = (e, t) => {
		if (!e || e.length !== 5) throw new Error("BatchNormalization requires 5 inputs");
		let r = (i, a, n) => {
			let s = a.length;
			if (s !== i.length) throw new Error(`${n}: num dimensions != ${s}`);
			a.forEach((u, d) => {
				if (u !== i[d]) throw new Error(`${n}: dim[${d}] do not match`);
			});
		};
		if (e[0].dims.length > 1) {
			let i = t.format === "NHWC" ? t.spatial ? e[0].dims.slice(-1) : e[0].dims.slice(-1).concat(e[0].dims.slice(1, e[0].dims.length - 1)) : e[0].dims.slice(1, t.spatial ? 2 : void 0);
			r(e[1].dims, i, "Invalid input scale"), r(e[2].dims, i, "Invalid input B"), r(e[3].dims, i, "Invalid input mean"), r(e[4].dims, i, "Invalid input var");
		} else r(e[1].dims, [1], "Invalid input scale"), r(e[2].dims, [1], "Invalid input B"), r(e[3].dims, [1], "Invalid input mean"), r(e[4].dims, [1], "Invalid input var");
	}, nu = (e, t) => {
		let { epsilon: r, spatial: i, format: a } = t, n = e[0].dims, s = i ? we(n[n.length - 1]) : 1, u = a === "NHWC" && n.length > 1 ? s : 1, d = O.size(n) / s, p = i, f = p ? n.length : n, c = N("x", e[0].dataType, e[0].dims, s), g = N("scale", e[1].dataType, e[1].dims, u), y = N("bias", e[2].dataType, e[2].dims, u), _ = N("inputMean", e[3].dataType, e[3].dims, u), $ = N("inputVar", e[4].dataType, e[4].dims, u), S = F("y", e[0].dataType, f, s), x = () => {
			let T = "";
			if (i) T = `let cOffset = ${n.length === 1 ? "0u" : a === "NHWC" ? `outputIndices[${n.length - 1}] / ${s}` : "outputIndices[1]"};`;
			else if (a === "NCHW") T = `
            ${S.indicesSet("outputIndices", "0", "0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;
			else {
				T = `var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length - 1}];`;
				for (let I = 1; I < g.rank; I++) T += `cIndices[${I}] = outputIndices[${I}];`;
				T += `let cOffset = ${g.indicesToOffset("cIndices")};`;
			}
			return T;
		}, b = (T) => `
  const epsilon = ${r};
  ${T.registerUniform("outputSize", "u32").declareVariables(c, g, y, _, $, S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${x()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx", "value")}
  }`;
		return {
			name: "BatchNormalization",
			shaderCache: {
				hint: `${t.epsilon}_${t.format}_${i}_${s}`,
				inputDependencies: p ? [
					"rank",
					"type",
					"type",
					"type",
					"type"
				] : void 0
			},
			getShaderSource: b,
			getRunData: () => ({
				outputs: [{
					dims: e[0].dims,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(d / 64) },
				programUniforms: p ? [{
					type: 12,
					data: d
				}, ...Z(n)] : [{
					type: 12,
					data: d
				}]
			})
		};
	}, su = (e) => fe(e), qp = (e, t) => {
		let { inputs: r, outputCount: i } = e, a = su({
			...t,
			outputCount: i
		});
		if (ve.webgpu.validateInputContent && au(r, a), t.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet.");
		e.compute(nu(r, a));
	};
}), ou, uu, Lp, e0 = U(() => {
	"use strict";
	re(), ie(), ou = (e) => {
		if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
		if (![
			320,
			640,
			1280
		].includes(e[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280");
		if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
		if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
	}, uu = (e) => {
		let t = e[0].dims, r = e[0].dims[2], i = O.size(t) / 4, a = e[0].dataType, n = N("input", a, t, 4), s = N("bias", a, [r], 4), u = N("residual", a, t, 4), d = F("output", a, t, 4);
		return {
			name: "BiasAdd",
			getRunData: () => ({
				outputs: [{
					dims: t,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(i / 64) }
			}),
			getShaderSource: (p) => `
  const channels = ${r}u / 4;
  ${p.declareVariables(n, s, u, d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx", "value")}
  }`
		};
	}, Lp = (e) => {
		ou(e.inputs), e.compute(uu(e.inputs));
	};
}), lu, he, Wp, Vp, Gp, Hp, Fp, jp, Kp, Zp, Xp, du, Qp, Yp, Jp, ec, sr, tc, Ur, rc, ic, ac, nc, sc, oc, uc, lc, dc, pc, cc, hc, fc, mc, gc, yc, Pi, _c, $a, wa, vc, bc, $c, pu, cu, wc, Ha = U(() => {
	"use strict";
	J(), re(), xe(), ie(), lu = (e, t, r, i, a, n, s) => {
		let u = Math.ceil(t / 4), d = "";
		typeof a == "string" ? d = `${a}(a)` : d = a("a");
		let p = N("inputData", r, [u], 4), f = F("outputData", i, [u], 4), c = [{
			name: "vec_size",
			type: "u32"
		}];
		return s && c.push(...s), `
      ${e.registerUniforms(c).declareVariables(p, f)}

  ${n ?? ""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx", d)}
  }`;
	}, he = (e, t, r, i, a, n = e.dataType, s, u) => {
		let d = [{
			type: 12,
			data: Math.ceil(O.size(e.dims) / 4)
		}];
		return s && d.push(...s), {
			name: t,
			shaderCache: {
				hint: a,
				inputDependencies: ["type"]
			},
			getShaderSource: (p) => lu(p, O.size(e.dims), e.dataType, n, r, i, u),
			getRunData: (p) => ({
				outputs: [{
					dims: e.dims,
					dataType: n
				}],
				dispatchGroup: { x: Math.ceil(O.size(p[0].dims) / 64 / 4) },
				programUniforms: d
			})
		};
	}, Wp = (e) => {
		e.compute(he(e.inputs[0], "Abs", "abs"));
	}, Vp = (e) => {
		e.compute(he(e.inputs[0], "Acos", "acos"));
	}, Gp = (e) => {
		e.compute(he(e.inputs[0], "Acosh", "acosh"));
	}, Hp = (e) => {
		e.compute(he(e.inputs[0], "Asin", "asin"));
	}, Fp = (e) => {
		e.compute(he(e.inputs[0], "Asinh", "asinh"));
	}, jp = (e) => {
		e.compute(he(e.inputs[0], "Atan", "atan"));
	}, Kp = (e) => {
		e.compute(he(e.inputs[0], "Atanh", "atanh"));
	}, Zp = (e) => fe(e), Xp = (e, t) => {
		let r;
		switch (t.to) {
			case 10:
				r = "vec4<f16>";
				break;
			case 1:
				r = "vec4<f32>";
				break;
			case 12:
				r = "vec4<u32>";
				break;
			case 6:
				r = "vec4<i32>";
				break;
			case 9:
				r = "vec4<bool>";
				break;
			default: throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`);
		}
		e.compute(he(e.inputs[0], "Cast", r, void 0, t.cacheKey, t.to));
	}, du = (e) => {
		let t, r, i = e.length >= 2 && e[1].data !== 0, a = e.length >= 3 && e[2].data !== 0;
		switch (e[0].dataType) {
			case 1:
				t = i ? e[1].getFloat32Array()[0] : -34028234663852886e22, r = a ? e[2].getFloat32Array()[0] : 34028234663852886e22;
				break;
			case 10:
				t = i ? e[1].getUint16Array()[0] : 64511, r = a ? e[2].getUint16Array()[0] : 31743;
				break;
			default: throw new Error("Unsupport data type");
		}
		return fe({
			min: t,
			max: r
		});
	}, Qp = (e, t) => {
		let r = t || du(e.inputs), i = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "Clip", (a) => `clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`, void 0, r.cacheKey, void 0, [{
			type: e.inputs[0].dataType,
			data: r.min
		}, {
			type: e.inputs[0].dataType,
			data: r.max
		}], [{
			name: "min",
			type: i
		}, {
			name: "max",
			type: i
		}]), { inputs: [0] });
	}, Yp = (e) => {
		e.compute(he(e.inputs[0], "Ceil", "ceil"));
	}, Jp = (e) => {
		e.compute(he(e.inputs[0], "Cos", "cos"));
	}, ec = (e) => {
		e.compute(he(e.inputs[0], "Cosh", "cosh"));
	}, sr = (e) => fe(e), tc = (e, t) => {
		let r = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "Elu", (i) => `elu_vf32(${i})`, `
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`, t.cacheKey));
	}, Ur = (e = "f32") => `
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`, rc = (e) => {
		let t = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "Erf", (r) => `erf_vf32(${r})`, Ur(t)));
	}, ic = (e) => {
		e.compute(he(e.inputs[0], "Exp", "exp"));
	}, ac = (e) => {
		e.compute(he(e.inputs[0], "Floor", "floor"));
	}, nc = (e) => {
		let t = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "Gelu", (r) => `0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`, Ur(t)));
	}, sc = (e, t) => {
		let r = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "LeakyRelu", (i) => `select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`, `const leaky_relu_alpha_ = ${r}(${t.alpha});`, t.cacheKey));
	}, oc = (e) => {
		e.compute(he(e.inputs[0], "Not", (t) => `!${t}`));
	}, uc = (e) => {
		e.compute(he(e.inputs[0], "Neg", (t) => `-${t}`));
	}, lc = (e) => {
		e.compute(he(e.inputs[0], "Reciprocal", (t) => `1.0/${t}`));
	}, dc = (e) => {
		let t = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "Relu", (r) => `select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`));
	}, pc = (e) => {
		e.compute(he(e.inputs[0], "Sigmoid", (t) => `(1.0 / (1.0 + exp(-${t})))`));
	}, cc = (e) => fe(e), hc = (e, t) => {
		let r = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "HardSigmoid", (i) => `max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`, void 0, t.cacheKey));
	}, fc = (e) => {
		e.compute(he(e.inputs[0], "Sin", "sin"));
	}, mc = (e) => {
		e.compute(he(e.inputs[0], "Sinh", "sinh"));
	}, gc = (e) => {
		e.compute(he(e.inputs[0], "Sqrt", "sqrt"));
	}, yc = (e) => {
		e.compute(he(e.inputs[0], "Tan", "tan"));
	}, Pi = (e) => `sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`, _c = (e) => {
		e.compute(he(e.inputs[0], "Tanh", Pi));
	}, $a = (e = "f32") => `
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Pi("v")};
}
`, wa = (e) => `(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`, vc = (e) => {
		let t = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "FastGelu", wa, $a(t), void 0, e.inputs[0].dataType));
	}, bc = (e, t) => {
		let r = Ce(e.inputs[0].dataType);
		return e.compute(he(e.inputs[0], "ThresholdedRelu", (i) => `select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`, `const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`, t.cacheKey)), 0;
	}, $c = (e) => {
		e.compute(he(e.inputs[0], "Log", "log"));
	}, pu = (e, t) => `
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`, cu = (e) => `quick_gelu_impl(${e})`, wc = (e, t) => {
		let r = Ce(e.inputs[0].dataType);
		e.compute(he(e.inputs[0], "QuickGelu", cu, pu(r, t.alpha), t.cacheKey, e.inputs[0].dataType));
	};
}), hu, fu, xc, t0 = U(() => {
	"use strict";
	re(), ie(), Ha(), hu = (e) => {
		if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
		if (![
			2560,
			5120,
			10240
		].includes(e[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240");
		if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
		if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
	}, fu = (e) => {
		let t = e[0].dims.slice();
		t[2] = t[2] / 2;
		let r = N("input", e[0].dataType, e[0].dims, 4), i = N("bias", e[0].dataType, [e[0].dims[2]], 4), a = F("output", e[0].dataType, t, 4), n = O.size(t) / 4, s = Te(e[0].dataType);
		return {
			name: "BiasSplitGelu",
			getRunData: () => ({
				outputs: [{
					dims: t,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(n / 64) }
			}),
			getShaderSource: (u) => `
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2] / 4 / 2}u;

  ${u.declareVariables(r, i, a)}

  ${Ur(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx", "valueLeft * geluRight")}
  }`
		};
	}, xc = (e) => {
		hu(e.inputs), e.compute(fu(e.inputs));
	};
}), mu, gu, Fe, Sc, kc, Tc, Ic, Ec, zc, Cc, Ac, Oc, Rc, r0 = U(() => {
	"use strict";
	J(), re(), ie(), mu = (e, t, r, i, a, n, s, u, d, p, f, c) => {
		let g, y;
		typeof u == "string" ? g = y = (b, T) => `${u}((${b}),(${T}))` : typeof u == "function" ? g = y = u : (g = u.scalar, y = u.vector);
		let _ = F("outputData", f, i.length, 4), $ = N("aData", d, t.length, 4), S = N("bData", p, r.length, 4), x;
		if (a) if (n) {
			let b = O.size(t) === 1, T = O.size(r) === 1, I = t.length > 0 && t[t.length - 1] % 4 === 0, E = r.length > 0 && r[r.length - 1] % 4 === 0;
			b || T ? x = _.setByOffset("global_idx", y(b ? `${$.type.value}(${$.getByOffset("0")}.x)` : $.getByOffset("global_idx"), T ? `${S.type.value}(${S.getByOffset("0")}.x)` : S.getByOffset("global_idx"))) : x = `
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices", _)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices", _)};
            ${_.setByOffset("global_idx", y(s || I ? $.getByOffset("offsetA / 4u") : `${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`, s || E ? S.getByOffset("offsetB / 4u") : `${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `;
		} else x = _.setByOffset("global_idx", y($.getByOffset("global_idx"), S.getByOffset("global_idx")));
		else {
			if (!n) throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");
			let b = (T, I, E = "") => {
				let C = `aData[indexA${I}][componentA${I}]`, A = `bData[indexB${I}][componentB${I}]`;
				return `
            let outputIndices${I} = ${_.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${$.broadcastedIndicesToOffset(`outputIndices${I}`, _)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`, _)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${T}[${I}] = ${E}(${g(C, A)});
          `;
			};
			f === 9 ? x = `
            var data = vec4<u32>(0);
            ${b("data", 0, "u32")}
            ${b("data", 1, "u32")}
            ${b("data", 2, "u32")}
            ${b("data", 3, "u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : x = `
            ${b("outputData[global_idx]", 0)}
            ${b("outputData[global_idx]", 1)}
            ${b("outputData[global_idx]", 2)}
            ${b("outputData[global_idx]", 3)}
          `;
		}
		return `
        ${e.registerUniform("vec_size", "u32").declareVariables($, S, _)}

        ${c ?? ""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`;
	}, gu = (e, t, r, i, a, n, s = r.dataType) => {
		let u = r.dims.map(Number), d = i.dims.map(Number), p = !O.areEqual(u, d), f = u, c = O.size(u), g = !1, y = !1, _ = [p];
		if (p) {
			let $ = qt.calcShape(u, d, !1);
			if (!$) throw new Error("Can't perform binary op on the given tensors");
			f = $.slice(), c = O.size(f);
			let S = O.size(u) === 1, x = O.size(d) === 1, b = u.length > 0 && u[u.length - 1] % 4 === 0, T = d.length > 0 && d[d.length - 1] % 4 === 0;
			_.push(S), _.push(x), _.push(b), _.push(T);
			let I = 1;
			for (let E = 1; E < f.length; E++) {
				let C = u[u.length - E];
				if (C === d[d.length - E]) I *= C;
				else break;
			}
			I % 4 === 0 ? (y = !0, g = !0) : (S || x || b || T) && (g = !0);
		} else g = !0;
		return _.push(g), {
			name: e,
			shaderCache: {
				hint: t + _.map(($) => $.toString()).join("_"),
				inputDependencies: ["rank", "rank"]
			},
			getShaderSource: ($) => mu($, u, d, f, g, p, y, a, r.dataType, i.dataType, s, n),
			getRunData: () => ({
				outputs: [{
					dims: f,
					dataType: s
				}],
				dispatchGroup: { x: Math.ceil(c / 64 / 4) },
				programUniforms: [{
					type: 12,
					data: Math.ceil(O.size(f) / 4)
				}, ...Z(u, d, f)]
			})
		};
	}, Fe = (e, t, r, i, a, n) => {
		e.compute(gu(t, a ?? "", e.inputs[0], e.inputs[1], r, i, n));
	}, Sc = (e) => {
		Fe(e, "Add", (t, r) => `${t}+${r}`);
	}, kc = (e) => {
		Fe(e, "Div", (t, r) => `${t}/${r}`);
	}, Tc = (e) => {
		Fe(e, "Equal", {
			scalar: (t, r) => `u32(${t}==${r})`,
			vector: (t, r) => `vec4<u32>(${t}==${r})`
		}, void 0, void 0, 9);
	}, Ic = (e) => {
		Fe(e, "Mul", (t, r) => `${t}*${r}`);
	}, Ec = (e) => {
		let t = N("input", e.inputs[0].dataType, e.inputs[0].dims).type.value;
		Fe(e, "Pow", {
			scalar: (r, i) => `pow_custom(${r},${i})`,
			vector: (r, i) => `pow_vector_custom(${r},${i})`
		}, `
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t === "i32" ? "round" : ""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `);
	}, zc = (e) => {
		Fe(e, "Sub", (t, r) => `${t}-${r}`);
	}, Cc = (e) => {
		Fe(e, "Greater", {
			scalar: (t, r) => `u32(${t}>${r})`,
			vector: (t, r) => `vec4<u32>(${t}>${r})`
		}, void 0, void 0, 9);
	}, Ac = (e) => {
		Fe(e, "Less", {
			scalar: (t, r) => `u32(${t}<${r})`,
			vector: (t, r) => `vec4<u32>(${t}<${r})`
		}, void 0, void 0, 9);
	}, Oc = (e) => {
		Fe(e, "GreaterOrEqual", {
			scalar: (t, r) => `u32(${t}>=${r})`,
			vector: (t, r) => `vec4<u32>(${t}>=${r})`
		}, void 0, void 0, 9);
	}, Rc = (e) => {
		Fe(e, "LessOrEqual", {
			scalar: (t, r) => `u32(${t}<=${r})`,
			vector: (t, r) => `vec4<u32>(${t}<=${r})`
		}, void 0, void 0, 9);
	};
}), yu, _u, vu, bu, Bc, Nc, i0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), yu = (e, t) => {
		if (!e || e.length < 1) throw new Error("too few inputs");
		let r = 0, i = e[r], a = i.dataType, n = i.dims.length;
		e.forEach((s, u) => {
			if (u !== r) {
				if (s.dataType !== a) throw new Error("input tensors should be one type");
				if (s.dims.length !== n) throw new Error("input tensors should have the same shape");
				s.dims.forEach((d, p) => {
					if (p !== t && d !== i.dims[p]) throw new Error("non concat dimensions must match");
				});
			}
		});
	}, _u = (e, t) => `
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`, vu = (e, t) => {
		let r = e.length, i = [];
		for (let a = 0; a < r; ++a) {
			let n = t.setByOffset("global_idx", e[a].getByIndices("indices"));
			r === 1 ? i.push(n) : a === 0 ? i.push(`if (inputIndex == ${a}u) { ${n} }`) : a === r - 1 ? i.push(`else { ${n} }`) : i.push(`else if (inputIndex == ${a}) { ${n} }`);
		}
		return i.join(`
`);
	}, bu = (e, t, r, i) => {
		let a = O.size(r), n = new Array(e.length), s = new Array(e.length), u = 0, d = [], p = [], f = [{
			type: 12,
			data: a
		}];
		for (let $ = 0; $ < e.length; ++$) u += e[$].dims[t], n[$] = u, p.push(e[$].dims.length), s[$] = N(`input${$}`, i, p[$]), d.push("rank"), f.push({
			type: 12,
			data: n[$]
		});
		for (let $ = 0; $ < e.length; ++$) f.push(...Z(e[$].dims));
		f.push(...Z(r));
		let c = F("output", i, r.length), g = c.indicesGet("indices", t), y = Array.from(Array(n.length).keys()).map(($) => `uniforms.sizeInConcatAxis${$}`).join(","), _ = ($) => `

  ${(() => {
			$.registerUniform("outputSize", "u32");
			for (let S = 0; S < e.length; S++) $.registerUniform(`sizeInConcatAxis${S}`, "u32");
			return $.declareVariables(...s, c);
		})()}

  ${_u(n.length, y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${vu(s, c)}
  }`;
		return {
			name: "Concat",
			shaderCache: {
				hint: `${t}`,
				inputDependencies: d
			},
			getRunData: () => ({
				outputs: [{
					dims: r,
					dataType: i
				}],
				dispatchGroup: { x: Math.ceil(a / 64) },
				programUniforms: f
			}),
			getShaderSource: _
		};
	}, Bc = (e, t) => {
		let r = e.inputs, i = r[0].dims, a = O.normalizeAxis(t.axis, i.length);
		yu(r, a);
		let n = i.slice();
		n[a] = r.reduce((u, d) => u + (d.dims.length > a ? d.dims[a] : 0), 0);
		let s = r.filter((u) => O.size(u.dims) > 0);
		e.compute(bu(s, a, n, r[0].dataType), { inputs: s });
	}, Nc = (e) => fe({ axis: e.axis });
}), zt, Ct, At, Fa, Rt = U(() => {
	"use strict";
	J(), re(), zt = (e, t, r = "f32") => {
		switch (e.activation) {
			case "Relu": return `value = max(value, ${t}(0.0));`;
			case "Sigmoid": return `value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;
			case "Clip": return `value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;
			case "HardSigmoid": return `value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;
			case "LeakyRelu": return `value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;
			case "Tanh": return `let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;
			case "": return "";
			default: throw new Error(`Unsupported activation ${e.activation}`);
		}
	}, Ct = (e, t) => {
		e.activation === "Clip" ? t.push({
			type: 1,
			data: e.clipMax
		}, {
			type: 1,
			data: e.clipMin
		}) : e.activation === "HardSigmoid" ? t.push({
			type: 1,
			data: e.alpha
		}, {
			type: 1,
			data: e.beta
		}) : e.activation === "LeakyRelu" && t.push({
			type: 1,
			data: e.alpha
		});
	}, At = (e, t) => {
		e.activation === "Clip" ? t.push({
			name: "clip_max",
			type: "f32"
		}, {
			name: "clip_min",
			type: "f32"
		}) : e.activation === "HardSigmoid" ? t.push({
			name: "alpha",
			type: "f32"
		}, {
			name: "beta",
			type: "f32"
		}) : e.activation === "LeakyRelu" && t.push({
			name: "alpha",
			type: "f32"
		});
	}, Fa = (e) => {
		let t = e?.activation || "";
		if (t === "HardSigmoid") {
			let [r, i] = e?.activation_params || [.2, .5];
			return {
				activation: t,
				alpha: r,
				beta: i
			};
		} else if (t === "Clip") {
			let [r, i] = e?.activation_params || [op, up];
			return {
				activation: t,
				clipMax: i,
				clipMin: r
			};
		} else if (t === "LeakyRelu") {
			let [r] = e?.activation_params || [.01];
			return {
				activation: t,
				alpha: r
			};
		}
		return { activation: t };
	};
}), Ee, Mc, ja = U(() => {
	"use strict";
	Ee = (e, t) => {
		switch (e) {
			case 1: return t;
			case 2: return `vec2<${t}>`;
			case 3: return `vec3<${t}>`;
			case 4: return `vec4<${t}>`;
			default: throw new Error(`${e}-component is not supported.`);
		}
	}, Mc = (e) => `
      ${e ? "value = value + getBiasByOutputCoords(coords);" : ""}
      `;
}), Dc, a0 = U(() => {
	"use strict";
	Dc = (e) => `
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`;
}), ur, Ka, Za = U(() => {
	"use strict";
	J(), re(), ie(), Rt(), ur = (e, t, r, i, a) => {
		let n = i - r;
		return `
      ${Array.from({ length: r }).map((s, u) => `
      if (${j(t.shape, u, t.rank)} != 1) {
        ${t.indicesSet(e, u, j(a, u + n, i))}
      } else {
        ${t.indicesSet(e, u, 0)}
      }`).join("")}
`;
	}, Ka = (e, t, r, i, a = !1, n) => {
		let s = e[0].dims, u = e[1].dims, d = s[s.length - 2], p = u[u.length - 1], f = s[s.length - 1], c = we(p), g = we(f), y = we(d), _ = O.size(r) / c / y, $ = e.length > 2, S = i ? i.slice(0, -2) : r.slice(0, -2), x = [
			O.size(S),
			d,
			p
		], b = [
			{
				type: 12,
				data: _
			},
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: p
			},
			{
				type: 12,
				data: f
			}
		];
		Ct(t, b), b.push(...Z(S, s, u)), $ && b.push(...Z(e[2].dims)), b.push(...Z(x));
		let T = (I) => {
			let E = Wa("batch_dims", e[0].dataType, S.length), C = N("a", e[0].dataType, s.length, g), A = N("b", e[1].dataType, u.length, c), w = F("output", e[0].dataType, x.length, c), P = Te(w.type.tensor), q = zt(t, w.type.value, P), Q = [C, A], K = "";
			if ($) {
				let D = a ? c : 1;
				Q.push(N("bias", e[2].dataType, e[2].dims.length, D)), K = `${a ? `value += bias[col / ${D}];` : `value += ${w.type.value}(bias[row + i]);`}`;
			}
			let X = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "M",
					type: "u32"
				},
				{
					name: "N",
					type: "u32"
				},
				{
					name: "K",
					type: "u32"
				}
			];
			At(t, X);
			let R = () => {
				let D = `var a_data: ${C.type.value};`;
				for (let G = 0; G < g; G++) D += `
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${c}];`;
				for (let G = 0; G < y; G++) {
					D += `a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${g}];`;
					for (let Y = 0; Y < g; Y++) D += `
            values[${G}] = fma(${A.type.value}(a_data${g === 1 ? "" : `[${Y}]`}), b_data${Y}, values[${G}]);
`;
				}
				return D;
			};
			return `
  ${I.registerUniforms(X).registerInternalVariables(E).declareVariables(...Q, w)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length === 2 ? "" : `let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${ur("a_indices", C, C.rank - 2, E.rank, "batch_indices")}
    ${C.indicesSet("a_indices", C.rank - 2, 0)}
    ${C.indicesSet("a_indices", C.rank - 1, 0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${ur("b_indices", A, A.rank - 2, E.rank, "batch_indices")}
    ${A.indicesSet("b_indices", A.rank - 2, 0)}
    ${A.indicesSet("b_indices", A.rank - 1, 0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${w.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${R()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${K}
      ${q}
      let cur_indices = ${w.type.indices}(batch, row + i, col);
      let offset = ${w.indicesToOffset("cur_indices")};
      ${w.setByOffset(`offset / ${c}`, "value")};
    }
  }
  `;
		};
		return {
			name: "MatMulNaive",
			shaderCache: {
				hint: `${t.activation};${c};${g};${y};${a}`,
				inputDependencies: $ ? [
					"rank",
					"rank",
					"rank"
				] : ["rank", "rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: n ? n(r) : r,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(_ / 64) },
				programUniforms: b
			}),
			getShaderSource: T
		};
	};
}), $u, wu, xa, qi, xu, Sa, Su, Gr, Xa = U(() => {
	"use strict";
	J(), re(), ie(), Rt(), Za(), ja(), $u = (e, t) => e ? `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        ` : `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        `, wu = (e, t) => e ? `
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t === 3 ? "" : "let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }` : `
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached.w + acc[i];"}
        }`, xa = (e, t, r = "f32", i, a = !1, n = 32, s = !1, u = 32) => {
		let d = t[1] * e[1], p = t[0] * e[0], f = a ? d : n, c = a ? n : d, g = f / t[0], y = n / t[1];
		if (!((a && g === 4 && e[1] === 4 || !a && (g === 3 || g === 4)) && f % t[0] === 0 && n % t[1] === 0 && e[0] === 4)) throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);
		return `
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f / g}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p / e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s ? "0" : "i32(globalId.z)"};
  ${i ? `let batchIndices = ${i.offsetToIndices("u32(batch)")};` : ""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s ? `${Math.ceil(u / n)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s ? `i32(globalId.z) * ${u}` : "0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${$u(a, i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i ? ", batchIndices" : ""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g === 3 ? "" : "let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${wu(a, g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`;
	}, qi = (e, t) => e ? `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t ? ", batchIndices" : ""});
            ` : `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t ? ", batchIndices" : ""});
            `, xu = (e) => e ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", Sa = (e, t, r = "f32", i, a = !1, n = 32, s = !1, u = 32, d = !1) => {
		let p = e[1] * t[1], f = e[0] * t[0], c = a ? p : n, g = a ? n : p;
		if (!(g % t[1] === 0 && c % t[0] === 0 && n % t[1] === 0)) throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);
		let y = g / t[1], _ = c / t[0], $ = n / t[1], S = d ? `
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${qi(a, i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i ? ", batchIndices" : ""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a ? `mm_Asub[k][localRow + innerRow * ${t[1]}];` : `mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    ` : `
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${qi(a, i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i ? ", batchIndices" : ""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${xu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;
		return `
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s ? "0" : "i32(globalId.z)"};
    ${i ? `let batchIndices = ${i.offsetToIndices("u32(batch)")};` : ""}
    let num_tiles = ${s ? `${Math.ceil(u / n)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s ? `i32(globalId.z) * ${u}` : "0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`;
	}, Su = (e, t, r, i, a = !1) => {
		let [n, s, u, d] = i, p = Te(i[0].type.tensor);
		return `
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ee(e, p)} {
      var value = ${Ee(e, p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ur("aIndices", s, s.rank - 2, n.rank, "batchIndices")}
        ${s.indicesSet("aIndices", s.rank - 2, "u32(row)")}
        ${s.indicesSet("aIndices", s.rank - 1, "u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ee(e, p)} {
      var value = ${Ee(e, p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ur("bIndices", u, u.rank - 2, n.rank, "batchIndices")}
        ${u.indicesSet("bIndices", u.rank - 2, "u32(row)")}
        ${u.indicesSet("bIndices", u.rank - 1, "u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e, p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t ? `value = value + ${a ? "bias[colIn]" : `${Ee(e, p)}(bias[row])`};` : ""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)", "value")}
      }
    }
    `;
	}, Gr = (e, t, r, i, a = !1, n) => {
		let s = e[0].dims, u = e[1].dims, d = s.slice(0, -2), p = u.slice(0, -2), f = i ? i.slice(0, -2) : r.slice(0, -2), c = O.size(f), g = s[s.length - 2], y = s[s.length - 1], _ = u[u.length - 1], $ = y % 4 === 0 && _ % 4 === 0, S = g <= 8 ? [
			4,
			1,
			1
		] : [
			4,
			4,
			1
		], x = [
			8,
			8,
			1
		], b = [
			Math.ceil(_ / x[0] / S[0]),
			Math.ceil(g / x[1] / S[1]),
			Math.ceil(c / x[2] / S[2])
		], T = $ ? 4 : 1, I = [
			...d,
			g,
			y / T
		], E = I.length, C = [
			...p,
			y,
			_ / T
		], A = C.length, w = [
			c,
			g,
			_ / T
		], P = [
			{
				type: 6,
				data: g
			},
			{
				type: 6,
				data: _
			},
			{
				type: 6,
				data: y
			}
		];
		Ct(t, P), P.push(...Z(f, I, C));
		let q = ["rank", "rank"], Q = e.length > 2;
		Q && (P.push(...Z(e[2].dims)), q.push("rank")), P.push(...Z(w));
		let K = (X) => {
			let R = f.length, D = Wa("batchDims", e[0].dataType, R, 1), G = Te(e[0].dataType), Y = N("a", e[0].dataType, E, T), ee = N("b", e[1].dataType, A, T), te = F("result", e[0].dataType, w.length, T), M = [Y, ee];
			if (Q) {
				let Be = a ? T : 1;
				M.push(N("bias", e[2].dataType, e[2].dims.length, Be));
			}
			let H = [
				{
					name: "dim_a_outer",
					type: "i32"
				},
				{
					name: "dim_b_outer",
					type: "i32"
				},
				{
					name: "dim_inner",
					type: "i32"
				}
			];
			At(t, H);
			let oe = Te(te.type.tensor), ne = zt(t, te.type.value, oe), V = Su(T, Q, ne, [
				D,
				Y,
				ee,
				te
			], a);
			return `
  ${X.registerUniforms(H).registerInternalVariables(D).declareVariables(...M, te)}
  ${V}
  ${$ ? xa(S, x, G, D) : Sa(S, x, G, D)}
                   `;
		};
		return {
			name: "MatMul",
			shaderCache: {
				hint: `${S};${t.activation};${$};${a}`,
				inputDependencies: q
			},
			getRunData: () => ({
				outputs: [{
					dims: n ? n(r) : r,
					dataType: e[0].dataType
				}],
				dispatchGroup: {
					x: b[0],
					y: b[1],
					z: b[2]
				},
				programUniforms: P
			}),
			getShaderSource: K
		};
	};
}), ku, Uc, n0 = U(() => {
	"use strict";
	J(), st(), ie(), Rt(), ja(), a0(), Xa(), ku = (e, t, r, i, a = !1, n, s = 4, u = 4, d = 4, p = "f32") => {
		let f = (P) => {
			switch (P) {
				case 1: return "resData = x[xIndex];";
				case 3: return `resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;
				case 4: return "resData = x[xIndex / 4];";
				default: throw new Error(`innerElementSize ${P} is not supported.`);
			}
		}, c = (P) => {
			switch (P) {
				case 1: return "return w[row * i32(uniforms.w_shape[3]) + colIn];";
				case 4: return "return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";
				default: throw new Error(`innerElementSize ${P} is not supported.`);
			}
		}, g = e ? `
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    ` : `
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `, y = e ? `
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    ` : `
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `, _ = e ? "i32(uniforms.x_shape[1])" : "i32(uniforms.x_shape[2])", $ = e ? "i32(uniforms.x_shape[2])" : "i32(uniforms.x_shape[3])", S = e ? "row" : "col", x = e ? "col" : "row", b = `
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${Ee(s, p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${$}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`, T = e ? t && i ? `
    let col = colIn * ${s};
    ${b}` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${Ee(s, p)}(0.0);` : i && r ? `
    let col = colIn * ${s};
    ${b}` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${Ee(s, p)}(0.0);`, I = e ? i && r ? c(u) : `
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(u)}
    }
    return ${Ee(u, p)}(0.0);` : `
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(u)}
    }
    return ${Ee(u, p)}(0.0);`, E = Ee(d, p), C = Ee(e ? s : u, p), A = Ee(e ? u : s, p), w = zt(n, E, p);
		return `
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e ? T : I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e ? I : T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
      ${y}
      ${Mc(a)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`;
	}, Uc = (e, t, r, i, a, n, s, u, d) => {
		let p = t.format === "NHWC", f = p ? e[0].dims[3] : e[0].dims[1], c = r[0], g = p ? r[2] : r[3], y = p ? r[1] : r[2], _ = p ? r[3] : r[1], $ = p && (f % 4 === 0 || f % 3 === 0) && _ % 4 === 0, S = p ? _ : g * y, x = p ? g * y : _, b = [
			8,
			8,
			1
		], T = i <= 8 ? [
			4,
			1,
			1
		] : [
			4,
			4,
			1
		], I = [
			Math.ceil(S / b[0] / T[0]),
			Math.ceil(x / b[1] / T[1]),
			Math.ceil(c / b[2] / T[2])
		];
		de("verbose", () => `[conv2d_mm_webgpu] dispatch = ${I}`);
		let E = $ ? p && f % 4 !== 0 ? 3 : 4 : 1, C = b[1] * T[1], A = b[0] * T[0], w = Math.max(b[0] * E, b[1]), P = i % C === 0, q = a % A === 0, Q = n % w === 0, K = $ ? [
			E,
			4,
			4
		] : [
			1,
			1,
			1
		], X = [
			{
				type: 6,
				data: i
			},
			{
				type: 6,
				data: a
			},
			{
				type: 6,
				data: n
			},
			{
				type: 6,
				data: [t.pads[0], t.pads[1]]
			},
			{
				type: 6,
				data: t.strides
			},
			{
				type: 6,
				data: t.dilations
			}
		];
		Ct(t, X), X.push(...Z(e[0].dims, e[1].dims));
		let R = ["rank", "rank"];
		s && (X.push(...Z(e[2].dims)), R.push("rank")), X.push(...Z(r));
		let D = (G) => {
			let Y = [
				{
					name: "dim_a_outer",
					type: "i32"
				},
				{
					name: "dim_b_outer",
					type: "i32"
				},
				{
					name: "dim_inner",
					type: "i32"
				},
				{
					name: "pad",
					type: "i32",
					length: 2
				},
				{
					name: "stride",
					type: "i32",
					length: 2
				},
				{
					name: "dilation",
					type: "i32",
					length: 2
				}
			];
			At(t, Y);
			let ee = $ ? 4 : 1, te = Te(e[0].dataType), M = `
      fn setOutputAtIndex(flatIndex : i32, value : ${$ ? `vec4<${te}>` : te}) {
        result[flatIndex] = ${$ ? `vec4<${te}>` : te}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$ ? `vec4<${te}>` : te}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$ ? "/ 4" : ""}, value);
      }`, H = [N("x", e[0].dataType, e[0].dims.length, E === 3 ? 1 : E), N("w", e[1].dataType, e[1].dims.length, ee)], oe = F("result", e[0].dataType, r.length, ee);
			if (s) {
				let ne = N("bias", e[2].dataType, e[2].dims.length, ee);
				H.push(ne), M += `
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$ ? `vec4<${te}>` : te} {
          return bias[coords.${p ? "w" : "y"}${$ ? "/ 4" : ""}];
        }`;
			}
			return `
        ${Dc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${G.registerUniforms(Y).declareVariables(...H, oe)}
        ${M}
        ${ku(p, P, q, Q, s, t, K[0], K[1], K[2], te)}
        ${$ ? xa(T, b, te, void 0, !p, w) : Sa(T, b, te, void 0, !p, w, !1, void 0, u)}`;
		};
		return {
			name: "Conv2DMatMul",
			shaderCache: {
				hint: `${t.cacheKey};${E};${$};${P};${q};${Q};${C};${A};${w}`,
				inputDependencies: R
			},
			getRunData: () => ({
				outputs: [{
					dims: d ? d(r) : r,
					dataType: e[0].dataType
				}],
				dispatchGroup: {
					x: I[0],
					y: I[1],
					z: I[2]
				},
				programUniforms: X
			}),
			getShaderSource: D
		};
	};
}), Tu, Li, Yt, Iu, Wi, Eu, Pc, qc, s0 = U(() => {
	"use strict";
	J(), st(), re(), ie(), Rt(), ja(), Tu = (e) => {
		let t = 1;
		for (let r = 0; r < e.length; r++) t *= e[r];
		return t;
	}, Li = (e) => typeof e == "number" ? [
		e,
		e,
		e
	] : e, Yt = (e, t) => t <= 1 ? e : e + (e - 1) * (t - 1), Iu = (e, t, r, i = 1) => {
		let a = Yt(t, i);
		return Math.floor((e[0] * (r - 1) - r + a) / 2);
	}, Wi = (e, t, r, i, a) => {
		a ??= Iu(e, t[0], i[0]);
		let n = [
			0,
			0,
			0,
			r
		];
		for (let s = 0; s < 3; s++) e[s] + 2 * a >= t[s] && (n[s] = Math.trunc((e[s] - t[s] + 2 * a) / i[s] + 1));
		return n;
	}, Eu = (e, t, r, i, a, n, s, u, d, p) => {
		let f, c, g, y;
		if (e === "VALID" && (e = 0), typeof e == "number") {
			f = {
				top: e,
				bottom: e,
				left: e,
				right: e,
				front: e,
				back: e
			};
			let _ = Wi([
				t,
				r,
				i,
				1
			], [
				u,
				d,
				p
			], 1, [
				a,
				n,
				s
			], e);
			c = _[0], g = _[1], y = _[2];
		} else if (Array.isArray(e)) {
			if (!e.every(($, S, x) => $ === x[0])) throw Error(`Unsupported padding parameter: ${e}`);
			f = {
				top: e[0],
				bottom: e[1],
				left: e[2],
				right: e[3],
				front: e[4],
				back: e[5]
			};
			let _ = Wi([
				t,
				r,
				i,
				1
			], [
				u,
				d,
				p
			], 1, [
				a,
				n,
				s
			], e[0]);
			c = _[0], g = _[1], y = _[2];
		} else if (e === "SAME_UPPER") {
			c = Math.ceil(t / a), g = Math.ceil(r / n), y = Math.ceil(i / s);
			let _ = (c - 1) * a + u - t, $ = (g - 1) * n + d - r, S = (y - 1) * s + p - i, x = Math.floor(_ / 2), b = _ - x, T = Math.floor($ / 2), I = $ - T, E = Math.floor(S / 2);
			f = {
				top: T,
				bottom: I,
				left: E,
				right: S - E,
				front: x,
				back: b
			};
		} else throw Error(`Unknown padding parameter: ${e}`);
		return {
			padInfo: f,
			outDepth: c,
			outHeight: g,
			outWidth: y
		};
	}, Pc = (e, t, r, i, a, n = !1, s = "channelsLast") => {
		let u, d, p, f, c;
		if (s === "channelsLast") [u, d, p, f, c] = e;
		else if (s === "channelsFirst") [u, c, d, p, f] = e;
		else throw new Error(`Unknown dataFormat ${s}`);
		let [g, , y, _, $] = t, [S, x, b] = Li(r), [T, I, E] = Li(i), C = Yt(y, T), A = Yt(_, I), w = Yt($, E), { padInfo: P, outDepth: q, outHeight: Q, outWidth: K } = Eu(a, d, p, f, S, x, b, C, A, w), X = n ? g * c : g, R = [
			0,
			0,
			0,
			0,
			0
		];
		return s === "channelsFirst" ? R = [
			u,
			X,
			q,
			Q,
			K
		] : s === "channelsLast" && (R = [
			u,
			q,
			Q,
			K,
			X
		]), {
			batchSize: u,
			dataFormat: s,
			inDepth: d,
			inHeight: p,
			inWidth: f,
			inChannels: c,
			outDepth: q,
			outHeight: Q,
			outWidth: K,
			outChannels: X,
			padInfo: P,
			strideDepth: S,
			strideHeight: x,
			strideWidth: b,
			filterDepth: y,
			filterHeight: _,
			filterWidth: $,
			effectiveFilterDepth: C,
			effectiveFilterHeight: A,
			effectiveFilterWidth: w,
			dilationDepth: T,
			dilationHeight: I,
			dilationWidth: E,
			inShape: e,
			outShape: R,
			filterShape: t
		};
	}, qc = (e, t, r, i, a, n) => {
		let s = n === "channelsLast";
		s ? e[0].dims[3] : e[0].dims[1];
		let u = [
			64,
			1,
			1
		], d = { x: r.map(($, S) => S) }, p = [
			Math.ceil(Tu(d.x.map(($) => r[$])) / u[0]),
			1,
			1
		];
		de("verbose", () => `[conv3d_naive_webgpu] dispatch = ${p}`);
		let f = 1, c = [
			{
				type: 12,
				data: O.size(r)
			},
			{
				type: 12,
				data: i
			},
			{
				type: 12,
				data: a
			},
			{
				type: 12,
				data: t.strides
			},
			{
				type: 12,
				data: t.dilations
			}
		];
		Ct(t, c), c.push(...Z(e[0].dims, e[1].dims));
		let g = ["rank", "rank"], y = e.length === 3;
		y && (c.push(...Z(e[2].dims)), g.push("rank")), c.push(...Z(r));
		let _ = ($) => {
			let S = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "filter_dims",
					type: "u32",
					length: i.length
				},
				{
					name: "pads",
					type: "u32",
					length: a.length
				},
				{
					name: "strides",
					type: "u32",
					length: t.strides.length
				},
				{
					name: "dilations",
					type: "u32",
					length: t.dilations.length
				}
			];
			At(t, S);
			let x = 1, b = Te(e[0].dataType), T = N("x", e[0].dataType, e[0].dims.length, f), I = N("W", e[1].dataType, e[1].dims.length, x), E = [T, I], C = F("result", e[0].dataType, r.length, x), A = "";
			if (y) {
				let q = N("bias", e[2].dataType, e[2].dims.length, x);
				E.push(q), A += `
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${b} {
          return bias[${s ? j("coords", 4, 5) : j("coords", 1, 5)}];
        }`;
			}
			let w = Ee(f, b), P = zt(t, w, b);
			return `
            ${A}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${$.registerUniforms(S).declareVariables(...E, C)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${j("coords", 0, T.rank)};
              let d2 = ${s ? j("coords", T.rank - 1, T.rank) : j("coords", 1, T.rank)};
              let xFRCCorner = vec3<u32>(${s ? j("coords", 1, T.rank) : j("coords", 2, T.rank)},
              ${s ? j("coords", 2, T.rank) : j("coords", 3, T.rank)},
              ${s ? j("coords", 3, T.rank) : j("coords", 4, T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s ? j("uniforms.x_shape", 1, T.rank) : j("uniforms.x_shape", 2, T.rank)};
              let xShapeZ = ${s ? j("uniforms.x_shape", 2, T.rank) : j("uniforms.x_shape", 3, T.rank)};
              let xShapeW = ${s ? j("uniforms.x_shape", 3, T.rank) : j("uniforms.x_shape", 4, T.rank)};
              let xShapeU = ${s ? j("uniforms.x_shape", 4, T.rank) : j("uniforms.x_shape", 1, T.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s ? `let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            ` : `let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s ? `value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);` : `value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s ? `let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      ` : `let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s ? `let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      ` : `let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${y ? "value = value + getBiasByOutputCoords(coords)" : ""};
              ${P}
              result[global_idx] = f32(value);
          }`;
		};
		return {
			name: "Conv3DNaive",
			shaderCache: {
				hint: `${t.cacheKey};${s};${f};${y}`,
				inputDependencies: g
			},
			getRunData: () => ({
				outputs: [{
					dims: r,
					dataType: e[0].dataType
				}],
				dispatchGroup: {
					x: p[0],
					y: p[1],
					z: p[2]
				},
				programUniforms: c
			}),
			getShaderSource: _
		};
	};
}), Lc, Wc, o0 = U(() => {
	"use strict";
	J(), re(), ie(), Rt(), Lc = (e, t, r, i) => {
		let a = e.length > 2, n = a ? "value += b[output_channel];" : "", s = e[0].dims, u = e[1].dims, d = t.format === "NHWC", p = d ? r[3] : r[1], f = p / t.group, c = d && f >= 4 ? we(p) : 1, g = O.size(r) / c, y = [
			{
				type: 12,
				data: g
			},
			{
				type: 12,
				data: t.dilations
			},
			{
				type: 12,
				data: [t.strides[0], t.strides[1]]
			},
			{
				type: 12,
				data: [t.pads[0], t.pads[1]]
			},
			{
				type: 12,
				data: f
			}
		];
		Ct(t, y), y.push(...Z(s, [
			u[0],
			u[1],
			u[2],
			u[3] / c
		]));
		let _ = a ? [
			"rank",
			"rank",
			"rank"
		] : ["rank", "rank"];
		y.push(...Z([
			r[0],
			r[1],
			r[2],
			r[3] / c
		]));
		let $ = (S) => {
			let x = F("output", e[0].dataType, r.length, c), b = Te(x.type.tensor), T = zt(t, x.type.value, b), I = N("x", e[0].dataType, s.length), E = N("w", e[1].dataType, u.length, c), C = [I, E];
			a && C.push(N("b", e[2].dataType, e[2].dims, c));
			let A = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "dilations",
					type: "u32",
					length: t.dilations.length
				},
				{
					name: "strides",
					type: "u32",
					length: 2
				},
				{
					name: "pads",
					type: "u32",
					length: 2
				},
				{
					name: "output_channels_per_group",
					type: "u32"
				}
			];
			At(t, A);
			let w = d ? `
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${I.get("batch", "xHeight", "xWidth", "input_channel")};
            let wVal = ${E.get("wHeight", "wWidth", "wInChannel", "output_channel")};
            value += xVal * wVal;
          }
        }
      }
      ` : `
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${I.get("batch", "input_channel", "xHeight", "xWidth")};
            let wVal = ${E.get("output_channel", "wInChannel", "wHeight", "wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;
			return `
  ${S.registerUniforms(A).declareVariables(...C, x)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d ? 3 : 1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d ? 1 : 2}], outputIndices[${d ? 2 : 3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d ? 2 : 1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${w}
    ${n}
    ${T}
    ${x.setByOffset("global_idx", "value")}
  }`;
		};
		return {
			name: "GroupedConv",
			shaderCache: {
				hint: `${t.cacheKey}_${c}`,
				inputDependencies: _
			},
			getRunData: () => ({
				outputs: [{
					dims: i ? i(r) : r,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(g / 64) },
				programUniforms: y
			}),
			getShaderSource: $
		};
	}, Wc = (e, t, r, i) => {
		let a = e.length > 2, n = we(r[3]), s = we(r[2]), u = O.size(r) / n / s, d = [
			e[0].dims[0],
			e[0].dims[1],
			e[0].dims[2],
			e[0].dims[3] / n
		], p = [
			e[1].dims[0],
			e[1].dims[1],
			e[1].dims[2],
			e[1].dims[3] / n
		], f = [
			r[0],
			r[1],
			r[2],
			r[3] / n
		], c = [
			{
				type: 12,
				data: u
			},
			{
				type: 6,
				data: [t.strides[0], t.strides[1]]
			},
			{
				type: 6,
				data: [t.pads[0], t.pads[1]]
			}
		];
		Ct(t, c), c.push(...Z(d, p, f));
		let g = (s - 1) * t.strides[1] + p[1], y = (_) => {
			let $ = F("output", e[0].dataType, f.length, n), S = Te($.type.tensor), x = zt(t, $.type.value, S), b = N("x", e[0].dataType, d.length, n), T = N("w", e[1].dataType, p.length, n), I = [b, T];
			a && I.push(N("b", e[2].dataType, e[2].dims, n));
			let E = a ? "value += b[output_channel];" : "", C = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "strides",
					type: "i32",
					length: 2
				},
				{
					name: "pads",
					type: "i32",
					length: 2
				}
			];
			return At(t, C), `
  ${_.registerUniforms(C).declareVariables(...I, $)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${g}>;
    var values: array<${$.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch", "u32(x_height)", "u32(x_width)", "input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height", "w_width", "0", "output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${x}
      ${$.set("batch", "row", "col + i", "output_channel", "value")};
    }
  }`;
		};
		return {
			name: "GroupedConv-Vectorize",
			shaderCache: {
				hint: `${t.cacheKey};${n};${s};${g};${p[0]};${p[1]}`,
				inputDependencies: a ? [
					"rank",
					"rank",
					"type"
				] : ["rank", "rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: i ? i(r) : r,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(u / 64) },
				programUniforms: c
			}),
			getShaderSource: y
		};
	};
}), zu, Ar, Cu, Or, ka, Vi, Au, Ou, Ta, u0 = U(() => {
	"use strict";
	re(), n0(), s0(), Xa(), o0(), Rt(), Za(), gt(), zu = (e, t, r, i, a, n) => {
		let s = e[0], u = e.slice(n ? 1 : 2, n ? 3 : 4), d = u.length, p = t[0], f = t.slice(2).map((g, y) => g + (g - 1) * (r[y] - 1)), c = u.map((g, y) => g + i[y] + i[y + d]).map((g, y) => Math.floor((g - f[y] + a[y]) / a[y]));
		return c.splice(0, 0, s), c.splice(n ? 3 : 1, 0, p), c;
	}, Ar = [
		2,
		3,
		1,
		0
	], Cu = (e, t) => {
		if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
		if (e[0].dims.length > 5) throw new Error("greater than 5D is not supported");
		if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input");
		if (e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1] !== e[1].dims[1] * t.group) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
		if (e.length === 3 && (e[2].dims.length !== 1 || e[1].dims[0] !== e[2].dims[0])) throw new Error("invalid bias");
		let r = e[0].dims.length - 2;
		if (t.dilations.length !== r) throw new Error(`dilations should be ${r}D`);
		if (t.strides.length !== r) throw new Error(`strides should be ${r}D`);
		if (t.pads.length !== r * 2) throw new Error(`pads should be ${r * 2}D`);
		if (t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape");
	}, Or = (e, t) => {
		let r = e.kernelShape.slice();
		r.length < t[1].dims.length - 2 && r.push(...Array(t[1].dims.length - 2 - r.length).fill(0));
		for (let n = 2; n < t[1].dims.length; ++n) r[n - 2] === 0 && (r[n - 2] = t[1].dims[n]);
		let i = e.pads.slice();
		Wr.adjustPadsBasedOnAutoPad(t[0].dims, e.strides, e.dilations, r, i, e.format === "NHWC", e.autoPad);
		let a = Object.assign({}, e);
		return Object.assign(a, {
			kernelShape: r,
			pads: i
		}), a;
	}, ka = (e) => {
		let t = Fa(e), r = e.format;
		return {
			autoPad: [
				"NOTSET",
				"VALID",
				"SAME_UPPER",
				"SAME_LOWER"
			][e.auto_pad],
			format: r,
			dilations: e.dilations,
			group: e.group,
			kernelShape: e.kernel_shape,
			pads: e.pads,
			strides: e.strides,
			wIsConst: e.w_is_const(),
			...t,
			cacheKey: `${e.format};${t.activation};`
		};
	}, Vi = (e, t, r, i) => {
		let a = r.format === "NHWC", n = zu(t[0].dims, t[1].dims, r.dilations, r.pads, r.strides, a);
		if (r.group !== 1) {
			let C = [t[0]];
			if (a) {
				let A = e.kernelCustomData.wT ?? e.compute(De(t[1], Ar), {
					inputs: [1],
					outputs: [r.wIsConst ? -2 : -1]
				})[0];
				r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = A), C.push(A);
			} else C.push(t[1]);
			t.length === 3 && C.push(t[2]), !e.adapterInfo.isArchitecture("ampere") && a && t[1].dims[0] === r.group && t[1].dims[1] === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 ? e.compute(Wc(C, r, n, i), { inputs: C }) : e.compute(Lc(C, r, n, i), { inputs: C });
			return;
		}
		let s = t.length === 3, u = t[0].dims[a ? 1 : 2], d = t[0].dims[a ? 2 : 3], p = t[0].dims[a ? 3 : 1], f = t[1].dims[2], c = t[1].dims[3], g = n[a ? 1 : 2], y = n[a ? 2 : 3], _ = n[a ? 3 : 1], $ = a && f === u && c === d && r.pads[0] === 0 && r.pads[1] === 0;
		if ($ || f === 1 && c === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 && r.strides[0] === 1 && r.strides[1] === 1 && r.pads[0] === 0 && r.pads[1] === 0) {
			let C = n[0], A, w, P, q = [];
			if (a) {
				let X = e.kernelCustomData.wT ?? e.compute(De(t[1], Ar), {
					inputs: [1],
					outputs: [r.wIsConst ? -2 : -1]
				})[0];
				if (r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = X), $) {
					let R = u * d * p;
					A = t[0].reshape([
						1,
						C,
						R
					]), w = X.reshape([
						1,
						R,
						_
					]), P = [
						1,
						C,
						_
					];
				} else A = t[0].reshape([
					C,
					u * d,
					p
				]), w = X.reshape([
					1,
					p,
					_
				]), P = [
					C,
					g * y,
					_
				];
				q.push(A), q.push(w);
			} else A = t[0].reshape([
				C,
				p,
				u * d
			]), w = t[1].reshape([
				1,
				_,
				p
			]), P = [
				C,
				_,
				g * y
			], q.push(w), q.push(A);
			s && q.push(t[2]);
			let Q = P[2], K = q[0].dims[q[0].dims.length - 1];
			Q < 8 && K < 8 ? e.compute(Ka(q, r, n, P, a, i), { inputs: q }) : e.compute(Gr(q, r, n, P, a, i), { inputs: q });
			return;
		}
		let S = !0, x = e.kernelCustomData.wT ?? e.compute(De(t[1], Ar), {
			inputs: [1],
			outputs: [r.wIsConst ? -2 : -1]
		})[0];
		r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = x);
		let b = [t[0], x];
		s && b.push(t[2]);
		let T = a ? g * y : _, I = a ? _ : g * y, E = f * c * p;
		e.compute(Uc(b, r, n, T, I, E, s, S, i), { inputs: b });
	}, Au = (e, t) => {
		let r = t.format === "NHWC", i = [e.inputs[0].reshape(r ? [
			e.inputs[0].dims[0],
			1,
			e.inputs[0].dims[1],
			e.inputs[0].dims[2]
		] : [
			e.inputs[0].dims[0],
			e.inputs[0].dims[1],
			1,
			e.inputs[0].dims[2]
		]), e.inputs[1].reshape([
			e.inputs[1].dims[0],
			e.inputs[1].dims[1],
			1,
			e.inputs[1].dims[2]
		])];
		e.inputs.length === 3 && i.push(e.inputs[2]);
		let a = [
			0,
			t.pads[0],
			0,
			t.pads[1]
		], n = [1].concat(t.strides), s = [1].concat(t.dilations), u = [1].concat(t.kernelShape), d = Or({
			...t,
			pads: a,
			strides: n,
			dilations: s,
			kernelShape: u
		}, i);
		Vi(e, i, d, (p) => r ? [
			p[0],
			p[2],
			p[3]
		] : [
			p[0],
			p[1],
			p[3]
		]);
	}, Ou = (e, t, r) => {
		let i = r.format === "NHWC" ? "channelsLast" : "channelsFirst", a = Or(r, t), n = r.autoPad === "NOTSET" ? r.pads : r.autoPad, s = Pc(t[0].dims, t[1].dims, r.strides, r.dilations, n, !1, i);
		e.compute(qc(t, a, s.outShape, [
			s.filterDepth,
			s.filterHeight,
			s.filterWidth
		], [
			s.padInfo.front,
			s.padInfo.top,
			s.padInfo.left
		], i));
	}, Ta = (e, t) => {
		if (Cu(e.inputs, t), e.inputs[0].dims.length === 3) Au(e, t);
		else if (e.inputs[0].dims.length === 5) Ou(e, e.inputs, t);
		else {
			let r = Or(t, e.inputs);
			Vi(e, e.inputs, r);
		}
	};
}), Vc, l0 = U(() => {
	"use strict";
	J(), st(), re(), ie(), Vc = (e, t, r) => {
		let i = e.length > 2, a = t.outputShape, n = t.format === "NHWC", s = t.group, u = e[1].dims, d = u[2] / s, p = u[3], f = n ? we(d) : 1, c = n && p === 1 && d >= 4, g = c ? Math.floor(d / 4) * 4 : Math.floor(d / f) * f, y = d - g, _ = n ? we(p) : 1, $ = n ? p === 1 ? f : _ : 1, S = O.size(a) / _, x = [
			Math.ceil(S / 64),
			1,
			1
		];
		de("verbose", () => `[conv2d_backprop_webgpu] dispatch = ${x}`);
		let b = ["rank", "rank"], T = [t.strides[0], t.strides[1]], I = [t.kernelShape[n ? 1 : 2], t.kernelShape[n ? 2 : 3]], E = [t.dilations[0], t.dilations[1]], C = [I[0] + (t.dilations[0] <= 1 ? 0 : (t.kernelShape[n ? 1 : 2] - 1) * (t.dilations[0] - 1)), I[1] + (t.dilations[1] <= 1 ? 0 : (t.kernelShape[n ? 2 : 3] - 1) * (t.dilations[1] - 1))], A = [C[0] - 1 - Math.floor((t.pads[0] + t.pads[2]) / 2), C[1] - 1 - Math.floor((t.pads[1] + t.pads[3]) / 2)], w = [
			{
				type: 12,
				data: S
			},
			{
				type: 12,
				data: T
			},
			{
				type: 12,
				data: I
			},
			{
				type: 12,
				data: E
			},
			{
				type: 12,
				data: C
			},
			{
				type: 6,
				data: A
			},
			{
				type: 12,
				data: g
			},
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: p
			},
			...Z(e[0].dims, e[1].dims)
		];
		i && (w.push(...Z(e[2].dims)), b.push("rank")), w.push(...Z(a));
		let P = (q) => {
			let Q = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "strides",
					type: "u32",
					length: T.length
				},
				{
					name: "filter_dims",
					type: "u32",
					length: I.length
				},
				{
					name: "dilations",
					type: "u32",
					length: I.length
				},
				{
					name: "effective_filter_dims",
					type: "u32",
					length: C.length
				},
				{
					name: "pads",
					type: "i32",
					length: A.length
				},
				{
					name: "input_channels_per_group_int",
					type: "u32"
				},
				{
					name: "input_channels_per_group",
					type: "u32"
				},
				{
					name: "output_channels_per_group",
					type: "u32"
				}
			], K = Te(e[0].dataType), X = n ? 1 : 2, R = n ? 2 : 3, D = n ? 3 : 1, G = N("W", e[1].dataType, e[1].dims.length, $), Y = N("Dy", e[0].dataType, e[0].dims.length, f), ee = [Y, G];
			i && ee.push(N("bias", e[2].dataType, [a[D]].length, _));
			let te = F("result", e[0].dataType, a.length, _), M = () => {
				let ne = "";
				if (c) f === 4 ? ne += `
        let xValue = ${Y.getByOffset("x_offset")};
        let wValue = ${G.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;` : f === 2 ? ne += `
          dotProd = dotProd + dot(vec4<${K}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}), vec4<${K}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;` : f === 1 && (ne += `
          dotProd = dotProd + dot(vec4<${K}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}, ${Y.getByOffset("x_offset + 2u")}, ${Y.getByOffset("x_offset + 3u")}), vec4<${K}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}, ${G.getByOffset("w_offset + 2u")}, ${G.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);
				else if (ne += `
                  let xValue = ${n ? Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`) : Y.get("batch", "inputChannel", "idyR", "idyC")};
        `, f === 1) ne += `
          let w_offset = ${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${G.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;
				else for (let V = 0; V < f; V++) ne += `
            let wValue${V} = ${G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;
				return ne;
			}, H = () => {
				if (y === 0) return "";
				if (!c) throw new Error(`packInputAs4 ${c} is not true.`);
				let ne = "";
				if (f === 1) {
					ne += "dotProd = dotProd";
					for (let V = 0; V < y; V++) ne += `
            + ${Y.getByOffset(`x_offset + ${V}`)} * ${G.getByOffset(`w_offset + ${V}`)}`;
					ne += ";";
				} else if (f === 2) {
					if (y !== 2) throw new Error(`Invalid inputChannelsRemainder ${y}.`);
					ne += `
          let xValue = ${Y.getByOffset("x_offset")};
          let wValue = ${G.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`;
				}
				return ne;
			}, oe = `
            let outputIndices = ${te.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${te.indicesGet("outputIndices", 0)};
            let d1 = ${te.indicesGet("outputIndices", D)};
            let r = ${te.indicesGet("outputIndices", X)};
            let c = ${te.indicesGet("outputIndices", R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${te.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${K}(dyRCorner) + ${K}(wR)) / ${K}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${K}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${K}(dyCCorner) + ${K}(wC)) / ${K}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${K}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c ? `
                var x_offset = ${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${G.indicesToOffset(`${G.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  ` : ""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c ? 4 : f}) {
                  ${M()}
                  inputChannel = inputChannel + ${c ? 4 : f};
                }
                ${H()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i ? ` + bias[d1 / ${_}]` : ""};
            ${te.setByOffset("global_idx", "value")};
          `;
			return `
    ${q.registerUniforms(Q).declareVariables(...ee, te)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${oe}}`;
		};
		return {
			name: "ConvTranspose2D",
			shaderCache: {
				hint: `${t.cacheKey};${f}${$}${_}${c}${y}`,
				inputDependencies: b
			},
			getRunData: () => ({
				dispatchGroup: {
					x: x[0],
					y: x[1],
					z: x[2]
				},
				outputs: [{
					dims: r ? r(a) : a,
					dataType: e[0].dataType
				}],
				programUniforms: w
			}),
			getShaderSource: P
		};
	};
}), Ru, Bu, Nu, Gi, Gc, Mu, Hi, Du, Hc, d0 = U(() => {
	"use strict";
	l0(), Rt(), gt(), Ru = (e, t, r, i, a, n) => (e - 1) * t + r + (i - 1) * a + 1 - n, Bu = (e, t, r, i, a) => {
		let n = Math.floor(e / 2);
		t === "SAME_UPPER" ? (r[i] = n, r[a] = e - n) : t === "SAME_LOWER" && (r[i] = e - n, r[a] = n);
	}, Nu = (e, t, r, i, a, n, s, u, d, p) => {
		let f = e.length - 2, c = p.length === 0;
		d.length < f && d.push(...Array(f - d.length).fill(0));
		let g = e[0], y = t[u ? 3 : 1] * a;
		for (let _ = 0, $ = e.length - f - (u ? 1 : 0); _ < f; ++_, ++$) {
			let S = e[$], x = c ? S * s[_] : p[_], b = Ru(S, s[_], n[_], t[$], r[_], x);
			Bu(b, i, n, _, _ + f), c && p.push(s[_] * (S - 1) + d[_] + (t[$] - 1) * r[_] + 1 - n[_] - n[_ + f]);
		}
		p.splice(0, 0, g), p.splice(u ? 3 : 1, 0, y);
	}, Gi = (e, t) => {
		let r = e.kernelShape.slice();
		if (e.kernelShape.length === 0 || e.kernelShape.reduce((c, g) => c * g, 1) === 0) {
			r.length = 0;
			for (let c = 2; c < t[1].dims.length; ++c) r.push(t[1].dims[c]);
		}
		let i = e.format === "NHWC";
		r.splice(0, 0, t[1].dims[0]), r.splice(i ? 3 : 1, 0, t[1].dims[1]);
		let a = e.pads.slice(), n = e.outputShape.slice(), s = e.outputPadding.slice(), u = t[0].dims, d = e.dilations.slice();
		if (d.reduce((c, g) => c + g, 0) === 0) {
			let c = t[0].dims.length - 2;
			d = new Array(c).fill(1);
		}
		let p = e.strides.slice();
		if (p.reduce((c, g) => c + g, 0) === 0) {
			let c = t[0].dims.length - 2;
			p = new Array(c).fill(1);
		}
		Nu(u, r, d, e.autoPad, e.group, a, p, i, s, n);
		let f = Object.assign({}, e);
		return Object.assign(f, {
			kernelShape: r,
			pads: a,
			outputPadding: s,
			outputShape: n,
			dilations: d,
			strides: p
		}), f;
	}, Gc = (e) => {
		let t = Fa(e), r = e.format, i = [
			"NOTSET",
			"VALID",
			"SAME_UPPER",
			"SAME_LOWER"
		][typeof e.autoPad > "u" ? 0 : e.autoPad], a = e.dilations, n = e.group ?? 1, s = e.kernelShape, u = e.pads, d = e.strides, p = e.wIsConst();
		return {
			autoPad: i,
			format: r,
			dilations: a,
			group: n,
			kernelShape: s,
			outputPadding: e.outputPadding,
			outputShape: e.outputShape,
			pads: u,
			strides: d,
			wIsConst: p,
			...t,
			cacheKey: `${e.format};${t.activation};`
		};
	}, Mu = (e, t) => {
		if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
		if (e[0].dims.length !== 4 && e[0].dims.length !== 3) throw new Error("currently only support 2-dimensional conv");
		if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input");
		if (e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1] !== e[1].dims[0]) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
		let r = e[1].dims[1] * t.group;
		if (e.length === 3 && (e[2].dims.length !== 1 || e[2].dims[0] !== r)) throw new Error("invalid bias");
		let i = e[0].dims.length - 2;
		if (t.dilations.reduce((a, n) => a + n, 0) > 0 && t.dilations.length !== i) throw new Error(`dilations should be ${i}D`);
		if (t.strides.reduce((a, n) => a + n, 0) > 0 && t.strides.length !== i) throw new Error(`strides should be ${i}D`);
		if (t.pads.reduce((a, n) => a + n, 0) > 0 && t.pads.length !== i * 2) throw new Error(`pads should be ${i * 2}D`);
		if (t.outputPadding.length !== i && t.outputPadding.length !== 0) throw new Error(`output_padding should be ${i}D`);
		if (t.kernelShape.reduce((a, n) => a + n, 0) > 0 && t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape");
		if (t.outputShape.length !== 0 && t.outputShape.length !== e[0].dims.length - 2) throw new Error("invalid output shape");
	}, Hi = (e, t, r, i) => {
		let a = e.kernelCustomData.wT ?? e.compute(De(t[1], [
			2,
			3,
			0,
			1
		]), {
			inputs: [1],
			outputs: [r.wIsConst ? -2 : -1]
		})[0];
		r.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = a);
		let n = [t[0], a];
		t.length === 3 && n.push(t[2]), e.compute(Vc(n, r, i), { inputs: n });
	}, Du = (e, t) => {
		let r = t.format === "NHWC", i = [e.inputs[0].reshape(r ? [
			e.inputs[0].dims[0],
			1,
			e.inputs[0].dims[1],
			e.inputs[0].dims[2]
		] : [
			e.inputs[0].dims[0],
			e.inputs[0].dims[1],
			1,
			e.inputs[0].dims[2]
		]), e.inputs[1].reshape([
			e.inputs[1].dims[0],
			e.inputs[1].dims[1],
			1,
			e.inputs[1].dims[2]
		])];
		e.inputs.length === 3 && i.push(e.inputs[2]);
		let a = t.kernelShape;
		(a.length === 0 || a[0] === 0) && (a = [e.inputs[1].dims[2]]);
		let n = t.dilations;
		(n.length === 0 || n[0] === 0) && (n = [1]);
		let s = t.strides;
		(s.length === 0 || s[0] === 0) && (s = [1]);
		let u = t.pads;
		u.length === 0 && (u = [0, 0]), u = [
			0,
			u[0],
			0,
			u[1]
		], s = [1].concat(s), n = [1].concat(n), a = [1].concat(a);
		let d = t.outputPadding;
		d = [0].concat(d);
		let p = Gi({
			...t,
			pads: u,
			strides: s,
			dilations: n,
			kernelShape: a,
			outputPadding: d
		}, i);
		Hi(e, i, p, (f) => r ? [
			f[0],
			f[2],
			f[3]
		] : [
			f[0],
			f[1],
			f[3]
		]);
	}, Hc = (e, t) => {
		if (Mu(e.inputs, t), e.inputs[0].dims.length === 3) Du(e, t);
		else {
			let r = Gi(t, e.inputs);
			Hi(e, e.inputs, r);
		}
	};
}), Uu, Fc, jc, p0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Uu = (e, t, r, i) => {
		let a = O.size(t), n = t.length, s = N("input", e, n), u = F("output", e, n), d = r.dataType === 6 ? r.getInt32Array()[0] : Number(r.getBigInt64Array()[0]), p = O.normalizeAxis(d, n), f = (c) => {
			let g = ` i32(${s.indicesGet("inputIndices", "uniforms.axis")}) `, y = j("uniforms.input_shape", "uniforms.axis", n), _ = i.reverse ? g + (i.exclusive ? " + 1" : "") : "0", $ = i.reverse ? y : g + (i.exclusive ? "" : " + 1");
			return `
                ${c.registerUniform("outputSize", "u32").registerUniform("axis", "u32").declareVariables(s, u)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices", "uniforms.axis", "u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx", "sum")};
                }`;
		};
		return {
			name: "CumSum",
			shaderCache: {
				hint: i.cacheKey,
				inputDependencies: ["rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: t,
					dataType: e
				}],
				dispatchGroup: { x: Math.ceil(a / 64) },
				programUniforms: [
					{
						type: 12,
						data: a
					},
					{
						type: 12,
						data: p
					},
					...Z(t, t)
				]
			}),
			getShaderSource: f
		};
	}, Fc = (e, t) => {
		let r = e.inputs[0].dims, i = e.inputs[0].dataType, a = e.inputs[1];
		e.compute(Uu(i, r, a, t), { inputs: [0] });
	}, jc = (e) => {
		let t = e.exclusive === 1, r = e.reverse === 1;
		return fe({
			exclusive: t,
			reverse: r
		});
	};
}), Pu, qu, Lu, Kc, Zc, c0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Pu = (e) => {
		if (!e || e.length !== 1) throw new Error("DepthToSpace requires 1 input.");
		if (e[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.");
	}, qu = (e, t, r, i) => {
		let a = [];
		a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);
		for (let n = 0; n < t; ++n) a.push(r.indicesSet("a", e[n], `i[${n}]`));
		return a.push("return a;}"), a.join(`
`);
	}, Lu = (e, t) => {
		let r, i, a, n, s, u, d = t.format === "NHWC", p = t.blocksize, f = t.mode === "DCR";
		d ? ([r, i, a, n] = e.dims, s = f ? [
			r,
			i,
			a,
			p,
			p,
			n / p ** 2
		] : [
			r,
			i,
			a,
			n / p ** 2,
			p,
			p
		], u = f ? [
			0,
			1,
			3,
			2,
			4,
			5
		] : [
			0,
			1,
			4,
			2,
			5,
			3
		]) : ([r, i, a, n] = [
			e.dims[0],
			e.dims[2],
			e.dims[3],
			e.dims[1]
		], s = f ? [
			r,
			p,
			p,
			n / p ** 2,
			i,
			a
		] : [
			r,
			n / p ** 2,
			p,
			p,
			i,
			a
		], u = f ? [
			0,
			3,
			4,
			1,
			5,
			2
		] : [
			0,
			1,
			4,
			2,
			5,
			3
		]);
		let c = e.reshape(s), g = c.dims.length, y = e.dataType, _ = N("a", y, g), $ = F("output", y, g), S = (x) => `
  ${x.registerUniform("output_size", "u32").declareVariables(_, $)}

  ${qu(u, g, _, $)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx", _.getByIndices("aIndices"))}
  }`;
		return {
			name: "DepthToSpace",
			shaderCache: {
				hint: `${e.dims};${t.blocksize};${t.mode}`,
				inputDependencies: ["rank"]
			},
			getRunData: (x) => {
				let b = d ? [
					r,
					i * p,
					a * p,
					n / p ** 2
				] : [
					r,
					n / p ** 2,
					i * p,
					a * p
				], T = O.size(b), I = c.dims, E = O.sortBasedOnPerm(I, u);
				return {
					outputs: [{
						dims: b,
						dataType: x[0].dataType
					}],
					dispatchGroup: { x: Math.ceil(T / 64) },
					programUniforms: [{
						type: 12,
						data: T
					}, ...Z(I, E)]
				};
			},
			getShaderSource: S
		};
	}, Kc = (e, t) => {
		Pu(e.inputs), e.compute(Lu(e.inputs[0], t));
	}, Zc = (e) => fe({
		blocksize: e.blocksize,
		mode: e.mode,
		format: e.format
	});
}), Rr, Jt, Fi, Wu, Vu, Gu, Hu, ji, Fu, Xc, Qc, h0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Rr = "[a-zA-Z]|\\.\\.\\.", Jt = "(" + Rr + ")+", Fi = "^" + Jt + "$", Wu = "(" + Jt + ",)*" + Jt, Vu = "^" + Wu + "$", Gu = class {
		constructor(e = -1) {
			this.symbolToIndices = /* @__PURE__ */ new Map(), this.inputIndex = e;
		}
		addSymbol(e, t) {
			let r = this.symbolToIndices.get(e);
			r === void 0 ? r = [t] : r.push(t), this.symbolToIndices.set(e, r);
		}
	}, Hu = class {
		constructor(e, t) {
			this.equation = t, this.hasEllipsis = !1, this.symbolToInfo = /* @__PURE__ */ new Map(), this.lhs = new Array(), this.outputDims = [];
			let [r, i] = t.includes("->") ? t.split("->", 2) : [t, ""];
			if (!r.match(RegExp(Vu))) throw new Error("Invalid LHS term");
			if (r.split(",").forEach((a, n) => {
				let s = e[n].dims.slice();
				if (!a.match(RegExp(Fi))) throw new Error("Invalid LHS term");
				let u = this.processTerm(a, !0, s, n);
				this.lhs.push(u);
			}), i === "") i += [...this.symbolToInfo.entries()].filter(([a, n]) => n.count === 1 || a === "...").map(([a]) => a).join("");
			else if (!i.match(RegExp(Jt))) throw new Error("Invalid RHS");
			i.match(RegExp(Rr, "g"))?.forEach((a) => {
				if (a === "...") this.outputDims = this.outputDims.concat(this.ellipsisDims);
				else {
					let n = this.symbolToInfo.get(a);
					if (n === void 0) throw new Error("Invalid RHS symbol");
					this.outputDims.push(n.dimValue);
				}
			}), this.rhs = this.processTerm(i, !1, this.outputDims);
		}
		addSymbol(e, t, r) {
			let i = this.symbolToInfo.get(e);
			if (i !== void 0) {
				if (i.dimValue !== t && i.count !== 1) throw new Error("Dimension mismatch");
				i.count++, i.inputIndices.push(r);
			} else i = {
				count: 1,
				dimValue: t,
				inputIndices: [r]
			};
			this.symbolToInfo.set(e, i);
		}
		processTerm(e, t, r, i = -1) {
			let a = r.length, n = !1, s = [], u = 0;
			if (!e.match(RegExp(Fi)) && !t && e !== "") throw new Error("Invalid LHS term");
			let d = e.match(RegExp(Rr, "g")), p = new Gu(i);
			return d?.forEach((f, c) => {
				if (f === "...") {
					if (n) throw new Error("Only one ellipsis is allowed per input term");
					n = !0;
					let g = a - d.length + 1;
					if (g < 0) throw new Error("Ellipsis out of bounds");
					if (s = r.slice(u, u + g), this.hasEllipsis) {
						if (this.ellipsisDims.length !== s.length || this.ellipsisDims.toString() !== s.toString()) throw new Error("Ellipsis dimensions mismatch");
					} else if (t) this.hasEllipsis = !0, this.ellipsisDims = s;
					else throw new Error("Ellipsis must be specified in the LHS");
					for (let y = 0; y < s.length; y++) {
						let _ = String.fromCharCode(48 + y);
						p.addSymbol(_, c + y), this.addSymbol(_, r[u++], i);
					}
				} else p.addSymbol(f, c + (this.hasEllipsis ? this.ellipsisDims.length - 1 : 0)), this.addSymbol(f, r[u++], i);
			}), p;
		}
	}, ji = (e) => e + "_max", Fu = (e, t, r, i) => {
		let a = e.map((p) => p.length).map((p, f) => N(`input${f}`, t, p)), n = O.size(i), s = F("output", t, i.length), u = [...r.symbolToInfo.keys()].filter((p) => !r.rhs.symbolToIndices.has(p)), d = (p) => {
			let f = [], c = "var prod = 1.0;", g = "var sum = 0.0;", y = "sum += prod;", _ = [], $ = [], S = [], x = [], b = r.symbolToInfo.size === r.rhs.symbolToIndices.size;
			r.symbolToInfo.forEach((I, E) => {
				if (r.rhs.symbolToIndices.has(E)) {
					let C = r.rhs.symbolToIndices.get(E)?.[0];
					C !== void 0 && r.lhs.forEach((A, w) => {
						if (I.inputIndices.includes(w)) {
							let P = A.symbolToIndices.get(E);
							if (P === void 0) throw new Error("Invalid symbol error");
							P.forEach((q) => {
								f.push(`${a[w].indicesSet(`input${w}Indices`, q, s.indicesGet("outputIndices", C))}`);
							});
						}
					});
				} else r.lhs.forEach((C, A) => {
					if (I.inputIndices.includes(A)) {
						let w = C.symbolToIndices.get(E);
						if (w === void 0) throw new Error("Invalid symbol error");
						w.forEach((P) => {
							_.push(`${a[A].indicesSet(`input${A}Indices`, P, `${E}`)}`);
						}), x.push(`prod *= ${a[A].getByIndices(`input${A}Indices`)};`);
					}
				}), $.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ji(E)}; ${E}++) {`), S.push("}");
			});
			let T = b ? [...f, `let sum = ${a.map((I, E) => I.getByIndices(`input${E}Indices`)).join(" * ")};`] : [
				...f,
				g,
				...$,
				..._,
				c,
				...x,
				y,
				...S
			];
			return `
            ${p.registerUniforms(u.map((I) => ({
				name: `${ji(I)}`,
				type: "u32"
			}))).registerUniform("outputSize", "u32").declareVariables(...a, s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((I, E) => `var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx", "sum")};
          }`;
		};
		return {
			name: "Einsum",
			shaderCache: {
				hint: r.equation,
				inputDependencies: e.map(() => "rank")
			},
			getRunData: () => {
				let p = u.filter((c) => r.symbolToInfo.has(c)).map((c) => ({
					type: 12,
					data: r.symbolToInfo.get(c)?.dimValue || 0
				}));
				p.push({
					type: 12,
					data: n
				});
				let f = e.map((c, g) => [...Z(c)]).reduce((c, g) => c.concat(g), p);
				return f.push(...Z(i)), {
					outputs: [{
						dims: i,
						dataType: t
					}],
					dispatchGroup: { x: Math.ceil(n / 64) },
					programUniforms: f
				};
			},
			getShaderSource: d
		};
	}, Xc = (e, t) => {
		let r = new Hu(e.inputs, t.equation), i = r.outputDims, a = e.inputs.map((n, s) => n.dims);
		e.compute(Fu(a, e.inputs[0].dataType, r, i));
	}, Qc = (e) => {
		let t = e.equation.replace(/\s+/g, "");
		return fe({ equation: t });
	};
}), ju, Ki, Ku, Zu, Yc, f0 = U(() => {
	"use strict";
	J(), re(), ie(), ju = (e) => {
		if (!e || e.length !== 2) throw new Error("Expand requires 2 input.");
		let t = e[0].dims, r = Array.from(e[1].getBigInt64Array(), Number), i = r.length < t.length ? 0 : r.length - t.length, a = t.length < r.length ? 0 : t.length - r.length;
		for (; i < r.length && a < t.length; ++i, ++a) if (r[i] !== t[a] && r[i] !== 1 && t[a] !== 1) throw new Error("Expand requires shape to be broadcastable to input");
	}, Ki = (e, t) => {
		let r = e.length - t.length, i = [];
		for (let a = 0; a < r; ++a) i.push(e[a]);
		for (let a = 0; a < t.length; ++a) i.push(t[a] === 1 ? e[a + r] : t[a]);
		return i;
	}, Ku = (e, t) => e.length > t.length ? Ki(e, t) : Ki(t, e), Zu = (e) => {
		let t = e[0].dims, r = Array.from(e[1].getBigInt64Array(), Number), i = Ku(t, r), a = e[0].dataType, n = a === 9 || O.size(t) === 1, s = a === 9 || t.length > 0 && t[t.length - 1] % 4 === 0 ? 4 : 1, u = n || i.length > 0 && i[i.length - 1] % 4 === 0 ? 4 : 1, d = Math.ceil(O.size(i) / u), p = (c) => {
			let g = N("input", a, t.length, s), y = F("output", a, i.length, u), _;
			if (a === 9) {
				let $ = (S, x, b = "") => `
          let outputIndices${x} = ${y.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${g.broadcastedIndicesToOffset(`outputIndices${x}`, y)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${S}[${x}] = ${b}(${g.getByOffset(`index${x}`)}[component${x}]);
        `;
				_ = `
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data", 0, "u32")}
        ${$("data", 1, "u32")}
        ${$("data", 2, "u32")}
        ${$("data", 3, "u32")}
        ${y.setByOffset("global_idx", "data")}
      }`;
			} else _ = `
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices", y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx", "data")}
      }`;
			return `
    ${c.registerUniform("vec_size", "u32").declareVariables(g, y)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`;
		}, f = [{
			type: 12,
			data: d
		}, ...Z(t, i)];
		return {
			name: "Expand",
			shaderCache: {
				hint: `${i.length};${s}${u}`,
				inputDependencies: ["rank"]
			},
			getShaderSource: p,
			getRunData: () => ({
				outputs: [{
					dims: i,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(d / 64) },
				programUniforms: f
			})
		};
	}, Yc = (e) => {
		ju(e.inputs), e.compute(Zu(e.inputs), { inputs: [0] });
	};
}), Xu, Jc, m0 = U(() => {
	"use strict";
	J(), re(), ie(), Ha(), Xu = (e) => {
		let t = e[0].dataType, r = O.size(e[0].dims), i = O.size(e[1].dims), a = i % 4 === 0, n = (s) => {
			let u = N("x", t, [1], 4), d = N("bias", t, [1], 4), p = F("y", t, [1], 4), f = [{
				name: "output_vec_size",
				type: "u32"
			}, {
				name: "bias_size",
				type: "u32"
			}], c = (y) => `
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${d.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`, g = a ? `
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};` : `${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;
			return `${s.registerUniforms(f).declareVariables(u, d, p)}

    ${$a(Ce(t))}

    ${s.mainStart(Lt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx", wa("x_in"))}
    }`;
		};
		return {
			name: "FastGeluWithBias",
			shaderCache: {
				hint: `${a}`,
				inputDependencies: ["type", "type"]
			},
			getShaderSource: n,
			getRunData: (s) => ({
				outputs: [{
					dims: s[0].dims,
					dataType: s[0].dataType
				}],
				programUniforms: [{
					type: 12,
					data: Math.ceil(r / 4)
				}, {
					type: 12,
					data: i
				}],
				dispatchGroup: { x: Math.ceil(r / Lt / 4) }
			})
		};
	}, Jc = (e) => {
		e.inputs.length < 2 || O.size(e.inputs[1].dims) === 0 ? vc(e) : e.compute(Xu(e.inputs));
	};
}), Qu, Yu, eh, th, g0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Qu = (e) => {
		if (!e || e.length !== 2) throw new Error("Gather requires 2 inputs.");
	}, Yu = (e, t) => {
		let r = e[0].dims, i = e[1].dims, a = r.length, n = O.normalizeAxis(t.axis, a), s = r.slice(0);
		s.splice(n, 1, ...i);
		let u = r[n], d = e[0].dataType === 9 ? 4 : 1, p = Math.ceil(O.size(s) / d), f = [
			{
				type: 12,
				data: p
			},
			{
				type: 6,
				data: u
			},
			{
				type: 12,
				data: n
			},
			...Z(e[0].dims, e[1].dims, s)
		], c = (g) => {
			let y = N("data", e[0].dataType, e[0].dims.length, d), _ = N("inputIndices", e[1].dataType, e[1].dims.length), $ = F("output", e[0].dataType, s.length, d), S = (b) => {
				let T = i.length, I = `var indicesIndices${b}  = ${_.type.indices}(0);`;
				for (let E = 0; E < T; E++) I += `${T > 1 ? `indicesIndices${b}[${E}]` : `indicesIndices${b}`} = ${s.length > 1 ? `outputIndices${b}[uniforms.axis + ${E}]` : `outputIndices${b}`};`;
				I += `
          var idx${b} = ${_.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${y.type.indices};
        `;
				for (let E = 0, C = 0; E < a; E++) E === n ? (I += `${a > 1 ? `dataIndices${b}[${E}]` : `dataIndices${b}`} = u32(idx${b});`, C += T) : (I += `${a > 1 ? `dataIndices${b}[${E}]` : `dataIndices${b}`} = ${s.length > 1 ? `outputIndices${b}[${C}]` : `outputIndices${b}`};`, C++);
				return I;
			}, x;
			if (e[0].dataType === 9) {
				let b = (T, I, E = "") => `
          let outputIndices${I} = ${$.offsetToIndices(`outputOffset + ${I}u`)};
          ${S(I)};
          let offset${I} = ${y.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${T}[${I}] = ${E}(${y.getByOffset(`index${I}`)}[component${I}]);
        `;
				x = `
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${b("value", 0, "u32")}
        ${b("value", 1, "u32")}
        ${b("value", 2, "u32")}
        ${b("value", 3, "u32")}
        ${$.setByOffset("global_idx", "value")}
      `;
			} else x = `
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${y.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx", "value")};
      `;
			return `
      ${g.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(y, _, $)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`;
		};
		return {
			name: "Gather",
			shaderCache: {
				hint: t.cacheKey,
				inputDependencies: ["rank", "rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: s,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(p / 64) },
				programUniforms: f
			}),
			getShaderSource: c
		};
	}, eh = (e) => fe({ axis: e.axis }), th = (e, t) => {
		let r = e.inputs;
		Qu(r), e.compute(Yu(e.inputs, t));
	};
}), Ju, rh, ih, y0 = U(() => {
	"use strict";
	J(), re(), ie(), Ju = (e, t, r, i, a, n, s, u, d) => {
		let p = [
			{
				type: 12,
				data: n
			},
			{
				type: 12,
				data: i
			},
			{
				type: 12,
				data: a
			},
			{
				type: 12,
				data: r
			},
			{
				type: 12,
				data: s
			},
			{
				type: 12,
				data: u
			},
			{
				type: 12,
				data: d
			}
		], f = [n];
		p.push(...Z(t.dims, f));
		let c = (g) => {
			let y = [N("indices_data", t.dataType, t.dims.length), F("input_slice_offsets_data", 12, 1, 1)], _ = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "batch_dims",
					type: "u32"
				},
				{
					name: "input_dims",
					type: "u32",
					length: a.length
				},
				{
					name: "sizes_from_slice_dims_data",
					type: "u32",
					length: r.length
				},
				{
					name: "num_slices_per_batch",
					type: "u32"
				},
				{
					name: "input_batch_stride",
					type: "u32"
				},
				{
					name: "num_slice_dims",
					type: "u32"
				}
			];
			return `
  ${g.registerUniforms(_).declareVariables(...y)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length === 1 ? "index += i32(uniforms.input_dims);" : "index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length === 1 ? "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);" : "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`;
		};
		return e.compute({
			name: "computeSliceOffsets",
			shaderCache: {
				hint: `${a.length}_${r.length}`,
				inputDependencies: ["rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: f,
					dataType: e.inputs[1].dataType
				}],
				dispatchGroup: { x: Math.ceil(n / 64) },
				programUniforms: p
			}),
			getShaderSource: c
		}, {
			inputs: [t],
			outputs: [-1]
		})[0];
	}, rh = (e, t) => {
		let r = e.inputs, i = r[0].dims, a = r[0].dataType, n = r[1].dims, s = n[n.length - 1], u = O.sizeToDimension(n, n.length - 1), d = O.sizeFromDimension(i, t.batchDims + s), p = O.sizeToDimension(i, t.batchDims), f = O.sizeFromDimension(i, t.batchDims), c = u / p, g = new Array(s), y = d;
		for (let I = 0; I < s; ++I) g[s - 1 - I] = y, y *= i[t.batchDims + s - 1 - I];
		let _ = Ju(e, r[1], g, t.batchDims, i, u, c, f, s), $ = t.batchDims + s;
		if ($ > i.length) throw new Error("last dimension of indices must not be larger than rank of input tensor");
		let S = n.slice(0, -1).concat(i.slice($)), x = O.size(S), b = [
			{
				type: 12,
				data: x
			},
			{
				type: 12,
				data: d
			},
			...Z(r[0].dims, _.dims, S)
		], T = (I) => {
			let E = N("data", r[0].dataType, r[0].dims.length), C = N("slice_offsets", 12, _.dims.length), A = F("output", r[0].dataType, S.length);
			return `
          ${I.registerUniform("output_size", "u32").registerUniform("slice_size", "u32").declareVariables(E, C, A)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`;
		};
		e.compute({
			name: "GatherND",
			shaderCache: {
				hint: t.cacheKey,
				inputDependencies: ["rank", "rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: S,
					dataType: a
				}],
				dispatchGroup: { x: Math.ceil(x / 64) },
				programUniforms: b
			}),
			getShaderSource: T
		}, { inputs: [r[0], _] });
	}, ih = (e) => ({
		batchDims: e.batch_dims,
		cacheKey: ""
	});
}), el, tl, ah, nh, _0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), el = (e, t) => {
		if (e.length < 3 || e.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");
		let r = O.normalizeAxis(t.quantizeAxis, e[0].dims.length), i = t.blockSize, a = e[0], n = e[2], s = e.length === 4 ? e[3] : void 0;
		if (n.dims.length !== a.dims.length || !a.dims.map((u, d) => d === r ? Math.ceil(u / i) === n.dims[d] : u === n.dims[d]).reduce((u, d) => u && d, !0)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");
		if (s) {
			if (s.dataType !== a.dataType) throw new Error("Zero point must have the same data type as the input tensor.");
			if (s.dims.length !== n.dims.length || !s.dims.map((u, d) => u === n.dims[d]).reduce((u, d) => u && d, !0)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.");
		}
	}, tl = (e, t) => {
		let r = e[0].dims, i = e[1].dims, a = r.length, n = O.normalizeAxis(t.gatherAxis, a), s = O.normalizeAxis(t.quantizeAxis, a), u = r.slice(0);
		u.splice(n, 1, ...i);
		let d = O.size(u), p = e[2].dataType, f = e[0].dataType === 22, c = [
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: s
			},
			{
				type: 12,
				data: n
			},
			{
				type: 12,
				data: t.blockSize
			},
			...Z(...e.map((y, _) => y.dims), u)
		], g = (y) => {
			let _ = N("data", e[0].dataType, e[0].dims.length), $ = N("inputIndices", e[1].dataType, e[1].dims.length), S = N("scales", e[2].dataType, e[2].dims.length), x = e.length > 3 ? N("zeroPoint", e[3].dataType, e[3].dims.length) : void 0, b = F("output", p, u.length), T = [
				_,
				$,
				S
			];
			return x && T.push(x), `
        ${y.registerUniforms([
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "quantize_axis",
					type: "u32"
				},
				{
					name: "gather_axis",
					type: "u32"
				},
				{
					name: "block_size",
					type: "u32"
				}
			]).declareVariables(...T, b)}
        ${y.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${i.length > 1 ? `
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${b.indicesGet("output_indices", "uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices", "i", "index")};
          }` : `indices_indices = ${b.indicesGet("output_indices", "uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices", "i")};
          ${_.indicesSet("data_indices", "i", "index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${_.indicesSet("data_indices", "uniforms.gather_axis", "u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${b.indicesGet("output_indices", `i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices", "i", "index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices", "uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices", "uniforms.quantize_axis", "quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${x ? `
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];` : "var zero_point = 0"};
        let dequantized_data = ${Ce(p)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx", "dequantized_data")};
    }`;
		};
		return {
			name: "GatherBlockQuantized",
			shaderCache: {
				hint: `${t.cacheKey};${e.filter((y, _) => _ !== 1).map((y) => y.dims.join("_")).join(";")}`,
				inputDependencies: Array.from({ length: e.length }, (y, _) => "rank")
			},
			getRunData: () => ({
				outputs: [{
					dims: u,
					dataType: p
				}],
				dispatchGroup: { x: Math.ceil(d / 64) },
				programUniforms: c
			}),
			getShaderSource: g
		};
	}, ah = (e, t) => {
		let r = e.inputs;
		el(r, t), e.compute(tl(e.inputs, t));
	}, nh = (e) => fe({
		blockSize: e.blockSize,
		gatherAxis: e.gatherAxis,
		quantizeAxis: e.quantizeAxis
	});
}), rl, il, sh, oh, v0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), rl = (e) => {
		if (!e || e.length !== 2) throw new Error("GatherElements requires 2 inputs.");
		if (e[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1.");
		if (e[0].dims.length !== e[1].dims.length) throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`);
	}, il = (e, t) => {
		let r = e[0].dims, i = e[0].dataType, a = r.length, n = e[1].dims, s = e[1].dataType, u = O.normalizeAxis(t.axis, a), d = r[u], p = n.slice(0), f = O.size(p), c = N("input", i, a), g = N("indicesInput", s, n.length), y = F("output", i, p.length), _ = [
			{
				type: 12,
				data: f
			},
			{
				type: 6,
				data: d
			},
			{
				type: 12,
				data: u
			}
		];
		return _.push(...Z(r, n, p)), {
			name: "GatherElements",
			shaderCache: { inputDependencies: ["rank", "rank"] },
			getRunData: () => ({
				outputs: [{
					dims: p,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(f / 64) },
				programUniforms: _
			}),
			getShaderSource: ($) => `
      ${$.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(c, g, y)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices", "uniforms.axis", "u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx", "value")};
  }`
		};
	}, sh = (e) => fe({ axis: e.axis }), oh = (e, t) => {
		let r = e.inputs;
		rl(r), e.compute(il(e.inputs, t));
	};
}), al, nl, uh, lh, b0 = U(() => {
	"use strict";
	J(), re(), ie(), al = (e) => {
		if (!e) throw new Error("Input is missing");
		if (e.length < 2 || e.length > 3) throw new Error("Invaid input number.");
		if (e.length === 3 && e[2].dims.length > 2) throw new Error("Invalid input shape of C");
		if (e[0].dataType !== e[1].dataType || e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("Input types are mismatched");
	}, nl = (e, t) => {
		let r = e[0].dims.slice(), i = e[1].dims.slice(), [a, n, s] = sp.getShapeOfGemmResult(r, t.transA, i, t.transB, e.length === 3 ? e[2].dims : void 0), u = [a, n];
		if (!u) throw new Error("Can't use gemm on the given tensors");
		let d = 16, p = Math.ceil(n / d), f = Math.ceil(a / d);
		O.size(u);
		let c = [
			{
				type: 12,
				data: p
			},
			{
				type: 12,
				data: a
			},
			{
				type: 12,
				data: n
			},
			{
				type: 12,
				data: s
			},
			{
				type: 1,
				data: t.alpha
			},
			{
				type: 1,
				data: t.beta
			}
		], g = ["type", "type"];
		e.length === 3 && (c.push(...Z(e[2].dims)), g.push("rank")), c.push(...Z(u));
		let y = (_) => {
			let $ = N("a", e[0].dataType, e[0].dims), S = N("b", e[1].dataType, e[1].dims), x = null, b = [$, S];
			e.length === 3 && (x = N("c", e[2].dataType, e[2].dims.length), b.push(x));
			let T = F("output", e[0].dataType, u.length);
			b.push(T);
			let I = [
				{
					name: "num_tile_n",
					type: "u32"
				},
				{
					name: "M",
					type: "u32"
				},
				{
					name: "N",
					type: "u32"
				},
				{
					name: "K",
					type: "u32"
				},
				{
					name: "alpha",
					type: "f32"
				},
				{
					name: "beta",
					type: "f32"
				}
			], E = "", C = "";
			t.transA && t.transB ? (C = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `, E = "value += tile_a[k][local_id.y] * tile_b[local_id.x][k];") : t.transA && !t.transB ? (C = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `, E = "value += tile_a[k][local_id.y] * tile_b[k][local_id.x];") : !t.transA && t.transB ? (C = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `, E = "value += tile_a[local_id.y][k] * tile_b[local_id.x][k];") : !t.transA && !t.transB && (C = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `, E = "value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");
			let A = t.alpha === 1 ? "" : "value *= uniforms.alpha;";
			return `
  ${_.registerUniforms(I).declareVariables(...b)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${_.mainStart([
				d,
				d,
				1
			])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${T.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${C}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${E}
      }
      workgroupBarrier();
    }

    ${A}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${x != null ? `let cOffset = ${x.broadcastedIndicesToOffset("vec2(m, n)", T)}; value += ${T.type.value}(uniforms.beta) * ${x.getByOffset("cOffset")};` : ""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`;
		};
		return {
			name: "GemmShared",
			shaderCache: {
				hint: `${t.cacheKey}`,
				inputDependencies: g
			},
			getRunData: () => ({
				outputs: [{
					dims: u,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: p * f },
				programUniforms: c
			}),
			getShaderSource: y
		};
	}, uh = (e) => ({
		transA: e.transA,
		transB: e.transB,
		alpha: e.alpha,
		beta: e.beta,
		cacheKey: `${e.transA};${e.transB};${e.alpha === 1}`
	}), lh = (e, t) => {
		al(e.inputs), e.compute(nl(e.inputs, t));
	};
}), Je, at, bt, $t, sl, ol, ul, ll, dl, pl, cl, hl, dh, ph, $0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), [Je, at, bt, $t] = [
		0,
		1,
		2,
		3
	], sl = (e) => {
		if (e[0].dims.length !== 4) throw new Error("only 4-D tensor is supported.");
		if (e[0].dims.length !== e[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions");
		if (e[0].dims.length - 2 !== e[1].dims[e[1].dims.length - 1]) throw new Error(`last dimension of grid must be equal to ${e[0].dims.length - 2}`);
		if (e[0].dims[0] !== e[1].dims[0]) throw new Error("grid batch size must match input batch size");
	}, ol = `
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`, ul = (e) => `
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`, ll = (e) => `
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners === 0 ? `
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    ` : `
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`, dl = (e) => `
  ${e.paddingMode === "reflection" ? `
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }` : ""}
`, pl = (e, t, r) => `
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Je}] = batch;
     indices[${at}] = channel;` + (() => {
		switch (r.paddingMode) {
			case "zeros": return `
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${bt}] = u32(r);
            indices[${$t}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;
			case "border": return `
          indices[${bt}] = u32(clamp(r, 0, H - 1));
          indices[${$t}] = u32(clamp(c, 0, W - 1));
        `;
			case "reflection": return `
          indices[${bt}] = gs_reflect(r, border[1], border[3]);
          indices[${$t}] = gs_reflect(c, border[0], border[2]);
        `;
			default: throw new Error(`padding mode ${r.paddingMode} is not supported`);
		}
	})() + `
    return ${e.getByIndices("indices")};
  }
`, cl = (e, t, r) => (() => {
		switch (r.mode) {
			case "nearest": return `
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Je}], indices[${at}], border);
        `;
			case "bilinear": return `
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Je}], indices[${at}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Je}], indices[${at}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Je}], indices[${at}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Je}], indices[${at}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;
			case "bicubic": return `
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Je}], indices[${at}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;
			default: throw new Error(`mode ${r.mode} is not supported`);
		}
	})() + `${e.setByOffset("global_idx", "result")}`, hl = (e, t) => {
		let r = N("x", e[0].dataType, e[0].dims.length), i = [
			e[1].dims[0],
			e[1].dims[1],
			e[1].dims[2]
		], a = N("grid", e[1].dataType, i.length, 2), n = [
			e[0].dims[0],
			e[0].dims[1],
			e[1].dims[1],
			e[1].dims[2]
		];
		t.format === "NHWC" && (n = [
			e[0].dims[0],
			e[1].dims[1],
			e[1].dims[2],
			e[0].dims[3]
		], [Je, at, bt, $t] = [
			0,
			3,
			1,
			2
		]);
		let s = F("output", e[0].dataType, n.length), u = r.type.value, d = [{
			type: 12,
			data: O.size(n)
		}, ...Z(e[0].dims, i, n)], p = (f) => `
  ${f.registerUniform("output_size", "u32").declareVariables(r, a, s)}
  ${ol}
  ${ul(u)}
  ${ll(t)}
  ${dl(t)}
  ${pl(r, u, t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${bt}]);
      let W_in = i32(uniforms.x_shape[${$t}]);

      ${t.alignCorners === 0 ? `
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      ` : `
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Je}], indices[${bt}], indices[${$t}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${cl(s, u, t)}
  }`;
		return {
			name: "GridSample",
			shaderCache: {
				hint: `${t.cacheKey}`,
				inputDependencies: ["type", "type"]
			},
			getRunData: (f) => {
				let c = O.size(n);
				return {
					outputs: [{
						dims: n,
						dataType: f[0].dataType
					}],
					dispatchGroup: { x: Math.ceil(c / 64) },
					programUniforms: d
				};
			},
			getShaderSource: p
		};
	}, dh = (e, t) => {
		sl(e.inputs), e.compute(hl(e.inputs, t));
	}, ph = (e) => fe({
		alignCorners: e.align_corners,
		mode: e.mode,
		paddingMode: e.padding_mode,
		format: e.format
	});
}), Re, fl, ch, Zi, ml, or, hh, fh = U(() => {
	"use strict";
	J(), re(), xe(), La(), Ga(), ie(), gt(), Re = (e, t) => e.length > t && e[t].dims.length > 0 ? e[t] : void 0, fl = (e, t) => {
		let r = e[0], i = Re(e, 1), a = Re(e, 2), n = Re(e, 3), s = Re(e, 4), u = Re(e, 5), d = Re(e, 6), p = Re(e, 7);
		if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
		let f = r.dims[0], c = r.dims[1], g = r.dims.length === 3 ? r.dims[2] : t.numHeads * r.dims[4], y = c, _ = 0, $ = 0, S = Math.floor(g / t.numHeads);
		if (d && p && O.size(d.dims) && O.size(p.dims)) {
			if (d.dims.length !== 4) throw new Error("Input \"past_key\" is expected to have 4 dimensions");
			if (d.dims[0] !== f || d.dims[1] !== t.numHeads || d.dims[3] !== S) throw new Error("Input \"past_key\" shape (batch_size, num_heads, past_sequence_length, head_size)");
			if (p.dims[0] !== f || p.dims[1] !== t.numHeads || p.dims[3] !== S) throw new Error("Input \"past_value\" shape (batch_size, num_heads, past_sequence_length, head_size)");
			if (d.dims[2] !== p.dims[2]) throw new Error("Input \"past_key\" and \"past_value\" shall have same dim 2 (past_sequence_length)");
			if (p.dims.length !== 4) throw new Error("Input \"past_value\" is expected to have 4 dimensions");
			_ = d.dims[2], $ = d.dims[2];
		} else if (d && O.size(d.dims) || p && O.size(p.dims)) throw new Error("Input \"past_key\" and \"past_value\" shall be both present or both absent");
		let x;
		if (i && O.size(i.dims) > 0) {
			if (r.dims.length !== 3) throw new Error("Input \"query\" is expected to have 3 dimensions when key is given");
			if (i.dims.length < 3 || i.dims.length > 5) throw new Error("Input \"key\" is expected to have 3, 4, or 5 dimensions");
			if (r.dims[0] !== i.dims[0]) throw new Error("Input \"query\" and \"key\" shall have same dim 0 (batch size)");
			if (i.dims.length === 3) {
				if (i.dims[2] !== r.dims[2]) throw new Error("Input \"query\" and \"key\" shall have same dim 2 (hidden_size)");
				x = 2, y = i.dims[1];
			} else if (i.dims.length === 5) {
				if (i.dims[2] !== t.numHeads || i.dims[3] !== 2 || i.dims[4] !== S) throw new Error("Expect \"key\" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv");
				if (a) throw new Error("Expect \"value\" be none when \"key\" has packed kv format.");
				x = 5, y = i.dims[1];
			} else {
				if (i.dims[1] !== t.numHeads || i.dims[3] !== S) throw new Error("Expect \"key\" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key");
				x = 0, y = i.dims[2];
			}
		} else {
			if (r.dims.length !== 5) throw new Error("Input \"query\" is expected to have 5 dimensions when key is empty");
			if (r.dims[2] !== t.numHeads || r.dims[3] !== 3) throw new Error("Expect \"query\" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv");
			x = 3;
		}
		if (n && O.size(n.dims) > 0) {
			if (n.dims.length !== 1) throw new Error("Input \"bias\" is expected to have 1 dimension");
			if (i && i.dims.length === 5 && i.dims[3] === 2) throw new Error("bias is not allowed for packed kv.");
		}
		let b = _ + y, T = 0;
		if (s && O.size(s.dims) > 0) {
			T = 8;
			let A = s.dims;
			throw A.length === 1 ? A[0] === f ? T = 1 : A[0] === 3 * f + 2 && (T = 3) : A.length === 2 && A[0] === f && A[1] === b && (T = 5), T === 8 ? /* @__PURE__ */ new Error("Input \"key_padding_mask\" shape shall be (batch_size) or (batch_size, total_sequence_length)") : /* @__PURE__ */ new Error("Mask not supported");
		}
		let I = !1, E = g;
		if (a && O.size(a.dims) > 0) {
			if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error("Input \"value\" is expected to have 3 or 4 dimensions");
			if (r.dims[0] !== a.dims[0]) throw new Error("Input \"query\" and \"value\" shall have same dim 0 (batch_size)");
			if (a.dims.length === 3) {
				if (y !== a.dims[1]) throw new Error("Input \"key\" and \"value\" shall have the same dim 1 (kv_sequence_length)");
				E = a.dims[2];
			} else {
				if (y !== a.dims[2]) throw new Error("Input \"key\" and \"value\" shall have the same dim 2 (kv_sequence_length)");
				E = a.dims[1] * a.dims[3], I = !0;
			}
		}
		let C = !1;
		if (s && O.size(s.dims) > 0) throw new Error("Key padding mask is not supported");
		if (u && O.size(u.dims) > 0) {
			if (u.dims.length !== 4) throw new Error("Input \"attention_bias\" is expected to have 4 dimensions");
			if (u.dims[0] !== f || u.dims[1] !== t.numHeads || u.dims[2] !== c || u.dims[3] !== b) throw new Error("Expect \"attention_bias\" shape (batch_size, num_heads, sequence_length, total_sequence_length)");
		}
		return {
			batchSize: f,
			sequenceLength: c,
			pastSequenceLength: _,
			kvSequenceLength: y,
			totalSequenceLength: b,
			maxSequenceLength: $,
			inputHiddenSize: 0,
			hiddenSize: g,
			vHiddenSize: E,
			headSize: S,
			vHeadSize: Math.floor(E / t.numHeads),
			numHeads: t.numHeads,
			isUnidirectional: !1,
			pastPresentShareBuffer: !1,
			maskFilterValue: t.maskFilterValue,
			maskType: T,
			scale: t.scale,
			broadcastResPosBias: C,
			passPastInKv: I,
			qkvFormat: x
		};
	}, ch = (e) => fe({ ...e }), Zi = fe({ perm: [
		0,
		2,
		1,
		3
	] }), ml = (e, t, r, i, a, n, s) => {
		let u = [
			i,
			a,
			n
		], d = O.size(u), p = [
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: s
			},
			{
				type: 12,
				data: n
			}
		], f = (c) => {
			let g = F("qkv_with_bias", t.dataType, u), y = N("qkv", t.dataType, u), _ = N("bias", r.dataType, u);
			return `
  ${c.registerUniforms([
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "bias_offset",
					type: "u32"
				},
				{
					name: "hidden_size",
					type: "u32"
				}
			]).declareVariables(y, _, g)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`;
		};
		return e.compute({
			name: "MultiHeadAttentionAddBias",
			shaderCache: { inputDependencies: ["type", "type"] },
			getRunData: () => ({
				outputs: [{
					dims: u,
					dataType: t.dataType,
					gpuDataType: 0
				}],
				dispatchGroup: { x: Math.ceil(d / 64) },
				programUniforms: p
			}),
			getShaderSource: f
		}, {
			inputs: [t, r],
			outputs: [-1]
		})[0];
	}, or = (e, t, r, i, a, n, s, u) => {
		let d = n;
		if (s && O.size(s.dims) > 0) {
			if (i === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");
			return d = ml(e, n, s, t, i, r * a, u), d = d.reshape([
				t,
				i,
				r,
				a
			]), r === 1 || i === 1 ? d : e.compute(De(d, Zi.perm), {
				inputs: [d],
				outputs: [-1]
			})[0];
		} else return n.dims.length === 3 && (d = n.reshape([
			t,
			i,
			r,
			a
		])), r === 1 || i === 1 ? d : e.compute(De(d, Zi.perm), {
			inputs: [d],
			outputs: [-1]
		})[0];
	}, hh = (e, t) => {
		let r = fl(e.inputs, t), i = e.inputs[0], a = Re(e.inputs, 1), n = Re(e.inputs, 2), s = Re(e.inputs, 3), u = Re(e.inputs, 4), d = Re(e.inputs, 5), p = Re(e.inputs, 6), f = Re(e.inputs, 7);
		if (i.dims.length === 5) throw new Error("Packed QKV is not implemented");
		if (a?.dims.length === 5) throw new Error("Packed KV is not implemented");
		let c = a && n && a.dims.length === 4 && n.dims.length === 4, g = or(e, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, i, s, 0);
		if (c) return dr(e, g, a, n, u, void 0, p, f, d, r);
		if (!a || !n) throw new Error("key and value must be provided");
		let y = or(e, r.batchSize, r.numHeads, r.kvSequenceLength, r.headSize, a, s, r.hiddenSize), _ = or(e, r.batchSize, r.numHeads, r.kvSequenceLength, r.vHeadSize, n, s, 2 * r.hiddenSize);
		dr(e, g, y, _, u, void 0, p, f, d, r);
	};
}), gl, yl, _l, vl, Ia, mh, gh, yh = U(() => {
	"use strict";
	J(), re(), xe(), ie(), gl = (e) => {
		if (!e || e.length < 1) throw new Error("too few inputs");
	}, yl = (e, t) => {
		let r = [], i = t.numOutputs;
		return e[1].dims[0] > 0 && (e[1].getBigInt64Array().forEach((a) => r.push(Number(a))), i = r.length), fe({
			numOutputs: i,
			axis: t.axis,
			splitSizes: r
		});
	}, _l = (e) => `
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis", "i", e)}) {
        return i;
    }
    }
    return ${e}u;
}`, vl = (e) => {
		let t = e.length, r = [];
		for (let i = 0; i < t; ++i) {
			let a = e[i].setByIndices("indices", "input[global_idx]");
			t === 1 ? r.push(a) : i === 0 ? r.push(`if (output_number == ${i}u) { ${a} }`) : i === t - 1 ? r.push(`else { ${a} }`) : r.push(`else if (output_number == ${i}) { ${a} }`);
		}
		return `
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`;
	}, Ia = (e, t) => {
		let r = e[0].dims, i = O.size(r), a = e[0].dataType, n = O.normalizeAxis(t.axis, r.length), s = new Array(t.numOutputs), u = N("input", a, r.length), d = new Array(t.numOutputs), p = [], f = [], c = 0, g = [{
			type: 12,
			data: i
		}];
		for (let _ = 0; _ < t.numOutputs; _++) {
			c += t.splitSizes[_], d[_] = c;
			let $ = r.slice();
			$[n] = t.splitSizes[_], f.push($), s[_] = F(`output${_}`, a, $.length), p.push({
				dims: f[_],
				dataType: e[0].dataType
			});
		}
		g.push({
			type: 12,
			data: d
		}, ...Z(r, ...f));
		let y = (_) => `
  ${_.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", d.length).declareVariables(u, ...s)}
  ${_l(d.length)}
  ${vl(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices", n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis", "output_number - 1u", d.length)};
      ${u.indicesSet("indices", n, "index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;
		return {
			name: "Split",
			shaderCache: {
				hint: t.cacheKey,
				inputDependencies: ["rank"]
			},
			getShaderSource: y,
			getRunData: () => ({
				outputs: p,
				dispatchGroup: { x: Math.ceil(i / 64) },
				programUniforms: g
			})
		};
	}, mh = (e, t) => {
		gl(e.inputs);
		let r = e.inputs.length === 1 ? t : yl(e.inputs, t);
		e.compute(Ia(e.inputs, r), { inputs: [0] });
	}, gh = (e) => {
		let t = e.axis, r = e.splitSizes, i = e.numOutputs < 0 ? r.length : e.numOutputs;
		if (i !== r.length) throw new Error("numOutputs and splitSizes length must be equal");
		return fe({
			axis: t,
			numOutputs: i,
			splitSizes: r
		});
	};
}), bl, Hr, _h, vh = U(() => {
	"use strict";
	J(), re(), xe(), ie(), bl = (e, t) => {
		let [r, i, a, n] = e, { numHeads: s, rotaryEmbeddingDim: u } = t;
		if (r.dims.length !== 3 && r.dims.length !== 4) throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);
		if (!O.areEqual(i.dims, []) && !O.areEqual(i.dims, [1]) && i.dims.length !== 2) throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);
		if (a.dims.length !== 2) throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);
		if (n.dims.length !== 2) throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);
		if (!O.areEqual(a.dims, n.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");
		if (u > 0 && s === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified");
		let d = r.dims[0], p = r.dims[r.dims.length - 2], f = a.dims[0], c = O.sizeFromDimension(r.dims, 1) / p, g = u === 0 ? a.dims[1] * 2 : c / s;
		if (u > g) throw new Error("rotary_embedding_dim must be less than or equal to head_size");
		if (i.dims.length === 2) {
			if (d !== i.dims[0]) throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);
			if (p !== i.dims[1]) throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`);
		}
		if (g / 2 !== a.dims[1] && u / 2 !== a.dims[1]) throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);
		if (p > f) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");
	}, Hr = (e, t) => {
		let { interleaved: r, numHeads: i, rotaryEmbeddingDim: a, scale: n } = t, s = e[0].dims[0], u = O.sizeFromDimension(e[0].dims, 1), d = e[0].dims[e[0].dims.length - 2], p = u / d, f = e[2].dims[1], c = a === 0 ? f * 2 : p / i, g = new Array(s, d, p / c, c - f), y = O.computeStrides(g), _ = [
			{
				type: 1,
				data: n
			},
			{
				type: 12,
				data: g
			},
			{
				type: 12,
				data: y
			},
			...e[0].dims.length === 3 ? new Array({
				type: 12,
				data: [
					u,
					p,
					c,
					1
				]
			}) : [],
			...e[0].dims.length === 4 ? new Array({
				type: 12,
				data: [
					u,
					c,
					d * c,
					1
				]
			}) : [],
			...Z(e[0].dims, e[1].dims, e[2].dims, e[3].dims, e[0].dims)
		], $ = (S) => {
			let x = N("input", e[0].dataType, e[0].dims.length), b = N("position_ids", e[1].dataType, e[1].dims.length), T = N("cos_cache", e[2].dataType, e[2].dims.length), I = N("sin_cache", e[3].dataType, e[3].dims.length), E = F("output", e[0].dataType, e[0].dims.length);
			return S.registerUniforms([
				{
					name: "scale",
					type: "f32"
				},
				{
					name: "global_shape",
					type: "u32",
					length: g.length
				},
				{
					name: "global_strides",
					type: "u32",
					length: y.length
				},
				{
					name: "input_output_strides",
					type: "u32",
					length: y.length
				}
			]), `
        ${S.declareVariables(x, b, T, I, E)}

        ${S.mainStart(Lt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy", F("", b.type.tensor, 2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${T.get("position_id", "bsnh[3]")} -
                ${x.getByOffset("j")} * ${I.get("position_id", "bsnh[3]")};
            ${E.setByOffset("i", "re")}
            let im = ${x.getByOffset("i")} * ${I.get("position_id", "bsnh[3]")} +
                ${x.getByOffset("j")} * ${T.get("position_id", "bsnh[3]")};
            ${E.setByOffset("j", "im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k", x.getByOffset("k"))}
          }
        }`;
		};
		return {
			name: "RotaryEmbedding",
			shaderCache: {
				hint: fe({ interleaved: r }).cacheKey,
				inputDependencies: [
					"rank",
					"rank",
					"rank",
					"rank"
				]
			},
			getShaderSource: $,
			getRunData: () => ({
				outputs: [{
					dims: e[0].dims,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(O.size(g) / Lt) },
				programUniforms: _
			})
		};
	}, _h = (e, t) => {
		bl(e.inputs, t), e.compute(Hr(e.inputs, t));
	};
}), $l, wl, Xi, xl, bh, w0 = U(() => {
	"use strict";
	xe(), J(), Ga(), fh(), yh(), gt(), vh(), ie(), $l = (e, t) => {
		if (t.doRotary && e.length <= 7) throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");
		let r = e[0], i = e[1], a = e[2], n = e[3], s = e[4];
		if (t.doRotary !== 0 && e.length <= 7) throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");
		if (t.localWindowSize !== -1) throw new Error("Local attention is not supported");
		if (t.softcap !== 0) throw new Error("Softcap is not supported");
		if (t.rotaryInterleaved !== 0) throw new Error("Rotary interleaved is not supported");
		if (t.smoothSoftmax) throw new Error("Smooth softmax is not supported");
		if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
		let u = r.dims[0], d = r.dims[1], p = r.dims.length === 3 ? r.dims[2] : t.numHeads * r.dims[4], f = d, c = 0, g = !i || i.dims.length === 0, y = Math.floor(g ? p / (t.numHeads + 2 * t.kvNumHeads) : p / t.numHeads);
		g && (p = y * t.numHeads);
		let _ = n && n.dims.length !== 0, $ = s && s.dims.length !== 0;
		if (_ && n.dims.length === 4 && n.dims[0] === u && n.dims[1] !== t.kvNumHeads && n.dims[2] === t.kvNumHeads && n.dims[3] === y) throw new Error("BSNH pastKey/pastValue is not supported");
		if (_ && $) {
			if (n.dims.length !== 4) throw new Error("Input \"past_key\" is expected to have 4 dimensions");
			if (s.dims.length !== 4) throw new Error("Input \"past_value\" is expected to have 4 dimensions");
			c = n.dims[2];
		} else if (_ || $) throw new Error("Input \"past_key\" and \"past_value\" shall be both present or both absent");
		let S = 1;
		if (i && i.dims.length > 0) {
			if (r.dims.length !== 3) throw new Error("Input \"query\" is expected to have 3 dimensions when key is given");
			if (i.dims.length < 3 || i.dims.length > 5) throw new Error("Input \"key\" is expected to have 3, 4, or 5 dimensions");
			if (r.dims[0] !== i.dims[0]) throw new Error("Input \"query\" and \"key\" shall have same dim 0 (batch size)");
			if (i.dims.length === 3) {
				if (r.dims[2] % i.dims[2] !== 0) throw new Error("Dimension 2 of \"query\" should be a multiple of \"key\"");
				f = i.dims[1];
			} else if (i.dims.length === 5) {
				if (i.dims[2] !== t.numHeads || i.dims[3] !== 2 || i.dims[4] !== y) throw new Error("Expect \"key\" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv");
				if (a) throw new Error("Expect \"value\" be none when \"key\" has packed kv format.");
				f = i.dims[1];
			} else {
				if (i.dims[1] !== t.numHeads || i.dims[3] !== y) throw new Error("Expect \"key\" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key");
				f = i.dims[2];
			}
		} else {
			if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input \"query\" is expected to have 3 or 5 dimensions when key is empty");
			if (r.dims.length === 5 && (r.dims[2] !== t.numHeads || r.dims[3] !== 3)) throw new Error("Expect \"query\" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv");
			S = 3;
		}
		let x = 0, b = !1, T = t.kvNumHeads ? y * t.kvNumHeads : p;
		if (a && a.dims.length > 0) {
			if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error("Input \"value\" is expected to have 3 or 4 dimensions");
			if (r.dims[0] !== a.dims[0]) throw new Error("Input \"query\" and \"value\" shall have same dim 0 (batch_size)");
			if (a.dims.length === 3) {
				if (f !== a.dims[1]) throw new Error("Input \"key\" and \"value\" shall have the same dim 1 (kv_sequence_length)");
				T = a.dims[2];
			} else {
				if (f !== a.dims[2]) throw new Error("Input \"past_key\" and \"past_value\" shall have the same dim 2 (kv_sequence_length)");
				T = a.dims[1] * a.dims[3], b = !0;
			}
		}
		let I = e.length > 4 ? e[5] : void 0;
		if (I && I.dims.length !== 1 && I.dims[0] !== u) throw new Error("Input \"seqlens\" is expected to have 1 dimension and the same dim 0 as batch_size");
		return {
			batchSize: u,
			sequenceLength: d,
			pastSequenceLength: c,
			kvSequenceLength: f,
			totalSequenceLength: -1,
			maxSequenceLength: -1,
			inputHiddenSize: 0,
			hiddenSize: p,
			vHiddenSize: T,
			headSize: y,
			vHeadSize: Math.floor(T / t.kvNumHeads),
			numHeads: t.numHeads,
			kvNumHeads: t.kvNumHeads,
			nReps: t.numHeads / t.kvNumHeads,
			pastPresentShareBuffer: !1,
			maskType: x,
			scale: t.scale,
			broadcastResPosBias: !1,
			passPastInKv: b,
			qkvFormat: S
		};
	}, wl = fe({ perm: [
		0,
		2,
		1,
		3
	] }), Xi = (e, t, r) => {
		let i = t, a = r.kvNumHeads;
		return t.dims.length === 3 && r.kvSequenceLength !== 0 && (i = t.reshape([
			r.batchSize,
			r.kvSequenceLength,
			a,
			r.headSize
		]), i = e.compute(De(i, wl.perm), {
			inputs: [i],
			outputs: [-1]
		})[0]), i;
	}, xl = (e, t, r, i) => {
		let a = 7, n = ["type", "type"], s = [e * t], u = e * t, d = [
			{
				type: 12,
				data: u
			},
			{
				type: 12,
				data: t
			},
			{
				type: 12,
				data: e
			}
		], p = (f) => {
			let c = N("seq_lens", r.dataType, r.dims), g = N("total_seq_lens", i.dataType, i.dims), y = F("pos_ids", a, s);
			return `
  ${f.registerUniforms([
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "sequence_length",
					type: "u32"
				},
				{
					name: "batch_size",
					type: "u32"
				}
			]).declareVariables(c, g, y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${c.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx", "pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx", "pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx", "seqlen")}
    };
  }
  `;
		};
		return {
			name: "GeneratePositionIds",
			shaderCache: {
				hint: `${e};${t}`,
				inputDependencies: n
			},
			getRunData: () => ({
				outputs: [{
					dims: s,
					dataType: a
				}],
				dispatchGroup: { x: Math.ceil(u / 64) },
				programUniforms: d
			}),
			getShaderSource: p
		};
	}, bh = (e, t) => {
		let r = $l(e.inputs, t);
		if (e.inputs[0].dims.length === 5) throw new Error("Packed QKV is not implemented");
		if (e.inputs[1]?.dims.length === 5) throw new Error("Packed KV is not implemented");
		let i = e.inputs[0], a = e.inputs[1] && e.inputs[1].dims.length > 0 ? e.inputs[1] : void 0, n = e.inputs[2] && e.inputs[2].dims.length > 0 ? e.inputs[2] : void 0, s = e.inputs[3] && e.inputs[3].dims.length !== 0 ? e.inputs[3] : void 0, u = e.inputs[4] && e.inputs[4].dims.length !== 0 ? e.inputs[4] : void 0, d = e.inputs.length > 4 ? e.inputs[5] : void 0, p = e.inputs.length > 5 ? e.inputs[6] : void 0, f = r.kvNumHeads ? r.kvNumHeads : r.numHeads, c = fe({
			axis: 2,
			numOutputs: 3,
			splitSizes: [
				r.numHeads * r.headSize,
				f * r.headSize,
				f * r.headSize
			]
		}), [g, y, _] = !a && !n ? e.compute(Ia([i], c), {
			inputs: [i],
			outputs: [
				-1,
				-1,
				-1
			]
		}) : [
			i,
			a,
			n
		], $, S;
		if (t.doRotary) {
			let I = e.compute(xl(r.batchSize, r.sequenceLength, d, p), {
				inputs: [d, p],
				outputs: [-1]
			})[0], E = e.inputs[7], C = e.inputs[8], A = fe({
				interleaved: t.rotaryInterleaved !== 0,
				numHeads: r.numHeads,
				rotaryEmbeddingDim: 0,
				scale: t.scale
			}), w = [
				g,
				I,
				E,
				C
			], P = [-1];
			$ = e.compute(Hr(w, A), {
				inputs: w,
				outputs: P
			})[0], w.splice(0, 1, y);
			let q = fe({
				interleaved: t.rotaryInterleaved !== 0,
				numHeads: r.kvNumHeads,
				rotaryEmbeddingDim: 0,
				scale: t.scale
			});
			S = e.compute(Hr(w, q), {
				inputs: w,
				outputs: P
			})[0];
		}
		let x = or(e, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, t.doRotary ? $ : g, void 0, 0), b = Xi(e, t.doRotary ? S : y, r), T = Xi(e, _, r);
		dr(e, x, b, T, void 0, void 0, s, u, void 0, r, d, p);
	};
}), Qi, Sl, kl, $h, x0 = U(() => {
	"use strict";
	J(), re(), gt(), ie(), Qi = (e, t, r, i, a, n, s, u) => {
		let d = we(n), p = d === 1 ? "f32" : `vec${d}f`, f = d === 1 ? "vec2f" : `mat2x${d}f`, c = a * s, g = 64;
		c === 1 && (g = 256);
		let y = [
			a,
			s,
			n / d
		], _ = [
			a,
			s,
			2
		], $ = [
			"rank",
			"type",
			"type"
		], S = [];
		S.push(...Z(y, _));
		let x = (b) => {
			let T = N("x", t.dataType, 3, d), I = [
				T,
				N("scale", r.dataType, r.dims),
				N("bias", i.dataType, i.dims),
				F("output", 1, 3, 2)
			];
			return `
  var<workgroup> workgroup_shared : array<${f}, ${g}>;
  const workgroup_size = ${g}u;
  ${b.declareVariables(...I)}
  ${b.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch", "channel", "h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${mt("workgroup_shared[0][0]", d)} / f32(hight * ${d});
      let squared_sum_final = ${mt("workgroup_shared[0][1]", d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`;
		};
		return e.compute({
			name: "InstanceNormComputeChannelScaleShift",
			shaderCache: {
				hint: `${d};${u};${g}`,
				inputDependencies: $
			},
			getRunData: () => ({
				outputs: [{
					dims: _,
					dataType: 1
				}],
				dispatchGroup: { x: c },
				programUniforms: S
			}),
			getShaderSource: x
		}, {
			inputs: [
				t,
				r,
				i
			],
			outputs: [-1]
		})[0];
	}, Sl = (e, t, r) => {
		let i = t[0].dims, a = i, n = 2, s = i[0], u = i[1], d = O.sizeFromDimension(i, n), p = we(d), f = O.size(a) / p, c = Qi(e, t[0], t[1], t[2], s, d, u, r.epsilon), g = [
			s,
			u,
			d / p
		], y = [s, u], _ = ["type", "none"], $ = (S) => {
			let x = N("x", t[0].dataType, g.length, p), b = N("scale_shift", 1, y.length, 2), T = F("output", t[0].dataType, g.length, p), I = [
				x,
				b,
				T
			];
			return `
  ${S.registerUniform("output_size", "u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx", "value")};
  }`;
		};
		e.compute({
			name: "InstanceNormalization",
			shaderCache: {
				hint: `${p}`,
				inputDependencies: _
			},
			getRunData: () => ({
				outputs: [{
					dims: a,
					dataType: t[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(f / 64) },
				programUniforms: [{
					type: 12,
					data: f
				}, ...Z(g, y, g)]
			}),
			getShaderSource: $
		}, { inputs: [t[0], c] });
	}, kl = (e, t, r) => {
		let i = t[0].dims, a = i, n = i[0], s = i[i.length - 1], u = O.sizeFromDimension(i, 1) / s, d = we(s), p = O.size(a) / d, f = [{
			type: 12,
			data: u
		}, {
			type: 12,
			data: Math.floor(s / d)
		}], c = ["type", "type"], g = !1, y = [0, i.length - 1];
		for (let x = 0; x < i.length - 2; x++) g = g || i[x + 1] !== 1, y.push(x + 1);
		g = g && i[i.length - 1] !== 1;
		let _ = g ? e.compute(De(e.inputs[0], y), {
			inputs: [e.inputs[0]],
			outputs: [-1]
		})[0] : e.inputs[0].reshape(Array.from({ length: i.length }, (x, b) => i[y[b]])), $ = Qi(e, _, t[1], t[2], n, u, s, r.epsilon), S = (x) => {
			let b = Te(t[0].dataType), T = d === 1 ? "vec2f" : `mat${d}x2f`, I = (A) => {
				let w = A === 0 ? "x" : "y", P = d === 1 ? "f32" : `vec${d}f`;
				switch (d) {
					case 1: return `${b}(${P}(scale.${w}))`;
					case 2: return `vec2<${b}>(${P}(scale[0].${w}, scale[1].${w}))`;
					case 4: return `vec4<${b}>(${P}(scale[0].${w}, scale[1].${w}, scale[2].${w}, scale[3].${w}))`;
					default: throw new Error(`Not supported compoents ${d}`);
				}
			}, E = N("input", t[0].dataType, t[0].dims, d), C = F("output", t[0].dataType, a, d);
			return `
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`;
		};
		e.compute({
			name: "InstanceNormalizationNHWC",
			shaderCache: {
				hint: `${d}`,
				inputDependencies: c
			},
			getRunData: () => ({
				outputs: [{
					dims: a,
					dataType: t[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(p / 64) },
				programUniforms: f
			}),
			getShaderSource: S
		}, { inputs: [t[0], $] });
	}, $h = (e, t) => {
		t.format === "NHWC" ? kl(e, e.inputs, t) : Sl(e, e.inputs, t);
	};
}), Tl, Il, wh, S0 = U(() => {
	"use strict";
	J(), re(), ie(), Tl = (e) => {
		if (!e || e.length < 2) throw new Error("layerNorm requires at least 2 inputs.");
	}, Il = (e, t, r) => {
		let i = t.simplified, a = e[0].dims, n = e[1], s = !i && e[2], u = a, d = O.normalizeAxis(t.axis, a.length), p = O.sizeToDimension(a, d), f = O.sizeFromDimension(a, d), c = O.size(n.dims), g = s ? O.size(s.dims) : 0;
		if (c !== f || s && g !== f) throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${g}`);
		let y = [];
		for (let E = 0; E < a.length; ++E) E < d ? y.push(a[E]) : y.push(1);
		let _ = we(f), $ = ["type", "type"], S = [
			{
				type: 12,
				data: p
			},
			{
				type: 1,
				data: f
			},
			{
				type: 12,
				data: Math.floor(f / _)
			},
			{
				type: 1,
				data: t.epsilon
			}
		];
		s && $.push("type");
		let x = r > 1, b = r > 2, T = (E) => {
			let C = Te(e[0].dataType), A = [N("x", e[0].dataType, e[0].dims, _), N("scale", n.dataType, n.dims, _)];
			return s && A.push(N("bias", s.dataType, s.dims, _)), A.push(F("output", e[0].dataType, u, _)), x && A.push(F("mean_data_output", 1, y)), b && A.push(F("inv_std_output", 1, y)), `
  ${E.registerUniforms([
				{
					name: "norm_count",
					type: "u32"
				},
				{
					name: "norm_size",
					type: "f32"
				},
				{
					name: "norm_size_vectorized",
					type: "u32"
				},
				{
					name: "epsilon",
					type: "f32"
				}
			]).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${_a("f32", _)};
    var mean_square_vector = ${_a("f32", _)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pt(C, _, "x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${mt("mean_vector", _)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${mt("mean_square_vector", _)} / uniforms.norm_size ${i ? "" : "- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pt(C, _, "x[j + offset]")};
      let f32scale = ${Pt(C, _, "scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i ? "" : "- mean"}) * inv_std_dev * f32scale
        ${s ? `+ ${Pt(C, _, "bias[j]")}` : ""}
      );
    }

    ${x ? "mean_data_output[global_idx] = mean" : ""};
    ${b ? "inv_std_output[global_idx] = inv_std_dev" : ""};
  }`;
		}, I = [{
			dims: u,
			dataType: e[0].dataType
		}];
		return x && I.push({
			dims: y,
			dataType: 1
		}), b && I.push({
			dims: y,
			dataType: 1
		}), {
			name: "LayerNormalization",
			shaderCache: {
				hint: `${_};${r};${i}`,
				inputDependencies: $
			},
			getRunData: () => ({
				outputs: I,
				dispatchGroup: { x: Math.ceil(p / 64) },
				programUniforms: S
			}),
			getShaderSource: T
		};
	}, wh = (e, t) => {
		Tl(e.inputs), e.compute(Il(e.inputs, t, e.outputCount));
	};
}), El, xh, k0 = U(() => {
	"use strict";
	re(), Za(), Xa(), El = (e) => {
		if (!e || e.length !== 2) throw new Error("MatMul requires 2 inputs.");
		if (e[0].dims[e[0].dims.length - 1] !== e[1].dims[e[1].dims.length - 2]) throw new Error("shared dimension does not match.");
	}, xh = (e) => {
		El(e.inputs);
		let t = qt.calcShape(e.inputs[0].dims, e.inputs[1].dims, !0);
		if (!t) throw new Error("Can't use matmul on the given tensors");
		let r = t[t.length - 1], i = e.inputs[0].dims[e.inputs[0].dims.length - 1];
		if (r < 8 && i < 8) e.compute(Ka(e.inputs, { activation: "" }, t));
		else {
			let a = t[t.length - 2], n = O.size(e.inputs[0].dims.slice(0, -2)), s = O.size(e.inputs[1].dims.slice(0, -2));
			if (n !== 1 && a === 1 && s === 1) {
				let u = e.inputs[0].reshape([
					1,
					n,
					i
				]), d = e.inputs[1].reshape([
					1,
					i,
					r
				]), p = [
					1,
					n,
					r
				], f = [u, d];
				e.compute(Gr(f, { activation: "" }, t, p), { inputs: f });
			} else e.compute(Gr(e.inputs, { activation: "" }, t));
		}
	};
}), zl, Cl, Al, Sh, kh, T0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), zl = (e, t) => {
		if (e.length < 3 || e.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs");
		let r = e[0], i = r.dims.length;
		if (r.dims[i - 1] !== t.k) throw new Error("The last dim of input shape does not match the k value");
		let a = Math.floor((t.k + t.blockSize - 1) / t.blockSize), n = t.blockSize / 8 * t.bits, s = e[1];
		if (!O.areEqual(s.dims, [
			t.n,
			a,
			n
		])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");
		let u = e[2].dims;
		if (O.size(u) !== t.n * a) throw new Error("scales input size error.");
		if (e.length === 4) {
			let d = e[3].dims, p = t.n * (t.bits === 8 ? a : Math.floor((a * t.bits + 7) / 8));
			if (O.size(d) !== p) throw new Error("zeroPoints input size error.");
		}
	}, Cl = (e, t) => {
		let r = e[0].dims, i = r.length, a = r[i - 2], n = t.k, s = t.n, u = r.slice(0, i - 2), d = O.size(u), p = e[1].dims[2] / 4, f = e[0].dataType, c = we(t.k), g = we(p), y = we(s), _ = u.concat([a, s]), $ = a > 1 && s / y % 2 === 0 ? 2 : 1, S = O.size(_) / y / $, x = 64, b = [], T = [
			d,
			a,
			n / c
		], I = O.convertShape(e[1].dims).slice();
		I.splice(-1, 1, p / g), b.push(...Z(T)), b.push(...Z(I)), b.push(...Z(e[2].dims)), e.length === 4 && b.push(...Z(O.convertShape(e[3].dims)));
		let E = [
			d,
			a,
			s / y
		];
		b.push(...Z(E));
		let C = (A) => {
			let w = T.length, P = N("a", e[0].dataType, w, c), q = N("b", 12, I.length, g), Q = N("scales", e[2].dataType, e[2].dims.length), K = [
				P,
				q,
				Q
			], X = e.length === 4 ? N("zero_points", 12, e[3].dims.length) : void 0;
			X && K.push(X);
			let R = E.length, D = F("output", e[0].dataType, R, y), G = Te(e[0].dataType), Y = (() => {
				switch (c) {
					case 1: return `array<${G}, 8>`;
					case 2: return `mat4x2<${G}>`;
					case 4: return `mat2x4<${G}>`;
					default: throw new Error(`${c}-component is not supported.`);
				}
			})(), ee = Math.floor(32 / t.bits), te = Math.floor(ee / 8), M = () => {
				let ne = "";
				for (let V = 0; V < te; V++) {
					let Be = V * t.bits * 4, Ae = Be + t.bits;
					ne += `
          // reuse a data (pass ${V})
            var input_offset${V > 0 ? V : ""} = ${V === 0 ? P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`) : "input_offset"};
            var a_data${V > 0 ? V : ""}: ${Y};
            for (var j${V > 0 ? V : ""}: u32 = 0; j${V > 0 ? V : ""} < ${8 / c}; j${V > 0 ? V : ""}++) {
              a_data${V > 0 ? V : ""}[j${V > 0 ? V : ""}] = ${P.getByOffset(`input_offset${V > 0 ? V : ""}`)};
              input_offset${V > 0 ? V : ""}++;
            }
          `;
					for (let be = 0; be < y * $; be++) ne += `
            b_value = ${g === 1 ? `b${be}_data` : `b${be}_data[i]`};
            ${t.bits === 2 ? `{
              let half_word = b_value >> ${V * 16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }` : `b_value_lower = unpack4xU8((b_value >> ${Be}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ae}u) & b_mask);`}
            b_quantized_values = ${Y}(${Array.from({ length: 4 }, (ze, pe) => `${G}(b_value_lower[${pe}]), ${G}(b_value_upper[${pe}])`).join(", ")});
            b_dequantized_values = ${c === 1 ? `${Y}(${Array.from({ length: 8 }, (ze, pe) => `(b_quantized_values[${pe}] - ${X ? `zero_point${be}` : "zero_point"}) * scale${be}`).join(", ")});` : `(b_quantized_values - ${Y}(${Array(8).fill(`${X ? `zero_point${be}` : "zero_point"}`).join(",")})) * scale${be};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(be / y)}]${y > 1 ? `[${be % y}]` : ""} += ${Array.from({ length: 8 / c }, (ze, pe) => `${c === 1 ? `a_data${V > 0 ? V : ""}[${pe}] * b_dequantized_values[${pe}]` : `dot(a_data${V > 0 ? V : ""}[${pe}], b_dequantized_values[${pe}])`}`).join(" + ")};
          `;
				}
				return ne;
			}, H = () => {
				let ne = `
            var col_index = col * ${y};
            ${X ? `
            let zero_point_values_per_byte: u32 = ${Math.floor(8 / t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;` : `
            // The default zero point is ${Math.pow(2, t.bits - 1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${G}(${Math.pow(2, t.bits - 1).toFixed(1)});`}
            `;
				for (let V = 0; V < y * $; V++) ne += `
            let scale${V} = ${Q.getByOffset("col_index * nBlocksPerCol + block")};
            ${X ? `
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${G}((zero_point_word) & ${t.bits === 2 ? "0x3u" : "0xFu"});` : ""}
            col_index += 1;`;
				return ne;
			}, oe = () => {
				let ne = `col_index = col * ${y};`;
				for (let V = 0; V < y * $; V++) ne += `
            let b${V}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;
				return ne += `
            var b_value: u32;
            let b_mask: u32 = ${t.bits === 2 ? "0x03030303u" : "0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Y};
            var b_dequantized_values: ${Y};`, ne;
			};
			return `
        var<workgroup> workgroup_shared: array<${D.type.value}, ${$ * x}>;
        ${A.declareVariables(...K, D)}
        ${A.mainStart([
				x,
				1,
				1
			])}
          let output_indices = ${D.offsetToIndices(`(global_idx / ${x}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize / c};
            ${H()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${oe()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${M()}
                word_offset += ${ee / c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${D.type.value} = ${D.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${D.setByIndices(`${D.type.indices}(batch, row, col + local_id.x)`, "output_value")};
          }
        }`;
		};
		return {
			name: "MatMulNBits",
			shaderCache: {
				hint: `${t.blockSize};${t.bits};${c};${g};${y};${$};${x}`,
				inputDependencies: Array(e.length).fill("rank")
			},
			getRunData: () => ({
				outputs: [{
					dims: _,
					dataType: f
				}],
				dispatchGroup: { x: S },
				programUniforms: b
			}),
			getShaderSource: C
		};
	}, Al = (e, t) => {
		let r = e[0].dims, i = r.length, a = r[i - 2], n = t.k, s = t.n, u = r.slice(0, i - 2), d = O.size(u), p = e[1].dims[2] / 4, f = e[0].dataType, c = we(t.k), g = we(p), y = u.concat([a, s]), _ = 128, $ = s % 8 === 0 ? 8 : s % 4 === 0 ? 4 : 1, S = _ / $, x = Math.floor(32 / t.bits), b = S * g * x, T = b / c, I = b / t.blockSize, E = O.size(y) / $, C = [], A = [
			d,
			a,
			n / c
		], w = O.convertShape(e[1].dims).slice();
		w.splice(-1, 1, p / g), C.push(...Z(A)), C.push(...Z(w)), C.push(...Z(e[2].dims)), e.length === 4 && C.push(...Z(O.convertShape(e[3].dims)));
		let P = [
			d,
			a,
			s
		];
		C.push(...Z(P));
		let q = (Q) => {
			let K = A.length, X = N("a", e[0].dataType, K, c), R = N("b", 12, w.length, g), D = N("scales", e[2].dataType, e[2].dims.length), G = [
				X,
				R,
				D
			], Y = e.length === 4 ? N("zero_points", 12, e[3].dims.length) : void 0;
			Y && G.push(Y);
			let ee = P.length, te = F("output", e[0].dataType, ee), M = Te(e[0].dataType), H = () => {
				switch (c) {
					case 1: return `
          let a_data0 = vec4<${M}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${M}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;
					case 2: return `
          let a_data0 = vec4<${M}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${M}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;
					case 4: return `
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;
					default: throw new Error(`${c}-component is not supported.`);
				}
			};
			return `
        var<workgroup> sub_a: array<${X.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${te.type.value}, ${S}>, ${$}>;
        ${Q.declareVariables(...G, te)}
        ${Q.mainStart([
				S,
				$,
				1
			])}
          let output_indices = ${te.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${X.getByIndices(`${X.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${X.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${Y ? `
            let zero_point_values_per_byte: u32 = ${Math.floor(8 / t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${M}((zero_point_word) & ${t.bits === 2 ? "0x3u" : "0xFu"});` : `
            // The default zero point is ${Math.pow(2, t.bits - 1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${M}(${Math.pow(2, t.bits - 1).toFixed(1)});`}
            let scale = ${D.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize / c};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g === 1 ? "b_data" : "b_data[i]"};
              ${(() => {
				let oe = Math.floor(x / 8), ne = "";
				for (let V = 0; V < oe; V++) {
					let Be = V * t.bits * 4, Ae = Be + t.bits;
					ne += `
              ${H()}
              {${t.bits === 2 ? `
                let half_word = b_value >> ${V * 16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);` : `
                let b_value_lower = unpack4xU8((b_value >> ${Be}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ae}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${M}>(${Array.from({ length: 4 }, (be, ze) => `${M}(b_value_lower[${ze}]), ${M}(b_value_upper[${ze}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${M}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({ length: 2 }, (be, ze) => `${`dot(a_data${ze}, b_dequantized_values[${ze}])`}`).join(" + ")};
              }
              word_offset += ${8 / c};`;
				}
				return ne;
			})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${te.setByIndices(`${te.type.indices}(batch, row, col + local_idx)`, "output_value")}
            }
          }
        }`;
		};
		return {
			name: "BlockwiseMatMulNBits32",
			shaderCache: {
				hint: `${t.blockSize};${c};${g};${S};${$}`,
				inputDependencies: Array(e.length).fill("rank")
			},
			getRunData: () => ({
				outputs: [{
					dims: y,
					dataType: f
				}],
				dispatchGroup: { x: E },
				programUniforms: C
			}),
			getShaderSource: q
		};
	}, Sh = (e, t) => {
		zl(e.inputs, t), t.blockSize === 32 && e.adapterInfo.isVendor("intel") && e.adapterInfo.isArchitecture("gen-12lp") ? e.compute(Al(e.inputs, t)) : e.compute(Cl(e.inputs, t));
	}, kh = (e) => fe(e);
}), Ol, Rl, Bl, Nl, Ml, Dl, Ul, Pl, Th, I0 = U(() => {
	"use strict";
	J(), re(), ie(), Ol = (e) => {
		if (!e || e.length < 1) throw new Error("Too few inputs");
		if (e[0].dataType !== 1 && e[0].dataType !== 10) throw new Error("Input type must be float or float16.");
		if (e.length >= 2) {
			let t = e[0].dims.length * 2 === e[1].dims[0];
			if (e.length === 4 && (t = e[3].dims[0] * 2 === e[1].dims[0]), !t) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].");
		}
	}, Rl = (e, t, r) => {
		let i = "";
		for (let a = t - 1; a >= 0; --a) i += `
            k = i32(${e.indicesGet("indices", a)}) - ${j("uniforms.pads", a, r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape", a, t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides", a, t)});
        `;
		return `
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `;
	}, Bl = (e, t, r) => {
		let i = "";
		for (let a = t - 1; a >= 0; --a) i += `
                k = i32(${e.indicesGet("indices", a)}) - ${j("uniforms.pads", a, r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape", a, t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape", a, t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides", a, t)});
            `;
		return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `;
	}, Nl = (e, t, r) => {
		let i = "";
		for (let a = t - 1; a >= 0; --a) i += `
                k = i32(${e.indicesGet("indices", a)}) - ${j("uniforms.pads", a, r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape", a, t)})) {
                  k = i32(${j("uniforms.x_shape", a, t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides", a, t)});
            `;
		return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `;
	}, Ml = (e, t, r) => {
		let i = "";
		for (let a = t - 1; a >= 0; --a) i += `
                k = i32(${e.indicesGet("indices", a)}) - ${j("uniforms.pads", a, r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape", a, t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape", a, t)})) {
                  k -= i32(${j("uniforms.x_shape", a, t)});
                }
                offset += k * i32(${j("uniforms.x_strides", a, t)});
            `;
		return `
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `;
	}, Dl = (e, t, r) => {
		switch (r.mode) {
			case 0: return Rl(e, t, r.pads.length);
			case 1: return Bl(e, t, r.pads.length);
			case 2: return Nl(e, t, r.pads.length);
			case 3: return Ml(e, t, r.pads.length);
			default: throw new Error("Invalid mode");
		}
	}, Ul = (e, t) => {
		let r = O.padShape(e[0].dims.slice(), t.pads), i = e[0].dims, a = [{
			type: 12,
			data: O.size(r)
		}, {
			type: 6,
			data: t.pads
		}], n = e.length >= 3 && e[2].data;
		t.mode === 0 && a.push({
			type: n ? e[2].dataType : 1,
			data: t.value
		}), a.push(...Z(e[0].dims, r));
		let s = ["rank"], u = (d) => {
			let p = F("output", e[0].dataType, r.length), f = N("x", e[0].dataType, i.length), c = f.type.value, g = Dl(p, i.length, t), y = [{
				name: "output_size",
				type: "u32"
			}, {
				name: "pads",
				type: "i32",
				length: t.pads.length
			}];
			return t.mode === 0 && y.push({
				name: "constant_value",
				type: n ? c : "f32"
			}), `
            ${d.registerUniforms(y).declareVariables(f, p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${g}
            output[global_idx] = value;
        }`;
		};
		return {
			name: "Pad",
			shaderCache: {
				hint: `${t.mode}${n}`,
				inputDependencies: s
			},
			getRunData: () => ({
				outputs: [{
					dims: r,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(O.size(r) / 64) },
				programUniforms: a
			}),
			getShaderSource: u
		};
	}, Pl = (e, t) => {
		if (e.length > 1) {
			let r = e[1].getBigInt64Array(), i = e.length >= 3 && e[2].data ? e[2].dataType === 10 ? e[2].getUint16Array()[0] : e[2].getFloat32Array()[0] : 0, a = e[0].dims.length, n = new Int32Array(2 * a).fill(0);
			if (e.length >= 4) {
				let u = e[3].getBigInt64Array();
				for (let d = 0; d < u.length; d++) n[Number(u[d])] = Number(r[d]), n[Number(u[d]) + a] = Number(r[d + u.length]);
			} else r.forEach((u, d) => n[Number(d)] = Number(u));
			let s = [];
			return n.forEach((u) => s.push(u)), {
				mode: t.mode,
				value: i,
				pads: s
			};
		} else return t;
	}, Th = (e, t) => {
		Ol(e.inputs);
		let r = Pl(e.inputs, t);
		e.compute(Ul(e.inputs, r), { inputs: [0] });
	};
}), er, Yi, Ji, ea, ta, ql, Ll, ra, ia, Ih, Eh, aa, zh, Ch, na, Ah, Oh, Rh, Bh, E0 = U(() => {
	"use strict";
	qe(), J(), re(), ie(), er = (e) => {
		if (ve.webgpu.validateInputContent && (!e || e.length !== 1)) throw new Error("Pool ops requires 1 input.");
	}, Yi = (e, t, r) => {
		let i = t.format === "NHWC", a = e.dims.slice();
		i && a.splice(1, 0, a.pop());
		let n = Object.hasOwnProperty.call(t, "dilations"), s = t.kernelShape.slice(), u = t.strides.slice(), d = n ? t.dilations.slice() : [], p = t.pads.slice();
		Wr.adjustPoolAttributes(r, a, s, u, d, p);
		let f = Wr.computePoolOutputShape(r, a, u, d, s, p, t.autoPad), c = Object.assign({}, t);
		n ? Object.assign(c, {
			kernelShape: s,
			strides: u,
			pads: p,
			dilations: d,
			cacheKey: t.cacheKey
		}) : Object.assign(c, {
			kernelShape: s,
			strides: u,
			pads: p,
			cacheKey: t.cacheKey
		});
		let g = f.slice();
		return g.push(g.splice(1, 1)[0]), [c, i ? g : f];
	}, Ji = (e, t) => {
		let r = t.format === "NHWC", i = O.size(e), a = O.size(t.kernelShape), n = [{
			type: 12,
			data: i
		}, {
			type: 12,
			data: a
		}], s = [{
			name: "outputSize",
			type: "u32"
		}, {
			name: "kernelSize",
			type: "u32"
		}];
		if (t.kernelShape.length <= 2) {
			let u = t.kernelShape[t.kernelShape.length - 1], d = t.strides[t.strides.length - 1], p = t.pads[t.pads.length / 2 - 1], f = t.pads[t.pads.length - 1], c = !!(p + f);
			n.push({
				type: 12,
				data: u
			}, {
				type: 12,
				data: d
			}, {
				type: 12,
				data: p
			}, {
				type: 12,
				data: f
			}), s.push({
				name: "kw",
				type: "u32"
			}, {
				name: "sw",
				type: "u32"
			}, {
				name: "pwStart",
				type: "u32"
			}, {
				name: "pwEnd",
				type: "u32"
			});
			let g = !1;
			if (t.kernelShape.length === 2) {
				let y = t.kernelShape[t.kernelShape.length - 2], _ = t.strides[t.strides.length - 2], $ = t.pads[t.pads.length / 2 - 2], S = t.pads[t.pads.length - 2];
				g = !!($ + S), n.push({
					type: 12,
					data: y
				}, {
					type: 12,
					data: _
				}, {
					type: 12,
					data: $
				}, {
					type: 12,
					data: S
				}), s.push({
					name: "kh",
					type: "u32"
				}, {
					name: "sh",
					type: "u32"
				}, {
					name: "phStart",
					type: "u32"
				}, {
					name: "phEnd",
					type: "u32"
				});
			}
			return [
				n,
				s,
				!0,
				c,
				g
			];
		} else {
			if (r) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
			let u = O.computeStrides(t.kernelShape);
			return n.push({
				type: 12,
				data: u
			}, {
				type: 12,
				data: t.pads
			}, {
				type: 12,
				data: t.strides
			}), s.push({
				name: "kernelStrides",
				type: "u32",
				length: u.length
			}, {
				name: "pads",
				type: "u32",
				length: t.pads.length
			}, {
				name: "strides",
				type: "u32",
				length: t.strides.length
			}), [
				n,
				s,
				!!t.pads.reduce((d, p) => d + p),
				!1,
				!1
			];
		}
	}, ea = (e, t, r, i, a, n, s, u, d, p, f, c) => {
		let g = a.format === "NHWC", y = t.type.value, _ = F("output", t.type.tensor, i);
		if (a.kernelShape.length <= 2) {
			let $ = "", S = "", x = "", b = r - (g ? 2 : 1);
			if (f ? $ = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }` : $ = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`, a.kernelShape.length === 2) {
				let T = r - (g ? 3 : 2);
				c ? S = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              ` : S = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `, x = `
              }
            `;
			}
			return `
            ${e.registerUniforms(d).declareVariables(t, _)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${S}
              ${$}
              ${x}
              ${s}

              output[global_idx] = value;
            }`;
		} else {
			if (g) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
			let $ = a.kernelShape.length, S = a.pads.length, x = "";
			return p ? x = `
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }` : x = `
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `, `
            ${e.registerUniforms(d).declareVariables(t, _)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$ - 1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides", "j", $)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides", "j", $)};
                }
                offsets[${$ - 1}] = offset;

                isPad = false;
                for (var j = ${r - $}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides", `j - ${r - $}u`, $)}
                    + offsets[j - ${r - $}u] - ${j("uniforms.pads", "j - 2u", S)};
                  ${x}
              }
              ${s}

              output[global_idx] = value;
            }`;
		}
	}, ta = (e) => `${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`, ql = (e) => `${ta(e)};${e.countIncludePad}`, Ll = (e) => `${ta(e)};${e.storageOrder};${e.dilations}`, ra = (e) => ({
		format: e.format,
		autoPad: [
			"NOTSET",
			"VALID",
			"SAME_UPPER",
			"SAME_LOWER"
		][e.auto_pad],
		ceilMode: e.ceil_mode,
		kernelShape: e.kernel_shape,
		strides: e.strides,
		pads: e.pads
	}), ia = (e, t, r, i) => {
		let [a, n] = Yi(t, i, r), s = N("x", t.dataType, t.dims.length), u = s.type.value, d = "value += x_val;", p = "";
		a.countIncludePad ? p += `value /= ${u}(uniforms.kernelSize);` : p += `value /= ${u}(i32(uniforms.kernelSize) - pad);`;
		let [f, c, g, y, _] = Ji(n, a);
		return f.push(...Z(t.dims, n)), {
			name: e,
			shaderCache: {
				hint: `${i.cacheKey};${g};${y};${_}`,
				inputDependencies: ["rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: n,
					dataType: t.dataType
				}],
				dispatchGroup: { x: Math.ceil(O.size(n) / 64) },
				programUniforms: f
			}),
			getShaderSource: ($) => ea($, s, t.dims.length, n.length, a, d, p, 0, c, g, y, _)
		};
	}, Ih = (e) => {
		let t = e.count_include_pad !== 0, r = ra(e);
		if (r.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
		let i = {
			countIncludePad: t,
			...r,
			cacheKey: ""
		};
		return {
			...i,
			cacheKey: ql(i)
		};
	}, Eh = (e, t) => {
		er(e.inputs), e.compute(ia("AveragePool", e.inputs[0], !1, t));
	}, aa = {
		autoPad: "",
		ceilMode: 0,
		countIncludePad: !1,
		kernelShape: [],
		strides: [],
		pads: [],
		storageOrder: 0,
		dilations: []
	}, zh = (e) => {
		let t = e.format;
		return {
			format: t,
			...aa,
			cacheKey: t
		};
	}, Ch = (e, t) => {
		er(e.inputs), e.compute(ia("GlobalAveragePool", e.inputs[0], !0, t));
	}, na = (e, t, r, i) => {
		let [a, n] = Yi(t, i, r), s = `
      value = max(x_val, value);
    `, u = "", d = N("x", t.dataType, t.dims.length), p = ["rank"], [f, c, g, y, _] = Ji(n, a);
		return f.push(...Z(t.dims, n)), {
			name: e,
			shaderCache: {
				hint: `${i.cacheKey};${g};${y};${_}`,
				inputDependencies: p
			},
			getRunData: () => ({
				outputs: [{
					dims: n,
					dataType: t.dataType
				}],
				dispatchGroup: { x: Math.ceil(O.size(n) / 64) },
				programUniforms: f
			}),
			getShaderSource: ($) => ea($, d, t.dims.length, n.length, a, s, u, t.dataType === 10 ? -65504 : -1e5, c, g, y, _)
		};
	}, Ah = (e, t) => {
		er(e.inputs), e.compute(na("MaxPool", e.inputs[0], !1, t));
	}, Oh = (e) => {
		let t = e.storage_order, r = e.dilations, i = ra(e);
		if (t !== 0) throw new Error("column major storage order is not yet supported for MaxPool");
		if (i.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for MaxPool");
		let a = {
			storageOrder: t,
			dilations: r,
			...i,
			cacheKey: ""
		};
		return {
			...a,
			cacheKey: Ll(a)
		};
	}, Rh = (e) => {
		let t = e.format;
		return {
			format: t,
			...aa,
			cacheKey: t
		};
	}, Bh = (e, t) => {
		er(e.inputs), e.compute(na("GlobalMaxPool", e.inputs[0], !0, t));
	};
}), Wl, Vl, Nh, Mh, z0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Wl = (e, t) => {
		if (e.length < 2 || e.length > 3) throw new Error("DequantizeLinear requires 2 or 3 inputs.");
		if (e.length === 3 && e[1].dims === e[2].dims) throw new Error("x-scale and x-zero-point must have the same shape.");
		if (e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
		if (e[1].dims.length !== 0 && e[1].dims.length !== 1 && e[1].dims.length !== e[0].dims.length) throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");
		if (e.length > 2) {
			if (e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
			if (e[1].dims.length !== e[2].dims.length) throw new Error("scale and zero-point inputs must have the same rank.");
			if (!e[1].dims.map((r, i) => r === e[2].dims[i]).reduce((r, i) => r && i, !0)) throw new Error("scale and zero-point inputs must have the same shape.");
		}
		if (t.blockSize > 0) {
			if (e[1].dims.length === 0 || e[1].dims.length === 1 && e[1].dims[0] === 1) throw new Error("blockSize must be set only for block quantization.");
			if (!e[1].dims.map((a, n) => n === t.axis || a === e[0].dims[n]).reduce((a, n) => a && n, !0)) throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");
			if (e[1].dims.length !== e[0].dims.length) throw new Error("For block qunatization the scale input rank must be the same as the x rank.");
			let r = e[0].dims[t.axis], i = e[1].dims[t.axis];
			if (t.blockSize < Math.ceil(r / i) || t.blockSize > Math.ceil(r / (i - 1) - 1)) throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].");
		}
	}, Vl = (e, t) => {
		let r = O.normalizeAxis(t.axis, e[0].dims.length), i = e[0].dataType, a = i === 3, n = e[0].dims, s = e[1].dataType, u = O.size(n), d = i === 3 || i === 2, p = d ? [Math.ceil(O.size(e[0].dims) / 4)] : e[0].dims, f = e[1].dims, c = e.length > 2 ? e[2] : void 0, g = c ? d ? [Math.ceil(O.size(c.dims) / 4)] : c.dims : void 0, y = f.length === 0 || f.length === 1 && f[0] === 1, _ = y === !1 && f.length === 1, $ = we(u), S = y && (!d || $ === 4), x = S ? $ : 1, b = S && !d ? $ : 1, T = N("input", d ? 12 : i, p.length, b), I = N("scale", s, f.length), E = c ? N("zero_point", d ? 12 : i, g.length) : void 0, C = F("output", s, n.length, x), A = [T, I];
		E && A.push(E);
		let w = [p, f];
		c && w.push(g);
		let P = [
			{
				type: 12,
				data: u / x
			},
			{
				type: 12,
				data: r
			},
			{
				type: 12,
				data: t.blockSize
			},
			...Z(...w, n)
		], q = (Q) => `
      ${Q.registerUniforms([
			{
				name: "output_size",
				type: "u32"
			},
			{
				name: "axis",
				type: "u32"
			},
			{
				name: "block_size",
				type: "u32"
			}
		]).declareVariables(...A, C)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${d ? `
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${a ? "unpack4xI8(input)" : "unpack4xU8(input)"};
            let x_value = ${x === 1 ? "x_vec[global_idx % 4]" : "x_vec"};` : `let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${y ? `let scale_value= ${I.getByOffset("0")}` : _ ? `
            let scale_index = ${C.indicesGet("output_indices", "uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};` : `
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices", "uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices", "uniforms.axis", "index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E ? y ? d ? `
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]` : `let zero_point_value = ${E.getByOffset("0")}` : _ ? d ? `
                let zero_point_index = ${C.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]` : `
                let zero_point_index = ${C.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};` : d ? `
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];` : `let zero_point_value = ${E.getByIndices("scale_indices")};` : `let zero_point_value = ${d ? a ? "i32" : "u32" : T.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx", `${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`;
		return {
			name: "DequantizeLinear",
			shaderCache: {
				hint: t.cacheKey,
				inputDependencies: E ? [
					"rank",
					"rank",
					"rank"
				] : ["rank", "rank"]
			},
			getShaderSource: q,
			getRunData: () => ({
				outputs: [{
					dims: n,
					dataType: s
				}],
				dispatchGroup: {
					x: Math.ceil(u / x / 64),
					y: 1,
					z: 1
				},
				programUniforms: P
			})
		};
	}, Nh = (e, t) => {
		Wl(e.inputs, t), e.compute(Vl(e.inputs, t));
	}, Mh = (e) => fe({
		axis: e.axis,
		blockSize: e.blockSize
	});
}), Gl, Hl, Dh, C0 = U(() => {
	"use strict";
	qe(), J(), ie(), Gl = (e, t, r) => {
		if (e === t || e < t && r < 0 || e > t && r > 0) throw new Error("Range these inputs' contents are invalid.");
	}, Hl = (e, t, r, i) => {
		let a = Math.abs(Math.ceil((t - e) / r)), n = [a], s = a, u = [
			{
				type: 12,
				data: s
			},
			{
				type: i,
				data: e
			},
			{
				type: i,
				data: r
			},
			...Z(n)
		], d = (p) => {
			let f = F("output", i, n.length), c = f.type.value, g = [
				{
					name: "outputSize",
					type: "u32"
				},
				{
					name: "start",
					type: c
				},
				{
					name: "delta",
					type: c
				}
			];
			return `
        ${p.registerUniforms(g).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`;
		};
		return {
			name: "Range",
			shaderCache: { hint: `${i}` },
			getShaderSource: d,
			getRunData: () => ({
				outputs: [{
					dims: n,
					dataType: i
				}],
				dispatchGroup: { x: Math.ceil(s / 64) },
				programUniforms: u
			})
		};
	}, Dh = (e) => {
		let t = 0, r = 0, i = 0;
		e.inputs[0].dataType === 6 ? (t = e.inputs[0].getInt32Array()[0], r = e.inputs[1].getInt32Array()[0], i = e.inputs[2].getInt32Array()[0]) : e.inputs[0].dataType === 1 && (t = e.inputs[0].getFloat32Array()[0], r = e.inputs[1].getFloat32Array()[0], i = e.inputs[2].getFloat32Array()[0]), ve.webgpu.validateInputContent && Gl(t, r, i), e.compute(Hl(t, r, i, e.inputs[0].dataType), { inputs: [] });
	};
}), Fl, jl, Uh, Ph, A0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Fl = (e, t, r, i) => {
		if (e !== "none" && i !== "i32" && i !== "u32" && i !== "f32") throw new Error(`Input ${i} is not supported with reduction ${e}.`);
		let a = `{
                var oldValue = 0;
                loop {
                  let newValueF32 =`, n = `;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;
		switch (e) {
			case "none": return `${t}=${r};`;
			case "add": return i === "i32" || i === "u32" ? `atomicAdd(&${t}, bitcast<${i}>(${r}));` : `
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;
			case "max": return i === "i32" || i === "u32" ? `atomicMax(&${t}, bitcast<${i}>(${r}));` : `
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;
			case "min": return i === "i32" || i === "u32" ? `atomicMin(&${t}, bitcast<${i}>(${r}));` : `${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;
			case "mul": return `${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;
			default: throw new Error(`Reduction ${e} is not supported.`);
		}
	}, jl = (e, t) => {
		let r = e[0].dims, i = e[1].dims, a = r, n = 1, s = Math.ceil(O.sizeToDimension(i, i.length - 1) / n), u = i[i.length - 1], d = O.sizeFromDimension(r, u), p = [
			{
				type: 12,
				data: s
			},
			{
				type: 12,
				data: u
			},
			{
				type: 12,
				data: d
			},
			...Z(e[1].dims, e[2].dims, a)
		], f = (c) => {
			let g = N("indices", e[1].dataType, e[1].dims.length), y = N("updates", e[2].dataType, e[2].dims.length, n), _ = t.reduction !== "none" && t.reduction !== "" ? hp("output", e[0].dataType, a.length) : F("output", e[0].dataType, a.length, n);
			return `
      ${c.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(g, y, _)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length === 1 ? `
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;` : `
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Fl(t.reduction, "output[data_offset + i]", "value", _.type.value)}
  }

      }`;
		};
		return {
			name: "ScatterND",
			shaderCache: {
				hint: `${t.cacheKey}_${t.reduction}`,
				inputDependencies: ["rank", "rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: a,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(s / 64) },
				programUniforms: p
			}),
			getShaderSource: f
		};
	}, Uh = (e) => fe({ reduction: e.reduction }), Ph = (e, t) => {
		e.compute(jl(e.inputs, t), {
			inputs: [e.inputs[1], e.inputs[2]],
			outputs: []
		});
	};
}), Kl, Zl, Xl, sa, Ql, Yl, Jl, ed, td, rd, id, ad, oa, nd, sd, od, ud, ld, qh, Lh, O0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), Kl = (e, t) => {
		if (e.every((r) => r > 0 || (() => {
			throw new Error("Resize requires scales input values to be positive");
		})), e.length > 0) {
			if (t.mode === "linear") {
				if (!(e.length === 2 || e.length === 3 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1 || e.length === 5 && e[0] === 1 && e[1] === 1)) throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`);
			} else if (t.mode === "cubic" && !(e.length === 2 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode");
		}
	}, Zl = (e, t, r) => {
		t.every((a) => a >= 0 && a < r || (() => {
			throw new Error("Resize requires axes input values to be positive and less than rank");
		}));
		let i = new Array(r).fill(1);
		return t.forEach((a, n) => i[a] = e[n]), i;
	}, Xl = (e, t, r, i, a, n) => {
		let [s, u, d] = r > 10 ? [
			1,
			2,
			3
		] : [
			-1,
			e.length > 1 ? 1 : -1,
			-1
		], p = e[0].dims.length;
		if (s > 0 && e.length > s && e[s].dims.length > 0) e[s].getFloat32Array().forEach((f) => n.push(f));
		else if (t.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");
		if (u > 0 && e.length > u && e[u].dims.length === 1 && e[u].dims[0] > 0) {
			if (e[u].getFloat32Array().forEach((f) => i.push(f)), i.length !== 0 && i.length !== p && r >= 18 && i.length !== t.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");
			Kl(i, t), t.axes.length > 0 && Zl(i, t.axes, p).forEach((f, c) => i[c] = f);
		}
		if (d > 0 && e.length > d && e[d].dims.length === 1 && e[d].dims[0] > 0 && (e[d].getBigInt64Array().forEach((f) => a.push(Number(f))), a.length !== 0 && a.length !== p && r >= 18 && a.length !== t.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");
		if (t.axes.length > 0) {
			if (i.length !== 0 && i.length !== t.axes.length) throw new Error("Resize requires \"scales\" input size to be of axes rank when axes attributes is specified");
			if (a.length !== 0 && a.length !== t.axes.length) throw new Error("Resize requires \"sizes\" input size to be of rank axes rank when axes attributes is specified");
		}
		if (typeof i < "u" && typeof a < "u" && i.length > 0 && a.length > p) throw new Error("Resize requires only of scales or sizes to be specified");
	}, sa = (e, t, r, i) => `
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`, Ql = (e, t) => `fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { ` + (() => {
		switch (e) {
			case "asymmetric": return `
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${sa("xResized", "lengthOriginal", "lengthResized", t)}
          }
        `;
			case "pytorch_half_pixel": return `if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;
			case "tf_half_pixel_for_nn": return `return (${t}(xResized) + 0.5) / ${t}(xScale);`;
			case "align_corners": return `if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${sa("xResized", "lengthOriginal - 1", "lengthResized - 1", t)}
                  }`;
			case "tf_crop_and_resize": return `if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;
			case "half_pixel_symmetric": return `const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;
			case "half_pixel": return `return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;
			default: throw new Error(`Coordinate transform mode ${e} is not supported`);
		}
	})() + "}", Yl = (e, t, r) => `fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {` + (() => {
		switch (e) {
			case "round_prefer_ceil": return "if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";
			case "floor": return "return floor(xOriginal);";
			case "ceil": return "return ceil(xOriginal);";
			case "round_prefer_floor": return "if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";
			default:
				if (t < 11) return "if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";
				throw new Error(`Nearest mode ${e} is not supported`);
		}
	})() + "}", Jl = (e, t, r) => {
		let i = new Array(r).fill(0).concat(new Array(r).fill(1)), a = e.length === 0 ? i : e.slice();
		return t.length > 0 ? (t.forEach((n, s) => {
			i[n] = a[s], i[s + r] = a[t.length + s];
		}), i) : a;
	}, ed = (e, t, r, i) => {
		let a = [];
		if (r.length > 0) if (i.length > 0) {
			if (e.forEach((n) => a.push(n)), Math.max(...i) > e.length) throw new Error("axes is out of bound");
			i.forEach((n, s) => a[n] = r[s]);
		} else r.forEach((n) => a.push(n));
		else {
			if (t.length === 0) throw new Error("Resize requires either scales or sizes.");
			a = e.map((n, s) => Math.round(n * t[s]));
		}
		return a;
	}, td = (e, t, r) => {
		let i = (() => {
			switch (r.keepAspectRatioPolicy) {
				case "not_larger": return r.axes.length > 0 ? Math.min(...r.axes.map((n) => t[n]), Number.MAX_VALUE) : Math.min(...t, Number.MAX_VALUE);
				case "not_smaller": return r.axes.length > 0 ? Math.max(...r.axes.map((n) => t[n]), Number.MIN_VALUE) : Math.max(...t, Number.MIN_VALUE);
				default: throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`);
			}
		})();
		t.fill(1, 0, t.length);
		let a = e.slice();
		return r.axes.length > 0 ? (r.axes.forEach((n) => t[n] = i), r.axes.forEach((n) => a[n] = Math.round(e[n] * t[n]))) : (t.fill(i, 0, t.length), a.forEach((n, s) => a[s] = Math.round(n * t[s]))), a;
	}, rd = (e, t, r, i, a) => `
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices", "i")};
        var scale = ${j("uniforms.scales", "i", i)};
        var roi_low = ${j("uniforms.roi", "i", a)};
        var roi_hi = ${j("uniforms.roi", `i + ${t.length}`, a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape", "i", t.length)};
          var output_shape_i = ${j("uniforms.output_shape", "i", r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`, id = (e, t, r, i, a, n, s) => `
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices", "i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales", "i", a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi", "i", n)};
          var roi_hi = ${j("uniforms.roi", `i + ${r.length}`, n)};
          var input_shape_i = ${j("uniforms.input_shape", "i", r.length)};
          var output_shape_i = ${j("uniforms.output_shape", "i", i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices", "i", "input_index")}
      }
      return input_indices;
    }`, ad = (e, t) => `
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices", "i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape", "i", t.length)}) {
          return false;
        }
      }
      return true;
    }`, oa = (e, t, r, i) => e.rank > i ? `
    ${e.indicesSet("input_indices", t, "channel")};
    ${e.indicesSet("input_indices", r, "batch")};
` : "", nd = (e, t, r, i, a) => {
		let [n, s, u, d] = r.length === 2 ? [
			-1,
			0,
			1,
			-1
		] : [
			0,
			2,
			3,
			1
		], p = e.type.value;
		return `
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", s, `max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices", u, `max(0, min(col, ${r[u]} - 1))`)};
      ${oa(e, d, n, 2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i ? `if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }` : ""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length > 2 ? `u32(originalIndices[${d}])` : "0"};
      var batch: u32 =  ${r.length > 2 ? `u32(originalIndices[${n}])` : "0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`;
	}, sd = (e, t, r, i, a, n, s, u, d, p) => {
		let [f, c] = r.length === 2 ? [0, 1] : [2, 3], g = e.type.value, y = (_) => {
			let $ = _ === f ? "row" : "col";
			return `
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices", _)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[_]},
        ${i[_]}, ${r[_]}, ${n[_]}, ${n[_]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[_]} - 1))) {
          return ${d};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[_]}) {
            ${p ? `coefs[i + 1] = 0.0;
                        continue;` : u ? `return ${d};` : `${$} = max(0, min(${$}, ${r[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy", _, `u32(${$})`)};
          data[i + 1] = ${_ === f ? e.getByIndices("input_indices_copy") : "rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`;
		};
		return `
    ${y(f)};
    ${y(c)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `;
	}, od = (e, t, r, i, a) => {
		let [n, s, u, d, p] = r.length === 3 ? [
			-1,
			0,
			1,
			2,
			-1
		] : [
			0,
			2,
			3,
			4,
			1
		], f = e.type.value;
		return `
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", s, `max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices", u, `max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices", d, `max(0, min(width, ${r[d]} - 1))`)};
      ${oa(e, p, n, 3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${d}];
      ${i ? `if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${a};
        }` : ""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length > 3 ? `u32(originalIndices[${p}])` : "0"};
      var batch: u32 =  ${r.length > 3 ? `u32(originalIndices[${n}])` : "0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`;
	}, ud = (e, t, r, i, a, n) => {
		let s = e.dims, u = Jl(n, t.axes, s.length), d = ed(s, i, a, t.axes), p = i.slice();
		i.length === 0 && (p = s.map((b, T) => b === 0 ? 1 : d[T] / b), t.keepAspectRatioPolicy !== "stretch" && (d = td(s, p, t)));
		let f = F("output", e.dataType, d.length), c = N("input", e.dataType, s.length), g = O.size(d), y = s.length === d.length && s.every((b, T) => b === d[T]), _ = t.coordinateTransformMode === "tf_crop_and_resize", $ = t.extrapolationValue, S = c.type.value, x = (b) => `
      ${y ? "" : `
      ${Ql(t.coordinateTransformMode, S)};
      ${(() => {
			switch (t.mode) {
				case "nearest": return `
              ${ad(c, s)};
              ${Yl(t.nearestMode, r, S)};
              ${id(c, f, s, d, p.length, u.length, _)};
              `;
				case "linear": return `
              ${rd(f, s, d, p.length, u.length)};
              ${(() => {
					if (s.length === 2 || s.length === 4) return `${nd(c, f, s, _, $)}`;
					if (s.length === 3 || s.length === 5) return `${od(c, f, s, _, $)}`;
					throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.");
				})()};
            `;
				case "cubic": return `
            ${(() => {
					if (s.length === 2 || s.length === 4) return `${sd(c, f, s, d, p, u, t.cubicCoeffA, _, t.extrapolationValue, t.excludeOutside)}`;
					throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.");
				})()};
            `;
				default: throw Error("Invalid resize mode");
			}
		})()};
      `}
      ${b.registerUniform("output_size", "u32").registerUniform("scales", "f32", p.length).registerUniform("roi", "f32", u.length).declareVariables(c, f)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y ? "output[global_idx] = input[global_idx];" : `
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(() => {
			switch (t.mode) {
				case "nearest": return `input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;
				case "linear": return `output[global_idx] = ${s.length === 2 || s.length === 4 ? "bilinearInterpolation" : "trilinearInterpolation"}(output_indices);`;
				case "cubic": return "output[global_idx] = bicubicInterpolation(output_indices);";
				default: throw Error(`Unsupported resize mode: ${t.mode}`);
			}
		})()};
`}
      }`;
		return {
			name: "Resize",
			shaderCache: {
				hint: `${t.cacheKey}|${r}|${p.length > 0 ? t.mode === "cubic" ? p : p.length : ""}|${a.length > 0 ? a : ""}|${u.length > 0 ? u : ""}|${y}|${t.mode === "nearest" ? s.length : s}`,
				inputDependencies: ["rank"]
			},
			getShaderSource: x,
			getRunData: () => ({
				outputs: [{
					dims: d,
					dataType: e.dataType
				}],
				dispatchGroup: { x: Math.ceil(g / 64) },
				programUniforms: [
					{
						type: 12,
						data: g
					},
					{
						type: 1,
						data: p
					},
					{
						type: 1,
						data: u
					},
					...Z(s, d)
				]
			})
		};
	}, ld = (e) => {
		let t = e.customDataBuffer;
		return new Uint32Array(t, t.byteOffset, 1)[0];
	}, qh = (e, t) => {
		let r = [], i = [], a = [], n = ld(e);
		if (t.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported");
		Xl(e.inputs, t, n, r, i, a), e.compute(ud(e.inputs[0], t, n, r, i, a), { inputs: [0] });
	}, Lh = (e) => {
		let t = e.antialias, r = e.axes, i = e.coordinateTransformMode, a = e.cubicCoeffA, n = e.excludeOutside !== 0, s = e.extrapolationValue, u = e.keepAspectRatioPolicy, d = e.mode, p = e.nearestMode === "" ? "simple" : e.nearestMode;
		return fe({
			antialias: t,
			axes: r,
			coordinateTransformMode: i,
			cubicCoeffA: a,
			excludeOutside: n,
			extrapolationValue: s,
			keepAspectRatioPolicy: u,
			mode: d,
			nearestMode: p
		});
	};
}), dd, pd, Wh, R0 = U(() => {
	"use strict";
	J(), re(), ie(), dd = (e) => {
		if (!e || e.length < 3) throw new Error("layerNorm requires at least 3 inputs.");
		let t = e[0], r = e[1], i = e[2];
		if (t.dataType !== r.dataType || t.dataType !== i.dataType) throw new Error("All inputs must have the same data type");
		if (t.dims.length !== 3 && t.dims.length !== 2) throw new Error("Input must be 2D or 3D");
		if (r.dims.length !== 3 && r.dims.length !== 2) throw new Error("Skip must be 2D or 3D");
		let a = t.dims[t.dims.length - 1], n = t.dims[t.dims.length - 2];
		if (r.dims[r.dims.length - 1] !== a) throw new Error("Skip must have the same hidden size as input");
		if (r.dims[r.dims.length - 2] !== n) throw new Error("Skip must have the same sequence length as input");
		if (i.dims.length !== 1) throw new Error("Gamma must be 1D");
		if (i.dims[i.dims.length - 1] !== a) throw new Error("Gamma must have the same hidden size as input");
		if (e.length > 3) {
			let s = e[3];
			if (s.dims.length !== 1) throw new Error("Beta must be 1D");
			if (s.dims[s.dims.length - 1] !== a) throw new Error("Beta must have the same hidden size as input");
		}
		if (e.length > 4) {
			let s = e[4];
			if (s.dims.length !== 1) throw new Error("Bias must be 1D");
			if (s.dims[s.dims.length - 1] !== a) throw new Error("Bias must have the same hidden size as input");
		}
	}, pd = (e, t, r, i) => {
		let a = t.simplified, n = e[0].dims, s = O.size(n), u = n, d = s, p = n.slice(-1)[0], f = i ? n.slice(0, -1).concat(1) : [], c = !a && e.length > 3, g = e.length > 4, y = i && r > 1, _ = i && r > 2, $ = r > 3, S = 64, x = we(p), b = [
			{
				type: 12,
				data: d
			},
			{
				type: 12,
				data: x
			},
			{
				type: 12,
				data: p
			},
			{
				type: 1,
				data: t.epsilon
			}
		], T = (E) => {
			let C = [
				{
					name: "output_size",
					type: "u32"
				},
				{
					name: "components",
					type: "u32"
				},
				{
					name: "hidden_size",
					type: "u32"
				},
				{
					name: "epsilon",
					type: "f32"
				}
			], A = [
				N("x", e[0].dataType, e[0].dims, x),
				N("skip", e[1].dataType, e[1].dims, x),
				N("gamma", e[2].dataType, e[2].dims, x)
			];
			c && A.push(N("beta", e[3].dataType, e[3].dims, x)), g && A.push(N("bias", e[4].dataType, e[4].dims, x)), A.push(F("output", e[0].dataType, u, x)), y && A.push(F("mean_output", 1, f)), _ && A.push(F("inv_std_output", 1, f)), $ && A.push(F("input_skip_bias_sum", e[0].dataType, u, x));
			let w = Te(e[0].dataType), P = Te(1, x);
			return `

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${P}, ${S}>;
      var<workgroup> sum_squared_shared : array<${P}, ${S}>;

      ${E.mainStart([
				S,
				1,
				1
			])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S - 1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g ? "bias[offset1d + i]" : w + "(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$ ? "input_skip_bias_sum[offset + i] = value;" : ""}
          output[offset + i] = value;
          let f32_value = ${Pt(w, x, "value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${mt("sum", x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${mt("square_sum", x)} / f32(uniforms.hidden_size) ${a ? "" : "- mean * mean"} + uniforms.epsilon);
        ${y ? "mean_output[global_idx] = mean;" : ""}
        ${_ ? "inv_std_output[global_idx] = inv_std_dev;" : ""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a ? "" : `- ${w}(mean)`}) *
            ${w}(inv_std_dev) * gamma[offset1d + i]
            ${c ? "+ beta[offset1d + i]" : ""};
        }
      }`;
		}, I = [{
			dims: u,
			dataType: e[0].dataType
		}];
		return r > 1 && I.push({
			dims: f,
			dataType: 1
		}), r > 2 && I.push({
			dims: f,
			dataType: 1
		}), r > 3 && I.push({
			dims: n,
			dataType: e[0].dataType
		}), {
			name: "SkipLayerNormalization",
			shaderCache: {
				hint: `${x};${y};${_};${$}`,
				inputDependencies: e.map((E, C) => "type")
			},
			getShaderSource: T,
			getRunData: () => ({
				outputs: I,
				dispatchGroup: { x: Math.ceil(d / p) },
				programUniforms: b
			})
		};
	}, Wh = (e, t) => {
		dd(e.inputs);
		let r = [0];
		e.outputCount > 1 && r.push(-3), e.outputCount > 2 && r.push(-3), e.outputCount > 3 && r.push(3), e.compute(pd(e.inputs, t, e.outputCount, !1), { outputs: r });
	};
}), cd, tr, hd, ua, fd, md, Vh, Gh, B0 = U(() => {
	"use strict";
	J(), re(), xe(), ie(), cd = (e, t) => {
		if (!e || e.length < 1) throw new Error("too few inputs");
		if (t.axes.length !== 0) {
			if (t.axes.length !== t.starts.length || t.axes.length !== t.ends.length) throw new Error("axes, starts and ends must have the same length");
		} else if (t.starts.length !== t.ends.length) throw new Error("starts and ends must have the same length");
		e.slice(1).forEach((r, i) => {
			if (e[i + 1].dataType !== 6 && e[i + 1].dataType !== 7) throw new Error(`Input ${i} must be an array of int32 or int64`);
		});
	}, tr = (e, t) => {
		let r = [];
		if (e.length > t) if (e[t].dataType === 7) e[t].getBigInt64Array().forEach((i) => r.push(Number(i)));
		else if (e[t].dataType === 6) e[t].getInt32Array().forEach((i) => r.push(Number(i)));
		else throw new Error(`Input ${t} must be an array of int32 or int64`);
		return r;
	}, hd = (e, t) => {
		if (e.length > 1) {
			let r = tr(e, 1), i = tr(e, 2), a = tr(e, 3);
			return a.length === 0 && (a = [...Array(e[0].dims.length).keys()]), fe({
				starts: r,
				ends: i,
				axes: a
			});
		} else return t;
	}, ua = (e, t, r, i, a) => {
		let n = e;
		return e < 0 && (n += r[i[t]]), a[t] < 0 ? Math.max(0, Math.min(n, r[i[t]] - 1)) : Math.max(0, Math.min(n, r[i[t]]));
	}, fd = (e, t, r) => `fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length - 1}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape", "i", r.length)};
            let steps_i = ${j("uniforms.steps", "i", r.length)};
            let signs_i = ${j("uniforms.signs", "i", r.length)};
            let starts_i = ${j("uniforms.starts", "i", r.length)};
            var output_index = ${t.indicesGet("output_indices", "i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices", "i", "input_index")};
          }
          return input_indices;
      }`, md = (e, t) => {
		let r = e[0].dims, i = O.size(r), a = t.axes.length > 0 ? O.normalizeAxes(t.axes, r.length) : [...Array(r.length).keys()], n = tr(e, 4);
		n.forEach((x) => x !== 0 || (() => {
			throw new Error("step cannot be 0");
		})), n.length === 0 && (n = Array(a.length).fill(1));
		let s = t.starts.map((x, b) => ua(x, b, r, a, n)), u = t.ends.map((x, b) => ua(x, b, r, a, n));
		if (a.length !== s.length || a.length !== u.length) throw new Error("start, ends and axes should have the same number of elements");
		if (a.length !== r.length) for (let x = 0; x < r.length; ++x) a.includes(x) || (s.splice(x, 0, 0), u.splice(x, 0, r[x]), n.splice(x, 0, 1));
		let d = n.map((x) => Math.sign(x));
		n.forEach((x, b, T) => {
			if (x < 0) {
				let I = (u[b] - s[b]) / x, E = s[b], C = E + I * n[b];
				s[b] = C, u[b] = E, T[b] = -x;
			}
		});
		let p = r.slice(0);
		a.forEach((x, b) => {
			p[x] = Math.ceil((u[x] - s[x]) / n[x]);
		});
		let f = {
			dims: p,
			dataType: e[0].dataType
		}, c = F("output", e[0].dataType, p.length), g = N("input", e[0].dataType, e[0].dims.length), y = O.size(p), _ = [
			{
				name: "outputSize",
				type: "u32"
			},
			{
				name: "starts",
				type: "u32",
				length: s.length
			},
			{
				name: "signs",
				type: "i32",
				length: d.length
			},
			{
				name: "steps",
				type: "u32",
				length: n.length
			}
		], $ = [
			{
				type: 12,
				data: y
			},
			{
				type: 12,
				data: s
			},
			{
				type: 6,
				data: d
			},
			{
				type: 12,
				data: n
			},
			...Z(e[0].dims, p)
		], S = (x) => `
      ${x.registerUniforms(_).declareVariables(g, c)}
        ${fd(g, c, r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx", g.getByIndices("input_indices"))}
      }`;
		return {
			name: "Slice",
			shaderCache: {
				hint: `${d.length}_${s.length}_${n.length}`,
				inputDependencies: ["rank"]
			},
			getShaderSource: S,
			getRunData: () => ({
				outputs: [f],
				dispatchGroup: { x: Math.ceil(i / 64) },
				programUniforms: $
			})
		};
	}, Vh = (e, t) => {
		cd(e.inputs, t);
		let r = hd(e.inputs, t);
		e.compute(md(e.inputs, r), { inputs: [0] });
	}, Gh = (e) => {
		let t = e.starts, r = e.ends, i = e.axes;
		return fe({
			starts: t,
			ends: r,
			axes: i
		});
	};
}), gd, yd, Hh, Fh, N0 = U(() => {
	"use strict";
	J(), re(), xe(), gt(), ie(), gd = (e) => {
		if (!e || e.length !== 1) throw new Error("Softmax op requires 1 input.");
	}, yd = (e, t) => {
		let r = e.inputs[0], i = r.dims, a = O.size(i), n = i.length, s = O.normalizeAxis(t.axis, n), u = s < i.length - 1, d, p = [];
		u ? (p = Array.from({ length: n }, (A, w) => w), p[s] = n - 1, p[n - 1] = s, d = e.compute(De(r, p), {
			inputs: [r],
			outputs: [-1]
		})[0]) : d = r;
		let f = d.dims, c = f[n - 1], g = a / c, y = we(c), _ = c / y, $ = 64;
		g === 1 && ($ = 256);
		let S = (A, w) => w === 4 ? `max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))` : w === 2 ? `max(${A}.x, ${A}.y)` : w === 3 ? `max(max(${A}.x, ${A}.y), ${A}.z)` : A, x = N("x", d.dataType, d.dims, y), b = F("result", d.dataType, d.dims, y), T = x.type.value, I = Te(d.dataType) === "f32" ? `var threadMax = ${T}(-3.4028234663852886e+38f);` : `var threadMax = ${T}(-65504.0h);`, E = (A) => `
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols", "i32").declareVariables(x, b)}
      ${A.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${I}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${S("threadShared[0]", y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${mt("threadShared[0]", y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`, C = e.compute({
			name: "Softmax",
			shaderCache: {
				hint: `${y};${$}`,
				inputDependencies: ["type"]
			},
			getRunData: () => ({
				outputs: [{
					dims: f,
					dataType: d.dataType
				}],
				dispatchGroup: { x: g },
				programUniforms: [{
					type: 6,
					data: _
				}]
			}),
			getShaderSource: E
		}, {
			inputs: [d],
			outputs: [u ? -1 : 0]
		})[0];
		u && e.compute(De(C, p), { inputs: [C] });
	}, Hh = (e, t) => {
		gd(e.inputs), yd(e, t);
	}, Fh = (e) => fe({ axis: e.axis });
}), la, _d, vd, bd, jh, M0 = U(() => {
	"use strict";
	J(), re(), ie(), la = (e) => Array.from(e.getBigInt64Array(), Number), _d = (e) => {
		if (!e || e.length !== 2) throw new Error("Tile requires 2 inputs.");
		if (e[0].dataType !== 1 && e[0].dataType !== 10 && e[0].dataType !== 6 && e[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types");
		if (e[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type");
		if (e[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D");
		if (la(e[1]).length !== e[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor");
	}, vd = (e, t) => {
		let r = [];
		for (let i = 0; i < e.length; ++i) r.push(e[i] * t[i]);
		return r;
	}, bd = (e, t) => {
		let r = e[0].dims, i = t ?? la(e[1]), a = vd(r, i), n = O.size(a), s = e[0].dataType, u = N("input", s, r.length), d = F("output", s, a.length), p = (f) => `
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size", "u32").declareVariables(u, d)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape", "i")};
        let input_dim_value = ${d.indicesGet("output_indices", "i")}  % input_dim_i;

        ${u.indicesSet("input_indices", "i", "input_dim_value")}
      }
      ${d.setByOffset("global_idx", u.getByIndices("input_indices"))}
    }`;
		return {
			name: "Tile",
			shaderCache: {
				hint: `${i}`,
				inputDependencies: ["rank"]
			},
			getRunData: () => ({
				outputs: [{
					dims: a,
					dataType: e[0].dataType
				}],
				dispatchGroup: { x: Math.ceil(n / 64) },
				programUniforms: [{
					type: 12,
					data: n
				}, ...Z(e[0].dims, a)]
			}),
			getShaderSource: p
		};
	}, jh = (e) => {
		_d(e.inputs), e.compute(bd(e.inputs), { inputs: [0] });
	};
}), $d, wd, Kh, D0 = U(() => {
	"use strict";
	J(), re(), ie(), $d = (e, t, r, i, a) => {
		let n = F("output_data", a, r.length, 4), s = N("a_data", t[1].dataType, t[1].dims.length, 4), u = N("b_data", t[2].dataType, t[2].dims.length, 4), d = N("c_data", t[0].dataType, t[0].dims.length, 4), p, f = (c, g, y) => `select(${g}, ${c}, ${y})`;
		if (!i) p = n.setByOffset("global_idx", f(s.getByOffset("global_idx"), u.getByOffset("global_idx"), d.getByOffset("global_idx")));
		else {
			let c = (g, y, _ = "") => {
				let $ = `a_data[index_a${y}][component_a${y}]`, S = `b_data[index_b${y}][component_b${y}]`, x = `bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;
				return `
            let output_indices${y} = ${n.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let offset_c${y} = ${d.broadcastedIndicesToOffset(`output_indices${y}`, n)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${f($, S, x)});
          `;
			};
			a === 9 ? p = `
            var data = vec4<u32>(0);
            ${c("data", 0, "u32")}
            ${c("data", 1, "u32")}
            ${c("data", 2, "u32")}
            ${c("data", 3, "u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : p = `
            ${c("output_data[global_idx]", 0)}
            ${c("output_data[global_idx]", 1)}
            ${c("output_data[global_idx]", 2)}
            ${c("output_data[global_idx]", 3)}
          `;
		}
		return `
        ${e.registerUniform("vec_size", "u32").declareVariables(d, s, u, n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`;
	}, wd = (e) => {
		let t = e[1].dims, r = e[2].dims, i = e[0].dims, a = e[1].dataType, n = !(O.areEqual(t, r) && O.areEqual(r, i)), s = t, u = O.size(t);
		if (n) {
			let p = qt.calcShape(qt.calcShape(t, r, !1), i, !1);
			if (!p) throw new Error("Can't perform where op on the given tensors");
			s = p, u = O.size(s);
		}
		let d = Math.ceil(u / 4);
		return {
			name: "Where",
			shaderCache: { inputDependencies: [
				"rank",
				"rank",
				"rank"
			] },
			getShaderSource: (p) => $d(p, e, s, n, a),
			getRunData: () => ({
				outputs: [{
					dims: s,
					dataType: a
				}],
				dispatchGroup: { x: Math.ceil(u / 64 / 4) },
				programUniforms: [{
					type: 12,
					data: d
				}, ...Z(i, t, r, s)]
			})
		};
	}, Kh = (e) => {
		e.compute(wd(e.inputs));
	};
}), Zh, U0 = U(() => {
	"use strict";
	Yg(), Ga(), Jg(), e0(), t0(), r0(), i0(), u0(), d0(), p0(), c0(), h0(), f0(), m0(), g0(), y0(), _0(), v0(), b0(), $0(), w0(), x0(), S0(), k0(), T0(), fh(), I0(), E0(), z0(), C0(), A0(), Va(), O0(), vh(), R0(), B0(), N0(), yh(), M0(), gt(), Ha(), D0(), Zh = /* @__PURE__ */ new Map([
		["Abs", [Wp]],
		["Acos", [Vp]],
		["Acosh", [Gp]],
		["Add", [Sc]],
		["ArgMax", [Up, ba]],
		["ArgMin", [Dp, ba]],
		["Asin", [Hp]],
		["Asinh", [Fp]],
		["Atan", [jp]],
		["Atanh", [Kp]],
		["Attention", [Pp]],
		["AveragePool", [Eh, Ih]],
		["BatchNormalization", [qp]],
		["BiasAdd", [Lp]],
		["BiasSplitGelu", [xc]],
		["Cast", [Xp, Zp]],
		["Ceil", [Yp]],
		["Clip", [Qp]],
		["Concat", [Bc, Nc]],
		["Conv", [Ta, ka]],
		["ConvTranspose", [Hc, Gc]],
		["Cos", [Jp]],
		["Cosh", [ec]],
		["CumSum", [Fc, jc]],
		["DepthToSpace", [Kc, Zc]],
		["DequantizeLinear", [Nh, Mh]],
		["Div", [kc]],
		["Einsum", [Xc, Qc]],
		["Elu", [tc, sr]],
		["Equal", [Tc]],
		["Erf", [rc]],
		["Exp", [ic]],
		["Expand", [Yc]],
		["FastGelu", [Jc]],
		["Floor", [ac]],
		["FusedConv", [Ta, ka]],
		["Gather", [th, eh]],
		["GatherElements", [oh, sh]],
		["GatherBlockQuantized", [ah, nh]],
		["GatherND", [rh, ih]],
		["Gelu", [nc]],
		["Gemm", [lh, uh]],
		["GlobalAveragePool", [Ch, zh]],
		["GlobalMaxPool", [Bh, Rh]],
		["Greater", [Cc]],
		["GreaterOrEqual", [Oc]],
		["GridSample", [dh, ph]],
		["GroupQueryAttention", [bh]],
		["HardSigmoid", [hc, cc]],
		["InstanceNormalization", [$h]],
		["LayerNormalization", [wh]],
		["LeakyRelu", [sc, sr]],
		["Less", [Ac]],
		["LessOrEqual", [Rc]],
		["Log", [$c]],
		["MatMul", [xh]],
		["MatMulNBits", [Sh, kh]],
		["MaxPool", [Ah, Oh]],
		["Mul", [Ic]],
		["MultiHeadAttention", [hh, ch]],
		["Neg", [uc]],
		["Not", [oc]],
		["Pad", [Th]],
		["Pow", [Ec]],
		["QuickGelu", [wc, sr]],
		["Range", [Dh]],
		["Reciprocal", [lc]],
		["ReduceMin", [Op]],
		["ReduceMean", [Ip]],
		["ReduceMax", [Ap]],
		["ReduceSum", [Bp]],
		["ReduceProd", [Rp]],
		["ReduceL1", [Ep]],
		["ReduceL2", [zp]],
		["ReduceLogSum", [Mp]],
		["ReduceLogSumExp", [Cp]],
		["ReduceSumSquare", [Np]],
		["Relu", [dc]],
		["Resize", [qh, Lh]],
		["RotaryEmbedding", [_h]],
		["ScatterND", [Ph, Uh]],
		["Sigmoid", [pc]],
		["Sin", [fc]],
		["Sinh", [mc]],
		["Slice", [Vh, Gh]],
		["SkipLayerNormalization", [Wh]],
		["Split", [mh, gh]],
		["Sqrt", [gc]],
		["Softmax", [Hh, Fh]],
		["Sub", [zc]],
		["Tan", [yc]],
		["Tanh", [_c]],
		["ThresholdedRelu", [bc, sr]],
		["Tile", [jh]],
		["Transpose", [mp, gp]],
		["Where", [Kh]]
	]);
}), Xh, P0 = U(() => {
	"use strict";
	qe(), st(), ie(), Xh = class {
		constructor(e) {
			this.backend = e, this.repo = /* @__PURE__ */ new Map(), this.attributesBound = !1;
		}
		getArtifact(e) {
			return this.repo.get(e);
		}
		setArtifact(e, t) {
			this.repo.set(e, t);
		}
		run(e, t, r, i, a) {
			tt(e.programInfo.name);
			let n = this.backend.device, s = this.backend.getComputePassEncoder();
			this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2);
			let u = [];
			for (let p of t) u.push({
				binding: u.length,
				resource: { buffer: p.buffer }
			});
			for (let p of r) u.push({
				binding: u.length,
				resource: { buffer: p.buffer }
			});
			a && u.push({
				binding: u.length,
				resource: a
			});
			let d = n.createBindGroup({
				layout: e.computePipeline.getBindGroupLayout(0),
				entries: u,
				label: e.programInfo.name
			});
			if (this.backend.sessionStatus === "capturing") {
				let p = {
					kernelId: this.backend.currentKernelId,
					computePipeline: e.computePipeline,
					bindGroup: d,
					dispatchGroup: i
				};
				this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p);
			}
			s.setPipeline(e.computePipeline), s.setBindGroup(0, d), s.dispatchWorkgroups(...i), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), Ke(e.programInfo.name);
		}
		dispose() {}
		build(e, t) {
			tt(e.name);
			let r = this.backend.device, i = [];
			[{
				feature: "shader-f16",
				extension: "f16"
			}, {
				feature: "subgroups",
				extension: "subgroups"
			}].forEach((p) => {
				r.features.has(p.feature) && i.push(`enable ${p.extension};`);
			});
			let a = fp(t, this.backend.device.limits), n = e.getShaderSource(a), s = `${i.join(`
`)}
${a.additionalImplementations}
${n}`, u = r.createShaderModule({
				code: s,
				label: e.name
			});
			de("verbose", () => `[WebGPU] ${e.name} shader code: ${s}`);
			let d = r.createComputePipeline({
				compute: {
					module: u,
					entryPoint: "main"
				},
				layout: "auto",
				label: e.name
			});
			return Ke(e.name), {
				programInfo: e,
				computePipeline: d,
				uniformVariablesInfo: a.variablesInfo
			};
		}
		normalizeDispatchGroupSize(e) {
			let t = typeof e == "number" ? e : e.x, r = typeof e == "number" ? 1 : e.y || 1, i = typeof e == "number" ? 1 : e.z || 1, a = this.backend.device.limits.maxComputeWorkgroupsPerDimension;
			if (t <= a && r <= a && i <= a) return [
				t,
				r,
				i
			];
			let n = t * r * i, s = Math.ceil(Math.sqrt(n));
			if (s > a) {
				if (s = Math.ceil(Math.cbrt(n)), s > a) throw new Error("Total dispatch size exceeds WebGPU maximum.");
				return [
					s,
					s,
					s
				];
			} else return [
				s,
				s,
				1
			];
		}
	};
}), Qh = {};
Wt(Qh, { WebGpuBackend: () => Yh });
var xd, Sd, kd, Yh, q0 = U(() => {
	"use strict";
	qe(), J(), st(), lp(), Xg(), U0(), P0(), xd = (e, t) => {
		if (t.length !== e.length) throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);
		let r = [];
		for (let i = 0; i < e.length; ++i) {
			let a = e[i].dataType;
			switch (t[i]) {
				case "none":
					r.push("");
					break;
				case "type":
					r.push(`${a}`);
					break;
				case "rank": {
					let n = e[i].dims.length;
					r.push(`${a};${n}`);
					break;
				}
				case "dims": {
					let n = e[i].dims.join(",");
					r.push(`${a};${n}`);
					break;
				}
				default: throw new Error(`unsupported input dependency: ${t[i]}`);
			}
		}
		return r.join("|");
	}, Sd = (e, t, r) => {
		let i = e.name;
		return e.shaderCache?.hint && (i += "[" + e.shaderCache.hint + "]"), i += ":" + r + `:${xd(t, e.shaderCache?.inputDependencies ?? new Array(t.length).fill("dims"))}`, i;
	}, kd = class {
		constructor(e) {
			e && (this.architecture = e.architecture, this.vendor = e.vendor);
		}
		isArchitecture(e) {
			return this.architecture === e;
		}
		isVendor(e) {
			return this.vendor === e;
		}
	}, Yh = class {
		constructor() {
			this.currentSessionId = null, this.currentKernelId = null, this.commandEncoder = null, this.computePassEncoder = null, this.maxDispatchNumber = 16, this.pendingDispatchNumber = 0, this.pendingKernels = [], this.pendingQueries = /* @__PURE__ */ new Map(), this.sessionStatus = "default", this.capturedCommandList = /* @__PURE__ */ new Map(), this.capturedPendingKernels = /* @__PURE__ */ new Map(), this.sessionExternalDataMapping = /* @__PURE__ */ new Map();
		}
		get currentKernelCustomData() {
			if (this.currentKernelId === null) throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");
			let e = this.kernelCustomData.get(this.currentKernelId);
			return e || (e = {}, this.kernelCustomData.set(this.currentKernelId, e)), e;
		}
		async initialize(e, t) {
			this.env = e;
			let r = [], i = {
				requiredLimits: {
					maxComputeWorkgroupStorageSize: t.limits.maxComputeWorkgroupStorageSize,
					maxComputeWorkgroupsPerDimension: t.limits.maxComputeWorkgroupsPerDimension,
					maxStorageBufferBindingSize: t.limits.maxStorageBufferBindingSize,
					maxBufferSize: t.limits.maxBufferSize,
					maxComputeInvocationsPerWorkgroup: t.limits.maxComputeInvocationsPerWorkgroup,
					maxComputeWorkgroupSizeX: t.limits.maxComputeWorkgroupSizeX,
					maxComputeWorkgroupSizeY: t.limits.maxComputeWorkgroupSizeY,
					maxComputeWorkgroupSizeZ: t.limits.maxComputeWorkgroupSizeZ
				},
				requiredFeatures: r
			}, a = (n) => t.features.has(n) && r.push(n) && !0;
			a("chromium-experimental-timestamp-query-inside-passes") || a("timestamp-query"), a("shader-f16"), a("subgroups"), this.device = await t.requestDevice(i), this.adapterInfo = new kd(t.info || await t.requestAdapterInfo()), this.gpuDataManager = cp(this), this.programManager = new Xh(this), this.kernels = /* @__PURE__ */ new Map(), this.kernelPersistentData = /* @__PURE__ */ new Map(), this.kernelCustomData = /* @__PURE__ */ new Map(), Pa(e.logLevel, !!e.debug), this.device.onuncapturederror = (n) => {
				n.error instanceof GPUValidationError && console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`);
			}, Object.defineProperty(this.env.webgpu, "device", {
				value: this.device,
				writable: !1,
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(this.env.webgpu, "adapter", {
				value: t,
				writable: !1,
				enumerable: !0,
				configurable: !1
			}), this.setQueryType();
		}
		dispose() {
			typeof this.querySet < "u" && this.querySet.destroy(), this.gpuDataManager.dispose(), this.device && this.env?.webgpu && this.device.lost.then(() => {
				delete this.env.webgpu.device;
			});
		}
		getCommandEncoder() {
			return this.commandEncoder || (this.commandEncoder = this.device.createCommandEncoder()), this.commandEncoder;
		}
		getComputePassEncoder() {
			if (!this.computePassEncoder) {
				let e = this.getCommandEncoder(), t = {};
				this.queryType === "at-passes" && (t.timestampWrites = {
					querySet: this.querySet,
					beginningOfPassWriteIndex: this.pendingDispatchNumber * 2,
					endOfPassWriteIndex: this.pendingDispatchNumber * 2 + 1
				}), this.computePassEncoder = e.beginComputePass(t);
			}
			return this.computePassEncoder;
		}
		endComputePass() {
			this.computePassEncoder && (this.computePassEncoder.end(), this.computePassEncoder = null);
		}
		flush() {
			if (!this.commandEncoder) return;
			tt(), this.endComputePass();
			let e;
			this.queryType !== "none" && (this.commandEncoder.resolveQuerySet(this.querySet, 0, this.pendingDispatchNumber * 2, this.queryResolveBuffer, 0), e = this.device.createBuffer({
				size: this.pendingDispatchNumber * 2 * 8,
				usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
			}), this.pendingQueries.set(e, this.pendingKernels), this.pendingKernels = [], this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer, 0, e, 0, this.pendingDispatchNumber * 2 * 8)), this.device.queue.submit([this.commandEncoder.finish()]), this.gpuDataManager.refreshPendingBuffers(), this.commandEncoder = null, this.pendingDispatchNumber = 0, this.queryType !== "none" && e.mapAsync(GPUMapMode.READ).then(() => {
				let t = new BigUint64Array(e.getMappedRange()), r = this.pendingQueries.get(e);
				for (let i = 0; i < t.length / 2; i++) {
					let a = r[i], n = a.kernelId, s = this.kernels.get(n), u = s.kernelType, d = s.kernelName, p = a.programName, f = a.inputTensorViews, c = a.outputTensorViews, g = t[i * 2], y = t[i * 2 + 1];
					typeof this.queryTimeBase > "u" && (this.queryTimeBase = g);
					let _ = Number(g - this.queryTimeBase), $ = Number(y - this.queryTimeBase);
					if (!Number.isSafeInteger(_) || !Number.isSafeInteger($)) throw new RangeError("incorrect timestamp range");
					if (this.env.webgpu.profiling?.ondata) this.env.webgpu.profiling.ondata({
						version: 1,
						inputsMetadata: f.map((S) => ({
							dims: S.dims,
							dataType: nt(S.dataType)
						})),
						outputsMetadata: c.map((S) => ({
							dims: S.dims,
							dataType: nt(S.dataType)
						})),
						kernelId: n,
						kernelType: u,
						kernelName: d,
						programName: p,
						startTime: _,
						endTime: $
					});
					else {
						let S = "";
						f.forEach((b, T) => {
							S += `input[${T}]: [${b.dims}] | ${nt(b.dataType)}, `;
						});
						let x = "";
						c.forEach((b, T) => {
							x += `output[${T}]: [${b.dims}] | ${nt(b.dataType)}, `;
						}), console.log(`[profiling] kernel "${n}|${u}|${d}|${p}" ${S}${x}start time: ${_} ns, execution time: ${$ - _} ns`);
					}
					Pr("GPU", `${p}::${g}::${y}`);
				}
				e.unmap(), this.pendingQueries.delete(e);
			}), Ke();
		}
		run(e, t, r, i, a, n) {
			tt(e.name);
			let s = [];
			for (let b = 0; b < t.length; ++b) {
				let T = t[b].data;
				if (T === 0) continue;
				let I = this.gpuDataManager.get(T);
				if (!I) throw new Error(`no GPU data for input: ${T}`);
				s.push(I);
			}
			let { outputs: u, dispatchGroup: d, programUniforms: p } = e.getRunData(t), f = r.length === 0 ? u.map((b, T) => T) : r;
			if (f.length !== u.length) throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);
			let c = [], g = [];
			for (let b = 0; b < u.length; ++b) {
				if (!Number.isInteger(f[b]) || f[b] < -3 || f[b] >= n) throw new Error(`Invalid output index: ${f[b]}`);
				if (f[b] === -3) continue;
				let T = f[b] === -1, I = f[b] === -2, E = T || I ? a(u[b].dataType, u[b].dims) : i(f[b], u[b].dataType, u[b].dims);
				if (c.push(E), E.data === 0) continue;
				let C = this.gpuDataManager.get(E.data);
				if (!C) throw new Error(`no GPU data for output: ${E.data}`);
				if (T && this.temporaryData.push(C), I) {
					let A = this.kernelPersistentData.get(this.currentKernelId);
					A || (A = [], this.kernelPersistentData.set(this.currentKernelId, A)), A.push(C);
				}
				g.push(C);
			}
			if (s.length !== t.length || g.length !== c.length) {
				if (g.length === 0) return Ke(e.name), c;
				throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`);
			}
			let y;
			if (p) {
				let b = 0, T = [];
				p.forEach((A) => {
					let w = typeof A.data == "number" ? [A.data] : A.data;
					if (w.length === 0) return;
					let P = A.type === 10 ? 2 : 4, q, Q;
					A.type === 10 ? (Q = w.length > 4 ? 16 : w.length > 2 ? 8 : w.length * P, q = w.length > 4 ? 16 : P * w.length) : (Q = w.length <= 2 ? w.length * P : 16, q = 16), b = Math.ceil(b / Q) * Q, T.push(b);
					let K = A.type === 10 ? 8 : 4;
					b += w.length > 4 ? Math.ceil(w.length / K) * q : w.length * P;
				});
				let I = 16;
				b = Math.ceil(b / I) * I;
				let E = new ArrayBuffer(b);
				p.forEach((A, w) => {
					let P = T[w], q = typeof A.data == "number" ? [A.data] : A.data;
					if (A.type === 6) new Int32Array(E, P, q.length).set(q);
					else if (A.type === 12) new Uint32Array(E, P, q.length).set(q);
					else if (A.type === 10) new Uint16Array(E, P, q.length).set(q);
					else if (A.type === 1) new Float32Array(E, P, q.length).set(q);
					else throw new Error(`Unsupported uniform type: ${nt(A.type)}`);
				});
				let C = this.gpuDataManager.create(b, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM);
				this.device.queue.writeBuffer(C.buffer, 0, E, 0, b), this.gpuDataManager.release(C.id), y = {
					offset: 0,
					size: b,
					buffer: C.buffer
				};
			}
			let _ = this.programManager.normalizeDispatchGroupSize(d), $ = _[1] === 1 && _[2] === 1, S = Sd(e, t, $), x = this.programManager.getArtifact(S);
			if (x || (x = this.programManager.build(e, _), this.programManager.setArtifact(S, x), de("info", () => `[artifact] key: ${S}, programName: ${e.name}`)), p && x.uniformVariablesInfo) {
				if (p.length !== x.uniformVariablesInfo.length) throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${p.length} in program "${x.programInfo.name}".`);
				for (let b = 0; b < p.length; b++) {
					let T = p[b], I = T.type, E = typeof T.data == "number" ? 1 : T.data.length, [C, A] = x.uniformVariablesInfo[b];
					if (I !== C || E !== A) throw new Error(`Uniform variable ${b} mismatch: expect type ${C} with size ${A}, got type ${I} with size ${E} in program "${x.programInfo.name}".`);
				}
			}
			if (de("info", () => `[ProgramManager] run "${e.name}" (key=${S}) with ${_[0]}x${_[1]}x${_[2]}`), this.queryType !== "none" || this.sessionStatus === "capturing") {
				let b = {
					kernelId: this.currentKernelId,
					programName: x.programInfo.name,
					inputTensorViews: t,
					outputTensorViews: c
				};
				this.pendingKernels.push(b), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(b);
			}
			return this.programManager.run(x, s, g, _, y), Ke(e.name), c;
		}
		upload(e, t) {
			this.gpuDataManager.upload(e, t);
		}
		memcpy(e, t) {
			this.gpuDataManager.memcpy(e, t);
		}
		async download(e, t) {
			await this.gpuDataManager.download(e, t);
		}
		alloc(e) {
			return this.gpuDataManager.create(e).id;
		}
		free(e) {
			return this.gpuDataManager.release(e);
		}
		createKernel(e, t, r, i) {
			let a = Zh.get(e);
			if (!a) throw new Error(`kernel not implemented: ${e}`);
			let n = {
				kernelType: e,
				kernelName: i,
				kernelEntry: a[0],
				attributes: [a[1], r]
			};
			this.kernels.set(t, n);
		}
		releaseKernel(e) {
			let t = this.kernelPersistentData.get(e);
			if (t) {
				for (let r of t) this.gpuDataManager.release(r.id);
				this.kernelPersistentData.delete(e);
			}
			this.kernelCustomData.delete(e), this.kernels.delete(e);
		}
		computeKernel(e, t, r) {
			let i = this.kernels.get(e);
			if (!i) throw new Error(`kernel not created: ${e}`);
			let a = i.kernelType, n = i.kernelName, s = i.kernelEntry, u = i.attributes;
			if (this.currentKernelId !== null) throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);
			this.currentKernelId = e, u[0] && (u[1] = u[0](u[1]), u[0] = void 0), de("info", () => `[WebGPU] Start to run kernel "[${a}] ${n}"...`);
			let d = this.env.debug;
			this.temporaryData = [];
			try {
				return d && this.device.pushErrorScope("validation"), s(t, u[1]), 0;
			} catch (p) {
				return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${p}`)), 1;
			} finally {
				d && r.push(this.device.popErrorScope().then((p) => p ? `GPU validation error for kernel "[${a}] ${n}": ${p.message}` : null));
				for (let p of this.temporaryData) this.gpuDataManager.release(p.id);
				this.temporaryData = [], this.currentKernelId = null;
			}
		}
		registerBuffer(e, t, r, i) {
			let a = this.sessionExternalDataMapping.get(e);
			a || (a = /* @__PURE__ */ new Map(), this.sessionExternalDataMapping.set(e, a));
			let n = a.get(t), s = this.gpuDataManager.registerExternalBuffer(r, i, n);
			return a.set(t, [s, r]), s;
		}
		unregisterBuffers(e) {
			let t = this.sessionExternalDataMapping.get(e);
			t && (t.forEach((r) => this.gpuDataManager.unregisterExternalBuffer(r[0])), this.sessionExternalDataMapping.delete(e));
		}
		getBuffer(e) {
			let t = this.gpuDataManager.get(e);
			if (!t) throw new Error(`no GPU data for buffer: ${e}`);
			return t.buffer;
		}
		createDownloader(e, t, r) {
			return async () => {
				let i = await ya(this, e, t);
				return qa(i.buffer, r);
			};
		}
		writeTimestamp(e) {
			this.queryType === "inside-passes" && this.computePassEncoder.writeTimestamp(this.querySet, e);
		}
		setQueryType() {
			this.queryType = "none", (this.env.webgpu.profiling?.mode === "default" || (typeof this.env.trace > "u" ? this.env.wasm.trace : this.env.trace)) && (this.device.features.has("chromium-experimental-timestamp-query-inside-passes") ? this.queryType = "inside-passes" : this.device.features.has("timestamp-query") && (this.queryType = "at-passes"), this.queryType !== "none" && typeof this.querySet > "u" && (this.querySet = this.device.createQuerySet({
				type: "timestamp",
				count: this.maxDispatchNumber * 2
			}), this.queryResolveBuffer = this.device.createBuffer({
				size: this.maxDispatchNumber * 2 * 8,
				usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.QUERY_RESOLVE
			})));
		}
		captureBegin() {
			de("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing";
		}
		captureEnd() {
			de("info", "captureEnd"), this.flush(), this.sessionStatus = "default";
		}
		replay() {
			de("info", "replay"), this.sessionStatus = "replaying";
			let e = this.capturedCommandList.get(this.currentSessionId), t = this.capturedPendingKernels.get(this.currentSessionId), r = e.length;
			this.pendingKernels = [];
			for (let i = 0; i < r; i++) {
				let a = this.getComputePassEncoder(), n = e[i];
				this.writeTimestamp(this.pendingDispatchNumber * 2), a.setPipeline(n.computePipeline), a.setBindGroup(0, n.bindGroup), a.dispatchWorkgroups(...n.dispatchGroup), this.writeTimestamp(this.pendingDispatchNumber * 2 + 1), this.pendingDispatchNumber++, this.queryType !== "none" && this.pendingKernels.push(t[i]), (this.pendingDispatchNumber >= this.maxDispatchNumber || this.queryType === "at-passes") && this.endComputePass(), this.pendingDispatchNumber >= this.maxDispatchNumber && this.flush();
			}
			this.flush(), this.sessionStatus = "default";
		}
		onCreateSession() {
			this.gpuDataManager.onCreateSession();
		}
		onReleaseSession(e) {
			this.unregisterBuffers(e), this.capturedCommandList.has(e) && this.capturedCommandList.delete(e), this.capturedPendingKernels.has(e) && this.capturedPendingKernels.delete(e), this.gpuDataManager.onReleaseSession(e);
		}
		onRunStart(e) {
			this.currentSessionId = e, this.setQueryType();
		}
	};
}), Jh = {};
Wt(Jh, { init: () => ef });
var Br, Td, ef, L0 = U(() => {
	"use strict";
	J(), st(), re(), Zg(), Br = class tf {
		constructor(t, r, i, a) {
			this.module = t, this.dataType = r, this.data = i, this.dims = a;
		}
		getFloat32Array() {
			if (this.dataType !== 1) throw new Error("Invalid data type");
			let t = O.size(this.dims);
			return t === 0 ? /* @__PURE__ */ new Float32Array() : new Float32Array(this.module.HEAP8.buffer, this.data, t);
		}
		getBigInt64Array() {
			if (this.dataType !== 7) throw new Error("Invalid data type");
			let t = O.size(this.dims);
			return t === 0 ? /* @__PURE__ */ new BigInt64Array() : new BigInt64Array(this.module.HEAP8.buffer, this.data, t);
		}
		getInt32Array() {
			if (this.dataType !== 6) throw new Error("Invalid data type");
			let t = O.size(this.dims);
			return t === 0 ? /* @__PURE__ */ new Int32Array() : new Int32Array(this.module.HEAP8.buffer, this.data, t);
		}
		getUint16Array() {
			if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type");
			let t = O.size(this.dims);
			return t === 0 ? /* @__PURE__ */ new Uint16Array() : new Uint16Array(this.module.HEAP8.buffer, this.data, t);
		}
		reshape(t) {
			if (O.size(t) !== O.size(this.dims)) throw new Error("Invalid new shape");
			return new tf(this.module, this.dataType, this.data, t);
		}
	}, Td = class {
		constructor(e, t, r) {
			this.module = e, this.backend = t, this.customDataOffset = 0, this.customDataSize = 0, this.adapterInfo = t.adapterInfo;
			let i = e.PTR_SIZE, a = r / e.PTR_SIZE, n = i === 4 ? "i32" : "i64";
			this.opKernelContext = Number(e.getValue(i * a++, n));
			let s = Number(e.getValue(i * a++, n));
			this.outputCount = Number(e.getValue(i * a++, n)), this.customDataOffset = Number(e.getValue(i * a++, "*")), this.customDataSize = Number(e.getValue(i * a++, n));
			let u = [];
			for (let d = 0; d < s; d++) {
				let p = Number(e.getValue(i * a++, n)), f = Number(e.getValue(i * a++, "*")), c = Number(e.getValue(i * a++, n)), g = [];
				for (let y = 0; y < c; y++) g.push(Number(e.getValue(i * a++, n)));
				u.push(new Br(e, p, f, g));
			}
			this.inputs = u;
		}
		get kernelCustomData() {
			return this.backend.currentKernelCustomData;
		}
		get customDataBuffer() {
			return this.module.HEAPU8.subarray(this.customDataOffset, this.customDataOffset + this.customDataSize);
		}
		compute(e, t) {
			let r = t?.inputs?.map((s) => typeof s == "number" ? this.inputs[s] : s) ?? this.inputs, i = t?.outputs ?? [], a = (s, u, d) => new Br(this.module, u, this.output(s, d), d), n = (s, u) => {
				let d = Tt(s, u);
				if (!d) throw new Error(`Unsupported data type: ${s}`);
				let p = d > 0 ? this.backend.gpuDataManager.create(d).id : 0;
				return new Br(this.module, s, p, u);
			};
			return this.backend.run(e, r, i, a, n, this.outputCount);
		}
		output(e, t) {
			let r = this.module.stackSave();
			try {
				let i = this.module.PTR_SIZE, a = i === 4 ? "i32" : "i64", n = this.module.stackAlloc((1 + t.length) * i);
				this.module.setValue(n, t.length, a);
				for (let s = 0; s < t.length; s++) this.module.setValue(n + i * (s + 1), t[s], a);
				return this.module._JsepOutput(this.opKernelContext, e, n);
			} catch (i) {
				throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`);
			} finally {
				this.module.stackRestore(r);
			}
		}
	}, ef = async (e, t, r, i) => {
		let a = t.jsepInit;
		if (!a) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");
		if (e === "webgpu") {
			let n = (q0(), lr(Qh)).WebGpuBackend, s = new n();
			await s.initialize(r, i), a("webgpu", [
				s,
				(u) => s.alloc(Number(u)),
				(u) => s.free(u),
				(u, d, p, f = !1) => {
					if (f) de("verbose", () => `[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(p)}`), s.memcpy(Number(u), Number(d));
					else {
						de("verbose", () => `[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(p)}`);
						let c = t.HEAPU8.subarray(Number(u >>> 0), Number(u >>> 0) + Number(p));
						s.upload(Number(d), c);
					}
				},
				async (u, d, p) => {
					de("verbose", () => `[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${p}`), await s.download(Number(u), () => t.HEAPU8.subarray(Number(d) >>> 0, Number(d + p) >>> 0));
				},
				(u, d, p) => s.createKernel(u, Number(d), p, t.UTF8ToString(t._JsepGetNodeName(Number(d)))),
				(u) => s.releaseKernel(u),
				(u, d, p, f) => {
					de("verbose", () => `[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${d}`);
					let c = new Td(t, s, Number(d));
					return s.computeKernel(Number(u), c, f);
				},
				() => s.captureBegin(),
				() => s.captureEnd(),
				() => s.replay()
			]);
		} else {
			let n = new pp(r);
			a("webnn", [
				n,
				() => n.reserveTensorId(),
				(s) => n.releaseTensorId(s),
				async (s, u, d, p, f) => n.ensureTensor(s, u, d, p, f),
				(s, u) => {
					n.uploadTensor(s, u);
				},
				async (s, u) => n.downloadTensor(s, u),
				(s, u) => n.registerMLContext(s, u),
				!!r.trace
			]);
		}
	};
}), Id, Qa, Ya, ht, Ed, da, Fr, Ja, en, pa, tn, rn, an, rf = U(() => {
	"use strict";
	qe(), Fg(), jg(), J(), Ot(), Na(), np(), Id = (e, t) => {
		ye()._OrtInit(e, t) !== 0 && me("Can't initialize onnxruntime.");
	}, Qa = async (e) => {
		Id(e.wasm.numThreads, Lr(e.logLevel));
	}, Ya = async (e, t) => {
		ye().asyncInit?.();
		let r = e.webgpu.adapter;
		if (t === "webgpu") {
			if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
			if (r) {
				if (typeof r.limits != "object" || typeof r.features != "object" || typeof r.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
			} else {
				let i = e.webgpu.powerPreference;
				if (i !== void 0 && i !== "low-power" && i !== "high-performance") throw new Error(`Invalid powerPreference setting: "${i}"`);
				let a = e.webgpu.forceFallbackAdapter;
				if (a !== void 0 && typeof a != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);
				if (r = await navigator.gpu.requestAdapter({
					powerPreference: i,
					forceFallbackAdapter: a
				}), !r) throw new Error("Failed to get GPU adapter. You may need to enable flag \"--enable-unsafe-webgpu\" if you are using Chrome.");
			}
		}
		if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
		{
			let i = (L0(), lr(Jh)).init;
			t === "webgpu" && await i("webgpu", ye(), e, r), t === "webnn" && await i("webnn", ye(), e);
		}
	}, ht = /* @__PURE__ */ new Map(), Ed = (e) => {
		let t = ye(), r = t.stackSave();
		try {
			let i = t.PTR_SIZE, a = t.stackAlloc(2 * i);
			t._OrtGetInputOutputCount(e, a, a + i) !== 0 && me("Can't get session input/output count.");
			let n = i === 4 ? "i32" : "i64";
			return [Number(t.getValue(a, n)), Number(t.getValue(a + i, n))];
		} finally {
			t.stackRestore(r);
		}
	}, da = (e, t) => {
		let r = ye(), i = r.stackSave(), a = 0;
		try {
			let n = r.PTR_SIZE, s = r.stackAlloc(2 * n);
			r._OrtGetInputOutputMetadata(e, t, s, s + n) !== 0 && me("Can't get session input/output metadata.");
			let u = Number(r.getValue(s, "*"));
			a = Number(r.getValue(s + n, "*"));
			let d = r.HEAP32[a / 4];
			if (d === 0) return [u, 0];
			let p = r.HEAPU32[a / 4 + 1], f = [];
			for (let c = 0; c < p; c++) {
				let g = Number(r.getValue(a + 8 + c * n, "*"));
				f.push(g !== 0 ? r.UTF8ToString(g) : Number(r.getValue(a + 8 + (c + p) * n, "*")));
			}
			return [
				u,
				d,
				f
			];
		} finally {
			r.stackRestore(i), a !== 0 && r._OrtFree(a);
		}
	}, Fr = (e) => {
		let t = ye(), r = t._malloc(e.byteLength);
		if (r === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
		return t.HEAPU8.set(e, r), [r, e.byteLength];
	}, Ja = async (e, t) => {
		let r, i, a = ye();
		Array.isArray(e) ? [r, i] = e : e.buffer === a.HEAPU8.buffer ? [r, i] = [e.byteOffset, e.byteLength] : [r, i] = Fr(e);
		let n = 0, s = 0, u = 0, d = [], p = [], f = [];
		try {
			if ([s, d] = await ap(t), t?.externalData && a.mountExternalData) {
				let I = [];
				for (let E of t.externalData) {
					let C = typeof E == "string" ? E : E.path;
					I.push(Ua(typeof E == "string" ? E : E.data).then((A) => {
						a.mountExternalData(C, A);
					}));
				}
				await Promise.all(I);
			}
			for (let I of t?.executionProviders ?? []) if ((typeof I == "string" ? I : I.name) === "webnn") {
				if (a.shouldTransferToMLTensor = !1, typeof I != "string") {
					let E = I, C = E?.context, A = E?.gpuDevice, w = E?.deviceType, P = E?.powerPreference;
					C ? a.currentContext = C : A ? a.currentContext = await a.webnnCreateMLContext(A) : a.currentContext = await a.webnnCreateMLContext({
						deviceType: w,
						powerPreference: P
					});
				} else a.currentContext = await a.webnnCreateMLContext();
				break;
			}
			n = await a._OrtCreateSession(r, i, s), a.webgpuOnCreateSession?.(n), n === 0 && me("Can't create a session."), a.jsepOnCreateSession?.(), a.currentContext && (a.webnnRegisterMLContext(n, a.currentContext), a.currentContext = void 0, a.shouldTransferToMLTensor = !0);
			let [c, g] = Ed(n), y = !!t?.enableGraphCapture, _ = [], $ = [], S = [], x = [], b = [];
			for (let I = 0; I < c; I++) {
				let [E, C, A] = da(n, I);
				E === 0 && me("Can't get an input name."), p.push(E);
				let w = a.UTF8ToString(E);
				_.push(w), S.push(C === 0 ? {
					name: w,
					isTensor: !1
				} : {
					name: w,
					isTensor: !0,
					type: nt(C),
					shape: A
				});
			}
			for (let I = 0; I < g; I++) {
				let [E, C, A] = da(n, I + c);
				E === 0 && me("Can't get an output name."), f.push(E);
				let w = a.UTF8ToString(E);
				$.push(w), x.push(C === 0 ? {
					name: w,
					isTensor: !1
				} : {
					name: w,
					isTensor: !0,
					type: nt(C),
					shape: A
				});
				{
					if (y && t?.preferredOutputLocation === void 0) {
						b.push("gpu-buffer");
						continue;
					}
					let P = typeof t?.preferredOutputLocation == "string" ? t.preferredOutputLocation : t?.preferredOutputLocation?.[w] ?? "cpu", q = a.webnnIsGraphOutput;
					if (P === "cpu" && q && q(n, w)) {
						b.push("ml-tensor-cpu-output");
						continue;
					}
					if (P !== "cpu" && P !== "cpu-pinned" && P !== "gpu-buffer" && P !== "ml-tensor") throw new Error(`Not supported preferred output location: ${P}.`);
					if (y && P !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
					b.push(P);
				}
			}
			let T = null;
			return b.some((I) => I === "gpu-buffer" || I === "ml-tensor" || I === "ml-tensor-cpu-output") && (u = a._OrtCreateBinding(n), u === 0 && me("Can't create IO binding."), T = {
				handle: u,
				outputPreferredLocations: b,
				outputPreferredLocationsEncoded: b.map((I) => I === "ml-tensor-cpu-output" ? "ml-tensor" : I).map((I) => ma(I))
			}), ht.set(n, [
				n,
				p,
				f,
				T,
				y,
				!1
			]), [
				n,
				_,
				$,
				S,
				x
			];
		} catch (c) {
			throw p.forEach((g) => a._OrtFree(g)), f.forEach((g) => a._OrtFree(g)), u !== 0 && a._OrtReleaseBinding(u) !== 0 && me("Can't release IO binding."), n !== 0 && a._OrtReleaseSession(n) !== 0 && me("Can't release session."), c;
		} finally {
			a._free(r), s !== 0 && a._OrtReleaseSessionOptions(s) !== 0 && me("Can't release session options."), d.forEach((c) => a._free(c)), a.unmountExternalData?.();
		}
	}, en = (e) => {
		let t = ye(), r = ht.get(e);
		if (!r) throw new Error(`cannot release session. invalid session id: ${e}`);
		let [i, a, n, s, u] = r;
		s && (u && t._OrtClearBoundOutputs(s.handle) !== 0 && me("Can't clear bound outputs."), t._OrtReleaseBinding(s.handle) !== 0 && me("Can't release IO binding.")), t.jsepOnReleaseSession?.(e), t.webnnOnReleaseSession?.(e), t.webgpuOnReleaseSession?.(e), a.forEach((d) => t._OrtFree(d)), n.forEach((d) => t._OrtFree(d)), t._OrtReleaseSession(i) !== 0 && me("Can't release session."), ht.delete(e);
	}, pa = async (e, t, r, i, a, n, s = !1) => {
		if (!e) {
			t.push(0);
			return;
		}
		let u = ye(), d = u.PTR_SIZE, p = e[0], f = e[1], c = e[3], g = c, y, _;
		if (p === "string" && (c === "gpu-buffer" || c === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
		if (s && c !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);
		if (c === "gpu-buffer") {
			let x = e[2].gpuBuffer;
			_ = Tt(kt(p), f);
			{
				let b = u.jsepRegisterBuffer;
				if (!b) throw new Error("Tensor location \"gpu-buffer\" is not supported without using WebGPU.");
				y = b(i, n, x, _);
			}
		} else if (c === "ml-tensor") {
			let x = e[2].mlTensor;
			_ = Tt(kt(p), f);
			let b = u.webnnRegisterMLTensor;
			if (!b) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
			y = b(i, x, kt(p), f);
		} else {
			let x = e[2];
			if (Array.isArray(x)) {
				_ = d * x.length, y = u._malloc(_), r.push(y);
				for (let b = 0; b < x.length; b++) {
					if (typeof x[b] != "string") throw new TypeError(`tensor data at index ${b} is not a string`);
					u.setValue(y + b * d, je(x[b], r), "*");
				}
			} else {
				let b = u.webnnIsGraphInput, T = u.webnnIsGraphOutput;
				if (p !== "string" && b && T) {
					let I = u.UTF8ToString(a);
					if (b(i, I) || T(i, I)) {
						let E = kt(p);
						_ = Tt(E, f), g = "ml-tensor";
						let C = u.webnnCreateTemporaryTensor, A = u.webnnUploadTensor;
						if (!C || !A) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
						let w = await C(i, E, f);
						A(w, new Uint8Array(x.buffer, x.byteOffset, x.byteLength)), y = w;
					} else _ = x.byteLength, y = u._malloc(_), r.push(y), u.HEAPU8.set(new Uint8Array(x.buffer, x.byteOffset, _), y);
				} else _ = x.byteLength, y = u._malloc(_), r.push(y), u.HEAPU8.set(new Uint8Array(x.buffer, x.byteOffset, _), y);
			}
		}
		let $ = u.stackSave(), S = u.stackAlloc(4 * f.length);
		try {
			f.forEach((b, T) => u.setValue(S + T * d, b, d === 4 ? "i32" : "i64"));
			let x = u._OrtCreateTensor(kt(p), y, _, S, f.length, ma(g));
			x === 0 && me(`Can't create tensor for input/output. session=${i}, index=${n}.`), t.push(x);
		} finally {
			u.stackRestore($);
		}
	}, tn = async (e, t, r, i, a, n) => {
		let s = ye(), u = s.PTR_SIZE, d = ht.get(e);
		if (!d) throw new Error(`cannot run inference. invalid session id: ${e}`);
		let p = d[0], f = d[1], c = d[2], g = d[3], y = d[4], _ = d[5], $ = t.length, S = i.length, x = 0, b = [], T = [], I = [], E = [], C = [], A = s.stackSave(), w = s.stackAlloc($ * u), P = s.stackAlloc($ * u), q = s.stackAlloc(S * u), Q = s.stackAlloc(S * u);
		try {
			[x, b] = ip(n), It("wasm prepareInputOutputTensor");
			for (let D = 0; D < $; D++) await pa(r[D], T, E, e, f[t[D]], t[D], y);
			for (let D = 0; D < S; D++) await pa(a[D], I, E, e, c[i[D]], $ + i[D], y);
			Et("wasm prepareInputOutputTensor");
			for (let D = 0; D < $; D++) s.setValue(w + D * u, T[D], "*"), s.setValue(P + D * u, f[t[D]], "*");
			for (let D = 0; D < S; D++) s.setValue(q + D * u, I[D], "*"), s.setValue(Q + D * u, c[i[D]], "*");
			if (g && !_) {
				let { handle: D, outputPreferredLocations: G, outputPreferredLocationsEncoded: Y } = g;
				if (f.length !== $) throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${f.length}).`);
				It("wasm bindInputsOutputs");
				for (let ee = 0; ee < $; ee++) {
					let te = t[ee];
					await s._OrtBindInput(D, f[te], T[ee]) !== 0 && me(`Can't bind input[${ee}] for session=${e}.`);
				}
				for (let ee = 0; ee < S; ee++) {
					let te = i[ee];
					a[ee]?.[3] ? (C.push(I[ee]), s._OrtBindOutput(D, c[te], I[ee], 0) !== 0 && me(`Can't bind pre-allocated output[${ee}] for session=${e}.`)) : s._OrtBindOutput(D, c[te], 0, Y[te]) !== 0 && me(`Can't bind output[${ee}] to ${G[ee]} for session=${e}.`);
				}
				Et("wasm bindInputsOutputs"), ht.set(e, [
					p,
					f,
					c,
					g,
					y,
					!0
				]);
			}
			s.jsepOnRunStart?.(p), s.webnnOnRunStart?.(p);
			let K;
			g ? K = await s._OrtRunWithBinding(p, g.handle, S, q, x) : K = await s._OrtRun(p, P, w, $, Q, S, q, x), K !== 0 && me("failed to call OrtRun().");
			let X = [], R = [];
			It("wasm ProcessOutputTensor");
			for (let D = 0; D < S; D++) {
				let G = Number(s.getValue(q + D * u, "*"));
				if (G === I[D] || C.includes(I[D])) {
					X.push(a[D]), G !== I[D] && s._OrtReleaseTensor(G) !== 0 && me("Can't release tensor.");
					continue;
				}
				let Y = s.stackSave(), ee = s.stackAlloc(4 * u), te = !1, M, H = 0;
				try {
					s._OrtGetTensorData(G, ee, ee + u, ee + 2 * u, ee + 3 * u) !== 0 && me(`Can't access output tensor data on index ${D}.`);
					let oe = u === 4 ? "i32" : "i64", ne = Number(s.getValue(ee, oe));
					H = s.getValue(ee + u, "*");
					let V = s.getValue(ee + u * 2, "*"), Be = Number(s.getValue(ee + u * 3, oe)), Ae = [];
					for (let pe = 0; pe < Be; pe++) Ae.push(Number(s.getValue(V + pe * u, oe)));
					s._OrtFree(V) !== 0 && me("Can't free memory for tensor dims.");
					let be = Ae.reduce((pe, ke) => pe * ke, 1);
					M = nt(ne);
					let ze = g?.outputPreferredLocations[i[D]];
					if (M === "string") {
						if (ze === "gpu-buffer" || ze === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
						let pe = [];
						for (let ke = 0; ke < be; ke++) {
							let Oe = s.getValue(H + ke * u, "*"), pr = s.getValue(H + (ke + 1) * u, "*"), Ze = ke === be - 1 ? void 0 : pr - Oe;
							pe.push(s.UTF8ToString(Oe, Ze));
						}
						X.push([
							M,
							Ae,
							pe,
							"cpu"
						]);
					} else if (ze === "gpu-buffer" && be > 0) {
						let pe = s.jsepGetBuffer;
						if (!pe) throw new Error("preferredLocation \"gpu-buffer\" is not supported without using WebGPU.");
						let ke = pe(H), Oe = Tt(ne, be);
						if (Oe === void 0 || !Ma(M)) throw new Error(`Unsupported data type: ${M}`);
						te = !0, X.push([
							M,
							Ae,
							{
								gpuBuffer: ke,
								download: s.jsepCreateDownloader(ke, Oe, M),
								dispose: () => {
									s._OrtReleaseTensor(G) !== 0 && me("Can't release tensor.");
								}
							},
							"gpu-buffer"
						]);
					} else if (ze === "ml-tensor" && be > 0) {
						let pe = s.webnnEnsureTensor, ke = s.webnnIsGraphInputOutputTypeSupported;
						if (!pe || !ke) throw new Error("preferredLocation \"ml-tensor\" is not supported without using WebNN.");
						if (Tt(ne, be) === void 0 || !Da(M)) throw new Error(`Unsupported data type: ${M}`);
						if (!ke(e, M, !1)) throw new Error(`preferredLocation "ml-tensor" for ${M} output is not supported by current WebNN Context.`);
						let Oe = await pe(e, H, ne, Ae, !1);
						te = !0, X.push([
							M,
							Ae,
							{
								mlTensor: Oe,
								download: s.webnnCreateMLTensorDownloader(H, M),
								dispose: () => {
									s.webnnReleaseTensorId(H), s._OrtReleaseTensor(G);
								}
							},
							"ml-tensor"
						]);
					} else if (ze === "ml-tensor-cpu-output" && be > 0) {
						let pe = s.webnnCreateMLTensorDownloader(H, M)(), ke = X.length;
						te = !0, R.push((async () => {
							let Oe = [ke, await pe];
							return s.webnnReleaseTensorId(H), s._OrtReleaseTensor(G), Oe;
						})()), X.push([
							M,
							Ae,
							[],
							"cpu"
						]);
					} else {
						let pe = new (jr(M))(be);
						new Uint8Array(pe.buffer, pe.byteOffset, pe.byteLength).set(s.HEAPU8.subarray(H, H + pe.byteLength)), X.push([
							M,
							Ae,
							pe,
							"cpu"
						]);
					}
				} finally {
					s.stackRestore(Y), M === "string" && H && s._free(H), te || s._OrtReleaseTensor(G);
				}
			}
			g && !y && (s._OrtClearBoundOutputs(g.handle) !== 0 && me("Can't clear bound outputs."), ht.set(e, [
				p,
				f,
				c,
				g,
				y,
				!1
			]));
			for (let [D, G] of await Promise.all(R)) X[D][2] = G;
			return Et("wasm ProcessOutputTensor"), X;
		} finally {
			s.webnnOnRunEnd?.(p), s.stackRestore(A), T.forEach((K) => s._OrtReleaseTensor(K)), I.forEach((K) => s._OrtReleaseTensor(K)), E.forEach((K) => s._free(K)), x !== 0 && s._OrtReleaseRunOptions(x), b.forEach((K) => s._free(K));
		}
	}, rn = (e) => {
		let t = ye(), r = ht.get(e);
		if (!r) throw new Error("invalid session id");
		let i = r[0], a = t._OrtEndProfiling(i);
		a === 0 && me("Can't get an profile file name."), t._OrtFree(a);
	}, an = (e) => {
		let t = [];
		for (let r of e) {
			let i = r[2];
			!Array.isArray(i) && "buffer" in i && t.push(i.buffer);
		}
		return t;
	};
}), ft, Pe, Dt, rr, ir, Nr, ca, Mr, wt, xt, zd, af, nf, sf, of, uf, lf, df, pf = U(() => {
	"use strict";
	qe(), rf(), Ot(), Ra(), ft = () => !!ve.wasm.proxy && typeof document < "u", Dt = !1, rr = !1, ir = !1, Mr = /* @__PURE__ */ new Map(), wt = (e, t) => {
		let r = Mr.get(e);
		r ? r.push(t) : Mr.set(e, [t]);
	}, xt = () => {
		if (Dt || !rr || ir || !Pe) throw new Error("worker not ready");
	}, zd = (e) => {
		switch (e.data.type) {
			case "init-wasm":
				Dt = !1, e.data.err ? (ir = !0, ca[1](e.data.err)) : (rr = !0, ca[0]()), Nr && (URL.revokeObjectURL(Nr), Nr = void 0);
				break;
			case "init-ep":
			case "copy-from":
			case "create":
			case "release":
			case "run":
			case "end-profiling": {
				let t = Mr.get(e.data.type);
				e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
				break;
			}
			default:
		}
	}, af = async () => {
		if (!rr) {
			if (Dt) throw new Error("multiple calls to 'initWasm()' detected.");
			if (ir) throw new Error("previous call to 'initWasm()' failed.");
			if (Dt = !0, ft()) return new Promise((e, t) => {
				Pe?.terminate(), tp().then(([r, i]) => {
					try {
						Pe = i, Pe.onerror = (n) => t(n), Pe.onmessage = zd, ca = [e, t];
						let a = {
							type: "init-wasm",
							in: ve
						};
						!a.in.wasm.wasmPaths && (r || fa) && (a.in.wasm.wasmPaths = { wasm: new URL("" + new URL("ort-wasm-simd-threaded.jsep-CCdEhX4k.wasm", import.meta.url).href, "" + import.meta.url).href }), Pe.postMessage(a), Nr = r;
					} catch (a) {
						t(a);
					}
				}, t);
			});
			try {
				await Ba(ve.wasm), await Qa(ve), rr = !0;
			} catch (e) {
				throw ir = !0, e;
			} finally {
				Dt = !1;
			}
		}
	}, nf = async (e) => {
		if (ft()) return xt(), new Promise((t, r) => {
			wt("init-ep", [t, r]);
			let i = {
				type: "init-ep",
				in: {
					epName: e,
					env: ve
				}
			};
			Pe.postMessage(i);
		});
		await Ya(ve, e);
	}, sf = async (e) => ft() ? (xt(), new Promise((t, r) => {
		wt("copy-from", [t, r]);
		let i = {
			type: "copy-from",
			in: { buffer: e }
		};
		Pe.postMessage(i, [e.buffer]);
	})) : Fr(e), of = async (e, t) => {
		if (ft()) {
			if (t?.preferredOutputLocation) throw new Error("session option \"preferredOutputLocation\" is not supported for proxy.");
			return xt(), new Promise((r, i) => {
				wt("create", [r, i]);
				let a = {
					type: "create",
					in: {
						model: e,
						options: { ...t }
					}
				}, n = [];
				e instanceof Uint8Array && n.push(e.buffer), Pe.postMessage(a, n);
			});
		} else return Ja(e, t);
	}, uf = async (e) => {
		if (ft()) return xt(), new Promise((t, r) => {
			wt("release", [t, r]);
			let i = {
				type: "release",
				in: e
			};
			Pe.postMessage(i);
		});
		en(e);
	}, lf = async (e, t, r, i, a, n) => {
		if (ft()) {
			if (r.some((s) => s[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
			if (a.some((s) => s)) throw new Error("pre-allocated output tensor is not supported for proxy.");
			return xt(), new Promise((s, u) => {
				wt("run", [s, u]);
				let d = r, p = {
					type: "run",
					in: {
						sessionId: e,
						inputIndices: t,
						inputs: d,
						outputIndices: i,
						options: n
					}
				};
				Pe.postMessage(p, an(d));
			});
		} else return tn(e, t, r, i, a, n);
	}, df = async (e) => {
		if (ft()) return xt(), new Promise((t, r) => {
			wt("end-profiling", [t, r]);
			let i = {
				type: "end-profiling",
				in: e
			};
			Pe.postMessage(i);
		});
		rn(e);
	};
}), ha, Cd, cf, W0 = U(() => {
	"use strict";
	qe(), pf(), J(), Oa(), np(), ha = (e, t) => {
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
	}, Cd = (e) => {
		switch (e[3]) {
			case "cpu": return new et(e[0], e[2], e[1]);
			case "gpu-buffer": {
				let t = e[0];
				if (!Ma(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
				let { gpuBuffer: r, download: i, dispose: a } = e[2];
				return et.fromGpuBuffer(r, {
					dataType: t,
					dims: e[1],
					download: i,
					dispose: a
				});
			}
			case "ml-tensor": {
				let t = e[0];
				if (!Da(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
				let { mlTensor: r, download: i, dispose: a } = e[2];
				return et.fromMLTensor(r, {
					dataType: t,
					dims: e[1],
					download: i,
					dispose: a
				});
			}
			default: throw new Error(`invalid data location: ${e[3]}`);
		}
	}, cf = class {
		async fetchModelAndCopyToWasmMemory(e) {
			return sf(await Ua(e));
		}
		async loadModel(e, t) {
			tt();
			let r;
			typeof e == "string" ? r = await this.fetchModelAndCopyToWasmMemory(e) : r = e, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await of(r, t), Ke();
		}
		async dispose() {
			return uf(this.sessionId);
		}
		async run(e, t, r) {
			tt();
			let i = [], a = [];
			Object.entries(e).forEach((c) => {
				let g = c[0], y = c[1], _ = this.inputNames.indexOf(g);
				if (_ === -1) throw new Error(`invalid input '${g}'`);
				i.push(y), a.push(_);
			});
			let n = [], s = [];
			Object.entries(t).forEach((c) => {
				let g = c[0], y = c[1], _ = this.outputNames.indexOf(g);
				if (_ === -1) throw new Error(`invalid output '${g}'`);
				n.push(y), s.push(_);
			});
			let u = i.map((c, g) => ha(c, () => `input "${this.inputNames[a[g]]}"`)), d = n.map((c, g) => c ? ha(c, () => `output "${this.outputNames[s[g]]}"`) : null), p = await lf(this.sessionId, a, u, s, d, r), f = {};
			for (let c = 0; c < p.length; c++) f[this.outputNames[s[c]]] = n[c] ?? Cd(p[c]);
			return Ke(), f;
		}
		startProfiling() {}
		endProfiling() {
			df(this.sessionId);
		}
	};
}), hf = {};
Wt(hf, {
	OnnxruntimeWebAssemblyBackend: () => za,
	initializeFlags: () => Ea,
	wasmBackend: () => ff
});
var Ea, za, ff, V0 = U(() => {
	"use strict";
	qe(), pf(), W0(), Ea = () => {
		(typeof ve.wasm.initTimeout != "number" || ve.wasm.initTimeout < 0) && (ve.wasm.initTimeout = 0);
		let e = ve.wasm.simd;
		if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`), ve.wasm.simd = !1), typeof ve.wasm.proxy != "boolean" && (ve.wasm.proxy = !1), typeof ve.wasm.trace != "boolean" && (ve.wasm.trace = !1), typeof ve.wasm.numThreads != "number" || !Number.isInteger(ve.wasm.numThreads) || ve.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) ve.wasm.numThreads = 1;
		else {
			let t = typeof navigator > "u" ? Eg("node:os").cpus().length : navigator.hardwareConcurrency;
			ve.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
		}
	}, za = class {
		async init(e) {
			Ea(), await af(), await nf(e);
		}
		async createInferenceSessionHandler(e, t) {
			let r = new cf();
			return await r.loadModel(e, t), r;
		}
	}, ff = new za();
});
qe();
qe();
qe();
var G0 = "1.26.0-dev.20260416-b7804b056c";
{
	let e = (V0(), lr(hf)).wasmBackend;
	Ut("webgpu", e, 5), Ut("webnn", e, 5), Ut("cpu", e, 10), Ut("wasm", e, 10);
}
Object.defineProperty(ve.versions, "web", {
	value: G0,
	enumerable: !0
});
export { Zd as n, et as r, ve as t };
