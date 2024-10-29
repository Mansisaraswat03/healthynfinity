import Log from '../models/log';

export const logAction = async ({ action, userId, role, additionalData }) => {
  const logEntry = new Log({ action, userId, role, additionalData });
  await logEntry.save();
};
