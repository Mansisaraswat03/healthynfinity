import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true } 
});

export default mongoose.models.Log || mongoose.model('Log', logSchema);
