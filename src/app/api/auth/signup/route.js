import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';
import { generateToken } from '@/utils/auth';
import { logAction } from '@/lib/logAction';
import { verifyToken } from '@/utils/auth'; // Make sure to implement this function

export const POST = async (req) => {
  await connectToDatabase();
  const token = req.cookies.get('token') || req.headers.get('Authorization'); // Example for Bearer token in headers

  if (token && verifyToken(token)) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home',
      },
    });
  }

  const { email, password, role } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
  }

  const user = new User({ email, password, role });
  await user.save();

  const newToken = generateToken(user);
  await logAction("signup", user?._id, user?.role);

  return new Response(JSON.stringify({ message: 'User created', token: newToken }), { status: 201 });
};
