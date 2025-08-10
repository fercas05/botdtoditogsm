import { createBot } from "@builderbot/bot";
import { PORT } from "./config/environment";
import { adapterDB } from "./database";
import "./database/Config/init";
import { adapterProvider } from "./provider";
import { adapterFlow } from "./flow/index";
import { initializeBlacklist, isBlacklisted } from "./flow/blacklistSetup";

const main = async () => {
    const bot = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    // Inicializa la lista negra al iniciar el bot
    initializeBlacklist();

    const { httpServer, provider } = bot;

    // Evento para verificar si el mensaje proviene de un número en la blacklist
    provider.on("receive_message", async ({ from, body, name }) => {
        if (isBlacklisted(from)) {
            console.log(`Mensaje bloqueado de ${from} (en la lista negra)`);
            return; // Detiene el procesamiento del mensaje si el número está en la lista negra
        }
        console.log(`Mensaje recibido de ${from}: ${body}`);
        // Aquí sigue el procesamiento normal de mensajes para números que no están en la lista negra
    });

    bot.on("send_message", ({ answer, from }) => {
        console.log(`Send Message Payload:`, { answer, from });
    });

    httpServer(+PORT);
};

main();
