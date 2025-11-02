/**
 * All-in-One Database Cleanup Script
 * 
 * This script performs a complete cleanup of the Users database:
 * 1. Migrates @lid format to clean phone numbers
 * 2. Detects duplicates (same user with @lid and clean number)
 * 3. Removes duplicates (keeps the clean version)
 * 
 * Usage:
 *   docker exec bot_unlock npm run clean:database
 * 
 * Safe to run multiple times - it's idempotent
 */

import { UserModel } from "../database/model/UserModelDb";
import { checkConnection } from "../database/Config/Connection";
import { extractPhoneNumber, isLID } from "../utils/jidHelper";
import colors from "colors";

interface MigrationStats {
  total: number;
  migrated: number;
  duplicatesRemoved: number;
  alreadyClean: number;
  errors: number;
}

async function cleanDatabase() {
  try {
    // Connect to database
    await checkConnection();
    
    console.log(colors.yellow("\n╔════════════════════════════════════════════════════╗"));
    console.log(colors.yellow("║   🧹 DATABASE CLEANUP - All-in-One Script 🧹      ║"));
    console.log(colors.yellow("╚════════════════════════════════════════════════════╝\n"));
    
    // Get all users ordered by creation date (oldest first)
    const allUsers = await UserModel.findAll({
      order: [['createdAt', 'ASC']]
    });
    
    const stats: MigrationStats = {
      total: allUsers.length,
      migrated: 0,
      duplicatesRemoved: 0,
      alreadyClean: 0,
      errors: 0
    };
    
    console.log(colors.cyan(`📊 Total users in database: ${stats.total}\n`));
    
    // Step 1: Filter users that need processing (those with @ in number)
    const usersToProcess = allUsers.filter(user => user.number.includes('@'));
    
    if (usersToProcess.length === 0) {
      console.log(colors.green("✅ All users already have clean phone numbers!"));
      console.log(colors.cyan(`📊 All ${stats.total} users are correctly formatted.\n`));
      
      // Show sample
      const sampleUsers = await UserModel.findAll({ limit: 5 });
      console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
      console.log(colors.cyan("📋 Sample of users:\n"));
      sampleUsers.forEach(user => {
        console.log(colors.gray(`   ${user.id}. ${user.name} → ${user.number}`));
      });
      console.log(colors.yellow("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
      console.log(colors.green("✨ Database is already clean! No changes needed.\n"));
      process.exit(0);
    }
    
    console.log(colors.yellow(`⚠️  Found ${usersToProcess.length} users with @ format that need processing\n`));
    
    // Step 2: Group users to detect duplicates
    console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    console.log(colors.yellow("📋 STEP 1: Analyzing database...\n"));
    
    // Map to store: phoneNumber -> [users with that number]
    // Only process users that have @ in their number
    const phoneMap = new Map<string, typeof allUsers>();
    
    for (const user of usersToProcess) {
      try {
        // Extract clean phone number (handles @lid conversion)
        const cleanPhone = extractPhoneNumber(user.number);
        
        if (!phoneMap.has(cleanPhone)) {
          phoneMap.set(cleanPhone, []);
        }
        phoneMap.get(cleanPhone)!.push(user);
      } catch (error) {
        console.error(colors.red(`   ❌ Error processing user ${user.id}:`), error);
        stats.errors++;
      }
    }
    
    // Step 3: Process each phone number group (only those that need it)
    console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    console.log(colors.yellow("📋 STEP 2: Processing users...\n"));
    
    for (const [cleanPhone, users] of phoneMap.entries()) {
      try {
        if (users.length === 1) {
          // Single user - just migrate if needed
          const user = users[0];
          
          if (user.number !== cleanPhone) {
            // Has @lid or @s.whatsapp.net - needs migration
            console.log(colors.cyan(`   🔄 Migrating: ${user.name}`));
            console.log(colors.gray(`      ${user.number} → ${cleanPhone}`));
            
            user.number = cleanPhone;
            await user.save();
            
            console.log(colors.green(`      ✅ Migrated!\n`));
            stats.migrated++;
          } else {
            // Already clean
            stats.alreadyClean++;
          }
        } else {
          // Multiple users with same phone - DUPLICATES!
          console.log(colors.yellow(`\n   ⚠️  DUPLICATE DETECTED: ${users[0].name}`));
          console.log(colors.gray(`      Phone: ${cleanPhone}`));
          console.log(colors.gray(`      Found ${users.length} entries:\n`));
          
          // Sort: prefer clean numbers, then newer dates
          const sortedUsers = users.sort((a, b) => {
            // Prefer clean number (without @)
            const aIsClean = !a.number.includes('@');
            const bIsClean = !b.number.includes('@');
            
            if (aIsClean !== bIsClean) {
              return bIsClean ? 1 : -1; // Clean number first
            }
            
            // If both clean or both @lid, prefer newer
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
          
          // Keep the first one (best candidate)
          const keeper = sortedUsers[0];
          const toDelete = sortedUsers.slice(1);
          
          console.log(colors.green(`      ✅ KEEPING:`));
          console.log(colors.green(`         ID: ${keeper.id} | Number: ${keeper.number} | Created: ${keeper.createdAt.toISOString()}`));
          
          console.log(colors.red(`\n      🗑️  REMOVING:`));
          
          // Delete duplicates
          for (const duplicate of toDelete) {
            console.log(colors.red(`         ID: ${duplicate.id} | Number: ${duplicate.number} | Created: ${duplicate.createdAt.toISOString()}`));
            await duplicate.destroy();
            stats.duplicatesRemoved++;
          }
          
          // Ensure keeper has clean number
          if (keeper.number !== cleanPhone) {
            keeper.number = cleanPhone;
            await keeper.save();
            stats.migrated++;
          }
          
          console.log(colors.green(`\n      ✅ Duplicate resolved!\n`));
        }
      } catch (error) {
        console.error(colors.red(`   ❌ Error processing phone ${cleanPhone}:`), error);
        stats.errors++;
      }
    }
    
    // Step 3: Final summary
    console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    console.log(colors.green("✅ DATABASE CLEANUP COMPLETED!\n"));
    
    console.log(colors.cyan("📊 Summary:"));
    console.log(colors.cyan(`   • Total users processed: ${stats.total}`));
    console.log(colors.green(`   • Migrated (@lid → phone): ${stats.migrated}`));
    console.log(colors.yellow(`   • Duplicates removed: ${stats.duplicatesRemoved}`));
    console.log(colors.gray(`   • Already clean: ${stats.alreadyClean}`));
    
    if (stats.errors > 0) {
      console.log(colors.red(`   • Errors: ${stats.errors}`));
    }
    
    // Get final count
    const finalCount = await UserModel.count();
    console.log(colors.cyan(`   • Final user count: ${finalCount}\n`));
    
    // Show sample of cleaned data
    console.log(colors.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    console.log(colors.cyan("📋 Sample of cleaned users:\n"));
    
    const sampleUsers = await UserModel.findAll({ limit: 5 });
    sampleUsers.forEach(user => {
      console.log(colors.gray(`   ${user.id}. ${user.name} → ${user.number}`));
    });
    
    console.log(colors.yellow("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    
    if (stats.migrated === 0 && stats.duplicatesRemoved === 0 && stats.errors === 0) {
      console.log(colors.green("✨ Database is already clean! No changes needed.\n"));
    } else {
      console.log(colors.green("✨ Your database is now clean and optimized!\n"));
      console.log(colors.cyan("💡 New users will automatically be saved with correct format.\n"));
    }
    
    process.exit(0);
  } catch (error) {
    console.error(colors.red("\n❌ Fatal error during cleanup:"), error);
    process.exit(1);
  }
}

// Run cleanup
cleanDatabase();

