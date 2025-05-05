import { addKeyword, EVENTS } from "@builderbot/bot";

export const samsungFrpOnlineFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*SAMSUNG FRP ONLINE*',
        '',
        '*1* Descargar y ejecutar *USB Redirector 2.3*',
        '👇🏽 👇🏽 👇🏽 👇🏽 👇🏽 👇🏽',
        'https://www.incentivespro.com/downloads/usb-redirector-customer-module.exe',
        '',
        'ABRES USB 2.3 HAY 2 CAMPOS',
        '',
        'primer campo, *1027 3109 5422*',
        '',
        'segundo campo, *SN + MODEL + NAME*',
        '',
        '(emergencia *#06# así lo obtiene)',
        '',
        'enviar información; como la del ejemplo..*obligado!*',
    ])
    .addAnswer([
        '━━   *Confirmar Paso 2*  ━━',
        '*👇🏻Enviar en un solo SMS👇*',
    ])
    .addAnswer([
        '*EJEMPLO*',
        'modelo técnico',
        '*R55T71XS71T G570M + SU NOMBRE*',
    ]);