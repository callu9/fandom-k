import { handler } from "./class-http-client";

const PATH = "charts";

export async function getChart(gender, cursor = 0, pageSize = 10) {
  const params = { gender, cursor, pageSize };
  return await handler.get(`${PATH}/${gender}`, params);
}
