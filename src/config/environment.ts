import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const environment = {
  baseUrl: process.env.BASE_URL ?? 'https://restful-booker.herokuapp.com',
  headless: process.env.HEADLESS !== 'false',
  timeout: Number(process.env.TIMEOUT ?? 30000),
  username: process.env.TEST_USERNAME ?? '',
  password: process.env.TEST_PASSWORD ?? '',
};
