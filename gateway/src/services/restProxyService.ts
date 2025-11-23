import axios from "axios";

const REST_BASE = process.env.REST_URL || "http://localhost:3001";

export default {
  async getAllAccounts() {
    const res = await axios.get(`${REST_BASE}/accounts`);
    return res.data;
  },

  async getAccount(id: string) {
    const res = await axios.get(`${REST_BASE}/accounts/${id}`);
    return res.data;
  },

  async createAccount(body: any) {
    const res = await axios.post(`${REST_BASE}/accounts`, body);
    return res.data;
  },

  async updateAccount(id: string, body: any) {
    const res = await axios.put(`${REST_BASE}/accounts/${id}`, body);
    return res.data;
  },

  async deleteAccount(id: string) {
    const res = await axios.delete(`${REST_BASE}/accounts/${id}`);
    return res.data;
  },

  async deposit(id: string, body: any) {
    const res = await axios.post(`${REST_BASE}/accounts/${id}/deposit`, body);
    return res.data;
  }
};
