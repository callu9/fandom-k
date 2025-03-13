import axios from "axios";

const HTTP_STATUS = { STATUS_OK: 200, STATUS_CREATED: 201 };
const ERR_DATA = {
  votes: "투표",
  idols: "아이돌",
  donations: "후원",
  "charts/female": "이달의 여자 아이돌 차트",
  "charts/male": "이달의 남자 아이돌 차트",
};

class HttpClient {
  baseURL;
  teamName;
  instance;
  constructor(url = "https://fandom-k-api.vercel.app", teamName = "14-2") {
    this.baseURL = url;
    this.teamName = teamName;
    this.getInstance();
  }
  getInstance(contentType = "application/json") {
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: { "Content-Type": `${contentType}; charset=UTF-8` },
    });
  }
  async get(path, params) {
    try {
      const response = await this.instance.get(`/${this.teamName}/${path}`, { params });
      if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(`${ERR_DATA[path]} 목록 조회 중 오류가 발생했습니다.`);
    }
  }
  async post(path, data) {
    try {
      const response = await this.instance.post(`/${this.teamName}/${path}`, data);
      if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(`${ERR_DATA[path]} 생성 중 오류가 발생했습니다.`);
    }
  }
  async put(path, id, data) {
    try {
      const response = await this.instance.put(`/${this.teamName}/${path}/${id}`, data);
      if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(`${ERR_DATA[path]} 정보 수정 중 오류가 발생했습니다.`);
    }
  }
  async delete(path, id) {
    try {
      const response = await this.instance.delete(`/${this.teamName}/${path}/${id}`);
      if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(`${ERR_DATA[path]} 정보 삭제 중 오류가 발생했습니다.`);
    }
  }
  async uploadImage(file) {
    try {
      const response = await this.instance.post("/images/upload", file, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
    } catch (err) {
      console.log(err);
      throw new Error("이미지 업로드 중 오류가 발생했습니다.");
    }
  }
}
export default HttpClient;

export const handler = new HttpClient();
