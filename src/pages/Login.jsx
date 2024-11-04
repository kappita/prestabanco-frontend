import React from "react";
import { useState, useCallback } from "react";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";



function Login() {
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_API_URL;
  const {is_logged_in, jwt, name, log_in, log_out} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitForm = useCallback(() => {
    const body = {
      email: email,
      password: password
    }
    axios.post(api_url + "/clients/login", body).then(e => {
      log_in(e.data.token, e.data.name)
      navigate("/dashboard")
      
    }).catch( e=> {
      alert("el pepe" + e)
    })
  })

  return (
    <div>
      

      <TextInput
        label = "Email"
        value = {email}
        onChange={(e) => setEmail(e.target.value)}
        />
      <TextInput
        label = "Contraseña"
        value = {password}
        onChange={e => setPassword(e.target.value)}
      />

      <SubmitButton
        text="Iniciar sesión"
        onClick={submitForm}
      />

    </div>
  )
}

export default Login;