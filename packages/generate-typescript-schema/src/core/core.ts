import { compileAjv } from "./compile-ajv.js";
import { compileType } from "./compile-type.js";
import { fileToJson } from "../module/fileToJson.js";
import fs from "fs";
import path from "path";
import { CoreCompiler } from "../schema/compile-core.types.js";

const createFile = ({ subname, filename, outdir, result }: { subname: string; filename: string; outdir: string; result: string }) => {
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir, { recursive: true });
  }

  const fileName = path.basename(filename).split(".")[0];
  let filePath = path.join(outdir, fileName);
  switch (subname) {
    case "ajv":
      filePath = path.join(outdir, `${fileName}.ajv.ts`);
      break;
    case "type":
      filePath = path.join(outdir, `${fileName}.types.ts`);
      break;
  }

  fs.writeFileSync(filePath, result);
};

export const compile = async (options: CoreCompiler): Promise<string | void> => {
  const { type, format, schema, src } = options;

  let jsonSchema: string;
  if (format === "file") {
    jsonSchema = await fileToJson(src);
  } else {
    jsonSchema = schema;
  }

  let result: string;
  switch (type) {
    case "ajv":
      result = await compileAjv(jsonSchema);
      break;
    case "type":
      result = await compileType(jsonSchema);
      break;
  }

  if (format === "file") {
    const outdir = path.dirname(src);
    const filename = path.basename(src);
    const subname = type;
    if (!outdir) {
      throw new Error("outdir is required when format is file");
    }
    createFile({ subname, filename, outdir, result });
  } else {
    return result;
  }
};
