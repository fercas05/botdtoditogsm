import { addKeyword, EVENTS } from "@builderbot/bot";

export const fmiOffIpadsFlow = addKeyword(EVENTS.ACTION)
    
    .addAnswer([
        "📌 *FMI OFF - Lista de dispositivos compatibles*",
        "✔ Dispositivos con verificación (Usar Mina Tool):",
        "- iPad mini 4 (iPad5,1)",
        "- iPad Air 2 (iPad5,3)",
        "- iPad (5ª gen) (iPad6,11)",
        "- iPad Pro (12.9) (iPad6,7)",
        "- iPad Pro (9.7) (iPad6,3)",
        "- iPad (6ª gen) (iPad7,5)",
        "- iPad (7ª gen) (iPad7,11)",
        "- iPad Pro (12.9, 2ª gen) (iPad7,1)",
        "- iPad Pro (10.5) (iPad7,3)",
    ])
    .addAnswer([
        "✔ Dispositivos por SN (Sin conexión a herramientas):",
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
        "✔ Beneficios del servicio:",
        "✅ Rápido y seguro – Tecnología iRemoval Pro",
        "✅ Sin bypass – Eliminación total y definitiva",
        "✅ Fácil – Solo ingresa tu SN o usa Mina Tool",
        "✅ Exclusivo – Para dueños de servidores",

        "tols https://mega.nz/file/nG5zkLDT#OOWEHr2pP0aY44zWqXbiV2dP9xIGho-iBLqbRiSFc04"
    ]);
