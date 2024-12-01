'use client'; // Mark as Client Component

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Correctly import Swiper modules
import 'swiper/css'; // Global Swiper styles
import 'swiper/css/navigation'; // Styles for navigation
import 'swiper/css/pagination'; // Styles for pagination
import Link from 'next/link'; 

const Home = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-5 bg-gray-800 text-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-wide">Anime & Manga Website</h1>
        <nav>
          <Link href="/auth">
              Login
          </Link>
        </nav>
      </header>
      {/* Full-Width Carousel Section */}
      <section className="carousel-section w-full h-[50vh] max-w-full overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30} // Spacing between slides
          slidesPerView={1} // Number of slides to show per view
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="swiper-container w-full h-full"
        >
          <SwiperSlide>
            <div className="carousel-item relative text-center group">
              <Image
                src="/images/bocchi.png"
                alt="Anime 1"
                width={1200}
                height={600}
                layout="intrinsic"
                objectFit="contain"
                className="carousel-image mx-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-semibold">Bocchi the Rock</h3>
                <p className="text-lg">Kita-channn</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="carousel-item relative text-center group">
              <Image
                src="/images/dandadan.png"
                alt="Anime 2"
                width={1200}
                height={600}
                layout="intrinsic"
                objectFit="contain"
                className="carousel-image mx-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-semibold">DanDaDan</h3>
                <p className="text-lg">Give me back my balls!!</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="carousel-item relative text-center group">
              <Image
                src="/images/frieren.png"
                alt="Anime 3"
                width={1200}
                height={600}
                layout="intrinsic"
                objectFit="contain"
                className="carousel-image mx-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-semibold">Frieren</h3>
                <p className="text-lg">All hail Fern</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="carousel-item relative text-center group">
              <Image
                src="/images/haikyuu.jpeg"
                alt="Anime 4"
                width={1200}
                height={600}
                layout="intrinsic"
                objectFit="contain"
                className="carousel-image mx-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-semibold">Haikyuu</h3>
                <p className="text-lg">TOBE FLYYY HIGH</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>


      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Anime & Manga Website</p>
      </footer>
    </div>
  );
};

export default Home;