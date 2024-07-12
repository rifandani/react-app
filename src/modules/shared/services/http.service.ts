import { env } from '#shared/constants/env.constant';
import ky, { type Options } from 'ky';

class Http {
  instance: typeof ky;

  constructor(config: Options) {
    this.instance = ky.create(config);
  }

  /**
   * Extends the default configuration of the Http instance
   */
  updateConfig(newConfig: Options): void {
    this.instance = ky.extend(newConfig);
  }

  /**
   * Reset or create new configuration of the Http instance
   */
  resetConfig(newConfig: Options): void {
    this.instance = ky.create(newConfig);
  }
}

// Set config defaults when creating the instance
export const http = new Http({
  prefixUrl: env.apiBaseUrl,
  // validateStatus: status =>
  //   // Resolve only if the status code is less than 500
  //   status < 500,
});
