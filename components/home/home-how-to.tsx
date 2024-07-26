import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { HowToElementType, HowToElements } from 'lib/sitecontent/home-content';
import Link from 'next/link';

function HowItWorks() {
  return (
    <div className="container mx-auto flex flex-col gap-10">
      <div>
        <h2 className="text-2xl md:text-4xl">How It Works</h2>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-20 md:flex-row">
        {HowToElements.map((item, index) => {
          return (
            <>
              <HowItWorksElement item={item}></HowItWorksElement>
              {index !== HowToElements.length - 1 ? (
                <ArrowRightIcon className="hidden lg:block" width={75} />
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          className="rounded-full bg-purple-700 px-8 py-4  text-lg text-white hover:bg-orange-500 hover:text-black  md:text-xl lg:text-2xl"
          href={'/search'}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default HowItWorks;

function HowItWorksElement({ item }: { item: HowToElementType }) {
  return (
    <div
      className="mx-auto h-[50vh] w-3/5 rounded-md md:mx-0 md:w-1/3"
      style={{
        backgroundImage: `url(${item.imageURL})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="h-full w-full text-center">
        <h3 className="my-50 bg-white text-xl text-black lg:text-2xl">{item.title}</h3>
      </div>
    </div>
  );
}
