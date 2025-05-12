import { execSync } from "child_process";

export const typescriptToDoc = async (src: string, options: { outdir: string; filename?: string }) => {
  const { outdir, filename } = options;

  if (!outdir) {
    throw new Error("outdir is required");
  }

  try {
    execSync(`typedoc --entryPoint ${src} --out ${outdir} --name ${filename}`);
  } catch (error) {
    throw new Error("Failed to convert TypeScript to Doc");
  }
};

export const typescriptsToDocs = async (srcs: string[], options: { outdir: string; filename?: string }) => {
  const { outdir, filename } = options;

  if (!outdir) {
    throw new Error("outdir is required");
  }

  try {
    execSync(`typedoc --entryPoint ${srcs.join(",")} --out ${outdir} --name ${filename}`);
  } catch (error) {
    throw new Error("Failed to convert TypeScript to Doc");
  }
};
