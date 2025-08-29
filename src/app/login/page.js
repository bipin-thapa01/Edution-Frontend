import AuthenticateCard from "../authenticateCard";
import "../global.css";

export default function Page(){

  const signupData = {
    type: "login",
    alt: "SinUp",
    ask: "Welcome back!",
    buttonText: "Login into your account",
    altOption: "or Signup",
    altLink: "/signup",
  }

  return (
    <div>
      <AuthenticateCard data={signupData}/>
    </div>
  );
}