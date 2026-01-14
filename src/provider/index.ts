import { createProvider } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { BaileyGlobalVendorArgs } from "@builderbot/provider-baileys/dist/type";
import {
  SendWaveProvider,
  GlobalVendorArgs,
} from "@gamastudio/sendwave-provider";
import {
  PROVIDER,
  SENDWAVE_API_KEY,
  SENDWAVE_INSTANCE_NAME,
  SENDWAVE_URL,
} from "~/config/environment";

const baileysConfig: Partial<BaileyGlobalVendorArgs> = {
  experimentalStore: true,
  timeRelease: 10800000,

  useBaileysStore: false,
  version: [2, 3000, 1031930579],
};

const sendwaveConfig: GlobalVendorArgs = {
  apiKey: SENDWAVE_API_KEY || "",
  name: SENDWAVE_INSTANCE_NAME || "",
  port: parseInt(process.env.PORT || "3006"),
  readMessages: true,
  url: SENDWAVE_URL,
};

const getProvider = () => {
  if (PROVIDER === "sendwave") {
    return {
      Provider: SendWaveProvider,
      config: sendwaveConfig,
    };
  }
  return {
    Provider: BaileysProvider,
    config: baileysConfig,
  };
};

const { Provider, config } = getProvider();

export const adapterProvider = createProvider(Provider as any, config);
