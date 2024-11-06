function MortgageSimulationResponse( { result }) {

  const isSuccessfull = result.steps.filter(e => e.success == false).length == 0

  return (
    <div>
      <h1>
        Resultados de simulación
      </h1>
      {
        result.steps.map(e => (
          <div>
            <h1 className="font-bold">
              {e.name}
            </h1>
            <p>{e.description}</p>
            <p>{e.success ? 'Correcto' : 'Incorrecto'}</p>
          </div>
        ))
      }

      {
        isSuccessfull && <div>
          <h1>
            Tu préstamo quedaría de la siguiente forma:
          </h1>
          <p>Costo total del préstamo: ${result.mortgage.total_cost}</p>
          <p>Comisión de administración: ${result.mortgage.administration_fee} al inicio del préstamo</p>
          <p>Seguro contra incendios: ${result.mortgage.fire_insurance_fee} mensuales</p>
          <p>Seguro de degravamen ${result.mortgage.credit_insurance_fee} mensuales</p>
          <p>Cuota mensual: ${result.mortgage.total_monthly_cost}</p>
        </div>
      }
    </div>
  )


}

export default MortgageSimulationResponse;