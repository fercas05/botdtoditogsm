import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility functions to handle WhatsApp JID formats
 * Converts from @lid (Local Identifier) to actual phone number using Baileys mapping files
 * 
 * LID Format:
 * - Baileys creates lid-mapping files to map between phone numbers and LIDs
 * - lid-mapping-{phoneNumber}.json → contains the LID for that phone
 * - lid-mapping-{lid}_reverse.json → contains the phone number for that LID
 */

const SESSION_PATH = process.env.SESSION_PATH || './bot_sessions';

/**
 * Checks if a JID is in LID format
 * @param jid - The WhatsApp JID
 * @returns true if it's a LID format
 */
export function isLID(jid: string): boolean {
  return jid?.endsWith('@lid') || false;
}

/**
 * Reads the LID mapping file to get the phone number from a LID
 * @param lid - The Local Identifier (without @lid suffix)
 * @returns The phone number or null if not found
 */
function readLIDMapping(lid: string): string | null {
  try {
    const mappingFile = path.join(SESSION_PATH, `lid-mapping-${lid}_reverse.json`);
    
    if (fs.existsSync(mappingFile)) {
      const content = fs.readFileSync(mappingFile, 'utf-8');
      const phoneNumber = JSON.parse(content);
      return phoneNumber;
    }
  } catch (error) {
    console.error(`Error reading LID mapping for ${lid}:`, error);
  }
  
  return null;
}

/**
 * Extracts the phone number from a WhatsApp JID
 * Handles both formats: 
 * - Traditional: 573001234567@s.whatsapp.net → returns "573001234567"
 * - LID format: 221582278529209@lid → looks up in mapping files → returns actual phone number
 * 
 * @param jid - The WhatsApp JID (can be @lid or @s.whatsapp.net)
 * @returns The clean phone number without @ suffix
 */
export function extractPhoneNumber(jid: string): string {
  if (!jid) return '';
  
  // Split to get the identifier part
  const identifier = jid.split('@')[0];
  
  // If it's a LID, we need to look up the actual phone number in mapping files
  if (isLID(jid)) {
    const phoneNumber = readLIDMapping(identifier);
    if (phoneNumber) {
      return phoneNumber;
    }
    
    // If mapping not found, return the LID (fallback)
    console.warn(`LID mapping not found for ${identifier}, using LID as fallback`);
    return identifier;
  }
  
  // For standard JID (@s.whatsapp.net), just return the number part
  return identifier;
}

/**
 * Converts a JID to standard WhatsApp phone number format
 * @param jid - The WhatsApp JID
 * @returns Phone number in format: 573001234567@s.whatsapp.net
 */
export function normalizeToPhoneJID(jid: string): string {
  if (!jid) return '';
  
  const phoneNumber = extractPhoneNumber(jid);
  
  // If it already ends with @s.whatsapp.net, return as is
  if (jid.endsWith('@s.whatsapp.net')) {
    return jid;
  }
  
  // Convert to standard phone format
  return `${phoneNumber}@s.whatsapp.net`;
}

/**
 * Gets the actual phone number from ctx.from
 * Handles LID conversion using Baileys mapping files
 * 
 * @param ctx - The bot context object
 * @returns The phone number (clean, without @ suffix)
 */
export function getPhoneFromContext(ctx: any): string {
  // First, try to extract from ctx.from
  if (ctx.from) {
    return extractPhoneNumber(ctx.from);
  }
  
  // Fallback: try ctx.key?.remoteJid
  if (ctx.key?.remoteJid) {
    return extractPhoneNumber(ctx.key.remoteJid);
  }
  
  // Last resort: return empty string
  console.warn('No phone number found in context:', ctx);
  return '';
}

