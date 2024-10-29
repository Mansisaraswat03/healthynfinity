import Log from '@/models/log';
import { connectToDatabase } from '@/lib/db';

export const GET = async (req) => {
  await connectToDatabase();

  const url = new URL(req.url);
  const actionType = url.searchParams.get('actionType');
  try {
    const type = actionType ? { type: actionType } : {};
    const logs = await Log.find(type).exec();
    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return new Response(JSON.stringify({ error: 'Error fetching logs' }), { status: 500 });
  }
};
