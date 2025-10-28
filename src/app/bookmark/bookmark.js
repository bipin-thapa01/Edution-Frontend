import { useState, useEffect } from 'react';
import { Ring } from 'ldrs/react';
import Image from 'next/image';

export default function Bookmark({ bookmarkData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!bookmarkData) return;
    setData(bookmarkData);
    console.log(bookmarkData)
  }, [bookmarkData]);

  return (
    <div id="bookmark-container" className="middle-container">
      <div id="bookmark-container-title">Bookmarks</div>
      <div id='bookmark-post-container'>
        {
          data ? data.map((item, index) => {
            return <div key={index} className='bookmark-post'>
              <div className='bookmark-message'>You bookmarked {item.bookmark} from @{item.username}</div>
              <div className='bookmark-head'>
                <Image src={item.profileUrl} alt='profile' width={100} height={100} className='bookmark-profile'/>
                <div>
                  <div>
                    <div>@{item.username}</div>
                  </div>
                  <div>{item.postDesc}</div>
                </div>
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