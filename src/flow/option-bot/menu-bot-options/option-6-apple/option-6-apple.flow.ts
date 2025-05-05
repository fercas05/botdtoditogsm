import { addKeyword, EVENTS } from "@builderbot/bot";
import { minaRamDisckMacFlow } from "./options/apple-1-mina-ramdisk-mac.flow";
import { iRemovalWindowsFlow } from "./options/apple-2-iremoval-windows.flow";
import { fmiOffIpadsFlow } from "./options/fmiOffIpadsFlow.flow";
import { fmiOffIpadsWinFlow } from "./options/fmi-offwin.flow";
import { reset, start, stop } from "../../../idle-custom";
import { menuBotFlow } from "../../menu-bot.flow"; // Importamos el menú principal

const menuAppleFlows = {
    "1": minaRamDisckMacFlow,
    "2": iRemovalWindowsFlow,
    "3": fmiOffIpadsFlow,
    "4": fmiOffIpadsWinFlow
};

export const opcion6AppleMenuFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        "Seleccione:",
        "*1* Bypass Lpro MAX",
        "*2* Bypass IREMOVAL",
        "*3* FMI OFF MAC",
        "*4* FMI OFF WIN",
        "*#* Menú principal 🔄"
    ],
    { capture: true },
    async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
        reset(ctx, gotoFlow, 20000);

        await provider.vendor.readMessages([ctx.key]);

        if (ctx.body === "#") return gotoFlow(menuBotFlow); // Regresa al menú principal

        const flow = menuAppleFlows[ctx.body];

        if (flow) {
            stop(ctx);
            return gotoFlow(flow);
        }

        if (ctx.body.toLowerCase() === "c") return endFlow();

        return fallBack("Escoge una de las opciones anteriores o escribe *c* para cancelar");
    });

export const opcion6AppleMenuFLOWS = [
    opcion6AppleMenuFlow,
    minaRamDisckMacFlow,
    iRemovalWindowsFlow,
    fmiOffIpadsFlow,
    fmiOffIpadsWinFlow
];
