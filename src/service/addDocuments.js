import axios from "axios";

export async function addDocuments(id, formData, token) {
  const api_url = import.meta.env.VITE_API_URL;


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