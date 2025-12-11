import FriendsPage from "./friendsPage";

export async function generateMetadata() {
  return {
    title: 'Friend Requests - Socialz',
    description: 'View your friend requests',
  };
}

export default function Page(){
  return <FriendsPage/>
}