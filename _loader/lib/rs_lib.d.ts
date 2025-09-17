// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

export class DenoLoader {
  private constructor();
  free(): void;
  get_graph(): any;
  add_entrypoints(entrypoints: string[]): Promise<string[]>;
  resolve_sync(
    specifier: string,
    importer: string | null | undefined,
    resolution_mode: number,
  ): string;
  resolve(
    specifier: string,
    importer: string | null | undefined,
    resolution_mode: number,
  ): Promise<string>;
  load(url: string, requested_module_type: number): Promise<any>;
}
export class DenoWorkspace {
  free(): void;
  constructor(options: any);
  create_loader(): Promise<DenoLoader>;
}
