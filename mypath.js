import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootDir = __dirname
export const jsonDir = path.join(rootDir,"/json");
export const staticDir = path.join(rootDir,"/static");