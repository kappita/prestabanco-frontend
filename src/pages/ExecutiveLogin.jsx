import React from "react";
import { useState, useCallback } from "react";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function ExecutiveLogin() {
  const {is_logged_in, jwt, name, log_in, log_out} = useAuthStore();
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitForm = useCallback(() => {
    const body = {
      email: email,
      password: password
    }
    console.log(body)
    axios.post(api_url + "/executives/login", body, {
    }).then(e => {
      log_in(e.data.token, e.data.name)
      navigate("/executives/dashboard")
      console.log(e.data)
    }).catch(e => {
      alert("Correo o contraseña incorrecta")
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

export default ExecutiveLogin