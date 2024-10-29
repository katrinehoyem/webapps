// config/urls.ts

const baseUrl = process.env.baseUrl ?? "http://localhost:3000";
const endpointsV1 = {
  projects: `${baseUrl}/v1/projects`,
  streaks: `${baseUrl}/v1/streaks`,
};

export { baseUrl, endpointsV1 as endpoints };