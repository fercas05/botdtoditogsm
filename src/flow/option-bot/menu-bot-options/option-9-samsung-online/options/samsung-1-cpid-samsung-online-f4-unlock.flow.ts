import { addKeyword, EVENTS } from "@builderbot/bot";

export const cpidSamsungOnlineF4UnlockFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*CPID SAMSUNG ONLINE F4-UNLOCK*',
        '',
        '*enviar modelo + binario + parche de seguridad*',
        '',
        '*1* ⬇DESCARGAR USB REDIRECTOR⬇',
        'https://mega.nz/file/ZUYmxZxL#Tgi8ciWMNZmknpzXSUl9isf1yJhbbXNFsL1CQrCRszQ',
        '*video tutorial conectar usb 1.9*',
        'https://www.youtube.com/watch?v=apPFdjoPvmc',
        '',
        '*2* copiamos *DNS* y pegamos en el *usb redirector*',

        'pegar este sin *https://*',

        '*DNS👉🏽* server 1 *cpids1.ddns.net*',

        '*DNS👉🏽* server 2 *cpids2.ddns.net*',

        '',
        '*3* *CONEXION* depuracion adb activa',
        '',
        '*4* saber mi ip http://Ping.eu',
    ])
    .addAnswer([
        '⛔️⛔️ *Una advertencia muy importante* ⛔️⛔️',
        'retire la tarjeta SIM y apague el Wi-Fi del teléfono antes de trabajar',
        '(Si udted omite esto, ❌ *Ya no hay reembolso* ❌ Tenga cuidado)',
    ])
    .addAnswer([
        '━━   *comfirmar paso 2*  ━━',
        '*👇🏻enviar en un solo sms👇*',
    ])
    .addAnswer([
        '*ip*',
        '*sn*',
        '*modelo  tecnico*',
        '*operacion* UNLOCK o f4',
        '🆕 *f4 1*',
        '🆕 *f4 2*',
        '❌❌enviar f4 a colocar❌❌',
    ])

