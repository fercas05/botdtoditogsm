import { addKeyword, EVENTS } from "@builderbot/bot";
import { motoFastBootLatamFlow } from "./option-tools/moto1-moto-fast-boot-latam.flow";
import { mtkMotoModeFlow } from "./option-tools/moto2-mtk-moto-mode.flow";
import { motoUSAOnlineFlow } from "./option-tools/moto3-moto-usa-online.flow";
import { motoFastSoloPinFlow } from "./option-tools/moto4-moto-fastboot-mdm-solo-pin-frp.flow";
import { conexionMtkModeFlow } from "./option-tools/moto5-conexion-mtk-mode.flow";
import { reset, start, stop } from "../../../idle-custom";
import { menuBotFlow } from "../../menu-bot.flow";

const menuMotorola = {
    "1": motoFastBootLatamFlow,
    "2": mtkMotoModeFlow,
    "3": motoUSAOnlineFlow,
    "4": motoFastSoloPinFlow,
    "5": conexionMtkModeFlow
};

export const opcion3MotorolaMenuFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        '*1* fastboot repair❌',
        '*2* mtk/spd/g22',
        '*3* usa 🇺🇸❌',
        '*4* fastboot mdm/frp',
        '*5* e13-g13-g23',
        '*#* Menú principal'
    ], { capture: true },
        async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
            reset(ctx, gotoFlow, 20000);
            await provider.vendor.readMessages([ctx.key]);

            if (ctx.body === "#") {
                return gotoFlow(menuBotFlow);
            }

            const flow = menuMotorola[ctx.body.toLowerCase()];

            if (flow) {
                stop(ctx);
                return gotoFlow(flow);
            }

            if (ctx.body.toLowerCase() === 'c') return endFlow();

            return fallBack('Escoge una de las opciones anteriores o escribe *c* para cancelar');
        });

export const opcion3motorolaMenuFLOWS = [
    opcion3MotorolaMenuFlow,
    motoFastBootLatamFlow,
    mtkMotoModeFlow,
    motoUSAOnlineFlow,
    motoFastSoloPinFlow,
    conexionMtkModeFlow
];
