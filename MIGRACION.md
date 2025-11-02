# 📋 Guía de Limpieza de Base de Datos

## 🚀 Comando Rápido (TODO EN UNO)

```bash
# Un solo comando que hace TODO:
# ✅ Convierte @lid a números normales
# ✅ Detecta duplicados
# ✅ Elimina duplicados
docker exec bot_unlock npm run clean:database
```

**Este es el script recomendado** - hace todo automáticamente y es seguro ejecutarlo múltiples veces.

---

## ⚠️ Problema de Duplicados

Si ya estabas usando el bot ANTES del fix, es muy probable que tengas **usuarios duplicados**:

```
ID | Name              | Number
1  | José_xx 🏳️        | 2491131383852@lid    ← Viejo (con @lid)
2  | José_xx 🏳️        | 56949614283          ← Nuevo (número limpio)
```

**¿Por qué pasa esto?**
- Usuario escribió ANTES del fix → se guardó como `@lid`
- Usuario escribió DESPUÉS del fix → se guardó como número limpio
- Resultado: ¡El mismo usuario aparece 2 veces!

## 🔧 Solución TODO-EN-UNO ⭐ (RECOMENDADO)

```bash
# Un solo comando hace TODO:
docker exec bot_unlock npm run clean:database
```

**Este script inteligente:**
- 🔍 Analiza toda la base de datos
- 🔄 Convierte @lid → números limpios
- 👥 Detecta usuarios duplicados (mismo número, diferente formato)
- ✅ Mantiene el mejor registro (prefiere números limpios y fechas recientes)
- 🗑️ Elimina duplicados automáticamente
- 📊 Te muestra un reporte detallado

**Es seguro ejecutarlo múltiples veces** - no daña datos que ya estén limpios.

---

## 🔧 Solución Manual (Paso a Paso)

<details>
<summary>👉 Click aquí si prefieres hacerlo paso a paso (no recomendado)</summary>

### Paso 1: Eliminar Duplicados (PRIMERO)

```bash
docker exec bot_unlock npm run fix:duplicates
```

Este script:
- ✅ Encuentra usuarios duplicados (mismo número, diferente formato)
- ✅ Mantiene la versión con número limpio
- ✅ Elimina la versión con @lid
- ✅ Te muestra qué eliminó

### Paso 2: Migrar números restantes (DESPUÉS)

```bash
docker exec bot_unlock npm run migrate:phones
```

</details>

## ¿Cuándo necesito migrar?

Si tu base de datos tiene usuarios guardados con formato `@lid`, por ejemplo:
```
2491131383852@lid
221582278529209@lid
```

## 📖 Explicación del Proceso

### ¿Qué hace el script `clean:database`?

1. **Analiza** todos los usuarios en la base de datos
2. **Agrupa** usuarios por su número de teléfono real (convirtiendo @lid)
3. **Detecta** duplicados (mismo número, diferentes formatos)
4. **Resuelve** duplicados:
   - Prefiere números limpios sobre @lid
   - Prefiere registros más recientes
   - Elimina las copias innecesarias
5. **Migra** cualquier @lid restante a número limpio
6. **Reporta** todo lo que hizo

### Ejemplo de Salida

```
╔════════════════════════════════════════════════════╗
║   🧹 DATABASE CLEANUP - All-in-One Script 🧹      ║
╚════════════════════════════════════════════════════╝

📊 Total users in database: 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 STEP 1: Analyzing database...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 STEP 2: Processing users...

   ⚠️  DUPLICATE DETECTED: José_xx 🏳️
      Phone: 56949614283
      Found 2 entries:

      ✅ KEEPING:
         ID: 2 | Number: 56949614283 | Created: 2025-11-02

      🗑️  REMOVING:
         ID: 1 | Number: 2491131383852@lid | Created: 2025-11-01

      ✅ Duplicate resolved!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ DATABASE CLEANUP COMPLETED!

📊 Summary:
   • Total users processed: 5
   • Migrated (@lid → phone): 1
   • Duplicates removed: 1
   • Already clean: 3
   • Final user count: 4
```

---

## 🚀 Proceso Completo de Limpieza

### Paso 0: Verificar usuarios actuales (Opcional)

```bash
# Ver qué usuarios tienes en la base de datos
docker exec mysql_db mysql -utest -ptest test -e "SELECT id, name, number FROM Users LIMIT 10;"
```

Ejemplo de salida:
```
+----+-------------------------+------------------------+
| id | name                    | number                 |
+----+-------------------------+------------------------+
|  1 | José Andradez_xx 🏳️    | 2491131383852@lid      |
|  2 | Cliente_co 🇨🇴          | 573001234567           |
+----+-------------------------+------------------------+
```

### Paso 1: Eliminar duplicados (IMPORTANTE)

```bash
# PRIMERO: Eliminar usuarios duplicados
docker exec bot_unlock npm run fix:duplicates
```

Esto te mostrará algo como:
```
🔍 Searching for duplicate users...
📊 Total users in database: 3

   🔄 Duplicate found:
      User: José_xx 🏳️
      [OLD] ID: 1 | Number: 2491131383852@lid | Created: 2025-11-01
      [NEW] ID: 2 | Number: 56949614283 | Created: 2025-11-02
      ✅ Removed duplicate (kept ID: 2)

✅ Deduplication completed!
   🔍 Duplicates found: 1
   ✓ Duplicates removed: 1
   📊 Remaining users: 2
```

### Paso 2: Migrar números restantes (Si quedan @lid)

```bash
# DESPUÉS: Migrar los @lid que no tenían duplicado
docker exec bot_unlock npm run migrate:phones
```

### Paso 3: Verificar resultados

```bash
# Ver los usuarios después de la migración
docker exec mysql_db mysql -utest -ptest test -e "SELECT id, name, number FROM Users LIMIT 10;"
```

Deberías ver:
```
+----+-------------------------+------------------------+
| id | name                    | number                 |
+----+-------------------------+------------------------+
|  1 | José Andradez_xx 🏳️    | 56949614283            |
|  2 | Cliente_co 🇨🇴          | 573001234567           |
+----+-------------------------+------------------------+
```

## 🔍 ¿Qué hace el script?

El script `migrate:phones`:

1. ✅ Conecta a la base de datos MySQL
2. ✅ Lee todos los usuarios
3. ✅ Para cada usuario con `@lid` o `@s.whatsapp.net`:
   - Lee el archivo de mapeo LID correspondiente
   - Extrae el número de teléfono real
   - Actualiza el registro en la base de datos
4. ✅ Muestra un resumen de la migración

## ⚠️ Importante

### El script solo puede migrar si:
- Los archivos de mapeo LID existen en `/app/bot_sessions/`
- El formato es: `lid-mapping-{LID}_reverse.json`

### Si no hay archivos de mapeo:
- El script lo reportará pero no fallará
- Los usuarios seguirán funcionando porque `getPhoneFromContext()` maneja la conversión en tiempo real
- Los nuevos mensajes de esos usuarios crearán los mapeos automáticamente

## 🔄 Alternativa: Dejar que se normalice gradualmente

Si prefieres no ejecutar la migración manual:

1. **Deja los datos como están**
2. **Los usuarios seguirán funcionando** porque:
   - `getPhoneFromContext()` convierte automáticamente
   - Cuando escriban de nuevo, se guardará el número correcto
3. **Eventualmente todos tendrán números limpios**

## 🛠️ Solución de problemas

### Error: "Cannot connect to database"
```bash
# Asegúrate de que los contenedores estén corriendo
docker-compose ps

# Si no están corriendo, inícilos
docker-compose up -d
```

### Error: "LID mapping not found"
Esto significa que no existe el archivo de mapeo para ese LID. Opciones:

**Opción A:** Esperar a que el usuario escriba de nuevo (creará el mapeo automáticamente)

**Opción B:** Eliminar ese usuario de la DB:
```bash
docker exec mysql_db mysql -utest -ptest test -e "DELETE FROM Users WHERE number LIKE '%@lid';"
```

### Ver logs detallados
```bash
# Ver logs del bot en tiempo real
docker-compose logs -f bot-unlock-magic-service
```

## 📊 Comandos útiles

```bash
# Ver usuarios duplicados potenciales (manualmente)
docker exec mysql_db mysql -utest -ptest test -e "SELECT name, number FROM Users ORDER BY name;"

# Contar usuarios con @lid
docker exec mysql_db mysql -utest -ptest test -e "SELECT COUNT(*) as 'Usuarios con LID' FROM Users WHERE number LIKE '%@lid';"

# Contar usuarios con número limpio
docker exec mysql_db mysql -utest -ptest test -e "SELECT COUNT(*) as 'Usuarios normalizados' FROM Users WHERE number NOT LIKE '%@%';"

# Ver todos los usuarios
docker exec mysql_db mysql -utest -ptest test -e "SELECT * FROM Users;"
```

## 🎯 Resumen Rápido

### ⭐ Opción Recomendada (Todo en uno)
```bash
# Un solo comando - hace TODA la limpieza
docker exec bot_unlock npm run clean:database
```

### 🔧 Opción Manual (Paso a paso)
```bash
# 1. Eliminar duplicados (PRIMERO)
docker exec bot_unlock npm run fix:duplicates

# 2. Migrar @lid restantes (DESPUÉS)
docker exec bot_unlock npm run migrate:phones

# 3. Verificar
docker exec mysql_db mysql -utest -ptest test -e "SELECT id, name, number FROM Users;"
```

## ✅ Después de la migración

Los **nuevos usuarios** se guardarán automáticamente con el formato correcto:
```
573001234567  ✅ (número limpio)
```

No necesitarás volver a ejecutar la migración.

