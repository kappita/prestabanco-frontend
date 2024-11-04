import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";
import SubmitButton from "../components/SubmitButton";
import BirthdatePicker from "../components/BirthdatePicker";
import { nationalities } from "../utils/nationalities";
import { genders } from "../utils/genders";
import { registerClient } from "../service/registerClient";
import { useNavigate } from "react-router-dom";
import { registerExecutive } from "../service/registerExecutive";



function ExecutiveRegister() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  
  const submitForm = useCallback(() => {
    const body = {
      email: email,
      password: password,
      name: name,
    }
    registerExecutive(body).then(e => {
      alert("Ejecutivo creado correctamente")
      navigate("/executives/login")
    })
    
  },
  )
  
  return (
    <div className="">
      <Header/>

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
        <TextInput
          label = "Nombre"
          value = {name}
          onChange={(e) => setName(e.target.value)}
        />  
        <SubmitButton
          text="Registrarse"
          onClick={submitForm}
        />
      <Footer/>
    </div>
    
  )
}

export default ExecutiveRegister;