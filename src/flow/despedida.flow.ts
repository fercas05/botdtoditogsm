import { addKeyword, EVENTS } from "@builderbot/bot";
import { getData } from "../database/repository/user.repository";
import { UserModel } from "../database/model/UserModelDb";
import { flowNoRegisteredClients } from "./clientNotRegister/NotRegistered";
import { flowRegisteredClients } from "./ClientRegister/registered";

export const flowDespedida = addKeyword(['chao', 'hasta luego', 'adiós', 'nos vemos', 'bye',
    'ciao', 'adios', 'farewell', 'bye bye', 'see ya'])
 
.addAction(async (ctx, { gotoFlow, flowDynamic }) => {
  const name = ctx.user?.name || "amigo/a";

  // Mensajes de despedida para usuarios registrados
  const farewellRegistered = [
    `¡Gracias por visitarnos, ${name}! ¡Hasta pronto!`,
    `¡Un gusto haberte atendido, ${name}! Vuelve cuando quieras.`,
    `¡Hasta la próxima, ${name}! Cuídate mucho.`,
    `¡Nos vemos pronto, ${name}! Gracias por confiar en nosotros.`,
    `¡Que tengas un excelente día, ${name}! ¡Hasta pronto!`,
    `¡Adiós, ${name}! Esperamos verte nuevamente.`,
    `¡Hasta luego, ${name}! Recuerda que siempre estamos aquí para ayudarte.`,
    `¡Cuídate, ${name}! Gracias por pasar por aquí.`
  ];

  try {
    const data = await getData({ number: ctx.from }, UserModel);
    if (data) {
      const message = farewellRegistered[Math.floor(Math.random() * farewellRegistered.length)];
      await flowDynamic(message);
      return gotoFlow(flowRegisteredClients);
    }
  } catch (error) {
    console.error("Error en flowDespedida:", error);
  }

  // Si el usuario no está registrado, se envía un mensaje predeterminado.
  await flowDynamic(`¡Gracias por visitarnos, ${name}! ¡Hasta pronto!`);
  return gotoFlow(flowNoRegisteredClients);
});
