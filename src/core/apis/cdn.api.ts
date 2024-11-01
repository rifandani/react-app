import ky, { type KyResponse, type Options } from 'ky';

export type GetCdnFileRequestSchema = {
  url: string;
};
export type GetCdnFileSuccessSchema = {
  response: KyResponse;
  blob: Blob;
  headers: Record<PropertyKey, string>;
};
export type CdnValidKeys = (typeof cdnValidKeys)[keyof typeof cdnValidKeys];

export const cdnValidKeys = {
  getArticleCoverImage: 'getArticleCoverImage',
} as const;

export const cdnKeys = {
  all: ['cdn'] as const,
  article: () => [...cdnKeys.all, 'article'] as const,
  getArticleCoverImage: (url: string | undefined) =>
    [...cdnKeys.article(), url] as const,
};

export const cdnRepositories = {
  /**
   * @access public
   * @note could throw error in the shape of `HTTPError` error
   */
  async getCdnFile({ url }: { url: string }, options?: Options) {
    const response = await ky.get(url, options);
    const blob = await response.blob();
    const headers = Object.fromEntries(response.headers);

    return {
      response,
      blob,
      headers,
    };
  },
};
