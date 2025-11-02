# Sistema de Conversión LID (Local Identifier) 

## ¿Qué es LID?

LID (Local Identifier) es un identificador interno de Meta/WhatsApp que se usa para privacidad mejorada. No es el número de teléfono real del usuario.

### Formato de JID en WhatsApp:

1. **Formato tradicional**: `573001234567@s.whatsapp.net`
   - El número antes de @ es el número de teléfono real

2. **Formato LID**: `221582278529209@lid`
   - El número antes de @ es un identificador interno de Meta
   - NO es el número de teléfono real

## ¿Cómo funciona el mapeo?

Baileys (la librería de WhatsApp) crea automáticamente archivos de mapeo bidireccional en la carpeta de sesión:

### Archivos de mapeo:

```
bot_sessions/
├── lid-mapping-56949614283.json          → Contiene: "221582278529209"
└── lid-mapping-221582278529209_reverse.json → Contiene: "56949614283"
```

**Explicación:**
- Número real: `56949614283`
- LID: `221582278529209`
- El archivo `lid-mapping-{número}.json` mapea número → LID
- El archivo `lid-mapping-{lid}_reverse.json` mapea LID → número

## Implementación en el Bot

### Función `extractPhoneNumber(jid: string)`

Esta función detecta automáticamente el tipo de JID y extrae el número correcto:

```typescript
// Caso 1: JID tradicional
extractPhoneNumber("573001234567@s.whatsapp.net")
// Retorna: "573001234567"

// Caso 2: JID con LID
extractPhoneNumber("221582278529209@lid")
// 1. Detecta que es formato @lid
// 2. Lee el archivo: bot_sessions/lid-mapping-221582278529209_reverse.json
// 3. Obtiene el número real: "56949614283"
// Retorna: "56949614283"
```

### Flujo de guardado de usuarios:

1. Usuario envía mensaje → `ctx.from` puede ser LID o número normal
2. `getPhoneFromContext(ctx)` extrae el número real usando los archivos de mapeo
3. Se guarda en la base de datos con el número de teléfono correcto

## Configuración

### Variable de entorno requerida:

```env
SESSION_PATH=/app/bot_sessions
```

Esta variable indica dónde están los archivos de sesión y mapeo de Baileys.

## Migración de datos existentes

Si tienes usuarios guardados con formato LID en la base de datos, ejecuta:

```bash
# Dentro del contenedor
docker exec -it bot_unlock npm run migrate:phones
```

Este script:
1. Lee todos los usuarios de la base de datos
2. Detecta los que tienen formato `@lid`
3. Busca el archivo de mapeo correspondiente
4. Actualiza el número a formato correcto

## Ventajas de esta solución

✅ **Automático**: No requiere intervención manual  
✅ **Persistente**: Los mapeos se guardan en el volumen Docker  
✅ **Compatible**: Funciona con ambos formatos (LID y tradicional)  
✅ **Confiable**: Usa el sistema nativo de Baileys

## Estructura de archivos

```
bot_sessions/                          (Volumen Docker persistente)
├── creds.json                         (Credenciales de sesión)
├── lid-mapping-{número}.json         (Mapeo: número → LID)
├── lid-mapping-{lid}_reverse.json    (Mapeo: LID → número)
├── pre-key-*.json                     (Claves de encriptación)
└── session-*.json                     (Sesiones activas)
```

## Notas importantes

⚠️ Los archivos de mapeo se crean automáticamente por Baileys cuando se establece la conexión  
⚠️ Si borras el volumen `whatsapp_sessions`, se pierden los mapeos y hay que escanear el QR de nuevo  
⚠️ El LID es único por dispositivo/sesión y puede cambiar si se desconecta y reconecta el bot

## Referencias

- [Baileys GitHub](https://github.com/WhiskeySockets/Baileys)
- Sistema de mapeo LID introducido para mejorar la privacidad en WhatsApp Multi-Device

