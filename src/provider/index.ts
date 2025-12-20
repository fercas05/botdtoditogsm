import { createProvider } from "@builderbot/bot";
import { GlobalVendorArgs } from "@builderbot/bot/dist/types";
// import { BaileysProvider } from "@builderbot/provider-baileys";
import { SendWaveProvider as Provider } from "@gamastudio/sendwave-provider";


export const baileys = {
    experimentalStore: true,  // Significantly reduces resource consumption
    timeRelease: 10800000,    // Cleans up data every 3 hours (in milliseconds)
    useBaileysStore: false
}

export const sendwaveConfig: GlobalVendorArgs = {
    apiKey: process.env.SENDWAVE_API_KEY || "",
    name: process.env.SENDWAVE_INSTANCE_NAME || "",
    port: parseInt(process.env.PORT || "3006")
};

export type IProvider = typeof Provider;
export const adapterProvider = createProvider(Provider, sendwaveConfig);