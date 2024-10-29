import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  role: String,
  additionalData: Object,
  isDeleted: { type: Boolean, default: false }
});

export default mongoose.models.Log || mongoose.model('Log', logSchema);
