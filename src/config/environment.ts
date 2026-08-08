import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const environment = {
  baseUrl: process.env.BASE_URL ?? '',
  headless: process.env.HEADLESS === 'true',
  timeout: Number(process.env.TIMEOUT ?? 30000),
  username: process.env.TEST_USERNAME ?? '',
  password: process.env.TEST_PASSWORD ?? '',
};
