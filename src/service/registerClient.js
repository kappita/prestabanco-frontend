import axios from "axios";

export async function registerClient(body) {
  const api_url = import.meta.env.VITE_API_URL;
  const res = await axios.post(api_url + "/clients/register", body)
  if (res.status != 200) {
    return null
  }
  return res.data
}