import AuthenticateCard from "../authenticateCard";
import "../global.css";

export default function Page(){

  const signupData = {
    type: "signup",
    alt: "Login",
    ask: "New Here?",
    buttonText: "Create Your Account",
    altOption: "or Login"
  }

  return (
    <div>
      <AuthenticateCard data={signupData}/>
    </div>
  );
}