import NotificationPage from "./notificationPage"

export async function generateMetadata() {
  return {
    title: 'Notifications - Socialz',
    description: 'View your notifications',
  };
}

export default function Page(){
  return <><NotificationPage/></>
}