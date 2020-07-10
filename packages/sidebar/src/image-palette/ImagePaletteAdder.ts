import { Palettes } from "../palette";
import mx from "@mxgraph-app/mx";
const { mxResources } = mx;

const items = [
  "Earth_globe",
  "Empty_Folder",
  "Full_Folder",
  "Gear",
  "Lock",
  "Software",
  "Virus",
  "Email",
  "Database",
  "Router_Icon",
  "iPad",
  "iMac",
  "Laptop",
  "MacBook",
  "Monitor_Tower",
  "Printer",
  "Server_Tower",
  "Workstation",
  "Firewall_02",
  "Wireless_Router_N",
  "Credit_Card",
  "Piggy_Bank",
  "Graph",
  "Safe",
  "Shopping_Cart",
  "Suit1",
  "Suit2",
  "Suit3",
  "Pilot1",
  "Worker1",
  "Soldier1",
  "Doctor1",
  "Tech1",
  "Security1",
  "Telesales1",
];

export class ImagePaletteAdder {
  palettes: Palettes;
  dir: string = "/";
  items = items;

  constructor(palettes: Palettes, opts: any = {}) {
    this.palettes = palettes;
    this.dir = opts.dir;
  }

  get id() {
    return "clipart";
  }

  get title() {
    return mxResources.get("clipart");
  }

  get prefix() {
    return this.dir + "/clipart/";
  }

  get postfix() {
    return "_128x128.png";
  }

  get tags() {
    return {
      Wireless_Router_N: "wireless router switch wap wifi access point wlan",
      Router_Icon: "router switch",
    };
  }

  get titles() {
    return null;
  }

  add(id?) {
    const { palettes, items, title, prefix, postfix, titles, tags } = this;
    id = id || this.id;
    palettes.addImagePalette(id, {
      title,
      prefix,
      postfix,
      items,
      titles,
      tags,
    });
  }
}
