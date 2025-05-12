
import Ajv from 'ajv';

/**
 */

/**
 * The common configuration for yaml compiler
 */
export type CoreCompiler = {
  /**
   * The type of the compiler
   */
  type: "ajv" | "type";
  /**
   * The format of the source
   */
  format: "text" | "file";
  /**
   * The configuration for jsdoc(and generate typedoc)
   */
  jsdoc?: {
    /**
     * The group name for grouping
     */
    group?: string;
    /**
     * code example
     */
    example?: string;
    /**
     * deprecated. no more use.
     */
    isDeprecated?: boolean;
    /**
     * reference
     */
    see?: string;
    /**
     * since version
     */
    since?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
} & (
  | {
      format: "file";
      /**
       * The source file to compiler
       */
      src: string;
      [k: string]: unknown;
    }
  | {
      format: "text";
      /**
       * The schema to compiler
       */
      schema: string;
      [k: string]: unknown;
    }
);
;

const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CoreCompiler",
  "type": "object",
  "description": "The common configuration for yaml compiler",
  "properties": {
    "type": {
      "type": "string",
      "description": "The type of the compiler",
      "enum": [
        "ajv",
        "type"
      ]
    },
    "format": {
      "type": "string",
      "description": "The format of the source",
      "enum": [
        "text",
        "file"
      ]
    },
    "jsdoc": {
      "type": "object",
      "description": "The configuration for jsdoc(and generate typedoc)",
      "properties": {
        "group": {
          "type": "string",
          "description": "The group name for grouping"
        },
        "example": {
          "type": "string",
          "description": "code example"
        },
        "isDeprecated": {
          "type": "boolean",
          "description": "deprecated. no more use."
        },
        "see": {
          "type": "string",
          "description": "reference"
        },
        "since": {
          "type": "string",
          "description": "since version"
        }
      }
    }
  },
  "required": [
    "type",
    "format"
  ],
  "oneOf": [
    {
      "properties": {
        "format": {
          "const": "file"
        },
        "src": {
          "type": "string",
          "description": "The source file to compiler"
        }
      },
      "required": [
        "format",
        "src"
      ]
    },
    {
      "properties": {
        "format": {
          "const": "text"
        },
        "schema": {
          "type": "string",
          "description": "The schema to compiler"
        }
      },
      "required": [
        "format",
        "schema"
      ]
    }
  ]
} as const;

const ajv = new Ajv({ allErrors: true });

export const validate = ajv.compile<CoreCompiler>(schema);
