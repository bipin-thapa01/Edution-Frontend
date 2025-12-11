import Login from "./login";
import "../global.css";

export async function generateMetadata() {
  return {
    title: 'Login - Socialz',
    description: 'Login to your account',
  };
}

export default function Page() {
  return (
    <>
      <Login />
    </>
  );
}