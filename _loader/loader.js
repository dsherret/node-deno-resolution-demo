import { RequestedModuleType, ResolutionMode, Workspace } from "./mod.js";


const workspace = new Workspace({})
const loader = await workspace.createLoader();

export async function resolve(specifier, context, nextResolve) {
  const resolutionMode = context.conditions.includes("import") ? ResolutionMode.Import : ResolutionMode.Require;
  const result = await loader.resolve(specifier, context.parentURL, resolutionMode);
  return nextResolve(result, context);
}

export async function load(url, context, nextLoad) {
  const result = await loader.load(url, RequestedModuleType.Import);
  return {
    format: "module",
    source: result.code,
    shortCircuit: true,
  };
}
