import { createProvider } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";

export type IProvider = typeof BaileysProvider;
export const adapterProvider = createProvider(BaileysProvider,{
    experimentalStore: true,  // Significantly reduces resource consumption
    timeRelease: 10800000,    // Cleans up data every 3 hours (in milliseconds)
    useBaileysStore:false
});