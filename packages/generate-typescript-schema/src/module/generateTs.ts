import { compile } from "json-schema-to-typescript";

const generateTs = async (schema: object, options: { name?: string; group?: string }) => {
  const { name, group } = options;

  const n = "\n";
  let banner = "/**" + n;

  if (group) {
    banner += `* @group ${group}` + n;
  }

  banner += " */";

  return compile(schema, name ?? "Schema", {
    bannerComment: banner,
  });
};

export default generateTs;
