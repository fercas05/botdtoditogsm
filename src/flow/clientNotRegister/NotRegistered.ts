import { addKeyword, EVENTS } from "@builderbot/bot";
import { UserModel } from "../../database/model/UserModelDb";
import { flowRegisteredClients } from "../ClientRegister/registered";
import axios from "axios";
import { Op } from "sequelize";

// Mapeo de prefijos a países
const countryCodes: Record<string, string> = {
  "593": "ec", "591": "bo", "57": "co", "52": "mx", "51": "pe",
  "54": "ar", "505": "ni", "504": "hn", "506": "cr", "507": "pa",
  "53": "cu", "56": "cl", "55": "br", "58": "ve", "1": "us", "34": "es"
};

// Función para extraer el código del país desde el número
function getCountryCode(number: string): string {
  const sortedCodes = Object.keys(countryCodes).sort((a, b) => b.length - a.length);
  const prefix = sortedCodes.find(code => number.startsWith(code));
  return countryCodes[prefix || ""] || "xx";
}

export const flowNoRegisteredClients = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { gotoFlow }) => {
    const number = ctx.from;
    const country = getCountryCode(number);
    let name = ctx.pushName?.trim();

    const existingUser = await UserModel.findOne({ where: { number } });

    if (!name) {
      // Si no hay nombre, generamos uno automático
      const count = await UserModel.count({
        where: {
          number: {
            [Op.startsWith]: number.slice(0, 3),
          },
        },
      });
      name = `cliente${count + 1}_${country}`;
    } else {
      // Si tiene nombre, agregamos el sufijo del país
      name = `${name}_${country}`;
    }

    if (existingUser) {
      // Si existe pero el nombre es diferente, actualizamos
      if (existingUser.name !== name) {
        existingUser.name = name;
        await existingUser.save();
      }
    } else {
      // Si no existe, lo creamos
      await UserModel.create({ name, number });
      if(process.env.N8N_SAVE_ENDPOINT) {
        try {
          await axios.post(`${process.env.N8N_SAVE_ENDPOINT}/api/v1/users`, { name, number });
          console.log("Usuario guardado en N8N");
        } catch (error) {
          console.error("Error al guardar el usuario en N8N:", error);
        }
      } else {
        console.log("N8N_SAVE_ENDPOINT no está configurado");
      }
    }

    return gotoFlow(flowRegisteredClients);
  }
);
