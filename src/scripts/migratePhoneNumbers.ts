/**
 * Script to migrate phone numbers from @lid format to clean phone numbers
 * This script uses Baileys LID mapping files to convert LIDs to real phone numbers
 * 
 * Usage:
 *   docker exec bot_unlock npm run migrate:phones
 */

import { UserModel } from "../database/model/UserModelDb";
import { checkConnection } from "../database/Config/Connection";
import { extractPhoneNumber, isLID } from "../utils/jidHelper";
import colors from "colors";

async function migratePhoneNumbers() {
  try {
    // Connect to database
    await checkConnection();
    
    console.log(colors.yellow("\n🔄 Starting phone number migration using LID mapping...\n"));
    console.log(colors.gray(`📁 Session path: ${process.env.SESSION_PATH || './bot_sessions'}\n`));
    
    // Get all users
    const users = await UserModel.findAll();
    
    console.log(colors.cyan(`📊 Found ${users.length} users in database\n`));
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      const currentNumber = user.number;
      
      // Check if number contains @lid or @s.whatsapp.net
      if (currentNumber.includes('@')) {
        try {
          const cleanNumber = extractPhoneNumber(currentNumber);
          
          // Check if it was actually converted (not just stripped)
          if (cleanNumber !== currentNumber.split('@')[0] || !isLID(currentNumber)) {
            console.log(colors.gray(`   ${user.name}`));
            console.log(colors.red(`   Old: ${currentNumber}`));
            console.log(colors.green(`   New: ${cleanNumber}`));
            
            // Check if conversion was successful
            if (isLID(currentNumber) && cleanNumber === currentNumber.split('@')[0]) {
              console.log(colors.yellow(`   ⚠️  LID mapping not found, keeping as-is\n`));
              skippedCount++;
            } else {
              // Update the user
              user.number = cleanNumber;
              await user.save();
              console.log(colors.green(`   ✅ Updated!\n`));
              updatedCount++;
            }
          } else {
            console.log(colors.gray(`   ${user.name} - ${currentNumber}`));
            console.log(colors.yellow(`   ⚠️  LID format but no mapping file found\n`));
            skippedCount++;
          }
        } catch (error) {
          console.error(colors.red(`   ❌ Error processing ${user.name}:`), error);
          errorCount++;
        }
      } else {
        console.log(colors.gray(`   ✓ ${user.name} - ${currentNumber} (already clean)\n`));
        skippedCount++;
      }
    }
    
    console.log(colors.green(`\n✅ Migration completed!`));
    console.log(colors.cyan(`   ✓ Updated: ${updatedCount} users`));
    console.log(colors.gray(`   ⊘ Skipped: ${skippedCount} users`));
    if (errorCount > 0) {
      console.log(colors.red(`   ✗ Errors: ${errorCount} users`));
    }
    console.log(colors.yellow(`   📊 Total: ${users.length} users\n`));
    
    if (updatedCount === 0 && errorCount === 0) {
      console.log(colors.cyan("ℹ️  All users already have clean phone numbers or LID mappings are not available."));
      console.log(colors.cyan("   New users will be saved with correct phone numbers automatically.\n"));
    }
    
    process.exit(0);
  } catch (error) {
    console.error(colors.red("\n❌ Error during migration:"), error);
    process.exit(1);
  }
}

// Run migration
migratePhoneNumbers();

