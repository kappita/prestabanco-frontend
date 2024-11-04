import axios from "axios";

export async function postMortgage(body, formData, token) {
  const api_url = import.meta.env.VITE_API_URL;
  const res = await axios.post(api_url + "/mortgage_loan", body, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  if (res.status != 200) {
    return null
  }
  const id = res.data.id

  const upload_docs = await axios.post(`${api_url}/mortgage_loan/${id}/add_documents`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data"
    }
  })

  if (upload_docs.status != 200) {
    return null
  }
  
  return upload_docs.data
}