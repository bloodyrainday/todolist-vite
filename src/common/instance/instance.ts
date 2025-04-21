import axios from "axios"
import { AUTH_TOKEN } from "../constants"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "api-key": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config
})
