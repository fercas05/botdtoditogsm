import { addKeyword, EVENTS } from "@builderbot/bot";

export const movistarFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([  
        '*✅️ Desbloqueo No Registro Movistar 🇨🇴*',
        '',
        '📶 *Movistar* 📶',
        '',
        '*Tiempo:* 1 a 92 horas hábiles',
        '',
        'Requisitos:',
        '1. IMEI escrito.',
        '2. Solo estar reportado por Movistar.',
        '3. Realizar un *clean mundial check* https://imeipro.info',
        '4. *Opcional* 🥳✅ Enviar el número Movistar del cliente.',
        '5. *Opcional* 🥳✅ Enviar los datos del cliente para que quede a nombre de él preferiblemente.',
        '',
        '💚 *Fuente Directa* 💚',
    ]);
