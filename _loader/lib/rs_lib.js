// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file
// @ts-self-types="./rs_lib.d.ts"

// source-hash: f6bb519a821389ded6f1c755a50ef4fd24b096a1
import { readFileSync } from "node:fs";
import { join } from "node:path";
const wasmPath = join(import.meta.dirname, "./rs_lib.wasm");
const wasmModule = await WebAssembly.compile(readFileSync(wasmPath));
import * as internal from "./rs_lib.internal.js";
const wasm = new WebAssembly.Instance(wasmModule, {
  "./rs_lib.internal.js": internal,
}).exports;
export * from "./rs_lib.internal.js";
import { __wbg_set_wasm } from "./rs_lib.internal.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
