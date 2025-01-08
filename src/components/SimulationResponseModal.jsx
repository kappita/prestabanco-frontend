import SubmitButton from "./SubmitButton";

const SimulationResponseModal = ({ result, onNext }) => {
  const isSuccessfull =
    result.steps.filter((e) => e.success == false).length == 0;

  return (
    <div className="absolute h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="h-[60%] w-[40%] flex flex-col justify-center items-center bg-white p-[1rem]">
        <div className="w-full h-[7%]">
          <h1 className="text-3xl font-bold text-center">Resultados de simulación</h1>
        </div>
        <div className="h-[90%] w-full">
          {result.steps.map((e) => (
            <div>
              <h1 className="font-bold">{e.name}</h1>
              <p>{e.description}</p>
              <p>{e.success ? "Correcto" : "Incorrecto"}</p>
            </div>
          ))}

          {isSuccessfull && (
            <div>
              <h1>Tu préstamo quedaría de la siguiente forma:</h1>
              <p>Costo total del préstamo: ${result.mortgage.total_cost}</p>
              <p>
                Comisión de administración: $
                {result.mortgage.administration_fee} al inicio del préstamo
              </p>
              <p>
                Seguro contra incendios: ${result.mortgage.fire_insurance_fee}{" "}
                mensuales
              </p>
              <p>
                Seguro de degravamen ${result.mortgage.credit_insurance_fee}{" "}
                mensuales
              </p>
              <p>Cuota mensual: ${result.mortgage.total_monthly_cost}</p>
            </div>
          )}
          <div className="w-[40%] h-[10%] flex items-center justify-center">
            <SubmitButton text="Continuar" color="#6EEB83" onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResponseModal;
