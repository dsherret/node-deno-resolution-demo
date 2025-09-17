// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file

import { fetch_specifier } from "./snippets/rs_lib-aa8c88480f363a4a/helpers.js";
import { copy_bytes } from "./snippets/sys_traits-c0cdd403b06dc0dc/inline0.js";
import {
  closeSync,
  copyFileSync,
  fchmodSync,
  fstatSync,
  linkSync,
  lstatSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
  writeSync,
} from "node:fs";
import { cwd, env, platform } from "node:process";

let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

const lTextEncoder = typeof TextEncoder === "undefined"
  ? (0, module.require)("util").TextEncoder
  : TextEncoder;

let cachedTextEncoder = new lTextEncoder("utf-8");

const encodeString = typeof cachedTextEncoder.encodeInto === "function"
  ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  }
  : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length,
    };
  };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}

function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_4.set(idx, obj);
  return idx;
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}

const lTextDecoder = typeof TextDecoder === "undefined"
  ? (0, module.require)("util").TextDecoder
  : TextDecoder;

let cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len),
  );
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((state) => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b);
  });

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_4.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}

function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  for (let i = 0; i < array.length; i++) {
    const add = addToExternrefTable0(array[i]);
    getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function __wbg_adapter_54(arg0, arg1, arg2) {
  wasm.closure1491_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_136(arg0, arg1, arg2, arg3) {
  wasm.closure1027_externref_shim(arg0, arg1, arg2, arg3);
}

const DenoLoaderFinalization = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((ptr) => wasm.__wbg_denoloader_free(ptr >>> 0, 1));

export class DenoLoader {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(DenoLoader.prototype);
    obj.__wbg_ptr = ptr;
    DenoLoaderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DenoLoaderFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_denoloader_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get_graph() {
    const ret = wasm.denoloader_get_graph(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {string[]} entrypoints
   * @returns {Promise<string[]>}
   */
  add_entrypoints(entrypoints) {
    const ptr0 = passArrayJsValueToWasm0(entrypoints, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.denoloader_add_entrypoints(this.__wbg_ptr, ptr0, len0);
    return ret;
  }
  /**
   * @param {string} specifier
   * @param {string | null | undefined} importer
   * @param {number} resolution_mode
   * @returns {string}
   */
  resolve_sync(specifier, importer, resolution_mode) {
    let deferred4_0;
    let deferred4_1;
    try {
      const ptr0 = passStringToWasm0(
        specifier,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      var ptr1 = isLikeNone(importer)
        ? 0
        : passStringToWasm0(
          importer,
          wasm.__wbindgen_malloc,
          wasm.__wbindgen_realloc,
        );
      var len1 = WASM_VECTOR_LEN;
      const ret = wasm.denoloader_resolve_sync(
        this.__wbg_ptr,
        ptr0,
        len0,
        ptr1,
        len1,
        resolution_mode,
      );
      var ptr3 = ret[0];
      var len3 = ret[1];
      if (ret[3]) {
        ptr3 = 0;
        len3 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred4_0 = ptr3;
      deferred4_1 = len3;
      return getStringFromWasm0(ptr3, len3);
    } finally {
      wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
  }
  /**
   * @param {string} specifier
   * @param {string | null | undefined} importer
   * @param {number} resolution_mode
   * @returns {Promise<string>}
   */
  resolve(specifier, importer, resolution_mode) {
    const ptr0 = passStringToWasm0(
      specifier,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(importer)
      ? 0
      : passStringToWasm0(
        importer,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.denoloader_resolve(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
      resolution_mode,
    );
    return ret;
  }
  /**
   * @param {string} url
   * @param {number} requested_module_type
   * @returns {Promise<any>}
   */
  load(url, requested_module_type) {
    const ptr0 = passStringToWasm0(
      url,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.denoloader_load(
      this.__wbg_ptr,
      ptr0,
      len0,
      requested_module_type,
    );
    return ret;
  }
}

const DenoWorkspaceFinalization = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((ptr) =>
    wasm.__wbg_denoworkspace_free(ptr >>> 0, 1)
  );

export class DenoWorkspace {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DenoWorkspaceFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_denoworkspace_free(ptr, 0);
  }
  /**
   * @param {any} options
   */
  constructor(options) {
    const ret = wasm.denoworkspace_new(options);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    DenoWorkspaceFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {Promise<DenoLoader>}
   */
  create_loader() {
    const ret = wasm.denoworkspace_create_loader(this.__wbg_ptr);
    return ret;
  }
}

export function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
  const ret = String(arg1);
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_apply_eb9e9b97497f91e4() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.apply(arg0, arg1, arg2);
    return ret;
  }, arguments);
}

export function __wbg_buffer_609cc3eee51ed158(arg0) {
  const ret = arg0.buffer;
  return ret;
}

export function __wbg_byteLength_e674b853d9c77e1d(arg0) {
  const ret = arg0.byteLength;
  return ret;
}

export function __wbg_call_672a4d21634d4a24() {
  return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
  }, arguments);
}

export function __wbg_call_7cccdd69e0791ae2() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
  }, arguments);
}

export function __wbg_closeSync_8fd63730e46094bc() {
  return handleError(function (arg0) {
    closeSync(arg0);
  }, arguments);
}

export function __wbg_copyFileSync_88253ce015ca1375() {
  return handleError(function (arg0, arg1, arg2, arg3) {
    copyFileSync(
      getStringFromWasm0(arg0, arg1),
      getStringFromWasm0(arg2, arg3),
    );
  }, arguments);
}

export function __wbg_copybytes_6e6f6b47af961dba(arg0, arg1, arg2) {
  copy_bytes(arg0, arg1, arg2 >>> 0);
}

export function __wbg_cwd_0344793d09965e1c() {
  return handleError(function (arg0) {
    const ret = cwd();
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  }, arguments);
}

export function __wbg_denoloader_new(arg0) {
  const ret = DenoLoader.__wrap(arg0);
  return ret;
}

export function __wbg_done_769e5ede4b31c67b(arg0) {
  const ret = arg0.done;
  return ret;
}

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
  let deferred0_0;
  let deferred0_1;
  try {
    deferred0_0 = arg0;
    deferred0_1 = arg1;
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
  }
}

export function __wbg_error_af93cec861768235(arg0) {
  console.error(arg0);
}

export function __wbg_fchmodSync_a8ea23b3d4f2312f() {
  return handleError(function (arg0, arg1) {
    fchmodSync(arg0, arg1 >>> 0);
  }, arguments);
}

export function __wbg_fetchspecifier_ab7c693c506dff38(arg0, arg1, arg2) {
  let deferred0_0;
  let deferred0_1;
  try {
    deferred0_0 = arg0;
    deferred0_1 = arg1;
    const ret = fetch_specifier(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
  } finally {
    wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
  }
}

export function __wbg_from_2a5d3e218e67aa85(arg0) {
  const ret = Array.from(arg0);
  return ret;
}

export function __wbg_fstatSync_7e46af152ea1eb79() {
  return handleError(function (arg0) {
    const ret = fstatSync(arg0);
    return ret;
  }, arguments);
}

export function __wbg_getRandomValues_5303a53b5407733a() {
  return handleError(function (arg0, arg1) {
    globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
  }, arguments);
}

export function __wbg_getTime_46267b1c24877e30(arg0) {
  const ret = arg0.getTime();
  return ret;
}

export function __wbg_get_67b2ba62fc30de12() {
  return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
  }, arguments);
}

export function __wbg_get_b9b93047fe3cf45b(arg0, arg1) {
  const ret = arg0[arg1 >>> 0];
  return ret;
}

export function __wbg_getwithrefkey_1dc361bd10053bfe(arg0, arg1) {
  const ret = arg0[arg1];
  return ret;
}

export function __wbg_has_a5ea9117f258a0ec() {
  return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    return ret;
  }, arguments);
}

export function __wbg_instanceof_ArrayBuffer_e14585432e3737fc(arg0) {
  let result;
  try {
    result = arg0 instanceof ArrayBuffer;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}

export function __wbg_instanceof_Date_e9a9be8b9cea7890(arg0) {
  let result;
  try {
    result = arg0 instanceof Date;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}

export function __wbg_instanceof_Error_4d54113b22d20306(arg0) {
  let result;
  try {
    result = arg0 instanceof Error;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}

export function __wbg_instanceof_Uint8Array_17156bcf118086a9(arg0) {
  let result;
  try {
    result = arg0 instanceof Uint8Array;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}

export function __wbg_isArray_a1eab7e0d067391b(arg0) {
  const ret = Array.isArray(arg0);
  return ret;
}

export function __wbg_isBlockDevice_1e181db2eba8f1fc(arg0) {
  const ret = arg0.isBlockDevice();
  return ret;
}

export function __wbg_isCharacterDevice_c0e9b53c4a189d1d(arg0) {
  const ret = arg0.isCharacterDevice();
  return ret;
}

export function __wbg_isDirectory_133cf7328b094329(arg0) {
  const ret = arg0.isDirectory();
  return ret;
}

export function __wbg_isFIFO_72974ec0a29cf978(arg0) {
  const ret = arg0.isFIFO();
  return ret;
}

export function __wbg_isFile_a5823a613e2c9f83(arg0) {
  const ret = arg0.isFile();
  return ret;
}

export function __wbg_isSafeInteger_343e2beeeece1bb0(arg0) {
  const ret = Number.isSafeInteger(arg0);
  return ret;
}

export function __wbg_isSocket_02633aa3ca3bafa6(arg0) {
  const ret = arg0.isSocket();
  return ret;
}

export function __wbg_isSymbolicLink_ba748dcb779ab946(arg0) {
  const ret = arg0.isSymbolicLink();
  return ret;
}

export function __wbg_iterator_9a24c88df860dc65() {
  const ret = Symbol.iterator;
  return ret;
}

export function __wbg_length_a446193dc22c12f8(arg0) {
  const ret = arg0.length;
  return ret;
}

export function __wbg_length_e2d2a49132c1b256(arg0) {
  const ret = arg0.length;
  return ret;
}

export function __wbg_linkSync_69f3355c99cfd001() {
  return handleError(function (arg0, arg1, arg2, arg3) {
    linkSync(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
  }, arguments);
}

export function __wbg_lstatSync_1ea9eddd40918ed8() {
  return handleError(function (arg0, arg1) {
    const ret = lstatSync(getStringFromWasm0(arg0, arg1));
    return ret;
  }, arguments);
}

export function __wbg_message_97a2af9b89d693a3(arg0) {
  const ret = arg0.message;
  return ret;
}

export function __wbg_mkdirSync_d81f1cb4cc624ce1() {
  return handleError(function (arg0, arg1, arg2) {
    mkdirSync(getStringFromWasm0(arg0, arg1), arg2);
  }, arguments);
}

export function __wbg_name_0b327d569f00ebee(arg0) {
  const ret = arg0.name;
  return ret;
}

export function __wbg_new_23a2665fac83c611(arg0, arg1) {
  try {
    var state0 = { a: arg0, b: arg1 };
    var cb0 = (arg0, arg1) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_136(a, state0.b, arg0, arg1);
      } finally {
        state0.a = a;
      }
    };
    const ret = new Promise(cb0);
    return ret;
  } finally {
    state0.a = state0.b = 0;
  }
}

export function __wbg_new_405e22f390576ce2() {
  const ret = new Object();
  return ret;
}

export function __wbg_new_5e0be73521bc8c17() {
  const ret = new Map();
  return ret;
}

export function __wbg_new_78feb108b6472713() {
  const ret = new Array();
  return ret;
}

export function __wbg_new_8a6f238a6ece86ea() {
  const ret = new Error();
  return ret;
}

export function __wbg_new_a12002a7f91c75be(arg0) {
  const ret = new Uint8Array(arg0);
  return ret;
}

export function __wbg_new_c757c17a3a479543(arg0) {
  const ret = new SharedArrayBuffer(arg0 >>> 0);
  return ret;
}

export function __wbg_new_e9a4a67dbababe57(arg0) {
  const ret = new Int32Array(arg0);
  return ret;
}

export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return ret;
}

export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(
  arg0,
  arg1,
  arg2,
) {
  const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
  return ret;
}

export function __wbg_next_25feadfc0913fea9(arg0) {
  const ret = arg0.next;
  return ret;
}

export function __wbg_next_6574e1a8a62d1055() {
  return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
  }, arguments);
}

export function __wbg_now_f399581b88051fba() {
  const ret = globalThis.Date.now();
  return ret;
}

export function __wbg_openSync_ead5512282bf6b5a() {
  return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = openSync(
      getStringFromWasm0(arg0, arg1),
      getStringFromWasm0(arg2, arg3),
      arg4 === 0x100000001 ? undefined : arg4,
    );
    return ret;
  }, arguments);
}

export function __wbg_queueMicrotask_97d92b4fcc8a61c5(arg0) {
  queueMicrotask(arg0);
}

export function __wbg_queueMicrotask_d3219def82552485(arg0) {
  const ret = arg0.queueMicrotask;
  return ret;
}

export function __wbg_readFileSync_086a97048ee14ea7() {
  return handleError(function (arg0, arg1) {
    const ret = readFileSync(getStringFromWasm0(arg0, arg1));
    return ret;
  }, arguments);
}

export function __wbg_readSync_9647a2e8a9ff2a5c() {
  return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    const ret = readSync(
      arg0,
      getArrayU8FromWasm0(arg1, arg2),
      arg3 >>> 0,
      arg4 >>> 0,
      arg5 === 0 ? undefined : arg6,
    );
    return ret;
  }, arguments);
}

export function __wbg_readdirSync_10589500d49a202d() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = readdirSync(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
  }, arguments);
}

export function __wbg_realpathSync_e99dca5be973b2f0() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = realpathSync(getStringFromWasm0(arg1, arg2));
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  }, arguments);
}

export function __wbg_renameSync_b463a8878b91b423() {
  return handleError(function (arg0, arg1, arg2, arg3) {
    renameSync(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
  }, arguments);
}

export function __wbg_resolve_4851785c9c5f573d(arg0) {
  const ret = Promise.resolve(arg0);
  return ret;
}

export function __wbg_rmSync_cb45006bb113b0d7() {
  return handleError(function (arg0, arg1, arg2) {
    rmSync(getStringFromWasm0(arg0, arg1), arg2);
  }, arguments);
}

export function __wbg_set_37837023f3d740e8(arg0, arg1, arg2) {
  arg0[arg1 >>> 0] = arg2;
}

export function __wbg_set_3f1d0b984ed272ed(arg0, arg1, arg2) {
  arg0[arg1] = arg2;
}

export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
  arg0.set(arg1, arg2 >>> 0);
}

export function __wbg_set_8fc6bf8a5b1071d1(arg0, arg1, arg2) {
  const ret = arg0.set(arg1, arg2);
  return ret;
}

export function __wbg_set_bb8cecf6a62b9f46() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
  }, arguments);
}

export function __wbg_setindex_492b4871340897de(arg0, arg1, arg2) {
  arg0[arg1 >>> 0] = arg2;
}

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
  const ret = arg1.stack;
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_statSync_086185e28aa32c2c() {
  return handleError(function (arg0, arg1) {
    const ret = statSync(getStringFromWasm0(arg0, arg1));
    return ret;
  }, arguments);
}

export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
  const ret = typeof global === "undefined" ? null : global;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
  const ret = typeof globalThis === "undefined" ? null : globalThis;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_NODE_PROCESS_ENV_4dee0ec47660234e() {
  const ret = env;
  return ret;
}

export function __wbg_static_accessor_NODE_PROCESS_PLATFORM_a5f7b3f011150984(
  arg0,
) {
  const ret = platform;
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_static_accessor_PROCESS_GLOBAL_5ee7ad7456ba258a() {
  const ret = process;
  return ret;
}

export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
  const ret = typeof self === "undefined" ? null : self;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
  const ret = typeof window === "undefined" ? null : window;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_symlinkSync_0300b0d56cb224a4() {
  return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    symlinkSync(
      getStringFromWasm0(arg0, arg1),
      getStringFromWasm0(arg2, arg3),
      arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5),
    );
  }, arguments);
}

export function __wbg_then_44b73946d2fb3e7d(arg0, arg1) {
  const ret = arg0.then(arg1);
  return ret;
}

export function __wbg_then_48b406749878a531(arg0, arg1, arg2) {
  const ret = arg0.then(arg1, arg2);
  return ret;
}

export function __wbg_unlinkSync_018ae21cabca71fb() {
  return handleError(function (arg0, arg1) {
    unlinkSync(getStringFromWasm0(arg0, arg1));
  }, arguments);
}

export function __wbg_value_cd1ffa7b1ab794f1(arg0) {
  const ret = arg0.value;
  return ret;
}

export function __wbg_wait_3a24d3c977f96f24(arg0, arg1, arg2, arg3, arg4) {
  const ret = Atomics.wait(arg1, arg2 >>> 0, arg3, arg4);
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_writeFileSync_32ee25ab546d4d03() {
  return handleError(function (arg0, arg1, arg2, arg3) {
    writeFileSync(
      getStringFromWasm0(arg0, arg1),
      getArrayU8FromWasm0(arg2, arg3),
    );
  }, arguments);
}

export function __wbg_writeSync_0cdfb953810f1093() {
  return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    const ret = writeSync(
      arg0,
      getArrayU8FromWasm0(arg1, arg2),
      arg3 >>> 0,
      arg4 >>> 0,
      arg5 === 0x100000001 ? undefined : arg5,
    );
    return ret;
  }, arguments);
}

export function __wbindgen_array_new() {
  const ret = [];
  return ret;
}

export function __wbindgen_array_push(arg0, arg1) {
  arg0.push(arg1);
}

export function __wbindgen_as_number(arg0) {
  const ret = +arg0;
  return ret;
}

export function __wbindgen_bigint_from_i64(arg0) {
  const ret = arg0;
  return ret;
}

export function __wbindgen_bigint_from_u64(arg0) {
  const ret = BigInt.asUintN(64, arg0);
  return ret;
}

export function __wbindgen_boolean_get(arg0) {
  const v = arg0;
  const ret = typeof v === "boolean" ? (v ? 1 : 0) : 2;
  return ret;
}

export function __wbindgen_cb_drop(arg0) {
  const obj = arg0.original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  const ret = false;
  return ret;
}

export function __wbindgen_closure_wrapper2479(arg0, arg1, arg2) {
  const ret = makeMutClosure(arg0, arg1, 1492, __wbg_adapter_54);
  return ret;
}

export function __wbindgen_debug_string(arg0, arg1) {
  const ret = debugString(arg1);
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbindgen_error_new(arg0, arg1) {
  const ret = new Error(getStringFromWasm0(arg0, arg1));
  return ret;
}

export function __wbindgen_in(arg0, arg1) {
  const ret = arg0 in arg1;
  return ret;
}

export function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_4;
  const offset = table.grow(4);
  table.set(0, undefined);
  table.set(offset + 0, undefined);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
}

export function __wbindgen_is_bigint(arg0) {
  const ret = typeof arg0 === "bigint";
  return ret;
}

export function __wbindgen_is_function(arg0) {
  const ret = typeof arg0 === "function";
  return ret;
}

export function __wbindgen_is_null(arg0) {
  const ret = arg0 === null;
  return ret;
}

export function __wbindgen_is_object(arg0) {
  const val = arg0;
  const ret = typeof val === "object" && val !== null;
  return ret;
}

export function __wbindgen_is_string(arg0) {
  const ret = typeof arg0 === "string";
  return ret;
}

export function __wbindgen_is_undefined(arg0) {
  const ret = arg0 === undefined;
  return ret;
}

export function __wbindgen_jsval_loose_eq(arg0, arg1) {
  const ret = arg0 == arg1;
  return ret;
}

export function __wbindgen_memory() {
  const ret = wasm.memory;
  return ret;
}

export function __wbindgen_number_get(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "number" ? obj : undefined;
  getDataViewMemory0().setFloat64(
    arg0 + 8 * 1,
    isLikeNone(ret) ? 0 : ret,
    true,
  );
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}

export function __wbindgen_number_new(arg0) {
  const ret = arg0;
  return ret;
}

export function __wbindgen_string_get(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "string" ? obj : undefined;
  var ptr1 = isLikeNone(ret)
    ? 0
    : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbindgen_string_new(arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return ret;
}

export function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
