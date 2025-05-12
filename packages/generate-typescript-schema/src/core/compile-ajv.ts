import generateTs from "../module/generateTs.js";

export const compileAjv = async (schema: string) => {
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

  /** AJV validation code */
  const validatorCode = `
import Ajv from 'ajv';

${await generateTs(jsonSchema, { name })};

const schema = ${JSON.stringify(jsonSchema, null, 2)} as const;

const ajv = new Ajv({ allErrors: true });

export const validate = ajv.compile<${name}>(schema);
`;

  return `${validatorCode}`;
};
