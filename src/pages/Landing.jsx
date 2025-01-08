import LandingNavbar from "../components/LandingNavbar"

function Landing() {





  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="h-full w-[80%]">
      <div className="h-[7%] w-full">
        <LandingNavbar/>
      </div>
      <div className="h-[90%] w-full">
        <div className="h-[50%] w-full grid grid-cols-2">
          <div className="w-[100%] h-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl py-[0.5rem] w-[70%]">
              Con Prestabanco solicita tu crédito hipotecario en segundos
            </h1>
            <h3 className="text-xl w-[70%]">
            Simula, solicita y recibe tu crédito hipotecario desde la comodidad de tu casa. Con el portal en línea de PrestaBanco, puedes saber el estado de tu solicitud en cualquier momento y cualquier lugar
            </h3>
          </div>
          <div className="w-[50%] h-full">

          </div>
        </div>

      </div>
      </div>
      
    </div>
  )
}

export default Landing