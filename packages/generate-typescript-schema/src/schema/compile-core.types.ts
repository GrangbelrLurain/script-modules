/**
 */

/**
 * @group The common configuration for yaml compiler @see https://github.com/ajv-validator/ajv-formats
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
