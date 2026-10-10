import { readFile } from "node:fs/promises";

type packagejson = {
  version: string;
};

export const version = async (): Promise<string> => {
  const packageJsonText = await readFile(
    new URL("../package.json", import.meta.url),
    "utf-8",
  );
  const packageJson: packagejson = JSON.parse(packageJsonText);

  return packageJson.version;
};
