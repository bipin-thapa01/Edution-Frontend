import SettingsPage from "./settingsPage"

export async function generateMetadata() {
  return {
    title: 'Settings - Socialz',
    description: 'Customize your account',
  };
}

export default function Page(){
  return <>
  <SettingsPage/>
  </>
}