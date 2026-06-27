import { createProvider } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { BaileyGlobalVendorArgs } from "@builderbot/provider-baileys/dist/type";
import {
  SendWaveProvider,
  GlobalVendorArgs,
} from "@gamastudio/sendwave-provider";
import {
  PROVIDER,
  SENDWAVES_API_KEY,
  SENDWAVES_INSTANCE_NAME,

} from "~/config/environment";

const baileysConfig: Partial<BaileyGlobalVendorArgs> = {
  experimentalStore: true,
  timeRelease: 10800000,
  useBaileysStore: true,
  version: [2, 3000, 1042256123],
};

const sendwaveConfig: GlobalVendorArgs = {
  apiKey: SENDWAVES_API_KEY || "",
  name: SENDWAVES_INSTANCE_NAME || "",
  port: parseInt(process.env.PORT || "3006"),
  readMessages: true,
  linkPreview: true,
};

const getProvider = () => {
  if (PROVIDER === "sendwaves") {
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
