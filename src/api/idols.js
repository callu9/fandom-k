import { handler } from "./class-http-client";

const PATH = "idols";

/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  gender: "female" | "male",
 *  group: "string",
 *  profilePicture: string,
 *  totalVotes: number
 * }} Idol
 */
/**
 * 아이돌 목록 조회
 * @param {string | undefined} keyword
 * @param {number | undefined} cursor
 * @param {number | undefined} pageSize
 * @returns {{ list: Idol[], nextCursor: number | null }}
 */
export async function getIdolList(keyword, cursor = 0, pageSize = 10) {
  const params = { keyword, cursor, pageSize };
  return await handler.get(PATH, params);
}

// #region : Optional API
/**
 * 아이돌 생성
 * @param {{ profilePicture: string, group: string, gender: "female" | "male", name: string }} value
 * @returns {Idol}
 */
export async function createIdol(value) {
  return await handler.post(PATH, value);
}
/**
 * 아이돌 수정
 * @param {number} id
 * @param {{ profilePicture: string, group: string, gender: "female" | "male", name: string }} value
 * @returns {Idol}
 */
export async function updateIdol(id, value) {
  return await handler.put(PATH, id, value);
}
/**
 * 아이돌 삭제
 * @param {number} id - 삭제할 아이돌 ID
 * @returns
 */
export async function deleteIdol(id) {
  return await handler.delete(PATH, id);
}
// #endregion : Optional API
