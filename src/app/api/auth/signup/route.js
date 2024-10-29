// src/app/api/auth/signup/route.js
import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';
import { generateToken } from '@/middleware/auth'; // Make sure this path is correct

export const POST = async (req) => {
  await connectToDatabase();
  
  const { email, password } = await req.json(); // Ensure you're reading the JSON body correctly

  const existingUser = await User.findOne({ email });
  if (existingUser) return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });

  const user = new User({ email, password });
  await user.save();

  const token = generateToken(user); // This should now work if the function is correctly defined and imported
  return new Response(JSON.stringify({ message: 'User created', token }), { status: 201 });
};
