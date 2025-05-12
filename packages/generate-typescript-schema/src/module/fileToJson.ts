import { $RefParser } from "@apidevtools/json-schema-ref-parser";

export const fileToJson = async (path: string) => {
  const jsonSchema = await $RefParser.dereference(path);
  return JSON.stringify(jsonSchema);
};
