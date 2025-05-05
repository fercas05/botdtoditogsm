import { addKeyword, EVENTS } from "@builderbot/bot";

export const womFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([  
        '✅️*No Registro WOM 🇨🇴*✅️',
        '',
        '📶 *WOM* 📶',
        '',
        '*Tiempo:* 24 a 72 horas hábiles',
        '',
        'Requisitos:',
        '1. IMEI escrito.',
        '2. Solo estar reportado por WOM.',
        '3. Realizar un *clean mundial check*', 
        'https://imeipro.info',
        '',
        'Ejemplo:',
        '1️⃣ *IMEI:* 5475265xxxx',
        '2️⃣ *MODELO:* iPhone 11 Pro Max',
        '3️⃣ *OPERADOR:* WOM',
        '💚 *Fuente Directa* 💚',
        '',
    ]);
