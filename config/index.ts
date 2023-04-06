interface Config {
  baseURL: string;
  uploadPassword: string;
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NEXT_PUBLIC_UPLOAD_PASSWORD) throw new Error("no password");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    uploadPassword: process.env.NEXT_PUBLIC_UPLOAD_PASSWORD,
  };
};

export default createConfig();
