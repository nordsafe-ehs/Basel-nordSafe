const PRODUCTION = false;

const HOST = PRODUCTION
  ? "https://api.nordsafe-ehs.com"
  : "http://localhost:3000";

export const API_URL = HOST + "/api";
export const SDS_FILE_BASE_URL = HOST + "/sds-files";
export const UPLOADS_FILE_BASE_URL = HOST + "/uploads";
