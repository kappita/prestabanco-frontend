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
import PrestaBanco from "../components/PrestaBancoLogo";

function Register() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateErr, setBirthDateErr] = useState("");
  const [nationality, setNationality] = useState("");
  const [nationalityErr, setNationalityErr] = useState("");
  const [gender, setGender] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [address, setAdress] = useState("Dirección ficticia");
  const [addressErr, setAddressErr] = useState("");
  const [cellphone, setCellphone] = useState("123456789");
  const [cellPhoneErr, setCellphoneErr] = useState("");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/;
    return passwordRegex.test(password);
  }

  const validateAllFields = () => {
    let is_valid = true;
    if (!isValidEmail(email)) {
      setEmailErr("El email no es válido.");
      is_valid = false;
    } else {
      setEmailErr("");
    }

    if (!isValidPassword(password)) {
      setPasswordErr(
        "La contraseña debe tener al menos 8 caracteres, un número, mayúsculas y minúsculas, y un caracter especial"
      );
      is_valid = false;
    } else {
      setPasswordErr("");
    }

    if (!name) {
      setNameErr("El nombre no puede estar vacío");
      is_valid = false;
    } else {
      setNameErr("")
    }
    if (!lastName) {
      setLastNameErr("El apellido no puede estar vacío");
      is_valid = false;
    } else {
      setLastNameErr("");
    }

    if (!gender) {
      setGenderErr("Debe seleccionar una opcion");
      is_valid = false;
    } else {
      setGenderErr("");
    }

    if (!nationality) {
      setNationalityErr("Debe seleccionar una opción");
      is_valid = false;
    } else {
      setNationalityErr("");
    }

    if (!birthDate) {
      setBirthDateErr("Debe ingresar una fecha de nacimiento");
      is_valid = false;
    } else {
      setBirthDateErr("");
    }
    return is_valid
  };

  const handleNationality = (country) => {
    setNationality(country);
    console.log(`Selected country: ${country}`);
  };

  const submitForm = useCallback(() => {
    const validation = validateAllFields();
    if (!validation) {
      return;
    } 
    const body = {
      email: email,
      password: password,
      name: name,
      last_name: lastName,
      birth_date: birthDate,
      gender: gender,
      nationality: nationality,
      address: address,
      phone_number: cellphone,
    };
    registerClient(body).then((e) => {
      setEmailErr("")
      alert("Cliente creado correctamente");
    }).catch(e => {
      setEmailErr("El correo electrónico ya está registrado")
    });
  });

  const handleDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    setBirthDate(`${year}-${month}-${day}`);
  };

  const handleGender = (gender) => {
    setGender(gender);
  };

  return (
    <div className="flex h-screen w-screen">
      <div
        id="content"
        className="w-[50%] h-full flex flex-col justify-center items-center "
      >
        <PrestaBanco fontSize="2.5rem" />
        <div className="w-[70%] h-[70%] shadow-sm border-2 flex flex-col items-center justify-between py-10 mt-3 rounded-lg">
          <div className="w-full flex flex-col items-center">
            <TextInput
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="w-[70%] h-[1rem] text-red-600">{emailErr}</p>
          </div>
          <div className="w-full flex flex-col items-center">
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="w-[70%] h-[1rem] text-red-600">{passwordErr}</p>
          </div>
          <div className="w-full flex flex-col items-center">
            <TextInput
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="w-[70%] h-[1rem] text-red-600">{nameErr}</p>
          </div>
          <div className="w-full flex flex-col items-center">
            <TextInput
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className="w-[70%] h-[1rem] text-red-600">{lastNameErr}</p>
          </div>

          <div id="dropdowns" className="flex w-[70%] justify-between">
            <div className="w-full flex flex-col items-center">
              <Dropdown
                label="Seleccione su nacionalidad"
                elements={nationalities}
                onSelect={handleNationality}
              />
              <p className="w-[70%] h-[1rem] text-red-600">{nationalityErr}</p>
            </div>

            <div className="w-full flex flex-col items-center">
              <Dropdown
                label="Seleccione su género"
                elements={genders}
                onSelect={handleGender}
              />
              <p className="w-[70%] h-[1rem] text-red-600">{genderErr}</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <BirthdatePicker onDateChange={handleDate} />
            <p className="w-[70%] h-[1rem] text-red-600 text-center">{birthDateErr}</p>
          </div>

          <div className="w-[40%]">
            <SubmitButton
              text="Registrarse"
              onClick={submitForm}
              color="#6EEB83"
            />
          </div>
        </div>
      </div>
      <div id="art"></div>
    </div>
  );
}

export default Register;
