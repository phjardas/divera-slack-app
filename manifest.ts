import { Manifest } from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "divera",
  description: "Slack App für Divera 24/7",
  icon: "assets/logo-192.png",
  functions: [],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
