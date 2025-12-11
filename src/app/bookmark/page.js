import BookmarkPage from "./bookmarkPage";
import "../global.css";

export async function generateMetadata() {
  return {
    title: 'Bookmarks - Socialz',
    description: 'View your saved bookmarks',
  };
}

export default function page(){
  return (
    <>
      <BookmarkPage />
    </>
  );
}