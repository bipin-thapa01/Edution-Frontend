import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ring } from 'ldrs/react';
import Image from 'next/image';

export default function Bookmark({ bookmarkData }) {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!bookmarkData) return;
    setData(bookmarkData);
    console.log(bookmarkData)
  }, [bookmarkData]);

  const convertTime = (date) => {
    const prev = new Date(date);
    const now = new Date();
    const diff = now - prev;
    if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))} y`;
    }
    else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} mon`;
    }
    else if (diff / (1000 * 60 * 60 * 24) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days`;
    }
    else if (diff / (1000 * 60 * 60) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60))} hr`;
    }
    else if (diff / (1000 * 60) >= 1) {
      return `${Math.floor(diff / (1000 * 60))} min`;
    }
    else {
      return `${Math.floor(diff / (1000))} sec`;
    }
  }

  return (
    <div id="bookmark-container" className="middle-container">
      <div id="bookmark-container-title">Bookmarks</div>
      <div id='bookmark-post-container'>
        {
          data ? data.map((item, index) => {
            return <div key={index} className='bookmark-post'>
              <div className='bookmark-message-container'>
                <div className='bookmark-time'>{convertTime(item.createdAt)} .</div>
                <div className='bookmark-message'>You bookmarked {item.bookmark} from @{item.username}</div>
              </div>
              <div className='bookmark-head'>
                <Image src={item.profileUrl} alt='profile' width={100} height={100} className='bookmark-profile' />
                <div>
                  <div onClick={()=>router.push(`/user/${item.username}`)}>
                    <div>@{item.username}</div>
                  </div>
                  <div>{item.postDesc}</div>
                </div>
              </div>
              <div className='post-image-container'>
                <Image className='bookmark-post-image' fill src={item.postUrl} alt='Post Image' />
              </div>
            </div>
          })
            : <div className="loader">
              <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
            </div>
        }
      </div>
    </div>
  );
}