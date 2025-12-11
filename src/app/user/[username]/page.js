import Profile from "./Profile";

export async function generateMetadata({params}) {
  const {username} = await params;
  return {
    title: `${username} profile - Socialz`,
    description: `View ${username}'s profile on Socialz`,
  };
}

export default async function User({params}){
  const {username} = await params;
  
  return <Profile username={username}/>
}