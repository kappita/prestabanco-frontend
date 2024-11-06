import axios from "axios";

export async function outgoMortgage(id, token) {
  const api_url = import.meta.env.VITE_API_URL;
  const res = await axios.post(api_url + `/mortgage_loan/${id}/set_outgo`, {}, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  if (res.status != 200) {
    return null
  }

  
  return res.data
}