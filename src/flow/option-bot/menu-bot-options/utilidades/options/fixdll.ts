import { addKeyword, EVENTS } from "@builderbot/bot";
import { menuBotFlow } from "../../../menu-bot.flow"; 

// Flujo para mostrar los enlaces
export const fixdllflow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*Fix PC recién formateadas:*',
        '👉 Falta de .dll: https://www.mediafire.com/file/ryt6ztpow8kvagu',
        '💻 Página de Facebook: https://www.facebook.com/share/1LndEDBkmP',
        '📲 Canal de Telegram: https://t.me/DTodito_gsm',
    ])
    .addAction(async (ctx, { gotoFlow }) => {
        if (ctx.body === '#') {
            return gotoFlow(menuBotFlow);  // Redirige al menú principal si se escribe "#"
        }
        return '*#* menú principal';
    });
