import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from "next/image";
import "./postImage.css";

export default function PostImage({ imageList }) {
  const [images, setImages] = useState(null);
  useEffect(() => {
    if (imageList) {
      setImages(imageList);
    }
  }, [imageList]);

  const removeImage = (index) => {
    setImages(images.filter((_, i) => {
      return index !== i
    }));
  }

  return images && images.length > 0 ? <Swiper
    slidesPerView={2}
    spaceBetween={5}
    pagination={{
      clickable: true,
    }}
    modules={[Pagination]}
    className="mySwiper" id="post-image-container">
    {
      images ? images.map((item, index) => {
        return <SwiperSlide key={index} className="post-image-container-container">
          <Image className="post-image" src={URL.createObjectURL(item)} width={100} height={100} alt={`image-${index}`} />
          <div onClick={() => removeImage(index)} className={`post-cross-container`}>
            <RxCross2 className="post-image-cross" fill="#FFFF" />
          </div>
        </SwiperSlide>
      }) : null
    }
  </Swiper> : null;
}