import Log from '@/models/log';
import { connectToDatabase } from '@/lib/db';

export const GET = async () => {
  await connectToDatabase();

  try {
    const logs = await Log.find({}).exec();
    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    
    return new Response(JSON.stringify({ error: 'Error fetching logs' }), { status: 500 });
  }
};
