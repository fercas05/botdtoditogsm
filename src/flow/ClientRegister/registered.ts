import { addKeyword, EVENTS } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { menuWelcomeFlow } from "../menuWelcome.flow";
import axios from "axios";

export const flowRegisteredClients = addKeyword<BaileysProvider>(
  EVENTS.ACTION
).addAction(async (ctx, { flowDynamic, gotoFlow, provider }) => {
  const name = ctx.pushName || "Cliente";
  
  // Array de 8 saludos aleatorios
  const greetings = [
    `¡Hola *${name}* ¿Cómo estás hoy?`,
    `¡Bienvenido *${name}* ¿Qué novedades traes?`,
    `¡Hola *${name}* Es un placer tenerte de vuelta.`,
    `¡Saludos, *${name}* ¿En qué te puedo ayudar?`,
    `¡Qué alegría verte, *${name}* ¿Cómo te va?`,
    `¡Hola *${name}* ¿Listo para comenzar?`,
    `¡Bienvenido de nuevo, *${name}* ¿En qué podemos colaborar?`,
    `¡Hola *${name}* Esperamos que tengas un día espectacular.`
  ];
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  await flowDynamic(randomGreeting);
  
  return gotoFlow(menuWelcomeFlow);
});


// const saveInGoolgeContact = async (name: string, phone: string, provider: BaileysProvider) => {
//   const newContact = {
//     firstName: name,
//     lastName: "CLIENTE",
//     phoneNumber: phone
//   }

//   try {
//     const response = await axios.post(URL_GOOGLE_CONTACTS_API, newContact);
//     console.log("Response: ", response.data);
//     if (response.status == 201) {
//       const gmessage = `[BOTmagicDigUNLOCK] *${name}*  - *${phone}* \n se ha guardado en GOOGLE CONTACTS`
//       try {
//         await provider.sendText(WHATSAPP_CHAT_GROUP_ID, gmessage);

//       } catch (error) {
//         console.error("Error enviando mensaje de contacto guardado:", error);
//       }
//     } else {
//       console.info("El usuario ya esta guardado");
//     }

//   } catch (error) {
//     console.log("Error al guardar en google contacts: ", error);
//   }
// }
