// const baseUrl = process.env.API || "https://"
// const baseUrl = "http://localhost:2000";
const baseUrl = "https://mobilelemanh.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};

