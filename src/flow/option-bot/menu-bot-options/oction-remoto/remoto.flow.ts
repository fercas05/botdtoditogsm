import { addKeyword, EVENTS } from "@builderbot/bot";

export const AnydeskFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        "📌 *Cómo recibir soporte:*",
        "1️⃣ Descarga AnyDesk: [Aquí](https://www.mediafire.com/file/wrr1d7a3r5f003j/AnyDesk_%25281%2529.exe/file)",
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
