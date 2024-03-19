import { env } from '#shared/constants/env.constant';
import ky from 'ky';

// Set config defaults when creating the instance
export const http = ky.create({
  prefixUrl: env.apiBaseUrl,
  // validateStatus: status =>
  //   // Resolve only if the status code is less than 500
  //   status < 500,
});
