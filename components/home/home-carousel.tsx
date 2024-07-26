'use client';

import { homeProductDetails } from 'lib/sitecontent/home-content';
import { Carousel } from 'react-responsive-carousel';

function HomeCarousel() {
  const renderThumbs = () => {
    return homeProductDetails.map((item, index) => {
      return (
        <button className="rounded-lg px-4 py-3 shadow-lg" key={item.title + '_' + index}>
          {item.title}
        </button>
      );
    });
  };

  return (
    <Carousel
      className="w-full"
      autoPlay
      transitionTime={1500}
      dynamicHeight={false}
      infiniteLoop={true}
      showArrows={true}
      showStatus={false}
      showThumbs={false}
    >
      {homeProductDetails.map((item, index) => {
        return (
          <div
            key={item.title + '-' + index}
            className="pointer-actions-none mx-auto aspect-square"
          >
            <img
              src={item.imgSrc}
              alt=""
              className="rounded-xl shadow-xl"
              style={{ objectFit: 'cover' }}
            />
          </div>
        );
      })}
    </Carousel>
  );
}

export default HomeCarousel;
