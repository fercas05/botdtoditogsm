/**
 * Script to remove duplicate users caused by LID vs phone number format
 * 
 * Problem:
 * - User was saved as: 2491131383852@lid
 * - After fix, same user saved as: 56949614283
 * - Result: User appears twice in database
 * 
 * Solution:
 * - Find users with @lid that have a corresponding phone number entry
 * - Keep the entry with clean phone number
 * - Delete the @lid entry
 * 
 * Usage:
 *   docker exec bot_unlock npm run fix:duplicates
 */

import { UserModel } from "../database/model/UserModelDb";
import { checkConnection } from "../database/Config/Connection";
import { extractPhoneNumber, isLID } from "../utils/jidHelper";
import colors from "colors";

async function removeDuplicates() {
  try {
    // Connect to database
    await checkConnection();
    
    console.log(colors.yellow("\n🔍 Searching for duplicate users...\n"));
    
    // Get all users
    const allUsers = await UserModel.findAll({
      order: [['createdAt', 'ASC']] // Oldest first
    });
    
    console.log(colors.cyan(`📊 Total users in database: ${allUsers.length}\n`));
    
    // Separate users with @lid from clean numbers
    const usersWithLID = allUsers.filter(u => u.number.includes('@lid'));
    const usersWithCleanNumber = allUsers.filter(u => !u.number.includes('@'));
    
    console.log(colors.gray(`   Users with @lid format: ${usersWithLID.length}`));
    console.log(colors.gray(`   Users with clean numbers: ${usersWithCleanNumber.length}\n`));
    
    let duplicatesFound = 0;
    let duplicatesRemoved = 0;
    let errors = 0;
    
    // Check each user with @lid
    for (const lidUser of usersWithLID) {
      try {
        // Extract the real phone number from LID
        const phoneNumber = extractPhoneNumber(lidUser.number);
        
        // Check if there's a user with that clean phone number
        const cleanUser = usersWithCleanNumber.find(u => u.number === phoneNumber);
        
        if (cleanUser) {
          // Duplicate found!
          duplicatesFound++;
          
          console.log(colors.yellow(`\n   🔄 Duplicate found:`));
          console.log(colors.gray(`      User: ${lidUser.name}`));
          console.log(colors.red(`      [OLD] ID: ${lidUser.id} | Number: ${lidUser.number} | Created: ${lidUser.createdAt}`));
          console.log(colors.green(`      [NEW] ID: ${cleanUser.id} | Number: ${cleanUser.number} | Created: ${cleanUser.createdAt}`));
          
          // Delete the @lid version (older)
          await lidUser.destroy();
          console.log(colors.green(`      ✅ Removed duplicate (kept ID: ${cleanUser.id})`));
          duplicatesRemoved++;
          
        } else {
          // No duplicate, but has @lid format
          console.log(colors.gray(`   ℹ️  ${lidUser.name} (${lidUser.number}) - No duplicate, will be migrated`));
        }
      } catch (error) {
        console.error(colors.red(`   ❌ Error processing ${lidUser.name}:`), error);
        errors++;
      }
    }
    
    // Summary
    console.log(colors.green(`\n✅ Deduplication completed!`));
    console.log(colors.cyan(`   🔍 Duplicates found: ${duplicatesFound}`));
    console.log(colors.green(`   ✓ Duplicates removed: ${duplicatesRemoved}`));
    
    if (errors > 0) {
      console.log(colors.red(`   ✗ Errors: ${errors}`));
    }
    
    // Get updated count
    const remainingUsers = await UserModel.count();
    console.log(colors.yellow(`   📊 Remaining users: ${remainingUsers}\n`));
    
    if (duplicatesRemoved === 0) {
      console.log(colors.cyan("ℹ️  No duplicates found. Your database is clean!\n"));
    } else {
      console.log(colors.yellow("💡 Tip: You may still want to run 'npm run migrate:phones' to convert remaining @lid entries.\n"));
    }
    
    process.exit(0);
  } catch (error) {
    console.error(colors.red("\n❌ Error during deduplication:"), error);
    process.exit(1);
  }
}

// Run deduplication
removeDuplicates();

