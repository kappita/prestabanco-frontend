import axios from "axios";

export async function getLoanTypes(token) {
  const api_url = import.meta.env.VITE_API_URL;
  const headers =  {
    Authorization: "Bearer " + token
  }

  console.log("Los headers son")
  console.log(headers)
  // const res = await fetch(api_url + "/clients/loan_types", {
  //   method: 'GET',
  //   headers: headers
  // })
  const res = await axios.get(api_url + "/clients/loan_types", {
    headers: {
      Authorization: "Bearer " + token 
    }
  })
  if (res.status != 200) {
    return null
  }
  return res.data
}