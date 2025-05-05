import { createFlow } from "@builderbot/bot";
import { botAtajoFLow, menuWelcomeFlow } from "./menuWelcome.flow";
import { flowNoRegisteredClients } from "./clientNotRegister/NotRegistered";
import { flowWelcome } from "./welcome/welcome";
import { flowRegisteredClients } from "./ClientRegister/registered";
import { idleFlow } from "./idle-custom";
import { handlerFLOWS } from "./handlers/manejador-multimedia.flow";
import { metodosDePagoFLOWS } from "./medios de pago/metodo-pago.flow";
import { infoFLOWS } from "./info-soporte-servicios/info.flow";
import { menuBotFLOWS } from "./option-bot/menu-bot.flow";


export const adapterFlow = createFlow([
    menuWelcomeFlow,
    botAtajoFLow,
    flowNoRegisteredClients,
    flowWelcome,
    flowRegisteredClients,
    idleFlow,
    ...handlerFLOWS,
    ...metodosDePagoFLOWS,
    ...infoFLOWS,
    ...menuBotFLOWS,
]);
