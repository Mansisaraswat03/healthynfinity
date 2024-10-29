import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';
import { generateToken } from '@/utils/auth';
import { logAction } from '@/lib/logAction';
import { verifyToken } from '@/utils/auth'; 

export const POST = async (req) => {
  await connectToDatabase();

  const token = req.cookies.get('token');
  if (token) {
    const user = await verifyToken(token);
    if (user) {
      return new Response(JSON.stringify({ redirect: '/' }), { status: 200 });
    }
  }

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
    }

    const newToken = generateToken(user);
    await logAction("login", user._id, user.role);

    return new Response(JSON.stringify({ message: 'Login successful', token: newToken }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'An error occurred during login' }), { status: 500 });
  }
};
