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



function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAdress] = useState('');
  const [cellphone, setCellphone] = useState('');

  const handleNationality = (country) => {
    setNationality(country);
    console.log(`Selected country: ${country}`);
  };
  
  const submitForm = useCallback(() => {
    const body = {
      email: email,
      password: password,
      name: name,
      last_name: lastName,
      birth_date: birthDate,
      gender: gender,
      nationality: nationality,
      address: address,
      phone_number: cellphone
    }
    registerClient(body).then(e => {
      alert("Cliente creado correctamente")
    })
    
  },
  )
  
  const handleDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    setBirthDate(`${year}-${month}-${day}`);
  }

  const handleGender = (gender) => {
    setGender(gender)
  }

  return (
    <div className="">
      <Header/>
        <TextInput
          label = "Nombre"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          />
        <TextInput
          label = "Apellido"
          value = {lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <BirthdatePicker
          onDateChange={handleDate}
        />
        <Dropdown
          label="Seleccione su nacionalidad"
          elements={nationalities}
          onSelect={handleNationality}
        />

        <Dropdown
          label = "Seleccione su género"
          elements = {genders}
          onSelect={handleGender}
        />

        <TextInput
          label = "Dirección"
          value = {address}
          onChange={e => setAdress(e.target.value)}
        />

        <TextInput
          label = "Número de celular o teléfono"
          value = {cellphone}
          onChange={e => setCellphone(e.target.value)}
        />
      

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
        text="Registrarse"
        onClick={submitForm}
      />
      <Footer/>
    </div>
    
  )
}

export default Register