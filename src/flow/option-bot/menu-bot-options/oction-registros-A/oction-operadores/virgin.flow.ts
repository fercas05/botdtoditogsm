import { addKeyword, EVENTS } from "@builderbot/bot";

export const virginFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([  
        '✅️*No Registro Virgin 🇨🇴*✅️',
        '',
        '📶 *Virgin* 📶',
        '',
        '*Tiempo:* 24 a 72 horas hábiles',
        '',
        'Requisitos:',
        '1. Imei escrito.',
        '2. Solo estar reportado por Virgin.',
        '3. Realizar un *clean mundial check*',
        '👉https://imeipro.info👈',
        '💚 *Fuente Directa* 💚',
        '',

        'Ejemplo:',
        '1️⃣ *IMEI:* 5475265xxxx',
        '2️⃣ *MODELO:* iPhone 11 Pro Max',
        '3️⃣ *OPERADOR:* Virgin',
        '',
    ]);
