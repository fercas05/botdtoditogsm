import { addKeyword, EVENTS } from "@builderbot/bot";

export const xiaomiAuthOnFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*xiaomi auth on*',
        '',
        'Requisitos',
        'Descarga ',
        '',

        'preguntar que tools',

        '1 *reiniciar pc antes de cada proceso*',
        '2 *⚠️borrar provision.xlm de la eng o global*',
        '3 *Cuenta mi off*',
        '4 *Batería al 50%*',
        '5 *Firmware listo✅*',
        '6 *Conectar tp con batería conetada*',
        '7 *desactivar antivirus*',
        '8 *Enviar any desck*',
        '',
        '*escrito*',
        '',
        'recuerda que vendemos credito en nuestra web',
    ])