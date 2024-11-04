import axios from "axios";

export async function evaluateMortgage(id, body, token) {
  const api_url = import.meta.env.VITE_API_URL;
  console.log(body)

  const evaluate = await axios.post(`${api_url}/mortgage_loan/${id}/evaluate_mortgage`, body, {
    headers: {
      Authorization: "Bearer " + token,
    }
  })

  if (evaluate.status != 200) {
    return null
  }
  
  return evaluate.data
}