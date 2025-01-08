import PrestaBanco from "./PrestaBancoLogo";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();

  const redirectToClientLogin = () => {
    navigate("/login");
  };

  const redirectToExecutiveLogin = () => {
    navigate("/executives/login");
  };

  return (
    <div className="w-full h-full flex justify-around items-center px-[6rem]">
      <div className="w-[50%]">
        <div className="">
          <PrestaBanco fontSize="3rem"/>
        </div>
      </div>
      <div className="w-[40%] h-full flex justify-between items-center">
        <p className="text-justify">Sobre nosotros</p>
        <div className="w-[30%] h-[60%] flex justify-center items-center">
          <SubmitButton
            text="Portal ejecutivos"
            onClick={redirectToExecutiveLogin}
            color="#FF5714"
          />
        </div>
        <div className="w-[30%]">
          <SubmitButton
            text="Portal clientes"
            onClick={redirectToClientLogin}
            color="#6EEB83"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
