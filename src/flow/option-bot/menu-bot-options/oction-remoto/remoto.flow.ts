import { addKeyword, EVENTS } from "@builderbot/bot";

export const AnydeskFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        "📌 *Cómo recibir soporte:*",
        "1️⃣ Descarga AnyDesk: https://mega.nz/file/eFVjEKZJ#E6FS5pDZK3UxvGzw0JEdlg6kOEBUz1Av9B1jOBWiXZI",
        "2️⃣ *Importante:* Ejecuta como *admin*",
        "3️⃣ Activa el *ojito*",
        "4️⃣ Copia el número de conexión.",
        "5️⃣ Envíanos el número escrito.",
    ])
    .addAnswer([
        "✔ *Beneficios:*",
        "✅ Soporte 100% remoto.",
        "✅ Rápido y seguro.",
        "❌ No cerrar conexión durante la asistencia.",
    ]);
