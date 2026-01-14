import { addKeyword, EVENTS } from "@builderbot/bot";

export const infoServiciosFlow = addKeyword(EVENTS.ACTION).addAnswer([
  "🌟 *PRINCIPALES SERVICIOS* 🌟",
  "📅 24/7 - Rápidos y Furiosos 🚀",
  "",
  "💳 *Créditos y Activaciones*",
  "🌍 Todos los países",
  "",
  "💻 *Servicios Remotos Online*:",
  "🔓 Remover cuentas Mi",
  "🔓 Remover cuentas Google",
  "🔓 Unlock (desbloqueo)",
  "🔧 Desbrick (desbloqueo de dispositivos)",
  "🔧 Reparación",
  "🔧 Bypass",
  "",
  "📱 Apple, Samsung, Xiaomi, Nokia",
  "🌐 Recuperación de señal y mucho más",
  "",
  "Saludos, *Equipo DT-unlock* 🤝",
  "",
  "🌐 Web: https://dtodito-gsm.com",
  "📢 Canal Telegram: https://t.me/DTodito_gsm",
  "📞 *WhatsApp general*: https://wa.me/573208127538",
  "📞 *WhatsApp Ventas*: https://wa.me/573144243400", // Soporte de ventas
]);

export const infoSoporteFlow = addKeyword(EVENTS.ACTION).addAnswer([
  "*¡Hola, un gusto saludarte!*",
  "",
  "En breves te atenderé, pero",
  "puedes ir diciéndome en qué",
  "estás interesado/a.",

  "*ɴᴏ ᴏʟᴠɪᴅᴇs ᴀɢᴇɴᴅᴀʀᴍᴇ*",
  "💚 ᴳʳᵃᶜⁱᵃˢ ᵖᵒʳ ᶜᵒⁿᵗᵃᶜᵗᵃʳᵐᵉ 💚",
  "*•━━━━━━━━━━━━━━•*",
]);

export const infoFLOWS = [infoServiciosFlow, infoSoporteFlow];
