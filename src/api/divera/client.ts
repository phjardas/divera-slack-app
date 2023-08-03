import createDebug from "debug";
import { DiveraAlarmsService } from "./alarm";
import { DiveraWSClient } from "./ws";

const debug = createDebug("divera:client");

export class DiveraClient {
  private readonly accessKey: string;
  private readonly alarmService: DiveraAlarmsService;
  private readonly ws: DiveraWSClient;

  constructor({ accessKey }: { accessKey: string }) {
    this.accessKey = accessKey;

    this.alarmService = new DiveraAlarmsService({ accessKey });

    this.ws = new DiveraWSClient({
      accessTokenProvider: this.getAccessToken.bind(this),
    });

    this.fetchAlarms();
  }

  private async getAccessToken() {
    debug("Getting a fresh JWT");
    const url = `https://app.divera247.com/api/v2/auth/jwt?accesskey=${encodeURIComponent(
      this.accessKey
    )}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching JWT");
    const result = await response.json();
    return result.data.jwt;
  }

  private async fetchAlarms() {
    const alarms = await this.alarmService.getAlarms();
    debug("Alarms:", alarms);
  }
}
