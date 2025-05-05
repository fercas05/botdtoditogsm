import { addKeyword, EVENTS } from "@builderbot/bot";
import { xiaomiAuthOnFlow } from "./options/xiaomi1-auth-on.flow";
import { xiaomiFrpResetFlow } from "./options/xiaomi2-frp-reset.flow";
import { removerCuentaRaizFlow } from "./options/xiaomi3-remover-cuenta-raiz.flow";
import { reset, start, stop } from "../../../idle-custom";
import { menuBotFlow } from "../../menu-bot.flow"; // Importamos el menú principal

const menuXiaomi = {
    "1": xiaomiAuthOnFlow,
    "2": xiaomiFrpResetFlow,
    "3": removerCuentaRaizFlow
};

export const opcion5xiaomiMenuFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        "Seleccione:",
        "*1* Auth",
        "*2* FRP-Reset Sindeload",
        "*3* Mi Account Lock Remove",
        "*#* Menú principal 🔄"
    ],
    { capture: true },
    async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
        reset(ctx, gotoFlow, 20000);
        await provider.vendor.readMessages([ctx.key]);

        if (ctx.body === "#") return gotoFlow(menuBotFlow); // Regresa al menú principal

        const flow = menuXiaomi[ctx.body];

        if (flow) {
            stop(ctx);
            return gotoFlow(flow);
        }

        if (ctx.body.toLowerCase() === "c") return endFlow();

        return fallBack("Escoge una de las opciones anteriores o escribe *c* para cancelar");
    });

export const opcion5xiaomiMenuFLOWS = [
    opcion5xiaomiMenuFlow,
    xiaomiAuthOnFlow,
    xiaomiFrpResetFlow,
    removerCuentaRaizFlow
];
