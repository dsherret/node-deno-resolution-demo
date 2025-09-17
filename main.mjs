import { say } from "npm:cowsay@^1.6";
import { join } from "jsr:@std/path@1";

console.log(say({
  text: "Hello!"
}));
console.log(join(process.cwd(), "test.js"));
