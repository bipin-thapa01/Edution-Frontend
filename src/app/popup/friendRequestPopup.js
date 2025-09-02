export default function FriendRequestPopup({ feedData }) {
  const fetchFriendDetails = async () => {
    if (feedData && feedData.user) {
      const res = await fetch('http://localhost:8080/api/friends',
        {
          method: 'GET',
          headers: {
            email: `${feedData.user.email}`,
          }
        });
    }
    else {

    }
  }

  return <div id="friend-request-popup">
    hlo
  </div>
}