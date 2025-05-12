import generateTs from "../module/generateTs.js";

export const compileType = async (schema: string) => {
  let jsonSchema: object;
  try {
    jsonSchema = JSON.parse(schema);
  } catch (error) {
    throw new Error("Invalid JSON schema");
  }

  let name = "Schema";

  if ("title" in jsonSchema && typeof jsonSchema.title === "string") {
    name = jsonSchema.title;
  }

  const tsCode = await generateTs(jsonSchema, { name });

  return tsCode;
};
