import React from "react";
import useAuthStore from "../stores/authStore";
import SubmitButton from "./SubmitButton";
import { acceptMortgage } from "../service/acceptMortgage";

function MortgageConditions({ mortgage }) {

  const {is_logged_in, jwt, name} = useAuthStore();
  const handleAccept = () => {
    acceptMortgage(mortgage.id, jwt).then(e => {
      alert("El préstamo fue aceptado y el ejecutivo enviará los contratos finales")
    }).catch(e => {
      alert("Error aceptando el préstamo")
    })
  }

  return (
    <div>
      <h1 className="font-bold">Condiciones del préstamo</h1>
      <p>Costo total del préstamo: ${mortgage.total_cost}</p>
      <p>Comisión de administración: ${mortgage.administration_fee} al inicio del préstamo</p>
      <p>Seguro contra incendios: ${mortgage.fire_insurance_fee} mensuales</p>
      <p>Seguro de degravamen ${mortgage.credit_insurance_fee} mensuales</p>
      <p>Cuota mensual: ${mortgage.total_monthly_cost}</p>
      <SubmitButton text="Aceptar préstamo" onClick={handleAccept}/>
    </div>
  )
}

export default MortgageConditions;