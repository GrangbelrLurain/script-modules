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
