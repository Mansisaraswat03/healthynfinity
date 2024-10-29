"use server";
import Log from '@/models/log';
import { connectToDatabase } from '@/lib/db';

export async function logAction(actionType, userId, role) {
  console.log('logAction', actionType, userId, role);
  await connectToDatabase();
  try {
    const logEntry = await Log.create({
      type:actionType,
      userId,
      role,
      timestamp: new Date(),
    });
    console.log('Log entry saved:', logEntry); 
  } catch (error) {
    console.log('Error logging action:', error);
  }
}
