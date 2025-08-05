import { addKeyword, EVENTS } from "@builderbot/bot";

export const tigoFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([  
        '✅️ *Desbloqueo No Registro Tigo 🇨🇴* ✅️',
        '',
        '📶 *Tigo* 📶',
        '',
        '*Tiempo:* 24 a 72 horas',
        '',
        '*Requisitos:*',
        '1. Solo estar reportado por Tigo.',
        '2. Realizar un *clean mundial check* https://imeipro.info',
        '3. Enviar IMEI escrito y modelo.',
        '',
        '💚 *Fuente Directa* 💚',
    ])