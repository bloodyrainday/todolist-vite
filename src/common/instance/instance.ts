import axios from "axios"

const token = "224d274d-6067-4630-9618-70fa1a5cf17c"
const apiKey = "d83db838-fc8d-43ce-b06e-7535b34c286a"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    Authorization: `Bearer ${token}`,
    "api-key": apiKey,
  },
})
