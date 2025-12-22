import { createProvider } from "@builderbot/bot";
// import { GlobalVendorArgs } from "@builderbot/bot/dist/types";
// import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import {
  SendWaveProvider as Provider,
  GlobalVendorArgs,
} from "@gamastudio/sendwave-provider";
import { SENDWAVE_API_KEY, SENDWAVE_INSTANCE_NAME } from "~/config/environment";

export const baileysConfig = {
  experimentalStore: true, // Significantly reduces resource consumption
  timeRelease: 10800000, // Cleans up data every 3 hours (in milliseconds)
  useBaileysStore: false,
};

export const sendwaveConfig: GlobalVendorArgs = {
  apiKey: SENDWAVE_API_KEY || "",
  name: SENDWAVE_INSTANCE_NAME || "",
  port: parseInt(process.env.PORT || "3006"),
  readMessages: true,
};

export type IProvider = typeof Provider;
export const adapterProvider = createProvider(Provider, sendwaveConfig);
