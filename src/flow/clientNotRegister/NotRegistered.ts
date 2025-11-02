import { addKeyword, EVENTS } from "@builderbot/bot";
import { UserModel } from "../../database/model/UserModelDb";
import { flowRegisteredClients } from "../ClientRegister/registered";
import axios from "axios";
import { Op } from "sequelize";
import { getPhoneFromContext } from "../../utils/jidHelper";

// Mapeo de prefijos a países y sus emojis
const countryCodes: Record<string, { code: string, emoji: string }> = {
  "593": { code: "ec", emoji: "🇪🇨" }, 
  "591": { code: "bo", emoji: "🇧🇴" }, 
  "57": { code: "co", emoji: "🇨🇴" }, 
  "52": { code: "mx", emoji: "🇲🇽" }, 
  "51": { code: "pe", emoji: "🇵🇪" },
  "54": { code: "ar", emoji: "🇦🇷" }, 
  "505": { code: "ni", emoji: "🇳🇮" }, 
  "504": { code: "hn", emoji: "🇭🇳" }, 
  "506": { code: "cr", emoji: "🇨🇷" }, 
  "507": { code: "pa", emoji: "🇵🇦" },
  "53": { code: "cu", emoji: "🇨🇺" }, 
  "56": { code: "cl", emoji: "🇨🇱" }, 
  "55": { code: "br", emoji: "🇧🇷" }, 
  "58": { code: "ve", emoji: "🇻🇪" }, 
  "1": { code: "us", emoji: "🇺🇸" }, 
  "34": { code: "es", emoji: "🇪🇸" },
  "1-268": { code: "ag", emoji: "🇦🇬" },   // Antigua y Barbuda
  "1-242": { code: "bs", emoji: "🇧🇸" },   // Bahamas
  "1-246": { code: "bb", emoji: "🇧🇧" },   // Barbados       // Cuba
  "1-809": { code: "do", emoji: "🇩🇴" },   // República Dominicana
  "1-473": { code: "gd", emoji: "🇬🇩" },   // Granada
  "509": { code: "ht", emoji: "🇭🇹" },      // Haití
  "1-876": { code: "jm", emoji: "🇯🇲" },   // Jamaica
  "1-787": { code: "pr", emoji: "🇵🇷" },   // Puerto Rico
  "1-869": { code: "kn", emoji: "🇰🇳" },   // San Cristóbal y Nieves
  "1-784": { code: "vc", emoji: "🇻🇨" },   // San Vicente y las Granadinas
  "1-868": { code: "tt", emoji: "🇹🇹" },   // Trinidad y Tobago
  "592": { code: "gy", emoji: "🇬🇾" },     // Guyana
  "597": { code: "sr", emoji: "🇸🇷" },     // Surinam
  "500": { code: "fk", emoji: "🇫🇰" },     // Islas Malvinas     // Islas Georgias del Sur
};

// Función para extraer el código del país desde el número y el emoji
function getCountryCode(number: string): { code: string, emoji: string } {
  const sortedCodes = Object.keys(countryCodes).sort((a, b) => b.length - a.length);
  const prefix = sortedCodes.find(code => number.startsWith(code));
  return countryCodes[prefix || ""] || { code: "xx", emoji: "🏳️" };
}

export const flowNoRegisteredClients = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { gotoFlow }) => {
    // Extract clean phone number from JID (handles both @lid and @s.whatsapp.net formats)
    const number = getPhoneFromContext(ctx);
    const { code, emoji } = getCountryCode(number);
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
      name = `cliente${count + 1}_${code} ${emoji}`;
    } else {
      // Si tiene nombre, agregamos el sufijo del país con el emoji
      name = `${name}_${code} ${emoji}`;
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
      if (process.env.N8N_SAVE_ENDPOINT) {
        try {
          await axios.post(`${process.env.N8N_SAVE_ENDPOINT}`, { name, number });
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
