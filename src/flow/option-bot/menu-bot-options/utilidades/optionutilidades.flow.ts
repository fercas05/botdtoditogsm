import { addKeyword, EVENTS } from "@builderbot/bot";
import { reset, start, stop } from "../../../idle-custom";
import { fixdllflow } from "./options/fixdll";
import { menuBotFlow } from "../../menu-bot.flow";

const menuUtilidadesFlows = {
    "1": fixdllflow,
};

export const utilidadesFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        '📱 **Utilidades disponibles**:',
        '*1* Fix DLL PCS',
        '*#* Menú principal 🔄'
    ], { capture: true },
    async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
        reset(ctx, gotoFlow, 20000);
        await provider.vendor.readMessages([ctx.key]);

        if (ctx.body === "#") return gotoFlow(menuBotFlow);

        const flow = menuUtilidadesFlows[ctx.body];

        if (flow) {
            stop(ctx);
            return gotoFlow(flow);
        }

        if (ctx.body.toLowerCase() === "c") return endFlow();

        return fallBack("Escoge una de las opciones anteriores o escribe *c* para cancelar");
    });

export const utilidadesFLOWS = [
    utilidadesFlow,
    fixdllflow,
];
