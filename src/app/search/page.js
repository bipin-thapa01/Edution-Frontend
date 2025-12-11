import SearchPage from "./searchPage";

export async function generateMetadata() {
  return {
    title: 'Search - Socialz',
    description: 'Search users and posts',
  };
}

export default function Search(){
  return (
    <>
      <SearchPage />
    </>
  );
}