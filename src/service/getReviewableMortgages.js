import axios from "axios";

export async function getReviewableMortgages(token) {
  const api_url = import.meta.env.VITE_API_URL;
  const headers = {
    Authorization: "Bearer " + token
  }
  console.log("Los headers son")
  console.log(headers)
  const res = await axios.get(api_url + "/mortgage_loan/all_reviewable", {
    headers: headers
  })

  if (res.status != 200) {
    return null
  }
  return res.data
}