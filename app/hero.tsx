import Image from "next/image";
import { Button, Typography, Card } from "./MTailwind";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Correctly import Swiper modules
import 'swiper/css'; // Global Swiper styles
import 'swiper/css/navigation'; // Styles for navigation
import 'swiper/css/pagination'; // Styles for pagination

function Hero() {
  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10">
      <div className="absolute inset-0 z-0 ml-auto w-[920px] h-[780px]">
      {/* <Image
        width={1200}
        height={1200}
        src="/images/bocchi.png"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />  */}
      <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 4500, // adjust the delay time as needed
            disableOnInteraction: true,
          }}
          className="absolute inset-0 w-full h-full rounded-bl-[100px]"
        >
          {/* SwiperSlide for each image */}
          <SwiperSlide>
            <Image
              width={1200}
              height={1200}
              src="/images/bocchi.png"
              alt="bg-img"
              className="w-full h-full rounded-bl-[100px] object-cover object-center"
            />
          </SwiperSlide>
          {/* Add more images for the slider */}
          <SwiperSlide>
            <Image
              width={1200}
              height={1200}
              src="/images/dandadan.png" // Add another image here
              alt="bg-img"
              className="w-full h-full rounded-bl-[100px] object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={1200}
              height={1200}
              src="/images/frieren.png" // Add another image here
              alt="bg-img"
              className="w-full h-full rounded-bl-[100px] object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={1200}
              height={1200}
              src="/images/haikyuu.jpeg" // Add another image here
              alt="bg-img"
              className="w-full h-full rounded-bl-[100px] object-cover object-center"
            />
          </SwiperSlide>
          {/* Add more images as needed */}
        </Swiper>
      </div>
      

      <div className="container mx-auto mt-28 z-10">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl"
            >
              Browse and Bookmark Your Favorite Anime and Manga
            </Typography>
            <Typography variant="lead" className="mb-10 mt-6 !text-gray-900">
              You can browse through and bookmark your favorite anime and manga series, 
              allowing you to easily access them later and keep track of new episodes, 
              chapters, or updates for each series you're interested in.
            </Typography>
            <div className="my-2 flex justify-center gap-4 lg:justify-end">
              <Button color="gray">Get Started</Button>
            </div>
            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <Typography variant="h2">
                夢の世界へ、いざ！
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Hero;
