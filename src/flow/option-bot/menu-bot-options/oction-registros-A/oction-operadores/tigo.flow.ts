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
    .addAnswer("Foto de ejemplo:", {
        media: "https://i.postimg.cc/JnnHz2sY/Imagen-de-Whats-App-2025-05-04-a-las-21-19-46-b1a75820.jpg",  // Usando la URL que proporcionaste
    });