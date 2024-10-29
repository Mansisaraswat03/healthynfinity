import Log from '@/models/log';
import { connectToDatabase } from '@/lib/db';

export const GET = async (req) => {
  await connectToDatabase();

  const url = new URL(req.url);
  const actionType = url.searchParams.get('actionType');
  const page = parseInt(url.searchParams.get('page'), 10) || 1;
  const limit = 10;

  try {
    const filter = actionType ? { type: actionType } : {};
    const logs = await Log.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalLogs = await Log.countDocuments(filter);
    const totalPages = Math.ceil(totalLogs / limit);

    return new Response(JSON.stringify({ logs, totalPages, currentPage: page }), { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return new Response(JSON.stringify({ error: 'Error fetching logs' }), { status: 500 });
  }
};
