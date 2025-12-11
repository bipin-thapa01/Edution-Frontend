import MessagePage from "./MessagePage"

export async function generateMetadata() {
  return {
    title: 'Message - Socialz',
    description: 'Chat with your friends',
  };
}

export default function Page(){
  return <MessagePage/>
}