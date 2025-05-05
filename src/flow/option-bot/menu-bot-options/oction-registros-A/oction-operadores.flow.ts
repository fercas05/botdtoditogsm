import { addKeyword, EVENTS } from "@builderbot/bot";
import { claroFlow } from "./oction-operadores/claro.flow";
import { movistarFlow } from "./oction-operadores/movistar.flow";
import { tigoFlow } from "./oction-operadores/tigo.flow";
import { womFlow } from "./oction-operadores/won.fow";
import { virginFlow } from "./oction-operadores/virgin.flow";
import { combinadosFlow } from "./oction-operadores/convinado.flow";
import { reset, start, stop } from "../../../idle-custom";

// Mapeo de las opciones de operadores
const menuFlows = {
    "1": claroFlow,
    "2": movistarFlow,
    "3": tigoFlow,
    "4": womFlow,
    "5": virginFlow,
    "6": combinadosFlow
}

// Flujo principal para seleccionar operador
export const opcionOperadoresColombiaMenuFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 20000))
    .addAnswer([
        '*1* Claro🇨🇴',
        '*2* Movistar🇨🇴',
        '*3* Tigo🇨🇴',
        '*4* Wom Colombia 🇨🇴',
        '*5* Virgin Mobile 🇨🇴',
        '*6* convinados 🇨🇴',

    ], { capture: true },
    async (ctx, { fallBack, gotoFlow, provider, endFlow }) => {
        reset(ctx, gotoFlow, 20000);
        await provider.vendor.readMessages([ctx.key]);

        const flow = menuFlows[ctx.body.toLowerCase()];

        if (flow) {
            stop(ctx);
            return gotoFlow(flow);
        }

        if (ctx.body.toLowerCase() === 'c') return endFlow();

        return fallBack('Por favor, selecciona una de las opciones anteriores o escribe *c* para cancelar');
    }
);

export const opcionOperadoresColombiaMenuFLOWS = [
    opcionOperadoresColombiaMenuFlow,
    claroFlow,
    movistarFlow,
    tigoFlow,
    womFlow,
    virginFlow,
    combinadosFlow
]
