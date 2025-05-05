// src/flow/blacklistSetup.ts

// Simulando una lista negra en memoria (esto puede cambiar según la implementación de tu base de datos)
const blacklist: Set<string> = new Set();  // Cambiado de let a const

// Función para inicializar la lista negra
export const initializeBlacklist = () => {
    // Aquí puedes cargar datos de una base de datos o un archivo, si es necesario.
    console.log("Lista negra inicializada");
};

// Función para verificar si un número está en la lista negra
export const isBlacklisted = (phoneNumber: string): boolean => {
    return blacklist.has(phoneNumber);
};

// Función para agregar un número a la lista negra
export const addToBlacklist = (phoneNumber: string) => {
    blacklist.add(phoneNumber);
    console.log(`${phoneNumber} ha sido agregado a la lista negra`);
};

// Función para eliminar un número de la lista negra
export const removeFromBlacklist = (phoneNumber: string) => {
    blacklist.delete(phoneNumber);
    console.log(`${phoneNumber} ha sido removido de la lista negra`);
};
