import createDebug from "debug";

const debug = createDebug("divera:alarm");

export type Alarm = {
  id: number;
  clister_id: number;
  foreign_id?: string;
  title?: string;
  text?: string;
  address?: string;
  lat?: number;
  lng?: number;
  priority?: boolean;
  date: number;
  hidden: boolean;
  deleted: boolean;
  closed: boolean;
};

export class DiveraAlarmsService {
  private readonly base: string;
  private readonly accessKey: string;

  constructor({
    base = "https://app.divera247.com/api/v2/alarms",
    accessKey,
  }: {
    base?: string;
    accessKey: string;
  }) {
    this.base = base;
    this.accessKey = accessKey;
  }

  async getAlarms(): Promise<Array<Alarm>> {
    const url = `${this.base}?accesskey=${encodeURIComponent(this.accessKey)}`;
    debug("Fetching alarms from %s", url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching alarms");
    const { data } = await response.json();
    return data.items;
  }
}
