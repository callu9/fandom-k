import { handler } from "./class-http-client";

const PATH = "donations";

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
 * @typedef {{
 *  id: number | undefined,
 *  idolId: number,
 *  title: string,
 *  subtitle: string,
 *  targetDonation: number,
 *  receivedDonations: number,
 *  createdAt: string,
 *  deadline: string,
 *  status: boolean,
 *  idol: Idol | undefined
 * }} Donation
 */
/**
 * 후원 목록 조회
 * @param {number | undefined} cursor
 * @param {number | undefined} pageSize
 * @param {number[] | undefined} priorityIdolIds
 * @returns {{
 *  list: Donation[],
 *  nextCursor: number | null
 * }}
 */
export async function getDonations(cursor = 0, pageSize = 10, priorityIdolIds = []) {
  const params = new URLSearchParams();
  params.append("pageSize", pageSize);
  if (cursor) params.append("cursor", cursor);
  if (priorityIdolIds.length > 0)
    for (const id of priorityIdolIds) {
      params.append("priorityIdolIds", id);
    }
  return await handler.get(PATH, params);
}
/**
 * 후원하기
 * @param {number} id - 후원 ID
 * @param {number} amount - 후원 금액
 * @returns {Donation}
 */
export async function contributeDonation(id, amount) {
  return await handler.put(PATH, `${id}/contribute`, { amount });
}
// #region : Optional API
/**
 * 후원 생성
 * @param {Donation} value
 * @returns {Donation}
 */
export async function createDonation(value) {
  return await handler.post(PATH, value);
}
/**
 * 후원 수정
 * @param {number} id
 * @param {{ deadline: string, targetDonation: number }} value
 * @returns {Donation}
 */
export async function updateDonation(id, value) {
  return await handler.put(PATH, id, value);
}
/**
 * 후원 삭제
 * @param {number} id - 삭제할 후원 ID
 * @returns {Donation}
 */
export async function deleteIdol(id) {
  return await handler.delete(PATH, id);
}
// #endregion : Optional API
