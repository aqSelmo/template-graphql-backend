import crypto from 'crypto';

export const createHashFromString = (pass: string): string => {
  const secret = `${pass}-${process.env.APP_HASH}`;
  const hash = crypto.createHash('sha256').update(secret).digest('hex');

  return hash;
};
