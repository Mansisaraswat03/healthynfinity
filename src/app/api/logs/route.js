// src/app/api/logs/route.js
import Log from '@/models/log';
import { connectToDatabase } from '@/lib/db';

export const GET = async (req) => {
  await connectToDatabase();
  
  // Use req.nextUrl to parse the URL and get search params
  const { searchParams } = new URL(req.url);
  const actionType = searchParams.get('actionType');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const page = parseInt(searchParams.get('page')) || 1; // Default to page 1

  const query = { isDeleted: false };
  if (actionType) query.action = actionType;
  if (startDate && endDate) {
    query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const logs = await Log.find(query)
    .skip((page - 1) * 10)
    .limit(10)
    .exec();

  return new Response(JSON.stringify(logs), { status: 200 });
};
