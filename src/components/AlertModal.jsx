import SubmitButton from "./SubmitButton"


const AlertModal = ({title, message, onBack, onNext}) => {
  

  return (
    <div className="absolute h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="h-[30%] w-[30%] flex flex-col justify-between items-center bg-white p-[2rem]">
        <div className="w-full h-[7%]">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
        </div>
        <div className="h-[30%] w-full">
          <p className="text-xl text-center">{message}</p>
        </div>
        <div className="w-[30%] h-[20%]">
          <SubmitButton text="Continuar" color="#6EEB83" onClick={onNext}/>
        </div>

      </div>
    </div>
  )
}


export default AlertModal;