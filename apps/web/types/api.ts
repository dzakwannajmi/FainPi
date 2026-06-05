export type ApiResult = {
  status: number | null;
  body: unknown;
};

export type ApiRequestOptions = {
  paid?: boolean;
};