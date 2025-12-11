import Signup from "./signup";
import "../global.css";

export async function generateMetadata() {
  return {
    title: 'Signup - Socialz',
    description: 'Create your account at Socialz',
  };
}

export default function Page() {
  return (
    <>
      <Signup />
    </>
  );
}