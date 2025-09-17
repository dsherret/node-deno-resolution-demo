# Node - Deno Resolution Demo

Deno resolution in Node.js:

```sh
> cat main.mjs
import { say } from "npm:cowsay@^1.6";
import { join } from "jsr:@std/path@1";

console.log(say({
  text: "Hello!"
}));
console.log(join(process.cwd(), "test.js"));

> node --experimental-loader ./_loader/loader.js main.mjs
________
< Hello! >
 --------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
/path/to/directory/test.js
```

* The `_loader` folder is a custom build of [`jsr:@deno/loader`](https://jsr.io/@deno/loader).
* I'll make this available via the `@deno/loader` package eventually.
