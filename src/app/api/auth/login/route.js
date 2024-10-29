import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';
import { generateToken } from '@/middleware/auth'

export const POST = async (req) => {
  await connectToDatabase();
  const { email, password } = await req.json(); // Ensure you're reading the JSON body correctly

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  const token = generateToken(user);
  return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
};
