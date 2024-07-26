import { pdTab, productDetailsText } from 'lib/sitecontent/home-content';
import Image from 'next/image';
import { Suspense } from 'react';
import HomeCarousel from './home-carousel';

function ProductDetailsGelling() {
  return (
    <>
      <div className=" flex flex-col-reverse items-center justify-center md:container md:flex-row">
        <div className="mx-auto flex w-full flex-col md:w-2/4">
          <h2 className="px-2 py-10 text-2xl md:px-0 md:text-4xl">
            The Gelling Of Technology and Crafts
          </h2>
          <ul className="mx-auto mb-5 flex flex-col gap-5">
            {productDetailsText.map((item, index) => (
              <li key={index} className="">
                <p className=" text-base md:text-lg">
                  <strong>{item.strong}</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 md:w-1/4">
          <Suspense>
            <HomeCarousel />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsGelling;

export function ProductDetailsTabs({ tabs }: { tabs: pdTab[] }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row ">
      {tabs.map((item) => (
        <Tab key={item.title} tab={item}></Tab>
      ))}
    </div>
  );
}

function Tab({ tab }: { tab: pdTab }) {
  return (
    <div className="w-1/3 p-2 text-center">
      <div className="mx-auto my-10 w-[300px]">
        <Image
          src={tab.image}
          alt={tab.imageAlt}
          width={400}
          height={400}
          className="rounded-lg shadow-md shadow-slate-950"
        />
      </div>
      <div className="mx-auto w-4/5">
        <h2 className="text-2xl">{tab.title}</h2>
        <p className="my-5">{tab.content}</p>
      </div>
    </div>
  );
}
