import { addKeyword, EVENTS } from "@builderbot/bot";
import { infoServiciosFlow, infoSoporteFlow } from "./info-soporte-servicios/info.flow";
import { menuBotFlow } from "./option-bot/menu-bot.flow";
import { reset, start, stop } from "./idle-custom";

const menuWelcomeFlows = {
    "1": infoSoporteFlow,
    "2": menuBotFlow,
    "3": infoServiciosFlow
}

export const botAtajoFLow = addKeyword(["bot","Bot","BOT"]).addAction( async (ctx, { gotoFlow}) => {
    return gotoFlow(menuBotFlow);
})

export const menuWelcomeFlow = addKeyword(EVENTS.ACTION)
    .addAction(async(ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        '*Bienvenido a nuestra tienda online DT-UNLOCK*',
        '',
        'Web 24/7: *https://dtodito-gsm.com/*',
        '',
        'Escriba el número de la opción que desea:',
        '*1* Soporte 👷🏼‍♂️',
        '*2* Bot 🥷🏻',
        '*3* Servicios 📲💻'
    ], { capture: true },
        async (ctx, { gotoFlow, provider, endFlow }) => {
            reset(ctx, gotoFlow, 20000)
            // await provider.vendor.readMessages([ctx.key]);

            const flow = menuWelcomeFlows[ctx.body.toLowerCase()];

            if (flow) {
                stop(ctx);
                return gotoFlow(flow);
            }

            if (ctx.body.toLowerCase() === 'c') return endFlow();
        });
    