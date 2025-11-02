import { addKeyword, EVENTS } from "@builderbot/bot";
import { getData } from "../../database/repository/user.repository";
import { UserModel } from "../../database/model/UserModelDb";
import { flowNoRegisteredClients } from "../clientNotRegister/NotRegistered";
import { flowRegisteredClients } from "../ClientRegister/registered";
import { getPhoneFromContext } from "../../utils/jidHelper";

export const flowWelcome = addKeyword(['BUENAS', 'Buenas', 'buenas',
    'Ola', 'OLA', 'hola', 'ola', 'HOLA', 'Hola',
    'buenos días', 'Buenos días', 'BUENOS DÍAS',
    'buenas tardes', 'Buenas tardes', 'BUENAS TARDES',
    'buenas noches', 'Buenas noches', 'BUENAS NOCHES',
    'saludos', 'Saludos',
    'qué tal', 'Qué tal', 'QUÉ TAL']).addAction(
  async (ctx, { gotoFlow }) => {
    try {
      // Extract clean phone number from JID (handles both @lid and @s.whatsapp.net formats)
      const phoneNumber = getPhoneFromContext(ctx);
      const data = await getData({ number: phoneNumber }, UserModel);
      if (data) {
        return gotoFlow(flowRegisteredClients);
      }
    } catch (error) {
      console.error("Error en flowwelcome:", error);
    }
    return gotoFlow(flowNoRegisteredClients);
  }
);
