import { addKeyword, EVENTS } from "@builderbot/bot";

export const fmiOffIpadsWinFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        "✔ Dispositivos por SN *Sin conexión*",
        "- iPad 2 (iPad2,1 / iPad2,4)",
        "- iPad mini (iPad2,5) - iPods",
        "- iPad (3ª gen) (iPad3,1)",
        "- iPad (4ª gen) (iPad3,4)",
        "- iPad mini 2 (iPad4,4 / iPad4,6)",
        "- iPad mini 3 (iPad4,7 / iPad4,9)",
        "- iPad Air (iPad4,1 / iPad4,3)",
        "- Apple Watch (1ª gen) (Watch1,1 / Watch1,2)",
    ])
    .addAnswer([
        "✔ Beneficios del servicio en Windows:",
        "✅ Rápido y seguro – Tecnología iRemoval Pro para Windows",
        "✅ Sin bypass – Eliminación total y definitiva",
        "✅ Fácil – Solo ingresa tu SN o usa Mina Tool en Windows",
        "✅ Compatible con Windows 10 y 11",
        "✅ Exclusivo – Para dueños de servidores",
        "tools: https://iremovalpro.com/",
    ]);