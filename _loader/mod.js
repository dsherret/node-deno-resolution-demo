/**
 * Resolver and loader for Deno code.
 *
 * This can be used to create bundler plugins or libraries that use deno resolution.
 *
 * @example
 * ```ts
 * import { Workspace, ResolutionMode, type LoadResponse, RequestedModuleType } from "@deno/loader";
 *
 * const workspace = new Workspace({
 *   // optional options
 * });
 * const loader = await workspace.createLoader();
 * const diagnostics = await loader.addEntrypoints(["./mod.ts"])
 * if (diagnostics.length > 0) {
 *   throw new Error(diagnostics[0].message);
 * }
 * // alternatively use resolve to resolve npm/jsr specifiers not found
 * // in the entrypoints or if not being able to provide entrypoints
 * const resolvedUrl = loader.resolveSync(
 *   "./mod.test.ts",
 *   "https://deno.land/mod.ts", // referrer
 *   ResolutionMode.Import,
 * );
 * const response = await loader.load(resolvedUrl, RequestedModuleType.Default);
 * if (response.kind === "module") {
 *   console.log(response.specifier);
 *   console.log(response.code);
 *   console.log(response.mediaType);
 * } else if (response.kind === "external") {
 *   console.log(response.specifier)
 * } else {
 *   const _assertNever = response;
 *   throw new Error(`Unhandled kind: ${(response as LoadResponse).kind}`);
 * }
 * ```
 * @module
 */
import { DenoLoader as WasmLoader, DenoWorkspace as WasmWorkspace, } from "./lib/rs_lib.js";
export class ResolveError extends Error {
}
/** File type. */
export var MediaType;
(function (MediaType) {
    MediaType[MediaType["JavaScript"] = 0] = "JavaScript";
    MediaType[MediaType["Jsx"] = 1] = "Jsx";
    MediaType[MediaType["Mjs"] = 2] = "Mjs";
    MediaType[MediaType["Cjs"] = 3] = "Cjs";
    MediaType[MediaType["TypeScript"] = 4] = "TypeScript";
    MediaType[MediaType["Mts"] = 5] = "Mts";
    MediaType[MediaType["Cts"] = 6] = "Cts";
    MediaType[MediaType["Dts"] = 7] = "Dts";
    MediaType[MediaType["Dmts"] = 8] = "Dmts";
    MediaType[MediaType["Dcts"] = 9] = "Dcts";
    MediaType[MediaType["Tsx"] = 10] = "Tsx";
    MediaType[MediaType["Css"] = 11] = "Css";
    MediaType[MediaType["Json"] = 12] = "Json";
    MediaType[MediaType["Html"] = 13] = "Html";
    MediaType[MediaType["Sql"] = 14] = "Sql";
    MediaType[MediaType["Wasm"] = 15] = "Wasm";
    MediaType[MediaType["SourceMap"] = 16] = "SourceMap";
    MediaType[MediaType["Unknown"] = 17] = "Unknown";
})(MediaType || (MediaType = {}));
/** Kind of resolution. */
export var ResolutionMode;
(function (ResolutionMode) {
    /** Resolving from an ESM file. */
    ResolutionMode[ResolutionMode["Import"] = 0] = "Import";
    /** Resolving from a CJS file. */
    ResolutionMode[ResolutionMode["Require"] = 1] = "Require";
})(ResolutionMode || (ResolutionMode = {}));
/** Resolves the workspace. */
export class Workspace {
    #inner;
    #debug;
    /** Creates a `DenoWorkspace` with the provided options. */
    constructor(options = {}) {
        this.#inner = new WasmWorkspace(options);
        this.#debug = options.debug ?? false;
    }
    [Symbol.dispose]() {
        this.#inner.free();
    }
    /** Creates a loader that uses this this workspace. */
    async createLoader() {
        const wasmLoader = await this.#inner.create_loader();
        return new Loader(wasmLoader, this.#debug);
    }
}
export var RequestedModuleType;
(function (RequestedModuleType) {
    RequestedModuleType[RequestedModuleType["Default"] = 0] = "Default";
    RequestedModuleType[RequestedModuleType["Json"] = 1] = "Json";
    RequestedModuleType[RequestedModuleType["Text"] = 2] = "Text";
    RequestedModuleType[RequestedModuleType["Bytes"] = 3] = "Bytes";
})(RequestedModuleType || (RequestedModuleType = {}));
/** A loader for resolving and loading urls. */
export class Loader {
    #inner;
    #debug;
    /** @internal */
    constructor(loader, debug) {
        if (!(loader instanceof WasmLoader)) {
            throw new Error("Get the loader from the workspace.");
        }
        this.#inner = loader;
        this.#debug = debug;
    }
    [Symbol.dispose]() {
        this.#inner.free();
    }
    /** Adds entrypoints to the loader.
     *
     * It's useful to specify entrypoints so that the loader can resolve
     * npm: and jsr: specifiers the same way that Deno does when not using
     * a lockfile.
     */
    async addEntrypoints(entrypoints) {
        const messages = await this.#inner.add_entrypoints(entrypoints);
        return messages.map((message) => ({ message }));
    }
    /** Synchronously resolves a specifier using the given referrer and resolution mode.
     * @throws {ResolveError}
     */
    resolveSync(specifier, referrer, resolutionMode) {
        if (this.#debug) {
            console.error(`DEBUG - Resolving '${specifier}' from '${referrer ?? "<undefined>"}' (${resolutionModeToString(resolutionMode)})`);
        }
        try {
            const value = this.#inner.resolve_sync(specifier, referrer, resolutionMode);
            if (this.#debug) {
                console.error(`DEBUG - Resolved to '${value}'`);
            }
            return value;
        }
        catch (err) {
            Object.setPrototypeOf(err, ResolveError.prototype);
            throw err;
        }
    }
    /** Asynchronously resolves a specifier using the given referrer and resolution mode.
     *
     * This is useful for resolving `jsr:` and `npm:` specifiers on the fly when they can't
     * be figured out from entrypoints, but it may cause multiple "npm install"s and different
     * npm or jsr resolution than Deno. For that reason it's better to provide the list of
     * entrypoints up front so the loader can create the npm and jsr graph, and then after use
     * synchronous resolution to resolve jsr and npm specifiers.
     *
     * @throws {ResolveError}
     */
    async resolve(specifier, referrer, resolutionMode) {
        if (this.#debug) {
            console.error(`DEBUG - Resolving '${specifier}' from '${referrer ?? "<undefined>"}' (${resolutionModeToString(resolutionMode)})`);
        }
        try {
            const value = await this.#inner.resolve(specifier, referrer, resolutionMode);
            if (this.#debug) {
                console.error(`DEBUG - Resolved to '${value}'`);
            }
            return value;
        }
        catch (err) {
            Object.setPrototypeOf(err, ResolveError.prototype);
            throw err;
        }
    }
    /** Loads a specifier. */
    load(specifier, requestedModuleType) {
        if (this.#debug) {
            console.error(`DEBUG - Loading '${specifier}' with type '${requestedModuleTypeToString(requestedModuleType) ?? "<default>"}'`);
        }
        return this.#inner.load(specifier, requestedModuleType);
    }
    /** Gets the module graph.
     *
     * WARNING: This function is very unstable and the output may change between
     * patch releases.
     */
    getGraphUnstable() {
        return this.#inner.get_graph();
    }
}
function requestedModuleTypeToString(moduleType) {
    switch (moduleType) {
        case RequestedModuleType.Bytes:
            return "bytes";
        case RequestedModuleType.Text:
            return "text";
        case RequestedModuleType.Json:
            return "json";
        case RequestedModuleType.Default:
            return undefined;
        default: {
            const _never = moduleType;
            return undefined;
        }
    }
}
function resolutionModeToString(mode) {
    switch (mode) {
        case ResolutionMode.Import:
            return "import";
        case ResolutionMode.Require:
            return "require";
        default: {
            const _assertNever = mode;
            return "unknown";
        }
    }
}
