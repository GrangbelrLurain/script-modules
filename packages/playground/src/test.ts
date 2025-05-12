import { compile } from "@script-modules/generate-typescript-schema";

try {
  compile({
    type: "type",
    format: "file",
    src: "../core/src/schema/compile-core.yml",
    outdir: "./src/types",
  });
} catch (error) {
  console.error(error);
}
