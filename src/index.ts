import { DiveraClient } from "./api/divera/client";

const [accessKey] = process.argv.slice(2);
if (!accessKey) {
  throw new Error(`Usage: ${process.argv[0]} ${process.argv[1]} <accessKey>`);
}

new DiveraClient({ accessKey });
