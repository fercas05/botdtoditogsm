import { addKeyword, EVENTS } from "@builderbot/bot";

export const motoFastSoloPinFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([

        '*MOTO FASTBOOT MDM SOLO PIN/FRP*',

        '',
        '*1* descargar y ejecutar *usb redirector 1.9.7*',
        'https://mega.nz/file/7MsRiJ6A#RwcATxfWOJobTEse805NZ11jLWEZXkkO_ML-6Tdf2Bw',
        '*video tutorial conectar usb 1.9*',
        'https://www.youtube.com/watch?v=apPFdjoPvmc',
        '',
        '*2* copiamos DNS y pegamos en el *usb redirector*',

        'pegar este sin *https://*',
        'solo DNS👉🏽 *motofrpmdm.ddnz.me*',
        '',
        '*3* 💻 *CONEXION*',
        '',
        '*fastboot*',
        '',
        '*4* saber mi ip http://Ping.eu',
    ])
    .addAnswer([
        '━━   *comfirmar paso 2*  ━━',
        '*👇🏻enviar en un solo sms👇*',
    ])
    .addAnswer([
        '*ip* 69.15.60.10',
        '*sn* DFGYSDFHYT',
        '*especificar* mdm',
    ])