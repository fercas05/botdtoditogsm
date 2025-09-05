import { addKeyword } from "@builderbot/bot"

export const pagoNequiFlow = addKeyword(['nequi', 'bancolombia', 'daviplata'])
    .addAnswer([
        '*🇨🇴PAGO COLOMBIA🇨🇴*',

        '👇TASA PARA LOS QUE PAGAN EN USD👇',
        'https://www.larepublica.co/indicadores-economicos/mercado-cambiario/dolar',
        '',
        'ESCRIBIR 👉🏻 *PAGOQR*',
        'ESCRIBIR 👉🏻 *TARJETAVISA*',
        'ESCRIBIR 👇👇👇',
        '*llavescolombia*', '*llaves*', '*bre-b*',
        '',
        '*3208127538*  nequi',
        '*3208127538*  davi plata',
        '',
        '🙂*nequi llave* @edilson727',
        '',
        '*45346520781* bancolombia ahorros',
        '',
        'ADJUNTAR COMPROBANTE DE PAGO CLARO Y VISIBLE',
        '',
        '💚*enviar *QR* para comprobar pago*',
        '',
        '*cuenta personales no terceros*',

        '*cargar automatico* https://youtu.be/G_o_oKX_qOo',
        
    ])
    .addAnswer(['@edilson727'])
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])

export const pagoPeruFlow = addKeyword(['yape', 'bcp']).addAnswer([
    '*peru*',
    '*yape 915149938*',
    'plin 970113975',
    'juan flores',
    'bcp',
    '*37503450530041*',
    'JUAN DANIEL FLORES ALVINO',

    '*cuenta personales no terceros*',
])
.addAnswer([
    '🚫*importante sin comcepto pago*🚫',
])

export const pagoBrasilFlow = addKeyword('pix')
    .addAnswer([
        '*🇧🇷PAGOS BRASIL🇧🇷*',
        '',
        '*PESOS DOLAR GOOGLE*',
        'Pix Banco Nubank',
        '*6ae05c4b-2d17-4b16-b288-f93a35dccefc*',
        '👆🏻Llave aleatoria👆🏻',
    ])
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])

export const pagoVenezuelaFlow = addKeyword(['Bs', 'bs', 'pago movil', 'Pago movil'])
.addAnswer([
    '*DOLAR PARALELO*',
    'https://monitordolarvenezuela.com/precio-dolar-hoy',
    '',
    '*🇻🇪-venezuela🇻🇪*',
    '01020742810000245632',
    'C.i 23052270',
    'Jerlys Arrieche',
    'Tlf *04120446582*',
    '',
    '*cuenta personales no terceros*',
    '',
    '*enviar comprobante monto total*',
    ])
    .addAnswer([
        '🚫*importante sin concepto de pago*🚫',
    ]);

export const pagoEcuadorFlow = addKeyword('pichincha')
    .addAnswer([
        '*MONEDA USD*',
        '',
        '*🇪🇨 ecuador pichincha 🇪🇨*',
        'Banco Pichincha',
        'cuenta de ahorros *2205689645*',
        'Wellington Sanchez *C.I 1805265657*',
        '*cuenta personales no terceros*',
    ])
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])

export const pagoBoliviaFlow = addKeyword(['tigo money', 'bnb']).addAnswer([
    '🇧🇴- *PAGO BOLIVIA YAPE*',
    'https://www.dolarbluebolivia.click/#Calculadora',
    'DOLAR 16bs',
    'DOLAR binance ',
    'NO PONER NADA ES DESCRICION',
    'NO SE VALIDARA EL PAGO',
])
    .addAnswer("yape bolivia",
        {
            media: "https://i.ibb.co/KDLgJpH/Whats-App-Image-2024-11-11-at-5-41-25-PM.jpg",
        }
    )
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])
export const pagoargentinaFlow = addKeyword('uala')
    .addAnswer([
        '🇦🇷-argentina',
        '*PAGOS ARGENTINA*',
        'https://www.dolarbluebolivia.click/#Calculadora',
        '',
        'Alias: ALANZ20.UALA',
        'Cvu: *0000007900204160360055*',
        'uala',
        'rápi pago o pago fácil tiene que',
        'mandar este documento: 41.603.600',
        'Nombre: alan zapata',
        '1430001713006390410018 brubank',
        '*Dolar blue* + 8% DE INPUESTO',
        '*cuenta personales no terceros*',
    ])
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])

export const pagomexicoFlow = addKeyword(['bancomer', 'oxxo', 'bbva'])
    .addAnswer([
        '*🇲🇽PAGO MEXICO🇲🇽*',
        '',
        'Tarjeta de débito:', 
        '4152 3142 5308 4845',
        '',
        'jorge romero',
        'BBVA  20.5= 1 usd',
        '*cuenta personales no terceros*',

        '*enviar comprobante monto total*',
    ])
    .addAnswer(['*4152 3141 3394 2337*',
        'Rosaura Barbosa S.',
        'bamcomer 20.5= 1 usd',
        '*montos superiores a 100 usd*',
        '*cuenta personales no terceros*',

        '*enviar comprobante monto total*',

    ])
    .addAnswer([
        '🚫*importante sin comcepto pago*🚫',
    ])

export const pagoChileFlow = addKeyword('falabella')
    .addAnswer([
        'PAGA BINANCE SIN COMICIONES',
        '*binance* *skrill* *airtm*',
    ]);

export const binancepayFlow = addKeyword(['binance pay', 'binance']).addAnswer([
    '*Binance pay*',
    'Pay ID *45455956*',
    'Correo 1 yupifff@gmail.com',
    'Correo 2',
    'bilitcastillo@hotmail.com',
    '*TRC20* TZ51435P3oXj2xzTuVUe6Sy7Tw4NJ4HFT9',
]);

export const pagoQRFlow = addKeyword('PAGOQR')
    .addAnswer("QR",
        {
            media: "https://i.postimg.cc/VLyLftxs/nuevo-qr.png",
        }
        
    );
    
export const pagoTarjeta = addKeyword('TARJETAVISA')
    .addAnswer([
        '*Pago con Tarjeta* 💳',

        '⚠️ *Importante:* el pago con tarjeta tiene un porcentaje 4.5 adicional.',
        'Consulta los detalles aquí 👉 https://dtodito-gsm.com/porcentaje',
        '',
        'Puedes pagar de forma segura usando el siguiente enlace:',
        '👉 https://checkout.wompi.co/l/VPOS_r4M81D',
        '',
    ]);

export const pagoLlavesColombia = addKeyword(['llavescolombia', 'llaves', 'bre-b'])
  .addAnswer([
    '🚀 Pagos con llave Bre‑B',
    'llegan al instante,',
    'sin costo'
  ])
  .addAnswer(['@edilson727'])

export const metodosDePagoFLOWS = [
 pagoNequiFlow,
 pagoPeruFlow,
 pagoBrasilFlow,
 pagoVenezuelaFlow,
 pagoEcuadorFlow,
 pagoBoliviaFlow,
 pagoargentinaFlow,
 pagomexicoFlow,
 pagoChileFlow,
 binancepayFlow,
 pagoQRFlow,
 pagoTarjeta,
 pagoLlavesColombia
]