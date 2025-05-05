import { addKeyword, EVENTS } from "@builderbot/bot";
import { cpidSamsungOnlineF4UnlockFlow } from "./options/samsung-1-cpid-samsung-online-f4-unlock.flow";
import { samsungFrpOnlineFlow } from "./options/samsung-2-samsung-frp-online.flow";
import { samsungFrpOnlineDosFlow } from "./options/samsung-4-samsung-frp-online.flow";
import { byPassFullKgSamsung } from "./options/samsung-3-bypass-full-kg-samsung.flow";
import { samsungFrpImeiFlow } from "./options/samsung-5-frp-imei.flow";
import { reset, start, stop } from "../../../idle-custom";

const menuSamsungFlows = {
    '1': cpidSamsungOnlineF4UnlockFlow,
    '2': samsungFrpOnlineFlow,
    '3': byPassFullKgSamsung,
    '4': samsungFrpOnlineDosFlow,
    '5': samsungFrpImeiFlow,
};

export const opcion9samsungOnlineFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        '*SAMSUNG ONLINE* 💚💚💚',
        '*1* samsung cpid unlock/repair',
        '*2* sam frp *usb 2.3*',
        '*3* kg bypass full',
        '*4* sam frp *usb 1.9*',
        '*5* FRP por IMEI/SN',
    ],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
            reset(ctx, gotoFlow, 20000);
            await provider.vendor.readMessages([ctx.key]);

            const flow = menuSamsungFlows[ctx.body.toLowerCase()];

            if (flow) {
                stop(ctx);
                return gotoFlow(flow);
            }

            if (ctx.body.toLowerCase() === 'c') return endFlow();

            return fallBack('Escoge una de las opciones anteriores o escribe *c* para cancelar');
        }
    );

export const opcion9SamsungOnlineMenuFLOWS = [
    opcion9samsungOnlineFlow,
    cpidSamsungOnlineF4UnlockFlow,
    samsungFrpOnlineFlow,
    byPassFullKgSamsung,
    samsungFrpOnlineDosFlow,
    samsungFrpImeiFlow
]