import axios from "axios";

export async function getSimulation(body, token) {
  const api_url = import.meta.env.VITE_API_URL;
  console.log(body)

  const res = await axios.post(`${api_url}/simulator`, body, {
    headers: {
      Authorization: "Bearer " + token,
    }
  })

  if (res.status != 200) {
    return null
  }
  
  return res.data
}