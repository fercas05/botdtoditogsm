import { addKeyword, EVENTS } from "@builderbot/bot";

export const removerCuentaRaizFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*Remover cuenta mi de raiz*',

        'Colombia 🇨🇴',
        'Chile 🇨🇱',
        'Ecuador 🇪🇨',
        'México 🇲🇽',
        'Peru 🇵🇪',
        'Argentina 🇦🇷',
        'Panama 🇵🇦',
        'Japón 🇯🇵',
        'Egipto 🇪🇬',
        'Europa',
        'brasil🇧🇷',
        '*ww mundial cualquier pais*🗺️',

        'enviar  lockcode o imei',
        '',
        '⚠️ *CLEAN*⚠️ ',

        '*Pregunta es un gusto ayudarte equipo DT-unlock*',
    ])
