import { addKeyword, EVENTS } from "@builderbot/bot";

export const samsungFrpImeiFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*FRP SAMSUNG BY IMEI/SN*',
        '',
        '✅ *SI HAY REEMBOLSO*',
        '✅ *BLACK LIST SOPORTADO*',
        '✅ *KG SOPORTADO*',
        '✅ SERIE S25 *24USD*',
        '',
        '⚠️ *NO SOPORTADOS FRP POR IMEI*',
        '❌ SM-A107F/DS',
        '❌ SM-A025M/DS',
        '❌ SM-A207M/DS',
        '❌ Todas las series A145 y JDM',
        '❌ SM-A145M/DS',
        '❌ SM-A146M/DS',
        '❌ SM-A057M/DS',
        '❌ SM-A226B/DS',
        '❌ SM-A055M/DS',
        '❌ SM-A042M/DS',
        '',
    ])
    .addAnswer([
        '⏱ *Tiempo*: 1-10 min',
        '*Enviar*: Pago + IMEIS / SN'
    ]);
