import { addKeyword, EVENTS } from "@builderbot/bot";

export const combinadosFlow = addKeyword(EVENTS.ACTION)
    .addAnswer([  
        '*No registros 🇨🇴*',
        '✅️ *Desbloqueo No Registro* ✅️',
        'Los desbloqueos combinados son más costosos.',
        '',
        'Por favor, selecciona una de las siguientes opciones:',
        'Movistar + Tigo',
        'Claro + Movistar',
        'Tigo + Movistar',
        'Claro + Tigo',
        '',
        '*pregunta precio*.',
    ]) 