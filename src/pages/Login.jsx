import React from "react";
import { useState, useCallback } from "react";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import PrestaBanco from "../components/PrestaBancoLogo";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const { is_logged_in, jwt, name, log_in, log_out } = useAuthStore();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = useCallback(() => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(api_url + "/clients/login", body)
      .then((e) => {
        log_in(e.data.token, e.data.name);
        navigate("/dashboard");
      })
      .catch((e) => {
        setEmailErr("El correo electrónico o la contraseña son incorrectos");
      });
  });

  return (
    <div className="flex h-screen w-screen">
      <div
        id="content"
        className="w-[50%] h-full flex flex-col justify-center items-center "
      >
        <PrestaBanco fontSize="2.5rem" />
        <div className="w-[60%] h-[40%] shadow-sm border-2 flex flex-col items-center justify-between py-10 mt-3 rounded-lg">
          <div className="w-full flex flex-col items-center">
            <TextInput
              placeholder="Email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="w-[70%] h-[1rem] text-red-600">{emailErr}</p>
          </div>
          <TextInput
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-[40%]">
            <SubmitButton
              text="Iniciar sesión"
              onClick={submitForm}
              color="#6EEB83"
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes una cuenta en PrestaBanco?{" "}
          </p>
          <Link
            to="/register"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            ¡Regístrate aquí!
          </Link>
        </div>
      </div>
      <div id="art"></div>
    </div>
  );
}

export default Login;
