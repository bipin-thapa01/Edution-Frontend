import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Ring } from 'ldrs/react';
import Image from "next/image";
import './search.css';

export default function LatestUsers({data}){
  const router = useRouter();
  
  return <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
              data ?
                data.map((item, index) => {
                  return <SwiperSlide className="search-result-user" key={index} onClick={() => router.push(`/user/${item.username}`)}>
                    <div id="search-result-profile">
                        <Image src={item.imgurl} alt="userImage" fill unoptimized style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="id-details">
                        <div>{item.name}</div>
                        <div className="id-username">@{item.username}</div>
                      </div>
                  </SwiperSlide>
                }) : <div className="new-user-loader">
                  <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
                </div>
            }
          </Swiper>
}