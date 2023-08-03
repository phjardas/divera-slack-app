import createDebug from "debug";
import io from "socket.io-client";

const debug = createDebug("divera:ws");

export type AccessTokenProvider = () => string | Promise<string>;

export class DiveraWSClient {
  private readonly accessTokenProvider: AccessTokenProvider;
  private readonly socket: any;

  constructor({
    accessTokenProvider,
  }: {
    accessTokenProvider: AccessTokenProvider;
  }) {
    this.accessTokenProvider = accessTokenProvider;

    debug("opening socket");

    this.socket = io("wss://ws.divera247.com");

    this.socket.on("connect", () => {
      debug("connected.");
      this.authenticate();
    });

    this.socket.on("expired", () => {
      debug("authentication expired.");
      this.authenticate();
    });

    this.socket.on("disconnect", () => debug("disconnected."));

    this.socket.on("init", () => debug("authenticated."));

    this.socket.on("subscribed", () => debug("subscribed."));

    this.socket.on("error", (error: unknown) => debug("error:", error));
  }

  private async authenticate() {
    const accessToken = await this.accessTokenProvider();
    debug("authenticating", accessToken);
    this.socket.emit("authenticate", { jwt: accessToken });
  }
}
